"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import { getExchanges } from "@/services/exchanges";
import { getInitialFavoriteProductIds } from "@/services/favorites";
import { getAllProducts } from "@/services/products";
import { getUsers } from "@/services/users";
import type { Exchange } from "@/types/exchange";
import type { Product } from "@/types/product";

export default function DashboardPage() {
  const [publishedProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const [savedExchanges] = usePersistentState<Exchange[]>(
    storageKeys.exchanges,
    [],
  );
  const [favoriteIds] = usePersistentState(
    storageKeys.favorites,
    getInitialFavoriteProductIds(),
  );
  const metrics = [
    { label: "Productos", value: getAllProducts(publishedProducts).length },
    { label: "Usuarios", value: getUsers().length },
    { label: "Intercambios", value: getExchanges(savedExchanges).length },
    { label: "Favoritos", value: favoriteIds.length },
  ];

  return (
    <>
      <Navbar />
      <main className="account-page">
        <div className="account-page-heading">
          <span>RESUMEN DE DATOS LOCALES</span>
          <h1>Dashboard</h1>
          <p>Métricas calculadas desde los datos de prueba y este navegador.</p>
        </div>
        <div className="dashboard-grid">
          {metrics.map((metric) => (
            <div className="dashboard-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
