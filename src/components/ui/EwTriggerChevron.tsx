interface EwTriggerChevronProps {
  className?: string;
}

/** Decorative chevron for `.ew-select` triggers — Lucide-style stroke, quiet UI gray via `currentColor`. */
export function EwTriggerChevron({className}: EwTriggerChevronProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
