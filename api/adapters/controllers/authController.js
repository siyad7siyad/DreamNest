import User from "../../framework/database/models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({
        success: false,
        message: `${field} '${value}' already exists`,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404,"User not found") );
    const validPassword = bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) return next(errorHandler(401,"Wrong Credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password:pass,...rest} = validUser._doc
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ rest });
  } catch (error) {
    next(error);
  }
};
