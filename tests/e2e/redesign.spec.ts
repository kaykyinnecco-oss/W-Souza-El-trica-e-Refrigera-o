import { test, expect } from "@playwright/test";

async function scrollRange(page: import("@playwright/test").Page) {
  await expect(page.locator("#sistemas")).toHaveClass(/is-scroll-driven/);
  return page.evaluate(() => {
    const section = document.querySelector<HTMLElement>("#sistemas")!;
    const rail = document.querySelector<HTMLElement>(".showcase-track")!;
    const view = document.querySelector<HTMLElement>(".showcase-viewport")!;
    return {
      start: section.getBoundingClientRect().top + window.scrollY - 88,
      distance: rail.scrollWidth - view.clientWidth,
    };
  });
}

test("desktop: deslocamento horizontal real, todos os painéis e liberação do scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const { start, distance } = await scrollRange(page);
  expect(distance).toBeGreaterThan(2000);
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    start,
  );
  const first = page.locator(".system-panel").first();
  await expect
    .poll(async () => Math.round((await first.boundingBox())!.x))
    .toBe(90);
  const before = (await first.boundingBox())!.x;
  await page.mouse.move(700, 450);
  await page.mouse.wheel(0, 800);
  await expect
    .poll(async () => (await first.boundingBox())!.x)
    .toBeLessThan(before - 500);
  expect((await page.locator(".showcase-stage").boundingBox())!.y).toBeCloseTo(
    88,
    0,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "artifacts/redesign-horizontal-middle.png" });
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    start + distance,
  );
  await expect(page.locator(".showcase-counter")).toHaveAttribute(
    "aria-label",
    "Sistema 6 de 6",
  );
  await expect(
    page.getByRole("button", { name: "Próximo sistema", exact: true }),
  ).toBeDisabled();
  const last = page.locator(".system-panel").last();
  await expect
    .poll(async () =>
      Math.round(
        (await last.boundingBox())!.x + (await last.boundingBox())!.width,
      ),
    )
    .toBe(1350);
  await page.screenshot({ path: "artifacts/redesign-horizontal-last.png" });
  // Focusing every quote link also makes an offscreen panel reachable by keyboard.
  for (let index = 0; index < 6; index++) {
    await page.locator(".system-panel").nth(index).getByRole("link").focus();
    await expect
      .poll(async () => {
        const rect = await page
          .locator(".system-panel")
          .nth(index)
          .boundingBox();
        return !!rect && rect.x >= -1 && rect.x + rect.width <= 1441;
      })
      .toBe(true);
  }
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    start + distance + 400,
  );
  await expect
    .poll(async () => (await page.locator(".showcase-stage").boundingBox())!.y)
    .toBeLessThan(0);
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("textbox", { name: "Nome completo *", exact: true }),
  ).toBeInViewport();
});

test("showcase: redimensionamento remove pin e movimento reduzido mantém navegação", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");
  const { start, distance } = await scrollRange(page);
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    start + distance / 2,
  );
  await page.setViewportSize({ width: 430, height: 900 });
  await expect(page.locator("#sistemas")).not.toHaveClass(/is-scroll-driven/);
  await expect(page.locator("#sistemas > .pin-spacer")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const viewport = page.getByRole("region", {
    name: "Showcase horizontal de climatização",
  });
  await viewport.focus();
  await viewport.press("End");
  await expect(page.locator(".showcase-counter")).toHaveAttribute(
    "aria-label",
    "Sistema 6 de 6",
  );
  expect(await viewport.evaluate((el) => el.scrollLeft)).toBeGreaterThan(1000);
  await viewport.press("Home");
  await expect(page.locator(".showcase-counter")).toHaveAttribute(
    "aria-label",
    "Sistema 1 de 6",
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator("#sistemas")).not.toHaveClass(/is-scroll-driven/);
  await viewport.press("End");
  await expect(page.locator(".showcase-counter")).toHaveAttribute(
    "aria-label",
    "Sistema 6 de 6",
  );
  expect(
    await page
      .locator(".showcase-track")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
});

test("mobile: gesto touch move a faixa sem capturar o scroll vertical", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  await page.locator(".showcase-viewport").scrollIntoViewIfNeeded();
  const viewport = page.locator(".showcase-viewport");
  const rect = (await viewport.boundingBox())!;
  const y = Math.max(160, Math.min(650, rect.y + 120));
  const session = await context.newCDPSession(page);
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 320, y }],
  });
  for (let i = 1; i <= 12; i++) {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 320 - i * 20, y }],
    });
    await page.waitForTimeout(16);
  }
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => viewport.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(200);
  await expect(page.locator("#sistemas")).not.toHaveClass(/is-scroll-driven/);
  await viewport.focus();
  await viewport.press("End");
  await expect(page.locator(".showcase-counter")).toHaveAttribute(
    "aria-label",
    "Sistema 6 de 6",
  );
  await page.screenshot({ path: "artifacts/redesign-mobile-showcase.png" });
  await page
    .getByRole("button", { name: "Sistema anterior", exact: true })
    .click();
  await expect(page.locator(".showcase-counter")).toHaveAttribute(
    "aria-label",
    "Sistema 5 de 6",
  );
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await expect(page.locator(".quote-form")).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("marquee independente: avanço contínuo e continuidade na passagem do loop", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".brand-marquee").scrollIntoViewIfNeeded();
  const initial = await page
    .locator(".marquee-track")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(200);
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe(initial);
  const continuity = await page.locator(".marquee-track").evaluate((el) => {
    const animation = el.getAnimations()[0];
    animation.pause();
    const duration = Number(animation.effect!.getTiming().duration);
    const sample = () =>
      Array.from(el.querySelectorAll<HTMLElement>(".brand-item"))
        .map((item) => ({
          x: item.getBoundingClientRect().x,
          src: item.querySelector("img")!.getAttribute("src"),
        }))
        .filter((item) => item.x >= 3 && item.x < innerWidth - 3);
    animation.currentTime = duration - 1;
    const before = sample();
    animation.currentTime = duration + 1;
    const after = sample();
    return before.every((item) =>
      after.some(
        (other) => other.src === item.src && Math.abs(other.x - item.x) < 2,
      ),
    );
  });
  expect(continuity).toBe(true);
});

test("paleta azul/branca: nenhum tom laranja na interface, inclusive hover e foco", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".header-cta").hover();
  await page.locator("#name").focus();
  const warm = await page.evaluate(() => {
    const properties = [
      "color",
      "backgroundColor",
      "borderTopColor",
      "outlineColor",
      "fill",
      "stroke",
    ] as const;
    return Array.from(document.querySelectorAll<HTMLElement>("body *")).flatMap(
      (el) => {
        const style = getComputedStyle(el);
        return properties.flatMap((property) => {
          const value = style[property];
          const match = value.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
          );
          if (!match || match[4] === "0") return [];
          const [r, g, b] = match.slice(1, 4).map(Number);
          return r > 80 && r > g * 1.3 && g > b * 1.1
            ? [{ tag: el.tagName, property, value }]
            : [];
        });
      },
    );
  });
  expect(warm).toEqual([]);
});
