// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.10B, TEKS 4.10B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  lee: { name: "Lee Business-Only", emoji: "🏪", color: "#F59E0B", hint: undefined },
  consumer: { name: "Cami Consumer", emoji: "🛍️", color: "#3B82F6", hint: undefined },
  owner: { name: "Owen Opportunity", emoji: "💡", color: "#22C55E", hint: undefined },
  comp: { name: "Casey Competition", emoji: "🏁", color: "#8B5CF6", hint: undefined },
  synth: { name: "Nora Benefit Board", emoji: "📋", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.10B",
  title: "Why Choice Matters",
  bigQuestion: "How do choice and opportunity benefit people in a free enterprise system?",
  trapLine: "Choice mostly benefits businesses, not consumers.",
  evidenceBank: [
    "People can choose between different products, prices, and services.",
    "People can start businesses and try new ideas.",
    "Businesses may improve products, service, or prices to attract customers."
  ],
  coldOpenMessages: [
    { who: "system", text: "Two shops open in the same neighborhood. A student says competition and choice are mainly useful for the business owners." },
    { who: "lee", text: "Choice seems like a business thing. Customers just buy what is there." },
    { who: "consumer", text: "Consumers benefit when they can compare products, prices, and services." },
    { who: "owner", text: "People can also create new businesses and try new ideas." },
    { who: "comp", text: "Competition can push businesses to improve what they offer." },
    { who: "synth", text: "A strong answer should show how different people can benefit in different ways." }
  ],
  selfCheckQuestions: [
    "Did I explain how choice can benefit consumers?",
    "Did I explain how opportunity can benefit entrepreneurs or business owners?",
    "Did I explain how competition can improve products, services, variety, or prices?",
    "Did I show benefits for more than one group?",
    "Did I explain why free enterprise benefits are not only for businesses?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "consumer", label: "How does choice benefit consumers?", placeholder: "Use price/product/service evidence..." },
  { key: "owner", label: "How does opportunity benefit business owners or entrepreneurs?", placeholder: "Explain what they can do..." },
  { key: "comp", label: "How can competition create another benefit?", placeholder: "Explain what businesses may improve..." },
  { key: "compare", label: "How are consumer benefits and business benefits different?", placeholder: "Compare the two..." },
  { key: "claim", label: "Why is 'choice mostly benefits businesses' incomplete?", placeholder: "Use both sides..." }
];

export const PUSH_ANGLE = "Benefit Match: match choice, opportunity, and competition to the people who benefit and explain why.";
