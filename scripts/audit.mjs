import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  args: ["--remote-debugging-port=9222"],
});
try {
  await mkdir("artifacts", { recursive: true });
  const result = await lighthouse("http://127.0.0.1:4173/", {
    port: 9222,
    output: ["json", "html"],
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result) throw Error("Lighthouse não retornou relatório.");
  await writeFile("artifacts/lighthouse-mobile.json", result.report[0]);
  await writeFile("artifacts/lighthouse-mobile.html", result.report[1]);
  console.log(
    JSON.stringify(
      Object.fromEntries(
        Object.entries(result.lhr.categories).map(([k, v]) => [k, v.score]),
      ),
    ),
  );
  for (const id of [
    "first-contentful-paint",
    "largest-contentful-paint",
    "cumulative-layout-shift",
    "total-blocking-time",
  ])
    console.log(id, result.lhr.audits[id].displayValue);
} finally {
  await browser.close();
}
