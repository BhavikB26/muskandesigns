/**
 * The right-hand side of an iOS status bar (signal, wifi, battery), drawn to match the real ones in the
 * Internshala screens, so every phone mockup's status bar looks the same. Sized by its parent's font-size.
 */
export function IosStatusIcons({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 67 12" className={`h-[1em] w-auto ${className}`} fill="currentColor">
      {/* signal: four bars, rising */}
      <rect x="0" y="8" width="3" height="4" rx="0.8" />
      <rect x="4.6" y="5.8" width="3" height="6.2" rx="0.8" />
      <rect x="9.2" y="3.4" width="3" height="8.6" rx="0.8" />
      <rect x="13.8" y="1" width="3" height="11" rx="0.8" />
      {/* wifi: three arcs and a dot */}
      <path d="M28.5 11.6 30.4 9.5a2.8 2.8 0 0 0-3.8 0Z" />
      <path d="M24.9 7.9a5.3 5.3 0 0 1 7.2 0l1.3-1.4a7.2 7.2 0 0 0-9.8 0Z" />
      <path d="M22.3 5.1a9 9 0 0 1 12.4 0L36 3.8a10.9 10.9 0 0 0-15 0Z" />
      {/* battery: outline, charge, cap */}
      <rect x="41.5" y="0.75" width="22" height="10.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
      <rect x="43.3" y="2.5" width="18.4" height="7" rx="1.8" />
      <path d="M64.8 4.2v3.6a1.9 1.9 0 0 0 0-3.6Z" opacity="0.45" />
    </svg>
  );
}
