import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { TileArt } from "@/components/home/tile-art";
import { Background, CaseFooter, CaseHero, CaseIntro, CaseNav, Facts, Outcome, Panel, Quote, Rail, TextBlock } from "@/components/case/case-parts";
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
    title: `${p.name}: ${p.meta.type} — Muskan Bhatia`,
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
  // Panels cycle through the project's own colours so each idea reads as its own block.
  const panelColors = [brand.soft, brand.base, brand.deep];
  let panel = 0;

  return (
    <>
      <CaseNav />
      <main id="main" className="page-in w-full px-page">
        <article className="flex flex-col">
          {/* Section B: intro beside the project facts. */}
          <div className="pt-12 md:pt-20">
            <Rail
              rail={
                <div className="flex flex-col gap-8 pt-2">
                  <Facts p={p} />
                  <Links p={p} />
                </div>
              }
            >
              <CaseIntro p={p} />
              <div className="mt-10 flex flex-col gap-6 border-t border-line pt-6 md:hidden">
                <Facts p={p} />
                <Links p={p} />
              </div>
            </Rail>
          </div>

          {/* Section C: hero (the home tile morphs into it). */}
          <div className="pt-14 md:pt-24">
            <Rail>
              <ViewTransition name={`thumb-${p.slug}`} share="morph" default="none">
                <div>
                  <CaseHero p={p} brand={brand} />
                </div>
              </ViewTransition>
            </Rail>
          </div>

          {/* Sections D–F: the story as colour panels with short text between them. */}
          <div className="pt-20 md:pt-32">
            <Rail>
              <div className="flex flex-col gap-16 md:gap-28">
                {story.map((b, i) => {
                  if (b.kind === "images") return <Panel key={i} images={b.images} color={panelColors[panel++ % panelColors.length]} />;
                  if (b.kind === "quote") return <Quote key={i} block={b} />;
                  return <TextBlock key={i} block={b} />;
                })}
                <Outcome blocks={closing} concept={p.tag === "Concept"} />
              </div>
            </Rail>
          </div>

          {/* Section I: background pause. */}
          <div className="pt-20 md:pt-32">
            <Rail>
              <Background />
            </Rail>
          </div>

          {/* Section J: next project and links. */}
          <div className="pt-10">
            <Rail>
              <CaseFooter next={next} nextArt={<TileArt slug={next.slug} cycle={false} />} />
            </Rail>
          </div>
        </article>
      </main>
    </>
  );
}
