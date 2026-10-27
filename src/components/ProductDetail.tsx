"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import ExchangeModal from "@/components/ExchangeModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getUsers } from "@/services/users";
import { getProducts } from "@/services/products";
import { createExchange, getExchanges } from "@/services/exchanges";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import type { Exchange } from "@/types/exchange";
import type { Product } from "@/types/product";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ProductDetail({
  id,
  initialProduct,
}: {
  id: string;
  initialProduct?: Product;
}) {
  const [toast, setToast] = useState("");
  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [publishedProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const [, setSavedExchanges] = usePersistentState<Exchange[]>(
    storageKeys.exchanges,
    [],
  );
  const product =
    getProducts(publishedProducts).find((item) => item.id === id) ??
    initialProduct;

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function finishExchange(offer: string | null) {
    if (!product || !offer || activeUserId === product.ownerId) return;
    const exchange = createExchange(
      product.id,
      activeUserId,
      product.ownerId,
      offer,
    );
    setSavedExchanges((current) => [...getExchanges(current), exchange]);
    setExchangeOpen(false);
    setToast("✦ Propuesta guardada. Puedes seguirla en Mis intercambios.");
  }

  if (!product) {
    return (
      <>
        <Navbar showToast={setToast} />
        <main className="account-page">
          <div className="account-empty">
            <h1>Producto no encontrado</h1>
            <p>La publicación no existe o ya no está guardada en este navegador.</p>
            <Link href="/marketplace" className="black-button">
              Volver al marketplace <b>→</b>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const category = categories.find((item) => item.id === product.category);
  const owner = getUsers().find((user) => user.id === product.ownerId);
  const isOwner = activeUserId === product.ownerId;

  return (
    <>
      <Navbar showToast={setToast} />
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
              unoptimized={product.imageUrl.startsWith("data:")}
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
              disabled={isOwner}
            >
              {isOwner ? "Es tu publicación" : "Proponer intercambio"}{" "}
              {!isOwner && <b>→</b>}
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
