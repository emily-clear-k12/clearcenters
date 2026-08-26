// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.13A, structure and
// function.

export const SERVER_CASE = {
  standard: "3.13A-SC",
  title: "Wrong Legs for the Job?",
  stemMode: "dropdown",
  modelAnswer:
    "\"The mole dug fast with its claws\" is TRUE because it dug 12 inches in 45 seconds. \"The rabbit couldn't dig with its legs\" is TRUE because it only loosened an inch in a full minute. \"The mole's claws are just worse legs\" is FALSE because the rabbit's legs are built for running fast, not digging — different structures fit different jobs.",
  mustInclude: [
    "Signal A (mole digs fast with its claws) marked True.",
    "Signal B (rabbit can't dig well) marked True.",
    "Signal C (mole's claws are just worse legs) marked False.",
    "Evidence picks name the digging timer and claw shape for Signal A.",
    "Evidence picks name the rabbit's running speed for Signal C.",
  ],
};
