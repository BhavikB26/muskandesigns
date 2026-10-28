"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/components/use-reduced-motion";

/*
 * Liquid Glass Accordion (21st.dev): frosted glass rows that open one at a time (or several).
 *
 * Local changes: proper disclosure semantics (a real button with aria-expanded / aria-controls, the
 * panel labelled by it, the title in a heading); `onOpenChange` and `onHover` so a neighbour can follow
 * the row in focus (the skills preview); instant opening with reduced motion. The glass-* classes and the
 * --lg-* tokens live in globals.css.
 */

interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
}

interface LiquidGlassAccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  /** Heading level for the titles. Defaults to 3. */
  headingLevel?: 2 | 3 | 4;
  /** Called with the open ids whenever they change. */
  onOpenChange?: (open: string[]) => void;
  /** Called with the id under the pointer or keyboard focus, or null when it leaves. */
  onHover?: (id: string | null) => void;
  /** A row opens while the pointer is over it and closes when the pointer leaves. Clicks (touch,
      keyboard) still toggle, so it works without a pointer too. */
  openOnHover?: boolean;
}

export function LiquidGlassAccordion({
  items,
  className,
  allowMultiple = false,
  defaultOpen = [],
  headingLevel = 3,
  onOpenChange,
  onHover,
  openOnHover = false,
}: LiquidGlassAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));
  const reduced = useReducedMotion();
  const uid = useId();
  const Heading = `h${headingLevel}` as const;

  const toggle = (id: string) => {
    const next = new Set(openItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!allowMultiple) next.clear();
      next.add(id);
    }
    setOpenItems(next);
    onOpenChange?.([...next]);
  };

  // Hover opening: only for a real pointer that hovers (a tap on a phone also fires mouseenter).
  const hoverOpen = (id: string | null) => {
    if (!openOnHover || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const next = new Set(id === null ? [] : [id]);
    setOpenItems(next);
    onOpenChange?.([...next]);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const panel = `${uid}-${item.id}-panel`;
        const button = `${uid}-${item.id}-button`;
        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => {
              onHover?.(item.id);
              hoverOpen(item.id);
            }}
            onMouseLeave={() => {
              onHover?.(null);
              hoverOpen(null);
            }}
            className={cn("overflow-hidden rounded-2xl", "glass-blur-sm glass-surface glass-border", isOpen && "glass-highlight")}
          >
            <Heading className="m-0">
              <motion.button
                id={button}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                whileTap={reduced ? undefined : { scale: 0.99 }}
                onClick={() => toggle(item.id)}
                onFocus={() => onHover?.(item.id)}
                onBlur={() => onHover?.(null)}
                className={cn(
                  "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                  isOpen ? "text-[var(--lg-text)]" : "text-[var(--lg-text-secondary)] hover:text-[var(--lg-text)]",
                )}
              >
                {item.icon && <span className="flex-shrink-0 text-[var(--lg-text-muted)]">{item.icon}</span>}
                <span className="flex-1 text-sm font-medium">{item.title}</span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.2 }}
                  className="flex flex-shrink-0 text-[var(--lg-text-muted)]"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </motion.button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={button}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 text-sm leading-relaxed text-[var(--lg-text-secondary)]">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default LiquidGlassAccordion;
