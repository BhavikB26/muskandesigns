"use client";

import InkOrbitFeatures, { type InkFeatures } from "@/components/ui/ink-orbit-features";
import { useTheme } from "@/components/theme-toggle";
import { useReducedMotion } from "@/components/use-reduced-motion";

/** BLOCK 4.0 at a glance, on the Ink Orbit features bento; the copy comes from Muskan's BLOCK case study. */
const BLOCK_FEATURES: InkFeatures = {
  tag: "BLOCK 4.0",
  title: "One *system*\nfor every product",
  collaboration: {
    title: "A shared redesign",
    description: "The Head of Design and a team of seven designers rebuilt BLOCK together. My part: complex cards, navigation and the AI experience.",
    team: ["Head of Design · direction", "Muskan · cards & navigation", "Designer · tables", "Designer · side panels", "Designer · foundations"],
    specs: ["Base card", "Side nav", "Table row", "Side panel", "Composer", "Voice bar"],
  },
  reports: {
    title: "Patterns, not one-offs",
    description: "Cards, navigation, tables, side panels and conversation components, each built from shared parts with defined states.",
  },
  integrations: {
    title: "A clear place for Natasha",
    description: "The same patterns carry across Cloud, Studio and Enterprise, with a persistent way to reach the assistant.",
    tools: ["Cloud", "Studio", "Enterprise", "Natasha"],
  },
  states: {
    title: "States are part of the spec",
    description: "Default, hover and focus are drawn for each component; colour variables cover Light, Dark and Error-checker modes.",
    states: ["Default", "Hover", "Focus"],
    modes: ["Light", "Dark", "Error"],
  },
};

export function BlockBento() {
  const theme = useTheme();
  const reduced = useReducedMotion();
  return <InkOrbitFeatures theme={theme} reduced={reduced} brand="BLOCK" features={BLOCK_FEATURES} />;
}
