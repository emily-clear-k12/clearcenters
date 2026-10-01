// ClearDecode ruin J5 · consonant changes when a suffix is added (TEKS 5.2(A)(i)).
// Decodable rule for this ruin: every pattern from Planets A-I and J1-J4, plus
// base words whose last consonant changes sound when -ion, -ian or -ity is
// added: t to /sh/ (select, selection), c to /sh/ (music, musician), c to /s/
// (electric, electricity), ss to /sh/ (express, expression), plus heart words.
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`. Logs use only changed forms built from a base word the student can
// see (selection, magician, electricity) and avoid other -tion/-sion words
// (station, mission, question) that K1 teaches.
export default {
  id: "J5",
  name: "The Last Outpost",
  find: "tion|sion|cian|icity$",
  code: {
    label: "consonant changes",
    spellings: ["-tion (select, selection)", "-sion (express, expression)", "-cian (music, musician)", "-icity (electric, electricity)"],
    rule: "When a suffix is added, the last consonant of the base word can change its sound, but the spelling of the base word stays the same. The t in select says /t/; in selection, t-i-o-n says /shun/. The c in music says /k/; in musician it says /sh/, and in electricity it says /s/.",
  },
  sort: {
    yes: "Changed sound", yesHint: "selection · musician",
    no: "Base word", noHint: "select · music",
    hintYes: (w) => `${w}: the suffix changed the sound of the base word's last consonant.`,
    hintNo: (w) => `${w} is the base word; its last consonant still says its first sound.`,
  },
  codex: [
    { w: "connection", parts: ["con", "nec", "tion"], hi: 2 },
    { w: "action", parts: ["ac", "tion"], hi: 1 },
    { w: "magician", parts: ["ma", "gi", "cian"], hi: 2 },
    { w: "electrician", parts: ["e", "lec", "tri", "cian"], hi: 3 },
    { w: "electricity", parts: ["electr", "icity"], hi: 1 },
    { w: "expression", parts: ["ex", "pres", "sion"], hi: 2 },
  ],
  checks: [
    ["direction", "director", "directly"], ["protection", "protecting", "protector"], ["magician", "magical", "magic"],
    ["electricity", "electrical", "electric"], ["connection", "connected", "connector"], ["action", "acting", "actor"],
    ["inspection", "inspector", "inspected"], ["expression", "expressed", "expressing"], ["discussion", "discussed", "discussing"],
    ["electrician", "electrical", "electrically"], ["collection", "collector", "collected"], ["publicity", "publicly", "public"],
  ],
  vaultPicks: [
    ["selection", "selected", "selector"], ["musician", "musical", "music"], ["correction", "corrected", "correctly"],
    ["impression", "impressed", "impressing"], ["election", "elected", "electing"], ["elasticity", "elastic", "elastics"],
    ["optician", "optical", "optic"], ["eruption", "erupted", "erupting"],
  ],
  // For the sort: changed forms are the bank; their base words are the contrast.
  bank: ["selection", "connection", "direction", "protection", "inspection", "collection", "correction", "election", "action", "eruption", "reaction", "prediction", "detection", "objection", "attraction", "musician", "magician", "electrician", "optician", "expression", "discussion", "impression", "possession", "electricity", "publicity", "elasticity"],
  contrast: ["select", "connect", "direct", "protect", "inspect", "collect", "correct", "elect", "act", "erupt", "react", "predict", "music", "magic", "electric", "express"],
  wall: {
    mode: "syllables",
    words: [
      { w: "direction", cuts: [2, 5] },
      { w: "magician", cuts: [2, 4] },
      { w: "electricity", cuts: [1, 4, 6, 8] },
      { w: "connection", cuts: [3, 6] },
      { w: "publicity", cuts: [3, 5, 7] },
      { w: "expression", cuts: [2, 6] },
    ],
  },
  forge: {
    items: [
      { w: "selection", clue: "a choice you make", parts: ["select", "ion"], explain: "select + ion. In select, the t says /t/. Add -ion, and t-i-o-n says /shun/. The spelling of select does not change." },
      { w: "selected", clue: "picked before", parts: ["select", "ed"], explain: "select + ed. This ending does not change the t: it still says /t/. Only some suffixes change the sound." },
      { w: "action", clue: "a thing that is done", parts: ["act", "ion"], explain: "act + ion. The t says /t/ in act, then joins -ion to say /shun/: ac-tion." },
      { w: "reconnection", clue: "the act of linking up again", parts: ["re", "connect", "ion"], explain: "re + connect + ion. re- means again. The t in connect changes from /t/ to /sh/ in -tion." },
      { w: "expression", clue: "a look on a face, or a way to say something", parts: ["express", "ion"], explain: "express + ion. The ss says /s/ in express. With -ion, s-s-i-o-n says /shun/." },
      { w: "musician", clue: "a person who plays music", parts: ["music", "ian"], explain: "music + ian. The c says /k/ in music. Before -ian it says /sh/: mu-si-cian. -ian can mean a person who does it." },
      { w: "magician", clue: "a person who does magic tricks", parts: ["magic", "ian"], explain: "magic + ian. The c says /k/ in magic and /sh/ in magician." },
      { w: "electricity", clue: "the power that runs lights and machines", parts: ["electric", "ity"], explain: "electric + ity. The c says /k/ in electric. The i in -ity makes it soft, so it says /s/: e-lec-tri-ci-ty." },
    ],
    extra: [{ t: "un", k: "pre" }, { t: "protect", k: "base" }, { t: "ful", k: "suf" }],
  },
  door: [
    { w: "action", parts: ["a", "c", "tion"], extra: ["sion", "shun"] },
    { w: "magician", parts: ["m", "a", "g", "i", "cian"], extra: ["tion", "sion"] },
    { w: "connection", parts: ["c", "o", "nn", "e", "c", "tion"], extra: ["sion", "cian"] },
    { w: "direction", parts: ["d", "i", "r", "e", "c", "tion"], extra: ["sion", "shun"] },
    { w: "expression", parts: ["e", "x", "p", "r", "e", "s", "sion"], extra: ["tion", "shun"] },
    { w: "electrician", parts: ["e", "l", "e", "c", "t", "r", "i", "cian"], extra: ["tion", "sion"] },
    { w: "publicity", parts: ["p", "u", "b", "l", "i", "c", "ity"], extra: ["sity", "ety"] },
  ],
  chains: [
    ["sonic", "tonic", "topic", "toxic"],
    ["ration", "nation", "notion", "motion"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "you", "their", "are", "only", "would", "one", "two", "your"],
  vaultFake: [["drapection", "drapecting", "drapects"], ["grumician", "grumicking", "grumics"], ["zelicity", "zelicking", "zelics"]],
  inscriptions: [
    {
      title: "Log 1: Power in the dark",
      text: "Three days after the Ghost Ship, the Star Lens led us to a small outpost in the dark. Unlike the ship, it was not silent. Its lights were on, and Mel's scan picked up electricity running through its walls. \"The makers left the power on,\" said Kit. Our first action was a slow inspection from the outside. Then the Echo Disc began to hum, and Ray made the connection. \"The disc knows this place,\" he said. \"It is telling us to dock.\"",
    },
    {
      title: "Log 2: A wall of words",
      text: "Inside, one wall was a panel of buttons, and each button had a word in the makers' code. Tam read them out: select, connect, direct, protect, music, magic. Under them was a sign: \"Make the right selection to set your direction.\" \"It is a test,\" said Gus. \"Each base word needs an ending.\" Ray pressed connect, then an ending, and made connection. A soft tone rang out. Then he made direction and protection, and two more tones rang.",
    },
    {
      title: "Log 3: Music and magic",
      text: "Next came music and magic. Gus pressed music, then an ending, and the panel made the word musician. Kit tried magic and got magician. Each time, the c at the end of the base word took on a new sound. \"The makers are testing us,\" said Mel. \"Only a reader of their code would know how the sounds shift.\" Last, Ray turned electric into electricity. As his selection lit up, the power in the walls rose, and a dial in the center of the panel began to turn.",
    },
    {
      title: "Log 4: First sight of Haven",
      text: "The dial spun, then locked in place. Our selection was right. A star map lit up over the panel, with a line from the outpost to a far planet. \"That is our direction,\" said Ray. The dial came free in his hand, with the makers' sign on its face. We named it the Direction Dial. After one last inspection of the outpost, we set off. Two days later, Sam called us to the window. Ahead, in the dark, was a white planet sealed in ice from end to end. The map gave its name: Haven.",
    },
  ],
  relic: { name: "The Direction Dial", caption: "A dial from the makers' last outpost. Make the right selection, and it points the way to Haven." },
  story: "At the last outpost before Haven, the crew builds the right word forms on a makers' panel, wins a dial that sets their direction, and sees Haven's ice for the first time.",
  spanish: "Strong cognates: selección, conexión, dirección, acción, electricidad, mago and músico. Electric and electricity work like eléctrico and electricidad: c before i says /s/ in both languages. The difference is the ending: Spanish -ción says 'see-OWN,' but English -tion, -sion and -cian all say 'shun.'",
  miniLesson: {
    title: "The last sound changes, the spelling stays",
    steps: [
      "Write select and selection, one above the other. Box select in both. Say: the spelling stays the same, but the t says /t/ in select and joins -ion to say /shun/ in selection.",
      "Write music and musician. Read both. Say: the c says /k/ in music and /sh/ in musician. Then do magic and magician.",
      "Write electric and electricity. Ask: what comes after the c now? An i, so the c turns soft and says /s/.",
      "Contrast: write selected next to selection. Say: -ed does not change the t. Only some suffixes (-ion, -ian, -ity) change the sound.",
      "Read one sentence together: \"Make the right selection to set your direction.\"",
    ],
  },
};
