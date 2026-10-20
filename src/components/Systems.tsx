import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";
import { Button, Eyebrow, Photo } from "./UI";
import { climateSystems } from "../config";

function MultiDiagram() {
  return (
    <svg
      className="system-diagram"
      viewBox="0 0 600 340"
      role="img"
      aria-label="Diagrama ilustrativo de três evaporadoras conectadas a uma condensadora"
    >
      <g fill="none" stroke="#8a9fc5" strokeWidth="2">
        <path d="M160 75H290V170H390M160 170H390M160 265H290V170" />
      </g>
      {[40, 135, 230].map((y) => (
        <g key={y}>
          <rect
            x="45"
            y={y}
            width="140"
            height="58"
            rx="9"
            fill="white"
            stroke="#8a9fc5"
          />
          <path d={`M55 ${y + 43}h120`} stroke="#020042" strokeWidth="3" />
        </g>
      ))}
      <rect
        x="390"
        y="100"
        width="160"
        height="140"
        rx="12"
        fill="white"
        stroke="#8a9fc5"
      />
      <circle cx="465" cy="170" r="48" fill="#DCEBFF" stroke="#8a9fc5" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${430 + i * 9} 135v70`} stroke="#8a9fc5" />
      ))}
      <circle cx="465" cy="170" r="10" fill="#020042" />
      <g fill="#5F6B80" fontFamily="sans-serif" fontSize="12">
        <text x="45" y="322">
          UNIDADES INTERNAS
        </text>
        <text x="390" y="277">
          UNIDADE EXTERNA
        </text>
      </g>
    </svg>
  );
}
function InverterDiagram() {
  return (
    <svg
      className="system-diagram"
      viewBox="0 0 600 340"
      role="img"
      aria-label="Esquema ilustrativo do controle variável de um compressor Inverter"
    >
      <g fill="none" stroke="#b6cae9">
        <path d="M70 60V270H540" />
        {[100, 150, 200].map((y) => (
          <path key={y} d={`M70 ${y}H540`} strokeDasharray="4 7" />
        ))}
      </g>
      <path
        d="M70 240C110 240 110 80 170 100S210 170 270 150S330 115 370 135S460 140 540 138"
        fill="none"
        stroke="#2446A6"
        strokeWidth="4"
      />
      <path
        d="M70 240C110 240 110 80 170 100S210 170 270 150S330 115 370 135S460 140 540 138V270H70Z"
        fill="#2446A6"
        opacity=".08"
      />
      <g fill="#020042">
        <circle cx="170" cy="100" r="5" />
        <circle cx="370" cy="135" r="5" />
        <circle cx="540" cy="138" r="5" />
      </g>
      <g fill="#5F6B80" fontFamily="sans-serif" fontSize="12">
        <text x="70" y="35">
          OPERAÇÃO DO COMPRESSOR
        </text>
        <text x="70" y="304">
          AJUSTE CONTÍNUO À NECESSIDADE DO AMBIENTE
        </text>
      </g>
    </svg>
  );
}

function nearestPanel(rail: HTMLElement, center: number) {
  let closest = 0;
  let distance = Infinity;
  Array.from(rail.children).forEach((child, index) => {
    const panel = child as HTMLElement;
    const delta = Math.abs(panel.offsetLeft + panel.offsetWidth / 2 - center);
    if (delta < distance) {
      distance = delta;
      closest = index;
    }
  });
  return closest;
}

export default function Systems() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const trigger = useRef<{ start: number; end: number } | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const updateActive = (index: number) => {
    const next = Math.max(0, Math.min(climateSystems.length - 1, index));
    if (activeRef.current !== next) {
      activeRef.current = next;
      setActive(next);
    }
  };

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const initialize = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (
        disposed ||
        !section.current ||
        !viewport.current ||
        !track.current ||
        !stage.current
      )
        return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia(section);
      mm.add(
        "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
        () => {
          const host = section.current!,
            view = viewport.current!,
            rail = track.current!;
          host.classList.add("is-scroll-driven");
          view.scrollLeft = 0;
          const distance = () =>
            Math.max(0, rail.scrollWidth - view.clientWidth);
          const tween = gsap.to(rail, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              id: "systems-horizontal",
              trigger: host,
              start: "top 88px",
              end: () => `+=${distance()}`,
              pin: stage.current,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress.current)
                  progress.current.style.transform = `scaleX(${self.progress})`;
                updateActive(
                  nearestPanel(
                    rail,
                    self.progress * distance() + view.clientWidth / 2,
                  ),
                );
              },
            },
          });
          trigger.current = tween.scrollTrigger!;
          // Images reserve their size; refresh only when the viewport's width changes.
          let width = view.clientWidth;
          let resizeFrame = 0;
          const observer = new ResizeObserver(() => {
            if (width === view.clientWidth) return;
            width = view.clientWidth;
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
          });
          observer.observe(view);
          return () => {
            observer.disconnect();
            cancelAnimationFrame(resizeFrame);
            trigger.current = null;
            host.classList.remove("is-scroll-driven");
            if (progress.current)
              progress.current.style.transform = "scaleX(0)";
          };
        },
      );
      cleanup = () => mm.revert();
    };
    void initialize();
    const view = viewport.current;
    let frame = 0;
    const nativeScroll = () => {
      if (trigger.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rail = track.current;
        if (!view || !rail) return;
        updateActive(
          nearestPanel(rail, view.scrollLeft + view.clientWidth / 2),
        );
        const max = view.scrollWidth - view.clientWidth;
        if (progress.current)
          progress.current.style.transform = `scaleX(${max ? view.scrollLeft / max : 1})`;
      });
    };
    view?.addEventListener("scroll", nativeScroll, { passive: true });
    return () => {
      disposed = true;
      cleanup?.();
      view?.removeEventListener("scroll", nativeScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function goTo(index: number, instant = false) {
    const view = viewport.current,
      rail = track.current;
    if (!view || !rail) return;
    const next = Math.max(0, Math.min(climateSystems.length - 1, index));
    const panel = rail.children[next] as HTMLElement;
    const left = Math.max(
      0,
      panel.offsetLeft + panel.offsetWidth / 2 - view.clientWidth / 2,
    );
    const max = rail.scrollWidth - view.clientWidth;
    const behavior =
      instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth";
    if (trigger.current) {
      view.scrollLeft = 0;
      window.scrollTo({
        top:
          trigger.current.start +
          (Math.min(left, max) / max) *
            (trigger.current.end - trigger.current.start),
        behavior,
      });
    } else view.scrollTo({ left: Math.min(left, max), behavior });
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeRef.current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeRef.current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(climateSystems.length - 1);
    }
  }

  return (
    <section
      ref={section}
      id="sistemas"
      className="systems-section"
      aria-labelledby="systems-title"
    >
      <div ref={stage} className="showcase-stage">
        <div className="container showcase-heading">
          <div>
            <Eyebrow>ENCONTRE SEU CONFORTO</Eyebrow>
            <h2 id="systems-title">
              Jeitos diferentes de climatizar.
              <br />
              <span> O cuidado é o mesmo.</span>
            </h2>
          </div>
          <div
            className="showcase-controls"
            role="group"
            aria-label="Navegar pelos sistemas"
          >
            <button
              aria-label="Sistema anterior"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              aria-label="Próximo sistema"
              disabled={active === climateSystems.length - 1}
              onClick={() => goTo(active + 1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div
          ref={viewport}
          className="showcase-viewport"
          role="region"
          aria-label="Showcase horizontal de climatização"
          aria-describedby="showcase-help"
          tabIndex={0}
          onKeyDown={keyboard}
        >
          <div ref={track} className="showcase-track">
            {climateSystems.map((system, index) => (
              <article
                key={system.name}
                className={`system-panel ${system.product ? "product-panel" : ""}`}
                data-active={active === index}
                aria-labelledby={`system-title-${index}`}
                onFocusCapture={() => {
                  if (index !== activeRef.current) goTo(index, true);
                }}
              >
                <div className="system-visual">
                  {system.diagram === "multi" ? (
                    <MultiDiagram />
                  ) : system.diagram === "inverter" ? (
                    <InverterDiagram />
                  ) : (
                    <Photo
                      src={system.image}
                      alt={system.alt}
                      width={1536}
                      height={1024}
                    />
                  )}
                  <span className="visual-caption">
                    {system.diagram
                      ? "Esquema ilustrativo"
                      : "Imagem ilustrativa"}
                  </span>
                  <span className="panel-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="system-description">
                  <span className="step-number">{system.tag}</span>
                  <h3 id={`system-title-${index}`}>{system.name}</h3>
                  <p>{system.text}</p>
                  <Button context={system.name.toLowerCase()} secondary>
                    Orçamento para esta solução
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="container showcase-bottom">
          <p id="showcase-help">
            <MoveHorizontal size={18} />
            <span className="scroll-instruction">
              Role para conhecer os sistemas
            </span>
            <span className="swipe-instruction">
              Deslize para conhecer os sistemas
            </span>
          </p>
          <div className="showcase-progress" aria-hidden="true">
            <span ref={progress} />
          </div>
          <span
            className="showcase-counter"
            aria-label={`Sistema ${active + 1} de ${climateSystems.length}`}
          >
            {String(active + 1).padStart(2, "0")}
            <i>/ {String(climateSystems.length).padStart(2, "0")}</i>
          </span>
        </div>
      </div>
    </section>
  );
}
