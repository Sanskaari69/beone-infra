import type { ReactNode } from "react";

interface SectionHeadingProps {
  index: string;
  id: string;
  children: ReactNode;
  /** Optional one-line description. Plain and factual. */
  lead?: ReactNode;
}

/** Headings are nouns or plain statements, never questions. */
export function SectionHeading({ index, id, children, lead }: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="num text-xs uppercase tracking-[0.18em] text-muted-foreground">{index}</p>
      <h2 id={id} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {children}
      </h2>
      {lead && <p className="mt-3 text-base text-muted-foreground">{lead}</p>}
    </header>
  );
}
