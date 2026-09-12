/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Communities (TEKS 3.2B)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Communities.needs",
  standard: "SS.3.FR.Communities",
  teks: "3.2B",
  title: "How Communities Meet Needs",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "government", label: "Government" },
    { id: "education", label: "Education" },
    { id: "communication", label: "Communication" },
    { id: "transportation", label: "Transportation" },
    { id: "recreation", label: "Recreation" }
  ],

  rule:
    "Sort each example by how the community meets the need: government, education, communication, transportation, or recreation.",

  items: [
    { id: "city_hall", prompt: "City hall making local rules", correctBinId: "government" },
    { id: "voting_booth", prompt: "Voting for city leaders", correctBinId: "government" },
    { id: "court_settle", prompt: "A court settling a dispute", correctBinId: "government" },
    { id: "police_protect", prompt: "Police keeping people safe", correctBinId: "government" },
    { id: "public_school", prompt: "Attending a public school", correctBinId: "education" },
    { id: "library_learn", prompt: "Checking out books to learn", correctBinId: "education" },
    { id: "museum_trip", prompt: "A class trip to a museum", correctBinId: "education" },
    { id: "tutor_center", prompt: "An after-school tutoring center", correctBinId: "education" },
    { id: "newspaper", prompt: "Reading the local newspaper", correctBinId: "communication" },
    { id: "tv_news", prompt: "Watching the evening news", correctBinId: "communication" },
    { id: "phone_call", prompt: "Calling family on the phone", correctBinId: "communication" },
    { id: "email_note", prompt: "Sending an email message", correctBinId: "communication" },
    { id: "radio_alert", prompt: "Hearing a weather alert on radio", correctBinId: "communication" },
    { id: "city_bus", prompt: "Riding a city bus", correctBinId: "transportation" },
    { id: "airport", prompt: "Flying from the airport", correctBinId: "transportation" },
    { id: "bridge", prompt: "Crossing a river on a bridge", correctBinId: "transportation" },
    { id: "bike_lane", prompt: "Using a bike lane to school", correctBinId: "transportation" },
    { id: "train_station", prompt: "Taking a train to another town", correctBinId: "transportation" },
    { id: "soccer_field", prompt: "Playing soccer at the park", correctBinId: "recreation" },
    { id: "swimming_pool", prompt: "Swimming at the city pool", correctBinId: "recreation" },
    { id: "movie_theater", prompt: "Going to a movie theater", correctBinId: "recreation" },
    { id: "community_center", prompt: "Games at the community center", correctBinId: "recreation" },
    { id: "hiking_trail", prompt: "Hiking a nature trail", correctBinId: "recreation" },
    { id: "zoo_visit", prompt: "Visiting the city zoo", correctBinId: "recreation" }
  ],
};
