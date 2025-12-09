import { Product } from "../models/product.model";

export const getAllProducts = () => {
  return Product.find();
};
