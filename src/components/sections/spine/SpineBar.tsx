"use client";

import { useRef, type KeyboardEvent } from "react";
import { spineStages } from "@/data/beone";
import type { SpineStage } from "@/data/schema";
import { cn } from "@/lib/utils";

/**
 * Colour rules. Orange only marks the active stage (and in-house stages once confirmed).
 * In-house: primary, thick. Partner: navy, thin. Unconfirmed: dashed neutral.
 */
function segmentClass(o: SpineStage["ownership"]): string {
  if (o.status === "PLACEHOLDER" || o.value === "unconfirmed")
    return "h-2 border border-dashed border-muted-foreground/60 bg-transparent";
  return o.value === "in-house" ? "h-2 bg-primary" : "h-[3px] bg-secondary";
}

interface SpineBarProps {
  /** Active stage index. Omit for the static, non-interactive diagram. */
  active?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

export function SpineBar({ active, onSelect, className }: SpineBarProps) {
  const interactive = onSelect !== undefined && active !== undefined;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const last = spineStages.length - 1;
    const map: Record<string, number> = {
      ArrowRight: Math.min(last, active + 1),
      ArrowLeft: Math.max(0, active - 1),
      Home: 0,
      End: last,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = map[e.key];
    onSelect(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role={interactive ? "group" : undefined}
      aria-label={interactive ? "Project lifecycle stages" : undefined}
      onKeyDown={onKeyDown}
      className={cn("grid grid-cols-9 gap-1.5", className)}
    >
      {spineStages.map((s, i) => {
        const isActive = interactive && i === active;
        const inner = (
          <>
            <span
              className={cn(
                "block w-full rounded-[2px] transition-[box-shadow] duration-300 ease-[var(--ease-calm)]",
                segmentClass(s.ownership),
                isActive && "shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--primary-text)]",
              )}
            />
            <span
              className={cn(
                "num mt-3 block text-[0.65rem] uppercase tracking-[0.08em] transition-colors duration-300 lg:text-xs",
                isActive ? "text-primary-text" : "text-muted-foreground",
              )}
            >
              <span className="block">{String(i + 1).padStart(2, "0")}</span>
              <span className="block break-words">{s.label}</span>
            </span>
          </>
        );

        return interactive ? (
          <button
            key={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            tabIndex={isActive ? 0 : -1}
            aria-current={isActive ? "step" : undefined}
            aria-label={`Stage ${i + 1} of ${spineStages.length}: ${s.label}`}
            onClick={() => onSelect(i)}
            className="min-w-0 rounded-md px-0.5 py-2 text-left hover:opacity-100"
          >
            {inner}
          </button>
        ) : (
          <div key={s.id} className="min-w-0 px-0.5 py-2">
            {inner}
          </div>
        );
      })}
    </div>
  );
}
