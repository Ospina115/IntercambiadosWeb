"use client";

import { useEffect, useState } from "react";
import ExchangeModal from "@/components/ExchangeModal";
import Footer from "@/components/Footer";
import Marketplace from "@/components/Marketplace";
import Navbar from "@/components/Navbar";
import { getExchanges, createExchange } from "@/services/exchanges";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import type { Exchange } from "@/types/exchange";
import type { Product } from "@/types/product";

export default function MarketplaceRoute() {
  const [exchangeProduct, setExchangeProduct] = useState<Product | null>(null);
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [, setSavedExchanges] = usePersistentState<Exchange[]>(
    storageKeys.exchanges,
    [],
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function finishExchange(offer: string | null) {
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
  }

  function openExchange(product: Product) {
    if (product.ownerId === activeUserId) {
      setToast("No puedes proponer un intercambio por tu propio producto.");
      return;
    }
    setExchangeProduct(product);
  }

  return (
    <>
      <Navbar showToast={setToast} />
      <main>
        <Marketplace
          showHeader={false}
          onExchange={openExchange}
          showToast={setToast}
        />
      </main>
      <Footer />
      <ExchangeModal
        product={exchangeProduct?.title ?? null}
        onClose={() => setExchangeProduct(null)}
        onFinish={finishExchange}
      />
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
