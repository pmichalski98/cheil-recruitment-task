import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import { Product } from "../models/product.model";

let mongoServer: MongoMemoryServer;

const testProducts = [
  {
    image: "https://example.com/image1.jpg",
    code: "TEST001",
    name: "Test Product 1",
    color: "white",
    capacity: 9,
    dimensions: "55 x 60 x 85 cm",
    features: ["Panel AI Control", "Silnik inwerterowy"],
    energyClass: "A",
    price: {
      value: 1999,
      currency: "zł",
      installment: { value: 50, period: 40 },
      validFrom: new Date("2024-01-01"),
      validTo: new Date("2024-12-31"),
    },
  },
  {
    image: "https://example.com/image2.jpg",
    code: "TEST002",
    name: "Test Product 2",
    color: "black",
    capacity: 8,
    dimensions: "55 x 60 x 85 cm",
    features: ["Drzwi AddWash™"],
    energyClass: "B",
    price: {
      value: 2999,
      currency: "zł",
      installment: { value: 75, period: 40 },
      validFrom: new Date("2024-01-01"),
      validTo: new Date("2024-12-31"),
    },
  },
  {
    image: "https://example.com/image3.jpg",
    code: "TEST003",
    name: "Test Product 3",
    color: "silver",
    capacity: 10.5,
    dimensions: "60 x 65 x 90 cm",
    features: ["Panel AI Control", "Wyświetlacz elektroniczny"],
    energyClass: "A",
    price: {
      value: 3999,
      currency: "zł",
      installment: { value: 100, period: 40 },
      validFrom: new Date("2024-01-01"),
      validTo: new Date("2024-12-31"),
    },
  },
];

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  await Product.insertMany(testProducts);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(3);
    expect(response.body.hasMore).toBe(false);
  });

  it("should filter by capacity", async () => {
    const response = await request(app).get("/api/products?capacity=9");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0].code).toBe("TEST001");
  });

  it("should filter by energy class", async () => {
    const response = await request(app).get("/api/products?energyClass=A");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
  });

  it("should filter by feature", async () => {
    const response = await request(app).get(
      "/api/products?feature=Panel AI Control"
    );

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
  });

  it("should search by product code", async () => {
    const response = await request(app).get("/api/products?query=TEST002");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0].code).toBe("TEST002");
  });

  it("should sort by price ascending", async () => {
    const response = await request(app).get("/api/products?sort=price");

    expect(response.status).toBe(200);
    expect(response.body.products[0].price.value).toBe(1999);
    expect(response.body.products[2].price.value).toBe(3999);
  });

  it("should sort by capacity ascending", async () => {
    const response = await request(app).get("/api/products?sort=capacity");

    expect(response.status).toBe(200);
    expect(response.body.products[0].capacity).toBe(8);
    expect(response.body.products[2].capacity).toBe(10.5);
  });

  it("should paginate results", async () => {
    const response = await request(app).get("/api/products?page=1&limit=2");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.hasMore).toBe(true);
    expect(response.body.nextPage).toBe(2);
  });

  it("should return empty array for non-matching filters", async () => {
    const response = await request(app).get(
      "/api/products?capacity=8&energyClass=A"
    );

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(0);
  });
});
