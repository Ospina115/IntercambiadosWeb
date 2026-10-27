import type { Metadata } from "next";
import FavoritesPage from "@/components/FavoritesPage";

export const metadata: Metadata = {
  title: "Mis favoritos | INTERCAMBIADOS",
  description: "Consulta las prendas y accesorios que guardaste.",
};

export default function FavoritesRoute() {
  return <FavoritesPage />;
}
