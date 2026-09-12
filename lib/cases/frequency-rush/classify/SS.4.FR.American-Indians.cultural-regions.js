/**
 * Frequency Rush - Classify / Sort bank
 * Unit: SS.4.FR.American-Indians (TEKS 4.1C)
 * Grade 4 Social Studies
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "SS.4.FR.American-Indians.cultural-regions",
  standard: "SS.4.FR.American-Indians",
  teks: "4.1C",
  title: "Gulf, Plains, Puebloan, or Southeastern?",
  grade: 4,
  subject: "Social Studies",
  type: "classify",

  bins: [
    { id: "gulf", label: "Gulf" },
    { id: "plains", label: "Plains" },
    { id: "puebloan", label: "Puebloan" },
    { id: "southeastern", label: "Southeastern" }
  ],

  rule:
    "Sort each American Indian group or way of life into its Texas cultural region: Gulf, Plains, Puebloan, or Southeastern.",

  items: [
    { id: "karankawa", prompt: "Karankawa along the Gulf coast", correctBinId: "gulf" },
    { id: "coahuiltecan", prompt: "Coahuiltecan hunter-gatherers near the coast", correctBinId: "gulf" },
    { id: "fish_shellfish", prompt: "Fishing and gathering shellfish by the sea", correctBinId: "gulf" },
    { id: "portable_shelters_gulf", prompt: "Simple shelters suited to coastal life", correctBinId: "gulf" },
    { id: "gulf_canoes", prompt: "Using canoes in bays and lagoons", correctBinId: "gulf" },
    { id: "coastal_nomads", prompt: "Moving along the Texas coast for food", correctBinId: "gulf" },
    { id: "comanche", prompt: "Comanche horse culture on the plains", correctBinId: "plains" },
    { id: "apache", prompt: "Apache bands on the Texas plains", correctBinId: "plains" },
    { id: "buffalo_hunt", prompt: "Hunting buffalo on horseback", correctBinId: "plains" },
    { id: "tipi", prompt: "Living in tipis that move with herds", correctBinId: "plains" },
    { id: "plains_trade", prompt: "Trading hides across the Great Plains", correctBinId: "plains" },
    { id: "nomadic_hunters", prompt: "Nomadic hunters following bison", correctBinId: "plains" },
    { id: "jumano", prompt: "Jumano traders in the west", correctBinId: "puebloan" },
    { id: "tigua", prompt: "Tigua (Ysleta) pueblo community", correctBinId: "puebloan" },
    { id: "adobe_homes", prompt: "Adobe pueblo-style homes", correctBinId: "puebloan" },
    { id: "irrigation_farming", prompt: "Irrigation farming near desert rivers", correctBinId: "puebloan" },
    { id: "west_tx_traders", prompt: "Trading routes across West Texas", correctBinId: "puebloan" },
    { id: "settled_villages_west", prompt: "Settled villages in arid west Texas", correctBinId: "puebloan" },
    { id: "caddo", prompt: "Caddo farming villages in East Texas", correctBinId: "southeastern" },
    { id: "wichita", prompt: "Wichita communities in north-central Texas", correctBinId: "southeastern" },
    { id: "corn_beans", prompt: "Growing corn, beans, and squash", correctBinId: "southeastern" },
    { id: "mound_builders", prompt: "Building earthen mounds", correctBinId: "southeastern" },
    { id: "woodland_homes", prompt: "Woodland homes in pine forests", correctBinId: "southeastern" },
    { id: "complex_trade", prompt: "Complex trade networks in East Texas", correctBinId: "southeastern" }
  ],
};
