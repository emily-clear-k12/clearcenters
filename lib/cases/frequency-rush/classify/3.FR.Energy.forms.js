/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 3.FR.Energy (TEKS 3.8A - forms of energy)
 * Grade 3 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "3.FR.Energy.forms",
  standard: "3.FR.Energy",
  teks: "3.8A",
  title: "Forms of Energy",
  grade: 3,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "light", label: "Light" },
    { id: "sound", label: "Sound" },
    { id: "thermal", label: "Thermal" },
    { id: "mechanical", label: "Mechanical" },
  ],

  rule:
    "Light energy lets you see. Sound energy is heard. Thermal energy is heat. Mechanical energy is motion or moving parts.",

  items: [
    { id: "flashlight", prompt: "A flashlight beam", correctBinId: "light" },
    { id: "sunlight", prompt: "Sunlight through a window", correctBinId: "light" },
    { id: "lamp", prompt: "A glowing desk lamp", correctBinId: "light" },
    { id: "candle_flame_light", prompt: "Light from a candle flame", correctBinId: "light" },
    { id: "phone_screen", prompt: "A glowing phone screen", correctBinId: "light" },
    { id: "traffic_light", prompt: "A red traffic light", correctBinId: "light" },

    { id: "doorbell", prompt: "A ringing doorbell", correctBinId: "sound" },
    { id: "drum", prompt: "A beating drum", correctBinId: "sound" },
    { id: "whistle", prompt: "A coach's whistle", correctBinId: "sound" },
    { id: "guitar", prompt: "A strumming guitar", correctBinId: "sound" },
    { id: "siren", prompt: "A fire truck siren", correctBinId: "sound" },
    { id: "whisper", prompt: "A classmate whispering", correctBinId: "sound" },

    { id: "stove", prompt: "A hot stove burner", correctBinId: "thermal" },
    { id: "campfire", prompt: "Warmth from a campfire", correctBinId: "thermal" },
    { id: "hot_cocoa", prompt: "A mug of hot cocoa", correctBinId: "thermal" },
    { id: "sunshine_warm", prompt: "Warmth from sunshine on your skin", correctBinId: "thermal" },
    { id: "toaster", prompt: "Heat from a toaster", correctBinId: "thermal" },
    { id: "heating_pad", prompt: "A warm heating pad", correctBinId: "thermal" },

    { id: "rolling_ball", prompt: "A rolling soccer ball", correctBinId: "mechanical" },
    { id: "spinning_fan", prompt: "A spinning ceiling fan", correctBinId: "mechanical" },
    { id: "swinging_pendulum", prompt: "A swinging pendulum", correctBinId: "mechanical" },
    { id: "bike_moving", prompt: "A moving bicycle", correctBinId: "mechanical" },
    { id: "windmill", prompt: "Turning windmill blades", correctBinId: "mechanical" },
    { id: "jumping_rope", prompt: "A jumping rope in motion", correctBinId: "mechanical" },
  ],
};