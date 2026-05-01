/**
 * Rasterizes public/brand/logo-icon.svg to PNG fallbacks (transparent where applicable).
 * Run: npm run generate-brand-pngs
 */
const fs = require("fs");
const path = require("path");

async function main() {
  const sharp = require("sharp");
  const svgPath = path.join(__dirname, "../public/brand/logo-icon.svg");
  const svg = fs.readFileSync(svgPath);
  const outDir = path.join(__dirname, "../public/brand");

  for (const size of [512, 1024, 2048]) {
    const out = path.join(outDir, `logo-icon-${size}.png`);
    await sharp(svg).resize(size, size).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(out);
    console.log("Wrote", path.relative(process.cwd(), out));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
