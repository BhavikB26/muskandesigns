/*
 * OYO "current state" phones, cut out of the exported annotated images so the notes and arrows can be drawn
 * live on the page instead (the exports had the handwriting baked in and cut off at the edges).
 * For each: crop to the phone, make the white around it transparent (a flood fill from the edges, which the
 * phone's frame stops), and paint over the red arrow strokes that crossed the screen with nearby pixels.
 *
 * Usage: node tools/mockups/oyo-phones.cjs → public/work/ratings-reviews/phone-{current,listing}-clear.webp
 */
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "../../public/work/ratings-reviews");
// box: the crop. arrows: where the arrow strokes cross the phone (crop coordinates), the only place red is
// painted over, so red that belongs to the app (the rating star, a red pillow) stays. keep: never touched.
// openBottom: the phone runs off the image's bottom edge, so the fill must not start there (it would pour
// into the screen).
const JOBS = [
  {
    src: "img-current.webp",
    out: "phone-current-clear.webp",
    box: { left: 44, top: 162, right: 416, bottom: 830 },
    arrows: [{ x0: 200, y0: 0, x1: 372, y1: 240 }],
    keep: [],
    openBottom: true,
    // Lines the arrow crossed, set again over the repaired pixels (box in crop px, then the text).
    retype: [
      { x: 38, y: 92, w: 262, h: 19, bg: "#2d2d2d", color: "#ffffff", size: 12.6, text: "Thank you for staying with us, Johnathan." },
      { x: 64, y: 158, w: 262, h: 20, bg: null, color: "#16834f", size: 12.6, text: "₹250 credited to your OYO Money wallet" },
    ],
  },
  {
    src: "img-pain-points.webp",
    out: "phone-listing-clear.webp",
    box: { left: 245, top: 165, right: 617, bottom: 916 },
    arrows: [{ x0: 0, y0: 0, x1: 130, y1: 120 }],
    keep: [{ x0: 34, y0: 112, x1: 56, y1: 134 }], // the rating star
    openBottom: false,
  },
];
const inBox = (x, y, b) => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1;

// Inside an arrow's path only, so a loose test is safe: it also catches the stroke's soft edges, which over
// the dark header are a dull dark red rather than red.
const isRed = (r, g, b) => r - g > 22 && r - b > 18;

(async () => {
  for (const j of JOBS) {
    const width = j.box.right - j.box.left;
    const height = j.box.bottom - j.box.top;
    const { data, info } = await sharp(path.join(DIR, j.src))
      .extract({ left: j.box.left, top: j.box.top, width, height })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const W = info.width;
    const H = info.height;
    const out = Buffer.alloc(W * H * 4);
    for (let i = 0; i < W * H; i++) {
      out[i * 4] = data[i * 3];
      out[i * 4 + 1] = data[i * 3 + 1];
      out[i * 4 + 2] = data[i * 3 + 2];
      out[i * 4 + 3] = 255;
    }
    const px = (x, y) => (y * W + x) * 4;

    // 1. The red arrow strokes (and their soft edges): fill each from the nearest clean pixel on its row.
    const red = new Uint8Array(W * H);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = px(x, y);
        const where = j.arrows.some((b) => inBox(x, y, b)) && !j.keep.some((b) => inBox(x, y, b));
        if (where && isRed(out[i], out[i + 1], out[i + 2])) red[y * W + x] = 1;
      }
    // grow the mask by 2px so anti-aliased edges go too
    const grown = new Uint8Array(red);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++)
        if (red[y * W + x])
          for (let dy = -2; dy <= 2; dy++)
            for (let dx = -2; dx <= 2; dx++) {
              const xx = x + dx, yy = y + dy;
              if (xx >= 0 && yy >= 0 && xx < W && yy < H && !j.keep.some((b) => inBox(xx, yy, b))) grown[yy * W + xx] = 1;
            }
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        if (!grown[y * W + x]) continue;
        let l = x, r = x;
        while (l > 0 && grown[y * W + l]) l--;
        while (r < W - 1 && grown[y * W + r]) r++;
        // the closer side wins; equal → blend
        const a = px(l, y), b = px(r, y), t = (x - l) / Math.max(1, r - l);
        const i = px(x, y);
        for (let c = 0; c < 3; c++) out[i + c] = Math.round(out[a + c] * (1 - t) + out[b + c] * t);
      }

    // 2. Transparent outside the phone: flood fill near-white from the crop's edges.
    const seen = new Uint8Array(W * H);
    const stack = [];
    for (let x = 0; x < W; x++) stack.push([x, 0], ...(j.openBottom ? [] : [[x, H - 1]]));
    for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || y < 0 || x >= W || y >= H || seen[y * W + x]) continue;
      const i = px(x, y);
      if (Math.min(out[i], out[i + 1], out[i + 2]) < 238) continue;
      seen[y * W + x] = 1;
      out[i + 3] = 0;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    // soften the cut edge: half-transparent where a kept pixel touches the cleared area and is light
    for (let y = 1; y < H - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        const i = px(x, y);
        if (out[i + 3] === 0) continue;
        const near = seen[y * W + x - 1] || seen[y * W + x + 1] || seen[(y - 1) * W + x] || seen[(y + 1) * W + x];
        if (near && Math.min(out[i], out[i + 1], out[i + 2]) > 200) out[i + 3] = 140;
      }

    // 3. Re-set lines the arrow crossed: cover the old line with its background (sampled from the line's
    // own left edge when no colour is given), then draw the text again.
    let img = sharp(out, { raw: { width: W, height: H, channels: 4 } });
    if (j.retype?.length) {
      const svg = j.retype
        .map((t) => {
          const i = px(t.x - 2, t.y + Math.round(t.h / 2));
          const bg = t.bg ?? `rgb(${out[i]},${out[i + 1]},${out[i + 2]})`;
          return `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" fill="${bg}"/><text x="${t.x}" y="${t.y + t.h * 0.72}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="${t.size}" fill="${t.color}">${t.text}</text>`;
        })
        .join("");
      const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${svg}</svg>`);
      img = sharp(await img.composite([{ input: overlay }]).png().toBuffer());
    }
    await img.webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(DIR, j.out));
    console.log(j.out, W, H);
  }
})();
