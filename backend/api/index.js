require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = require('../routes/transactions');

const app = express();

app.use(cors());
app.use(express.json());

// --- MongoDB connection (cached across serverless invocations) ---
// Don't trust a boolean flag across warm lambda invocations — the underlying
// socket can silently die (Atlas idle timeout, freeze/thaw) while the flag
// still says "connected". Check mongoose's actual readyState instead, and
// cache the in-flight connect() promise so concurrent requests on a cold
// start don't race to open multiple connections.
let connectPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return; // already connected

  if (!connectPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    connectPromise = mongoose
      .connect(uri, {
        bufferCommands: false, // fail fast instead of queueing for 10s
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => {
        connectPromise = null; // allow retry on next request
        throw err;
      });
  }

  await connectPromise;
}

// Ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/transactions', transactionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Local development (Vercel ignores this and calls the exported app directly)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
}

module.exports = app;