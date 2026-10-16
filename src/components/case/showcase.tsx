import Image from "next/image";
import type { ReactNode } from "react";
import type { Shot, Sticker, Visual } from "@/content/case-studies";
import { decks } from "@/content/decks";
import { DeckVisual } from "@/components/case/case-parts";

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

/** A phone outline around a bare screen; long screens show their top, like a phone would. */
function Phone({ s, sizes }: { s: Shot; sizes: string }) {
  return (
    <div className={`rounded-[13%/6%] bg-[#111] p-[3.2%] ${SHADOW}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[10%/4.6%] bg-white">
        <Img s={s} sizes={sizes} fill className="object-cover object-top" />
      </div>
    </div>
  );
}

/** A browser window; tall pages show their top in a 16:10 viewport, wide ones show whole. */
function Browser({ s, sizes }: { s: Shot; sizes: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] bg-white ring-1 ring-black/10 ${SHADOW}`}>
      <div aria-hidden className="flex items-center gap-1.5 bg-[#ececec] px-3 py-2">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="block size-2.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      {ratio(s) >= 0.625 ? (
        <div className="relative aspect-[16/10]">
          <Img s={s} sizes={sizes} fill className="object-cover object-top" />
        </div>
      ) : (
        <Img s={s} sizes={sizes} />
      )}
    </div>
  );
}

function Laptop({ s }: { s: Shot }) {
  return (
    <div className="mx-auto w-[88%]">
      <div className={`rounded-t-[14px] bg-[#111] p-[1.2%] pb-[1.6%] ${SHADOW}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
          <Img s={s} sizes="(min-width: 1024px) 60vw, 90vw" fill className="object-cover object-top" />
        </div>
      </div>
      <div aria-hidden className="relative -mx-[6%] h-3 rounded-b-[14px] bg-[linear-gradient(#d9dbdf,#a9acb2)] md:h-4">
        <span className="absolute left-1/2 top-0 block h-1.5 w-[16%] -translate-x-1/2 rounded-b-[8px] bg-[#8d9096]" />
      </div>
    </div>
  );
}

/** A finished mockup or a plain screen: transparent ones float, solid ones get a clean rounded card. */
function Piece({ s, sizes }: { s: Shot; sizes: string }) {
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
              <Phone s={s} sizes={`${w}vw`} />
            </div>
          ))}
        </div>
      );
    }
    case "devices":
      return v.shots.length === 1 ? (
        <div className="mx-auto" style={{ maxWidth: ratio(v.shots[0]) > 1.2 ? 420 : ratio(v.shots[0]) > 0.8 ? 720 : undefined }}>
          <Piece s={v.shots[0]} sizes="(min-width: 1024px) 60vw, 90vw" />
        </div>
      ) : (
        <Row shots={v.shots} render={(s) => <Piece s={s} sizes="30vw" />} />
      );
    case "browser":
      return v.shots.length === 1 ? (
        <div className="mx-auto w-[92%]">
          <Browser s={v.shots[0]} sizes="(min-width: 1024px) 60vw, 90vw" />
        </div>
      ) : (
        <div className="relative pb-[14%]">
          <div className="w-[76%]">
            <Browser s={v.shots[0]} sizes="(min-width: 1024px) 45vw, 70vw" />
          </div>
          <div className="absolute bottom-0 right-0 w-[46%]">
            <Browser s={v.shots[1]} sizes="(min-width: 1024px) 28vw, 45vw" />
          </div>
        </div>
      );
    case "laptop":
      return <Laptop s={v.shot} />;
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
                {v.frame === "phone" ? <Phone s={s} sizes="30vw" /> : v.frame === "browser" ? <Browser s={s} sizes="40vw" /> : <Piece s={s} sizes="40vw" />}
              </div>
            </div>
          )}
        />
      );
    case "deck": {
      const slide = decks[slug]?.find((x) => x.id === v.id);
      return slide ? <DeckVisual slide={slide} /> : null;
    }
  }
}

export function Showcase({ v, slug }: { v: Visual; slug: string }) {
  const caption = "caption" in v ? v.caption : undefined;
  return (
    <figure data-reveal className="flex flex-col gap-fr-sm">
      <div className={`gem-panel rounded-[20px] md:rounded-[28px] ${v.kind === "deck" ? "p-[clamp(16px,3vw,40px)]" : "px-[clamp(20px,6vw,88px)] py-[clamp(28px,6vw,80px)]"}`}>
        <Body v={v} slug={slug} />
      </div>
      {caption && <figcaption className="t-body-sm px-1 text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** A playful element beside a section title: a transparent cut-out on a soft gem disc, or a tilted framed GIF. */
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
    <div className="gem-disc relative aspect-square w-[min(150px,40vw)] rotate-3 rounded-full">
      <Image src={s.src} alt={s.alt} fill sizes="150px" className="object-contain p-[13%] drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)]" />
    </div>
  );
}
