// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.4.2F. TEKS 4.2F — compare and order decimals using concrete and visual models to the hundredths.

export const SERVER_CASE = {
  standard: "MA.4.2F",
  title: "The Frog Jump Final",
  bigQuestion: "Hopper jumped 0.45 meters. Ribbit jumped 0.5 meters. Which frog really jumped farther, and how can you tell?",
  evidenceBank: [
    "Ribbit's tape mark sits farther along Meter Pete than Hopper's",
    "Five of Tenley's ten strips cover the same space as fifty of Centi's squares",
    "Shading 0.45 on Centi fills 45 of the 100 squares",
    "0.5 and 0.50 name the same distance",
    "To compare decimals, line up the same places: tenths with tenths, hundredths with hundredths"
  ],
  trapLine: "Hopper jumped 0.45 and Ribbit only jumped 0.5. Forty-five is way more than five, so Hopper wins.",
  castNames: {
    jordan: "Jordan",
    ribbit: "Ribbit",
    tenley: "Tenley",
    centi: "Centi",
    pete: "Meter Pete",
    okafor: "Judge Okafor"
  },
  distractors: "Comparing the digits after the decimal as if they were whole numbers (45 vs. 5); thinking more digits after the decimal means a bigger number; thinking 0.5 and 0.05 are the same; trusting a calculation over a measurement without checking which one was read wrong.",
  mustInclude: [
    "It says Ribbit jumped farther.",
    "It explains that 0.5 equals 0.50, or that five tenths is fifty hundredths.",
    "It compares the same place values instead of comparing 45 and 5 as whole numbers.",
    "It uses the tape marks or a grid model as evidence.",
    "It gives Judge Okafor a rule for comparing decimals."
  ],
};
