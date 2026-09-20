import { divisions, materials } from "@/data/beone";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Val } from "@/components/primitives/Val";

const ITEMS = [
  { key: "categories", label: "Categories" },
  { key: "sourcingGeography", label: "Sourcing geography" },
  { key: "leadTimes", label: "Typical lead times" },
  { key: "qualityProtocol", label: "Quality protocol" },
] as const;

export function MaterialsDivision() {
  const division = divisions.find((d) => d.id === "materials");
  return (
    <section id="materials" aria-labelledby="materials-title" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading index="06" id="materials-title" lead={division ? <Val datum={division.scope} /> : undefined}>
          Materials division
        </SectionHeading>
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {ITEMS.map((it, i) => (
            <Reveal key={it.key} index={i} className="border-t border-border pt-4">
              <dt className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">{it.label}</dt>
              <dd className="mt-2 text-sm">
                <Val datum={materials[it.key]} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
