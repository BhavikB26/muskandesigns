"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * A slow, soft gradient field behind the hero (WebGL fragment shader, no library).
 * Desktop only; phones, reduced motion and "Pause motion" keep the static CSS sky underneath.
 */
const FRAG = `
precision mediump float;
uniform vec2 r;
uniform float t;
uniform float dark;
vec3 blob(vec2 uv, vec2 c, float s, vec3 col) {
  float d = length(uv - c);
  return col * exp(-d * d / s);
}
void main() {
  vec2 uv = gl_FragCoord.xy / r;
  uv.x *= r.x / r.y;
  float a = t * 0.06;
  vec2 c1 = vec2(0.35 + 0.18 * sin(a * 1.3), 0.65 + 0.12 * cos(a * 1.1));
  vec2 c2 = vec2(1.25 + 0.22 * cos(a * 0.9), 0.35 + 0.15 * sin(a * 1.4));
  vec2 c3 = vec2(0.85 + 0.25 * sin(a * 0.7 + 1.0), 0.95 + 0.1 * sin(a));
  vec3 base = mix(vec3(0.84, 0.91, 0.98), vec3(0.07, 0.09, 0.15), dark);
  vec3 col = base;
  col += blob(uv, c1, 0.10, mix(vec3(0.16, 0.12, 0.02), vec3(0.10, 0.12, 0.30), dark));
  col += blob(uv, c2, 0.14, mix(vec3(-0.10, -0.08, 0.02), vec3(0.12, 0.10, 0.32), dark));
  col += blob(uv, c3, 0.08, mix(vec3(0.10, 0.08, 0.14), vec3(0.06, 0.05, 0.16), dark));
  gl_FragColor = vec4(col, 1.0);
}`;

export function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null);
  // Seconds of animation so far, kept across pause/play so the field never jumps.
  const clock = useRef(0);
  const paused = useMotionPaused();
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced || !window.matchMedia("(min-width: 768px)").matches) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t"), uD = gl.getUniformLocation(prog, "dark");

    const size = () => {
      const s = 0.5; // half resolution: it's a soft blur anyway
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * s));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * s));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    size();
    window.addEventListener("resize", size);

    let raf = 0, visible = true, last = 0;
    const start = performance.now() - clock.current * 1000;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!paused && (!visible || now - last < 33)) return; // ~30 fps
      last = now;
      gl.uniform2f(uR, canvas.width, canvas.height);
      if (!paused) clock.current = (now - start) / 1000;
      gl.uniform1f(uT, clock.current);
      gl.uniform1f(uD, document.documentElement.dataset.theme === "dark" ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (paused) {
      draw(performance.now());
      cancelAnimationFrame(raf);
    } else raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
    };
  }, [paused, reduced]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 -z-10 size-full opacity-0 transition-opacity duration-1000" />;
}
