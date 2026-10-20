import sharp from "sharp";
import { copyFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
const out = "public/assets";
await mkdir(out, { recursive: true });
const original = resolve(process.argv[2] || `${out}/logo-original.png`);
if (original !== resolve(`${out}/logo-original.png`)) {
  await copyFile(original, `${out}/logo-original.png`);
}
// Crop transparent margins only. The official artwork and proportions remain intact.
await sharp(original)
  .trim()
  .resize({ width: 600 })
  .png()
  .toFile(`${out}/logo.png`);
await sharp(original)
  .trim()
  .resize({ width: 360 })
  .webp({ quality: 95 })
  .toFile(`${out}/logo.webp`);
await sharp(original)
  .extract({ left: 245, top: 295, width: 760, height: 465 })
  .resize(192, 192, { fit: "contain", background: "#020042" })
  .png()
  .toFile(`${out}/favicon.png`);
const downloads = [
  [
    "daikin.png",
    "https://www.daikin.com/-/media/Project/Daikin/daikin_com/dg_common/images/logo_daikin-png.png",
  ],
  ["gree.png", "https://gree.com.br/wp-content/uploads/2025/01/logo-1.png"],
  [
    "samsung.png",
    "https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/logo-square-letter.png",
  ],
  [
    "lg.svg",
    "https://www.lg.com/content/dam/lge/common/logo/logo-lg-100-44.svg",
  ],
  [
    "midea.webp",
    "https://web-res.midea.com/content/dam/brandbook/midea/general/midea-logo.webp",
  ],
  [
    "architecture.webp",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  ],
  [
    "office.webp",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  ],
];
await Promise.all(
  downloads.map(async ([name, url]) => {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw Error(`${response.status}`);
      const body = Buffer.from(await response.arrayBuffer());
      if (name === "samsung.png") {
        await writeFile(`${out}/${name}`, body);
      } else if (name.endsWith(".svg")) {
        if (!body.toString().includes("<svg")) throw Error("Not SVG");
        await writeFile(`${out}/${name}`, body);
      } else
        await sharp(body)
          .webp({ quality: 85 })
          .toFile(`${out}/${name.replace(".png", ".webp")}`);
      console.log("Saved", name);
    } catch (e) {
      console.error(name, e.message);
    }
  }),
);
