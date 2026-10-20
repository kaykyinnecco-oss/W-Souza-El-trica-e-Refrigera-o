import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  House,
  Instagram,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wind,
  Zap,
} from "lucide-react";
import Header from "./components/Header";
import QuoteForm from "./components/QuoteForm";
import Systems from "./components/Systems";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import {
  Button,
  Eyebrow,
  Photo,
  ServiceCard,
  ServiceIcon,
  WhatsAppIcon,
} from "./components/UI";
import {
  company,
  coolingServices,
  electricalServices,
  responsiveImages,
} from "./config";
import { contextUrl } from "./whatsapp";

function BrandStrip() {
  return (
    <section className="brands-section" aria-label="Marcas atendidas">
      <div className="container brands-intro">
        <Eyebrow>MARCAS QUE ATENDEMOS</Eyebrow>
        <h2>
          Seu equipamento.
          <br />
          <span>Nosso cuidado.</span>
        </h2>
        <p>
          Converse sobre o modelo do seu aparelho e o serviço que você precisa.
        </p>
      </div>
      <div
        className="brand-marquee"
        tabIndex={0}
        aria-label="Logotipos das marcas atendidas; animação pausa ao receber foco"
      >
        <div className="marquee-track">
          {[0, 1, 2, 3].map((copy) => (
            <div
              className="marquee-group"
              key={copy}
              aria-hidden={copy > 0 ? true : undefined}
            >
              {company.brands.map((b) => (
                <div key={b.name} className="brand-item">
                  <img
                    src={b.logo}
                    alt={copy === 0 ? b.name : ""}
                    width="140"
                    height="52"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="brand-note">
        Marcas de seus respectivos titulares. Não há vínculo de assistência
        autorizada declarado.
      </p>
    </section>
  );
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const floatingContact = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const form = root.current?.querySelector(".quote-form");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => {
      floatingContact.current?.toggleAttribute(
        "data-form-visible",
        entry.isIntersecting,
      );
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const initialize = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia(root);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
            clearProps: "transform,opacity",
          }),
        );
      });
      cleanup = () => mm.revert();
    };
    const idle = window.requestIdleCallback?.(() => void initialize(), {
      timeout: 1200,
    });
    const fallback =
      idle === undefined
        ? window.setTimeout(() => void initialize(), 200)
        : undefined;
    return () => {
      disposed = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (fallback !== undefined) window.clearTimeout(fallback);
      cleanup?.();
    };
  }, []);
  return (
    <div ref={root}>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <Eyebrow>W SOUZA · ELÉTRICA E REFRIGERAÇÃO</Eyebrow>
              <h1>
                Conforto na
                <br />
                <span>temperatura certa.</span>
                <br />
                Segurança em
                <br />
                cada instalação.
              </h1>
              <p>
                Serviços de climatização e elétrica para sua casa ou comércio.
                Fale com a W Souza e solicite seu orçamento.
              </p>
              <div className="hero-actions">
                <Button context="um orçamento de climatização ou elétrica">
                  Solicitar orçamento
                </Button>
                <a className="text-link" href="#climatizacao">
                  Conhecer serviços
                  <ArrowDown size={17} />
                </a>
              </div>
              <p className="hero-direct">
                <MessageCircle size={17} /> Atendimento direto, pelo WhatsApp.
              </p>
            </div>
            <figure className="hero-visual">
              <div className="hero-photo">
                <img
                  className="hero-ac"
                  srcSet={responsiveImages[company.images.hero]}
                  sizes="(max-width: 767px) calc(100vw - 48px), 44vw"
                  src={company.images.hero}
                  alt="Ambiente residencial com ar-condicionado Split instalado na parede"
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                />
              </div>
              <svg
                className="air-lines"
                viewBox="0 0 320 160"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 110C90 110 50 20 180 20H315M1 130C110 130 90 50 230 50H315M1 150C130 150 120 80 275 80H315"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <figcaption>
                <House size={22} strokeWidth={1.5} />
                <div>
                  <strong>Seu espaço merece esse cuidado.</strong>
                  <span>Para viver, trabalhar e ficar à vontade.</span>
                </div>
              </figcaption>
              <small className="hero-image-note">Ambiente ilustrativo</small>
            </figure>
          </div>
          <div className="container hero-shortcuts">
            <a href="#climatizacao">
              <Wind size={25} strokeWidth={1.4} />
              <span>
                <small>MAIS CONFORTO</small>Climatização
              </span>
              <ArrowUpRight size={21} />
            </a>
            <a href="#eletrica">
              <Zap size={24} strokeWidth={1.4} />
              <span>
                <small>MAIS TRANQUILIDADE</small>Serviços elétricos
              </span>
              <ArrowUpRight size={21} />
            </a>
            <div>
              <ShieldCheck size={25} strokeWidth={1.4} />
              <p>
                Orientação clara.
                <br />
                Cuidado com o seu ambiente.
              </p>
            </div>
          </div>
        </section>

        <section id="climatizacao" className="section cooling-section">
          <div className="container cooling-layout">
            <div className="cooling-intro" data-reveal>
              <Eyebrow>AR-CONDICIONADO</Eyebrow>
              <h2>
                Para refrescar.
                <br />
                Para funcionar bem.
                <br />
                <span>Para cuidar.</span>
              </h2>
              <p>
                Da instalação à manutenção, conte o que seu aparelho precisa. A
                W Souza ajuda você a entender o próximo passo.
              </p>
              <figure className="cooling-photo">
                <Photo
                  src={company.images.maintenance}
                  alt="Técnico retirando o filtro de um Split para limpeza"
                  width={1536}
                  height={1024}
                />
                <figcaption>
                  <span>Instalação e manutenção de Split</span>
                  <small>Imagem ilustrativa</small>
                </figcaption>
              </figure>
            </div>
            <div className="services-list">
              <div className="services-list-heading">
                <span>COMO PODEMOS AJUDAR</span>
                <span>01 — 07</span>
              </div>
              {coolingServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                />
              ))}
              <a className="all-services-link" href="#contato">
                Não sabe qual serviço escolher? Vamos conversar.
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section id="eletrica" className="section electrical-section">
          <div className="container electrical-layout">
            <figure className="electrical-photo" data-reveal>
              <Photo
                src={company.images.electrical}
                alt="Profissional de uniforme azul e óculos de proteção verificando um quadro elétrico residencial"
                width={1536}
                height={1024}
              />
              <figcaption>
                <ShieldCheck size={24} />
                <span>
                  Instalações, manutenção
                  <br />e atenção aos detalhes.
                </span>
              </figcaption>
              <small>Imagem ilustrativa</small>
            </figure>
            <div className="electrical-copy" data-reveal>
              <Eyebrow>ELÉTRICA SEM COMPLICAÇÃO</Eyebrow>
              <h2>
                Elétrica bem-feita
                <br />é segurança para
                <br />
                <span>o seu dia a dia.</span>
              </h2>
              <p>
                Uma tomada, a iluminação ou o quadro elétrico: cada serviço
                começa entendendo o que você precisa e as condições do local.
              </p>
              <div className="electrical-services">
                {electricalServices.map((s) => (
                  <a
                    key={s.title}
                    href={contextUrl(s.title.toLowerCase())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="electrical-service"
                  >
                    <ServiceIcon name={s.icon} size={19} />
                    <span>{s.title}</span>
                    <ArrowUpRight size={15} />
                    <span className="sr-only">
                      Solicitar orçamento. {s.description}
                    </span>
                  </a>
                ))}
              </div>
              <Button context="um orçamento de serviço elétrico">
                Falar sobre um serviço elétrico
              </Button>
              <p className="electrical-note">
                O serviço é definido após a avaliação da sua necessidade.
              </p>
            </div>
          </div>
        </section>

        <section id="sobre" className="section about-section">
          <div className="container about-layout">
            <div data-reveal>
              <Eyebrow>ATENDIMENTO PRÓXIMO</Eyebrow>
              <h2>
                Pode contar.
                <br />
                <span>
                  A conversa começa
                  <br />
                  com você.
                </span>
              </h2>
              <p>
                Sem complicar o que pode ser simples. Um contato direto para
                entender seu ambiente e cuidar do que precisa ser feito.
              </p>
            </div>
            <ol className="care-steps">
              {[
                {
                  title: "Conte o que está acontecendo.",
                  text: "Uma instalação nova, um aparelho que parou ou um ponto elétrico que precisa de atenção.",
                },
                {
                  title: "Entenda o que pode ser feito.",
                  text: "Converse sobre o serviço e as informações necessárias para avaliar seu caso.",
                },
                {
                  title: "Combine os próximos passos.",
                  text: "Consulte orçamento e disponibilidade. O atendimento é combinado na conversa.",
                },
              ].map((s, i) => (
                <li key={s.title} data-reveal>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <Check size={18} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Systems />
        <BrandStrip />
        <Gallery />
        <Testimonials />

        <section className="conversion-banner">
          <div className="container">
            <div>
              <Eyebrow>PRECISANDO DE UMA MÃO?</Eyebrow>
              <h2>
                Seu ar-condicionado.
                <br />
                Sua elétrica. <span>Vamos cuidar?</span>
              </h2>
            </div>
            <div>
              <p>Fale com a W Souza sobre o que você precisa.</p>
              <Button context="a solução ideal de climatização ou elétrica para meu ambiente">
                Conversar pelo WhatsApp
              </Button>
            </div>
            <Wind
              className="banner-wind"
              aria-hidden="true"
              size={260}
              strokeWidth={0.6}
            />
          </div>
        </section>

        <section id="contato" className="section contact-section">
          <div className="container contact-layout">
            <div className="contact-copy" data-reveal>
              <Eyebrow>SEU ORÇAMENTO COMEÇA AQUI</Eyebrow>
              <h2>
                Conte o que
                <br />
                você precisa.
                <br />
                <span>Vamos conversar.</span>
              </h2>
              <p>
                Preencha os campos ao lado. Sua mensagem vai pronta para o
                WhatsApp da W Souza, e a conversa continua por lá.
              </p>
              <div className="contact-methods">
                <a
                  href={contextUrl("um atendimento")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={22} />
                  <span>
                    <small>FALE DIRETO COM A W SOUZA</small>
                    <strong>{company.phoneDisplay}</strong>
                  </span>
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={22} />
                  <span>
                    <small>ACOMPANHE NO INSTAGRAM</small>
                    <strong>@wsouzaeletrica</strong>
                  </span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="contact-advice">
                <MessageCircle size={22} />
                <p>
                  Prefere ir direto ao assunto?
                  <br />
                  <a
                    href={contextUrl("um orçamento")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abra uma conversa sem preencher o formulário.
                  </a>
                </p>
              </div>
              {company.region ? (
                <p className="confirmed-region">
                  Atendimento em {company.region}.
                </p>
              ) : null}
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#inicio">
                <img
                  src={company.logo}
                  alt={company.name}
                  width="600"
                  height="360"
                  loading="lazy"
                />
              </a>
              <p>
                Elétrica e refrigeração.
                <br />
                Cuidado para sua casa e seu comércio.
              </p>
              {company.region ? <p>{company.region}</p> : null}
            </div>
            <div className="footer-links">
              <span>COMO PODEMOS AJUDAR</span>
              <a href="#climatizacao">Climatização</a>
              <a href="#eletrica">Elétrica</a>
              <a href="#sobre">Sobre a W Souza</a>
            </div>
            <div className="footer-links">
              <span>FALE COM A W SOUZA</span>
              <a
                href={contextUrl("um orçamento pelo rodapé do site")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
                <ArrowUpRight size={14} />
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
                <ArrowUpRight size={14} />
              </a>
              <a href="#contato">Solicitar orçamento</a>
            </div>
            <a className="back-top" href="#inicio">
              Voltar ao topo
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} W Souza Elétrica e Refrigeração.
              Todos os direitos reservados.
            </span>
            <span>Seu ambiente, bem cuidado.</span>
          </div>
        </div>
      </footer>
      <a
        ref={floatingContact}
        className="floating-whatsapp"
        href={contextUrl("um atendimento pelo site")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com a W Souza pelo WhatsApp"
      >
        <WhatsAppIcon size={25} />
        <span>Fale com a W Souza</span>
      </a>
    </div>
  );
}
