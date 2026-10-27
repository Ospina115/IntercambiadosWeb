"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import ExchangeModal from "@/components/ExchangeModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Product } from "@/types/product";
import type { User } from "@/types/user";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ProductDetail({
  product,
  owner,
}: {
  product: Product;
  owner: User | undefined;
}) {
  const [toast, setToast] = useState("");
  const [exchangeOpen, setExchangeOpen] = useState(false);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function finishExchange(offer: string | null) {
    setExchangeOpen(false);
    setToast(
      offer
        ? `✦ Tu propuesta con "${offer}" está lista para continuar.`
        : "✦ Tu propuesta de intercambio está lista para continuar.",
    );
  }

  const category = categories.find((item) => item.id === product.category);

  return (
    <>
      <Navbar showToast={setToast} activeSection="marketplace" />
      <main className="product-detail-page">
        <div className="product-detail-breadcrumb">
          <Link href="/marketplace">Marketplace</Link>
          <span> / </span>
          <span>{category?.label}</span>
          <span> / </span>
          <span>{product.title}</span>
        </div>
        <section className="product-detail">
          <div className="product-detail-image">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 800px) 90vw, 50vw"
            />
            {product.featured && (
              <span className="tag tag-pink">DESTACADO</span>
            )}
          </div>
          <div className="product-detail-info">
            <span className="product-detail-category">{category?.label}</span>
            <h1>{product.title}</h1>
            <p className="product-detail-price">{currency.format(product.price)}</p>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-condition">
              <strong>Estado</strong>
              <span>{product.condition}</span>
            </div>
            {owner && (
              <div className="product-owner">
                <Image
                  src={owner.avatar}
                  alt=""
                  width={52}
                  height={52}
                  className="product-owner-avatar"
                />
                <div>
                  <strong>{owner.name}</strong>
                  <span>{owner.city}</span>
                </div>
              </div>
            )}
            <button
              type="button"
              className="black-button product-detail-exchange"
              onClick={() => setExchangeOpen(true)}
            >
              Proponer intercambio <b>→</b>
            </button>
            <Link href="/marketplace" className="product-detail-back">
              ← Volver al marketplace
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ExchangeModal
        product={exchangeOpen ? product.title : null}
        onClose={() => setExchangeOpen(false)}
        onFinish={finishExchange}
      />
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
