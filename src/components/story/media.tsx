import Image from "next/image";
import type { Shot } from "@/content/case-studies";
import type { GalleryItem, StoryMedia } from "@/content/stories/types";
import { Laptop, Phone, Piece, Showcase } from "@/components/case/showcase";
import { WarpBackground } from "@/components/ui/warp-background";
import { MediaTabs } from "./media-tabs";

/*
 * Story visuals. Showcase visuals keep their device frames; the rest are new compositions for the editorial
 * pages: a row of mixed screens at one height, animated states, stacked component strips and tabbed boards.
 */

const SHADOW = "shadow-[0_28px_60px_-28px_rgba(15,10,35,0.5)]";

/** A tall product panel (Natasha's 402 × 840 side panel): its own rounded card with a soft edge. */
export function PanelFrame({ s, sizes }: { s: Shot; sizes: string }) {
  return (
    <div className={`overflow-hidden rounded-[18px] bg-white ring-1 ring-black/10 ${SHADOW}`}>
      <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}

/** Width ÷ height of an item once framed, so a row can give every item the same height. */
function framedRatio(it: GalleryItem) {
  const r = it.shot.w / it.shot.h;
  if (it.frame === "laptop") return 1.52; // the laptop frame, lid and base, is about 3:2
  if (it.frame === "phone") return 0.49;
  return r;
}

function Framed({ it, sizes }: { it: GalleryItem; sizes: string }) {
  if (it.frame === "laptop") return <Laptop s={it.shot} sizes={sizes} scroll={false} className="w-full" />;
  if (it.frame === "phone") return <Phone s={it.shot} sizes={sizes} />;
  if (it.frame === "panel") return <PanelFrame s={it.shot} sizes={sizes} />;
  return <Piece s={it.shot} sizes={sizes} />;
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const sum = items.reduce((a, it) => a + framedRatio(it), 0);
  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-[4%]">
      {items.map((it) => (
        <div key={it.shot.src + it.label} className={`flex min-w-0 flex-col items-center gap-3 sm:w-auto ${it.frame === "panel" ? "w-[58%]" : "w-[92%]"}`} style={{ flex: `${framedRatio(it)} 1 0%`, maxWidth: it.frame === "panel" ? 340 : undefined }}>
          <div className="w-full">
            <Framed it={it} sizes={`(min-width: 1024px) ${Math.round((framedRatio(it) / sum) * 70)}vw, 80vw`} />
          </div>
          {it.label && <span className="t-caption rounded-full bg-white/85 px-3 py-1 font-medium text-[#151412] ring-1 ring-black/10">{it.label}</span>}
        </div>
      ))}
    </div>
  );
}

function States({ items }: { items: { label: string; note: string; anim: string; still: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
      {items.map((s) => (
        <li key={s.label} className="flex flex-col items-center gap-3 text-center">
          <div className="relative aspect-square w-full max-w-[200px]">
            <Image src={s.still} alt="" width={320} height={320} className="anim-still absolute inset-0 size-full" />
            <Image src={s.anim} alt="" width={320} height={320} unoptimized className="anim-play absolute inset-0 size-full" />
          </div>
          <span className="text-[17px] font-medium text-[#151412]">{s.label}</span>
          <span className="t-body-sm -mt-2 text-[#3a3733]">{s.note}</span>
        </li>
      ))}
    </ul>
  );
}

function Strips({ items }: { items: { label: string; shot: Shot }[] }) {
  return (
    <ul className="mx-auto flex max-w-[980px] flex-col gap-4">
      {items.map((it) => (
        <li key={it.label} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <span className="t-caption w-[150px] shrink-0 font-medium uppercase tracking-[0.08em] text-[#3a3733]">{it.label}</span>
          <div className={`min-w-0 flex-1 overflow-hidden rounded-[14px] bg-white ring-1 ring-black/5 ${SHADOW}`}>
            <Image src={it.shot.src} alt={it.shot.alt} width={it.shot.w} height={it.shot.h} sizes="(min-width: 1024px) 60vw, 90vw" className="block h-auto w-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Caption({ children }: { children?: string }) {
  return children ? <figcaption className="t-body-sm px-1 text-muted">{children}</figcaption> : null;
}

export function StoryMediaView({ m, slug }: { m: StoryMedia; slug: string }) {
  // A single laptop fills its column: a tighter panel than the case-study default, so the screen stays readable.
  if (m.kind === "showcase" && m.v.kind === "laptop")
    return (
      <figure data-reveal className="flex flex-col gap-fr-sm">
        <WarpBackground className="gem-panel gem-tile px-[clamp(16px,4%,48px)] pb-[clamp(20px,5%,56px)] pt-[clamp(24px,6%,64px)]">
          <Laptop s={m.v.shot} scroll={m.v.scroll} sizes="(min-width: 1024px) 58vw, 92vw" className="mx-auto w-full" />
        </WarpBackground>
        <Caption>{m.v.caption}</Caption>
      </figure>
    );
  if (m.kind === "showcase") return <Showcase v={m.v} slug={slug} />;
  if (m.kind === "tabs") return <MediaTabs items={m.items} caption={m.caption} />;
  return (
    <figure data-reveal className="flex flex-col gap-fr-sm">
      <WarpBackground className="gem-panel gem-tile warp--quiet px-[clamp(20px,5vw,72px)] py-[clamp(28px,5vw,72px)]">
        {m.kind === "gallery" && <Gallery items={m.items} />}
        {m.kind === "states" && <States items={m.items} />}
        {m.kind === "strips" && <Strips items={m.items} />}
      </WarpBackground>
      <Caption>{m.caption}</Caption>
    </figure>
  );
}
