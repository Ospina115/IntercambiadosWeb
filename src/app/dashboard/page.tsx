import type { Metadata } from "next";
import DashboardPage from "@/components/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard | INTERCAMBIADOS",
  description: "Resumen de métricas del marketplace local.",
};

export default function DashboardRoute() {
  return <DashboardPage />;
}
