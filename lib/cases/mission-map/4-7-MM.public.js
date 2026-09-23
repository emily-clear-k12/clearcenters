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

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "4.7-MM",
  teksLabel:
    "TEKS 4.4C — Railroads in Texas (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Social Studies",
  title: "Cause-and-Effect Chain Gate",
  tagline: "One railroad changed a whole town. But which changes came from it?",

  mission: {
    briefText:
      "A rusty gate on an old rail line opens only when you understand the full chain of cause and effect. The chain starts on the day the railroad arrived. It runs through everything that changed in town after that. But not every event from that year belongs on the chain.",
    goal: "Explain how one cause — the railroad arriving — led to several effects in a Texas town.",
  },

  mapImage: "/mission-map/4-7-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Link 1: A town record says the first train arrived one spring morning in the 1880s. What kind of event is this?",
      evidence: {
        type: "data",
        label: "TOWN RECORD — LINK 1",
        text: "The record describes crowds gathering to watch the first train pull into the new station.",
      },
      choices: [
        { id: "a", text: "The cause — the railroad's arrival starts this chain" },
        { id: "b", text: "An effect of something that happened later" },
        { id: "c", text: "An unrelated event with no connection to the town" },
        { id: "d", text: "The end of the chain, not the beginning" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The railroad's arrival is the cause that starts this chain.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Link 2: Within a year of the railroad arriving, the town's population doubled. How are these events connected?",
      evidence: {
        type: "data",
        label: "TOWN RECORD — LINK 2",
        text: "Families and workers moved to town. The railroad made travel and shipping goods much easier than before.",
      },
      choices: [
        { id: "a", text: "The population would have doubled without the railroad" },
        { id: "b", text: "Population growth caused the railroad to be built" },
        { id: "c", text: "These two events have no connection at all" },
        { id: "d", text: "The railroad made travel and shipping easier, so the town grew as an effect" },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "The railroad made travel and shipping easier. That caused more people to move to town.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Link 3: Right after the town grew, new stores and a lumber mill opened downtown. How does this fit the chain?",
      evidence: {
        type: "data",
        label: "TOWN RECORD — LINK 3",
        text: "Business owners said the growing town gave them new customers. That is why they opened stores and a mill.",
      },
      choices: [
        { id: "a", text: "New businesses caused the railroad to be built" },
        { id: "b", text: "A second effect. The bigger population, caused by the railroad, led to new businesses." },
        { id: "c", text: "This has nothing to do with the railroad or the growth" },
        { id: "d", text: "New businesses always open, no matter the population" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "New businesses are a second effect. The railroad caused the town to grow, and the growth caused new businesses.",
    },
    {
      id: "cp4",
      order: 4,
      type: "sequence",
      position: { x: 58, y: 30 },
      prompt: "Link 4: Put the chain in order, from the first event to the last.",
      evidence: {
        type: "passage",
        label: "LINK 4 — THE FULL CHAIN",
        text: "You have traced the railroad, the town's growth, and the new businesses. In what order did they happen?",
      },
      items: [
        { id: "arrival", text: "The railroad arrives in town" },
        { id: "travel", text: "Travel and shipping goods become much easier" },
        { id: "growth", text: "The town's population grows as families and workers move in" },
        { id: "business", text: "New stores and a lumber mill open for the bigger town" },
      ],
      correctOrder: ["arrival", "travel", "growth", "business"],
      evidenceLogEntry: "The chain goes in order: the railroad arrives, travel gets easier, the town grows, and new businesses open.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Link 5: A record from the same year mentions a bad drought in a county two hundred miles away. Does it belong on this chain?",
      evidence: {
        type: "passage",
        text: "The drought happened the same year the railroad arrived. It was in a different county. Nothing in this town's records connects to it.",
      },
      choices: [
        { id: "a", text: "Yes. Anything from the same year belongs on the chain." },
        { id: "b", text: "The drought must have caused the railroad to be built" },
        { id: "c", text: "Happening at the same time always proves cause and effect" },
        { id: "d", text: "No. Being in the same year is not enough. No evidence connects the drought to this town." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "The drought happened the same year. But happening at the same time does not prove it caused anything here.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Link 6: The gate asks one last question. How did one event lead to so many changes?",
      evidence: {
        type: "passage",
        text: "The railroad made travel easier. That helped the town grow. The growth brought new businesses. One cause led to several effects.",
      },
      choices: [
        { id: "a", text: "An event can cause only one effect" },
        { id: "b", text: "Effects always happen before their cause" },
        { id: "c", text: "One cause, the railroad, can lead to a whole chain of effects, not just one" },
        { id: "d", text: "None of these events are actually connected to each other" },
      ],
      correctChoiceId: "c",
      evidenceLogEntry: "One cause, like the railroad arriving, can lead to a whole chain of connected effects.",
    },
  ],

  finalResponsePrompt:
    "Explain how the railroad changed this Texas town. Your answer should: (1) describe at least two effects in the right order, and (2) explain why the faraway drought did not belong on the chain.",

  responseStems: [
    "When the railroad arrived, it caused ___. That then caused ___.",
    "I know these events are connected because ___.",
    "The drought didn't belong on this chain because ___.",
  ],

  selfCheckQuestions: [
    "I described two effects of the railroad, in order.",
    "I used the words \"cause\" and \"effect\" correctly.",
    "I explained why the faraway drought wasn't part of this chain.",
    "I explained how one event can lead to a chain of effects.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
