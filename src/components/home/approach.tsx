import type { CSSProperties } from "react";

const principles = [
  {
    icon: "/home/icon-approach-1.png",
    text: "Good design builds trust.",
    from: "rgba(255,173,173,0.2)",
    to: "rgba(255,173,173,0.35)",
  },
  {
    icon: "/home/icon-approach-2.png",
    text: "Strategic design beats over-design.",
    from: "rgba(179,222,193,0.2)",
    to: "rgba(179,222,193,0.35)",
  },
  {
    icon: "/home/icon-approach-3.png",
    text: "Done > perfect",
    from: "rgba(202,187,233,0.2)",
    to: "rgba(202,187,233,0.35)",
  },
  {
    icon: "/home/icon-approach-4.png",
    text: "Don't design in a vacuum",
    from: "rgba(255,173,173,0.2)",
    to: "rgba(255,173,173,0.35)",
  },
];

export function Approach() {
  return (
    <section className="flex w-full flex-col items-center bg-[linear-gradient(161.11deg,rgba(255,173,173,0.102)_0%,rgba(202,187,233,0.149)_50%,rgba(179,222,193,0.102)_100%)] px-6 py-16 md:px-[72px] md:py-[100px]">
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-10 rounded-[24px] md:bg-[linear-gradient(166.9deg,rgba(255,173,173,0.051)_0%,rgba(202,187,233,0.051)_50%,rgba(179,222,193,0.051)_100%)] md:flex-row md:gap-[72px]">
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            My approach
          </h2>
          <p className="text-base tracking-[0.2px] text-[rgba(48,46,44,0.75)]">
            I combine UX thinking with product strategy to design scalable
            solutions that solve real user needs, align with business goals,
            and are built to last (not just sit in Figma). No fluff. No
            over-design. Just thoughtful, tested solutions that work.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {principles.map((p) => (
            <div
              key={p.text}
              className="flex flex-row items-center gap-4 rounded-2xl bg-[linear-gradient(to_right,var(--from),var(--to))] p-6 sm:flex-col sm:items-start sm:bg-[linear-gradient(to_bottom,var(--from),var(--to))]"
              style={
                {
                  "--from": p.from,
                  "--to": p.to,
                } as CSSProperties
              }
            >
              <img
                src={p.icon}
                alt=""
                className="size-7 shrink-0 object-contain sm:h-[50px] sm:w-12 sm:object-left"
              />
              <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
