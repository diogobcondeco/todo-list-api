// import the Todo model object
const Todo = require("./../models/Todo.model");
const User = require("./../models/User.model");

// get public todos (all public todos)
exports.getAllPublicTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ state: "public" });

    res.status(200).json({
      status: "success",
      todos,
    });
  } catch (err) {
    throw err;
  }
};

// get hidden todos
// exports.getAllHiddenTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ state: "hidden" });

//     res.status(200).json({
//       status: "success",
//       todos,
//     });
//   } catch (err) {
//     throw err;
//   }
// };

// get a single public todo
// exports.getSingleTodo = async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.todoId);

//     if (!todo) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "Todo with given Id not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       todo,
//     });
//   } catch (err) {
//     throw err;
//   }
// };

// create a todo
exports.createATodo = async (req, res) => {
  try {
    const { description, tags } = req.body;

    // get author name and author id
    let { first_name, last_name } = req.user;
    let author = `${first_name} ${last_name}`;
    let authorId = req.user._id;

    const todo = await Todo.create({
      description,
      tags,
      author,
      authorId,
    });

    // add the new created todo to "todos" array property on the user document
    let user = await User.findById(req.user._id);
    user.todos.push(todo._id);
    await user.save(); // save changes made to the user doc

    // send back response
    res.status(201).json({
      status: "success",
      todo,
    });
  } catch (err) {
    throw err;
  }
};

// update a todo
exports.updateATodo = async (req, res) => {
  const { isDone, state, description, tags } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      {
        $set: { isDone, state, description, tags },
      },
      { new: true }
    );

    // check if todo belongs to the user initiating the request
    if (todo.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: "Fail",
        message: "You can only update the todo you created!",
      });
    }

    res.status(200).json({
      status: "success",
      todo,
    });
  } catch (err) {
    throw err;
  }
};

// delete a todo
exports.deleteATodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId, {
      authorId: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        status: "Fail",
        message: "Todo with given Id not found",
      });
    }

    // delete todo from "todos" array in user the document
    const todoByUser = await User.findById(req.user._id);
    todoByUser.todos.pull(todo._id);
    await todoByUser.updateOne({ todos: todoByUser.todos });

    // return deleted todo
    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (err) {
    throw err;
  }
};