"use client";

import { useEffect, useState } from "react";
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
import { getFeaturedProducts } from "@/services/products";
import type { CategoryFilter } from "@/types/category";

export default function IntercambiadosPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [exchangeProduct, setExchangeProduct] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function selectCategory(nextCategory: CategoryFilter) {
    setCategory(nextCategory);
    document.getElementById("explorar")?.scrollIntoView({ behavior: "smooth" });
  }

  function finishExchange(offer: string | null) {
    setExchangeProduct(null);
    setToast(
      offer
        ? `✦ Tu propuesta con "${offer}" está lista para continuar.`
        : "✦ Tu propuesta de intercambio está lista para continuar.",
    );
  }

  return (
    <>
      <Navbar showToast={setToast} />
      <main>
        <Hero showToast={setToast} />
        <MovingBanner />
        <CategoryGrid onSelect={selectCategory} />
        <Marketplace
          items={getFeaturedProducts()}
          category={category}
          onCategoryChange={setCategory}
          onExchange={(product) => setExchangeProduct(product.title)}
          showToast={setToast}
        />
        <Concept onExchange={setExchangeProduct} />
        <SwapSection onExchange={setExchangeProduct} />
        <Brands showToast={setToast} />
        <Footer />
      </main>
      <ExchangeModal
        product={exchangeProduct}
        onClose={() => setExchangeProduct(null)}
        onFinish={finishExchange}
      />
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
