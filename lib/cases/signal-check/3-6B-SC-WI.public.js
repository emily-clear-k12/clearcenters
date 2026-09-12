// Signal Check Weigh-In — companion to 3.6B-SC (solid vs liquid / sugar pour).

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.6B-SC-WI",
  teksLabel: "3.6B",
  grade: 3,
  subject: "Science",
  title: "Sugar Showdown",
  tagline: "If sugar pours, is it a liquid?",
  stemMode: "dropdown",

  dispute: {
    prompt: "Kitchen Counter Cadets disagree. Who's right?",
    context: "Sugar poured into a cup. One Cadet says pouring means it's a liquid. The other says sugar is still a solid — tiny grains that keep their shape.",
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "Sugar pours, so sugar counts as a liquid." },
    { id: "B", label: "SIDE B", claim: "Sugar is a solid — grains keep their own shape." },
  ],

  evidence: [
    { id: "cone_shape", text: "Poured sugar piles up with sloped sides and a peak.", supports: "B" },
    { id: "water_compare", text: "Poured water spreads flat and level in the cup.", supports: "B" },
    { id: "grain_photo", text: "Magnified grains look like tiny hard cubes — piled or spread.", supports: "B" },
    { id: "flour_compare", text: "Flour also pours and piles, and flour is a solid too.", supports: "B" },
    { id: "definition_note", text: "A liquid takes the container's shape; a solid keeps its own shape.", supports: "B" },
    { id: "sugar_color", text: "This bag of sugar looks slightly whiter than last month's.", supports: "neither" },
  ],

  echo: {
    main: "Pour vs. pile, Cadet. Two sides. Weigh the readings.",
    sort: "Sort readings to Side A, Side B, or Neither. Practice bay — lock when ready.",
    pick: "Which side holds? Pick it, then tap your proof.",
    reflect: "Ruling drafted. Self-check before you transmit.",
  },

  selfCheckQuestions: [
    "Did I pick a side?",
    "Did I notice sugar piles into a cone, not a flat surface?",
    "Did I remember grains keep the same shape?",
    "Did I avoid saying 'pours = liquid'?",
    "Did my proof match Side B if that's what I picked?",
  ],
};
