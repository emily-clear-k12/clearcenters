// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.10A).

export const SERVER_CASE = {
  standard: "3.10A",
  title: "One of You Is Making This Up",
  bigQuestion: "It is 2 o'clock in both cities. One is 19°C and pouring. The other is 34°C and dry. How can both be true?",
  evidenceBank: [
    "Noor's city was 19°C with heavy rain at 2:00",
    "Isa's city was 34°C with no rain at 2:00",
    "Both cousins held their phones up to a clock saying 2:00",
    "The two cities are 380 kilometres apart",
    "The next day the two cities swapped weather"
  ],
  trapLine: "It's 2 o'clock and it's raining, so you're faking. One of us is making this up.",
  castNames: {
    noor: "Noor",
    isa: "Isa",
    chart: "The Two-City Chart",
    vane: "The Wind Vane",
    dex: "Dex"
  },
  distractors: "Thinking the weather where you are is the weather everywhere; assuming two different reports at the same time means someone is wrong; comparing two places at different times and calling it the same moment; thinking only temperature counts as weather and ignoring wind direction and precipitation.",
  mustInclude: [
    "The chat uses both temperatures.",
    "It uses the rain or the wind.",
    "It uses the clock check.",
    "It says the two places are different places.",
    "It gives Dex the rule for the chart."
  ],
};
