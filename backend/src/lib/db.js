import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables from the .env file
config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure if the connection fails
  }
};
