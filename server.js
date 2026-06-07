import express, { json } from "express";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/route/userRoute.js";
import dotenv from "dotenv/config";
import todoRoute from "./src/route/todoRoute.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRoute);
app.use("/todo", todoRoute);

dbConnect();
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
