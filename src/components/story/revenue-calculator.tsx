"use client";

import { useState, type CSSProperties } from "react";

/*
 * Zero Noise's email revenue calculator, rebuilt with the live site's own logic (ishikaa-homepage/src/lib/calc.ts):
 * subscribers × buyer rate × offer price, logarithmic sliders, the 1% "Bare Minimum" floor first, then the full
 * range at 1%, 2% and 3%. On the live site the range unlocks with a name and email; here a button stands in for
 * that form, so nothing is collected or sent.
 */

const OFFERS = ["Coaching", "Consulting", "Course", "Service", "Other"] as const;
const LIST = { min: 50, max: 200_000, ticks: ["50", "1k", "10k", "200k"] };
const PRICE = { min: 10, max: 50_000, ticks: ["10", "250", "5k", "50k"] };
const LEVELS = [
  { name: "Bare Minimum", rate: 0.01, tagline: "Your email fundamentals are in place." },
  { name: "Consistent", rate: 0.02, tagline: "Email is functioning as a real revenue channel." },
  { name: "All Dialled In", rate: 0.03, tagline: "Email is deeply integrated into your sales system." },
];
const CURRENCIES = ["$", "£", "€"] as const;

const yearly = (list: number, price: number, rate: number) => Math.round(list * rate * price);
const monthly = (list: number, price: number, rate: number) => Math.round((list * rate * price) / 12);
const money = (n: number, sym: string) => `${sym}${Math.round(n).toLocaleString("en-US")}`;
const toPos = (v: number, min: number, max: number) => Math.min(1, Math.max(0, Math.log(v / min) / Math.log(max / min)));
const fromPos = (p: number, min: number, max: number) => min * Math.pow(max / min, p);
function niceRound(v: number) {
  if (v < 100) return Math.round(v);
  const step = Math.pow(10, Math.floor(Math.log10(v)) - 1);
  return Math.round(v / step) * step;
}

function Slider({ value, min, max, label, ticks, prefix = "", onChange }: { value: number; min: number; max: number; label: string; ticks: string[]; prefix?: string; onChange: (v: number) => void }) {
  const pos = toPos(value, min, max);
  return (
    <div className="flex flex-col gap-2">
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(pos * 1000)}
        aria-label={label}
        aria-valuetext={`${prefix}${value.toLocaleString("en-US")}`}
        onChange={(e) => onChange(niceRound(fromPos(Number(e.target.value) / 1000, min, max)))}
        className="zn-range w-full"
        style={{ "--pct": `${pos * 100}%` } as CSSProperties}
      />
      <div aria-hidden className="flex justify-between text-[12px] text-[#7a6a72]">
        {ticks.map((t) => (
          <span key={t}>
            {prefix}
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function NumberField({ value, min, max, label, onChange }: { value: number; min: number; max: number; label: string; onChange: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      inputMode="numeric"
      aria-label={label}
      value={draft ?? String(value)}
      onFocus={(e) => e.target.select()}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 7);
        setDraft(digits);
        const n = Number(digits);
        if (digits && n >= min && n <= max) onChange(n);
      }}
      onBlur={() => {
        if (draft) onChange(Math.min(max, Math.max(min, Number(draft))));
        setDraft(null);
      }}
      className="w-[96px] rounded-[10px] bg-[#fff5f8] px-3 py-2 text-right text-[16px] font-medium tabular-nums text-[#2a1a22] ring-1 ring-[#f0c9d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2335f]"
    />
  );
}

export function RevenueCalculator() {
  const [offer, setOffer] = useState<(typeof OFFERS)[number]>("Coaching");
  const [list, setList] = useState(2500);
  const [price, setPrice] = useState(1500);
  const [sym, setSym] = useState<(typeof CURRENCIES)[number]>("$");
  const [done, setDone] = useState(false);
  const [range, setRange] = useState(false);
  const floor = LEVELS[0];

  const q = "flex items-baseline gap-3 text-[17px] font-medium text-[#2a1a22]";
  const num = "text-[13px] font-medium tabular-nums text-[#c2335f]";

  return (
    <div className="flex flex-col gap-5 rounded-[24px] bg-[#fffafb] p-[clamp(20px,3.5vw,44px)] text-[#2a1a22]">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        {/* The three questions */}
        <div className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-3">
            <legend className={`${q} mb-3`}>
              <span className={num}>01</span> What do you sell?
            </legend>
            <div className="flex flex-wrap gap-2">
              {OFFERS.map((o) => (
                <button key={o} type="button" aria-pressed={offer === o} onClick={() => setOffer(o)} className={`min-h-10 rounded-full px-4 text-[15px] font-medium ring-1 transition-colors ${offer === o ? "bg-[#2a1a22] text-white ring-[#2a1a22]" : "bg-white ring-[#f0c9d6] hover:ring-[#c2335f]"}`}>
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className={q}>
                <span className={num}>02</span> How many people are on your email list?
              </p>
              <label className="flex items-center gap-2 text-[14px] text-[#7a6a72]">
                <NumberField value={list} min={LIST.min} max={LIST.max} label="Email list size" onChange={setList} /> subs
              </label>
            </div>
            <Slider value={list} min={LIST.min} max={LIST.max} label="Email list size" ticks={LIST.ticks} onChange={setList} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className={q}>
                <span className={num}>03</span> What’s your main offer worth?
              </p>
              <div className="flex items-center gap-2">
                <select aria-label="Currency" value={sym} onChange={(e) => setSym(e.target.value as (typeof CURRENCIES)[number])} className="rounded-[10px] bg-[#fff5f8] px-2 py-2 text-[16px] ring-1 ring-[#f0c9d6]">
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <NumberField value={price} min={PRICE.min} max={PRICE.max} label="Offer price" onChange={setPrice} />
              </div>
            </div>
            <Slider value={price} min={PRICE.min} max={PRICE.max} label="Offer price" ticks={PRICE.ticks} prefix={sym} onChange={setPrice} />
          </div>
          <button type="button" onClick={() => setDone(true)} className="min-h-12 w-fit rounded-full bg-[#c2335f] px-6 text-[16px] font-medium text-white transition-colors hover:bg-[#a52650]">
            Calculate my email revenue <span aria-hidden>→</span>
          </button>
        </div>

        {/* The floor */}
        <div className="flex flex-col justify-center gap-3 rounded-[20px] bg-white p-6 ring-1 ring-[#f6dbe4]" aria-live="polite">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.1em] text-[#c2335f]">Your bare-minimum email revenue</p>
          {done ? (
            <>
              <p className="text-[clamp(40px,4.6vw,60px)] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                {money(yearly(list, price, floor.rate), sym)} <span className="text-[18px] font-medium text-[#7a6a72]">a year</span>
              </p>
              <p className="text-[16px] leading-[1.5] text-[#4a3a42]">
                That’s about <b>{money(monthly(list, price, floor.rate), sym)} a month</b>, from the list you already have.
              </p>
              <p className="text-[13.5px] text-[#7a6a72]">
                {list.toLocaleString("en-US")} subscribers × 1% buyer rate × {money(price, sym)}
              </p>
              {!range && (
                <button type="button" onClick={() => setRange(true)} className="mt-2 min-h-11 w-fit rounded-full bg-[#2a1a22] px-5 text-[15px] font-medium text-white hover:bg-black">
                  See the full range <span aria-hidden>↓</span>
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-[clamp(40px,4.6vw,60px)] font-semibold leading-none text-[#e3c6d0]">$—</p>
              <p className="text-[16px] text-[#4a3a42]">Answer the three questions, then calculate.</p>
            </>
          )}
        </div>
      </div>

      {done && range && (
        <div className="flex flex-col gap-4 border-t border-[#f6dbe4] pt-6">
          <p className="text-[14px] text-[#7a6a72]">On the live site, this range unlocks after a name and email. It follows your answers as you move the sliders.</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {LEVELS.map((l, i) => (
              <li key={l.name} className={`flex flex-col gap-2 rounded-[18px] p-5 ring-1 ${i === 0 ? "bg-[#fff0f5] ring-[#c2335f]" : "bg-white ring-[#f6dbe4]"}`}>
                <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#c2335f]">
                  {l.name} · {Math.round(l.rate * 100)}%
                </span>
                <span className="text-[28px] font-semibold tabular-nums leading-none">{money(yearly(list, price, l.rate), sym)}</span>
                <span className="text-[14px] text-[#7a6a72]">{money(monthly(list, price, l.rate), sym)} a month</span>
                <span className="text-[14.5px] leading-snug text-[#4a3a42]">{l.tagline}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
