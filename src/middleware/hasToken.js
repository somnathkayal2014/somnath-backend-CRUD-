import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
// import todoSchema from "../models/todoSchema.js";
import userSchema from "../models/userSchema.js";

// mail verification
export const hasToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or Invalid",
      });
    } else {
      const token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        console.log(decoded);
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(400).json({
              success: false,
              message:
                "Access Token has Expired, use refreshToken to generate again",
            });
          } else
            return res.status(400).json({
              success: false,
              message: "Access Token is missing or invalid",
            });
        } else {
          const { userId } = decoded;
          console.log("try");
          const user = await userSchema.findById(userId);
          if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }
          req.userId = userId;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
