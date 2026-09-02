// Mission Map — "Market Price Mission" — SERVER ONLY.
// Never import this from a client component. See 3-8-MM.public.js for the
// TEKS 3.6A alignment and the re-anchor note (from the library's original
// "Goods and Services Market Map" concept).

export const SERVER_CASE = {
  standard: "3.8-MM",
  title: "Market Price Mission",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "quickScan", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Supply and demand affected prices all over the market. At the lemonade stand, high demand (a long line on a hot day) combined with low supply (only one pitcher left) pushed the price up. At the berry stall, the opposite happened — low demand and ten full baskets pushed the price down. At the face-painting table, the sparkly gold paint's price went up because so many people wanted it and it was almost out. A shopper claimed the lemonade stand raised its price 'just to be mean,' but the evidence didn't support that — the real reason was the long line and the almost-empty pitcher, which is supply and demand, not meanness. When a second lemonade stand opened, the total supply of lemonade went up, which is likely to bring the price back down.",

  mustInclude: [
    "Gives at least two specific supply-and-demand examples from the case file (lemonade, berries, and/or face paint)",
    "Uses the terms 'supply' and 'demand' correctly to explain a price change",
    "Explains that the price increase was due to supply and demand, not the seller being 'mean', using evidence from the case file",
  ],
};
