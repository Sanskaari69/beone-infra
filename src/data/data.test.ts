import { describe, expect, it } from "vitest";
import { cellState, countByStatus, filterProjects, matchProject, NO_FILTER } from "./derive";
import { figures, projects, spineStages, proofItems, meta, company, managingDirector } from "./beone";
import { isDateString } from "../lib/format";
import { DIVISION_IDS, PROJECT_TYPES, type Datum, type Project } from "./schema";

/** Walk any value and collect every Datum-shaped object. */
function collectDatums(node: unknown, out: Datum<unknown>[] = []): Datum<unknown>[] {
  if (Array.isArray(node)) node.forEach((n) => collectDatums(n, out));
  else if (node && typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (o.status === "VERIFIED" || o.status === "DRAFT" || o.status === "PLACEHOLDER") out.push(o as unknown as Datum<unknown>);
    else Object.values(o).forEach((v) => collectDatums(v, out));
  }
  return out;
}

const fake = (over: Partial<Project>): Project => ({
  ...projects[0],
  status: "completed",
  types: { value: ["commercial"], status: "VERIFIED", source: "test" },
  divisions: { value: ["real-estate"], status: "VERIFIED", source: "test" },
  ...over,
});

describe("content integrity", () => {
  const all = collectDatums([meta, company, managingDirector, projects, figures, spineStages, proofItems]);

  it("VERIFIED and DRAFT values are never null; PLACEHOLDER values always are", () => {
    for (const d of all) {
      if (d.status === "PLACEHOLDER") expect(d.value).toBeNull();
      else expect(d.value).not.toBeNull();
    }
  });

  it("every VERIFIED value names a source", () => {
    for (const d of all) if (d.status === "VERIFIED") expect(d.source.length).toBeGreaterThan(0);
  });

  it("every date is DD.MM.YYYY", () => {
    for (const d of all) {
      if (d.status === "VERIFIED" && d.asOf) expect(isDateString(d.asOf)).toBe(true);
    }
    const years = figures.find((f) => f.id === "years")!;
    if (years.asOf.status === "VERIFIED") expect(isDateString(years.asOf.value)).toBe(true);
  });

  it("carries no marketing copy from the old site", () => {
    const text = JSON.stringify([meta, company, managingDirector, projects, spineStages]);
    expect(text).not.toMatch(/Building TRUST/i);
    expect(text).not.toMatch(/trusted partner|committed to excellence|we believe/i);
  });
});

describe("figures match the project list", () => {
  it("projects handed over equals the completed projects", () => {
    const f = figures.find((x) => x.id === "handedOver")!;
    expect(f.value.value).toBe(countByStatus(projects, "completed"));
  });

  it("active sites equals the ongoing projects", () => {
    const f = figures.find((x) => x.id === "activeSites")!;
    expect(f.value.value).toBe(countByStatus(projects, "ongoing"));
  });

  it("names 12 projects; 18 is the owner-confirmed total", () => {
    expect(projects).toHaveLength(12);
    expect(company.totalProjects.value).toBe(18);
  });
});

describe("capability matrix", () => {
  it("never shows zero for a cell whose completed projects are unsupplied", () => {
    for (const d of DIVISION_IDS)
      for (const t of PROJECT_TYPES) expect(cellState(projects, d, t).kind).not.toBe("empty");
  });

  it("counts definite matches", () => {
    const list = [fake({ id: "a", name: "A" }), fake({ id: "b", name: "B" })];
    const cell = cellState(list, "real-estate", "commercial");
    expect(cell.kind).toBe("count");
    if (cell.kind === "count") expect(cell.count).toBe(2);
  });

  it("is empty only when every completed project is definitely excluded", () => {
    expect(cellState([fake({})], "materials", "industrial").kind).toBe("empty");
  });

  it("ignores ongoing and upcoming projects", () => {
    expect(cellState([fake({ status: "ongoing" })], "real-estate", "commercial").kind).toBe("empty");
  });

  it("reports pending projects beside a count", () => {
    const list = [
      fake({ id: "a" }),
      fake({ id: "b", types: { value: null, status: "PLACEHOLDER" } }),
    ];
    const cell = cellState(list, "real-estate", "commercial");
    expect(cell.kind === "count" && cell.pending).toBe(1);
  });
});

describe("dossier filter", () => {
  it("shows everything with no filter", () => {
    expect(filterProjects(projects, NO_FILTER).shown).toHaveLength(projects.length);
  });

  it("excludes definite mismatches and counts unknowns separately", () => {
    const res = filterProjects(projects, { division: null, type: "residential" });
    expect(res.shown.every((p) => matchProject(p, { division: null, type: "residential" }) === "match")).toBe(true);
    expect(res.shown.length + res.undetermined).toBeLessThan(projects.length + 1);
    expect(res.undetermined).toBeGreaterThan(0);
  });
});
