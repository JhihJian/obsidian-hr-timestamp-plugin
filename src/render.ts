import { timestampPattern } from "./pattern";

export function decorateTimestampDividers(container: HTMLElement): void {
  const paragraphs = collectCandidateParagraphs(container);

  for (const paragraph of paragraphs) {
    const label = paragraph.querySelector(":scope > em:only-child");

    if (label === null) {
      continue;
    }

    if (!isSingleLineTimestampDivider(paragraph, label)) {
      continue;
    }

    removeDividerMarkerText(paragraph, label);
    paragraph.classList.add("hr-timestamp-divider");
    label.classList.add("hr-timestamp-label");
  }
}

function collectCandidateParagraphs(container: HTMLElement): HTMLElement[] {
  const paragraphs: HTMLElement[] = Array.from(container.querySelectorAll("p"));

  if (container.tagName === "P") {
    paragraphs.unshift(container);
  }

  return paragraphs;
}

function isSingleLineTimestampDivider(paragraph: HTMLElement, label: Element): boolean {
  if (!timestampPattern.test(label.textContent?.trim() ?? "")) {
    return false;
  }

  const textBeforeLabel = Array.from(paragraph.childNodes)
    .slice(0, Array.from(paragraph.childNodes).indexOf(label))
    .map((node) => node.textContent ?? "")
    .join("");

  const textAfterLabel = Array.from(paragraph.childNodes)
    .slice(Array.from(paragraph.childNodes).indexOf(label) + 1)
    .map((node) => node.textContent ?? "")
    .join("");

  return textBeforeLabel.trim() === "---" && textAfterLabel.trim() === "";
}

function removeDividerMarkerText(paragraph: HTMLElement, label: Element): void {
  for (const node of Array.from(paragraph.childNodes)) {
    if (node === label) {
      return;
    }

    paragraph.removeChild(node);
  }
}
