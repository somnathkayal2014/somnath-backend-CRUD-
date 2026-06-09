import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
} from "../controller/todoController.js";
import { hasToken } from "../middleware/hasToken.js";

const todoRoute = express.Router();

todoRoute.post("/create", hasToken, createTodo);
todoRoute.get("/getAll", hasToken, getAllTodo);
todoRoute.delete("/delete/:id", hasToken, deleteTodo);

export default todoRoute;
