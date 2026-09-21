// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.4.2G. TEKS 4.2G — relate decimals to fractions that name tenths and hundredths.

export const SERVER_CASE = {
  standard: "MA.4.2G",
  title: "Point Five or One Fifth",
  bigQuestion: "Eli's tablet says 0.5 battery. Maya's says 1/5. Are they really the same, and who should charge first?",
  evidenceBank: [
    "Volt lights 5 of his 10 bars for 0.5",
    "Volt lights only 2 of his 10 bars for 1/5",
    "Five dimes is 0.5 of a dollar; two dimes is 1/5 of a dollar",
    "0.5 means five tenths, which is the same as one half",
    "One of Fran's five equal parts is smaller than half the strip"
  ],
  trapLine: "0.5 and 1/5 are the same thing — they've both got a 5. It's a tie, and I called it first.",
  castNames: {
    eli: "Eli",
    maya: "Maya",
    volt: "Volt",
    fran: "Fran",
    dimes: "Dime Squad",
    june: "Grandma June"
  },
  distractors: "Treating a fraction and a decimal as equal because they share a digit; reading 1/5 as 0.5 or 0.15; thinking the decimal point just separates two numbers; forgetting that tenths and fifths are different-sized pieces of the same whole.",
  mustInclude: [
    "It says 0.5 and 1/5 are not the same.",
    "It explains that 0.5 is five tenths, or one half.",
    "It shows 1/5 equals two tenths, 0.2, or two dimes.",
    "It says Maya should charge first.",
    "It gives Grandma June a rule: look at what place the digit is in, not just the digit."
  ],
};
