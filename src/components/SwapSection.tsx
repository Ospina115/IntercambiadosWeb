const steps = [
  {
    icon: "👕",
    title: "Elige algo",
    description: "Busca una prenda o accesorio que te guste.",
  },
  {
    icon: "♡",
    title: "Haz una propuesta",
    description: "Ofrece algo que ya no estés usando.",
  },
  {
    icon: "✦",
    title: "Conecta",
    description:
      "Si ambos están de acuerdo, el intercambio puede comenzar.",
  },
];

export default function SwapSection({
  onExchange,
}: {
  onExchange: (product: string) => void;
}) {
  return (
    <section className="swap" id="intercambiar">
      <div className="swap-title">
        <span>MODO INTERCAMBIO</span>
        <h2>
          ¿Qué tienes <i>para cambiar?</i>
        </h2>
      </div>
      <div className="swap-process">
        {steps.map((step, index) => (
          <div className="swap-process-item" key={step.title}>
            <div className="swap-step">
              <div className="step-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="process-arrow" aria-hidden="true">
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="black-button centered"
        onClick={() => onExchange("un producto")}
      >
        Probar intercambio <b>→</b>
      </button>
    </section>
  );
}
