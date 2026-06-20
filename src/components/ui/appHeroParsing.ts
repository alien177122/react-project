/** Parses hero titles for display emphasis (RPE–RIR accent or legacy week count). */
export function parseAppHeroTitle(title: string): {
  lead: string;
  num: string | null;
  tail: string | null;
} {
  const rpeMatch = title.match(/^(.+?)\s+(RPE[–-]RIR)$/iu);
  if (rpeMatch) {
    return {
      lead: rpeMatch[1].trim(),
      num: rpeMatch[2].replace('-', '–'),
      tail: null,
    };
  }

  const weekMatch = title.match(/^(.+?)\s+(\d+)\s+(.+)$/u);
  if (weekMatch) {
    return {
      lead: weekMatch[1].trim(),
      num: weekMatch[2],
      tail: weekMatch[3].trim(),
    };
  }

  return {lead: title, num: null, tail: null};
}

export function appHeroChipsFromSubtitle(subtitle: string): string[] | null {
  if (!subtitle.includes('·')) return null;
  const chips = subtitle
    .split('·')
    .map(part => part.trim())
    .filter(Boolean);
  return chips.length > 0 ? chips : null;
}
