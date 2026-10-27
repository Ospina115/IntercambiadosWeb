"use client";

import Image from "next/image";

export default function Brands({
  showToast,
}: {
  showToast: (message: string) => void;
}) {
  return (
    <section className="brands" id="marcas">
      <div className="brands-photo">
        <Image
          src="/products/ropa-colores.jpg"
          alt="Ropa colorida para marcas"
          fill
          sizes="(max-width: 900px) 90vw, 45vw"
        />
        <div className="brands-label">
          <span>PARA MARCAS</span>
          <strong>
            Tu inventario
            <br />
            también puede
            <br />
            circular.
          </strong>
        </div>
      </div>
      <div className="brands-text">
        <span>PARA PEQUEÑAS MARCAS</span>
        <h2>
          Lo que no se vendió{" "}
          <i>todavía puede encontrar a alguien.</i>
        </h2>
        <p>
          Publica unidades restantes, colecciones anteriores, pocas unidades o
          productos que quieras mover a un nuevo público.
        </p>
        <button
          type="button"
          className="outline-button"
          onClick={() =>
            showToast(
              "✦ Próximamente las marcas podrán crear su espacio en INTERCAMBIADOS.",
            )
          }
        >
          Conocer espacio para marcas →
        </button>
      </div>
    </section>
  );
}
