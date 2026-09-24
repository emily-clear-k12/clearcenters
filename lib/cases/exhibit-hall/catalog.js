const REASONS = [
  { id: "point", label: "Doesn't prove the point" },
  { id: "place", label: "Wrong place" },
  { id: "myth", label: "A myth or mistake" },
  { id: "picture", label: "Misleading picture" },
  { id: "topic", label: "True but off-topic" },
];

const DESERT = {
  id: "SCI-3.13A-EX",
  standard: "SCI-3.13A-EX",
  grade: 3,
  subject: "Science",
  kicker: "Exhibit Hall · 3.13A",
  title: "Built for the desert",
  job: "Show four ways a body part helps in the desert.",
  detail: "Each spot is a different problem. Choose the piece that proves it.",
  mythId: "hump",
  stamps: ["Picture", "Note", "Test"],
  spots: [
    { id: "heat", label: "Let heat out" },
    { id: "sand", label: "Keep sand out" },
    { id: "ground", label: "Stay off hot ground" },
    { id: "hide", label: "Hard to see" },
  ],
  reasons: REASONS,
  cards: [
    { id: "ears", title: "Huge ears", tag: "A fennec fox", image: "/maker/ears.jpg", role: "strong", reason: "point", job: "heat" },
    { id: "heat", title: "An ear test", tag: "Heat leaving the body", image: "", role: "strong", reason: "point", job: "heat", kind: "graph", bars: [{ label: "Big ears", height: "82%" }, { label: "Small ears", height: "34%" }] },
    { id: "seeds", title: "Water from seeds", tag: "A field note", image: "", role: "weak", reason: "topic", job: "none", kind: "text", text: "Kangaroo rats get the water they need from the seeds they eat." },
    { id: "lashes", title: "Thick eyelashes", tag: "A camel", image: "/maker/lashes.jpg", role: "strong", reason: "point", job: "sand" },
    { id: "legs", title: "Long legs", tag: "A roadrunner", image: "/maker/legs.jpg", role: "strong", reason: "point", job: "ground" },
    { id: "lizard", title: "Sand-colored skin", tag: "A horned lizard", image: "/maker/lizard.jpg", role: "strong", reason: "point", job: "hide" },
    { id: "feet", title: "Wide feet", tag: "A camel", image: "/maker/feet.jpg", role: "strong", reason: "point", job: "sink" },
    { id: "dunes", title: "Just the desert", tag: "Sand and sky", image: "/maker/dunes.jpg", role: "weak", reason: "point", job: "none" },
    { id: "hump", title: "A camel's hump", tag: "Stores water for long walks", image: "/maker/hump.jpg", role: "myth", reason: "myth", job: "none" },
    { id: "duck", title: "Webbed feet", tag: "A duck", image: "/maker/duck.jpg", role: "place", reason: "place", job: "none" },
    { id: "bear", title: "Thick fur", tag: "A polar bear", image: "/maker/bear.jpg", role: "place", reason: "place", job: "none" },
  ],
  lateTitle: "Late field note",
  late: "At noon the sand was hot enough to hurt a bare foot. An animal standing taller kept its body farther from the sand.",
  mcPrompt: "Which source shows a body part that lets heat out?",
  mc: ["Huge ears", "An ear test", "Wide feet", "A camel's hump"],
  mcAnswer: "Huge ears",
  msPrompt: "Which sources tell about staying off hot sand? Choose all that apply.",
  ms: ["Long legs", "Late field note", "Just the desert", "Thick fur"],
  msAnswers: ["Long legs", "Late field note"],
  tfPrompt: "Our sources tell how many days a camel can go without water.",
  tfIsFalse: true,
  icLead: "The late note helps most with",
  ic: ["stay off hot ground", "let heat out", "how long a camel can drink"],
  icAnswer: "stay off hot ground",
};

const CASES = { "SCI-3.13A-EX": DESERT };

export function getExhibitCase(standard) {
  return CASES[standard] || null;
}

export function publicExhibit(standard) {
  const exhibit = getExhibitCase(standard);
  if (!exhibit) return null;
  return {
    id: exhibit.id,
    standard: exhibit.standard,
    kicker: exhibit.kicker,
    title: exhibit.title,
    job: exhibit.job,
    detail: exhibit.detail,
    stamps: exhibit.stamps,
    spots: exhibit.spots,
    reasons: exhibit.reasons,
    cards: exhibit.cards.map(({ id, title, tag, image, kind, text, bars }) => ({ id, title, tag, image, kind, text, bars })),
    lateTitle: exhibit.lateTitle,
    late: exhibit.late,
    mcPrompt: exhibit.mcPrompt,
    mc: exhibit.mc,
    msPrompt: exhibit.msPrompt,
    ms: exhibit.ms,
    tfPrompt: exhibit.tfPrompt,
    icLead: exhibit.icLead,
    ic: exhibit.ic,
  };
}
