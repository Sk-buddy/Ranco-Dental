// Tooth-themed icon family for treatment-page procedure steps — a shared tooth
// silhouette with a small differentiator per step, so they read as one set.
// getProcedureIcon() keyword-matches a step's title so future treatment pages
// (with differently-named steps) still get a sensible icon automatically.

const TOOTH_PATH =
  "M12 3.5c-3 0-5.5 2-5.5 5 0 1.8.7 3 1.4 4.3.9 1.7 1.8 3.4 2.1 6.2.1.9.9 1.5 2 1.5s1.9-.6 2-1.5c.3-2.8 1.2-4.5 2.1-6.2.7-1.3 1.4-2.5 1.4-4.3 0-3-2.5-5-5.5-5Z";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DiagnosisIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d={TOOTH_PATH} />
      <circle cx="18" cy="6" r="2.6" />
      <path d="M19.8 7.8 21.5 9.5" />
    </svg>
  );
}

export function AnesthesiaIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d={TOOTH_PATH} />
      <path d="M18.3 3.8c-1.1 1.3-1.8 2.3-1.8 3.2a1.8 1.8 0 1 0 3.6 0c0-.9-.7-1.9-1.8-3.2Z" />
    </svg>
  );
}

export function CleaningIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d={TOOTH_PATH} />
      <path d="M17 4.5 18.2 3.3M19.5 6.5l1.5-.6M17.5 8 19 8.8" />
    </svg>
  );
}

export function FillingIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d={TOOTH_PATH} />
      <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RestorationIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d={TOOTH_PATH} />
      <path d="M8.5 6.2 10 3.8l2 2 2-2 1.5 2.4" />
    </svg>
  );
}

export function GenericToothIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d={TOOTH_PATH} />
    </svg>
  );
}

const KEYWORD_MAP: [RegExp, (props: { className?: string }) => React.JSX.Element][] = [
  [/diagnos|x-?ray|exam/i, DiagnosisIcon],
  [/anesthe|numb/i, AnesthesiaIcon],
  [/clean|disinfect/i, CleaningIcon],
  [/fill|seal/i, FillingIcon],
  [/restor|crown|cap/i, RestorationIcon],
];

export function getProcedureIcon(stepTitle: string) {
  const match = KEYWORD_MAP.find(([pattern]) => pattern.test(stepTitle));
  return match ? match[1] : GenericToothIcon;
}
