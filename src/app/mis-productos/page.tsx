import type { Metadata } from "next";
import MyProductsPage from "@/components/MyProductsPage";

export const metadata: Metadata = {
  title: "Mis productos | INTERCAMBIADOS",
  description: "Administra tus publicaciones del marketplace.",
};

export default function MyProductsRoute() {
  return <MyProductsPage />;
}
