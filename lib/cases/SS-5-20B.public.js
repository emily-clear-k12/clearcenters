// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.20B, TEKS 5.20B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.20B, for example).

export const CAST = {
  milo: { name: "Milo Museum", emoji: "🖼️", color: "#F59E0B", hint: "Thinks art is decoration, not evidence." },
  lena: { name: "Lena Curator", emoji: "🏛️", color: "#3B82F6", hint: "Owns visual details and context." },
  gus: { name: "Gus Great Depression File", emoji: "📁", color: "#8B5CF6", hint: "Owns historical context." },
  nora: { name: "Nora Note Card", emoji: "📝", color: "#22C55E", hint: "Owns the artist-note evidence." },
  theo: { name: "Theo Source Detective", emoji: "🔎", color: "#0D9488", hint: "Separates evidence from certainty." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.20B",
  title: "The Painting Is Not Just a Picture",
  bigQuestion: "How can art help us understand the time period in which it was created?",
  trapLine: "It is just a painting. Pictures are decoration, not historical evidence.",
  evidenceBank: [
    "A 1937 painting shows a long line outside a relief office.",
    "Workers with shovels repair a road while families watch from nearby.",
    "The artist said the scene was inspired by people and work projects observed in the city."
  ],
  coldOpenMessages: [
    { who: "system", text: "A museum receives a 1937 painting showing a relief line and a road crew. Milo says it is only decoration and should not count as historical evidence." },
    { who: "milo", text: "It is a painting, not a history book. We cannot learn much from it." },
    { who: "lena", text: "First we describe what is actually in the image. Then we ask what those details may reflect." },
    { who: "gus", text: "The 1930s included widespread unemployment and public relief efforts. That context matters." },
    { who: "nora", text: "The exhibit note dates the painting to 1937 and says the artist observed a relief line and a public works crew." },
    { who: "theo", text: "A source can be useful without proving every detail by itself." }
  ],
  selfCheckQuestions: [
    "Did I describe at least two specific details from the artwork or exhibit note?",
    "Did I connect those details to conditions of the Great Depression era?",
    "Did I explain how the artwork reflects the time period instead of only describing the picture?",
    "Did I identify at least one thing the artwork cannot prove by itself?",
    "Did I explain why art can be useful historical evidence even though it is not a complete record?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "observe", label: "What details can you directly observe?", placeholder: "List only what the artwork shows..." },
  { key: "context", label: "What historical context helps explain those details?", placeholder: "Connect to the 1930s..." },
  { key: "reflect", label: "What does the artwork suggest about its time period?", placeholder: "Explain the relationship..." },
  { key: "limit", label: "What can the painting NOT prove by itself?", placeholder: "Identify a limit..." },
  { key: "claim", label: "Does Milo’s claim hold up? Why or why not?", placeholder: "Use evidence and context..." }
];

export const PUSH_ANGLE = "Exhibit Label: write a two-sentence museum label explaining what the painting reveals about the 1930s and one limitation of the source.";
