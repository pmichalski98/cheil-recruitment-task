import { FilterQuery, SortOrder } from "mongoose";
import { Product } from "../models/product.model";
import { GetProductsQuery } from "../schemas/product.schema";
import { IProduct } from "shared";

export const getAllProducts = (filters: GetProductsQuery) => {
  const query: FilterQuery<IProduct> = {};

  if (filters.query) {
    query.code = { $regex: filters.query, $options: "i" };
  }

  if (filters.capacity) {
    query.capacity = filters.capacity;
  }

  if (filters.energyClass) {
    query.energyClass = filters.energyClass;
  }

  if (filters.feature) {
    query.features = filters.feature;
  }

  const sort: Record<string, SortOrder> = {};
  if (filters.sort === "price") {
    sort["price.value"] = 1;
  } else if (filters.sort === "capacity") {
    sort.capacity = 1;
  }

  return Product.find(query).sort(sort);
};
