/** Parses hero titles for editorial kinetic emphasis (RPE–RIR, week count, or trailing word). */
export function parseAppHeroTitle(title: string): {
  lead: string;
  num: string | null;
  tail: string | null;
  ringLabel: string | null;
} {
  const rpeMatch = title.match(/^(.+?)\s+(RPE[–-]RIR)$/iu);
  if (rpeMatch) {
    return {
      lead: rpeMatch[1].trim(),
      num: rpeMatch[2].replace('-', '–'),
      tail: null,
      ringLabel: 'RPE·RIR',
    };
  }

  const weekMatch = title.match(/^(.+?)\s+(\d+)\s+(.+)$/u);
  if (weekMatch) {
    return {
      lead: weekMatch[1].trim(),
      num: weekMatch[2],
      tail: weekMatch[3].trim(),
      ringLabel: weekMatch[2],
    };
  }

  const trailingAccent = title.match(/^(.+?)\s+(\S+)$/u);
  if (trailingAccent && trailingAccent[1].trim() !== trailingAccent[2].trim()) {
    const tail = trailingAccent[2].trim();
    // Full word in aside — never truncate to "ТРЕ" / "СПЛ".
    return {
      lead: trailingAccent[1].trim(),
      num: tail,
      tail: null,
      ringLabel: tail.toUpperCase(),
    };
  }

  return {lead: title, num: null, tail: null, ringLabel: null};
}

export function appHeroChipsFromSubtitle(subtitle: string): string[] | null {
  if (!subtitle.includes('·')) return null;
  const chips = subtitle
    .split('·')
    .map(part => part.trim())
    .filter(Boolean);
  return chips.length > 0 ? chips : null;
}
