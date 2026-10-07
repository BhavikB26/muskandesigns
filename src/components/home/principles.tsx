const isDev = process.env.NODE_ENV === "development";

/*
 * TODO(embee): add 4–6 principles in your own words. Each needs a short title
 * (shown on the card) and one or two sentences (revealed on hover/focus).
 * The section stays hidden on the live site until this list has entries.
 */
const principles: { title: string; detail: string }[] = [];

const placeholders = Array.from({ length: 5 }, (_, i) => ({
  title: `TODO: principle ${i + 1}`,
  detail: "Write one or two sentences about what this means in your work.",
}));

export function Principles() {
  const items = principles.length > 0 ? principles : isDev ? placeholders : [];
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="principles-heading" className="w-full px-page pt-28  md:pt-40">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-10">
        <h2 id="principles-heading" className="max-w-[560px] font-display text-[34px] leading-[1.08] tracking-[-0.8px] md:text-[44px]">
          How I like to work
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((p) => (
            <li key={p.title}>
              <div
                tabIndex={0}
                className="group relative flex h-[220px] flex-col justify-between overflow-hidden rounded-[18px] bg-card p-5 outline-none"
              >
                <p className="font-display text-[21px] leading-[1.15] tracking-[-0.3px] transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                  {p.title}
                </p>
                <p className="absolute inset-5 text-[15px] leading-[1.5] text-ink-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.detail}
                </p>
                <span aria-hidden className="text-[13px] text-muted">Hover to read</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
