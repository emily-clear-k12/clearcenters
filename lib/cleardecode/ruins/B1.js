// ClearDecode ruin B1 · ff, ll, ss, zz; -all, -oll, -ull (UFLI 42-43).
// Decodable rule for this ruin: single consonants, all short vowels, plural
// and verb -s, plus doubled ff, ll, ss, zz and the units all, oll, ull, plus
// heart words. No ck, sh, th or other digraphs yet, no blends (they come at
// B6). Checked by tools/cleardecode-check.cjs.
export default {
  id: "B1",
  name: "Moss Wall",
  find: "ff|ll|ss|zz",
  code: {
    label: "ff, ll, ss, zz",
    spellings: ["ff", "ll", "ss", "zz", "all", "oll", "ull"],
    rule: "After a short vowel at the end of a short word, f, l, s and z are doubled: cuff, hill, pass, buzz. In all, oll and ull the vowel changes: tall, roll, full.",
  },
  sort: {
    yes: "Double letter vault", yesHint: "hill · buzz",
    no: "Single letter vault", noHint: "hit · bus",
    hintYes: (w) => `${w} ends with a doubled f, l, s or z after the vowel.`,
    hintNo: (w) => `${w} has no double f, l, s or z.`,
  },
  codex: [
    { w: "hull", parts: ["h", "u", "ll"], hi: 2 },
    { w: "pass", parts: ["p", "a", "ss"], hi: 2 },
    { w: "buzz", parts: ["b", "u", "zz"], hi: 2 },
    { w: "cuff", parts: ["c", "u", "ff"], hi: 2 },
    { w: "wall", parts: ["w", "all"], hi: 1 },
    { w: "roll", parts: ["r", "oll"], hi: 1 },
  ],
  checks: [
    ["hull", "hut", "hub"], ["pass", "pat", "pal"], ["buzz", "bud", "bus"],
    ["cuff", "cub", "cup"], ["wall", "wax", "was"], ["roll", "rot", "rod"],
    ["mass", "mat", "map"], ["fizz", "fix", "fit"], ["puff", "pup", "pun"],
    ["bell", "bet", "beg"], ["moss", "mop", "mob"], ["tall", "tab", "tan"],
  ],
  vaultPicks: [
    ["fill", "fig", "fin"], ["mess", "met", "men"], ["jazz", "jab", "jam"], ["toss", "top", "tot"],
    ["dull", "dug", "dud"], ["full", "fun", "fan"], ["hill", "hip", "him"], ["off", "of", "on"],
  ],
  bank: ["hull", "pass", "buzz", "cuff", "wall", "roll", "mass", "fizz", "puff", "bell", "moss", "tall", "fill", "mess", "jazz", "toss", "mull", "full", "hill", "off", "huff", "boss", "loss", "fuss", "miss", "sell", "tell", "well", "yell", "fell", "call", "hall", "fall", "ball", "toll", "pull", "bull", "gull", "dull", "will"],
  contrast: ["hut", "pat", "bud", "cub", "wax", "rot", "mat", "fix", "pup", "bet", "mop", "tab", "fit", "jab", "dot", "gas"],
  wall: {
    mode: "sounds",
    words: [
      { w: "hull", cuts: [1, 2] },
      { w: "pass", cuts: [1, 2] },
      { w: "buzz", cuts: [1, 2] },
      { w: "cuff", cuts: [1, 2] },
      { w: "moss", cuts: [1, 2] },
      { w: "bell", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "hull", parts: ["h", "u", "ll"], extra: ["l", "ss"] },
    { w: "pass", parts: ["p", "a", "ss"], extra: ["s", "zz"] },
    { w: "buzz", parts: ["b", "u", "zz"], extra: ["z", "ss"] },
    { w: "cuff", parts: ["c", "u", "ff"], extra: ["f", "ll"] },
    { w: "mess", parts: ["m", "e", "ss"], extra: ["s", "ff"] },
    { w: "fill", parts: ["f", "i", "ll"], extra: ["l", "zz"] },
    { w: "tall", parts: ["t", "all"], extra: ["al", "oll"] },
  ],
  chains: [
    ["hull", "hill", "fill", "fell", "bell"],
    ["mass", "mess", "moss", "boss", "toss"],
  ],
  heart: ["the", "a", "said", "was", "to", "of", "as", "and", "is", "we", "do", "go", "who"],
  vaultFake: [["vass", "vas", "vap"], ["zuff", "zuf", "zup"], ["kell", "kel", "kep"], ["jozz", "joz", "jop"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "Tam and Kit got to the top of a big hill. On the hill was a wall. It was tall, as tall as ten men. Moss hid all of it. Kit cut off a bit of the moss. The wall had lots of dots and cuts in it. \"Is it a map?\" said Kit. \"It is a big mess,\" said Tam. \"Will it tell us a lot?\"",
    },
    {
      title: "Crew log 2",
      text: "Mel and Gus met Tam and Kit at the wall. Mel set a pad on the moss. Buzz, buzz! The wall had a buzz in it. \"Is it a bug?\" said Gus. \"It is not a bug,\" said Mel. \"It is a big fan, and it is on.\" Mel did not miss a bit. Mel will fill a pad. All the dots and cuts on the wall will go on it. \"Will the dots tell us if we can get in?\" said Gus.",
    },
    {
      title: "Crew log 3",
      text: "Gus got to a gap in the wall. It was as big as a bus. Gus and Kit had to pull and pull, but the wall did not fall. Mel hit six dots on the wall. Buzz! The dots lit up, and a big bit of the wall rolls off. In the gap is a dim hall. Tam is not a fan of dim halls. \"We will get in,\" said Tam. \"Do not miss a bit of it.\"",
    },
    {
      title: "Crew log 4",
      text: "Up the hall, Kit got to a big hull. It was the hull of a jet, as tall as a hill. On the hull was a bell, and moss was on the bell. Gus got the moss off. The bell had dots on it, as the wall did. Mel hit the bell. The hall was full of a dull hum. It was a call. \"The bell will go to the lab,\" said Tam. Kit said, \"Who set it on the hull? Is the call to us?\"",
    },
  ],
  relic: { name: "The Moss Bell", caption: "A bell hidden under moss on an old jet hull. Its dots match the dots on the wall, and it still rings." },
  story: "Behind a tall wall covered in moss, the crew finds the hull of an old jet and a bell marked with the same dots as the wall.",
  spanish: "Spanish ll says /y/ (as in 'llama'), but English ll just says /l/. Spanish never doubles f, s or z, so point out that the doubled letters in cuff, pass and buzz make one sound.",
  miniLesson: {
    title: "Double f, l, s, z: hill, pass, buzz",
    steps: [
      "Write hill and pass. Underline ll and ss. Say: two letters, one sound.",
      "Say the rule: in a short word with a short vowel, f, l, s and z at the end are doubled. Try cuff, fill, mess, fizz.",
      "Write bus, yes and gas. Say: a few short words break the rule, so we learn them by heart.",
      "Write all, tall, roll, full. Read them together and point out that the vowel sound changes in these.",
      "Read together: \"The bell on the hull was full of moss.\"",
    ],
  },
};
