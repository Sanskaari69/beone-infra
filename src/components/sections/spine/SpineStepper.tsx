"use client";

import { useRef } from "react";
import { spineStages } from "@/data/beone";
import { cn } from "@/lib/utils";
import { StageDetail } from "./StageDetail";
import { useActiveStage } from "./useActiveStage";

/** Mobile: a vertical stepper in normal flow. No pinning. */
export function SpineStepper() {
  const root = useRef<HTMLDivElement>(null);
  const active = useActiveStage(root);
  const total = spineStages.length;

  return (
    <div ref={root}>
      <p
        className="num sticky top-14 z-10 border-b border-border bg-background py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
        aria-live="polite"
      >
        You are here{" "}
        <span className="ml-1 text-primary-text">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} {spineStages[active].label}
        </span>
      </p>

      <ol className="mt-6">
        {spineStages.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.id} data-stage-index={i} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 size-3 rounded-full border transition-colors duration-300",
                  isActive ? "border-primary-text bg-primary-text" : "border-muted-foreground/60 bg-background",
                )}
              />
              {i < total - 1 && (
                <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-5 w-px bg-border" />
              )}
              <StageDetail stage={s} index={i} />
              {isActive && <span className="sr-only">Current stage</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
