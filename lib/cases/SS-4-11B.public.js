// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.11B, TEKS 4.11B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ryan: { name: "Ryan Anywhere", emoji: "📍", color: "#F59E0B", hint: undefined },
  climate: { name: "Clara Climate", emoji: "🌤️", color: "#3B82F6", hint: undefined },
  resource: { name: "Rico Resources", emoji: "⛏️", color: "#22C55E", hint: undefined },
  land: { name: "Lena Landforms", emoji: "⛰️", color: "#8B5CF6", hint: undefined },
  judge: { name: "Jules Site Judge", emoji: "🗺️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.11B",
  title: "Where Should This Business Go?",
  bigQuestion: "How do climate and natural resources influence where economic activities happen in Texas?",
  trapLine: "A business can succeed anywhere in Texas if the owner works hard enough.",
  evidenceBank: [
    "A farming business needs suitable soil, water, and climate.",
    "Energy businesses often locate near useful natural resources.",
    "Landforms, climate, and scenery can influence recreation and tourism."
  ],
  coldOpenMessages: [
    { who: "system", text: "A company wants to open a new business somewhere in Texas. One student says geography should not matter because hard work matters more." },
    { who: "ryan", text: "If the owner is good enough, the business should work anywhere." },
    { who: "climate", text: "Some jobs depend on weather conditions that are not the same everywhere." },
    { who: "resource", text: "A business that uses a resource usually needs access to that resource." },
    { who: "land", text: "Landforms can affect tourism, transportation, farming, and construction." },
    { who: "judge", text: "The best location depends on what the business actually needs." }
  ],
  selfCheckQuestions: [
    "Did I explain how climate can influence economic activity?",
    "Did I explain how at least one natural resource can influence location?",
    "Did I connect the geographic factor to a specific business or industry?",
    "Did I compare at least two possible locations or conditions?",
    "Did I explain why physical geography matters even when business decisions also matter?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "business", label: "What does the business need to succeed?", placeholder: "Start with the activity..." },
  { key: "climate", label: "How could climate help or hurt?", placeholder: "Use climate evidence..." },
  { key: "resource", label: "What natural resource might matter?", placeholder: "Explain why..." },
  { key: "compare", label: "Why would another Texas region be a weaker fit?", placeholder: "Compare locations..." },
  { key: "claim", label: "Why is 'a business can succeed anywhere' too simple?", placeholder: "Use geography evidence..." }
];

export const PUSH_ANGLE = "Site Selection: compare two Texas locations and defend the stronger one using two geographic factors.";
