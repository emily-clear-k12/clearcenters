// Mission Map — "Text Feature Code Breaker" — Grade 3 ELAR.
//
// From the library concept ELAR 3.4. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 3), per rule 11: **3.10C — "explain the author's use of print
// and graphic features to achieve specific purposes."** Direct fit. The case
// covers both halves of that standard — PRINT features (a heading, bold print
// with a glossary) and GRAPHIC features (a captioned photo, a labeled diagram) —
// and every checkpoint asks what a feature is FOR, which is the "explain...
// to achieve specific purposes" part. Naming a feature is never enough.
//
// The article is described in words rather than drawn, so the case works with
// no per-checkpoint art. The trap is the library's decorative border.

export const PUBLIC_CASE = {
  standard: "3.16-MM",
  teksLabel:
    "TEKS 3.10C — How Print & Graphic Features Help Readers (Texas Grade 3 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "ELAR",
  title: "Text Feature Code Breaker",
  tagline: "Every feature on the page is a code. Crack what each one is for.",

  mission: {
    briefText:
      "An article about honeybees is locked in code. Each section opens when you figure out what a text feature does. A text feature is a part of the page that helps you read. Headings and captions are text features. Some things on the page only look nice. They will not open anything.",
    goal: "Find text features in an article. Explain how each one helps a reader find or understand information.",
  },

  mapImage: "/mission-map/3-16-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Code 1: Look at the heading. What does it help the reader do?",
      evidence: {
        type: "passage",
        label: "THE PAGE",
        text: "At the top of one section, big bold words say: Inside the Hive. The paragraph under it tells about the rooms inside a beehive.",
      },
      choices: [
        { id: "a", text: "It tells what the section is about before you read it." },
        { id: "b", text: "It makes the page look pretty." },
        { id: "c", text: "It tells the author's name." },
        { id: "d", text: "It shows what a bee looks like." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "A heading tells what a section is about before you read it.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Code 2: Now look at the photo and the words under it. What does the caption do?",
      evidence: {
        type: "passage",
        label: "PHOTO AND CAPTION",
        text: "The photo shows a bee with yellow balls on its back legs. The caption under it says: This bee carries pollen in baskets on its legs.",
      },
      choices: [
        { id: "a", text: "It tells how many bees live in a hive." },
        { id: "b", text: "It explains what the photo shows." },
        { id: "c", text: "It tells the reader to turn the page." },
        { id: "d", text: "It is the title of the whole article." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "A caption explains what a photo shows. Without it, the yellow balls would be a mystery.",
    },
    {
      id: "cp3",
      order: 3,
      type: "quickScan",
      position: { x: 42, y: 66 },
      prompt: "Code 3: Quick check. Read the diagram's labels. Which question can the diagram answer?",
      evidence: {
        type: "passage",
        label: "DIAGRAM",
        text: "The diagram shows honeycomb. It has three labels. One points to a cell with an egg. One points to a cell full of honey. One points to a cell with pollen.",
      },
      choices: [
        { id: "a", text: "Where do bees keep honey inside the hive?" },
        { id: "b", text: "How far can a bee fly?" },
        { id: "c", text: "What color are flowers?" },
        { id: "d", text: "Who wrote this article?" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The diagram shows where bees keep eggs, honey, and pollen inside the honeycomb.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Code 4: Two cadets each found a feature on the page. Which one helps a reader understand the article?",
      evidenceA: {
        type: "passage",
        label: "NOOR'S FEATURE",
        text: "A border of little flowers goes all the way around the page.",
        choiceLabel: "Noor's feature helps",
      },
      evidenceB: {
        type: "passage",
        label: "ELI'S FEATURE",
        text: "The word nectar is in bold. The glossary says: nectar is a sweet juice inside flowers.",
        choiceLabel: "Eli's feature helps",
      },
      correctSide: "B",
      evidenceLogEntry: "Bold print sends you to the glossary to learn a new word. The flower border looks nice, but it gives no information.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 60 },
      prompt: "Code 5: One paragraph is confusing. It tells how bees turn nectar into honey in four steps. Which feature would help most?",
      evidence: {
        type: "passage",
        label: "CONFUSING PARAGRAPH",
        text: "Bees sip nectar. They carry it home. They pass it to other bees. Then they fan it with their wings until it gets thick.",
      },
      choices: [
        { id: "a", text: "A bigger flower border" },
        { id: "b", text: "A numbered diagram that shows each step in order" },
        { id: "c", text: "A funny title" },
        { id: "d", text: "A photo of a jar of honey from a store" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "A numbered diagram would show the four steps in order. That makes them easier to follow.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Code: The article opens for a cadet who can say what text features are for.",
      evidence: {
        type: "passage",
        label: "WHAT YOU CRACKED",
        text: "Heading. Caption. Diagram. Bold word and glossary. Each one did a job.",
      },
      choices: [
        { id: "a", text: "Text features help readers find, preview, or understand information." },
        { id: "b", text: "Text features are there to make a page look nice." },
        { id: "c", text: "Text features are only for younger readers." },
        { id: "d", text: "Text features tell the same thing as the title." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Text features help readers find, preview, or understand information.",
    },
  ],

  finalResponsePrompt:
    "Write a note to the article's author. Your answer should: (1) pick two text features and explain how each one helps a reader, and (2) explain why the flower border is not a helpful feature.",

  responseStems: [
    "The ___ helps a reader because ___.",
    "The ___ also helps because ___.",
    "The flower border does not help because ___.",
  ],

  selfCheckQuestions: [
    "I named two text features.",
    "I explained the job each feature does.",
    "I used facts about bees from the article.",
    "I explained why the border does not help.",
    "I read my answer back, and it makes sense.",
  ],
};
