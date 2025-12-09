export const ENERGY_CLASSES = ["A", "B", "C"] as const;
export type EnergyClass = (typeof ENERGY_CLASSES)[number];

export const CAPACITIES = [8, 9, 10.5] as const;
export type Capacity = (typeof CAPACITIES)[number];

export const FEATURES = [
  "Drzwi AddWash™",
  "Panel AI Control",
  "Silnik inwerterowy",
  "Wyświetlacz elektroniczny",
] as const;
export type Feature = (typeof FEATURES)[number];

export interface IProduct {
  image: string;
  code: string;
  name: string;
  color: string;
  capacity: Capacity;
  dimensions: string;
  features: Feature[];
  energyClass: EnergyClass;
  price: {
    value: number;
    currency: string;
    installment: {
      value: number;
      period: number;
    };
    validFrom: Date;
    validTo: Date;
  };
}
