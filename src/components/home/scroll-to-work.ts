/*
 * "Case studies" on the home page: the section comes out of the hero's monitor over one screen of scrolling,
 * so an anchor jump lands mid-way (the section is still a small, skewed screen). Instead scroll to the point
 * where it has finished opening (one hero height down), where it fills the whole screen; the scroll-driven
 * transition itself is left as it is.
 */
type Lenis = { scrollTo: (t: number, o?: { immediate?: boolean; duration?: number }) => void };

export function workTop(): number | null {
  const hero = document.querySelector("[data-hero]");
  const work = document.getElementById("work");
  if (!work) return null;
  const pinned = document.querySelector("[data-hero-cover]");
  // Without the pinned transition (reduced motion) the section is in normal flow: its own top, under the header.
  if (!pinned || !hero) return work.getBoundingClientRect().top + window.scrollY - 68;
  return Math.ceil(hero.getBoundingClientRect().height) + 1;
}

export function scrollToWork(reduced: boolean, immediate = false) {
  const y = workTop();
  if (y == null) return false;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(y, { immediate: reduced || immediate });
  else window.scrollTo({ top: y, behavior: reduced || immediate ? "auto" : "smooth" });
  history.replaceState(null, "", "/#work");
  return true;
}
