import type { CSSProperties, ReactNode } from "react";
import {
  Award,
  BadgeCheck,
  Blocks,
  BookOpen,
  Bot,
  Building2,
  Circle,
  ClipboardCheck,
  Cloud,
  Component,
  Compass,
  GraduationCap,
  Layers,
  LayoutGrid,
  ListChecks,
  Lock,
  MonitorPlay,
  MousePointerClick,
  Palette,
  Ruler,
  Shapes,
  Sparkles,
  SquareDashed,
  Trophy,
  Type,
  Workflow,
} from "lucide-react";

/*
 * Animated bento covers (after Muskan's screen-recording reference: a tech-stack bento): one wide card with
 * tools riding a rotating arc, and three below: chips lighting up in turn along a line, an icon carousel with
 * a label above the centre, and a bar filling while a list appears. All CSS loops sized in cqw of the square
 * cover; they hold still under reduced motion or when the site's motion is paused.
 */

type Item = { label: string; icon: ReactNode };
type Bento = {
  accent: string;
  /** the wide top card */
  arc: { title: string; icon: ReactNode; items: Item[] };
  /** the accent card: chips that light up one after another */
  chips: { title: string; icon: ReactNode; items: string[] };
  /** the carousel card */
  carousel: { title: string; icon: ReactNode; items: Item[] };
  /** the progress card */
  progress: { title: string; icon: ReactNode; items: Item[] };
};

const i = (C: typeof Cloud) => <C aria-hidden strokeWidth={2} />;

export const BENTOS: Record<string, Bento> = {
  "builder-design-system": {
    accent: "#6b4fd8",
    arc: {
      title: "Foundations",
      icon: i(Layers),
      items: [
        { label: "Colour", icon: i(Palette) },
        { label: "Type", icon: i(Type) },
        { label: "Spacing", icon: i(Ruler) },
        { label: "Radius", icon: i(SquareDashed) },
        { label: "Icons", icon: i(Shapes) },
        { label: "Variables", icon: i(Sparkles) },
      ],
    },
    chips: { title: "Components", icon: i(Component), items: ["Button", "Base card", "Side nav", "Table", "Side panel", "Composer"] },
    carousel: {
      title: "States",
      icon: i(MousePointerClick),
      items: [
        { label: "Default", icon: i(Circle) },
        { label: "Hover", icon: i(MousePointerClick) },
        { label: "Focus", icon: i(SquareDashed) },
        { label: "Listening", icon: i(Bot) },
        { label: "Thinking", icon: i(Sparkles) },
      ],
    },
    progress: {
      title: "Products",
      icon: i(LayoutGrid),
      items: [
        { label: "Cloud", icon: i(Cloud) },
        { label: "Studio", icon: i(Blocks) },
        { label: "Enterprise", icon: i(Building2) },
      ],
    },
  },
  "builder-university": {
    accent: "#13806f",
    arc: {
      title: "Learning plan",
      icon: i(Compass),
      items: [
        { label: "Onboarding", icon: i(BookOpen) },
        { label: "Product", icon: i(Blocks) },
        { label: "Process", icon: i(Workflow) },
        { label: "Tools", icon: i(LayoutGrid) },
        { label: "Assessment", icon: i(ClipboardCheck) },
        { label: "Certificate", icon: i(GraduationCap) },
      ],
    },
    chips: { title: "Your path", icon: i(ListChecks), items: ["Welcome", "Builder 101", "Studio", "Delivery", "Quiz", "Locked"] },
    carousel: {
      title: "Achievements",
      icon: i(Trophy),
      items: [
        { label: "Bronze", icon: i(Award) },
        { label: "Silver", icon: i(Award) },
        { label: "Gold", icon: i(Trophy) },
        { label: "Course done", icon: i(BadgeCheck) },
        { label: "Video lesson", icon: i(MonitorPlay) },
      ],
    },
    progress: {
      title: "Plan progress",
      icon: i(GraduationCap),
      items: [
        { label: "Product tour", icon: i(BookOpen) },
        { label: "Process", icon: i(Workflow) },
        { label: "Assessment", icon: i(Lock) },
      ],
    },
  },
};

function Head({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="bn-head">
      <span className="bn-head__icon">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

export function BentoCover({ slug }: { slug: string }) {
  const b = BENTOS[slug];
  if (!b) return null;
  // the arc carries its tools twice, 30deg apart, so three or four ride the visible top at once
  const arcItems = [...b.arc.items, ...b.arc.items];
  const arcN = arcItems.length;
  const carN = b.carousel.items.length;
  const chipN = b.chips.items.length;
  const progN = b.progress.items.length;
  return (
    <div className="bn" style={{ "--bn-accent": b.accent } as CSSProperties} aria-hidden>
      {/* wide card: tools riding a rotating arc */}
      <div className="bn-card bn-card--wide">
        <Head icon={b.arc.icon} title={b.arc.title} />
        <div className="bn-arc">
          <div className="bn-arc__glow" />
          <div className="bn-arc__ring">
            {arcItems.map((it, k) => (
              <div key={k} className="bn-arc__spoke" style={{ "--a": `${(360 / arcN) * k}deg` } as CSSProperties}>
                <div className="bn-arc__item">
                  <div className="bn-arc__spin">
                    <span className="bn-arc__label">{it.label}</span>
                    <span className="bn-dot">{it.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* accent card: chips light up one after another along a line */}
      <div className="bn-card bn-card--accent">
        <Head icon={b.chips.icon} title={b.chips.title} />
        <div className="bn-chips" style={{ "--n": chipN } as CSSProperties}>
          <span className="bn-chips__line" />
          {b.chips.items.map((c, k) => (
            <span key={c} className={`bn-chip ${k % 2 ? "bn-chip--r" : ""}`} style={{ "--k": k } as CSSProperties}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* carousel card: icons slide past the centre, its label above */}
      <div className="bn-card">
        <Head icon={b.carousel.icon} title={b.carousel.title} />
        <div className="bn-car" style={{ "--n": carN } as CSSProperties}>
          <div className="bn-car__labels">
            {b.carousel.items.map((it, k) => (
              <span key={it.label} className="bn-car__label" style={{ "--k": k } as CSSProperties}>
                {it.label}
              </span>
            ))}
          </div>
          <span className="bn-car__stem" />
          {b.carousel.items.map((it, k) => (
            <span key={it.label} className="bn-car__item" style={{ "--k": k } as CSSProperties}>
              <span className="bn-dot">{it.icon}</span>
            </span>
          ))}
        </div>
      </div>

      {/* progress card: a bar fills while the list appears */}
      <div className="bn-card">
        <Head icon={b.progress.icon} title={b.progress.title} />
        <div className="bn-prog" style={{ "--n": progN } as CSSProperties}>
          <span className="bn-prog__bar">
            <span className="bn-prog__fill" />
          </span>
          {b.progress.items.map((it, k) => (
            <span key={it.label} className="bn-prog__row" style={{ "--k": k } as CSSProperties}>
              <span className="bn-prog__icon">{it.icon}</span>
              {it.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
