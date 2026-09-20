"use client";

import type { CellState } from "@/data/derive";
import { cn } from "@/lib/utils";

interface MatrixCellProps {
  state: CellState;
  divisionName: string;
  typeName: string;
  pressed: boolean;
  onClick: () => void;
  /** Largest count in the matrix, for density shading. */
  max: number;
}

export function cellLabel(state: CellState, divisionName: string, typeName: string): string {
  const head = `${divisionName} × ${typeName}`;
  if (state.kind === "count") {
    const more = state.pending > 0 ? `, plus ${state.pending} not yet classified` : "";
    return `${head}: ${state.count} delivered${more}`;
  }
  if (state.kind === "empty") return `${head}: 0 delivered`;
  return `${head}: not yet supplied for ${state.pending} completed projects`;
}

/** A small density block. Empty stays empty. Unknown is hatched, never zero. */
export function MatrixCell({ state, divisionName, typeName, pressed, onClick, max }: MatrixCellProps) {
  const label = cellLabel(state, divisionName, typeName);
  const tipId = `tip-${divisionName}-${typeName}`.replace(/[^a-z0-9-]/gi, "-");

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={pressed}
        aria-label={label}
        aria-describedby={state.kind === "count" ? tipId : undefined}
        className={cn(
          "num relative flex h-16 w-full items-center justify-center rounded-md border text-lg transition-colors duration-300 ease-[var(--ease-calm)] sm:h-20",
          state.kind === "count" && "border-line-strong/60 text-foreground",
          state.kind === "empty" && "border-border text-transparent",
          state.kind === "unsupplied" &&
            "border-dashed border-muted-foreground/50 bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--border)_6px_7px)] text-xs text-muted-foreground",
          pressed && "border-foreground ring-1 ring-foreground",
        )}
        style={
          state.kind === "count"
            ? { backgroundColor: `color-mix(in oklab, var(--line-strong) ${15 + (state.count / Math.max(max, 1)) * 30}%, transparent)` }
            : undefined
        }
      >
        {state.kind === "count" && state.count}
        {state.kind === "unsupplied" && <span aria-hidden="true">n/s</span>}
      </button>

      {state.kind === "count" && (
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-max max-w-56 -translate-x-1/2 rounded-md border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-sm group-focus-within:block group-hover:block"
        >
          {state.projects.map((p) => p.name).join(", ")}
        </span>
      )}
    </div>
  );
}
