// import express
const express = require("express");

// import Todo controller
const todoController = require("./../controllers/todo.controller");

// import authentication middleware
const authController = require("./../auth/auth");

// create router
const router = express.Router();

// API endpoint structure
router.get("/", authController.authenticate, todoController.getAllTodos);
router.post("/", authController.authenticate, todoController.createATodo);
router.put("/:todoId", authController.authenticate, todoController.updateATodo);
router.delete(
  "/:todoId",
  authController.authenticate,
  todoController.deleteATodo
);

module.exports = router;
