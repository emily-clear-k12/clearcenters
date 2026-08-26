// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.8B, energy causing
// motion.

export const SERVER_CASE = {
  standard: "3.8B-SC",
  title: "Bigger Ball, Bigger Hit?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The same marble knocks down more pins from higher up\" is TRUE because it went from 2 pins to 7 pins. \"The fast small marble matches a slow heavy one\" is TRUE because both knocked down 7 pins. \"You always need a heavier ball\" is FALSE because speed matters just as much as mass.",
  mustInclude: [
    "Signal A (higher release knocks down more pins) marked True.",
    "Signal B (fast small marble matches heavy marble) marked True.",
    "Signal C (always need a heavier ball) marked False.",
    "Evidence picks name the low/high release trials for Signal A.",
    "Evidence picks name the fast small vs. slow heavy trials for Signal B.",
  ],
};
