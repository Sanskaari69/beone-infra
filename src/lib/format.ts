/** Indian number conventions: grouping (12,34,567), lakh / crore, sq.ft, ₹, DD.MM.YYYY. */

const IN = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export function formatNumberIN(n: number): string {
  return IN.format(n);
}

export interface Scaled {
  value: number;
  decimals: number;
  suffix: "" | " lakh" | " crore";
}

/** Split a number into a display mantissa and a lakh/crore suffix, e.g. 375000 -> 3.75 lakh. */
export function scaleIN(n: number): Scaled {
  const abs = Math.abs(n);
  if (abs >= 1e7) return withDecimals(n / 1e7, " crore");
  if (abs >= 1e5) return withDecimals(n / 1e5, " lakh");
  return { value: n, decimals: Number.isInteger(n) ? 0 : 2, suffix: "" };
}

function withDecimals(value: number, suffix: Scaled["suffix"]): Scaled {
  const rounded = Math.round(value * 100) / 100;
  const decimals = Number.isInteger(rounded) ? 0 : Math.abs(rounded * 10 - Math.round(rounded * 10)) < 1e-9 ? 1 : 2;
  return { value: rounded, decimals, suffix };
}

/** Render a scaled value with a given animated mantissa. */
export function renderScaled(mantissa: number, s: Scaled): string {
  return `${mantissa.toFixed(s.decimals)}${s.suffix}`;
}

export function formatLakh(n: number): string {
  const s = scaleIN(n);
  return s.suffix === "" ? formatNumberIN(n) : renderScaled(s.value, s);
}

export function formatSqft(n: number): string {
  return `${formatLakh(n)} sq.ft`;
}

export function formatRupees(n: number): string {
  return `₹${formatLakh(n)}`;
}

/** Date -> DD.MM.YYYY */
export function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

/** True for a well-formed DD.MM.YYYY string that is a real calendar date. */
export function isDateString(s: string): boolean {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
  if (!m) return false;
  const [, dd, mm, yyyy] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return d.getFullYear() === Number(yyyy) && d.getMonth() === Number(mm) - 1 && d.getDate() === Number(dd);
}
