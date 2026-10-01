// ClearDecode ruin H4 · oi, oy (UFLI 95).
// Decodable rule for the logs: everything taught on Planets A-G, plus H1 (oo,
// u as in put), H2 (ew, ui, ue), H3 (au, aw, augh, short e ea) and this
// ruin's oi and oy, plus heart words. No ou/ow as in cow, no kn/wr/mb, no
// suffixes beyond -s, -es, -ed, -ing. Checked by tools/cleardecode-check.cjs.
export default {
  id: "H4",
  name: "Oil Point",
  find: "oi|oy",
  code: { label: "/oy/", spellings: ["oi", "oy"], rule: "oi and oy both say /oy/: oi in the middle of a word, oy at the end" },
  sort: {
    yes: "/oy/ vault", yesHint: "coil · toy",
    no: "No /oy/ vault", noHint: "coal · tool",
    hintYes: (w) => `${w} has oi or oy, and they say /oy/.`,
    hintNo: (w) => `${w} has no oi or oy, so there is no /oy/ sound.`,
  },
  codex: [
    { w: "coil", parts: ["c", "oi", "l"], hi: 1 },
    { w: "soil", parts: ["s", "oi", "l"], hi: 1 },
    { w: "voice", parts: ["v", "oi", "ce"], hi: 1 },
    { w: "joint", parts: ["j", "oi", "nt"], hi: 1 },
    { w: "destroy", parts: ["de", "str", "oy"], hi: 2 },
    { w: "loyal", parts: ["l", "oy", "al"], hi: 1 },
  ],
  checks: [
    ["coil", "coal", "cool"], ["point", "pint", "paint"], ["voice", "vice", "vase"],
    ["joint", "jaunt", "jolt"], ["soil", "sail", "seal"], ["boil", "bail", "bowl"],
    ["moist", "most", "mist"], ["choice", "chase", "chose"], ["spoil", "spool", "spill"],
    ["royal", "rival", "rally"], ["employ", "empty", "imply"], ["loyal", "local", "legal"],
  ],
  vaultPicks: [
    ["foil", "fail", "fall"], ["noise", "nose", "niece"], ["poison", "prison", "person"],
    ["hoist", "host", "haste"], ["annoy", "anyway", "annex"], ["destroy", "destiny", "distress"],
    ["toil", "tool", "tile"], ["avoid", "avid", "aside"],
  ],
  bank: ["coil", "point", "voice", "joint", "soil", "boil", "moist", "choice", "spoil", "foil", "noise", "poison", "hoist", "toil", "avoid", "broil", "join", "coin", "oil", "void", "turmoil", "appoint", "toy", "boy", "joy", "enjoy", "destroy", "employ", "royal", "loyal", "annoy", "oyster", "deploy", "decoy", "convoy", "voyage"],
  contrast: ["coal", "cool", "pint", "paint", "vice", "sail", "bail", "most", "chase", "spool", "rival", "empty", "fail", "nose", "host", "tool"],
  wall: {
    mode: "syllables",
    words: [
      { w: "poison", cuts: [3] },
      { w: "destroy", cuts: [2] },
      { w: "voyage", cuts: [3] },
      { w: "royal", cuts: [3] },
      { w: "appoint", cuts: [2] },
      { w: "turmoil", cuts: [3] },
    ],
  },
  forge: {
    items: [
      { w: "coils", clue: "more than one coil", parts: ["coil", "s"], explain: "coil + s. The ending -s means more than one." },
      { w: "pointed", clue: "showed the way with a finger (it already happened)", parts: ["point", "ed"], explain: "point + ed. The ending -ed means it already happened." },
      { w: "joining", clue: "linking up with something right now", parts: ["join", "ing"], explain: "join + ing. The ending -ing means it is happening now." },
      { w: "destroyed", clue: "wrecked so it can't be used (it already happened)", parts: ["destroy", "ed"], explain: "destroy + ed. The ending -ed means it already happened." },
      { w: "enjoys", clue: "likes doing something", parts: ["enjoy", "s"], explain: "enjoy + s. Add -s when one person or thing does the action." },
    ],
    extra: [{ t: "spoil", k: "base" }, { t: "es", k: "suf" }, { t: "ing", k: "suf" }],
  },
  door: [
    { w: "coil", parts: ["c", "oi", "l"], extra: ["oy", "o"] },
    { w: "point", parts: ["p", "oi", "n", "t"], extra: ["oy", "o"] },
    { w: "boy", parts: ["b", "oy"], extra: ["oi", "o"] },
    { w: "join", parts: ["j", "oi", "n"], extra: ["oy", "o"] },
    { w: "voice", parts: ["v", "oi", "ce"], extra: ["oy", "o"] },
    { w: "enjoy", parts: ["e", "n", "j", "oy"], extra: ["oi", "o"] },
    { w: "soil", parts: ["s", "oi", "l"], extra: ["oy", "o"] },
  ],
  chains: [
    ["coil", "boil", "foil", "soil", "toil"],
    ["joint", "point", "paint", "faint"],
  ],
  heart: ["the", "said", "was", "of", "to", "one", "they", "I", "you", "from"],
  vaultFake: [["gloin", "glin", "glan"], ["smoy", "smay", "smee"], ["vroid", "vrad", "vrid"]],
  inscriptions: [
    {
      title: "Crew log 1",
      text: "The dots on the hawk crest led us to a dock on a gray coast. Big steel tanks sat in rows, and the soil was black with oil. Tam dug in the moist soil and hit a pipe. \"They filled the ships with oil at this spot,\" she said. \"Then the ships set off for the stars.\" We set up camp by the tanks.",
    },
    {
      title: "Crew log 2",
      text: "At the end of the dock sat a steel hut. The hatch had a joint that was stuck with rust. Ray had to pry it with a bar. When it gave, the noise made us all jump. Inside, we had to avoid the slick oil on the steps. A desk sat in the back with a coil of copper wire on it. Then a thin voice came from the coil.",
    },
    {
      title: "Crew log 3",
      text: "The voice was not one of us. It spoke in the old code, one word at a time. Kit said, \"I can read it. The voice is saying: Join us. We left a point of light for you.\" Mel said it was a trick, but Kit did not think so. The voice was steady and full of joy. It was the first time a voice from the past had spoken to us.",
    },
    {
      title: "Crew log 4",
      text: "We had a choice: stay at the dock, or follow the voice to the point of light. We made the choice to go. Gus cut the wire, and we rolled up the coil in a thick cloth. We will not let the rain spoil it. Back on the ship, Ray set it in a steel case. Then he said, \"We will be loyal to that voice. It asked us to find them.\"",
    },
  ],
  relic: { name: "The Voice Coil", caption: "A coil of copper wire that still holds a builder's voice. It speaks in their code and asks anyone who can read it to follow." },
  story: "At an old fuel dock, the crew finds a copper coil that plays a builder's voice, asking them to join the builders and follow a point of light.",
  spanish: "Good transfer: Spanish oy and oi say almost the same sound (hoy, voy, oigo). Show that English uses oi in the middle of a word and oy at the end, like Spanish hoy.",
  miniLesson: {
    title: "oi in the middle, oy at the end",
    steps: [
      "Write coil and toy. Underline oi and oy. Say: both say /oy/.",
      "Ask: where is oi? (middle). Where is oy? (end). English words do not end in oi.",
      "Sort 6 cards together: point, joy, soil, enjoy, voice, destroy.",
      "Dictate 3 words (join, boy, moist). Students say the sound, then pick oi or oy.",
      "Read together: \"The voice in the coil said, Join us.\"",
    ],
  },
};
