// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.6B, solid vs. liquid
// properties.

export const SERVER_CASE = {
  standard: "3.6B-SC",
  title: "Does It Pour Like Water?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Poured sugar forms a sloped pile, not a flat surface\" is TRUE because it piles into a cone shape while water spreads flat. \"Individual grains keep the same shape\" is TRUE because magnified photos show identical grains piled or spread out. \"Being pourable means it's a liquid\" is FALSE because flour also pours and is a solid — the real test is whether each piece keeps its own shape.",
  mustInclude: [
    "Signal A (sugar piles into a sloped shape, unlike water) marked True.",
    "Signal B (grains keep their shape and size) marked True.",
    "Signal C (pourable = liquid) marked False.",
    "Evidence picks name the cone shape and water comparison for Signal A.",
    "Evidence picks name the flour comparison for Signal C.",
  ],
};
