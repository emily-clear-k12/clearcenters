// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.11A, TEKS 5.11A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.11A, for example).

export const CAST = {
  devon: { name: "Devon Price", emoji: "👟", color: "#F59E0B", hint: "Thinks supply and demand stop at the store counter." },
  maya: { name: "Maya Chen", emoji: "🛍️", color: "#3B82F6", hint: "Knows what a sellout feels like for a buyer." },
  leo: { name: "Leo Martinez", emoji: "📦", color: "#22C55E", hint: "Tracks how many pairs exist versus how many people want them." },
  nora: { name: "Nora Patel", emoji: "🏷️", color: "#8B5CF6", hint: "Knows how stores may respond." },
  eli: { name: "Eli Brooks", emoji: "📰", color: "#0D9488", hint: "Needs the cause-and-effect story." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.11A",
  title: "The Sneaker Sellout",
  bigQuestion: "How do supply and demand affect what consumers can buy, what they may pay, and the choices they make?",
  trapLine: "If a sneaker sells out, that only matters to the store. Supply and demand do not really affect consumers.",
  evidenceBank: [
    "The store received only 40 pairs",
    "More than 100 customers asked for the shoe",
    "Several sizes sold out quickly"
  ],
  coldOpenMessages: [
    { who: "system", text: "A limited-edition sneaker arrives at City Kicks. By lunchtime, several sizes are gone and customers are arguing about what caused the sellout." },
    { who: "devon", text: "Honestly, this is the store’s problem. Supply and demand do not really affect us customers." },
    { who: "maya", text: "I came to buy my size and it was gone. That feels pretty connected to me." },
    { who: "leo", text: "We received 40 pairs. More than 100 people asked for them today." },
    { who: "nora", text: "Now we have to decide what to order next and how to handle the next shipment." },
    { who: "devon", text: "Still sounds like store business. Consumers just buy something or do not." },
    { who: "eli", text: "That “just” is exactly what my article needs to investigate. What changed for consumers because supply and demand were out of balance?" }
  ],
  selfCheckQuestions: [
    "Did I use evidence showing that demand was greater than the available supply?",
    "Did I explain how the sellout affected what consumers could buy?",
    "Did I explain at least one choice consumers made because of the limited supply?",
    "Did I explain that price can be affected by supply and demand without claiming prices always change in one automatic way?",
    "Did I clearly explain why Devon’s “this only affects the store” claim is incorrect?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What does Devon believe about supply and demand?", placeholder: "Record Devon’s claim..." },
  { key: "supplydemand", label: "What evidence shows the sneaker had limited supply and high demand?", placeholder: "Use the numbers and inventory clues..." },
  { key: "consumer", label: "How did the situation affect consumers?", placeholder: "Think about availability, waiting, substitutes, or price..." },
  { key: "response", label: "How might the store respond?", placeholder: "Record possible business responses..." },
  { key: "judgment", label: "Does Devon’s claim hold up? Why or why not?", placeholder: "Explain how consumers were affected..." }
];

export const PUSH_ANGLE = "Store Notice Repair: rewrite “SOLD OUT — COME BACK LATER” into a customer notice that accurately explains why the shoe sold out and gives two realistic options consumers now have.";
