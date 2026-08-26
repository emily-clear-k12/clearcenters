// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.7B, force size and
// direction.

export const SERVER_CASE = {
  standard: "3.7B-SC",
  title: "Win by Hitting Harder?",
  stemMode: "dropdown",
  modelAnswer:
    "\"A hard hit sent the disc past the target\" is TRUE because 190 cm is well past the 120 cm target line. \"A lighter, aimed tap landed on the target\" is TRUE because it traveled exactly 120 cm. \"Hitting harder always wins\" is FALSE because the score log shows aimed soft taps scoring more points than overshooting hard hits.",
  mustInclude: [
    "Signal A (hard hit overshoots the target) marked True.",
    "Signal B (soft aimed tap lands on target) marked True.",
    "Signal C (hitting harder always wins) marked False.",
    "Evidence picks name the hard hit distance for Signal A.",
    "Evidence picks name the score log for Signal C.",
  ],
};
