import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { LoopVideo } from "@/components/home/loop-video";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNextProject, getProject, projects, type Block, type Img, type Project } from "@/content/projects";

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

function MetaStrip({ p }: { p: Project }) {
  const items = [
    ["Company", p.meta.company],
    ["My role", p.meta.role],
    ["Timeline", p.meta.timeline],
    ["Type", p.meta.type],
  ].filter((i): i is [string, string] => Boolean(i[1]));
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-5 border-y border-line py-6 min-[400px]:grid-cols-2 md:grid-cols-4">
      {items.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1">
          <dt className="label-mono text-muted">{k}</dt>
          <dd className="text-[16px] leading-[1.4]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Figure({ image, tint, priority = false }: { image: Img; tint: string; priority?: boolean }) {
  const tall = image.height > image.width * 1.15;
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex items-center justify-center overflow-hidden rounded-[8px]" style={{ backgroundColor: tint }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          preload={priority}
          sizes="(min-width: 1320px) 1240px, 100vw"
          className={tall ? "h-auto max-h-[720px] w-auto max-w-full py-8" : "h-auto w-full"}
        />
      </div>
      {image.caption && <figcaption className="label-mono px-1 normal-case tracking-normal text-muted">{image.caption}</figcaption>}
    </figure>
  );
}

function BlockView({ block, tint }: { block: Block; tint: string }) {
  if (block.kind === "images") {
    const [first, ...rest] = block.images;
    const single = block.images.length === 1;
    const odd = block.images.length % 2 === 1;
    return (
      <div data-reveal className="flex flex-col gap-4">
        {single || odd ? <Figure image={first} tint={tint} /> : null}
        {!single && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(odd ? rest : block.images).map((img) => (
              <Figure key={img.src} image={img} tint={tint} />
            ))}
          </div>
        )}
      </div>
    );
  }
  if (block.kind === "quote") {
    return (
      <figure data-reveal className="mx-auto flex max-w-[860px] flex-col gap-4 py-6 text-center">
        <blockquote className="font-editorial text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-normal italic leading-[1.3]">
          &ldquo;{block.text}&rdquo;
        </blockquote>
        <figcaption className="text-[15px] text-muted">{block.by}</figcaption>
      </figure>
    );
  }
  return (
    <div data-reveal className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
      <h2 className="font-display text-[clamp(1.4rem,1.15rem+0.8vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.015em]">{block.heading}</h2>
      <div className="flex max-w-[68ch] flex-col gap-5 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-[1.7] text-ink-soft">
        {block.body.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
        {block.list && (
          <ul className="flex flex-col gap-3">
            {block.list.map((t, i) => (
              <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-[2px] before:w-3 before:bg-accent">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getNextProject(slug);

  return (
    <>
      <SiteHeader />
      <main id="main" className="page-in w-full px-page">
        <article className="mx-auto flex w-full max-w-[1240px] flex-col gap-16 pb-10 pt-10 md:gap-24 md:pt-16">
          <header className="settle flex flex-col gap-8">
            <Link href="/#work" className="label-mono inline-flex min-h-6 items-center self-start text-muted underline-offset-4 hover:text-ink hover:underline">
              ← All work
            </Link>
            <div className="flex flex-col gap-5">
              <span className="label-mono self-start rounded-full bg-accent-soft px-3 py-1 text-accent">
                {p.tag === "Concept" ? p.meta.type : "Case study"}
              </span>
              <h1 className="font-display text-[clamp(2.6rem,1.4rem+5vw,6rem)] font-medium leading-[0.98] tracking-[0.01em]">
                {p.name}
              </h1>
              <p className="max-w-[40ch] text-[clamp(1.2rem,1rem+0.8vw,1.75rem)] leading-[1.35] text-muted">{p.tagline}</p>
            </div>
            <MetaStrip p={p} />
            {p.links && (
              <div className="flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-background hover:bg-accent focus-visible:bg-accent transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </header>

          {/* The card thumbnail morphs into this hero when arriving from the work grid. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,#f1f0ed,#e6e4df)] sm:aspect-[16/10]">
            <ViewTransition name={`thumb-${p.slug}`} share="morph" default="none">
              <div className="absolute inset-y-0 left-1/2 aspect-[4/5] h-full -translate-x-1/2">
                <Image src={`/work/${p.slug}/tile.webp`} alt={`Device mockup showing screens from the ${p.name} project`} fill preload sizes="(min-width: 640px) 60vw, 100vw" className="object-cover" />
                <LoopVideo base={`/work/${p.slug}`} />
              </div>
            </ViewTransition>
          </div>

          <p data-reveal className="max-w-[34ch] font-editorial text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] font-normal italic leading-[1.3]">
            {p.intro}
          </p>

          {p.blocks.map((b, i) => (
            <BlockView key={i} block={b} tint={p.tint} />
          ))}

          <Link
            href={`/work/${next.slug}`}
            className="group mt-6 grid grid-cols-1 items-center gap-6 border-t border-line pt-8 md:grid-cols-[220px_1fr]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#e9e7e2]">
              <Image
                src={`/work/${next.slug}/tile.webp`}
                alt=""
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="label-mono text-muted">Next project</span>
              <span className="font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.4rem)] font-medium leading-[1.1] tracking-[0.01em] group-hover:underline group-hover:underline-offset-4">
                {next.name} →
              </span>
              <span className="text-[16px] text-muted">{next.tagline}</span>
            </div>
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
