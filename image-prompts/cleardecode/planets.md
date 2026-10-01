# ClearDecode · Relic Lab planet art (Sept 30, 2026)

The star chart on the ClearDecode home screen shows all 11 planets. Each planet is a small, separate picture, so the student's planet can glow and locked planets can dim. Until a file is added, a colored orb stands in.

**Style for every planet (paste at the start of each prompt):**
A single small floating planet-island game icon, 3D stylized illustration, bright and polished like a premium mobile adventure game. It is a round world seen slightly from above, with a flat top carrying a tiny scene, rocky underside, soft rim light, crisp edges. It matches a bright white-and-cyan space-station UI with glowing teal accents. Transparent background, centered, no text, no letters, no labels, no characters, no border. Square 1024 x 1024 PNG.

Save each one as a PNG named with its letter (A.png ... K.png) and drop them in one folder or zip. Claude converts them and wires them in (`public/decode/planets/`, listed in `PLANET_ART` in `components/cleardecode/Stage.js`).

| File | Planet | Prompt (after the shared style) |
|---|---|---|
| A.png | Mudfall | A muddy tidal-flat world: shallow shining water, wet brown mud, a small ancient stone gate with a glowing cyan door, a few standing stones and green grass tufts. |
| B.png | Ashmoor | A gray ash-moor world: soft gray hills, a moss-covered stone wall, a small rock dock by dark water, faint embers in the ash. |
| C.png | Hollowstone | A world of pale stone with hollow caves and domes: a cave mouth glowing warm, small stone domes, an icy blue lake inside a crater. |
| D.png | Dusk | A dusk-lit world under a dim orange sun: long shadows, a hilltop with small empty huts, a tunnel entrance glowing faintly, purple sky tones. |
| E.png | Coldrim | A cold, dusty rim world: a frosty ridge, an old stone outpost hut, a stone observatory dome on a dusty cliff edge, pale blue-gray palette. |
| F.png | Stormhold | A stormy world: a stone fort on a cliff with a tall turret, swirling storm clouds hugging one side, small lightning sparks, a shipyard of old ship hulls. |
| G.png | Tidewater | An ocean world: turquoise sea, a stone sea road of glowing floats, a tall lighthouse spire on a cliff, a stone keep on a reef. |
| H.png | The Far Ports | A port world: a moon dock with ship hooks, a blue hangar, a tall cloud tower with a lamp, a small launch pad, soft violet tones. |
| I.png | Frostreach | A frozen world: snow fields, ice steps cut into black rock, a sealed stone gate, a cold white glow, pale blue and white palette. |
| J.png | The Long Dark | A dark, quiet world drifting in deep space: a small lit repair station clamped to black rock, a silent derelict ship nearby, tiny beacon lights, deep navy palette with cyan lights. |
| K.png | Haven | An ice world with warm water under it: cracked blue ice with steam rising from a vent, a grand archive doorway half-buried in the ice, glowing cyan and gold light. |

**Optional later: room scenes.** These would match the six backgrounds already in `public/decode/scenes/`, same station-window framing with ruins outside:
- **Sorting chamber:** two stone vaults with an open space between them.
- **Forge:** a glowing stone anvil and molds on the console.
- **Inscription tablet:** a large blank parchment-stone tablet.
- **Ruin Runner:** a three-lane rover tunnel.
- **Relic case:** a display shelf.
- **Each planet's window view:** for example Haven's ice, Tidewater's sea. Each room would then automatically show the window view of the student's planet.
