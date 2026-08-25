// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.10B, soil composition.

export const SERVER_CASE = {
  standard: "3.10B-SC",
  title: "Just Dirt?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Soil has broken-down rock in it\" is TRUE because sifting shows gritty grains matching nearby rock. \"Soil has decayed plant material in it\" is TRUE because dark crumbly bits still show leaf vein patterns. \"Soil is one single material\" is FALSE because sifting and settling both separate it into rock grains, plant bits, and air.",
  mustInclude: [
    "Signal A (rock pieces) marked True.",
    "Signal B (plant material) marked True.",
    "Signal C (one single material) marked False.",
    "Evidence picks name the rock-grain evidence for Signal A.",
    "Evidence picks name the decayed-plant evidence for Signal B.",
  ],
};
