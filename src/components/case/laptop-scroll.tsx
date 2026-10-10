"use client";

import Image from "next/image";
import { useAutoScroll } from "./use-auto-scroll";

type Shot = { src: string; width: number; height: number };

/** A long web-page screenshot inside a laptop screen, playing like a slow screen recording. */
export function LaptopScroll({ src, width, height, alt }: Shot & { alt: string }) {
  const screen = useAutoScroll<HTMLDivElement>();
  return (
    <div className="laptop w-full max-w-[860px]">
      <div className="laptop-lid">
        <div ref={screen} className="laptop-screen laptop-screen-video">
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 820px, 88vw" className="block h-auto w-full" />
        </div>
      </div>
      <div className="laptop-base" aria-hidden />
    </div>
  );
}

/**
 * A long phone screen as a scrolling prototype at the size of the other phone screens:
 * the status bar and bottom action bar stay put while the content scrolls between them.
 */
export function PhoneScroll({ body, top, bottom, alt }: { body: Shot; top?: Shot; bottom?: Shot; alt: string }) {
  const screen = useAutoScroll<HTMLDivElement>(0.09);
  return (
    <div className="phone-frame">
      <div className="phone-screen">
        {top && <Image src={top.src} alt="" width={top.width} height={top.height} sizes="250px" className="block h-auto w-full shrink-0" />}
        <div ref={screen} className="phone-scroll">
          <Image src={body.src} alt={alt} width={body.width} height={body.height} sizes="250px" className="block h-auto w-full" />
        </div>
        {bottom && <Image src={bottom.src} alt="" width={bottom.width} height={bottom.height} sizes="250px" className="block h-auto w-full shrink-0" />}
      </div>
    </div>
  );
}
