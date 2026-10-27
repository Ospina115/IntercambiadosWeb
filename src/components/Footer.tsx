import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="final-message">
        <div className="final-star" aria-hidden="true">
          ✦
        </div>
        <span>INTERCAMBIADOS</span>
        <h2>
          Tu clóset cambia. <i>Las cosas también.</i>
        </h2>
        <p>Compra · vende · intercambia · vuelve a usar</p>
      </section>
      <footer>
        <div className="footer-logo">
          INTERCAMBIADOS<span>✦</span>
        </div>
        <p>Una nueva oportunidad para lo que ya existe.</p>
        <div>
          <Link href="/marketplace">Explorar</Link> ·{" "}
          <Link href="/#intercambiar">Intercambiar</Link> ·{" "}
          <Link href="/#marcas">Marcas</Link>
        </div>
      </footer>
    </>
  );
}
