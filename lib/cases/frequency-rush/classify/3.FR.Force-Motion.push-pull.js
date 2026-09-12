/**
 * Frequency Rush - Classify / Sort bank
 * Unit: 3.FR.Force-Motion (TEKS 3.7B - push/pull)
 * Grade 3 Science
 *
 * Student sees one item/example; taps the correct bin.
 * Not a separate activity - content for Asteroid Run classify format (to be wired).
 */

export const CLASSIFY_BANK = {
  id: "3.FR.Force-Motion.push-pull",
  standard: "3.FR.Force-Motion",
  teks: "3.7B",
  title: "Push or Pull?",
  grade: 3,
  subject: "Science",
  type: "classify",

  bins: [
    { id: "push", label: "Push" },
    { id: "pull", label: "Pull" },
  ],

  rule:
    "A push moves something away from you. A pull brings something toward you.",

  items: [
    { id: "open_door_push", prompt: "Opening a swinging door with your hands", correctBinId: "push" },
    { id: "kick_ball", prompt: "Kicking a soccer ball", correctBinId: "push" },
    { id: "press_button", prompt: "Pressing an elevator button", correctBinId: "push" },
    { id: "shove_box", prompt: "Shoving a box across the floor", correctBinId: "push" },
    { id: "squeeze_toothpaste", prompt: "Squeezing toothpaste from a tube", correctBinId: "push" },
    { id: "type_key", prompt: "Pressing a keyboard key", correctBinId: "push" },
    { id: "stroller_forward", prompt: "Moving a stroller forward with both hands", correctBinId: "push" },
    { id: "close_drawer_push", prompt: "Closing a desk drawer", correctBinId: "push" },
    { id: "bounce_ball", prompt: "Bouncing a basketball downward", correctBinId: "push" },
    { id: "swing_bat", prompt: "Hitting a baseball with a bat", correctBinId: "push" },
    { id: "blow_candle", prompt: "Blowing out birthday candles", correctBinId: "push" },
    { id: "lawn_mower", prompt: "Pushing a lawn mower", correctBinId: "push" },

    { id: "tug_rope", prompt: "Tugging a rope in tug-of-war", correctBinId: "pull" },
    { id: "open_drawer", prompt: "Opening a desk drawer", correctBinId: "pull" },
    { id: "zip_up", prompt: "Zipping up a jacket", correctBinId: "pull" },
    { id: "wagon", prompt: "Pulling a wagon by its handle", correctBinId: "pull" },
    { id: "pick_apple", prompt: "Picking an apple from a low branch", correctBinId: "pull" },
    { id: "vacuum_cord", prompt: "Reeling in a vacuum cord", correctBinId: "pull" },
    { id: "open_fridge", prompt: "Opening a refrigerator door", correctBinId: "pull" },
    { id: "drag_backpack", prompt: "Dragging a backpack toward you", correctBinId: "pull" },
    { id: "pull_weed", prompt: "Pulling a weed from the ground", correctBinId: "pull" },
    { id: "string_toy", prompt: "Pulling a toy on a string", correctBinId: "pull" },
    { id: "open_curtain", prompt: "Opening curtains by the cord", correctBinId: "pull" },
    { id: "lift_bucket", prompt: "Lifting a bucket by its handle", correctBinId: "pull" },
  ],
};