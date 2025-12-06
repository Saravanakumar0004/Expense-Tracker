const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const transactionController = require("../controllers/transactionCtrl");

const transactionRouter = express.Router();

// ✅ Create
transactionRouter.post("/create", isAuthenticated, transactionController.create);

// ✅ Lists
transactionRouter.get("/lists", isAuthenticated, transactionController.getFilteredTransactions);

// ✅ Update
transactionRouter.put("/update/:id", isAuthenticated, transactionController.update);

// ✅ Delete
transactionRouter.delete("/delete/:id", isAuthenticated, transactionController.delete);

module.exports = transactionRouter;
