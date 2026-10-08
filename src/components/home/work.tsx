import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { MaskedText } from "@/components/masked-text";

function year(p: Project) {
  const m = p.meta.timeline?.match(/(20\d\d)(?!.*20\d\d)/);
  return m ? m[1] : undefined;
}

/** Tall 4:5 media: Muskan's real screens in a device scene on a brand-coloured backdrop, plus a small project tag. */
function Media({ slug, tag, preload, viewName }: { slug: string; tag: string; preload?: boolean; viewName?: string }) {
  const inner = (
    <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.03] group-has-[a:focus-visible]:scale-[1.03]">
      <Image src={`/work/${slug}/cover-tile.webp`} alt="" fill preload={preload} sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" />
    </div>
  );
  return (
    <div className="reveal-media relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#2a2733]">
      <span className="label-mono absolute right-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm">{tag}</span>
      {viewName ? (
        <ViewTransition name={viewName} share="morph" default="none">
          {inner}
        </ViewTransition>
      ) : (
        inner
      )}
    </div>
  );
}

const linkCover =
  "outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--color-accent)] focus-visible:after:rounded-[8px]";

function Arrow() {
  return (
    <span aria-hidden className="ml-2 inline-block text-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
      →
    </span>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
      {items.map((t) => (
        <li key={t} className="label-mono text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Tile({ p, i }: { p: Project; i: number }) {
  const tags = [p.tag === "Concept" ? p.meta.type : "Case study", p.meta.company.split(" (")[0], year(p)].filter((t): t is string => !!t);
  return (
    <li data-reveal className="group relative flex flex-col gap-5">
      <Media slug={p.slug} tag={p.meta.company.split(" (")[0]} preload={i < 2} viewName={`thumb-${p.slug}`} />
      <div className="flex flex-col gap-2">
        <p className="font-display text-[15px] font-medium tracking-[0.02em] text-accent">#{String(i + 1).padStart(2, "0")}</p>
        <h3 className="font-display text-[clamp(1.5rem,1.2rem+0.9vw,2.1rem)] font-medium leading-[1.1] tracking-[0.01em] text-ink">
          <Link href={`/work/${p.slug}`} className={linkCover}>
            {p.name}
          </Link>
          <Arrow />
        </h3>
        <p className="max-w-[46ch] text-[16px] leading-[1.55] text-ink-soft">{p.tagline}</p>
        <Tags items={tags} />
      </div>
    </li>
  );
}

/* Gusto: no case study page; Muskan offers a walkthrough. Recreated wireframes only, no Gusto assets or text. */
function GustoTile({ index }: { index: number }) {
  return (
    <li data-reveal className="group relative flex flex-col gap-5">
      <Media slug="gusto" tag="Gusto" />
      <div className="flex flex-col gap-2">
        <p className="font-display text-[15px] font-medium tracking-[0.02em] text-accent">#{String(index).padStart(2, "0")}</p>
        <h3 className="font-display text-[clamp(1.5rem,1.2rem+0.9vw,2.1rem)] font-medium leading-[1.1] tracking-[0.01em] text-ink">
          <a href="#contact" className={linkCover}>
            Growth experiments on Gusto&rsquo;s signup flow
          </a>
          <Arrow />
        </h3>
        <p className="max-w-[46ch] text-[16px] leading-[1.55] text-ink-soft">Happy to walk through it in an interview.</p>
        <Tags items={["Walkthrough on request", "Gusto", "Recreated wireframes"]} />
      </div>
    </li>
  );
}

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page pt-24 md:pt-36">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-12 md:gap-16">
        <div data-reveal className="flex flex-col gap-3">
          <p className="label-mono text-muted">(01) Work</p>
          <h2 id="work-heading" className="font-display text-[clamp(2.4rem,1.4rem+3.4vw,5rem)] font-medium leading-[1] tracking-[0.01em]">
            <MaskedText text="Selected" onReveal />{" "}
            <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent">
              <MaskedText text="work" start={1} onReveal />
            </em>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {projects.map((p, i) => (
            <Tile key={p.slug} p={p} i={i} />
          ))}
          <GustoTile index={projects.length + 1} />
        </ul>
      </div>
    </section>
  );
}
