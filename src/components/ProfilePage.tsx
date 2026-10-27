"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSession } from "@/context/SessionContext";
import { useToast } from "@/context/NotificationContext";
import { compressImage } from "@/lib/image";

export default function ProfilePage() {
  const { currentUser, getProfileImage, setProfileImage } = useSession();
  const { notify } = useToast();
  const [error, setError] = useState("");

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    try {
      setProfileImage(await compressImage(file));
      notify("Foto de perfil actualizada.");
    } catch (imageError) {
      setError(
        imageError instanceof Error
          ? imageError.message
          : "No se pudo actualizar la imagen.",
      );
    }
    event.target.value = "";
  }

  return (
    <>
      <Navbar />
      <main className="account-page profile-page">
        <div className="account-page-heading">
          <span>MI CUENTA DE PRUEBA</span>
          <h1>Perfil</h1>
          <p>La foto se guarda en este navegador para {currentUser.name}.</p>
        </div>
        <section className="profile-card">
          <div className="profile-avatar">
            <Image
              src={getProfileImage()}
              alt={`Foto de perfil de ${currentUser.name}`}
              fill
              sizes="144px"
              unoptimized={getProfileImage().startsWith("data:")}
            />
          </div>
          <div className="profile-details">
            <h2>{currentUser.name}</h2>
            <p>{currentUser.city}</p>
            <label className="black-button profile-upload">
              Cambiar foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            {getProfileImage() !== currentUser.avatar && (
              <button
                type="button"
                className="profile-reset"
                onClick={() => {
                  setProfileImage(null);
                  notify("Se restauró la foto de perfil original.");
                }}
              >
                Restaurar foto original
              </button>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
