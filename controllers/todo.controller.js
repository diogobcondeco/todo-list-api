// import the Todo model object
const Todo = require("./../models/Todo.model");
const User = require("./../models/User.model");

// get public todos (all public todos)
// exports.getAllPublicTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({ state: "public" });

//     res.status(200).json({
//       status: "success",
//       todos,
//     });
//   } catch (err) {
//     throw err;
//   }
// };

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
    const { message, tags } = req.body;

    // get author name and author id
    let { first_name, last_name } = req.user;
    let author = `${first_name} ${last_name}`;
    let authorId = req.user._id;

    const todo = await Todo.create({
      message,
      tags,
      author,
      authorId,
    });

    // add the new created todo to "todos" array property on the user document
    let user = await User.findById(req.user._id);
    user.posts.push(todo._id);
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

// delete a todo
