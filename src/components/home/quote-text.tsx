"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A testimonial clamped to a few lines so every card keeps the same height.
 * When the text is longer, "Read more" opens the full quote in a dialog (the card never grows).
 */
export function QuoteText({ quote, name }: { quote: string; name: string }) {
  const text = useRef<HTMLParagraphElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = text.current;
    if (!el) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 2);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-start gap-fr-sm">
      <blockquote>
        <p ref={text} className="quote-clamp t-body-lg text-ink">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      {clamped && (
        <button type="button" onClick={() => dialog.current?.showModal()} className="case-link t-body-sm text-ink" aria-haspopup="dialog">
          Read more<span className="sr-only">: {name}&rsquo;s full testimonial</span>
        </button>
      )}
      <dialog ref={dialog} aria-label={`${name}'s testimonial`} className="quote-dialog" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className="flex flex-col gap-fr-lg">
          <p className="t-body-lg text-ink">&ldquo;{quote}&rdquo;</p>
          <div className="flex items-center justify-between gap-fr-md">
            <span className="t-body-sm text-ink">{name}</span>
            <button type="button" onClick={() => dialog.current?.close()} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
