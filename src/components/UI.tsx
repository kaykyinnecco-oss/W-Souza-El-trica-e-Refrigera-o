import { useState } from "react";
import type { ImgHTMLAttributes, ReactNode } from "react";
import {
  AirVent,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Cable,
  CircuitBoard,
  Fan,
  Lightbulb,
  PanelsTopLeft,
  PlugZap,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { contextUrl } from "../whatsapp";
import { responsiveImages } from "../config";

const icons = {
  air: AirVent,
  shield: ShieldCheck,
  wrench: Wrench,
  sparkles: Sparkles,
  ruler: Ruler,
  wind: Wind,
  building: Building2,
  zap: Zap,
  panel: PanelsTopLeft,
  plug: PlugZap,
  bulb: Lightbulb,
  circuit: CircuitBoard,
  cable: Cable,
  fan: Fan,
  badge: BadgeCheck,
};
export function ServiceIcon({
  name,
  size = 26,
}: {
  name: string;
  size?: number;
}) {
  const Icon = icons[name as keyof typeof icons] || AirVent;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.85 11.85 0 0012.06 0C5.49 0 .13 5.35.13 11.93c0 2.1.55 4.15 1.6 5.95L.03 24l6.26-1.64a11.9 11.9 0 005.76 1.47h.01C18.63 23.83 24 18.48 24 11.9a11.85 11.85 0 00-3.48-8.42zM12.06 21.8a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.89 9.89 0 01-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.83 9.83 0 017 2.9 9.83 9.83 0 012.9 7c0 5.45-4.45 9.88-9.92 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.77-1.67-2.07-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.18-1.42-.08-.13-.27-.2-.57-.35z" />
    </svg>
  );
}
export function Button({
  children,
  href,
  context,
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  context?: string;
  secondary?: boolean;
  className?: string;
}) {
  const external = !!context || href?.startsWith("https");
  return (
    <a
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      href={context ? contextUrl(context) : href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function Photo({
  alt,
  className = "",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`photo ${className} ${loaded ? "is-loaded" : ""} ${failed ? "is-failed" : ""}`}
    >
      <img
        {...props}
        srcSet={props.srcSet || responsiveImages[props.src || ""]}
        sizes={
          props.sizes ||
          "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 65vw, 44vw"
        }
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setFailed(true);
        }}
        decoding="async"
        loading={props.loading || "lazy"}
      />
      {failed ? <span className="image-error">Imagem indisponível</span> : null}
    </div>
  );
}
export function ServiceCard({
  service,
  index,
  dark = false,
}: {
  service: { icon: string; title: string; description: string };
  index: number;
  dark?: boolean;
}) {
  return (
    <a
      data-reveal
      className={`service-card ${dark ? "dark-card" : ""}`}
      href={contextUrl(service.title.toLowerCase())}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="service-top">
        <ServiceIcon name={service.icon} />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="card-arrow">
        <span className="sr-only">Solicitar orçamento: {service.title}</span>
        <ArrowUpRight size={19} />
      </span>
    </a>
  );
}
