import Link from "next/link";
import { WORK_TILES, type WorkTile } from "@/content/work";
import { MaskedText } from "@/components/masked-text";
import { FeatureArt } from "@/components/home/feature-art";

/**
 * A case study card (after idoshitty.art): a gem-tone thumbnail with real screens, then a small label,
 * a one-line outcome headline and one supporting line. The whole card is the link.
 */
function CaseCard({ tile, index }: { tile: WorkTile; index: number }) {
  return (
    <li data-reveal className="group relative flex flex-col gap-fr-md rounded-fr-xl bg-surface-1 p-fr-sm ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-[var(--color-accent)] can-hover:hover:-translate-y-1 can-hover:hover:shadow-[0_24px_48px_-28px_rgba(20,16,40,0.35)]">
      <div className="reveal-media relative aspect-[4/3] overflow-hidden rounded-fr-lg">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] can-hover:group-hover:scale-[1.03]">
          <FeatureArt slug={tile.slug} />
        </div>
      </div>
      <div className="flex flex-col gap-fr-xs px-fr-xs pb-fr-sm">
        <p className="label-mono text-muted">{tile.label}</p>
        <h3 className="text-[clamp(1.15rem,1rem+0.5vw,1.45rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink">
          <Link href={tile.href} className="outline-none after:absolute after:inset-0 after:rounded-fr-xl">
            <span className="sr-only">{String(index + 1).padStart(2, "0")}. </span>
            {tile.headline}
          </Link>
        </h3>
        <p className="t-body line-clamp-1 text-muted">{tile.blurb}</p>
      </div>
    </li>
  );
}

export function Work({
  tiles,
  heading = "Case",
  emphasis = "studies",
  sub = "Short reads: the problem, the tradeoffs, and what changed.",
  viewAll = false,
  headingLevel = "h2",
}: {
  tiles: WorkTile[];
  heading?: string;
  emphasis?: string;
  sub?: string;
  /** Show a "View all case studies" button under the grid. */
  viewAll?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-fr-xxl">
        <div data-reveal className="flex flex-col gap-fr-sm">
          <Heading id="work-heading" className="t-display-xl">
            <MaskedText text={heading} onReveal />{" "}
            <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em] text-ink">
              <MaskedText text={emphasis} start={heading.split(" ").length} onReveal />
            </em>
          </Heading>
          <p className="t-body-lg text-muted">{sub}</p>
        </div>

        <ul className="grid grid-cols-1 gap-fr-lg md:grid-cols-2">
          {tiles.map((t, i) => (
            <CaseCard key={t.slug} tile={t} index={i} />
          ))}
        </ul>

        {viewAll && (
          <div data-reveal className="flex justify-center">
            <Link href="/work" className="btn btn-primary">
              View all case studies<span className="sr-only"> ({WORK_TILES.length})</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
