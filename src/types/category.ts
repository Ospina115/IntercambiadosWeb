import type { ProductCategory } from "@/types/product";

export interface Category {
  id: ProductCategory;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export type CategoryFilter = ProductCategory | "all";
