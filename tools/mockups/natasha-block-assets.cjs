/*
 * Cuts the Natasha and BLOCK case-study assets out of Figma exports (Project Hublot file nyq6KkmQcbeUBx17MVWdNB).
 * Usage: node tools/mockups/natasha-block-assets.cjs <folder with the exports>
 *
 * Exports expected in that folder (all from the Figma MCP download_assets tool):
 *   nat-immersive.png  14280:68199 "Natasha immersive" at 2x   (Welcome, Chat, Talk, In page)
 *   nat-panel.png      10432:171491 "natasha side panel" at 3x (default, welcome, Talk)
 *   nat-components.png 10406:170726 "Natasha components" at 2x
 *   btn-set.png        7252:11132 BLOCK "Button" component set at 2x
 *   g3.gif g6.gif g7.gif g8.gif  orb animations from 10442:172131 "Natasha gif"
 * Positions below are the symbols' x/y/width/height inside each exported node (from get_metadata).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = process.argv[2];
const OUT = path.join(__dirname, "../../public/work");
const NAT = path.join(OUT, "natasha/v2");
const BLK = path.join(OUT, "builder-design-system/v2");
fs.mkdirSync(NAT, { recursive: true });
fs.mkdirSync(path.join(BLK, "buttons"), { recursive: true });
const big = { limitInputPixels: false };

async function cut(file, scale, [x, y, w, h], out, { pad = 0, q = 88, lossless = false } = {}) {
  const left = Math.round((x - pad) * scale);
  const top = Math.round((y - pad) * scale);
  const width = Math.round((w + pad * 2) * scale);
  const height = Math.round((h + pad * 2) * scale);
  await sharp(path.join(SRC, file), big).extract({ left, top, width, height }).webp(lossless ? { lossless: true } : { quality: q, smartSubsample: true }).toFile(out);
}

(async () => {
  // Immersive conversation: four 1440 × 788 screens.
  const imm = { welcome: 20, chat: 828, talk: 1636, inpage: 2444 };
  for (const [k, y] of Object.entries(imm)) await cut("nat-immersive.png", 2, [20, y, 1440, 788], path.join(NAT, `imm-${k}.webp`));

  // Side panel: three 402 × 840 panels.
  const panel = { chat: 20, welcome: 442, talk: 864 };
  for (const [k, x] of Object.entries(panel)) await cut("nat-panel.png", 3, [x, 20, 402, 840], path.join(NAT, `panel-${k}.webp`));

  // Components section (origin = the section's top-left).
  const bar = [223 + 40, 2160 + 40]; // the export runs 40 units past the section on each side
  const bars = { start: [24, 29], listening: [24, 137], thinking: [22, 245], interrupt: [26, 353] };
  for (const [k, [x, y]] of Object.entries(bars)) await cut("nat-components.png", 2, [bar[0] + x, bar[1] + y, 1436, 70], path.join(NAT, `bar-${k}.webp`), { lossless: true });

  const chips = [245 + 40, 1128 + 40];
  const chip = { default: [20, 10, 202, 36], hover: [20, 122, 202, 36], selected: [20, 178, 202, 36], disabled: [20, 66, 202, 36] };
  for (const [k, [x, y, w, h]] of Object.entries(chip)) await cut("nat-components.png", 2, [chips[0] + x, chips[1] + y, w, h], path.join(NAT, `chip-${k}.webp`), { pad: 4, lossless: true });

  const nb = [245 + 40, 176 + 40];
  const natBtn = { default: 20, hover: 189, focus: 374, disabled: 557 };
  for (const [k, y] of Object.entries(natBtn)) await cut("nat-components.png", 2, [nb[0] + 240, nb[1] + y, 139, 48], path.join(NAT, `btn-${k}.webp`), { pad: 6, lossless: true });

  // Orb animations: crop to the orb (the frames are mostly empty) and re-encode as animated WebP.
  const orbs = { listening: "g8.gif", thinking: "g3.gif", speaking: "g6.gif", paused: "g7.gif" };
  for (const [k, f] of Object.entries(orbs)) {
    const meta = await sharp(path.join(SRC, f), { ...big, animated: true }).metadata();
    const ph = meta.pageHeight;
    const S = 800; // a square around the orb, at the GIF's 2x (wide enough for the thinking dots and speaking bars)
    const left = Math.round((meta.width - S) / 2);
    const top = Math.round((ph - S) / 2);
    const frames = [];
    for (let i = 0; i < meta.pages; i++) {
      if (i % 2) continue; // every other frame, each shown twice as long
      frames.push(await sharp(path.join(SRC, f), { ...big, page: i }).extract({ left, top, width: S, height: S }).resize(320).png().toBuffer());
    }
    await sharp(frames, { join: { animated: true } })
      .webp({ quality: 70, delay: meta.delay.filter((_, i) => i % 2 === 0).map((d) => d * 2), loop: 0, effort: 5 })
      .toFile(path.join(NAT, `orb-${k}.webp`));
    await sharp(frames[Math.floor(frames.length / 2)]).webp({ quality: 88 }).toFile(path.join(NAT, `orb-${k}-still.webp`));
    console.log("orb", k, meta.pages, "frames");
  }

  // BLOCK buttons: every Type=Default variant (positions inside the component set).
  const btns = JSON.parse(fs.readFileSync(path.join(SRC, "btns.json"), "utf8"));
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
  const keep = ["Primary", "Secondary", "Alternative", "Alternative Secondary", "Tertiary", "Warning", "Salmon", "Blue"];
  let n = 0;
  for (const b of btns) {
    if (!keep.includes(b.style)) continue;
    await cut("btn-set.png", 2, [b.x, b.y, b.w, b.h], path.join(BLK, "buttons", `${slug(b.style)}--${slug(b.size)}--${slug(b.state)}.webp`), { pad: 5, lossless: true });
    n++;
  }
  console.log("buttons", n);
})();
