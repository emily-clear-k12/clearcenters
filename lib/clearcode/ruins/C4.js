// ClearCode ruin C4 · soft c and g: _ce, _ge (UFLI 60-62).
// Decodable rule for this ruin: everything from Planets A and B (short vowels,
// plural -s, ff/ll/ss/zz, ck, sh, th, ch, wh, ph, ng, nk, blends) plus every
// silent-e pattern (a_e, i_e, o_e, u_e, e_e) and _ce/_ge, plus heart words.
// No -ed/-ing endings (D1), no -dge (E1). Checked by tools/clearcode-check.cjs.
export default {
  id: "C4",
  name: "The Ice Stage",
  find: "[aeiou][cg]e",
  code: { label: "soft c and g: _ce, _ge", spellings: ["ce", "ge"], rule: "When e comes after c or g, the c says /s/ and the g says /j/, as in space and stage." },
  sort: {
    yes: "Soft c and g vault", yesHint: "race · stage",
    no: "Hard c and g vault", noHint: "rack · stag",
    hintYes: (w) => `${w} ends in ce or ge, so the c says /s/ or the g says /j/.`,
    hintNo: (w) => `${w} has no e after its c or g, so the sound is hard: /k/ or /g/.`,
  },
  codex: [
    { w: "place", parts: ["pl", "ace"], hi: 1 },
    { w: "slice", parts: ["sl", "ice"], hi: 1 },
    { w: "ice", parts: ["ice"], hi: 0 },
    { w: "huge", parts: ["h", "uge"], hi: 1 },
    { w: "cage", parts: ["c", "age"], hi: 1 },
    { w: "wage", parts: ["w", "age"], hi: 1 },
  ],
  checks: [
    ["race", "rack", "rag"], ["lace", "lack", "lag"], ["pace", "pack", "peg"],
    ["face", "fact", "fake"], ["rage", "rag", "rack"], ["wage", "wag", "wake"],
    ["huge", "hug", "hum"], ["trace", "track", "tract"], ["twice", "twig", "twin"],
    ["spice", "spike", "spin"], ["price", "prim", "prize"], ["sage", "sag", "sack"],
  ],
  vaultPicks: [
    ["brace", "brick", "brag"], ["grace", "grab", "grape"], ["nice", "nick", "nip"], ["page", "pack", "pig"],
    ["mice", "mile", "mix"], ["truce", "truck", "trunk"], ["rice", "rich", "rim"], ["ace", "act", "ask"],
  ],
  bank: ["place", "slice", "ice", "huge", "cage", "wage", "race", "lace", "pace", "face", "rage", "trace", "twice", "spice", "price", "sage", "brace", "grace", "nice", "page", "mice", "truce", "rice", "ace", "age", "stage", "space", "spruce", "splice"],
  contrast: ["rack", "lack", "pack", "rag", "wag", "hug", "track", "twig", "spin", "sag", "brick", "grab", "nick", "stag", "act", "slick"],
  // Sounds wall: the e stays with the c or g before it (ce says /s/, ge says /j/).
  wall: {
    mode: "sounds",
    words: [
      { w: "place", cuts: [1, 2, 3] },
      { w: "slice", cuts: [1, 2, 3] },
      { w: "ice", cuts: [1] },
      { w: "huge", cuts: [1, 2] },
      { w: "stage", cuts: [1, 2, 3] },
      { w: "trace", cuts: [1, 2, 3] },
    ],
  },
  forge: null,
  door: [
    { w: "race", parts: ["r", "a", "c", "e"], extra: ["s", "k"] },
    { w: "huge", parts: ["h", "u", "g", "e"], extra: ["j", "o"] },
    { w: "cage", parts: ["c", "a", "g", "e"], extra: ["j", "k"] },
    { w: "slice", parts: ["s", "l", "i", "c", "e"], extra: ["s", "k"] },
    { w: "trace", parts: ["t", "r", "a", "c", "e"], extra: ["s", "ck"] },
    { w: "page", parts: ["p", "a", "g", "e"], extra: ["j", "i"] },
    { w: "twice", parts: ["t", "w", "i", "c", "e"], extra: ["s", "a"] },
  ],
  chains: [
    ["race", "pace", "page", "sage", "cage"],
    ["slice", "slick", "click", "clock"],
  ],
  heart: ["the", "a", "of", "to", "said", "we", "his", "is", "as", "they", "what", "one", "go", "are"],
  vaultFake: [["vace", "vack", "vake"], ["glage", "glag", "glack"], ["truge", "trug", "truck"], ["snice", "snick", "snack"]],
  inscriptions: [
    {
      title: "Crew log 13",
      text: "The code tube had a map cut on its base. Gus and Tam track it past the domes to a huge cave. Its walls are ice, as slick as glass. Gus can spot his face in the ice. At the back of the cave is a vast stage of stone, as wide as a ship. \"What is this place?\" said Tam.",
    },
    {
      title: "Crew log 14",
      text: "Gus and Tam step up on the stage. Its face is cut with rings, one in the next, like the rings on a slice of a log. At the hub of the rings is a cage of thin rods. Inside the cage is a slot the size of a page. Tam tugs the cage. It is shut. \"It is a lock,\" said Gus. \"It must take a code.\"",
    },
    {
      title: "Crew log 15",
      text: "Tam sets the tin note from the code tube in the slot. The cage clicks. The ice hums, and a trace of white flame races up the walls, ring on ring, to the top of the cave. The top is not ice. It is a vast hole, and past it is space, black and huge. \"This stage is a gate to space,\" said Gus.",
    },
    {
      title: "Crew log 16",
      text: "At the base of the stage, a slab slides back. Inside is a page of thin brass. Cut on it is a path: from this place, past the sun, to a pale dot in space. Next to the dot is the same flame from the lake gate. \"They did not just hide from the sun,\" said Tam. \"They went to the dot.\" Gus slips the page in his case. \"Then that is the next place we go.\"",
    },
  ],
  relic: { name: "The Space Page", caption: "A page of thin brass with a path cut on it: from the ice stage, past the sun, to a pale dot in space." },
  story: "Under the domes, the crew opens a huge ice stage that points up to space, and finds a brass page that shows where the builders went next.",
  spanish: "In Spanish, c before e or i also says /s/ in most of Latin America (cena, cine), so soft c is familiar. Soft g is not: Spanish ge sounds like a breathy /h/ (gente), so practice the /j/ in stage and huge.",
  miniLesson: {
    title: "Soft c and g: race, stage",
    steps: [
      "Write rack and race. Say: c followed by e says /s/. Do the same with stag and stage: g followed by e says /j/.",
      "Read together: lace, face, space, cage, page, huge. Students tap the ce or ge.",
      "Say a word (rag, rage, pack, pace). Students say hard or soft.",
      "Build race with letter cards, then change one letter at a time: race, pace, page, sage, cage.",
      "Read together: \"The ice stage is a gate to space.\"",
    ],
  },
};
