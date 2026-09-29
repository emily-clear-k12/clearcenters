// Small line icons for teacher pages — Sept 29, 2026.
// Replaces the emoji that used to sit in buttons and labels. Plain inline
// SVG, stroke = currentColor, so an icon takes the color of its text.
// <Icon name="signal" /> · <ConfidenceMark value="solid" />

import React from "react";

const PATHS = {
  signal: <><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2" /></>,
  alert: <><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  flag: <><path d="M4 22V4" /><path d="M4 4h13l-2.5 4.5L17 13H4" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  check: <><circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" /></>,
  gem: <><path d="M6 3h12l4 6-10 12L2 9Z" /><path d="M2 9h20M10 3 8 9l4 12 4-12-2-6" /></>,
  sparkle: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />,
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  send: <><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></>,
  retry: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3ZM3 19a2 2 0 0 0 2 2h1v-6H3Z" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  medal: <><circle cx="12" cy="8" r="6" /><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1" /></>,
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.3 1.3 1.2 2.4 2.5 2.8Z" />,
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
};

export default function Icon({ name, size = 16, style, title }) {
  const body = PATHS[name];
  if (!body) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      style={{ display: "inline-block", verticalAlign: "-0.18em", flexShrink: 0, ...style }}
    >
      {title && <title>{title}</title>}
      {body}
    </svg>
  );
}

// A big icon in a soft circle, for success and empty states.
export function IconBadge({ name, color = "#6a3fc6", size = 56 }) {
  return (
    <span style={{ display: "inline-grid", placeItems: "center", width: size, height: size, borderRadius: "50%", background: `${color}1f`, color, marginBottom: 10 }}>
      <Icon name={name} size={Math.round(size * 0.48)} />
    </span>
  );
}

// How sure the student felt: three rising bars, 1 to 3 filled, then the words.
export const CONFIDENCE_WORDS = { shaky: "Still shaky", solid: "Pretty solid", strong: "Really strong" };
const CONFIDENCE_LEVEL = { shaky: 1, solid: 2, strong: 3 };

export function ConfidenceMark({ value, words = true, color = "#6a3fc6" }) {
  const level = CONFIDENCE_LEVEL[value];
  if (!level) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }} title={`Felt: ${CONFIDENCE_WORDS[value]}`}>
      <svg width="16" height="13" viewBox="0 0 16 13" aria-hidden="true" style={{ flexShrink: 0 }}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={i * 6} y={9 - i * 4} width="4" height={4 + i * 4} rx="1.2" fill={i < level ? color : "#d9d1ee"} />
        ))}
      </svg>
      {words && <span>{CONFIDENCE_WORDS[value]}</span>}
    </span>
  );
}
