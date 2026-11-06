/*
 * Internshala's interface audit, zoomed to the internship list and details problems.
 * Source: the audit board's original fill in Figma (Portfolio-projects KEABZM1GitiLCq9YTXJdu6, "image 7"
 * 130:29075 inside "Desktop - 3"), 1816 × 952 — more than twice the 813px copy that was on the site.
 * Usage: node tools/mockups/internshala-audit.cjs <path to the 1816px png>
 */
const sharp = require("sharp");
const path = require("path");

const SRC = process.argv[2];
const OUT = path.join(__dirname, "../../public/work/internshala/cs/in-ui-zoom.webp");
const k = 1816 / 813; // the crop below was measured on the 813px copy
const Z = 3;
const crop = { left: 182, top: 21, width: 210, height: 193 };
// Figma frame labels (grey, truncated: "Internship screens pr…"); the white titles below repeat them.
const labels = [
  [272, 16, 62, 9],
  [316, 113, 72, 8],
  [316, 208, 72, 8],
];
const px = (v) => Math.round(v * k);

(async () => {
  const c = { left: px(crop.left), top: px(crop.top), width: px(crop.width), height: px(crop.height) };
  const up = await sharp(SRC).extract(c).removeAlpha().resize(c.width * Z, null, { kernel: "lanczos3" }).sharpen({ sigma: 0.9, m1: 0.4, m2: 1.2 }).png().toBuffer();
  const meta = await sharp(up).metadata();
  const patches = [];
  for (const [x, y, w, h] of labels) {
    const left = Math.max(0, (px(x) - c.left) * Z);
    const top = Math.max(0, (px(y) - c.top) * Z);
    const bottom = Math.min(meta.height, (px(y + h) - c.top) * Z);
    const width = Math.min(meta.width - left, px(w) * Z);
    if (bottom > top) patches.push({ input: { create: { width, height: bottom - top, channels: 3, background: { r: 30, g: 30, b: 30 } } }, left, top });
  }
  await sharp(up).composite(patches).webp({ quality: 90, smartSubsample: true }).toFile(OUT);
  console.log("wrote", OUT, meta.width, meta.height);
})();
