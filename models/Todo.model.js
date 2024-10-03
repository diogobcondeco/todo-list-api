const mongoose = require("mongoose");

// define schema for todo data
const TodoSchema = new mongoose.Schema(
  {
    isDone: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      enum: ["hidden", "public"],
      default: "public",
    },
    description: {
      type: String,
      required: [true, "A todo must have a description"],
    },
    tags: [String],
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// create Todo model object
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
