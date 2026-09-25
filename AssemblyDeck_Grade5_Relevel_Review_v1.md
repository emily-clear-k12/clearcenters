# Assembly Deck — Grade 5 Re-level Review (v1)

*Sept 24, 2026. For Emily (author of record). Nothing here is committed or pushed. No SQL is needed.*

## What changed and why

The Sept 24 checks found that the grade 5 Assembly Deck cases read like grade 3. Their sentences were short and simple, and grade 5 read no harder than grade 4. These 15 grade 5 cases were rewritten to read at grade 5. One grade 4 case (SS.4.3D-AD) read too hard, so it was brought down. **Only student-facing text changed.** Every id, answer key, decoy category, pinpoint answer and piece order is identical to before (checked by script). Some cases gained 1–3 lines of source notes so the richer sentences are backed by the notes. The notes panel shows every line, so nothing is cut off.

How the level was raised: real grade 5 sentence structure (because, although, which, as a result, if…then) and richer, precise words, not just longer sentences (STATE §9 rule 17b). Standards vocabulary was kept. Decoys were rewritten to be as well written as the correct sentences, so style doesn't give the answer away.

**Results:** all 16 cases pass the reading-level gate with no word-choice warnings, and all 66 cases still pass the case checker. Grade 5 now reads at **5.2 on average** (was 3.3), clearly above grade 4 (3.3). Grades 3 and 4 have not been re-leveled yet.

| Case | FK before | FK after | Band |
|---|---|---|---|
| 5.6B-AD | 4.2 | 6.4 | 5.0–7.2 |
| 5.8C-AD | 2.3 | 5.7 | 5.0–7.2 |
| 5.9-AD | 2.9 | 6.5 | 5.0–7.2 |
| 5.10A-AD | 4.0 | 6.2 | 5.0–7.2 |
| 5.10C-AD | 4.0 | 6.7 | 5.0–7.2 |
| 5.12A-AD | 4.7 | 6.6 | 5.0–7.2 |
| 5.12B-AD | 3.4 | 5.9 | 5.0–7.2 |
| SS.5.2A-AD | 3.7 | 6.4 | 5.0–7.2 |
| SS.5.12B-AD | 3.3 | 6 | 5.0–7.2 |
| SS.5.14A-AD | 4.6 | 6.3 | 5.0–7.2 |
| SS.5.15B-AD | 3.3 | 6.3 | 5.0–7.2 |
| ELA.5.7D-AD | 2.4 | 6 | 5.0–7.2 |
| ELA.5.12B-AD | 2.4 | 6.1 | 5.0–7.2 |
| ELA.5.12D-AD | 3.0 | 6.3 | 5.0–7.2 |
| ELA.5.13D-AD | 3.5 | 6.2 | 5.0–7.2 |
| SS.4.3D-AD | 6.0 | 5.1 | 3.5–5.6 |

## Things to look at (collected from all 16 cases)

- **5.6B-AD:** - r2p6 and r3p6 ("Scientists must always use heat to separate a mixture") are labeled unsupported, as in the original. A sharp student could argue "contradicts" (the notes say no new substance formed / a magnet did the job without heat). Same ambiguity existed before; worth a look.
- **5.8C-AD:** - FK 5.7 is inside the band but at the lower end of the 5.8–6.5 aim; I kept sentences short where the physics reads best short.
- **5.9-AD:** - Directions (east/west) in the notes assume a Northern Hemisphere school (Texas). They are correct there. - Piece FK sits at 6.5, the top of the aim range. Most of it comes from standards vocabulary (rotation, observation, apparent).
- **5.10A-AD:** - "condensed" and "water vapor" add water-cycle vocabulary that is in the grade 5 standards but was missing from this case. Please check that you want condensation named here, since 5.10A is about the sun and ocean interaction rather than the full cycle.
- **5.10C-AD:** - Pre-existing mismatch, not changed: the explain prompt asks "why did the canyon not form in a day", but mustInclude item 3 asks for wind/ice or "not the same landform". You may want mustInclude 3 to match explain criteria 3 (formed over a very long time). - "Far beneath the rim" introduces "rim"; kid-decodable, but not in the notes' original wording (I added it to the notes line too).
- **5.12A-AD:** - The oxygen and algae facts are new content. They are accurate and fit 5.12A (organisms interacting with biotic and abiotic factors), but they go beyond the original notes. - Piece FK is 6.6. The polysyllabic standards words (biotic, abiotic, ecosystem, organism) push it up, so the non-standards wording was kept plain.
- **5.12B-AD:** - Round 2/3 reasonOptions include "story", which no decoy uses (unchanged from original). - Average sentence length is 15.8, just under the 16 limit; any future lengthening of a piece here would break the gate.
- **SS.5.2A-AD:** - `repair.prompt` in public.js is a copy of the look prompt ("Look at the cause line. Which sentence matches the picture?"), which does not fit a repair step. This pattern appears in other generated cases too; I left it unchanged because it may be intentional to the player. - r2p1 uses "pushed back with protests" — plain, but check you are happy with the phrasing.
- **SS.5.12B-AD:** - Please confirm you are OK with the new r3p5 decoy (see above). It is the one real change to a decoy's content, made to keep the decoy honest to its "unsupported" label. - `repair.prompt` copies the look prompt ("Look at the mill line..."), which does not fit a repair step. Left unchanged.
- **SS.5.14A-AD:** - r2p2 is two sentences ("...pursuit of happiness. No one can take these rights away.") — a light, kid-level gloss of "unalienable." Check that you're happy with it being taught this way. - `repair.prompt` copies the look prompt. Left unchanged.
- **SS.5.15B-AD:** - Rich-word share is 3.2%, just over the 3% floor. It passes, but it has the least margin of my four cases. - `repair.prompt` copies the look prompt. Left unchanged.
- **ELA.5.7D-AD:** - Pre-existing overlap: the pinpoint prompt ("says cars will still drive on Maple Street") targets r2p2 only, but r3p3 ("Cars can still use the street…") says nearly the same thing. The hint points to the limit paragraph, so it works, but a student who taps r3p3 gets the miss note. Consider adding r3p3 to pinpointAccept or narrowing the prompt; I did not change either. - Pre-existing: `repair.prompt` repeats the `look` prompt.
- **ELA.5.12B-AD:** - Pre-existing, not changed: `repair.prompt` repeats the `look` prompt ("Look at the watershed line. Which sentence matches the picture?") though the repair is about fixing r2p5. Also, `repair.model` says "The notes never say…" (unsupported wording) while r2p5's decoyReason is `contradicts`. Worth a look.
- **ELA.5.12D-AD:** - Rich-word share is 3.9%, just above the 3% floor, because much of the case is short questions and names. It passes, but it is the thinnest of my four. - Pre-existing, not changed: `repair.prompt` repeats the `look` prompt even though the repair is about r2p5.
- **ELA.5.13D-AD:** - r1p6 ("This question is so simple that it does not require any source at all.") is tagged `contradicts`. That was already the tag, but it reads more like an unsupported claim or an opinion. I kept the tag and wrote the explanation to point at the notes. - Pre-existing: `repair.prompt` repeats the `look` prompt.
- **SS.4.3D-AD:** - "deep in debt" (from the original notes) is a mild idiom. I kept it because it is the notes' own phrase and the image of the empty chest backs it up.

**Checked, no action needed:** several notes above mention that `repair.prompt` is a copy of the picture ("look") question. That's by design. The repair step in `AssemblyDeckClient.js` (RepairRound) shows the picture question and its choices, so the two prompts are meant to match. All 60 cases with a repair step do this.

## Case by case

Each case shows the notes before and after, then every sentence card, before → after. *Role* is where the card goes; a decoy shows its category.

### 5.6B-AD — The Sorting Table (FK 4.2 → 6.4)

**Brief before:** A jar of iron filings and sand got mixed on the sorting table. A magnet pulled the iron out. The sand stayed sand. Neither part became something new. Build the log from the test. A favorite tool is not evidence.

**Brief after:** Someone spilled a jar of iron filings into a tray of sand, and now the two are mixed on the sorting table. A magnet pulled the iron out, while the sand stayed behind. Neither part became something new. Build the log from what the test showed. A favorite tool is not evidence.

**Notes before:**
- The jar held iron filings mixed with sand.
- A magnet pulled the iron filings out. The sand did not stick.
- After the sort, the iron was still magnetic.
- The sand was still gritty, and it still did not stick to the magnet.
- Mixing did not make a new substance. Each part kept its own properties.

**Notes after:**
- The jar held iron filings mixed with sand. The dark filings were spread all through the pale sand.
- A magnet pulled the iron filings out. The sand did not stick, so it stayed behind on the table.
- After the sort, the iron was still magnetic.
- The sand was still gritty, and it still did not stick to the magnet.
- Mixing did not make a new substance. Each part kept its own properties.

| Round | Role | Before | After |
|---|---|---|---|
| What was in the jar | details | Both parts were still in the jar before anyone sorted it. | Before anyone sorted the jar, the dark filings were spread all through the pale sand. |
| What was in the jar | decoy: opinion | The magnet is the best tool because it looks powerful. | The magnet is clearly the most impressive tool on the table, because it looks so powerful. |
| What was in the jar | topic | The jar held a mixture of iron filings and sand. | The jar on the sorting table held a mixture of two substances: iron filings and sand. |
| What was in the jar | decoy: offtopic | The sugar dissolved, so that matter disappeared. | When sugar is stirred into water, it dissolves until you can no longer see it. |
| What was in the jar | details | The iron was still iron, and the sand was still sand. | Although the two had been stirred together, the iron was still iron and the sand was still sand. |
| What was in the jar | conclusion | Mixing them did not make a new substance. | As a result, mixing them did not create a new substance. |
| How the parts were separated | details | The magnet pulled out the iron filings. | When the crew passed a magnet over the jar, it attracted the iron filings and pulled them out. |
| How the parts were separated | decoy: contradicts | The sand stuck to the magnet, and the iron stayed down. | When the crew passed a magnet over the jar, the sand clung to it while the iron stayed behind. |
| How the parts were separated | topic | The crew separated the mixture without changing the parts. | The crew separated the mixture without changing either of the substances inside it. |
| How the parts were separated | decoy: unsupported | Stirring harder turned the mixture into a new metal. | If the crew had stirred much harder, the iron and sand would have fused into a new metal. |
| How the parts were separated | details | The sand did not stick, so it stayed on the table. | The sand did not stick to the magnet, so it remained on the table in its own pile. |
| How the parts were separated | conclusion | The parts could be separated because each one kept its own properties. | Because each substance kept its own properties, a magnet was enough to separate them. |
| What the sort proves | details | The iron was still magnetic after it was pulled out. | After the iron was pulled out of the jar, it was still magnetic. |
| What the sort proves | decoy: contradicts | The iron lost its magnetism because it touched sand. | Because it had touched the sand for so long, the iron lost its magnetism during the sort. |
| What the sort proves | topic | The sort is evidence about the parts, not about a new material. | The sort provides evidence about the two original parts, not about a new material. |
| What the sort proves | decoy: unsupported | A mixture always has to be separated with heat. | Scientists must always use heat to separate a mixture into its parts. |
| What the sort proves | details | The sand was still gritty, and it still did not stick to the magnet. | The sand was still gritty to the touch, and it still did not stick to the magnet. |
| What the sort proves | conclusion | This mixture kept the properties of the substances in it. | Therefore, this mixture kept the properties of the substances that formed it. |

**Pinpoint:** One sentence says this mixture kept the properties of the substances in it. Tap that sentence.  ·  **Written question:** The chief has one more question. How was the mixture separated, and what does that show about the iron and the sand?

### 5.8C-AD — The Bent Straw (FK 2.3 → 5.7)

**Brief before:** One flashlight, one table, three things light can do. It traveled straight, bounced off a mirror, bent at the water, and stopped at a black card. Build the log. The straw is not really broken.

**Brief after:** One flashlight, one table, and three things light can do. The beam traveled straight, bounced off a mirror, bent at the water, and stopped at a black card. Build the log from what the crew observed. The straw only looks broken.

**Notes before:**
- The flashlight beam traveled in a straight line across the table.
- A mirror bounced that beam to the wall. That bounce is reflection.
- A straw in a glass of water looked bent at the water line. The straw was not broken.
- Light changed direction as it entered the water. That is refraction.
- A black card in the beam stopped the light. The wall behind the card stayed dark. That is absorption.

**Notes after:**
- The flashlight beam traveled in a straight line across the table.
- A mirror bounced that beam to the wall. That bounce is reflection.
- A straw in a glass of water looked bent at the water line. The straw was not broken.
- Pulled out of the water, the straw was straight.
- Light changed direction as it entered the water. That is refraction.
- A black card in the beam stopped the light. The wall behind the card stayed dark. That is absorption.

| Round | Role | Before | After |
|---|---|---|---|
| The straight beam | details | The flashlight beam crossed the table without a turn. | The flashlight beam crossed the whole table in a straight line, without turning or curving. |
| The straight beam | decoy: contradicts | The beam curled through the air like a hose. | Before it reached anything, the beam curled through the air like water spraying from a hose. |
| The straight beam | topic | The test started with light moving in a straight line. | The investigation began with light traveling in a straight line from the flashlight. |
| The straight beam | decoy: opinion | The straw was magic, so the light does not matter. | Honestly, the bent straw seems more like a magic trick, so tracking the light feels pointless. |
| The straight beam | details | Nothing in the air bent that first stretch of the beam. | Nothing in the open air changed the direction of that first stretch of the beam. |
| The straight beam | conclusion | Reflection and refraction happen when that straight light meets something. | Reflection and refraction happen only after that straight beam meets a surface or enters a new material. |
| Bounce, bend, and stop | details | The mirror reflected the beam and bounced it to the wall. | When the beam struck the mirror, it reflected, bouncing the light onto the wall. |
| Bounce, bend, and stop | decoy: contradicts | The mirror swallowed the beam, so no light reached the wall. | When the beam struck the mirror, the glass swallowed it, so no light reached the wall. |
| Bounce, bend, and stop | topic | The same straight light did three different things. | Along its path, the same straight beam of light did three different things. |
| Bounce, bend, and stop | decoy: contradicts | The straw really snapped in half inside the glass. | The straw in the glass had actually snapped in half, which is why it looked bent. |
| Bounce, bend, and stop | details | The water refracted the light, so the straw looked bent. | As the light entered the water, it refracted, which made the straw look bent. |
| Bounce, bend, and stop | conclusion | The black card absorbed the light, and the wall behind it stayed dark. | Finally, the black card absorbed the light, so the wall behind it stayed dark. |
| What the straw shows | details | The straw looked bent right at the water line. | From the side, the straw appeared to bend sharply right at the water line. |
| What the straw shows | decoy: unsupported | The straw bends because water is heavy. | The straw appeared to bend because the heavy water was pressing down on it. |
| What the straw shows | topic | The bent straw is a trick of the light, not a broken object. | The bent straw was an illusion caused by light, not a sign of a broken object. |
| What the straw shows | decoy: offtopic | A black card is what made the straw look bent. | Dark surfaces like the black card absorb light, while shiny surfaces like the mirror reflect it. |
| What the straw shows | details | Pulled out of the water, the straw was straight. | When the crew pulled the straw out of the water, it was perfectly straight. |
| What the straw shows | conclusion | Refraction changed the light's direction. It did not change the straw. | Refraction changed the direction of the light, but it did not change the straw itself. |

**Pinpoint:** One sentence says refraction changed the light, not the straw. Tap that sentence.  ·  **Written question:** The chief has one more question. What did the light do at the mirror, at the water, and at the black card?

### 5.9-AD — Shadows Move (FK 2.9 → 6.5)

**Brief before:** Earth rotates about once every 24 hours. That spin causes day and night. Shadows changed because Earth rotated, not because the Sun orbited the flagpole.

**Brief after:** Ms. Alvarez's class observed the flagpole's shadow three times in one school day. Write a short science report that explains what they observed. Use the shadow notes to show how Earth's rotation causes day and night and makes the shadows change.

**Notes before:**
- Earth rotates on its axis about once every 24 hours.
- That rotation causes day and night.
- The morning shadow was long. The noon shadow was short.
- The Sun appeared to move. Earth was rotating.

**Notes after:**
- Earth rotates, or spins, on its axis, an imaginary line through the North and South Poles.
- One complete rotation takes about 24 hours.
- The half of Earth facing the Sun has day, while the half facing away has night.
- 9 a.m.: the Sun was low in the eastern sky. The flagpole's shadow was long and pointed west.
- Noon: the Sun was high in the sky. The shadow was short.
- 3 p.m.: the Sun was lower in the western sky. The shadow was long again and pointed east.
- The Sun appeared to move across the sky, but Earth was the one rotating.

| Round | Role | Before | After |
|---|---|---|---|
| The spin | details | One rotation takes about 24 hours. | Each complete rotation takes about 24 hours, which is the length of one day and one night. |
| The spin | decoy: contradicts | Earth rotates once each year, and that causes night. | Earth completes only one rotation each year, and that slow turn is what causes night. |
| The spin | topic | Earth rotates on its axis. | Earth is always rotating on an imaginary line called its axis. |
| The spin | decoy: contradicts | Night happens because the Sun goes out. | Night happens because the Sun stops shining for a few hours. |
| The spin | details | That spin causes day and night. | As Earth turns, the side facing the Sun has daytime, while the side facing away has night. |
| The spin | conclusion | The school day is part of that rotation. | So every sunrise and sunset we observe is part of that steady rotation. |
| The shadows | details | The morning shadow was long. | In the morning, when the Sun was low in the eastern sky, the flagpole's shadow was long. |
| The shadows | decoy: contradicts | The Sun orbited the flagpole. | The Sun orbited the flagpole during the day, which is why its shadow kept moving around it. |
| The shadows | topic | Shadows changed as Earth rotated. | Throughout the school day, the flagpole's shadow changed its length and direction as Earth rotated. |
| The shadows | decoy: contradicts | Shadows stay the same shape all day. | The shadow kept the same length and shape from morning until afternoon. |
| The shadows | details | The noon shadow was short. | At noon, when the Sun appeared high in the sky, the same shadow was much shorter. |
| The shadows | conclusion | Earth's rotation made the Sun look like it moved. | Although the Sun seemed to move across the sky, Earth's rotation caused the change. |
| One explanation | details | Day and night come from the spin. | Day and night happen because the rotation carries each place into sunlight and back out. |
| One explanation | decoy: unsupported | Shadows change because the flagpole grows. | Shadows change length because the flagpole grows taller at certain times of the day. |
| One explanation | topic | One rotation explains the observations. | One cause explains every observation in our notes: Earth's rotation. |
| One explanation | decoy: unsupported | The Moon pulls the shadows across the ground. | The Moon's gravity slowly pulls the shadows across the ground while we are at school. |
| One explanation | details | Shadow length and position change for the same reason. | The shadows changed for the same reason, since the Sun's position in our sky kept shifting. |
| One explanation | conclusion | The apparent motion of the Sun comes from Earth's rotation. | So the Sun's apparent motion across the sky is really caused by Earth's rotation. |

**Pinpoint:** One sentence tells how long a single rotation takes and connects it to day and night. Tap it.  ·  **Written question:** How does Earth's rotation explain day and night and the changing shadows the class observed?

### 5.10A-AD — Heat From the Ocean (FK 4.0 → 6.2)

**Brief before:** The sun heated the ocean surface. Water evaporated, rose, and formed clouds. That ocean moisture can affect the weather. The ocean does not do it without the sun.

**Brief after:** Ms. Alvarez's class tracked what happened above a warm patch of ocean on a sunny day. Write a short science report from their notes. Explain what the sun and the ocean each supplied, and how that moisture can affect the weather.

**Notes before:**
- The sun heated the ocean surface.
- Ocean water evaporated.
- Warm, moist air rose and formed clouds.
- That moisture can become storms.
- The ocean supplies water. The sun supplies energy.

**Notes after:**
- The sun's energy heated the ocean surface.
- The heated ocean water evaporated, changing from liquid water into water vapor, an invisible gas.
- The warm, moist air rose. As it climbed higher, it cooled.
- The cooled water vapor condensed into tiny droplets, which gathered into clouds.
- Over warm ocean water, that moisture can build up and grow into storms.
- The ocean holds most of Earth's water.
- The ocean supplies the water. The sun supplies the energy.

| Round | Role | Before | After |
|---|---|---|---|
| Sun and ocean | details | The sun heated the surface water. | Energy from the sun heated the water at the ocean's surface. |
| Sun and ocean | decoy: contradicts | The ocean boiled with no sun at all. | The ocean water boiled on its own, even though no sunlight reached it. |
| Sun and ocean | topic | The sun and the ocean work together in the water cycle. | The sun and the ocean work together to power this part of the water cycle. |
| Sun and ocean | decoy: contradicts | The moon heated the ocean in this test. | In these notes, it was the moon's light that heated the ocean surface. |
| Sun and ocean | details | Ocean water evaporated into the air. | As the surface warmed, ocean water evaporated and became water vapor, an invisible gas. |
| Sun and ocean | conclusion | The sun supplied the energy. | In other words, the sun supplied the energy that lifted water out of the ocean. |
| The weather | details | Moist air rose from the ocean. | The warm, moist air rose, and as it climbed higher, it cooled. |
| The weather | decoy: contradicts | Clouds over the ocean are smoke. | The clouds that form over the ocean are made of smoke rather than water. |
| The weather | topic | Ocean moisture can affect weather. | Moisture from the ocean can have a powerful effect on the weather. |
| The weather | decoy: contradicts | Weather never comes from the ocean. | Weather never comes from the ocean, because storms form only over land. |
| The weather | details | Clouds formed from that moisture. | The cooled water vapor condensed into tiny droplets, which gathered into clouds. |
| The weather | conclusion | Storms can grow from ocean water vapor. | When enough of that moisture builds up over warm water, it can grow into a storm. |
| The interaction | details | The ocean supplies the water. | The ocean supplies the water, since it holds most of Earth's water. |
| The interaction | decoy: contradicts | The ocean is the energy source, and the sun is decoration. | The ocean supplies the energy, so the sun is just bright scenery in the sky. |
| The interaction | topic | Neither one does this job alone. | Neither the sun nor the ocean could run this part of the water cycle alone. |
| The interaction | decoy: unsupported | The rain is salt water that skipped the cycle. | The rain that falls on land is salt water that skipped the rest of the cycle. |
| The interaction | details | The sun supplies the energy. | The sun supplies the energy, which turns liquid water into vapor. |
| The interaction | conclusion | Together they affect the water cycle and the weather. | Together, the sun's energy and the ocean's water drive the water cycle and shape our weather. |

**Pinpoint:** One sentence closes the first paragraph by naming what the sun supplied. Tap it.  ·  **Written question:** How do the sun and the ocean work together in the water cycle, and how can that affect the weather?

### 5.10C-AD — Reading a Canyon (FK 4.0 → 6.7)

**Brief before:** A river has been cutting one canyon for a very long time. The same water carries sediment and drops it in a delta. Wind and ice shape land too. Build the log from the land, not from a one-day story.

**Brief after:** A river has been cutting one canyon for a very long time. The same water carries sediment downstream and drops it in a delta. Wind and ice shape land too. Build the log from the evidence the land reveals, not from a one-day story.

**Notes before:**
- The canyon walls show layers of rock.
- A river at the bottom is cutting those layers and carrying sediment away.
- This canyon did not form in a day. The cutting has taken a very long time.
- Where the river slows at the sea, it drops that sediment and builds a delta.
- Wind can pile sand into dunes. Ice can carve rock too. Those are different landforms.

**Notes after:**
- The canyon walls show layers of rock, stacked one on top of another over time.
- A river far beneath the rim is cutting those layers and carrying sediment away.
- Sediment is tiny particles of rock, sand, and soil that water can carry.
- This canyon did not form in a day. The cutting has taken a very long time.
- Where the river slows at the sea, it drops that sediment and builds a delta.
- Wind can pile sand into dunes. Ice can carve rock as it slowly moves across a region. Those are different landforms.
- Like the river, wind and ice change the land gradually.

| Round | Role | Before | After |
|---|---|---|---|
| What the walls show | details | The walls show layers of rock stacked over time. | The walls reveal layers of rock that were stacked one on top of another over time. |
| What the walls show | decoy: contradicts | The canyon appeared overnight after one storm. | The whole canyon appeared overnight after a single powerful storm. |
| What the walls show | topic | The canyon walls are a record of rock, not a one-day event. | The canyon walls are a record of slow change, not evidence of a one-day event. |
| What the walls show | decoy: unsupported | The layers are paint someone added to make the walls pretty. | The colorful layers are paint that visitors added to make the walls look prettier. |
| What the walls show | details | A river runs at the bottom and is cutting into those layers. | Far beneath the rim, a river is gradually cutting deeper into those layers. |
| What the walls show | conclusion | The layers were already there before today's water touched them. | The layers had already formed long before today's water began to wear them away. |
| What the river is doing | details | It carries sediment away from the canyon walls. | As it flows, the river carries sediment, such as tiny particles of rock and sand, away from the canyon walls. |
| What the river is doing | decoy: contradicts | The river drops the sediment at the top of the canyon. | The river deposits its sediment at the top of the canyon, where the water moves fastest. |
| What the river is doing | topic | The river is both cutting rock and moving sediment. | The river is doing two jobs at once: cutting rock and moving sediment. |
| What the river is doing | decoy: opinion | The delta formed because the wind got tired. | The delta is the most beautiful part of the river, so it deserves the most attention. |
| What the river is doing | details | Where the river slows at the sea, it drops that sediment. | Where the river slows down as it reaches the sea, it deposits that sediment. |
| What the river is doing | conclusion | One river can carve a canyon and build a delta. | In this way, one river can carve a canyon in one place and build a delta in another. |
| Other ways land changes | details | Wind can pile sand into dunes. | Wind can pick up loose sand and gradually pile it into hills called dunes. |
| Other ways land changes | decoy: unsupported | Dunes are built by the same river that cuts this canyon. | The dunes along the coast were built by the same river that cuts this canyon. |
| Other ways land changes | topic | Water is not the only thing that shapes the land. | Although water shaped this canyon, it is not the only force that changes the land. |
| Other ways land changes | decoy: contradicts | A canyon, a delta, and a dune are all the same landform. | A canyon, a delta, and a dune are really the same landform with different names. |
| Other ways land changes | details | Ice can carve rock as it moves. | Ice can also carve rock as it slowly moves across a region. |
| Other ways land changes | conclusion | Wind, water, and ice each change Earth's surface, and none of them finish in a day. | Wind, water, and ice each change Earth's surface, and none of them finish their work in a day. |

**Pinpoint:** One sentence says one river can carve a canyon and build a delta. Tap that sentence.  ·  **Written question:** The chief has one more question. How does the river shape both the canyon and the delta, and why did the canyon not form in a day?

### 5.12A-AD — The Pond Tank (FK 4.7 → 6.6)

**Brief before:** The tank has living things and nonliving things. Fish, a plant, and a snail are biotic. Sunlight, water, temperature, and gravel are abiotic. The fish needs both.

**Brief after:** Ms. Alvarez's class set up a small pond tank with a fish, a plant, and a snail. Write a short science report that sorts the tank's biotic and abiotic factors. Then explain how the fish depends on both kinds to survive.

**Notes before:**
- Biotic factors are living or once living: the fish, the plant, and the snail.
- Abiotic factors are nonliving: sunlight, water, temperature, and gravel.
- The fish needs both kinds.
- Sunlight and gravel are not alive.

**Notes after:**
- Biotic factors are the living or once-living parts of an ecosystem. In this tank: the fish, the plant, and the snail.
- Abiotic factors are the nonliving parts. In this tank: sunlight, water, temperature, and gravel.
- Sunlight, water, and gravel are not alive, even though living things use them.
- The plant uses sunlight to make food and releases oxygen into the water. The fish takes in that oxygen.
- The snail eats algae, which helps keep the water clean.
- The fish needs water that stays at a steady temperature.
- The fish needs both kinds of factors to survive.

| Round | Role | Before | After |
|---|---|---|---|
| Living factors | details | The fish is biotic. | The fish is a biotic factor because it is a living organism. |
| Living factors | decoy: contradicts | The gravel is biotic because it sits in the tank. | The gravel is biotic because it sits in the tank alongside the living things. |
| Living factors | topic | Biotic factors are living or once living. | Biotic factors are the parts of an ecosystem that are alive or were once alive. |
| Living factors | decoy: contradicts | Sunlight is a living thing. | Sunlight is a living thing because it moves and changes during the day. |
| Living factors | details | The plant and the snail are biotic too. | The plant and the snail are also biotic, since both are living organisms. |
| Living factors | conclusion | Those living things are part of the tank's system. | Together, these organisms make up the living part of the tank. |
| Nonliving factors | details | Sunlight is abiotic. | Sunlight is abiotic, since it is not alive even though the plant depends on it. |
| Nonliving factors | decoy: contradicts | Water is biotic because fish swim in it. | Water becomes biotic once fish swim in it, because it holds living things. |
| Nonliving factors | topic | Abiotic factors are nonliving. | Abiotic factors are the parts of an ecosystem that are not alive, and our tank has several. |
| Nonliving factors | decoy: contradicts | A healthy tank needs only living things. | A healthy tank needs only living things, so the nonliving parts could be removed. |
| Nonliving factors | details | Water and temperature are abiotic too. | Water, temperature, and gravel are abiotic too, because none of them is alive. |
| Nonliving factors | conclusion | The fish still needs those nonliving factors. | Although these factors are not alive, the fish still needs them to survive. |
| How the fish survives | details | It interacts with the plant and the snail. | The fish interacts with the plant, which releases oxygen, and with the snail, which helps keep the water clean. |
| How the fish survives | decoy: contradicts | Remove the water and the fish will thrive. | If the water were removed, the fish would thrive with more room to move. |
| How the fish survives | topic | The fish survives by using both kinds of factors. | The fish survives by interacting with both biotic and abiotic factors. |
| How the fish survives | decoy: unsupported | Only the brand of gravel matters. | The brand of gravel matters more to the fish than anything else in the tank. |
| How the fish survives | details | It also depends on light, water, and temperature. | It also needs water to live in, a steady temperature, and sunlight for the plant. |
| How the fish survives | conclusion | A healthy ecosystem includes biotic and abiotic factors. | So a healthy ecosystem needs both its living and its nonliving parts. |

**Pinpoint:** One sentence says sunlight is abiotic and explains why. Tap it.  ·  **Written question:** Which tank factors are biotic, which are abiotic, and why does the fish need both kinds?

### 5.12B-AD — The Bay After the Storm (FK 3.4 → 5.9)

**Brief before:** A storm tore out most of the marsh grass in the bay. Before that, energy moved from the Sun to the grass, the fish, and the herons. Build the log. Then say what the counts do next. A guess about next year is not in the notes.

**Brief after:** A storm tore out most of the marsh grass in the bay. Before that, energy moved from the Sun to the grass, then to the fish, and then to the herons. Build the log, then predict what the counts will do next. A guess about next year is not evidence from the notes.

**Notes before:**
- Before the storm: marsh grass, small fish, and herons.
- The Sun's energy entered the web through the grass. Grass is a producer.
- Fish ate the grass. Herons ate the fish.
- The storm tore out most of the marsh grass.
- Later counts: fewer fish, and fewer herons.
- The matter in the torn grass was not destroyed. The path that carried energy to the fish was broken.

**Notes after:**
- Before the storm: marsh grass, small fish, and herons.
- The Sun's energy entered the web through the grass. Grass is a producer.
- Fish ate the grass. Herons ate the fish.
- The storm tore out most of the marsh grass.
- Later counts: fewer fish, and fewer herons.
- The matter in the torn grass was not destroyed. The path that carried energy to the fish was broken.

| Round | Role | Before | After |
|---|---|---|---|
| The web before the storm | details | The Sun's energy entered through the marsh grass. | The Sun's energy entered the food web through the marsh grass that grew in the bay. |
| The web before the storm | decoy: contradicts | The herons made the energy. The Sun was not involved. | The herons produced the energy for the web, so the Sun played no part in it. |
| The web before the storm | topic | Before the storm, energy moved through a food web in the bay. | Before the storm, energy moved through a food web of grass, fish, and herons in the bay. |
| The web before the storm | decoy: contradicts | The fish ate the herons, and the grass ate the fish. | The fish fed on the herons, while the grass fed on the fish. |
| The web before the storm | details | Fish ate the grass, and herons ate the fish. | Small fish fed on the grass, and then herons fed on the fish. |
| The web before the storm | conclusion | The grass was the producer that carried energy into the web. | Energy traveled one way along this path, from the producer to the fish and then to the herons. |
| What the storm changed | details | It tore out most of the marsh grass. | It tore out most of the marsh grass, which was the producer in this web. |
| What the storm changed | decoy: contradicts | The counts went up for every animal. | Later counts showed that the number of every animal in the bay had gone up. |
| What the storm changed | topic | The storm changed the start of the food web. | The storm changed the food web at its very beginning, where energy first entered. |
| What the storm changed | decoy: unsupported | The storm added a new producer that the notes describe in detail. | After the storm, a new kind of producer quickly spread across the bay to replace the grass. |
| What the storm changed | details | Later counts showed fewer fish and fewer herons. | When the crew counted again later, they found fewer fish and fewer herons. |
| What the storm changed | conclusion | The energy path broke where the producer used to be. | As a result, the energy path broke at the point where the producer used to be. |
| Energy and matter after | details | Less grass means less energy moving on to the fish and the herons. | With less grass in the bay, less energy can move on to the fish and then to the herons. |
| Energy and matter after | decoy: unsupported | Next year the herons will double because storms are lucky. | Next year the heron count will double, because birds from other bays will fly in. |
| Energy and matter after | topic | The later web has less energy coming in, but the matter was not destroyed. | After the storm, less energy enters the web, although the matter in it was not destroyed. |
| Energy and matter after | decoy: opinion | I felt sad about the bay, so the fish must be gone forever. | Seeing the bay like this makes me so sad that I believe the fish are gone forever. |
| Energy and matter after | details | The matter in the torn grass is still matter. It was not erased. | The matter in the torn grass still exists, even though it no longer carries energy to the fish. |
| Energy and matter after | conclusion | A fair prediction follows that broken path. It does not invent a new one. | A fair prediction follows that broken path instead of inventing a new one the notes never mention. |

**Pinpoint:** One sentence says less grass means less energy moving on to the fish and the herons. Tap that sentence.  ·  **Written question:** The chief has one more question. What happens to the flow of energy when the marsh grass is torn out, and what happens to the matter?

### SS.5.2A-AD — Before the Shooting (FK 3.7 → 6.4)

**Brief before:** The fighting did not come first. The taxes did. Trace the causes from the debt, to the protests, to the first shots. A slogan is not a timeline. An effect is not a cause.

**Brief after:** The fighting did not come first. The taxes did, years before anyone fired a shot. Trace the chain of causes from Britain's war debt, to the colonists' protests, to the first battle. Watch for two tricks: a slogan is not a timeline, and an effect cannot cause something that came earlier.

**Notes before:**
- The French and Indian War ended in 1763. Britain had a large debt.
- Britain taxed the colonies to help pay that debt. The colonies had no vote in Parliament.
- The Stamp Act of 1765 taxed printed paper. Colonists refused to buy some British goods.
- In 1773 colonists dumped British tea into Boston Harbor. That protest is called the Boston Tea Party.
- Britain then closed Boston Harbor. Fighting began at Lexington and Concord in April 1775.
- The Declaration of Independence came in 1776, after the fighting had started.

**Notes after:**
- The French and Indian War ended in 1763. Britain won, but the war left it with a large debt.
- To help pay that debt, Parliament taxed the colonies. The colonists had no representatives in Parliament, so they had no vote on these taxes.
- The Stamp Act of 1765 taxed printed paper, such as newspapers and legal documents. Many colonists responded with a boycott: they refused to buy British goods.
- In December 1773, colonists dumped British tea into Boston Harbor. That protest is called the Boston Tea Party.
- In 1774, Britain punished Boston by closing its harbor to trade. Fighting between colonists and British soldiers began at Lexington and Concord in April 1775.
- The Declaration of Independence came in 1776, after the fighting had started.

| Round | Role | Before | After |
|---|---|---|---|
| The taxes | details | The war left Britain with a large debt. | Although Britain won the war, the fighting left its government with a large debt. |
| The taxes | decoy: contradicts | The Declaration of Independence caused the Stamp Act. | Parliament passed the Stamp Act to punish the colonies for the Declaration of Independence. |
| The taxes | topic | Britain taxed the colonies after the French and Indian War. | After the French and Indian War ended in 1763, Britain began taxing its American colonies. |
| The taxes | decoy: opinion | A love of freedom is the only fact that matters. | Honestly, the colonists' love of freedom is the only part that matters. |
| The taxes | details | The Stamp Act taxed printed paper, and the colonies had no vote on it. | The Stamp Act of 1765 taxed printed paper, such as newspapers. The colonists had no vote on it because they had no representatives in Parliament. |
| The taxes | conclusion | Those taxes were a cause. They came before the protests. | Because these taxes came before any protest, they belong at the start of the chain of causes. |
| The responses | details | They refused to buy some British goods. | After the Stamp Act passed, many colonists refused to buy British goods, a protest called a boycott. |
| The responses | decoy: contradicts | The Boston Tea Party happened before the French and Indian War. | The Boston Tea Party took place before the French and Indian War had even ended. |
| The responses | topic | Colonists answered the taxes with protests. | Colonists did not quietly accept the new taxes. Instead, they pushed back with protests. |
| The responses | decoy: contradicts | Colonists paid every tax gladly and never protested. | Most colonists paid every new tax without complaint because they trusted Parliament to treat them fairly. |
| The responses | details | In 1773 they dumped tea into Boston Harbor. | In December 1773, colonists dumped British tea into Boston Harbor. This protest became known as the Boston Tea Party. |
| The responses | conclusion | The Tea Party was a response. It was not the first cause. | The Tea Party answered the taxes, so it was an effect, not the first cause. |
| What made it a war | details | Britain closed Boston Harbor after the Tea Party. | In 1774, Britain closed Boston Harbor to trade as punishment for the Tea Party. |
| What made it a war | decoy: contradicts | The first shots were fired in 1763, before any tax. | The first shots of the war were fired in 1763, before any tax was passed. |
| What made it a war | topic | The protest led to punishment, and then to fighting. | The protest in Boston led to punishment, and the punishment pushed both sides toward war. |
| What made it a war | decoy: opinion | Dates do not matter if the slogan is loud enough. | A slogan that is loud enough matters more than getting the dates right. |
| What made it a war | details | Fighting began at Lexington and Concord in April 1775. | Fighting between colonists and British soldiers began at Lexington and Concord in April 1775. |
| What made it a war | conclusion | The war grew out of those steps. It did not cause the taxes. | The war grew out of these events. It could not have caused the taxes that came before it. |

**Pinpoint:** One sentence tells when colonists dumped British tea into Boston Harbor. Tap it.  ·  **Written question:** What was one cause of the Revolution, what was one colonial response, and what came after that response?

### SS.5.12B-AD — Why the Factory Is There (FK 3.3 → 6)

**Brief before:** The textile mills at Lowell, Massachusetts, were not placed by luck. Explain the river power, the way goods moved, and the people who came to work. A pretty view is not a geographic factor. The river did not set anyone's wage.

**Brief after:** The textile mills at Lowell, Massachusetts, were not placed there by luck. Explain how the river supplied power, how goods moved in and out, and why people came to work. Remember that a pretty view is not a geographic factor, and the river did not set anyone's wage.

**Notes before:**
- Lowell's mills used the Merrimack River to turn water wheels.
- Ships could bring cotton through the port at Boston and carry finished cloth away.
- A mill far from power and far from a port costs more to run.
- Workers, including many young women from nearby farms, moved to Lowell for the jobs.
- The river explains the power. It does not decide a worker's pay.
- The mills were not built in a desert, and they were not a thousand miles from a port.

**Notes after:**
- Lowell sits where the Merrimack River drops about 30 feet at Pawtucket Falls. Canals carried river water to the mills, where it turned the large water wheels that ran the machines.
- Ships brought raw cotton to the port of Boston. From there, canal boats, and later a railroad, carried it about 25 miles to Lowell. Finished cloth traveled back to Boston the same way, and ships carried it to buyers.
- A mill far from power and far from a port costs more to run.
- Workers moved to Lowell for jobs that paid wages. Many were young women from nearby New England farms.
- The river explains the power. It does not decide a worker's pay.
- The mills were not built in a desert, and they were not a thousand miles from a port.

| Round | Role | Before | After |
|---|---|---|---|
| The power | details | The Merrimack River turned the water wheels. | At Lowell, water from the Merrimack River turned the large wheels that ran the machines. |
| The power | decoy: contradicts | The mills were built in a desert with no river. | The mills were built in a dry desert, far from any river or stream. |
| The power | topic | The mills needed a source of power. | Before a textile mill could spin a single thread, it needed a steady source of power. |
| The power | decoy: opinion | The owner picked the spot because the view was pretty. | The owners picked the spot because it had the loveliest view in all of New England. |
| The power | details | A mill with no river and no other fuel would be hard to run. | A mill far from a source of power would cost more to run. It would need another way to move its machines. |
| The power | conclusion | Water power is a geographic reason, not a lucky guess. | The river's power is a geographic factor, which means the mills' location was not a lucky guess. |
| The transport | details | Ships could bring cotton through Boston's port. | Ships delivered raw cotton to Boston's port, and canal boats carried it on to Lowell. |
| The transport | decoy: contradicts | The mills were a thousand miles from any port. | The mills stood a thousand miles from any port, far from the nearest ship. |
| The transport | topic | Heavy goods had to move in and out. | The mills also depended on moving heavy loads of cotton in and cloth out. |
| The transport | decoy: unsupported | The cotton walked to the mill by itself. | Moving the cotton cost nothing, because the mill owners owned every ship and canal boat. |
| The transport | details | Finished cloth could leave by water. | Finished cloth traveled back to Boston the same way, where ships carried it to buyers. |
| The transport | conclusion | A factory far from a port pays more to move every bale. | If a factory is far from a port, it must pay more to move every bale of cotton. |
| The workers | details | Workers moved to Lowell because the mills had jobs. | Workers moved to Lowell because the mills offered jobs that paid wages. |
| The workers | decoy: unsupported | The river decided each worker's wage. | Mill owners paid higher wages to workers who lived closest to the river. |
| The workers | topic | A mill also needs people. | Power and transport are not enough, because a mill also needs people to run its machines. |
| The workers | decoy: contradicts | Geography hires the workers, so no one had to move. | Because the land was so well suited, the mills never needed anyone to move to Lowell. |
| The workers | details | Many early workers were young women from nearby farms. | Many of the early workers were young women who left nearby New England farms. |
| The workers | conclusion | The river explains the power. It does not set the pay. | Although the river explains where the power came from, it does not explain how much workers were paid. |

**Pinpoint:** One sentence explains what turned the mills' water wheels. Tap it.  ·  **Written question:** What geographic factors explain the mills at Lowell, and what do those factors not explain?

### SS.5.14A-AD — What the Document Actually Says (FK 4.6 → 6.3)

**Brief before:** The Declaration of Independence is an argument, not a constitution. Explain why it was written, what it claims, and why the list of complaints matters. A fact about the three branches belongs to a different document.

**Brief after:** The Declaration of Independence is an argument, not a constitution or a set of laws. Explain why it was written, what it claims about rights, and why its long list of complaints matters. Be careful: a fact about the three branches of government belongs to a different document.

**Notes before:**
- The Continental Congress adopted the Declaration of Independence on July 4, 1776.
- Its purpose was to explain why the colonies were breaking away from Britain.
- It says people have rights to life, liberty, and the pursuit of happiness.
- It says governments get their power from the consent of the governed.
- The longest part is a list of complaints against King George III. The list is the evidence.
- The Declaration did not set up the three branches, and it did not end slavery. The Constitution came later.

**Notes after:**
- Thomas Jefferson wrote the first draft. The Continental Congress adopted the Declaration of Independence on July 4, 1776.
- Its purpose was to explain to the world why the colonies were breaking away from Britain.
- It says people have rights to life, liberty, and the pursuit of happiness, and that these rights cannot be taken away.
- It says governments get their power from the consent of the governed, meaning the people.
- The longest part is a list of complaints about actions by King George III, such as taxing the colonists without their consent. The list is the evidence for the break.
- The Declaration did not set up the three branches, and it did not end slavery. The Constitution, with its Bill of Rights, came later.

| Round | Role | Before | After |
|---|---|---|---|
| Why it was written | details | Congress adopted it on July 4, 1776. | Thomas Jefferson wrote the first draft. Congress adopted it on July 4, 1776. |
| Why it was written | decoy: contradicts | It was written to create the three branches of government. | It was written mainly to create the three branches of the new government. |
| Why it was written | topic | The Declaration was written to announce a break with Britain. | The Declaration was written to announce that the colonies were breaking away from Britain. |
| Why it was written | decoy: opinion | Jefferson wrote it because he was the kindest founder. | Jefferson wrote it because he was the kindest and wisest of the founders. |
| Why it was written | details | Its job was to explain why the colonies were separating. | Its main job was to explain to the world why the colonies were leaving. |
| Why it was written | conclusion | It is an argument to the world, not a book of laws. | Because it makes a case instead of setting rules, it is an argument, not a book of laws. |
| What it claims | details | People have rights to life, liberty, and the pursuit of happiness. | It says people have rights to life, liberty, and the pursuit of happiness. No one can take these rights away. |
| What it claims | decoy: contradicts | The text says the king may take any right he chooses. | According to the text, the king may take away any right he wants. |
| What it claims | topic | The document makes a claim about rights and power. | The document also makes bold claims about rights and about where power comes from. |
| What it claims | decoy: contradicts | The Declaration freed every enslaved person in 1776. | The Declaration freed every enslaved person in the colonies in 1776. |
| What it claims | details | Government power comes from the consent of the governed. | It also says a government gets its power from the consent of the governed. |
| What it claims | conclusion | Those are ideas the text states. They did not, by themselves, end slavery. | The document states these ideas, but the words alone did not end slavery. |
| Why the list matters | details | The complaints name actions of King George III. | The complaints describe things King George III did, such as taxing colonists without their consent. |
| Why the list matters | decoy: contradicts | The complaint list is the Bill of Rights. | The list of complaints is the same as the Bill of Rights. |
| Why the list matters | topic | The longest part is a list of complaints against the king. | The longest part is a list of complaints against the king. |
| Why the list matters | decoy: opinion | The list does not matter, because the writers were famous. | Honestly, the list hardly matters, because the writers were famous enough to trust. |
| Why the list matters | details | The list is the evidence for the break. | Together, the complaints are the evidence that the break was justified. |
| Why the list matters | conclusion | Without that evidence, the break would be only an announcement. | Without that evidence, the Declaration would be only an announcement, not an argument. |

**Pinpoint:** One sentence says the complaints are the evidence for the break with Britain. Tap it.  ·  **Written question:** Why was the Declaration written, what does it claim, and why does the complaint list matter?

### SS.5.15B-AD — The Bill That Didn't Pass (FK 3.3 → 6.3)

**Brief before:** This bill is an example, not a real law. Watch where it stops. Congress writes laws. The president may veto. A court may strike down a law that breaks the Constitution. A bill that dies can mean the system worked.

**Brief after:** This bill is an example, not a real law. Watch closely to see where it stops. Congress writes laws, the president may veto them, and a court may strike down a law that breaks the Constitution. Remember that a bill that dies can be a sign that the system worked.

**Notes before:**
- Congress passes a bill that says the president alone may write any law, with no vote.
- The president vetoes it. A veto sends the bill back.
- Congress can override a veto only with a two-thirds vote in both the House and the Senate.
- This Congress does not have those votes, so the bill stops.
- The Supreme Court can strike down a law that conflicts with the Constitution.
- Checks and balances exist so no one branch can do every job.

**Notes after:**
- Congress, the legislative branch, writes and passes bills. The president leads the executive branch, and the courts make up the judicial branch.
- In this example, Congress passes a bill that says the president alone may write any law, with no vote. The president vetoes it, refusing to sign it and sending it back to Congress.
- Congress can override a veto only with a two-thirds vote in both the House and the Senate.
- This Congress does not have those votes, so the bill stops.
- The Supreme Court can strike down a law that conflicts with the Constitution.
- A check is a power one branch has to limit another branch. The veto is one of these checks. Checks and balances exist so no one branch can do every job or gain too much power.

| Round | Role | Before | After |
|---|---|---|---|
| What each branch can do | details | Congress wrote this bill and voted to pass it. | Congress, the legislative branch, wrote this bill and voted to pass it. |
| What each branch can do | decoy: contradicts | The Supreme Court wrote this bill. | The Supreme Court wrote this bill and then sent it to Congress for a vote. |
| What each branch can do | topic | Each branch has a different job on a bill. | Each branch of government plays a different part when Congress tries to turn a bill into a law. |
| What each branch can do | decoy: contradicts | The president gets to write every law with no vote. | Under the Constitution, the president may write any law alone, without a vote. |
| What each branch can do | details | The president vetoed it and sent it back. | The president then vetoed the bill, refusing to sign it and sending it back to Congress. |
| What each branch can do | conclusion | A court can strike down a law that breaks the Constitution. | If a law ever broke the Constitution, the Supreme Court could strike it down. |
| Where it stopped | details | An override needs a two-thirds vote in both houses. | To override a veto, Congress needs a two-thirds vote in both the House and the Senate. |
| Where it stopped | decoy: unsupported | The bill failed because it was an election year. | The bill failed mostly because it was an election year and members were busy campaigning. |
| Where it stopped | topic | The bill stopped at the president's veto. | The bill stopped at the president's veto because Congress could not bring it back. |
| Where it stopped | decoy: contradicts | A veto means the Constitution has failed. | When a president uses a veto, it means the Constitution has failed. |
| Where it stopped | details | This Congress did not have those votes. | This Congress did not have enough votes, so the override failed. |
| Where it stopped | conclusion | A stopped bill is not proof that the government is broken. | A stopped bill, however, is not evidence that the government is broken. |
| Why that is the design | details | Congress makes the laws. The president may refuse one. | Congress makes the laws, but the president may refuse to sign one. |
| Why that is the design | decoy: opinion | Government is broken whenever a bill fails. | Any government that lets a bill fail is a terrible, broken government. |
| Why that is the design | topic | Checks exist so no one branch can do every job. | Checks and balances exist so that no single branch can do every job or gain too much power. |
| Why that is the design | decoy: contradicts | A check is the same thing as holding an election. | A check is simply another name for holding an election. |
| Why that is the design | details | A court may stop a law that conflicts with the Constitution. | The Supreme Court may also strike down a law that conflicts with the Constitution. |
| Why that is the design | conclusion | This bill died because the design worked. | This bill died because the system worked the way it was designed to work. |

**Pinpoint:** One sentence says an override needs a two-thirds vote in both houses. Tap it.  ·  **Written question:** What did each branch do in this example, and why is a stopped bill not a broken government?

### ELA.5.7D-AD — Two Summaries, One Article (FK 2.4 → 6)

**Brief before:** An article says Maple Street will get a bike lane. A hallway summary says cars will be banned. A summary keeps the article's meaning and its limits. A shorter sentence is not fair if it changes the news.

**Brief after:** A news article says Maple Street will get a bike lane. However, a summary going around the hallway says cars will be banned. A fair summary keeps the article's meaning and its limits. A shorter sentence is not fair if it changes the news.

**Notes before:**
- The city will paint a bike lane on Maple Street from the school to the park.
- The work will happen in August.
- Cars will still drive on Maple Street.
- One parking lane will become the bike lane.
- The article does not say cars will be banned.
- A hallway summary says: cars will be banned from Maple Street.

**Notes after:**
- The city will paint a bike lane on Maple Street from the school to the park.
- The work will happen in August.
- Cars will still drive on Maple Street.
- One parking lane will become the bike lane.
- The article does not say cars will be banned.
- A hallway summary says: cars will be banned from Maple Street.

| Round | Role | Before | After |
|---|---|---|---|
| The claim | details | The city will paint the lane in August. | According to the article, the city will paint the bike lane in August. |
| The claim | decoy: contradicts | Cars will be banned from Maple Street. | Beginning in August, cars will be completely banned from driving on Maple Street. |
| The claim | topic | The article is about a new bike lane, not a ban. | The article reports that Maple Street will get a new bike lane, not that cars will be banned. |
| The claim | decoy: opinion | I love bikes, so the article is perfect. | Since I love riding my bike, this article is perfect news for everyone. |
| The claim | details | It will run from the school to the park. | The lane will stretch along Maple Street from the school all the way to the park. |
| The claim | conclusion | The claim changes the street. It does not close it. | In other words, the plan changes how Maple Street is used, but it does not close the street. |
| The limit | details | Cars will still drive on Maple Street. | Even after the lane is painted, cars will still be able to drive on Maple Street. |
| The limit | decoy: unsupported | Both parking lanes will be removed. | Both parking lanes on Maple Street will be removed to make extra room for bikes. |
| The limit | topic | A fair summary keeps the limits in the article. | A fair summary must keep the limits that the article places on the change. |
| The limit | decoy: contradicts | Banned is just a shorter way to say bike lane. | The word banned is simply a shorter way of saying that a street has a bike lane. |
| The limit | details | One parking lane will become the bike lane. | Only one of the parking lanes will be turned into the new bike lane. |
| The limit | conclusion | Leaving the ban out keeps the meaning true. | Because the article never mentions a ban, leaving it out keeps the summary accurate. |
| The fair summary | details | Maple Street will get a bike lane in August. | Maple Street will get a painted bike lane in August, running from the school to the park. |
| The fair summary | decoy: opinion | Lead with the ban, because it is more exciting. | The summary should open with the ban, because that version is far more exciting. |
| The fair summary | topic | Here is the same news in fewer words. | Here is the same news, retold in fewer words without changing its meaning. |
| The fair summary | decoy: offtopic | Copy the hallway summary and skip the article. | Instead of reading the article, just copy the summary everyone repeated in the hallway. |
| The fair summary | details | Cars can still use the street, and one parking lane will change. | Cars can still use the street, and one parking lane will become the bike lane. |
| The fair summary | conclusion | A summary that adds a ban has changed the article. | If a summary adds a ban, it has changed what the article actually says. |

**Pinpoint:** One sentence says cars will still drive on Maple Street. Tap it.  ·  **Written question:** Summarize the article. What will change on Maple Street, and what will not?

### ELA.5.12B-AD — What a Watershed Is (FK 2.4 → 6.1)

**Brief before:** Explain a watershed for the school site. A reader who has never stood on the ridge should get it. Informational writing needs one central idea and the facts that hold it. Naming the creek and forgetting the land leaves the idea unfinished.

**Brief after:** Ms. Alvarez needs a short explanation of a watershed for the school website. A reader who has never stood on the ridge should still understand it. Informational writing needs one central idea and the facts that support it. If you name the creek but forget the land, the idea is unfinished.

**Notes before:**
- A watershed is the land that drains to the same water.
- Rain on the playground runs to the storm drain, then to Oak Creek.
- The ridge behind the soccer field is the divide.
- Rain on the far side of that ridge goes to Pine Creek, not Oak Creek.
- The creek is where the water ends. The land is the watershed.

**Notes after:**
- A watershed is the land that drains to the same water.
- Rain on the playground flows across the blacktop to the storm drain, then to Oak Creek.
- The ridge behind the soccer field is the divide.
- Rain on the far side of that ridge goes to Pine Creek, not Oak Creek.
- The creek is where the water ends. The land is the watershed.
- Litter left on the playground can wash into the storm drain during a storm.
- Water always flows downhill. It cannot flow uphill over a ridge.

| Round | Role | Before | After |
|---|---|---|---|
| The central idea | details | Rain on our playground runs to the storm drain. | When rain falls on our playground, it flows across the blacktop into the storm drain. |
| The central idea | decoy: contradicts | The creek itself is the watershed. | Oak Creek itself is the watershed, since that is where the water finally collects. |
| The central idea | topic | A watershed is the land that drains to one body of water. | A watershed is the area of land where rainwater drains into the same body of water. |
| The central idea | decoy: opinion | A watershed is only a feeling about nature. | A watershed is really just the peaceful feeling people get when they are outdoors. |
| The central idea | details | That drain leads to Oak Creek. | From there, the water travels through the drain until it reaches Oak Creek. |
| The central idea | conclusion | The land, not the creek, is the watershed. | Although the creek is where the water ends up, the land that collects the rain is the actual watershed. |
| The divide | details | The ridge behind the soccer field is the divide. | At our school, the divide is the ridge that rises behind the soccer field. |
| The divide | decoy: contradicts | All rain in the city ends up in Oak Creek. | Every drop of rain that falls anywhere in our city ends up in Oak Creek. |
| The divide | topic | A ridge decides which watershed the rain belongs to. | A ridge that separates two watersheds is called a divide, and it decides where rain flows. |
| The divide | decoy: contradicts | The ridge sends every drop to both creeks at once. | The ridge sends every raindrop into both creeks at once, so they share all the water. |
| The divide | details | Rain on the far side goes to Pine Creek. | Rain that lands on the far side of the ridge flows to Pine Creek instead. |
| The divide | conclusion | Water does not flow uphill over that ridge. | Because water cannot flow uphill, rain on one side of the ridge never crosses over to the other creek. |
| Why the land matters | details | Trash on the playground can wash into the drain. | During a storm, litter left on the playground can wash into the storm drain. |
| Why the land matters | decoy: contradicts | Pollution stays in the puddle and never moves. | Pollution in a playground puddle stays there and never travels anywhere else. |
| Why the land matters | topic | What happens on the land can reach the creek. | Because the playground is part of the watershed, what happens there can affect the creek. |
| Why the land matters | decoy: contradicts | Only water poured straight into the creek can reach it. | The only water that can reach the creek is water someone pours directly into it. |
| Why the land matters | details | The drain carries that water to Oak Creek. | The drain then carries that dirty water and litter all the way to Oak Creek. |
| Why the land matters | conclusion | A puddle is not a new watershed. It still drains downhill. | A puddle is not a new watershed, because its water still drains downhill toward the creek. |

**Pinpoint:** One sentence says the land, not the creek, is the watershed. Tap it.  ·  **Written question:** What is a watershed, and which one is our school in?

### ELA.5.12D-AD — The Request to the City Engineer (FK 3.0 → 6.3)

**Brief before:** The crosswalk at Oak and 3rd floods after hard rain. Write the city engineer for facts. A request says who you are, asks specific questions, and tells how to reply. Fix it today is an order, not a question.

**Brief after:** The crosswalk at Oak and 3rd floods after hard rain. Write to the city engineer and request the facts your class needs. A request says who you are, asks specific questions, and tells how to reply. Telling the city to fix it today is an order, not a request for information.

**Notes before:**
- Water covers the crosswalk at Oak Street and 3rd after hard rain.
- The class needs facts before it can suggest a change.
- Question 1: Which storm drain serves that corner?
- Question 2: When was that drain last cleared?
- Question 3: Is a larger drain already in this year's plan?
- Please reply to Ms. Alvarez.

**Notes after:**
- Water covers the crosswalk at Oak Street and 3rd after hard rain.
- The class needs facts before it can suggest a change.
- Question 1: Which storm drain serves that corner?
- Question 2: When was that drain last cleared?
- Question 3: Is a larger drain already in this year's plan?
- Please reply to Ms. Alvarez.

| Round | Role | Before | After |
|---|---|---|---|
| Who and why | details | The crosswalk at Oak and 3rd floods after hard rain. | Whenever there is a hard rain, water covers the crosswalk at Oak Street and 3rd Street. |
| Who and why | decoy: opinion | Fix the street today, or we will be disappointed. | Please repair the street today, or our whole class will be very disappointed in the city. |
| Who and why | topic | We are a fifth-grade class writing for three facts. | We are a fifth-grade class, and we are writing to request three facts about a crosswalk that floods. |
| Who and why | decoy: offtopic | Dear friend, want to hear about my weekend? | Dear friend, would you like to hear about the exciting soccer game I played last weekend? |
| Who and why | details | We need information before we can suggest a change. | Before our class can suggest a change, we need accurate information about the problem. |
| Who and why | conclusion | This letter asks questions. It does not give orders. | This letter is a request for information, so it asks questions rather than giving orders. |
| The questions | details | Which storm drain serves the corner of Oak and 3rd? | First, which storm drain serves the corner of Oak Street and 3rd Street? |
| The questions | decoy: unsupported | Tell us everything you know about every street. | Please also send us everything your office knows about every street in the city. |
| The questions | topic | Three questions would let the engineer answer. | We have three specific questions that your office should be able to answer. |
| The questions | decoy: contradicts | We have no questions. Just come look. | Actually, we do not have any questions, so you should just come and look for yourself. |
| The questions | details | When was it last cleared, and is a larger drain already planned? | When was that drain last cleared, and is a larger drain already included in this year's plan? |
| The questions | conclusion | Specific questions give the city a clear job. | Because these questions are specific, your office will know exactly which information to look up. |
| How to reply | details | Please write back to our teacher, Ms. Alvarez. | Please address your reply to our teacher, Ms. Alvarez. |
| How to reply | decoy: contradicts | Do not write back. We already decided you are wrong. | There is no need to write back, because we have already decided the city is wrong. |
| How to reply | topic | A request should make the reply easy. | We want to make it as simple as possible for you to reply. |
| How to reply | decoy: offtopic | Also send a map of the whole state. | Could you also mail our class a colorful map of the entire state of Texas? |
| How to reply | details | Our class will use the facts to understand the flood. | Our class will use your answers to understand why the crosswalk floods before we suggest any changes. |
| How to reply | conclusion | A request is ready when the reader knows how to answer. | A request is ready to send only when the reader knows what to answer and where to send it. |

**Pinpoint:** One sentence asks which storm drain serves the corner. Tap it.  ·  **Written question:** Who is writing, which three facts do you need, and how should the engineer reply?

### ELA.5.13D-AD — Four Sources, One Question (FK 3.5 → 6.2)

**Brief before:** Did the May 4 storm flood the playground? Four sources are not equally useful. A primary source comes from someone who was there. A secondary source reports what someone else saw. Dated and specific beats old and general. Primary does not automatically win.

**Brief after:** Did the May 4 storm flood the playground? You have four sources, but they are not equally useful. A primary source comes from someone who was there. A secondary source reports what someone else saw. Dated and specific beats old and general. Primary does not automatically win.

**Notes before:**
- Question: Did the May 4 storm flood the school playground?
- Source A, primary: the principal's photo log, May 4, 3:10 p.m. Water covers the blacktop and the bottom of the slide.
- Source B, secondary: a Channel 8 story on May 5. It quotes the principal, who said the playground closed early because of standing water.
- Source C, primary but thin: a classmate's text, no date, that says only, Today was insane.
- Source D: a 2019 website with no author. It says school playgrounds flood all the time. It was written before this storm.

**Notes after:**
- Question: Did the May 4 storm flood the school playground?
- Source A, primary: the principal's photo log, May 4, 3:10 p.m. Water covers the blacktop and the bottom of the slide.
- Source B, secondary: a Channel 8 story on May 5. It quotes the principal, who said the playground closed early because of standing water.
- Source C, primary but thin: a classmate's text, no date, that says only, Today was insane.
- Source D: a 2019 website with no author. It says school playgrounds flood all the time. It was written before this storm.

| Round | Role | Before | After |
|---|---|---|---|
| What could answer | details | A useful source has to be about that storm. | To be useful, a source has to describe that particular storm, not storms in general. |
| What could answer | decoy: unsupported | Any website is enough, because the internet stays current. | Any website will work, because information on the internet always stays current. |
| What could answer | topic | The question is whether the May 4 storm flooded the playground. | Our research question is whether the May 4 storm actually flooded the school playground. |
| What could answer | decoy: contradicts | The question does not need a source at all. | This question is so simple that it does not require any source at all. |
| What could answer | details | It should show what someone saw, or quote a person who was there. | It should also show what someone observed, or quote a person who was there. |
| What could answer | conclusion | A source from another year cannot answer this question. | A source written in a different year cannot tell us what happened on May 4. |
| The strongest source | details | It was made on May 4 at 3:10 p.m. | The principal took the photos on May 4 at 3:10 p.m., the same day as the storm. |
| The strongest source | decoy: unsupported | The text that says today was insane is the best proof. | The classmate's text that says today was insane provides the best evidence. |
| The strongest source | topic | The principal's photo log is the strongest source. | Of the four sources, the principal's photo log is the strongest one. |
| The strongest source | decoy: opinion | The log is weak because a principal is not a scientist. | The photo log seems weak to me, because a principal is not a real scientist. |
| The strongest source | details | It shows water on the blacktop and at the slide. | The photos show water covering the blacktop and the bottom of the slide. |
| The strongest source | conclusion | A primary source is stronger when it is dated and specific. | A primary source is especially strong when it is dated and describes specific details. |
| What cannot decide it | details | The 2019 website was written before the storm and names no author. | The 2019 website was written before the storm, and it does not name an author. |
| What cannot decide it | decoy: opinion | The 2019 site is best because it sounds sure. | The 2019 website is the best choice, because its writer sounds completely sure. |
| What cannot decide it | topic | Two of the sources should not decide this question. | However, two of the four sources should not be used to decide this question. |
| What cannot decide it | decoy: contradicts | Ignore the photo log and use the undated text. | We should ignore the photo log and rely on the classmate's undated text instead. |
| What cannot decide it | details | The undated text names no place and no day. | The classmate's text is undated and names no place, so it could describe any day. |
| What cannot decide it | conclusion | The news story can support the log, but the log is the firsthand record. | The news story can support the photo log, but only the log is a firsthand record from May 4. |

**Pinpoint:** One sentence says the photo log was made on May 4 at 3:10 p.m. Tap it.  ·  **Written question:** Which source best answers whether the May 4 storm flooded the playground, and why is it better than the 2019 website?

### SS.4.3D-AD — A Country With No Money (FK 6.0 → 5.1)

**Brief before:** The Republic of Texas lasted from 1836 to 1845. It had successes and problems at the same time. A famous president does not erase a debt. Annexation kept coming up because the Republic needed money and protection.

**Brief after:** The Republic of Texas lasted from 1836 to 1845. It had successes and problems at the same time. Write a short account that is fair to both. A famous president does not erase a debt. Then explain why joining the United States kept coming up.

**Notes before:**
- The Republic of Texas lasted from 1836 to 1845.
- It wrote a constitution. Sam Houston was elected the first president.
- The Republic was deep in debt, and its paper money lost value.
- Mexico did not accept Texas independence, so the threat of war remained.
- The Texas Rangers were organized. Conflict with American Indian nations over land was a problem, not a success.
- Texas joined the United States in 1845. Oil at Spindletop came in 1901, long after the Republic.

**Notes after:**
- The Republic of Texas lasted from 1836 to 1845.
- It wrote a constitution, the set of rules for how the country would be run.
- Sam Houston was elected the first president in 1836.
- The Republic was deep in debt, and its paper money lost value.
- Mexico did not accept Texas independence, so the threat of war remained.
- The Texas Rangers were organized. Conflict with American Indian nations over land was a problem, not a success.
- Many Texans wanted to join the United States, because the Republic needed money and protection.
- Texas joined the United States in 1845. Oil at Spindletop came in 1901, long after the Republic.

| Round | Role | Before | After |
|---|---|---|---|
| What worked | details | It wrote a constitution. | It wrote a constitution, the set of rules for how the country would be run. |
| What worked | decoy: contradicts | The Republic was already a rich and powerful country. | The Republic was a rich and strong country right from the start. |
| What worked | topic | The Republic could govern itself on paper. | The new Republic set up the things a country needs to run itself. |
| What worked | decoy: opinion | A famous president means the problems did not count. | Sam Houston was such a great hero that the problems did not count. |
| What worked | details | Sam Houston was elected the first president. | Sam Houston was elected as its first president in 1836. |
| What worked | conclusion | A constitution and a leader were real successes. | A constitution and a leader were real successes, but they were only a start. |
| What did not | details | It was deep in debt, and its paper money lost value. | It was deep in debt, and its paper money lost value. |
| What did not | decoy: contradicts | The Republic paid every debt in its first year. | The Republic paid off all of its debt in its first year. |
| What did not | topic | The new country had serious problems. | The new country also faced big problems that did not go away. |
| What did not | decoy: contradicts | Winning independence meant every problem was over. | Once Texas won its independence, all of its problems were over. |
| What did not | details | Conflict over land with American Indian nations was not a success. | Conflict with American Indian nations over land was a problem, not a success. |
| What did not | conclusion | A famous leader did not erase the debt. | A famous leader did not make the debt go away. |
| Why annexation | details | Texas joined the United States in 1845. | Texas joined the United States in 1845, after nine years on its own. |
| Why annexation | decoy: contradicts | Oil in 1901 paid the Republic's debts. | Oil found in 1901 paid off the Republic's debts. |
| Why annexation | topic | Annexation kept coming up because the Republic needed help. | Annexation, or joining the United States, kept coming up because Texas needed help. |
| Why annexation | decoy: contradicts | Texas joined because it had no constitution. | Texas joined because it did not have a constitution yet. |
| Why annexation | details | It needed money and protection that it did not have. | It needed money and protection that it could not get on its own. |
| Why annexation | conclusion | Debt and the threat from Mexico kept the question alive. | Because of the debt and the threat from Mexico, many Texans wanted to join. |

**Pinpoint:** One sentence says Texas joined the United States in 1845. Tap it.  ·  **Written question:** Name one success of the Republic of Texas, one problem, and why annexation kept coming up.

