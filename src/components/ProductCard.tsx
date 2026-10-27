import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import type { Product } from "@/types/product";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onExchange,
}: {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onExchange: (product: Product) => void;
}) {
  const category = categories.find((item) => item.id === product.category);

  return (
    <article className="product">
      <div className="product-image">
        <Link
          href={`/producto/${product.id}`}
          className="product-image-link"
          aria-label={`Ver detalles de ${product.title}`}
        >
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
            unoptimized={product.imageUrl.startsWith("data:")}
          />
        </Link>
        <button
          type="button"
          className={`heart${isFavorite ? " liked" : ""}`}
          aria-label={
            isFavorite
              ? `Quitar ${product.title} de favoritos`
              : `Guardar ${product.title} en favoritos`
          }
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(product.id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        {product.featured && <span className="tag tag-pink">DESTACADO</span>}
      </div>
      <Link href={`/producto/${product.id}`} className="product-info">
        <div>
          <h3>{product.title}</h3>
          <p>
            {category?.label} · {product.condition}
          </p>
        </div>
        <strong>{currency.format(product.price)}</strong>
      </Link>
      <button
        type="button"
        className="swap-button"
        onClick={() => onExchange(product)}
      >
        Intercambiar <span>→</span>
      </button>
    </article>
  );
}
