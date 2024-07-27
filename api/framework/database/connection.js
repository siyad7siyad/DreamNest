import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async()=>{
  try {
    const mongoURI = process.env.MONGO
    if(!mongoURI){
      throw new Error("MONGO_DB_URL environment variable is not defined.")
    }
    await mongoose.connect(mongoURI)
    console.log("Database connected succesfully");
    
  } catch (error) {
    console.error("Error connecting to mongo db:",error.message)
    
  }
}

export default connectDB