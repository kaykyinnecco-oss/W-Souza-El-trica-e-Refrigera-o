import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const errors = [];
const sizes = [360, 390, 430, 768, 1024, 1440];
const records = [];
await mkdir("artifacts/responsive", { recursive: true });
for (const width of sizes) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push({ width, error: e.message }));
  await page.goto("http://127.0.0.1:5173");
  await page.waitForLoadState("networkidle");
  for (const [name, selector] of [
    ["hero", "#inicio"],
    ["electrical", "#eletrica"],
    ["systems", "#sistemas"],
    ["contact", "#contato"],
  ]) {
    await page.locator(selector).evaluate((el) =>
      window.scrollTo({
        top:
          el.getBoundingClientRect().top +
          window.scrollY -
          document.querySelector("header").offsetHeight,
        behavior: "instant",
      }),
    );
    if (name === "hero") await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(120);
    const path = `artifacts/responsive/${name}-${width}.png`;
    await page.screenshot({ path });
    records.push({
      width,
      section: name,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
  }
  await page.close();
}
await browser.close();
for (const section of ["hero", "electrical", "systems", "contact"]) {
  const composites = [];
  let x = 0;
  for (const width of sizes) {
    const path = `artifacts/responsive/${section}-${width}.png`;
    const buffer = await sharp(path).resize({ width: 300 }).toBuffer();
    const meta = await sharp(buffer).metadata();
    composites.push({ input: buffer, left: x, top: 30 });
    x += 300;
  }
  const height = Math.ceil((900 * 300) / 360) + 30;
  await sharp({
    create: { width: x, height, channels: 3, background: "#dfe7f3" },
  })
    .composite(composites)
    .png()
    .toFile(`artifacts/redesign-responsive-${section}.png`);
}
await writeFile(
  "artifacts/responsive/results.json",
  JSON.stringify({ sizes, records, errors }, null, 2),
);
console.log(
  JSON.stringify({
    widths: sizes,
    overflow: records.filter((r) => r.overflow),
    errors,
  }),
);
