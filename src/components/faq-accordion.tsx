"use client";

import { useState } from "react";

export type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="flex w-full flex-col items-start gap-10 px-6 py-16 md:flex-row md:gap-16 md:px-[72px] md:py-[100px]">
      <h2 className="w-full shrink-0 text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:w-[454px] md:text-[40px] md:leading-[46px]">
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
                  className={`size-5 shrink-0 object-contain transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="pb-6 text-base tracking-[0.2px] text-muted">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
