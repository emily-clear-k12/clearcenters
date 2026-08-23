// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.3.12, TEKS 3.12).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Max Just-Art", emoji: "🖼️", color: "#F59E0B", hint: undefined },
  artist: { name: "Ari Artist", emoji: "🎨", color: "#3B82F6", hint: undefined },
  writer: { name: "Wendy Writer", emoji: "📖", color: "#22C55E", hint: undefined },
  heritage: { name: "Hana Heritage", emoji: "🧵", color: "#8B5CF6", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.3.12",
  title: "The Painting Is Telling Us Something",
  bigQuestion: "How can writers and artists help preserve or shape the cultural heritage of a community?",
  trapLine: "A painting or story is mainly entertainment, not evidence about culture.",
  evidenceBank: [
    "The artwork shows clothing, foods, family activities, and a community setting.",
    "The writing describes traditions, places, and experiences from community life.",
    "Art and writing can preserve memories and help others learn about a community's culture."
  ],
  coldOpenMessages: [
    { who: "system", text: "A gallery guide shows students a painting of a family celebration and a story about growing up in a community. One student says the works are just for entertainment." },
    { who: "max", text: "It’s a painting and a story. Why treat them like clues about culture?" },
    { who: "artist", text: "Artists can show traditions, places, clothing, and everyday life." },
    { who: "writer", text: "Writers can preserve stories, memories, and experiences from a community." },
    { who: "heritage", text: "A work can entertain and still help preserve cultural heritage." }
  ],
  selfCheckQuestions: [
    "Did I explain what the artwork can show about culture?",
    "Did I explain what writing can preserve?",
    "Did I connect a work to cultural heritage?",
    "Did I explain how future generations can learn from the work?",
    "Did I explain why art or writing can be more than entertainment?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "art", label: "What can the painting teach about culture?", placeholder: "Use visual details..." },
  { key: "writing", label: "What can the story teach about community life?", placeholder: "Use traditions/places/experiences..." },
  { key: "heritage", label: "How can these works preserve cultural heritage?", placeholder: "Think about future generations..." },
  { key: "claim", label: "Why are the works more than entertainment?", placeholder: "Use what they preserve..." }
];

export const PUSH_ANGLE = "Gallery Caption: write a caption explaining what one work teaches about cultural heritage.";
