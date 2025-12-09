import { mockData } from "./data";
import { Product } from "../models/product.model";

export const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} products, skipping seed`);
    return;
  }
  await Product.insertMany(mockData);
  console.log("Products seeded successfully");
};
