# The Frozen Relay — Content v2 (MA.4.3E-XP)

**Grade 4 · Math · TEKS 4.3E · Frostveil.** Rebuilt Sept 26, 2026. The original content file (v1) was not in the repo, so Act 1 is copied from the live code and Acts 2–3 are new.

**I can:** I can add and subtract fractions that have the same bottom number. I can show how with pictures, a number line, and by adding in a different order.

**Mission:** Add and subtract fractions to warm the outpost and restart the relay tower.

**Status:** Act 1 is live. Acts 2–3 are written in `lib/cases/expedition-station/catalog.js` and graded in `index.server.js`, but stay locked until the student screen supports the Travel, Repair, Numberless, and Sort Bay machines.

**Journal:** 10 discoveries (tasks 2, 3, 4, 5, 6, 8, 10, 11, 13, 15), all Earth-true.

## Act 1 · Refuel the heater and find the beacon

| # | Level | Machine | Crew line and question | Answer | Wrong answers → hint | S.A.M. hint |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Warm-up | Fill | Brrr! The heater is almost out of fuel. I poured in 3/8 of a tank. Then I poured in 2/8 more. Can you set the gauge so it matches? **How much fuel is in the heater now? Set the gauge, then press Pour.** | 5/8 | **5/16**: Look at the gauge. Did the pieces change size when Kai poured? Both pours are eighths. <br> **1/8**: Kai poured fuel in two times. Does the tank get more fuel or less? | Both pours are in eighths. How many eighths in all? |
| 2 | Warm-up | Crew Debate | Kai: "I poured 1/3 of a tank into the reserve tank. Then I poured another 1/3. That makes 2/6. Easy: 1 + 1 = 2 and 3 + 3 = 6!" Nova: "No way. The tank has 2/3 now. The parts are still thirds." **Who is right, Kai or Nova? Pick the best reason, then tell Kai why.** Reasons: A) Nova. Both pours are thirds. 1 third + 1 third = 2 thirds. Adding doesn't change the size of the parts. B) Nova, because 2/3 has smaller numbers than 2/6. C) Kai. You add the top numbers and add the bottom numbers. D) Kai. Two pours means twice as many parts, so the bottom number doubles. | Nova, reason A |  | Draw 1/3 and 1/3 on the same tank. What size are the parts? |
| 3 | Warm-up | Tune | The backup beacon is buried in the snow. Its battery was at 5/6 before the storm. The cold used up 3/6. If I set the dial to what's left, the beacon will beep back! **How much battery is left? Turn the dial, then press Lock signal.** | 2/6 | **3/6**: Start at 5/6 on the dial. Which way do you turn to take some away? <br> **1/6**: Count the jumps between marks, not the marks. Start counting after 5/6. <br> **8/6 (1 2/6)**: The cold used up some battery. Should the number go up or down? | Start at 5/6. Jump back one sixth at a time. |
| 4 | Warm-up | Fill | The sled needs 7/10 of a tank to reach the supply crate. Its tank already has 3/10 in it. Our scoops hold 1/10 or 2/10. **How much more fuel does the sled need? Then fill it with scoops two different ways.** | Missing 4/10; then two different scoop sets that each make 4/10 | **10/10 (1)**: The tank already has some fuel. How much more to get from 3/10 up to 7/10? <br> **7/10**: Look at the tank before you pour. Is it empty? | Start at 3/10. Count up by tenths to 7/10. |
| 5 | Challenge | Fill | Surprise, the cold snap! The heater tank was at 7/8. The heater burned 2/8 each night for 2 nights. Then Kai added 3/8. The heater runs safely at the 5/8 line or above. **What is the tank level now? How far above the safe line is the fuel?** | Step 1: 6/8 · Step 2: 1/8 above the safe line | (step 1) **8/8 (1)**: Take it one night at a time. How many times did the heater burn fuel? <br> (step 1) **0/8**: Kai added fuel. Does adding make the tank go up or down? <br> (step 1) **3/8**: Read the story again. What happened after the two nights? <br> (step 2) **11/8 (1 3/8)**: You're finding the space between two lines on the same tank. Can that be bigger than the tank? <br> (step 2) **2/8**: Count the jumps from the safe line up to the fuel, not the lines. | Take it one night at a time. Then count the jumps from the safe line to the fuel. |

**Act complete:** The heater is warm and the beacon is back, {firstName}!

**Teaser:** Next on Frostveil: a storm is coming, and the cables and solar panels need fixing. Act 2 opens on your next station visit.

## Act 2 · Fix the cables and clear the panels

**Opening:** Welcome back, {firstName}. Nova here. A storm is rolling in over the ice ridge. The antenna cable snapped, and snow is piling up on the solar panels. Kai's cable log looks messy, too. Let's get everything fixed before the storm hits.

| # | Level | Machine | Crew line and question | Answer | Wrong answers → hint | S.A.M. hint |
| --- | --- | --- | --- | --- | --- | --- |
| 6 | On level | Travel | The storm snapped our antenna cable! The cable on the spool is 2 3/4 meters long. The new antenna needs 1 1/4 meters. I'll cut that much off the spool. **How much cable will be left on the spool? Jump back on the measuring line, then press Cut.** | 6/4 (1 2/4) | **16/4 (4)**: Kai is cutting some cable off. Should the spool have more cable or less? <br> **5/4 (1 1/4)**: Check the fourths. 3 fourths take away 1 fourth is how many fourths? <br> **10/4 (2 2/4)**: Did you take away the whole meter, too? Take away the wholes, then the fourths. | Start at 2 3/4. Take away the 1 whole first, then the 1 fourth. |
| 7 | On level | Repair | Kai wrote this in his cable log last night: "I joined a 3/5 meter cable and a 1/5 meter cable. Now I have 4/10 of a meter." That doesn't look right to me. **Tap the part of Kai's math that is wrong. Pick what went wrong, then write the right answer.** Error choices: A) He added the bottom numbers. The parts are still fifths. B) He added the top numbers wrong. 3 + 1 is not 4. C) He should have subtracted. Joining cables makes them shorter. | Tap the "/10"; error A; fix 4/5 | **error B**: Check the top numbers again: 3 fifths and 1 fifth. How many fifths is that? <br> **error C**: When Kai joins two cables, does he get a longer cable or a shorter one? <br> **4/10**: That's Kai's answer. What size are the pieces when you join fifths? <br> **2/5**: Joining makes the cable longer. Should you add or subtract? | When you put two fifths of a meter together, are the pieces still fifths? |
| 8 | On level | Fill | Snow is covering 9/12 of the solar grid. I swept off 4/12 this morning. Nova swept off 3/12 after lunch. **How much of the solar grid is still covered in snow? Shade the grid, then press Check.** | 2/12 | **7/12**: That's how much Kai and Nova swept off. How much snow is left on the grid? <br> **5/12**: Nova swept after lunch, too. Did you take away both sweeps? <br> **16/12 (1 4/12)**: Sweeping takes snow away. Should the covered part get bigger or smaller? | Start with 9 twelfths covered. Take away each sweep, one at a time. |
| 9 | On level | Numberless | Nova filled part of the water tank. Then Kai added some more. The tank still isn't full. **First, pick the questions we could answer with this story. Then the numbers will show up.** Questions: How much water is in the tank now? / How much more water will fill the tank? / Who added more water, Nova or Kai? / What color is the water tank?. Then: Nova filled 3/10 of the tank. Kai added 4/10 more. | Sensible questions: total, more, who (not "color"); answer 3/10 | **questions**: Can the story tell us that? Pick only questions that use the amounts of water. <br> **7/10**: That's how much is in the tank now. How much more to reach full? <br> **1/10**: That's how much more Kai added than Nova. The question asks about filling the tank. <br> **17/10 (1 7/10)**: A full tank is 10/10. Can the tank need more than a whole tank? | A full tank is 10/10. How much water is in it now? |
| 10 | Challenge | Travel | Surprise, an ice quake! Kai drove the rover 5/8 km toward the tower. A crack opened, so he backed up 2/8 km. Then he found a safe path and drove 6/8 km more. The tower is at the 1 4/8 km mark. **Where is the rover now? How much farther is the tower?** | Step 1: 9/8 (1 1/8) · Step 2: 3/8 | (step 1) **13/8 (1 5/8)**: Kai backed up. Does backing up move the rover forward or back? <br> (step 1) **11/8 (1 3/8)**: Kai backed up 2/8 km in the middle. Did you count that move? <br> (step 1) **3/8**: The rover drove forward twice and back once. Follow each move on the track. <br> (step 2) **21/8 (2 5/8)**: You're finding the distance between the rover and the tower. Should you add or subtract? <br> (step 2) **4/8**: Count the jumps from the rover to the tower, not the marks. | Follow the rover one move at a time on the track. Backing up means going back. |

**Act complete:** The cables are fixed and the panels are clear, {firstName}!

**Teaser:** Next on Frostveil: the path to the relay tower is open. Act 3 opens on your next station visit.

## Act 3 · Reach the tower and restart the relay

**Opening:** Specialist {firstName}, Commander Vega again. The storm has passed, and the path to the relay tower is clear. Kai and Nova are hiking up the ridge with the power cells. The tower needs every bit of charge we can give it. Get that tower talking, and Frostveil is back on the map.

| # | Level | Machine | Crew line and question | Answer | Wrong answers → hint | S.A.M. hint |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | On level | Travel | Kai and I took different trails up the ridge. Kai hiked 2/6 of a kilometer, rested, then hiked 3/6 more. I hiked 4/6 of a kilometer without stopping. **Who hiked farther? How much farther?** | Kai, by 1/6 km | **nova**: Add Kai's two hikes together first. Then compare. <br> **5/6**: That's how far Kai hiked. The question asks how much farther. <br> **9/6 (1 3/6)**: You're comparing the two hikes. Should you add Nova's hike or subtract it? | Find Kai's total first. Then compare it to Nova's 4/6 on the same track. |
| 12 | On level | Crew Debate | Kai: "The charger shows three cells: 2/8, 5/8, and 6/8. You HAVE to add them in order, left to right. Any other way is cheating!" Nova: "I added 2/8 + 6/8 first, because that makes 1 whole. Then I added 5/8. I got 1 5/8 — the same answer." **Who is right, Kai or Nova? Pick the best reason, then tell Kai why.** Reasons: A) Nova. You can add fractions in any order and get the same total. Making 1 whole first just makes it easier. B) Nova, because 6/8 is the biggest number, so it should go first. C) Kai. Changing the order changes the answer. D) Kai. You always have to add from left to right, or it doesn't count. | Nova, reason A |  | Try it both ways. Do you get the same total? |
| 13 | On level | Sort Bay | Each power pack holds two cells. The tower needs packs with at least 1 whole charge. Help me sort them before we carry them in. **Add the two cells in each pack. Sort each pack into the right bin.** Packs: p1 3/4 + 1/4, p2 2/5 + 2/5, p3 5/6 + 2/6, p4 3/8 + 4/8, p5 7/10 + 3/10, p6 4/12 + 9/12 | p1→one, p2→less, p3→more, p4→less, p5→one, p6→more | **p2**: 2 fifths + 2 fifths is 4 fifths. How many fifths make 1 whole? <br> **p4**: 3 eighths + 4 eighths is 7 eighths. Is that enough for 1 whole? <br> **p3**: 5 sixths + 2 sixths is 7 sixths. How many sixths make 1 whole? <br> **p6**: 4 twelfths + 9 twelfths is 13 twelfths. Is that more than 12 twelfths? | Add the top numbers. Then check: is it fewer parts than 1 whole, exactly 1 whole, or more? |
| 14 | On level | Fill | The tower battery is at 5/12. It needs to reach 11/12 before the relay can start. **How much charge do we need to add? Set the charger, then press Charge.** | 6/12 | **16/12 (1 4/12)**: The battery already has some charge. How much more to get from 5/12 to 11/12? <br> **11/12**: Look at the battery before you charge it. Is it empty? <br> **7/12**: Count the jumps from 5/12 to 11/12 again, one twelfth at a time. | Start at 5/12. Count up by twelfths to 11/12. |
| 15 | Challenge | Fill | This is it! The three power cells hold 3/6, 5/6, and 2/6 of a charge. The relay needs 1 2/6 to restart. Nova's radio needs 1/6 from whatever is left over. **Step 1: What is the total charge? Step 2: How much is left after the relay restarts? Step 3: How much is left after Nova charges her radio?** | Step 1: 10/6 (1 4/6) · Step 2: 2/6 · Step 3: 1/6 | (step 1) **10/18**: The cells are all sixths. Do the parts change size when you add them? <br> (step 1) **8/6 (1 2/6)**: There are three cells. Did you add all three? <br> (step 2) **18/6 (3)**: The relay uses up charge. Should you add or subtract? <br> (step 2) **8/6 (1 2/6)**: That's what the relay needs. How much is left after the relay takes it? <br> (step 3) **3/6**: Nova's radio uses charge, too. Should the leftover go up or down? | Add all three cells first. Then take away one amount at a time. |

**Act complete:** The relay tower is back online, {firstName}! Frostveil can talk to the whole station again.

**Teaser:** Mission complete. Commander Vega will send your next transmission soon.

## Discoveries

| Task | Discovery | Fact |
| --- | --- | --- |
| 2 | Ice crystal | Snowflakes are made of ice crystals. They usually have 6 sides or 6 arms because of the way water freezes. |
| 3 | Aurora | On Earth, auroras glow in the sky near the North and South Poles. They happen when tiny bits from the Sun crash into the air high above us. |
| 4 | Frost moth | Some moths fly in winter. They shiver the muscles that move their wings to warm up before they take off. |
| 5 | Sun dog | Sun dogs are bright spots on each side of the Sun. Tiny ice crystals in the air bend the sunlight to make them. |
| 6 | Arctic fox paws | Arctic foxes have thick fur on the bottoms of their paws. It helps keep their feet warm when they walk on snow and ice. |
| 8 | Snow shelter | Fluffy snow is mostly trapped air. That's why a snow shelter can stay much warmer inside than the freezing air outside. |
| 10 | Glacier | A glacier is a huge sheet of ice that moves very slowly, like a frozen river. Some move less than a meter a day. |
| 11 | Penguin huddle | On Earth, emperor penguins huddle close together during Antarctic winter storms. They take turns in the warm middle of the group. |
| 13 | Icicles | Icicles grow when melting snow drips and freezes again. They get longer one drop at a time. |
| 15 | Frost | Frost forms when water vapor in the air freezes right onto a cold surface. It turns into ice without becoming liquid water first. |

## Notes for the build session

- New answer kinds: mistake (7), numberless (9), steps (10, 15), compare (11), sort (13). Grading is written and tested; see CONTENT_NOTES at the top of catalog.js.
- New machine configs: travel (6, 10, 11), repair (7), numberless (9), sort (13), fill.grid (8), fill.cells (15).
- Task 12 uses new optional debateHints so its hints aren't about thirds.
- To open an act: remove `locked: true` from the act and its tasks, and add the act to `playableActs`.

## Review checklist

- [ ] Every task practices 4.3E (like denominators, add or subtract; mixed numbers in 6 and 10)
- [ ] Answer keys checked by hand
- [ ] Wrong answers match real misconceptions
- [ ] Discovery facts are accurate
- [ ] Nothing implies a time limit
