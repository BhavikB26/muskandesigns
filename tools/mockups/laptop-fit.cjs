/*
 * Copies of web screens at the laptop screen's exact ratio (0.593), so a laptop never trims their sides.
 * Shorter screens are extended at the bottom with their own edge colour; taller ones keep their top.
 * Usage: node tools/mockups/laptop-fit.cjs public/work/gusto/carousel-1.png …  → writes <name>-l.webp beside each.
 */
const sharp = require("sharp");
const R = 0.593;
(async () => {
  for (const src of process.argv.slice(2)) {
    const { width: w, height: h } = await sharp(src, { limitInputPixels: false }).metadata();
    const H = Math.round(w * R);
    const img = sharp(src, { limitInputPixels: false });
    const out = h < H ? img.extend({ bottom: H - h, extendWith: "copy" }) : img.extract({ left: 0, top: 0, width: w, height: H });
    const dest = src.replace(/\.(png|webp|jpe?g)$/, "-l.webp");
    await out.webp({ quality: 90, smartSubsample: true }).toFile(dest);
    console.log(dest, `${w}×${h}`, h < H ? `extended +${H - h}` : `top ${H} of ${h}`);
  }
})();
