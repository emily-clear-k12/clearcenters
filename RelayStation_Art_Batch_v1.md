# Relay Station — Image Batch v1
**Everything Relay Station needs, in one upload.** Sept 22, 2026. AI-drafted prompts; Emily reviews.

## How to use this
1. Paste **Style Block A or B** (below) in front of each prompt — they carry the house look so the individual prompts can stay short.
2. Save each image at the exact **filename/path** given. Paths are relative to `public/`.
3. **Never ask for words, letters, numbers, or logos inside an image.** Every label on every screen is drawn in HTML; generators garble text and it can't be translated or resized.
4. Sizes match what's already in the repo (case thumbnails 1400×788, challenge tiles ~1916×821, nav icons 96×96 PNG).
5. Anything marked **Optional** is a nice-to-have — the screen works without it today. Send me the files whenever they exist and I'll wire them up.

### Style Block A — Station art (sci-fi UI: tiles, boards, badges, backgrounds)
> Polished 3D render, friendly futuristic space-station aesthetic for elementary students. Clean white and pale-grey hardware with glowing accents in cyan (#00C2C7), violet (#7B5DFF), and warm gold (#FFC44D) against a deep navy (#0D1B2A) space background. Soft volumetric light, gentle bloom, rounded edges, no grime, no weapons, no menace. Bright, hopeful, toy-like precision. No text, letters, numbers, logos, or signage anywhere in the image.

### Style Block B — Lesson thumbnails (the 1400×788 cards)
> Bright, photo-real 3D render of a real-world scene for an elementary lesson card. Natural daylight or warm classroom light, shallow depth of field, clean uncluttered composition with the subject centered and room to breathe. Cheerful, curious, safe-for-kids. No people's faces in close-up, no text, letters, numbers, logos, or signage anywhere in the image.

---

# 1 · Core UI art (the must-haves)

| # | File | Size | Prompt |
|---|---|---|---|
| 1 | `teacher/challenges/relay_station.jpg` | 1916×821 | *(Style A)* A space-station communications bay seen head-on: a sleek white console desk with a softly glowing holographic keyboard floating just above it, keys lit in pastel finger-zone colors (pink, orange, yellow, mint, cyan, periwinkle, lavender, coral). Behind it, a tall relay antenna sends a ribbon of cyan light up into a starfield. Replaces the SVG placeholder. |
| 2 | `relay/ready_position.png` | 1200×900, transparent background | *(Style A)* Side view of a young cadet sitting at a station desk in perfect typing posture — back straight against the chair, both feet flat on the floor, wrists floating above a glowing keyboard, fingers curved, eyes forward on the screen. Simple, clean, almost diagram-like. Five small glowing cyan dots mark the back, feet, wrists, hands, and eyes — **dots only, no lines, no labels.** |
| 3 | `relay/home_row_hands.png` | 1400×700, transparent background | *(Style A)* Top-down view of two child-sized hands resting on a glowing keyboard in home-row position, fingers curved, thumbs on the space bar. Each finger glows a different pastel color and the key under it glows to match: left pinky pink #F9A8D4, left ring orange #FDBA74, left middle yellow #FDE047, left pointer mint #86EFAC, right pointer cyan #67E8F9, right middle periwinkle #A5B4FC, right ring lavender #D8B4FE, right pinky coral #FCA5A5, thumbs silver #CBD5E1. Keys blank — no letters. |
| 4 | `teacher/nav_relay_race.png` | 96×96 PNG | Flat line icon, 2px rounded periwinkle (#8B8BE8) strokes on a transparent background, matching the other sidebar icons: a checkered racing flag with three small signal arcs rising off it. |
| 5 | `teacher/relay_race_bg.jpg` | 1920×1080 | *(Style A)* A wide, mostly-empty mission-control wall for a projector background: dark navy, a faint grid, a horizontal chain of 24 small glowing segments arcing across the lower third like a relay baton passing down a line. Very low contrast in the center so white text stays readable on top. |
| 6 | `relay/station_hero.jpg` | 1400×788 | *(Style A)* The Relay Station itself from outside: a ring-shaped orbital station bristling with antenna dishes, one bright beam of cyan light leaving the array toward a distant planet. Used behind the track map header. |

---

# 2 · Rank badges (7) — `relay/ranks/<name>.png`, 512×512, transparent PNG

*(Style A)* Circular insignia medallion, front-on, centered, soft inner glow, subtle metal rim — a set that clearly escalates. No letters or numbers.

| File | Prompt |
|---|---|
| `recruit.png` | Brushed-steel ring, one small cyan chevron at the bottom, dim glow. Humble, just-starting. |
| `cadet.png` | Steel ring with a polished edge, two cyan chevrons, a single small star above them. |
| `ensign.png` | Silver ring, three chevrons, a violet gem set at the top, light bloom. |
| `lieutenant.png` | Silver-and-violet ring, three chevrons under a pair of small wings, brighter glow. |
| `commander.png` | Violet-and-gold ring, four chevrons, wings, a ring of tiny stars around the rim. |
| `captain.png` | Gold ring, five chevrons, broad wings, a bright gold crystal centered, strong warm bloom. |
| `admiral.png` | Radiant gold-and-white medallion with a full laurel of stars, a large luminous crystal at center, cyan and violet light rays behind it. Unmistakably the top. |

---

# 3 · Keyboard skin previews (7) — **Optional** — `relay/skins/<key>.png`, 480×160, transparent PNG

The picker currently draws little A-S-D-F keys in CSS, which works. These would make it feel like a real cosmetics shop. If you make them, the image is **four blank keycaps in a row, three-quarter view, no letters** — I'll overlay the letters.

| File | Prompt |
|---|---|
| `classic.png` | Four blank keycaps, soft translucent white glass on dark navy, gentle white rim light. Clean and plain. |
| `neon.png` | Four blank keycaps outlined in hot magenta and cyan neon tubing, dark background, light spill on the surface below. |
| `hologram.png` | Four blank keycaps made of floating translucent blue light with dashed glowing edges, slightly transparent, faint scan lines. |
| `retro.png` | Four blank keycaps as chunky beige-and-brown 1980s computer keys, slight wear, warm amber glow between them. |
| `nebula.png` | Four blank keycaps made of deep purple and pink nebula cloud with tiny stars inside the glass. |
| `solar.png` | Four blank keycaps in molten orange and gold, glowing cracks of light across the surfaces, small solar flare arcs above. |
| `galaxy.png` | Four blank keycaps of polished black glass holding a whole spiral galaxy inside, cyan and violet star dust, iridescent rim. |

---

# 4 · Student tiles — **Optional** — `relay/tiles/<name>.jpg`, 1400×788

The three special tiles (Foundations Track, Class Relay Race, Daily Transmission) currently use CSS gradients + an emoji. Art would look much better; send these and I'll swap them in.

| File | Prompt |
|---|---|
| `foundations.jpg` | *(Style A)* A glowing staircase of twenty light-platforms climbing from a station floor toward a bright doorway; a small friendly robot floats beside the third step. Violet and cyan light. |
| `race.jpg` | *(Style A)* A chain of cadets' light-pods strung along a glowing track that curves toward a checkered beam of light; a golden data-baton mid-flight between two pods. Gold and navy. |
| `daily.jpg` | *(Style A)* A single glowing transmission capsule arriving on a small landing pad at sunrise over a station hull, with a warm streak of light behind it. Teal and gold. |

---

# 5 · Mechara: Word Blaster game art — **Optional** — `games/mechara-word-blaster/assets/`

The game draws its own art in code right now and is fully playable. These would replace the code-drawn layers (same pattern as Lumara's assets folder).

| File | Size | Prompt |
|---|---|---|
| `city-background.webp` | 1920×1200 | *(Style A)* A robot relay city skyline at dusk seen from a low rooftop: layered towers with glowing data-conduits, floating rings, soft haze, empty sky across the top two-thirds so falling objects read clearly. |
| `scrap-drone.webp` | 512×512, transparent | *(Style A)* A small friendly scrap-hauler drone, boxy body, two glowing cyan eyes, four tiny thrusters, a little cargo clamp underneath holding nothing. Cute, not scary. Front-on. |
| `blaster-turret.webp` | 512×512, transparent | *(Style A)* A small white-and-gold signal turret on a round base, dish tilted upward, ring of cyan light around the barrel. Toy-like. |
| `shield-icon.webp` | 256×256, transparent | *(Style A)* A rounded hexagonal energy shield badge glowing cyan. |

---

# 6 · Lesson thumbnails — `cases/<CODE>.jpg`, 1400×788, Style Block B

Filename = the case code with dots turned into dashes: `RS.4.SCI02` → `cases/RS-4-SCI02.jpg`.

**Rule for the biography cards:** no portraits of the real person — likenesses come out wrong and it's a rights headache. Each one is an object still-life that stands for the person's work.

## Foundations, Daily, Race (3 shared cards, any grade)
| File | Prompt |
|---|---|
| `RS-3-TRACK.jpg` *(also save as `RS-4-TRACK.jpg`, `RS-5-TRACK.jpg`)* | *(Style A)* Twenty small glowing platforms spiraling upward through a station atrium, the first four already lit. |
| `RS-3-DAILY.jpg` *(also `RS-4-DAILY.jpg`, `RS-5-DAILY.jpg`)* | *(Style A)* A short glowing message capsule resting on a desk pad beside a small calendar-shaped light panel with no numbers on it. |
| `RS-3-RACE.jpg` *(also `RS-4-RACE.jpg`, `RS-5-RACE.jpg`)* | *(Style A)* Twenty-four light segments linking into one continuous glowing line across a dark console, the last few segments still dim. |

## Grade 3 — core set
| File | Prompt |
|---|---|
| `RS-3-S01.jpg` | A science table with a balance scale, a magnet with paper clips clinging to it, a thermometer in a beaker of water, and a small rock — properties of matter. |
| `RS-3-C01.jpg` | *(Style A)* A friendly white robot beside a young cadet at a landing-control console, both looking out a window at a planet below. |
| `RS-3-P01.jpg` | Close-up of a balance scale weighing two smooth stones, a ruler and a magnifying glass beside it on a sunlit classroom table. |
| `RS-3-L01.jpg` | A small telescope on a tripod by a bedroom window at night, an open notebook and pencil on the sill, stars outside. |
| `RS-3-P02.jpg` | Four small glass jars on a wooden table holding coins — one nearly full, one with a few, one empty, one with a folded bill — soft window light. |

## Grade 4 — core set
| File | Prompt |
|---|---|
| `RS-4-P01.jpg` | Sunlight breaking through clouds over a lake with visible mist rising off the water, a distant rain shower on the horizon. |
| `RS-4-P02.jpg` | A wide Texas landscape collage in one frame: flat coastal grassland in front, rolling hills, and dry mountains far behind under a big sky. |
| `RS-4-C01.jpg` | *(Style A)* Two young cadets kneeling beside a small six-wheeled rover with an open battery panel, tools on the ground, a friendly robot watching. |
| `RS-4-L01.jpg` | A neat desk with a sealed envelope, a fountain pen, and a folded star chart, lit by a desk lamp. |

## Grade 5 — core set
| File | Prompt |
|---|---|
| `RS-5-P01.jpg` | A sunlit yard where a tall pole casts a long sharp shadow across the grass, half the frame bright and half in shade. |
| `RS-5-P02.jpg` | A colonial-era wooden table with a pewter teapot, a stack of tax stamps-sized blank parchment squares, a quill, and a tricorn hat. |
| `RS-5-C01.jpg` | *(Style A)* A dim spacecraft cockpit lit only by one red standby light, a radio handset gripped in a gloved hand, dark screens all around. |
| `RS-5-L01.jpg` | A university office desk seen from above: an open letter, a globe, a small model rocket, and a cup of pencils. |

## Science readings
| File | Prompt |
|---|---|
| `RS-3-SCI01.jpg` | Three clear containers side by side on a windowsill: an ice cube on a dish, water in a glass, and steam curling from a warm mug. |
| `RS-3-SCI02.jpg` | Eight planets of the solar system arranged in order along a gentle arc against black space, the Sun blazing at the left edge. |
| `RS-3-SCI03.jpg` | A sunlit pond edge: green algae in the shallows, a small fish just below the surface, a heron standing still on the bank. |
| `RS-3-SCI04.jpg` | A volcano erupting at a distance across a valley, a fresh landslide scar on the near hillside. Dramatic but not frightening. |
| `RS-4-SCI01.jpg` | A copper pot with a metal spoon and a wooden spoon resting in it on a stove, plus a rubber-handled tool on the counter. |
| `RS-4-SCI02.jpg` | The same single tree shown in four seasons across one frame — bare, budding, full green, and golden. |
| `RS-4-SCI03.jpg` | A meadow ecosystem from above: grass, a grasshopper, a field mouse, and a hawk circling, all visible in one bright scene. |
| `RS-4-SCI04.jpg` | A river cutting through layered rock, undercut banks on one side and a fan of deposited sand and gravel on the other. |
| `RS-5-SCI01.jpg` | A clear bowl of trail mix beside a glass of sandy water settling into layers, and a magnet lifting iron filings out of sand. |
| `RS-5-SCI02.jpg` | A beam of light entering a glass prism on a white table, splitting into a rainbow, with a mirror reflecting a second beam. |
| `RS-5-SCI03.jpg` | A pond ecosystem cross-section in bright daylight: cattails, a turtle on a log, sunlight, rocks, and clear water. |
| `RS-5-SCI04.jpg` | A vast canyon carved by a winding river, layered red rock walls, late afternoon light. |

## Cadet Logs (story sets — keep each set visually consistent, Style A)
| File | Prompt |
|---|---|
| `RS-3-LOG01.jpg` | A young cadet's first day in a bright station control room, rows of glowing panels, a friendly robot gesturing at one blinking light. |
| `RS-3-LOG02.jpg` | A close-up of one console screen showing a pulsing cyan waveform, headphones resting beside it. |
| `RS-3-LOG03.jpg` | Two sets of boot prints crossing gray moon dust toward a small dark shape on the horizon, Earth low in the sky. |
| `RS-3-LOG04.jpg` | A tiny damaged robot plugged into a glowing power line inside a shuttle bay, its eyes just lighting up again. |
| `RS-4-LOG01.jpg` | A station greenhouse at dawn with frost creeping across the glass walls, red alarm light washing over the plants. |
| `RS-4-LOG02.jpg` | Close-up of frost-edged tomato leaves behind frosted glass, one droplet beginning to melt. |
| `RS-4-LOG03.jpg` | Two pairs of gloved hands holding a loose panel in place high on a greenhouse frame, tools floating in a magnetic tray. |
| `RS-4-LOG04.jpg` | The same greenhouse at dinnertime, clear glass, water droplets, healthy green plants, warm light. |
| `RS-5-LOG01.jpg` | A ship's bridge window looking out at a scattered asteroid field, a holographic map half-drawn in the air. |
| `RS-5-LOG02.jpg` | A dense asteroid field of wildly different sizes tumbling through space, one enormous rock in the foreground. |
| `RS-5-LOG03.jpg` | A glowing data chart floating over a console showing a clear repeating pattern of dots, a robot's hand pointing at it. |
| `RS-5-LOG04.jpg` | A narrow clear lane opening through the asteroid field with a small ship slipping through it, timer glow on the console. |

## Social Studies readings
| File | Prompt |
|---|---|
| `RS-3-SS01.jpg` | An old paper map on a wooden desk with a brass compass sitting on it and a decorative compass rose printed on the corner — no readable text. |
| `RS-3-SS02.jpg` | Three government buildings in one frame at different scales: a small town hall, a state capitol dome, and a national capitol, in clear daylight. |
| `RS-3-SS03.jpg` | A store shelf with only one item left on it and two children's hands reaching toward it, soft focus background. |
| `RS-3-SS04.jpg` | Neighbors of different ages picking up litter together in a sunny park, wearing gloves, smiling, seen from behind and at a distance. |
| `RS-4-SS01.jpg` | A still life of Texas symbols: bluebonnets in a jar, a pecan branch, a mockingbird perched on a fence post, a folded lone-star-blue cloth (no printed flag). |
| `RS-4-SS02.jpg` | A Spanish mission building in Texas at golden hour: white stone walls, arched bell openings, a courtyard with a well. |
| `RS-4-SS03.jpg` | The Alamo chapel facade at sunrise, empty plaza, long shadows, respectful and calm. |
| `RS-4-SS04.jpg` | A herd of longhorn cattle moving across open prairie at dawn with two distant riders on horseback. |
| `RS-5-SS01.jpg` | A colonial harbor at dawn: a tall wooden ship at anchor, crates and barrels on the dock, families' luggage stacked. |
| `RS-5-SS02.jpg` | Three classical stone buildings — a domed legislature, a columned courthouse, and an executive mansion — arranged in one balanced frame. |
| `RS-5-SS03.jpg` | An 1800s desk with a large hand-drawn map of a river basin, a quill, an inkwell, and a brass spyglass. |
| `RS-5-SS04.jpg` | A candlelit colonial meeting room with an empty chair pulled back from a writing desk, quill in the inkwell, blank parchment. |

## Biographies (object still-lifes — no portraits)
| File | Prompt |
|---|---|
| `RS-3-BIO01.jpg` | A Civil War-era field hospital table: an oil lantern, rolled bandages, a tin cup, and a small leather satchel, warm lamplight. |
| `RS-3-BIO02.jpg` | A hand spelling into another open palm above a weathered water pump, with a book in braille resting nearby, soft daylight. |
| `RS-3-BIO03.jpg` | A small pair of polished school shoes and a lunch pail at the bottom of wide school steps in 1960s morning light, long shadows. |
| `RS-3-BIO04.jpg` | A 1950s laboratory bench with glass vials in a rack, a microscope, and a syringe on a sterile tray. |
| `RS-4-BIO01.jpg` | A 1800s printing press with metal type trays beside a shelf of tin cans, warm workshop light. |
| `RS-4-BIO02.jpg` | A close-up of barbed wire strung between weathered fence posts across open prairie at sunset. |
| `RS-4-BIO03.jpg` | An empty wooden speaker's lectern with a microphone in a wood-paneled chamber, bright light from above. |
| `RS-4-BIO04.jpg` | A gleaming operating theater tray with surgical instruments and a small anatomical heart model, cool clean light. |
| `RS-5-BIO01.jpg` | An early wood-and-canvas glider on a windy beach with bicycle tools and a wrench in the sand beside it. |
| `RS-5-BIO02.jpg` | A kite with a key tied to its string lying on a wooden table beside printing type, spectacles, and a storm outside the window. |
| `RS-5-BIO03.jpg` | A wooden crate of peanuts and sweet potatoes beside glass jars of plant experiments on a rustic laboratory bench. |
| `RS-5-BIO04.jpg` | A single boot print in gray lunar dust with the lunar module's leg and Earth rising in the black sky behind. |

## ELAR text types
| File | Prompt |
|---|---|
| `RS-3-ELA01.jpg` | A child's hands pressing a seed into soil in a paper cup on a bright windowsill, a watering can nearby. |
| `RS-3-ELA02.jpg` | A model rocket lifting off a backyard launch pad at twilight with a bright plume and a trail of sparks. |
| `RS-3-ELA03.jpg` | A raised garden bed beside a school building with young vegetable sprouts, hand tools, and a watering can, bright morning. |
| `RS-3-ELA04.jpg` | A bake sale table outside a school: cupcakes on trays, a money jar, and a friendly dog waiting beside a leash. |
| `RS-4-ELA01.jpg` | An overhead shot of trail-mix ingredients in small bowls — cereal, raisins, pretzels — with a big mixing bowl and a scoop. |
| `RS-4-ELA02.jpg` | The view from a dim space-station window at night: sleeping bay lights low, stars streaking slowly past. |
| `RS-4-ELA03.jpg` | A classroom corner with a guinea pig in a clean cage, a water bottle, fresh vegetables in a dish, and a class chore chart with no readable writing. |
| `RS-4-ELA04.jpg` | A school gym robotics competition table with a small wheeled robot mid-task and a trophy on the corner of the table. |
| `RS-5-ELA01.jpg` | A silver rocket standing on a launch pad at dawn, mist around the base, utterly still. |
| `RS-5-ELA02.jpg` | A top-down view of ten fingers resting correctly on a clean modern keyboard on a tidy desk, blank keycaps. |
| `RS-5-ELA03.jpg` | A leafy potted plant on a classroom windowsill with a small watering can and a saucer, sunlight across the leaves. |
| `RS-5-ELA04.jpg` | A weather balloon rising above a school field with a small instrument package hanging below it, students' silhouettes far below. |

## Numbers readings (numerals in the *typing text*, never in the image)
| File | Prompt |
|---|---|
| `RS-3-NUM01.jpg` | A classroom voting station: a goldfish bowl, a hamster ball, and a toy turtle lined up on a table with a ballot box beside them. |
| `RS-3-NUM02.jpg` | A stack of well-read chapter books on a nightstand with a bookmark sticking out and a reading lamp glowing. |
| `RS-3-NUM03.jpg` | A young bean plant in a clear cup beside a ruler standing upright in the soil, bright window light. |
| `RS-3-NUM04.jpg` | A yellow school bus parked in front of a science museum entrance on a clear morning. |
| `RS-4-NUM01.jpg` | A classroom weather station on a windowsill: thermometer, rain gauge, and a small anemometer against a blue sky. |
| `RS-4-NUM02.jpg` | A Texas landscape panorama at golden hour — prairie, a windmill, and a distant capitol dome on the horizon. |
| `RS-4-NUM03.jpg` | A classroom store counter with pencils in a cup, erasers in a tray, folders stacked, and a small cash box with coins. |
| `RS-4-NUM04.jpg` | A wooden table with a folded 1830s map of Texas, a compass, and a cavalry-style hat, warm lamplight. |
| `RS-5-NUM01.jpg` | Overhead shot of pancake ingredients in measuring cups — flour, milk, an egg — around a mixing bowl on a wooden counter. |
| `RS-5-NUM02.jpg` | A Saturn V-style rocket on the pad at sunrise with the Moon still visible in the pale sky. |
| `RS-5-NUM03.jpg` | A school track's finish line from a low angle, lane lines converging, a stopwatch on the grass beside it. |
| `RS-5-NUM04.jpg` | Three aircraft in one sky in silhouette: an early biplane, a propeller airliner, and a jet, arranged low to high. |

---

# 7 · Not in this batch (on purpose)
- **S.A.M. poses** — he already has five skins × seven states in `icons/sam/`; Relay Station reuses them.
- **Mechara world art** — `planets/robot_relay_city.jpg` already exists and the world page uses it.
- **Webcam hand-check** — still parked.
