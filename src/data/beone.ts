/**
 * THE single editable content file for the Be-One Infra site.
 * Components read from here. No copy or figures live in JSX.
 *
 * To change anything on the site, edit values below:
 *   ver(value, source)  -> confirmed fact
 *   draft(value, note)  -> our wording, awaiting owner approval
 *   ph(note)            -> nothing supplied yet
 */
import imageSourceMap from "./image-sources.json";
import imageManifest from "./images.generated.json";
import type {
  Contact,
  Datum,
  Division,
  Draft,
  Figure,
  Placeholder,
  ProofItem,
  Project,
  SpineStage,
  Verified,
  DateString,
} from "./schema";

/* ---------- helpers ---------- */

const ver = <T,>(value: T, source: string, asOf?: DateString): Verified<T> => ({
  value,
  status: "VERIFIED",
  source,
  ...(asOf ? { asOf } : {}),
});

const draft = <T,>(value: T, note: string): Draft<T> => ({ value, status: "DRAFT", note });

const ph = (note?: string): Placeholder => ({
  value: null,
  status: "PLACEHOLDER",
  ...(note ? { note } : {}),
});

/* ---------- sources ---------- */

const OLD_SITE = "beoneinfra.com (fetched 20.09.2026)";
const OWNER = "Owner confirmation 20.09.2026";
const EARLIER_BUILD = "Earlier site build, from beoneinfra.com content";
const RERA_VERIFY_URL = "https://maharerait.mahaonline.gov.in/searchlist/search";

/* ---------- meta ---------- */

export const meta = {
  /** Spelling confirmed by owner: "Be-One Infra". */
  name: "Be-One Infra",
  /** Draft: every claim carries a number. 18 = all projects (completed, ongoing, upcoming). */
  positioning: draft(
    "Infrastructure and realty company. 18 projects in and around Pune since 2014.",
    "Draft wording. 18 counts completed, ongoing and upcoming projects; only 12 are named so far.",
  ),
  founded: ver(2014, OLD_SITE),
  descriptor: ver(
    "Infrastructure and realty company developing residential, commercial and infrastructural projects in and around Pune.",
    OLD_SITE,
  ),
} as const;

/* ---------- company ---------- */

export const company = {
  address: ver(
    "Bhatevara Business Bay, 34, Parijat Society, S.No.687/2B+689, Bibvewadi, Above HDFC Bank, Pune, Maharashtra 411037",
    OLD_SITE,
  ),
  phone: ver("+91 95455 30307", OLD_SITE),
  whatsapp: ver("+91 95455 30307", OLD_SITE),
  emails: {
    general: ver("info@beoneinfra.com", OLD_SITE),
    sales: ver("sales@beoneinfra.com", OLD_SITE),
  },
  instagram: ver("https://www.instagram.com/beoneinfra_pune/", OLD_SITE),
  /** Counts shown on the old site. Not all are used on the new hero. */
  happyFamilies: ver(350, OLD_SITE),
  totalProjects: ver(18, `${OLD_SITE}; owner confirmed it includes completed, ongoing and upcoming`),
} as const;

export const managingDirector = {
  name: ver("Amit Bhatevara", OLD_SITE),
  role: ver("Managing Director", OLD_SITE),
  credential: ver("M.E. Civil (Australia)", OLD_SITE),
  careerStart: ver(2000, OLD_SITE),
  projectsCompletedBefore2014: ver("20+ residential and commercial projects as Associate, Bhansali Associates, Pune", OLD_SITE),
  affiliations: [
    ver("JITO Pune Chapter, member since 2014", OLD_SITE),
    ver("JITO Pune Chapter, Joint Secretary 2017–2019", OLD_SITE),
  ],
} as const;

/* ---------- divisions ---------- */

export const divisions: Division[] = [
  { id: "real-estate", name: "Real estate development", scope: ph("Division scope to be supplied.") },
  { id: "turnkey", name: "Turnkey contracting & interiors", scope: ph("Division scope to be supplied.") },
  { id: "materials", name: "Materials supply", scope: ph("Division scope to be supplied.") },
];

/** Services listed on the old site. Not yet mapped to divisions. */
export const oldSiteServices = [
  { name: "Real Estate Construction", href: null },
  { name: "TDR Generation (Virtual FSI)", href: null },
  { name: "Redevelopment", href: null },
  { name: "NA Plots (plotting projects)", href: null },
  { name: "Be-One Villa Hospitality", href: "https://be-one-villa.business.site/" },
  { name: "Vijay Chemicals", href: "https://vijaychemicals.co.in/" },
].map((s) => ({ ...s, source: OLD_SITE }));

/* ---------- projects ---------- */

const noDetail = {
  client: ph(),
  builtUpSqft: ph(),
  contractBand: ph(),
  duration: ph(),
  deliveryVariance: ph(),
  constraintSolved: ph("One short paragraph on a constraint solved. To be supplied."),
} as const;

const baseProjects: Project[] = [
  /* ----- ongoing ----- */
  {
    id: "18-jewels",
    name: "18 Jewels",
    location: "Erandwane, Pune",
    status: "ongoing",
    scope: ver("2 & 3 BHK Residential", OLD_SITE),
    types: ver(["residential"], OLD_SITE),
    ...noDetail,
    client: ver("Be-One Infra (sole owner)", OWNER),
    divisions: ver(["real-estate"], OWNER),
    rera: {
      number: "P52100050045",
      issuingBody: "MahaRERA",
      validUntil: ph("Validity date to be supplied."),
      verifyUrl: RERA_VERIFY_URL,
    },
  },
  {
    id: "sunanda",
    name: "Sunanda",
    location: "Bibwewadi, Pune",
    status: "ongoing",
    scope: ver("4 BHK Residential", OLD_SITE),
    types: ver(["residential"], OLD_SITE),
    ...noDetail,
    divisions: ver(["real-estate"], `${OLD_SITE}: launched by Be-One Infra`),
    facts: [{ label: "RERA", value: "Registered; number not yet published" }],
  },
  {
    id: "bhansali-campus",
    name: "Bhansali Campus",
    location: "Sinhagad Road, Pune",
    status: "ongoing",
    scope: ver("2 BHK Residential", OLD_SITE),
    types: ver(["residential"], OLD_SITE),
    ...noDetail,
    client: ver("Be-One Infra (sole owner)", OWNER),
    divisions: ver(["real-estate"], OWNER),
    rera: {
      number: "P52100029257",
      issuingBody: "MahaRERA",
      validUntil: ph("Validity date to be supplied."),
      verifyUrl: RERA_VERIFY_URL,
    },
    facts: [{ label: "Site area", value: "1 acre" }],
  },

  /* ----- upcoming ----- */
  {
    id: "signature-park",
    name: "Signature Park",
    location: "S.No.57, Marunji, Hijewadi Annexe, Mulshi, Pune",
    status: "upcoming",
    scope: ver("2 BHK Residential & Commercial", OLD_SITE),
    types: ver(["residential", "commercial"], OLD_SITE),
    ...noDetail,
    divisions: ph(),
  },
  {
    id: "signature-corner",
    name: "Signature Corner",
    location: "Vishrantwadi Chowk, Kalas, Pune",
    status: "upcoming",
    scope: ver("2 & 3 BHK Residential & Commercial redevelopment (Bhagirathinath Society)", OLD_SITE),
    types: ver(["residential", "commercial"], OLD_SITE),
    ...noDetail,
    divisions: ph(),
    rera: {
      number: "P52100078475",
      issuingBody: "MahaRERA",
      validUntil: ph("Validity date to be supplied."),
      verifyUrl: RERA_VERIFY_URL,
    },
    facts: [
      { label: "Residences", value: "30" },
      { label: "Ground-floor shops", value: "6" },
    ],
  },
  {
    id: "suvidha",
    name: "Suvidha",
    location: "Sahakar Nagar, opp. Shinde High School, Pune",
    status: "upcoming",
    scope: ver("2 BHK Residential & Commercial redevelopment", OLD_SITE),
    types: ver(["residential", "commercial"], OLD_SITE),
    ...noDetail,
    divisions: ph(),
  },

  /* ----- completed ----- */
  {
    id: "ruturang",
    name: "Ruturang",
    location: "Karve Road, Pune",
    status: "completed",
    scope: ph("Project scope to be supplied."),
    types: ph("Project type to be supplied."),
    ...noDetail,
    divisions: ph(),
  },
  {
    id: "west-winds",
    name: "West Winds",
    location: "Baner, Pune",
    status: "completed",
    scope: ph("Project scope to be supplied."),
    types: ph("Project type to be supplied."),
    ...noDetail,
    divisions: ph(),
  },
  {
    id: "renaissance",
    name: "Renaissance",
    location: "Prabhat Road, Pune",
    status: "completed",
    scope: ph("Project scope to be supplied."),
    types: ph("Project type to be supplied."),
    ...noDetail,
    divisions: ph(),
  },
  {
    id: "veeya-vantage",
    name: "Veeya Vantage",
    location: "Law College Road, Pune",
    status: "completed",
    scope: ph("Project scope to be supplied."),
    types: ph("Project type to be supplied."),
    ...noDetail,
    divisions: ph(),
  },
  {
    id: "whispering-winds",
    name: "Whispering Winds",
    location: "Aundh Annexe, Pune",
    status: "completed",
    scope: ph("Project scope to be supplied."),
    types: ph("Project type to be supplied."),
    ...noDetail,
    divisions: ph(),
  },
  {
    id: "bhatevara-business-bay",
    name: "Bhatevara Business Bay",
    location: "Bibwewadi, Pune",
    status: "completed",
    scope: ver("Commercial, redevelopment of Shriyog", EARLIER_BUILD),
    types: ver(["commercial"], EARLIER_BUILD),
    ...noDetail,
    divisions: ph(),
  },
];

/**
 * Old-site image files (https://www.beoneinfra.com/assets/img/project/) live in image-sources.json;
 * scripts/fetch-images.mjs turns them into WebP variants and images.generated.json.
 * `whispering-winds.jpg` and `whispering.jpg` are ambiguous: the brief pairs them one way with
 * West Winds / Whispering Winds, the earlier build the other way. Left unassigned until the owner
 * confirms. The three ongoing projects have no listed image.
 * The images are architectural renderings, not photographs of the finished buildings.
 */
const imageAlt: Record<string, string> = {
  ruturang:
    "Architectural rendering of Ruturang, Karve Road, Pune: a multi-storey building with a cream and brown facade behind a low boundary wall.",
  renaissance:
    "Architectural rendering of Renaissance, Prabhat Road, Pune: a tall building with a beige upper section and maroon vertical fins.",
  "veeya-vantage":
    "Architectural rendering of Veeya Vantage, Law College Road, Pune: a five-storey building with shopfronts at street level and a rooftop terrace.",
  "bhatevara-business-bay":
    "Architectural rendering of Bhatevara Business Bay, Bibwewadi, Pune: a five-storey building with timber-toned vertical louvres, a bank at street level and a planted roof.",
  "signature-park":
    "Architectural rendering of Signature Park, Marunji, Pune: two tall towers rising from a three-storey podium, shown at dusk.",
  suvidha:
    "Architectural rendering of Suvidha, Sahakar Nagar, Pune: a seven-storey building with balconies and a vertical timber-clad panel, shown at dusk.",
};

export const projects: Project[] = baseProjects.map((p) => {
  const dims = (imageManifest as Record<string, { width: number; height: number }>)[p.id];
  if (!(p.id in imageSourceMap) || !dims || !imageAlt[p.id]) return p;
  return { ...p, image: { src: `/projects/${p.id}`, alt: imageAlt[p.id], width: dims.width, height: dims.height } };
});

export const unassignedImages = ["whispering-winds.jpg", "whispering.jpg"] as const;

/* ---------- hero figures ---------- */

export const figures: Figure[] = [
  {
    id: "sqft",
    label: "sq.ft constructed",
    counts: "Built-up area, incl. ongoing",
    value: ver(375000, OLD_SITE),
    unit: "sq.ft",
    asOf: ph("As-of date to be supplied."),
  },
  {
    id: "handedOver",
    label: "projects handed over",
    counts: "Completed projects",
    value: ver(6, OWNER),
    asOf: ph("As-of date to be supplied."),
  },
  {
    id: "years",
    label: "years operating",
    counts: "Be-One Infra, since 2014",
    value: ver(12, `${OWNER}; founded 2014 per ${OLD_SITE}`),
    asOf: ver("20.09.2026", OWNER),
  },
  {
    id: "activeSites",
    label: "active sites",
    counts: "Ongoing projects",
    value: ver(3, OLD_SITE),
    asOf: ph("As-of date to be supplied."),
  },
];

/* ---------- spine ---------- */

const stageWhat = (v: string): Draft<string> => draft(v, "Neutral stage definition. Awaiting owner approval.");

/**
 * Ownership and division per stage are unconfirmed, so every stage renders as
 * neutral until the owner supplies the mapping. Orange is not used until it is true.
 */
export const spineStages: SpineStage[] = [
  {
    id: "land",
    label: "Land",
    what: stageWhat("Site identification and acquisition."),
    ownership: ph(),
    division: ph(),
    proof: draft(
      { projectId: "signature-park", fact: "Signature Park: S.No.57, Marunji, Hijewadi Annexe, Mulshi, Pune" },
      "Candidate proof from verified facts. Awaiting owner approval.",
    ),
  },
  {
    id: "feasibility",
    label: "Feasibility",
    what: stageWhat("Site, cost and yield assessment."),
    ownership: ph(),
    division: ph(),
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "design",
    label: "Design",
    what: stageWhat("Architecture, structure and services design."),
    ownership: ph(),
    division: ph(),
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "approvals",
    label: "Approvals",
    what: stageWhat("Statutory permissions and registrations."),
    ownership: ph(),
    division: ph(),
    proof: ver({ fact: "3 projects registered with MahaRERA: 18 Jewels, Bhansali Campus, Signature Corner" }, OWNER),
  },
  {
    id: "procurement",
    label: "Procurement",
    what: stageWhat("Contracts, materials and vendor orders."),
    ownership: ph(),
    division: ph(),
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "build",
    label: "Build",
    what: stageWhat("Construction of the structure."),
    ownership: ph(),
    division: ph(),
    proof: ver({ fact: "3.75 lakh sq.ft constructed, incl. ongoing" }, OLD_SITE),
  },
  {
    id: "fit-out",
    label: "Fit-out",
    what: stageWhat("Interiors and services completion."),
    ownership: ph(),
    division: ph(),
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "handover",
    label: "Handover",
    what: stageWhat("Delivery to the client or buyers."),
    ownership: ph(),
    division: ph(),
    proof: ver({ fact: "6 projects handed over" }, OWNER),
  },
  {
    id: "aftercare",
    label: "Aftercare",
    what: stageWhat("Post-handover service and defect correction."),
    ownership: ph(),
    division: ph(),
    proof: ph("Proof from a real project to be supplied."),
  },
];

/* ---------- integration argument ---------- */

export const integration = {
  conventional: {
    vendorInterfaces: ph("Number of vendor interfaces in a fragmented chain. Needs a source."),
    clientContracts: ph("Number of contracts the client signs. Needs a source."),
    handoffPoints: ph("Handoff points where schedules typically slip. Needs a source."),
  },
  integrated: {
    vendorInterfaces: ph("Number of vendor interfaces in the Be-One chain. To be supplied."),
    clientContracts: ph("Number of contracts the client signs. To be supplied."),
    handoffPoints: ph("Handoff points in the Be-One chain. To be supplied."),
  },
} as const;

/* ---------- proof wall ---------- */

export const proofItems: ProofItem[] = [
  ...projects
    .filter((p) => p.rera)
    .map<ProofItem>((p) => ({
      id: `rera-${p.id}`,
      kind: "registration",
      title: `RERA registration, ${p.name}`,
      issuingBody: ver("MahaRERA", OWNER),
      reference: ver(p.rera!.number, OWNER),
      validUntil: p.rera!.validUntil,
      verifyUrl: p.rera!.verifyUrl,
    })),
  {
    id: "certification-1",
    kind: "certification",
    title: "Certification",
    issuingBody: ph(),
    reference: ph(),
    validUntil: ph(),
  },
  {
    id: "insurance-1",
    kind: "insurance",
    title: "Insurance",
    issuingBody: ph(),
    reference: ph(),
    validUntil: ph(),
  },
  {
    id: "safety-1",
    kind: "safety",
    title: "Safety record",
    issuingBody: ph(),
    reference: ph(),
    validUntil: ph(),
  },
];

export const clientLogos: Datum<string>[] = [ph("Client logos to be supplied.")];

export const pullQuote = {
  quote: ph("Client quote to be supplied."),
  name: ph(),
  title: ph(),
  company: ph(),
} as const;

/* ---------- materials division ---------- */

export const materials = {
  categories: ph("Material categories to be supplied."),
  sourcingGeography: ph("Sourcing geography to be supplied."),
  leadTimes: ph("Typical lead times to be supplied."),
  qualityProtocol: ph("Quality protocol to be supplied."),
} as const;

/* ---------- contact / RFP ---------- */

export const contact = {
  responseTime: ph("Response-time commitment to be supplied."),
  people: [
    {
      name: managingDirector.name,
      role: managingDirector.role,
      phone: ph("Direct line to be supplied."),
      email: ph("Direct email to be supplied."),
    },
  ] as Contact[],
  /** RFP form options. These are form choices, not claims. */
  scaleBands: draft(
    ["Under 50,000 sq.ft", "50,000 – 2 lakh sq.ft", "2 – 5 lakh sq.ft", "Above 5 lakh sq.ft"],
    "Draft bands. Awaiting owner approval.",
  ),
  timelines: draft(
    ["Within 3 months", "3 – 6 months", "6 – 12 months", "Above 12 months"],
    "Draft options. Awaiting owner approval.",
  ),
} as const;
