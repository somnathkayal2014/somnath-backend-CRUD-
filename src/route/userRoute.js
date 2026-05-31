import express from "express";
import { register } from "../controller/userController.js";
import { verification } from "../middleware/tokenVerify.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.get("/verify", verification)

export default userRoute;
