// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.17B covers Texas
// cultural contributions. Stored with an "SS." prefix so this code can
// never collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a Texas music traditions archive) — not a
// reworded version of Group Chat's SS.4.17B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.17B-SC",
  teksLabel: "4.17B",
  grade: 4,
  subject: "Social Studies",
  title: "What Sounds Like Texas?",
  tagline: "Texas culture has one main style.",
  transmission: {
    claimHeadline: "Texas culture has one main style.",
    source: "Texas Music Traditions Archive",
    loggedAt: "Cultural Contributions File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-17b-sc-field-report.jpg",
    imageCaption: "Texas Music Traditions Archive — Cultural Contributions File",
    notes: "Conjunto and Tejano music came from a blend of two things. One was Mexican music. The other was the accordion. German immigrants brought it to South Texas. Western and cowboy music came from Texas ranch life. Cowboys sang songs to pass the time on long cattle drives. Both kinds are called classic \"Texas music.\" But they use different instruments. And they come from very different roots.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Both are called \"Texas music,\" so they must sound alike and come from one tradition.",
      correctVerdict: "False",
      reasonText: "The style comparison shows the two use different instruments. They grew from different roots. Coming from Texas does not make them the same.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Western and cowboy music grew out of Texas ranch life and cattle drives.",
      correctVerdict: "True",
      reasonText: "The origin record and the instrument record both tie this style to cattle drives and ranch life.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Conjunto and Tejano music grew from a mix of Mexican and German music in Texas.",
      correctVerdict: "True",
      reasonText: "The origin record and the instrument record both trace this style back to two things. One is Mexican music. The other is the accordion that German settlers brought.",
    },
  ],

  evidenceReadings: [
    { id: "conjunto_origin", label: "Conjunto music record", reading: "Mixed Mexican music with the accordion that German settlers brought.", kind: "document" },
    { id: "tejano_instruments", label: "Tejano instrument record", reading: "The accordion and bajo sexto are the main instruments in this style.", kind: "document" },
    { id: "cowboy_origin", label: "Cowboy music record", reading: "Cowboys sang songs to pass the time and calm cattle on long drives.", kind: "document" },
    { id: "western_instruments", label: "Western music instrument record", reading: "The guitar and fiddle are the main instruments in this style.", kind: "document" },
    { id: "sound_comparison", label: "Music style comparison", reading: "The two kinds of Texas music use different instruments. They come from different roots.", kind: "document" },
    { id: "culture_summary", label: "Texas culture reference", reading: "Texas culture has many traditions. Each was shaped by a different group of people.", kind: "document" },
    { id: "venue_note", label: "Concert venue record", reading: "A local dance hall hosts live music every Friday night.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["sound_comparison", "culture_summary"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["cowboy_origin", "western_instruments"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["conjunto_origin", "tejano_instruments"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["venue_note"] },
  ],

  echo: {
    main: "Music traditions archive incoming, Cadet. Let's see if this claim holds up.",
    scan: "Two styles, two very different roots — read every record carefully.",
    sort: "Notice how each style's instruments trace back to its own origin.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention Conjunto/Tejano music's Mexican and German roots?",
    "Did I mention Western/cowboy music's connection to ranching and cattle drives?",
    "Did I mention that the two styles use different instruments and come from different roots?",
    "Did I avoid saying Texas culture has just one main style?",
  ],
};
