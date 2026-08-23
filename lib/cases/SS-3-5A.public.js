// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.5A, TEKS 3.5A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  jax: { name: "Jax Spend-It", emoji: "🛍️", color: "#F59E0B", hint: undefined },
  save: { name: "Sage Saver", emoji: "🐷", color: "#3B82F6", hint: undefined },
  donate: { name: "Dani Donate", emoji: "❤️", color: "#22C55E", hint: undefined },
  choice: { name: "Cami Money Choice", emoji: "💵", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.5A",
  title: "What Should I Do With My Money?",
  bigQuestion: "How can people choose to earn, spend, save, and donate money?",
  trapLine: "Once you earn money, the smartest choice is to spend it before it is gone.",
  evidenceBank: [
    "People can earn money by doing work or providing a service.",
    "Saving means keeping money for a future need or goal.",
    "Donating means giving money to help a person, group, or cause."
  ],
  coldOpenMessages: [
    { who: "system", text: "A kid earns $20 helping a neighbor. Four envelopes are on the table: Spend, Save, Donate, and Earn More. One student says the Spend envelope should get all the money." },
    { who: "jax", text: "If you earned it, why not spend it now?" },
    { who: "save", text: "Saving lets money help with something you want or need later." },
    { who: "donate", text: "Money can also be used to help someone else or support a cause." },
    { who: "choice", text: "First you earn money. Then you decide whether to spend, save, or donate some of it." }
  ],
  selfCheckQuestions: [
    "Did I explain how people can earn money?",
    "Did I explain what spending means?",
    "Did I explain what saving means?",
    "Did I explain what donating means?",
    "Did I explain why people may choose more than one use for their money?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "earn", label: "How was the money earned?", placeholder: "What work or service happened?" },
  { key: "spend", label: "What is one reason to spend some money?", placeholder: "A need or want now..." },
  { key: "save", label: "What is one reason to save some money?", placeholder: "A future goal..." },
  { key: "donate", label: "What is one reason to donate some money?", placeholder: "Who or what could it help?" },
  { key: "claim", label: "Why is spending everything right away not the only smart choice?", placeholder: "Use saving or donating evidence..." }
];

export const PUSH_ANGLE = "Envelope Plan: divide the $20 among Spend, Save, and Donate and explain one choice.";
