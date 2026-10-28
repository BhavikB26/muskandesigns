/*
 * Internshala flow mockups: the screen labels were baked into the exports at mismatched sizes (and cut off
 * at the bottom edge on two). This removes them so the page can set them as real text (see `screens` on a
 * Shot in content/case-studies.ts): rows of label pixels are cleared to transparent, and a single-row image
 * is cropped just under its phones. The flow arrow between the onboarding rows is kept.
 *
 * Usage: node tools/mockups/internshala-labels.cjs → public/work/internshala/cs/<name>-clean.webp
 */
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "../../public/work/internshala/cs");
// clear: label rows [from, to) made transparent. height: crop the image to this many rows.
const JOBS = [
  { name: "in-search", height: 563 },
  { name: "in-saved", height: 564 },
  { name: "in-drafts", height: 563 },
  { name: "in-onboarding", clear: [[563, 590]], height: 1274 },
  // one phone each (application tracking)
  { name: "in-tracking", height: 563 },
  { name: "in-chats", height: 563 },
  { name: "in-notify", height: 755 },
];

(async () => {
  for (const j of JOBS) {
    const src = path.join(DIR, `${j.name}.webp`);
    const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const [from, to] of j.clear ?? []) {
      for (let y = from; y < to; y++) for (let x = 0; x < info.width; x++) data[(y * info.width + x) * 4 + 3] = 0;
    }
    await sharp(data, { raw: info })
      .extract({ left: 0, top: 0, width: info.width, height: j.height })
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(path.join(DIR, `${j.name}-clean.webp`));
    console.log(j.name, info.width, j.height);
  }
})();
