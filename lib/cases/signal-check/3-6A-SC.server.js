// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.6A covers magnetism
// directly.

export const SERVER_CASE = {
  standard: "3.6A-SC",
  title: "Sticks to Some, Not All",
  stemMode: "dropdown",
  modelAnswer:
    "\"Magnets stick to every metal object\" is FALSE because aluminum foil and the copper penny did NOT react to the magnet. \"Some metals are not magnetic\" is TRUE because the paper clip and the iron nail reacted, but the others did not.",
  mustInclude: [
    "Signal A (every metal object) marked False.",
    "Signal B (some metals are not magnetic) marked True.",
    "Evidence picks name the non-reacting objects (foil, penny) for Signal A.",
    "Evidence picks name the reacting objects (paper clip, nail) for Signal B.",
  ],
};
