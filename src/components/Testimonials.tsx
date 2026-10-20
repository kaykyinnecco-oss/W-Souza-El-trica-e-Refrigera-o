import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MessageSquareQuote,
  Star,
} from "lucide-react";
import { company } from "../config";
import { Eyebrow } from "./UI";
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  if (!company.testimonials.length)
    return (
      <section className="reviews-link">
        <div className="container">
          <div>
            <MessageSquareQuote
              className="google-mark"
              size={30}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p>A confiança começa com uma boa referência.</p>
              <span>Conheça as experiências compartilhadas no Google.</span>
            </div>
          </div>
          <a
            href={company.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver avaliações no Google
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    );
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>EXPERIÊNCIAS REAIS</Eyebrow>
            <h2>O que dizem nossos clientes.</h2>
          </div>
          <div className="testimonial-controls">
            <button
              aria-label="Depoimento anterior"
              onClick={() =>
                track.current?.scrollBy({ left: -370, behavior: "smooth" })
              }
            >
              <ArrowLeft />
            </button>
            <button
              aria-label="Próximo depoimento"
              onClick={() =>
                track.current?.scrollBy({ left: 370, behavior: "smooth" })
              }
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <div ref={track} className="testimonial-track">
          {company.testimonials.map((t) => (
            <article key={t.name} className="testimonial">
              {t.rating ? (
                <div className="stars" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null}
              <blockquote>{t.text}</blockquote>
              <strong>{t.name}</strong>
              <span>{t.service}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
