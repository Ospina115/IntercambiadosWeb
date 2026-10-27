import type { Metadata } from "next";
import ExchangesPage from "@/components/ExchangesPage";

export const metadata: Metadata = {
  title: "Mis intercambios | INTERCAMBIADOS",
  description: "Revisa las propuestas de intercambio enviadas y recibidas.",
};

export default function ExchangesRoute() {
  return <ExchangesPage />;
}
