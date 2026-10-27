"use client";

import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/services/users";
import { useSession } from "@/context/SessionContext";
import { useToast } from "@/context/NotificationContext";

export default function Navbar() {
  const { currentUser, setCurrentUser, getProfileImage } = useSession();
  const { notify } = useToast();

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
            value={currentUser.id}
            onChange={(event) => {
              const nextUserId = event.target.value;
              const nextUser = getUsers().find((user) => user.id === nextUserId);
              if (nextUser) {
                setCurrentUser(nextUser);
                notify(`Sesión de prueba: ${nextUser.name}`);
              }
            }}
            aria-label={`Usuario activo: ${currentUser.name}`}
          >
            {getUsers().map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <Link
          href="/perfil"
          className="profile-button"
          aria-label={`Perfil de ${currentUser.name}`}
          title={`Perfil de ${currentUser.name}`}
        >
          <Image
            src={getProfileImage()}
            alt=""
            fill
            sizes="36px"
            unoptimized={getProfileImage().startsWith("data:")}
          />
        </Link>
      </div>
    </header>
  );
}
