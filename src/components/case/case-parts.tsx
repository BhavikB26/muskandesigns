import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Img, Project } from "@/content/projects";
import type { DeckItem, DeckSlide } from "@/content/decks/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { MotionToggle } from "@/components/motion";
import { LaptopScroll, PhoneScroll } from "./laptop-scroll";
import { LaptopFlow } from "./laptop-flow";
import { SocialLinks } from "@/components/social-links";

/*
 * Editorial case study building blocks.
 * Layout: a narrow left rail (identity, nav, project facts) beside a wide content column
 * of colour panels with short text between them. Phones get a single stacked column.
 */

export const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Contact", href: "#contact" },
];

function NavList({ className = "" }: { className?: string }) {
  return (
    <ul className={className}>
      {navLinks.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="case-link t-body-sm inline-flex min-h-8 items-center text-ink"
          >
            {l.label}
            {l.external && <span className="sr-only"> (PDF, opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Section A: identity + navigation. Desktop: part of the sticky side rail. Phone: one compact row. */
export function Identity() {
  return (
    <div className="flex flex-col gap-fr-md">
      <Link href="/" className="case-link t-body-sm inline-flex min-h-8 items-center gap-fr-xs self-start text-ink">
        <span aria-hidden className="flex size-7 items-center justify-center rounded-[2px] bg-ink pb-[2px] text-[16px] leading-none text-background">
          m
        </span>
        Muskan Bhatia
      </Link>
      <nav aria-label="Main">
        <NavList className="flex flex-wrap gap-x-fr-lg md:flex-col md:gap-x-0" />
      </nav>
    </div>
  );
}

export function Toggles() {
  return (
    <div className="flex items-center gap-fr-xs">
      <MotionToggle />
      <ThemeToggle />
    </div>
  );
}

/** Project facts, only those that are known. */
export function Facts({ p }: { p: Project }) {
  const items: [string, string | undefined][] = [
    ["Company", p.meta.company],
    ["My role", p.meta.role],
    ["Type", p.meta.type],
    ["Timeline", p.meta.timeline],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-fr-lg gap-y-fr-lg md:grid-cols-1">
      {items
        .filter((i): i is [string, string] => Boolean(i[1]))
        .map(([k, v]) => (
          <div key={k} className="flex flex-col gap-fr-xxs">
            <dt className="case-meta-label">{k}</dt>
            <dd className="t-body-sm text-ink">{v}</dd>
          </div>
        ))}
    </dl>
  );
}

/** Section B: category, title, descriptor and a short summary. */
export function CaseIntro({ p }: { p: Project }) {
  const category = p.tag === "Concept" ? p.meta.type : "Case study";
  return (
    <div className="grid grid-cols-1 gap-fr-xl lg:grid-cols-12 lg:gap-x-fr-xxl">
      <div className="flex flex-col gap-fr-md lg:col-span-7">
        <p className="case-meta-label">{category}</p>
        <h1 className="case-title">{p.name}</h1>
        <p className="t-subhead font-serif italic text-ink">{p.tagline}</p>
      </div>
      <p className="case-body max-w-[52ch] self-end lg:col-span-5">{p.intro}</p>
    </div>
  );
}


/* ---------- Section D: colour panels with art-directed compositions ---------- */

const isPhone = (i: Img) => i.height / i.width > 1.6;
const isTall = (i: Img) => i.height / i.width > 1.15;

function Shot({ img, sizes, className = "" }: { img: Img; sizes: string; className?: string }) {
  return (
    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} className={`h-auto w-full rounded-fr-lg ${className}`} />
  );
}

/**
 * Lays out one group of screens on the page background at a medium size, so screenshots read as
 * artefacts with whitespace around them. True aspect ratios; tall screens stay narrow.
 */
function Composition({ images }: { images: Img[] }) {
  if (images.every(isPhone)) {
    return (
      <div className="flex flex-wrap justify-start gap-x-[4%] gap-y-8">
        {images.map((img, i) => (
          <div key={img.src} className={`w-[42%] max-w-[200px] sm:w-[28%] md:w-[17%] ${i % 2 ? "md:mt-12" : ""}`}>
            <Shot img={img} sizes="(min-width: 768px) 200px, 42vw" />
          </div>
        ))}
      </div>
    );
  }
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className={isTall(img) ? "w-[62%] max-w-[300px]" : "w-full md:w-[62%]"}>
        <Shot img={img} sizes="(min-width: 768px) 40vw, 92vw" />
      </div>
    );
  }
  // Two columns of medium pieces; the second column sits lower for an editorial stagger.
  return (
    <div className="grid grid-cols-1 items-start gap-x-[5%] gap-y-10 sm:grid-cols-2">
      {images.map((img, i) => (
        <div key={img.src} className={`${i % 2 ? "sm:mt-16" : ""} ${isTall(img) ? "w-[70%] max-w-[300px]" : "w-full max-w-[520px]"}`}>
          <Shot img={img} sizes="(min-width: 640px) 34vw, 92vw" />
        </div>
      ))}
    </div>
  );
}

/** One idea per group: screens on the page background with captions underneath. */
export function Panel({ images }: { images: Img[] }) {
  const captions = images.filter((i) => i.caption);
  return (
    <figure data-reveal className="flex flex-col gap-fr-lg">
      <Composition images={images} />
      {captions.length > 0 && (
        <figcaption className="case-caption flex flex-col gap-1">
          {captions.map((c) => (
            <span key={c.src}>{c.caption}</span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Section E/F: text that sits between panels ---------- */

export function TextBlock({ block }: { block: Extract<Block, { kind: "text" }> }) {
  return (
    <section data-reveal data-section="" className="grid grid-cols-1 gap-fr-sm md:grid-cols-12 md:gap-x-fr-xxl">
      <h2 className="case-h2 md:col-span-4">{block.heading}</h2>
      <div className="flex flex-col gap-fr-md md:col-span-8">
        {block.body.map((t, i) => (
          <p key={i} className={`case-body `}>
            {t}
          </p>
        ))}
        {block.list && (
          <ul className="flex flex-col gap-3">
            {block.list.map((t, i) => (
              <li key={i} className="case-body grid grid-cols-[1.75rem_1fr]">
                <span aria-hidden className="font-mono text-[12px] leading-[2] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function Quote({ block }: { block: Extract<Block, { kind: "quote" }> }) {
  return (
    <figure data-reveal className="flex max-w-[46ch] flex-col gap-4 md:ml-[33.4%]">
      <blockquote className="t-display-md font-serif font-normal italic text-ink">&ldquo;{block.text}&rdquo;</blockquote>
      <figcaption className="case-caption">{block.by}</figcaption>
    </figure>
  );
}

/** Section H: closing notes (outcome, learnings, next steps) in two calm columns. */
export function Outcome({ blocks, concept }: { blocks: Extract<Block, { kind: "text" }>[]; concept: boolean }) {
  if (!blocks.length && !concept) return null;
  return (
    <section data-reveal aria-labelledby="outcome-heading" className="flex flex-col gap-fr-xxl border-t border-line pt-fr-xxl">
      <h2 id="outcome-heading" className="case-meta-label">
        Where it ended up
      </h2>
      {concept && (
        <p className="case-body">
          This is a self-initiated concept, not a shipped product. The designs show how I would approach the problem.
        </p>
      )}
      <div className="grid grid-cols-1 gap-fr-xxl md:grid-cols-2 md:gap-x-fr-section">
        {blocks.map((b) => (
          <div key={b.heading} className="flex flex-col gap-fr-sm">
            <h3 className="case-h2">{b.heading}</h3>
            {b.body.map((t, i) => (
              <p key={i} className="case-body">
                {t}
              </p>
            ))}
            {b.list && (
              <ul className="flex flex-col gap-2.5">
                {b.list.map((t, i) => (
                  <li key={i} className="case-body grid grid-cols-[1.75rem_1fr]">
                    <span aria-hidden className="font-mono text-[12px] leading-[2] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Section J: next project and the closing links. */
export function CaseFooter({ next, nextArt }: { next: Project; nextArt: ReactNode }) {
  const links = [
    { label: "All work", href: "/#work" },
    { label: "About", href: "/#about" },
  ];
  return (
    <footer id="contact" className="flex scroll-mt-10 flex-col gap-fr-section border-t border-line pb-fr-xxl pt-fr-xxl">
      <Link href={`/work/${next.slug}`} className="group grid grid-cols-1 items-end gap-fr-lg sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-fr-xxl">
        <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-fr-lg">{nextArt}</div>
        <div className="flex flex-col gap-2">
          <span className="case-meta-label">Next project</span>
          <span className="t-display-lg text-ink">
            {next.name} <span aria-hidden className="case-arrow">→</span>
          </span>
          <span className="case-body text-muted">{next.tagline}</span>
        </div>
      </Link>
      <div className="flex flex-col gap-fr-lg md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-fr-xs">
          <p className="case-meta-label">Contact</p>
          <p className="case-body">I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.</p>
        </div>
        <div className="flex flex-wrap items-center gap-fr-lg">
          <ul className="flex flex-wrap gap-x-fr-lg gap-y-fr-xxs">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="case-link t-body-sm inline-flex min-h-10 items-center text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <SocialLinks />
        </div>
      </div>
      <p className="case-meta-label">© {new Date().getFullYear()} Muskan Bhatia</p>
    </footer>
  );
}

/* ---------- Case studies rebuilt from Muskan's own decks ---------- */

function DeckText({ items }: { items: DeckItem[]; wide?: boolean }) {
  return (
    <div className="flex w-full flex-col gap-fr-md">
      {items.map((it, i) => {
        if (it.kind === "h")
          return (
            <h2 key={i} className="case-deck-h">
              {it.text}
            </h2>
          );
        if (it.kind === "reviews")
          return (
            <ul key={i} className="my-fr-xs columns-1 gap-fr-md sm:columns-2 lg:columns-3">
              {it.reviews.map((r) => (
                <li key={r.name} className="deck-review mb-fr-md break-inside-avoid">
                  <div className="flex items-center gap-fr-sm">
                    <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2 t-body-sm text-ink">
                      {r.name[0]}
                    </span>
                    <span className="t-body-sm text-ink">{r.name}</span>
                  </div>
                  <p className="mt-fr-sm flex items-center gap-fr-xs t-caption text-muted">
                    <span aria-hidden className="tracking-[0.12em] text-[#e2a400]">
                      {"★".repeat(r.rating)}
                      <span className="text-line-strong">{"★".repeat(5 - r.rating)}</span>
                    </span>
                    <span className="sr-only">{r.rating} out of 5 stars,</span>
                    {r.date}
                  </p>
                  <p className="mt-fr-xs t-body text-ink">{r.text}</p>
                </li>
              ))}
            </ul>
          );
        if (it.kind === "tags")
          return (
            <ul key={i} className="my-fr-xs flex flex-wrap gap-fr-xs">
              {it.tags.map((g) => (
                <li key={g.label} className={`deck-tag deck-tag-${g.tone}`}>
                  {g.label}
                </li>
              ))}
            </ul>
          );
        if (it.kind === "logos")
          return (
            <ul key={i} className="my-fr-xs flex flex-wrap items-center justify-center gap-fr-xl">
              {it.logos.map((l) => (
                <li key={l.src}>
                  <Image src={l.src} alt={l.alt} width={l.width} height={l.height} sizes="120px" className="size-[clamp(72px,14vw,120px)] rounded-[22%] object-cover" />
                </li>
              ))}
            </ul>
          );
        if (it.kind === "eyebrow")
          return (
            <p key={i} className="label-mono -mb-fr-xs text-muted">
              {it.text}
            </p>
          );
        if (it.kind === "facts")
          return (
            <dl key={i} className="grid grid-cols-2 gap-x-fr-xl gap-y-fr-lg border-y border-line py-fr-lg sm:grid-cols-4">
              {it.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-fr-xxs">
                  <dt className="case-meta-label">{f.label}</dt>
                  <dd className="t-body-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          );
        if (it.kind === "sub")
          return (
            <h3 key={i} className="case-deck-sub mt-fr-lg">
              {it.text}
            </h3>
          );
        if (it.kind === "list")
          return (
            <ul key={i} className="case-body flex list-disc flex-col gap-2 pl-5 marker:text-muted">
              {it.items.map((x, k) => (
                <li key={k}>{x}</li>
              ))}
            </ul>
          );
        if (it.kind === "pill")
          return (
            <p key={i} className="deck-pill my-2 self-start">
              {it.text}
              {it.sub && <span className="mt-1 block text-right text-[0.7em] font-normal">{it.sub}</span>}
            </p>
          );
        if (it.kind === "stickies")
          return (
            <ul key={i} className={`my-fr-xs grid gap-fr-md ${it.notes.length === 1 ? "max-w-[60ch]" : "grid-cols-[repeat(auto-fit,minmax(min(100%,max(200px,calc((100%_-_2rem)/3))),1fr))]"}`}>
              {it.notes.map((n, k) => (
                <li key={k} className={it.tone === "outline" ? "deck-box" : "deck-sticky"}>
                  {n.title && <strong className="mb-1 block font-semibold">{n.title}</strong>}
                  {n.text}
                </li>
              ))}
            </ul>
          );
        if (it.kind === "stats")
          return (
            <ul key={i} className="my-fr-xs grid grid-cols-1 gap-x-fr-xxl gap-y-fr-lg sm:grid-cols-2 lg:grid-cols-3">
              {it.stats.map((st, k) => (
                <li key={k} className="flex flex-col gap-fr-xxs">
                  <span className="deck-stat">{st.value}</span>
                  <span className="case-body">{st.label}</span>
                  {st.source && <span className="case-caption">{st.source}</span>}
                </li>
              ))}
            </ul>
          );
        if (it.kind === "quote")
          return (
            <figure key={i} className="deck-quote">
              <blockquote>“{it.text}”</blockquote>
              {it.cite && <figcaption className="case-caption mt-1">{it.cite}</figcaption>}
            </figure>
          );
        if (it.kind === "chips")
          return (
            <ul key={i} className="my-1 flex flex-wrap gap-2.5">
              {it.items.map((x, k) => (
                <li key={k} className={`deck-chip ${it.on === k ? "deck-chip-on" : ""}`}>
                  {x}
                </li>
              ))}
            </ul>
          );
        if (it.kind === "rows")
          return (
            <ul key={i} className="my-2 flex flex-col gap-2.5">
              {it.items.map((x, k) => (
                <li key={k} className="deck-row">
                  <span aria-hidden className="shrink-0">
                    {it.marker}
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          );
        return (
          // Short lines (one or two sentences) run on a single line where there is room; longer ones keep a reading measure.
          <p key={i} className={`${it.kind === "note" ? "case-caption" : "case-body"} `}>
            {it.text}
          </p>
        );
      })}
    </div>
  );
}

/** Sticky notes and rows need the full column; plain text keeps a reading measure. */
const isWide = (items: DeckItem[]) => items.some((i) => ["stickies", "rows", "stats", "reviews", "tags", "logos", "facts"].includes(i.kind));

function DeckImage({ img, alt }: { img: NonNullable<DeckSlide["img"]>; alt: string }) {
  if (img.frame === "laptop") return <LaptopScroll src={img.src} width={img.width} height={img.height} alt={alt} />;
  if (img.frame === "phone") return <PhoneScroll body={img} top={img.parts?.top} bottom={img.parts?.bottom} alt={alt} />;
  // Medium size: never taller than ~620px, never wider than the original crop.
  // Wide web pages and boards read at a fixed reading width; phone screens and tall crops cap at ~620px tall.
  // Single phone screens stay small (about 480px tall).
  const capH = img.width / img.height < 0.6 ? 480 : 620;
  const maxW = img.width >= 900 ? Math.min(img.width, 860) : Math.min(img.width, Math.round((capH * img.width) / img.height));
  const still = (
    <Image
      src={img.src}
      alt={alt}
      width={img.width}
      height={img.height}
      sizes={`(min-width: 768px) ${maxW}px, 92vw`}
      className={`h-auto w-full rounded-[4px] ${img.anim ? "anim-still" : ""}`}
      style={{ maxWidth: maxW }}
    />
  );
  if (!img.anim) return still;
  // The GIF plays; Pause motion and reduced-motion settings swap in the still frame.
  return (
    <div className="w-full" style={{ maxWidth: maxW }}>
      <Image src={img.anim} alt={alt} width={img.width} height={img.height} unoptimized className="anim-play h-auto w-full rounded-[4px]" />
      {still}
    </div>
  );
}

/** One slide from the original deck, keeping its text-beside-visual placement. */
export function DeckSlideView({ slide }: { slide: DeckSlide }) {
  // A slide that opens with a section heading starts a new section (more space and a hairline above).
  const opens = slide.items.find((i) => i.kind !== "eyebrow")?.kind === "h";
  const sec = opens ? { "data-section": "" } : {};
  const heading = slide.items.find((i) => i.kind === "h") as { text: string } | undefined;
  const { img, items, after } = slide;
  const alt = img?.alt ?? (heading ? `${heading.text}: visual from the case study` : "Visual from the case study");
  const below = after?.length ? <DeckText items={after} wide={isWide(after)} /> : null;
  if (slide.flow)
    return (
      <section data-reveal {...sec}>
        <LaptopFlow screens={slide.flow.map((f) => f.img)} panels={slide.flow.map((f, i) => <DeckText key={i} items={f.items} />)} labels={slide.flow.map((f) => f.label)} />
      </section>
    );
  if (!img)
    return (
      <section data-reveal {...sec}>
        <DeckText items={items} wide={isWide(items)} />
      </section>
    );
  if (!items.length)
    return (
      <figure data-reveal {...sec} className="flex flex-col items-center gap-8">
        <DeckImage img={img} alt={alt} />
        {below && <div className="w-full">{below}</div>}
      </figure>
    );
  if (slide.side === "right" || slide.side === "left")
    return (
      <section data-reveal {...sec} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-x-12">
          <div className={`md:col-span-5 ${slide.side === "left" ? "md:order-2" : ""}`}>
            <DeckText items={items} />
          </div>
          <div className={`flex justify-center md:col-span-7 ${slide.side === "left" ? "md:order-1" : ""}`}>
            <DeckImage img={img} alt={alt} />
          </div>
        </div>
        {below}
      </section>
    );
  return (
    <section data-reveal {...sec} className="flex flex-col gap-8">
      <DeckText items={items} wide={isWide(items)} />
      <div className="flex justify-center">
        <DeckImage img={img} alt={alt} />
      </div>
      {below}
    </section>
  );
}
