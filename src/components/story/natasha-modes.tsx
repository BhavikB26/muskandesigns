"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * Natasha walkthrough, built from the final Figma frames (side panel 10432:171491, immersive 14280:68199) and
 * the state animations (10442:172131). Hotspots sit over the real controls on each screen; the voice turn runs
 * the state model in order (start → listening → thinking → speaking, interrupt to take your turn back).
 * No AI answers here: it is a click-through of the designed screens.
 */

type Spot = { label: string; to: number; box: [number, number, number, number] }; // x, y, w, h in % of the screen
type Screen = { src: string; w: number; h: number; alt: string; caption: string; spots: Spot[] };

const P = "/work/natasha/v2/";
const PANEL: Screen[] = [
  {
    src: P + "panel-welcome.webp", w: 1206, h: 2520, alt: "Side panel welcome: Hi, I’m Natasha, with three starting prompts",
    caption: "The welcome says what Natasha is for. Pick a starting prompt.",
    spots: [{ label: "Choose a starting prompt", to: 1, box: [11, 19.5, 55, 13] }, { label: "Talk", to: 2, box: [71, 87.5, 25, 7.5] }],
  },
  {
    src: P + "panel-chat.webp", w: 1206, h: 2520, alt: "Side panel conversation: a response with listen, dislike and copy, and two follow-up options",
    caption: "A response with its controls and follow-ups. Try Talk.",
    spots: [{ label: "Talk", to: 2, box: [71, 87.5, 25, 7.5] }],
  },
  {
    src: P + "panel-talk.webp", w: 1206, h: 2520, alt: "Side panel in Talk mode: the listening orb with back and pause",
    caption: "Voice in the panel. The back arrow returns to the chat.",
    spots: [{ label: "Back to chat", to: 1, box: [33, 87.5, 15, 7.5] }],
  },
];
const IMMERSIVE: Screen[] = [
  {
    src: P + "imm-welcome.webp", w: 2880, h: 1576, alt: "Immersive welcome: Hi, I am Natasha. What would you like to build? Goal prompts below the message field",
    caption: "The same welcome with room to breathe. Pick a goal.",
    spots: [{ label: "Choose a goal", to: 1, box: [30.5, 59.5, 39, 8] }, { label: "Talk", to: 2, box: [69.5, 50.5, 8.5, 8] }],
  },
  {
    src: P + "imm-chat.webp", w: 2880, h: 1576, alt: "Immersive conversation: a response with controls and two follow-up options",
    caption: "Same response component, wider canvas. Try Talk.",
    spots: [{ label: "Talk", to: 2, box: [69.5, 92, 8.5, 7.5] }],
  },
  {
    src: P + "imm-talk.webp", w: 2880, h: 1576, alt: "Immersive Talk mode: the listening orb with back and pause",
    caption: "Voice, full screen. Back returns to the conversation.",
    spots: [{ label: "Back to chat", to: 1, box: [45.5, 86.5, 5, 8] }],
  },
];

const TURN = [
  { key: "start", label: "Start speaking", orb: "paused", say: "Natasha is ready. Press the bar to start." },
  { key: "listening", label: "Listening", orb: "listening", say: "Listening… say what you’d like to build." },
  { key: "thinking", label: "Thinking", orb: "thinking", say: "Thinking about your idea…" },
  { key: "interrupt", label: "Speaking", orb: "speaking", say: "Natasha is answering. Press the bar to interrupt." },
] as const;

function ScreenView({ screens, frame }: { screens: Screen[]; frame: "panel" | "wide" }) {
  const [i, setI] = useState(0);
  const s = screens[i];
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative w-full overflow-hidden bg-white ring-1 ring-black/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ${frame === "panel" ? "max-w-[340px] rounded-[18px]" : "max-w-[900px] rounded-[14px]"}`}>
        <Image key={s.src} src={s.src} alt={s.alt} width={s.w} height={s.h} sizes={frame === "panel" ? "340px" : "(min-width: 1024px) 900px, 92vw"} className="block h-auto w-full" priority={false} />
        {s.spots.map((sp) => (
          <button
            key={sp.label}
            type="button"
            onClick={() => setI(sp.to)}
            aria-label={sp.label}
            title={sp.label}
            className="nt-spot absolute rounded-[10px]"
            style={{ left: `${sp.box[0]}%`, top: `${sp.box[1]}%`, width: `${sp.box[2]}%`, height: `${sp.box[3]}%` }}
          />
        ))}
      </div>
      <div className="flex w-full max-w-[900px] flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-white/80" aria-live="polite">
          <span className="mr-2 font-medium text-white">{i + 1}/{screens.length}</span>
          {s.caption}
        </p>
        <div className="flex gap-1.5">
          {screens.map((x, n) => (
            <button key={x.src} type="button" onClick={() => setI(n)} aria-label={`Screen ${n + 1}`} aria-pressed={i === n} className={`size-8 rounded-full text-[13px] font-medium ring-1 ${i === n ? "bg-white text-[#151412] ring-white" : "text-white/80 ring-white/25 hover:bg-white/10"}`}>
              {n + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceTurn() {
  const [t, setT] = useState(0);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Listening and thinking move on by themselves, like the real exchange; speaking waits to be interrupted.
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (t === 1) timer.current = setTimeout(() => setT(2), 2600);
    if (t === 2) timer.current = setTimeout(() => setT(3), 2200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [t]);

  const step = TURN[t];
  const press = () => setT(t === 0 ? 1 : t === 3 ? 1 : t);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative aspect-square w-[min(260px,62vw)]">
        <Image key={step.orb} src={`${P}orb-${step.orb}${reduce ? "-still" : ""}.webp`} alt={`Natasha’s orb: ${step.label}`} width={320} height={320} unoptimized className="size-full" />
      </div>
      <p className="min-h-[1.6em] text-center text-[17px] text-white" aria-live="polite">
        {step.say}
      </p>
      <button type="button" onClick={press} disabled={t === 1 || t === 2} className="w-full max-w-[760px] rounded-[12px] outline-offset-4 disabled:cursor-progress" aria-label={t === 0 ? "Start speaking" : t === 3 ? "Interrupt Natasha" : step.label}>
        <Image src={`${P}bar-${step.key}.webp`} alt="" width={2872} height={140} unoptimized className="block h-auto w-full rounded-[12px]" />
      </button>
      <ol className="flex flex-wrap justify-center gap-2" aria-label="Voice states">
        {TURN.map((x, n) => (
          <li key={x.key} className={`rounded-full px-3 py-1 text-[13px] ring-1 ${n === t ? "bg-white text-[#151412] ring-white" : "text-white/70 ring-white/20"}`}>
            {x.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

const MODES = ["Side panel", "Immersive", "Voice turn"] as const;

export function NatashaModes() {
  const [m, setM] = useState<(typeof MODES)[number]>("Side panel");
  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Mode" className="flex w-fit flex-wrap gap-1 self-center rounded-full bg-white/10 p-1 ring-1 ring-white/15">
        {MODES.map((x) => (
          <button key={x} type="button" aria-pressed={m === x} onClick={() => setM(x)} className={`min-h-10 rounded-full px-5 text-[15px] font-medium transition-colors ${m === x ? "bg-white text-[#151412]" : "text-white/80 hover:text-white"}`}>
            {x}
          </button>
        ))}
      </div>
      {m === "Side panel" && <ScreenView key="p" screens={PANEL} frame="panel" />}
      {m === "Immersive" && <ScreenView key="i" screens={IMMERSIVE} frame="wide" />}
      {m === "Voice turn" && <VoiceTurn />}
    </div>
  );
}
