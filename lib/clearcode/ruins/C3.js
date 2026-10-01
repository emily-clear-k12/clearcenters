// ClearCode ruin C3 · long o, u, e: o_e, u_e, e_e (UFLI 56-59).
// Decodable rule for this ruin: everything from Planets A and B (short vowels,
// plural -s, ff/ll/ss/zz, ck, sh, th, ch, wh, ph, ng, nk, blends) plus a_e,
// i_e, o_e, u_e, e_e, plus heart words. No soft c/g (_ce, _ge) yet, no -ed/-ing
// endings (D1). The find skips "re" (more, here, pure) because r-controlled
// vowels come later. Checked by tools/clearcode-check.cjs.
export default {
  id: "C3",
  name: "The Stone Domes",
  find: "[oue][^aeiour]e",
  code: { label: "long o, u, e: o_e, u_e, e_e", spellings: ["o_e", "u_e", "e_e"], rule: "When a silent e comes after one consonant, the vowel says its name: hop becomes hope, cub becomes cube, them becomes theme." },
  sort: {
    yes: "Long vowel vault", yesHint: "hope · cube · theme",
    no: "Short vowel vault", noHint: "hop · cub · them",
    hintYes: (w) => `${w} has a vowel, one consonant, then a silent e, so the vowel says its name.`,
    hintNo: (w) => `${w} has no silent e, so the vowel is short.`,
  },
  codex: [
    { w: "code", parts: ["c", "ode"], hi: 1 },
    { w: "stone", parts: ["st", "one"], hi: 1 },
    { w: "dome", parts: ["d", "ome"], hi: 1 },
    { w: "tube", parts: ["t", "ube"], hi: 1 },
    { w: "rule", parts: ["r", "ule"], hi: 1 },
    { w: "these", parts: ["th", "ese"], hi: 1 },
  ],
  checks: [
    ["hope", "hop", "hip"], ["note", "not", "net"], ["robe", "rob", "rib"],
    ["cute", "cut", "cat"], ["tube", "tub", "tab"], ["theme", "them", "then"],
    ["slope", "slop", "slip"], ["globe", "glob", "glib"], ["mute", "mud", "mat"],
    ["rode", "rod", "red"], ["dune", "dunk", "din"], ["those", "this", "then"],
  ],
  vaultPicks: [
    ["smoke", "smock", "smack"], ["cone", "con", "can"], ["zone", "zing", "zap"], ["fuse", "fuss", "fizz"],
    ["flute", "flat", "flit"], ["delete", "delta", "dent"], ["stove", "stiff", "stuff"], ["spoke", "speck", "spot"],
  ],
  bank: ["code", "stone", "dome", "tube", "rule", "these", "hope", "note", "robe", "cute", "theme", "slope", "globe", "mute", "rode", "dune", "those", "smoke", "cone", "zone", "fuse", "flute", "delete", "stove", "spoke", "home", "hole", "pole", "rope", "bone", "close", "drove", "froze", "use", "tune", "prune", "complete", "extreme", "probe", "cube"],
  contrast: ["hop", "not", "rob", "cut", "tub", "them", "slop", "glob", "rod", "cod", "mutt", "fuss", "con", "stuff", "then", "pet"],
  // Sounds wall: the silent e stays with the consonant before it (no sound of its own).
  wall: {
    mode: "sounds",
    words: [
      { w: "code", cuts: [1, 2] },
      { w: "stone", cuts: [1, 2, 3] },
      { w: "dome", cuts: [1, 2] },
      { w: "tube", cuts: [1, 2] },
      { w: "these", cuts: [2, 3] },
      { w: "smoke", cuts: [1, 2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "code", parts: ["c", "o", "d", "e"], extra: ["a", "u"] },
    { w: "stone", parts: ["s", "t", "o", "n", "e"], extra: ["a", "u"] },
    { w: "tube", parts: ["t", "u", "b", "e"], extra: ["o", "a"] },
    { w: "these", parts: ["th", "e", "s", "e"], extra: ["i", "z"] },
    { w: "smoke", parts: ["s", "m", "o", "k", "e"], extra: ["ck", "a"] },
    { w: "flute", parts: ["f", "l", "u", "t", "e"], extra: ["o", "a"] },
    { w: "rope", parts: ["r", "o", "p", "e"], extra: ["u", "a"] },
  ],
  chains: [
    ["hope", "rope", "robe", "rode", "code"],
    ["tune", "tone", "bone", "cone", "code"],
  ],
  heart: ["the", "a", "of", "to", "said", "who", "we", "they", "were", "no", "one", "is", "as", "are", "has", "i", "by"],
  vaultFake: [["zote", "zot", "zat"], ["glube", "glub", "glob"], ["threme", "threm", "thrim"], ["plose", "ploss", "pliss"]],
  inscriptions: [
    {
      title: "Crew log 9",
      text: "Past the mine, a slope drops to a cave as big as a lake. In it are stone domes, side by side, as close as eggs in a box. Mel and Kit hike to the dome at the end. Its rim has a hole the size of a fist. \"These were homes,\" said Mel. \"I bet the ones who made the mine slept in these domes.\"",
    },
    {
      title: "Crew log 10",
      text: "The dome has no gate, just a hole. Kit pokes the lamp in the hole. Inside are a stove, a bench, a bed, and a rack of pots. No one is home. Dust is on all of it, as thick as a robe. \"They left in a rush,\" said Kit. \"Not a rush,\" said Mel. \"The stove is shut. The bed is made. They had a plan.\"",
    },
    {
      title: "Crew log 11",
      text: "In the last dome, Mel spots a tube on a stone slab. A code is cut on the tube. Mel uses the rules from the gate and the mine to crack it. The code is a tune! Mel hums the tune, note by note. Click. The end of the tube spins off. Inside is a thin roll of tin.",
    },
    {
      title: "Crew log 12",
      text: "Mel sets the tin flat on the slab. The code on it is not a tune. It is a note, and Mel can crack a bit of it: \"We left these homes. We had a task. Use the code to...\" The rest of the tin has rust on it. Mel slips the tin back in the tube. \"We take the tube to the lab,\" said Kit. \"This is a big step.\"",
    },
  ],
  relic: { name: "The Code Tube", caption: "A tube with a code cut on it. Hum the tune and it opens. Inside is a tin note: \"We left these homes. We had a task.\"" },
  story: "In a cave of empty stone domes, the crew learns the builders left their homes on purpose, and finds a code tube with a note they can only partly read.",
  spanish: "Long o is close to Spanish o, and long e (these) sounds like Spanish i. u_e can say /yoo/ (cube) or /oo/ (rule). As with a_e and i_e, remind students that the final e is silent.",
  miniLesson: {
    title: "Long o, u, e: hope, cube, theme",
    steps: [
      "Write hop, cub, them. Add an e to each: hope, cube, theme. Say: the silent e makes the vowel say its name.",
      "Point out that u_e has two sounds: /yoo/ in cube and /oo/ in rule. Read tube, flute, cute, rule.",
      "Say a word (note, not, tub, tube). Students give a thumbs up for a long vowel.",
      "Build hope with letter cards, then change one letter at a time: hope, rope, robe, rode, code.",
      "Read together: \"Mel hums the code, note by note.\"",
    ],
  },
};
