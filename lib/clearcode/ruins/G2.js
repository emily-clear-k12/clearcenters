// ClearCode ruin G2 · long e: ee, ea, ey (UFLI 85). Follows G1 on the same planet.
// Inscriptions use only patterns taught up to G2 (short vowels, consonant
// teams, blends, silent e, soft c and g, endings -es/-ed/-ing, syllables,
// tch/dge, -ild/-old, y, -le, r-controlled vowels, ai/ay, ee/ea/ey) plus
// heart words. No ea as short e (head) or ear (near), no later vowel teams.
// Checked by tools/clearcode-check.cjs.
export default {
  id: "G2",
  name: "Stream Keep",
  find: "ee|ea|ey",
  code: { label: "long e", spellings: ["ee", "ea", "ey"], rule: "ee and ea say long e, as in deep and beam. ey at the end of a word can say long e too, as in key." },
  sort: {
    yes: "Long e vault", yesHint: "deep · beam · key",
    no: "Short e vault", noHint: "bed · step",
    hintYes: (w) => `${w} has a long e code (ee, ea or ey), so the e is long.`,
    hintNo: (w) => `${w} has no ee, ea or ey, so the e is short.`,
  },
  codex: [
    { w: "deep", parts: ["d", "ee", "p"], hi: 1 },
    { w: "reef", parts: ["r", "ee", "f"], hi: 1 },
    { w: "beam", parts: ["b", "ea", "m"], hi: 1 },
    { w: "sea", parts: ["s", "ea"], hi: 1 },
    { w: "key", parts: ["k", "ey"], hi: 1 },
    { w: "valley", parts: ["v", "a", "ll", "ey"], hi: 3 },
  ],
  checks: [
    ["sheet", "shed", "shoot"], ["beam", "bend", "boom"], ["key", "keg", "kit"],
    ["green", "grin", "grant"], ["teach", "tech", "touch"], ["sleep", "slept", "slip"],
    ["reef", "ref", "rift"], ["seal", "sell", "sale"], ["deep", "dip", "depth"],
    ["clean", "clan", "cling"], ["wheel", "whale", "while"], ["speech", "speck", "spunk"],
  ],
  vaultPicks: [
    ["valley", "value", "vale"], ["monkey", "monk", "mantle"], ["chimney", "chimp", "chime"],
    ["between", "batten", "bitten"], ["seaweed", "sideways", "sewed"], ["steam", "stem", "stamp"],
    ["repeat", "repent", "report"], ["sneak", "snack", "snuck"],
  ],
  bank: ["deep", "reef", "beam", "sea", "key", "valley", "sheet", "green", "teach", "sleep", "seal", "clean", "wheel", "speech", "steel", "stream", "steam", "seam", "leak", "need", "free", "teeth", "keep", "reed", "squeal", "east", "beach", "peak", "monkey", "chimney", "between", "seaweed", "beneath", "repeat", "sneak", "three", "speak", "street"],
  contrast: ["bed", "step", "met", "fed", "set", "wet", "sled", "best", "stem", "net", "pet", "red", "shed", "spent", "bent", "check"],
  wall: {
    mode: "syllables",
    words: [
      { w: "between", cuts: [2] },
      { w: "seaweed", cuts: [3] },
      { w: "valley", cuts: [3] },
      { w: "steamship", cuts: [5] },
      { w: "beneath", cuts: [2] },
      { w: "chimney", cuts: [4] },
    ],
  },
  forge: {
    items: [
      { w: "keeper", clue: "a person who keeps or guards something", parts: ["keep", "er"], explain: "keep + er. The ending -er can mean a person who does something." },
      { w: "streams", clue: "more than one stream", parts: ["stream", "s"], explain: "stream + s. The ending -s means more than one." },
      { w: "dreamed", clue: "had a dream, already done", parts: ["dream", "ed"], explain: "dream + ed. The ending -ed means it already happened." },
      { w: "beeping", clue: "making a beep right now", parts: ["beep", "ing"], explain: "beep + ing. The ending -ing means it is happening now." },
      { w: "reaches", clue: "stretches out a hand", parts: ["reach", "es"], explain: "reach + es. Words that end in ch take -es." },
      { w: "leaking", clue: "letting water drip out right now", parts: ["leak", "ing"], explain: "leak + ing. The ending -ing means it is happening now." },
    ],
    extra: [{ t: "es", k: "suf" }, { t: "sea", k: "base" }, { t: "seal", k: "base" }],
  },
  door: [
    { w: "sheet", parts: ["sh", "ee", "t"], extra: ["ea", "e"] },
    { w: "beam", parts: ["b", "ea", "m"], extra: ["ee", "e"] },
    { w: "key", parts: ["k", "ey"], extra: ["ee", "ea"] },
    { w: "green", parts: ["g", "r", "ee", "n"], extra: ["ea", "e"] },
    { w: "teach", parts: ["t", "ea", "ch"], extra: ["ee", "e"] },
    { w: "sleep", parts: ["s", "l", "ee", "p"], extra: ["ea", "e"] },
    { w: "seal", parts: ["s", "ea", "l"], extra: ["ee", "e"] },
  ],
  chains: [
    ["seal", "seat", "beat", "beet", "meet"],
    ["deep", "seep", "seek", "peek", "peel"],
  ],
  heart: ["the", "said", "was", "their", "they", "are", "water", "one", "he", "no", "we", "go", "to", "of"],
  vaultFake: [["fleem", "flem", "flame"], ["vreek", "vrek", "vrak"], ["pleam", "plem", "plam"], ["smeet", "smet", "smat"]],
  inscriptions: [
    {
      title: "Explorer's log, day 5",
      text: "Day 5. With the rain stone safe in the lab, we went back to the gate. A stream ran from the gate to the east, and we kept to it, the way the makers did. Green reeds lined the banks. The stream got deep and wide. At sunset, we came to the sea. On a reef past the waves was a tall steel keep, with a red lamp at the top. We will wait for the tide to go back.",
    },
    {
      title: "Explorer's log, day 6",
      text: "Day 6. At sunrise, the sea was still. Ray and Mel waded across the reef, up to their hips in the sea. Green weeds made the reef slick. The keep had no gate, just a steel wheel. Ray and Mel had to heave on the wheel, but it did not budge. Then Ray said, \"Wait. The wheel has rain marks on it, like the gate. We need to turn it the way the marks go.\" They did, and the wheel spun with a screech.",
    },
    {
      title: "Explorer's log, day 7",
      text: "Day 7. Inside the keep, steps led deep under the sea. Sam beamed its lamps on the steel walls. The seams did not leak, not one drop. At the base of the steps was a tank, as deep as a well. The sea water in it was clean and green. At the bottom, on a chain, was a steel key. Mel said, \"The makers kept sea water here, in a sealed tank. But why?\"",
    },
    {
      title: "Explorer's log, day 8",
      text: "Day 8. Ray dived in and swam to the bottom of the tank. He came up with the steel key, and the chain fell free. Back at the base, we cleaned the key. Its teeth had tiny seas cut on them. Kit said, \"One of these seas is on this planet. The rest are on distant worlds.\" The makers did not just keep track of water here. They tracked seas from planet to planet. Ray said, \"A key needs a lock.\" No one has seen that lock yet.",
    },
  ],
  relic: { name: "The Sea Key", caption: "A steel key with tiny seas on its teeth. Only one of those seas is on this planet." },
  story: "Following the stream from the rain stone's gate down to the sea, the crew opens a steel keep on a reef and finds a key whose teeth map seas on other worlds, more proof that the builders tracked water from planet to planet.",
  spanish: "Long e is the sound of Spanish i (as in 'sí'), so students know the sound but not the spellings ee, ea and ey. In Spanish, e and a next to each other are said as two sounds (as in 'marea'), so watch for students splitting sea or beam in two.",
  miniLesson: {
    title: "Long e: ee, ea, ey",
    steps: [
      "Write deep, beam, key. Underline ee, ea, ey. Say: all three spell the long e sound.",
      "Say: ee and ea are vowel teams; the two letters make one sound. Read sea as one sound, not s-e-a.",
      "Read pairs, pointing to the vowel: bed, bead; step, steep; met, meet.",
      "Dictate 3 words (green, seal, key). Students say the sound, then choose ee, ea or ey. Show the right spelling.",
      "Read one sentence together: \"The steel key was deep in the sea.\"",
    ],
  },
};
