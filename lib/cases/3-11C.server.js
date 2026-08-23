// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.11C).

export const SERVER_CASE = {
  standard: "3.11C",
  title: "It Is Fine, I Will Just Recycle It",
  bigQuestion: "Kip puts every cup in the blue bin. So why does the poster have two more columns?",
  evidenceBank: [
    "Kip uses about 4 paper cups a day, roughly 720 a year",
    "One reusable bottle is one item for the whole year",
    "A recycled cup still needs a truck, washing and remaking",
    "The jam jar used as a pencil pot needed no truck at all",
    "Recycling is better than binning, but it is not free"
  ],
  trapLine: "I recycle it, so it doesn't matter how many I use.",
  castNames: {
    kip: "Kip",
    cup: "The Takeaway Cup",
    bottle: "The Reusable Bottle",
    pot: "The Pencil Pot",
    tunde: "Tunde"
  },
  distractors: "Thinking recycling cancels out any amount of use; treating reduce, reuse and recycle as three words for the same action; missing that recycling itself uses trucks, water and energy; thinking reusing something requires it to be remade first.",
  mustInclude: [
    "The chat names all three actions.",
    "It gives a REDUCE example.",
    "It gives a REUSE example.",
    "It says recycling still costs something.",
    "It gives Tunde the rule for the poster."
  ],
};
