// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.11B, TEKS 5.11B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.11B, for example).

export const CAST = {
  tessa: { name: "Tessa Green", emoji: "🍓", color: "#F59E0B", hint: "Sees the shortage only from the grocery aisle." },
  marisol: { name: "Marisol Vega", emoji: "🚜", color: "#22C55E", hint: "Knows what reduced supply does to a farm." },
  ben: { name: "Ben Carter", emoji: "🏭", color: "#3B82F6", hint: "Tracks effects on an industry that uses farm products." },
  nia: { name: "Nia Lewis", emoji: "🛒", color: "#8B5CF6", hint: "Connects farm supply to store shelves." },
  drake: { name: "Mr. Drake", emoji: "📚", color: "#0D9488", hint: "Connects the economic idea across time without erasing human consequences." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.11B",
  title: "The Strawberry Shortage",
  bigQuestion: "How can a change in supply or demand affect farms, food businesses, workers, and consumers?",
  trapLine: "A strawberry shortage only affects shoppers at the grocery store. Farms and industries can keep working the same way.",
  evidenceBank: [
    "A late freeze damaged part of the crop",
    "Farms harvested fewer berries",
    "Stores received smaller shipments"
  ],
  coldOpenMessages: [
    { who: "system", text: "A late freeze damages strawberry fields just before harvest. By the next week, farms, food processors, stores, and shoppers are all adjusting." },
    { who: "tessa", text: "This is mostly a shopper problem. The store has fewer strawberries. Farms and factories can keep doing what they always do." },
    { who: "marisol", text: "I harvested fewer berries than expected. That changes quite a lot on a farm." },
    { who: "ben", text: "And my plant cannot make the same number of strawberry products if I cannot buy the same amount of fruit." },
    { who: "nia", text: "My store is already looking at frozen berries and other fruit." },
    { who: "tessa", text: "But that still sounds like separate problems." },
    { who: "drake", text: "Then the real question is whether those problems are separate—or connected by supply and demand." }
  ],
  selfCheckQuestions: [
    "Did I explain how the freeze reduced the supply of strawberries?",
    "Did I explain at least one effect on a farm or agricultural decision?",
    "Did I explain at least one effect on an industry or business that uses strawberries?",
    "Did I explain an effect on stores or consumers, such as availability, substitutes, or possible price changes?",
    "Did I show how the effects are connected instead of treating the shortage as only a shopper problem?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Tessa think the shortage affects?", placeholder: "Record Tessa’s claim..." },
  { key: "farm", label: "How did lower strawberry supply affect the farm?", placeholder: "Record evidence from Marisol..." },
  { key: "industry", label: "How did the shortage affect a food-processing business?", placeholder: "Record evidence from Ben..." },
  { key: "consumer", label: "How did consumers or stores respond?", placeholder: "Record evidence from Nia..." },
  { key: "chain", label: "How are these effects connected across the economy?", placeholder: "Explain the chain from farm to industry to consumer..." }
];

export const PUSH_ANGLE = "Ripple Map: write one sentence for each link in the chain — weather event → farm → processor → store → consumer.";
