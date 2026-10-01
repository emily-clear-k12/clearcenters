// ClearDecode ruin A2 · short o (UFLI 37-38).
// Decodable rule for this ruin: single consonants and short a, i, o, plus heart
// words. No u or e (except inside heart words), no plural -s, no blends, no
// digraphs. Logs avoid heart words with an o in them (to, of, go, no) so every
// o word a student taps really says /o/. Checked by tools/cleardecode-check.cjs.
export default {
  id: "A2",
  name: "Fog Bog",
  find: "o",
  code: { label: "short o", spellings: ["o"], rule: "o closed in by consonants says /o/, as in hot" },
  sort: {
    yes: "Short o vault", yesHint: "hot · pod",
    no: "Other vowels vault", noHint: "hat · pit",
    hintYes: (w) => `${w} has o closed in by consonants, so it says /o/.`,
    hintNo: (w) => `${w} has no o. Read the vowel again.`,
  },
  codex: [
    { w: "hot", parts: ["h", "o", "t"], hi: 1 },
    { w: "fog", parts: ["f", "o", "g"], hi: 1 },
    { w: "pod", parts: ["p", "o", "d"], hi: 1 },
    { w: "mop", parts: ["m", "o", "p"], hi: 1 },
    { w: "log", parts: ["l", "o", "g"], hi: 1 },
    { w: "box", parts: ["b", "o", "x"], hi: 1 },
  ],
  checks: [
    ["hot", "hat", "hit"], ["pot", "pit", "pat"], ["log", "lag", "leg"],
    ["top", "tip", "tap"], ["dog", "dig", "dug"], ["fox", "fix", "fax"],
    ["cot", "cat", "cut"], ["job", "jab", "jib"], ["not", "nut", "net"],
    ["lot", "lit", "let"], ["rot", "rat", "rut"], ["bog", "big", "bag"],
  ],
  vaultPicks: [
    ["hog", "hug", "hag"], ["got", "gut", "get"], ["on", "an", "in"], ["pop", "pup", "pep"],
    ["rob", "rib", "rub"], ["cob", "cab", "cub"], ["sob", "sub", "sib"], ["jog", "jig", "jag"],
  ],
  bank: ["hot", "pot", "dot", "lot", "not", "got", "cot", "rot", "fog", "log", "bog", "jog", "hog", "dog", "top", "mop", "hop", "pop", "cop", "sob", "job", "cob", "rob", "mob", "pod", "nod", "sod", "box", "fox", "ox", "on", "rod", "cog"],
  contrast: ["hat", "pit", "map", "tip", "rug", "cut", "jet", "bed", "fan", "pig", "sun", "net", "lid", "cap", "bus", "hen"],
  game: { decoys: ["hat", "pit", "map", "tip", "rug", "cut", "jet", "bed", "fan", "pig", "sun", "net", "lid", "cap", "bus", "hen"] },
  wall: {
    mode: "sounds",
    words: [
      { w: "hot", cuts: [1, 2] },
      { w: "pod", cuts: [1, 2] },
      { w: "mop", cuts: [1, 2] },
      { w: "fog", cuts: [1, 2] },
      { w: "log", cuts: [1, 2] },
      { w: "top", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "hot", parts: ["h", "o", "t"], extra: ["a", "u"] },
    { w: "fog", parts: ["f", "o", "g"], extra: ["a", "i"] },
    { w: "mop", parts: ["m", "o", "p"], extra: ["a", "u"] },
    { w: "pod", parts: ["p", "o", "d"], extra: ["a", "e"] },
    { w: "box", parts: ["b", "o", "x"], extra: ["a", "i"] },
    { w: "log", parts: ["l", "o", "g"], extra: ["a", "e"] },
    { w: "top", parts: ["t", "o", "p"], extra: ["i", "a"] },
  ],
  chains: [
    ["hot", "hop", "top", "tip", "tap"],
    ["log", "fog", "dog", "dot", "pot"],
  ],
  heart: ["the", "a", "said", "was", "is", "his", "has", "as", "and", "water"],
  vaultFake: [["mog", "mag", "mug"], ["bov", "bav", "biv"], ["fot", "fat", "fit"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Tam, Kit, and Sam sat in the rig. The rig hit a bog. Fog sat on it. It was hot. Tam had the tin map. On the map was a big dot. The dot was in the bog. Kit got a rod. Kit can jab the rod in the bog. Jab, jab, jab. Bop! The rod hit a lid. \"A box!\" said Kit.",
    },
    {
      title: "Crew log 2",
      text: "Kit and Tam dig and dig. The box is big and hot. Sam has a mop. Sam can mop the top. On the top is a ram, as on the map. On the top is a cog. Kit hit the top. It did not pop. Tam got the rod. Tam can jam the rod in the cog. Tip it! Bam! The top did pop!",
    },
    {
      title: "Crew log 3",
      text: "In the box sat a pot. It was a tin pot. It had a lid. On the lid was a ram. Kit got the pot. Kit sat on a log. Kit had the pot on his lap. The fog got in the pot. Fog got in and in. Tam did tip the pot. Was it fog in the pot? It was not fog. It was water!",
    },
    {
      title: "Crew log 4",
      text: "\"A fog pot!\" said Tam. Kit had a sip. It was not bad. On the pot was a map. It had a dot on a big bog. It had a dot on a big pit. Tam got the tin map. Was it a water map? Kit, Tam, and Sam hop in the rig. The fog pot is in the rig. Got it!",
    },
  ],
  relic: { name: "The Fog Pot", caption: "A tin pot with a ram on its lid. Set it in fog and it fills with water. Its dots mark a bog and a pit." },
  story: "In a hot, foggy bog, the crew digs up a ram-marked box and finds a pot that turns fog into water.",
  spanish: "Spanish o says /o/ as in 'oso', close to long o. The short o in hot sounds more like the Spanish a in 'casa', so students may mix up hot and hat. Practice hot/hat, pot/pat, top/tap.",
  miniLesson: {
    title: "Short o: hot, fog, pod",
    steps: [
      "Say /o/ together. Open wide and drop the jaw: on, ox, hot.",
      "Write hot, hat, hit in a column. Read them, pointing to the vowel each time.",
      "Say a word (pot, pat, pit). Students hold up the vowel card they hear.",
      "Build log, then change one letter at a time: log, fog, dog, dot, pot.",
      "Read together: \"Fog sat on the hot bog.\"",
    ],
  },
};
