import { categories } from "@/data/categories";
import type { CategoryFilter } from "@/types/category";

export default function CategoryGrid({
  onSelect,
}: {
  onSelect: (category: CategoryFilter) => void;
}) {
  return (
    <section className="categories">
      <div className="category-heading">
        <div>
          <span>¿QUÉ ESTÁS BUSCANDO?</span>
          <h2>
            Encuentra tu <i>próximo favorito.</i>
          </h2>
        </div>
        <p>
          Explora diferentes categorías y descubre cosas que todavía pueden
          tener mucho por ofrecer.
        </p>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            type="button"
            className={`category-box ${category.color}`}
            key={category.id}
            onClick={() => onSelect(category.id)}
          >
            <div className="category-number">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="category-icon">{category.icon}</div>
            <h3>{category.label}</h3>
            <span>{category.description}</span>
            <b>→</b>
          </button>
        ))}
      </div>
    </section>
  );
}
