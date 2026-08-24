// Newsroom / Breaking News mode — safe to import from client components.
// Contains the evidence, the 4 voices' public identity (name, role,
// credibility sentence, opener line), and the two "stimulus" headlines
// used in the Word Check step. It does NOT contain the voices' full
// chat system prompts, the ideal cause-and-effect chain, the accurate
// headline, or the grading rubric — those live in the separate
// .server.js file and must never be imported here.

export const PUBLIC_CASE = {
  standard: "5.6D-BN",
  teksLabel: "5.6D",
  grade: 5,
  subject: "Science",
  mode: "breakingNews",
  title: "The Invisible Pressure Mystery",
  tagline: "The tank looked empty — so why was something trying to get out?",
  bigQuestion: "How can workers prove that an invisible substance inside a tank is still matter?",
  breakingSituation:
    "Workers at a beverage plant prepared an unused storage tank for cleaning. Through the inspection window, nothing solid or liquid was visible. Before anyone opened the tank, the pressure gauge spiked. A safety crew tested the gauge, weighed the tank, and released gas through the valve — hearing a strong rush of air, though nothing visible escaped. Work has stopped. Your newsroom team must investigate and report what occupied the tank and why.",
  onAirQuestion:
    "Was the tank truly empty, or does the evidence show that something invisible was inside — and if so, how do we know it counts as matter?",
  coldOpenMessages: [
    { who: "system", text: "A dispatch just came in from a beverage plant across town." },
    { who: "producer", text: "Storage tank, looked totally empty — then the pressure gauge spiked before anyone even opened it. Work's stopped. Get someone on this." },
    { who: "system", text: "The safety crew ran tests before your team arrived: a pressure check, a mass check, and a controlled release." },
    { who: "producer", text: "If that tank was really empty, none of those readings should've moved. Something's not adding up — go find out what." },
  ],
  evidenceFeed: [
    { id: "E1", text: "The pressure gauge read 42 psi before the valve was opened. After the safety crew released gas through the valve for 10 seconds, the reading dropped to 28 psi. The gauge was tested against a certified reference gauge and confirmed accurate." },
    { id: "E2", text: "Before gas release, the tank's mass was recorded as 18.4 kg on a calibrated platform scale. After the valve release, the same scale recorded 18.1 kg. The tank's physical structure was unchanged between measurements." },
    { id: "E3", text: "When the valve was opened, a rushing sound was heard immediately. Workers standing 3 meters away reported feeling a distinct movement of air against their skin, even though no liquid or solid came through the valve opening." },
    { id: "E4", text: "A particle model diagram in the plant's safety manual shows that gas particles are in constant motion, spread to fill their container, and exert pressure by colliding with container walls. Individual particles are far too small to be seen by the human eye or detected through an inspection window." },
    { id: "E5", text: "Maintenance records show the tank was sealed immediately after its last use, with no record of the contents being pumped out or vented. The last recorded content was compressed air used to pressurize a beverage line." },
    { id: "E6", text: "A basic property of matter: anything that has mass and takes up space is matter, regardless of whether it can be seen. Air is a mixture of gas particles — mainly nitrogen and oxygen — that have both mass and volume." },
  ],
  voices: [
    {
      id: "zuri",
      name: "Zuri Coleman",
      role: "reliable",
      roleLabel: "on the record",
      credibilityDescriptor: "Plant safety technician who personally tested the gauge, recorded both mass measurements, and supervised the valve release — she gathered every piece of physical evidence in this incident.",
      openerLine: "The gauge was accurate — we checked it against a reference standard. The tank was heavier before we released the gas than after. And the moment we cracked that valve, you could hear it and feel it. Something came out.",
    },
    {
      id: "ravi",
      name: "Dr. Ravi Kulkarni",
      role: "credibleButLimited",
      roleLabel: "on the record",
      credibilityDescriptor: "Gas systems engineer with deep knowledge of how gas particles behave in closed containers — but he was not present during the incident and has only seen Zuri's written measurements and the plant's maintenance records, not the tank itself.",
      openerLine: "The measurements Zuri recorded are exactly what you'd expect if the tank held compressed air. But I'm working from records — I haven't inspected that specific tank myself.",
    },
    {
      id: "noah",
      name: "Noah Ellis",
      role: "presentButUseless",
      roleLabel: "on the record",
      credibilityDescriptor: "Loading dock worker who was physically near the tank when the valve opened — he heard and felt the air release — but he did not participate in any measurements, did not see the gauge, and did not weigh the tank.",
      openerLine: "Yeah, I heard it — loud rushing sound, like when you let go of an untied balloon. But I don't know anything about gauges or weighing tanks. I was just nearby.",
    },
    {
      id: "vanessa",
      name: "Vanessa Crowe",
      role: "confidentButWrong",
      roleLabel: "on the record",
      credibilityDescriptor: "Plant communications director responsible for public statements — she has access to the inspection window and the incident reports, but she has not reviewed the gauge test results or the mass measurements.",
      openerLine: "I looked through that window myself and there was nothing in there. An empty tank is an empty tank. If there were really something inside, you'd be able to see it.",
    },
  ],
  headlineChoices: {
    oversold: "Toxic Mystery Gas Fills Plant — Workers Flee as Invisible Force Takes Over Storage Area",
    undersold: "Tank Inspection Leads to Brief Delay at Local Facility",
  },
  causeChainPrompts: {
    rootCause: "What's the root cause? Use the evidence to explain what was actually inside the tank.",
    ripples: [
      "Ripple 1 — Because of the root cause, what did the gauge show, and why?",
      "Ripple 2 — Because the pressure reading was real, what did the safety crew have to do?",
      "Ripple 3 — When the valve was opened, what happened to the pressure AND the mass — and what does that prove?",
    ],
  },
  selfCheckQuestions: [
    "Did I explain why something can be matter even though nobody could see it?",
    "Did I use at least two pieces of measurement evidence, not just one?",
    "Did I explain specifically what Vanessa Crowe got wrong, and why?",
    "Did I connect the particle model to the pressure reading?",
    "Does my headline match my evidence — not too dramatic, not too flat?",
  ],
  pushAngle:
    "A bicycle pump feels harder to push as you compress air into the tire, even though you cannot see the air moving or the particles inside. Using what you learned from the tank investigation, explain why the pump gets harder to push, what is happening to the particles inside the pump as you compress them, and how you would design one measurement — using only tools available at home or school — that could show that the air you pumped into the tire has mass and therefore counts as matter. Your explanation must use the particle model and must name at least one way your test could give you a wrong answer if you're not careful.",
};
