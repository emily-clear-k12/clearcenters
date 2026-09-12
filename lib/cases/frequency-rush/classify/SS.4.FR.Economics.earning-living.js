/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.4.FR.Economics (TEKS 4.11A)
 * Grade 4 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.4.FR.Economics.earning-living",
  standard: "SS.4.FR.Economics",
  teks: "4.11A",
  title: "Past or Present Jobs in Texas?",
  grade: 4,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "past", label: "Past" },
    { id: "present", label: "Present" }
  ],

  rule:
    "Sort each way of earning a living as more typical of the Texas past or the Texas present.",

  items: [
    { id: "buffalo_hunter", prompt: "Hunting buffalo on the plains", correctBinId: "past" },
    { id: "open_range_cowboy", prompt: "Open-range cowboy on a cattle drive", correctBinId: "past" },
    { id: "hand_cotton", prompt: "Picking cotton by hand", correctBinId: "past" },
    { id: "blacksmith", prompt: "Working as a town blacksmith", correctBinId: "past" },
    { id: "stagecoach", prompt: "Driving a stagecoach", correctBinId: "past" },
    { id: "mission_farm", prompt: "Farming near a Spanish mission", correctBinId: "past" },
    { id: "fur_trader", prompt: "Trading furs and hides", correctBinId: "past" },
    { id: "spindle_top_hand", prompt: "Hand-drilling early oil wells", correctBinId: "past" },
    { id: "wagon_freight", prompt: "Hauling freight by wagon", correctBinId: "past" },
    { id: "sharecropper", prompt: "Sharecropping after the Civil War", correctBinId: "past" },
    { id: "telegraph", prompt: "Sending messages by telegraph", correctBinId: "past" },
    { id: "miller_waterwheel", prompt: "Running a waterwheel mill", correctBinId: "past" },
    { id: "software_dev", prompt: "Writing computer software in Austin", correctBinId: "present" },
    { id: "oil_engineer", prompt: "Working as a petroleum engineer", correctBinId: "present" },
    { id: "airline_pilot", prompt: "Flying as an airline pilot", correctBinId: "present" },
    { id: "nurse_hospital", prompt: "Nursing in a modern hospital", correctBinId: "present" },
    { id: "teacher_today", prompt: "Teaching in a public school today", correctBinId: "present" },
    { id: "wind_tech", prompt: "Repairing wind turbines", correctBinId: "present" },
    { id: "truck_driver", prompt: "Driving a long-haul truck", correctBinId: "present" },
    { id: "restaurant_chef", prompt: "Cooking in a city restaurant", correctBinId: "present" },
    { id: "tech_support", prompt: "Providing tech support online", correctBinId: "present" },
    { id: "solar_installer", prompt: "Installing solar panels", correctBinId: "present" },
    { id: "banker", prompt: "Working at a bank in Houston", correctBinId: "present" },
    { id: "videographer", prompt: "Making videos for social media", correctBinId: "present" }
  ],
};
