// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12C, ecosystem response
// to a natural event.

export const SERVER_CASE = {
  standard: "3.12C-SC",
  title: "Was the Pond Really Ruined?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Water levels rose sharply\" is TRUE because the post-flood level is three feet above normal. \"Every species disappeared\" is FALSE because turtles and fish were both still found afterward. \"The flood affected species differently\" is TRUE because turtles held steady, fish dropped, and insects actually increased.",
  mustInclude: [
    "Signal A (water levels rose) marked True.",
    "Signal B (every species disappeared) marked False.",
    "Signal C (flood affected species differently) marked True.",
    "Evidence picks name the pre/post flood levels for Signal A.",
    "Evidence picks name the turtle and fish counts for Signal B.",
  ],
};
