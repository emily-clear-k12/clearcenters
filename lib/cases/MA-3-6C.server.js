// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.3.6C. TEKS 3.6C — determine the area of rectangles with whole number side lengths using multiplication; also 3.7B — determine the perimeter of a polygon.

export const SERVER_CASE = {
  standard: "MA.3.6C",
  title: "The Longer Fence",
  bigQuestion: "Gus made Biscuit's fence longer. Did Biscuit get a bigger yard?",
  evidenceBank: [
    "The old pen was 4 squares long and 4 squares wide",
    "The old pen had 16 fence posts around it and 16 grass squares inside",
    "The new pen is 8 squares long and 1 square wide",
    "The new pen has 18 fence posts around it but only 8 grass squares inside",
    "Biscuit can't turn around in the new pen"
  ],
  trapLine: "I made Biscuit's fence longer. So his yard got bigger. That's just how fences work.",
  castNames: {
    gus: "Gus",
    fenwick: "Fenwick",
    patch: "Patch",
    biscuit: "Biscuit",
    ines: "Ines"
  },
  distractors: "Thinking a longer perimeter always means a bigger area; mixing up perimeter and area; counting the fence posts as if they were grass squares; thinking two shapes with the same perimeter must have the same area.",
  mustInclude: [
    "It says Biscuit's yard got smaller.",
    "It compares the fence: 16 posts before and 18 after.",
    "It compares the grass: 16 squares before and 8 after.",
    "It explains that the fence measures around the outside and the grass measures the inside.",
    "It gives Gus a rule: a longer fence does not always make a bigger yard."
  ],
};
