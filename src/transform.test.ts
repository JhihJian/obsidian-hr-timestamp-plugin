import { describe, expect, test } from "vitest";
import {
  formatTimestamp,
  isInsideFence,
  planDividerReplacement,
  shouldTransformDividerLine
} from "./transform";

const fixedDate = new Date(2026, 5, 12, 9, 30, 0);

describe("formatTimestamp", () => {
  test("formats local time as YYYY-MM-DD HH:mm", () => {
    expect(formatTimestamp(fixedDate)).toBe("2026-06-12 09:30");
  });
});

describe("shouldTransformDividerLine", () => {
  test("matches an entire line with four or more hyphens", () => {
    expect(shouldTransformDividerLine("----------")).toBe(true);
  });

  test("allows whitespace around the hyphen run", () => {
    expect(shouldTransformDividerLine("   ----------   ")).toBe(true);
  });

  test("does not match a standard markdown horizontal rule", () => {
    expect(shouldTransformDividerLine("---")).toBe(false);
  });

  test("does not match hyphens embedded in text", () => {
    expect(shouldTransformDividerLine("abc----------def")).toBe(false);
  });
});

describe("isInsideFence", () => {
  test("detects when a line is inside a fenced code block", () => {
    const lines = ["before", "```", "----------"];
    expect(isInsideFence(lines, 2)).toBe(true);
  });

  test("detects when a line is outside a closed fenced code block", () => {
    const lines = ["```", "example", "```", "----------"];
    expect(isInsideFence(lines, 3)).toBe(false);
  });
});

describe("planDividerReplacement", () => {
  test("replaces an eligible previous line with a divider and italic timestamp", () => {
    const documentText = "Intro\n----------\n";
    const plan = planDividerReplacement(documentText, documentText.length, fixedDate);

    expect(plan).toEqual({
      from: 6,
      to: 16,
      insert: "--- *2026-06-12 09:30*"
    });
  });

  test("uses a hyphen horizontal rule at the start of a file", () => {
    const documentText = "----------\n";
    const plan = planDividerReplacement(documentText, documentText.length, fixedDate);

    expect(plan).toEqual({
      from: 0,
      to: 10,
      insert: "--- *2026-06-12 09:30*"
    });
  });

  test("does not replace a divider inside a fenced code block", () => {
    const documentText = "```text\n----------\n";
    expect(planDividerReplacement(documentText, documentText.length, fixedDate)).toBeNull();
  });

  test("does not replace text when cursor is not at the start of a new line after Enter", () => {
    const documentText = "----------\ntext";
    expect(planDividerReplacement(documentText, documentText.length, fixedDate)).toBeNull();
  });
});
