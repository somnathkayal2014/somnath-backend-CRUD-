import express from "express";
import { createTodo, getAllTodo } from "../controller/todoController.js";
import { hasToken } from "../middleware/hasToken.js";

const todoRoute = express.Router();

todoRoute.post("/create",hasToken, createTodo);
todoRoute.get("/getAll",hasToken, getAllTodo)

export default todoRoute;
