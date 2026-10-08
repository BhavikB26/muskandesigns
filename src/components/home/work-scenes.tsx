"use client";

import Image from "next/image";
import { ThinkingOrb } from "thinking-orbs";
import { useMotionPaused } from "@/components/motion";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Code-built mockup scenes for projects whose real screens look better framed
 * in devices than as a flat thumbnail. Only Muskan's real screens go in here.
 */

function Window({ src, w, h, className = "" }: { src: string; w: number; h: number; className?: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-[10px] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.08)] ${className}`}>
      <div className="flex h-[7%] min-h-3 items-center gap-[1.2%] bg-[#ececec] px-[2.5%]">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="aspect-square h-[38%] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <Image src={src} alt="" width={w} height={h} sizes="(min-width: 768px) 40vw, 80vw" className="block h-auto w-full" />
    </div>
  );
}

function Card({ src, w, h, className = "", style }: { src: string; w: number; h: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[12px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
      style={style}
    >
      <Image src={src} alt="" width={w} height={h} sizes="(min-width: 768px) 18vw, 40vw" className="block h-auto w-full" />
    </div>
  );
}

function ProPilotScene() {
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_30%,rgba(255,255,255,0.55),transparent_70%)]" />
      <div className="absolute inset-0 [perspective:1400px]">
        <div className="absolute inset-0 [transform:rotateY(-10deg)_rotateX(6deg)] [transform-style:preserve-3d]">
          <Window src="/work/ai-mentor/exact/hero3.png" w={910} h={648} className="left-[5%] top-[14%] w-[72%]" />
          <Card
            src="/work/ai-mentor/exact/design3.png"
            w={549}
            h={1024}
            className="right-[5%] top-[9%] w-[27%] rotate-[3deg]"
          />
        </div>
      </div>
      <div className="absolute bottom-[7%] left-[7%] flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 shadow-lg backdrop-blur">
        <span aria-hidden className="grid size-8 place-items-center overflow-hidden rounded-full bg-[#151412]">
          <ThinkingOrb state="working" size={32} theme="dark" paused={paused || reduced} />
        </span>
        <span className="label-mono text-[#151412]">AI mentor</span>
      </div>
    </>
  );
}

function BlockScene() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_20%,rgba(140,110,255,0.45),transparent_70%)]" />
      <div className="absolute inset-0 [perspective:1400px]">
        <div className="absolute inset-0 [transform:rotateY(12deg)_rotateX(5deg)] [transform-style:preserve-3d]">
          <Window src="/work/builder-design-system/img-typography.webp" w={1200} h={960} className="left-[24%] top-[10%] w-[66%]" />
          <Card src="/work/builder-design-system/img-colors.webp" w={1080} h={930} className="left-[5%] top-[30%] w-[36%] -rotate-[4deg]" />
          <Card src="/work/builder-design-system/img-icons.webp" w={730} h={890} className="bottom-[-6%] right-[6%] w-[20%] rotate-[5deg]" />
        </div>
      </div>
    </>
  );
}

export const scenes: Record<string, () => React.JSX.Element> = {
  "ai-mentor": ProPilotScene,
  "builder-design-system": BlockScene,
};

/** A project's scene when it has one, otherwise its thumbnail. */
export function ProjectMedia({ slug, src, alt, sizes, preload }: { slug: string; src: string; alt: string; sizes: string; preload?: boolean }) {
  const Scene = scenes[slug];
  if (Scene)
    return (
      <div {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })} className="absolute inset-y-0 left-1/2 aspect-[4/3] h-full -translate-x-1/2">
        <Scene />
      </div>
    );
  return <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />;
}
