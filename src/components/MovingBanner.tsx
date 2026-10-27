const words = [
  "ROPA",
  "BOLSOS",
  "GAFAS",
  "ACCESORIOS",
  "INTERCAMBIA",
  "DESCUBRE",
];

export default function MovingBanner() {
  return (
    <div
      className="moving-banner"
      aria-label="Ropa, bolsos, gafas y accesorios"
    >
      <div className="moving-track" aria-hidden="true">
        {[...words, ...words].map((word, index) => (
          <span className="moving-item" key={`${word}-${index}`}>
            {word}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}
