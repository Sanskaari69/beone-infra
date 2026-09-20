"use client";

import { divisions, projects } from "@/data/beone";
import { filterProjects } from "@/data/derive";
import type { Project } from "@/data/schema";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/ui/button";
import { useFilter } from "@/state/filter";
import { Dossier } from "./Dossier";

// Delivered work first, then what is on site, then what is next.
const ORDER: Record<Project["status"], number> = { completed: 0, ongoing: 1, upcoming: 2 };
const sorted = [...projects].sort((a, b) => ORDER[a.status] - ORDER[b.status]);

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function DossierList() {
  const { filter, active, clear } = useFilter();
  const { shown, undetermined } = filterProjects(sorted, filter);

  const parts = [
    filter.division && divisions.find((d) => d.id === filter.division)?.name,
    filter.type && cap(filter.type),
  ].filter(Boolean);

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="03"
          id="projects-title"
          lead="Each project as a spec sheet. Use the matrix above to filter."
        >
          Project dossiers
        </SectionHeading>

        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm" aria-live="polite">
          <p className="num text-muted-foreground">
            {active ? `Filtering: ${parts.join(" × ")}. ` : ""}
            Showing {shown.length} of {sorted.length} projects.
            {active && undetermined > 0 && ` ${undetermined} cannot be judged yet: type or division not supplied.`}
          </p>
          {active && (
            <Button variant="outline" size="sm" onClick={clear}>
              Clear filter
            </Button>
          )}
        </div>

        {shown.length === 0 ? (
          <p className="num rounded-lg border border-dashed border-border p-8 text-sm text-muted-foreground">
            No project matches this filter on the information supplied so far.
          </p>
        ) : (
          <ul className="space-y-10">
            {shown.map((p, i) => (
              <Reveal as="li" key={p.id} index={i % 3}>
                <Dossier project={p} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
