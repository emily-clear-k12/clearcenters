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
