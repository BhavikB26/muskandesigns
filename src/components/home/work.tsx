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
  slug, href, title, tagline, tag, label, index, viewName, locked = false,
}: { slug: string; href: string; title: string; tagline: string; tag: string; label: string; index: number; viewName?: string; locked?: boolean }) {
  const art = <TileArt slug={slug} index={index} />;
  const external = href.startsWith("#");
  const LinkEl = external ? "a" : Link;
  return (
    <li data-reveal className="group relative">
      <div className="reveal-media relative aspect-square overflow-hidden rounded-fr-lg bg-[#2a2733]">
        {viewName ? (
          <ViewTransition name={viewName} share="morph" default="none">
            {art}
          </ViewTransition>
        ) : (
          art
        )}
        <span className="label-mono absolute right-fr-sm top-fr-sm z-20 rounded-fr-sm bg-black/55 px-fr-xs py-fr-xxs text-white backdrop-blur-sm">{tag}</span>
        {/* Hover/focus veil (decorative). Locked work (shown in interviews only) stays blurred behind a lock. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-10 bg-[rgba(14,12,24,0.55)] backdrop-blur-[6px] transition-opacity duration-500 ease-[var(--ease-out-expo)] hidden opacity-0 group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100 can-hover:block`}
        />
        {locked && (
          <span aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] can-hover:flex can-hover:group-hover:-translate-y-6 can-hover:group-hover:opacity-100 can-hover:group-has-[a:focus-visible]:-translate-y-6 can-hover:group-has-[a:focus-visible]:opacity-100">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
              <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15.6" r="1.3" fill="currentColor" stroke="none" />
              </svg>
            </span>
          </span>
        )}
      </div>
      <div
        className={`relative mt-fr-sm flex flex-col gap-fr-xs can-hover:absolute can-hover:inset-x-0 can-hover:bottom-0 can-hover:z-20 can-hover:mt-0 can-hover:translate-y-2 can-hover:p-fr-lg can-hover:opacity-0 can-hover:transition-[opacity,transform] can-hover:duration-500 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-has-[a:focus-visible]:translate-y-0 can-hover:group-has-[a:focus-visible]:opacity-100`}
      >
        <h3 className={`t-display-md text-ink can-hover:text-white`}>
          <LinkEl href={href} className="outline-none after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:after:rounded-fr-lg focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--color-accent)]">
            <span className="sr-only">{String(index + 1).padStart(2, "0")}. </span>
            {title}
          </LinkEl>
        </h3>
        <p className={`t-body max-w-[40ch] text-ink can-hover:text-white`}>{tagline}</p>
        <p className={`label-mono text-muted can-hover:text-white/85`}>
          {label} <span aria-hidden>↘</span>
        </p>
      </div>
    </li>
  );
}

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-fr-xxl">
        <div data-reveal className="flex flex-col gap-fr-sm">
          <p className="label-mono text-muted">Work</p>
          <h2 id="work-heading" className="t-display-xl">
            <MaskedText text="Selected" onReveal />{" "}
            <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.03em] text-ink">
              <MaskedText text="work" start={1} onReveal />
            </em>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-x-fr-sm gap-y-fr-xl sm:grid-cols-2 lg:grid-cols-3 can-hover:gap-y-fr-sm">
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
                  locked
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
