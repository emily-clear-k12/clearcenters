// Mission Map — "Branch Checkpoint Mission" — Grade 5 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.15B — Checks & Balances.** "Explain the reasons for and describe the
// system of checks and balances." A tighter, more specific fit than 5.15A
// (basic functions of the three branches, already used by Signal Check as
// "SS.5.15A-SC" — see lib/cases/TEKS_STANDARDS.md), since this concept is
// specifically about ONE branch checking another, not just naming what
// each branch does. No re-anchor needed.
//
// Uses the new "showdown" checkpoint type at cp3 — two branches compete
// directly over which one actually holds the power to check a given
// action, making the library's own "match the check to the scenario" gate
// completely literal.

export const PUBLIC_CASE = {
  standard: "5.6-MM",
  teksLabel:
    "TEKS 5.15B — Checks & Balances (Texas Grade 5 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Social Studies",
  title: "Branch Checkpoint Mission",
  tagline: "One branch just took action. Which OTHER branch actually has the power to check it?",

  mission: {
    briefText:
      "A three-branch government machine has jammed, and it will only start moving again once every gear is matched to the branch that can actually check it. No single branch is allowed to run unchecked — the machine is built so that power stays balanced.",
    goal: "Match a branch of government's action to the specific branch that has the power to check it, and explain why checks and balances exist.",
  },

  mapImage: "/mission-map/5-6-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Gear 1: The President signs a new law passed by Congress. Which branch just took this action?",
      evidence: {
        type: "data",
        label: "GEAR 1 — ACTION CARD",
        text: "The action card shows the President's signature completing a new law, an executive branch action.",
      },
      choices: [
        { id: "a", text: "The executive branch — the President just signed the law" },
        { id: "b", text: "The legislative branch" },
        { id: "c", text: "The judicial branch" },
        { id: "d", text: "No branch is involved in signing laws" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Signing a law is an executive branch action, taken by the President.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Gear 2: The same new law seems to conflict with rights protected by the Constitution. What's the possible problem here?",
      evidence: {
        type: "data",
        label: "GEAR 2 — PROBLEM CARD",
        text: "Legal experts note the new law may go against constitutional protections that already exist.",
      },
      choices: [
        { id: "a", text: "A law might be unconstitutional, which is exactly the kind of problem checks and balances exist to catch" },
        { id: "b", text: "There's no way to challenge a law once it's signed" },
        { id: "c", text: "Only the President can decide if a law is constitutional" },
        { id: "d", text: "This isn't a real problem worth checking" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A possibly unconstitutional law is exactly the kind of problem the system of checks and balances exists to catch.",
    },
    {
      id: "cp3",
      order: 3,
      type: "showdown",
      position: { x: 42, y: 64 },
      prompt: "Gear 3: Two branches both claim they can check whether the new law is constitutional. Which one actually has that power?",
      evidenceA: {
        type: "data",
        label: "JUDICIAL BRANCH CLAIM",
        text: "\"Courts have the power to review laws and decide whether they conflict with the Constitution.\"",
        choiceLabel: "The judicial branch checks this",
      },
      evidenceB: {
        type: "data",
        label: "LEGISLATIVE BRANCH CLAIM",
        text: "\"Congress can just vote again if it doesn't like how a law turned out.\"",
        choiceLabel: "The legislative branch checks this",
      },
      correctSide: "A",
      isTrap: true,
      evidenceLogEntry: "The judicial branch (the courts) is the one with the power to review laws and decide whether they're constitutional.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Gear 4: A court decision strikes down the law as unconstitutional. What has just happened to the system's balance of power?",
      evidence: {
        type: "passage",
        text: "The judicial branch's check stopped a law that the legislative and executive branches had already approved.",
      },
      choices: [
        { id: "a", text: "The judicial branch checked the other two branches, keeping any one branch from having unlimited power" },
        { id: "b", text: "The judicial branch has now taken over the entire government" },
        { id: "c", text: "This means courts can never be checked by anyone else" },
        { id: "d", text: "Nothing changed about the balance of power" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "This check kept any one branch from gaining unlimited power over the others.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Gear 5: A student argues that since the President signs laws, the executive branch should be able to do whatever it wants. Does the machine support that?",
      evidence: {
        type: "passage",
        text: "\"The President signs the laws, so the executive branch should be in charge of everything!\" the student argues.",
      },
      choices: [
        { id: "a", text: "No — every branch, including the executive branch, can be checked by the other branches; no branch has unlimited power" },
        { id: "b", text: "Yes — the branch that signs laws should control everything" },
        { id: "c", text: "Checks and balances only apply to Congress, never the President" },
        { id: "d", text: "The executive branch cannot be checked by any other branch" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "No branch, including the executive branch, has unlimited power — every branch can be checked by the others.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Gear 6: The machine's final question — why does the system of checks and balances exist at all?",
      evidence: {
        type: "passage",
        text: "Every gear in this machine only turned when a branch's action was checked by a different branch, keeping power balanced across all three.",
      },
      choices: [
        { id: "a", text: "So that no single branch of government becomes too powerful, and each branch can check the others' actions" },
        { id: "b", text: "So that one branch can eventually control the other two" },
        { id: "c", text: "Checks and balances exist only to slow down government for no reason" },
        { id: "d", text: "So that only the judicial branch has any real power" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "Checks and balances exist so that no single branch of government becomes too powerful.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, explain how the judicial branch checked the other branches in this scenario. Your answer should: (1) name which branch took the original action and which branch checked it, and (2) explain why the system of checks and balances exists.",

  responseStems: [
    "The ___ branch signed the law, but the ___ branch checked it by ___.",
    "This check mattered because ___.",
    "Checks and balances exist so that ___.",
  ],

  selfCheckQuestions: [
    "I named the branch that took the original action (executive) and the branch that checked it (judicial).",
    "I explained what the judicial branch's check actually did.",
    "I explained why no single branch should have unlimited power.",
    "I explained why checks and balances exist in the government system.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
