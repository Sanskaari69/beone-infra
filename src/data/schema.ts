/**
 * Content model. Every value shown on the site is a Datum.
 *
 * VERIFIED    a fact from a named source (old site, owner confirmation).
 * DRAFT       copy written by us and awaiting owner approval. Rendered, but flagged.
 * PLACEHOLDER nothing supplied. Rendered as "Placeholder — to be supplied".
 *
 * Never invent project names, client names, certifications, figures, quotes or dates.
 */

/** DD.MM.YYYY */
export type DateString = string;

export interface Verified<T> {
  value: T;
  status: "VERIFIED";
  source: string;
  asOf?: DateString;
}

export interface Draft<T> {
  value: T;
  status: "DRAFT";
  note: string;
}

export interface Placeholder {
  value: null;
  status: "PLACEHOLDER";
  note?: string;
}

export type Datum<T> = Verified<T> | Draft<T> | Placeholder;

export type DivisionId = "real-estate" | "turnkey" | "materials";

export const DIVISION_IDS: DivisionId[] = ["real-estate", "turnkey", "materials"];

export type ProjectType =
  | "commercial"
  | "residential"
  | "institutional"
  | "industrial"
  | "hospitality";

export const PROJECT_TYPES: ProjectType[] = [
  "commercial",
  "residential",
  "institutional",
  "industrial",
  "hospitality",
];

export type ProjectStatus = "completed" | "ongoing" | "upcoming";

/** in-house = we own the stage; partner = we coordinate partners; unconfirmed = not yet supplied. */
export type Ownership = "in-house" | "partner" | "unconfirmed";

export interface Division {
  id: DivisionId;
  name: string;
  /** What the division does. Placeholder until supplied. */
  scope: Datum<string>;
}

export interface ProjectImage {
  /** Path under /public, produced by scripts/fetch-images.mjs */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Rera {
  number: string;
  issuingBody: "MahaRERA";
  validUntil: Datum<DateString>;
  verifyUrl: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  /** Short descriptor as published, e.g. "2 & 3 BHK Residential". */
  scope: Datum<string>;
  types: Datum<ProjectType[]>;
  image?: ProjectImage;
  client: Datum<string>;
  builtUpSqft: Datum<number>;
  contractBand: Datum<string>;
  duration: Datum<string>;
  deliveryVariance: Datum<string>;
  divisions: Datum<DivisionId[]>;
  /** One short paragraph: a constraint solved. Never marketing. */
  constraintSolved: Datum<string>;
  rera?: Rera;
  /** Extra verified facts for this project. */
  facts?: { label: string; value: string }[];
}

export interface SpineStage {
  id: string;
  label: string;
  what: Datum<string>;
  ownership: Datum<Ownership>;
  division: Datum<DivisionId>;
  proof: Datum<{ projectId?: string; fact: string }>;
}

export interface Figure {
  id: "sqft" | "handedOver" | "years" | "activeSites";
  label: string;
  /** What the figure counts. Rendered as the mono caption. */
  counts: string;
  value: Datum<number>;
  unit?: string;
  asOf: Datum<DateString>;
}

export interface ProofItem {
  id: string;
  kind: "certification" | "registration" | "insurance" | "safety";
  title: string;
  issuingBody: Datum<string>;
  reference: Datum<string>;
  validUntil: Datum<DateString>;
  verifyUrl?: string;
}

export interface Contact {
  name: Datum<string>;
  role: Datum<string>;
  phone: Datum<string>;
  email: Datum<string>;
}
