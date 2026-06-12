import { describe, expect, test } from "vitest";
import { parseSingleLineTimestampDivider } from "./pattern";

describe("parseSingleLineTimestampDivider", () => {
  test("extracts timestamp from a single-line timestamp divider", () => {
    expect(parseSingleLineTimestampDivider("--- *2026-06-12 10:13*")).toBe("2026-06-12 10:13");
  });

  test("does not match a plain horizontal rule", () => {
    expect(parseSingleLineTimestampDivider("---")).toBeNull();
  });

  test("does not match non timestamp italic content", () => {
    expect(parseSingleLineTimestampDivider("--- *not a timestamp*")).toBeNull();
  });
});
