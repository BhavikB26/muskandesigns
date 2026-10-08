import Link from "next/link";
import { ViewTransition } from "react";
import { thumbOf, type Project } from "@/content/projects";
import { ProjectMedia } from "@/components/home/work-scenes";

// Soft pastel per project (light theme). Dark theme uses the plain card colour.
const PASTEL: Record<string, string> = {
  "ai-mentor": "#fbf0dc",
  "builder-design-system": "#ebe8f8",
  "builder-university": "#efe9f8",
  "ratings-reviews": "#fbe7e5",
  "studio-store": "#f0ebfb",
  internshala: "#e4f1f7",
  "swiping-loop": "#e6f2ea",
  basecamp: "#e9ebf6",
};

function year(p: Project) {
  const m = p.meta.timeline?.match(/(20\d\d)(?!.*20\d\d)/);
  return m ? m[1] : undefined;
}

function Card({ p, i }: { p: Project; i: number }) {
  const meta = [p.tag === "Concept" ? p.meta.type : "Case study", p.meta.company.split(" (")[0], year(p)].filter(Boolean).join(" · ");
  return (
    <li
      data-reveal
      className="tinted group relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] p-5 ring-1 ring-line transition-shadow duration-700 ease-[var(--ease-out-expo)] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,0.35)] sm:p-8 md:grid-cols-12 md:gap-12 md:p-12"
      style={{ "--tint": PASTEL[p.slug] ?? "var(--color-card)" } as React.CSSProperties}
    >
      <div className="order-2 flex flex-col gap-4 md:order-1 md:col-span-5">
        <p className="label-mono text-muted">{meta}</p>
        <h3 className="font-display text-[clamp(1.8rem,1.3rem+1.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
          {/* One link per card; its ::after makes the whole card clickable. */}
          <Link
            href={`/work/${p.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-[28px] after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-[var(--color-accent)]"
          >
            {p.name}
          </Link>
        </h3>
        <p className="max-w-[42ch] text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-[1.55] text-ink-soft">{p.tagline}</p>
        <span
          aria-hidden
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-ink/80 bg-card px-5 py-2.5 text-[15px] font-medium text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-background"
        >
          Read case study
          <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">→</span>
        </span>
      </div>

      <div className="order-1 md:order-2 md:col-span-7">
        <div className="reveal-media relative aspect-[4/3] overflow-hidden rounded-[18px] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5" style={{ backgroundColor: p.tint }}>
          <ViewTransition name={`thumb-${p.slug}`} share="morph" default="none">
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
              <ProjectMedia slug={p.slug} src={thumbOf(p)} alt="" preload={i < 1} sizes="(min-width: 768px) 52vw, 92vw" />
            </div>
          </ViewTransition>
        </div>
      </div>
    </li>
  );
}

/* Gusto: no case study page. A walkthrough card with wireframes drawn in code (no Gusto assets or text). */
function Bar({ w, h = "h-1.5", c = "bg-[#c9c6c0]" }: { w: string; h?: string; c?: string }) {
  return <span className={`block rounded-full ${h} ${c}`} style={{ width: w }} />;
}

function Screen({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex aspect-[9/16] flex-col gap-2 rounded-[10px] bg-white p-2.5 shadow-[0_16px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
        {children}
      </div>
      <span className="text-center font-mono text-[10px] uppercase tracking-[0.06em] text-[#5f5a53]">{label}</span>
    </div>
  );
}

function GustoWireframes() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col justify-center gap-4 bg-[#eceae6] px-[5%] py-[6%]">
      <div className="flex items-start gap-[3%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
        <Screen label="Home">
          <Bar w="40%" />
          <span className="mt-2 block h-[28%] rounded-[6px] bg-[#dedbd5]" />
          <Bar w="85%" h="h-2" c="bg-[#a8a49d]" />
          <Bar w="60%" />
          <div className="mt-auto flex gap-1.5">
            <span className="h-4 flex-1 rounded-full bg-[#3a3733]" />
            <span className="h-4 flex-1 rounded-full ring-1 ring-[#8f8a82]" />
          </div>
        </Screen>
        <Screen label="Pick features">
          <Bar w="70%" h="h-2" c="bg-[#a8a49d]" />
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="flex items-center gap-1.5 rounded-[5px] p-1 ring-1 ring-[#d4d1cb]">
              <span className={`size-2.5 rounded-[3px] ${k % 2 ? "ring-1 ring-[#8f8a82]" : "bg-[#3a3733]"}`} />
              <Bar w="60%" />
            </span>
          ))}
          <span className="mt-auto h-4 rounded-full bg-[#3a3733]" />
        </Screen>
        <Screen label="Short form">
          <Bar w="65%" h="h-2" c="bg-[#a8a49d]" />
          {["Name", "Work email", "Company size"].map((k) => (
            <span key={k} className="flex flex-col gap-1">
              <Bar w="35%" h="h-1" />
              <span className="h-3.5 rounded-[4px] ring-1 ring-[#c9c6c0]" />
            </span>
          ))}
          <span className="mt-auto h-4 rounded-full bg-[#3a3733]" />
        </Screen>
        <Screen label="For you">
          <Bar w="55%" h="h-2" c="bg-[#a8a49d]" />
          <span className="block h-[22%] rounded-[6px] bg-[#dedbd5]" />
          <Bar w="90%" />
          <Bar w="75%" />
          <span className="block h-[18%] rounded-[6px] bg-[#e6e3de]" />
          <Bar w="80%" />
        </Screen>
      </div>
      <span className="self-center rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[#3a3733]">
        Recreated wireframes
      </span>
    </div>
  );
}

function GustoCard() {
  return (
    <li
      data-reveal
      className="tinted group relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] p-5 ring-1 ring-line transition-shadow duration-700 ease-[var(--ease-out-expo)] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,0.35)] sm:p-8 md:grid-cols-12 md:gap-12 md:p-12"
      style={{ "--tint": "#f1efeb" } as React.CSSProperties}
    >
      <div className="order-2 flex flex-col gap-4 md:order-1 md:col-span-5">
        <p className="label-mono text-muted">Walkthrough on request · Gusto</p>
        <h3 className="font-display text-[clamp(1.8rem,1.3rem+1.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
          <a
            href="#contact"
            className="outline-none after:absolute after:inset-0 after:rounded-[28px] after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-[var(--color-accent)]"
          >
            Growth experiments on Gusto&rsquo;s signup flow
          </a>
        </h3>
        <p className="max-w-[42ch] text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-[1.55] text-ink-soft">
          Happy to walk through it in an interview.
        </p>
        <span
          aria-hidden
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-ink/80 bg-card px-5 py-2.5 text-[15px] font-medium text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-background"
        >
          Ask me about it
          <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">→</span>
        </span>
      </div>
      <div className="order-1 md:order-2 md:col-span-7">
        <div className="reveal-media relative aspect-[4/3] overflow-hidden rounded-[18px] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">
          <GustoWireframes />
        </div>
      </div>
    </li>
  );
}

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page pt-24 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-3">
          <p className="label-mono text-muted">(01) Work</p>
          <h2 id="work-heading" className="font-display text-[clamp(2.4rem,1.4rem+3.4vw,5rem)] font-medium leading-[1] tracking-[-0.045em]">
            Selected <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent">work</em>
          </h2>
        </div>

        <ul className="flex flex-col gap-6 md:gap-8">
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
          {/* Gusto has no case study page: Muskan offers a walkthrough instead. */}
          <GustoCard />
        </ul>
      </div>
    </section>
  );
}
