/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.5.FR.Economics (TEKS 5.11A)
 * Grade 5 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.5.FR.Economics.supply-demand",
  standard: "SS.5.FR.Economics",
  teks: "5.11A",
  title: "Price Rises or Price Falls?",
  grade: 5,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "price_rises", label: "Price Rises" },
    { id: "price_falls", label: "Price Falls" }
  ],

  rule:
    "When demand rises or supply falls, price often rises. When supply rises or demand falls, price often falls.",

  items: [
    { id: "toy_shortage", prompt: "A popular toy sells out before holidays", correctBinId: "price_rises" },
    { id: "gas_storm", prompt: "A storm cuts gasoline supply", correctBinId: "price_rises" },
    { id: "concert_tickets", prompt: "Many fans want limited concert tickets", correctBinId: "price_rises" },
    { id: "drought_crops", prompt: "Drought ruins much of the wheat crop", correctBinId: "price_rises" },
    { id: "new_fad", prompt: "A sudden fad makes sneakers scarce", correctBinId: "price_rises" },
    { id: "housing_boom", prompt: "Many families want few available houses", correctBinId: "price_rises" },
    { id: "freeze_oranges", prompt: "A freeze destroys orange groves", correctBinId: "price_rises" },
    { id: "chip_shortage", prompt: "A chip shortage slows phone making", correctBinId: "price_rises" },
    { id: "more_buyers", prompt: "More buyers compete for the same bikes", correctBinId: "price_rises" },
    { id: "limited_edition", prompt: "Only a few limited-edition cards exist", correctBinId: "price_rises" },
    { id: "strike_stops", prompt: "A strike stops production of sneakers", correctBinId: "price_rises" },
    { id: "heat_ac", prompt: "A heat wave spikes demand for A/C units", correctBinId: "price_rises" },
    { id: "bumper_crop", prompt: "Farmers harvest a bumper corn crop", correctBinId: "price_falls" },
    { id: "clearance", prompt: "Stores put last-season clothes on sale", correctBinId: "price_falls" },
    { id: "new_factories", prompt: "New factories make many more phones", correctBinId: "price_falls" },
    { id: "fewer_buyers", prompt: "Fewer people want yesterday's game", correctBinId: "price_falls" },
    { id: "surplus_milk", prompt: "Dairies have a surplus of milk", correctBinId: "price_falls" },
    { id: "competition_stores", prompt: "Many stores sell the same headphones", correctBinId: "price_falls" },
    { id: "tech_cheaper", prompt: "New tech makes TVs cheaper to produce", correctBinId: "price_falls" },
    { id: "end_season", prompt: "Demand drops after the holiday season", correctBinId: "price_falls" },
    { id: "overstock", prompt: "Warehouses are overstocked with toys", correctBinId: "price_falls" },
    { id: "good_harvest", prompt: "A good harvest floods the market", correctBinId: "price_falls" },
    { id: "used_market", prompt: "Lots of used bikes flood the market", correctBinId: "price_falls" },
    { id: "fad_ends", prompt: "A fad ends and demand disappears", correctBinId: "price_falls" }
  ],
};
