import type { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage";

export const metadata: Metadata = {
  title: "Mi perfil | INTERCAMBIADOS",
  description: "Consulta tu perfil y actualiza tu foto de usuario.",
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
