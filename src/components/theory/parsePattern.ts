export type PatternPiece = {kind: 'chip'; text: string} | {kind: 'op'; text: string};

const OPS = new Set(['×', '=', '→']);

function tokenize(pattern: string, splitter: RegExp): PatternPiece[] {
  return pattern
    .split(splitter)
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => (OPS.has(part) ? {kind: 'op', text: part} : {kind: 'chip', text: part}));
}

/** Product chips only for ×/=. Cascades keep arrows. Otherwise one chip. */
export function splitPattern(pattern: string): PatternPiece[] {
  const trimmed = pattern.trim();
  if (!trimmed) return [];
  if (trimmed.includes('×') && trimmed.includes('=')) {
    return tokenize(trimmed, /([×=])/);
  }
  if (trimmed.includes('→')) {
    return tokenize(trimmed, /(→)/);
  }
  return [{kind: 'chip', text: trimmed}];
}
