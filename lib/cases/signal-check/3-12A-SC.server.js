// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12A, seasonal survival.

export const SERVER_CASE = {
  standard: "3.12A-SC",
  title: "Where Do They Go in November?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Several animals are gone by November\" is TRUE because the count shows geese, butterflies, and the groundhog missing. \"Every missing animal died\" is FALSE because tagged geese were tracked alive 800 miles south, and the groundhog is hibernating, not dead. \"Different animals handle cold differently\" is TRUE because geese/butterflies migrate while groundhogs hibernate.",
  mustInclude: [
    "Signal A (animals missing by November) marked True.",
    "Signal B (every missing animal died) marked False.",
    "Signal C (animals handle cold differently) marked True.",
    "Evidence picks name the October/November counts for Signal A.",
    "Evidence picks name the goose tracking and groundhog burrow for Signal B.",
  ],
};
