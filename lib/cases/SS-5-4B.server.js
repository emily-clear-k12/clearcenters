// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.4B, TEKS 5.4B).

export const SERVER_CASE = {
  standard: "SS.5.4B",
  title: "Same Country, Different Future",
  bigQuestion: "Did the Industrial Revolution make U.S. regions more alike, or did different patterns of economic growth help deepen sectional differences?",
  evidenceBank: [
    "Factory production expanded in some regions",
    "Agriculture remained especially important in other regions",
    "Transportation and trade connected the regions"
  ],
  trapLine: "Industrialization is making every region more alike, so regional economic differences are disappearing.",
  castNames: {
    oliver: "Oliver Grant",
    clara: "Clara Webb",
    elijah: "Elijah Carter",
    miriam: "Miriam Hale",
    daniel: "Daniel Price"
  },
  distractors: "Saying the North was only factories or the South was only farms; treating the regions as economically isolated; assuming railroads and trade made regional economies the same; erasing enslaved labor from plantation agriculture; claiming industrialization itself was the sole cause of the Civil War; stopping at 'North factories, South farms' without explaining how different interests contributed to sectional conflict.",
  mustInclude: [
    "Describes a meaningful difference between northern manufacturing and southern agriculture.",
    "Uses evidence from more than one regional perspective.",
    "Explains that transportation or trade connected regions without making their economies the same.",
    "Connects different regional economies to different interests and growing sectional conflict.",
    "Rejects the claim that industrialization made regional economic differences disappear."
  ],
};
