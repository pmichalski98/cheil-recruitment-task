import { model, Schema } from "mongoose";
import { CAPACITIES, ENERGY_CLASSES, FEATURES, IProduct } from "shared";

const productSchema = new Schema<IProduct>(
  {
    image: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    capacity: { type: Number, required: true, enum: CAPACITIES },
    dimensions: { type: String, required: true },
    features: {
      type: [String],
      required: true,
      enum: FEATURES,
    },
    energyClass: { type: String, required: true, enum: ENERGY_CLASSES },
    price: {
      value: { type: Number, required: true },
      currency: { type: String, required: true },
      installment: {
        value: { type: Number, required: true },
        period: { type: Number, required: true },
      },
      validFrom: { type: Date, required: true },
      validTo: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
