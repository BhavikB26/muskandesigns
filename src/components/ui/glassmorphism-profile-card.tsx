"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Clock, Copy, Plus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Glassmorphism Profile Card (21st.dev): a frosted card with a status line and a clock, a large portrait,
 * name and role, two actions, and a glowing tab peeking out underneath.
 *
 * Local changes: plain elements in the site's tokens instead of shadcn's Card and Button (this project has
 * neither, nor shadcn's colour tokens); the clock shows a fixed time zone (where she is, not the visitor) and
 * is set after mounting so server and browser render the same; the primary action can be a link; the glow
 * colour is a prop; `children` adds a decoration to the card (her waving "Hi").
 */

interface ComponentProps {
  name?: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  statusText?: string;
  statusColor?: string;
  glowText?: string;
  /** The glow under the card (any CSS colour). */
  glowColor?: string;
  /** IANA time zone for the clock, e.g. "Asia/Kolkata". */
  timeZone?: string;
  /** Short label after the time, e.g. "IST". */
  timeLabel?: string;
  /** The first action. A link when `primaryHref` is set; null for none (copy email then spans the card). */
  primaryLabel?: string | null;
  /** The first action's icon; null for none. */
  primaryIcon?: ReactNode;
  primaryHref?: string;
  className?: string;
  children?: ReactNode;
}

export default function Component({
  name = "Berat Berkay",
  role = "Developer",
  email = "beratberkaygokdemir@gmail.com",
  avatarSrc = "/home/muskan-portrait-full.webp",
  avatarAlt,
  statusText = "Available for work",
  statusColor = "bg-lime-500",
  glowText = "Currently High on Creativity",
  glowColor = "#a3e635",
  timeZone,
  timeLabel,
  primaryLabel = "Hire Me",
  primaryIcon = <Plus className="size-4" aria-hidden />,
  primaryHref,
  className,
  children,
}: ComponentProps) {
  const [copied, setCopied] = useState(false);
  const [timeText, setTimeText] = useState("");

  // The time where she is, refreshed each minute. Set after mounting: the server's clock would differ.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone });
    const tick = () => setTimeText(fmt.format(new Date()).replace(" ", ""));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  const handleCopy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Older browsers, or the Clipboard API blocked: copy through a hidden, selected field.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(field);
      field.select();
      try {
        ok = document.execCommand("copy");
      } catch {}
      field.remove();
    }
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const action =
    "flex h-12 items-center justify-start gap-3 rounded-2xl border border-line bg-background/60 px-4 text-sm font-medium text-ink transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("relative w-full max-w-sm", className)}
    >
      {/* The glowing tab peeking out under the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 -bottom-10 top-[90%] z-0 rounded-[28px]"
        style={{ background: glowColor, boxShadow: `0 40px 80px -16px color-mix(in srgb, ${glowColor} 80%, transparent)` }}
      />
      <div className="absolute inset-x-0 -bottom-10 z-0 mx-auto w-full">
        <p className="flex items-center justify-center gap-2 py-3 text-center text-sm font-medium text-[#151412]">
          <Zap className="size-4" aria-hidden /> {glowText}
        </p>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full rounded-[20px] text-ink",
          // more frosted than the original, so the glow underneath doesn't tint the actions; the site's own
          // tokens (they follow its theme switch, which `dark:` would not: that follows the system setting)
          "bg-card/80 backdrop-blur-xl",
          "border border-line",
          "shadow-lg shadow-black/10",
        )}
      >
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between text-sm text-muted">
            <div className="flex items-center gap-2">
              <span aria-hidden className={cn("inline-block size-2.5 animate-pulse rounded-full motion-reduce:animate-none", statusColor)} />
              <span className="select-none">{statusText}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Clock className="size-4" aria-hidden />
              <span className="tabular-nums">
                {timeText}
                {timeText && timeLabel ? ` ${timeLabel}` : ""}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-5">
            <div className="relative size-52 shrink-0 overflow-hidden rounded-[20px] ring-2 ring-white/10">
              <Image src={avatarSrc} alt={avatarAlt ?? `${name}`} fill sizes="208px" className="object-cover object-[50%_22%]" />
            </div>
            <div className="min-w-0 text-center">
              <h3 className="truncate font-display text-[length:var(--fs-h3)] font-semibold tracking-tight">{name}</h3>
              <p className="mt-0.5 text-sm text-muted">{role}</p>
            </div>
          </div>

          <div className={cn("mt-6 grid grid-cols-1 gap-4", primaryLabel && "sm:grid-cols-2")}>
            {!primaryLabel ? null : primaryHref ? (
              <a href={primaryHref} className={action}>
                {primaryIcon} {primaryLabel}
              </a>
            ) : (
              <button type="button" className={action}>
                {primaryIcon} {primaryLabel}
              </button>
            )}
            <button type="button" onClick={handleCopy} className={action}>
              {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
            </button>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
