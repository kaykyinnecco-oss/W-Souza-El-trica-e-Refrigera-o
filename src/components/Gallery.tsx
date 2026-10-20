import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../config";
import { Eyebrow, Photo } from "./UI";
import { contextUrl } from "../whatsapp";
const categories = [
  "Todos",
  "Residencial",
  "Comercial",
  "Elétrica",
  "Manutenção",
  "Infraestrutura",
];
const displayOrder = [
  "Manutenção",
  "Elétrica",
  "Residencial",
  "Infraestrutura",
  "Comercial",
];
export default function Gallery() {
  const [filter, setFilter] = useState("Todos");
  const filtered = projects
    .filter((p) => filter === "Todos" || p.category === filter)
    .sort(
      (a, b) =>
        displayOrder.indexOf(a.category) - displayOrder.indexOf(b.category),
    );
  return (
    <section id="projetos" className="section gallery-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <Eyebrow>EM CASA OU NO COMÉRCIO</Eyebrow>
            <h2>
              Serviços que fazem parte
              <br />
              <span>da sua rotina.</span>
            </h2>
          </div>
          <p>
            Instalação, manutenção e pequenos cuidados. As imagens abaixo são
            ilustrativas.
          </p>
        </div>
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filtrar demonstrações de soluções"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="gallery-grid" aria-live="polite">
          {filtered.map((p, i) => (
            <a
              key={p.title}
              className={`project-card project-${i}`}
              href={contextUrl(`uma solução para ${p.category.toLowerCase()}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Photo src={p.image} alt={p.alt} width={1400} height={1000} />
              <span className="project-label">
                {p.category.toUpperCase()} · IMAGEM ILUSTRATIVA
              </span>
              <div className="project-copy">
                <span>{p.category}</span>
                <h3>{p.title}</h3>
                <ArrowUpRight size={23} />
              </div>
            </a>
          ))}
        </div>
        <p className="gallery-note">
          Imagens ilustrativas, incluindo ambientes gerados por IA. Não
          representam obras executadas pela W Souza.
        </p>
      </div>
    </section>
  );
}
