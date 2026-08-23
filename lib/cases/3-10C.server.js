// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.10C).

export const SERVER_CASE = {
  standard: "3.10C",
  title: "That Cannot Be the Same Hill",
  bigQuestion: "The two photos are three days apart and the same fence post is in both. How did the hill change that much, that fast?",
  evidenceBank: [
    "The two photos were taken three days apart",
    "The same fence post is in both, with the same broken rail",
    "A magnitude 4.9 earthquake happened at 3:14 am on the Tuesday",
    "About 200 metres of hillside slid down",
    "The road was closed by lunchtime that same day"
  ],
  trapLine: "Land doesn't change like that. That's a different hill. Somebody's mixed the photos up.",
  castNames: {
    rue: "Rue",
    post: "The Fence Post",
    hill: "Cedar Hill",
    log: "The Quake Log",
    anaya: "Anaya"
  },
  distractors: "Thinking every change to Earth's surface happens slowly; assuming a large change must mean a mistake or a different location; missing that earthquakes, landslides and volcanic eruptions reshape land in hours or minutes; treating photographic evidence as unreliable rather than checking for matching landmarks.",
  mustInclude: [
    "The chat proves the two photos are the same place.",
    "It uses how far apart the photos are.",
    "It names what caused the change.",
    "It says how much of the hill moved.",
    "It answers Rue's idea that land only changes slowly."
  ],
};
