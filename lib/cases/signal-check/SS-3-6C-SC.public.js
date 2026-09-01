// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.6C covers costs,
// prices, and profit. Stored with an "SS." prefix so this code can never
// collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a class bake sale) — not a reworded version
// of Group Chat's SS.3.6C case, per the Signal Check checklist's
// anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.6C-SC",
  teksLabel: "3.6C",
  grade: 3,
  subject: "Social Studies",
  title: "The Bake Sale Sold Out",
  tagline: "If a store sells every item, it must have made a profit.",
  transmission: {
    claimHeadline: "If a store sells every item, it must have made a profit.",
    source: "Third Grade Bake Sale Records",
    loggedAt: "Sale Day Receipts",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-6c-sc-field-report.jpg",
    imageCaption: "Third Grade Bake Sale — Sale Day Receipts",
    notes: "The third-grade class baked 40 cupcakes for their bake sale. Each cupcake cost $1.50 in ingredients to make, but they sold every cupcake for only $1.00 each. By 1:00pm, the sale table was completely empty. Someone said, \"They sold everything, so they must have made a profit!\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The bake sale sold every single cupcake they made.",
      correctVerdict: "True",
      reasonText: "The end-of-day log shows all 40 cupcakes sold, matching the 40 the class baked.",
      stemEvidenceIds: ["sold_out_log", "cupcake_count"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Selling every cupcake means the bake sale made money.",
      correctVerdict: "False",
      reasonText: "The totals show $40.00 in revenue against $60.00 in ingredient costs — selling out didn't stop the sale from losing money overall.",
      stemEvidenceIds: ["total_revenue", "total_cost"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Each cupcake cost more to make than it sold for, so the bake sale actually lost money.",
      correctVerdict: "True",
      reasonText: "Every cupcake cost $1.50 to make but sold for only $1.00 — losing $0.50 on each one adds up across all 40.",
      stemEvidenceIds: ["cost_sheet", "price_sheet"],
    },
  ],

  evidenceReadings: [
    { id: "sold_out_log", label: "End of day log", reading: "All 40 cupcakes were sold; the table was empty by 1:00pm.", kind: "data" },
    { id: "cupcake_count", label: "Baking count", reading: "The class baked exactly 40 cupcakes for the sale.", kind: "data" },
    { id: "total_revenue", label: "Sales revenue tally", reading: "40 cupcakes sold at $1.00 each = $40.00 total revenue.", kind: "data" },
    { id: "total_cost", label: "Ingredient cost tally", reading: "40 cupcakes at $1.50 each to make = $60.00 total cost.", kind: "data" },
    { id: "cost_sheet", label: "Ingredient receipt", reading: "Ingredients for each cupcake cost $1.50.", kind: "data" },
    { id: "price_sheet", label: "Price sign", reading: "Cupcakes sold for $1.00 each.", kind: "data" },
    { id: "decoration_note", label: "Table decoration note", reading: "The bake sale table had a blue tablecloth and balloons.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sold_out_log", "cupcake_count"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["total_revenue", "total_cost"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["cost_sheet", "price_sheet"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["decoration_note"] },
  ],

  echo: {
    main: "Bake sale receipts just came in, Cadet. Let's see if this claim holds up.",
    scan: "Selling out and making money aren't always the same thing — read every receipt carefully.",
    sort: "Notice how the totals and the per-cupcake numbers tell the same story two ways.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that every cupcake sold?",
    "Did I mention that the bake sale's total cost was more than its total revenue?",
    "Did I mention how much each cupcake cost to make compared to its price?",
    "Did I avoid saying selling out always means making a profit?",
  ],
};
