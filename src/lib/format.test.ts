import { describe, expect, it } from "vitest";
import { formatDate, formatLakh, formatNumberIN, formatRupees, formatSqft, isDateString, scaleIN } from "./format";

describe("Indian number formatting", () => {
  it("groups digits the Indian way", () => {
    expect(formatNumberIN(1234567)).toBe("12,34,567");
    expect(formatNumberIN(999)).toBe("999");
  });

  it("converts to lakh and crore", () => {
    expect(formatLakh(375000)).toBe("3.75 lakh");
    expect(formatLakh(500000)).toBe("5 lakh");
    expect(formatLakh(25000000)).toBe("2.5 crore");
    expect(formatLakh(48000)).toBe("48,000");
  });

  it("formats sq.ft and rupees", () => {
    expect(formatSqft(375000)).toBe("3.75 lakh sq.ft");
    expect(formatSqft(18000)).toBe("18,000 sq.ft");
    expect(formatRupees(10000000)).toBe("₹1 crore");
  });

  it("scales for count-up animation", () => {
    expect(scaleIN(375000)).toEqual({ value: 3.75, decimals: 2, suffix: " lakh" });
    expect(scaleIN(12)).toEqual({ value: 12, decimals: 0, suffix: "" });
  });
});

describe("dates", () => {
  it("formats DD.MM.YYYY", () => {
    expect(formatDate(new Date(2026, 8, 20))).toBe("20.09.2026");
    expect(formatDate(new Date(2026, 0, 5))).toBe("05.01.2026");
  });

  it("validates DD.MM.YYYY strings", () => {
    expect(isDateString("20.09.2026")).toBe(true);
    expect(isDateString("31.02.2026")).toBe(false);
    expect(isDateString("2026-09-20")).toBe(false);
  });
});
