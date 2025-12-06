const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

// Load environment variables
require('dotenv').config();

//!Connect to mongodb
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mern-expenses";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((e) => console.log("❌ MongoDB Connection Error:", e));

//! Cors config
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : [
          "http://localhost:5173",
          "http://localhost:5174",
          "http://localhost:5175",
          "http://localhost:5176",
          "https://expence-tracker-app-tawny.vercel.app",
        ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//!Middlewares
app.use(express.json()); //?Pass incoming json data
app.use(express.urlencoded({ extended: true }));

//! Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//! 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () =>
  console.log(`🚀 Server is running on port ${PORT}`)
);