"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import { getExchanges, updateExchangeStatus } from "@/services/exchanges";
import { getAllProducts } from "@/services/products";
import { getUsers } from "@/services/users";
import type { Exchange, ExchangeStatus } from "@/types/exchange";
import type { Product } from "@/types/product";
import { useToast } from "@/context/NotificationContext";

const statusLabels: Record<ExchangeStatus, string> = {
  pending: "Pendiente",
  accepted: "Aceptado",
  rejected: "Rechazado",
};

export default function ExchangesPage() {
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [savedExchanges, setSavedExchanges] = usePersistentState<Exchange[]>(
    storageKeys.exchanges,
    [],
  );
  const [publishedProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const { notify } = useToast();
  const allExchanges = getExchanges(savedExchanges);
  const userExchanges = allExchanges.filter(
    (exchange) =>
      exchange.senderId === activeUserId ||
      exchange.receiverId === activeUserId,
  );
  const products = getAllProducts(publishedProducts);
  const users = getUsers();

  function updateStatus(exchangeId: string, status: ExchangeStatus) {
    setSavedExchanges((current) =>
      updateExchangeStatus(current, exchangeId, status),
    );
    notify(`Intercambio ${statusLabels[status].toLocaleLowerCase("es")}.`);
  }

  return (
    <>
      <Navbar />
      <main className="account-page">
        <div className="account-page-heading">
          <span>PROPUESTAS</span>
          <h1>Mis intercambios</h1>
          <p>Revisa las propuestas enviadas y recibidas por tu usuario activo.</p>
        </div>
        {userExchanges.length ? (
          <div className="exchange-list">
            {userExchanges.map((exchange) => {
              const product = products.find(
                (item) => item.id === exchange.productId,
              );
              const sender = users.find(
                (user) => user.id === exchange.senderId,
              );
              const receiver = users.find(
                (user) => user.id === exchange.receiverId,
              );
              const isIncoming = exchange.receiverId === activeUserId;
              return (
                <article className="exchange-card" key={exchange.id}>
                  <div className="exchange-card-main">
                    <span
                      className={`exchange-status exchange-status-${exchange.status}`}
                    >
                      {statusLabels[exchange.status]}
                    </span>
                    <h2>{product?.title ?? "Producto no disponible"}</h2>
                    <p>
                      {isIncoming ? "Te ofrecen" : "Ofreciste"}:{" "}
                      <strong>{exchange.offeredItem}</strong>
                    </p>
                    <p>
                      {isIncoming ? "De" : "Para"}:{" "}
                      {isIncoming ? sender?.name : receiver?.name}
                    </p>
                  </div>
                  <div className="exchange-card-actions">
                    {isIncoming && exchange.status === "pending" && (
                      <>
                        <button
                          type="button"
                          className="exchange-accept"
                          onClick={() =>
                            updateStatus(exchange.id, "accepted")
                          }
                        >
                          Aceptar
                        </button>
                        <button
                          type="button"
                          className="exchange-reject"
                          onClick={() =>
                            updateStatus(exchange.id, "rejected")
                          }
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {product && (
                      <Link href={`/producto/${product.id}`}>
                        Ver producto →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="account-empty">
            <p>No tienes propuestas de intercambio para mostrar.</p>
            <Link href="/marketplace" className="black-button">
              Explorar productos <b>→</b>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
