// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// ELAR Group Chat — ELA.3.9D. TEKS 3.9D(i) — recognize characteristics and structures of informational text, including the central idea with supporting evidence.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Stored with an "ELA." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
// First cast member is the one holding the trap line (the activity opens on them).

export const CAST = {
  leo: { name: "Leo", emoji: "⏱️", color: "#F59E0B", hint: "In a hurry to get to recess." },
  hooky: { name: "Hooky", emoji: "🪝", color: "#EF4444", hint: "The opening question. Loves attention." },
  shelly: { name: "Shelly", emoji: "🐢", color: "#22C55E", hint: "A sea turtle from the article. Feels misrepresented." },
  header: { name: "Header", emoji: "🏷️", color: "#3B82F6", hint: "The heading. Quiet and correct." },
  fields: { name: "Ms. Fields", emoji: "📌", color: "#0D9488", hint: "Building the class fact wall." }
};

export const PUBLIC_CASE = {
  standard: "ELA.3.9D",
  title: "The First Sentence Rule",
  bigQuestion: "The article starts with a question about a turtle crying. What is the article really about?",
  trapLine: "The central idea is always the first sentence. So this article is about turtles crying. Done.",
  evidenceBank: [
    "The first sentence is a question, not an idea",
    "The heading says 'Finding Home'",
    "Paragraph two says mother sea turtles swim back to the beach where they hatched",
    "Paragraph three says scientists think turtles use Earth's magnetic field like a map",
    "The central idea is what most of the details are about"
  ],
  coldOpenMessages: [
    { who: "system", text: "Ms. Fields's class is reading an article for the fact wall. The heading says: FINDING HOME." },
    { who: "system", text: "\"Have you ever seen a turtle cry? Sea turtles on the beach can look like they are crying. Those 'tears' help them get rid of extra salt.\"" },
    { who: "system", text: "\"A mother sea turtle can swim thousands of miles across the ocean. Then she comes back to lay her eggs on the same beach where she hatched.\"" },
    { who: "system", text: "\"How does she find it? Scientists think sea turtles can sense Earth's magnetic field. They use it like a map to find their way home.\"" },
    { who: "hooky", text: "Hi! I'm the first sentence. I'm a question. My job is to make you want to keep reading. That's all." },
    { who: "shelly", text: "I swam two thousand miles to get back to my beach. TWO THOUSAND. And you think this is about crying?" },
    { who: "header", text: "I've been sitting at the top the whole time. Nobody reads me." },
    { who: "fields", text: "Leo, what's the central idea for the fact wall?" },
    { who: "leo", text: "The central idea is always the first sentence. So this article is about turtles crying. Done." }
  ],
  selfCheckQuestions: [
    "Did I explain what Hooky's job is?",
    "Did I use the heading?",
    "Did I use details from paragraphs two and three?",
    "Did I say what the article is mostly about?",
    "Did I give Leo a better rule for finding the central idea?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Leo believe?", placeholder: "In your own words, what is Leo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Leo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Ask them to write a better first sentence that tells the central idea right away, and then decide which opening they like more.";
