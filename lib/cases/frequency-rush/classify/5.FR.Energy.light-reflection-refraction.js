/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 5.FR.Energy (TEKS 5.8C - reflection, refraction, absorption)
 * Grade 5 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "5.FR.Energy.light-reflection-refraction",
  standard: "5.FR.Energy",
  teks: "5.8C",
  title: "Reflection, Refraction, or Absorption?",
  grade: 5,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "reflection", label: "Reflection" },
    { id: "refraction", label: "Refraction" },
    { id: "absorption", label: "Absorption" },
  ],

  rule:
    "Reflection bounces light off a surface. Refraction bends light as it passes into a new medium. Absorption takes in light energy (often as heat or color).",

  items: [
    { id: "mirror", prompt: "Seeing your face in a mirror", correctBinId: "reflection" },
    { id: "still_pond", prompt: "Trees mirrored on a still pond", correctBinId: "reflection" },
    { id: "shiny_spoon", prompt: "Light bouncing off a shiny spoon", correctBinId: "reflection" },
    { id: "flashlight_wall", prompt: "A flashlight beam bouncing off a white wall", correctBinId: "reflection" },
    { id: "bike_reflector", prompt: "A bike reflector sending light back", correctBinId: "reflection" },
    { id: "window_glare", prompt: "Glare bouncing off a glass window", correctBinId: "reflection" },
    { id: "moon_shine", prompt: "Moonlight (sunlight bounced off the Moon)", correctBinId: "reflection" },
    { id: "foil_bounce", prompt: "Light bouncing off aluminum foil", correctBinId: "reflection" },

    { id: "pencil_water", prompt: "A pencil looking bent in a glass of water", correctBinId: "refraction" },
    { id: "lens_magnify", prompt: "A magnifying lens enlarging text", correctBinId: "refraction" },
    { id: "prism_rainbow", prompt: "A prism spreading white light into colors", correctBinId: "refraction" },
    { id: "pool_shallow", prompt: "A pool looking shallower than it is", correctBinId: "refraction" },
    { id: "eyeglasses", prompt: "Eyeglasses bending light to focus", correctBinId: "refraction" },
    { id: "straw_cup", prompt: "A straw appearing broken at the water line", correctBinId: "refraction" },
    { id: "camera_lens", prompt: "A camera lens focusing light", correctBinId: "refraction" },
    { id: "fish_tank", prompt: "A fish looking shifted behind aquarium glass", correctBinId: "refraction" },

    { id: "black_shirt_heat", prompt: "A black shirt warming in sunlight", correctBinId: "absorption" },
    { id: "dark_asphalt", prompt: "Dark asphalt heating up on a sunny day", correctBinId: "absorption" },
    { id: "plant_leaf", prompt: "A green leaf taking in light for photosynthesis", correctBinId: "absorption" },
    { id: "solar_panel", prompt: "A solar panel taking in sunlight", correctBinId: "absorption" },
    { id: "red_apple", prompt: "A red apple absorbing other colors of light", correctBinId: "absorption" },
    { id: "dark_coat", prompt: "A dark coat soaking up light as heat", correctBinId: "absorption" },
    { id: "soil_warm", prompt: "Dark soil warming faster than light sand", correctBinId: "absorption" },
    { id: "opaque_block", prompt: "An opaque block stopping light that hits it", correctBinId: "absorption" },
  ],
};