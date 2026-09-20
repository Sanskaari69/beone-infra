import { spineStages } from "@/data/beone";
import { SpineBar } from "./SpineBar";
import { StageDetail } from "./StageDetail";

/** Reduced motion: a static annotated diagram with all nine stages visible at once. */
export function SpineStatic() {
  return (
    <div>
      <SpineBar />
      <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
        {spineStages.map((s, i) => (
          <li key={s.id} className="border-t border-border pt-5">
            <StageDetail stage={s} index={i} />
          </li>
        ))}
      </ol>
    </div>
  );
}
