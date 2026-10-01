// ClearDecode ruin A4 · short e (UFLI 40).
// Decodable rule for this ruin: single consonants and all five short vowels,
// light plural -s, plus heart words. No blends, no digraphs. Logs avoid heart
// words with an e in them (the, he, we, she, they) so every e word a student
// taps really says /e/. Checked by tools/cleardecode-check.cjs.
export default {
  id: "A4",
  name: "Gas Jets",
  find: "e",
  code: { label: "short e", spellings: ["e"], rule: "e closed in by consonants says /e/, as in net" },
  sort: {
    yes: "Short e vault", yesHint: "net · bed",
    no: "Other vowels vault", noHint: "nut · bad",
    hintYes: (w) => `${w} has e closed in by consonants, so it says /e/.`,
    hintNo: (w) => `${w} has no e. Read the vowel again.`,
  },
  codex: [
    { w: "net", parts: ["n", "e", "t"], hi: 1 },
    { w: "bed", parts: ["b", "e", "d"], hi: 1 },
    { w: "peg", parts: ["p", "e", "g"], hi: 1 },
    { w: "den", parts: ["d", "e", "n"], hi: 1 },
    { w: "ten", parts: ["t", "e", "n"], hi: 1 },
    { w: "leg", parts: ["l", "e", "g"], hi: 1 },
  ],
  checks: [
    ["net", "nut", "not"], ["bed", "bad", "bid"], ["peg", "pig", "pug"],
    ["ten", "tan", "tin"], ["leg", "log", "lag"], ["pen", "pin", "pan"],
    ["set", "sat", "sit"], ["hem", "ham", "him"], ["beg", "big", "bag"],
    ["get", "got", "gut"], ["let", "lot", "lit"], ["pet", "pat", "pit"],
  ],
  vaultPicks: [
    ["den", "din", "dun"], ["fed", "fad", "fid"], ["met", "mat", "mitt"], ["bet", "bat", "but"],
    ["led", "lad", "lid"], ["pep", "pop", "pup"], ["wed", "wad", "wood"], ["vet", "vat", "vote"],
  ],
  bank: ["net", "bed", "peg", "den", "ten", "leg", "pen", "set", "hem", "beg", "get", "let", "pet", "fed", "met", "bet", "led", "pep", "wed", "vet", "jet", "web", "wet", "yet", "hen", "men", "red", "keg", "yes", "vex"],
  contrast: ["nut", "bad", "pig", "tan", "log", "pin", "sat", "him", "bag", "got", "lit", "pat", "fad", "hut", "cot", "rug"],
  game: { decoys: ["nut", "bad", "pig", "tan", "log", "pin", "sat", "him", "bag", "got", "lit", "pat", "fad", "hut", "cot", "rug"] },
  wall: {
    mode: "sounds",
    words: [
      { w: "net", cuts: [1, 2] },
      { w: "bed", cuts: [1, 2] },
      { w: "peg", cuts: [1, 2] },
      { w: "den", cuts: [1, 2] },
      { w: "ten", cuts: [1, 2] },
      { w: "vet", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "net", parts: ["n", "e", "t"], extra: ["i", "a"] },
    { w: "bed", parts: ["b", "e", "d"], extra: ["a", "i"] },
    { w: "peg", parts: ["p", "e", "g"], extra: ["i", "u"] },
    { w: "den", parts: ["d", "e", "n"], extra: ["a", "i"] },
    { w: "ten", parts: ["t", "e", "n"], extra: ["a", "i"] },
    { w: "leg", parts: ["l", "e", "g"], extra: ["o", "a"] },
    { w: "hen", parts: ["h", "e", "n"], extra: ["u", "i"] },
  ],
  chains: [
    ["net", "pet", "pen", "ten", "den"],
    ["leg", "peg", "beg", "bag", "big"],
  ],
  heart: ["a", "said", "was", "as", "and", "to", "of", "who", "go"],
  vaultFake: [["fem", "fam", "fom"], ["jeb", "jab", "jib"], ["sep", "sop", "sip"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Mel and Gus got to a red pit. It was wet and hot. Pop! Pop! A jet of hot gas hit a rim. \"Yes, gas!\" said Mel. Gus had a net. Gus set a net on top of a jet. Mel set a net on top of a jet. Ten jets, ten nets. A den was in a pit. It had a red lid. Mel and Gus led Sam in.",
    },
    {
      title: "Crew log 2",
      text: "In a den, it was dim and wet. Sam lit it up. Mel and Gus met a big web. It was not a bug web. It was a tin web, and it had red pegs in it. Gus can tap a peg. Tap, tap, tap. Mel can jot it on a pad. Yet a web had a gap. A red peg was not in it. Mel and Gus had to get a peg.",
    },
    {
      title: "Crew log 3",
      text: "Mel and Gus dug in a den. Gus hit a keg. In a keg was a red peg! \"Yes!\" said Mel. Mel had to get a peg in a gap. Mel set it in. Hum, hum, hum. A web lit up red. Pop! A lid in a den did pop up. Mel and Gus had to get to a lid.",
    },
    {
      title: "Crew log 4",
      text: "Mel led Gus to a lid. In a pit was a tin box. In a box sat a pin. It was a tin pin cut as a jet. It had ten red dots on it. Ten pegs, ten dots. \"Did a jet get up and go?\" said Gus. Mel had to sit. Who set a jet pin in a den? Who had ten jets? Mel had a lot to jot on a pad.",
    },
  ],
  relic: { name: "The Jet Pin", caption: "A tin pin cut in the shape of a jet, with ten red dots. Did the builders fly away from here?" },
  story: "Past vents of hot gas, the crew finds a hidden den, fixes a web of pegs, and opens a pit that holds a pin shaped like a jet.",
  spanish: "Spanish e says /e/ as in 'mesa', which is close to short e, so many students read net well. Watch for mix-ups with short i (pen/pin, set/sit), since Spanish has no short i.",
  miniLesson: {
    title: "Short e: net, bed, peg",
    steps: [
      "Say /e/ together. Mouth half open, a little smile: Ed, egg, net.",
      "Write pen, pin, pan in a column. Read them, pointing to the vowel each time.",
      "Say a word (set, sit, sat). Students hold up the vowel card they hear.",
      "Build net, then change one letter at a time: net, pet, pen, ten, den.",
      "Read together: \"Mel set a net on a jet of gas.\"",
    ],
  },
};
