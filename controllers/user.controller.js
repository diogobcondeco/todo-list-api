// import todo model
const Todo = require("../models/Todo.model");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      authorId: req.user._id,
    });

    res.status(200).json({
      status: "success",
      todos,
    });
  } catch (err) {
    throw err;
  }
};
