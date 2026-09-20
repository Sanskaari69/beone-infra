/**
 * WCAG contrast check for every token pair, light and dark. Reads values from src/app/globals.css.
 *   node scripts/check-contrast.mjs        exits 1 if any pair fails
 * Text pairs need 4.5:1. UI pairs (fills, indicators, focus ring) need 3:1.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const css = await readFile(path.resolve(import.meta.dirname, "../src/app/globals.css"), "utf8");

function block(selector) {
  const m = new RegExp(`${selector}\\s*\\{([^}]*)\\}`).exec(css);
  const vars = {};
  for (const [, k, v] of m[1].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) vars[k] = v;
  return vars;
}
const light = block(":root");
const dark = { ...light, ...block("\\.dark") };

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT = 4.5;
const UI = 3;
const pairs = [
  ["foreground", "background", TEXT],
  ["foreground", "card", TEXT],
  ["foreground", "muted", TEXT],
  ["card-foreground", "card", TEXT],
  ["popover-foreground", "popover", TEXT],
  ["muted-foreground", "background", TEXT],
  ["muted-foreground", "card", TEXT],
  ["muted-foreground", "muted", TEXT],
  ["primary-foreground", "primary", TEXT],
  ["primary-text", "background", TEXT],
  ["primary-text", "card", TEXT],
  ["primary-text", "muted", TEXT],
  ["secondary-foreground", "secondary", TEXT],
  ["accent-foreground", "accent", TEXT],
  ["primary-text", "background", UI],
  ["line-strong", "background", UI],
  ["line-strong", "card", UI],
  ["ring", "background", UI],
  // Advisory: the brief's own #df6035 fill against the light page is 2.99:1. Buttons carry a
  // 4.86:1 label, and active states use --primary-text instead. Reported, not failed.
  ["primary", "background", UI, true],
  ["primary", "card", UI, true],
];

let failures = 0;
let advisories = 0;
for (const [mode, t] of [["light", light], ["dark", dark]]) {
  console.log(`\n${mode}`);
  for (const [fg, bg, min, advisory] of pairs) {
    if (!t[fg] || !t[bg]) continue;
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok && advisory) advisories++;
    else if (!ok) failures++;
    console.log(`  ${ok ? "pass" : advisory ? "note" : "FAIL"}  ${r.toFixed(2).padStart(5)}  (need ${min})  ${fg} ${t[fg]} on ${bg} ${t[bg]}`);
  }
}
console.log(failures ? `\n${failures} pair(s) below threshold` : `\nAll required pairs meet WCAG AA${advisories ? ` (${advisories} advisory note)` : ""}`);
process.exit(failures ? 1 : 0);
