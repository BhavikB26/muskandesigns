import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { TileArt } from "@/components/home/tile-art";
import { CaseFooter, CaseHero, CaseIntro, DeckSlideView, Facts, Identity, Outcome, Panel, Quote, TextBlock, Toggles } from "@/components/case/case-parts";
import { decks } from "@/content/decks";
import { brandOf } from "@/content/brand";
import { getNextProject, getProject, projects, type Block, type Project } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name}: ${p.meta.type}`,
    description: p.tagline,
    openGraph: { title: p.name, description: p.tagline, images: [{ url: p.cover.src }] },
  };
}

type Text = Extract<Block, { kind: "text" }>;

/** Trailing reflections (outcome, learnings, next steps) move into the closing section. */
const CLOSING = /learn|outcome|landed|next|recommend/i;

function splitStory(p: Project) {
  const blocks = [...p.blocks];
  const closing: Text[] = [];
  while (blocks.length) {
    const last = blocks[blocks.length - 1];
    if (last.kind === "text" && CLOSING.test(last.heading)) closing.unshift(blocks.pop() as Text);
    else break;
  }
  return { story: blocks, closing };
}

function Links({ p }: { p: Project }) {
  if (!p.links?.length) return null;
  return (
    <ul className="flex flex-col gap-1">
      {p.links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="case-link inline-flex min-h-8 items-center gap-1.5 text-[14.5px] font-medium text-ink">
            {l.label} <span aria-hidden>↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getNextProject(slug);
  const brand = brandOf(p.slug);
  const { story, closing } = splitStory(p);
  const deck = decks[p.slug];

  return (
    <div className="page-in w-full px-page">
      <div className="mx-auto grid w-full max-w-[1760px] grid-cols-1 gap-x-[4vw] md:grid-cols-[minmax(180px,17%)_1fr]">
        {/* Side rail: stays in place while the case study scrolls (desktop). */}
        <aside className="md:sticky md:top-0 md:h-svh md:overflow-y-auto">
          <div className="flex items-start justify-between gap-4 pb-2 pt-6 md:flex-col md:justify-start md:gap-14 md:pt-10">
            <Identity />
            <div className="md:hidden">
              <Toggles />
            </div>
            <div className="hidden flex-col gap-8 md:flex">
              <Facts p={p} />
              <Links p={p} />
            </div>
          </div>
        </aside>

        <main id="main" className="min-w-0 pb-6">
          <div className="hidden justify-end pt-10 md:flex">
            <Toggles />
          </div>
          <article className="flex flex-col">
            {/* Section B */}
            <div className="pt-10 md:pt-10">
              <CaseIntro p={p} />
              <div className="mt-10 flex flex-col gap-6 border-t border-line pt-6 md:hidden">
                <Facts p={p} />
                <Links p={p} />
              </div>
            </div>

            {/* Section C: hero (the home tile morphs into it). */}
            <div className="pt-14 md:pt-20">
              <ViewTransition name={`thumb-${p.slug}`} share="morph" default="none">
                <div>
                  <CaseHero p={p} brand={brand} art={<TileArt slug={p.slug} bare />} />
                </div>
              </ViewTransition>
            </div>

            {/* Sections D–H: the story, screens between short text, then the outcome. */}
            <div className="flex flex-col gap-16 pt-20 md:gap-28 md:pt-32">
              {deck ? (
                <>
                  {deck.map((sl) => (
                    <DeckSlideView key={sl.id} slide={sl} />
                  ))}
                  <Outcome blocks={[]} concept={p.tag === "Concept"} />
                </>
              ) : (
                <>
                  {story.map((b, i) => {
                    if (b.kind === "images") return <Panel key={i} images={b.images} />;
                    if (b.kind === "quote") return <Quote key={i} block={b} />;
                    return <TextBlock key={i} block={b} />;
                  })}
                  <Outcome blocks={closing} concept={p.tag === "Concept"} />
                </>
              )}
            </div>
          </article>
        </main>
      </div>

      {/* Section J: aligned to the side rail's left edge. */}
      <div className="mx-auto w-full max-w-[1760px] pt-20 md:pt-28">
        <CaseFooter next={next} nextArt={<TileArt slug={next.slug} cycle={false} />} />
      </div>
    </div>
  );
}
