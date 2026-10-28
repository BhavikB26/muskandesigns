/*
 * Zero Noise phone screenshots, cleaned for the case study:
 * - m-hero: the captured nav was a half-width white panel cut off mid-screen (with the "Free · 60 seconds"
 *   badge peeking out under it). It is rebuilt as a full-width bar from the screenshot's own title and icons.
 * - m-estimate: the next section's card ("Your list could be worth more…") is removed from the bottom.
 *
 * Usage: node tools/mockups/zero-noise-phones.cjs → public/work/zero-noise/{m-hero,m-estimate}-clean.webp
 */
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "../../public/work/zero-noise");
const W = 600;
const BAR = 140; // the new nav bar's height (covers the old panel and the badge under it)

(async () => {
  // Nav: a white bar with a hairline, the title block on the left and the two icons on the right.
  const hero = path.join(DIR, "m-hero.webp");
  const title = await sharp(hero).extract({ left: 20, top: 22, width: 211, height: 78 }).toBuffer();
  const icons = await sharp(hero).extract({ left: 232, top: 20, width: 140, height: 84 }).toBuffer();
  const line = Buffer.from(`<svg width="${W}" height="1"><rect width="${W}" height="1" fill="#f1e3e8"/></svg>`);
  await sharp(hero)
    .composite([
      { input: { create: { width: W, height: BAR, channels: 3, background: "#ffffff" } }, left: 0, top: 0 },
      { input: line, left: 0, top: BAR - 1 },
      { input: title, left: 28, top: 30 },
      { input: icons, left: W - 140 - 24, top: 28 },
    ])
    .webp({ quality: 92 })
    .toFile(path.join(DIR, "m-hero-clean.webp"));

  // Estimate: everything from y 995 down repainted with the row just above it (the plain page background).
  const est = path.join(DIR, "m-estimate.webp");
  const meta = await sharp(est).metadata();
  const row = await sharp(est).extract({ left: 0, top: 990, width: W, height: 1 }).resize(W, meta.height - 995, { kernel: "nearest" }).toBuffer();
  await sharp(est).composite([{ input: row, left: 0, top: 995 }]).webp({ quality: 92 }).toFile(path.join(DIR, "m-estimate-clean.webp"));
  console.log("ok");
})();
