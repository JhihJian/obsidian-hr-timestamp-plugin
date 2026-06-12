export const timestampPattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
export const singleLineTimestampDividerPattern = /^--- \*(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\*$/;

export function parseSingleLineTimestampDivider(lineText: string): string | null {
  return singleLineTimestampDividerPattern.exec(lineText)?.[1] ?? null;
}
