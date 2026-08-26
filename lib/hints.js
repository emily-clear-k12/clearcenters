// Safe to import from client components. These are pre-written S.A.M. hints —
// replacing what used to be a live AI call to /api/hint. No student data or
// answer key lives here; every hint is a nudge or a question, never the
// final answer.
//
// How this is used (see requestHint() in ActivityClient.js): a case's
// specific hints are shown first, in order. Once those run out, the student
// falls through to GENERIC_HINTS and loops through them for as long as they
// keep asking — since there's no API cost anymore, there's no reason to cap
// how many hints a student can request.
//
// Content status: Claude-drafted, pending Emily + colleague review before
// being treated as classroom-ready. Grade 5 Science was the first reviewed
// sample; Grade 3/4 Science and all Social Studies were drafted in the same
// pass and follow the same rules (see below) but have not yet had a human
// pass.

export const GENERIC_HINTS = [
  "Look back at your evidence bank — is there a specific fact you haven't used yet in your answer?",
  "Have you clearly said whether the claim is true or not? Don't just describe what happened — take a stand.",
  "Try using the exact vocabulary word from the case instead of an everyday phrase — that shows you really understand the idea.",
  "Read your answer back — would someone who wasn't there understand your reasoning, or are you assuming they already know what you know?",
];

export const CASE_HINTS = {
  // ---------- Grade 5 Science ----------
  "5.6A": [
    "Look at your evidence bank — you've got two objects that stuck to the magnet and two that didn't. What do the two that stuck have in common?",
    "Marlow says any metal should stick to him. Does your evidence agree with that, or does it show something more specific going on?",
  ],
  "5.6B": [
    "The raisins and pretzels got mixed together — but did picking them back apart change what they actually are? What does your evidence say?",
    "Try using the word \"mixture\" in your answer — it's the exact term for what's happening here, and using it shows you understand the idea, not just the story.",
  ],
  "5.6C": [
    "Check the two mass readings — before the syrup was added and after. What do those two numbers tell you about whether anything actually disappeared?",
    "If the syrup \"vanished,\" the mass should've dropped. Does your evidence back that up, or does it point somewhere else?",
  ],
  "5.6D": [
    "Compare the two mass readings — inflated and deflated. If the ball were truly empty when flat, would there be any difference in mass at all?",
    "What does the pressure gauge tell you about what's inside the ball, even when you can't see it?",
  ],
  "5.7A": [
    "Compare the force numbers from Round 1 and Round 2 — what was different about the two rounds that made the leash move in one but not the other?",
    "Just because the leash didn't move in Round 1 doesn't mean there was no force at all. What does your evidence say was actually happening?",
  ],
  "5.7B": [
    "Milo changed three things at once in his test. Which ONE thing would you need to change — while keeping everything else the same — to actually know what caused the difference?",
    "Look at the fair-test trials in your evidence — what did they keep the same, and why does that matter?",
  ],
  "5.8A": [
    "The sneaker still lit up even when it wasn't touching the ground — what does that tell you about where the energy is really coming from?",
    "Try naming all three forms of energy in order, starting with what's stored inside the battery.",
  ],
  "5.8B": [
    "The outlet and the cord both tested fine. What does the bulb-by-bulb tester show you about where the actual problem is?",
    "A string of lights only works if every single connection is complete. What happens to the whole circuit when just one bulb breaks that path?",
  ],
  "5.8C": [
    "You've got three separate tests here — mirror, glass, and velvet. Which light behavior does each one show: reflecting, bending, or absorbing?",
    "The velvet doesn't bounce any light back. What's happening to the light when it hits something that dark?",
  ],
  "5.9": [
    "Look at the shadow measurements from morning, noon, and afternoon — what's actually changing position here, the goalpost or something else?",
    "The goalpost never moves. So what's really causing its shadow to crawl across the field all day?",
  ],
  "5.10A": [
    "Your evidence bank connects warm ocean air, water vapor, and overnight cooling. Can you walk through that chain in order, starting with the Sun?",
    "Foggy mornings follow warm, humid afternoons. What does that pattern tell you about where the fog's moisture is coming from?",
  ],
  "5.10B": [
    "Real sedimentary rock in your evidence has 5 visible layers. What does that number of layers suggest about how long it actually took to form?",
    "What does the coal sample tell you about how long compression really takes, compared to a single quick squeeze?",
  ],
  "5.10C": [
    "Match each landform in your evidence to what shaped it — is it wind, water, or ice? Which force fits the canyon?",
    "Is there any evidence at the canyon site of something sudden happening, like an earthquake? What does that missing evidence tell you?",
  ],
  "5.11A": [
    "Your evidence bank has real numbers in it — a waste reduction percentage, trees saved. Try working one of those specific numbers into your answer.",
    "Recycling is only one of the solutions in your evidence. What's another one, and how is it different from recycling?",
  ],
  "5.12A": [
    "The bird feeder didn't just affect birds — look at what happened to the insects, the plants, and even the cat. Can you trace that chain?",
    "What's the connection between the birds eating insects and the garden plants suddenly growing better?",
  ],
  "5.12B": [
    "Follow the chain in your evidence — bees, then flowers, then fruit, then the farmer's crop yield. Where does it end up?",
    "Bees aren't the only ones affected here. What's at least one other part of the farm that the evidence shows changing too?",
  ],
  "5.12C": [
    "Your evidence mentions pollinators and rainwater runoff — how does paving over the garden affect each of those, even though they're not \"on\" the same plot of land?",
    "What did the butterfly count do after a similar garden got paved over somewhere else? What does that comparison tell you?",
  ],
  "5.13A": [
    "Each animal in your evidence solves a different desert problem — heat, predators, or water. Can you match at least two animals to the specific problem they solve?",
    "The tortoise and the kangaroo rat are both avoiding the same thing, but in different ways. What is it, and how does timing help each of them?",
  ],
  "5.13B": [
    "The video log shows weeks of practice before the trick worked. What does that timeline tell you about whether this was really \"natural talent\"?",
    "There's an untrained dog of the same breed in your evidence — what's it there to prove?",
  ],

  // ---------- Grade 3 Science ----------
  "3.6A": [
    "Look at the cork in your evidence bank. It's only 3 grams — smaller than the pebble — but it floats. Does that match Pebble's idea that small things float?",
    "Check the weights. The log is 2,100 grams and it floats. Is weight really what decides it?",
  ],
  "3.6B": [
    "Look at just one grain of rice under the magnifier. Does it change shape, or stay the same?",
    "Rice makes a pile with a point on top. Water goes flat. What does that tell you?",
  ],
  "3.6C": [
    "The sealed jar had nothing inside it, but it still got wet on the outside. So can the water really be leaking through the glass?",
    "The juice is purple, but the drops outside are clear. What does that tell you about where the drops came from?",
  ],
  "3.6D": [
    "Look at the handle test. The steel handle gets icy and slippery when wet, but the wood handle stays warm and grippy. Is steel really the best choice for every part?",
    "Check the weights. The steel canopy is 4,000 grams. The fabric one is only 200 grams. Why might that matter for something you carry?",
  ],
  "3.7A": [
    "Look at your evidence — the feather landed on the floor all 20 times she was dropped. If gravity really skipped her, would that happen every time?",
    "The same sheet of paper falls faster when it's crumpled up. What does that tell you about what is really slowing Feather down?",
  ],
  "3.7B": [
    "Look at the distances. A hard push sends the disc to 190 cm, but the target is only at 120 cm. What happened when he tried a soft push instead?",
    "Wallop only ever pushes harder. But the side tap changes the disc's direction, and the string can stop it. What do those two moves show him?",
  ],
  "3.8A": [
    "Look at the window sill numbers. The sunny side is 31°C and the shaded side is 22°C. Where do you think that extra heat comes from?",
    "The clock has no plug, but it runs all day on a battery. Does Nara's rule about plugging in still work?",
  ],
  "3.8B": [
    "The small ball knocked over 2 cups from the bottom, but the very same small ball knocked over 9 cups from the top. If the ball didn't change, what did?",
    "Where on the ramp does the ball go fastest? Think about how that speed connects to how many cups fall.",
  ],
  "3.9A": [
    "When your class walked the model, the Moon got left 8 metres behind Earth. What does that tell you about what the Moon should really be tied to?",
    "Check your Moon log — the Moon stays about the same size in the sky all year. Would that happen if the Moon really traveled with the Sun instead of Earth?",
  ],
  "3.9B": [
    "Look at Mercury. He is one of the smallest planets, but he stands first in line. If size decided the order, could that be true?",
    "The floor tape was measured out starting from the Sun. What do you think the line-up is really measuring?",
  ],
  "3.10A": [
    "Both cousins checked their clocks, and both really did say 2:00. So if the time matches, what else could explain the different weather?",
    "Look at how far apart the two cities are — 380 kilometres! Could two places that far apart just have different weather at the same time?",
  ],
  "3.10B": [
    "Look at the boulder. There's a pile of grit at the bottom that is the same colour as the rock above it. Where do you think that grit came from?",
    "The sieve caught rock grains AND leaf bits AND a beetle wing. Does that sound like soil is one thing, or more than one thing mixed together?",
  ],
  "3.10C": [
    "Find the fence post in both photos — it's the same post, with the same broken rail. What does that tell you about whether these are really two different hills?",
    "Check the quake log. A magnitude 4.9 earthquake hit at 3:14 in the morning. Could that explain how the hill changed so fast?",
  ],
  "3.11A": [
    "Look at the chair's legs. They're steel, and steel starts out as iron ore dug from the ground. Does going through a factory change where the metal first came from?",
    "Pick one more thing in the room, like the window or the bread. What natural thing do you think it started out as?",
  ],
  "3.11B": [
    "Look at the lid marks. The barrel went from 400 litres in April down to 90 litres now, using about 60 litres a week. How long can that last?",
    "The barrel only fills back up when it rains on the roof. Check the forecast — what happens if there's no rain for three weeks?",
  ],
  "3.11C": [
    "Look at the pencil pot made from a jam jar. It never needed a truck at all. How is that different from putting a cup in the recycling bin?",
    "Kip uses about 720 cups a year, and every one still needs a truck, washing, and remaking, even after it's recycled. Does recycling really make the number of cups not matter?",
  ],
  "3.12A": [
    "Scratch under the bark of the pecan twig in your evidence. What colour is underneath? Does that sound like a dead tree?",
    "The warbler wasn't seen here in November, but it was recorded far away in Mexico. What does that tell you about where it went?",
  ],
  "3.12B": [
    "Look at what really happened at Miller's Pond. Check the numbers — how many herons were there in 2019, and how many by 2021?",
    "The frogs aren't the only ones in this chain. What happened to the midges once the frogs were gone?",
  ],
  "3.12C": [
    "Look at the cattails and the ant colony after the flood. One number went way up, and one place is now empty. Were the flood's effects the same for both?",
    "Remember the drought two years ago — the cattails died back that time, but the ants were fine. What does that tell you about a flood being bad for everything?",
  ],
  "3.12D": [
    "The rock was sealed shut until it split open this morning. If nobody could get inside, how could someone have scratched a picture in there?",
    "Compare the vein pattern in the rock to the living fern on the windowsill. Do they match? And how many more like it are in the quarry?",
  ],
  "3.13A": [
    "Look at the swim log. Duck crosses the water in 9 seconds with her real feet, but it took 31 seconds with her feet taped narrow like Hen's. What does that tell you about webbed feet in water?",
    "Hen can scratch up 8 worms in 5 minutes, but Duck's webbed feet can't scratch up any. Maybe the question isn't which feet are better — it's which feet fit which job.",
  ],
  "3.13B": [
    "Look at the red dot. Nan marked grub number seven in March, and the beetle that came out in May had that same red dot. What does that tell you about whether they're really different animals?",
    "Check what happened when 3C took the grubs out of their bin — it only made a third as much compost. Does that sound like grubs are just pests to get rid of?",
  ],

  // ---------- Grade 4 Science ----------
  "4.10A": [
    "Look at Cup B — it was sealed shut, and tiny droplets still showed up on the inside of the wrap. What does that tell you about where puddle water actually goes?",
    "Compare the sunny day's chalk line to the cloudy day — the puddle dried much slower under clouds. What does that tell you about what speeds evaporation up?",
  ],
  "4.10B": [
    "Check the grain match — the sand on the bar matches the gully, not the creek bed. What does that tell you about where it traveled from?",
    "Look at where the creek runs fast and where it slows down at the bend. Why would the sandbar sit exactly at the slow spot?",
  ],
  "4.10C": [
    "Compare this week's six rainy days to last year's same week, which only had one. What does that tell you about trusting one short stretch of weather?",
    "The Almanac says about 1 rainy day in 7 on average over the long run. How does that compare with what the Forecast is showing right now?",
  ],
  "4.11A": [
    "Look at the Wind Log — nine nights in February with almost no wind. Can Wendy's plan really promise power at 3am every night?",
    "Think about renewable versus nonrenewable — the generator runs any hour, but diesel has to be trucked in and can't be replaced once it's burned. What's the tradeoff there?",
  ],
  "4.11B": [
    "Follow the chain past the lights — no pump means no water pressure. What's the next thing on that list, and the thing after that?",
    "Look at the clinic fridge and the grocery shelves — how long does each one actually have before real trouble starts?",
  ],
  "4.11C": [
    "Compare the soaked-versus-dry masses — the sandstone gained weight but the granite stayed at exactly 612 g. What does that tell you about the spaces inside each rock?",
    "The Hand Lens showed connected gaps in the sandstone but none in the granite. Why would the gaps needing to connect matter more than just having gaps at all?",
  ],
  "4.12A": [
    "Check the Pot Scale — the soil barely lost any mass while the plant grew a lot. If the plant isn't eating the soil, where else could its food be coming from?",
    "Compare the jar plant and the cupboard plant — both had water, but one sat in the dark. What's missing there that the jar plant on the windowsill still gets?",
  ],
  "4.12B": [
    "Think about where Rabbit's energy came from before it ever reached him. Does the baton really start with Rabbit, or does it start further back?",
    "Look at where new grass grows thickest — right where the old log rotted away. What does that tell you about the job Muncher does on this team?",
  ],
  "4.12C": [
    "Think about how many fossils are on that hillside, and that many are still stuck inside the rock itself. Could one kid carrying one shell explain all of that?",
    "The hillside is limestone, and limestone forms in shallow seas. What does the rock itself tell you about what this place used to be?",
  ],
  "4.13A": [
    "Compare the Leaf Test numbers — Sage lost only 3 grams of water in a day while Blossom lost 19. What does that tell you about how each plant handles the dry, sunny box?",
    "Look at the Root Trench — Sage's roots reach 34 cm down while Blossom's stop at 7. Why would reaching that much deeper matter when the top soil dries out in a day?",
  ],
  "4.13B": [
    "Look at Pumpkin's first-week photo — her chin was already white before she ever ate kale or picked up any habits. Now compare that to the flat patch, which came from where she sleeps.",
    "Check what the pups actually have — patches and the rump swirl, but no flat patch and no kale in their diet. What separates the traits they got from Pumpkin's habits?",
  ],
  "4.6A": [
    "Look at the Kitchen Scale results — the padlock and sponge are the same size, but their masses are nowhere close. Why would mass tell Bex more than \"blue and medium\" ever could?",
    "Think about the Water Bowl test — one object sank and one floated. What's a property you could actually measure or test, instead of just describing how something looks?",
  ],
  "4.6B": [
    "Compare the Taste Test — the tea tastes the same top and bottom, but the dressing tastes like oil on top and vinegar underneath. What does that tell you about whether the oil actually dissolved?",
    "Whisk has been stirring for 11 minutes straight. Does more stirring change what the dressing does, or does it separate again no matter what?",
  ],
  "4.6C": [
    "Check the scale — the jar weighed exactly 680 g both before and after mixing. If nothing is missing in mass, what does that tell you about the 70 mL gap in volume?",
    "Think about the Gaps — dry soil has air pockets between its grains. Where could the water have gone without any of it actually disappearing?",
  ],
  "4.7": [
    "Look at the Spirit Level — it shows the left side sitting lower, and a book under the short leg made the drifting stop. What force pulls things toward the low side even when nobody's touching the table?",
    "Compare the 84 cm roll on wood to the 31 cm roll on felt. Is that difference about the slope of the table, or about something else the marble is rolling across?",
  ],
  "4.8A": [
    "Look at the gap test — pull one middle marble out and the end marble doesn't move at all. What does that tell you about what the middle marbles were actually doing, even though they barely moved?",
    "Think about the cork bobbing in place while the ripple crosses the whole tray. Does something have to travel all the way across for energy to get through it?",
  ],
  "4.8B": [
    "Compare Slush and Drift — same size, same yard, same night, but Slush wore the coat and melted less. If the coat isn't making heat, what is it actually doing to the thermal energy?",
    "Think about the metal shovel handle versus the wooden one. Why would metal feel colder to touch even though neither one is actually making cold?",
  ],
  "4.8C": [
    "Look at what happens when Wire Back gets disconnected — the whole glove goes cold. If the electricity was already \"used up\" in the coil like Pilar thinks, why would that matter at all?",
    "Notice that the switch is on the return side and it still turns the glove off. Why would that only work if electricity has to travel all the way around, not just one way?",
  ],
  "4.9A": [
    "Look at the timing — sunset had already been getting earlier for eight weeks before the first cold day ever showed up. Can the cold really be causing something that started before it did?",
    "Check the warm week in November — sunset kept getting earlier anyway, even though it wasn't cold. What does that tell you about what's really driving the change?",
  ],
  "4.9B": [
    "Ari tracked 28 nights of phases and the pattern repeats every month like clockwork. If Luna were actually shrinking and growing, would the pattern line up that exactly?",
    "Remember that the Sun always lights exactly half of Luna. If her size never changes, what's actually changing to make her look like a sliver some nights and whole on others?",
  ],

  // ---------- Social Studies Grade 3 ----------
  "SS.3.10A": [
    "Think about the music, stories, and customs families share at the celebration. Where do those come from, and why do families keep sharing them?",
    "Mia thinks it's just about the party stuff. Who is learning something at the celebration, and what are they learning?",
  ],
  "SS.3.10B": [
    "Look at your evidence for both celebrations. What traditions make each one special, not just the food or music?",
    "Jay says the two celebrations are basically the same because both have food and music. What's different about the stories or ceremonies behind each one?",
  ],
  "SS.3.12": [
    "Look closely at the painting. What does it show about clothing, food, or family life? That's real evidence about a community's culture.",
    "Max thinks the painting and story are just for fun. What do they teach people about how this community lives?",
  ],
  "SS.3.13B": [
    "Pick one example from your evidence, like vaccines or pasteurization. Who does it help first, and who else does it end up helping?",
    "Mia thinks new technology only helps the first person who uses it. Does your evidence show it helping more people than that?",
  ],
  "SS.3.1A": [
    "Look at your three cards — one about a person, one an event, one an idea. How did each one cause a change, even without a new building?",
    "Mia thinks change is mostly about new buildings. What did the librarian or the students in your evidence actually do to cause change?",
  ],
  "SS.3.1C": [
    "Think about what Daniel Boone did. He didn't build houses — he opened a route. How did that help a new community start?",
    "Nina says communities grow mostly from building more houses. What did the Founding Fathers create instead, and how did that help too?",
  ],
  "SS.3.2A": [
    "Look at the three families in your evidence. Each one has a different reason for wanting a community. What are those reasons?",
    "Jay thinks people just like being near neighbors. Can you find a reason in your evidence about safety, freedom, or jobs instead?",
  ],
  "SS.3.2B": [
    "Pick one need, like getting around. How does the local community meet it, and how does the island community meet that same need differently?",
    "Ava thinks both communities should solve problems the same way. What is it about the island that makes a ferry a better fit than a bus?",
  ],
  "SS.3.3A": [
    "Look at your three environment cards. What is different about the land, the water, and the hazards in each one?",
    "Kai says two places are basically the same if the weather matches today. Does a desert have the same land and hazards as a wetland?",
  ],
  "SS.3.3B": [
    "Look at your evidence. Some actions change how people live, like wearing warm clothes. Some actions change the land itself, like cutting a road. Which is which?",
    "Mia thinks adapting and modifying are the same thing. Does building a canal change the person, or does it change the environment?",
  ],
  "SS.3.3C": [
    "Look at your three cards — building, conservation, and pollution. Who caused each of those changes?",
    "Leo thinks landscapes mostly change because of nature. Did anything in your evidence happen because of something people did, like building homes or littering?",
  ],
  "SS.3.5A": [
    "Look at your evidence cards — earning, saving, and donating are all different things you can do with money. What is each one for?",
    "Jax thinks the smart choice is to spend it all. What could saving or donating do that spending everything can't?",
  ],
  "SS.3.5B": [
    "Add up the snacks, decorations, and game. Do they fit inside $40 while still saving $10?",
    "Ella just wants to buy everything on the list. What do you have to leave out, or change, to make the numbers work?",
  ],
  "SS.3.6A": [
    "Look at how many bracelets were left and how many students still wanted one. What happened to the price when bracelets got scarce?",
    "Jay thinks sellers just feel like changing prices. Does your evidence show supply and demand causing that change instead?",
  ],
  "SS.3.6B": [
    "There are 8 soccer balls and 24 students who want one. Does something have to be completely gone to be scarce?",
    "Mia thinks scarce means none are left. Why does the teacher have to make a choice even though there are still some balls?",
  ],
  "SS.3.6C": [
    "Compare the cost to make each sticker pack with the price it sold for. Does selling out always mean the shop made money?",
    "Ben thinks selling out proves a profit. What would happen if the pack sold for $2 instead — would that shop have made money too?",
  ],
  "SS.3.7A": [
    "Look at who each level of government serves — a town, a whole state, or the whole country. How is that different?",
    "Mia thinks it's really just one government with different names. What size of area does each level cover?",
  ],
  "SS.3.7B": [
    "Look at your three official cards. Who elects a mayor, and who elects a governor?",
    "Zoe thinks everyone votes for every official. Does your evidence show a mayor being chosen by voters from the whole country?",
  ],
  "SS.3.7C": [
    "Match each service to how many people it reaches. Trash pickup helps one town, but national defense protects the whole country. What level fits each one?",
    "Ben thinks any level of government could handle any service. Would it make sense for the national government to run your local park?",
  ],
  "SS.3.8A": [
    "Look at your three document cards. One explains why the colonies separated, one sets up the government, and one protects freedoms. What job does each one do?",
    "Nora wants to use one label for all three documents. Does the Declaration do the same job as the Bill of Rights?",
  ],
  "SS.3.8B": [
    "Look at your evidence about elections. Where does a leader's authority actually come from?",
    "Max thinks leaders have authority just because they're in charge. What do citizens do, through voting, that gives leaders their power?",
  ],
  "SS.3.9A": [
    "Look at your three cards — responsibility, fairness, and being informed. Which of those is more than just being nice?",
    "Mia thinks being nice is enough. What did the family do when they learned about a local issue? Is that just niceness?",
  ],
  "SS.3.9C": [
    "Look at your evidence — following laws, joining a cleanup, serving on a jury. What do these all have to do with your community or government?",
    "Leo thinks any helpful action counts as civic responsibility. Would watering your own plants count the same as voting in an election?",
  ],
  "SS.3.9D": [
    "Look at your Red Cross and food pantry cards. Who is helping people in these examples — government, or someone else?",
    "Max thinks government should solve every problem. Does your evidence show nonprofits and civic groups also helping the common good?",
  ],
  "SS.3.9E": [
    "Look at your evidence. Does every student get the same number of votes, no matter how loud they are?",
    "Max thinks the loudest choice should win. What actually decides the winner in your evidence — being loud, or counting the votes?",
  ],

  // ---------- Social Studies Grade 4 ----------
  "SS.4.10A": [
    "Look at the two lemonade stands in your evidence — one has only a few pitchers left, and one has plenty. Why might that difference matter for price, even though a lot of people want lemonade at both stands?",
    "Mia says demand always pushes the price up. Does the stand with plenty of lemonade back that up, or does supply seem to matter too?",
  ],
  "SS.4.10B": [
    "Your evidence shows businesses improving their products or prices to attract customers — who benefits when that happens, just the business, or the customer too?",
    "Lee thinks choice mostly helps businesses. Look at the evidence about people choosing between products and prices — what does that same evidence say happens for the person doing the choosing?",
  ],
  "SS.4.11B": [
    "Pick one type of business from your evidence, like farming or tourism, and check what climate or resource it actually needs. Would hard work alone make up for the wrong location?",
    "Ryan thinks hard work is all that matters. Compare that to what your evidence says about landforms and scenery near a tourism business.",
  ],
  "SS.4.11C": [
    "Abby's claim only covers one factor — more people moving in. What does your evidence say exploration and limited resources each added to the story?",
    "Try connecting all three factors in your evidence bank — exploration, newcomers, and shortages — instead of picking just one to explain Texas's growth.",
  ],
  "SS.4.11D": [
    "Look at your evidence about telephones, radio, and the internet — does it only describe people chatting, or does it also describe businesses using faster information?",
    "Max thinks communication is just for talking. Compare the transportation evidence and the communication evidence — what do they have in common in how they help businesses?",
  ],
  "SS.4.12A": [
    "Compare your Caddo Council File and your Comanche Band File — were their governments organized the same way, or differently?",
    "Ella assumes living in the same region means the same government. What does your evidence say about how each group's way of life shaped its leadership?",
  ],
  "SS.4.12B": [
    "Look at your Spanish Rule File and your Mexican Government File — both had officials and laws, but were they run by the same authority?",
    "Nora thinks nothing really changed. What does your evidence say changed about who was in charge after Mexico became independent?",
  ],
  "SS.4.13A": [
    "Your evidence describes one document explaining why Texas separated and another organizing how government would run. Are those really the same job?",
    "Mia thinks both documents did the same thing. Check your Declaration File and Constitution File — what specific job does each one do?",
  ],
  "SS.4.13B": [
    "Look at your evidence bank — which branch makes laws, which one carries them out, and which one interprets them? Jax says the governor can do all three.",
    "Check the Judicial File — whose job is it to decide what a law means? Does that match what Jax claims the executive branch can do?",
  ],
  "SS.4.13C": [
    "Look at your three document files — one explains separation, one builds the government's framework, and one protects individual freedoms. Are those really the same kind of job?",
    "Zoe says all three documents are basically rule lists. Check the Rights File — is it creating government power, or limiting it?",
  ],
  "SS.4.15B": [
    "Your evidence bank lists several ways to get involved that don't require voting — like letters, service projects, or historic preservation. Which one fits the issue in this case?",
    "Max thinks you have to wait until you can vote to make a difference. What does your evidence say a citizen of any age can actually do?",
  ],
  "SS.4.15C": [
    "Your evidence says a vote is more responsible when it's based on information instead of guessing. What does that tell you about what should happen before someone votes?",
    "Zoe thinks showing up is the whole job. Look at the Informed Voter File — what step comes before casting the ballot?",
  ],
  "SS.4.15E": [
    "Look at your evidence about the broken park light — was that a local problem or a state problem? Match the level of government to the level of the issue.",
    "Milo thinks the governor is always the safe choice. Check your evidence about elected versus appointed leaders — is the governor really the right contact for every kind of problem?",
  ],
  "SS.4.17B": [
    "Look at your three artist files — Lydia Mendoza, Chelo Silva, and Julius Bledsoe. Do they all represent the same musical style, or different ones?",
    "Cole thinks there's one main Texas style. How would you describe each artist's contribution using your evidence, instead of treating them as small extras?",
  ],
  "SS.4.18B": [
    "Look at your Energy File — it lists effects on homes, businesses, jobs, AND how power is produced. That's more than one benefit from a single innovation.",
    "Zoe thinks each invention does just one job. Pick one innovation area from your evidence and list all the different groups it helps.",
  ],
  "SS.4.1B": [
    "Compare your Caddo Village File with the Karankawa or Lipan Apache file — did they all live the same way, or did their homes and food sources differ?",
    "Ava assumes one display could represent everyone. What does your evidence say about how farming, coastal living, and hunting were different ways of life?",
  ],
  "SS.4.1C": [
    "Look at your Gulf Region and Plains Region files — the resources listed there aren't the same. How might that difference have shaped what people ate or did each day?",
    "Nico thinks regions are just map labels. Pick two region files and explain how the land itself connects to a group's way of life.",
  ],
  "SS.4.2A": [
    "Your evidence bank lists wealth, competition, and land-claiming as reasons Europeans came to Texas — where does curiosity fit into that list?",
    "Ben thinks it was mostly about adventure. Look at the Competition File and Expansion File — what do those suggest was really driving countries to explore?",
  ],
  "SS.4.2B": [
    "Look at your La Salle File — his colony actually failed. Did that mean it had no impact, or did it still change what Spain did next?",
    "Jax is ranking explorers by how far they traveled. Does your evidence suggest impact is about distance, or about what actually changed because of someone's expedition?",
  ],
  "SS.4.2C": [
    "Your evidence bank lists water, travel routes, and nearby communities as reasons for choosing a mission site — does that sound like any empty land would work?",
    "Eli thinks location didn't matter much. Try connecting the religious purpose from your Mission File with the location factors from your Location File.",
  ],
  "SS.4.2E": [
    "Look at your Austin Contract File and De León Colony File — empresarios weren't just moving themselves, they were bringing many families under a contract. What does that tell you about their role?",
    "Leo says empresarios just wanted free land for themselves. Check the Economics evidence — what did empresarios expect to gain from successfully settling other families?",
  ],
  "SS.4.3A": [
    "Look at your Cause File — it says tensions were already growing before the Alamo even happened. Can something that came before be caused by something after it?",
    "Max is focused only on the Alamo. Try putting your evidence in order — cause, Alamo, Declaration, Runaway Scrape, San Jacinto — and see where the Alamo actually fits.",
  ],
  "SS.4.3D": [
    "Your evidence bank has a success right next to two struggles — the Debt Ledger and the Relations File. Can a republic be successful in one way and still be struggling in another?",
    "Eddie thinks independence fixed everything. Check the Debt Ledger — does that sound like a solved problem?",
  ],
  "SS.4.3E": [
    "Look at your Border File — it says disputes continued even after annexation. Does that sound like the conflict was over?",
    "Mia thinks annexation solved the problem. Try connecting your Annexation File to the War File — what happened because the conflict wasn't actually settled?",
  ],
  "SS.4.4A": [
    "Your Freedom File describes the end of slavery as a major change in law and life. Does \"major change\" sound like things went back to normal?",
    "Noah thinks Texas snapped back to how it was. Look at your Reconstruction evidence — what does it say Texas had to rebuild?",
  ],
  "SS.4.4B": [
    "Your Market File talks about growing demand for beef in other parts of the country — why would that matter more than just how many cows Texas already had?",
    "Ben thinks it was just about having lots of cattle. Check your Trail File — how did those cattle actually get to buyers, and why did that matter?",
  ],
  "SS.4.4C": [
    "Look at your Goods File and Market Link — railroads weren't just about passengers. What kinds of things were they moving, and where?",
    "Maya is focused only on faster travel. Check your City Map evidence — what else showed up near railroad stops besides faster trips?",
  ],
  "SS.4.4D": [
    "Your Buffalo File lists food, clothing, shelter, tools, AND trade. That's a lot more than just one use — how does that affect Eli's food-only claim?",
    "Try connecting all three files — Buffalo, Fort, and Railroad — instead of just one. What combination of pressures changed American Indian life on the Plains?",
  ],
  "SS.4.6B": [
    "Compare two of your region files — do they match on more than just climate? Check vegetation, elevation, and economic activity too.",
    "Kai is comparing regions by weather alone. What other characteristics make the Mountains & Basins region different from the Coastal Plains, even beyond climate?",
  ],
  "SS.4.7A": [
    "Your Water File and Climate File both point to specific needs beyond just \"open land.\" What did people actually need from the land before they could settle there?",
    "Luke thinks any open land would do. Check your Landform File — could people easily settle in a place with a harsh climate, even if the land was open?",
  ],
  "SS.4.7B": [
    "Look across your three files — Early-Texas, Railroad, and Modern Growth. Does each one point to a specific reason towns grew, or does it look random?",
    "Tess thinks it was mostly accidental. Pick one time period from your evidence and explain the real factor that helped a town grow there.",
  ],
  "SS.4.8B": [
    "Your evidence bank lists basic needs, resource use, AND transportation or recreation — that's three different reasons. Where does \"wanting more space\" fit into that list?",
    "Nate thinks it's mainly about space. Check your Needs File — what does it say people are actually trying to get when they modify the environment?",
  ],
  "SS.4.8C": [
    "Your evidence bank has a Benefit File and a Habitat File — one shows what a dam helps with, and one shows what it hurts. Can something be good for people and still cost something?",
    "Zoe thinks helping people means no downside. Look at the Community File — what does it say a dam can affect besides the people who benefit from it?",
  ],
  "SS.4.9A": [
    "Your evidence bank has three separate files — Farming, Trade, and Hunting. Jay is only using one of them. What do the other two add to the picture?",
    "Look at the Trade File — if a group could trade for what they needed, does that mean hunting was their only way of meeting needs?",
  ],

  // ---------- Social Studies Grade 5 ----------
  "SS.5.11A": [
    "Look at your evidence bank — the store only got 40 pairs but more than 100 customers wanted the shoe. What happens to all the customers who didn't get one?",
    "Devon's trap is that this is only a store problem. Your evidence shows sizes selling out fast — what did that force some customers to actually do?",
  ],
  "SS.5.11B": [
    "Try tracing the freeze all the way from the farm to the store shelf — what happened at each stop along the way?",
    "The trap line says only shoppers are affected. What does your evidence say happened at the farm, before the berries ever reached a store?",
  ],
  "SS.5.12B": [
    "Site A has the cheapest land, but look at what it's missing. What would being remote actually cost a business that needs highways and workers?",
    "Site C is close to the biggest city but has flood risk. What's the tradeoff you'd need to weigh instead of picking a site for just one reason?",
  ],
  "SS.5.12C": [
    "Your evidence shows factories hiring more workers AND new stores opening up. How could those two things be connected to each other?",
    "The trap line says newcomers just crowd a place. What are all those new residents doing with their paychecks that could grow the local economy?",
  ],
  "SS.5.12D": [
    "Your evidence mentions workers losing time switching tools and tasks. What would change if each worker just focused on one task instead of building the whole lunch box alone?",
    "Remember, the old method actually works better for small custom orders. Does that mean one method is always best, or does it depend on the job?",
  ],
  "SS.5.13A": [
    "Your evidence shows the king claimed authority AND that colonists elected representatives. How could both of those things be true at the same time?",
    "Think about where decisions actually got made in those local meetings. Does that sound like a monarchy where one ruler decides everything?",
  ],
  "SS.5.13B": [
    "Look at the Mayflower Compact and the House of Burgesses separately — what did each group actually do to make decisions for themselves?",
    "Britain was still in charge the whole time. Does that cancel out what colonists were doing locally, or can both things be true together?",
  ],
  "SS.5.14A": [
    "Your evidence bank shows the Declaration doing three different jobs — announcing separation, laying out ideas about rights, and listing grievances. How do the grievances connect to the decision to separate?",
    "If the Declaration were only a complaint list, would it still matter today? What else is it doing besides complaining?",
  ],
  "SS.5.14B": [
    "\"Make laws\" is just one government action, not the whole Preamble. What other goals does your evidence say the Preamble names?",
    "Try grouping the Preamble's purposes — which ones are about people getting along, and which are about protecting people's rights and freedom?",
  ],
  "SS.5.14C": [
    "Your evidence says some Americans were worried about a powerful national government. What does that worry tell you about why people wanted the Bill of Rights added?",
    "Think about whether the amendments replaced the Constitution or added something new to it — and why that addition still matters today, not just back then.",
  ],
  "SS.5.15A": [
    "Your evidence bank lines up each branch with one job. Try matching Congress, the president, and the courts each to their own job before deciding who does what.",
    "The trap says the executive branch basically does everything since the president is \"the leader.\" Does your evidence actually show the president making laws, or someone else?",
  ],
  "SS.5.15B": [
    "Your evidence shows Congress can override a veto and courts can review laws for constitutionality — so is the president's \"yes\" really the last word?",
    "Look at both checks in your evidence. What's the point of giving other branches these powers in the first place?",
  ],
  "SS.5.15C": [
    "Your evidence names jobs that belong to states and jobs that belong to the national government. Try sorting a few examples into each pile before deciding what \"important\" has to do with it.",
    "Notice that taxation and public safety show up as jobs more than one level handles. What does that tell you about whether every responsibility fits neatly into just one level?",
  ],
  "SS.5.17A": [
    "Your evidence lists ways to participate at the local, state, and national level. Can you name at least two different actions from those lists?",
    "Think about what happens when lots of individuals do these small actions together. Does one person's vote need to change everything by itself to matter?",
  ],
  "SS.5.17B": [
    "Your evidence sorts problems by level — a city park, a state law, a national issue. Which leader actually handles each one?",
    "The trap line says just send everything to the president. Does your evidence show the president is in charge of a neighborhood street or a state law?",
  ],
  "SS.5.17C": [
    "Check your evidence — did everyone get the same number of votes and the same choices, and was the winning rule agreed on before anyone voted?",
    "Losing a vote and the vote being unfair are two different things. What would actually have to go wrong in the process for it to be unfair?",
  ],
  "SS.5.19A": [
    "Look closely at what's happening in the first situation — a peaceful petition being refused. Which specific right in the Bill of Rights covers that kind of action?",
    "For the second situation, think about what specific protection someone accused of a crime is supposed to get — not just \"it's unfair,\" but which right is actually missing.",
  ],
  "SS.5.20B": [
    "Look at the specific details in the painting — a line outside a relief office, workers with shovels on a road project. What do those details tell you about life during the Great Depression?",
    "The artist said the scene came from things they actually observed. Does that make the painting useless as evidence, or does it just come with a limit you should mention too?",
  ],
  "SS.5.21B": [
    "Your evidence lists contributions across music, language, food, science, and more. Can you name specific contributions from at least two different groups instead of focusing on just one culture?",
    "The evidence bank warns that no single person or group can stand for everyone in their community. How should that change the way you describe one group's contribution?",
  ],
  "SS.5.22B": [
    "Your evidence goes beyond travel time — it mentions farm and factory goods reaching distant buyers, plus workers and businesses needed to build and run the railroad. Can you trace those effects past \"it moved people faster\"?",
    "Think about the space program mentioned in your evidence. Could a big innovation like that follow the same pattern of creating jobs and industries that the railroad did?",
  ],
  "SS.5.22C": [
    "A vaccine protects one person directly — but if enough people get vaccinated, could that change something for the whole community, not just one person?",
    "Pick one invention from your evidence bank, the telephone or the airplane, and trace its benefit past the very first, most obvious use.",
  ],
  "SS.5.2A": [
    "Your evidence bank has events before AND after 1773. What was already happening between Britain and the colonies before that tea ever hit the harbor?",
    "Look at what Britain did after the Tea Party. Does that fit a story where the Tea Party was the very beginning, or somewhere in the middle of a longer chain?",
  ],
  "SS.5.4A": [
    "Your evidence mentions both territory AND sailors facing problems at sea. What were those problems, and could that be a separate cause from the land dispute?",
    "Notice that American production changed during the war. Is that something that caused the war, or something that happened because of it?",
  ],
  "SS.5.4B": [
    "Your evidence shows factories growing in some regions while agriculture stayed central in others. Does trade connecting those regions mean their economies became the same, or just linked?",
    "Think about how two regions with very different economies might end up wanting different things from the country's laws and policies.",
  ],
  "SS.5.4D": [
    "Look closely at the states' rights evidence — what specific laws were those rights arguments usually about?",
    "Your evidence says new territories reopened slavery arguments more than once. What does that repeating pattern suggest about which issue kept connecting to the others?",
  ],
  "SS.5.4E": [
    "Your evidence bank names three separate amendments. What did each one actually protect — are those the same thing, or different things?",
    "If the 13th Amendment \"finished the job,\" why would the 14th and 15th Amendments still need to be written afterward?",
  ],
  "SS.5.4F": [
    "Your evidence bank covers three different groups — immigrant railroad workers, settlers, and American Indian nations. Does each group's evidence describe the same experience, or different ones?",
    "Look specifically at what the evidence says happened to American Indian nations. Does \"opportunity for everyone\" match that?",
  ],
  "SS.5.7B": [
    "Your evidence bank has three separate geographic factors — water, land, and transportation. How might Cedar Junction's location measure up on each one?",
    "The trap line says geography \"does not really influence\" settlement. But look at what reliable water and flatter land actually make possible for a growing town.",
  ],
  "SS.5.8A": [
    "Look at your three examples — clothing changes what a person does, while shade structures and irrigation change the surroundings themselves. Which is changing behavior, and which is changing the environment?",
    "Think about the need behind each example — staying cool, getting shade, getting water. Does the same need always get solved the same way?",
  ],
  "SS.5.8B": [
    "Your evidence bank has both benefits — water storage, electricity — and a cost — flooding habitat and land. Can you explain how the SAME dam causes all of it?",
    "The reservoir doesn't just flood habitat. Think about what \"occupied land\" means for the people who live there — does one benefit cancel out that cost, or do you need to weigh both?",
  ],

  // ---------- Signal Check ----------
  // Same rules as above (nudge toward unused evidence, never state the
  // verdict), written for Signal Check's claim/signal/evidence-reading
  // shape instead of Group Chat's trap-line/evidence-bank shape.
  "3.6A-SC": [
    "Look back at the field report — two objects stuck to the magnet, and two didn't, even though all four are metal. What do the two that stuck have in common?",
    "Signal A says magnets stick to EVERY metal object. Does your evidence actually back up a claim that big, or does it point to something more specific?",
  ],
  "4.10B-SC": [
    "Compare the before and after photos of the riverbank — what showed up at the curve that wasn't there on Day 1, and where might it have come from?",
    "Signal A says the rocks are brand new. Check the rock comparison reading — does a matching rock type from upstream support \"brand new,\" or something else?",
  ],
  "5.13B-SC": [
    "Look at how much practice each behavior took in the training archive. Which ones showed up on the very first try, with zero training at all?",
    "Signal A claims sitting on command is instinctual. Check the sit-command clip notes — how many weeks of practice did it actually take?",
  ],
  "SS.3.6A-SC": [
    "Compare the hot-day log to the cool-day log — what happened to the price, and what happened to how fast the cups sold?",
    "Signal C is about the $100 experiment. Check that log — did people actually buy lemonade at that price, or not?",
  ],
  "SS.4.3A-SC": [
    "Look closely at who's on the defender roster versus who Santa Anna's order says to release. Are those the same group of people?",
    "Signal A says \"every single person\" died. Check Dickinson's and Esparza's accounts — do they fit inside that word \"every,\" or outside it?",
  ],
  "SS.5.4C-SC": [
    "Check the Native village records — what do they tell you about who was already living along the expedition's route before Lewis and Clark got there?",
    "Signal B is about Sacagawea's role. Look at what she actually did in the records — was it more than just being present?",
  ],
  "3.10A-SC": [
    "Check the week tally — how many of the five days did the forecast actually match? Does one miss on Friday erase the other four?",
    "Signal B is about Friday's miss. Look at the weather station note — what makes a fast-moving system harder to predict than a normal one?",
  ],
  "3.10B-SC": [
    "Look at the sifting test results — it separated the sample into three different things. Does that sound like soil is \"just dirt,\" or more than one material mixed together?",
    "Signal B is about decayed plant material. Check the leaf-pattern reading — what specific detail shows those dark bits used to be a leaf?",
  ],
  "3.10C-SC": [
    "Look at the weekly photo log — does the curve show up all at once in one photo, or does it grow a little at a time across many weeks?",
    "Signal B claims this kind of change happens overnight. Check the storm event log — was there a single flood or storm the week the curve appeared?",
  ],
  "3.11B-SC": [
    "Compare the June and August tank readings — what actually happened to the level over a dry summer?",
    "Signal C says renewable means water can never run low anywhere. Check the local shortage note — does the water cycle being renewable stop one town's tank from dropping?",
  ],
  "3.12A-SC": [
    "Compare the October and November field counts — which animals are missing, and does \"missing\" automatically mean \"dead\"?",
    "Signal B claims every missing animal died. Check the goose tracking tag and the groundhog burrow reading — what do they actually show happened to each one?",
  ],
  "3.12B-SC": [
    "Look at the heron count log — what happened to the number of herons after the frog population dropped?",
    "Signal B says herons would switch food with zero real change. Check both the alternate food note AND the heron count log — do they agree with \"zero\" change?",
  ],
  "3.12C-SC": [
    "Compare the turtle, fish, and insect surveys after the flood — did all three change the same way, or differently?",
    "Signal B claims every species disappeared. Check the turtle and fish surveys — were animals still found afterward?",
  ],
  "3.12D-SC": [
    "Look at the close-up photo reading — does it show any tool marks around the shape in the rock?",
    "Signal C says a person must have carved it. Check the geologist's note and the similar finds log — what's another way that shape could have formed?",
  ],
  "3.6B-SC": [
    "Compare the two magnified photos — sugar piled up and sugar spread out. Do the individual grains look any different?",
    "Signal C says pouring means something is a liquid. Check the flour comparison — does flour pour too, even though it's a solid?",
  ],
  "3.6C-SC": [
    "Look at the drop color and the soda color side by side — do they match?",
    "Signal C says the can is leaking. Check what happened with the warm can — did it get wet at all?",
  ],
  "3.7A-SC": [
    "Compare the flat filter's fall time to the crumpled filter's fall time — did the filter's weight change between those two trials?",
    "Signal C says gravity skips the filter. If that were true, would crumpling it up change anything?",
  ],
  "3.7B-SC": [
    "Compare how far the hard hit traveled to where the target line actually is.",
    "Signal C is about hitting harder always winning. Check the round score log — did the hardest hits actually score the most points?",
  ],
  "3.8A-SC": [
    "Look at what happened to the light when its solar panel was covered for a week.",
    "Signal C says only plugged-in things have energy. What does the battery note say about a flashlight with no cord at all?",
  ],
  "3.8B-SC": [
    "Compare the low release trial to the high release trial — same marble, same weight. What changed?",
    "Signal B is about a fast small marble matching a slow heavy one. Check both pin counts — are they really different?",
  ],
  "3.9B-SC": [
    "Check Mercury's size data next to its distance data — is the smallest planet really farthest from the sun?",
    "Signal C is about what decides a planet's order from the sun. Look at the model measuring tape note — what did the class actually measure with it?",
  ],
  "3.13A-SC": [
    "Look at how long it took the mole to dig, compared to how far the rabbit got trying to dig in the same time.",
    "Signal C says the mole's claws are just worse legs. Check the rabbit running log — what are the rabbit's long legs actually good for?",
  ],
  "3.13B-SC": [
    "Look at the June tag check and the July tag check — do they show the same mark?",
    "Signal C says they must be two different bugs. Check the tag results — did any marked pond bug just disappear?",
  ],
  "4.6B-SC": [
    "Compare what the bottle looks like right after stirring to what it looks like 10 minutes later.",
    "Signal C says stirring turns them into one new liquid. Check the repeat test — does that same result happen every single time?",
  ],
  "4.6C-SC": [
    "Compare the measured volume to what you'd expect if you just added 50 mL and 50 mL together.",
    "Signal C is about where the missing volume went. Check the science note about gaps — what's filling the space between the rice grains?",
  ],
  "4.7-SC": [
    "Look at which direction the test marble rolled, and check it against what the level tool showed.",
    "Signal C says no force was acting on the cart. What does the science note say gravity does on even a tiny slope?",
  ],
  "4.8A-SC": [
    "Compare what happened with a gap in the row to what happened with every bell touching.",
    "Signal C says the energy skips the middle bells. Check the science note about contact — what does each bell have to do for the motion to keep going?",
  ],
  "4.8B-SC": [
    "Compare the two melt times — wrapped and unwrapped. What's different between them?",
    "Signal C says the towel makes cold. Check what temperature the towel itself measured — is it actually cold?",
  ],
  "4.8C-SC": [
    "Compare the brightness of the first bulb to the brightness of the last bulb.",
    "Signal C says the first bulb uses up the electricity. Check what happens to the WHOLE string when just the last bulb is removed.",
  ],
  "4.9A-SC": [
    "Check when sunset actually started getting earlier, compared to when the cold weather started.",
    "Signal B is about the warm week. Did sunset keep changing during that week, even without the cold?",
  ],
};

// Convenience helper: returns the ordered list of hints for a case, falling
// back to an empty array if the standard isn't found (shouldn't happen once
// this file is complete, but keeps requestHint() from throwing if a new case
// gets added to the registry before hints are written for it).
export function getCaseHints(standard) {
  return CASE_HINTS[standard] || [];
}
