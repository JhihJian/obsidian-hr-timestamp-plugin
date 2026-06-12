export interface ReplacementPlan {
  from: number;
  to: number;
  insert: string;
}

export function formatTimestamp(date: Date): string {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function shouldTransformDividerLine(lineText: string): boolean {
  return /^\s*-{4,}\s*$/.test(lineText);
}

export function isInsideFence(lines: readonly string[], lineIndex: number): boolean {
  let insideFence = false;

  for (let index = 0; index < lineIndex; index += 1) {
    if (/^\s*(```|~~~)/.test(lines[index] ?? "")) {
      insideFence = !insideFence;
    }
  }

  return insideFence;
}

export function planDividerReplacement(
  documentText: string,
  cursorPosition: number,
  date: Date = new Date()
): ReplacementPlan | null {
  if (cursorPosition < 1 || cursorPosition > documentText.length) {
    return null;
  }

  if (documentText[cursorPosition - 1] !== "\n") {
    return null;
  }

  const beforeCursor = documentText.slice(0, cursorPosition);
  const linesBeforeCursor = beforeCursor.split("\n");
  const previousLineIndex = linesBeforeCursor.length - 2;

  if (previousLineIndex < 0) {
    return null;
  }

  const previousLineText = linesBeforeCursor[previousLineIndex] ?? "";

  if (!shouldTransformDividerLine(previousLineText)) {
    return null;
  }

  if (isInsideFence(linesBeforeCursor, previousLineIndex)) {
    return null;
  }

  const previousLineStart = linesBeforeCursor
    .slice(0, previousLineIndex)
    .reduce((offset, line) => offset + line.length + 1, 0);
  const previousLineEnd = previousLineStart + previousLineText.length;

  return {
    from: previousLineStart,
    to: previousLineEnd,
    insert: `--- *${formatTimestamp(date)}*`
  };
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}
