// Mosaic Lens — Originkit
"use client";

/*
 * Mosaic Lens, adapted from Originkit's free "Mosaic Lens" component (originkit.dev).
 * Changes for this site: fills its parent (no fixed min size), stops when off-screen, freezes on
 * "Pause motion" and reduced motion, and only runs on wider screens with WebGL2 (phones get the
 * static CSS backdrop behind it). Decorative: hidden from assistive tech.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

const MAX_DPR = 2;
const LAYERS = 74;
const GAIN = 0.54;
const TIERS = 4;

const VERT_SRC = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`;

const FIELD_SRC = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSize;
uniform float uAngle;
out vec4 o;

const float LAYERS = ${LAYERS.toFixed(1)};
const float GAIN = ${GAIN.toFixed(3)};
const vec2 CENTRE = vec2(-0.25, -0.56);
const float TILT = -2.2;
const float ZOOM = 1.05;
const float THETA = 2.12;
const float SHEAR = 0.956;
const float SHRINK = 0.949;
const vec2 WARP_FREQ = vec2(0.58, 2.8);
const vec2 WARP_AMP = vec2(0.16, 0.034);
const vec2 ASPECT = vec2(1.65, 0.22);
const float OFFSET = 0.31;
const float GLOW = 0.0021;
const float SOFT = 0.0019;
const float FALLOFF = 0.37;
const float PHASE = 64.0;
const float CYCLE = 0.16;
const float HUE_TRAVEL = 2.0;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;
  pos = rot(uAngle) * pos / uSize;
  float t = uTime * 0.49 + PHASE;
  float breath = (-sin(uTime * 0.735) + sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;
  vec2 u = rot(TILT) * ((pos - CENTRE) * (ZOOM - breath * 0.085));
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));
  vec3 col = vec3(0.0);
  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x -= sin(u.y * WARP_FREQ.x + t + i * 0.007) * WARP_AMP.x;
    u.y -= sin(u.x * WARP_FREQ.y - t + i * 0.02) * WARP_AMP.y;
    u = fold * u * SHRINK;
    vec2 q = (u - vec2(OFFSET + breath * 0.1, 0.0)) * ASPECT;
    float g = GLOW / (dot(q, q) + SOFT) * (0.25 + breath * 0.4);
    float r = length(u);
    float k = sin(i * CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    col += g * mix(uC1, uC2, k) * (0.62 + 0.5 * k) * exp2(-r * FALLOFF);
  }
  vec3 x = max(col * GAIN, 0.0);
  col = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  col *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * 0.07;
  o = vec4(col, 1.0);
}
`;

const FINISH_SRC = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform float uPaper;
uniform vec2 uMouse;
uniform float uOn;
uniform float uReach;
uniform float uTile;
out vec4 o;

const float TIERS = ${TIERS.toFixed(1)};

float ign(vec2 p, float f) { p += 5.588238 * mod(f, 64.0); return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y)); }
vec3 scene(vec2 uv) { return texture(uField, clamp(uv, 0.0, 1.0)).rgb; }

vec3 mosaic(vec2 frag, vec2 uv) {
  float base = uTile;
  float tier = 0.0;
  if (uOn > 1e-4) {
    vec2 cc = (floor(frag / base) + 0.5) * base;
    vec2 d = (cc - uMouse) / uReach;
    float w = uOn * exp(-dot(d, d));
    tier = floor(min(w * (TIERS + 1.0), TIERS));
  }
  if (tier >= TIERS) return scene(uv);
  float cell = base / exp2(tier);
  vec2 c = (floor(frag / cell) + 0.5) * cell;
  vec3 s = scene((c + cell * vec2(-0.25, -0.25)) / uRes) + scene((c + cell * vec2(0.25, -0.25)) / uRes)
         + scene((c + cell * vec2(-0.25, 0.25)) / uRes) + scene((c + cell * vec2(0.25, 0.25)) / uRes);
  return s * 0.25;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec3 L = max(mosaic(frag, frag / uRes), 0.0);
  vec3 dark = uBg + L * (1.0 - uBg);
  float strength = clamp(max(L.r, max(L.g, L.b)), 0.0, 1.0);
  vec3 paper = uBg * (1.0 - strength) + L * 0.96;
  vec3 col = mix(dark, paper, uPaper);
  col += (ign(frag, floor(uTime * 24.0)) - 0.5) / 255.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

type RGB = [number, number, number];
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255];
const clampN = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

function link(gl: WebGL2RenderingContext, frag: string): WebGLProgram | null {
  const shader = (type: number, src: string) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = shader(gl.VERTEX_SHADER, VERT_SRC);
  const fs = shader(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const isDark = () => document.documentElement.dataset.theme === "dark";

// Gems palette: amethyst and emerald over a soft lilac paper (light) or deep amethyst night (dark).
const PALETTE = {
  light: { background: "#ebe6fc", color1: "#17a398", color2: "#5a46d6" },
  dark: { background: "#0b0814", color1: "#1fa597", color2: "#6a52ff" },
};

export function MosaicLens({
  speed = 1,
  size = 1.53,
  tile = 10,
  hover = 0.88,
  reach = 279,
}: {
  speed?: number;
  size?: number;
  tile?: number;
  hover?: number;
  reach?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);
  const { background, color1, color2 } = PALETTE[dark ? "dark" : "light"];
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  const clockRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.matchMedia("(min-width: 768px)").matches) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) return;
    const field = link(gl, FIELD_SRC);
    const finish = link(gl, FINISH_SRC);
    if (!field || !finish) return;
    const U = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Offscreen field texture at half resolution.
    const fbo = gl.createFramebuffer();
    let tex: WebGLTexture | null = null;
    let tw = 0, th = 0;
    let half = !!gl.getExtension("EXT_color_buffer_float");
    const resizeTarget = (nw: number, nh: number) => {
      if (nw === tw && nh === th && tex) return;
      for (let attempt = 0; attempt < 2; attempt++) {
        if (tex) gl.deleteTexture(tex);
        tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, half ? gl.RGBA16F : gl.RGBA8, nw, nh, 0, gl.RGBA, half ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (ok || !half) break;
        half = false;
      }
      tw = nw;
      th = nh;
    };

    // Pointer, relative to the canvas.
    const ptr = { x: 0, y: 0, inside: false };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
      ptr.inside = ptr.x >= 0 && ptr.y >= 0 && ptr.x <= r.width && ptr.y <= r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const c1 = hex(color1), c2 = hex(color2), bg = hex(background);
    const bgLum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2];
    const still = paused || reduced;
    let mx = 0, my = 0, on = 0, raf = 0, last = -1, visible = true;

    const draw = (now: number) => {
      const dt = last < 0 ? 0 : clampN((now - last) / 1000, 0, 0.05);
      last = now;
      if (!still) clockRef.current = (clockRef.current + dt * speed) % 3600;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cw = canvas.clientWidth || 1, ch = canvas.clientHeight || 1;
      const bw = Math.max(1, Math.round(cw * dpr)), bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      resizeTarget(Math.max(1, Math.round(bw / 2)), Math.max(1, Math.round(bh / 2)));
      const present = !still && ptr.inside ? 1 : 0;
      if (present && on < 0.02) {
        mx = ptr.x;
        my = ptr.y;
      }
      on += (present - on) * (1 - Math.exp(-dt * 5));
      const k = 1 - Math.exp(-dt * 16);
      mx += (ptr.x - mx) * k;
      my += (ptr.y - my) * k;

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, tw, th);
      gl.useProgram(field);
      gl.uniform2f(U(field, "uRes"), tw, th);
      gl.uniform1f(U(field, "uTime"), clockRef.current);
      gl.uniform3f(U(field, "uC1"), ...c1);
      gl.uniform3f(U(field, "uC2"), ...c2);
      gl.uniform1f(U(field, "uSize"), size);
      gl.uniform1f(U(field, "uAngle"), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, bw, bh);
      gl.useProgram(finish);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(U(finish, "uField"), 0);
      gl.uniform2f(U(finish, "uRes"), bw, bh);
      gl.uniform1f(U(finish, "uTime"), clockRef.current);
      gl.uniform3f(U(finish, "uBg"), ...bg);
      gl.uniform1f(U(finish, "uPaper"), clampN((bgLum - 0.35) / 0.3, 0, 1));
      gl.uniform2f(U(finish, "uMouse"), mx * (bw / cw), bh - my * (bh / ch));
      gl.uniform1f(U(finish, "uOn"), on * hover);
      gl.uniform1f(U(finish, "uReach"), reach * (bh / ch));
      gl.uniform1f(U(finish, "uTile"), Math.max(1, Math.round(tile * dpr)));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (visible && !document.hidden) draw(now);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (still) draw(performance.now());
    else raf = requestAnimationFrame(loop);
    const onResize = () => still && draw(performance.now());
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      if (tex) gl.deleteTexture(tex);
      gl.deleteFramebuffer(fbo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(field);
      gl.deleteProgram(finish);
    };
  }, [paused, reduced, background, color1, color2, speed, size, tile, hover, reach]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 -z-10 block size-full opacity-0 transition-opacity duration-1000" />;
}
