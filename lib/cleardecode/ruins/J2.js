// ClearDecode ruin J2 · long a spelled ei, eigh, ey, ea (UFLI 114).
// Decodable rule for this ruin: every pattern from Planets A-I and J1, plus ei,
// eigh and ey saying long a (vein, weigh, they, obey) and ea saying long a in
// great, break and steak, plus heart words.
// Checked by tools/cleardecode-check.cjs.
// Note: the inscription room makes students tap every word that matches
// `find`. ea says long a in only a few words, so `find` names them (great,
// break, steak) and logs keep the usual long e ea (team, seat). Logs avoid ei
// and ey words that do not say long a (their, key, money, eye, either), and
// J3-J5 spellings (ough, eu, group), soft c and g inside a word, and -tion.
// No codex word uses ea, since the codex chunk must match `find` on its own.
export default {
  id: "J2",
  name: "The Freight Scales",
  find: "eigh|ei|ey|great|(br|st)eak",
  code: { label: "long a: ei, eigh, ey, ea", spellings: ["ei", "eigh", "ey", "ea"], rule: "ei, eigh and ey can say long a, as in vein, eight and they. In a few words, like great, break and steak, ea says long a too." },
  sort: {
    yes: "Long a vault", yesHint: "vein · eight · they · great",
    no: "Long e vault", noHint: "seed · team",
    hintYes: (w) => `${w} says long a, spelled ei, eigh, ey or ea.`,
    hintNo: (w) => `${w} says long e, spelled ee or ea.`,
  },
  codex: [
    { w: "eight", parts: ["eigh", "t"], hi: 0 },
    { w: "weight", parts: ["w", "eigh", "t"], hi: 1 },
    { w: "vein", parts: ["v", "ei", "n"], hi: 1 },
    { w: "they", parts: ["th", "ey"], hi: 1 },
    { w: "obey", parts: ["o", "b", "ey"], hi: 2 },
    { w: "sleigh", parts: ["sl", "eigh"], hi: 1 },
  ],
  checks: [
    ["eight", "night", "eat"], ["vein", "van", "vine"], ["they", "then", "thee"],
    ["obey", "oboe", "open"], ["great", "greet", "grit"], ["break", "beak", "brick"],
    ["sleigh", "sleek", "slight"], ["weight", "white", "wit"], ["rein", "ruin", "rink"],
    ["steak", "stack", "steep"], ["grey", "green", "grew"], ["veil", "vial", "vile"],
  ],
  vaultPicks: [
    ["neighbor", "nearby", "noble"], ["survey", "surfer", "surely"], ["reindeer", "render", "reminder"], ["eighteen", "eaten", "entire"],
    ["prey", "prep", "pry"], ["weighed", "wedged", "wicked"], ["greatest", "greetings", "grittiest"], ["breaking", "breathing", "brushing"],
  ],
  // For the sort: long a words are the bank; long e ee/ea words are the contrast.
  bank: ["eight", "eighteen", "eighty", "eighth", "weigh", "weighed", "weight", "freight", "neighbor", "sleigh", "vein", "veil", "rein", "reindeer", "they", "obey", "grey", "prey", "survey", "convey", "whey", "great", "greatest", "break", "breaking", "steak"],
  contrast: ["team", "heat", "beam", "seat", "leak", "peak", "speak", "treat", "wheat", "steel", "feed", "seed", "sleep", "cream", "steam", "meal"],
  wall: {
    mode: "syllables",
    words: [
      { w: "eighteen", cuts: [4] },
      { w: "reindeer", cuts: [4] },
      { w: "survey", cuts: [3] },
      { w: "greatest", cuts: [5] },
      { w: "neighbor", cuts: [5] },
      { w: "obey", cuts: [1] },
    ],
  },
  forge: {
    items: [
      { w: "weighed", clue: "found out how heavy it was", parts: ["weigh", "ed"], explain: "weigh + ed. -ed means it already happened. eigh stays together as one chunk." },
      { w: "reweigh", clue: "to weigh again", parts: ["re", "weigh"], explain: "re + weigh. re- means again." },
      { w: "weightless", clue: "with no weight, floating", parts: ["weight", "less"], explain: "weight + less. -less means without." },
      { w: "obeyed", clue: "did what was asked", parts: ["obey", "ed"], explain: "obey + ed. The y comes after a vowel, so it stays a y." },
      { w: "disobey", clue: "to not do what you are told", parts: ["dis", "obey"], explain: "dis + obey. dis- means the opposite." },
      { w: "greatest", clue: "the most great of all", parts: ["great", "est"], explain: "great + est. -est means the most." },
      { w: "breaking", clue: "coming apart right now", parts: ["break", "ing"], explain: "break + ing. -ing means it is happening now." },
    ],
    extra: [{ t: "un", k: "pre" }, { t: "ful", k: "suf" }, { t: "eight", k: "base" }],
  },
  door: [
    { w: "eight", parts: ["eigh", "t"], extra: ["ai", "a"] },
    { w: "vein", parts: ["v", "ei", "n"], extra: ["ai", "ay"] },
    { w: "they", parts: ["th", "ey"], extra: ["ay", "ai"] },
    { w: "obey", parts: ["o", "b", "ey"], extra: ["ay", "ai"] },
    { w: "great", parts: ["g", "r", "ea", "t"], extra: ["ai", "a"] },
    { w: "break", parts: ["b", "r", "ea", "k"], extra: ["ai", "a"] },
    { w: "sleigh", parts: ["s", "l", "eigh"], extra: ["ay", "ai"] },
  ],
  chains: [
    ["eight", "sight", "light", "might"],
    ["they", "then", "than", "that"],
  ],
  heart: ["the", "a", "of", "to", "into", "said", "was", "were", "one", "you", "what", "who", "do", "water", "there"],
  vaultFake: [["vreight", "vrite", "vreet"], ["pleid", "plide", "pleed"], ["greigh", "gree", "grie"]],
  inscriptions: [
    {
      title: "Log 1: Eight docks",
      text: "Three weeks past the repair deck, the Star Lens led us to a huge ring of metal, drifting in the dark. Gus counted eight docks on it, and each one had a scale built into the deck. \"It is a weigh stop,\" said Ray. \"They weighed freight here before it went on.\" We docked at the eighth bay. Even after all this time, the scales were in great shape. The builders made things that did not break.",
    },
    {
      title: "Log 2: The freight list",
      text: "Inside the hold, crates sat in neat stacks, each one stamped with the ram mark we first saw on Mudfall. Mel found the freight list on the wall and read the weights out loud. \"Eight crates of seeds. Eighteen tanks of water. They were heavy, and they were going to a cold place.\" Kit frowned at the list. \"Seeds and water,\" she said. \"That is what you take when you plan to stay.\"",
    },
    {
      title: "Log 3: One crate is off",
      text: "Tam checked the freight list on the scale panel. All the crates matched the list but one. The last crate weighed eight units less than the list said. \"Who took freight out of it?\" said Ray. We pried the lid off. Under the seeds was a thin black case with a vein of blue light along its side. Mel held it up. \"Nobody took freight out,\" she said. \"They made room for this. They wanted it found.\"",
    },
    {
      title: "Log 4: The Freight Seal",
      text: "Inside the case was a grey seal of metal, as big as a hand and very heavy. On its face was the ram mark, and under it were eight short lines in the builders' code. Ray read them out: \"Weigh what you take. Take what you need. Obey the long dark, and do not stop.\" Gus set the seal on the scale. As it was weighed, the panel lit up with a path that ran on into the dark, and the Star Lens lit up with it. It was the same path.",
    },
  ],
  relic: { name: "The Freight Seal", caption: "A heavy grey seal stamped with the ram mark. Its eight lines say: \"Weigh what you take. Take what you need. Obey the long dark, and do not stop.\"" },
  story: "At a builders' freight weigh stop, one crate weighs less than its list says, and inside it the crew finds a seal with the ram mark and a path that matches the Star Lens.",
  spanish: "Good news: in Spanish, ei and ey already say /ay/ (seis, rey, ley, reina), so vein, rein and they will feel familiar. Spanish has no silent gh, so teach eigh as one chunk that says long a.",
  miniLesson: {
    title: "Long a: ei, eigh, ey, ea",
    steps: [
      "Write eight, vein and they. Underline eigh, ei and ey. Say: all three can say long a.",
      "Write weigh and way. Read both. Say: same sound, but different spellings and meanings. To weigh is to find how heavy something is.",
      "Write great and break next to team and seat. Say: ea most often says long e, but in great, break and steak it says long a. Learn those few words by heart.",
      "Build weigh, weighed, weight on the board. Point out that eigh stays together as one chunk in every word.",
      "Read one line together: \"Weigh what you take. Take what you need. Obey the long dark, and do not stop.\"",
    ],
  },
};
