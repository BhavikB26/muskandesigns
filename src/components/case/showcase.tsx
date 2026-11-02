import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Annotated, Shot, Sticker, Visual } from "@/content/case-studies";
import { decks } from "@/content/decks";
import { DeckVisual } from "@/components/case/case-parts";
import { IosStatusIcons } from "@/components/ui/ios-status-icons";
import { BlockBento } from "@/components/case/block-bento";
import { WarpBackground } from "@/components/ui/warp-background";

/*
 * Case study visuals (after ngan-nguyen.com and dimpalgidwani.com): every visual sits in a large rounded panel
 * tinted with the project's gem colour. Screens are framed by what they are, and always shown whole:
 * phone screens in phones, web screens in a browser or laptop, research boards on a white card at their ratio.
 */

const SHADOW = "shadow-[0_28px_60px_-28px_rgba(15,10,35,0.55)]";
const ratio = (s: Shot) => s.h / s.w;

function Img({ s, sizes, className = "", fill = false }: { s: Shot; sizes: string; className?: string; fill?: boolean }) {
  return fill ? (
    <Image src={s.src} alt={s.alt} fill sizes={sizes} className={className} />
  ) : (
    <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes={sizes} className={`block h-auto w-full ${className}`} />
  );
}

/** A device's screen image, filling its screen from the top; a recorded clip plays when the shot has one. */
function ScreenImg({ s, sizes, className = "object-cover object-top" }: { s: Shot; sizes: string; className?: string }) {
  if (!s.clip) return <Img s={s} sizes={sizes} fill className={className} />;
  return (
    <>
      <Img s={s} sizes={sizes} fill className={`anim-still ${className}`} />
      <Image src={s.clip} alt={s.alt} fill unoptimized className={`anim-play ${className}`} />
    </>
  );
}

/** An iPhone-style frame (titanium band, black border, Dynamic Island); long screens show their top. */
function Phone({ s, sizes, status = false }: { s: Shot; sizes: string; status?: boolean }) {
  return (
    <div className="dv-phone">
      <div className="dv-phone__screen">
        {status ? (
          <>
            <div aria-hidden className="dv-phone__status">
              <span>9:41</span>
              <IosStatusIcons className="dv-phone__icons" />
            </div>
            <div className="dv-phone__page">
              <ScreenImg s={s} sizes={sizes} />
            </div>
          </>
        ) : (
          <ScreenImg s={s} sizes={sizes} />
        )}
      </div>
      <span aria-hidden className="dv-phone__island" />
    </div>
  );
}

/** A browser window; screens show whole, only pages taller than wide are shown from the top in a 4:5 viewport. */
function Browser({ s, sizes, scroll = false, delay = 0 }: { s: Shot; sizes: string; scroll?: boolean; delay?: number }) {
  return (
    <div className="dv-browser">
      <div aria-hidden className="dv-browser__bar">
        <span className="dv-browser__lights">
          <i />
          <i />
          <i />
        </span>
        <span className="dv-browser__url" />
      </div>
      {scroll && ratio(s) > 0.625 ? (
        <ScrollPage s={s} sizes={sizes} delay={delay} />
      ) : ratio(s) > 1.1 ? (
        <div className="relative aspect-[4/5]">
          <ScreenImg s={s} sizes={sizes} />
        </div>
      ) : (
        <Img s={s} sizes={sizes} />
      )}
    </div>
  );
}

/** The page scrolling itself in a 16:10 screen (CSS: .dv-scroll), when it is taller than the screen. */
function ScrollPage({ s, sizes, delay = 0, fill = false }: { s: Shot; sizes: string; delay?: number; fill?: boolean }) {
  return (
    <div className={`dv-scroll ${fill ? "dv-scroll--fill" : ""}`}>
      <div className="dv-scroll__page" style={{ "--r": ratio(s), animationDelay: `${delay}s` } as CSSProperties}>
        <Img s={s} sizes={sizes} />
      </div>
    </div>
  );
}

/** A MacBook-style laptop: black glass lid with a notch, aluminium base with the opening scoop. */
function Laptop({ s, sizes = "(min-width: 1024px) 60vw, 90vw", scroll = true, delay = 0, className = "mx-auto w-[86%]" }: { s: Shot; sizes?: string; scroll?: boolean; delay?: number; className?: string }) {
  const r = ratio(s);
  return (
    <div className={className}>
      <div className="dv-laptop__lid">
        {/* The screen: a menu-bar strip under the notch, so the notch never sits on the page. */}
        <div className="dv-laptop__screen">
          <div className="dv-laptop__page">
            {scroll && r > 0.66 ? (
              <ScrollPage s={s} sizes={sizes} delay={delay} fill />
            ) : (
              <ScreenImg s={s} sizes={sizes} className={r < 0.5 ? "object-contain object-top" : "object-cover object-top"} />
            )}
          </div>
        </div>
        <span aria-hidden className="dv-laptop__notch" />
      </div>
      <div aria-hidden className="dv-laptop__base">
        <span />
      </div>
    </div>
  );
}

/**
 * Screen names on a mockup of several screens, set as text over the image's own grid so each stays centred
 * under its phone at any size. Labels at y 100 hang below the image, so the box leaves room for them.
 */
function Screens({ s, children }: { s: Shot; children: ReactNode }) {
  const below = s.screens!.some((l) => l.y >= 100);
  // Size against the image width shared by a row of labels, so one phone's label matches a three-phone row's.
  const perRow = Math.max(...s.screens!.map((l) => s.screens!.filter((m) => m.y === l.y).length));
  const size = `max(11px, min(var(--fs-h5), ${(9.6 / perRow).toFixed(2)}cqw))`;
  return (
    <div className="[container-type:inline-size]" style={{ paddingBottom: below ? "max(2.4em, 5cqw)" : undefined }}>
      <div className="relative">
        {children}
        {s.screens!.map((l, i) => (
          <span
            key={`${l.text}-${i}`}
            className="t-body-sm absolute -translate-x-1/2 text-balance text-center font-medium leading-tight text-ink"
            style={{ left: `${l.x}%`, top: l.y >= 100 ? "calc(100% + 0.5em)" : `${l.y}%`, width: `${100 / perRow}%`, fontSize: size }}
          >
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A finished mockup or a plain screen: transparent ones float, solid ones get a clean rounded card. */
function Piece({ s, sizes }: { s: Shot; sizes: string }) {
  if (s.screens?.length) return <Screens s={s}>{<Piece s={{ ...s, screens: undefined }} sizes={sizes} />}</Screens>;
  return s.clear ? (
    <Img s={s} sizes={sizes} className="drop-shadow-[0_24px_30px_rgba(15,10,35,0.28)]" />
  ) : (
    <Img s={s} sizes={sizes} className={`rounded-[12px] ring-1 ring-black/10 ${SHADOW}`} />
  );
}

/** Board: a white card at the image's true ratio. Very tall boards are kept to a readable width. */
function Board({ s }: { s: Shot }) {
  const tall = ratio(s) > 1.25;
  return (
    <div className={`mx-auto rounded-[14px] bg-white p-[1.5%] ring-1 ring-black/5 ${SHADOW}`} style={{ maxWidth: tall ? 560 : undefined }}>
      <Img s={s} sizes="(min-width: 1024px) 60vw, 90vw" className="rounded-[8px]" />
    </div>
  );
}

/** Row of items whose heights match: each grows in proportion to its width/height ratio.
    The row is capped so the items never get taller than about 560px. */
function Row({ shots, render, gap = "4%" }: { shots: Shot[]; render: (s: Shot, i: number) => ReactNode; gap?: string }) {
  const sum = shots.reduce((a, s) => a + s.w / s.h, 0);
  return (
    <div className="mx-auto flex items-end justify-center" style={{ gap, maxWidth: Math.round(560 * sum * 1.12) }}>
      {shots.map((s, i) => (
        <div key={s.src} className="min-w-0" style={{ flex: `${s.w / s.h} 1 0%` }}>
          {render(s, i)}
        </div>
      ))}
    </div>
  );
}

const INK = "#c8423a"; // the red of her deck's hand-drawn notes

/**
 * A phone with handwritten notes, drawn live instead of baked into the export (where they ran off the
 * edges): Gaegu notes, red curved arrows with a hand-drawn head, on one 100 × 125 grid so the arrows land
 * exactly on what they point at at any size. The phone rises from the panel's bottom edge.
 */
function AnnotatedPhone({ a }: { a: Annotated }) {
  const { shot, phone } = a;
  const aspect = shot.h / shot.w;
  return (
    // The phone fades out at the bottom instead of ending in a hard cut (which shows mid-panel when stacked).
    <div className="relative aspect-[100/125] overflow-hidden [container-type:inline-size] [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]">
      <div className="absolute" style={{ left: `${phone.x}%`, top: `${(phone.y / 125) * 100}%`, width: `${phone.w}%` }}>
        <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(min-width: 1024px) 26vw, 45vw" className="block h-auto w-full" />
      </div>
      <svg aria-hidden viewBox="0 0 100 125" className="pointer-events-none absolute inset-0 size-full overflow-visible">
        {a.notes.map((n) => {
          const [sx, sy] = n.from;
          const ex = phone.x + n.to[0] * phone.w;
          const ey = phone.y + n.to[1] * phone.w * aspect;
          // a gentle bow: the control point sits off the straight line, to its left by `bend`
          const dx = ex - sx, dy = ey - sy, len = Math.hypot(dx, dy) || 1;
          const cx = (sx + ex) / 2 - (dy / len) * (n.bend ?? 10);
          const cy = (sy + ey) / 2 + (dx / len) * (n.bend ?? 10);
          // the head follows the curve's direction as it arrives
          const tx = ex - cx, ty = ey - cy, tl = Math.hypot(tx, ty) || 1;
          const ux = tx / tl, uy = ty / tl;
          const head = (deg: number) => {
            const r = (deg * Math.PI) / 180;
            return `${(ex - 3.2 * (ux * Math.cos(r) - uy * Math.sin(r))).toFixed(2)} ${(ey - 3.2 * (ux * Math.sin(r) + uy * Math.cos(r))).toFixed(2)}`;
          };
          return (
            <g key={n.text} fill="none" stroke={INK} strokeWidth={0.55} strokeLinecap="round" strokeLinejoin="round">
              <path d={`M ${sx} ${sy} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`} />
              <path d={`M ${head(30)} L ${ex.toFixed(2)} ${ey.toFixed(2)} L ${head(-30)}`} />
            </g>
          );
        })}
      </svg>
      {a.notes.map((n) => (
        <p
          key={n.text}
          className="absolute m-0 font-[family-name:var(--font-hand)] font-bold leading-[1.02]"
          style={{
            left: `${n.x}%`,
            top: `${(n.y / 125) * 100}%`,
            width: `${n.w}%`,
            color: INK,
            fontSize: "5.4cqw",
            textAlign: n.align ?? "left",
            rotate: `${n.tilt ?? -3}deg`,
          }}
        >
          {n.text}
        </p>
      ))}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="t-caption mb-3 inline-flex rounded-full bg-white px-3 py-1 font-medium text-[#151412] ring-1 ring-black/10">{children}</span>;
}

function Body({ v, slug }: { v: Visual; slug: string }) {
  switch (v.kind) {
    case "phones": {
      const w = [0, 36, 30, 25, 21][Math.min(v.shots.length, 4)];
      return (
        <div className="flex items-start justify-center gap-[4%]">
          {v.shots.map((s, i) => (
            <div key={s.src} style={{ width: `${w}%`, marginTop: v.shots.length === 3 && i !== 1 ? "6%" : 0 }}>
              <Phone s={s} sizes={`${w}vw`} status={v.status} />
            </div>
          ))}
        </div>
      );
    }
    case "devices":
      return v.shots.length === 1 ? (
        <div className="mx-auto" style={{ maxWidth: v.maxWidth ?? (ratio(v.shots[0]) > 1.3 ? 420 : ratio(v.shots[0]) > 0.8 ? 720 : undefined) }}>
          <Piece s={v.shots[0]} sizes="(min-width: 1024px) 60vw, 90vw" />
        </div>
      ) : (
        <Row shots={v.shots} render={(s) => <Piece s={s} sizes="30vw" />} />
      );
    case "browser":
      // Web screens sit on laptops. Two pages: a large one, and a smaller one in front of it at the bottom right.
      if (v.shots.length === 1) return <Laptop s={v.shots[0]} delay={0} />;
      if (v.shots.length === 2)
        return (
          <div className="relative pb-[16%]">
            <Laptop s={v.shots[0]} sizes="(min-width: 1024px) 45vw, 70vw" className="ml-[5%] w-[70%]" />
            <Laptop s={v.shots[1]} sizes="(min-width: 1024px) 28vw, 45vw" delay={3} className="absolute bottom-0 right-[4%] w-[44%]" />
          </div>
        );
      return v.shots.length === 1 ? (
        <div className="mx-auto w-[92%]">
          <Browser s={v.shots[0]} sizes="(min-width: 1024px) 60vw, 90vw" scroll={v.scroll} />
        </div>
      ) : (
        <div className="relative pb-[14%]">
          <div className="w-[76%]">
            <Browser s={v.shots[0]} sizes="(min-width: 1024px) 45vw, 70vw" scroll={v.scroll} />
          </div>
          <div className="absolute bottom-0 right-0 w-[46%]">
            <Browser s={v.shots[1]} sizes="(min-width: 1024px) 28vw, 45vw" scroll={v.scroll} delay={3} />
          </div>
        </div>
      );
    case "laptop":
      return <Laptop s={v.shot} scroll={v.scroll} />;
    case "board":
      return <Board s={v.shot} />;
    case "compare":
      return (
        <Row
          gap="6%"
          shots={v.shots}
          render={(s) => (
            <div className="flex flex-col items-start">
              {s.label && <Label>{s.label}</Label>}
              <div className="w-full">
                {v.frame === "phone" ? <Phone s={s} sizes="30vw" /> : v.frame === "browser" ? <Laptop s={s} sizes="40vw" className="w-full" /> : <Piece s={s} sizes="40vw" />}
              </div>
            </div>
          )}
        />
      );
    case "deck": {
      const slide = decks[slug]?.find((x) => x.id === v.id);
      return slide ? <DeckVisual slide={slide} /> : null;
    }
    case "annotated":
      return (
        // Side by side; stacked on phones so the handwriting stays readable.
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-[3%]">
          {v.panels.map((a) => (
            <div key={a.shot.src} className="w-full min-w-0 max-w-[420px] sm:max-w-none sm:flex-1">
              <AnnotatedPhone a={a} />
            </div>
          ))}
        </div>
      );
  }
}

export function Showcase({ v, slug }: { v: Visual; slug: string }) {
  const caption = "caption" in v ? v.caption : undefined;
  if (v.kind === "embed")
    return (
      <figure data-reveal className="flex flex-col gap-fr-sm">
        {v.id === "block-bento" && <BlockBento />}
        {caption && <figcaption className="t-body-sm px-1 text-muted">{caption}</figcaption>}
      </figure>
    );
  return (
    <figure data-reveal className="flex flex-col gap-fr-sm">
      <WarpBackground
        className={`gem-panel gem-tile ${
          v.kind === "deck"
            ? "p-[clamp(16px,3vw,40px)]"
            : v.kind === "annotated"
              ? "px-[clamp(12px,4vw,56px)] pt-[clamp(20px,4vw,48px)]" // phones rise from the bottom edge
              : "px-[clamp(20px,6vw,88px)] py-[clamp(28px,6vw,80px)]"
        }`}
      >
        <Body v={v} slug={slug} />
      </WarpBackground>
      {caption && <figcaption className="t-body-sm px-1 text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** A playful element beside a section title: a transparent cut-out on its own, or a tilted framed GIF. */
export function StickerArt({ s }: { s: Sticker }) {
  if (s.framed) {
    const still = <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="200px" className={`h-auto w-full rounded-[6px] ${s.anim ? "anim-still" : ""}`} />;
    return (
      <figure className="w-[min(200px,60vw)] -rotate-3 rounded-[10px] bg-white p-1.5 pb-2.5 shadow-[0_18px_36px_-18px_rgba(0,0,0,0.5)] ring-1 ring-black/5">
        {s.anim && <Image src={s.anim} alt={s.alt} width={s.w} height={s.h} unoptimized className="anim-play h-auto w-full rounded-[6px]" />}
        {still}
      </figure>
    );
  }
  return (
    <div className="relative aspect-square w-[min(150px,40vw)] rotate-3">
      <Image src={s.src} alt={s.alt} fill sizes="150px" className="object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)]" />
    </div>
  );
}
