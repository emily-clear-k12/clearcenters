// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.12C",
  title: "The Parking Lot Town Hall",
  bigQuestion: "Does paving over the community garden for a parking lot really have \"no effect\" on the neighborhood?",
  evidenceBank: [
    "The garden currently supports pollinators (bees, butterflies) that also visit nearby yards",
    "Garden soil absorbs rainwater; a paved lot causes runoff to increase measurably nearby",
    "Local families use the garden produce, reducing their grocery costs",
    "A butterfly count dropped sharply in a similar neighborhood after a comparable garden was paved"
  ],
  trapLine: "It's just dirt and plants \u2014 paving it over won't really affect anything else around here.",
  castNames: {
    dev: "Councilman Dev",
    gigi: "Gigi the Garden",
    bee: "Bee the Bee",
    rain: "Rain the Rainfall",
    mrs_p: "Mrs. Patel"
  },
  distractors: "Thinking environmental impact only counts if it's visible immediately on the same plot of land, rather than tracing effects into the surrounding area.",
  mustInclude: [
    "Identifies at least 2 ripple effects (pollinators, water runoff, food access)",
    "Uses the runoff and pollinator evidence specifically",
    "Connects the garden's role to the surrounding ecosystem, not just itself",
    "Rejects the \"no real effect\" claim",
    "Names at least one specific group (people or animals) impacted"
  ],
};
