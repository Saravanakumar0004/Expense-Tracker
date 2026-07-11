const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /api/transactions?month=2026-07
// Returns all transactions, optionally filtered to a single month (YYYY-MM)
router.get('/', async (req, res) => {
  try {
    const { month } = req.query;
    const filter = {};

    if (month) {
      const [year, mon] = month.split('-').map(Number);
      if (!year || !mon) {
        return res.status(400).json({ error: 'month must be in YYYY-MM format' });
      }
      const start = new Date(year, mon - 1, 1);
      const end = new Date(year, mon, 1);
      filter.date = { $gte: start, $lt: end };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions', details: err.message });
  }
});

// GET /api/transactions/summary?month=2026-07
// Returns totals + category breakdown for a given month
router.get('/summary', async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ error: 'month query param (YYYY-MM) is required' });
    }
    const [year, mon] = month.split('-').map(Number);
    const start = new Date(year, mon - 1, 1);
    const end = new Date(year, mon, 1);

    const transactions = await Transaction.find({ date: { $gte: start, $lt: end } });

    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const byCategory = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });

    res.json({
      month,
      income,
      expense,
      savings: income - expense,
      byCategory,
      count: transactions.length,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to build summary', details: err.message });
  }
});

// GET /api/transactions/monthly-summary
// Returns income, expense and savings totals for every month that has data,
// sorted oldest to newest — used to compare months against each other.
router.get('/monthly-summary', async (req, res) => {
  try {
    const results = await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: { $dateToString: { format: '%Y-%m', date: '$date' } },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: '$_id.month',
          totals: { $push: { type: '$_id.type', total: '$total' } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthly = results.map((row) => {
      const income = row.totals.find((t) => t.type === 'income')?.total || 0;
      const expense = row.totals.find((t) => t.type === 'expense')?.total || 0;
      return {
        month: row._id,
        income,
        expense,
        savings: income - expense,
      };
    });

    res.json(monthly);
  } catch (err) {
    res.status(500).json({ error: 'Failed to build monthly summary', details: err.message });
  }
});

// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const { date, type, category, amount, note } = req.body;

    if (!date || !type || !category || amount === undefined) {
      return res.status(400).json({ error: 'date, type, category and amount are required' });
    }
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: "type must be 'income' or 'expense'" });
    }
    if (Number(amount) < 0) {
      return res.status(400).json({ error: 'amount cannot be negative' });
    }

    const transaction = await Transaction.create({
      date: new Date(date),
      type,
      category,
      amount: Number(amount),
      note,
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create transaction', details: err.message });
  }
});

// PUT /api/transactions/:id
router.put('/:id', async (req, res) => {
  try {
    const { date, type, category, amount, note } = req.body;
    const update = {};
    if (date !== undefined) update.date = new Date(date);
    if (type !== undefined) update.type = type;
    if (category !== undefined) update.category = category;
    if (amount !== undefined) update.amount = Number(amount);
    if (note !== undefined) update.note = note;

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction', details: err.message });
  }
});

// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction', details: err.message });
  }
});

module.exports = router;