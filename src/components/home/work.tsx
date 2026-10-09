import Link from "next/link";
import { ViewTransition } from "react";
import { WORK_ORDER, type Project } from "@/content/projects";
import { MaskedText } from "@/components/masked-text";
import { TileArt } from "@/components/home/tile-art";

function year(p: Project) {
  const m = p.meta.timeline?.match(/(20\d\d)(?!.*20\d\d)/);
  return m ? m[1] : undefined;
}


/**
 * A mosaic tile: full-bleed project art with a tiny tag. On hover-capable screens the title and tagline
 * fade in over a softened overlay (also on keyboard focus); on touch screens they sit below the tile.
 */
function MosaicTile({
  slug, href, title, tagline, tag, label, index, viewName,
}: { slug: string; href: string; title: string; tagline: string; tag: string; label: string; index: number; viewName?: string }) {
  const art = <TileArt slug={slug} index={index} />;
  const external = href.startsWith("#");
  const LinkEl = external ? "a" : Link;
  return (
    <li data-reveal className="group relative">
      <div className="reveal-media relative aspect-square overflow-hidden rounded-[6px] bg-[#2a2733]">
        {viewName ? (
          <ViewTransition name={viewName} share="morph" default="none">
            {art}
          </ViewTransition>
        ) : (
          art
        )}
        <span className="label-mono absolute right-3 top-3 z-20 rounded-full bg-black/55 px-2.5 py-1 text-[10px] text-white backdrop-blur-sm">{tag}</span>
        {/* Hover/focus veil (decorative). */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-10 hidden bg-[rgba(14,12,24,0.55)] opacity-0 backdrop-blur-[6px] transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100 can-hover:block`}
        />
      </div>
      <div
        className={`relative mt-3 flex flex-col gap-1.5 can-hover:absolute can-hover:inset-x-0 can-hover:bottom-0 can-hover:z-20 can-hover:mt-0 can-hover:translate-y-2 can-hover:p-5 can-hover:opacity-0 can-hover:transition-[opacity,transform] can-hover:duration-500 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-has-[a:focus-visible]:translate-y-0 can-hover:group-has-[a:focus-visible]:opacity-100`}
      >
        <h3 className={`font-display text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] font-medium leading-[1.15] tracking-[0.01em] text-ink can-hover:text-white`}>
          <LinkEl href={href} className="outline-none after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:after:rounded-[6px] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--color-accent)]">
            <span className="sr-only">{String(index + 1).padStart(2, "0")}. </span>
            {title}
          </LinkEl>
        </h3>
        <p className={`max-w-[40ch] text-[14px] leading-[1.5] text-ink-soft can-hover:text-white/90`}>{tagline}</p>
        <p className={`label-mono text-[11px] text-muted can-hover:text-white/80`}>
          {label} <span aria-hidden>↘</span>
        </p>
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

        <ul className="grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 can-hover:gap-y-3">
          {WORK_ORDER.map((slug, i) => {
            if (slug === "gusto")
              return (
                // Gusto has no case study page: Muskan offers a walkthrough instead.
                <MosaicTile
                  key="gusto"
                  slug="gusto"
                  href="#contact"
                  title="Growth experiments on Gusto’s signup flow"
                  tagline="Happy to walk through it in an interview."
                  tag="Gusto"
                  label="Walkthrough on request"
                  index={i}
                />
              );
            const p = projects.find((x) => x.slug === slug);
            if (!p) return null;
            return (
              <MosaicTile
                key={p.slug}
                slug={p.slug}
                href={`/work/${p.slug}`}
                title={p.name}
                tagline={p.tagline}
                tag={p.meta.company.split(" (")[0]}
                label={[p.tag === "Concept" ? p.meta.type : "Case study", year(p)].filter(Boolean).join(" · ")}
                index={i}
                viewName={`thumb-${p.slug}`}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
