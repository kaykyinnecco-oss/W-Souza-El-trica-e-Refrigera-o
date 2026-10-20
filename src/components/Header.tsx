import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { company } from "../config";
import { Button } from "./UI";
const links = [
  ["Início", "inicio"],
  ["Climatização", "climatizacao"],
  ["Elétrica", "eletrica"],
  ["Serviços", "sistemas"],
  ["Projetos", "projetos"],
  ["Sobre nós", "sobre"],
  ["Contato", "contato"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      panel.current?.querySelectorAll<HTMLElement>("a, button");
    focusables()?.[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f?.length) return;
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label={`${company.name} — início`}
          >
            <img
              src={company.logo}
              srcSet={
                company.logo === "/assets/logo.webp"
                  ? "/assets/logo-180.webp 180w, /assets/logo.webp 360w"
                  : undefined
              }
              sizes="100px"
              alt={company.name}
              width="600"
              height="360"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </nav>
          <Button className="header-cta" context="um orçamento">
            Solicitar orçamento
          </Button>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </button>
        </div>
      </header>
      {open ? (
        <div
          ref={panel}
          id="mobile-navigation"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="mobile-menu-top">
            <span>W SOUZA</span>
            <button
              aria-label="Fechar menu"
              onClick={() => {
                setOpen(false);
                toggle.current?.focus();
              }}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Navegação mobile">
            {links.map(([name, id], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {name}
              </a>
            ))}
          </nav>
          <Button context="um orçamento">Solicitar orçamento</Button>
        </div>
      ) : null}
    </>
  );
}
