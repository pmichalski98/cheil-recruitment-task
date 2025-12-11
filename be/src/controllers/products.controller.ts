import { Request, Response } from "express";
import { getAllProducts } from "../services/products.service";
import { GetProductsQuery } from "../schemas/product.schema";

export const getProducts = async (req: Request, res: Response) => {
  const query = req.query as GetProductsQuery;
  try {
    const products = await getAllProducts(query);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
