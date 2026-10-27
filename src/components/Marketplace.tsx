"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { storageKeys } from "@/lib/storageKeys";
import { usePersistentState } from "@/hooks/usePersistentState";
import { getInitialFavoriteProductIds } from "@/services/favorites";
import { getProducts } from "@/services/products";
import type { CategoryFilter } from "@/types/category";
import { getUsers } from "@/services/users";
import {
  type Product,
  type ProductCondition,
} from "@/types/product";
import ProductGrid from "@/components/ProductGrid";

const filters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Todo" },
  ...categories.map(({ id, label }) => ({ id, label })),
];

export default function Marketplace({
  category = "all",
  items,
  onCategoryChange,
  onExchange,
  showToast,
  showHeader = true,
}: {
  category?: CategoryFilter;
  items?: Product[];
  onCategoryChange?: (category: CategoryFilter) => void;
  onExchange: (product: Product) => void;
  showToast: (message: string) => void;
  showHeader?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [localCategory, setLocalCategory] =
    useState<CategoryFilter>(category);
  const [condition, setCondition] = useState<ProductCondition | "">("");
  const [ownerId, setOwnerId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const [favoriteIds, setFavoriteIds] = usePersistentState(
    storageKeys.favorites,
    getInitialFavoriteProductIds(),
  );
  const [publishedProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const selectedCategory = onCategoryChange ? category : localCategory;

  const { products, total, totalPages } = useMemo(() => {
    if (!items) {
      const result = getProducts(
        {
          page,
          limit: 12,
          search,
          category: selectedCategory === "all" ? undefined : selectedCategory,
          condition: condition || undefined,
          ownerId: ownerId || undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          sortBy: sortBy.split(":")[0] as "createdAt" | "price" | "title",
          order: sortBy.endsWith(":asc") ? "asc" : "desc",
        },
        publishedProducts,
      );
      return {
        products: result.items,
        total: result.total,
        totalPages: result.totalPages,
      };
    }

    const baseProducts = [
      ...items,
      ...publishedProducts.filter((product) => product.featured),
    ];
    const query = search.trim().toLocaleLowerCase("es");
    const filtered = baseProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const searchableText =
        `${product.title} ${product.description} ${product.category} ${product.condition}`.toLocaleLowerCase("es");
      return (
        matchesCategory &&
        (!condition || product.condition === condition) &&
        (!ownerId || product.ownerId === ownerId) &&
        (!minPrice || product.price >= Number(minPrice)) &&
        (!maxPrice || product.price <= Number(maxPrice)) &&
        searchableText.includes(query)
      );
    });
    return { products: filtered, total: filtered.length, totalPages: 1 };
  }, [
    condition,
    items,
    maxPrice,
    minPrice,
    ownerId,
    page,
    publishedProducts,
    search,
    selectedCategory,
    sortBy,
  ]);

  function resetPage() {
    setPage(1);
  }

  function changeCategory(nextCategory: CategoryFilter) {
    setLocalCategory(nextCategory);
    onCategoryChange?.(nextCategory);
  }

  function toggleFavorite(productId: string) {
    const wasFavorite = favoriteIds.includes(productId);
    setFavoriteIds((current) =>
      wasFavorite
        ? current.filter((favoriteId) => favoriteId !== productId)
        : [...current, productId],
    );
    if (!wasFavorite) {
      showToast("♡ Producto guardado en favoritos");
    }
  }

  return (
    <section
      className={`marketplace${showHeader ? "" : " marketplace-route"}`}
      id="explorar"
    >
      <div className="marketplace-header">
        <div>
          <span>INTERCAMBIADOS MARKET</span>
          <h2>
            Cosas que merecen <i>otra oportunidad.</i>
          </h2>
        </div>
        <label className="search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPage();
            }}
            placeholder="Busca una prenda..."
            aria-label="Buscar productos"
          />
        </label>
      </div>
      <div className="filter-row" aria-label="Filtrar por categoría">
        {filters.map((filter) => (
          <button
            type="button"
            className={`filter${selectedCategory === filter.id ? " active" : ""}`}
            key={filter.id}
            aria-pressed={selectedCategory === filter.id}
            onClick={() => {
              changeCategory(filter.id);
              resetPage();
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="marketplace-controls">
        <label>
          Estado
          <select
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value as ProductCondition | "");
              resetPage();
            }}
          >
            <option value="">Todos los estados</option>
            <option value="Como nuevo">Como nuevo</option>
            <option value="Excelente estado">Excelente estado</option>
            <option value="Muy buen estado">Muy buen estado</option>
            <option value="Buen estado">Buen estado</option>
          </select>
        </label>
        <label>
          Usuario
          <select
            value={ownerId}
            onChange={(event) => {
              setOwnerId(event.target.value);
              resetPage();
            }}
          >
            <option value="">Todos los usuarios</option>
            {getUsers().map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Precio mínimo
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => {
              setMinPrice(event.target.value);
              resetPage();
            }}
          />
        </label>
        <label>
          Precio máximo
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value);
              resetPage();
            }}
          />
        </label>
        <label className="sort-control">
          Ordenar por
          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              resetPage();
            }}
          >
            <option value="createdAt:desc">Más recientes</option>
            <option value="price:asc">Precio: menor a mayor</option>
            <option value="price:desc">Precio: mayor a menor</option>
            <option value="title:asc">Nombre: A-Z</option>
            <option value="title:desc">Nombre: Z-A</option>
          </select>
        </label>
      </div>
      <p className="product-result-count">{total} productos</p>
      <ProductGrid
        products={products}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onExchange={onExchange}
      />
      {!items && totalPages > 1 && (
        <nav className="pagination" aria-label="Paginación del marketplace">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            « Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                className={page === pageNumber ? "active" : ""}
                aria-current={page === pageNumber ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page === totalPages}
          >
            Siguiente »
          </button>
        </nav>
      )}
      {showHeader && (
        <div className="more-button">
          <Link href="/marketplace">Ver todos los productos →</Link>
        </div>
      )}
    </section>
  );
}
