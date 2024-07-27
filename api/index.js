import express from "express";
import connectDB from "./framework/database/connection.js";
import userRouter from "./framework/webserver/routes/userRoute.js"

connectDB();

const app = express();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use("/api/user",userRouter)