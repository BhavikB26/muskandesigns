"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMotionPaused } from "@/components/motion";
import { useTheme } from "@/components/theme-toggle";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Elsewhere hero (by guglielmogiannattasio.exe, from 21st.dev), adapted for this site.
 * Day and night footage cross-fade with the site's light / dark theme, under a cinematic gradient. An ambient
 * soundscape is synthesised live with the Web Audio API (keys by day, cicadas by night, a low drone
 * underneath); it stays silent until the visitor presses "Listen". No audio files.
 * Changes from the original: the site's own glass header replaces the built-in nav; the theme drives
 * day / night (no separate switch); type, buttons and spacing use the site's tokens; the headline accepts
 * rich content; reduced motion (or paused motion) holds the footage on a still frame.
 */

export interface HeroLink {
  label: string;
  href: string;
}

export interface ElsewhereHeroProps {
  daySrc: string;
  nightSrc: string;
  headline: ReactNode;
  subline?: ReactNode;
  primaryCta?: HeroLink;
  secondaryCta?: HeroLink & { external?: boolean };
  listenLabel?: string;
  listenOffLabel?: string;
  /** Show the Listen button (the ambient sound stays off without it). */
  sound?: boolean;
  /** Small hint next to the sound button; "" hides it. */
  soundHint?: string;
  objectPosition?: string;
  /** Height of the site header above, so the copy clears it. */
  headerOffset?: number;
  /** Optional scroll progress (0 → 1) of a transition out of the hero: the copy fades and the footage
      eases toward `focus` (a point in viewport pixels). */
  progress?: MotionValue<number>;
  focus?: { x: number; y: number };
}

/* ---------- Ambient audio engine (from the original, unchanged in behaviour) ---------- */

function createAmbientEngine(ctx: AudioContext) {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Shared low drone, present in both day and night.
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.16;
  droneGain.connect(master);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 700;
  filter.connect(droneGain);
  const droneA = ctx.createOscillator();
  droneA.type = "sine";
  droneA.frequency.value = 110;
  const droneB = ctx.createOscillator();
  droneB.type = "sine";
  droneB.frequency.value = 110 * 1.008;
  droneA.connect(filter);
  droneB.connect(filter);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.045;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 260;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  droneA.start();
  droneB.start();
  lfo.start();

  // Day / night layers.
  const dayGain = ctx.createGain();
  dayGain.gain.value = 0;
  dayGain.connect(master);
  const nightGain = ctx.createGain();
  nightGain.gain.value = 0;
  nightGain.connect(master);

  const timers: ReturnType<typeof setTimeout>[] = [];

  // Distant, muffled typing.
  const distantGain = ctx.createGain();
  distantGain.gain.value = 0.34;
  distantGain.connect(master);
  const distantFilter = ctx.createBiquadFilter();
  distantFilter.type = "lowpass";
  distantFilter.frequency.value = 1300;
  distantFilter.connect(distantGain);

  function distantKeyClick(time: number) {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 280 + Math.random() * 160;
    osc.detune.value = (Math.random() - 0.5) * 120;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(0.55, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.13);
    osc.connect(g);
    g.connect(distantFilter);
    osc.start(time);
    osc.stop(time + 0.16);
  }
  function scheduleDistantTyping() {
    let t = 0;
    const count = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => distantKeyClick(ctx.currentTime), t));
      t += 110 + Math.random() * 170;
    }
    timers.push(
      setTimeout(scheduleDistantTyping, t + 700 + Math.random() * 1400),
    );
  }

  // Irregular percussive blips (the "keys" of the day layer).
  function typingBlip(time: number) {
    const osc = ctx.createOscillator();
    osc.type = "square";
    const scale = [560, 620, 680, 760, 900];
    const base = scale[Math.floor(Math.random() * scale.length)];
    osc.frequency.value = Math.random() < 0.12 ? base * 2.6 : base;
    osc.detune.value = (Math.random() - 0.5) * 500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(0.45, time + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
    osc.connect(g);
    g.connect(dayGain);
    osc.start(time);
    osc.stop(time + 0.07);
  }
  function scheduleTyping() {
    let t = 0;
    const count = 3 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => typingBlip(ctx.currentTime), t));
      t += 90 + Math.random() * 150;
    }
    timers.push(setTimeout(scheduleTyping, t + 900 + Math.random() * 1800));
  }

  // Cicadas.
  function cicadaBurst() {
    const now = ctx.currentTime;
    const duration = 0.6 + Math.random() * 1.1;
    const carrier = ctx.createOscillator();
    carrier.type = "sawtooth";
    carrier.frequency.value = 4000 + Math.random() * 900;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = carrier.frequency.value;
    band.Q.value = 9;
    const amp = ctx.createGain();
    amp.gain.value = 0;
    const chop = ctx.createOscillator();
    chop.type = "sine";
    chop.frequency.value = 28 + Math.random() * 14;
    const chopDepth = ctx.createGain();
    chopDepth.gain.value = 0.28;
    const chopOffset = ctx.createConstantSource();
    chopOffset.offset.value = 0.28;
    chop.connect(chopDepth);
    chopDepth.connect(amp.gain);
    chopOffset.connect(amp.gain);
    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.4, now + duration * 0.25);
    envelope.gain.linearRampToValueAtTime(0, now + duration);
    carrier.connect(band);
    band.connect(amp);
    amp.connect(envelope);
    envelope.connect(nightGain);
    carrier.start(now);
    chop.start(now);
    chopOffset.start(now);
    carrier.stop(now + duration);
    chop.stop(now + duration);
    chopOffset.stop(now + duration);
  }
  function scheduleCicadas() {
    cicadaBurst();
    if (Math.random() < 0.4)
      timers.push(setTimeout(cicadaBurst, 180 + Math.random() * 260));
    timers.push(setTimeout(scheduleCicadas, 700 + Math.random() * 1600));
  }

  scheduleTyping();
  scheduleCicadas();
  scheduleDistantTyping();

  return {
    setMuted(muted: boolean) {
      master.gain.linearRampToValueAtTime(
        muted ? 0 : 0.55,
        ctx.currentTime + 0.4,
      );
    },
    setNight(isNight: boolean) {
      const t = ctx.currentTime;
      dayGain.gain.linearRampToValueAtTime(isNight ? 0 : 1, t + 0.8);
      nightGain.gain.linearRampToValueAtTime(isNight ? 1 : 0, t + 0.8);
    },
    dispose() {
      timers.forEach(clearTimeout);
      timers.length = 0;
      [droneA, droneB, lfo].forEach((o) => {
        try {
          o.stop();
        } catch {
          // Already stopped.
        }
      });
      master.disconnect();
    },
  };
}

/* ---------- Hero ---------- */

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-[18px]">
      <path
        d="M4 9.5v5h3.6L13 19V5L7.6 9.5H4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {muted ? (
        <path
          d="M16 9.5 20 14.5M20 9.5 16 14.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M16.2 8.8a5 5 0 0 1 0 6.4M18.6 6.6a8.5 8.5 0 0 1 0 10.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function ElsewhereHero({
  daySrc,
  nightSrc,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  sound = true,
  listenLabel = "Listen",
  listenOffLabel = "Pause sound",
  soundHint = "Turn on the sound",
  objectPosition = "42% 50%",
  headerOffset = 0,
  progress,
  focus,
}: ElsewhereHeroProps) {
  const zero = useMotionValue(0);
  const p = progress ?? zero;
  const copyOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const copyY = useTransform(p, [0, 0.22], [0, -28]);
  const zoom = useTransform(p, [0, 1], [1, 1.85]);
  const dim = useTransform(p, [0.1, 1], [0, 0.55]);
  const night = useTheme() === "dark";
  const reduced = useReducedMotion();
  const paused = useMotionPaused();
  const still = reduced || paused;
  const day = useRef<HTMLVideoElement>(null);
  const dusk = useRef<HTMLVideoElement>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const engine = useRef<ReturnType<typeof createAmbientEngine> | null>(null);
  const [muted, setMuted] = useState(true);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(raf);
      engine.current?.dispose();
      audioCtx.current?.close();
    };
  }, []);

  // Footage follows the theme; held on a still frame with reduced or paused motion.
  useEffect(() => {
    engine.current?.setNight(night);
    for (const v of [day.current, dusk.current]) {
      if (!v) continue;
      if (still) v.pause();
      else v.play().catch(() => {});
    }
  }, [night, still]);

  function toggleSound() {
    if (!audioCtx.current) {
      const Ctx =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      audioCtx.current = ctx;
      engine.current = createAmbientEngine(ctx);
      engine.current.setNight(night);
      engine.current.setMuted(false);
      setMuted(false);
      return;
    }
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    engine.current?.setMuted(!muted);
    setMuted(!muted);
  }

  // Each line rises in a beat after the one before (instant with reduced motion).
  const rise = (i: number): CSSProperties =>
    still
      ? {}
      : {
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(14px)",
          transition: `opacity 1s ease ${0.15 + i * 0.12}s, transform 1s var(--ease-out-expo) ${0.15 + i * 0.12}s`,
        };

  const video = (ref: typeof day, src: string, visible: boolean) => (
    <video
      ref={ref}
      src={src}
      autoPlay={!still}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
      className="absolute inset-0 size-full object-cover transition-opacity duration-[1200ms] ease-in-out"
      style={{ objectPosition, opacity: visible ? 1 : 0 }}
    />
  );

  return (
    <section
      id="top"
      data-hero=""
      aria-labelledby="hero-heading"
      className="eh relative w-full overflow-hidden bg-[#0a0d08] text-[#f5f3ec]"
      style={{ height: "100svh", minHeight: 560 }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          scale: zoom,
          transformOrigin: focus ? `${focus.x}px ${focus.y}px` : "50% 60%",
        }}
      >
        {video(day, daySrc, !night)}
        {video(dusk, nightSrc, night)}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-black"
        style={{ opacity: dim }}
      />

      {/* Cinematic overlay: deeper at the top so the headline reads on the daytime sky, and at the foot. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.16)_38%,rgba(0,0,0,0)_62%,rgba(0,0,0,0.38))]"
      />

      <motion.div
        className="absolute inset-x-0 z-[2] flex flex-col items-center px-page text-center"
        style={{
          top: `calc(${headerOffset}px + clamp(32px, 7vh, 80px))`,
          opacity: copyOpacity,
          y: copyY,
        }}
      >
        <h1 id="hero-heading" className="eh-title" style={rise(1)}>
          {headline}
        </h1>
        {subline && (
          <p className="eh-sub" style={rise(2)}>
            {subline}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div
            className="mt-[clamp(20px,3.4vh,32px)] flex flex-wrap justify-center gap-2.5"
            style={rise(3)}
          >
            {primaryCta && (
              <a href={primaryCta.href} className="eh-pill eh-primary">
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                {...(secondaryCta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="eh-pill eh-glass"
              >
                {secondaryCta.label}
                {secondaryCta.external && (
                  <span className="sr-only"> (opens in a new tab)</span>
                )}
              </a>
            )}
          </div>
        )}
      </motion.div>

      {/* Sound */}
      {sound && (
        <div className="absolute bottom-[clamp(16px,3vh,28px)] left-0 right-0 z-[2] px-page">
          <div className="mx-auto flex max-w-[1280px] items-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              className="eh-pill eh-glass eh-small"
            >
              <SoundIcon muted={muted} />
              {muted ? listenLabel : listenOffLabel}
            </button>
            {soundHint && muted && (
              <span aria-hidden className="eh-hint">
                ← {soundHint}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
