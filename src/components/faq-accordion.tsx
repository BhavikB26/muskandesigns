"use client";

import { useState } from "react";

export type FaqItem = {
  q: string;
  a: string | string[];
};

export function FaqAccordion({
  title,
  items,
  className = "",
}: {
  title: string;
  items: FaqItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className={`flex w-full flex-col items-start gap-10 px-6 py-16 md:flex-row md:gap-16 md:px-[72px] md:py-[100px] ${className}`}
    >
      <h2 className="w-full shrink-0 text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:w-[454px] md:text-[40px] md:leading-[46px]">
        {title}
      </h2>
      <div className="flex w-full flex-col">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q} className="border-b border-black/[0.16]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-base tracking-[0.2px] text-ink-soft">
                  {item.q}
                </span>
                <img
                  src="/home/icon-chevron.svg"
                  alt=""
                  className={`size-3.5 shrink-0 object-contain transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="flex flex-col gap-4 pb-6 text-base tracking-[0.2px] text-[rgba(48,46,44,0.85)]">
                  {(Array.isArray(item.a) ? item.a : [item.a]).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
