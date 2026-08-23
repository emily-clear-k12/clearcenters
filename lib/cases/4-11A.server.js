// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.11A).

export const SERVER_CASE = {
  standard: "4.11A",
  title: "Wendy Says Just Use Wind",
  bigQuestion: "The camp needs power at 3am in February. Which source can promise that, and what does each one cost to use?",
  evidenceBank: [
    "Last February had 9 nights with almost no wind",
    "Solar gives about 4 usable hours a day in midwinter, none at 3am",
    "The generator runs any hour in any weather",
    "Diesel has to be trucked in and can't be replaced once burned",
    "The radio can't have a four-hour dead window"
  ],
  trapLine: "Renewable means unlimited. Use me. There is no downside to discuss.",
  castNames: {
    wendy: "Wendy",
    sol: "The Solar Array",
    gen: "The Generator",
    log: "The Wind Log",
    radio: "The Radio",
    mara: "Director Mara"
  },
  distractors: "Treating renewable as meaning unlimited or always available; assuming renewable sources have no disadvantages and nonrenewable ones have no advantages; picking a single source rather than considering a combination; ignoring what the specific job actually requires when comparing sources.",
  mustInclude: [
    "The chat sorts the sources into renewable and nonrenewable.",
    "It uses the nine still nights or the 3am problem.",
    "It names an advantage for something other than wind.",
    "It names a disadvantage of the generator too.",
    "It corrects what 'renewable' actually means."
  ],
};
