/*
 * ProPilot's laptop screens, fitted to the laptop's page area (0.593 tall to 1 wide), so each sits still and
 * whole. Too-tall screenshots keep the top of the page, like a browser window; too-wide ones get extra
 * background above or below, so their sides are not trimmed. Enlarged with a light sharpen.
 *
 * sol4-summary-screen.webp is not made here: it is a browser window rebuilt around a 1080p frame of the video.
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

  console.log("ok");
})();
