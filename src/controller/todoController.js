import todoSchema from "../models/todoSchema.js";

// create Todo
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const createTodo = await todoSchema.create({
      title: title,
      userId: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      data: createTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Getall Todo
export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await todoSchema.find({
      userId: req.userId,
    });
    return res.status(200).json({
      success: true,
      message: "Todo fetched Successfully",
      data: allTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todoId = req.params.id;
    const editTodo = await todoSchema.findOne({
      _id: todoId,
      userId: req.userId,
    });
    if (!editTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    editTodo.title = title;
    await editTodo.save();
    return res.status(200).json({
      success: true,
      message: "Todo updated Successfully",
      data: editTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const delTodo = await todoSchema.findByIdAndDelete({
      _id: todoId,
      userId: req.userId,
    });
    if (!delTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "Todo Deleted Successfully",
        data: delTodo,
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Pagination

export const paginateTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 3; // 3 todos per page

    // calculating the skip value
    const skip = (page - 1) * limit;

    // getting todo with pagination
    const todo = await todoSchema
      .find({ userId: req.userId })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      success: true,
      message: "Todos fetched as per query",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
