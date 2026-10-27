export const productCategories = [
  "ropa",
  "bolsos",
  "gafas",
  "accesorios",
] as const;

export type ProductCategory = (typeof productCategories)[number];
export type ProductCondition =
  | "Como nuevo"
  | "Excelente estado"
  | "Muy buen estado"
  | "Buen estado";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: number;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  ownerId: string;
  createdAt?: string;
}
