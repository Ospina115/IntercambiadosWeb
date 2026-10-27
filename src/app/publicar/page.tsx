import type { Metadata } from "next";
import PublishProductPage from "@/components/PublishProductPage";

export const metadata: Metadata = {
  title: "Publicar producto | INTERCAMBIADOS",
  description: "Publica una prenda o accesorio en el marketplace.",
};

export default function PublishRoute() {
  return <PublishProductPage />;
}
