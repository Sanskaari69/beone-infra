import { figures } from "@/data/beone";
import { CountUp } from "@/components/primitives/CountUp";
import { Reveal } from "@/components/primitives/Reveal";
import { Val } from "@/components/primitives/Val";

/** Four monospace figures. Each states what it counts and its as-of date. */
export function HeroReadout() {
  return (
    <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-8 md:grid-cols-4">
      {figures.map((f, i) => (
        <Reveal key={f.id} index={i + 3} immediate className="min-w-0">
          <dt className="num text-xs uppercase tracking-[0.14em] text-muted-foreground">{f.label}</dt>
          <dd className="mt-2">
            <span className="num flex flex-wrap items-baseline gap-x-2 text-2xl font-medium sm:text-4xl xl:text-5xl">
              {f.value.status === "PLACEHOLDER" ? (
                <Val datum={f.value} className="text-base" />
              ) : (
                <>
                  <CountUp value={f.value.value} className="whitespace-nowrap" />
                  {f.unit && <span className="text-sm text-muted-foreground">{f.unit}</span>}
                  {f.value.status === "VERIFIED" && (
                    <span
                      className="size-1.5 shrink-0 self-center rounded-full bg-primary"
                      title={`Verified: ${f.value.source}`}
                    >
                      <span className="sr-only">Verified</span>
                    </span>
                  )}
                </>
              )}
            </span>
            <span className="num mt-2 block text-[0.7rem] leading-snug text-muted-foreground">
              {f.counts}
              <br />
              as of <Val datum={f.asOf} />
            </span>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
