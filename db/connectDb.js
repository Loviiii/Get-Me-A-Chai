import mongoose from "mongoose";

let isConnected = false; // Track connection state

const connectDB = async () => {
  if (isConnected) return; // Prevent multiple connections

  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/GetMeChai");

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
