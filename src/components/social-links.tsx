/** LinkedIn, resume and Instagram as circular icon buttons (used by every footer). */
const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thisismuskan/", icon: "linkedin", note: "opens in a new tab" },
  { label: "Resume", href: "/resume.pdf", icon: "resume", note: "PDF, opens in a new tab" },
  { label: "Instagram", href: "https://www.instagram.com/_muskanb07_/", icon: "instagram", note: "opens in a new tab" },
] as const;

function Icon({ name }: { name: (typeof LINKS)[number]["icon"] }) {
  if (name === "linkedin")
    return (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="size-[18px]" fill="currentColor">
        <circle cx="4.2" cy="4.4" r="2.6" />
        <rect x="1.9" y="8.6" width="4.6" height="13.4" rx="0.4" />
        <path d="M9.4 8.6h4.4v1.9c.7-1.2 2.2-2.3 4.4-2.3 4.3 0 5.1 2.8 5.1 6.4V22h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V22H9.4z" />
      </svg>
    );
  if (name === "resume")
    return (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="size-[19px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2.75H7A2.25 2.25 0 0 0 4.75 5v14A2.25 2.25 0 0 0 7 21.25h10A2.25 2.25 0 0 0 19.25 19V8z" />
        <path d="M14 2.75V8h5.25M8.5 12.5h7M8.5 16h5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="size-[19px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** onCard: the buttons sit one surface higher when placed on a card. */
export function SocialLinks({ className = "", onCard = false }: { className?: string; onCard?: boolean }) {
  return (
    <ul className={`flex items-center gap-fr-xs ${className}`}>
      {LINKS.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className={`btn-icon size-12 pointer-coarse:size-12 ${onCard ? "bg-surface-2!" : ""}`} title={l.label}>
            <Icon name={l.icon} />
            <span className="sr-only">
              {l.label} ({l.note})
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
