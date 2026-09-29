// Broadcast Booth second wave. Registered from catalog.js.
// Each picture file is used by only one caption.

function chip(id, label, image) {
  return { id, label, source: "stimulus", imageId: image, imageUrl: `/maker/broadcast/${image}.png` };
}

function stem(id, label) {
  return { id, label, source: "stem" };
}

export const WATER_CYCLE = {
  id: "SCI.4.10A-BB",
  standard: "SCI.4.10A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.10A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Where does the water go?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "The water cycle",
  prompt: "You are live on Field Radio. Explain how water keeps moving above and on Earth, and how the Sun's energy makes that happen. This is not why we have day and night.",
  cover: {
    headline: "Field Radio — Weather Desk",
    line: "The water is not gone. The Sun lifts it, and it comes back down.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Water cycle notes",
    readAloud: true,
    bullets: [
      "The Sun is the main energy source for the water cycle.",
      "Sunlight heats water in lakes, rivers, and wet ground. The water becomes vapor and rises.",
      "The vapor cools and forms clouds.",
      "Water falls back down as rain.",
      "Rain collects in streams and lakes. The Sun can lift that water again.",
      "The same water keeps moving. It does not disappear.",
    ],
  },
  brainstormChips: [
    chip("wc_sun", "the Sun's energy shines on the lake", "bb-cycle-sun"),
    chip("wc_vapor", "water rises as vapor", "bb-cycle-vapor"),
    chip("wc_cloud", "vapor cools and becomes a cloud", "bb-cycle-cloud"),
    chip("wc_rain", "water falls as rain", "bb-cycle-rain"),
    chip("wc_stream", "rain collects and keeps moving", "bb-cycle-stream"),
  ],
  beatStems: {
    hook: [
      stem("wc_h1", "The puddle looks gone, but the water moved."),
      stem("wc_h2", "The Sun did the lifting."),
    ],
    big_idea: [
      stem("wc_b1", "Water keeps moving above and on Earth."),
      stem("wc_b2", "The Sun's energy is what lifts the water."),
    ],
    show_me: [
      stem("wc_s1", "Vapor rises, a cloud forms, and rain falls."),
      stem("wc_s2", "The stream collects the water so the Sun can lift it again."),
    ],
    sign_off: [
      stem("wc_o1", "Weather Desk, signing off."),
      stem("wc_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain how water keeps moving through the water cycle and how the Sun's energy lifts it.",
  lesson_summary: "Grade 4 Explain broadcast. The Sun's energy moves water up, into clouds, and back down. The water is not gone. This is not a day-and-night lesson. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Evaporation is not disappearing. The same water comes back as rain. The Sun here is an energy source, not the reason we have day and night.",
};

export const WAVE2_CASES = [WATER_CYCLE];
