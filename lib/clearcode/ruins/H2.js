// ClearCode ruin H2 · ew, ui, ue as in crew, suit, blue (UFLI 91-92).
// Inscriptions use only patterns taught up to H2 (all of Planets A-G, oo and
// u as in put, ew/ui/ue) plus heart words. No au/aw (H3), oi/oy (H4),
// ou/ow as in cow (H5), kn/wr/mb (H6) in the logs. The logs say "makers,"
// not "builders," and avoid words like quick and quest, because the ui/ue in
// those words is not this code. Checked by tools/clearcode-check.cjs.
export default {
  id: "H2",
  name: "The Blue Hangar",
  find: "ew|ui|ue",
  code: { label: "long oo", spellings: ["ew", "ui", "ue"], rule: "ew, ui and ue all say /oo/, as in crew, suit and blue. ew and ue sit at the end of a word, ui in the middle. In a few words, like few, they say /yoo/" },
  sort: {
    yes: "ew ui ue vault", yesHint: "crew · suit · blue",
    no: "Short u vault", noHint: "cut · club",
    hintYes: (w) => `${w} has ew, ui or ue, so it says /oo/.`,
    hintNo: (w) => `${w} has no ew, ui or ue, so the u is short.`,
  },
  codex: [
    { w: "flew", parts: ["fl", "ew"], hi: 1 },
    { w: "new", parts: ["n", "ew"], hi: 1 },
    { w: "fruit", parts: ["fr", "ui", "t"], hi: 1 },
    { w: "juice", parts: ["j", "ui", "ce"], hi: 1 },
    { w: "clue", parts: ["cl", "ue"], hi: 1 },
    { w: "blue", parts: ["bl", "ue"], hi: 1 },
  ],
  checks: [
    ["flew", "flow", "fly"], ["grew", "grow", "gray"], ["blue", "blow", "blur"],
    ["clue", "club", "clip"], ["true", "tree", "try"], ["fruit", "fret", "frill"],
    ["juice", "jest", "just"], ["chew", "chin", "chop"], ["new", "net", "nap"],
    ["glue", "glow", "glum"], ["drew", "drip", "dry"], ["threw", "throw", "three"],
  ],
  vaultPicks: [
    ["rescue", "risky", "rested"], ["statue", "static", "state"], ["cruise", "crush", "crisp"], ["screw", "scrap", "scrub"],
    ["bruise", "brush", "brisk"], ["value", "valley", "valve"], ["cashew", "cashed", "cashing"], ["avenue", "average", "advent"],
  ],
  bank: ["crew", "flew", "grew", "drew", "blew", "chew", "stew", "screw", "threw", "new", "few", "cashew", "curfew", "nephew", "suit", "fruit", "juice", "cruise", "bruise", "recruit", "pursuit", "clue", "blue", "true", "glue", "due", "cue", "rescue", "statue", "value", "argue", "avenue"],
  contrast: ["cut", "cub", "club", "plum", "stub", "crust", "shut", "chunk", "grub", "trust", "stuck", "gust", "drum", "slug", "blush", "crush"],
  wall: {
    mode: "syllables",
    words: [
      { w: "rescue", cuts: [3] },
      { w: "statue", cuts: [4] },
      { w: "curfew", cuts: [3] },
      { w: "pursuit", cuts: [3] },
      { w: "avenue", cuts: [2, 3] },
      { w: "recruit", cuts: [2] },
    ],
  },
  forge: {
    items: [
      { w: "chewing", clue: "biting food right now", parts: ["chew", "ing"], explain: "chew + ing. The ending -ing means it is happening now." },
      { w: "suits", clue: "more than one suit", parts: ["suit", "s"], explain: "suit + s. The ending -s means more than one." },
      { w: "clues", clue: "more than one clue", parts: ["clue", "s"], explain: "clue + s. The ending -s means more than one." },
      { w: "screwed", clue: "turned a screw in the past", parts: ["screw", "ed"], explain: "screw + ed. The ending -ed means it already happened." },
      { w: "juices", clue: "more than one juice", parts: ["juice", "s"], explain: "juice + s. The word ends in e, so it takes -s, not -es." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "crew", k: "base" }, { t: "fruit", k: "base" }],
  },
  door: [
    { w: "flew", parts: ["f", "l", "ew"], extra: ["ue", "ui"] },
    { w: "blue", parts: ["b", "l", "ue"], extra: ["ew", "oo"] },
    { w: "fruit", parts: ["f", "r", "ui", "t"], extra: ["ew", "oo"] },
    { w: "clue", parts: ["c", "l", "ue"], extra: ["ew", "oo"] },
    { w: "new", parts: ["n", "ew"], extra: ["ue", "oo"] },
    { w: "stew", parts: ["s", "t", "ew"], extra: ["ue", "oo"] },
    { w: "juice", parts: ["j", "ui", "c", "e"], extra: ["oo", "ew"] },
  ],
  chains: [
    ["flew", "blew", "brew", "crew", "grew"],
    ["clue", "glue", "blue", "blur"],
  ],
  heart: ["the", "a", "to", "of", "was", "said", "were", "one", "no", "she", "would", "here", "gone", "put", "too", "from"],
  vaultFake: [["plew", "plow", "ply"], ["gruit", "grit", "grot"], ["smue", "smoe", "smay"], ["drewk", "drok", "drak"]],
  inscriptions: [
    {
      title: "Explorer's log: the blue planet",
      text: "We flew the ship to the star in the loop. Next to it was a blue planet that no one on the crew had ever seen. As we got close, the scan picked up a signal. It was the same one we had from the night lens. Gus landed the ship next to a huge hangar. It was as blue as the sky, and its gate was open. The crew put on suits and helmets.",
    },
    {
      title: "Explorer's log: the hangar",
      text: "Inside the hangar were rows of empty racks. The makers had kept ships here, and the ships were gone. But on one long rack hung ten flight suits that still looked new. Each suit had a blue patch on the arm. Mel held one suit up to her chest. \"It would fit me,\" she said. It was true. The makers were not so different from us.",
    },
    {
      title: "Explorer's log: the patches",
      text: "Kit and Tam made a list of the blue patches. Each patch had a ship, a loop, and ten small marks. \"Ten marks, ten suits,\" said Kit. \"One crew to a ship.\" But one suit had a patch that was not like the rest. Its loop had a line from it to a new star. Ray said, \"That is a clue. The makers went on from here.\"",
    },
    {
      title: "Explorer's log: the crew patch",
      text: "We had to choose: stay on the blue planet, or follow the clue. We all said the same thing. Follow the clue. Mel cut the odd patch off the suit and put it in a case. It is the crew patch, and it is the next part of the map. If it is true, the makers flew on to the new star. Soon, we will too.",
    },
  ],
  relic: { name: "The Crew Patch", caption: "A blue patch from a builder flight suit. Its loop points the way to a new star." },
  story: "At the star in the loop, the crew finds a builder hangar with flight suits that would fit them, and one suit's patch points on to a new star.",
  spanish: "ew, ui and ue all say /oo/, like Spanish u. Watch ui and ue: in Spanish they say /wi/ and /we/ (as in 'fui' and 'bueno'), so students may read suit as 'sweet' or blue as 'bweh.' Tell them: in English these teams say one sound, /oo/.",
  miniLesson: {
    title: "ew, ui, ue say /oo/",
    steps: [
      "Write crew, suit and blue. Underline ew, ui and ue. Say: all three spell /oo/, like in moon.",
      "Ask: where is ew? (end). Where is ue? (end). Where is ui? (middle).",
      "Sort 6 cards together: flew, fruit, clue, new, juice, true.",
      "Dictate 3 words (grew, glue, suit). Students say the sound, then pick ew, ue or ui.",
      "Read one sentence together: \"The crew flew to a new blue planet.\"",
    ],
  },
};
