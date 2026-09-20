import { meta } from "@/data/beone";
import { BlueprintGrid } from "@/components/sections/BlueprintGrid";
import { HeroReadout } from "@/components/sections/HeroReadout";
import { Reveal } from "@/components/primitives/Reveal";
import { Val } from "@/components/primitives/Val";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-border">
      <BlueprintGrid />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <Reveal immediate>
          <h1
            id="hero-title"
            className="text-[clamp(3.25rem,11vw,8rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
          >
            {meta.name}
          </h1>
        </Reveal>
        <Reveal immediate index={1}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            <Val datum={meta.positioning} />
          </p>
        </Reveal>
        <HeroReadout />
      </div>
    </section>
  );
}
