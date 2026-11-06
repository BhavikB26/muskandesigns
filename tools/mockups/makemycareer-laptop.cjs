/*
 * MakeMyCareer screens at the laptop screen's exact ratio (0.593: 16:10 minus the menu-bar strip), so a laptop
 * never trims their sides. Shorter screens (1920 × 1080) are extended at the bottom with their own edge colour;
 * taller ones keep their top, as a real laptop shows the top of a page. Writes <name>-l.webp beside each.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "../../public/work/makemycareer");
const R = 0.593;
(async () => {
  for (const f of fs.readdirSync(dir).filter((x) => /\.webp$/.test(x) && !/-l\.webp$|^thumb/.test(x))) {
    const src = path.join(dir, f);
    const { width: w, height: h } = await sharp(src).metadata();
    const H = Math.round(w * R);
    const img = sharp(src);
    const out = h < H ? img.extend({ bottom: H - h, extendWith: "copy" }) : img.extract({ left: 0, top: 0, width: w, height: H });
    await out.webp({ quality: 88, smartSubsample: true }).toFile(src.replace(/\.webp$/, "-l.webp"));
    console.log(f.padEnd(26), `${w}×${h}`, h < H ? `extended +${H - h}` : `top ${H} of ${h}`);
  }
})();
