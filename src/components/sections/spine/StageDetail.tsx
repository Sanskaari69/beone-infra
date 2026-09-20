import { divisions, projects } from "@/data/beone";
import type { Ownership, SpineStage } from "@/data/schema";
import { Val } from "@/components/primitives/Val";

export function ownershipLabel(o: SpineStage["ownership"]): string {
  if (o.status === "PLACEHOLDER") return "Ownership not yet supplied";
  const labels: Record<Ownership, string> = {
    "in-house": "In-house",
    partner: "Partner-coordinated",
    unconfirmed: "Ownership not yet supplied",
  };
  return labels[o.value];
}

/** What happens, who owns it, one piece of hard proof. Shared by every presentation mode. */
export function StageDetail({ stage, index }: { stage: SpineStage; index: number }) {
  const divisionName = (id: string) => divisions.find((d) => d.id === id)?.name ?? id;

  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
      <div>
        <p className="num text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight">{stage.label}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          <Val datum={stage.what} />
        </p>
      </div>

      <div>
        <p className="num text-xs uppercase tracking-[0.14em] text-muted-foreground">Owned by</p>
        <p className="mt-1 text-base">
          <Val datum={stage.division} render={divisionName} />
        </p>
        <p className="num mt-1 text-xs text-muted-foreground">{ownershipLabel(stage.ownership)}</p>
      </div>

      <div>
        <p className="num text-xs uppercase tracking-[0.14em] text-muted-foreground">Hard proof</p>
        <p className="num mt-1 text-sm leading-relaxed">
          <Val datum={stage.proof} render={(p) => p.fact} />
        </p>
        {stage.proof.status !== "PLACEHOLDER" && stage.proof.value.projectId && (
          <p className="num mt-1 text-xs text-muted-foreground">
            Project: {projects.find((p) => p.id === stage.proof.value!.projectId)?.name}
          </p>
        )}
      </div>
    </div>
  );
}
