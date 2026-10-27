"use client";

import Link from "next/link";
import { getUsers } from "@/services/users";
import { storageKeys } from "@/lib/storageKeys";
import { usePersistentState } from "@/hooks/usePersistentState";

export default function Navbar({
  showToast,
}: {
  showToast: (message: string) => void;
}) {
  const [activeUserId, setActiveUserId] = usePersistentState(
    storageKeys.activeUser,
    "user-1",
  );
  const activeUser = getUsers().find((user) => user.id === activeUserId);

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        INTERCAMBIADOS<span>✦</span>
      </Link>
      <nav aria-label="Navegación principal">
        <Link href="/">Inicio</Link>
        <Link href="/marketplace">Explorar</Link>
        <Link href="/#intercambiar">Intercambiar</Link>
        <Link href="/#marcas">Para marcas</Link>
        <details className="nav-more">
          <summary>Mi espacio</summary>
          <div className="nav-more-menu">
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/favoritos">Favoritos</Link>
            <Link href="/publicar">Publicar</Link>
            <Link href="/mis-productos">Mis productos</Link>
            <Link href="/intercambios">Intercambios</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </details>
      </nav>
      <div className="nav-actions">
        <label className="active-user-select">
          <span>Usuario</span>
          <select
            value={activeUserId}
            onChange={(event) => {
              const nextUserId = event.target.value;
              setActiveUserId(nextUserId);
              const nextUser = getUsers().find((user) => user.id === nextUserId);
              if (nextUser) {
                showToast(`Sesión de prueba: ${nextUser.name}`);
              }
            }}
            aria-label={`Usuario activo: ${activeUser?.name ?? "seleccionar"}`}
          >
            {getUsers().map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
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
