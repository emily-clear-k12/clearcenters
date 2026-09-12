// Signal Check Weigh-In — companion to 3.6C-SC (condensation / cold can).

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.6C-SC-WI",
  teksLabel: "3.6C",
  grade: 3,
  subject: "Science",
  title: "Wet Can Weigh-In",
  tagline: "Is the cold can leaking — or is something else going on?",
  stemMode: "dropdown",

  dispute: {
    prompt: "Picnic Table Cadets disagree. Who's right?",
    context: "An ice-cold can got wet on the outside. One Cadet says it must be leaking. The other says water from the air made the drops.",
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "The can is leaking soda from the inside." },
    { id: "B", label: "SIDE B", claim: "The drops are from the air — the cold can made water appear outside." },
  ],

  evidence: [
    { id: "sealed_check", text: "Pull tab still fully sealed — can never opened.", supports: "B" },
    { id: "tab_check", text: "No cracks or holes on the can's surface.", supports: "B" },
    { id: "drop_color", text: "Drops on the outside are completely clear.", supports: "B" },
    { id: "soda_color", text: "Soda inside is dark brown — not clear.", supports: "B" },
    { id: "warm_can", text: "A warm sealed can nearby stayed totally dry.", supports: "B" },
    { id: "label_wear", text: "The label is peeling a little at one corner.", supports: "neither" },
  ],

  echo: {
    main: "Wet can mystery, Cadet. Two sides. Weigh the sensor log.",
    sort: "Sort each reading to A, B, or Neither. Practice only.",
    pick: "Pick the side the readings back. Tap your proof.",
    reflect: "Ruling drafted. Self-check before transmit.",
  },

  selfCheckQuestions: [
    "Did I pick a side?",
    "Did I notice the can was sealed with no holes?",
    "Did I compare clear drops to dark soda?",
    "Did I avoid saying the can is leaking?",
    "Did I use readings that match my ruling?",
  ],
};
