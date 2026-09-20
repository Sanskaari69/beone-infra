import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DrawBorderProps {
  children: ReactNode;
  className?: string;
  /** Keeps the border drawn (for pressed or selected states). */
  active?: boolean;
}

/** Wrapper whose border draws in from the top-left corner on hover, focus or when active. */
export function DrawBorder({ children, className, active }: DrawBorderProps) {
  return (
    <div className={cn("draw-border", className)} data-active={active ? "true" : undefined}>
      {children}
      <svg className="draw-border__svg" aria-hidden="true">
        <rect pathLength={1} />
      </svg>
    </div>
  );
}
