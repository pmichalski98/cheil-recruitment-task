import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "./index";
import { mockData } from "./data";
import { Product } from "../models/product.model";

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(mockData);
  console.log("Products seeded successfully");
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error("Error seeding products:", error);
  process.exit(1);
});
