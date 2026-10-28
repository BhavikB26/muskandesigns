"use client";

import { useEffect } from "react";

/**
 * While the header floats over the hero footage ([data-hero]) it takes the hero's light-on-dark tone
 * (data-over-hero on the header). It returns to the site's glass once the hero has scrolled away, or once
 * the section that comes out of the hero ([data-hero-cover]) has reached the header.
 */
export function HeaderTone({ headerId }: { headerId: string }) {
  useEffect(() => {
    const header = document.getElementById(headerId);
    const hero = document.querySelector("[data-hero]");
    if (!header || !hero) return;
    const cover = document.querySelector("[data-hero-cover]");
    const update = () => {
      const h = header.offsetHeight;
      const heroGone = hero.getBoundingClientRect().bottom <= h;
      const covered = cover ? cover.getBoundingClientRect().top <= h : false;
      if (heroGone || covered) delete header.dataset.overHero;
      else header.dataset.overHero = "";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete header.dataset.overHero;
    };
  }, [headerId]);
  return null;
}
