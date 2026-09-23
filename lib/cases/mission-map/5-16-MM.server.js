// Mission Map — "Author's Purpose Control Room" — SERVER ONLY.
// Never import this from a client component. See 5-16-MM.public.js for the
// TEKS 5.10A alignment and the design notes.

export const SERVER_CASE = {
  standard: "5.16-MM",
  title: "Author's Purpose Control Room",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "quickScan", correctChoiceId: "a" },
    { id: "cp5", type: "showdown", correctSide: "B" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The author's purpose is to persuade readers to go to the council meeting and ask for the streetlights to be dimmed after midnight. The author's message is that bright lights are taking the night sky away from people, especially children, and the town can fix that. The word \"stolen\" helps because it makes the lights sound like a thief, so readers feel that something unfair has been taken from their kids. The 80 percent statistic helps because it shows the problem is huge and real, not just one person's complaint, which makes action feel urgent. \"Because it is interesting\" is not a good explanation because it does not say what the detail DOES for the author's goal. Authors choose words and facts on purpose.",

  mustInclude: [
    "States the author's purpose (persuade readers to ask the council to dim the streetlights) and the message (bright lights are taking away the night sky)",
    "Explains how at least TWO specific choices serve that purpose — e.g., the loaded word 'stolen' (emotion/unfairness) and the 80 percent statistic (scale, credibility, urgency)",
    "Explains that 'because it is interesting' does not connect a detail to the author's purpose",
  ],
};
