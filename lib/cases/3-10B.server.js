// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.10B).

export const SERVER_CASE = {
  standard: "3.10B",
  title: "What Is Soil Even Made Of?",
  bigQuestion: "One cupful of soil had rock grains, leaf bits and a beetle wing in it. So what is soil made of?",
  evidenceBank: [
    "The sieve caught rock grains, leaf bits and a beetle wing",
    "There is a pile of grit at the bottom of the cracked boulder",
    "The grit is the same colour as the boulder",
    "The jar of leaves from October is now dark and crumbly",
    "The clay by the fence is made of very tiny bits of rock"
  ],
  trapLine: "Soil isn't made of anything. It's just the ground. It's always been there.",
  castNames: {
    jae: "Jae",
    sieve: "The Sieve",
    boulder: "The Boulder",
    leaves: "The Leaf Jar",
    ruth: "Ruth"
  },
  distractors: "Thinking soil is a single substance rather than a mixture; thinking soil has always existed as it is; missing that rock breaks down into the grains in soil; missing the rotted plant and animal part; thinking sand and clay are not made of rock.",
  mustInclude: [
    "The chat says soil has broken rock in it.",
    "It says the rock got broken down.",
    "It says soil has rotted plants or animals in it.",
    "It uses the sieve or the leaf jar.",
    "It gives Ruth both parts in one answer."
  ],
};
