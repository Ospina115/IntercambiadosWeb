"use client";

import { useEffect, useState } from "react";
import ExchangeModal from "@/components/ExchangeModal";
import Footer from "@/components/Footer";
import Marketplace from "@/components/Marketplace";
import Navbar from "@/components/Navbar";

export default function MarketplaceRoute() {
  const [exchangeProduct, setExchangeProduct] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

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
      <Navbar showToast={setToast} activeSection="marketplace" />
      <main>
        <Marketplace
          showHeader={false}
          onExchange={(product) => setExchangeProduct(product.title)}
          showToast={setToast}
        />
      </main>
      <Footer />
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
