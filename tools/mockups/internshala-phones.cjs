/*
 * Internshala phone mockups rebuilt from their original image fills in the Portfolio-projects Figma file
 * (KEABZM1GitiLCq9YTXJdu6, "Desktop - 3" 130:28407): 410px phones instead of the 266px crops.
 * Rows keep the board's own geometry (phones 308 wide at x 124 / 566 / 1008, so the screen labels in
 * case-studies.ts still sit under each phone). Usage: node tools/mockups/internshala-phones.cjs <folder of fills>
 */
const sharp = require("sharp");
const path = require("path");
const SRC = process.argv[2];
const OUT = path.join(__dirname, "../../public/work/internshala/cs");

const ROWS = {
  "in-search-hd": ["s1", "s2", "s3"], // 130:29121-23, Search and Preferences
  "in-saved-hd": ["v1", "v2", "v3"], // 130:29144-46, Saved Responses
  "in-drafts-hd": ["d1", "d2", "d3"], // 130:29156-58, Draft Applications
};
const SINGLES = {
  "in-tracking-hd": "track-a", // 130:29178
  "in-chats-hd": "chat-a", // 130:29204
  "in-notify-hd": "notify-a", // 130:29209
  "in-drafts-2-hd": "drafts-a", // 130:29159
  "in-onboarding-2-hd": "act-a", // 130:29106 "Activation"
};

(async () => {
  for (const [name, files] of Object.entries(ROWS)) {
    const first = await sharp(path.join(SRC, `${files[0]}.png`)).metadata();
    const k = first.width / 308; // the fills' scale against the board
    const W = Math.round(1192 * k);
    const H = Math.round(649 * k);
    const layers = await Promise.all(
      files.map(async (f, i) => ({
        input: await sharp(path.join(SRC, `${f}.png`)).resize(Math.round(308 * k)).png().toBuffer(),
        left: Math.round(i * 442 * k),
        top: 0,
      })),
    );
    await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(layers)
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(path.join(OUT, `${name}.webp`));
    console.log(name, W, H);
  }
  for (const [name, f] of Object.entries(SINGLES)) {
    await sharp(path.join(SRC, `${f}.png`)).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT, `${name}.webp`));
    console.log(name);
  }
})();
