// ClearCode ruin A1 · short a, short i (UFLI 35-36). First ruin on the ladder.
// Decodable rule for this ruin: single consonants and short a, i only, plus
// heart words. No o, u, e (except inside heart words), no plural -s, no blends,
// no digraphs. Logs avoid "said", "was" and the article "a" so the words a
// student taps for "a or i" really say /a/ or /i/. Checked by
// tools/clearcode-check.cjs.
export default {
  id: "A1",
  name: "Ram Pit",
  find: "a|i",
  code: { label: "short a, short i", spellings: ["a", "i"], rule: "a or i closed in by consonants says /a/ as in cap or /i/ as in pin" },
  sort: {
    yes: "Short a or i vault", yesHint: "cap · pin",
    no: "Other vowels vault", noHint: "cop · pen",
    hintYes: (w) => `${w} has a or i closed in by consonants, so it is a short a or short i word.`,
    hintNo: (w) => `${w} has no a and no i. Read the vowel again.`,
  },
  codex: [
    { w: "gap", parts: ["g", "a", "p"], hi: 1 },
    { w: "cab", parts: ["c", "a", "b"], hi: 1 },
    { w: "ram", parts: ["r", "a", "m"], hi: 1 },
    { w: "rig", parts: ["r", "i", "g"], hi: 1 },
    { w: "pin", parts: ["p", "i", "n"], hi: 1 },
    { w: "kit", parts: ["k", "i", "t"], hi: 1 },
  ],
  checks: [
    ["cap", "cup", "cop"], ["rig", "rag", "rug"], ["sat", "sit", "set"],
    ["pin", "pan", "pen"], ["hat", "hit", "hot"], ["tip", "tap", "top"],
    ["bad", "bid", "bed"], ["dig", "dog", "dug"], ["fan", "fin", "fun"],
    ["lid", "lad", "led"], ["ham", "him", "hum"], ["bag", "big", "bug"],
  ],
  vaultPicks: [
    ["bit", "bat", "but"], ["jab", "jib", "job"], ["pit", "pat", "pot"], ["rib", "rob", "rub"],
    ["lap", "lip", "lop"], ["mad", "mid", "mud"], ["tin", "tan", "ten"], ["pig", "peg", "pug"],
  ],
  bank: ["gap", "cab", "cap", "gas", "ram", "rag", "ham", "jab", "lap", "mad", "nap", "pan", "tan", "tag", "van", "vat", "wax", "yak", "zap", "rig", "pit", "pin", "kit", "rim", "dig", "dim", "fin", "hit", "hid", "lid", "rib", "sip", "tin", "tip", "wig", "zip", "bin", "six"],
  contrast: ["hot", "mud", "jet", "cop", "hut", "net", "bed", "pot", "rug", "mop", "bun", "hen", "log", "sun", "pen", "cut"],
  game: { decoys: ["hot", "mud", "jet", "cop", "hut", "net", "bed", "pot", "rug", "mop", "bun", "hen", "log", "sun", "pen", "cut"] },
  wall: {
    mode: "sounds",
    words: [
      { w: "gap", cuts: [1, 2] },
      { w: "rig", cuts: [1, 2] },
      { w: "pit", cuts: [1, 2] },
      { w: "cab", cuts: [1, 2] },
      { w: "tin", cuts: [1, 2] },
      { w: "dim", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "gap", parts: ["g", "a", "p"], extra: ["i", "e"] },
    { w: "rig", parts: ["r", "i", "g"], extra: ["a", "u"] },
    { w: "cab", parts: ["c", "a", "b"], extra: ["i", "o"] },
    { w: "pin", parts: ["p", "i", "n"], extra: ["a", "e"] },
    { w: "ram", parts: ["r", "a", "m"], extra: ["i", "u"] },
    { w: "dig", parts: ["d", "i", "g"], extra: ["a", "o"] },
    { w: "tan", parts: ["t", "a", "n"], extra: ["i", "e"] },
  ],
  chains: [
    ["cap", "tap", "tip", "rip", "rib"],
    ["pin", "pan", "pat", "pit", "kit"],
  ],
  heart: ["the", "to", "of", "and", "is", "one", "who", "come", "you", "go", "by"],
  vaultFake: [["zat", "zot", "zet"], ["fip", "fup", "fep"], ["gim", "gom", "gum"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Kit and Tam sat in the rig. The rig ran to the rim of the big pit. Bam! The rig hit the rim. Kit had to fix the rig. Tam ran to the rim. In the pit sat the big tin lid. \"Kit! Come!\" Kit ran to Tam. Kit and Tam had to dig to the lid.",
    },
    {
      title: "Crew log 2",
      text: "Kit and Tam had to dig and dig. Kit hit the lid. Tam had the rag. Tam can dab at the lid. The big tin lid had the ram in it. Who hid the lid in the pit? Kit had the ax. Kit hit the lid. Bam! Bam! The lid sat. Kit hit it and hit it. Tam ran to the rig. \"Sam! Can you zap the lid?\"",
    },
    {
      title: "Crew log 3",
      text: "Sam ran to the pit. Zap! Zap! Zap! The tin lid did rip. The lid did tip. Bam! It is dim in the pit. Sam lit the pit. Kit and Tam had to go in. In the pit sat one big tin vat. Kit had to tap it. Tap, tap. Is it gas? Is it wax? Kit and Tam sat by the vat. Who hid the vat in the pit?",
    },
    {
      title: "Crew log 4",
      text: "Kit and Tam had to tip the vat. Bam! The lid of the vat did rip. In the vat sat one tin map. Kit had the map. It had the big pit at the rim. It had the ram in it. Who had the map? Who hid it in the vat? Kit hid the map in the kit bag. Tam, Kit, and Sam ran to the rig. The tin map is in the lab.",
    },
  ],
  relic: { name: "The Ram Map", caption: "A tin map sealed in a vat, marked with a ram. The first sign the builders left for anyone who could read it." },
  story: "The crew digs to a tin lid marked with a ram, zaps it open, and finds a map sealed in a vat.",
  spanish: "Spanish a says /ah/ and Spanish i says /ee/, so cap may be read as 'cop' and pin as 'peen'. Short a and short i are new sounds for Spanish speakers; practice pairs like pan/pin and hat/hit.",
  miniLesson: {
    title: "Short a and short i: cap, pin",
    steps: [
      "Say /a/ with a wide-open mouth: at, am, cap. Then /i/ with a small smile: it, in, pin.",
      "Write pairs in two columns: pan/pin, hat/hit, sat/sit. Read each one, pointing to the vowel.",
      "Say a word (hat, hit, sat, sit). Students hold up the a card or the i card.",
      "Build pin, then change one letter at a time: pin, pan, pat, pit, kit.",
      "Read together: \"Kit and Tam dig in the pit.\"",
    ],
  },
};
