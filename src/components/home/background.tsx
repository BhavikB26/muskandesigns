import { MaskedText } from "@/components/masked-text";
import ProfileCard from "@/components/ui/glassmorphism-profile-card";
import { EMAIL } from "@/components/site-header";
import { about } from "@/content/about";

/** Simple line icons for the chips (drawn for this site). */
function ChipIcon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] shrink-0">
      {name === "puzzle" && <path {...p} d="M9 4h3v2a2 2 0 1 0 4 0V4h3v5h-2a2 2 0 1 0 0 4h2v7h-6v-2a2 2 0 1 0-4 0v2H4v-6h2a2 2 0 1 0 0-4H4V4z" />}
      {name === "cancer" && (
        <g {...p}>
          <circle cx="7.5" cy="9" r="2.6" />
          <circle cx="16.5" cy="15" r="2.6" />
          <path d="M10 9c2-3.4 7-3.6 10-1.2M14 15c-2 3.4-7 3.6-10 1.2" />
        </g>
      )}
      {name === "brain" && <path {...p} d="M12 5.5a3 3 0 0 0-5.6-1.3A3 3 0 0 0 4 9a3 3 0 0 0 .7 5.4A3.3 3.3 0 0 0 9 18.6a3 3 0 0 0 3 1.4M12 5.5a3 3 0 0 1 5.6-1.3A3 3 0 0 1 20 9a3 3 0 0 1-.7 5.4 3.3 3.3 0 0 1-4.3 4.2 3 3 0 0 1-3 1.4M12 5.5V20" />}
    </svg>
  );
}

export function Background() {
  return (
    <section id="about" aria-labelledby="about-heading" className="w-full scroll-mt-20 px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-fr-xxl md:grid-cols-12 md:gap-x-fr-xxl lg:gap-x-[72px]">
        <div data-reveal className="md:col-span-5">
          {/* Her profile card (21st.dev Glassmorphism Profile Card). */}
          <div className="mx-auto mb-12 flex justify-center md:sticky md:top-28">
            <ProfileCard
              name="Muskan Bhatia"
              role="Product Designer"
              email={EMAIL}
              avatarSrc="/home/muskan-portrait-full.webp"
              avatarAlt="Muskan Bhatia smiling, standing by a painted wall"
              statusText="Available for work"
              statusColor="bg-[#7ccf8a]"
              glowText="Currently high on creativity"
              glowColor="#b4a8ff"
              timeZone="Asia/Kolkata"
              timeLabel="IST"
              primaryLabel={null}
            />
          </div>
        </div>

        <div className="flex flex-col gap-fr-xxl md:col-span-7">
          <div data-reveal className="flex flex-col gap-fr-lg">
                        <h2 id="about-heading" className="t-display-xl">
              <MaskedText text={about.headline.lead} onReveal />{" "}
              <em className="font-serif italic text-ink">
                <MaskedText text={about.headline.italic} start={about.headline.lead.split(" ").length} onReveal />
              </em>
            </h2>
            <ul className="flex flex-wrap gap-fr-xs">
              {about.chips.map((c) => (
                <li
                  key={c.label}
                  className="tinted t-body-sm flex items-center gap-fr-xs rounded-fr-sm px-fr-sm py-fr-xs text-ink"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  <ChipIcon name={c.icon} />
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="t-body-lg flex max-w-[60ch] flex-col gap-fr-md text-ink-soft">
              {about.paragraphs.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
