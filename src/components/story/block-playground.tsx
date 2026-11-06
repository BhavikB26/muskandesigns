"use client";

import Image from "next/image";
import { useState } from "react";

/*
 * BLOCK component playground. Every image is the component's own variant exported from the BLOCK Figma file
 * (Button set 7252:11132, Natasha prompt 10406:111066, Natasha button 10406:120881, voice bar 13207:80314),
 * so what you see in each state is exactly what was designed. Hover, press, focus or disable the preview and
 * it swaps to that variant; the readout shows the variant's properties as Figma names them.
 */

type Dims = Record<string, [number, number]>;
type State = "Default" | "Hover" | "Focus/Active" | "Disabled";

const STYLES = ["Primary", "Secondary", "Alternative", "Alternative Secondary", "Tertiary", "Warning", "Salmon", "Blue"] as const;
const SIZES = ["Large", "Medium", "Small", "X small"] as const;
const STATES: State[] = ["Default", "Hover", "Focus/Active", "Disabled"];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

const COMPONENTS = ["Button", "Natasha prompt", "Natasha button", "Voice bar"] as const;
type Component = (typeof COMPONENTS)[number];

const VOICE = [
  { label: "Start speaking", file: "bar-start" },
  { label: "Listening", file: "bar-listening" },
  { label: "Thinking", file: "bar-thinking" },
  { label: "Click to interrupt", file: "bar-interrupt" },
];

function src(c: Component, style: string, size: string, state: State) {
  if (c === "Button") return `/work/builder-design-system/v2/buttons/${slug(style)}--${slug(size)}--${state === "Disabled" ? "disable" : slug(state)}.webp`;
  if (c === "Natasha prompt") return `/work/natasha/v2/chip-${{ Default: "default", Hover: "hover", "Focus/Active": "selected", Disabled: "disabled" }[state]}.webp`;
  return `/work/natasha/v2/btn-${{ Default: "default", Hover: "hover", "Focus/Active": "focus", Disabled: "disabled" }[state]}.webp`;
}

function Segmented<T extends string>({ label, options, value, onChange, small = false }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void; small?: boolean }) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-2">
      <legend className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white/60">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 ${small ? "min-h-8 text-[13px]" : "min-h-9 text-[14px]"} font-medium ring-1 transition-colors ${
              value === o ? "bg-white text-[#151412] ring-white" : "text-white/80 ring-white/20 hover:bg-white/10 hover:text-white"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function BlockPlayground({ dims }: { dims: Dims }) {
  const [c, setC] = useState<Component>("Button");
  const [style, setStyle] = useState<(typeof STYLES)[number]>("Primary");
  const [size, setSize] = useState<(typeof SIZES)[number]>("Large");
  const [pinned, setPinned] = useState<State>("Default");
  const [live, setLive] = useState<State | null>(null);
  const [voice, setVoice] = useState(0);

  const state: State = pinned === "Disabled" ? "Disabled" : (live ?? pinned);
  const file = c === "Voice bar" ? `/work/natasha/v2/${VOICE[voice].file}.webp` : src(c, style, size, state);
  const [w, h] = dims[file] ?? [300, 100];
  // Exports are at 2x; the preview shows them a little larger than 1:1 so states are easy to compare.
  const scale = c === "Voice bar" ? 0.5 : 0.75;

  const props =
    c === "Button"
      ? `Type=Default, Style=${style}, Size=${size}, State=${state === "Disabled" ? "Disable" : state}`
      : c === "Voice bar"
        ? `State=${VOICE[voice].label}`
        : `Type=Default, State=${c === "Natasha prompt" && state === "Focus/Active" ? "Selected" : state}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10">
      {/* Controls */}
      <div className="flex flex-col gap-6">
        <Segmented label="Component" options={COMPONENTS} value={c} onChange={(v) => { setC(v); setLive(null); }} />
        {c === "Button" && (
          <>
            <Segmented label="Style" options={STYLES} value={style} onChange={setStyle} small />
            <Segmented label="Size" options={SIZES} value={size} onChange={setSize} small />
          </>
        )}
        {c === "Voice bar" ? (
          <Segmented label="State" options={VOICE.map((v) => v.label)} value={VOICE[voice].label} onChange={(v) => setVoice(VOICE.findIndex((x) => x.label === v))} small />
        ) : (
          <Segmented label="Pin a state" options={STATES} value={pinned} onChange={(v) => { setPinned(v); setLive(null); }} small />
        )}
      </div>

      {/* Preview */}
      <div className="flex min-w-0 flex-col gap-3">
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[20px] bg-white bg-[radial-gradient(#e7e4f3_1px,transparent_1px)] [background-size:16px_16px] p-8 sm:min-h-[320px]">
          {c === "Voice bar" ? (
            <button
              type="button"
              onClick={() => setVoice((v) => (v + 1) % VOICE.length)}
              className="w-full max-w-[640px] rounded-[10px] outline-offset-4"
              aria-label={`Voice bar, ${VOICE[voice].label}. Press to move to the next state`}
            >
              <Image src={file} alt="" width={w} height={h} unoptimized className="block h-auto w-full" />
            </button>
          ) : (
            <button
              type="button"
              aria-disabled={state === "Disabled"}
              aria-label={`${c} preview, ${state}`}
              onPointerEnter={() => pinned === "Default" && setLive("Hover")}
              onPointerMove={() => pinned === "Default" && live === null && setLive("Hover")}
              onPointerLeave={() => pinned === "Default" && setLive(null)}
              onPointerDown={() => pinned === "Default" && setLive("Focus/Active")}
              onPointerUp={() => pinned === "Default" && setLive("Hover")}
              onFocus={(e) => pinned === "Default" && e.currentTarget.matches(":focus-visible") && setLive("Focus/Active")}
              onBlur={() => pinned === "Default" && setLive(null)}
              className="cursor-pointer rounded-[10px] focus-visible:outline-none"
              style={{ width: w * scale, maxWidth: "100%" }}
            >
              <Image src={file} alt="" width={w} height={h} unoptimized className="block h-auto w-full" />
            </button>
          )}
          <span className="pointer-events-none absolute left-4 top-4 text-[12px] font-medium uppercase tracking-[0.08em] text-[#5f5a53]">
            {c === "Voice bar" ? "Click the bar to step through" : pinned === "Default" ? "Hover, press or tab to me" : `Pinned: ${pinned}`}
          </span>
        </div>
        {/* Figma's variant properties for what's on screen */}
        <p className="flex flex-wrap items-center gap-2 font-mono text-[13px] text-white/70">
          <span className="rounded-md bg-white/10 px-2 py-1 text-white">{c}</span>
          <span aria-live="polite">{props}</span>
        </p>
        {c === "Button" && (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="All four states of this button">
            {STATES.map((s) => {
              const f = src(c, style, size, s);
              const [sw, sh] = dims[f] ?? [300, 100];
              return (
                <li key={s} className="flex flex-col items-center gap-2 rounded-[14px] bg-white p-3">
                  <Image src={f} alt={`${style} button, ${s}`} width={sw} height={sh} unoptimized className="h-auto" style={{ width: sw * 0.42, maxWidth: "100%" }} />
                  <span className="text-[12px] text-[#5f5a53]">{s}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
