// Signal Check Weigh-In - companion to 3.10A-SC.
// Reuses Weekly Weather Log evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.10A-SC-WI",
  teksLabel: "3.10A",
  grade: 3,
  subject: "Science",
  title: 'Forecast Fight',
  tagline: 'Are forecasts just guessing?',
  stemMode: "dropdown",

  dispute: {
    prompt: "Weather Log Cadets disagree. Who's right?",
    context: "This week's forecast matched most days, then missed Friday. One Cadet says forecasts are useless guessing. The other says they're still useful.",
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Forecasts are just guessing - checking them is pointless.' },
    { id: "B", label: "SIDE B", claim: "Forecasts help most days - one miss doesn't make them useless." },
  ],

  evidence: [
    { id: "monday_match", text: 'Monday: forecast said sunny - actual was sunny.', supports: "B" },
    { id: "wednesday_match", text: 'Wednesday: forecast said rain - actual was rain.', supports: "B" },
    { id: "friday_miss", text: 'Friday: forecast said clear - a fast system brought rain.', supports: "B" },
    { id: "weeklog_tally", text: 'Forecast matched actual weather on 4 out of 5 days.', supports: "B" },
    { id: "forecast_use_note", text: 'Farmers and pilots still check the forecast every day.', supports: "B" },
    { id: "new_thermometer", text: 'Station got a brand-new thermometer this week.', supports: "neither" },
  ],

  echo: {
    main: 'Forecast fight, Cadet. Two sides. Weigh the week log.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only - lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice the forecast matched most days?',
    'Did I remember Friday can miss and still not kill the whole forecast?',
    'Did I avoid saying forecasts are useless?',
    'Did my proof match the side I picked?',
  ],
};
