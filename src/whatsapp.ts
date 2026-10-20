import { company } from "./config";
export type QuoteData = {
  name: string;
  phone: string;
  location: string;
  service: string;
  environment: string;
  description: string;
};
export function whatsappUrl(message: string, phone = company.whatsapp) {
  if (!/^55[1-9]{2}9\d{8}$/.test(phone))
    throw new Error(
      "Configure um WhatsApp brasileiro válido com código do país e DDD.",
    );
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
export function contextUrl(context: string) {
  return whatsappUrl(
    `Olá! Vim pelo site da W Souza Elétrica e Refrigeração e gostaria de conversar sobre ${context}.`,
  );
}
export function formatPhone(value: string) {
  const n = value.replace(/\D/g, "").slice(0, 11);
  if (n.length < 3) return n ? `(${n}` : "";
  if (n.length < 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  const cut = n.length > 10 ? 7 : 6;
  return `(${n.slice(0, 2)}) ${n.slice(2, cut)}-${n.slice(cut)}`;
}
export function quoteMessage(data: QuoteData) {
  return `Olá! Gostaria de solicitar um orçamento com a W Souza Elétrica e Refrigeração.\n\nNome: ${data.name.trim()}\nWhatsApp: ${data.phone}\nLocalização: ${data.location.trim()}\nServiço: ${data.service}\nAmbiente: ${data.environment || "Não informado"}\nDescrição: ${data.description.trim() || "Não informada"}\n\nGostaria de saber mais sobre disponibilidade e valores.`;
}
