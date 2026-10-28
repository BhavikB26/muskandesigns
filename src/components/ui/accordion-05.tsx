"use client";

import { useState, type ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/*
 * Accordion 05 (21st.dev, by Ali Imam): big uppercase titles in a faint ink that light up when open, each
 * with a small index number, and the answer underneath.
 *
 * Local changes: items come in as props (the demo's copy was the author's own); the site's tokens instead of
 * shadcn's (ink / accent / muted); content can be any node; the title is plain text inside Radix's header
 * (an h3), not an h1 inside a button; and with `openOnHover` a row opens while a real pointer is over it (clicks, taps and Enter still work).
 */

export type Accordion05Item = { id: string; title: ReactNode; content: ReactNode };

export function Accordion05({
  items,
  defaultValue = "",
  openOnHover = false,
  className,
}: {
  items: Accordion05Item[];
  defaultValue?: string;
  openOnHover?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)} onMouseLeave={() => openOnHover && fine() && setValue("")}>
      <Accordion type="single" collapsible value={value} onValueChange={setValue} className="w-full border-t border-line">
        {items.map((item, i) => (
          <AccordionItem value={item.id} key={item.id} onMouseEnter={() => openOnHover && fine() && setValue(item.id)}>
            <AccordionTrigger className="cursor-pointer overflow-hidden pl-2 text-left text-ink/25 duration-200 hover:text-ink/45 data-[state=open]:text-accent md:pl-6 [&>svg]:hidden">
              <span className="flex flex-1 items-start gap-4">
                <span className="t-caption mt-1 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[length:var(--fs-h3)] uppercase leading-tight tracking-[-0.01em]">
                  {item.title}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pl-2 text-muted md:pl-[3.75rem] md:pr-6">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Accordion05;
