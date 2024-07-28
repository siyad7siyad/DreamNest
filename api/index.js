import express from "express";
import connectDB from "./framework/database/connection.js";
import userRouter from "./framework/webserver/routes/userRoute.js";
import authRouter from "./framework/webserver/routes/authRoute.js";
import errorHandlingMiddleware from "./framework/webserver/middleware/errorHandling.js";
import cors from "cors";

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandlingMiddleware);
