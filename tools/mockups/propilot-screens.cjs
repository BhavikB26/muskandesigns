/*
 * ProPilot's laptop screens, fitted to the laptop's page area (0.593 tall to 1 wide), so each sits still and
 * whole. Too-tall screenshots keep the top of the page, like a browser window; too-wide ones get extra
 * background above or below, so their sides are not trimmed. Enlarged with a light sharpen.
 *
 * Usage: node tools/mockups/propilot-screens.cjs → public/work/ai-mentor/exact/*-screen.webp
 */
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "../../public/work/ai-mentor/exact");
const RATIO = 0.593;
const WIDTH = 1800;

const save = (buf, name) =>
  sharp(buf)
    .resize(WIDTH, null, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.7, m1: 0.5, m2: 1.1 })
    .webp({ quality: 93 })
    .toFile(path.join(DIR, `${name}-screen.webp`));

/** Rows of near-white at the very top (a stray strip above the browser's own bar). */
async function whiteTop(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < 60; y++) if (data[(y * info.width + 8) * 3] < 200) return y;
  return 0;
}

(async () => {
  for (const name of ["sol1", "sol2-after", "sol3-quiz"]) {
    const file = path.join(DIR, `${name}.png`);
    const { width } = await sharp(file).metadata();
    await save(await sharp(file).extract({ left: 0, top: 0, width, height: Math.round(width * RATIO) }).png().toBuffer(), name);
  }

  const mvp = path.join(DIR, "mvp-screenshot.png");
  const m = await sharp(mvp).metadata();
  const extra = Math.round(m.width * RATIO) - m.height;
  await save(await sharp(mvp).extend({ top: Math.floor(extra / 2), bottom: Math.ceil(extra / 2), extendWith: "copy" }).png().toBuffer(), "mvp");

  const sum = path.join(DIR, "sol4-summary.png");
  const s = await sharp(sum).metadata();
  const top = await whiteTop(sum);
  const trimmed = await sharp(sum).extract({ left: 0, top, width: s.width, height: s.height - top }).png().toBuffer();
  const bottom = Math.round(s.width * RATIO) - (s.height - top);
  await save(await sharp(trimmed).extend({ bottom, background: { r: 16, g: 16, b: 16 } }).png().toBuffer(), "sol4-summary");
  console.log("ok", { top, bottom });
})();
