// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.22B, TEKS 5.22B).

export const SERVER_CASE = {
  standard: "SS.5.22B",
  title: "The Railroad Was Just Transportation",
  bigQuestion: "How can a technological innovation such as the Transcontinental Railroad advance economic development beyond its most obvious use?",
  evidenceBank: [
    "The Transcontinental Railroad connected distant regions and reduced travel time.",
    "Farm and factory goods could reach more distant buyers.",
    "Railroad construction and operation required workers, materials, equipment, and services."
  ],
  trapLine: "The railroad was transportation. It moved people faster. That is basically the whole economic story.",
  castNames: {
    ray: "Ray Railfan",
    market: "Mara Market",
    town: "Toby Town Map",
    industry: "Ivy Industry",
    space: "Sam Space Program"
  },
  distractors: "Stopping at travel time; listing industries without explaining the connection; claiming the railroad caused all western growth by itself; ignoring negative consequences outside this standard; making exaggerated space-program claims.",
  mustInclude: [
    "Explains the railroad’s transportation effect.",
    "Connects the railroad to larger markets or trade.",
    "Connects the railroad to towns, jobs, businesses, or industries.",
    "Rejects the idea that it was only transportation.",
    "Connects the innovation→economic-development pattern to the space program."
  ],
};
