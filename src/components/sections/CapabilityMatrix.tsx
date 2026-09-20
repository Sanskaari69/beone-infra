"use client";

import { divisions, projects } from "@/data/beone";
import { cellState, type CellState } from "@/data/derive";
import { PROJECT_TYPES, type DivisionId, type ProjectType } from "@/data/schema";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { useFilter } from "@/state/filter";
import { cn } from "@/lib/utils";
import { MatrixCell } from "./MatrixCell";

const typeName = (t: ProjectType) => t.charAt(0).toUpperCase() + t.slice(1);

export function CapabilityMatrix() {
  const { filter, toggleCell, toggleDivision, toggleType } = useFilter();

  const cells = new Map<string, CellState>();
  let max = 0;
  for (const d of divisions)
    for (const t of PROJECT_TYPES) {
      const s = cellState(projects, d.id, t);
      cells.set(`${d.id}:${t}`, s);
      if (s.kind === "count") max = Math.max(max, s.count);
    }
  const get = (d: DivisionId, t: ProjectType) => cells.get(`${d.toString()}:${t}`)!;
  const pressed = (d: DivisionId, t: ProjectType) => filter.division === d && filter.type === t;

  const header =
    "num text-xs uppercase tracking-[0.12em] rounded-md px-2 py-2 text-muted-foreground transition-colors hover:text-foreground aria-pressed:text-foreground";

  return (
    <section id="capability" aria-labelledby="capability-title" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="02"
          id="capability-title"
          lead="Delivered projects by division and project type. Select a cell to filter the dossiers below."
        >
          Capability matrix
        </SectionHeading>

        <Reveal>
          {/* sm and up: a real matrix */}
          <table className="hidden w-full table-fixed border-separate border-spacing-2 sm:table">
            <caption className="sr-only">Delivered projects by division and project type</caption>
            <thead>
              <tr>
                <th className="w-40 lg:w-52" scope="col">
                  <span className="sr-only">Division</span>
                </th>
                {PROJECT_TYPES.map((t) => (
                  <th key={t} scope="col" className="font-normal">
                    <button
                      type="button"
                      className={header}
                      aria-pressed={filter.type === t && filter.division === null}
                      onClick={() => toggleType(t)}
                    >
                      {typeName(t)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {divisions.map((d) => (
                <tr key={d.id}>
                  <th scope="row" className="pr-2 text-left font-normal">
                    <button
                      type="button"
                      className={cn(header, "w-full text-left font-sans normal-case tracking-normal")}
                      aria-pressed={filter.division === d.id && filter.type === null}
                      onClick={() => toggleDivision(d.id)}
                    >
                      <span className="text-sm">{d.name}</span>
                    </button>
                  </th>
                  {PROJECT_TYPES.map((t) => (
                    <td key={t}>
                      <MatrixCell
                        state={get(d.id, t)}
                        divisionName={d.name}
                        typeName={typeName(t)}
                        pressed={pressed(d.id, t)}
                        onClick={() => toggleCell(d.id, t)}
                        max={max}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* below sm: one block per division, type chips inside */}
          <div className="space-y-8 sm:hidden">
            {divisions.map((d) => (
              <div key={d.id}>
                <h3 className="text-base font-medium">{d.name}</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <li key={t}>
                      <p className="num mb-1 text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">{typeName(t)}</p>
                      <MatrixCell
                        state={get(d.id, t)}
                        divisionName={d.name}
                        typeName={typeName(t)}
                        pressed={pressed(d.id, t)}
                        onClick={() => toggleCell(d.id, t)}
                        max={max}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <dl className="num mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <dt className="size-4 rounded-sm border border-line-strong/60 bg-line-strong/25" />
            <dd>Delivered projects, count shown</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="size-4 rounded-sm border border-border" />
            <dd>None delivered</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="size-4 rounded-sm border border-dashed border-muted-foreground/50 bg-[repeating-linear-gradient(135deg,transparent_0_3px,var(--border)_3px_4px)]" />
            <dd>n/s: not yet supplied</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
