import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Toggles } from "@/components/case/case-parts";
import { Cover } from "@/components/home/cover";
import { GEM } from "@/components/home/feature-art";
import { WithFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import type { CaseStudy } from "@/content/case-studies";
import { mediaDims } from "@/content/media-dims";
import type { Decision, Story } from "@/content/stories/types";
import { MORE_STORIES } from "@/content/stories/more";
import { WORK_TILES } from "@/content/work";
import { BlockPlayground } from "./block-playground";
import { StoryMediaView } from "./media";
import { NatashaModes } from "./natasha-modes";
import { RevenueCalculator } from "./revenue-calculator";
import { BeforeAfter } from "./before-after";
import { Walkthrough } from "./walkthrough";
import { Paths } from "./paths";
import { FitText } from "./fit-text";

/*
 * Case study, editorial edition. After portfolio.designwithdaria.com: the product leads, labelled sections
 * (Context, Approach, Outcome) carry short copy, and every section is built around a real visual.
 * Seven parts: hero, context, role, three or four decisions, an interactive piece, outcome, reflection.
 */

const LABEL = "font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] text-muted";
const BODY = "text-[17px] leading-[1.65] text-ink-soft";
const WRAP = "mx-auto w-full max-w-[1240px] px-page";

const SECTIONS = [
  { id: "context", label: "Context" },
  { id: "approach", label: "Approach" },
  { id: "try", label: "Try it" },
  { id: "outcome", label: "Outcome" },
];

function SectionLabel({ n, children, id }: { n: string; children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className={`${LABEL} flex items-center gap-3`}>
      <span className="tabular-nums" style={{ color: "var(--gem-ink)" }}>
        {n}
      </span>
      <span aria-hidden className="h-px w-8 bg-line-strong/50" />
      {children}
    </h2>
  );
}

function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-line/70 bg-background/80 backdrop-blur-md">
      <nav aria-label="Case study" className={`${WRAP} flex h-14 items-center justify-between gap-6`}>
        <Link href="/" className="font-serif text-[22px] leading-none text-ink">
          Muskan Bhatia
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-[14px] text-muted transition-colors hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/work" className="text-[14px] font-medium text-ink hover:text-accent">
          All work <span aria-hidden>→</span>
        </Link>
      </nav>
    </div>
  );
}

function Hero({ s, c }: { s: Story; c?: CaseStudy }) {
  // Long names (MakeMyCareer) get a smaller size so they stay inside the hero column.
  const name = s.hero.name ?? s.more?.name ?? c?.name ?? "";
  return (
    <header className={`${WRAP} grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-12 pb-[clamp(72px,9vw,128px)] pt-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}>
      <div className="flex flex-col gap-7">
        <ul className="flex flex-wrap gap-1.5" aria-label="Disciplines">
          {s.hero.tags.map((t) => (
            <li key={t} className="rounded-full px-2.5 py-1 text-[12.5px] font-medium text-ink ring-1 ring-line" style={{ background: "color-mix(in oklab, var(--gem) 14%, transparent)" }}>
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-5">
          <h1
            className={`font-serif leading-[0.9] tracking-[-0.02em] text-ink [overflow-wrap:anywhere] ${
              name.length > 10 ? "text-[clamp(40px,4.1vw,64px)]" : "text-[clamp(52px,6.3vw,96px)]"
            }`}
          >
            {name}
            <span className="sr-only">: {s.hero.headline}</span>
          </h1>
          <p aria-hidden className="text-balance text-[clamp(22px,2.1vw,30px)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
            {s.hero.headline}
          </p>
          <p className={`${BODY} max-w-[46ch]`}>{s.hero.line}</p>
        </div>
        {s.links?.length ? (
          <div className="flex flex-wrap gap-4">
            {s.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
                {l.label} <span aria-hidden>↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <div className="min-w-0">
        <StoryMediaView m={s.hero.media} slug={s.slug} />
      </div>
    </header>
  );
}

function DecisionBlock({ d, n, slug }: { d: Decision; n: number; slug: string }) {
  const parts: [string, string][] = [
    ["The problem", d.problem],
    ["What I tried", d.explored],
    ["Why this way", d.why],
  ];
  return (
    <article data-reveal aria-labelledby={`d-${n}`} className="flex flex-col gap-10">
      <div className="grid gap-x-[clamp(32px,5vw,80px)] gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[clamp(40px,4vw,56px)] leading-none" style={{ color: "var(--gem-ink)" }} aria-hidden>
            {String(n).padStart(2, "0")}
          </span>
          <h3 id={`d-${n}`} className="font-serif text-[clamp(30px,3.2vw,44px)] leading-[1.05] tracking-[-0.01em] text-ink">
            {d.title}
          </h3>
        </div>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-3">
          {parts.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2">
              <dt className={LABEL}>{k}</dt>
              <dd className="text-[15.5px] leading-[1.6] text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      {d.media?.map((m, i) => (
        <StoryMediaView key={i} m={m} slug={slug} />
      ))}
    </article>
  );
}

function Module({ s }: { s: Story }) {
  const m = s.interactive.module;
  switch (m.id) {
    case "block-playground": {
      const dims = Object.fromEntries(
        Object.entries(mediaDims)
          .filter(([k]) => k.startsWith("/work/builder-design-system/v2/") || k.startsWith("/work/natasha/v2/"))
          .map(([k, v]) => [k, [v[0], v[1]] as [number, number]]),
      );
      return <BlockPlayground dims={dims} />;
    }
    case "natasha-modes":
      return <NatashaModes />;
    case "revenue-calculator":
      return <RevenueCalculator />;
    case "walkthrough":
      return <Walkthrough steps={m.steps} />;
    case "paths":
      return <Paths paths={m.paths} />;
    case "before-after":
      return <BeforeAfter before={m.before} after={m.after} labels={m.labels} frame={m.frame} />;
  }
}

/** More projects: previous and next within that group, shown by their own thumbnails. */
function NextMore({ slug }: { slug: string }) {
  const i = MORE_STORIES.findIndex((t) => t.slug === slug);
  const n = MORE_STORIES.length;
  const pair: [string, Story][] = [
    ["Previous", MORE_STORIES[(i - 1 + n) % n]],
    ["Next", MORE_STORIES[(i + 1) % n]],
  ];
  return (
    <nav aria-label="More projects" className={`${WRAP} flex flex-col gap-8 border-t border-line pt-14`}>
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-serif text-[clamp(32px,3.4vw,48px)] leading-none text-ink">Keep reading</h2>
        <Link href="/work#more" className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
          All projects
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {pair.map(([k, t]) => (
          <li key={k}>
            <Link href={`/work/${t.slug}`} className="group flex flex-col gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] ring-1 ring-line" style={{ background: t.more!.gem[0] }}>
                <Image src={t.more!.thumb.src} alt={t.more!.thumb.alt} fill sizes="(min-width: 640px) 45vw, 92vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <span className={LABEL}>{k}</span>
              <span className="text-[17px] font-medium leading-snug text-ink transition-colors group-hover:text-accent">{t.more!.name}: {t.more!.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NextProjects({ slug }: { slug: string }) {
  const i = WORK_TILES.findIndex((t) => t.slug === slug);
  const prev = WORK_TILES[(i - 1 + WORK_TILES.length) % WORK_TILES.length];
  const next = WORK_TILES[(i + 1) % WORK_TILES.length];
  return (
    <nav aria-label="More case studies" className={`${WRAP} flex flex-col gap-8 border-t border-line pt-14`}>
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-serif text-[clamp(32px,3.4vw,48px)] leading-none text-ink">Keep reading</h2>
        <Link href="/work" className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
          All case studies
        </Link>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[
          ["Previous", prev],
          ["Next", next],
        ].map(([k, t]) => {
          const tile = t as (typeof WORK_TILES)[number];
          return (
            <li key={k as string}>
              <Link href={tile.href} className="cv-card group flex flex-col gap-3">
                <div className="work-cell relative aspect-[4/3] overflow-clip [container-type:size]">
                  <Cover slug={tile.slug} />
                </div>
                <span className={LABEL}>{k as string}</span>
                <span className="text-[17px] font-medium leading-snug text-ink transition-colors group-hover:text-accent">{tile.headline}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function StoryPage({ s, c }: { s: Story; c?: CaseStudy }) {
  const [gem, gemInk] = s.more?.gem ?? GEM[s.slug];
  return (
    <WithFooter>
      <ScrollProgress color={gemInk} />
      <Toggles />
      <div className="page-in story w-full" style={{ "--gem": gem, "--gem-ink": gemInk } as CSSProperties}>
        <TopBar />
        <main id="main" tabIndex={-1} className="flex flex-col gap-[clamp(96px,11vw,168px)] pb-12">
          <Hero s={s} c={c} />

          {/* Context */}
          <section
            id="context"
            aria-labelledby="h-context"
            data-reveal
            className={`${WRAP} grid scroll-mt-20 gap-x-[clamp(32px,5vw,80px)] gap-y-10 ${s.context.media ? "lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]" : ""}`}
          >
            <div className={`flex flex-col gap-6 ${s.context.media ? "lg:sticky lg:top-24 lg:self-start" : "max-w-[760px]"}`}>
              <SectionLabel n="01" id="h-context">
                Context
              </SectionLabel>
              {s.context.copy.map((p, i) => (
                <p key={i} className={i === 0 ? "text-balance text-[clamp(21px,1.8vw,26px)] font-medium leading-[1.35] text-ink" : BODY}>
                  {p}
                </p>
              ))}
            </div>
            {s.context.media && (
              <div className="min-w-0">
                <StoryMediaView m={s.context.media} slug={s.slug} />
              </div>
            )}
          </section>

          {/* Approach */}
          <section id="approach" aria-labelledby="h-approach" className={`${WRAP} flex scroll-mt-20 flex-col gap-[clamp(80px,9vw,140px)]`}>
            <div data-reveal className="flex flex-col gap-5">
              <SectionLabel n="02" id="h-approach">
                Approach
              </SectionLabel>
              {s.approach && <FitText className="font-serif leading-[1.1] text-ink">{s.approach}</FitText>}
            </div>
            {s.decisions.map((d, i) => (
              <DecisionBlock key={d.title} d={d} n={i + 1} slug={s.slug} />
            ))}
          </section>

          {/* Interactive */}
          <section id="try" aria-labelledby="h-try" data-reveal className="story-stage scroll-mt-20 py-[clamp(64px,8vw,120px)]">
            <div className={`${WRAP} flex flex-col gap-10`}>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="flex flex-col gap-4">
                  <h2 className="flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] text-white/60">
                    <span style={{ color: "color-mix(in oklab, var(--gem) 55%, white)" }}>03</span>
                    <span aria-hidden className="h-px w-8 bg-white/30" />
                    Try it
                  </h2>
                  <p id="h-try" className="font-serif text-[clamp(32px,3.6vw,52px)] leading-[1.02] text-white">
                    {s.interactive.title}
                  </p>
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <p className="text-[17px] leading-[1.6] text-white/80">{s.interactive.prompt}</p>
                  {s.interactive.note && <p className="text-[14px] text-white/55">{s.interactive.note}</p>}
                </div>
              </div>
              <Module s={s} />
            </div>
          </section>

          {/* Outcome */}
          <section id="outcome" aria-labelledby="h-outcome" data-reveal className={`${WRAP} grid scroll-mt-20 gap-x-[clamp(32px,5vw,80px)] gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}>
            <div className="flex flex-col gap-6">
              <SectionLabel n="04" id="h-outcome">
                Outcome
              </SectionLabel>
              {s.outcome.copy.map((p, i) => (
                <p key={i} className={i === 0 ? "text-[clamp(20px,1.7vw,24px)] font-medium leading-[1.4] text-ink" : BODY}>
                  {p}
                </p>
              ))}
              {s.outcome.metrics?.length ? (
                <dl className="grid grid-cols-2 gap-3 pt-2">
                  {s.outcome.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1 rounded-[18px] bg-surface-1 p-5 ring-1 ring-line">
                      <dd className="order-first font-serif text-[clamp(40px,4vw,56px)] leading-none" style={{ color: "var(--gem-ink)" }}>
                        {m.value}
                      </dd>
                      <dt className="text-[14.5px] leading-snug text-ink">{m.label}</dt>
                      {m.note && <p className="text-[13px] leading-snug text-muted">{m.note}</p>}
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
            {s.outcome.media && (
              <div className="min-w-0">
                <StoryMediaView m={s.outcome.media} slug={s.slug} />
              </div>
            )}
          </section>

          {/* Reflection */}
          <section aria-labelledby="h-reflection" data-reveal className={`${WRAP}`}>
            <div className="mx-auto flex max-w-[900px] flex-col gap-6 text-center">
              <h2 id="h-reflection" className={`${LABEL} flex items-center justify-center gap-3`}>
                <span style={{ color: "var(--gem-ink)" }}>05</span>
                <span aria-hidden className="h-px w-8 bg-line-strong/50" />
                Reflection
              </h2>
              <blockquote className="text-balance font-serif text-[clamp(28px,3.2vw,46px)] leading-[1.15] text-ink">{s.reflection}</blockquote>
            </div>
          </section>

          {s.more ? <NextMore slug={s.slug} /> : <NextProjects slug={s.slug} />}
        </main>
      </div>
    </WithFooter>
  );
}
