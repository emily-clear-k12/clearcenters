// SERVER ONLY. Never import this from a "use client" component. Grade 3
// Signal Check is full dropdown mode, so there's no open-response text to
// grade with Claude — this file just holds the teacher-facing model answer
// and a light rubric note for the grading page.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.3A, physical
// environments.

export const SERVER_CASE = {
  standard: "SS.3.3A-SC",
  title: "Same Weather, Same Place?",
  stemMode: "dropdown",
  modelAnswer:
    "\"Desert Flats has sandy soil and cactus\" is TRUE, matching the soil and plant surveys. \"Green Valley has pine trees and damp soil\" is TRUE, matching its own soil and plant surveys. \"Since both places hit 75°F and sunny today, their land must be nearly identical\" is FALSE because the two places sit at very different elevations and get very different amounts of rain each year.",
  mustInclude: [
    "Signal A (Desert Flats' dry soil and cactus) marked True.",
    "Signal B (Green Valley's damp soil and pines) marked True.",
    "Signal C (matching weather means matching land) marked False.",
    "Evidence picks name Desert Flats' soil and plant survey for Signal A.",
    "Evidence picks name elevation and rainfall records for Signal C.",
  ],
};
