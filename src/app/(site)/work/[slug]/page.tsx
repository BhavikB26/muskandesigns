import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Toggles } from "@/components/case/case-parts";
import { Showcase, StickerArt } from "@/components/case/showcase";
import { FeatureArt, GEM } from "@/components/home/feature-art";
import { WithFooter } from "@/components/site-footer";
import { caseStudies, getCaseStudy, type CaseStudy, type Section } from "@/content/case-studies";
import { WORK_TILES } from "@/content/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return { title: `${c.name}: ${c.facts.type}`, description: c.card.headline, openGraph: { title: c.name, description: c.card.headline } };
}

/* ---------- Side rail (after ngan-nguyen.com): stays still while the story scrolls ---------- */

function Rail({ c }: { c: CaseStudy }) {
  const facts: [string, string | undefined][] = [
    ["Industry", c.facts.industry],
    ["Company", c.facts.company],
    ["My role", c.facts.role],
    ["Timeline", c.facts.timeline],
  ];
  return (
    <aside className="md:sticky md:top-0 md:h-svh">
      <div className="flex h-full flex-col justify-between gap-fr-xxl pb-fr-xl pt-fr-xl md:pt-10">
        <div className="flex flex-col gap-fr-xxl">
          <Link href="/" aria-label="Muskan Bhatia, home" className="inline-flex size-11 items-center">
            <span aria-hidden className="flex size-8 items-center justify-center rounded-[2px] bg-ink pb-[2px] font-display text-[19px] font-semibold leading-none text-background">
              m
            </span>
          </Link>
          <p className="font-display text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-medium leading-[1] tracking-[-0.03em] text-ink">{c.name}</p>
          <dl className="grid grid-cols-2 gap-x-fr-lg gap-y-fr-lg md:grid-cols-1">
            {facts
              .filter((f): f is [string, string] => Boolean(f[1]))
              .map(([k, v]) => (
                <div key={k} className="flex flex-col gap-fr-xxs">
                  <dt className="t-body text-ink">{k}</dt>
                  <dd className="t-body-sm text-muted">{v}</dd>
                </div>
              ))}
            <div className="col-span-2 flex flex-col gap-fr-xs md:col-span-1">
              <dt className="t-body text-ink">Deliverables</dt>
              <dd>
                <ul className="flex flex-wrap gap-fr-xxs">
                  {c.deliverables.map((d) => (
                    <li key={d} className="t-caption rounded-full px-fr-xs py-[3px] text-ink ring-1 ring-line-strong">
                      {d}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          {c.links?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="t-body-sm w-fit border-b border-ink pb-px text-ink">
              {l.label} <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
        <div className="flex items-center justify-between gap-fr-sm">
          <Link href="/work" className="t-body inline-flex min-h-11 items-center gap-fr-xs text-ink hover:text-accent">
            Close <span aria-hidden>✕</span>
            <span className="sr-only"> case study, back to all case studies</span>
          </Link>
          <Toggles />
        </div>
      </div>
    </aside>
  );
}

/* ---------- Story sections (after manojdesigner.framer.website) ---------- */

function StorySection({ s, n, slug }: { s: Section; n: number; slug: string }) {
  return (
    <section id={s.label.toLowerCase().replace(/\s+/g, "-")} aria-labelledby={`s-${n}`} data-reveal className="flex scroll-mt-10 flex-col gap-fr-xxl border-t border-line pt-fr-xl">
      <div className="grid grid-cols-1 gap-fr-lg lg:grid-cols-12 lg:gap-x-fr-xxl">
        <div className="flex flex-col gap-fr-xs lg:col-span-4">
          <p className="label-mono text-muted">
            {String(n).padStart(2, "0")} · {s.label}
          </p>
          <h2 id={`s-${n}`} className="t-display-md text-ink">
            {s.title}
          </h2>
          {s.sticker && (
            <div className="mt-fr-lg hidden lg:block">
              <StickerArt s={s.sticker} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-fr-lg lg:col-span-8">
          {s.highlight && <p className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] italic leading-[1.25] text-accent">{s.highlight}</p>}
          {s.body?.map((p) => (
            <p key={p.slice(0, 24)} className="t-body-lg max-w-[62ch] text-ink-soft">
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="flex max-w-[62ch] flex-col gap-fr-sm">
              {s.list.map((li) => (
                <li key={li.slice(0, 24)} className="t-body-lg relative pl-fr-lg text-ink-soft before:absolute before:left-0 before:top-[0.62em] before:size-2 before:rounded-full before:bg-accent">
                  {li}
                </li>
              ))}
            </ul>
          )}
          {s.stats && (
            <dl className="grid grid-cols-1 gap-fr-lg sm:grid-cols-2">
              {s.stats.map((st) => (
                <div key={st.label} className="flex flex-col-reverse gap-fr-xs rounded-fr-lg bg-surface-1 p-fr-lg ring-1 ring-line">
                  <dt className="t-body text-muted">{st.label}</dt>
                  <dd className="font-display text-[clamp(2.4rem,1.8rem+2vw,3.6rem)] font-semibold leading-none tracking-[-0.03em] text-accent">{st.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {s.quote && (
            <figure className="flex flex-col gap-fr-sm border-l-2 border-accent pl-fr-lg">
              <blockquote className="font-serif text-[clamp(1.3rem,1.1rem+0.6vw,1.7rem)] italic leading-[1.35] text-ink">&ldquo;{s.quote.text}&rdquo;</blockquote>
              <figcaption className="t-body-sm text-muted">{s.quote.by}</figcaption>
            </figure>
          )}
        </div>
      </div>
      {s.visuals?.map((v, i) => (
        <Showcase key={i} v={v} slug={slug} />
      ))}
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const i = WORK_TILES.findIndex((t) => t.slug === slug);
  const next = WORK_TILES[(i + 1) % WORK_TILES.length];

  return (
    <WithFooter>
      <div className="page-in w-full px-page" style={{ "--gem": GEM[c.slug][0] } as CSSProperties}>
        <div className="mx-auto grid w-full max-w-[1760px] grid-cols-1 gap-x-[4vw] md:grid-cols-[minmax(200px,17%)_1fr]">
          <Rail c={c} />

          <main id="main" tabIndex={-1} className="flex min-w-0 flex-col gap-fr-section pt-fr-xl md:pt-10">
            <header className="grid grid-cols-1 gap-fr-xl lg:grid-cols-12 lg:gap-x-fr-xxl">
              <h1 className="t-display-lg text-ink lg:col-span-6">
                <span className="sr-only">{c.name}: </span>
                {c.tagline}
              </h1>
              <div className="flex flex-col gap-fr-md lg:col-span-6">
                {c.intro.map((p) => (
                  <p key={p.slice(0, 24)} className="t-body-lg text-ink-soft">
                    {p}
                  </p>
                ))}
                {c.concept && <p className="t-body-sm w-fit rounded-full bg-accent-soft px-fr-sm py-fr-xxs text-ink">Concept: not a shipped product</p>}
              </div>
            </header>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-fr-xl">
              <FeatureArt slug={c.slug} />
            </div>

            {c.sections.map((s, n) => (
              <StorySection key={s.label} s={s} n={n + 1} slug={c.slug} />
            ))}

            <Link href={next.href} className="group flex flex-col gap-fr-sm border-t border-line pt-fr-xl">
              <span className="label-mono text-muted">Next case study</span>
              <span className="t-display-lg text-ink transition-colors group-hover:text-accent">
                {next.headline} <span aria-hidden>→</span>
              </span>
              <span className="label-mono text-muted">{next.label}</span>
            </Link>
          </main>
        </div>
      </div>
    </WithFooter>
  );
}
