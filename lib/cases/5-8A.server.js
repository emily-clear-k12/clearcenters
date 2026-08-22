// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.8A",
  title: "The Self-Powered Sneakers",
  bigQuestion: "Do light-up sneakers really run on foot power, or is something else going on?",
  evidenceBank: [
    "Sneaker still lights up when held still and the hidden button is pressed by hand (no footstep at all)",
    "Opening the sole reveals a coin-cell battery and a small switch",
    "Battery rating: 3 volts, chemical energy stored inside",
    "Bulb feels warm after lighting for a minute \u2014 some energy becomes heat, not just light"
  ],
  trapLine: "I run on foot power \u2014 no battery, just my own steps making the light.",
  castNames: {
    zippy: "Zippy the Sneaker",
    benny: "Benny the Button Battery",
    sparks: "Sparks the Switch",
    cole: "Cole the Kid"
  },
  distractors: "Thinking energy is \"used up\" and disappears rather than transforming into another form (including heat, which is easy to overlook).",
  mustInclude: [
    "Names all three energy forms in order (chemical \u2192 electrical \u2192 light)",
    "Identifies the battery as the true chemical-energy start",
    "Explains the footstep's role as triggering the switch, not creating energy",
    "Notes heat as a side transformation",
    "States that energy transforms rather than appearing from nothing"
  ],
};
