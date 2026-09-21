// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.3.5C. TEKS 3.5C — describe a multiplication expression as a comparison such as 3 x 24 represents 3 times as much as 24.

export const SERVER_CASE = {
  standard: "MA.3.5C",
  title: "Three Times as Many",
  bigQuestion: "Rosa has 24 stickers. Kip has three times as many. How many does Kip have?",
  evidenceBank: [
    "Kip's sticker book has three full pages",
    "Each page holds exactly 24 stickers",
    "Hopscotch jumps 24, then 24, then 24, and lands on 72",
    "'3 times as much as 24' means 3 groups of 24",
    "'3 more than 24' is a different sentence, and it means 27"
  ],
  trapLine: "Kip has three times as many as my 24. That's 24 and 3 more. So 27.",
  castNames: {
    rosa: "Rosa",
    kip: "Kip",
    triplets: "Triplets",
    hopscotch: "Hopscotch",
    val: "Coach Val"
  },
  distractors: "Reading 'times as many' as adding the number on; thinking 'times' and 'more' mean the same thing; adding 24 and 3 because both numbers are in the problem; mixing up which amount is being multiplied.",
  mustInclude: [
    "It says Kip has 72 stickers.",
    "It uses the three pages of 24 or Hopscotch's three jumps.",
    "It explains that three times as many means three groups of 24.",
    "It explains that 27 would be 3 more than 24, not 3 times as many.",
    "It gives Coach Val a rule about 'times as many' and 'more than'."
  ],
};
