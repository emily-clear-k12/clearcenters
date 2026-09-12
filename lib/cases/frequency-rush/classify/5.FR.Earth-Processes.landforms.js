/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Earth-Processes (landforms formed/shaped by Earth processes)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Earth-Processes.landforms",
  standard: "5.FR.Earth-Processes",
  teks: "5.10C",
  title: "Which Landform?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "mountain", label: "Mountain" },
    { id: "valley", label: "Valley" },
    { id: "plain", label: "Plain" },
    { id: "plateau", label: "Plateau" },
  ],

  rule:
    "Mountains rise high with steep slopes. Valleys are low land between higher land. Plains are wide flat lowlands. Plateaus are flat-topped highlands.",

  items: [
    { id: "rocky_peak", prompt: "A rocky peak above the treeline", correctBinId: "mountain" },
    { id: "snow_cap", prompt: "A snow-capped summit", correctBinId: "mountain" },
    { id: "steep_ridge", prompt: "A steep ridgeline hikers climb", correctBinId: "mountain" },
    { id: "volcano_cone", prompt: "A tall volcanic cone", correctBinId: "mountain" },
    { id: "appalachian_range", prompt: "A range of high peaks", correctBinId: "mountain" },
    { id: "sierra_crest", prompt: "A jagged mountain crest", correctBinId: "mountain" },

    { id: "river_valley", prompt: "Low land along a river between hills", correctBinId: "valley" },
    { id: "u_shaped", prompt: "A U-shaped glacial valley", correctBinId: "valley" },
    { id: "canyon_floor", prompt: "The floor of a deep canyon", correctBinId: "valley" },
    { id: "farm_valley", prompt: "Farmland in a bowl between ridges", correctBinId: "valley" },
    { id: "v_shaped", prompt: "A V-shaped stream valley", correctBinId: "valley" },
    { id: "rift_lowland", prompt: "A long lowland between two mountain walls", correctBinId: "valley" },

    { id: "coastal_plain", prompt: "A flat coastal lowland", correctBinId: "plain" },
    { id: "prairie", prompt: "A wide grassy prairie", correctBinId: "plain" },
    { id: "great_plains", prompt: "Broad flat farmland for miles", correctBinId: "plain" },
    { id: "floodplain_flat", prompt: "A flat floodplain beside a river", correctBinId: "plain" },
    { id: "savannah_flat", prompt: "Nearly level open grassland", correctBinId: "plain" },
    { id: "texas_coast", prompt: "Texas Gulf Coastal Plain", correctBinId: "plain" },

    { id: "flat_top_mesa", prompt: "A flat-topped highland (mesa-like)", correctBinId: "plateau" },
    { id: "colorado_plateau", prompt: "A high flat tableland", correctBinId: "plateau" },
    { id: "canyon_rim", prompt: "A high rim above a canyon", correctBinId: "plateau" },
    { id: "llano_estacado", prompt: "The Llano Estacado (high plains plateau)", correctBinId: "plateau" },
    { id: "elevated_table", prompt: "Elevated flat land with steep sides", correctBinId: "plateau" },
    { id: "desert_plateau", prompt: "A desert plateau with cliffs", correctBinId: "plateau" },
  ],
};