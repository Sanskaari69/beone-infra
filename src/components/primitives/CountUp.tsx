import type { CSSProperties } from "react";
import { renderScaled, scaleIN } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  className?: string;
}

/**
 * Counts up once on load, in pure CSS (see .count-anim in globals.css). 375000 counts to "3.75 lakh".
 *
 * The real value is always in the DOM (.count-static): it is what screen readers, search engines,
 * reduced-motion users and browsers without CSS round()/@property see. Where supported, it is
 * swapped for a counter-driven pseudo-element. That keeps the animation off the JavaScript path
 * and out of LCP candidates.
 */
export function CountUp({ value, className }: CountUpProps) {
  const s = scaleIN(value);
  const scale = 10 ** s.decimals;
  const final = renderScaled(s.value, s);

  const style = {
    "--num": Math.round(s.value * scale),
    "--div": scale,
    "--suffix": `"${s.suffix}"`,
    minWidth: `${final.length}ch`,
  } as CSSProperties;

  return (
    <span className={cn("inline-block", className)}>
      <span className="count-static">{final}</span>
      <span aria-hidden="true" className="count-anim" data-dec={s.decimals} style={style} />
    </span>
  );
}
