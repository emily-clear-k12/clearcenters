// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.17B, TEKS 4.17B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  cole: { name: "Cole One-Style", emoji: "🎵", color: "#F59E0B", hint: undefined },
  lydia: { name: "Lydia Mendoza File", emoji: "🎸", color: "#3B82F6", hint: undefined },
  chelo: { name: "Chelo Silva File", emoji: "🎤", color: "#22C55E", hint: undefined },
  bledsoe: { name: "Julius Bledsoe File", emoji: "🎼", color: "#8B5CF6", hint: undefined },
  curator: { name: "Nina Culture Curator", emoji: "🏛️", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.17B",
  title: "What Sounds Like Texas?",
  bigQuestion: "How have artists from different racial, ethnic, and religious groups contributed to Texas culture?",
  trapLine: "Texas culture has one main style, and other artists mostly added small extras.",
  evidenceBank: [
    "Lydia Mendoza helped popularize Tejano and Mexican American music traditions in Texas.",
    "Chelo Silva became known for Spanish-language and Tejano music.",
    "Julius Lorenzo Cobb Bledsoe was an African American singer and performer whose career contributed to Texas arts and culture."
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum is creating a 'Sound of Texas' exhibit. One student wants one central style and says the other artists can go in side displays." },
    { who: "cole", text: "Wouldn’t the exhibit be clearer if we picked one sound as the real Texas style?" },
    { who: "lydia", text: "Texas music includes traditions shaped by Mexican American artists and communities." },
    { who: "chelo", text: "Spanish-language music is part of the Texas cultural story too." },
    { who: "bledsoe", text: "African American performers also shaped the arts connected to Texas." },
    { who: "curator", text: "A culture can be shared without coming from only one group." }
  ],
  selfCheckQuestions: [
    "Did I describe specific contributions of at least two artists?",
    "Did I use artists from different racial, ethnic, or cultural backgrounds?",
    "Did I explain how their work contributed to Texas culture?",
    "Did I avoid treating one artist as representing an entire group?",
    "Did I explain why Texas culture reflects contributions from many groups?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "artist1", label: "What did one artist contribute?", placeholder: "Use a specific example..." },
  { key: "artist2", label: "What did a second artist contribute?", placeholder: "Use a different group or style..." },
  { key: "artist3", label: "What did a third artist contribute?", placeholder: "Add another example..." },
  { key: "connection", label: "How did these contributions become part of Texas culture?", placeholder: "Explain the shared impact..." },
  { key: "claim", label: "Why is 'one main Texas style' too simple?", placeholder: "Use multiple artists..." }
];

export const PUSH_ANGLE = "Curator Rewrite: replace the one-style exhibit label with a stronger introduction using multiple artists.";
