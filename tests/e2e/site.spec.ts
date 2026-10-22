import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
test("desktop: navegação, imagens, CTAs, equipamentos e acessibilidade", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Conforto na",
  );
  const links = await page
    .locator('a[href^="https://wa.me"]')
    .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
  expect(links.length).toBeGreaterThan(15);
  for (const href of links) {
    const u = new URL(href);
    expect(u.pathname).toBe("/5522998317590");
    expect(u.searchParams.get("text")).toContain("W Souza");
  }
  await expect(page.locator(".owner-card img")).toHaveAttribute(
    "src",
    "/assets/proprietario.webp",
  );
  await expect(page.locator(".map-frame iframe")).toHaveAttribute(
    "title",
    /Localização da W Souza/,
  );
  await expect(
    page.getByText("R. Mal. Deodoro - Centro, Macaé - RJ, 27910-310"),
  ).toHaveCount(2);
  await expect(page.locator(".system-panel")).toHaveCount(6);
  const showcase = page.getByRole("region", {
    name: "Showcase horizontal de climatização",
  });
  await showcase.focus();
  for (let i = 0; i < 5; i++)
    await page
      .getByRole("button", { name: "Próximo sistema", exact: true })
      .click();
  await showcase.press("Home");
  await page
    .getByRole("button", { name: "Unidade externa", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(page.locator(".project-copy").first()).toContainText(
    "Unidade externa",
  );
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  for (const section of [
    "#inicio",
    "#climatizacao",
    "#eletrica",
    "#sobre",
    "#sistemas",
    "#projetos",
    "#contato",
    "footer",
  ]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  const broken = await page.locator("img").evaluateAll((images) =>
    images
      .filter((img) => !img.closest("[aria-hidden=true]"))
      .filter(
        (img) =>
          !(img as HTMLImageElement).complete ||
          !(img as HTMLImageElement).naturalWidth,
      )
      .map((img) => img.getAttribute("src")),
  );
  expect(broken).toEqual([]);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    axe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  expect(errors).toEqual([]);
  await mkdir("artifacts", { recursive: true });
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: "artifacts/desktop-full.png", fullPage: true });
  await page.locator("#inicio").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
});
test("formulário: validação e mensagem completa, sem enviar mensagem real", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await page
    .getByRole("button", { name: "Solicitar orçamento pelo WhatsApp" })
    .click();
  expect(
    await page
      .locator("#name")
      .evaluate((el: HTMLInputElement) => el.validity.valueMissing),
  ).toBe(true);
  await page.getByLabel("Nome completo").fill("João & Ana");
  await page
    .getByRole("textbox", { name: "WhatsApp *", exact: true })
    .fill("2112345678");
  await page.getByLabel("Cidade ou bairro").fill("São Gonçalo / Centro");
  await page.getByLabel("Tipo de serviço").selectOption("Serviço elétrico");
  await page
    .getByRole("combobox", { name: /^Ambiente/ })
    .selectOption("Residencial");
  await page
    .getByRole("button", { name: "Solicitar orçamento pelo WhatsApp" })
    .click();
  await expect(page.getByRole("alert")).toContainText("DDD e 9 dígitos");
  await page
    .getByRole("textbox", { name: "WhatsApp *", exact: true })
    .fill("21999991234");
  await expect(page.locator("#phone")).toHaveValue("(21) 99999-1234");
  await page
    .getByLabel("Descreva sua necessidade")
    .fill("Iluminação + revisão do quadro: 220 V #2.");
  await page.evaluate(() => {
    window.open = (url) => {
      (window as unknown as { testUrl: string }).testUrl = String(url);
      return null;
    };
  });
  await page
    .getByRole("button", { name: "Solicitar orçamento pelo WhatsApp" })
    .click();
  const opened = await page.evaluate(
    () => (window as unknown as { testUrl: string }).testUrl,
  );
  const url = new URL(opened);
  expect(url.pathname).toBe("/5522998317590");
  const message = url.searchParams.get("text");
  for (const value of [
    "João & Ana",
    "São Gonçalo / Centro",
    "Serviço elétrico",
    "Residencial",
    "220 V #2.",
  ])
    expect(message).toContain(value);
  await expect(page.getByRole("status")).toContainText(
    "Sua mensagem está pronta",
  );
  await expect(
    page.getByRole("link", { name: "Abrir conversa", exact: true }),
  ).toHaveAttribute("href", opened);
});
test("mobile: sem overflow, menu acessível, formulário e redução de movimento", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Navegação mobile" })
    .getByRole("link", { name: "Elétrica" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/#eletrica$/);
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".quote-form").scrollIntoViewIfNeeded();
  await expect(page.locator(".floating-whatsapp")).toBeHidden();
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    axe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  for (const section of [
    "#climatizacao",
    "#eletrica",
    "#sobre",
    "#sistemas",
    "#projetos",
    "#contato",
    "footer",
  ]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  await mkdir("artifacts", { recursive: true });
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: "artifacts/mobile-full.png", fullPage: true });
  await page.locator("#inicio").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "artifacts/mobile-hero.png" });
});
test("marquee: repetição exata e pausa em hover/foco", async ({ page }) => {
  await page.goto("/");
  await page.locator(".brand-marquee").scrollIntoViewIfNeeded();
  const groups = await page
    .locator(".marquee-group")
    .evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().width)),
    );
  expect(new Set(groups).size).toBe(1);
  expect(groups).toHaveLength(4);
  await page.locator(".brand-marquee").hover();
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await page.locator(".brand-marquee").focus();
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  expect(await page.locator('.marquee-group[aria-hidden="true"]').count()).toBe(
    3,
  );
});

test("animações de entrada funcionam no desktop e no celular", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".hero-ac")).toHaveCSS("opacity", "1");
    await page
      .locator(".services-list .service-card")
      .first()
      .scrollIntoViewIfNeeded();
    await expect(
      page.locator(".services-list .service-card").first(),
    ).toHaveCSS("opacity", "1");
    await page.locator("#eletrica").scrollIntoViewIfNeeded();
    await expect(page.locator(".electrical-copy")).toHaveCSS("opacity", "1");
  }
  expect(errors).toEqual([]);
});

test("skeleton acompanha a espera real da imagem sem alterar dimensões", async ({
  page,
}) => {
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/assets/electrical*.webp", async (route) => {
    await gate;
    await route.continue();
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const photo = page.locator(".electrical-photo .photo");
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).not.toHaveClass(/is-loaded/);
  const before = await photo.boundingBox();
  release();
  await expect(photo).toHaveClass(/is-loaded/);
  const after = await photo.boundingBox();
  expect(after?.height).toBe(before?.height);
  expect(after?.width).toBe(before?.width);
});
