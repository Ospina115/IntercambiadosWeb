"use client";

import { useEffect, useRef, useState } from "react";

const offers = [
  { icon: "👕", label: "Una prenda" },
  { icon: "👜", label: "Un bolso" },
  { icon: "🕶️", label: "Unas gafas" },
  { icon: "✨", label: "Un accesorio" },
];

export default function ExchangeModal({
  product,
  onClose,
  onFinish,
}: {
  product: string | null;
  onClose: () => void;
  onFinish: (offer: string | null) => void;
}) {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!product) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedOffer(null);
        onCloseRef.current();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [product]);

  return (
    <div
      className={`modal${product ? " active" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setSelectedOffer(null);
          onClose();
        }
      }}
      aria-hidden={!product}
    >
      {product && (
        <div
          className="modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exchange-title"
        >
          <button
            type="button"
            className="close"
            onClick={() => {
              setSelectedOffer(null);
              onClose();
            }}
            aria-label="Cerrar"
          >
            ×
          </button>
          <span>INTERCAMBIADOS</span>
          <h2 id="exchange-title">¿Qué quieres ofrecer?</h2>
          <p>Quieres proponer un intercambio por: {product}</p>
          <div className="offer-grid">
            {offers.map((offer) => (
              <button
                type="button"
                className={selectedOffer === offer.label ? "selected" : ""}
                key={offer.label}
                aria-pressed={selectedOffer === offer.label}
                onClick={() => setSelectedOffer(offer.label)}
              >
                <strong>{offer.icon}</strong>
                {offer.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="black-button full-button"
            onClick={() => {
              onFinish(selectedOffer);
              setSelectedOffer(null);
            }}
          >
            Continuar →
          </button>
        </div>
      )}
    </div>
  );
}
