/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Colonial (TEKS 5.1A)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Colonial.reasons",
  standard: "SS.5.FR.Colonial",
  teks: "5.1A",
  title: "Religious Freedom or Economic Gain?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "religious_freedom", label: "Religious Freedom" },
    { id: "economic_gain", label: "Economic Gain" }
  ],

  rule:
    "Sort each colonial reason: religious freedom or economic gain.",

  items: [
    { id: "pilgrims", prompt: "Pilgrims seeking freedom to worship", correctBinId: "religious_freedom" },
    { id: "puritans", prompt: "Puritans building a faith community", correctBinId: "religious_freedom" },
    { id: "quakers_pa", prompt: "Quakers settling in Pennsylvania", correctBinId: "religious_freedom" },
    { id: "maryland_catholics", prompt: "Catholics finding refuge in Maryland", correctBinId: "religious_freedom" },
    { id: "escape_persecution", prompt: "Escaping religious persecution", correctBinId: "religious_freedom" },
    { id: "worship_freely", prompt: "Wanting to worship without interference", correctBinId: "religious_freedom" },
    { id: "church_own_way", prompt: "Starting a colony for their own church", correctBinId: "religious_freedom" },
    { id: "mission_beliefs", prompt: "Spreading their beliefs freely", correctBinId: "religious_freedom" },
    { id: "faith_laws", prompt: "Making laws based on their faith", correctBinId: "religious_freedom" },
    { id: "separate_from_church", prompt: "Separating from the Church of England", correctBinId: "religious_freedom" },
    { id: "haven_believers", prompt: "Creating a haven for believers", correctBinId: "religious_freedom" },
    { id: "conscience_liberty", prompt: "Seeking liberty of conscience", correctBinId: "religious_freedom" },
    { id: "jamestown_gold", prompt: "Jamestown settlers hunting for gold", correctBinId: "economic_gain" },
    { id: "tobacco_profit", prompt: "Growing tobacco for profit", correctBinId: "economic_gain" },
    { id: "joint_stock", prompt: "Investors funding a joint-stock colony", correctBinId: "economic_gain" },
    { id: "land_ownership", prompt: "Wanting land of their own", correctBinId: "economic_gain" },
    { id: "trade_goods", prompt: "Trading goods for wealth", correctBinId: "economic_gain" },
    { id: "cash_crop_farm", prompt: "Starting cash-crop plantations", correctBinId: "economic_gain" },
    { id: "indentured_chance", prompt: "Coming as indentured for a better chance", correctBinId: "economic_gain" },
    { id: "fur_trade_colony", prompt: "Profiting from the fur trade", correctBinId: "economic_gain" },
    { id: "new_markets", prompt: "Opening new markets for England", correctBinId: "economic_gain" },
    { id: "fishing_wealth", prompt: "Fishing wealth off New England coasts", correctBinId: "economic_gain" },
    { id: "merchant_voyage", prompt: "Merchants funding voyages for return", correctBinId: "economic_gain" },
    { id: "cheap_land", prompt: "Seeking cheap land and resources", correctBinId: "economic_gain" }
  ],
};
