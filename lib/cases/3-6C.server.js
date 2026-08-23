// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.6C).

export const SERVER_CASE = {
  standard: "3.6C",
  title: "The Leaky Glasses",
  bigQuestion: "The sealed empty jar got just as wet as the glasses. So where is the water actually coming from?",
  evidenceBank: [
    "The sealed empty jar got wet on the outside too",
    "There was nothing inside the sealed jar to leak",
    "The juice is purple but every drop outside is clear",
    "The same glasses stay dry with room-temperature water in them",
    "The drops only show up when what's inside is cold"
  ],
  trapLine: "The water is coming through the glass. They leak, and the set is going in the bin.",
  castNames: {
    marta: "Marta",
    glass: "The Glass",
    jar: "The Sealed Jar",
    mist: "Mist",
    sami: "Sami"
  },
  distractors: "Thinking water seeps or leaks through the wall of a container; thinking the drops are the drink itself; missing that air already holds water you cannot see; thinking a change of state needs heating and not noticing that cooling causes one too.",
  mustInclude: [
    "The chat uses the sealed empty jar.",
    "It uses the colour of the drops.",
    "It says where the water came from.",
    "It says why the cold matters.",
    "It gives Sami the rule."
  ],
};
