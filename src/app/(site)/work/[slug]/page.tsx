import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Toggles } from "@/components/case/case-parts";
import { Showcase, StickerArt } from "@/components/case/showcase";
import { FeatureArt, GEM } from "@/components/home/feature-art";
import { WithFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { TracingBeam } from "@/components/ui/tracing-beam";
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
  return { title: c.name, description: c.title, openGraph: { title: `${c.name}: ${c.title}`, description: c.intro } };
}

/* ---------- Side rail (after ngan-nguyen.com): stays still while the story scrolls ---------- */

function Rail({ c }: { c: CaseStudy }) {
  const [role, ...details] = c.meta;
  return (
    <aside className="self-start md:sticky md:top-0">
      <div className="flex flex-col gap-fr-xxl pb-fr-xl pt-6">
        <div className="flex flex-col gap-fr-xxl">
          <Link href="/" className="w-fit whitespace-nowrap font-serif text-[26px] leading-[1.6] tracking-tight text-ink sm:text-3xl">
            Muskan Bhatia
          </Link>
          <p className="font-display text-[clamp(1.9rem,1.3rem+1.5vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">{c.name}</p>
          <dl className="grid grid-cols-2 gap-x-fr-lg gap-y-fr-lg md:grid-cols-1">
            <div className="flex flex-col gap-fr-xxs">
              <dt className="t-body text-ink">My role</dt>
              <dd className="t-body-sm text-muted">{role}</dd>
            </div>
            <div className="flex flex-col gap-fr-xxs">
              <dt className="t-body text-ink">Project</dt>
              {details.map((d) => (
                <dd key={d} className="t-body-sm text-muted">
                  {d}
                </dd>
              ))}
            </div>
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
        <div className="flex items-center justify-between gap-fr-sm border-t border-line pt-fr-md">
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

const bullet =
  "relative pl-fr-lg before:absolute before:left-0 before:top-[0.62em] before:size-2 before:rounded-full before:bg-accent";

function StorySection({ s, n, slug }: { s: Section; n: number; slug: string }) {
  return (
    <section id={`section-${n}`} aria-labelledby={`s-${n}`} data-reveal className="flex scroll-mt-10 flex-col gap-fr-xxl border-t border-line pt-fr-xl">
      <div className="grid grid-cols-1 gap-fr-lg lg:grid-cols-12 lg:gap-x-fr-xxl">
        <div className="flex flex-col gap-fr-xs lg:col-span-4">
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
          {s.body?.map((p) => (
            <p key={p.slice(0, 32)} className="t-body-lg max-w-[62ch] text-ink-soft">
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="flex max-w-[62ch] flex-col gap-fr-sm">
              {s.list.map((li) => (
                <li key={li.slice(0, 32)} className={`t-body-lg text-ink-soft ${bullet}`}>
                  {li}
                </li>
              ))}
            </ul>
          )}
          {s.after?.map((p) => (
            <p key={p.slice(0, 32)} className="t-body-lg max-w-[62ch] text-ink-soft">
              {p}
            </p>
          ))}
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
      <ScrollProgress color={GEM[c.slug][1]} />
      <div className="page-in w-full px-page" style={{ "--gem": GEM[c.slug][0] } as CSSProperties}>
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-fr-section md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
          <Rail c={c} />

          <main id="main" tabIndex={-1} className="flex min-w-0 flex-col gap-fr-section pt-fr-xl md:pt-[88px]">
            <header className="grid grid-cols-1 gap-fr-xl lg:grid-cols-12 lg:gap-x-fr-xxl">
              <h1 className="t-display-lg text-ink lg:col-span-6">
                <span className="sr-only">{c.name}: </span>
                {c.title}
              </h1>
              <div className="flex flex-col gap-fr-lg lg:col-span-6">
                <p className="t-body-lg text-ink-soft">{c.intro}</p>
                <div className="rounded-fr-lg bg-surface-1 p-fr-lg ring-1 ring-line">
                  <h2 className="label-mono mb-fr-sm text-muted">{c.summary.heading}</h2>
                  <ul className="flex flex-col gap-fr-xs">
                    {c.summary.items.map((it) => (
                      <li key={it} className={`t-body text-ink ${bullet}`}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </header>

            <ContainerScroll>
              <div className="gem-tile relative aspect-[4/3] w-full overflow-hidden">
                <FeatureArt slug={c.slug} />
              </div>
            </ContainerScroll>

            <TracingBeam color={GEM[c.slug][1]}>
              <div className="flex flex-col gap-fr-section">
                {c.sections.map((s, n) => (
                  <StorySection key={s.title} s={s} n={n + 1} slug={c.slug} />
                ))}
              </div>
            </TracingBeam>

            <Link href={next.href} className="group flex flex-col gap-fr-sm border-t border-line pt-fr-xl">
              <span className="t-display-lg text-ink">
                <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em] text-muted">Next:</em>{" "}
                <span className="transition-colors group-hover:text-accent">{next.headline}</span> <span aria-hidden>→</span>
              </span>
              <span className="t-body-sm text-muted">{next.label}</span>
            </Link>
          </main>
        </div>
      </div>
    </WithFooter>
  );
}
