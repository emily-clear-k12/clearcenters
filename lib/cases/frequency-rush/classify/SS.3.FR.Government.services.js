/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.3.FR.Government (TEKS 3.7C)
 * Grade 3 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.3.FR.Government.services",
  standard: "SS.3.FR.Government",
  teks: "3.7C",
  title: "Whose Service Is It?",
  grade: 3,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "local", label: "Local" },
    { id: "state", label: "State" },
    { id: "national", label: "National" }
  ],

  rule:
    "Sort each service by the level that usually provides it: local, state, or national.",

  items: [
    { id: "fire_department", prompt: "Firefighters putting out a house fire", correctBinId: "local" },
    { id: "police_patrol", prompt: "City police patrolling streets", correctBinId: "local" },
    { id: "public_library", prompt: "A public city library", correctBinId: "local" },
    { id: "street_lights", prompt: "Street lights and stop signs", correctBinId: "local" },
    { id: "city_water", prompt: "City water and sewer service", correctBinId: "local" },
    { id: "playground", prompt: "A neighborhood playground", correctBinId: "local" },
    { id: "trash_service", prompt: "Garbage collection", correctBinId: "local" },
    { id: "ambulance_city", prompt: "City emergency ambulance", correctBinId: "local" },
    { id: "txdot_roads", prompt: "Building state highways", correctBinId: "state" },
    { id: "state_troopers", prompt: "State troopers on the highway", correctBinId: "state" },
    { id: "public_schools_tx", prompt: "Public school standards in Texas", correctBinId: "state" },
    { id: "state_hospitals", prompt: "State health clinics", correctBinId: "state" },
    { id: "fishing_license", prompt: "Issuing fishing licenses", correctBinId: "state" },
    { id: "state_museum", prompt: "A Texas state museum", correctBinId: "state" },
    { id: "dmv", prompt: "Vehicle registration offices", correctBinId: "state" },
    { id: "state_wildlife", prompt: "Protecting Texas wildlife", correctBinId: "state" },
    { id: "postal_mail", prompt: "Delivering U.S. mail", correctBinId: "national" },
    { id: "army", prompt: "Defending the country with the Army", correctBinId: "national" },
    { id: "nasa", prompt: "NASA space programs", correctBinId: "national" },
    { id: "fbi", prompt: "FBI investigating federal crimes", correctBinId: "national" },
    { id: "social_security", prompt: "Social Security payments", correctBinId: "national" },
    { id: "customs", prompt: "Customs at the border", correctBinId: "national" },
    { id: "mint_money", prompt: "Printing U.S. money", correctBinId: "national" },
    { id: "weather_service", prompt: "National Weather Service forecasts", correctBinId: "national" }
  ],
};
