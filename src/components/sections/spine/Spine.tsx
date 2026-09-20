import { SectionHeading } from "@/components/primitives/SectionHeading";
import { SpinePinned } from "./SpinePinned";
import { SpineStepper } from "./SpineStepper";
import { SpineStatic } from "./SpineStatic";

/**
 * Three presentations of the same nine stages, chosen by CSS alone (no hydration flash):
 *   md+ with motion       pinned, scroll-linked
 *   below md              vertical stepper
 *   prefers-reduced-motion  static annotated diagram
 * Scroll is never captured. "Skip spine" jumps past all of it.
 */
export function Spine() {
  return (
    <section id="spine" aria-labelledby="spine-title" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading index="01" id="spine-title" lead="Nine stages, land to aftercare.">
            The project spine
          </SectionHeading>
          <a
            href="#capability"
            className="num mb-10 text-xs uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Skip spine ↓
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="hidden md:block motion-reduce:hidden">
          <SpinePinned />
        </div>
        <div className="md:hidden motion-reduce:hidden">
          <SpineStepper />
        </div>
        <div className="hidden motion-reduce:block">
          <SpineStatic />
        </div>
      </div>
    </section>
  );
}
