import { journey } from "@/content/about";
import { MaskedText } from "@/components/masked-text";

/** Journey so far (after idoshitty.art and ngan-nguyen.com): one quiet row per role, from her resume. */
export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="w-full scroll-mt-24 px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-fr-xl">
        <div data-reveal className="flex flex-col gap-fr-sm">
          <h2 id="journey-heading" className="t-display-xl">
            <MaskedText text="Journey" onReveal />{" "}
            <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em]">
              <MaskedText text="so far" start={1} onReveal />
            </em>
          </h2>
          <p className="t-body-lg text-muted">Startups, AI platforms and a lot of shipping in between.</p>
        </div>
        <ol data-reveal className="flex flex-col border-t border-line">
          {journey.map((j) => (
            <li key={j.years + j.place} className="grid grid-cols-1 gap-fr-xxs border-b border-line py-fr-lg sm:grid-cols-[1fr_1.2fr_1fr] sm:items-baseline sm:gap-fr-lg">
              <p className="t-body text-ink">{j.role}</p>
              <p className="t-body text-ink-soft">{j.place}</p>
              <p className="label-mono text-muted sm:text-right">{j.years}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
