const principles = [
  {
    icon: "/home/icon-approach-1.svg",
    text: "Good design builds trust.",
    from: "rgba(255,173,173,0.2)",
    to: "rgba(255,173,173,0.35)",
  },
  {
    icon: "/home/icon-approach-2.svg",
    text: "Strategic design beats over-design.",
    from: "rgba(179,222,193,0.2)",
    to: "rgba(179,222,193,0.35)",
  },
  {
    icon: "/home/icon-approach-3.svg",
    text: "Done > perfect",
    from: "rgba(202,187,233,0.2)",
    to: "rgba(202,187,233,0.35)",
  },
  {
    icon: "/home/icon-approach-4.svg",
    text: "Don't design in a vacuum",
    from: "rgba(255,173,173,0.2)",
    to: "rgba(255,173,173,0.35)",
  },
];

export function Approach() {
  return (
    <section className="flex w-full flex-col items-center px-6 py-16 md:px-[72px] md:py-[100px]">
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            My approach
          </h2>
          <p className="text-base tracking-[0.2px] text-muted">
            I combine UX thinking with product strategy to design scalable
            solutions that solve real user needs, align with business goals,
            and are built to last (not just sit in Figma). No fluff. No
            over-design. Just thoughtful, tested solutions that work.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.text}
              className="flex flex-col items-start gap-4 rounded-2xl p-6"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${p.from}, ${p.to})`,
              }}
            >
              <img
                src={p.icon}
                alt=""
                className="h-[50px] w-12 object-contain object-left"
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
