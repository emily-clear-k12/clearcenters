// ClearCode ruin D1 · endings -es, -ed, -ing (UFLI 63-65).
// Decodable rule for this ruin: everything from Planets A-C (short vowels,
// plural -s, consonant teams, blends, silent e, soft c and g) plus the endings
// -es, -ed and -ing on base words that need no spelling change (no doubling,
// no drop e), plus heart words. No two-syllable base words yet (D2), no
// r-controlled vowels, no vowel teams. Checked by tools/clearcode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid words like red, ring, gates that end in es/ed/ing
// without having the ending.
export default {
  id: "D1",
  name: "Landing Docks",
  find: "(es|ed|ing)$",
  code: { label: "endings -es, -ed, -ing", spellings: ["-es", "-ed", "-ing"], rule: "add -es after s, x, sh or ch to mean more than one. -ed means it already happened. -ing means it is happening now." },
  sort: {
    yes: "Ending vault", yesHint: "dishes · jumped · melting",
    no: "Base word vault", noHint: "dish · jump · melt",
    hintYes: (w) => `${w} has an ending (-es, -ed or -ing) added to its base word.`,
    hintNo: (w) => `${w} is a base word with no ending.`,
  },
  codex: [
    { w: "dishes", parts: ["dish", "es"], hi: 1 },
    { w: "fixes", parts: ["fix", "es"], hi: 1 },
    { w: "jumped", parts: ["jump", "ed"], hi: 1 },
    { w: "tested", parts: ["test", "ed"], hi: 1 },
    { w: "melting", parts: ["melt", "ing"], hi: 1 },
    { w: "drifting", parts: ["drift", "ing"], hi: 1 },
  ],
  checks: [
    ["jumped", "jumps", "jump"], ["fixes", "fixed", "fix"], ["dishes", "dished", "dish"],
    ["tested", "tests", "test"], ["melting", "melted", "melts"], ["rushing", "rushed", "rush"],
    ["passes", "passed", "pass"], ["drifted", "drifting", "drifts"], ["packed", "pecked", "picked"],
    ["buzzing", "buzzed", "buzzes"], ["flashes", "flushes", "flash"], ["lifting", "lifted", "lifts"],
  ],
  vaultPicks: [
    ["crashing", "crashed", "crash"], ["inches", "itches", "inch"], ["spilled", "spills", "spell"], ["camping", "camped", "camps"],
    ["brushes", "brushed", "brush"], ["helped", "helps", "help"], ["sinking", "sinks", "sink"], ["checked", "checks", "chick"],
  ],
  bank: ["jumped", "landed", "packed", "docked", "tested", "rushed", "lifted", "fixed", "melted", "filled", "spilled", "drifted", "dusted", "locked", "checked", "buzzed", "stacked", "pressed", "flashed", "boxes", "dishes", "foxes", "fixes", "inches", "passes", "wishes", "flashes", "crashes", "brushes", "benches", "landing", "melting", "drifting", "sinking", "camping", "blasting", "rushing", "jumping", "packing", "testing"],
  contrast: ["jump", "land", "pack", "dock", "test", "rush", "lift", "fix", "melt", "box", "dish", "inch", "pass", "flash", "sink", "camp"],
  wall: {
    mode: "syllables",
    words: [
      { w: "dishes", cuts: [4] },
      { w: "melting", cuts: [4] },
      { w: "tested", cuts: [4] },
      { w: "fixes", cuts: [3] },
      { w: "jumping", cuts: [4] },
      { w: "drifted", cuts: [5] },
    ],
  },
  forge: {
    items: [
      { w: "docked", clue: "tied up at a dock, in the past", parts: ["dock", "ed"], explain: "dock + ed. The ending -ed means it already happened." },
      { w: "boxes", clue: "more than one box", parts: ["box", "es"], explain: "box + es. After x, add -es to mean more than one." },
      { w: "landing", clue: "coming down to the ground right now", parts: ["land", "ing"], explain: "land + ing. The ending -ing means it is happening now." },
      { w: "flashes", clue: "more than one flash of light", parts: ["flash", "es"], explain: "flash + es. After sh, add -es to mean more than one." },
      { w: "tested", clue: "checked to see if it works, in the past", parts: ["test", "ed"], explain: "test + ed. After t, -ed is its own chunk: test-ed." },
      { w: "jets", clue: "more than one jet", parts: ["jet", "s"], explain: "jet + s. The ending -s means more than one." },
    ],
    extra: [{ t: "rush", k: "base" }, { t: "dish", k: "base" }, { t: "melt", k: "base" }],
  },
  door: [
    { w: "dishes", parts: ["d", "i", "sh", "es"], extra: ["s", "is"] },
    { w: "jumped", parts: ["j", "u", "m", "p", "ed"], extra: ["t", "d"] },
    { w: "melting", parts: ["m", "e", "l", "t", "ing"], extra: ["in", "eng"] },
    { w: "fixes", parts: ["f", "i", "x", "es"], extra: ["s", "is"] },
    { w: "rushing", parts: ["r", "u", "sh", "ing"], extra: ["in", "eng"] },
    { w: "spilled", parts: ["s", "p", "i", "ll", "ed"], extra: ["d", "l"] },
    { w: "tested", parts: ["t", "e", "s", "t", "ed"], extra: ["id", "d"] },
  ],
  chains: [
    ["packed", "pecked", "picked", "ticked", "tucked"],
    ["rushes", "rushed", "gushed", "gashed", "dashed"],
  ],
  heart: ["the", "a", "of", "to", "was", "were", "are", "they", "said", "she", "we", "no", "go", "one", "by", "from", "what", "come", "once", "water"],
  vaultFake: [["blishes", "blished", "blish"], ["frelted", "frelts", "frelt"], ["glomping", "glomped", "glomps"], ["vushes", "vushed", "vush"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The ship landed on a flat strip of sand. Tam checked the hull. Kit and Gus jumped off the ramp. Past the sand was a long line of docks. Big ships had docked at them once. Mel checked the docks. \"No ships are left,\" she said. \"Just boxes.\" The boxes were stacked on the decks. Sam, the ship bot, rushed up and tested the lids. The lids were locked.",
    },
    {
      title: "Crew log 2",
      text: "Kit fixed a pick and cracked the locks. In the boxes were dishes, bells, and jugs of water. Gus lifted a big jug. It was still filled. Mel held up a slab with code cut in it. \"It is the same code as on the gate,\" said Tam. \"It lists the ships and when they docked.\" At the end of the slab was a black dot. Tam pressed the dot. The slab flashed.",
    },
    {
      title: "Crew log 3",
      text: "The slab lit up. On it, ships were lifting off the docks, one by one. Six ships went up, then ten, then nine. Dust was blasting past them. The last ship had the gate code on its side. Then no ships landed. The docks went still. \"They packed up and left,\" said Mel. \"What made them go?\" Gus checked the end of the slab. It had a dim sun, and ice on the docks.",
    },
    {
      title: "Crew log 4",
      text: "Sam went past the stacked boxes to a small stone hut at the end of the docks. In the hut, a brass bell hung from a pole. Kit rang it. Dust drifted off the bell. Mel brushed the rim. The code on the rim tells us, \"We rang this bell when ships landed.\" Tam lifted the bell and packed it in a box. Gus asked, \"Will they come back?\"",
    },
  ],
  relic: { name: "The Dock Bell", caption: "A brass bell the builders rang each time a ship landed. It has not rung since their last ship left." },
  story: "At the builders' landing docks, the crew finds stacked boxes, a slab that shows the last ships leaving as their sun grew dim, and the bell the builders rang for every landing.",
  spanish: "Spanish shows past and ongoing actions with endings too (-ó, -aba; -ando, -iendo), so the idea carries over. The hard part is -ed: it can say /t/ (jumped), /d/ (filled) or /ed/ (tested), and Spanish speakers may drop the end sound or add a full extra syllable to every -ed word.",
  miniLesson: {
    title: "Endings: -es, -ed, -ing",
    steps: [
      "Write jump, then jumped and jumping under it. Box the base word each time. Say: the base word does not change; we just add an ending.",
      "Write dish and dishes, box and boxes. Say: after s, x, sh or ch we add -es, and it makes a new chunk you can hear.",
      "Say jumped, filled, tested. Students hold up 1, 2 or 3 fingers for /t/, /d/ or /ed/.",
      "Dictate three words (rushes, melted, testing). Students write the base word first, then add the ending.",
      "Read together: \"The ship landed, and the crew is testing the boxes.\"",
    ],
  },
};
