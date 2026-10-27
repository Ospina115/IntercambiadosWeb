"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import { getInitialFavoriteProductIds } from "@/services/favorites";
import { getUsers } from "@/services/users";
import type { Product } from "@/types/product";
import { useToast } from "@/context/NotificationContext";

export default function MyProductsPage() {
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [publishedProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const [favoriteIds, setFavoriteIds] = usePersistentState(
    storageKeys.favorites,
    getInitialFavoriteProductIds(),
  );
  const { notify } = useToast();
  const user = getUsers().find((item) => item.id === activeUserId);
  const products = publishedProducts.filter(
    (product) => product.ownerId === activeUserId,
  );

  return (
    <>
      <Navbar />
      <main className="account-page">
        <div className="account-page-heading">
          <span>MI ESPACIO</span>
          <h1>Mis productos</h1>
          <p>Publicaciones de {user?.name ?? "tu usuario activo"}.</p>
        </div>
        {products.length > 0 ? (
          <ProductGrid
            products={products}
            favoriteIds={favoriteIds}
            onToggleFavorite={(id) =>
              setFavoriteIds((current) =>
                current.includes(id)
                  ? current.filter((favoriteId) => favoriteId !== id)
                  : [...current, id],
              )
            }
            onExchange={(product) =>
              notify(`No puedes proponer un intercambio por "${product.title}".`)
            }
          />
        ) : (
          <div className="account-empty">
            <p>Aún no has publicado productos.</p>
            <Link href="/publicar" className="black-button">
              Publicar un producto <b>→</b>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
