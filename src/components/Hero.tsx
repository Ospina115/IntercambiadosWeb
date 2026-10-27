import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-left">
        <div className="mini-label">
          <span />
          ROPA · MODA · INTERCAMBIO
        </div>
        <h1>
          Lo que ya no usas, <i>alguien más</i> puede quererlo.
        </h1>
        <p>
          Descubre prendas, bolsos, gafas y accesorios. Compra, vende o
          intercambia lo que ya no necesitas.
        </p>
        <div className="hero-buttons">
          <Link href="/marketplace" className="black-button">
            Explorar prendas <b>→</b>
          </Link>
          <Link href="/publicar" className="pink-button">
            + Publicar algo
          </Link>
        </div>
        <div className="hero-numbers">
          <div>
            <strong>01</strong>
            <span>Encuentra</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Conecta</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Intercambia</span>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-main-photo">
          <Image
            src="/products/ropa-colores.jpg"
            alt="Ropa colorida en un perchero"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <div className="photo-label">
            <span>DESCUBRE</span>
            <strong>
              tu próximo
              <br />
              look
            </strong>
          </div>
        </div>
        <div className="hero-small-card">
          <div className="mini-photo">
            <Image
              src="/products/look-casual.jpg"
              alt="Outfit de ropa"
              fill
              sizes="58px"
            />
          </div>
          <div>
            <small>NUEVO</small>
            <strong>Looks que inspiran</strong>
            <span>desde $22.000</span>
          </div>
        </div>
        <div className="floating-star" aria-hidden="true">
          ✦
        </div>
        <div className="floating-heart" aria-hidden="true">
          ♡
        </div>
      </div>
    </section>
  );
}
