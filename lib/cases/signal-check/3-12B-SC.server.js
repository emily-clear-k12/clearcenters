// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12B, food-web dependence.

export const SERVER_CASE = {
  standard: "3.12B-SC",
  title: "What Happens If the Frogs Disappear?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Frogs are a food source for herons\" is TRUE because the diet log and feeding watch both confirm it. \"Herons would switch food with zero real change\" is MISLEADING because while herons do eat other food, the heron count still dropped when frogs dropped. \"Removing one species has zero effect on the rest of the pond\" is FALSE because the survey shows a ripple effect across the food web.",
  mustInclude: [
    "Signal A (frogs are a heron food source) marked True.",
    "Signal B (herons switch food with zero real change) marked Misleading.",
    "Signal C (removing one species has zero effect) marked False.",
    "Evidence picks name the heron diet/feeding watch for Signal A.",
    "Evidence picks name the heron count drop for Signal B.",
  ],
};
