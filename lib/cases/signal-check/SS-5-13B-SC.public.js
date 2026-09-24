// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.13B: colonial
// governments and early representative institutions (e.g. Mayflower
// Compact, House of Burgesses, town meetings).
//
// This case deals only in documented text (the Compact, assembly records,
// voting rules, meeting minutes) — no dramatized scenes, no invented
// dialogue, no depiction of historical figures themselves.

export const PUBLIC_CASE = {
  standard: "SS.5.13B-SC",
  teksLabel: "5.13B",
  grade: 5,
  subject: "Social Studies",
  title: "Nobody Really Had a Say?",
  tagline: "Colonial meetings and assemblies were just for show. Colonists did not really have a say in their own government.",
  transmission: {
    claimHeadline: "Colonial meetings and assemblies were just for show. Colonists did not really have a say in their own government.",
    source: "Colonial Government Records",
    loggedAt: "1619–1700s",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-13b-sc-field-report.jpg",
    imageCaption: "Colonial Government Records, 1619–1700s",
    notes: "The Mayflower Compact was signed in 1620. In it, colonists agreed to make and follow their own fair laws together. The House of Burgesses formed in Virginia in 1619. Its records show elected representatives voting on local laws and taxes. Town meeting notes from a New England colony show colonists voting directly on local choices, like fixing roads and using land. Voting records also show a real limit. In most assemblies, only men who owned property could vote. That limited who could take part. But it is not the same as nobody having a say at all.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The Mayflower Compact was a written agreement. In it, colonists agreed to make and follow their own fair laws together.",
      correctVerdict: "True",
      reasonText: "This 1620 document shows colonists making their own rules, not just following orders.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The House of Burgesses let elected representatives from Virginia meet and decide local laws and taxes.",
      correctVerdict: "True",
      reasonText: "This 1619 assembly gave colonists a real, recorded part in making local laws.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Voting was often limited to men who owned property, so colonists did not really have a say.",
      correctVerdict: "Misleading",
      reasonText: "A limited say is not the same as no say. Many colonists who could vote had a real part in decisions.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Colonial town meetings and assemblies were just for show.",
      correctVerdict: "False",
      reasonText: "New England town meetings let free men in the colony vote directly on local choices. That was real self-government, not a show.",
    },
  ],

  evidenceReadings: [
    { id: "mayflower_text", label: "Mayflower Compact text", reading: "The Mayflower Compact (1620) shows colonists agreeing to make and follow their own fair laws.", kind: "document" },
    { id: "burgesses_record", label: "House of Burgesses record", reading: "Records from the House of Burgesses (1619) show elected representatives voting on local laws and taxes.", kind: "document" },
    { id: "voting_rules", label: "Colonial voting rules", reading: "Colonial voting records show that in most assemblies, only men who owned property could vote.", kind: "document" },
    { id: "townmeeting_minutes", label: "Town meeting minutes", reading: "Town meeting notes from a New England colony show colonists voting directly on local choices, like fixing roads and using land.", kind: "document" },
    { id: "unrelated_ledger", label: "Unrelated trading ledger", reading: "A trading ship's record book. It has nothing to do with colonial government.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["mayflower_text"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["burgesses_record"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["voting_rules"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["townmeeting_minutes"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_ledger"] },
  ],

  echo: {
    main: "An old 'just for show' claim surfaced in the government records, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. A claim that colonists had no say deserves a close read of the real records.",
    sort: "Sorted. Notice how the voting-limits record and the town meeting record answer very different signals.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I explain how the Mayflower Compact showed colonists making their own laws?",
    "Did I explain the House of Burgesses's role in local lawmaking?",
    "Did I explain why limited voting isn't the same as having no say at all?",
    "Did I explain why town meetings were real self-government, not just for show?",
  ],
};
