// Mission Map — "Market Price Mission" — Grade 3 Social Studies.
//
// RE-ANCHORED from the library's "Goods and Services Market Map" concept.
// TEKS CHECKED FIRST against the real PDF, per the standing rule
// (ClearCenters_STATE.md §9 rule 11):
//
// The library concept's actual final unlock ("Goods are things people buy;
// services are actions people do for others") is a definitional distinction
// that does NOT appear anywhere in the real Grade 3 Social Studies TEKS —
// there is no standard that tests "goods vs. services" as a category
// distinction. The only real Grade 3 economics standard that fits a
// farmers-market scenario is **3.6A — Supply & Demand.** "Explain how
// supply and demand affect the price of a good or service." That's a
// genuinely different skill (predicting price changes), so the mission was
// rewritten around it rather than forcing the original goods-vs-services
// framing onto a standard that doesn't test it — same fix pattern as the
// Science batch's "Weather Station Lockdown" (3-2-MM) re-anchor.
//
// Note: 3.6A is also used by Signal Check as "3.6A-SC" (see
// lib/cases/TEKS_STANDARDS.md). Re-using the same base TEKS code across two
// different engines is an established pattern in this project (4.10B and
// 5.7B are both reused the same way) — the "-MM" vs "-SC" suffix keeps the
// `cases.standard` primary key unique.
//
// Uses the new "quickScan" checkpoint type at cp2 — supply-and-demand price
// predictions are naturally quick, one-clue-at-a-time reads, matching how
// quickScan was used for 3-3-MM's magnet tests.

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "3.8-MM",
  teksLabel:
    "TEKS 3.6A — Supply & Demand (Texas Grade 3 Social Studies; checked against the real, current TEKS document before content was written — see header comment for the re-anchor from the library's original goods-vs-services framing)",
  grade: 3,
  subject: "Social Studies",
  title: "Market Price Mission",
  tagline: "Prices at the Saturday market keep changing. What is causing it?",

  mission: {
    briefText:
      "The Saturday market has lemonade stands, berry sellers, and a face-painting table. Their prices keep going up and down. Walk the stalls and read the evidence. Find out what is really making each price change. Then you can open the last stall.",
    goal: "Use supply and demand to explain why prices at the market go up or down.",
  },

  mapImage: "/mission-map/3-8-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stall 1: It's the hottest day of summer. Everyone wants lemonade. What happens to the price?",
      evidence: {
        type: "data",
        label: "STALL 1 — LEMONADE",
        text: "A huge line forms at the lemonade stand because of the heat. There is only one pitcher left.",
      },
      choices: [
        { id: "a", text: "The price will likely go down, since more people want it" },
        { id: "b", text: "The price will likely go up. High demand and low supply push it up." },
        { id: "c", text: "The price never changes no matter what" },
        { id: "d", text: "The price depends only on the weather" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Lots of buyers (high demand) and little lemonade (low supply) push the price up.",
    },
    {
      id: "cp2",
      order: 2,
      type: "quickScan",
      position: { x: 26, y: 40 },
      prompt: "Stall 2: Quick check. The berry seller has ten full baskets but almost no buyers. What happens to the price?",
      evidence: {
        type: "data",
        label: "QUICK MARKET CHECK",
        text: "Ten full baskets of berries sit untouched. Only one shopper has stopped by all morning.",
      },
      choices: [
        { id: "a", text: "The price will likely go up, since there's more to sell" },
        { id: "b", text: "The price is always the same at every stall" },
        { id: "c", text: "The price will likely go down. Low demand and high supply push it down." },
        { id: "d", text: "The number of baskets doesn't affect the price at all" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "Few buyers (low demand) and lots of berries (high supply) push the price down.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stall 3: A face painter ran out of the sparkly gold paint everyone wants. Then she raised her price. Why?",
      evidence: {
        type: "data",
        label: "STALL 3 — FACE PAINTING",
        text: "The gold paint sold out fast. It is the color most kids ask for. Only the less popular colors are left.",
      },
      choices: [
        { id: "a", text: "The artist raised the price for no reason at all" },
        { id: "b", text: "Running out of paint always lowers the price" },
        { id: "c", text: "Demand has nothing to do with what colors run out" },
        { id: "d", text: "Lots of kids want gold paint, and there's little left. That pushes the price up." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "Everyone wants gold paint, and there's little left. That pushes the price up.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stall 4: A shopper says the lemonade stand raised its price \"just to be mean.\" Does the evidence agree?",
      evidence: {
        type: "passage",
        text: "\"They raised the price just to be mean!\" the shopper says. The shopper ignores the long line and the almost empty pitcher.",
      },
      choices: [
        { id: "a", text: "No. High demand and low supply raised the price, not meanness." },
        { id: "b", text: "Yes. Sellers raise prices to upset customers." },
        { id: "c", text: "There's no way to know why a price changed" },
        { id: "d", text: "Prices are always set for personal reasons" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Supply and demand made the price go up. Being mean had nothing to do with it.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stall 5: A new lemonade stand opens next door. It sells the same lemonade. What will likely happen to the first stand's price?",
      evidence: {
        type: "passage",
        text: "Now two stands sell the same lemonade. Shoppers have more lemonade to choose from.",
      },
      choices: [
        { id: "a", text: "The price will likely come back down, since there is more lemonade now" },
        { id: "b", text: "The price will keep rising no matter what" },
        { id: "c", text: "A second stand has no effect on price" },
        { id: "d", text: "Prices only change because of the weather" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A second stand means more lemonade (more supply). That tends to bring the price back down.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stall 6: The last stall asks one question. What decides how much something costs here?",
      evidence: {
        type: "passage",
        text: "Each price changed because of how much people wanted something (demand). It also changed because of how much there was (supply).",
      },
      choices: [
        { id: "a", text: "Only how the seller feels that day" },
        { id: "b", text: "Prices never actually change" },
        { id: "c", text: "Only the weather decides prices" },
        { id: "d", text: "Supply and demand. How much people want something, and how much of it there is." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "Supply and demand together decide how prices change at the market.",
    },
  ],

  finalResponsePrompt:
    "Explain how supply and demand changed prices at the market. Your answer should: (1) give two examples of supply or demand changing a price, and (2) explain why the shopper's \"just to be mean\" claim was wrong.",

  responseStems: [
    "At Stall ___, the price went ___. Supply was ___ and demand was ___.",
    "The shopper thought ___, but the evidence showed ___.",
    "Supply and demand affect price because ___.",
  ],

  selfCheckQuestions: [
    "I gave two examples of supply or demand changing a price.",
    "I used the words \"supply\" and \"demand\" correctly.",
    "I explained why the price didn't go up just because the seller was mean.",
    "I explained what happened to the price when a second lemonade stand opened.",
    "I read my answer back, and it makes sense.",
  ],
};
