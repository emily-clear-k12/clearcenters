// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.9A).

export const SERVER_CASE = {
  standard: "4.9A",
  title: "Chill Takes Credit for Sunset",
  bigQuestion: "Sunset moved from 8:40 in June to 5:31 in December. Is the cold making that happen, or is something else?",
  evidenceBank: [
    "Sunset was 8:40 in June and 5:31 in December",
    "Sunset had already been getting earlier for eight weeks before the first cold day",
    "During the warm week in November, sunset kept getting earlier anyway",
    "June has about 14 hours of daylight and December about 10",
    "The same sequence repeats in the same order every year"
  ],
  trapLine: "The cold makes the sun clock off early. Short days are my doing.",
  castNames: {
    chill: "Chill",
    log: "The Sunset Log",
    daylight: "Daylight",
    nov: "The Warm Week",
    porch: "The Porch Light",
    devi: "Devi"
  },
  distractors: "Reversing cause and effect because cold weather and early sunsets appear together; treating the change in daylight as random or unpredictable; assuming the weather on a given day determines the length of daylight; thinking sunset time changes suddenly rather than shifting gradually across the whole year.",
  mustInclude: [
    "The chat describes the yearly pattern.",
    "It uses the length of daylight, not just sunset time.",
    "It uses the eight-weeks-before evidence.",
    "It uses the warm November week.",
    "It tells Chill she has the pattern backwards."
  ],
};
