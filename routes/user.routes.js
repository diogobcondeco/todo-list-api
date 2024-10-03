// import express
const express = require("express");

// import user controller
const userController = require("./../controllers/user.controller");

// import authentication middleware
const authController = require("./../auth/auth");

// create router
const router = express.Router();

// API endpoint for an author
router.get("/author", authController.authenticate, userController.getAllTodos);

// API endpoint for signup and login
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

module.exports = router;
