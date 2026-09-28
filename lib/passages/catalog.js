// Passages library.
// One text, one id. Activities point at the id. Do not copy the text into a second file.
// status: "draft" until the five checks are yes, then "checked", then "live".
// A passage a teacher pastes is not a row here. It stays theirs.
//
// These two cards are the text that already exists for science 3.6A.
// They are not the same passage. Do not merge them.

export const PASSAGE_STATUSES = ["draft", "checked", "live"];

export const PASSAGES = [
  {
    id: "sci-3-6a-raft-load",
    title: "The Raft Load",
    grade: 3,
    subject: "Science",
    standard: "3.6A",
    status: "draft",
    kind: "scene",
    summary: "A heavy log floats and a light pebble sinks. The tempting idea is that small things float.",
    text: [
      "The raft goes on the pond today. Everything has been weighed. Nothing has been put in the water yet.",
      "Rafa needs to know what floats before the raft is loaded.",
      "The pebble says small things float.",
      "The log is 2,100 grams, the biggest thing there, and it floats.",
      "The cork is 3 grams and it floats too.",
      "The pond will test anything it is handed, and it gives the same answer every time.",
    ].join("\n"),
    lines: [
      "The log is 2,100 g and it floats",
      "The pebble is 40 g and it sinks",
      "The cork is only 3 g and it floats",
      "The log is much heavier than the pebble",
      "Every thing got weighed and then put in the water",
    ],
    usedBy: [
      { engine: "group_chat", standard: "3.6A", title: "The Raft Load", file: "lib/cases/3-6A.public.js" },
    ],
    checks: {
      teksMatchesPdf: null,
      factsTrue: null,
      wrongAnswerBelievable: null,
      setupDoesNotGiveItAway: null,
      sameTextEverywhere: null,
    },
  },
  {
    id: "sci-3-6a-sorting-bin",
    title: "The Sorting Bin Report",
    grade: 3,
    subject: "Science",
    standard: "3.6A",
    status: "draft",
    kind: "notes",
    summary: "Cadet Rios sorts a spilled crate with a magnet. The notes are what the test showed and what it did not test.",
    text: [
      "The supply bay is a mess. A crate of parts spilled. Cadet Rios sorted the pile with one test: she held a magnet over every piece.",
      "Chief Okafor wants a log: what the test showed, what it missed, and what to do with the pile.",
      "Pulled by the magnet: two steel bolts, one iron washer.",
      "Not pulled: a copper wire, a can, a clip, a rubber band.",
      "Every piece stayed the same temperature. Nothing changed shape.",
      "Rios did not test floating, bending, or heat.",
    ].join("\n"),
    lines: [
      "Pulled by the magnet: two steel bolts, one iron washer.",
      "Not pulled: a copper wire, a can, a clip, a rubber band.",
      "Every piece stayed the same temperature. Nothing changed shape.",
      "Rios did not test floating, bending, or heat.",
    ],
    usedBy: [
      { engine: "assembly_deck", standard: "3.6A-AD", title: "The Sorting Bin Report", file: "lib/cases/assembly-deck/3-6A-AD.public.js" },
    ],
    checks: {
      teksMatchesPdf: null,
      factsTrue: null,
      wrongAnswerBelievable: null,
      setupDoesNotGiveItAway: null,
      sameTextEverywhere: null,
    },
  },
];

export function getPassage(id) {
  return PASSAGES.find((passage) => passage.id === id) || null;
}

export function passagesForStandard(standard) {
  const code = String(standard || "").replace(/-(?:SC|GC|FR|SL|SD|AD|RS|MM|CL|EX|XP|MS|BB).*$/i, "");
  return PASSAGES.filter((passage) => passage.standard === code);
}
