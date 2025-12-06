const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();


// ===== DATABASE CONNECT =====
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mern-expenses";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));


// ===== CORS CONFIG =====
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "https://sk-expense-tracker.vercel.app"
    ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ===== GLOBAL MIDDLEWARES =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===== ROOT ROUTE =====
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API is running ✅",
    health: "/health",
    docs: "API ready to use"
  });
});


// ===== HEALTH CHECK =====
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    serverTime: new Date()
  });
});


// ===== API ROUTES =====
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/transactions", transactionRouter);


// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ message: "❌ API Route not found" });
});


// ===== ERROR HANDLER =====
app.use(errorHandler);


// ===== START SERVER =====
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
