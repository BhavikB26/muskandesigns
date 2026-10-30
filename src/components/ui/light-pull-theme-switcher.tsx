"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { switchTheme, useTheme } from "@/components/theme-toggle";

/*
 * Light Pull theme switcher (21st.dev): a cord hanging from the top of the screen, with a bob on the end. Pull
 * it down and the theme flips. By day the bob is a warm sun; by night, a moon in the site's violet.
 *
 * Local changes: framer-motion (already in the project, the same library as `motion`); it drives the site's
 * own theme (data-theme, remembered, with the circular reveal from the bob) instead of toggling a `dark` class;
 * the cord follows the header's text colour, so it reads over the hero; it is a real switch, so a click, tap or
 * the keyboard work too. Sits in a box as tall as the header: give the parent a height.
 */
export function LightPullThemeSwitcher({ className = "" }: { className?: string }) {
  const dark = useTheme() === "dark";
  const bob = useRef<HTMLSpanElement>(null);
  const pulled = useRef(false);

  return (
    <div className={`relative h-full w-10 shrink-0 ${className}`}>
      <motion.button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-label="Dark theme"
        title="Pull to switch theme"
        drag="y"
        dragDirectionLock
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.45}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        whileHover={{ y: 3 }}
        whileDrag={{ cursor: "grabbing" }}
        onDragStart={() => {
          pulled.current = true;
        }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 12) switchTheme(bob.current);
          // a click can follow the drag's release, or not: either way, the next click is a real one
          setTimeout(() => {
            pulled.current = false;
          }, 60);
        }}
        onClick={() => {
          // The click that ends a drag has already been handled by onDragEnd.
          if (!pulled.current) switchTheme(bob.current);
        }}
        className="absolute inset-x-0 top-[14px] flex h-11 cursor-grab touch-none items-end justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span
          ref={bob}
          aria-hidden
          className="relative mb-1 block size-[22px] rounded-full transition-[background,box-shadow] duration-500"
          style={
            dark
              ? { background: "radial-gradient(circle at 35% 30%, #f1eeff, #b4a8ff 62%, #7a68e8)", boxShadow: "0 0 16px 4px rgba(180, 168, 255, 0.5)" }
              : { background: "radial-gradient(circle at center, #facc15, #fcd34d, #fef9c3)", boxShadow: "0 0 16px 5px rgba(250, 204, 21, 0.5)" }
          }
        >
          {/* the cord: runs up off the top of the screen, so it stretches as the bob is pulled */}
          <span className="absolute bottom-full left-1/2 h-[9999px] w-[1.5px] -translate-x-1/2 bg-ink/45" />
        </span>
      </motion.button>
    </div>
  );
}
