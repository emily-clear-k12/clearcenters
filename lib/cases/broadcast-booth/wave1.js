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
