// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.3D, TEKS 4.3D).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  eddie: { name: "Eddie Easy-Republic", emoji: "📰", color: "#F59E0B", hint: undefined },
  gov: { name: "Grace Government File", emoji: "📜", color: "#3B82F6", hint: undefined },
  debt: { name: "Dylan Debt Ledger", emoji: "💸", color: "#EF4444", hint: undefined },
  relations: { name: "Rosa Relations File", emoji: "🤝", color: "#22C55E", hint: undefined },
  rangers: { name: "Theo Texas Rangers File", emoji: "⭐", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.3D",
  title: "Can a New Republic Survive?",
  bigQuestion: "What made the Republic of Texas successful in some ways but difficult to manage in others?",
  trapLine: "Once Texas became independent, most of its major problems were solved.",
  evidenceBank: [
    "The Republic created a constitution and organized a government.",
    "The Republic faced serious debt and financial struggles.",
    "Relations with American Indian groups remained difficult and sometimes violent."
  ],
  coldOpenMessages: [
    { who: "system", text: "A newspaper editor in the Republic of Texas writes, 'Independence fixed the big problems. Now Texas can simply grow.' The staff has to test the claim." },
    { who: "eddie", text: "They won independence, so the hardest part was basically finished." },
    { who: "gov", text: "Building a new government was a major success." },
    { who: "debt", text: "A new country can be independent and still have serious money problems." },
    { who: "relations", text: "Independence did not erase conflicts over land and relations with American Indian groups." },
    { who: "rangers", text: "The Republic created organizations to deal with problems, but creating an organization does not mean the problem disappeared." }
  ],
  selfCheckQuestions: [
    "Did I explain at least one success of the Republic of Texas?",
    "Did I explain at least one economic problem?",
    "Did I explain another challenge, such as relations with American Indian groups?",
    "Did I mention an organization or government structure connected to the Republic?",
    "Did I explain why independence did not solve every problem?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Eddie claiming?", placeholder: "State the 'problems solved' claim..." },
  { key: "success", label: "What was one success of the Republic?", placeholder: "Use government evidence..." },
  { key: "problem1", label: "What was one major problem?", placeholder: "Use debt or relations evidence..." },
  { key: "problem2", label: "What was another challenge?", placeholder: "Use a different source..." },
  { key: "conclusion", label: "How can both success and struggle be true?", placeholder: "Explain the balance..." }
];

export const PUSH_ANGLE = "Republic Report Card: give one success, one struggle, and one evidence-based overall rating.";
