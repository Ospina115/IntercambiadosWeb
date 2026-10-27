import { additionalProducts } from "@/data/additionalProducts";
import { products as seedProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

export function getProducts(userProducts: Product[] = []): Product[] {
  return [...seedProducts, ...additionalProducts, ...userProducts];
}

export function getFeaturedProducts(userProducts: Product[] = []): Product[] {
  return getProducts(userProducts).filter((product) => product.featured);
}

export function getProductById(
  id: string,
  userProducts: Product[] = [],
): Product | undefined {
  return getProducts(userProducts).find((product) => product.id === id);
}

export function getProductsByCategory(
  category: ProductCategory,
  userProducts: Product[] = [],
): Product[] {
  return getProducts(userProducts).filter(
    (product) => product.category === category,
  );
}
