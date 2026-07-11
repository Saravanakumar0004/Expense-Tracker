const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

// Fast lookups when filtering by month on the dashboard
transactionSchema.index({ date: -1 });

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
