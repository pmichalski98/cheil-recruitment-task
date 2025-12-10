import { z } from "zod";
import { Capacity, CAPACITIES, ENERGY_CLASSES, FEATURES } from "shared";

const capacitiesSet = new Set<number>(CAPACITIES);

const isValidCapacity = (val: number): val is Capacity =>
  capacitiesSet.has(val);

const emptyToUndefined = <T>(val: T | "") => (val === "" ? undefined : val);

export const getProductsSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((val) => emptyToUndefined(val)),
  capacity: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || isValidCapacity(val), {
      message: "Invalid capacity",
    }),
  energyClass: z
    .enum(ENERGY_CLASSES)
    .optional()
    .or(z.literal(""))
    .transform(emptyToUndefined),
  feature: z
    .enum(FEATURES)
    .optional()
    .or(z.literal(""))
    .transform(emptyToUndefined),
  sort: z
    .enum(["price", "capacity"])
    .optional()
    .or(z.literal(""))
    .transform(emptyToUndefined),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
});

export type GetProductsQuery = z.infer<typeof getProductsSchema>;
