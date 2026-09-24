// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.4B covers the
// growth of the Texas cattle industry. Stored with an "SS." prefix so this
// code can never collide with a Science case using the same bare TEKS
// number.
//
// Freshly scripted scenario (a cattle-drive-era economics file) — not a
// reworded version of Group Chat's SS.4.4B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.4B-SC",
  teksLabel: "4.4B",
  grade: 4,
  subject: "Social Studies",
  title: "The Cattle Trail Boom",
  tagline: "The cattle industry grew mostly because Texas had a lot of cows.",
  transmission: {
    claimHeadline: "The cattle industry grew mostly because Texas had a lot of cows.",
    source: "Cattle Drive Era Records",
    loggedAt: "Cattle Trail Economics File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-4b-sc-field-report.jpg",
    imageCaption: "Cattle Drive Era Records — Cattle Trail Economics File",
    notes: "After the Civil War, a cow worth a few dollars in Texas could sell for ten times as much up north. It just had to get to a railroad town. New cattle trails, like the Chisholm Trail, linked Texas ranches to those towns. From there, trains went east to big cities. People in those cities wanted lots of beef. Texas had large herds of cattle for years before the boom. But that alone did not make the industry grow. Fast growth only began once the new trails and railroad links opened.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A cow worth a few dollars in Texas could sell for ten times as much at a railroad town up north.",
      correctVerdict: "True",
      reasonText: "The cattle price record shows a huge jump in price between Texas and the northern railroad towns.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "New cattle trails like the Chisholm Trail linked Texas ranches to railroads up north.",
      correctVerdict: "True",
      reasonText: "The trail record and the railroad record show ranches got a new path to markets in the East. That path did not exist before.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Texas already had lots of cattle before the boom. So having a lot of cows must be the main reason the industry grew.",
      correctVerdict: "False",
      reasonText: "Texas had large herds for years with no boom. The timeline shows fast growth only began when new trails and railroads opened new markets.",
    },
  ],

  evidenceReadings: [
    { id: "price_gap", label: "Cattle price record", reading: "Cattle worth $2-4 in Texas sold for $20-40 at northern railroad towns.", kind: "document" },
    { id: "market_demand", label: "Eastern market report", reading: "Cities in the North and East wanted lots of beef after the Civil War.", kind: "document" },
    { id: "trail_map", label: "Chisholm Trail record", reading: "A new trail linked Texas ranches to the railroad at Abilene, Kansas.", kind: "document" },
    { id: "railroad_link", label: "Railroad expansion record", reading: "Railroads in Kansas made it possible to ship cattle to markets in the East.", kind: "document" },
    { id: "herd_history", label: "Pre-boom herd record", reading: "Texas had large herds of cattle for years before the boom began.", kind: "document" },
    { id: "boom_timing", label: "Cattle boom timeline", reading: "The industry's fast growth began only after new trails and railroad links opened.", kind: "document" },
    { id: "brand_note", label: "Cattle brand record", reading: "Ranchers used a hot iron to brand their cattle with a special mark.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["price_gap", "market_demand"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["trail_map", "railroad_link"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["herd_history", "boom_timing"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["brand_note"] },
  ],

  echo: {
    main: "Cattle trail records incoming, Cadet. Let's see if this claim holds up.",
    scan: "Prices, trails, and timing — read every record carefully.",
    sort: "Notice how the boom's timing lines up with the trails, not just the herds.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how much more cattle sold for up north?",
    "Did I mention the Chisholm Trail and its railroad connection?",
    "Did I mention that Texas had large herds even before the boom started?",
    "Did I avoid saying having a lot of cattle was the main reason the industry grew?",
  ],
};
