@AGENTS.md

# Portfolio v3 project notes

Third version of the portfolio. New structure/design vs. v2 (see
`../portfolio-v2` for reference), but keeping one behavior from v2:
**project cards link out to their Figma prototype links**, same as
`../portfolio-v2/src/components/project-card.tsx`.

Source of truth for the design is Figma — read the current selection via
`get_metadata` (no nodeId) + `get_design_context`, then build each frame
as its own component in `src/components/` and wire it into
`src/app/page.tsx`.

## Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Images via `next/image`; SVG/PNG assets exported from Figma should live
  under `public/` (e.g. `public/icons`, `public/logos`)
- `next.config.ts` has `dangerouslyAllowSVG: true` (needed for exported
  logo/icon SVGs served through `next/image`)

## Gotchas carried over from v2

- Figma-exported assets sometimes come back with the wrong file
  extension (actual format is SVG/PNG but named `.png`/`.jpg`) — check
  with `file` before wiring them up, next/image is strict about this.
- Tailwind's `aspect-square` utility didn't generate CSS in v2's
  Turbopack/Tailwind v4 setup — if it happens again, fall back to
  inline `style={{ aspectRatio: "1 / 1" }}`.

## Fonts

- **Urbanist** (`next/font/google`, var `--font-urbanist` → Tailwind
  `font-urbanist`) — body font, used everywhere except the "PORT/FOLIO"
  wordmark
- **Red Hat Display** Black 900 (var `--font-red-hat-display` → Tailwind
  `font-red-hat`) — the "PORT/FOLIO" hero wordmark only
- **Product Sans Medium** — used in Figma for the "view more" pill button
  text, but it's a Google-internal font not on Google Fonts. Currently
  falling back to Urbanist semibold (inherited from `body`). **TODO:
  still unresolved** — if the user provides real font files, wire up via
  `next/font/local`.

## Colors

- `--color-ink` `#111111` — primary text/headings
- `--color-accent` `#ff6a00` — orange, used only for the "a" in "muskan."
- `--color-muted` `#7f7f7f` — secondary text (curated work heading, card
  descriptions, hero subtext)
- `--color-pill` `#171717` — "view more" button background

## Sections built (in `src/app/page.tsx`)

1. **Nav** (`src/components/nav.tsx`) — "muskan." wordmark + work/about/resume
   links. `about` → `/about` and `resume` → `/resume.pdf` are placeholder
   routes, not yet built.
2. **Hero** (`src/components/hero.tsx`) — "muskan's PORT/FOLIO product
   designer" wordmark with a leaf image accent (`public/hero/leaf.png`) and
   a one-line bio.
3. **Curated work** (`src/components/curated-work.tsx` +
   `project-card.tsx`) — 2 project cards (Builder University, Pragyaam) +
   "view more" pill CTA (currently links to `#work`, not a real page).
   - `ProjectCard` wraps the whole card in an `<a>` to the project's Figma
     **prototype** link — same pattern as v2's `case-study.tsx`. The two
     `href`s in `curated-work.tsx` are still **placeholder TODOs**
     (`#todo-builder-university-prototype-link`,
     `#todo-pragyaam-prototype-link`) — swap in the real
     `figma.com/proto/...` URLs once the user has them.
   - Each card image has a `crop` prop (`top`/`left`/`width` as CSS
     percentages) copied directly from the Figma-generated reference
     code's absolute-positioning offsets. These images are wide marketing
     screenshots with text baked in — a naive `object-cover` crop cuts off
     that text, so the exact Figma crop values are load-bearing. If new
     project images are added, get the crop numbers from
     `get_design_context`'s output rather than guessing.
4. **Footer** (`src/components/footer.tsx` + `copy-email-button.tsx`) —
   magnifying-glass image, CTA line, email (with a client-side copy
   button) and LinkedIn link.

Not yet built: an "about" page/section (nav links to it but it doesn't
exist), a "view more" destination for the full project list, and a
resume file at `public/resume.pdf`.
