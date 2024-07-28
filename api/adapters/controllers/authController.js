import User from "../../framework/database/models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res ) => {
  const { username, email, password, confirmPassword,mobile } = req.body;

  if (!username || !email || !password ) {
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
    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return res.status(400).json({ success: false, message: `${field} '${value}' already exists` });
    }
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
