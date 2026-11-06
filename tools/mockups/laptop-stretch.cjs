/*
 * Fits a wide web screen to the laptop screen's exact ratio (0.593) without cropping it or adding a strip:
 * finds the tallest band of plain background (rows with no UI, below the header) and stretches only that band.
 * Gradients stretch seamlessly; text and UI keep their proportions.
 * Usage: node tools/mockups/laptop-stretch.cjs <src> <dest> [headerRows]
 */
const sharp = require("sharp");
const R = 0.593;
const [src, dest, headerArg] = process.argv.slice(2);

(async () => {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const target = Math.round(W * R);
  const add = target - H;
  if (add <= 0) throw new Error(`already ${H}px tall, needs ${target}`);
  const header = +(headerArg || Math.round(H * 0.09));

  // A row is "plain" when its colour barely changes across the width (a flat colour or a vertical gradient).
  const plain = [];
  for (let y = 0; y < H; y++) {
    let min = 255, max = 0;
    for (let x = 0; x < W; x += 3) {
      const i = (y * W + x) * C;
      const v = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    plain.push(max - min < 10);
  }
  let best = [0, 0];
  for (let y = header, start = -1; y <= H; y++) {
    if (y < H && plain[y]) {
      if (start < 0) start = y;
    } else if (start >= 0) {
      if (y - start > best[1] - best[0]) best = [start, y];
      start = -1;
    }
  }
  const [a, b] = best;
  if (b - a < 24) throw new Error("no plain band tall enough to stretch");
  // keep a few rows either side so the stretch never touches UI edges
  const top = a + 4, bot = b - 4;
  const band = await sharp(src).extract({ left: 0, top, width: W, height: bot - top }).resize(W, bot - top + add, { fit: "fill", kernel: "lanczos3" }).toBuffer();
  const above = await sharp(src).extract({ left: 0, top: 0, width: W, height: top }).toBuffer();
  const below = await sharp(src).extract({ left: 0, top: bot, width: W, height: H - bot }).toBuffer();
  await sharp({ create: { width: W, height: target, channels: 3, background: "#fff" } })
    .composite([
      { input: above, left: 0, top: 0 },
      { input: band, left: 0, top },
      { input: below, left: 0, top: bot + add },
    ])
    .webp({ quality: 90, smartSubsample: true })
    .toFile(dest);
  console.log(dest, `${W}×${H} → ${W}×${target}; stretched rows ${top}–${bot} by ${add}px`);
})();
