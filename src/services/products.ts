import { additionalProducts } from "@/data/additionalProducts";
import { products as seedProducts } from "@/data/products";
import type {
  Product,
  ProductCategory,
  ProductCondition,
} from "@/types/product";

export type ProductSortField = "createdAt" | "price" | "title";
export type SortOrder = "asc" | "desc";

export interface ProductQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: ProductSortField;
  order?: SortOrder;
  category?: ProductCategory;
  condition?: ProductCondition;
  ownerId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function getAllProducts(userProducts: Product[] = []): Product[] {
  return [...seedProducts, ...additionalProducts, ...userProducts];
}

export function getFeaturedProducts(userProducts: Product[] = []): Product[] {
  return getAllProducts(userProducts).filter((product) => product.featured);
}

export function getProducts(
  options: ProductQueryOptions = {},
  userProducts: Product[] = [],
): ProductPage {
  const {
    page: requestedPage = 1,
    limit: requestedLimit = 12,
    sortBy = "createdAt",
    order = "desc",
    category,
    condition,
    ownerId,
    minPrice,
    maxPrice,
    search,
  } = options;
  const page = Math.max(1, Math.floor(requestedPage));
  const limit = Math.max(1, Math.floor(requestedLimit));
  const query = search?.trim().toLocaleLowerCase("es");
  const filtered = getAllProducts(userProducts).filter((product) => {
    if (category && product.category !== category) return false;
    if (condition && product.condition !== condition) return false;
    if (ownerId && product.ownerId !== ownerId) return false;
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (
      query &&
      !`${product.title} ${product.description} ${product.category} ${product.condition}`
        .toLocaleLowerCase("es")
        .includes(query)
    ) {
      return false;
    }
    return true;
  });

  const direction = order === "asc" ? 1 : -1;
  filtered.sort((left, right) => {
    if (sortBy === "price") {
      return (left.price - right.price) * direction;
    }
    if (sortBy === "title") {
      return left.title.localeCompare(right.title, "es") * direction;
    }
    const leftDate = left.createdAt
      ? Date.parse(left.createdAt)
      : Number(left.id) || 0;
    const rightDate = right.createdAt
      ? Date.parse(right.createdAt)
      : Number(right.id) || 0;
    return (leftDate - rightDate) * direction;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const resolvedPage = totalPages === 0 ? 1 : Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (resolvedPage - 1) * limit,
    resolvedPage * limit,
  );

  return { items: pageItems, total, page: resolvedPage, limit, totalPages };
}

export function getProductById(
  id: string,
  userProducts: Product[] = [],
): Product | undefined {
  return getAllProducts(userProducts).find((product) => product.id === id);
}

export function getProductsByCategory(
  category: ProductCategory,
  userProducts: Product[] = [],
): Product[] {
  return getAllProducts(userProducts).filter(
    (product) => product.category === category,
  );
}
