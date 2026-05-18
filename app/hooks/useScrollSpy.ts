"use client";

import { useEffect, useState } from "react";

const TRIGGER_PX = 110;

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      let active: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - TRIGGER_PX <= 0) {
          active = id;
        }
      }
      setActiveId(active);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return activeId;
}
