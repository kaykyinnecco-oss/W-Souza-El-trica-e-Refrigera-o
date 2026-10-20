import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (entry) => {
  if (entry.type() === "error") errors.push(entry.text());
});
page.on("requestfailed", (request) => errors.push(request.url()));
await page.goto("http://127.0.0.1:4173");
await page.waitForLoadState("networkidle");
await page
  .getByRole("navigation", { name: "Navegação principal", exact: true })
  .getByRole("link", { name: "Serviços", exact: true })
  .click();
await page.waitForTimeout(1200);
await page.screenshot({ path: "artifacts/redesign-showcase-final.png" });
await page
  .getByRole("button", { name: "Próximo sistema", exact: true })
  .click();
await page.waitForTimeout(1000);
const moved = await page
  .locator(".showcase-track")
  .evaluate((el) => getComputedStyle(el).transform !== "none");
await page
  .getByRole("navigation", { name: "Navegação principal", exact: true })
  .getByRole("link", { name: "Contato", exact: true })
  .click();
await page.waitForTimeout(1200);
const contact = await page.locator("#name").isVisible();
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({ path: "artifacts/redesign-hero-final.png" });
const result = {
  url: "http://127.0.0.1:4173",
  errors,
  showcaseMoved: moved,
  contactVisible: contact,
  overflow: await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  ),
};
await writeFile(
  "artifacts/production-smoke.json",
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result));
await browser.close();
