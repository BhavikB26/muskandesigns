/*
 * Short looping clips of the live Zero Noise calculator, for the case study's laptop and phone mockups:
 * a visible cursor picks business types, drags the two sliders and runs the calculation.
 *
 * Frames come from Chrome's screencast, are resampled to an even frame rate and saved as animated WebP
 * (no ffmpeg needed). The first frame is also saved as a still, used when motion is paused or reduced.
 * POSTs to the site's API are blocked, so nothing is ever submitted.
 *
 * Usage: node tools/mockups/zero-noise-clips.cjs → public/work/zero-noise/clip-{desktop,mobile}{,-still}.webp
 */
const path = require("path");
const puppeteer = require("puppeteer-core");
const sharp = require("sharp");

const URL = "https://ishikaa-jain.vercel.app/";
const OUT = path.join(__dirname, "../../public/work/zero-noise");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FPS = 12;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// A cursor drawn into the page (headless screenshots have none), with a ripple on every press.
const CURSOR = (touch) => `
  (() => {
    const c = document.createElement("div");
    c.id = "__cursor";
    c.style.cssText = "position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;transition:transform 60ms linear;" +
      (${touch} ? "width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:rgba(20,20,20,.22);border:2px solid rgba(255,255,255,.9);box-shadow:0 2px 8px rgba(0,0,0,.25);"
                : "width:22px;height:22px;");
    if (!${touch}) c.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.4-6.8L4 20z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.documentElement.appendChild(c);
    addEventListener("mousemove", (e) => { c.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)"; }, true);
    addEventListener("mousedown", (e) => {
      const r = document.createElement("div");
      r.style.cssText = "position:fixed;z-index:2147483646;pointer-events:none;left:" + (e.clientX - 18) + "px;top:" + (e.clientY - 18) + "px;width:36px;height:36px;border-radius:50%;border:2px solid #e8457c;opacity:.9;transition:transform .45s ease-out,opacity .45s ease-out";
      document.documentElement.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = "scale(1.8)"; r.style.opacity = "0"; });
      setTimeout(() => r.remove(), 500);
      if (${touch}) c.style.background = "rgba(232,69,124,.35)";
    }, true);
    addEventListener("mouseup", () => { if (${touch}) c.style.background = "rgba(20,20,20,.22)"; }, true);
  })();`;

async function record({ name, width, height, scale, touch, script, start = [0.7, 0.75] }) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", protocolTimeout: 180000 });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (r) => (/\/api\//.test(r.url()) && r.method() !== "GET" ? r.abort() : r.continue()));
  await page.setViewport({ width, height, deviceScaleFactor: scale, isMobile: touch, hasTouch: false });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
  await page.evaluate(CURSOR(touch));
  const el = async (sel, text) =>
    page.evaluateHandle((sel, text) => [...document.querySelectorAll(sel)].find((e) => !text || (e.innerText || "").trim().startsWith(text)), sel, text);
  const box = async (sel, text) => (await el(sel, text)).asElement().boundingBox();

  // Glide the cursor between points (real mouse events, so hover states and the cursor both follow).
  let at = { x: width * start[0], y: height * start[1] };
  await page.mouse.move(at.x, at.y);
  const glide = async (x, y, ms = 500) => {
    const steps = Math.max(8, Math.round(ms / 30));
    const from = at;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps, e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      await page.mouse.move(from.x + (x - from.x) * e, from.y + (y - from.y) * e);
      await sleep(ms / steps);
    }
    at = { x, y };
  };
  const click = async (sel, text) => {
    const target = await el(sel, text);
    // The point nearest the centre that actually hits the element (the results carousel's scroll area
    // overlaps the top of its arrow buttons, so their centres land on the carousel instead).
    const pt = await target.evaluate((e) => {
      const r = e.getBoundingClientRect();
      const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
      let best = [cx, cy], d = Infinity;
      for (let y = r.y + 2; y < r.bottom - 1; y += 2)
        for (let x = r.x + 2; x < r.right - 1; x += 2) {
          const h = document.elementFromPoint(x, y);
          const dist = (x - cx) ** 2 + (y - cy) ** 2;
          if (h && (h === e || e.contains(h)) && dist < d) { d = dist; best = [x, y]; }
        }
      return best;
    });
    await glide(pt[0], pt[1]);
    await sleep(120);
    await page.mouse.down();
    await sleep(90);
    await page.mouse.up();
    await sleep(650);
  };
  // Drag a range input's thumb to a fraction of its track.
  const drag = async (index, to, ms = 1100) => {
    const ranges = await page.$$('input[type="range"]');
    const r = await ranges[index].boundingBox();
    const val = await ranges[index].evaluate((i) => (i.value - i.min) / (i.max - i.min));
    const y = r.y + r.height / 2;
    await glide(r.x + r.width * val, y);
    await sleep(120);
    await page.mouse.down();
    const steps = Math.round(ms / 30);
    for (let i = 1; i <= steps; i++) {
      const t = i / steps, e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      await page.mouse.move(r.x + r.width * (val + (to - val) * e), y);
      await sleep(ms / steps);
    }
    at = { x: r.x + r.width * to, y };
    await page.mouse.up();
    await sleep(600);
  };

  // Record: the screencast's frames with their timestamps.
  const cdp = await page.createCDPSession();
  const frames = [];
  cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
    frames.push({ t: metadata.timestamp, buf: Buffer.from(data, "base64") });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  await script({ page, glide, click, drag, sleep, prepare: true });
  await sleep(600);
  await cdp.send("Page.startScreencast", { format: "png", maxWidth: width * scale, maxHeight: height * scale, everyNthFrame: 1 });
  await sleep(700);
  await script({ page, glide, click, drag, sleep, prepare: false });
  await sleep(1400);
  await cdp.send("Page.stopScreencast");
  await browser.close();

  // Resample to an even frame rate (the screencast only sends a frame when something changes).
  const t0 = frames[0].t, t1 = frames[frames.length - 1].t;
  const picked = [];
  for (let t = t0, i = 0; t <= t1; t += 1 / FPS) {
    while (i + 1 < frames.length && frames[i + 1].t <= t) i++;
    picked.push(frames[i].buf);
  }
  const outW = Math.round(width * scale);
  const resized = await Promise.all(picked.map((b) => sharp(b).resize(outW, Math.round(height * scale)).png().toBuffer()));
  await sharp(resized, { join: { animated: true } })
    .webp({ quality: 72, effort: 5, loop: 0, delay: Array(resized.length).fill(Math.round(1000 / FPS)) })
    .toFile(path.join(OUT, `clip-${name}.webp`));
  await sharp(resized[0]).webp({ quality: 88 }).toFile(path.join(OUT, `clip-${name}-still.webp`));
  console.log(name, resized.length, "frames");
}

// A crisp still of one section, centred in the laptop's page area.
async function still({ name, width, height, id }) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", protocolTimeout: 180000 });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (r) => (/\/api\//.test(r.url()) && r.method() !== "GET" ? r.abort() : r.continue()));
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
  await page.evaluate((id) => { const s = document.getElementById(id); const r = s.getBoundingClientRect(); scrollTo(0, r.top + scrollY - 20); }, id);
  await sleep(1500);
  await page.mouse.move(5, height - 5);
  await sharp(await page.screenshot()).webp({ quality: 90 }).toFile(path.join(OUT, `section-${name}.webp`));
  await browser.close();
  console.log(name, "still");
}

(async () => {
  // Desktop: the page area of the laptop mockup (16:10 less the menu bar), scrolled to the calculator.
  await record({
    name: "desktop",
    width: 1280,
    height: 759,
    scale: 1,
    touch: false,
    script: async ({ page, glide, click, drag, sleep, prepare }) => {
      if (prepare) {
        await page.evaluate(() => scrollTo(0, 360));
        return;
      }
      await click("button", "Consulting");
      await click("button", "Course");
      await drag(0, 0.72);
      await drag(1, 0.38);
      await click("button", "Calculate my email revenue");
      await sleep(1600);
    },
  });
  // Phone: the page area of the phone mockup (9:19.5 less the status bar).
  await record({
    name: "mobile",
    width: 390,
    height: 786,
    scale: 1.5,
    touch: true,
    script: async ({ page, click, drag, sleep, prepare }) => {
      if (prepare) {
        const y = await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "Coaching").getBoundingClientRect().top + scrollY);
        await page.evaluate((y) => scrollTo(0, y - 170), y);
        return;
      }
      await click("button", "Consulting");
      await click("button", "Service");
      await drag(0, 0.66, 1000);
      await click("button", "Calculate my email revenue");
      // The site scrolls to the estimate itself; hold on it.
      await sleep(2200);
    },
  });
  // Closing section: the cursor hovers each card of the stack, bringing it forward (no clicks: they are links).
  await record({
    name: "finale",
    start: [0.45, 0.85],
    width: 1440,
    height: 854,
    scale: 1,
    touch: false,
    script: async ({ page, glide, sleep, prepare }) => {
      if (prepare) {
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; const s = document.getElementById("contact"); const r = s.getBoundingClientRect(); scrollTo(0, r.top + scrollY + r.height / 2 - 427 - 40); });
        await sleep(1500);
        return;
      }
      await glide(990, 380, 700);
      await sleep(1300);
      await glide(1192, 430, 600);
      await sleep(1300);
      await glide(1262, 470, 500);
      await sleep(1300);
      await glide(700, 720, 700);
      await sleep(900);
    },
  });
  // Results: the carousel's arrows forward and back, then a screenshot opened full size and closed again.
  await record({
    name: "results",
    width: 1440,
    height: 854,
    scale: 1,
    touch: false,
    start: [0.55, 0.92],
    script: async ({ page, click, glide, sleep, prepare }) => {
      if (prepare) {
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; const s = document.getElementById("work"); const r = s.getBoundingClientRect(); scrollTo(0, r.top + scrollY + r.height / 2 - 427 - 20); });
        await sleep(1500);
        return;
      }
      await click("button", "→");
      await sleep(500);
      await click("button", "→");
      await sleep(500);
      await click("button", "←");
      await click("button", "←");
      // Snapping can leave it short of the start; make sure it is back where the loop began.
      await page.evaluate(() => document.querySelector("#work .rail").scrollTo({ left: 0, behavior: "smooth" }));
      await sleep(700);
      await click("button", "↑ $36,372");
      await sleep(2200);
      await click("button", "×");
      await glide(1440 * 0.55, 854 * 0.92, 700);
      await sleep(700);
    },
  });
  await still({ name: "services", width: 1440, height: 854, id: "services" });
})();
