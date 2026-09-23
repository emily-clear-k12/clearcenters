// Mission Map — "Main Idea Treasure Map" — Grade 3 ELAR.
//
// From the library concept ELAR 3.2. TEKS CHECKED FIRST against the real Texas
// ELAR TEKS (Grade 3), per rule 11: **3.6G — "evaluate details read to determine
// key ideas."** Direct fit. The verb is EVALUATE: the case is built around
// judging which details carry the key idea and which do not, rather than
// finding a main idea sentence and stopping.
//
// The trap is the library's own: a true, fun, memorable fact (cheetah speed)
// that is not about the key idea. It is placed at cp4 as a showdown against a
// real supporting detail, so the student has to weigh two true sentences
// against each other — which is what "evaluate details" asks for.

export const PUBLIC_CASE = {
  standard: "3.14-MM",
  teksLabel:
    "TEKS 3.6G — Evaluating Details to Find Key Ideas (Texas Grade 3 ELAR; checked against the real, current TEKS document before content was written)",
  grade: 3,
  subject: "ELAR",
  title: "Main Idea Treasure Map",
  tagline: "Every gem on this map has to hold up the main idea. Pretty facts do not count.",

  mission: {
    briefText:
      "A treasure map is hidden inside a short article. The map only fills in when you choose the main idea. Then each supporting detail becomes a gem on the map. Be careful. One fact is fun and true, but it does not belong.",
    goal: "Find the main idea of an article. Choose details that support it, and leave out details that do not.",
  },

  mapImage: "/mission-map/3-14-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 70 },
      prompt: "Stop 1: Read the title and the first sentence. What is this article about?",
      evidence: {
        type: "passage",
        label: "ARTICLE",
        text: "Animal Homes. Many animals build homes to stay safe.",
      },
      choices: [
        { id: "a", text: "Animal homes" },
        { id: "b", text: "Fast animals" },
        { id: "c", text: "Pets that live in houses" },
        { id: "d", text: "How to build a house" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The topic is animal homes.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 42 },
      prompt: "Stop 2: Now read the whole article. Which sentence tells the main idea?",
      evidence: {
        type: "passage",
        label: "ARTICLE",
        text: "Many animals build homes to stay safe. Birds weave nests from twigs and grass. The nest keeps eggs warm and off the ground. Prairie dogs dig burrows under the ground. The tunnels hide them from hawks. Beavers pile sticks and mud into a lodge. The door is under the water, so enemies cannot get in. Fun fact: a cheetah can run faster than cars drive on most city streets.",
      },
      choices: [
        { id: "a", text: "Birds weave nests from twigs and grass." },
        { id: "b", text: "Many animals build homes to stay safe." },
        { id: "c", text: "A cheetah can run very fast." },
        { id: "d", text: "Beavers live near water." },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "Main idea: Many animals build homes to stay safe.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 66 },
      prompt: "Stop 3: Pick a detail gem. Which detail supports the main idea?",
      evidence: {
        type: "passage",
        label: "DETAIL CARDS",
        text: "A gem only lights up if the detail shows an animal home keeping an animal safe.",
      },
      choices: [
        { id: "a", text: "Prairie dogs dig tunnels that hide them from hawks." },
        { id: "b", text: "Hawks have sharp eyes." },
        { id: "c", text: "Grass grows in fields." },
        { id: "d", text: "Some animals are brown." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Gem 1: Prairie dog tunnels hide them from hawks.",
    },
    {
      id: "cp4",
      order: 4,
      type: "showdown",
      position: { x: 58, y: 34 },
      prompt: "Stop 4: Two cadets each want to add a gem to the map. Both facts are true. Which one belongs?",
      evidenceA: {
        type: "passage",
        label: "DEV'S GEM",
        text: "A cheetah can run faster than cars drive on most city streets.",
        choiceLabel: "Add Dev's gem",
      },
      evidenceB: {
        type: "passage",
        label: "ANA'S GEM",
        text: "A beaver lodge has its door under the water, so enemies cannot get in.",
        choiceLabel: "Add Ana's gem",
      },
      correctSide: "B",
      evidenceLogEntry: "Gem 2: The beaver lodge door is under water, so enemies cannot get in. The cheetah fact is true, but it is not about homes.",
    },
    {
      id: "cp5",
      order: 5,
      type: "quickScan",
      position: { x: 74, y: 60 },
      prompt: "Stop 5: Quick check. The cheetah fact is true. So why does it not belong on the map?",
      evidence: {
        type: "passage",
        label: "MAP RULE",
        text: "A gem must help explain or prove the main idea.",
      },
      choices: [
        { id: "a", text: "It is not true." },
        { id: "b", text: "It is too short." },
        { id: "c", text: "It is not about animal homes keeping animals safe." },
        { id: "d", text: "Cheetahs are not animals." },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "A fun fact can be true and still not support the main idea.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Final Stop: The treasure opens for the best one-sentence summary. Which one is it?",
      evidence: {
        type: "passage",
        label: "YOUR GEMS",
        text: "Main idea: animals build homes to stay safe. Gems: bird nests, prairie dog tunnels, and beaver lodges.",
      },
      choices: [
        { id: "a", text: "Birds, prairie dogs, and beavers build homes that keep them safe." },
        { id: "b", text: "Birds build nests, and cheetahs run fast." },
        { id: "c", text: "Prairie dogs dig tunnels." },
        { id: "d", text: "Animal homes are the coolest thing in nature." },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Summary: Birds, prairie dogs, and beavers build homes that keep them safe.",
    },
  ],

  finalResponsePrompt:
    "Write to the map keeper. Tell the main idea of the article. Your answer should: (1) give the main idea and two details that support it, and (2) explain why the cheetah fact does not belong.",

  responseStems: [
    "The main idea is ___.",
    "One detail that supports it is ___.",
    "Another detail is ___.",
    "The cheetah fact does not belong because ___.",
  ],

  selfCheckQuestions: [
    "I wrote the main idea in my own words.",
    "I used two details from the article.",
    "Each detail shows a home keeping an animal safe.",
    "I explained why the cheetah fact does not belong.",
    "I did not add my own opinion.",
  ],
};
