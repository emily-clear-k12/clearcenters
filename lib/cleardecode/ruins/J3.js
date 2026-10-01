// ClearDecode ruin J3 · /oo/ spelled ew, eu, ue, ou; ough (UFLI 115-116).
// Decodable rule for this ruin: every pattern from Planets A-I, J1 and J2, plus
// ew, eu, ue and ou saying /oo/ (crew, neutral, rescue, group), plus ough with
// its sounds (through, thought, rough, dough), plus heart words.
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`. ou says /oo/ in only some words, so `find` names the ou chunks that
// do (group, soup, route, you, youth) and logs keep ou as in out and found.
// Logs avoid ue that is not this code (quest, guess, queen), and J4-J5
// spellings, soft c and g inside a word, and -tion.
export default {
  id: "J3",
  name: "The Rescue Beacon",
  find: "ough|ew|eu|ue|oup|oute|^you(th|ths)?$",
  code: { label: "/oo/: ew, eu, ue, ou; ough", spellings: ["ew", "eu", "ue", "ou", "ough"], rule: "ew, eu, ue and ou can say /oo/, as in crew, neutral, rescue and group. ough has more than one sound: /oo/ in through, /aw/ in thought, /uf/ in rough and tough, and long o in dough." },
  sort: {
    yes: "/oo/ vault", yesHint: "crew · group · through",
    no: "Other ough vault", noHint: "thought · rough · dough",
    hintYes: (w) => `${w} has the /oo/ sound, as in crew, group and through.`,
    hintNo: (w) => `${w} has ough, but here it does not say /oo/.`,
  },
  codex: [
    { w: "crew", parts: ["cr", "ew"], hi: 1 },
    { w: "neutral", parts: ["n", "eu", "tral"], hi: 1 },
    { w: "clue", parts: ["cl", "ue"], hi: 1 },
    { w: "soup", parts: ["s", "oup"], hi: 1 },
    { w: "through", parts: ["thr", "ough"], hi: 1 },
    { w: "thought", parts: ["th", "ough", "t"], hi: 1 },
  ],
  checks: [
    ["crew", "crow", "cry"], ["group", "grout", "grip"], ["soup", "soap", "sop"],
    ["neutral", "natural", "nectar"], ["through", "throw", "thrush"], ["thought", "throat", "that"],
    ["rough", "roof", "rug"], ["tough", "touch", "tug"], ["dough", "dug", "dog"],
    ["clue", "club", "claw"], ["true", "tree", "try"], ["bought", "boat", "bat"],
  ],
  vaultPicks: [
    ["route", "rate", "rut"], ["feud", "fed", "fad"], ["fought", "fight", "foot"], ["enough", "engulf", "enrich"],
    ["threw", "throw", "thaw"], ["coupon", "cousin", "cotton"], ["argue", "agree", "arch"], ["brought", "bright", "broth"],
  ],
  // For the sort: /oo/ words are the bank; ough words with other sounds are the contrast.
  bank: ["crew", "new", "news", "flew", "drew", "grew", "threw", "knew", "chew", "screw", "few", "neutral", "feud", "sleuth", "rescue", "clue", "blue", "true", "glue", "argue", "value", "group", "soup", "coupon", "route", "youth", "through", "throughout"],
  contrast: ["thought", "bought", "brought", "fought", "sought", "ought", "rough", "tough", "enough", "dough", "though", "cough", "trough", "bough", "drought"],
  // Games: any ew/eu/ue/ou-as-/oo/ or ough word counts; decoys have ou or ow that is not this code.
  game: {
    targets: ["crew", "rescue", "group", "neutral", "through", "clue", "soup", "thought", "rough", "tough", "dough", "new", "route", "brought"],
    decoys: ["cloud", "found", "shout", "grow", "glow", "crow", "blow", "snow", "proud", "sound", "count", "crowd"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "rescue", cuts: [3] },
      { w: "neutral", cuts: [3] },
      { w: "regroup", cuts: [2] },
      { w: "coupon", cuts: [3] },
      { w: "throughout", cuts: [7] },
      { w: "toughest", cuts: [5] },
    ],
  },
  forge: {
    items: [
      { w: "regroup", clue: "to come together again", parts: ["re", "group"], explain: "re + group. re- means again." },
      { w: "rescued", clue: "saved from danger, in the past", parts: ["rescu", "ed"], explain: "rescue + ed: drop the e, because -ed starts with a vowel." },
      { w: "untrue", clue: "not true", parts: ["un", "true"], explain: "un + true. un- means not." },
      { w: "toughest", clue: "the most tough of all", parts: ["tough", "est"], explain: "tough + est. -est means the most." },
      { w: "roughly", clue: "in a rough way, or about", parts: ["rough", "ly"], explain: "rough + ly. -ly tells how something is done." },
      { w: "thoughtful", clue: "full of care for others", parts: ["thought", "ful"], explain: "thought + ful. -ful means full of." },
      { w: "renewed", clue: "made new again", parts: ["re", "new", "ed"], explain: "re + new + ed. re- means again, and -ed means it already happened." },
    ],
    extra: [{ t: "dis", k: "pre" }, { t: "less", k: "suf" }, { t: "crew", k: "base" }],
  },
  door: [
    { w: "crew", parts: ["c", "r", "ew"], extra: ["ue", "oo"] },
    { w: "group", parts: ["g", "r", "ou", "p"], extra: ["oo", "ew"] },
    { w: "clue", parts: ["c", "l", "ue"], extra: ["ew", "oo"] },
    { w: "soup", parts: ["s", "ou", "p"], extra: ["oo", "u"] },
    { w: "through", parts: ["th", "r", "ough"], extra: ["ew", "oo"] },
    { w: "tough", parts: ["t", "ough"], extra: ["uff", "uf"] },
    { w: "neutral", parts: ["n", "eu", "t", "r", "a", "l"], extra: ["oo", "ew"] },
  ],
  chains: [
    ["blue", "glue", "clue", "club"],
    ["soup", "sour", "pour", "tour"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "two", "you", "they", "there", "water", "could"],
  vaultFake: [["froup", "frope", "frip"], ["zeut", "zote", "zat"], ["vlue", "vlay", "vlie"]],
  inscriptions: [
    {
      title: "Log 1: The rough patch",
      text: "Past the weigh stop, the long dark got rough. A storm of rock and dust blew across the gap we had to cross. Kit and Gus took the small pod out to scout a way through. Then the rocks hit. The pod's link went dead, and its dot on our screen blinked out. Ray kept calling. \"Pod, can you hear us?\" There was no reply. We all thought the same thing, but we did not say it.",
    },
    {
      title: "Log 2: The beacon",
      text: "Then Sam, our robot, picked up a faint blip. It was not the pod. It was a beacon, a builders' rescue beacon, still sending one call into the dark: three short pulses and a long one. Tam knew that call from the builders' code. It meant: \"Lost crews, regroup here.\" \"If the pod can pick it up,\" Tam said, \"Kit and Gus will steer to it too.\" We flew to the beacon to wait.",
    },
    {
      title: "Log 3: Regroup",
      text: "The beacon sat on a tough little moon, its light still blue after all this time. We landed next to it and waited. It was a long, rough night. At last, a dot came through the dust, limping, with a dent in its side. It was the pod. Gus had a cut on his hand, and Kit had a new scrape on her suit, but the two of them were fine. \"We followed the beacon,\" Kit said. \"It was the one true thing in all that dust.\" The crew had regrouped.",
    },
    {
      title: "Log 4: The Route Stone",
      text: "Under the beacon was a hatch, and inside it, a smooth stone the size of a fist. When Ray held it up to the Star Lens, a route lit up on its face. It ran on through the dark to a planet of ice, the coldest place yet. Tiny lines ran under the ice, like streams. \"Hot water,\" said Mel. We stood close as a group and looked. \"The builders went that way,\" said Kit, \"and they set this beacon so a lost crew could find it.\" Gus grinned. \"Then let's go.\"",
    },
  ],
  relic: { name: "The Route Stone", caption: "A smooth stone from a builders' rescue beacon. Held up to the Star Lens, it shows a route through the long dark to a planet of ice with hot water under it." },
  story: "When a rock storm cuts off Kit and Gus, a builders' rescue beacon calls the crew to regroup, and under it they find a stone that shows the route to a planet of ice with hot water under it.",
  spanish: "In Spanish, u always says /oo/, so the sound is familiar; the new part is the spellings. Spanish eu says both letters (Europa, neutral), while English neutral says /noo/. ough has no Spanish match, so teach it as one chunk with a few sounds to try.",
  miniLesson: {
    title: "/oo/ spelled ew, eu, ue, ou; ough",
    steps: [
      "Write crew, rescue and group. Underline ew, ue and ou. Say: all three say /oo/.",
      "Write neutral. Underline eu. Say: eu is rare, but it says /oo/ here too.",
      "Write through, thought, tough and dough. Read each one. Say: ough is a tricky chunk with more than one sound. Try /oo/, /aw/, /uf/ and long o, and keep the one that makes a real word.",
      "Sort word cards into two piles: says /oo/ (crew, group, through) and other ough (thought, rough, dough).",
      "Read one line together: \"Lost crews, regroup here.\"",
    ],
  },
};
