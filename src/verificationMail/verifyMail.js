import nodemailer from "nodemailer";
import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyMail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
 
  const mailConfigurations = {
    from: process.env.email,
    to: email,
    subject: "Email Verification",
    text: `Click Now: ${token}`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.error("Error sending Email:", error);
      throw new Error(error);
    } else {
      console.log("Email sent successfully");
      console.log(info);
    }
  });
};
 