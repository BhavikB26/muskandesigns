// Renders tools/mockups scenes to transparent 4:3 WebP files in public/work/3d.
// Usage: node tools/mockups/render.mjs [slug ...] [--w=3200] [--preview]
// --preview also writes a small copy on the tile's gem gradient to tools/mockups/out/ for checking.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { SCENES } from "./scenes.js";

const root = fileURLToPath(new URL("../../", import.meta.url));
const args = process.argv.slice(2);
const width = Number(args.find((a) => a.startsWith("--w="))?.slice(4) ?? 3200);
const preview = args.includes("--preview");
// Supersample: render larger, then downscale for clean edges and fine screen text.
const ss = Number(args.find((a) => a.startsWith("--ss="))?.slice(5) ?? 1.5);
const renderW = Math.round(width * ss);
const slugs = args.filter((a) => !a.startsWith("--"));
const todo = slugs.length ? slugs : Object.keys(SCENES);

const types = { ".html": "text/html", ".js": "text/javascript", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg" };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^[\\/]+/, "");
  const file = path.startsWith("public") || path.startsWith("node_modules") ? join(root, path) : join(root, "tools/mockups", path);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const port = server.address().port;

const GEM = Object.fromEntries(
  [...(await readFile(join(root, "src/components/home/feature-art.tsx"), "utf8")).matchAll(/"?([\w-]+)"?: \["(#\w+)", "(#\w+)"\]/g)].map((m) => [m[1], [m[2], m[3]]]),
);

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"],
});
await mkdir(join(root, "public/work/3d"), { recursive: true });
if (preview) await mkdir(join(root, "tools/mockups/out"), { recursive: true });

for (const slug of todo) {
  const page = await browser.newPage();
  page.on("console", (m) => m.type() === "error" && console.error(slug, m.text()));
  page.on("pageerror", (e) => console.error(slug, e.message));
  await page.setViewport({ width: renderW, height: Math.round((renderW * 3) / 4) });
  await page.goto(`http://localhost:${port}/studio.html?slug=${slug}&w=${renderW}`);
  await page.waitForFunction("window.__done === true", { timeout: 180000 });
  const data = await page.evaluate(() => document.querySelector("canvas").toDataURL("image/png"));
  const png = await sharp(Buffer.from(data.split(",")[1], "base64")).resize(width, Math.round((width * 3) / 4), { kernel: "lanczos3" }).png().toBuffer();
  const out = join(root, `public/work/3d/${slug}.webp`);
  await sharp(png).webp({ quality: 90, alphaQuality: 95, effort: 6 }).toFile(out);
  if (preview) {
    const [g0, g1] = GEM[slug] ?? ["#888888", "#444444"];
    const pw = 1000;
    const ph = 750;
    const bg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g0}"/><stop offset="1" stop-color="${g1}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
    );
    const fg = await sharp(png).resize(pw, ph).png().toBuffer();
    await sharp(bg).composite([{ input: fg }]).png().toFile(join(root, `tools/mockups/out/${slug}.png`));
  }
  console.log("rendered", slug);
  await page.close();
}
await browser.close();
server.close();
