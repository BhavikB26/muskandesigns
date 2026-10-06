import Image from "next/image";

const traits = [
  { label: "ENFP-T", icon: "/home/icon-mbti.svg", bg: "bg-pink" },
  { label: "Cancer", icon: "/home/icon-zodiac.svg", bg: "bg-purple" },
  { label: "Enneagram 5", icon: "/home/icon-enneagram.svg", bg: "bg-green" },
];

export function About() {
  return (
    <section
      id="about"
      className="flex w-full flex-col items-center bg-[linear-gradient(150.53deg,rgba(202,187,233,0.149)_0%,rgba(255,173,173,0.102)_50%,rgba(179,222,193,0.102)_100%)] px-6 py-16 md:px-[72px] md:py-[100px]"
    >
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="relative h-[420px] w-full shrink-0 md:h-[659px] md:flex-1">
          <Image
            src="/home/about-photo.jpg"
            alt="Muskan"
            fill
            className="rounded-[8px] object-contain drop-shadow-[0px_10px_30px_rgba(0,0,0,0.15)]"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            I design like I have something to prove.{" "}
            <span className="whitespace-nowrap">I do.</span>
          </h2>
          <div className="flex flex-nowrap items-center gap-2 md:flex-wrap md:gap-4">
            {traits.map((trait) => (
              <div
                key={trait.label}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 md:gap-2 md:px-3 md:py-2 ${trait.bg}`}
              >
                <img
                  src={trait.icon}
                  alt=""
                  className="size-3.5 shrink-0 object-contain md:size-5"
                />
                <p className="whitespace-nowrap text-xs font-semibold tracking-[0.3px] text-ink md:text-base">
                  {trait.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-base tracking-[0.2px] text-[rgba(48,46,44,0.75)]">
            <p>
              I&rsquo;ve always been better at making things than explaining
              myself. Design was the first place that made sense to me, a
              blank page doesn&rsquo;t need you to perform, it just needs you
              to be honest.
            </p>
            <p>
              I worked across products, brands, and industries that had
              nothing in common except they all needed someone who cared too
              much. Recently I&rsquo;ve learned that being good at what you
              do isn&rsquo;t the same as being known for it. This site is me
              closing that gap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
