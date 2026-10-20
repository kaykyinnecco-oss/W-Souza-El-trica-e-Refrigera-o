import test from "node:test";
import assert from "node:assert/strict";
import {
  contextUrl,
  formatPhone,
  quoteMessage,
  whatsappUrl,
} from "../src/whatsapp";
test("usa exclusivamente o número oficial e preserva acentos, quebras e caracteres especiais", () => {
  const message = quoteMessage({
    name: "João & Ana",
    phone: "(21) 99999-1234",
    location: "São Gonçalo / Alcântara",
    service: "Serviço elétrico",
    environment: "Residencial",
    description: "Instalação: 220 V + iluminação #2?",
  });
  const url = new URL(whatsappUrl(message));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5521993265129");
  assert.equal(url.searchParams.get("text"), message);
  assert.match(message, /João & Ana/);
  assert.match(message, /220 V \+ iluminação #2\?/);
});
test("não produz redirecionamento para configuração incompleta ou inválida", () => {
  for (const phone of [
    "",
    "21993265129",
    "+5521993265129",
    "5521993265129?text=errado",
    "5511000000000",
  ])
    assert.throws(() => whatsappUrl("teste", phone));
});
test("máscara brasileira limita dígitos e aceita digitação parcial", () => {
  assert.equal(formatPhone(""), "");
  assert.equal(formatPhone("2"), "(2");
  assert.equal(formatPhone("21999991234"), "(21) 99999-1234");
  assert.equal(formatPhone("219999912345678"), "(21) 99999-1234");
  assert.equal(formatPhone("(21) 99999-1234"), "(21) 99999-1234");
});
test("CTA contextual e campos opcionais continuam legíveis", () => {
  assert.match(
    new URL(contextUrl("instalação elétrica")).searchParams.get("text")!,
    /instalação elétrica/,
  );
  const message = quoteMessage({
    name: " Ana ",
    phone: "(21) 99999-1234",
    location: " Centro ",
    service: "Higienização",
    environment: "",
    description: "",
  });
  assert.match(message, /Nome: Ana\n/);
  assert.match(message, /Localização: Centro\n/);
  assert.match(message, /Ambiente: Não informado/);
  assert.match(message, /Descrição: Não informada/);
});
