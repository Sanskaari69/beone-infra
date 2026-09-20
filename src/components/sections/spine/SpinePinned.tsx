"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll } from "framer-motion";
import { spineStages } from "@/data/beone";
import { SpineBar } from "./SpineBar";
import { StageDetail } from "./StageDetail";
import { useActiveStage } from "./useActiveStage";

/** Each stage gets this much scroll distance. Native scroll only: no wheel hijack, no snap, no lock. */
const STAGE_VH = 55;

export function SpinePinned() {
  const track = useRef<HTMLDivElement>(null);
  const active = useActiveStage(track);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const total = spineStages.length;

  const select = (i: number) => {
    track.current
      ?.querySelector<HTMLElement>(`[data-stage-index="${i}"]`)
      ?.scrollIntoView({ block: "center" });
  };

  return (
    <LazyMotion features={domAnimation} strict>
    <div ref={track} className="relative" style={{ height: `${total * STAGE_VH}vh` }}>
      {spineStages.map((s, i) => (
        <div
          key={s.id}
          data-stage-index={i}
          aria-hidden="true"
          className="absolute inset-x-0"
          style={{ top: `${i * STAGE_VH}vh`, height: `${STAGE_VH}vh` }}
        />
      ))}

      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col justify-center gap-10 py-8">
        <div className="flex items-center justify-between">
          <p className="num text-xs uppercase tracking-[0.18em] text-muted-foreground">
            You are here{" "}
            <span className="ml-2 text-primary-text">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} {spineStages[active].label}
            </span>
          </p>
        </div>

        <div>
          <SpineBar active={active} onSelect={select} />
          <div className="mt-1 h-px w-full bg-border">
            <m.div className="h-px origin-left bg-primary-text" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>

        <m.div
          key={spineStages[active].id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <StageDetail stage={spineStages[active]} index={active} />
        </m.div>

        <p className="sr-only" aria-live="polite">
          Stage {active + 1} of {total}: {spineStages[active].label}
        </p>
      </div>
    </div>
    </LazyMotion>
  );
}
