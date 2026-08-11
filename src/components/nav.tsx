"use client";

import { useState } from "react";
import Image from "next/image";

type NavProps = {
  active?: "work" | "about";
};

export function Nav({ active }: NavProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative flex w-full items-center justify-between border-b border-[#e4e7ec] px-6 py-4 sm:border-none sm:px-10 sm:pb-0 sm:pt-10 md:px-[120px] md:pt-[64px]">
      <a href="/" className="font-urbanist text-base font-bold text-ink sm:text-3xl md:text-[24px]">
        musk<span className="text-accent">a</span>n.
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex size-8 items-center justify-center sm:hidden"
      >
        {open ? (
          <span className="relative block size-4">
            <span className="absolute left-0 top-1/2 block h-[2px] w-4 -translate-y-1/2 rotate-45 bg-[#3D4754]" />
            <span className="absolute left-0 top-1/2 block h-[2px] w-4 -translate-y-1/2 -rotate-45 bg-[#3D4754]" />
          </span>
        ) : (
          <Image src="/icons/menu.svg" alt="" width={32} height={32} />
        )}
      </button>
      <div className="hidden items-center gap-8 font-urbanist text-base font-semibold sm:flex sm:gap-12 md:gap-[60px] md:text-base">
        <a
          href="/work"
          className={active === "work" ? "text-accent" : "text-ink hover:opacity-70"}
        >
          work
        </a>
        <a
          href="/about"
          className={active === "about" ? "text-accent" : "text-ink hover:opacity-70"}
        >
          about
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink hover:opacity-70"
        >
          resume
        </a>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-full z-50 flex flex-col gap-6 border-b border-[#e4e7ec] bg-white px-6 py-6 font-urbanist text-base font-semibold sm:hidden">
          <a
            href="/work"
            onClick={() => setOpen(false)}
            className={active === "work" ? "text-accent" : "text-ink hover:opacity-70"}
          >
            work
          </a>
          <a
            href="/about"
            onClick={() => setOpen(false)}
            className={active === "about" ? "text-accent" : "text-ink hover:opacity-70"}
          >
            about
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-ink hover:opacity-70"
          >
            resume
          </a>
        </div>
      )}
    </nav>
  );
}
