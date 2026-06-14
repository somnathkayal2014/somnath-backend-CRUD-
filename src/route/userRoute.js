import express from "express";
import { hasToken } from "../middleware/hasToken.js";
import { login, logout, register } from "../controller/userController.js";
import { verification } from "../middleware/tokenVerify.js";
import { userValidateSchema, validateUser } from "../validators/userValidate.js";

const userRoute = express.Router();

userRoute.post("/register",validateUser(userValidateSchema), register);
userRoute.get("/verify", verification);
userRoute.get("/login", login);
userRoute.delete("/logout", hasToken, logout);
export default userRoute;
