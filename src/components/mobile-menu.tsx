"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/content/case-studies";

const VIEW_MORE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=12-27&t=AEx2XrQmEeZD8e6M-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=12%3A27&show-proto-sidebar=1";

const RESUME_URL = "/resume.pdf";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setCaseStudiesOpen(false);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "block border-b border-black/[0.08] px-6 py-4 text-base text-ink-soft hover:bg-black/[0.02] hover:text-ink";

  return (
    <div ref={ref} className="relative flex md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle menu"
        className="relative flex size-10 items-center justify-center"
      >
        <span
          className={`absolute h-[2px] w-6 rounded-full bg-ink-soft transition-all duration-200 ${
            open ? "rotate-45" : "-translate-y-[6px]"
          }`}
        />
        <span
          className={`absolute h-[2px] w-6 rounded-full bg-ink-soft transition-all duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute h-[2px] w-6 rounded-full bg-ink-soft transition-all duration-200 ${
            open ? "-rotate-45" : "translate-y-[6px]"
          }`}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-4 w-[280px] overflow-hidden rounded-2xl bg-white shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.15)]">
          <button
            type="button"
            onClick={() => setCaseStudiesOpen((v) => !v)}
            aria-expanded={caseStudiesOpen}
            className="flex w-full items-center justify-between border-b border-black/[0.08] px-6 py-4 text-base text-ink-soft hover:bg-black/[0.02] hover:text-ink"
          >
            Case studies
            <img
              src="/home/icon-nav-chevron.svg"
              alt=""
              className={`h-1.5 w-3 object-contain transition-transform ${
                caseStudiesOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {caseStudiesOpen && (
            <div className="bg-black/[0.02]">
              {caseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-black/[0.08] py-3 pl-10 pr-6 text-base text-ink-soft hover:text-ink"
                >
                  {study.shortName}
                </Link>
              ))}
              <a
                href={VIEW_MORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block border-b border-black/[0.08] py-3 pl-10 pr-6 text-base text-ink-soft hover:text-ink"
              >
                View more...
              </a>
            </div>
          )}
          <Link href="/#about" onClick={() => setOpen(false)} className={linkClass}>
            About
          </Link>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-6 py-4 text-base text-ink-soft hover:bg-black/[0.02] hover:text-ink"
          >
            Resume
          </a>
        </div>
      )}
    </div>
  );
}
