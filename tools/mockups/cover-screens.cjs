/*
 * Sharper screens for the case study covers: each device screen upscaled (lanczos3) with a light sharpen to
 * at least ~1200px wide, so it stays crisp on 2x/3x displays. The sources are the case studies' own
 * screenshots; outputs go to public/work/covers/*-hd.webp (PNG-quality WebP, alpha kept).
 *
 * Usage: node tools/mockups/cover-screens.cjs
 */
const path = require("path");
const sharp = require("sharp");

const PUB = path.join(__dirname, "../../public");
const JOBS = [
  ["/work/gusto/howworks-mobile.png", "gusto-hd"],
  ["/work/covers/internshala-screen.webp", "internshala-hd"],
  ["/work/natasha/panel-welcome.webp", "natasha-hd"],
  ["/work/zero-noise/m-hero-clean.webp", "zero-noise-hd"],
  ["/work/ratings-reviews/img-rate-clear.webp", "oyo-hd"],
  ["/work/builder-university/frame-1.webp", "university-hd"],
  ["/work/basecamp/img-final-hero.webp", "basecamp-hd"],
];
const TARGET = 1300;

(async () => {
  for (const [src, name] of JOBS) {
    const file = path.join(PUB, src);
    const m = await sharp(file).metadata();
    const scale = Math.max(1, Math.min(4, TARGET / m.width));
    const w = Math.round(m.width * scale);
    await sharp(file)
      .resize(w, null, { kernel: "lanczos3" })
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 1.1 })
      .webp({ quality: 94, alphaQuality: 100, smartSubsample: true })
      .toFile(path.join(PUB, "work/covers", `${name}.webp`));
    console.log(name, m.width, "→", w);
  }
})();
