"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Position in a staggered group. Delay = index × 40ms. */
  index?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
  /** Play on first paint (above the fold). Pure CSS: works before hydration and without JS. */
  immediate?: boolean;
}

/**
 * 12px rise + fade, staggered 40ms. Motion is CSS (see globals.css); the observer only flips
 * data-in when the element scrolls into view. Reduced motion renders the final state in CSS,
 * never hides content. The <noscript> rule in layout.tsx does the same without JS.
 */
export function Reveal({ children, index = 0, as = "div", className, immediate }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      className={[immediate ? "reveal-now" : "reveal", className].filter(Boolean).join(" ")}
      style={{ "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
