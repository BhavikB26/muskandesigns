"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/use-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Testimonials with Marquee (21st.dev): a title that blurs in word by word, a line under it, then cards
 * gliding sideways in an endless loop.
 *
 * Local changes: the cards' row (the original imported it from a file that wasn't shared) is written here:
 * two rows running in opposite directions, each its list twice over so the loop has no seam, faded at the
 * edges, and paused while hovered or focused. Items, title and line come in as props; cards show an
 * initial instead of a photo when there is none, and an optional star rating and date. framer-motion (already
 * here) instead of the `motion` package, which is the same library. With reduced motion or the site's motion
 * paused, the rows don't move: they become a plain swipeable strip.
 */

export type MarqueeTestimonial = {
  name: string;
  /** A role, handle or date under the name. */
  handle?: string;
  description: string;
  image?: string;
  /** 1–5 stars. */
  rating?: number;
};

function Stars({ rating }: { rating: number }) {
  return (
    <>
      <span aria-hidden className="tracking-[0.12em] text-[#e2a400]">
        {"★".repeat(rating)}
        <span className="text-line-strong">{"★".repeat(5 - rating)}</span>
      </span>
      <span className="sr-only">{rating} out of 5 stars</span>
    </>
  );
}

function Card({ t, hidden }: { t: MarqueeTestimonial; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[min(340px,78vw)] shrink-0 flex-col gap-fr-sm rounded-[20px] border border-line bg-card p-fr-lg"
    >
      <figcaption className="flex items-center gap-fr-sm">
        {t.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- small avatars from anywhere
          <img src={t.image} alt="" className="size-10 shrink-0 rounded-full object-cover" />
        ) : (
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft t-body-sm text-ink">
            {t.name[0]}
          </span>
        )}
        <span className="flex min-w-0 flex-col">
          <span className="t-body-sm truncate text-ink">{t.name}</span>
          <span className="t-caption flex items-center gap-fr-xs text-muted">
            {t.rating ? <Stars rating={t.rating} /> : null}
            {t.handle}
          </span>
        </span>
      </figcaption>
      <blockquote className="t-body m-0 text-ink-soft">{t.description}</blockquote>
    </figure>
  );
}

/** One endlessly looping row. `reverse` runs it the other way. */
function Row({ items, reverse, duration }: { items: MarqueeTestimonial[]; reverse?: boolean; duration: number }) {
  return (
    <div className="group flex gap-[var(--gap)] overflow-hidden [--gap:16px] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex shrink-0 items-start gap-[var(--gap)] [animation:canopy-x_var(--duration)_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
          style={{ "--duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
        >
          {items.map((t) => (
            <Card key={t.name} t={t} hidden={copy === 1} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function AnimatedTestimonials({ data, rows = 2, duration = 24 }: { data: MarqueeTestimonial[]; rows?: number; duration?: number }) {
  const reduced = useReducedMotion();
  if (reduced) {
    // Still: one strip to swipe or scroll through.
    return (
      <div className="flex snap-x gap-4 overflow-x-auto pb-2">
        {data.map((t) => (
          <div key={t.name} className="snap-start">
            <Card t={t} />
          </div>
        ))}
      </div>
    );
  }
  // Split the list across the rows (alternating), so each row shows different people.
  const split = Array.from({ length: rows }, (_, r) => data.filter((_, i) => i % rows === r));
  return (
    <div className="flex flex-col gap-4">
      {split.map((items, r) => (
        <Row key={r} items={items} reverse={r % 2 === 1} duration={duration} />
      ))}
    </div>
  );
}

export default function TestimonialsMarquee({
  data,
  title,
  description,
  className,
}: {
  data: MarqueeTestimonial[];
  title?: string;
  description?: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const words = title ? title.split(" ") : [];
  return (
    <div className={cn("relative flex w-full flex-col items-center", className)}>
      {(title || description) && (
        <div className="flex flex-col items-center gap-4 pb-fr-xl text-center">
          {title && (
            <h3 className="t-display-md text-ink">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={reduced ? false : { opacity: 0, filter: "blur(6px)", y: 12 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeInOut" }}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h3>
          )}
          {description && <p className="t-body max-w-2xl text-ink-soft">{description}</p>}
        </div>
      )}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full"
      >
        <AnimatedTestimonials data={data} />
      </motion.div>
    </div>
  );
}
