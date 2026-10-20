import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { formServices } from "../config";
import { formatPhone, quoteMessage, whatsappUrl } from "../whatsapp";
export default function QuoteForm() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [readyUrl, setReadyUrl] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult("");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const location = String(data.get("location") || "").trim();
    const service = String(data.get("service") || "");
    if (name.length < 3 || location.length < 2) {
      setError("Preencha seu nome e sua cidade ou bairro.");
      return;
    }
    if (!/^[1-9]{2}9\d{8}$/.test(phone.replace(/\D/g, ""))) {
      setError(
        "Informe um WhatsApp com DDD e 9 dígitos. Exemplo: (21) 99999-9999.",
      );
      form.querySelector<HTMLInputElement>("#phone")?.focus();
      return;
    }
    if (!formServices.includes(service)) {
      setError("Selecione o tipo de serviço.");
      return;
    }
    try {
      const url = whatsappUrl(
        quoteMessage({
          name,
          phone,
          location,
          service,
          environment: String(data.get("environment") || ""),
          description: String(data.get("description") || ""),
        }),
      );
      setReadyUrl(url);
      window.open(url, "_blank", "noopener,noreferrer");
      setResult(
        "Sua mensagem está pronta. Continue no WhatsApp para consultar valores e disponibilidade.",
      );
    } catch {
      setError(
        "Não foi possível abrir o WhatsApp. Entre em contato pelo telefone informado.",
      );
    }
  }
  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="step-number">SIMPLES, PELO WHATSAPP</span>
        <h3>Vamos falar do seu orçamento?</h3>
        <p>Preencha o básico para começar a conversa.</p>
      </div>
      <div className="form-grid">
        <label htmlFor="name">
          Nome completo <span>*</span>
          <input
            autoComplete="name"
            id="name"
            name="name"
            placeholder="Como podemos chamar você?"
            required
            minLength={3}
            maxLength={120}
          />
        </label>
        <label htmlFor="phone">
          WhatsApp <span>*</span>
          <input
            autoComplete="tel-national"
            inputMode="tel"
            type="tel"
            id="phone"
            name="phone"
            placeholder="(21) 99999-9999"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              setError("");
            }}
            required
            maxLength={15}
            aria-describedby={error ? "form-error" : undefined}
          />
        </label>
        <label className="full-field" htmlFor="location">
          Cidade ou bairro <span>*</span>
          <input
            autoComplete="address-level2"
            id="location"
            name="location"
            placeholder="Onde será o atendimento?"
            required
            minLength={2}
            maxLength={160}
          />
        </label>
        <label htmlFor="service">
          Tipo de serviço <span>*</span>
          <select id="service" name="service" required defaultValue="">
            <option value="" disabled>
              Selecione um serviço
            </option>
            {formServices.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label htmlFor="environment">
          Ambiente
          <select id="environment" name="environment" defaultValue="">
            <option value="">Selecione o ambiente</option>
            <option>Residencial</option>
            <option>Comercial</option>
          </select>
        </label>
        <label className="full-field" htmlFor="description">
          Descreva sua necessidade <small>Opcional</small>
          <textarea
            id="description"
            name="description"
            rows={3}
            maxLength={2000}
            placeholder="Conte um pouco sobre o ambiente e o serviço que você precisa…"
          />
        </label>
      </div>
      {error ? (
        <p id="form-error" role="alert" className="form-error">
          {error}
        </p>
      ) : null}
      <button className="button form-submit" type="submit">
        Solicitar orçamento pelo WhatsApp
        <ArrowUpRight size={19} />
      </button>
      {result ? (
        <div className="form-success" role="status">
          <Check size={18} />
          <p>
            {result}{" "}
            <a href={readyUrl} target="_blank" rel="noopener noreferrer">
              Abrir conversa
            </a>
          </p>
        </div>
      ) : null}
      <p className="form-privacy">
        <LockKeyhole size={13} /> Seus dados serão incluídos apenas na mensagem
        do WhatsApp.
      </p>
      <p className="form-note">
        O envio inicia uma solicitação. O agendamento depende da confirmação da
        equipe.
      </p>
    </form>
  );
}
