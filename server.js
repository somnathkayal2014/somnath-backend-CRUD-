import express, { json } from "express";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/route/userRoute.js";
import dotenv from "dotenv/config"

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRoute);

dbConnect();
app.listen(port, () => {
  console.log(`server running at port ${port}`);
}); 
