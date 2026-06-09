import todoSchema from "../models/todoSchema.js";

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
