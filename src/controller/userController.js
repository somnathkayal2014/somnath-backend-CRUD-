import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });
    verifyMail(token, email);
    user.token = token;
    await user.save();
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

// Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      const passCheck = await bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res.status(401).json({
          success: false,
          message: "Incorrect Password",
        });
      } else if (passCheck && user.isVerified) {
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "10days",
          },
        );

        const refreshToken = jwt.sign(
          { userId: user._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "30days",
          },
        );

        user.isLoggedIn = true;
        await user.save();
        return res.status(401).json({
          success: true,
          message: "Hurray!",
          accessToken: accessToken,
          refreshToken: refreshToken,
          data: user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Complete Verification First",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

