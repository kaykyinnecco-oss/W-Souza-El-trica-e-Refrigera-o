import sharp from "sharp";
for (const name of [
  "hero",
  "maintenance",
  "electrical",
  "architecture",
  "office",
]) {
  for (const width of [768, 1280]) {
    await sharp(`public/assets/${name}.webp`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 79 })
      .toFile(`public/assets/${name}-${width}.webp`);
  }
}
await sharp("public/assets/logo.webp")
  .resize(180)
  .webp({ quality: 92 })
  .toFile("public/assets/logo-180.webp");
