import * as THREE from "three";

/*
 * Procedural device mockups at real product proportions (1 unit = 100 mm), written the way img2threejs exports
 * models: each factory returns a THREE.Group of named parts, so a part can be refinished or swapped on its own.
 *
 * Phone  ≈ iPhone 15 Pro: 71.6 × 146.6 × 8.25 mm, 1.7 mm black border, Dynamic Island, titanium band.
 * Tablet ≈ iPad Pro 11": 177.5 × 249.7 × 5.3 mm, 6 mm border, aluminium.
 * Laptop ≈ 13–14" MacBook: 312.6 × 221.2 mm base, notch, black keyboard well with individual keycaps.
 * Screens are unlit (true colours) and carry real-looking system chrome: a status bar on phones,
 * a menu bar and browser toolbar on the laptop.
 */

const loader = new THREE.ImageLoader();
let maxAniso = 8;
export const setAnisotropy = (n) => (maxAniso = n);

export const FINISH = {
  // Titanium (phones)
  natural: "#bdb8af",
  black: "#3d3c3b",
  white: "#e7e5e0",
  blue: "#454e5b",
  desert: "#c7ad93",
  // Aluminium (laptops, tablets)
  silver: "#dfe0e2",
  spaceGray: "#7c7d81",
  spaceBlack: "#2e2f32",
  midnight: "#2f3744",
  starlight: "#e6dfd2",
};
const finishColor = (f) => FINISH[f] ?? f;

/* ---------- geometry helpers ---------- */

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  r = Math.min(r, w / 2, h / 2);
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** Flat rounded rectangle with 0–1 UVs across its bounds. */
export function roundedPlane(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 48);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  return g;
}

/** Rounded slab (plan corners r) with softened edges (bevel), centred, thickness along z. */
export function slab(w, h, d, r, bevel = Math.min(d * 0.3, 0.02)) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w - bevel * 2, h - bevel * 2, Math.max(r - bevel, 0.002)), {
    depth: Math.max(d - bevel * 2, 0.0001),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 10,
    curveSegments: 64,
  });
  g.translate(0, 0, -(d - bevel * 2) / 2);
  g.computeVertexNormals();
  return g;
}

/* ---------- materials ---------- */

const metal = (color, roughness = 0.3) => new THREE.MeshPhysicalMaterial({ color: finishColor(color), metalness: 1, roughness, clearcoat: 0.15, clearcoatRoughness: 0.4 });
const blackGlass = () => new THREE.MeshPhysicalMaterial({ color: 0x060606, metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.03 });

/** A faint diagonal reflection over the glass, added on top so the screen keeps its true colours. */
let sheenTex;
function sheen(strength = 0.07) {
  if (!sheenTex) {
    const c = document.createElement("canvas");
    c.width = c.height = 1024;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.42, "rgba(255,255,255,0.25)");
    grad.addColorStop(0.43, "rgba(255,255,255,0)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 1024, 1024);
    sheenTex = new THREE.CanvasTexture(c);
  }
  return new THREE.MeshBasicMaterial({ map: sheenTex, transparent: true, opacity: strength, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
}

function canvasTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = maxAniso;
  return t;
}

export const SYS = `Inter, -apple-system, "Segoe UI", sans-serif`;

/* ---------- system chrome drawn above screenshots ---------- */

export function drawStatusBar(g, W, H, bg, ink) {
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  g.fillStyle = ink;
  g.font = `600 ${H * 0.36}px ${SYS}`;
  g.textBaseline = "middle";
  const y = H * 0.58;
  g.fillText("9:41", W * 0.115, y);
  const u = H * 0.06;
  for (let i = 0; i < 4; i++) {
    g.beginPath();
    g.roundRect(W * 0.715 + i * u * 1.7, y + u * 1.9 - (i + 1) * u * 0.95, u * 1.15, (i + 1) * u * 0.95, u * 0.3);
    g.fill();
  }
  g.lineWidth = u * 0.95;
  g.strokeStyle = ink;
  g.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    g.beginPath();
    g.arc(W * 0.795, y + u * 1.8, u * (1 + i * 1.25), -Math.PI * 0.75, -Math.PI * 0.25);
    g.stroke();
  }
  const bx = W * 0.835;
  g.lineWidth = u * 0.45;
  g.globalAlpha = 0.45;
  g.beginPath();
  g.roundRect(bx, y - u * 1.75, u * 7, u * 3.5, u * 1.1);
  g.stroke();
  g.fillRect(bx + u * 7.35, y - u * 0.6, u * 0.5, u * 1.2);
  g.globalAlpha = 1;
  g.beginPath();
  g.roundRect(bx + u * 0.6, y - u * 1.15, u * 5.2, u * 2.3, u * 0.6);
  g.fill();
}

function drawMenuBar(g, W, H) {
  g.fillStyle = "#ececec";
  g.fillRect(0, 0, W, H);
  g.fillStyle = "#1d1d1f";
  g.textBaseline = "middle";
  g.font = `700 ${H * 0.52}px ${SYS}`;
  let x = W * 0.012;
  g.fillText("Safari", x, H * 0.54);
  x += g.measureText("Safari").width + H * 1.1;
  g.font = `500 ${H * 0.52}px ${SYS}`;
  for (const m of ["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"]) {
    g.fillText(m, x, H * 0.54);
    x += g.measureText(m).width + H * 0.95;
  }
  g.textAlign = "right";
  g.fillText("Tue 21 Oct  9:41", W * 0.988, H * 0.54);
  g.textAlign = "left";
}

function drawToolbar(g, W, y, H, url) {
  g.fillStyle = "#f6f6f6";
  g.fillRect(0, y, W, H);
  g.fillStyle = "#dcdcdc";
  g.fillRect(0, y + H - 2, W, 2);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    g.fillStyle = c;
    g.beginPath();
    g.arc(W * 0.016 + i * H * 0.42, y + H / 2, H * 0.13, 0, Math.PI * 2);
    g.fill();
  });
  const pw = W * 0.34;
  g.fillStyle = "#e6e6e6";
  g.beginPath();
  g.roundRect(W / 2 - pw / 2, y + H * 0.2, pw, H * 0.6, H * 0.16);
  g.fill();
  g.fillStyle = "#4a4a4a";
  g.font = `500 ${H * 0.3}px ${SYS}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(url, W / 2, y + H * 0.51);
  g.textAlign = "left";
}

/**
 * A screen material. The screenshot (src) fills the area under any chrome like object-fit: cover, top-anchored;
 * crop = [x, y, w, h] in source pixels removes a baked-in frame first. draw(g, W, H) = paint the screen yourself.
 * chrome: "phone" (status bar), "mac" (menu bar), "browser" (menu bar + Safari toolbar), "none".
 */
function screenMaterial({ src, draw, aspect, px = 1600, crop, anchorX = 0.5, chrome = "none", statusBar = "#ffffff", statusInk = "#111111", url = "" }) {
  const mat = new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false });
  const W = px;
  const H = Math.round(W / aspect);
  const paint = (img) => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d");
    g.imageSmoothingQuality = "high";
    let top = 0;
    if (chrome === "phone") {
      top = Math.round(W * 0.125);
      drawStatusBar(g, W, top, statusBar, statusInk);
    } else if (chrome === "mac" || chrome === "browser") {
      const mb = Math.round(H * 0.028);
      drawMenuBar(g, W, mb);
      top = mb;
      if (chrome === "browser") {
        const tb = Math.round(H * 0.052);
        drawToolbar(g, W, top, tb, url);
        top += tb;
      }
    }
    if (draw) {
      g.save();
      g.translate(0, top);
      draw(g, W, H - top);
      g.restore();
    } else {
      const [cx, cy, cw, ch] = crop ?? [0, 0, img.width, img.height];
      g.fillStyle = "#ffffff";
      g.fillRect(0, top, W, H - top);
      const s = Math.max(W / cw, (H - top) / ch);
      g.drawImage(img, cx, cy, cw, ch, (W - cw * s) * anchorX, top, cw * s, ch * s);
    }
    mat.map = canvasTexture(c);
    mat.color.set(0xffffff);
    mat.needsUpdate = true;
  };
  if (draw) paint();
  else if (src) loader.load(src, paint);
  return mat;
}

/* ---------- phone ---------- */

export function createPhone({ finish = "black", island = true, ...screen } = {}) {
  const W = 0.716;
  const H = 1.466;
  const D = 0.0825;
  const R = 0.118;
  const group = new THREE.Group();
  group.name = "phone";
  const band = metal(finish, 0.26);

  const body = new THREE.Mesh(slab(W, H, D, R, 0.016), band);
  body.name = "body";
  group.add(body);

  const z = D / 2;
  const front = new THREE.Mesh(roundedPlane(W - 0.007, H - 0.007, R - 0.004), blackGlass());
  front.name = "front-glass";
  front.position.z = z + 0.0004;
  group.add(front);

  const sw = W - 0.041;
  const sh = H - 0.041;
  const display = new THREE.Mesh(roundedPlane(sw, sh, R - 0.022), screenMaterial({ aspect: sw / sh, px: 1290, ...screen }));
  display.name = "screen";
  display.position.z = z + 0.0008;
  group.add(display);

  if (island) {
    const di = new THREE.Mesh(roundedPlane(0.126, 0.037, 0.0185), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    di.name = "dynamic-island";
    di.position.set(0, sh / 2 - 0.0115 - 0.0185, z + 0.0012);
    group.add(di);
  }

  const glass = new THREE.Mesh(roundedPlane(W - 0.007, H - 0.007, R - 0.004), sheen(0.06));
  glass.name = "glass";
  glass.position.z = z + 0.0016;
  group.add(glass);

  // Action button + volume on the left, side button on the right (capsules proud of the band).
  [
    [-1, 0.405, 0.06],
    [-1, 0.27, 0.09],
    [-1, 0.15, 0.09],
    [1, 0.25, 0.14],
  ].forEach(([side, y, len], i) => {
    const b = new THREE.Mesh(slab(0.03, len, 0.012, 0.006, 0.004), band);
    b.name = `button-${i}`;
    b.rotation.y = Math.PI / 2;
    b.position.set(side * (W / 2 + 0.001), y, 0);
    group.add(b);
  });
  return group;
}

/* ---------- tablet ---------- */

export function createTablet({ finish = "spaceGray", landscape = false, ...screen } = {}) {
  let W = 1.775;
  let H = 2.497;
  if (landscape) [W, H] = [H, W];
  const D = 0.053;
  const R = 0.11;
  const group = new THREE.Group();
  group.name = "tablet";
  const body = new THREE.Mesh(slab(W, H, D, R, 0.012), metal(finish, 0.34));
  body.name = "body";
  group.add(body);
  const z = D / 2;
  const front = new THREE.Mesh(roundedPlane(W - 0.006, H - 0.006, R - 0.003), blackGlass());
  front.position.z = z + 0.0004;
  group.add(front);
  const sw = W - 0.13;
  const sh = H - 0.13;
  const display = new THREE.Mesh(roundedPlane(sw, sh, R - 0.055), screenMaterial({ aspect: sw / sh, px: 1800, ...screen }));
  display.name = "screen";
  display.position.z = z + 0.0008;
  group.add(display);
  const glass = new THREE.Mesh(roundedPlane(W - 0.006, H - 0.006, R - 0.003), sheen(0.05));
  glass.position.z = z + 0.0016;
  group.add(glass);
  return group;
}

/* ---------- laptop ---------- */

/** Keycaps on a black well: function row, four letter rows, and the space row. */
function keyboard(width) {
  const group = new THREE.Group();
  group.name = "keyboard";
  const pitch = width / 14.6;
  const key = pitch * 0.86;
  const rows = [
    { h: 0.5, keys: Array(14).fill(1) },
    { h: 1, keys: [...Array(13).fill(1), 1.5] },
    { h: 1, keys: [1.5, ...Array(13).fill(1)] },
    { h: 1, keys: [1.8, ...Array(11).fill(1), 1.8] },
    { h: 1, keys: [2.35, ...Array(10).fill(1), 2.35] },
    { h: 1, keys: [1, 1, 1, 1.25, 5.1, 1.25, 1, 1, 1] },
  ];
  const depth = rows.reduce((s, r) => s + r.h * pitch, 0);
  const well = new THREE.Mesh(roundedPlane(width + pitch * 0.25, depth + pitch * 0.25, pitch * 0.18), new THREE.MeshStandardMaterial({ color: 0x0b0b0c, roughness: 0.8 }));
  well.rotation.x = -Math.PI / 2;
  group.add(well);
  const capMat = new THREE.MeshPhysicalMaterial({ color: 0x0d0d0e, roughness: 0.5, envMapIntensity: 0.45 });
  const capGeo = new Map();
  let z = -depth / 2;
  for (const r of rows) {
    const rowW = r.keys.reduce((s, k) => s + k, 0) * pitch;
    let x = -rowW / 2;
    const h = r.h * pitch;
    for (const k of r.keys) {
      const w = k * pitch;
      const id = `${k}-${r.h}`;
      if (!capGeo.has(id)) capGeo.set(id, slab(w - (pitch - key), h - (pitch - key), 0.012, key * 0.12, 0.004));
      const cap = new THREE.Mesh(capGeo.get(id), capMat);
      cap.rotation.x = -Math.PI / 2;
      cap.position.set(x + w / 2, 0.004, z + h / 2);
      group.add(cap);
      x += w;
    }
    z += h;
  }
  return { group, depth };
}

export function createLaptop({ finish = "silver", open = 20, ...screen } = {}) {
  const BW = 3.126;
  const BD = 2.212;
  const BT = 0.072;
  const LT = 0.042;
  const dw = BW - 0.13;
  const dh = dw / 1.545;
  const LH = 0.065 + dh + 0.115;
  const group = new THREE.Group();
  group.name = "laptop";
  const alu = metal(finish, 0.36);

  const base = new THREE.Mesh(slab(BW, BD, BT, 0.1, 0.022), alu);
  base.name = "base";
  base.rotation.x = -Math.PI / 2;
  base.position.y = BT / 2;
  group.add(base);

  const { group: keys, depth: kd } = keyboard(2.66);
  keys.position.set(0, BT + 0.0006, -BD / 2 + 0.2 + kd / 2);
  group.add(keys);

  const tpZ = BD / 2 - 0.13 - 0.42;
  const tp = new THREE.Mesh(roundedPlane(1.36, 0.84, 0.06), new THREE.MeshPhysicalMaterial({ color: finishColor(finish), metalness: 1, roughness: 0.27 }));
  tp.name = "trackpad";
  tp.rotation.x = -Math.PI / 2;
  tp.position.set(0, BT + 0.0008, tpZ);
  group.add(tp);
  const tpEdge = new THREE.Mesh(roundedPlane(1.366, 0.846, 0.063), new THREE.MeshStandardMaterial({ color: new THREE.Color(finishColor(finish)).multiplyScalar(0.86), metalness: 1, roughness: 0.45 }));
  tpEdge.rotation.x = -Math.PI / 2;
  tpEdge.position.set(0, BT + 0.0005, tpZ);
  group.add(tpEdge);

  const hingeBar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, BW - 0.62, 32), new THREE.MeshPhysicalMaterial({ color: 0x141416, roughness: 0.45 }));
  hingeBar.name = "hinge-cover";
  hingeBar.rotation.z = Math.PI / 2;
  hingeBar.position.set(0, BT + 0.012, -BD / 2 + 0.03);
  group.add(hingeBar);

  const hinge = new THREE.Group();
  hinge.name = "hinge";
  hinge.position.set(0, BT + 0.006, -BD / 2 + 0.035);
  hinge.rotation.x = THREE.MathUtils.degToRad(-open);
  group.add(hinge);

  const lid = new THREE.Mesh(slab(BW, LH, LT, 0.1, 0.014), alu);
  lid.name = "lid";
  lid.position.set(0, LH / 2, -LT / 2);
  hinge.add(lid);

  const front = new THREE.Mesh(roundedPlane(BW - 0.012, LH - 0.012, 0.094), blackGlass());
  front.name = "front-glass";
  front.position.set(0, LH / 2, 0.0004);
  hinge.add(front);

  const display = new THREE.Mesh(roundedPlane(dw, dh, 0.035), screenMaterial({ aspect: dw / dh, px: 2560, chrome: "browser", ...screen }));
  display.name = "screen";
  display.position.set(0, LH - 0.065 - dh / 2, 0.0008);
  hinge.add(display);

  const notch = new THREE.Mesh(roundedPlane(0.3, 0.062, 0.016), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  notch.name = "notch";
  notch.position.set(0, LH - 0.065 - 0.019, 0.0012);
  hinge.add(notch);

  const glass = new THREE.Mesh(roundedPlane(BW - 0.012, LH - 0.012, 0.094), sheen(0.05));
  glass.position.set(0, LH / 2, 0.0016);
  hinge.add(glass);
  return group;
}
