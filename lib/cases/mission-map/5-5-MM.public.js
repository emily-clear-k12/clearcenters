// Mission Map — "Rights Case File" — Grade 5 Social Studies.
//
// From the library concept of the same name. TEKS CHECKED FIRST against the
// real PDF, per the standing rule (ClearCenters_STATE.md §9 rule 11):
// **5.19A — Rights Guaranteed by the Bill of Rights.** "Describe
// fundamental rights guaranteed in the Bill of Rights, including freedoms
// of religion, speech, and press; assembly and petition; keeping and
// bearing arms; trial by jury; and the right to an attorney." Direct fit —
// the library's own "Two-Question Test" (is government involved? which
// right applies?) is exactly the reasoning 5.19A asks students to use when
// deciding whether a specific right has actually been affected. No
// re-anchor needed.
//
// Standard checkpoint type throughout — the library's own case-file
// framing (identify who is acting, decide if government is involved,
// identify the possible right, avoid the "unfair = unconstitutional" trap)
// is already a strong evidence-gate case without needing a new mechanic.

export const PUBLIC_CASE = {
  standard: "5.5-MM",
  teksLabel:
    "TEKS 5.19A — Rights Guaranteed by the Bill of Rights (Texas Grade 5 Social Studies; checked against the real, current TEKS document before content was written)",
  grade: 5,
  subject: "Social Studies",
  title: "Rights Case File",
  tagline: "Not every unfair situation is a rights violation. Only one part of this case file actually is.",

  mission: {
    briefText:
      "A stack of case files needs sorting, and only the ones that pass the Two-Question Test belong in front of a judge: is a government actually involved, and does a specific Bill of Rights protection apply? Not every complaint that feels unfair passes both questions.",
    goal: "Use the Bill of Rights to decide whether a government action actually violates a specific, named right.",
  },

  mapImage: "/mission-map/5-5-mm-map.jpg",

  checkpoints: [
    {
      id: "cp1",
      order: 1,
      position: { x: 10, y: 68 },
      prompt: "Case 1: A city official blocks a group from handing out petitions on a public sidewalk downtown. Who is acting?",
      evidence: {
        type: "data",
        label: "CASE FILE 1",
        text: "A city official — a government employee — is the one stopping the group from gathering signatures.",
      },
      choices: [
        { id: "a", text: "A government official is acting — this is government action" },
        { id: "b", text: "A private citizen is acting, not the government" },
        { id: "c", text: "No one is acting in this case" },
        { id: "d", text: "A business owner is acting" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "A city official is a government employee, so this case involves government action.",
    },
    {
      id: "cp2",
      order: 2,
      position: { x: 26, y: 40 },
      prompt: "Case 2: With government action confirmed, which right from the Bill of Rights does blocking petitions and peaceful gathering affect?",
      evidence: {
        type: "data",
        label: "CASE FILE 1 (CONTINUED)",
        text: "The Bill of Rights protects the right to assemble peacefully and petition the government.",
      },
      choices: [
        { id: "a", text: "The right to assembly and petition" },
        { id: "b", text: "The right to a jury trial" },
        { id: "c", text: "The right to bear arms" },
        { id: "d", text: "No right applies to gathering signatures" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Blocking a peaceful petition affects the right to assembly and petition.",
    },
    {
      id: "cp3",
      order: 3,
      position: { x: 42, y: 64 },
      prompt: "Case 3: A sibling takes the remote control without asking, and the other sibling calls it \"a violation of my rights.\" Does this pass the Two-Question Test?",
      evidence: {
        type: "passage",
        label: "CASE FILE 2",
        text: "No government official or government action is involved — this is a disagreement between two family members at home.",
      },
      choices: [
        { id: "a", text: "No — there's no government action involved, so this isn't a Bill of Rights case, even though it might feel unfair" },
        { id: "b", text: "Yes — any unfair situation is automatically a rights violation" },
        { id: "c", text: "This is a violation of the right to a jury trial" },
        { id: "d", text: "Siblings count as government officials" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "With no government action involved, the remote-control dispute isn't a Bill of Rights case — it's just unfair, not unconstitutional.",
    },
    {
      id: "cp4",
      order: 4,
      position: { x: 58, y: 32 },
      prompt: "Case 4: A student claims that because a school rule is strict, it must violate the Bill of Rights. Is \"strict\" the same as \"unconstitutional\"?",
      evidence: {
        type: "passage",
        text: "\"This rule is so unfair, it has to be against my rights!\" the student says, without naming which specific right is affected.",
      },
      choices: [
        { id: "a", text: "No — a rule being strict or unfair doesn't automatically mean a specific right was violated; a specific right has to actually be identified" },
        { id: "b", text: "Yes — any strict rule is always unconstitutional" },
        { id: "c", text: "Schools can never be involved in rights cases" },
        { id: "d", text: "Unfairness and unconstitutionality always mean the same thing" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "A rule being unfair or strict doesn't automatically mean it's unconstitutional — a specific right has to actually be identified and affected.",
    },
    {
      id: "cp5",
      order: 5,
      position: { x: 74, y: 58 },
      prompt: "Case 5: A person accused of a crime is denied the chance to have a lawyer help with their defense. Which right does this affect?",
      evidence: {
        type: "data",
        label: "CASE FILE 3",
        text: "The Bill of Rights guarantees the right to an attorney for someone accused of a crime.",
      },
      choices: [
        { id: "a", text: "The right to an attorney" },
        { id: "b", text: "The right to freedom of religion" },
        { id: "c", text: "The right to bear arms" },
        { id: "d", text: "No right covers legal defense" },
      ],
      correctChoiceId: "a",
      isTrap: false,
      evidenceLogEntry: "Being denied a lawyer in a criminal case affects the right to an attorney.",
    },
    {
      id: "cp6",
      order: 6,
      position: { x: 90, y: 28 },
      prompt: "Case 6: The case file's final question — what is the Two-Question Test actually protecting against?",
      evidence: {
        type: "passage",
        text: "Every real case in this file involved BOTH a government action AND a specific, named right — not just something that felt unfair.",
      },
      choices: [
        { id: "a", text: "The Bill of Rights protects people from government actions that violate specific, named rights — not every unfair situation" },
        { id: "b", text: "The Bill of Rights protects people from every unfair situation, government or not" },
        { id: "c", text: "The Bill of Rights only applies to court cases, never real life" },
        { id: "d", text: "Any disagreement automatically involves the Bill of Rights" },
      ],
      correctChoiceId: "a",
      isTrap: true,
      evidenceLogEntry: "The Bill of Rights protects against government actions that violate specific, named rights — not every unfair situation.",
    },
  ],

  finalResponsePrompt:
    "Using your case file, decide whether the sibling remote-control dispute and the petition-blocking case are both real Bill of Rights cases. Your answer should: (1) apply the Two-Question Test to each, and (2) name the specific right involved in the case that does apply.",

  responseStems: [
    "The petition case passes the Two-Question Test because ___.",
    "The remote-control dispute does not pass the test because ___.",
    "The specific right involved in the real case is ___.",
  ],

  selfCheckQuestions: [
    "I applied the Two-Question Test (government action? specific right?) to both cases.",
    "I explained why the remote-control dispute isn't a real rights case.",
    "I named the specific right involved in the petition case.",
    "I explained that \"unfair\" and \"unconstitutional\" aren't the same thing.",
    "I read my answer back and it makes sense to someone who wasn't there.",
  ],
};
