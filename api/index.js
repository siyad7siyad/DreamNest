import express from "express";
import connectDB from "./framework/database/connection.js";
import userRouter from "./framework/webserver/routes/userRoute.js"
import authRouter from "./framework/webserver/routes/authRoute.js"
import errorHandlingMiddleware from "./framework/webserver/middleware/errorHandling.js";

connectDB();



const app = express();
app.use(express.json())

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use(errorHandlingMiddleware)