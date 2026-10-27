import Image from "next/image";

export default function Concept({
  onExchange,
}: {
  onExchange: (product: string) => void;
}) {
  return (
    <section className="concept">
      <div className="concept-left">
        <span>NO ES SOLO COMPRAR</span>
        <h2>
          Es darle una <i>nueva oportunidad.</i>
        </h2>
        <p>
          Porque una prenda que ya no funciona para ti puede ser exactamente lo
          que otra persona estaba buscando.
        </p>
        <button
          type="button"
          className="black-button"
          onClick={() => onExchange("un producto")}
        >
          Quiero intercambiar <b>→</b>
        </button>
      </div>
      <div className="concept-visual">
        <div className="concept-photo">
          <Image
            src="/products/concepto-intercambio.jpg"
            alt="Ropa y accesorios listos para compartir"
            fill
            sizes="(max-width: 900px) 90vw, 45vw"
          />
        </div>
        <div className="concept-card">
          <span>INTERCAMBIADOS</span>
          <strong>
            Menos guardar.
            <br />
            Más compartir.
          </strong>
        </div>
      </div>
    </section>
  );
}
