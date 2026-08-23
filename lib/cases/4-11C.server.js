// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.11C).

export const SERVER_CASE = {
  standard: "4.11C",
  title: "Rigby Wants to Drill Here",
  bigQuestion: "Both sites have rock under them. Why can one of them store water and the other can't?",
  evidenceBank: [
    "The granite core had no visible spaces between the crystals",
    "The sandstone core had visible connected gaps between its grains",
    "Water ran straight off the granite and left it dry underneath",
    "The sandstone went from 410 g dry to 468 g soaked",
    "The granite weighed 612 g before and 612 g after soaking"
  ],
  trapLine: "Rock is rock. Water's underground everywhere. I'll drill here, it's closer, let's go.",
  castNames: {
    rigby: "Rigby",
    gran: "The Granite Core",
    sand: "The Sandstone Core",
    lens: "The Hand Lens",
    scale: "The Scale",
    yara: "Yara"
  },
  distractors: "Assuming any rock can store water or oil because resources are 'underground everywhere'; thinking a rock must contain a cave or hollow to hold anything; noticing gaps but missing that they have to connect for material to move through; judging rock type by appearance from a distance rather than by tested properties.",
  mustInclude: [
    "The chat names the spaces inside the rock.",
    "It says the spaces have to connect.",
    "It uses the soaked-versus-dry masses.",
    "It uses the pour test.",
    "It tells Rigby that rock isn't just rock."
  ],
};
