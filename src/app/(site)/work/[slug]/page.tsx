import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Toggles } from "@/components/case/case-parts";
import { RailIndex } from "@/components/case/rail-index";
import { Showcase, StickerArt } from "@/components/case/showcase";
import { Cover } from "@/components/home/cover";
import { GEM } from "@/components/home/feature-art";
import { WithFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
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

/*
 * Case study layout (after pratikjoshi.framer.website): a slim rail (name, Back, section index) beside one
 * narrow reading column. The column opens with a mono meta line, a compact title, the cover in a tinted panel,
 * a three-column facts row and a summary card; each section is a mono eyebrow, a medium heading and grey body,
 * with "Lead: detail" lists set as two-column point cards. Generous white space, small type.
 */

const eyebrow = "font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted";
const body = "text-[16px] leading-[1.65] text-ink-soft";
const bullet = "relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-accent";

/** "Experiment 01: separate …" → "Experiment 01"; other titles as they are. */
const shortLabel = (t: string) => (/^[A-Z][\w ]{2,24}\d{2}[^:]*:/.test(t) ? t.split(":")[0] : t);

/** A list whose items all read "Lead: detail" or "Lead. Detail" becomes point cards. */
const POINT = /^([^.:]{2,64}?)[.:]\s+(.+)$/;
const asPoints = (list: string[]) => (list.length >= 2 && list.every((li) => POINT.test(li)) ? list.map((li) => li.match(POINT)!.slice(1, 3) as [string, string]) : null);

function Rail({ c }: { c: CaseStudy }) {
  const index = c.sections.map((s, n) => ({ id: `section-${n + 1}`, label: s.short ?? shortLabel(s.title) }));
  return (
    <aside className="hidden self-start md:sticky md:top-0 md:block">
      <div className="flex max-h-dvh flex-col gap-10 overflow-y-auto pb-8 pt-8 [scrollbar-width:none]">
        <Link href="/" className="w-fit whitespace-nowrap font-serif text-[24px] leading-none tracking-tight text-ink">
          Muskan Bhatia
        </Link>
        <Link href="/work" className="inline-flex w-fit items-center gap-1.5 text-[15px] font-medium text-ink hover:text-accent">
          <span aria-hidden>‹</span> Back<span className="sr-only"> to all case studies</span>
        </Link>
        <RailIndex items={[{ id: "summary", label: "Summary" }, ...index]} />
      </div>
    </aside>
  );
}

function Paragraphs({ items }: { items?: string[] }) {
  return items?.map((p) => (
    <p key={p.slice(0, 32)} className={body}>
      {p}
    </p>
  ));
}

function StorySection({ s, n, slug }: { s: Section; n: number; slug: string }) {
  const points = s.list ? asPoints(s.list) : null;
  return (
    <section id={`section-${n}`} aria-labelledby={`s-${n}`} data-reveal className="flex scroll-mt-12 flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className={eyebrow}>{String(n).padStart(2, "0")}</span>
            <h2 id={`s-${n}`} className="text-[clamp(20px,1.6vw,23px)] font-medium leading-[1.35] tracking-[-0.01em] text-ink">
              {s.title}
            </h2>
          </div>
          {s.sticker && (
            <div className="hidden w-[120px] shrink-0 lg:block">
              <StickerArt s={s.sticker} />
            </div>
          )}
        </div>
        <Paragraphs items={s.body} />
        {points ? (
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {points.map(([lead, detail]) => (
              <li key={lead} className="flex flex-col gap-1.5">
                <h3 className="text-[16px] font-medium leading-6 text-ink">{lead}</h3>
                <p className={body}>{detail}</p>
              </li>
            ))}
          </ul>
        ) : (
          s.list && (
            <ul className="flex flex-col gap-2.5">
              {s.list.map((li) => (
                <li key={li.slice(0, 32)} className={`${body} ${bullet}`}>
                  {li}
                </li>
              ))}
            </ul>
          )
        )}
        <Paragraphs items={s.after} />
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
  const others = [1, 2].map((k) => WORK_TILES[(i + k) % WORK_TILES.length]);

  return (
    <WithFooter>
      <ScrollProgress color={GEM[c.slug][1]} />
      <Toggles />
      <div className="page-in w-full px-page" style={{ "--gem": GEM[c.slug][0] } as CSSProperties}>
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-x-[clamp(48px,7vw,112px)] md:grid-cols-[180px_minmax(0,1fr)]">
          <Rail c={c} />

          <main id="main" tabIndex={-1} className="flex w-full min-w-0 max-w-[780px] flex-col gap-[clamp(72px,9vw,120px)] pb-8 pt-10 md:pt-[72px]">
            {/* Opening: meta line, title, cover, facts, summary */}
            <header className="flex flex-col gap-10">
              {/* phones: the rail is hidden, so its name and Back sit above the title */}
              <div className="flex items-center md:hidden">
                <Link href="/work" className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink">
                  <span aria-hidden>‹</span> Back<span className="sr-only"> to all case studies</span>
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[clamp(26px,2.3vw,32px)] font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
                  <span className="sr-only">{c.name}: </span>
                  {c.title}
                </h1>
              </div>
              <div className="gem-panel gem-tile flex justify-center px-[clamp(20px,8%,72px)] py-[clamp(20px,6%,48px)]">
                <div className="work-cell relative aspect-square w-full max-w-[460px] overflow-clip [container-type:size]">
                  <Cover slug={c.slug} />
                </div>
              </div>
              {c.links?.length ? (
                <div className="flex flex-wrap gap-4">
                  {c.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent">
                      {l.label} <span aria-hidden>↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              ) : null}
              <section id="summary" aria-labelledby="summary-h" className="scroll-mt-12 flex flex-col gap-4 rounded-[20px] bg-surface-1 p-[clamp(20px,3vw,32px)] ring-1 ring-line">
                <h2 id="summary-h" className={eyebrow}>
                  Summary
                </h2>
                <p className={body}>{c.intro}</p>
                <h3 className={`${eyebrow} pt-2`}>{c.summary.heading}</h3>
                <ul className="flex flex-col gap-2">
                  {c.summary.items.map((it) => (
                    <li key={it} className={`text-[16px] leading-[1.6] text-ink ${bullet}`}>
                      {it}
                    </li>
                  ))}
                </ul>
              </section>
            </header>

            {c.sections.map((s, n) => (
              <StorySection key={s.title} s={s} n={n + 1} slug={c.slug} />
            ))}

            {/* Other projects */}
            <section aria-labelledby="others-h" className="flex flex-col gap-6 border-t border-line pt-12">
              <h2 id="others-h" className="text-[16px] font-medium text-ink">
                Other projects
              </h2>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {others.map((t) => (
                  <li key={t.slug}>
                    <Link href={t.href} className="cv-card group flex flex-col gap-3">
                      <div className="work-cell relative aspect-square overflow-clip [container-type:size]">
                        <Cover slug={t.slug} />
                      </div>
                      <span className="text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-accent">{t.headline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </WithFooter>
  );
}
