import { describe, expect, test } from "vitest";
import { Window } from "happy-dom";
import { decorateTimestampDividers } from "./render";

function createContainer(html: string) {
  const window = new Window();
  const container = window.document.createElement("div");
  container.innerHTML = html;
  return container;
}

describe("decorateTimestampDividers", () => {
  test("marks a single-line timestamp divider paragraph", () => {
    const container = createContainer("<p>--- <em>2026-06-12 10:13</em></p>");

    decorateTimestampDividers(container);

    const divider = container.querySelector("p");
    const label = container.querySelector("em");

    expect(divider?.classList.contains("hr-timestamp-divider")).toBe(true);
    expect(label?.classList.contains("hr-timestamp-label")).toBe(true);
    expect(divider?.textContent?.trim()).toBe("2026-06-12 10:13");
  });

  test("does not mark an italic paragraph that is not preceded by an hr", () => {
    const container = createContainer("<p><em>2026-06-12 10:13</em></p>");

    decorateTimestampDividers(container);

    expect(container.querySelector("p")?.className).toBe("");
    expect(container.querySelector("em")?.className).toBe("");
  });

  test("does not mark non timestamp italic text", () => {
    const container = createContainer("<p>--- <em>not a timestamp</em></p>");

    decorateTimestampDividers(container);

    expect(container.querySelector("p")?.className).toBe("");
    expect(container.querySelector("em")?.className).toBe("");
  });

  test("does not change a plain horizontal rule", () => {
    const container = createContainer("<hr><p>regular content</p>");

    decorateTimestampDividers(container);

    expect(container.querySelector("hr")?.className).toBe("");
    expect(container.querySelector("p")?.className).toBe("");
  });

  test("marks the container itself when it is the timestamp paragraph", () => {
    const window = new Window();
    const root = window.document.createElement("div");
    root.innerHTML = "<p>--- <em>2026-06-12 10:13</em></p>";
    const paragraph = root.querySelector("p");

    decorateTimestampDividers(paragraph as unknown as HTMLElement);

    expect(paragraph?.classList.contains("hr-timestamp-divider")).toBe(true);
    expect(root.querySelector("em")?.classList.contains("hr-timestamp-label")).toBe(true);
  });
});
