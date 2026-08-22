// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.6A",
  title: "The Metal Detector Meltdown",
  bigQuestion: "Does a magnet really grab anything metal, or does it depend on the kind of metal?",
  evidenceBank: [
    "Magnet picks up: steel bottle cap, rusty nail (both iron-based)",
    "Magnet fails on: aluminum pull-tab, copper penny (both metal, both non-magnetic)",
    "All four objects test positive as \"metal\" by other properties (shiny, conducts electricity)",
    "Only certain metals \u2014 iron, nickel, cobalt \u2014 are magnetic; most other metals aren't"
  ],
  trapLine: "If it's metal, I've got it \u2014 nothing metal can escape my pull!",
  castNames: {
    marlow: "Marlow the Magnet Wand",
    benny: "Benny the Beachcomber",
    cappy: "Cappy the Bottle Cap",
    rusty: "Rusty the Nail",
    tabby: "Tabby the Pull-Tab",
    penny: "Penny the Coin",
    ida: "Inspector Ida"
  },
  distractors: "\"Heavier = denser\" (classic density trap, used elsewhere in this set); assuming only large/metal-looking objects can conduct electricity.",
  mustInclude: [
    "Identifies at least 2 magnetic and 2 non-magnetic metal items from evidence",
    "States not all metals are magnetic",
    "Names at least one specific magnetic metal (iron/steel)",
    "Rejects \"any metal + magnet = stick\" claim",
    "Connects to physical-property testing/classification"
  ],
};
