import type { ReactNode } from "react";

/*
 * Thumbnail backgrounds: one quiet motif per case study, drawn from what the project is about, on the same
 * soft gem-tinted base so the grid reads as one set. Vector (crisp at any size), low contrast so the piece in
 * front leads, and slow movement that only runs while the tile plays (see "Backdrops" in globals.css).
 * Coordinates are in a 400 × 300 box (the 4:3 tile), scaled to cover wider cells.
 */

const STAR = "M0 -6 L1.8 -1.8 L6 0 L1.8 1.8 L0 6 L-1.8 1.8 L-6 0 L-1.8 -1.8 Z";
const PIN = "M0 0 C-4 -5 -6 -8 -6 -11 A6 6 0 1 1 6 -11 C6 -8 4 -5 0 0 Z";

/** Deterministic scatter so server and client agree. */
function scatter(n: number, seed: number) {
  let a = seed;
  const r = () => ((a = (a * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => [Math.round(20 + r() * 360), Math.round(18 + r() * 264), r()] as const);
}

const MOTIFS: Record<string, () => ReactNode> = {
  // Payroll and growth: a ledger with bars rising toward the right.
  gusto: () => (
    <g>
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1="0" x2="400" y1={60 + i * 34} y2={60 + i * 34} className="bd-line" />
      ))}
      {Array.from({ length: 16 }, (_, i) => {
        const h = 26 + i * 9 + (i % 3) * 8;
        return <rect key={i} x={14 + i * 24.4} y={300 - h} width="12" height={h} rx="4" className="bd-fill bd-rise" style={{ animationDelay: `${-i * 0.35}s` }} />;
      })}
    </g>
  ),
  // Email "noise" settling into signal: drifting waves.
  "zero-noise": () => (
    <g>
      {[60, 105, 150, 195, 240].map((y, i) => (
        <path key={y} d={`M-100 ${y} q25 ${-14 + i * 2} 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0`} className="bd-stroke bd-wave" style={{ animationDelay: `${-i * 1.3}s`, opacity: 0.5 + i * 0.1 }} />
      ))}
    </g>
  ),
  // A mentor beside code: skeleton code lines scrolling up.
  "ai-mentor": () => {
    const rows = Array.from({ length: 22 }, (_, i) => [((i * 7) % 4) * 14, 60 + ((i * 37) % 120)] as const);
    const block = (dy: number) =>
      rows.map(([indent, w], i) => <rect key={`${dy}-${i}`} x={24 + indent} y={dy + 12 + i * 14} width={w} height="5" rx="2.5" className="bd-fill bd-fill--soft" />);
    return (
      <g>
        <g className="bd-scroll">
          {block(0)}
          {block(308)}
        </g>
        <g className="bd-scroll" transform="translate(220 0)" style={{ animationDelay: "-9s" }}>
          {block(0)}
          {block(308)}
        </g>
      </g>
    );
  },
  // Ratings: a field of stars that twinkle.
  "ratings-reviews": () => (
    <g>
      {scatter(26, 11).map(([x, y, k], i) => (
        <path key={i} d={STAR} transform={`translate(${x} ${y}) scale(${0.7 + k})`} className="bd-fill bd-twinkle" style={{ animationDelay: `${-k * 5}s` }} />
      ))}
    </g>
  ),
  // A learning path: a winding route with milestones, a dash travelling along it.
  "builder-university": () => {
    const d = "M-10 286 C 60 286, 90 250, 150 262 S 250 288, 300 256 S 370 214, 410 206";
    return (
      <g>
        <path d={d} className="bd-stroke bd-path" />
        <path d={d} className="bd-stroke bd-path-run" pathLength={100} />
        {[
          [70, 278],
          [150, 262],
          [228, 278],
          [300, 256],
          [372, 222],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="6" className="bd-dot" />
        ))}
      </g>
    );
  },
  // Applications across the city: pins with a pulse.
  internshala: () => (
    <g>
      {scatter(9, 23).map(([x, y, k], i) => (
        <g key={i} transform={`translate(${x} ${y + 12}) scale(${0.9 + k * 0.5})`}>
          <circle r="9" className="bd-ring" style={{ animationDelay: `${-k * 3}s` }} />
          <path d={PIN} className="bd-fill" />
        </g>
      ))}
    </g>
  ),
  // An 8-point grid with tokens lighting up.
  "builder-design-system": () => (
    <g>
      {Array.from({ length: 21 }, (_, i) => (
        <line key={`v${i}`} x1={i * 20} x2={i * 20} y1="0" y2="300" className="bd-line" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`h${i}`} x1="0" x2="400" y1={i * 20} y2={i * 20} className="bd-line" />
      ))}
      {scatter(14, 5).map(([x, y, k], i) => (
        <rect key={i} x={Math.floor(x / 20) * 20 + 1} y={Math.floor(y / 20) * 20 + 1} width="18" height="18" rx="3" className="bd-fill bd-blink" style={{ animationDelay: `${-k * 6}s` }} />
      ))}
    </g>
  ),
  // Projects organised: kanban columns with cards blinking in.
  basecamp: () => (
    <g>
      {[30, 130, 230, 330].map((x, c) => (
        <g key={x}>
          <rect x={x - 5} y="20" width="50" height="260" rx="8" className="bd-col" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={x} y={40 + r * 70 + (c % 2) * 30} width="40" height="52" rx="6" className="bd-fill bd-blink" style={{ animationDelay: `${-(c * 3 + r) * 1.4}s` }} />
          ))}
        </g>
      ))}
    </g>
  ),
  // Natasha listening: voice bars rising and falling across the tile.
  natasha: () => (
    <g>
      {Array.from({ length: 24 }, (_, i) => {
        const h = 30 + ((i * 47) % 110);
        return <rect key={i} x={10 + i * 16} y={150 - h / 2} width="8" height={h} rx="4" className="bd-fill bd-rise" style={{ animationDelay: `${-i * 0.35}s`, transformOrigin: "center" }} />;
      })}
    </g>
  ),
};

export function Backdrop({ slug }: { slug: string }) {
  const motif = MOTIFS[slug];
  return (
    <div aria-hidden className="bd">
      {motif && (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="bd__svg">
          {motif()}
        </svg>
      )}
    </div>
  );
}
