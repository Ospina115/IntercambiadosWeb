"use client";

import { useState } from "react";
import Brands from "@/components/Brands";
import CategoryGrid from "@/components/CategoryGrid";
import Concept from "@/components/Concept";
import ExchangeModal from "@/components/ExchangeModal";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import MovingBanner from "@/components/MovingBanner";
import Navbar from "@/components/Navbar";
import SwapSection from "@/components/SwapSection";
import {
  getAllProducts,
  getFeaturedProducts,
} from "@/services/products";
import { createExchange, getExchanges } from "@/services/exchanges";
import type { CategoryFilter } from "@/types/category";
import type { Product } from "@/types/product";
import type { Exchange } from "@/types/exchange";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import { useToast } from "@/context/NotificationContext";

export default function IntercambiadosPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [exchangeProduct, setExchangeProduct] = useState<Product | null>(null);
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [, setSavedExchanges] = usePersistentState<Exchange[]>(
    storageKeys.exchanges,
    [],
  );
  const { notify } = useToast();

  function selectCategory(nextCategory: CategoryFilter) {
    setCategory(nextCategory);
    document.getElementById("explorar")?.scrollIntoView({ behavior: "smooth" });
  }

  function openExchange(product: Product) {
    if (product.ownerId === activeUserId) {
      notify("No puedes proponer un intercambio por tu propio producto.");
      return;
    }
    setExchangeProduct(product);
  }

  function finishExchange(offer: string | null) {
    if (!exchangeProduct || !offer) {
      return;
    }
    const exchange = createExchange(
      exchangeProduct.id,
      activeUserId,
      exchangeProduct.ownerId,
      offer,
    );
    setSavedExchanges((current) => [...getExchanges(current), exchange]);
    setExchangeProduct(null);
    notify("✦ Propuesta guardada. Puedes seguirla en Mis intercambios.");
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MovingBanner />
        <CategoryGrid onSelect={selectCategory} />
        <Marketplace
          items={getFeaturedProducts()}
          category={category}
          onCategoryChange={setCategory}
          onExchange={openExchange}
          showToast={notify}
        />
        <Concept
          onExchange={() => {
            const availableProduct = getAllProducts().find(
              (product) => product.ownerId !== activeUserId,
            );
            if (availableProduct) openExchange(availableProduct);
          }}
        />
        <SwapSection
          onExchange={() => {
            const availableProduct = getAllProducts().find(
              (product) => product.ownerId !== activeUserId,
            );
            if (availableProduct) openExchange(availableProduct);
          }}
        />
        <Brands showToast={notify} />
        <Footer />
      </main>
      <ExchangeModal
        product={exchangeProduct?.title ?? null}
        onClose={() => setExchangeProduct(null)}
        onFinish={finishExchange}
      />
    </>
  );
}
