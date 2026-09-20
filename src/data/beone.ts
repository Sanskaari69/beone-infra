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
  Division,
  Draft,
  Figure,
  Placeholder,
  ProofItem,
  Project,
  SpineStage,
  Verified,
  DateString,
  DivisionId,
  Ownership,
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
const PAGE = (file: string) => `beoneinfra.com/${file} (fetched 20.09.2026)`;
const BROCHURE = "signature_corner.pdf on beoneinfra.com (fetched 20.09.2026)";
const MODEL =
  "Owner statement 20.09.2026: Be-One builds each project itself and sells to buyers; several buyers per site";
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

const fact = (label: string, value: string, source: string) => ({ label, value, source });

/** Published on the old site for Sunanda and Bhansali Campus (identical lists on both pages). */
const specFacts = (file: string) => [
  fact("Structure", "Earthquake-resistant RCC", PAGE(file)),
  fact("Masonry", "6-inch brick, internal and external", PAGE(file)),
  fact("Lifts", "Schindler or equivalent", PAGE(file)),
  fact("Fire fighting", "PMC-compliant equipment", PAGE(file)),
  fact("Power backup", "Lifts, pumps and common areas", PAGE(file)),
  fact("Security", "24-hour; CCTV in common areas, 24/7 recording", PAGE(file)),
  fact("Water and energy", "Rainwater harvesting; solar system", PAGE(file)),
];

const AMENITIES_8 =
  "8: party lawn, club house, sit-outs with planters, indoor games room, gymnasium, swimming pool, meditation area, amphitheatre";

const noDetail = {
  buyers: ver("Individual buyers, several per site", MODEL),
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
    divisions: ver(["real-estate"], OWNER),
    rera: {
      number: "P52100050045",
      issuingBody: "MahaRERA",
      validUntil: ph("Validity date to be supplied."),
      verifyUrl: RERA_VERIFY_URL,
    },
    facts: [
      fact("Owner", "Be-One Infra, sole owner", OWNER),
      fact("Amenities", AMENITIES_8, PAGE("18-jewels.php")),
    ],
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
    facts: [
      fact("RERA", "Registered; number not yet published", PAGE("bhatewara-residence.php")),
      ...specFacts("bhatewara-residence.php"),
      fact("Amenities", AMENITIES_8, PAGE("bhatewara-residence.php")),
    ],
  },
  {
    id: "bhansali-campus",
    name: "Bhansali Campus",
    location: "Sinhagad Road, Pune",
    status: "ongoing",
    scope: ver("2 BHK Residential", OLD_SITE),
    types: ver(["residential"], OLD_SITE),
    ...noDetail,
    divisions: ver(["real-estate"], OWNER),
    rera: {
      number: "P52100029257",
      issuingBody: "MahaRERA",
      validUntil: ph("Validity date to be supplied."),
      verifyUrl: RERA_VERIFY_URL,
    },
    facts: [
      fact("Owner", "Be-One Infra, sole owner", OWNER),
      fact("Site area", "1 acre", PAGE("bhansali-campus.php")),
      fact("Occupancy certificate", "Not yet granted", PAGE("bhansali-campus.php")),
      ...specFacts("bhansali-campus.php"),
      fact("Amenities", AMENITIES_8, PAGE("bhansali-campus.php")),
    ],
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
    // The brochure text says "30 apartments" but its layout lists flat numbers 101-606 (36).
    // No residence count is shown until the owner confirms.
    facts: [
      fact("Site", "Survey No. 113, Plot No. 12, Old Alandi Road, Vishrantwadi, Pune", BROCHURE),
      fact("Ground-floor shops", "6", BROCHURE),
      fact("Shop carpet area, ground floor", "237 – 1,016 sq.ft", BROCHURE),
      fact("Flat carpet area", "603 – 918 sq.ft (2 BHK and 2.5 BHK)", BROCHURE),
      fact("Structure", "Earthquake-resistant (Zone 3) RCC frame", BROCHURE),
      fact("Walls", "AAC block and brick masonry", BROCHURE),
      fact("Flooring", "600 × 600 mm vitrified tile", BROCHURE),
      fact("Plumbing", "CPVC internal, UPVC external", BROCHURE),
      fact("Lift", "Branded lift, as per fire norms", BROCHURE),
      fact("Distances", "Pune Airport 4 km, Viman Nagar 4 km, Pune Station 8 km, Kharadi 10 km", BROCHURE),
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
  ...(
    [
      ["ruturang", "Ruturang", "Karve Road, Pune"],
      ["west-winds", "West Winds", "Baner, Pune"],
      ["renaissance", "Renaissance", "Prabhat Road, Pune"],
      ["veeya-vantage", "Veeya Vantage", "Law College Road, Pune"],
      ["whispering-winds", "Whispering Winds", "Aundh Annexe, Pune"],
    ] as const
  ).map(
    ([id, name, location]): Project => ({
      id,
      name,
      location,
      status: "completed",
      scope: ph("Project scope to be supplied."),
      types: ph("Project type to be supplied."),
      ...noDetail,
      divisions: ph(),
    }),
  ),
  {
    id: "bhatevara-business-bay",
    name: "Bhatevara Business Bay",
    location: "Bibwewadi, Pune",
    status: "completed",
    scope: ver("Commercial, redevelopment of Shriyog", `${PAGE("redevelopment.php")}`),
    types: ver(["commercial"], PAGE("redevelopment.php")),
    ...noDetail,
    divisions: ph(),
  },
];

/**
 * Images come from the old site (image-sources.json), paired with project names by the old
 * homepage's own markup and links. scripts/fetch-images.mjs turns them into WebP variants and
 * images.generated.json. They are architectural renderings, not photographs of finished buildings.
 */
const imageAlt: Record<string, string> = {
  "18-jewels":
    "Architectural rendering of 18 Jewels, Erandwane, Pune: a multi-storey building with brick-toned panels, vertical lattice screens and parking at ground level.",
  sunanda:
    "Architectural rendering of Sunanda, Bibwewadi, Pune: a building faced in exposed brick with timber louvres, open balconies and parking at ground level.",
  "bhansali-campus":
    "Architectural rendering of Bhansali Campus, Sinhagad Road, Pune: two multi-storey buildings with shopfronts at street level, palm trees and a landscaped entrance.",
  "signature-park":
    "Architectural rendering of Signature Park, Marunji, Pune: two tall towers rising from a three-storey podium, shown at dusk.",
  "signature-corner":
    "Architectural rendering of Signature Corner, Vishrantwadi, Pune: a tall building with grey stone-clad and white bays, balconies with planters and an open ground floor.",
  suvidha:
    "Architectural rendering of Suvidha, Sahakar Nagar, Pune: a seven-storey building with balconies and a vertical timber-clad panel, shown at dusk.",
  ruturang:
    "Architectural rendering of Ruturang, Karve Road, Pune: a multi-storey building with a cream and brown facade behind a low boundary wall.",
  "west-winds":
    "Architectural rendering of West Winds, Baner, Pune: a multi-storey building in cream and beige with a louvred central stair core and palm trees along the boundary.",
  renaissance:
    "Architectural rendering of Renaissance, Prabhat Road, Pune: a tall building with a beige upper section and maroon vertical fins.",
  "veeya-vantage":
    "Architectural rendering of Veeya Vantage, Law College Road, Pune: a five-storey building with shopfronts at street level and a rooftop terrace.",
  "whispering-winds":
    "Architectural rendering of Whispering Winds, Aundh Annexe, Pune: a multi-storey cream building with a louvred stair core, raised on pillars, with palms and a boundary wall.",
  "bhatevara-business-bay":
    "Architectural rendering of Bhatevara Business Bay, Bibwewadi, Pune: a five-storey building with timber-toned vertical louvres, a bank at street level and a planted roof.",
};

export const projects: Project[] = baseProjects.map((p) => {
  const dims = (imageManifest as Record<string, { width: number; height: number }>)[p.id];
  if (!(p.id in imageSourceMap) || !dims || !imageAlt[p.id]) return p;
  return { ...p, image: { src: `/projects/${p.id}`, alt: imageAlt[p.id], width: dims.width, height: dims.height } };
});

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
 * Owner statement 20.09.2026: "we make it fully by ourselves and then people come and buy it".
 * Read as: every stage is in-house, under real estate development. Kept as DRAFT until the owner
 * confirms stage by stage, so the page flags it instead of presenting it as verified.
 */
const inHouse = draft<Ownership>("in-house", "From the owner's statement that Be-One builds each project itself. Confirm per stage.");
const realEstate = draft<DivisionId>("real-estate", "Assumed from the owner's statement. Confirm per stage.");
export const spineStages: SpineStage[] = [
  {
    id: "land",
    label: "Land",
    what: stageWhat("Site identification and acquisition."),
    ownership: inHouse,
    division: realEstate,
    proof: draft(
      { projectId: "signature-park", fact: "Signature Park: S.No.57, Marunji, Hijewadi Annexe, Mulshi, Pune" },
      "Candidate proof from verified facts. Awaiting owner approval.",
    ),
  },
  {
    id: "feasibility",
    label: "Feasibility",
    what: stageWhat("Site, cost and yield assessment."),
    ownership: inHouse,
    division: realEstate,
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "design",
    label: "Design",
    what: stageWhat("Architecture, structure and services design."),
    ownership: inHouse,
    division: realEstate,
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "approvals",
    label: "Approvals",
    what: stageWhat("Statutory permissions and registrations."),
    ownership: inHouse,
    division: realEstate,
    proof: ver({ fact: "3 projects registered with MahaRERA: 18 Jewels, Bhansali Campus, Signature Corner" }, OWNER),
  },
  {
    id: "procurement",
    label: "Procurement",
    what: stageWhat("Contracts, materials and vendor orders."),
    ownership: inHouse,
    division: realEstate,
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "build",
    label: "Build",
    what: stageWhat("Construction of the structure."),
    ownership: inHouse,
    division: realEstate,
    proof: ver({ fact: "3.75 lakh sq.ft constructed, incl. ongoing" }, OLD_SITE),
  },
  {
    id: "fit-out",
    label: "Fit-out",
    what: stageWhat("Interiors and services completion."),
    ownership: inHouse,
    division: realEstate,
    proof: ph("Proof from a real project to be supplied."),
  },
  {
    id: "handover",
    label: "Handover",
    what: stageWhat("Delivery to the client or buyers."),
    ownership: inHouse,
    division: realEstate,
    proof: ver({ fact: "6 projects handed over" }, OWNER),
  },
  {
    id: "aftercare",
    label: "Aftercare",
    what: stageWhat("Post-handover service and defect correction."),
    ownership: inHouse,
    division: realEstate,
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

/* No client logos or client quotes: client details are not published. */

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
