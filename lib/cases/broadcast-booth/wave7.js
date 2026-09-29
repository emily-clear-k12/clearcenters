// Broadcast Booth wave 7 — Grade 4 Science, part 4 (last) of the Science
// queue for Grade 4: SCI.4.12B-BB (forest food web), SCI.4.12C-BB (dinosaur
// tracks), SCI.4.13A-BB (plant structures), SCI.4.13B-BB (inherited and
// acquired traits). Registered from catalog.js. Each picture file is used by
// only one caption.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave7.md.
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

// 4.12B — a food web with the Sun, producers, consumers, and decomposers,
// on an East Texas forest floor. Not the creek food chain (3.12B).
export const FOOD_WEB = {
  id: "SCI.4.12B-BB",
  standard: "SCI.4.12B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.12B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Who eats what on the forest floor?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Food webs and decomposers",
  prompt: "You are live from a forest trail in the East Texas Piney Woods. Report where you are, how energy moves from the Sun through the food web, what the decomposers are doing, and why every part matters. Then sign off. This is not the creek.",
  cover: {
    headline: "Field Radio — Forest Desk",
    line: "Sun to leaf to squirrel to hawk, and back to the soil.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Forest trail kit",
    readAloud: true,
    sceneSetter: "You are here on a shady trail in the Piney Woods of East Texas. Tall pines and oaks are overhead, and the ground is covered in fallen leaves.",
    placeStill: still("bb-web-trail", "Piney Woods trail — you are here"),
    artifactCard: {
      title: "Field card",
      body: "Producers make food using the Sun's energy. Consumers eat plants or other animals. Decomposers break down dead plants and animals and return nutrients to the soil.",
      imageUrl: art("bb-web-card"),
    },
    bullets: [
      "The Sun gives energy to the oak trees, which are producers.",
      "A squirrel eats acorns from the oak. It is a consumer.",
      "A red-tailed hawk hunts the squirrel. It is a consumer too.",
      "Mushrooms and earthworms break down fallen leaves and dead logs. They are decomposers.",
      "The nutrients go back into the soil, and the oak uses them to grow.",
      "Many animals eat more than one thing, so the food chains cross into a web.",
    ],
  },
  brainstormChips: [
    chip("web_sun", "sunlight reaches the oak leaves", "bb-web-sun"),
    chip("web_squirrel", "a squirrel eats acorns", "bb-web-squirrel"),
    chip("web_hawk", "a hawk hunts the squirrel", "bb-web-hawk"),
    chip("web_mushroom", "mushrooms break down a dead log", "bb-web-mushroom"),
    chip("web_worm", "earthworms turn leaves back into soil", "bb-web-worm"),
  ],
  beatStems: {
    where: [
      stem("web_w1", "Reporting from a forest trail in the Piney Woods."),
      stem("web_w2", "The ground is covered in fallen leaves."),
    ],
    what_noticed: [
      stem("web_n1", "The oak uses sunlight to make food. The squirrel eats its acorns."),
      stem("web_n2", "The hawk hunts the squirrel, and the energy moves up the web."),
      stem("web_n3", "Mushrooms and worms are breaking down the dead leaves."),
    ],
    why_matters: [
      stem("web_y1", "Energy starts with the Sun and moves through the food web."),
      stem("web_y2", "Decomposers send matter back to the soil, so the oak can use it again."),
    ],
    sign_off: [
      stem("web_o1", "Forest Desk, signing off."),
      stem("web_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-web-trail", "The forest trail"),
    what_noticed: still("bb-web-mushroom", "Mushrooms at work"),
  }),
  samOpen: "Read the trail kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can describe how energy flows and matter cycles through a food web, including the roles of the Sun, producers, consumers, and decomposers.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.12B. From an East Texas forest trail, students trace energy from the Sun to oaks, squirrels, and hawks, and explain how mushrooms and earthworms return matter to the soil. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Mushrooms are not plants or producers; they are decomposers. Energy flows one way from the Sun, but matter cycles back through the soil. This is not the creek food chain.",
};

// 4.12C — a past environment from fossil evidence: dinosaur tracks at
// Dinosaur Valley State Park. Not fossils as evidence of past life (3.12D).
export const TRACKS = {
  id: "SCI.4.12C-BB",
  standard: "SCI.4.12C-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.12C",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: What was this place like long ago?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Past environments from fossil evidence",
  prompt: "You are live from the riverbed at Dinosaur Valley State Park. Report where you are, what fossil evidence you see, and what it tells us about this place about 113 million years ago. Then sign off.",
  cover: {
    headline: "Field Radio — Fossil Desk",
    line: "The rock remembers a beach that isn't here anymore.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Riverbed kit",
    readAloud: true,
    sceneSetter: "You are here in the bed of the Paluxy River at Dinosaur Valley State Park near Glen Rose, Texas. The water is low, and giant footprints show in the rock.",
    placeStill: still("bb-track-river", "Paluxy River at Dinosaur Valley — you are here"),
    artifactCard: {
      title: "Park sign",
      body: "About 113 million years ago, this area was at the edge of a sea. Dinosaurs walked across soft, limey mud near the shore. The mud hardened into the rock you see today.",
      imageUrl: art("bb-track-sign"),
    },
    bullets: [
      "Some tracks have three toes. They were made by a meat-eating dinosaur that walked on two legs.",
      "Other tracks are big and round. They were made by a giant plant-eating dinosaur with a long neck.",
      "The mud was made partly from the shells of sea animals.",
      "Tracks only stay when the mud is just right: not too wet and not too dry, like mud at the edge of the water.",
      "Today this place is a dry, hilly part of Texas, far from any sea.",
    ],
  },
  brainstormChips: [
    chip("trk_three", "three-toed tracks from a meat-eater", "bb-track-three"),
    chip("trk_round", "giant round tracks from a long-necked plant-eater", "bb-track-round"),
    chip("trk_shells", "tiny shell bits in the rock", "bb-track-shells"),
    chip("trk_mud", "the tracks were pressed into soft mud", "bb-track-mud"),
    chip("trk_today", "today it is dry hill country", "bb-track-today"),
  ],
  beatStems: {
    where: [
      stem("trk_w1", "Reporting from the Paluxy River at Dinosaur Valley State Park."),
      stem("trk_w2", "The water is low, and there are footprints in the rock."),
    ],
    what_noticed: [
      stem("trk_n1", "Three-toed tracks and giant round tracks cross the riverbed."),
      stem("trk_n2", "The rock was once mud made partly from sea shells."),
    ],
    why_matters: [
      stem("trk_y1", "The fossils tell us this was once muddy land at the edge of a sea."),
      stem("trk_y2", "The environment has changed a lot. Fossils let us see what it used to be."),
    ],
    sign_off: [
      stem("trk_o1", "Fossil Desk, signing off."),
      stem("trk_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-track-river", "The riverbed"),
    what_noticed: still("bb-track-three", "A three-toed track"),
  }),
  samOpen: "Read the riverbed kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can use fossil evidence, including Texas fossils, to describe what an environment was like long ago.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.12C. From the Paluxy River at Dinosaur Valley State Park, students use dinosaur tracks and shell-rich rock to describe a past environment: the muddy edge of a sea about 113 million years ago. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Tracks are fossils too, not just bones. The environment in the past can be very different from today: this dry hill country was once the muddy shore of a sea.",
};

// 4.13A — plant structures that help survival: waxy leaves, deep roots,
// thorns. Live oak and mesquite. Not the cactus (Desert Radio).
export const PLANT_PARTS = {
  id: "SCI.4.13A-BB",
  standard: "SCI.4.13A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.13A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: How do Texas trees survive a drought?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Plant structures and survival",
  prompt: "You are live on Field Radio. It hasn't rained in weeks, but the live oak and the mesquite still look fine. Explain which structures help each plant survive, and what each structure does. This is not about a cactus.",
  cover: {
    headline: "Field Radio — Plant Desk",
    line: "Every part of a plant has a job.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Drought notes",
    readAloud: true,
    bullets: [
      "A live oak's leaves are thick and shiny. A waxy coating keeps water from escaping.",
      "Live oaks keep green leaves almost all year.",
      "A mesquite has a long taproot. It can grow more than 100 feet down to reach water deep underground.",
      "Mesquite branches have sharp thorns that keep hungry animals from eating the leaves.",
      "Mesquite leaves are made of many tiny leaflets, so less water is lost from each one.",
    ],
  },
  brainstormChips: [
    chip("pp_wax", "the live oak's shiny, waxy leaves", "bb-plant-wax"),
    chip("pp_green", "the live oak stays green all year", "bb-plant-green"),
    chip("pp_root", "the mesquite's taproot reaches deep water", "bb-plant-root"),
    chip("pp_thorn", "sharp mesquite thorns keep animals away", "bb-plant-thorn"),
    chip("pp_leaflets", "tiny leaflets lose less water", "bb-plant-leaflets"),
  ],
  beatStems: {
    hook: [
      stem("pp_h1", "No rain for weeks, and these trees still look fine."),
      stem("pp_h2", "What is their secret?"),
    ],
    big_idea: [
      stem("pp_b1", "Plant structures help plants survive where they live."),
      stem("pp_b2", "Each structure has a job, like saving water or staying safe."),
    ],
    show_me: [
      stem("pp_s1", "The live oak's waxy leaves hold water in."),
      stem("pp_s2", "The mesquite's deep taproot reaches water far underground."),
    ],
    sign_off: [
      stem("pp_o1", "Plant Desk, signing off."),
      stem("pp_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain how plant structures, such as waxy leaves, deep roots, and thorns, help plants survive in their environment.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.13A. Using a live oak and a mesquite in a drought, students explain how waxy leaves, a deep taproot, tiny leaflets, and thorns help plants survive. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Plants do not choose or grow these structures because they need them; the structures are part of how the plant is built. Roots do more than hold the plant up; they take in water.",
};

// 4.13B — inherited versus acquired physical traits, using a ranch dog.
// Not instinct and learned behavior (5.13B).
export const TRAITS = {
  id: "SCI.4.13B-BB",
  standard: "SCI.4.13B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.13B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Born with it, or got it later?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Inherited and acquired traits",
  prompt: "You are live on Field Radio. Meet Pepper, a ranch dog. Explain which of her physical traits she inherited from her parents and which she acquired during her life. A trait is a feature of her body, not something she does.",
  cover: {
    headline: "Field Radio — Ranch Desk",
    line: "Some traits come from parents. Some come from life.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Pepper's file",
    readAloud: true,
    bullets: [
      "Pepper has a black-and-white coat, just like her mother.",
      "She has brown eyes, like both of her parents.",
      "Her ears stand up, like her father's ears.",
      "She has a scar on her leg from a scrape on a fence.",
      "Her legs are strong and muscular from running all day on the ranch.",
      "Inherited traits are passed from parents to their young. Acquired traits come from what happens during a life.",
    ],
  },
  brainstormChips: [
    chip("tr_coat", "a black-and-white coat like her mother's", "bb-trait-coat"),
    chip("tr_eyes", "brown eyes like both parents", "bb-trait-eyes"),
    chip("tr_ears", "ears that stand up like her father's", "bb-trait-ears"),
    chip("tr_scar", "a scar from a fence scrape", "bb-trait-scar"),
    chip("tr_legs", "strong legs from running every day", "bb-trait-legs"),
  ],
  beatStems: {
    hook: [
      stem("tr_h1", "Pepper looks a lot like her mom. But not everything about her came from her parents."),
      stem("tr_h2", "Was she born with it, or did she get it later?"),
    ],
    big_idea: [
      stem("tr_b1", "Inherited traits are passed down from parents."),
      stem("tr_b2", "Acquired traits come from what happens during a life."),
    ],
    show_me: [
      stem("tr_s1", "Her coat and her ears are inherited."),
      stem("tr_s2", "Her scar and her strong legs are acquired. Her puppies won't be born with them."),
    ],
    sign_off: [
      stem("tr_o1", "Ranch Desk, signing off."),
      stem("tr_o2", "Back to you."),
    ],
  },
  samOpen: "Read Pepper's file. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can tell the difference between inherited and acquired physical traits and give examples of each.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.13B. Using a ranch dog named Pepper, students sort physical traits into inherited (coat, eyes, ears) and acquired (a scar, strong muscles), and explain the difference. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An acquired trait, like a scar or strong muscles, is not passed to offspring. A trait here is a body feature, not a behavior like herding sheep.",
};

export const WAVE7_CASES = [FOOD_WEB, TRACKS, PLANT_PARTS, TRAITS];
