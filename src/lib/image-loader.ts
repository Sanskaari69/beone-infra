import manifest from "../data/images.generated.json";

/**
 * next/image loader for a static export. Pre-optimised WebP files live in /public/projects as
 * <id>-<width>.webp; this picks the smallest one that covers the requested width.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const id = src.replace(/^\/projects\//, "").replace(/\.webp$/, "");
  const widths = (manifest as Record<string, { widths: number[] }>)[id]?.widths ?? [];
  const pick = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/projects/${id}-${pick}.webp`;
}
