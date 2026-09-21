// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Math Group Chat — MA.5.3E. TEKS 5.3E — solve for products of decimals to the hundredths, including situations involving money, using strategies based on place-value understandings.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "MA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  lena: { name: "Lena", emoji: "🧾", color: "#F59E0B", hint: "The class store's newest cashier." },
  tag: { name: "Tag", emoji: "🏷️", color: "#EF4444", hint: "The price tag. Takes his job seriously." },
  pack: { name: "Pencil Pack", emoji: "✏️", color: "#22C55E", hint: "Ten pencils. Refuse to be sold for the price of one." },
  columbo: { name: "Columbo", emoji: "🔎", color: "#3B82F6", hint: "A place value chart. Investigates every digit." },
  kaching: { name: "Kaching", emoji: "💵", color: "#0D9488", hint: "The register. Already rang up $4.50." }
};

export const PUBLIC_CASE = {
  standard: "MA.5.3E",
  title: "Just Add a Zero",
  bigQuestion: "Pencils cost $0.45 each. How much do ten pencils cost?",
  trapLine: "Ten pencils at $0.45? Times ten means add a zero. That's $0.450.",
  evidenceBank: [
    "One pencil costs $0.45",
    "$0.450 is the same amount as $0.45",
    "When you multiply by 10, every digit moves one place to the left",
    "The register rang up $4.50 for ten pencils",
    "Ten pencils have to cost more than one pencil"
  ],
  coldOpenMessages: [
    { who: "system", text: "The class store. A customer wants a pack of ten pencils. Each pencil costs $0.45." },
    { who: "tag", text: "I say $0.45. For ONE pencil. I want that clear." },
    { who: "pack", text: "There are ten of us. We are not being sold for the price of one." },
    { who: "kaching", text: "I already rang it up. My screen says $4.50." },
    { who: "columbo", text: "I investigate digits. When you multiply by 10, watch where the 4 and the 5 go. Do they stay put, or move?" },
    { who: "pack", text: "Also — isn't $0.450 still just 45 cents?" },
    { who: "lena", text: "The register's broken. Ten pencils at $0.45? Times ten means add a zero. That's $0.450." }
  ],
  selfCheckQuestions: [
    "Did I explain what $0.450 is really worth?",
    "Did I use where the digits move on Columbo's chart?",
    "Did I use what the register rang up?",
    "Did I say what ten pencils really cost?",
    "Did I give Lena a rule for multiplying decimals by 10?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Lena believe?", placeholder: "In your own words, what is Lena's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Lena's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask what 100 pencils would cost, and where the digits move this time.";
