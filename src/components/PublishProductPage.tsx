"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { categories } from "@/data/categories";
import { getUsers } from "@/services/users";
import { usePersistentState } from "@/hooks/usePersistentState";
import { compressImage } from "@/lib/image";
import { storageKeys } from "@/lib/storageKeys";
import { productCategories, type Product, type ProductCondition } from "@/types/product";

const conditions: ProductCondition[] = [
  "Como nuevo",
  "Excelente estado",
  "Muy buen estado",
  "Buen estado",
];

export default function PublishProductPage() {
  const router = useRouter();
  const [, setProducts] = usePersistentState<Product[]>(
    storageKeys.products,
    [],
  );
  const [activeUserId] = usePersistentState(storageKeys.activeUser, "user-1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<(typeof productCategories)[number]>("ropa");
  const [condition, setCondition] =
    useState<ProductCondition>("Muy buen estado");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [error, setError] = useState("");
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [toast, setToast] = useState("");
  const user = getUsers().find((item) => item.id === activeUserId);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function handleImageChange(file: File | undefined) {
    if (!file) return;
    setError("");
    setIsProcessingImage(true);
    try {
      const compressedImage = await compressImage(file);
      setImageUrl(compressedImage);
      setImageName(file.name);
    } catch (imageError) {
      setError(
        imageError instanceof Error
          ? imageError.message
          : "No se pudo procesar la imagen.",
      );
    } finally {
      setIsProcessingImage(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!imageUrl) {
      setError("Agrega una imagen del producto para poder publicarlo.");
      return;
    }
    if (!user) {
      setError("Selecciona un usuario activo antes de publicar.");
      return;
    }

    const newProduct: Product = {
      id: `published-${crypto.randomUUID()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      condition,
      price: Number(price),
      imageUrl,
      imageAlt: title.trim(),
      ownerId: user.id,
      featured: false,
    };

    try {
      setProducts((current) => [newProduct, ...current]);
    } catch (storageError) {
      setError(
        storageError instanceof DOMException &&
          storageError.name === "QuotaExceededError"
          ? "El almacenamiento local está lleno. Reduce el tamaño de la imagen o elimina productos guardados."
          : "No se pudo guardar el producto en este navegador.",
      );
      return;
    }

    setToast("Producto publicado correctamente.");
    router.push("/mis-productos");
  }

  return (
    <>
      <Navbar showToast={setToast} />
      <main className="account-page publish-page">
        <div className="account-page-heading">
          <span>DALE OTRA OPORTUNIDAD</span>
          <h1>Publicar un producto</h1>
          <p>
            Tu publicación quedará guardada en este navegador para{" "}
            {user?.name ?? "el usuario activo"}.
          </p>
        </div>
        <form className="publish-form" onSubmit={handleSubmit}>
          <label>
            Título
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={80}
              required
            />
          </label>
          <label>
            Descripción
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              maxLength={500}
              required
            />
          </label>
          <div className="publish-form-row">
            <label>
              Categoría
              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value as (typeof productCategories)[number],
                  )
                }
              >
                {categories.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Estado
              <select
                value={condition}
                onChange={(event) =>
                  setCondition(event.target.value as ProductCondition)
                }
              >
                {conditions.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Precio (COP)
              <input
                type="number"
                min="0"
                step="1000"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </label>
          </div>
          <label>
            Imagen
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(event.target.files?.[0])}
            />
            <span className="form-hint">
              Máximo 5 MB. Se optimiza la imagen antes de guardarla en este
              navegador.
            </span>
          </label>
          {imageUrl && (
            <div className="publish-image-preview">
              <Image src={imageUrl} alt="Vista previa del producto" fill unoptimized />
              <span>{imageName}</span>
            </div>
          )}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button
            type="submit"
            className="black-button"
            disabled={isProcessingImage}
          >
            {isProcessingImage ? "Procesando imagen..." : "Publicar producto"}
            {!isProcessingImage && <b>→</b>}
          </button>
        </form>
      </main>
      <Footer />
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
