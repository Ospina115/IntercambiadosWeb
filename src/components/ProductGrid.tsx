import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProductGrid({
  products,
  favoriteIds,
  onToggleFavorite,
  onExchange,
}: {
  products: Product[];
  favoriteIds: string[];
  onToggleFavorite: (productId: string) => void;
  onExchange: (product: Product) => void;
}) {
  if (products.length === 0) {
    return (
      <p className="empty-products">
        No encontramos productos que coincidan con tu búsqueda.
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onExchange={onExchange}
        />
      ))}
    </div>
  );
}
