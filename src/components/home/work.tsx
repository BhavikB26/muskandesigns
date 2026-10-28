import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { WORK_TILES, type WorkTile } from "@/content/work";
import { MaskedText } from "@/components/masked-text";
import type { CSSProperties } from "react";
import { Cover } from "@/components/home/cover";

/*
 * Thumbnails after ramp.design: a tile with a 40px superellipse corner and a hairline edge on the case study's
 * gem gradient, its 3D scene centred with space around it, and only a small frosted pill (dot + name) in the corner.
 * An even grid: every tile the same size, three to a row (two on the home page, which shows four).
 */

type Row = number[];
/** Column ratios per row; one number = a full-width row. Repeats if there are more tiles. */
const WORK_ROWS: Row[] = [[1, 1, 1]];
/** The four on the home page: two rows of two equal tiles. */
export const HOME_ROWS: Row[] = [[1, 1]];

function CaseCell({ tile, index }: { tile: WorkTile; index: number }) {
  return (
    <li className="min-w-0">
      <Link
        href={tile.href}
        className="cv-card group block rounded-[28px] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        aria-label={`${String(index + 1).padStart(2, "0")}. ${tile.name}: ${tile.headline}`}
      >
        <div className="work-cell relative aspect-square overflow-clip [container-type:size]">
          <Cover slug={tile.slug} />
        </div>
        <div className="cv-caption">
          <span className="t-caption text-muted">{tile.label}</span>
          <span className="text-[length:var(--fs-h4)] font-medium leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">{tile.name}</span>
          <span className="cv-caption__desc t-body-sm text-ink-soft">{tile.headline}</span>
        </div>
      </Link>
    </li>
  );
}

function rowsFor(tiles: WorkTile[], pattern: Row[]) {
  const rows: { cols: Row; tiles: WorkTile[] }[] = [];
  let i = 0;
  for (let r = 0; i < tiles.length; r++) {
    const cols = pattern[r % pattern.length].slice(0, tiles.length - i);
    rows.push({ cols, tiles: tiles.slice(i, i + cols.length) });
    i += cols.length;
  }
  return rows;
}

export function Work({
  tiles,
  heading = "Case",
  emphasis = "studies",
  sub = "Short reads: the problem, the tradeoffs, and what changed.",
  viewAll = false,
  headingLevel = "h2",
  rows = WORK_ROWS,
}: {
  tiles: WorkTile[];
  heading?: string;
  emphasis?: string;
  sub?: string;
  /** Show a "View all case studies" button under the grid. */
  viewAll?: boolean;
  headingLevel?: "h1" | "h2";
  rows?: Row[];
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
          <p className="t-body-lg text-ink-soft">{sub}</p>
        </div>

        <ul className="flex flex-col gap-6">
          {rowsFor(tiles, rows).map(({ cols, tiles: rowTiles }, r) => (
            <li key={r} className={`work-row work-row--cards ${cols.length === 1 ? "work-row--solo" : cols.length === 3 ? "work-row--three" : ""}`} style={{ "--cols": cols.map((c) => `${c}fr`).join(" ") } as CSSProperties}>
              <ul className="contents">
                {rowTiles.map((t) => (
                  <CaseCell key={t.slug} tile={t} index={tiles.indexOf(t)} />
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {viewAll && (
          <div data-reveal className="flex justify-center">
            {/* In the liquid nav's material: a glass pill holding a drop of water (static, CSS only). */}
            <Link href="/work" className="liquid-cta">
              <span aria-hidden className="liquid-cta__drop" />
              <LayoutGrid aria-hidden className="relative size-[18px]" strokeWidth={1.8} />
              <span className="relative">View all case studies</span>
              <ArrowRight aria-hidden className="liquid-cta__arrow relative size-4" strokeWidth={2} />
              <span className="sr-only"> ({WORK_TILES.length})</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

