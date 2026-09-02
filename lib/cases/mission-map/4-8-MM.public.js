// Mission Map — "Primary Source Lockbox" — Grade 4 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **4.19A — Primary & Secondary Sources.** "Differentiate between, locate,
// and use valid primary and secondary sources to gather information about
// Texas." Direct fit — the library's own gate order (identify the source
// type, identify who created it, choose what it proves, avoid
// overclaiming) is exactly the skill of using a source validly instead of
// stretching it beyond what it can actually show. No re-anchor needed.
//
// Uses the new "showdown" checkpoint type at cp3 — a modest, accurate claim
// about what a source proves competes directly against an overclaiming
// version of the same source, making the library's own "avoid overclaiming"
// trap gate completely literal.

export const PUBLIC_CASE = {
  standard: "4.8-MM",
  teksLabel:
    "TEKS 4.19A — Primary & Secondary Sources (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Social Studies",
  title: "Primary Source Lockbox",
  tagline: "A diary entry can prove one person's experience. It can't prove what everyone felt.",

  mission: {
    briefText:
      "A researcher's lockbox is full of old sources — a settler's diary, a photograph, and a hand-drawn map — but each one only unlocks if you can prove you know exactly what it can and can't tell you. Overclaiming what a source proves keeps every drawer jammed shut.",
    goal: "Identify what kind of source something is, who created it, and what it can validly prove — without overclaiming.",
  },

  mapImage: "/mission-map/4-8-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Drawer 1: A handwritten diary page from a Texas settler in the 1850s is inside. What type of source is this?",
      evidence: {
        type: "data",
        label: "DRAWER 1 — DIARY PAGE",
        text: "The page is a firsthand, handwritten account written by the settler herself, describing her own day.",
      },
      choices: [
        { id: "a", text: "A primary source — it was created firsthand by someone who experienced the event" },
        { id: "b", text: "A secondary source, since it's old" },
        { id: "c", text: "Neither — diaries don't count as sources" },
        { id: "d", text: "A secondary source, since it's handwritten" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A firsthand, handwritten account is a primary source.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Drawer 2: A history textbook chapter written last year, describing settlers' lives in the 1850s, is also inside. What type of source is this?",
      evidence: {
        type: "data",
        label: "DRAWER 2 — TEXTBOOK CHAPTER",
        text: "The chapter was written by a modern historian using many different diaries, letters, and records from that time.",
      },
      choices: [
        { id: "a", text: "A secondary source — it was created later by someone summarizing other sources, not from firsthand experience" },
        { id: "b", text: "A primary source, since it's about the 1850s" },
        { id: "c", text: "Neither — textbooks don't count as sources" },
        { id: "d", text: "A primary source, since it's a book" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A modern account built from other sources, rather than firsthand experience, is a secondary source.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Drawer 3: Two researchers disagree about what the settler's diary actually proves. Which claim is valid?",
      evidenceA: {
        type: "passage",
        label: "CLAIM A",
        text: "\"This diary proves what THIS settler experienced and felt about her own day.\"",
        choiceLabel: "This is what the diary can actually prove",
      },
      evidenceB: {
        type: "passage",
        label: "CLAIM B",
        text: "\"This diary proves that every settler in Texas felt exactly the same way she did.\"",
        choiceLabel: "This is what the diary can actually prove",
      },
      correctSide: "A",
      isTrap: true,
      evidenceLogEntry: "The diary can only prove one settler's own experience — it can't prove what every settler in Texas felt.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Drawer 4: A faded photograph shows a small group building a cabin. Who most likely created this source, and how does that matter?",
      evidence: {
        type: "data",
        label: "DRAWER 4 — PHOTOGRAPH",
        text: "The photograph was likely taken by someone present at the scene, showing exactly what that camera captured at that moment.",
      },
      choices: [
        { id: "a", text: "It was likely created by someone present, and it can only show what the camera actually captured — not what happened before or after" },
        { id: "b", text: "Photographs always show the complete story of an entire event" },
        { id: "c", text: "Who created a photograph never matters" },
        { id: "d", text: "This photograph proves what happened at every cabin in Texas" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "The photograph can only show what the camera captured in that one moment — not the whole story.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Drawer 5: A hand-drawn map from a survey shows one planned settlement route. What can this map actually prove?",
      evidence: {
        type: "passage",
        text: "The map shows the route one surveyor planned, but it doesn't show whether settlers actually followed that exact route.",
      },
      choices: [
        { id: "a", text: "It proves what route was planned — not necessarily what actually happened afterward" },
        { id: "b", text: "It proves every settler definitely used this exact route" },
        { id: "c", text: "Maps can never be used as evidence" },
        { id: "d", text: "It proves nothing at all about the 1850s" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The map proves what route was planned, not necessarily what settlers actually did afterward.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Drawer 6: The lockbox's final question — why does it matter to know a source's limits, not just what it shows?",
      evidence: {
        type: "passage",
        text: "Every source in this lockbox could prove something specific, but none of them could prove everything about the 1850s.",
      },
      choices: [
        { id: "a", text: "A source can only be used honestly if you know both what it shows AND what it can't prove" },
        { id: "b", text: "Any single source can prove everything about a time period" },
        { id: "c", text: "Limits don't matter as long as a source is old" },
        { id: "d", text: "Primary sources never have any limits" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Using a source honestly means understanding both what it shows and what it can't prove.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain what the settler's diary can and cannot prove. Your answer should: (1) identify it as a primary source and explain why, and (2) explain why it can't prove what every settler in Texas felt.",

  responseStems: [
    "The diary is a primary source because ___.",
    "The diary can prove ___, but it cannot prove ___.",
    "A source's limits matter because ___.",
  ],

  selfCheckQuestions: [
    "I correctly identified the diary as a primary source and explained why.",
    "I explained what the diary can prove (one settler's experience).",
    "I explained what the diary cannot prove (what every settler felt).",
    "I avoided overclaiming what any one source can show.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
