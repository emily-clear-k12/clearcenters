// Broadcast Booth first-wave cases. Registered from catalog.js.
// Each picture file is used by only one caption.

function chip(id, label, image) {
  return { id, label, source: "stimulus", imageId: image, imageUrl: `/maker/broadcast/${image}.png` };
}

function stem(id, label) {
  return { id, label, source: "stem" };
}

export const DAY_NIGHT = {
  id: "SCI.5.9-BB",
  standard: "SCI.5.9-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  teks: "SCI.5.9",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Why do we have day and night?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Earth's rotation",
  prompt: "You are live on Field Radio. Explain why we have day and night. Earth spins about once every 24 hours. Use Hook, Big idea, Show me, and Sign off.",
  cover: {
    headline: "Field Radio — Sky Desk",
    line: "Four short clips. Tell why one side of Earth is bright and the other is dark.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Sky desk notes",
    readAloud: true,
    bullets: [
      "Earth rotates, or spins, about once every 24 hours.",
      "The side facing the Sun has day.",
      "The side facing away from the Sun has night.",
      "The Sun is not racing around Earth. Earth is the one spinning.",
    ],
  },
  brainstormChips: [
    chip("day_half", "half of Earth is in daylight", "bb-day-half"),
    chip("day_sunrise", "sunrise on the horizon", "bb-day-sunrise"),
    chip("day_stars", "stars after the spin turns us away", "bb-day-stars"),
    chip("day_shadow", "a long afternoon shadow", "bb-day-shadow"),
    chip("day_noon", "short shadows at noon", "bb-day-noon"),
  ],
  beatStems: {
    hook: [
      stem("day_h1", "Why is it dark on the other side of Earth?"),
      stem("day_h2", "The Sun did not leave. We turned."),
    ],
    big_idea: [
      stem("day_b1", "Earth's spin causes day and night."),
      stem("day_b2", "One full spin takes about 24 hours."),
    ],
    show_me: [
      stem("day_s1", "Your side faces the Sun, so it is day."),
      stem("day_s2", "Shadows move because Earth rotates, not because the Sun flies around the flagpole."),
    ],
    sign_off: [
      stem("day_o1", "Sky Desk, signing off."),
      stem("day_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record one part at a time.",
  learning_target: "I can explain that Earth rotates about once every 24 hours and that this spin causes day and night.",
  lesson_summary: "Grade 5 Explain broadcast. Standard: Earth rotates on its axis about once every 24 hours, causing the day and night cycle. Students plan with picture chips, then record. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Sun does not orbit the school each day, and it does not turn off at night. Night is the side of Earth facing away from the Sun.",
};

export const FORCES = {
  id: "SCI.5.7A-BB",
  standard: "SCI.5.7A-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  teks: "SCI.5.7A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Why did it move?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Balanced and unbalanced forces",
  prompt: "You are live on Field Radio. Explain why an object starts moving, stops, or stays put. Talk about balanced and unbalanced forces.",
  cover: {
    headline: "Field Radio — Motion Desk",
    line: "Four short clips. A force is a push or a pull.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Motion desk notes",
    readAloud: true,
    bullets: [
      "A force is a push or a pull.",
      "Balanced forces are equal and opposite. The motion does not change.",
      "Unbalanced forces are not equal. The stronger force changes the motion.",
      "A change can start, stop, speed up, slow down, or turn the object.",
    ],
  },
  brainstormChips: [
    chip("force_still", "equal forces, the book stays put", "bb-force-still"),
    chip("force_equal", "equal pulls, the block stays", "bb-force-equal"),
    chip("force_wagon", "an unbalanced force, the wagon rolls", "bb-force-wagon"),
    chip("force_magnet", "a magnet pulls without touching", "bb-force-magnet"),
    chip("force_ramp", "the ball stays until a force starts it", "bb-force-ramp"),
  ],
  beatStems: {
    hook: [
      stem("force_h1", "Nothing moved until the forces stopped matching."),
      stem("force_h2", "Why is that book still sitting there?"),
    ],
    big_idea: [
      stem("force_b1", "Balanced forces do not change the motion."),
      stem("force_b2", "Unbalanced forces do change the motion."),
    ],
    show_me: [
      stem("force_s1", "The wagon rolled because the pull was stronger than the forces holding it still."),
      stem("force_s2", "Two equal pulls leave the block where it is."),
    ],
    sign_off: [
      stem("force_o1", "Motion Desk, signing off."),
      stem("force_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain that balanced forces do not change motion and unbalanced forces do.",
  lesson_summary: "Grade 5 Explain broadcast on balanced and unbalanced forces. Students plan with picture chips, then record. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A still object can have forces on it. They are balanced. A moving object does not need a constant extra force just to keep the same speed.",
};

export const CIRCUIT = {
  id: "SCI.4.8C-BB",
  standard: "SCI.4.8C-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.8C",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Why is the bulb lit?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Closed circuits",
  prompt: "You are live on Field Radio. Explain why a bulb lights only when the circuit is a closed loop.",
  cover: {
    headline: "Field Radio — Power Desk",
    line: "Four short clips. Electricity needs a complete path.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Power desk notes",
    readAloud: true,
    bullets: [
      "A circuit is a path for electricity.",
      "In a closed circuit, the path is complete, so the bulb can light.",
      "In an open circuit, there is a gap, so the bulb stays dark.",
      "A switch closes the path or opens a gap.",
    ],
  },
  brainstormChips: [
    chip("circ_closed", "the loop is closed and the bulb is lit", "bb-circuit-closed"),
    chip("circ_open", "the loop is open and the bulb is dark", "bb-circuit-open"),
    chip("circ_bulb", "the bulb glows when the path is complete", "bb-circuit-bulb"),
    chip("circ_switch", "the switch is closed, so the path connects", "bb-circuit-switch"),
  ],
  beatStems: {
    hook: [
      stem("circ_h1", "The bulb was dark until the last wire snapped on."),
      stem("circ_h2", "Why won't it light?"),
    ],
    big_idea: [
      stem("circ_b1", "Electricity needs a closed path."),
      stem("circ_b2", "A gap means an open circuit."),
    ],
    show_me: [
      stem("circ_s1", "Battery, wires, and bulb make one loop, so the bulb lights."),
      stem("circ_s2", "Unclip one wire and the bulb goes dark."),
    ],
    sign_off: [
      stem("circ_o1", "Power Desk, signing off."),
      stem("circ_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain that a bulb lights when the circuit is closed and stays dark when the circuit is open.",
  lesson_summary: "Grade 4 Explain broadcast. Electricity travels in a closed path and can produce light. Students plan with picture chips, then record. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The battery does not send electricity only to the bulb and stop. The path has to come back. An open switch is a gap, not a closed path.",
};

export const STATES = {
  id: "SCI.3.6C-BB",
  standard: "SCI.3.6C-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.6C",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: What does heat do to water?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Heating and cooling change the state of water",
  prompt: "You are live on Field Radio. Explain what heating and cooling do to water. Talk about ice, liquid water, and water vapor. This is not the water cycle.",
  cover: {
    headline: "Field Radio — Kitchen Desk",
    line: "Four short clips. Heat and cold can change water's state.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Kitchen desk notes",
    readAloud: true,
    bullets: [
      "Ice is solid water.",
      "Heating ice can melt it into liquid water.",
      "More heat can turn liquid water into water vapor, a gas.",
      "Cooling can turn water vapor into liquid drops, or freeze liquid water into ice.",
    ],
  },
  brainstormChips: [
    chip("mat_ice", "ice is solid water", "bb-matter-ice"),
    chip("mat_liquid", "liquid water in a glass", "bb-matter-liquid"),
    chip("mat_vapor", "heat makes water vapor", "bb-matter-vapor"),
    chip("mat_melt", "ice melting into liquid water", "bb-matter-melt"),
    chip("mat_frost", "cooling makes frost on the window", "bb-matter-frost"),
    chip("mat_puddle", "a sunny puddle drying up", "bb-matter-puddle"),
  ],
  beatStems: {
    hook: [
      stem("mat_h1", "The ice cube is getting smaller."),
      stem("mat_h2", "Where did the water go?"),
    ],
    big_idea: [
      stem("mat_b1", "Heating and cooling can change water's state."),
      stem("mat_b2", "Solid, liquid, and gas are three states."),
    ],
    show_me: [
      stem("mat_s1", "Heat melts ice into liquid water."),
      stem("mat_s2", "More heat turns liquid water into water vapor."),
    ],
    sign_off: [
      stem("mat_o1", "Kitchen Desk, signing off."),
      stem("mat_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain that heating and cooling can change water from ice to liquid water to water vapor.",
  lesson_summary: "Grade 3 Explain broadcast. Heating or cooling can change the state of water. This is not a water-cycle lesson. Students plan with picture chips, then record. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Melting is not disappearing. The water is still there as a liquid. The white cloud by a kettle is water leaving as a gas and cooling into tiny drops.",
};

export const WAVE1_CASES = [DAY_NIGHT, FORCES, CIRCUIT, STATES];

export const INSTINCT = {
  id: "SCI.5.13B-BB",
  standard: "SCI.5.13B-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  teks: "SCI.5.13B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Born knowing, or taught?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Instinct and learned behavior",
  prompt: "You are live from the wildlife overlook. Report where you are, one behavior an animal is born knowing, one behavior a person taught, why that difference matters, and then sign off.",
  cover: {
    headline: "Field Radio — Wildlife Desk",
    line: "Four short clips. A behavior is what an animal does, not a body part.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Wildlife overlook kit",
    readAloud: true,
    sceneSetter: "You are here on a wooden overlook above a quiet marsh. Your notes compare animals that act on their own with animals that were taught.",
    placeStill: { imageUrl: "/maker/broadcast/bb-behav-overlook.png", caption: "Wildlife overlook — you are here" },
    artifactCard: {
      title: "Field card",
      body: "Instinct is a behavior an animal is born knowing. Learned behavior is taught by practice or by another animal, including a person. A shell is a body part, not a behavior.",
      imageUrl: "/maker/broadcast/bb-behav-binoculars.png",
    },
    bullets: [
      "Sea turtle hatchlings crawl toward the ocean on their own. Nobody teaches them.",
      "A spider spins a web the first time. That is instinct.",
      "A dog that sits for a treat was taught. That is learned.",
      "A horse that walks to a feed bucket was taught too.",
    ],
  },
  brainstormChips: [
    chip("beh_turtles", "hatchlings crawl to the ocean on their own", "bb-behav-turtles"),
    chip("beh_web", "a spider spins its first web", "bb-behav-web"),
    chip("beh_dog", "a dog sits because it was taught", "bb-behav-dog"),
    chip("beh_horse", "a horse walks to the bucket it was taught to find", "bb-behav-horse"),
  ],
  beatStems: {
    where: [
      stem("beh_w1", "Reporting from the wildlife overlook."),
      stem("beh_w2", "The marsh is quiet. The notes are about behavior."),
    ],
    what_noticed: [
      stem("beh_n1", "The hatchlings head for the water with no teacher."),
      stem("beh_n2", "The dog sits only after it has been taught."),
    ],
    why_matters: [
      stem("beh_y1", "Instinct and learning both help an animal survive."),
      stem("beh_y2", "A shell is a body part. Sitting on command is a behavior."),
    ],
    sign_off: [
      stem("beh_o1", "Wildlife Desk, signing off."),
      stem("beh_o2", "Back to you."),
    ],
  },
  overlayStills: {
    where: { imageUrl: "/maker/broadcast/bb-behav-overlook.png", caption: "The overlook" },
    what_noticed: { imageUrl: "/maker/broadcast/bb-behav-turtles.png", caption: "Hatchlings heading for the water" },
  },
  samOpen: "Read the kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can report the difference between a behavior an animal is born knowing and a behavior it was taught.",
  lesson_summary: "Grade 5 Correspondent broadcast. Students compare instinct and learned behavior, then record. A body part is not a behavior. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A dog sitting for a treat is learned, not instinct. A turtle's shell is a body part, not a behavior. This report is not a food chain.",
};

export const ENERGY = {
  id: "SCI.4.11A-BB",
  standard: "SCI.4.11A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.11A",
  kicker: "Broadcast Booth · Debate",
  title: "Field Radio: How should the town get power?",
  estimatedMinutes: 28,
  segmentType: "debate",
  topic: "Renewable and nonrenewable energy",
  sideALabel: "Wind and sunlight",
  sideBLabel: "Natural gas",
  prompt: "Live debate: Should the town get more of its power from wind and sunlight, or from natural gas? Give both sides a fair case. This is not a dam debate.",
  cover: {
    headline: "Field Radio — Power Debate",
    line: "Both sides get real advantages and real problems.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Town power notes",
    readAloud: true,
    sharedContext: "The town needs power in the daytime and at night. A resource is renewable if nature can replace it in a short time. Coal, oil, and natural gas took millions of years to form, so they are nonrenewable.",
    sideBriefs: {
      sideA: {
        label: "Wind and sunlight",
        bullets: [
          "Nature replaces wind and sunlight. They will not run out.",
          "Using them makes no smoke.",
          "On a calm day, wind makes little power. At night, solar panels make none.",
        ],
      },
      sideB: {
        label: "Natural gas",
        bullets: [
          "A gas flame works any time, day or night, calm or stormy.",
          "It burns cleaner than coal, but it still pollutes.",
          "It will run out. Nature cannot replace it in our lifetime.",
        ],
      },
    },
  },
  brainstormChips: [
    chip("en_wind", "wind can make power without smoke", "bb-energy-wind"),
    chip("en_calm", "a calm day means little wind power", "bb-energy-calm"),
    chip("en_solar", "sunlight can make power on a bright day", "bb-energy-solar"),
    chip("en_night", "solar panels make no power at night", "bb-energy-night"),
    chip("en_gas", "natural gas can burn any time", "bb-energy-gas"),
    chip("en_town", "the town still needs lights at night", "bb-energy-town"),
  ],
  beatStems: {
    side_a: [
      stem("en_a1", "Wind and sunlight come back. They will not run out."),
      stem("en_a2", "They make power without smoke."),
    ],
    side_b: [
      stem("en_b1", "Natural gas works on a calm, dark night."),
      stem("en_b2", "It will run out, and burning it still pollutes."),
    ],
    what_i_think: [
      stem("en_t1", "The town may need more than one source."),
      stem("en_t2", "A fair choice names both the good and the bad."),
    ],
    sign_off: [
      stem("en_o1", "Power Desk, signing off."),
      stem("en_o2", "Back to you."),
    ],
  },
  overlayStills: {
    side_a: { imageUrl: "/maker/broadcast/bb-energy-wind.png", caption: "Wind" },
    side_b: { imageUrl: "/maker/broadcast/bb-energy-gas.png", caption: "Natural gas" },
  },
  samOpen: "Read both briefs. Put at least one chip on each side, then record.",
  learning_target: "I can compare renewable and nonrenewable resources and give a fair reason for each side.",
  lesson_summary: "Grade 4 Debate. Wind and sunlight are renewable. Natural gas is nonrenewable. Both sides stay fair. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Coming from nature does not make a resource renewable. Natural gas is from nature, and it still runs out. Renewable does not mean perfect.",
};

export const INFERENCE = {
  id: "ELA.3.6F-BB",
  standard: "ELA.3.6F-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "ELAR",
  teks: "ELA.3.6F",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: The story never says the feeling",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Inference",
  prompt: "You are live on Field Radio. The story never says Marco is angry. Explain how we can still tell how he feels.",
  cover: {
    headline: "Field Radio — Book Desk",
    line: "Look at what the character does. The feeling word is not in the story.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "After the game",
    readAloud: true,
    bullets: [
      "Marco's team lost the championship, 3 to 2.",
      "At home, the front door shut hard.",
      "A picture on the wall was knocked crooked.",
      "His backpack dropped in the hall.",
      "Mom asked, \"How was the game?\" Marco walked past her and up the stairs.",
      "The story never uses the word angry.",
    ],
  },
  brainstormChips: [
    chip("inf_door", "he came home and shut the door", "bb-infer-door"),
    chip("inf_frame", "a picture was knocked crooked", "bb-infer-frame"),
    chip("inf_bag", "his backpack dropped in the hall", "bb-infer-bag"),
    chip("inf_stairs", "he walked up the stairs without answering", "bb-infer-stairs"),
  ],
  beatStems: {
    hook: [
      stem("inf_h1", "The story never says the word angry."),
      stem("inf_h2", "So how do we know how Marco feels?"),
    ],
    big_idea: [
      stem("inf_b1", "Authors show feelings by what characters do."),
      stem("inf_b2", "An inference uses clues from the text."),
    ],
    show_me: [
      stem("inf_s1", "The crooked picture and the dropped bag are clues."),
      stem("inf_s2", "He does not answer Mom. That is a clue too."),
    ],
    sign_off: [
      stem("inf_o1", "Book Desk, signing off."),
      stem("inf_o2", "Back to you."),
    ],
  },
  samOpen: "Read the story notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can make an inference about a character's feelings and point to evidence in the story.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.6F: make inferences and use evidence. The story never names the feeling. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Students may think a feeling is not allowed unless the story uses that word. The clues are what Marco does.",
};

export const THEME = {
  id: "ELA.5.8A-BB",
  standard: "ELA.5.8A-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  teks: "ELA.5.8A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: What is the play really about?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Theme",
  prompt: "You are live on Field Radio. Explain two themes of the play Lucia Plays Solo. A theme is a message that could be true outside the story. Do not stop at the plot.",
  cover: {
    headline: "Field Radio — Drama Desk",
    line: "Themes, with an S. Use evidence from the play.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Lucia Plays Solo",
    readAloud: true,
    bullets: [
      "Scene 1: Lucia is new. She sits alone with her trumpet case and says she is not ready for tryouts.",
      "Scene 2: Months later, she steps to the microphone for her first solo. Her hands are shaking. She plays anyway.",
      "When she finishes, the whole band stands and cheers.",
      "The plot is what happens. A theme is a lesson that could fit other people too.",
    ],
  },
  brainstormChips: [
    chip("th_case", "Lucia sits alone with her trumpet case", "bb-theme-case"),
    chip("th_mic", "she steps to the microphone even though it is scary", "bb-theme-mic"),
    chip("th_stands", "the band stands for her", "bb-theme-stands"),
    chip("th_horn", "she plays the solo", "bb-theme-trumpet"),
  ],
  beatStems: {
    hook: [
      stem("th_h1", "Retelling the play is not the same as naming a theme."),
      stem("th_h2", "The question asks for themes. More than one."),
    ],
    big_idea: [
      stem("th_b1", "A theme is a message that could be true outside this play."),
      stem("th_b2", "This play has more than one theme."),
    ],
    show_me: [
      stem("th_s1", "Trying something scary can help you belong."),
      stem("th_s2", "The evidence is the empty table, the shaking start, and the band standing up."),
    ],
    sign_off: [
      stem("th_o1", "Drama Desk, signing off."),
      stem("th_o2", "Back to you."),
    ],
  },
  samOpen: "Read the play notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can infer more than one theme and support each theme with evidence from the text.",
  lesson_summary: "Grade 5 Explain broadcast. TEKS 5.8A: infer multiple themes using text evidence. Plot is not a theme. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "\"Lucia moved, joined band, and played a solo\" is the plot. A theme reaches beyond this one play.",
};

export const ARGUMENT = {
  id: "ELA.5.9E-BB",
  standard: "ELA.5.9E-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  teks: "ELA.5.9E",
  kicker: "Broadcast Booth · Debate",
  title: "Field Radio: Which facts support the claim?",
  estimatedMinutes: 28,
  segmentType: "debate",
  topic: "Facts for and against an argument",
  sideALabel: "Facts for a class pet",
  sideBLabel: "Facts against a class pet",
  prompt: "Live debate on Marisol's claim: our class should get a class pet. Give facts for the claim and facts against it. Then say which side the facts support. A loud opinion is not a fact.",
  cover: {
    headline: "Field Radio — Argument Desk",
    line: "Facts for the claim. Facts against it. Then say what the facts support.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Marisol's claim",
    readAloud: true,
    sharedContext: "Marisol's claim is that the class should get a class pet. \"Pets are amazing and everyone loves them\" is an opinion. A fact can support a claim or work against it. A true fact that does not connect to this class is not strong evidence.",
    sideBriefs: {
      sideA: {
        label: "Facts for a class pet",
        bullets: [
          "Someone would feed the pet, clean the cage, and check on it every school day.",
          "That daily care is a fact about responsibility, and it connects to the claim.",
        ],
      },
      sideB: {
        label: "Facts against a class pet",
        bullets: [
          "The pet would still need care on nights and weekends, when the class is not at school.",
          "Some students may be allergic. That fact works against keeping a pet in the room.",
        ],
      },
    },
  },
  brainstormChips: [
    chip("arg_pet", "the claim is a class pet", "bb-arg-pet"),
    chip("arg_care", "daily feeding and cleaning is a fact for the claim", "bb-arg-care"),
    chip("arg_night", "the pet is still there when the class goes home", "bb-arg-night"),
    chip("arg_tissue", "allergies are a fact against a pet in the room", "bb-arg-tissue"),
  ],
  beatStems: {
    side_a: [
      stem("arg_a1", "Daily care is a fact, and it connects to the claim."),
      stem("arg_a2", "\"Everyone loves pets\" is an opinion, not a fact."),
    ],
    side_b: [
      stem("arg_b1", "Weekend care is a fact against the claim."),
      stem("arg_b2", "Allergies are a fact against keeping the pet in the room."),
    ],
    what_i_think: [
      stem("arg_t1", "The stronger side is the one whose facts connect to this class."),
      stem("arg_t2", "A true fact about ancient Egypt does not help this claim."),
    ],
    sign_off: [
      stem("arg_o1", "Argument Desk, signing off."),
      stem("arg_o2", "Back to you."),
    ],
  },
  overlayStills: {
    side_a: { imageUrl: "/maker/broadcast/bb-arg-care.png", caption: "Daily care" },
    side_b: { imageUrl: "/maker/broadcast/bb-arg-night.png", caption: "After school" },
  },
  samOpen: "Read both briefs. Put at least one chip on each side, then record.",
  learning_target: "I can explain which facts an author uses for an argument and which facts work against it.",
  lesson_summary: "Grade 5 Debate. TEKS 5.9E: explain how an author uses facts for or against an argument. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The loudest line is not the strongest evidence. A fact has to connect to the claim.",
};

export const WAVE1_NEXT = [ENERGY, INFERENCE, THEME, ARGUMENT];

export const MULTIPLY = {
  id: "MA.3.5B-BB",
  standard: "MA.3.5B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Math",
  teks: "MA.3.5B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Six tables of cupcakes",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Multiplication with an array",
  prompt: "You are live on Field Radio. There are 6 tables. Each table has 4 cupcakes. Explain how many cupcakes there are altogether. The product stays within 100.",
  cover: {
    headline: "Field Radio — Bake Sale Desk",
    line: "Equal groups. Do not add 6 and 4.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Bake sale notes",
    readAloud: true,
    bullets: [
      "There are 6 tables.",
      "Each table has 4 cupcakes.",
      "Every table has the same number. These are equal groups.",
      "An array lines them up: 6 rows of 4.",
      "6 times 4 is 24. Adding 6 and 4 makes 10, and that is not the number of cupcakes.",
    ],
  },
  brainstormChips: [
    chip("mul_group", "4 cupcakes in one equal group", "bb-mult-group"),
    chip("mul_array", "6 rows of 4 cupcakes", "bb-mult-array"),
  ],
  beatStems: {
    hook: [
      stem("mul_h1", "Altogether does not always mean add."),
      stem("mul_h2", "Six tables. Four on each one."),
    ],
    big_idea: [
      stem("mul_b1", "Equal groups tell us to multiply."),
      stem("mul_b2", "6 groups of 4 is 6 times 4."),
    ],
    show_me: [
      stem("mul_s1", "The array shows 6 rows with 4 in each row."),
      stem("mul_s2", "That is 24 cupcakes, not 10."),
    ],
    sign_off: [
      stem("mul_o1", "Bake Sale Desk, signing off."),
      stem("mul_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can solve a multiplication problem within 100 and show it with an array.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.5B: one multiplication problem within 100, shown as an array. 6 groups of 4 is 24. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The word altogether can show up in addition or multiplication. Here the tables are equal groups, so 6 plus 4 is the wrong move.",
};

export const FRACTIONS = {
  id: "MA.4.3E-BB",
  standard: "MA.4.3E-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Math",
  teks: "MA.4.3E",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Three eighths plus two eighths",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Add fractions with the same denominator",
  prompt: "You are live on Field Radio. Priya hiked 3/8 of the trail in the morning and 2/8 after lunch. Explain how much of the trail she hiked in all. The pieces stay eighths.",
  cover: {
    headline: "Field Radio — Trail Desk",
    line: "Same denominator. Add the pieces. Do not add the 8s.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Trail notes",
    readAloud: true,
    bullets: [
      "The trail is split into 8 equal sections. Each section is 1/8.",
      "Priya hiked 3 of those sections in the morning.",
      "She hiked 2 more sections after lunch.",
      "The sections stay the same size, so the denominator stays 8.",
      "3/8 plus 2/8 is 5/8. It is not 5/16.",
    ],
  },
  brainstormChips: [
    chip("fr_eighths", "the trail is 8 equal sections", "bb-frac-eighths"),
    chip("fr_morning", "3 of the 8 sections in the morning", "bb-frac-morning"),
    chip("fr_total", "3 sections plus 2 more is 5 eighths", "bb-frac-total"),
  ],
  beatStems: {
    hook: [
      stem("fr_h1", "The trail is already cut into equal eighths."),
      stem("fr_h2", "Morning was 3/8. After lunch was 2/8."),
    ],
    big_idea: [
      stem("fr_b1", "When the denominators match, add the numerators."),
      stem("fr_b2", "The size of each piece does not change."),
    ],
    show_me: [
      stem("fr_s1", "Three yellow sections plus two green sections is five sections."),
      stem("fr_s2", "Five out of eight is 5/8, not 5/16."),
    ],
    sign_off: [
      stem("fr_o1", "Trail Desk, signing off."),
      stem("fr_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can add two fractions with the same denominator and explain why the denominator stays the same.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.3E: add fractions with equal denominators using a picture. 3/8 + 2/8 = 5/8. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Adding the denominators makes the pieces smaller. 5/16 is less than the 3/8 Priya had already hiked by lunch, so it cannot be the total.",
};

export const COMMUNITIES = {
  id: "SS.3.2B-BB",
  standard: "SS.3.2B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Social Studies",
  teks: "SS.3.2B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Same need, different way",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Communities meet the same needs in different ways",
  prompt: "You are live comparing two communities. Report where you are looking, one need they both have, how each community meets it, and why the solutions can be different.",
  cover: {
    headline: "Field Radio — Community Desk",
    line: "Same needs. Different places. Different solutions.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Two community cards",
    readAloud: true,
    sceneSetter: "You are here with two cards on the desk. One is a town with roads. One is a small island. Both have schools, a way to travel, a way to share news, and a place to play.",
    placeStill: { imageUrl: "/maker/broadcast/bb-com-bus.png", caption: "This town uses buses and roads" },
    artifactCard: {
      title: "Island card",
      body: "The island has the same needs. Water changes some of the choices. A ferry carries people, mail, and supplies.",
      imageUrl: "/maker/broadcast/bb-com-ferry.png",
    },
    bullets: [
      "Both communities need transportation, communication, and a place to play.",
      "The town uses buses and roads. The island also uses a ferry.",
      "The town has a library. The ferry also carries mail and supplies to the island.",
      "The town has a sports field. The island uses a beach and a community field.",
    ],
  },
  brainstormChips: [
    chip("com_bus", "this town uses buses and roads", "bb-com-bus"),
    chip("com_ferry", "this island uses a ferry", "bb-com-ferry"),
    chip("com_library", "a library helps people share news and books", "bb-com-library"),
    chip("com_mail", "the ferry also carries mail and supplies", "bb-com-mail"),
    chip("com_field", "the town has a sports field", "bb-com-field"),
    chip("com_beach", "the island uses a beach and a field", "bb-com-beach"),
  ],
  beatStems: {
    where: [
      stem("com_w1", "Reporting from a desk with two community cards."),
      stem("com_w2", "One card is a town. One card is an island."),
    ],
    what_noticed: [
      stem("com_n1", "Both places need a way to travel."),
      stem("com_n2", "The town uses buses. The island uses a ferry."),
    ],
    why_matters: [
      stem("com_y1", "The same need can have a different solution."),
      stem("com_y2", "Water changes what works on the island."),
    ],
    sign_off: [
      stem("com_o1", "Community Desk, signing off."),
      stem("com_o2", "Back to you."),
    ],
  },
  overlayStills: {
    where: { imageUrl: "/maker/broadcast/bb-com-bus.png", caption: "The town" },
    what_noticed: { imageUrl: "/maker/broadcast/bb-com-ferry.png", caption: "The island ferry" },
  },
  samOpen: "Read both cards. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can explain how two communities meet the same need in different ways.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.2B: the same community needs can have different solutions. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Needing the same thing does not mean using the same solution. The land and the water change what works.",
};

export const SUPPLY = {
  id: "SS.4.10A-BB",
  standard: "SS.4.10A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Social Studies",
  teks: "SS.4.10A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: The lemonade puzzle",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Supply and demand",
  prompt: "You are live on Field Radio. Explain how supply and demand together can change the price of lemonade and whether any is left. High demand does not always raise the price.",
  cover: {
    headline: "Field Radio — Fair Desk",
    line: "Demand is how many people want it. Supply is how much there is.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Fair notes",
    readAloud: true,
    bullets: [
      "Demand is how many buyers want lemonade.",
      "Supply is how much lemonade the stand has.",
      "One stand has only a little left, and many cups are waiting.",
      "Another stand has several full pitchers, so there is plenty.",
      "A seller might raise the price, make more, or sell out. High demand by itself does not force the price up.",
    ],
  },
  brainstormChips: [
    chip("sup_low", "only a little lemonade is left", "bb-sup-low"),
    chip("sup_cups", "many cups are waiting", "bb-sup-cups"),
    chip("sup_plenty", "this stand still has plenty", "bb-sup-plenty"),
    chip("sup_out", "this stand has sold out", "bb-sup-out"),
  ],
  beatStems: {
    hook: [
      stem("sup_h1", "A hot afternoon. Lots of people want lemonade."),
      stem("sup_h2", "Wanting it is only half of the story."),
    ],
    big_idea: [
      stem("sup_b1", "Price and availability depend on supply and demand together."),
      stem("sup_b2", "High demand does not always raise the price."),
    ],
    show_me: [
      stem("sup_s1", "Little left, and many cups waiting, can mean a higher price or a sellout."),
      stem("sup_s2", "Plenty of pitchers can keep the price the same."),
    ],
    sign_off: [
      stem("sup_o1", "Fair Desk, signing off."),
      stem("sup_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain how supply and demand together affect price and whether something is still available.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.10A: supply and demand affect price and availability. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "High demand does not always make the price go up. If there is plenty of supply, the price can stay the same.",
};

export const WAVE1_LAST = [MULTIPLY, FRACTIONS, COMMUNITIES, SUPPLY];
