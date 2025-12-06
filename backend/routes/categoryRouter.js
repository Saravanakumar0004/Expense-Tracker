const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");

const categoryRouter = express.Router();

// ✅ Create
categoryRouter.post("/create", isAuthenticated, categoryController.create);

// ✅ List
categoryRouter.get("/lists", isAuthenticated, categoryController.lists);

// ✅ Update
categoryRouter.put("/update/:categoryId", isAuthenticated, categoryController.update);

// ✅ Delete
categoryRouter.delete("/delete/:id", isAuthenticated, categoryController.delete);

module.exports = categoryRouter;
