"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

// The WebGL lens is code-split and only fetched on wide screens; phones keep the static sky backdrop.
const MosaicLens = dynamic(() => import("@/components/home/mosaic-lens").then((m) => m.MosaicLens), { ssr: false });

const QUERY = "(min-width: 768px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function HeroLens() {
  const wide = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  return wide ? <MosaicLens /> : null;
}
