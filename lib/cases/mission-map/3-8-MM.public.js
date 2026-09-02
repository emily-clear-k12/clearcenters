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

export const PUBLIC_CASE = {
  standard: "3.8-MM",
  teksLabel:
    "TEKS 3.6A — Supply & Demand (Texas Grade 3 Social Studies; checked against the real, current TEKS document before content was written — see header comment for the re-anchor from the library's original goods-vs-services framing)",
  grade: 3,
  subject: "Social Studies",
  title: "Market Price Mission",
  tagline: "The Saturday market's prices keep changing. What's actually driving them?",

  mission: {
    briefText:
      "The Saturday farmers market has lemonade stands, berry sellers, and a face-painting table, and their prices keep going up and down. Walk the stalls, read the evidence, and figure out what's really causing each price to change — before you can unlock the market's final stall.",
    goal: "Use evidence about supply and demand to explain why prices at the market go up or down.",
  },

  mapImage: "/mission-map/3-8-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Stall 1: It's the hottest day of the summer, and everyone wants lemonade. What happens to the price?",
      evidence: {
        type: "data",
        label: "STALL 1 — LEMONADE",
        text: "A huge line has formed at the lemonade stand because of the heat, but there's only one pitcher of lemonade left.",
      },
      choices: [
        { id: "a", text: "The price is likely to go up — high demand and low supply push the price up" },
        { id: "b", text: "The price is likely to go down, since more people want it" },
        { id: "c", text: "The price never changes no matter what" },
        { id: "d", text: "The price depends only on the weather, not on how much lemonade is left" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "High demand (a long line) plus low supply (one pitcher left) tends to push the lemonade's price up.",
    },
    {
      id: "cp2",
      order: 2,
      type: "quickScan",
      position: { x: 26, y: 40 },
      prompt: "Stall 2: Quick check — the berry seller has ten full baskets left, but almost no customers today. What happens to the price?",
      evidence: {
        type: "data",
        label: "QUICK MARKET CHECK",
        text: "Ten full baskets of berries are sitting untouched, and only one shopper has stopped by all morning.",
      },
      choices: [
        { id: "a", text: "The price is likely to go down — low demand and high supply push the price down" },
        { id: "b", text: "The price is likely to go up, since there's more to sell" },
        { id: "c", text: "The price is always the same at every stall" },
        { id: "d", text: "The number of baskets doesn't affect the price at all" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Low demand plus high supply tends to push the berries' price down.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Stall 3: A face-painting artist raises her price after running out of the sparkly gold paint everyone wants. What's happening?",
      evidence: {
        type: "data",
        label: "STALL 3 — FACE PAINTING",
        text: "The sparkly gold paint sold out fast because it's the most requested color, and only the less-popular colors are left.",
      },
      choices: [
        { id: "a", text: "High demand for the gold paint, now in short supply, is pushing its price up" },
        { id: "b", text: "The artist raised the price for no reason at all" },
        { id: "c", text: "Running out of paint always lowers the price" },
        { id: "d", text: "Demand has nothing to do with what colors run out" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The gold paint's high demand and low remaining supply are what's pushing its price up.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Stall 4: A shopper claims the lemonade stand raised its price \"just to be mean.\" Does the evidence support that?",
      evidence: {
        type: "passage",
        text: "\"They raised the price just to be mean to us!\" the shopper says, ignoring the long line and the almost-empty pitcher.",
      },
      choices: [
        { id: "a", text: "No — the evidence shows high demand and low supply, not meanness, are what raised the price" },
        { id: "b", text: "Yes — sellers usually raise prices just to upset customers" },
        { id: "c", text: "There's no way to know why a price changed" },
        { id: "d", text: "Prices are always set for personal reasons, never supply and demand" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The evidence points to supply and demand, not meanness, as the reason the lemonade's price went up.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Stall 5: A new lemonade stand opens right next door, selling the same lemonade. What's likely to happen to the price at the first stand?",
      evidence: {
        type: "passage",
        text: "Now there are two stands selling the same lemonade instead of just one, giving shoppers more lemonade to choose from overall.",
      },
      choices: [
        { id: "a", text: "The price is likely to come back down, since the total supply of lemonade at the market went up" },
        { id: "b", text: "The price will keep rising no matter what" },
        { id: "c", text: "A second stand has no effect on price" },
        { id: "d", text: "Prices only change because of the weather" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A second stand increases the total supply of lemonade, which tends to bring the price back down.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Stall 6: The market's final stall asks — what actually decides how much something costs here?",
      evidence: {
        type: "passage",
        text: "Every stall's price changed based on how much people wanted an item (demand) and how much of it was available (supply).",
      },
      choices: [
        { id: "a", text: "Supply and demand together — how much people want something and how much of it is available" },
        { id: "b", text: "Only how the seller feels that day" },
        { id: "c", text: "Prices never actually change" },
        { id: "d", text: "Only the weather decides prices" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Supply and demand together are what decide how a good or service's price changes at the market.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how supply and demand affected prices at the market. Your answer should: (1) give at least two examples from the case file where supply or demand changed a price, and (2) explain why the shopper's \"just to be mean\" claim wasn't supported by the evidence.",

  responseStems: [
    "At Stall ___, the price went ___ because supply was ___ and demand was ___.",
    "The shopper thought the price went up because ___, but the evidence actually showed ___.",
    "Supply and demand affect price because ___.",
  ],

  selfCheckQuestions: [
    "I gave at least two examples of supply and/or demand changing a price.",
    "I used the words \"supply\" and \"demand\" correctly.",
    "I explained why the price increase wasn't just about the seller being mean.",
    "I explained what happened to price when a second lemonade stand opened.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
