// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.5.3E. TEKS 5.3E — solve for products of decimals to the hundredths, including situations involving money, using strategies based on place-value understandings.

export const SERVER_CASE = {
  standard: "MA.5.3E",
  title: "Just Add a Zero",
  bigQuestion: "Pencils cost $0.45 each. How much do ten pencils cost?",
  evidenceBank: [
    "One pencil costs $0.45",
    "$0.450 is the same amount as $0.45",
    "When you multiply by 10, every digit moves one place to the left",
    "The register rang up $4.50 for ten pencils",
    "Ten pencils have to cost more than one pencil"
  ],
  trapLine: "Ten pencils at $0.45? Times ten means add a zero. That's $0.450.",
  castNames: {
    lena: "Lena",
    tag: "Tag",
    pack: "Pencil Pack",
    columbo: "Columbo",
    kaching: "Kaching"
  },
  distractors: "Thinking multiplying by 10 always means writing a zero on the end; not seeing that a zero added after the last decimal digit leaves the value the same; trusting a shortcut over a reasonableness check; moving the decimal point the wrong way.",
  mustInclude: [
    "It says ten pencils cost $4.50.",
    "It explains that $0.450 is still 45 cents, so adding a zero did not change the value.",
    "It explains that multiplying by 10 moves every digit one place to the left.",
    "It uses the register or the idea that ten pencils must cost more than one.",
    "It gives Lena a rule for multiplying decimals by 10."
  ],
};
