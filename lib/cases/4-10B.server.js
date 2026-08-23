// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.10B).

export const SERVER_CASE = {
  standard: "4.10B",
  title: "Where Is All This Sand Coming From?",
  bigQuestion: "The sandbar doubled since spring. Did it grow that material itself, or did the material come from somewhere else?",
  evidenceBank: [
    "The sandbar doubled in width since spring",
    "The hillside upstream has lost about three inches of soil",
    "The sand on the bar matches the sand in the gully, not the creek bed",
    "The creek runs fast down the straight and slows sharply at the bend",
    "The sandbar sits exactly where the water slows down"
  ],
  trapLine: "I've been growing. From the bottom up. Making my own sand, thank you.",
  castNames: {
    bar: "Bar",
    hill: "The Hill",
    creek: "The Creek",
    gully: "The Gully",
    grain: "The Pale Grain",
    rae: "Rae"
  },
  distractors: "Thinking eroded material disappears rather than being deposited somewhere downstream; treating a growing landform as generating its own material; missing that the same water both carries and drops material depending on how fast it is moving; confusing weathering (breaking material loose) with erosion (moving it) and deposition (dropping it).",
  mustInclude: [
    "The chat says where the material came from.",
    "It uses the grain match.",
    "It says what moved the material.",
    "It explains why it landed at the bend.",
    "It tells Bar he didn't make any of it."
  ],
};
