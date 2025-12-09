import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./db";

const PORT = process.env.PORT || 3001;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch(console.error);
