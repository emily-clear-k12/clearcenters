// ClearCode ruin B5 · ng, nk (UFLI 51-52).
// Decodable rule for this ruin: all short vowels, single consonants, plural -s,
// ff/ll/ss/zz, ck, sh, th, ch, wh, ph, and now ng and nk (taught as glued
// sounds: ang, ing, ong, ung, ank, ink, onk, unk), plus heart words. No blends
// yet (st, tr, nd, mp... come at B6), no endings -ed/-ing.
// Checked by tools/clearcode-check.cjs.
export default {
  id: "B5",
  name: "The Sunk Ship",
  find: "ng|nk",
  code: { label: "ng, nk", spellings: ["ng", "nk"], rule: "ng says /ng/ as in ring, nk says /ngk/ as in sink. Read them glued to the vowel: ang, ing, ong, ung, ank, ink, onk, unk" },
  sort: {
    yes: "ng and nk vault", yesHint: "ring · sink",
    no: "Plain n vault", noHint: "rig · sin",
    hintYes: (w) => `${w} has ng or nk glued to the vowel.`,
    hintNo: (w) => `${w} has no ng or nk. Look at the end of the word again.`,
  },
  codex: [
    { w: "sink", parts: ["s", "i", "nk"], hi: 2 },
    { w: "tank", parts: ["t", "a", "nk"], hi: 2 },
    { w: "junk", parts: ["j", "u", "nk"], hi: 2 },
    { w: "ring", parts: ["r", "i", "ng"], hi: 2 },
    { w: "long", parts: ["l", "o", "ng"], hi: 2 },
    { w: "hung", parts: ["h", "u", "ng"], hi: 2 },
  ],
  checks: [
    ["sink", "sin", "sick"], ["tank", "tan", "tack"], ["ring", "rig", "rim"],
    ["long", "log", "lot"], ["hung", "hug", "hut"], ["junk", "jug", "jut"],
    ["think", "thin", "this"], ["wing", "win", "wig"], ["sank", "sack", "sad"],
    ["song", "son", "sob"], ["pink", "pin", "pick"], ["rung", "run", "rug"],
  ],
  vaultPicks: [
    ["honk", "hock", "hog"], ["link", "lick", "lid"], ["fang", "fan", "fat"], ["bunk", "bun", "buck"],
    ["gong", "gob", "got"], ["wink", "win", "wick"], ["lung", "luck", "lug"], ["rank", "ran", "rack"],
  ],
  bank: ["sink", "sank", "sunk", "tank", "ink", "pink", "link", "wink", "think", "junk", "bunk", "hunk", "honk", "rank", "yank", "dunk", "bank", "trunk", "plank", "ring", "king", "wing", "sing", "ding", "long", "song", "gong", "hang", "rang", "sang", "fang", "bang", "hung", "lung", "rung", "string", "spring", "strong"],
  contrast: ["sin", "sick", "tan", "tack", "rig", "rim", "log", "lot", "hug", "jug", "thin", "win", "sack", "son", "pin", "rug"],
  wall: {
    mode: "sounds",
    words: [
      { w: "sink", cuts: [1, 2] },
      { w: "tank", cuts: [1, 2] },
      { w: "think", cuts: [2, 3] },
      { w: "ring", cuts: [1, 2] },
      { w: "long", cuts: [1, 2] },
      { w: "hung", cuts: [1, 2] },
    ],
  },
  forge: null,
  door: [
    { w: "sink", parts: ["s", "i", "nk"], extra: ["ng", "n"] },
    { w: "ring", parts: ["r", "i", "ng"], extra: ["nk", "n"] },
    { w: "tank", parts: ["t", "a", "nk"], extra: ["ng", "ck"] },
    { w: "long", parts: ["l", "o", "ng"], extra: ["nk", "n"] },
    { w: "junk", parts: ["j", "u", "nk"], extra: ["ng", "ck"] },
    { w: "hung", parts: ["h", "u", "ng"], extra: ["nk", "g"] },
    { w: "think", parts: ["th", "i", "nk"], extra: ["ng", "n"] },
  ],
  chains: [
    ["sink", "sank", "tank", "rank", "rink"],
    ["ring", "rang", "sang", "song", "long"],
  ],
  heart: ["the", "a", "I", "said", "was", "of", "to", "we", "she", "they", "you", "and", "is", "has", "as", "from", "go", "have", "one", "no", "water", "where"],
  vaultFake: [["zank", "zan", "zak"], ["mong", "mog", "mok"], ["hink", "hin", "hik"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The path from the pits led us to a dock by a big tank. In the tank, the water was as dim as ink. \"A ship sank in that tank,\" said Kit. Gus got a long rod and set it in. Thunk! The rod hit the hull of a ship. \"It is sunk, but it is not junk,\" said Gus. \"I think we can get to it.\"",
    },
    {
      title: "Crew log 2",
      text: "On the dock was a big gong. It hung from a rack on a long rung. Mel got the rod and hit the gong. Bang! The gong rang and rang. Then, with a long honk, the water in the tank sank. It sank and sank, and the ship sat on the mud. \"The gong is a lock,\" said Mel. \"You bang it, and the tank lets the water go.\"",
    },
    {
      title: "Crew log 3",
      text: "Gus and Kit got in the ship. It had six bunks and a lot of junk. Kit did not think much of the junk. Then Gus got a box from a bunk. In the box was a ring of six links. On all six links was a cup. \"Six links, six cups,\" said Gus. \"The chip had six dots. I think the links and the dots have a link.\"",
    },
    {
      title: "Crew log 4",
      text: "Then, with no one at the gong, it rang. Bang! Bang! Water ran back in the tank. \"Up on the dock!\" said Gus. Kit and Gus ran up the rungs as the ship sank. Kit had not let go of the ring. At the lab, Mel had a long think. \"A cup has water in it,\" she said. \"Six cups. Six dots on the chip. I think they had to get water, and the links tell us where.\"",
    },
  ],
  relic: { name: "The Ring of Links", caption: "Six links on one ring, with a cup cut on each link. Six cups to match the six dots on the Path Chip." },
  story: "A gong drains a flooded tank and uncovers a sunk ship, where the crew finds a ring of six links, each marked with a cup, matching the six dots on the Path Chip.",
  spanish: "Spanish has the /ng/ sound before g and k (tengo, banco), but never at the end of a word, so students may say \"sin\" for sing or \"sinkuh\" for sink. Practice hearing ring vs. rig vs. rink, and keep the end sound short.",
  miniLesson: {
    title: "ng and nk: glued sounds",
    steps: [
      "Write ang, ing, ong, ung, ank, ink, onk, unk on cards. Say: the vowel and the team stick together, so we read them as one chunk.",
      "Say /ng/ and hum it in your nose. Then say /ngk/: same hum, then a quick k. Students touch their nose for ng and tap the desk for nk.",
      "Write sin, sing, sink in a column. Read them, then ask what changed at the end each time.",
      "Build ring, then change one letter at a time: ring, rang, sang, song, long.",
      "Read together: \"Gus hit the long gong, and the tank sank.\"",
    ],
  },
};
