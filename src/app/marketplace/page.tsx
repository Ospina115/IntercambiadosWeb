import type { Metadata } from "next";
import MarketplaceRoute from "@/components/MarketplaceRoute";

export const metadata: Metadata = {
  title: "Marketplace | INTERCAMBIADOS",
  description:
    "Explora prendas, bolsos, gafas y accesorios disponibles para comprar o intercambiar.",
};

export default function MarketplacePage() {
  return <MarketplaceRoute />;
}
