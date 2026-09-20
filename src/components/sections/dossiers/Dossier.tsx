import Image from "next/image";
import { divisions } from "@/data/beone";
import type { Project } from "@/data/schema";
import { formatSqft } from "@/lib/format";
import { Val } from "@/components/primitives/Val";

const statusLabel: Record<Project["status"], string> = {
  completed: "Completed",
  ongoing: "Ongoing",
  upcoming: "Upcoming",
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

/** A project as a spec sheet: image, then a two-column technical block in Fira Code. */
export function Dossier({ project: p }: { project: Project }) {
  const divisionNames = (ids: string[]) =>
    ids.map((id) => divisions.find((d) => d.id === id)?.name ?? id).join(", ");

  return (
    <article aria-labelledby={`dossier-${p.id}`} className="rounded-xl border border-border bg-card">
      {p.image ? (
        <Image
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.width}
          height={p.image.height}
          sizes="(min-width: 1152px) 1100px, 100vw"
          className="aspect-[16/8] w-full rounded-t-xl object-cover sm:aspect-[16/7] lg:aspect-[16/6]"
        />
      ) : (
        <div className="flex aspect-[16/8] w-full items-center justify-center rounded-t-xl border-b border-border bg-muted sm:aspect-[16/7] lg:aspect-[16/6]">
          <span className="placeholder-mark text-sm text-muted-foreground italic">Image: placeholder, to be supplied</span>
        </div>
      )}

      <div className="p-5 sm:p-8">
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 id={`dossier-${p.id}`} className="text-2xl font-semibold tracking-tight">
            {p.name}
          </h3>
          <p className="num text-sm text-muted-foreground">{p.location}</p>
        </header>

        <div className="num mt-6 grid gap-x-10 text-sm md:grid-cols-2">
          <dl>
            <Row label="Client">
              <Val datum={p.client} />
            </Row>
            <Row label="Scope">
              <Val datum={p.scope} />
            </Row>
            <Row label="Built-up area">
              <Val datum={p.builtUpSqft} render={formatSqft} mono />
            </Row>
            <Row label="Contract value band">
              <Val datum={p.contractBand} />
            </Row>
          </dl>
          <dl>
            <Row label="Duration">
              <Val datum={p.duration} />
            </Row>
            <Row label="Delivery variance vs schedule">
              <Val datum={p.deliveryVariance} />
            </Row>
            <Row label="Divisions engaged">
              <Val datum={p.divisions} render={divisionNames} />
            </Row>
            <Row label="Status">
              <span className="inline-flex items-center gap-2">
                {p.status === "ongoing" && <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />}
                {statusLabel[p.status]}
              </span>
            </Row>
          </dl>
          {(p.rera || p.facts) && (
            <dl className="md:col-span-2">
              {p.rera && (
                <Row label="RERA">
                  <a
                    href={p.rera.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    {p.rera.number}
                  </a>{" "}
                  <span className="text-muted-foreground">{p.rera.issuingBody}, verify on portal</span>
                </Row>
              )}
              {p.facts?.map((f) => (
                <Row key={f.label} label={f.label}>
                  {f.value}
                </Row>
              ))}
            </dl>
          )}
        </div>

        <p className="mt-6 max-w-prose text-sm text-muted-foreground">
          <Val datum={p.constraintSolved} />
        </p>
      </div>
    </article>
  );
}
