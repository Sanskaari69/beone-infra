/**
 * Downloads the old site's project images and writes optimised WebP variants.
 *   node scripts/fetch-images.mjs
 * Reads   src/data/image-sources.json   { projectId: "file.jpg" }
 * Writes  public/projects/<id>-<width>.webp
 *         src/data/images.generated.json   { projectId: { width, height, widths[] } }
 * Only widths at or below the original are written; small originals are never upscaled.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const BASE = "https://www.beoneinfra.com/assets/img/project/";
const WIDTHS = [480, 960, 1600];
// The old-site Signature Park file has blue letterbox bands baked into its left and right edges.
const CROPS = { "signature-park": { left: 223, top: 0, width: 1173, height: 900 } };
const root = path.resolve(import.meta.dirname, "..");
const sources = JSON.parse(await readFile(path.join(root, "src/data/image-sources.json"), "utf8"));
const outDir = path.join(root, "public/projects");
await mkdir(outDir, { recursive: true });

const manifest = {};
for (const [id, file] of Object.entries(sources)) {
  const res = await fetch(BASE + file);
  if (!res.ok) {
    console.error(`skip ${id}: ${BASE + file} -> ${res.status}`);
    continue;
  }
  const input = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(input).metadata();
  const crop = CROPS[id];
  const src = () => (crop ? sharp(input).extract(crop) : sharp(input));
  const width = crop ? crop.width : meta.width;
  const height = crop ? crop.height : meta.height;
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(width <= WIDTHS.at(-1) ? width : WIDTHS.at(-1));
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  for (const w of unique) {
    await src().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(outDir, `${id}-${w}.webp`));
  }
  manifest[id] = { width, height, widths: unique };
  console.log(`${id}: ${width}x${height} -> ${unique.join(", ")}`);
}

await writeFile(path.join(root, "src/data/images.generated.json"), JSON.stringify(manifest, null, 2) + "\n");
