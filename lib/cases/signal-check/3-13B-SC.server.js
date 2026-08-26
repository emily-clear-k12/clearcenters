// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.13B, life cycles.

export const SERVER_CASE = {
  standard: "3.13B-SC",
  title: "Same Bug, or Two?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The pond bug and dragonfly share the same mark\" is TRUE because the June and July tag checks show the same red dot. \"They look completely different\" is TRUE because one has gills and no wings, the other has wings and no gills. \"They must be two different bugs\" is FALSE because every tagged pond bug grew into a matching dragonfly — it's the same bug changing shape as it grows.",
  mustInclude: [
    "Signal A (same mark on pond bug and dragonfly) marked True.",
    "Signal B (they look completely different) marked True.",
    "Signal C (must be two different bugs) marked False.",
    "Evidence picks name the June/July tag checks for Signal A.",
    "Evidence picks name the tag match results for Signal C.",
  ],
};
