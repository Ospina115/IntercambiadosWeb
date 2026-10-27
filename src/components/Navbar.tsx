"use client";

import Link from "next/link";

export default function Navbar({
  showToast,
  activeSection = "inicio",
}: {
  showToast: (message: string) => void;
  activeSection?: "inicio" | "marketplace";
}) {
  return (
    <header className="navbar">
      <Link href="/" className="logo">
        INTERCAMBIADOS<span>✦</span>
      </Link>
      <nav aria-label="Navegación principal">
        <Link href={activeSection === "inicio" ? "#inicio" : "/"}>Inicio</Link>
        <Link
          href={activeSection === "inicio" ? "#explorar" : "/marketplace"}
        >
          Explorar
        </Link>
        <Link href={activeSection === "inicio" ? "#intercambiar" : "/#intercambiar"}>
          Intercambiar
        </Link>
        <Link href={activeSection === "inicio" ? "#marcas" : "/#marcas"}>
          Para marcas
        </Link>
      </nav>
      <div className="nav-actions">
        <button
          type="button"
          aria-label="Ver favoritos"
          onClick={() => showToast("♡ Tus favoritos están guardados en esta sesión")}
        >
          ♡
        </button>
        <button
          type="button"
          className="profile-button"
          aria-label="Ver perfil"
          onClick={() =>
            showToast("✦ Tu perfil estará disponible próximamente")
          }
        >
          ◯
        </button>
      </div>
    </header>
  );
}
