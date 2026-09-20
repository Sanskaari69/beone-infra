"use client";

import { useSyncExternalStore } from "react";
import { NO_FILTER, type Filter } from "@/data/derive";
import { DIVISION_IDS, PROJECT_TYPES, type DivisionId, type ProjectType } from "@/data/schema";

/**
 * Matrix -> dossier filter, shared with the RFP form.
 * Lives outside React so it hydrates cleanly (server snapshot = no filter), then reads the URL
 * (?division=&type=) and sessionStorage on the client. Writes go to both, so a filtered view is
 * shareable and survives a reload.
 */

const KEY = "beone.filter";
let state: Filter = NO_FILTER;
let initialised = false;
const listeners = new Set<() => void>();

const isDivision = (v: unknown): v is DivisionId => DIVISION_IDS.includes(v as DivisionId);
const isType = (v: unknown): v is ProjectType => PROJECT_TYPES.includes(v as ProjectType);

function read(): Filter {
  try {
    const q = new URLSearchParams(window.location.search);
    const division = q.get("division");
    const type = q.get("type");
    if (isDivision(division) || isType(type)) {
      return { division: isDivision(division) ? division : null, type: isType(type) ? type : null };
    }
    const saved = JSON.parse(window.sessionStorage.getItem(KEY) ?? "null") as Partial<Filter> | null;
    if (saved) return { division: isDivision(saved.division) ? saved.division : null, type: isType(saved.type) ? saved.type : null };
  } catch {
    /* storage or URL unavailable: start unfiltered */
  }
  return NO_FILTER;
}

function persist(f: Filter) {
  try {
    const url = new URL(window.location.href);
    if (f.division) url.searchParams.set("division", f.division);
    else url.searchParams.delete("division");
    if (f.type) url.searchParams.set("type", f.type);
    else url.searchParams.delete("type");
    window.history.replaceState(null, "", url);
    window.sessionStorage.setItem(KEY, JSON.stringify(f));
  } catch {
    /* non-fatal */
  }
}

function getSnapshot(): Filter {
  if (!initialised && typeof window !== "undefined") {
    initialised = true;
    state = read();
  }
  return state;
}

const getServerSnapshot = (): Filter => NO_FILTER;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setFilter(next: Filter) {
  state = next;
  persist(next);
  listeners.forEach((l) => l());
}

export function useFilter() {
  const filter = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    filter,
    active: filter.division !== null || filter.type !== null,
    clear: () => setFilter(NO_FILTER),
    /** Click a cell: set both axes; click the active cell again to clear. */
    toggleCell: (division: DivisionId, type: ProjectType) =>
      setFilter(filter.division === division && filter.type === type ? NO_FILTER : { division, type }),
    /** Row header: filter by division only. */
    toggleDivision: (division: DivisionId) =>
      setFilter(filter.division === division && filter.type === null ? NO_FILTER : { division, type: null }),
    /** Column header: filter by type only. */
    toggleType: (type: ProjectType) =>
      setFilter(filter.type === type && filter.division === null ? NO_FILTER : { division: null, type }),
  };
}
