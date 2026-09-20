import { integration } from "@/data/beone";
import type { Datum } from "@/data/schema";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Val } from "@/components/primitives/Val";
import { cn } from "@/lib/utils";

const MAX_NODES = 12;

/**
 * Draws N nodes. With no number supplied it draws one hatched bar instead, so it can never be
 * read as a count.
 */
function NodeRow({ count, tone }: { count: Datum<number>; tone: "fragmented" | "integrated" }) {
  if (count.status === "PLACEHOLDER") {
    return (
      <div
        aria-hidden="true"
        className="h-5 w-32 rounded-[3px] border border-dashed border-muted-foreground/60 bg-[repeating-linear-gradient(135deg,transparent_0_5px,var(--border)_5px_6px)]"
      />
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
      {Array.from({ length: Math.min(count.value, MAX_NODES) }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "size-5 rounded-[3px] border",
            tone === "fragmented" && "border-muted-foreground/60 bg-muted-foreground/25",
            tone === "integrated" && "border-line-strong bg-secondary",
          )}
        />
      ))}
    </div>
  );
}

const ROWS = [
  { key: "vendorInterfaces", label: "Vendor interfaces" },
  { key: "clientContracts", label: "Contracts the client signs" },
  { key: "handoffPoints", label: "Handoff points where schedules typically slip" },
] as const;

function Chain({
  title,
  data,
  tone,
}: {
  title: string;
  data: Record<(typeof ROWS)[number]["key"], Datum<number>>;
  tone: "fragmented" | "integrated";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h3 className="text-lg font-medium">{title}</h3>
      <dl className="mt-5 space-y-6">
        {ROWS.map((r) => (
          <div key={r.key}>
            <dt className="num text-xs uppercase tracking-[0.12em] text-muted-foreground">{r.label}</dt>
            <dd className="mt-2 space-y-2">
              <NodeRow count={data[r.key]} tone={tone} />
              <span className="num block text-2xl">
                <Val datum={data[r.key]} className="text-sm" />
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function IntegrationArgument() {
  return (
    <section id="integration" aria-labelledby="integration-title" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="04"
          id="integration-title"
          lead="Two delivery chains, drawn to the same scale. One node is one unit."
        >
          Integration
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Chain title="Fragmented delivery chain" data={integration.conventional} tone="fragmented" />
          </Reveal>
          <Reveal index={1}>
            <Chain title="Be-One delivery chain" data={integration.integrated} tone="integrated" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
