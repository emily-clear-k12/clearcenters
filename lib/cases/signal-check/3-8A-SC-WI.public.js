// Signal Check Weigh-In - companion to 3.8A-SC.
// Reuses Backyard Path Light Check evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.8A-SC-WI",
  teksLabel: "3.8A",
  grade: 3,
  subject: "Science",
  title: 'Plug-Only Weigh-In',
  tagline: 'No plug = no energy?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Path Light Cadets disagree. Who's right?",
    context: 'Solar path light works with no cord. One Cadet says no plug means no energy. The other says sun and batteries count too.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "If it's not plugged into the wall, it can't have any energy." },
    { id: "B", label: "SIDE B", claim: 'Energy can come from sunlight or batteries - not only a wall plug.' },
  ],

  evidence: [
    { id: "night_log", text: 'Path light turned on 5 nights in a row automatically.', supports: "B" },
    { id: "no_cord_check", text: 'No cord or plug - just a solar panel on top.', supports: "B" },
    { id: "covered_test", text: 'Panel covered a week - light stopped by day 4.', supports: "B" },
    { id: "uncovered_test", text: 'Panel uncovered - light worked again after a sunny day.', supports: "B" },
    { id: "battery_note", text: 'Battery flashlight also stores energy with no cord.', supports: "B" },
    { id: "light_color", text: 'Path light glows a pale blue-white at night.', supports: "neither" },
  ],

  echo: {
    main: 'Path light puzzle, Cadet. Plug-only - or more? Weigh it.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the light works with no cord?',
    'Did I notice covering the panel stopped it?',
    'Did I avoid saying only plugs give energy?',
    'Did my proof match my ruling?',
  ],
};
