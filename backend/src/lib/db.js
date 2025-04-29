import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables from the .env file
config();

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not defined in .env file");
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI); // No need for useNewUrlParser and useUnifiedTopology anymore

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.stack || error.message);
    process.exit(1);
  }
};
