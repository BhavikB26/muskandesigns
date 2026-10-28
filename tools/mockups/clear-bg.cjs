// Makes the near-white background around a baked device mockup transparent (flood fill from the edges,
// so white inside the screens stays). Usage: node tools/mockups/clear-bg.cjs in.webp out.webp
const sharp = require("sharp");

async function clear(input, output) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
  const bg = (i) => {
    const [r, g, b] = px(i);
    return Math.min(r, g, b) > 236 && Math.max(r, g, b) - Math.min(r, g, b) < 14;
  };
  const seen = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const i = stack.pop();
    if (seen[i] || !bg(i)) continue;
    seen[i] = 1;
    data[i * 4 + 3] = 0;
    const x = i % W;
    if (x > 0) stack.push(i - 1);
    if (x < W - 1) stack.push(i + 1);
    if (i >= W) stack.push(i - W);
    if (i < W * (H - 1)) stack.push(i + W);
  }
  // Soften the edge: light pixels touching the cleared area fade with their lightness (no white halo).
  for (let i = 0; i < W * H; i++) {
    if (seen[i]) continue;
    const x = i % W;
    const near = (x > 0 && seen[i - 1]) || (x < W - 1 && seen[i + 1]) || (i >= W && seen[i - W]) || (i < W * (H - 1) && seen[i + W]);
    if (!near) continue;
    const m = Math.min(...px(i));
    if (m > 170) data[i * 4 + 3] = Math.round(255 * Math.max(0, (255 - m) / 85));
  }
  await sharp(data, { raw: { width: W, height: H, channels: 4 } }).trim({ threshold: 0 }).webp({ quality: 92, alphaQuality: 100 }).toFile(output);
}

clear(process.argv[2], process.argv[3]).then(() => console.log("cleared", process.argv[3]));
