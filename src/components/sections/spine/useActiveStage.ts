"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Index of the stage whose [data-stage-index] element crosses the vertical centre of the viewport.
 * Read-only: it observes scroll, it never intercepts it. Elements with display:none never intersect,
 * so hidden presentation modes stay idle.
 */
export function useActiveStage(rootRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-stage-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.stageIndex));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);

  return active;
}
