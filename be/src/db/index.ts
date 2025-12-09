import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/cheil-task";

export const connectDB = async () => {
  const connection = await mongoose.connect(MONGO_URI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};
