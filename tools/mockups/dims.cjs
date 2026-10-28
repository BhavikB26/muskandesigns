const sharp = require(process.cwd() + "/node_modules/sharp"), fs = require("fs"), path = require("path");
(async () => {
  const walk = (p) => fs.readdirSync(p, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(p, e.name)) : [path.join(p, e.name)]));
  const out = {};
  for (const f of walk("public/work").sort()) {
    if (!/\.(png|webp|jpe?g)$/i.test(f) || /-anim\./.test(f)) continue;
    try {
      const m = await sharp(f).metadata();
      let a = 0;
      if (m.hasAlpha) {
        const st = await sharp(f).stats();
        a = st.channels[3] && st.channels[3].min < 250 ? 1 : 0;
      }
      out["/" + f.split(path.sep).join("/").replace(/^public\//, "")] = [m.width, m.height, a];
    } catch (e) {}
  }
  let s = "/* Generated from public/work: [width, height, transparent] for every case study image (transparent = 1 when it has see-through pixels). */\nexport const mediaDims: Record<string, [number, number, number]> = {\n";
  for (const [k, v] of Object.entries(out)) s += `  ${JSON.stringify(k)}: [${v.join(", ")}],\n`;
  fs.writeFileSync("src/content/media-dims.ts", s + "};\n");
  console.log(Object.keys(out).length, Object.values(out).filter((v) => v[2]).length);
})();
