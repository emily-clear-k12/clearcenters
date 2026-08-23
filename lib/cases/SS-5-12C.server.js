// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.12C, TEKS 5.12C).

export const SERVER_CASE = {
  standard: "SS.5.12C",
  title: "The City That Kept Growing",
  bigQuestion: "How can immigration and migration contribute to U.S. economic development and growth?",
  evidenceBank: [
    "The city gained many new residents",
    "Factories and construction crews hired more workers",
    "New stores and services opened in growing neighborhoods"
  ],
  trapLine: "Immigration and migration mainly make places more crowded; they do not do much to help an economy grow.",
  castNames: {
    miles: "Miles Carter",
    ana: "Ana Morales",
    isaiah: "Isaiah Green",
    mei: "Mei Chen",
    editor: "Ms. Brooks"
  },
  distractors: "Treating population growth as the only effect; saying newcomers only take jobs or only create jobs; assuming all immigrants and migrants had identical experiences; listing workers, stores, and customers without connecting them to growth; ignoring possible pressures on housing or services.",
  mustInclude: [
    "Connects immigration or migration to workers, skills, or labor.",
    "Connects population growth to increased demand for goods or services.",
    "Explains how newcomers can support or create businesses.",
    "Connects at least two effects to economic development or growth.",
    "Rejects the idea that immigration and migration only create crowding."
  ],
};
