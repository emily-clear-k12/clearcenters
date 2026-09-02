// Mission Map — "Historical Perspective Portal" — Grade 5 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.23E — Point of View.** "Identify different points of view about
// issues, topics, historical events, and current events." Direct fit —
// the library's own gate order (identify each speaker, identify what each
// cares about, match evidence to each perspective, avoid the "one is
// lying" trap) is exactly the skill of recognizing that different points
// of view about the same event can both be genuine. No re-anchor needed.
//
// Uses the new "quickScan" checkpoint type at cp2 — quickly matching a
// short quote to the speaker's role is a fast, repeatable read, well
// suited to this case's "two windows, same event" structure.

export const PUBLIC_CASE = {
  standard: "5.8-MM",
  teksLabel:
    "TEKS 5.23E — Point of View (Texas Grade 5 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Social Studies",
  title: "Historical Perspective Portal",
  tagline: "Two accounts of the same flood disagree. That doesn't mean one of them is lying.",

  mission: {
    briefText:
      "Two portal windows show the very same event — a flood that hit a small river town — but a shop owner and a farmer describe it very differently. The portal only opens once you can explain why two honest accounts of the same event can still look so different.",
    goal: "Compare two people's accounts of the same historical event and explain how their different roles shaped their points of view.",
  },

  mapImage: "/mission-map/5-8-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Window 1: A shop owner describes the flood. Who is speaking, and what would they naturally focus on?",
      evidence: {
        type: "passage",
        label: "SHOP OWNER ACCOUNT",
        text: "\"The flood ruined my store's entire stock. I lost weeks of business and had to close for repairs.\"",
      },
      choices: [
        { id: "a", text: "A shop owner, naturally focused on the damage to their store and business" },
        { id: "b", text: "A farmer, focused on crops" },
        { id: "c", text: "This account has no connection to any specific role" },
        { id: "d", text: "A government official, focused on rebuilding roads" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The shop owner's account naturally focuses on the damage to their store and business.",
    },
    {
      id: "cp2",
      order: 2,
      type: "quickScan",
      position: { x: 26, y: 40 },
      prompt: "Window 2: Quick check — a farmer also describes the same flood. Who is speaking, and what would they naturally focus on?",
      evidence: {
        type: "passage",
        label: "FARMER ACCOUNT",
        text: "\"The flood actually helped — it left rich new soil on my fields, and this year's crop was one of the best I've had.\"",
      },
      choices: [
        { id: "a", text: "A farmer, naturally focused on how the flood affected their fields and crops" },
        { id: "b", text: "A shop owner, focused on store damage" },
        { id: "c", text: "This account has no connection to any specific role" },
        { id: "d", text: "A shop owner describing the exact same experience as the first account" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The farmer's account naturally focuses on how the flood affected their fields and crops.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Window 3: The shop owner says the flood was a disaster; the farmer says it helped. Match each piece of evidence to the correct perspective.",
      evidence: {
        type: "passage",
        text: "The shop owner's stock was ruined by floodwater; the farmer's fields gained rich new soil from the very same floodwater.",
      },
      choices: [
        { id: "a", text: "Ruined stock matches the shop owner's negative view; new fertile soil matches the farmer's positive view" },
        { id: "b", text: "Both accounts describe the exact same effect on their livelihoods" },
        { id: "c", text: "The evidence doesn't connect to either person's account" },
        { id: "d", text: "Only one of these two accounts can be based on real evidence" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Each piece of evidence matches its speaker's role — ruined stock for the shop owner, fertile new soil for the farmer.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Window 4: A visitor to the portal claims that since the two accounts disagree, one of them must be lying. Is that a fair conclusion?",
      evidence: {
        type: "passage",
        text: "\"They can't both be telling the truth — someone has to be lying!\" the visitor says, even though both accounts match real evidence from the flood.",
      },
      choices: [
        { id: "a", text: "No — different roles can genuinely experience the same event differently; disagreement doesn't mean someone is lying" },
        { id: "b", text: "Yes — two different accounts always means one person is lying" },
        { id: "c", text: "Only the shop owner could possibly be telling the truth" },
        { id: "d", text: "Only the farmer could possibly be telling the truth" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Two accounts can genuinely differ because of different roles and experiences — disagreement doesn't prove either person is lying.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Window 5: A third account, from a town historian writing years later, summarizes both views. What kind of perspective is this?",
      evidence: {
        type: "data",
        label: "TOWN HISTORIAN ACCOUNT",
        text: "The historian's summary, written well after the flood, describes both the damage to businesses and the benefit to farmland.",
      },
      choices: [
        { id: "a", text: "A later, broader perspective that considers both points of view instead of just one" },
        { id: "b", text: "The only truthful account, since it came later" },
        { id: "c", text: "This account proves both original accounts were wrong" },
        { id: "d", text: "A perspective with no connection to the shop owner or farmer's accounts" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The historian's later account considers both the shop owner's and the farmer's points of view together.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Window 6: The portal's final question — why can two honest people describe the same event so differently?",
      evidence: {
        type: "passage",
        text: "The shop owner and the farmer both told the truth about their own experience, but their different roles gave them very different experiences of the same flood.",
      },
      choices: [
        { id: "a", text: "People's roles, needs, and experiences shape how they see the same event, even when both are being honest" },
        { id: "b", text: "Only one perspective about any event can ever be correct" },
        { id: "c", text: "Historical events only ever affect people in exactly the same way" },
        { id: "d", text: "Disagreement always means someone is being dishonest" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "People's roles and experiences shape how they see the same event — both accounts can be honest even when they differ.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain why the shop owner and the farmer described the flood so differently. Your answer should: (1) describe each person's point of view with evidence, and (2) explain why disagreement doesn't mean either one was lying.",

  responseStems: [
    "The shop owner's point of view was ___ because ___.",
    "The farmer's point of view was ___ because ___.",
    "They can both be telling the truth because ___.",
  ],

  selfCheckQuestions: [
    "I described both the shop owner's and the farmer's points of view using evidence.",
    "I explained why their roles led to different experiences of the same event.",
    "I explained why disagreement doesn't mean someone is lying.",
    "I used the words \"point of view\" or \"perspective\" correctly.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
