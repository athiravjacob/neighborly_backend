import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    
    const mongoUri = process.env.MONGO_URI  ;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Mongo connection error:", error);
    process.exit(1); 
  }
};

export default connectDB;
