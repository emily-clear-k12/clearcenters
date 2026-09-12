/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.4.FR.Exploration (TEKS 4.2A)
 * Grade 4 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.4.FR.Exploration.motivations",
  standard: "SS.4.FR.Exploration",
  teks: "4.2A",
  title: "Why Explore?",
  grade: 4,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "economic_opportunity", label: "Economic Opportunity" },
    { id: "competition", label: "Competition" },
    { id: "expansion", label: "Expansion" }
  ],

  rule:
    "Sort each explorer motivation or example: economic opportunity, competition, or expansion.",

  items: [
    { id: "find_gold", prompt: "Searching for gold and silver", correctBinId: "economic_opportunity" },
    { id: "new_trade", prompt: "Finding new trade routes", correctBinId: "economic_opportunity" },
    { id: "fur_wealth", prompt: "Seeking wealth from furs", correctBinId: "economic_opportunity" },
    { id: "spice_route", prompt: "Hoping for riches from spices", correctBinId: "economic_opportunity" },
    { id: "land_claims_wealth", prompt: "Claiming land to farm for profit", correctBinId: "economic_opportunity" },
    { id: "mining_rights", prompt: "Looking for mining rights", correctBinId: "economic_opportunity" },
    { id: "new_markets", prompt: "Wanting new markets for goods", correctBinId: "economic_opportunity" },
    { id: "beat_rival", prompt: "Beating a rival nation to a claim", correctBinId: "competition" },
    { id: "glory_nation", prompt: "Winning glory for the home country", correctBinId: "competition" },
    { id: "race_map", prompt: "Racing another country to map a coast", correctBinId: "competition" },
    { id: "flag_first", prompt: "Planting a flag before rivals arrive", correctBinId: "competition" },
    { id: "stronger_empire", prompt: "Showing the empire is strongest", correctBinId: "competition" },
    { id: "block_enemy", prompt: "Blocking an enemy nation's advance", correctBinId: "competition" },
    { id: "prestige_court", prompt: "Gaining prestige at the royal court", correctBinId: "competition" },
    { id: "new_colony", prompt: "Starting a new colony for the king", correctBinId: "expansion" },
    { id: "spread_control", prompt: "Spreading control over more land", correctBinId: "expansion" },
    { id: "settle_frontier", prompt: "Settling people on the frontier", correctBinId: "expansion" },
    { id: "claim_territory", prompt: "Claiming territory for the empire", correctBinId: "expansion" },
    { id: "mission_outposts", prompt: "Building mission outposts farther out", correctBinId: "expansion" },
    { id: "push_border", prompt: "Pushing the nation's borders outward", correctBinId: "expansion" },
    { id: "occupy_land", prompt: "Occupying land before others can", correctBinId: "expansion" },
    { id: "grow_empire", prompt: "Growing the size of the empire", correctBinId: "expansion" }
  ],
};
