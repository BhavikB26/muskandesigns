/*
 * Stills for the hero's monitor: the top of the case-studies section, rendered large and then downsampled,
 * so the tiny page in the glass looks like a real screen instead of the live page shrunk to a few percent
 * (which aliases into a pixelated, shimmering mess). One per theme and per layout width.
 *
 * Captured at several layout widths so the still lines up with the live page when it takes over (a still
 * from another width ghosts against it). Wider than 1440 the content stops growing and just centres, so
 * the 1440 still serves every wider screen, placed at true size (see screenStill in components/home/hero.tsx).
 *
 * Needs the site running on http://localhost:3111 (next start). Usage: node tools/mockups/screen-stills.cjs
 * Writes public/home/screen/{light,dark}-{390,768,1024,1152,1280,1366,1440}.webp.
 */
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer-core");
const sharp = require("sharp");

const OUT = path.join(__dirname, "../../public/home/screen");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const LAYOUTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1152, height: 864 },
  { width: 1280, height: 800 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
];
// Wide enough to stay sharp while the page grows out of the glass (it hands over to the live page by then).
const outWidth = (w) => Math.min(1200, w * 1.5);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ protocolTimeout: 180000, executablePath: CHROME, headless: "new" });
  for (const theme of ["light", "dark"]) {
    // One tab per theme (opening a tab per width stalled Chrome).
    const page = await browser.newPage();
    for (const l of LAYOUTS) {
      await page.setViewport({ width: l.width, height: l.height, deviceScaleFactor: 3 });
      // Reduced motion: the section sits in normal flow, and the thumbnails hold a still frame.
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      if (l === LAYOUTS[0]) await page.evaluateOnNewDocument((t) => localStorage.setItem("theme", t), theme);
      await page.goto("http://localhost:3111/", { waitUntil: "load", timeout: 120000 });
      const top = await page.evaluate(() => {
        const s = document.getElementById("work");
        s.scrollIntoView();
        return s.getBoundingClientRect().top + window.scrollY;
      });
      await new Promise((r) => setTimeout(r, 3000)); // lazy images and reveals
      // Everything the glass can show: the section's top, as tall as it is wide.
      const buf = await page.screenshot({ clip: { x: 0, y: top, width: l.width, height: l.width }, captureBeyondViewport: true });
      const file = path.join(OUT, `${theme}-${l.width}.webp`);
      await sharp(buf).resize(outWidth(l.width), null, { kernel: "lanczos3" }).webp({ quality: 90 }).toFile(file);
      console.log(file);
    }
    await page.close();
  }
  await browser.close();
})();
