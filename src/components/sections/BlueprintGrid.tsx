"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle blueprint grid. Shifts up to ±4px with the pointer. One slow sweep line.
 * Pointer motion is skipped on touch devices and under reduced motion.
 */
export function BlueprintGrid() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = grid.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={grid}
        className="absolute -inset-4 transition-transform duration-300 ease-[var(--ease-calm)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="sweep-line absolute inset-y-0 left-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, var(--chart-1), transparent)" }}
      />
    </div>
  );
}
