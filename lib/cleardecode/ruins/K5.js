// ClearDecode ruin K5 · number and negative prefixes: bi-, tri-, uni-; mis-, sub-, non-, im-, in- (UFLI 127).
// Near the top of the ladder: every earlier pattern is fair game in the
// inscriptions, plus these prefixes. Not yet: trans-, super-, -ive, -logy (K6),
// Greek roots (K7), Latin roots (K8).
// Note: the inscription room makes students tap every word that matches
// `find`, so logs avoid look-alikes like in, into, inside, big, bit, trip,
// tried, mist, missing, none, image and insect. Checked by tools/cleardecode-check.cjs.
export default {
  id: "K5",
  name: "The Map Room",
  find: "^(bi|tri|uni|mis|sub|non|im|in)",
  code: {
    label: "bi-, tri-, uni-; mis-, sub-, non-, im-, in-",
    spellings: ["bi-", "tri-", "uni-", "mis-", "sub-", "non-", "im-", "in-"],
    rule: "Number prefixes: uni- means one, bi- means two, tri- means three. Other prefixes: mis- means wrong, sub- means under or below, and non-, im- and in- mean not. Some words only start with these letters, like bit, trip and mist. Cover the prefix and check: is a base word or a number meaning left?",
  },
  sort: {
    yes: "Prefix vault", yesHint: "triangle · misread",
    no: "Look-alike vault", noHint: "trip · mist",
    hintYes: (w) => `${w} starts with a real prefix that adds a number or a meaning like not, wrong or under.`,
    hintNo: (w) => `${w} only starts with those letters. Cover them and no base word is left.`,
  },
  codex: [
    { w: "bicycle", parts: ["bi", "cy", "cle"], hi: 0 },
    { w: "triangle", parts: ["tri", "an", "gle"], hi: 0 },
    { w: "uniform", parts: ["uni", "form"], hi: 0 },
    { w: "misread", parts: ["mis", "read"], hi: 0 },
    { w: "subzero", parts: ["sub", "ze", "ro"], hi: 0 },
    { w: "incorrect", parts: ["in", "cor", "rect"], hi: 0 },
  ],
  checks: [
    ["bicycle", "cycle", "recycle"], ["triangle", "angle", "angles"], ["uniform", "formal", "former"],
    ["misread", "reread", "reading"], ["subzero", "zero", "zeros"], ["nonstop", "stopped", "stopper"],
    ["impolite", "polite", "politely"], ["incorrect", "correct", "correctly"], ["tripod", "pod", "pods"],
    ["mistrust", "trusted", "trustful"], ["submarine", "marine", "mariner"], ["nonsense", "sensed", "sensible"],
  ],
  vaultPicks: [
    ["unicycle", "cycled", "cycles"], ["impure", "pure", "purely"], ["invisible", "visible", "visibly"],
    ["misprint", "reprint", "printer"], ["subway", "away", "ways"], ["biplane", "plane", "planes"],
    ["nonfiction", "fiction", "fictional"], ["imperfect", "perfect", "perfectly"],
  ],
  // For the sort: real prefix words are the bank; the contrast words only start with the same letters.
  bank: ["bicycle", "biweekly", "bifocals", "biplane", "triangle", "tricycle", "tripod", "triplet", "unicycle", "uniform", "misread", "mislead", "misplace", "misprint", "misfire", "mistrust", "misjudge", "misstep", "misuse", "submarine", "subway", "subzero", "subsoil", "subgroup", "subtitle", "nonstop", "nonsense", "nonfiction", "nonliving", "nonstick", "impossible", "imperfect", "impure", "impolite", "improper", "incorrect", "invisible", "incomplete", "indirect", "inexact"],
  contrast: ["bit", "bird", "bike", "bill", "trip", "trim", "trick", "mist", "mister", "insect", "inch", "ink", "image", "bitter"],
  // Games: the look-alikes above start with the same letters, so the decoys
  // here are base words and other prefixes that don't match.
  game: {
    targets: ["bicycle", "triangle", "uniform", "misread", "subzero", "nonstop", "impolite", "incorrect", "tripod", "unicycle", "submarine", "nonsense", "invisible", "misprint"],
    decoys: ["cycle", "angle", "form", "reread", "zero", "stopped", "polite", "correct", "visible", "unlock", "replace", "disarm", "prepaid", "unkind"],
  },
  wall: {
    mode: "syllables",
    words: [
      { w: "bicycle", cuts: [2, 4] },
      { w: "triangle", cuts: [3, 5] },
      { w: "submarine", cuts: [3, 5] },
      { w: "incorrect", cuts: [2, 5] },
      { w: "nonfiction", cuts: [3, 6] },
      { w: "imperfect", cuts: [2, 5] },
    ],
  },
  forge: {
    items: [
      { w: "misread", clue: "read it the wrong way", parts: ["mis", "read"], explain: "mis + read. mis- means wrong or badly." },
      { w: "subzero", clue: "colder than zero", parts: ["sub", "zero"], explain: "sub + zero. sub- means under or below." },
      { w: "nonstop", clue: "going on without a stop", parts: ["non", "stop"], explain: "non + stop. non- means not or without." },
      { w: "impolite", clue: "not polite, rude", parts: ["im", "polite"], explain: "im + polite. im- means not. It comes before words that start with p, b or m." },
      { w: "incorrect", clue: "not right, wrong", parts: ["in", "correct"], explain: "in + correct. in- means not." },
      { w: "triangle", clue: "a shape with three angles", parts: ["tri", "angle"], explain: "tri + angle. tri- means three." },
      { w: "bicycle", clue: "a bike with two wheels", parts: ["bi", "cycle"], explain: "bi + cycle. bi- means two, and a cycle is a wheel or circle." },
      { w: "unicycle", clue: "a bike with one wheel", parts: ["uni", "cycle"], explain: "uni + cycle. uni- means one." },
    ],
    extra: [{ t: "re", k: "pre" }, { t: "place", k: "base" }, { t: "ed", k: "suf" }],
  },
  door: [
    { w: "misprint", parts: ["mis", "p", "r", "i", "n", "t"], extra: ["miss", "dis"] },
    { w: "subway", parts: ["sub", "w", "ay"], extra: ["sup", "ai"] },
    { w: "nonstop", parts: ["non", "s", "t", "o", "p"], extra: ["nun", "nan"] },
    { w: "tripod", parts: ["tri", "p", "o", "d"], extra: ["try", "tre"] },
    { w: "biplane", parts: ["bi", "p", "l", "a", "n", "e"], extra: ["by", "ai"] },
    { w: "incorrect", parts: ["in", "c", "o", "rr", "e", "c", "t"], extra: ["en", "ck"] },
    { w: "imprint", parts: ["im", "p", "r", "i", "n", "t"], extra: ["em", "in"] },
  ],
  chains: [
    ["mist", "mint", "mind", "kind"],
    ["trip", "trim", "brim", "grim"],
  ],
  heart: [],
  vaultFake: [["tricorp", "bicorp", "unicorp"], ["subzand", "nonzand", "miszand"], ["imbleck", "inbleck", "unbleck"], ["misvop", "disvop", "mesvop"]],
  inscriptions: [
    {
      title: "Log 47",
      text: "The archive led us down a long ramp, deeper under the ice. The air was subzero, and our breath hung like smoke. At the bottom was a round room with a dark dome for a roof. Ray called it the Map Room. A tripod stood at the center with a lens on top. When Kit tapped the lens, the dome lit up. Stars that had been invisible a second ago spun past us nonstop, then stopped on one spot.",
    },
    {
      title: "Log 48",
      text: "The dome had stopped on a triple star: three suns that turn around each other. From the triple star, a thin line of light ran out across the dark. Gus said it was a misprint, an imperfect copy of an old map. Mel shook her head. \"It is not incorrect,\" she said. \"Look. It is one single path, and it never splits.\" Sam ran the numbers. The path was not random. It was a route, and it led far past the edge of the map.",
    },
    {
      title: "Log 49",
      text: "Next to the tripod was a panel of signals the builders had sent back as they went. We had misread some of them on the way here. A signal we had called a warning was a greeting. A signal we had called nonsense was a list of numbers: the distance from star to star. Ray shook his head. \"We misjudged them,\" he said. \"We thought they were lost. They were leaving a trail the whole time.\" Kit added subtitles to each signal on the map.",
    },
    {
      title: "Log 50",
      text: "At last, the whole map made sense. The builders had left Haven, gone to the triple star, and then on along the path to a world past it. Their route was not a guess. It was a plan, and the map was left for anyone who could read it. Tam lifted a small disc from the tripod. The triple star and the path glowed above it, no longer invisible to us. We call it the Triple Star Map. And the archive went deeper still.",
    },
  ],
  relic: { name: "The Triple Star Map", caption: "A disc from the builders' Map Room. It shows the triple star and the single path the builders took to a new world." },
  story: "Deeper in the archive, the crew finds the builders' Map Room, learns they had misread the builders' signals, and sees the path the builders took past a triple star.",
  spanish: "Most of these prefixes are the same in Spanish: bicicleta, triángulo, uniforme, submarino, imposible, incorrecto. mis- has no Spanish match (Spanish uses mal- or des-), and non- is usually just no or sin.",
  miniLesson: {
    title: "Prefixes for numbers and for not",
    steps: [
      "Write uni-, bi-, tri- in a column with 1, 2, 3 next to them. Show unicycle, bicycle, tricycle and count the wheels together.",
      "Write mis-, sub-, non-, im-, in- with their meanings: wrong, under, not, not, not. Read misread, subzero, nonstop, impolite, incorrect.",
      "Show look-alikes: trip, mist, insect. Cover the first letters. Ask: is a base word or a number meaning left? No, so there is no prefix.",
      "Point out im- before p, b and m (impure, imperfect). Say it fast with in- and hear why: your lips are already closed.",
      "Read together: \"Gus said it was a misprint, an imperfect copy of an old map.\"",
    ],
  },
};
