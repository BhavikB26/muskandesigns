import { SYS } from "./devices.js";

/*
 * Screens painted in code for case studies with no app screenshots (the swiping research). Each is a
 * draw(g, W, H) for a phone screen below its status bar. Images come from the case study's own files.
 */

const images = new Map();
/** Preload images the painted screens use (call before building the scene). */
export async function preload(srcs) {
  await Promise.all(
    srcs.map(
      (s) =>
        new Promise((res) => {
          const img = new Image();
          img.onload = () => res(images.set(s, img));
          img.onerror = res;
          img.src = s;
        }),
    ),
  );
}

function cover(g, img, x, y, w, h, ax = 0.5, ay = 0.5) {
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s;
  const dh = img.height * s;
  g.save();
  g.beginPath();
  g.rect(x, y, w, h);
  g.clip();
  g.drawImage(img, x + (w - dw) * ax, y + (h - dh) * ay, dw, dh);
  g.restore();
}

/** A dating app's discover screen: one profile card (the case study's own illustration) and pass / like. */
export const swipeScreen =
  ({ photo, name = "Aanya, 24", line = "Here for slow mornings and long walks" }) =>
  (g, W, H) => {
    const u = W / 100;
    g.fillStyle = "#faf7f5";
    g.fillRect(0, 0, W, H);
    g.fillStyle = "#151312";
    g.font = `700 ${u * 7.4}px ${SYS}`;
    g.textBaseline = "alphabetic";
    g.fillText("Discover", u * 6, u * 12);
    g.fillStyle = "#8a827d";
    g.font = `500 ${u * 3.6}px ${SYS}`;
    g.fillText("12 new people near you", u * 6, u * 18);

    // Card stack: two cards peeking behind the top one.
    const cx = u * 5;
    const cy = u * 24;
    const cw = W - u * 10;
    const ch = H - u * 62;
    [
      [u * 4, "#e9e2dd"],
      [u * 2, "#f1ebe7"],
    ].forEach(([inset, col]) => {
      g.fillStyle = col;
      g.beginPath();
      g.roundRect(cx + inset, cy + ch - u * 10 + inset * 1.6, cw - inset * 2, u * 10, u * 6);
      g.fill();
    });
    g.save();
    g.shadowColor = "rgba(40,20,10,0.18)";
    g.shadowBlur = u * 6;
    g.shadowOffsetY = u * 2;
    g.beginPath();
    g.roundRect(cx, cy, cw, ch, u * 6);
    g.fillStyle = "#ddd";
    g.fill();
    g.restore();
    g.save();
    g.beginPath();
    g.roundRect(cx, cy, cw, ch, u * 6);
    g.clip();
    const img = images.get(photo);
    if (img) cover(g, img, cx, cy, cw, ch, 0.5, 0.5);
    const fade = g.createLinearGradient(0, cy + ch * 0.5, 0, cy + ch);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(1, "rgba(0,0,0,0.72)");
    g.fillStyle = fade;
    g.fillRect(cx, cy, cw, ch);
    g.fillStyle = "#fff";
    g.font = `700 ${u * 7}px ${SYS}`;
    g.fillText(name, cx + u * 5, cy + ch - u * 13);
    g.font = `500 ${u * 3.6}px ${SYS}`;
    g.fillStyle = "rgba(255,255,255,0.86)";
    g.fillText(line, cx + u * 5, cy + ch - u * 7);
    // progress dashes at the top of the card
    for (let i = 0; i < 4; i++) {
      g.fillStyle = i === 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)";
      g.beginPath();
      g.roundRect(cx + u * 4 + i * ((cw - u * 8) / 4), cy + u * 3, (cw - u * 8) / 4 - u * 1.4, u * 0.9, u * 0.45);
      g.fill();
    }
    g.restore();

    // Pass / like.
    const by = H - u * 22;
    [
      [W * 0.3, u * 8.5, "#ffffff", "pass"],
      [W * 0.7, u * 8.5, "#e0405e", "like"],
    ].forEach(([x, r, fill, kind]) => {
      g.save();
      g.shadowColor = "rgba(40,20,10,0.16)";
      g.shadowBlur = u * 4;
      g.shadowOffsetY = u * 1;
      g.fillStyle = fill;
      g.beginPath();
      g.arc(x, by, r, 0, Math.PI * 2);
      g.fill();
      g.restore();
      g.lineCap = "round";
      g.lineJoin = "round";
      if (kind === "pass") {
        g.strokeStyle = "#8f8782";
        g.lineWidth = u * 1.2;
        const s = u * 2.8;
        g.beginPath();
        g.moveTo(x - s, by - s);
        g.lineTo(x + s, by + s);
        g.moveTo(x + s, by - s);
        g.lineTo(x - s, by + s);
        g.stroke();
      } else {
        g.fillStyle = "#fff";
        const s = u * 0.62;
        g.beginPath();
        g.moveTo(x, by + 5 * s);
        g.bezierCurveTo(x - 8 * s, by - 0.5 * s, x - 5 * s, by - 6.5 * s, x, by - 2.8 * s);
        g.bezierCurveTo(x + 5 * s, by - 6.5 * s, x + 8 * s, by - 0.5 * s, x, by + 5 * s);
        g.fill();
      }
    });
    // home indicator
    g.fillStyle = "#151312";
    g.beginPath();
    g.roundRect(W / 2 - u * 18, H - u * 4, u * 36, u * 1.2, u * 0.6);
    g.fill();
  };

/** A match that went quiet: two openers, then nothing (the stall the research is about). */
export const chatScreen =
  ({ name = "Aanya", photo }) =>
  (g, W, H) => {
    const u = W / 100;
    g.fillStyle = "#ffffff";
    g.fillRect(0, 0, W, H);
    // header
    g.fillStyle = "#f7f4f2";
    g.fillRect(0, 0, W, u * 20);
    g.fillStyle = "#e9e3df";
    g.fillRect(0, u * 20, W, u * 0.3);
    const img = images.get(photo);
    g.save();
    g.beginPath();
    g.arc(W / 2, u * 8, u * 5, 0, Math.PI * 2);
    g.clip();
    if (img) cover(g, img, W / 2 - u * 5, u * 3, u * 10, u * 10, 0.2, 0.5);
    else {
      const av = g.createLinearGradient(W / 2 - u * 5, u * 3, W / 2 + u * 5, u * 13);
      av.addColorStop(0, "#f6b0a4");
      av.addColorStop(1, "#c3566c");
      g.fillStyle = av;
      g.fillRect(W / 2 - u * 5, u * 3, u * 10, u * 10);
      g.fillStyle = "#fff";
      g.font = `600 ${u * 4.6}px ${SYS}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(name[0], W / 2, u * 8.3);
      g.textAlign = "left";
      g.textBaseline = "alphabetic";
    }
    g.restore();
    g.fillStyle = "#151312";
    g.font = `600 ${u * 3.8}px ${SYS}`;
    g.textAlign = "center";
    g.fillText(name, W / 2, u * 17.5);
    g.textAlign = "left";
    g.fillStyle = "#8a827d";
    g.font = `500 ${u * 3.2}px ${SYS}`;
    g.textAlign = "center";
    g.fillText("You matched 6 days ago", W / 2, u * 29);
    g.textAlign = "left";

    const bubble = (text, mine, y) => {
      g.font = `500 ${u * 4.2}px ${SYS}`;
      const tw = g.measureText(text).width;
      const bw = tw + u * 9;
      const bh = u * 10.5;
      const x = mine ? W - u * 5 - bw : u * 5;
      g.fillStyle = mine ? "#e0405e" : "#f0ebe8";
      g.beginPath();
      g.roundRect(x, y, bw, bh, u * 5);
      g.fill();
      g.fillStyle = mine ? "#fff" : "#151312";
      g.textBaseline = "middle";
      g.fillText(text, x + u * 4.5, y + bh / 2 + u * 0.2);
      g.textBaseline = "alphabetic";
      return y + bh + u * 2.4;
    };
    let y = u * 36;
    y = bubble("Hey! Love the hiking pics", true, y);
    y = bubble("hii :)", false, y);
    y = bubble("Where was the last one?", true, y);
    g.fillStyle = "#a59d98";
    g.font = `500 ${u * 3}px ${SYS}`;
    g.textAlign = "right";
    g.fillText("Seen 4 days ago", W - u * 6, y + u * 3);
    g.textAlign = "left";

    // composer
    g.strokeStyle = "#e3ddd9";
    g.lineWidth = u * 0.35;
    g.beginPath();
    g.roundRect(u * 5, H - u * 20, W - u * 10, u * 11, u * 5.5);
    g.stroke();
    g.fillStyle = "#b0a8a3";
    g.font = `500 ${u * 3.8}px ${SYS}`;
    g.textBaseline = "middle";
    g.fillText("Message", u * 10, H - u * 14.5);
    g.textBaseline = "alphabetic";
    g.fillStyle = "#151312";
    g.beginPath();
    g.roundRect(W / 2 - u * 18, H - u * 4, u * 36, u * 1.2, u * 0.6);
    g.fill();
  };
