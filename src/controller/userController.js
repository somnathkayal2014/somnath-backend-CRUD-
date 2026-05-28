import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import { verifyMail } from "../verificationMail/verifyMail.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existing = await userSchema.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registered",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      userName,
      email,
      password: hashPassword,
    });
    const token = Jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });
    console.log(token);
    verifyMail(token, email);
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
