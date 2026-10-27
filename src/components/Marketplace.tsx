"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { favoriteProductIds } from "@/data/favorites";
import { getProducts } from "@/services/products";
import type { CategoryFilter } from "@/types/category";
import type { Product } from "@/types/product";
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
  const [favoriteIds, setFavoriteIds] = useState(favoriteProductIds);
  const selectedCategory = onCategoryChange ? category : localCategory;
  const products = items ?? getProducts();

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const searchableText =
        `${product.title} ${product.description} ${product.category} ${product.condition}`.toLocaleLowerCase(
          "es",
        );
      return matchesCategory && searchableText.includes(query);
    });
  }, [products, search, selectedCategory]);

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
            onChange={(event) => setSearch(event.target.value)}
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
            onClick={() => changeCategory(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <ProductGrid
        products={visibleProducts}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onExchange={onExchange}
      />
      {showHeader && (
        <div className="more-button">
          <Link href="/marketplace">Ver todos los productos →</Link>
        </div>
      )}
    </section>
  );
}
