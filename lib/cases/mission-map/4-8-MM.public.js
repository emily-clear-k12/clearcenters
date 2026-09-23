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

// Sept 23, 2026 — reading-level pass (open decision 26). Student-facing text was
// rewritten to fit its grade band, measured with tools/mission-map-gradecheck.cjs.
// Sentences were shortened and split. Standards vocabulary was kept. Answer keys,
// checkpoint order, and the server case are unchanged.

export const PUBLIC_CASE = {
  standard: "4.8-MM",
  teksLabel:
    "TEKS 4.19A — Primary & Secondary Sources (Texas Grade 4 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 4,
  subject: "Social Studies",
  title: "Primary Source Lockbox",
  tagline: "A diary can prove what one person lived through. It can't prove what everyone felt.",

  mission: {
    briefText:
      "A researcher's lockbox holds old sources: a settler's diary, a photo, and a hand-drawn map. Each drawer opens only if you know what that source can and can't tell you. If you claim a source proves too much, the drawer stays stuck.",
    goal: "Tell what kind of source something is and who made it. Then tell what it can really prove, without claiming too much.",
  },

  mapImage: "/mission-map/4-8-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Drawer 1: Inside is a handwritten diary page from a Texas settler in the 1850s. What type of source is it?",
      evidence: {
        type: "data",
        label: "DRAWER 1 — DIARY PAGE",
        text: "The page was written by the settler herself. It describes her own day, in her own hand.",
      },
      choices: [
        { id: "a", text: "A secondary source, since it's old" },
        { id: "b", text: "A primary source. It was made by someone who lived through the event." },
        { id: "c", text: "Neither — diaries don't count as sources" },
        { id: "d", text: "A secondary source, since it's handwritten" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "A firsthand, handwritten account is a primary source.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Drawer 2: Inside is a textbook chapter written last year about settlers in the 1850s. What type of source is it?",
      evidence: {
        type: "data",
        label: "DRAWER 2 — TEXTBOOK CHAPTER",
        text: "A historian wrote the chapter last year. She used many diaries, letters, and records from that time.",
      },
      choices: [
        { id: "a", text: "A primary source, since it's about the 1850s" },
        { id: "b", text: "Neither — textbooks don't count as sources" },
        { id: "c", text: "A primary source, since it's a book" },
        { id: "d", text: "A secondary source. It was written later by someone summing up other sources." },
      ],
      correctChoiceId: "d",
      evidenceLogEntry: "A modern account built from other sources is a secondary source.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Drawer 3: Two researchers disagree about what the diary proves. Which claim is valid?",
      evidenceA: {
        type: "passage",
        label: "CLAIM A",
        text: "\"This diary proves what this settler lived through and how she felt about her day.\"",
        choiceLabel: "This is what the diary can actually prove",
      },
      evidenceB: {
        type: "passage",
        label: "CLAIM B",
        text: "\"This diary proves that every settler in Texas felt the same way she did.\"",
        choiceLabel: "This is what the diary can actually prove",
      },
      correctSide: "A",
      evidenceLogEntry: "The diary proves one settler's own experience. It can't prove what every settler in Texas felt.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Drawer 4: A faded photo shows a small group building a cabin. Who most likely made it, and why does that matter?",
      evidence: {
        type: "data",
        label: "DRAWER 4 — PHOTOGRAPH",
        text: "Someone who was there most likely took the photo. It shows only what the camera caught at that moment.",
      },
      choices: [
        { id: "a", text: "Photos always show the whole story of an event" },
        { id: "b", text: "Someone who was there likely took it. It shows only what the camera caught, not what came before or after." },
        { id: "c", text: "Who created a photograph never matters" },
        { id: "d", text: "This photo proves what happened at every cabin in Texas" },
      ],
      correctChoiceId: "b",
      evidenceLogEntry: "The photo shows only what the camera caught in one moment. It is not the whole story.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Drawer 5: A hand-drawn map shows one planned route for settlers. What can this map prove?",
      evidence: {
        type: "passage",
        text: "The map shows the route one surveyor planned. It does not show if settlers really used that route.",
      },
      choices: [
        { id: "a", text: "It proves what route was planned, not what really happened later" },
        { id: "b", text: "It proves every settler definitely used this exact route" },
        { id: "c", text: "Maps can never be used as evidence" },
        { id: "d", text: "It proves nothing at all about the 1850s" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "The map proves what route was planned. It does not prove what settlers really did.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Drawer 6: The last drawer asks why it matters to know a source's limits.",
      evidence: {
        type: "passage",
        text: "Every source in the box could prove something. None of them could prove everything about the 1850s.",
      },
      choices: [
        { id: "a", text: "You can only use a source honestly if you know what it shows and what it can't prove" },
        { id: "b", text: "One source can prove everything about a time period" },
        { id: "c", text: "Limits don't matter as long as a source is old" },
        { id: "d", text: "Primary sources never have any limits" },
      ],
      correctChoiceId: "a",
      evidenceLogEntry: "Using a source honestly means knowing what it shows and what it can't prove.",
    },
  ],

  finalResponsePrompt:
    "Explain what the settler's diary can and cannot prove. Your answer should: (1) identify it as a primary source and explain why, and (2) explain why it can't prove what every settler in Texas felt.",

  responseStems: [
    "The diary is a primary source because ___.",
    "The diary can prove ___, but it cannot prove ___.",
    "A source's limits matter because ___.",
  ],

  selfCheckQuestions: [
    "I identified the diary as a primary source and explained why.",
    "I explained what the diary can prove: one settler's experience.",
    "I explained what the diary cannot prove: what every settler felt.",
    "I didn't claim a source proves more than it can.",
    "I read my answer back, and it makes sense to someone who wasn't there.",
  ],
};
