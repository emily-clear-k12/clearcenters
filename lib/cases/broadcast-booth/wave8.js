// Broadcast Booth wave 8 — Grade 3 Science, part 1 of the Science queue:
// SCI.3.6A-BB (measure and test properties), SCI.3.6B-BB (solids, liquids,
// gases), SCI.3.6D-BB (combining materials), SCI.3.7A-BB (contact and
// at-a-distance forces). Registered from catalog.js. Each picture file is used
// by only one caption. Grade 3 reading level: short sentences.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave8.md.
// While this is false, chips show their words only. Once every file in that
// request is saved under public/maker/broadcast/, set it to true.

const ART_READY = false;

function art(image) {
  return ART_READY ? `/maker/broadcast/${image}.png` : undefined;
}

function chip(id, label, image) {
  const imageUrl = art(image);
  return imageUrl
    ? { id, label, source: "stimulus", imageId: image, imageUrl }
    : { id, label, source: "stimulus" };
}

function still(image, caption) {
  const imageUrl = art(image);
  return imageUrl ? { imageUrl, caption } : undefined;
}

function stem(id, label) {
  return { id, label, source: "stem" };
}

function stills(map) {
  const out = {};
  Object.entries(map).forEach(([beat, value]) => { if (value) out[beat] = value; });
  return Object.keys(out).length ? out : undefined;
}

// 3.6A — measure, test, and record properties at a fall festival. Different
// objects from the Grade 4 mystery tray (4.6A).
export const PUMPKIN_TESTS = {
  id: "SCI.3.6A-BB",
  standard: "SCI.3.6A-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.6A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: The pumpkin patch tests",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Measuring and testing properties",
  prompt: "You are live on Field Radio at the fall festival. Explain how the class measured and tested a pumpkin, an apple, and a metal washer. Tell what they found out.",
  cover: {
    headline: "Field Radio — Festival Desk",
    line: "Measure it. Test it. Write it down.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Festival test chart",
    readAloud: true,
    bullets: [
      "The class tested a pumpkin, an apple, and a metal washer.",
      "Mass: The pumpkin has the most mass. The washer has the least.",
      "Sink or float: The pumpkin floats. The apple floats. The washer sinks.",
      "Magnet test: Only the washer sticks to the magnet.",
      "Temperature: The water in the tub was 20 degrees Celsius.",
      "They wrote every result on a chart.",
    ],
  },
  brainstormChips: [
    chip("pt_balance", "the balance shows the pumpkin has the most mass", "bb-pump-balance"),
    chip("pt_float", "the big pumpkin floats in the tub", "bb-pump-float"),
    chip("pt_sink", "the metal washer sinks", "bb-pump-sink"),
    chip("pt_magnet", "only the washer sticks to the magnet", "bb-pump-magnet"),
    chip("pt_chart", "the class writes results on a chart", "bb-pump-chart"),
  ],
  beatStems: {
    hook: [
      stem("pt_h1", "Can a giant pumpkin float?"),
      stem("pt_h2", "We tested it, and you might be surprised."),
    ],
    big_idea: [
      stem("pt_b1", "We can measure and test properties of matter."),
      stem("pt_b2", "Mass, temperature, magnetism, and sinking or floating are properties."),
    ],
    show_me: [
      stem("pt_s1", "The pumpkin has the most mass, but it still floats."),
      stem("pt_s2", "The washer sinks, and it sticks to the magnet."),
    ],
    sign_off: [
      stem("pt_o1", "Festival Desk, signing off."),
      stem("pt_o2", "Back to you."),
    ],
  },
  samOpen: "Read the chart. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can measure, test, and record properties of matter such as mass, temperature, magnetism, and sinking or floating.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.6A. At a fall festival, students report how a pumpkin, an apple, and a metal washer were measured and tested for mass, magnetism, sinking or floating, and temperature, and how the results were recorded. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Big or heavy does not always mean it sinks: the pumpkin has the most mass and still floats. Not all metals stick to magnets, but this steel washer does.",
};

// 3.6B — solids keep their shape; liquids and gases take the shape of their
// container. A lemonade stand. Not heating and cooling (3.6C).
export const SHAPES = {
  id: "SCI.3.6B-BB",
  standard: "SCI.3.6B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.6B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: What shape is lemonade?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Solids, liquids, and gases",
  prompt: "You are live on Field Radio from a lemonade stand. Explain how solids, liquids, and gases are different. Show which ones keep their shape and which ones take the shape of their container.",
  cover: {
    headline: "Field Radio — Lemonade Desk",
    line: "Some matter keeps its shape. Some matter fills the cup.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Lemonade stand notes",
    readAloud: true,
    bullets: [
      "An ice cube is a solid. It keeps its shape in any cup.",
      "Lemonade is a liquid. In the pitcher, it is pitcher-shaped.",
      "Pour it into a tall glass. Now it is glass-shaped.",
      "Air is a gas. It fills a round balloon and a long balloon.",
      "A gas spreads out to fill its whole container.",
    ],
  },
  brainstormChips: [
    chip("sh_ice", "the ice cube keeps its shape", "bb-shape-ice"),
    chip("sh_pitcher", "lemonade takes the shape of the pitcher", "bb-shape-pitcher"),
    chip("sh_glass", "poured in a tall glass, it changes shape", "bb-shape-glass"),
    chip("sh_round", "air fills a round balloon", "bb-shape-round"),
    chip("sh_long", "air fills a long balloon too", "bb-shape-long"),
  ],
  beatStems: {
    hook: [
      stem("sh_h1", "What shape is lemonade? It depends on the cup!"),
      stem("sh_h2", "Some things keep their shape. Some things do not."),
    ],
    big_idea: [
      stem("sh_b1", "A solid keeps its own shape."),
      stem("sh_b2", "Liquids and gases take the shape of their container."),
    ],
    show_me: [
      stem("sh_s1", "The ice cube stays a cube, but the lemonade changes shape."),
      stem("sh_s2", "Air fills a round balloon and a long balloon."),
    ],
    sign_off: [
      stem("sh_o1", "Lemonade Desk, signing off."),
      stem("sh_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can classify matter as solid, liquid, or gas and show that solids keep their shape while liquids and gases take the shape of their container.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.6B. At a lemonade stand, students compare an ice cube, lemonade poured into different containers, and air in two balloons to show how solids, liquids, and gases differ. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A liquid changes shape but not amount when it is poured. Air is matter even though we can't see it. This is not about melting or freezing.",
};

// 3.6D — combine materials by their properties and justify the choice. A
// maker fair tower and a sand-and-clay brick.
export const MAKER_TOWER = {
  id: "SCI.3.6D-BB",
  standard: "SCI.3.6D-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.6D",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Build it strong",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Combining materials by their properties",
  prompt: "You are live from the school maker fair. Report where you are, which materials the builders chose, and why each material's properties made it a good choice. Then sign off.",
  cover: {
    headline: "Field Radio — Maker Fair Desk",
    line: "Pick materials for what they can do.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Maker fair kit",
    readAloud: true,
    sceneSetter: "You are here at the school maker fair. One table has a tower challenge. Another table is making bricks.",
    placeStill: still("bb-make-fair", "The maker fair — you are here"),
    artifactCard: {
      title: "Builder's card",
      body: "Choose materials for their properties. Stiff things hold up weight. Heavy things keep a tower from tipping. Sticky things hold parts together.",
      imageUrl: art("bb-make-card"),
    },
    bullets: [
      "The tower team used stiff cardboard tubes. They stay straight.",
      "Paper straws bent too much, so the team did not use them.",
      "A lump of clay at the bottom kept the tower from tipping over.",
      "Tape held the tubes together.",
      "At the brick table, sand alone crumbled. Adding clay made the brick stronger.",
    ],
  },
  brainstormChips: [
    chip("mk_tubes", "stiff cardboard tubes stay straight", "bb-make-tubes"),
    chip("mk_straws", "paper straws bend too much", "bb-make-straws"),
    chip("mk_clay", "heavy clay keeps the tower from tipping", "bb-make-clay"),
    chip("mk_tape", "tape holds the parts together", "bb-make-tape"),
    chip("mk_brick", "clay plus sand makes a stronger brick", "bb-make-brick"),
  ],
  beatStems: {
    where: [
      stem("mk_w1", "Reporting from the school maker fair."),
      stem("mk_w2", "The tower table is busy today."),
    ],
    what_noticed: [
      stem("mk_n1", "The team chose stiff tubes, not bendy straws."),
      stem("mk_n2", "They put heavy clay at the bottom so it would not tip."),
      stem("mk_n3", "Sand alone crumbled. Sand and clay made a strong brick."),
    ],
    why_matters: [
      stem("mk_y1", "Builders pick materials because of their properties."),
      stem("mk_y2", "Putting materials together can make something stronger."),
    ],
    sign_off: [
      stem("mk_o1", "Maker Fair Desk, signing off."),
      stem("mk_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-make-fair", "The maker fair"),
    what_noticed: still("bb-make-tubes", "The tower"),
  }),
  samOpen: "Read the kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can combine materials to build or change an object and explain why I chose each material because of its properties.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.6D. At a school maker fair, students report why builders chose stiff tubes, a heavy clay base, and tape for a tower, and why clay makes a sand brick stronger. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The best material is the one whose properties fit the job, not the biggest or the prettiest. A good builder can say why each material was chosen.",
};

// 3.7A — forces that touch and forces that act at a distance: a push, a pull,
// gravity, and a magnet. Not the playground (3.7B), not friction (4.7).
export const FORCES_TOUCH = {
  id: "SCI.3.7A-BB",
  standard: "SCI.3.7A-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.7A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Can a force work without touching?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Contact forces and forces at a distance",
  prompt: "You are live on Field Radio. A paper clip is floating in the air on a thread, and nothing is touching it! Explain which forces need to touch an object and which forces can act from a distance.",
  cover: {
    headline: "Field Radio — Force Desk",
    line: "Some forces touch. Some forces reach.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Force desk notes",
    readAloud: true,
    bullets: [
      "A force is a push or a pull.",
      "When you push a door, your hand touches it. That is a contact force.",
      "When you pull a wagon by its handle, you are touching it too.",
      "A magnet pulls a paper clip toward it without touching it. The clip hangs in the air on a thread.",
      "Gravity pulls a dropped ball down to the ground. Nothing touches the ball.",
      "Magnetism and gravity can act at a distance.",
    ],
  },
  brainstormChips: [
    chip("ft_door", "a hand pushes a door open", "bb-ft-door"),
    chip("ft_wagon", "a pull on the handle moves the wagon", "bb-ft-wagon"),
    chip("ft_clip", "a magnet holds a paper clip in the air", "bb-ft-clip"),
    chip("ft_ball", "gravity pulls a dropped ball down", "bb-ft-ball"),
    chip("ft_apple", "an apple falls from the tree", "bb-ft-apple"),
  ],
  beatStems: {
    hook: [
      stem("ft_h1", "This paper clip is floating, and nothing is touching it."),
      stem("ft_h2", "How can a force work without touching?"),
    ],
    big_idea: [
      stem("ft_b1", "A force is a push or a pull."),
      stem("ft_b2", "Some forces touch the object. Magnetism and gravity can act from a distance."),
    ],
    show_me: [
      stem("ft_s1", "My hand touches the door when I push it."),
      stem("ft_s2", "The magnet pulls the clip, and gravity pulls the ball, without touching."),
    ],
    sign_off: [
      stem("ft_o1", "Force Desk, signing off."),
      stem("ft_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can describe forces that act by touching an object and forces that act at a distance, such as magnetism and gravity.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.7A. Students compare contact forces (pushing a door, pulling a wagon) with forces that act at a distance (a magnet holding a paper clip in the air, gravity pulling a dropped ball). Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Gravity is a force even though you can't see or feel it touching. A force does not have to touch an object to push or pull it.",
};

export const WAVE8_CASES = [PUMPKIN_TESTS, SHAPES, MAKER_TOWER, FORCES_TOUCH];
