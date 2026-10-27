"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ExchangeModal from "@/components/ExchangeModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import { getProducts } from "@/services/products";
import { getInitialFavoriteProductIds } from "@/services/favorites";
import { createExchange, getExchanges } from "@/services/exchanges";
import type { Exchange } from "@/types/exchange";
import type { Product } from "@/types/product";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = usePersistentState(
    storageKeys.favorites,
    getInitialFavoriteProductIds(),
  );
  const [publishedProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [, setSavedExchanges] = usePersistentState<Exchange[]>(
    storageKeys.exchanges,
    [],
  );
  const [exchangeProduct, setExchangeProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const products = getProducts(publishedProducts).filter((product) =>
    favoriteIds.includes(product.id),
  );

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return (
    <>
      <Navbar showToast={setToast} />
      <main className="account-page">
        <div className="account-page-heading">
          <span>GUARDADOS</span>
          <h1>♡ Mis favoritos</h1>
          <p>Las prendas y accesorios que guardaste para volver a ver.</p>
        </div>
        {products.length > 0 ? (
          <ProductGrid
            products={products}
            favoriteIds={favoriteIds}
            onToggleFavorite={(id) =>
              setFavoriteIds((current) =>
                current.filter((favoriteId) => favoriteId !== id),
              )
            }
            onExchange={(product) => {
              if (product.ownerId === activeUserId) {
                setToast("No puedes proponer un intercambio por tu propio producto.");
                return;
              }
              setExchangeProduct(product);
            }}
          />
        ) : (
          <div className="account-empty">
            <p>Aún no has guardado productos.</p>
            <Link href="/marketplace" className="black-button">
              Explorar marketplace <b>→</b>
            </Link>
          </div>
        )}
      </main>
      <Footer />
      <ExchangeModal
        product={exchangeProduct?.title ?? null}
        onClose={() => setExchangeProduct(null)}
        onFinish={(offer) => {
          if (!exchangeProduct || !offer) return;
          const exchange = createExchange(
            exchangeProduct.id,
            activeUserId,
            exchangeProduct.ownerId,
            offer,
          );
          setSavedExchanges((current) => [...getExchanges(current), exchange]);
          setExchangeProduct(null);
          setToast("✦ Propuesta guardada. Puedes seguirla en Mis intercambios.");
        }}
      />
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
