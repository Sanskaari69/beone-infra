import type { ReactNode } from "react";
import type { Datum } from "@/data/schema";
import { cn } from "@/lib/utils";

interface ValProps<T> {
  datum: Datum<T>;
  /** Render the value. Defaults to String(value). */
  render?: (value: T) => ReactNode;
  /** Fira Code with tabular figures. Use for numbers, dates, codes, areas, durations. */
  mono?: boolean;
  className?: string;
}

/**
 * Renders a content Datum.
 * VERIFIED    plain.
 * DRAFT       plain, flagged as awaiting approval.
 * PLACEHOLDER visible muted text: "Placeholder — to be supplied".
 */
export function Val<T>({ datum, render, mono, className }: ValProps<T>) {
  if (datum.status === "PLACEHOLDER") {
    return (
      <span
        className={cn("placeholder-mark text-muted-foreground italic", className)}
        title={datum.note}
      >
        Placeholder — to be supplied
      </span>
    );
  }

  const content = render ? render(datum.value) : String(datum.value);
  return (
    <span
      className={cn(mono && "num", datum.status === "DRAFT" && "draft-mark", className)}
      title={datum.status === "DRAFT" ? datum.note : undefined}
    >
      {content}
      {datum.status === "DRAFT" && <span className="sr-only"> (draft wording, awaiting approval)</span>}
    </span>
  );
}
