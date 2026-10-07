import type { CSSProperties, ElementType } from "react";

/**
 * Text that rises word by word from behind a mask (Pear-style).
 * Screen readers get the plain sentence; the split words are aria-hidden.
 * `onReveal` waits for the nearest [data-reveal] ancestor to scroll into view.
 */
export function MaskedText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  onReveal = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  onReveal?: boolean;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} style={{ "--mask-delay": `${delay}ms` } as CSSProperties}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i}>
            <span className={`mask-word${onReveal ? " on-reveal" : ""}`} style={{ "--w": i } as CSSProperties}>
              <span>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
