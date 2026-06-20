interface TabIconProps {
  className?: string;
}

export function TabIconTraining({className}: TabIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true">
      <path
        d="M2.5 8h11M5.5 5.5 3 8l2.5 2.5M10.5 5.5 13 8l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TabIconCalculator({className}: TabIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true">
      <rect
        x="2.5"
        y="1.5"
        width="11"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5 4.5h6M5 7.5h2M9 7.5h2M5 10.5h2M9 10.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TabIconTheory({className}: TabIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true">
      <path
        d="M3 2.5h7.5L13 5v8.5a.5.5 0 0 1-.74.44L8 11.5 3.74 13.94A.5.5 0 0 1 3 13.5V2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 2.5v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TabIconSplit({className}: TabIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TabIconJournal({className}: TabIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true">
      <path
        d="M4.5 1.5h7a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6 5h4M6 8h4M6 11h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
