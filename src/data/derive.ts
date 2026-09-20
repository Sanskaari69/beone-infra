/**
 * Derived data: matrix cells and dossier filtering. Computed from projects[], never typed twice.
 *
 * Honesty rule: a cell is "empty" only when we KNOW no delivered project sits in it.
 * If any completed project could still belong there (its type or division is not supplied),
 * the cell is "unsupplied", never zero.
 */
import type { DivisionId, Project, ProjectType } from "./schema";

export interface Filter {
  division: DivisionId | null;
  type: ProjectType | null;
}

export const NO_FILTER: Filter = { division: null, type: null };

export type Match = "match" | "excluded" | "unknown";

/** How a project relates to a (division, type) pair. Null on either side means "any". */
export function matchProject(p: Project, f: Filter): Match {
  let unknown = false;

  if (f.type) {
    if (p.types.status === "PLACEHOLDER") unknown = true;
    else if (!p.types.value.includes(f.type)) return "excluded";
  }
  if (f.division) {
    if (p.divisions.status === "PLACEHOLDER") unknown = true;
    else if (!p.divisions.value.includes(f.division)) return "excluded";
  }
  return unknown ? "unknown" : "match";
}

export type CellState =
  | { kind: "count"; count: number; projects: Project[]; pending: number }
  | { kind: "empty" }
  | { kind: "unsupplied"; pending: number };

/** Delivered (completed) projects only. */
export function cellState(projects: Project[], division: DivisionId, type: ProjectType): CellState {
  const delivered = projects.filter((p) => p.status === "completed");
  const matches: Project[] = [];
  let pending = 0;

  for (const p of delivered) {
    const m = matchProject(p, { division, type });
    if (m === "match") matches.push(p);
    else if (m === "unknown") pending += 1;
  }

  if (matches.length > 0) return { kind: "count", count: matches.length, projects: matches, pending };
  if (pending > 0) return { kind: "unsupplied", pending };
  return { kind: "empty" };
}

/** Dossier list: definite matches, plus how many projects can't be judged yet. */
export function filterProjects(projects: Project[], f: Filter) {
  const shown: Project[] = [];
  let undetermined = 0;
  for (const p of projects) {
    const m = matchProject(p, f);
    if (m === "match") shown.push(p);
    else if (m === "unknown") undetermined += 1;
  }
  return { shown, undetermined };
}

export function countByStatus(projects: Project[], status: Project["status"]): number {
  return projects.filter((p) => p.status === status).length;
}
