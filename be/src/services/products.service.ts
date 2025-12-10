import { FilterQuery, SortOrder } from "mongoose";
import { Product } from "../models/product.model";
import { GetProductsQuery } from "../schemas/product.schema";
import { IProduct } from "shared";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;

export const getAllProducts = async (filters: GetProductsQuery) => {
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

  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(query).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  return {
    products,
    hasMore: skip + products.length < total,
    nextPage: page + 1,
  };
};
