// Maker Studio — full cases (server-safe). Roles never go to the browser.
import { publicHalls, spotsForWallSize } from "./halls.js";

export const REASONS = [
  { id: "point", label: "Doesn't prove the point" },
  { id: "place", label: "Wrong place" },
  { id: "myth", label: "A myth or mistake" },
  { id: "picture", label: "Misleading picture" },
  { id: "topic", label: "True, but not what the job asks" },
];

// SCI.3.13A-MS — Built for the Desert (Prove It). Grade 3 · wall of 4 · 9 cards.
const DESERT = {
  id: "SCI.3.13A-MS",
  standard: "SCI.3.13A-MS",
  engine: "maker_studio",
  mode: "exhibit",
  exhibitType: "prove_it",
  grade: 3,
  subject: "Science",
  teks: "3.13A",
  kicker: "Maker Studio · 3.13A",
  title: "Built for the Desert",
  wallSize: 4,
  estimatedMinutes: 20,
  topicTags: ["Adaptations", "Desert", "External structures"],
  drivingQuestion: "How do body parts help animals live in the desert?",
  commission: {
    from: "Dr. Reyes, Nature Deck",
    lines: [
      "New cadets move to the desert planet Dune-7 next week.",
      "It is hot. The ground is sand. There is very little water.",
      "Build an exhibit with 4 pieces.",
      "Each piece must show a body part that helps an animal live in the desert.",
    ],
  },
  samOpen: "Look close, Cadet. Some of these cards are tricky.",
  hints: [
    "The job says body part. Can you point to the body part on every card you picked?",
    "Is every animal on your wall a desert animal? Check where each one lives.",
  ],
  placardStem: "The ______ has ______. This helps it live in the desert because ______.",
  placardLooksFor: [
    "Names the animal and the body part.",
    "Says what the body part does.",
    "Connects it to a desert problem: heat, sand, or little water.",
  ],
  plaquePrompt: "Write the sign for the front of your exhibit. Tell visitors what your exhibit shows.",
  plaqueStarter: "Desert animals have body parts that…",
  plaqueSentences: 3,
  mustInclude: [
    "Says that body parts help animals survive (live) in the desert.",
    "Uses at least one example from the student's own wall.",
    "Names a desert problem the body parts solve (heat, sand, or little water).",
  ],
  arrangeGraded: false,
  centerpieceRequired: false,
  mythId: "hump",
  writeBack: {
    strong: "The cadets will know exactly what to look for on Dune-7. Great eye, Cadet.",
    middle: "Most of this is right. But one piece might confuse the cadets. Take a look at it again.",
    rough: "Some of these would not help on Dune-7. A body part has to help in this place.",
  },
  cards: [
    {
      id: "ears",
      title: "Fennec Fox Ears",
      tag: "A desert fox",
      image: "/maker/ears.jpg",
      text: "Big ears let heat leave the fox's body.",
      role: "strong",
      reason: "point",
      why: "Ears are a body part, and they help the fox stay cool in desert heat.",
    },
    {
      id: "feet",
      title: "Camel Feet",
      tag: "A camel",
      image: "/maker/feet.jpg",
      text: "Wide, flat feet do not sink into sand.",
      role: "strong",
      reason: "point",
      why: "Feet are a body part built for walking on sand.",
    },
    {
      id: "lashes",
      title: "Camel Eyelashes",
      tag: "A camel",
      image: "/maker/lashes.jpg",
      text: "Two rows of long lashes keep sand out of its eyes.",
      role: "strong",
      reason: "point",
      why: "Lashes are a body part that protects the eyes in sandstorms.",
    },
    {
      id: "lizard",
      title: "Horned Lizard Skin",
      tag: "A horned lizard",
      image: "/maker/lizard.jpg",
      text: "Sand-colored skin makes it hard for hawks to see.",
      role: "strong",
      reason: "point",
      why: "Skin color is a body part that helps it hide on sand.",
    },
    {
      id: "legs",
      title: "Roadrunner Legs",
      tag: "A roadrunner",
      image: "/maker/legs.jpg",
      text: "Long legs let it run fast on hot ground.",
      role: "strong",
      reason: "point",
      why: "Legs are a body part that helps it catch food and get off the hot sand fast.",
    },
    {
      id: "day",
      title: "Desert Day",
      tag: "A wide desert view",
      image: "/maker/dunes.jpg",
      text: "A desert with a tortoise, a roadrunner, and a kangaroo rat.",
      role: "weak",
      reason: "point",
      why: "It shows the desert, but the animals are too small to see any body part up close.",
    },
    {
      id: "hump",
      title: "Camel Fact Poster",
      tag: "A fun-fact poster",
      image: "/maker/hump.jpg",
      kind: "text",
      text: "Camels keep water in their humps!",
      role: "myth",
      reason: "myth",
      why: "Not true. A hump holds fat, not water.",
      protest: "But everyone says camels store water!",
    },
    {
      id: "duck",
      title: "Duck Feet",
      tag: "A duck",
      image: "/maker/duck.jpg",
      text: "Webbed feet push through water.",
      role: "place",
      reason: "place",
      why: "A real body part, but it helps in a pond, not a desert.",
    },
    {
      id: "seeds",
      title: "Kangaroo Rat Snack",
      tag: "A field note",
      image: "",
      kind: "text",
      text: "It gets water from the seeds it eats.",
      role: "topic",
      reason: "topic",
      why: "True desert fact, but it is about food, not a body part you can see.",
    },
  ],
  learningTarget:
    "I can choose body-part evidence that proves how animals survive in the desert, and leave out a myth or a wrong place.",
  lessonSummary:
    "Students pick a hall, curate 4 pieces from a storage room of 9, reject one on purpose, write placards and a plaque. About 20 minutes.",
  aiContext:
    "Grade 3 science 3.13A external structures. The exhibit must prove body parts help desert survival. Myth: camel humps store water.",
};

const CASES = {
  "SCI.3.13A-MS": DESERT,
};

export function getMakerStudioCase(standard) {
  return CASES[standard] || null;
}

export function listMakerStudioCases() {
  return Object.values(CASES);
}

export function publicMakerStudioCase(standard) {
  const c = getMakerStudioCase(standard);
  if (!c) return null;
  return {
    id: c.id,
    standard: c.standard,
    engine: c.engine,
    mode: c.mode,
    exhibitType: c.exhibitType,
    grade: c.grade,
    subject: c.subject,
    teks: c.teks,
    kicker: c.kicker,
    title: c.title,
    wallSize: c.wallSize,
    estimatedMinutes: c.estimatedMinutes,
    topicTags: c.topicTags,
    drivingQuestion: c.drivingQuestion,
    commission: c.commission,
    samOpen: c.samOpen,
    hints: c.hints,
    placardStem: c.placardStem,
    placardLooksFor: c.placardLooksFor,
    plaquePrompt: c.plaquePrompt,
    plaqueStarter: c.plaqueStarter,
    plaqueSentences: c.plaqueSentences,
    arrangeGraded: c.arrangeGraded,
    centerpieceRequired: c.centerpieceRequired,
    reasons: REASONS,
    halls: publicHalls(),
    spots: spotsForWallSize(c.wallSize),
    cards: c.cards.map(({ id, title, tag, image, kind, text }) => ({
      id,
      title,
      tag,
      image: image || "",
      kind: kind || (image ? "photo" : "text"),
      text: text || "",
    })),
    writeBack: c.writeBack,
  };
}
