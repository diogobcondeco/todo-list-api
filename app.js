const express = require("express");

// import todo router and user router
const todoRouter = require("./routes/todo.routes");
const userRouter = require("./routes/user.routes");

// create express app
const app = express();

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for API endpoints
app.use("/api", userRouter);
app.use("/api/todos", todoRouter);

module.exports = app;
