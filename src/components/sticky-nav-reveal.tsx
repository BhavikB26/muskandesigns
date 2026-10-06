"use client";

import { useEffect, useState, type ReactNode } from "react";

export function StickyNavReveal({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function update() {
      const hero = document.getElementById("hero");
      const limit = hero ? hero.offsetTop + hero.offsetHeight - 72 : 600;
      setShow(window.scrollY > limit);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      inert={!show}
      aria-hidden={!show}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}
