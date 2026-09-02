// Mission Map — "Cause-and-Effect Chain Gate" — Grade 4 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **4.4C — Railroads in Texas.** "Explain how the railroad industry
// affected life in Texas, including changes to cities and major
// industries." An excellent, specific real-standard anchor — far stronger
// than a generic skills-strand code — because the library's own evidence
// clues (railroad arrives; town grows; new businesses open; an unrelated
// same-year event) are exactly the cause-and-effect chain 4.4C is asking
// students to explain. No re-anchor needed.
//
// Uses the new "sequence" checkpoint type at cp4 — the chain of effects
// (railroad arrives, then the town grows, then new businesses open) is an
// inherently ordered chain, and putting it in order is the clearest way to
// test the "one cause, multiple effects" skill this concept is built on.

export const PUBLIC_CASE = {
  standard: "4.7-MM",
  teksLabel:
    "TEKS 4.4C — Railroads in Texas (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Social Studies",
  title: "Cause-and-Effect Chain Gate",
  tagline: "One railroad line changed an entire town. But which changes actually came from it?",

  mission: {
    briefText:
      "A rusted iron gate along an old rail line only opens once the full chain of cause and effect is understood — from the day the railroad first arrived to everything that changed in town afterward. Not every event from that year belongs on the chain, though.",
    goal: "Explain how one historical cause — the railroad's arrival — led to multiple effects on a Texas town.",
  },

  mapImage: "/mission-map/4-7-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Link 1: A town record says the first train arrived on a spring morning in the 1880s. What kind of event is this?",
      evidence: {
        type: "data",
        label: "TOWN RECORD — LINK 1",
        text: "The record describes crowds gathering to watch the very first train pull into the newly built station.",
      },
      choices: [
        { id: "a", text: "The cause — the railroad's arrival is the starting event of this chain" },
        { id: "b", text: "An effect of something that happened later" },
        { id: "c", text: "An unrelated event with no connection to the town" },
        { id: "d", text: "The end of the chain, not the beginning" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The railroad's arrival is the starting cause of this chain of events.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Link 2: Within a year of the railroad's arrival, the town's population doubled. What connects these two events?",
      evidence: {
        type: "data",
        label: "TOWN RECORD — LINK 2",
        text: "Families and workers moved to town because the railroad made travel and shipping goods much easier than before.",
      },
      choices: [
        { id: "a", text: "The railroad made travel and shipping easier, causing the town to grow as an effect" },
        { id: "b", text: "The population would have doubled with or without the railroad" },
        { id: "c", text: "Population growth caused the railroad to be built" },
        { id: "d", text: "These two events have no connection at all" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The railroad's arrival caused the town's population to grow as people moved for easier travel and shipping.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Link 3: Right after the population grew, several new stores and a lumber mill opened downtown. How does this fit the chain?",
      evidence: {
        type: "data",
        label: "TOWN RECORD — LINK 3",
        text: "Business owners explained that the growing population created new customers, which is why they opened stores and a mill.",
      },
      choices: [
        { id: "a", text: "A second effect — the growing population (itself an effect of the railroad) caused new businesses to open" },
        { id: "b", text: "New businesses caused the railroad to be built" },
        { id: "c", text: "This event is unrelated to the railroad or the population growth" },
        { id: "d", text: "New businesses always open regardless of population" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "New businesses opening is a second effect in the chain, caused by the population growth that the railroad itself caused.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 30 },
      prompt: "Link 4: Put this chain of cause and effect in the correct order, from the very first event to the last.",
      evidence: {
        type: "passage",
        label: "LINK 4 — THE FULL CHAIN",
        text: "You've now traced the railroad's arrival, the town's population growth, and new businesses opening — but in what order did they actually happen?",
      },
      items: [
        { id: "arrival", text: "The railroad arrives in town" },
        { id: "travel", text: "Travel and shipping goods become much easier" },
        { id: "growth", text: "The town's population grows as families and workers move in" },
        { id: "business", text: "New stores and a lumber mill open to serve the larger population" },
      ],
      correctOrder: ["arrival", "travel", "growth", "business"],
      isTrap: false,
      evidenceLogEntry: "The chain runs in order: the railroad arrives, travel and shipping get easier, the population grows, and then new businesses open.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Link 5: A record from the very same year mentions a severe drought in a county two hundred miles away. Does that belong on this chain?",
      evidence: {
        type: "passage",
        text: "The drought happened the same year the railroad arrived, but in a completely different county with no connection to this town's records.",
      },
      choices: [
        { id: "a", text: "No — happening in the same year isn't enough; there's no evidence connecting the drought to this town's railroad or growth" },
        { id: "b", text: "Yes — anything from the same year belongs on the chain" },
        { id: "c", text: "The drought must have caused the railroad to be built" },
        { id: "d", text: "Time order alone always proves a cause-and-effect connection" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The distant drought happened the same year, but time order alone doesn't prove a cause-and-effect connection to this town.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Link 6: The chain gate asks one final question — how did one historical event lead to so many changes?",
      evidence: {
        type: "passage",
        text: "The railroad's arrival led to easier travel, which led to population growth, which led to new businesses — one cause branching into several connected effects.",
      },
      choices: [
        { id: "a", text: "One cause (the railroad) can lead to a whole chain of connected effects, not just one" },
        { id: "b", text: "A historical event can only ever cause exactly one effect" },
        { id: "c", text: "Effects always happen before their cause" },
        { id: "d", text: "None of these events are actually connected to each other" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "One historical cause, like the railroad's arrival, can lead to a whole connected chain of effects.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how the railroad's arrival changed this Texas town. Your answer should: (1) describe at least two effects in the correct order, and (2) explain why the distant drought didn't belong on this cause-and-effect chain.",

  responseStems: [
    "When the railroad arrived, it first caused ___, which then caused ___.",
    "I know these events are connected because ___.",
    "The drought didn't belong on this chain because ___.",
  ],

  selfCheckQuestions: [
    "I described at least two effects of the railroad's arrival, in order.",
    "I used the words \"cause\" and \"effect\" correctly.",
    "I explained why the distant drought wasn't part of this chain.",
    "I explained how one event can lead to a chain of several connected effects.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
