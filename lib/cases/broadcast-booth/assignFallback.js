// Hardcoded Assign-library rows for Broadcast Booth seeds.
// Keeps seeds visible in Assign even if Supabase omits a row.

export const DESERT_BB_STANDARD = "SCI.3.13A-BB";
export const CREEK_BB_STANDARD = "SCI.3.12B-BB";
export const SCHOOLYARD_BB_STANDARD = "SCI.3.11B-BB";

export const DESERT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.13A-BB",
  title: "Broadcast Booth: Desert Radio (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can explain how a cactus survives in the desert using clear spoken ideas.",
  lesson_summary:
    "Students hear a short stimulus, then record four Explain beats. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Wave 0: Explain seed live. Correspondent and Debate segment types are wired for later cases.",
};

export const CREEK_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.12B-BB",
  title: "Broadcast Booth: Creek Desk (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can report from a creek habitat and tell how living things connect in a food chain.",
  lesson_summary:
    "Students use a you-are-here kit, place chips on Correspondent trays, then record four beats. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Correspondent seed. Unlock: What I noticed + Why it matters. Desert Radio Explain stays as-is.",
};

export const SCHOOLYARD_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.11B-BB",
  title: "Broadcast Booth: Schoolyard Debate (Shade vs Play)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target:
    "I can present both sides of a schoolyard choice and share what I think now about conserving resources and play space.",
  lesson_summary:
    "Students read shared context and two mini-briefs, place chips on Debate trays, then record four beats. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Debate seed. Side labels come from the case (teacher can override). Desert Radio Explain stays as-is.",
};

export const STATES_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.6C-BB",
  title: "Broadcast Booth: What does heat do to water? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can explain that heating and cooling can change water from ice to liquid water to water vapor.",
  lesson_summary: "Grade 3 Explain broadcast on states of water. Not a water-cycle lesson. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Melting is not disappearing. The water is still there as a liquid.",
};

export const CIRCUIT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.8C-BB",
  title: "Broadcast Booth: Why is the bulb lit? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain that a bulb lights when the circuit is closed and stays dark when the circuit is open.",
  lesson_summary: "Grade 4 Explain broadcast. A closed path lets the bulb light. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An open switch is a gap. The path has to be complete.",
};

export const FORCES_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.7A-BB",
  title: "Broadcast Booth: Why did it move? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can explain that balanced forces do not change motion and unbalanced forces do.",
  lesson_summary: "Grade 5 Explain broadcast on balanced and unbalanced forces. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A still object can have balanced forces on it.",
};

export const DAY_NIGHT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.9-BB",
  title: "Broadcast Booth: Why do we have day and night? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can explain that Earth rotates about once every 24 hours and that this spin causes day and night.",
  lesson_summary: "Grade 5 Explain broadcast. Earth's spin causes day and night. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Sun does not orbit the school each day.",
};

export const INSTINCT_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.13B-BB",
  title: "Broadcast Booth: Born knowing, or taught? (Correspondent)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can report the difference between a behavior an animal is born knowing and a behavior it was taught.",
  lesson_summary: "Grade 5 Correspondent broadcast on instinct and learned behavior. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A dog sitting for a treat is learned. A shell is a body part, not a behavior.",
};

export const ENERGY_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.11A-BB",
  title: "Broadcast Booth: How should the town get power? (Debate)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can compare renewable and nonrenewable resources and give a fair reason for each side.",
  lesson_summary: "Grade 4 Debate. Wind and sunlight versus natural gas. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Natural gas comes from nature and still runs out. Renewable does not mean perfect.",
};

export const INFERENCE_BB_ASSIGN_FALLBACK = {
  standard: "ELA.3.6F-BB",
  title: "Broadcast Booth: The story never says the feeling (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "ELAR",
  learning_target: "I can make an inference about a character's feelings and point to evidence in the story.",
  lesson_summary: "Grade 3 Explain broadcast on inference. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A feeling can be shown by what a character does, even when the story never names it.",
};

export const THEME_BB_ASSIGN_FALLBACK = {
  standard: "ELA.5.8A-BB",
  title: "Broadcast Booth: What is the play really about? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  learning_target: "I can infer more than one theme and support each theme with evidence from the text.",
  lesson_summary: "Grade 5 Explain broadcast on theme. Plot is not a theme. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Retelling what happened is the plot. A theme reaches beyond the story.",
};

export const ARGUMENT_BB_ASSIGN_FALLBACK = {
  standard: "ELA.5.9E-BB",
  title: "Broadcast Booth: Which facts support the claim? (Debate)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  learning_target: "I can explain which facts an author uses for an argument and which facts work against it.",
  lesson_summary: "Grade 5 Debate on facts for and against a claim. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The loudest line is not the strongest evidence.",
};

export const MULTIPLY_BB_ASSIGN_FALLBACK = {
  standard: "MA.3.5B-BB",
  title: "Broadcast Booth: Six tables of cupcakes (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Math",
  learning_target: "I can solve a multiplication problem within 100 and show it with an array.",
  lesson_summary: "Grade 3 Explain broadcast. 6 groups of 4 is 24. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Altogether does not mean add 6 and 4. These are equal groups.",
};

export const FRACTIONS_BB_ASSIGN_FALLBACK = {
  standard: "MA.4.3E-BB",
  title: "Broadcast Booth: Three eighths plus two eighths (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Math",
  learning_target: "I can add two fractions with the same denominator and explain why the denominator stays the same.",
  lesson_summary: "Grade 4 Explain broadcast. 3/8 + 2/8 = 5/8. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Do not add the denominators. 5/16 is not the total.",
};

export const COMMUNITIES_BB_ASSIGN_FALLBACK = {
  standard: "SS.3.2B-BB",
  title: "Broadcast Booth: Same need, different way (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Social Studies",
  learning_target: "I can explain how two communities meet the same need in different ways.",
  lesson_summary: "Grade 3 Correspondent broadcast. A town and an island meet the same needs differently. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The same need does not have to use the same solution.",
};

export const SUPPLY_BB_ASSIGN_FALLBACK = {
  standard: "SS.4.10A-BB",
  title: "Broadcast Booth: The lemonade puzzle (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Social Studies",
  learning_target: "I can explain how supply and demand together affect price and whether something is still available.",
  lesson_summary: "Grade 4 Explain broadcast. High demand does not always raise the price. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Look at supply and demand together.",
};

export const WATER_CYCLE_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.10A-BB",
  title: "Broadcast Booth: Where does the water go? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain how water keeps moving through the water cycle and how the Sun's energy lifts it.",
  lesson_summary: "Grade 4 Explain broadcast. The Sun's energy moves water through the water cycle. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The water is not gone. The Sun here is an energy source, not the reason for day and night.",
};

export const CANYON_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.10B-BB",
  title: "Broadcast Booth: How did the canyon get so deep? (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can describe how weathering, erosion, and deposition from water, wind, and ice slowly change Earth's surface.",
  lesson_summary: "Grade 4 Correspondent broadcast from Palo Duro Canyon. Water, wind, and ice break rock, carry it away, and drop it somewhere new. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Weathering breaks rock; erosion moves it. These changes are slow. This is not the water cycle.",
};

export const USE_LESS_BB_ASSIGN_FALLBACK = {
  standard: "SCI.5.11-BB",
  title: "Broadcast Booth: Use less, or recycle more? (Debate)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  learning_target: "I can explain how conservation and recycling each reduce the harm from using natural resources, and compare the two fairly.",
  lesson_summary: "Grade 5 Debate broadcast. Use less (conservation) or recycle more: both sides have real benefits and limits. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Recycling still uses energy, and dirty or mixed items can't be recycled. Neither side is the only right answer.",
};

export const CENTRAL_IDEA_BB_ASSIGN_FALLBACK = {
  standard: "ELA.5.9D-BB",
  title: "Broadcast Booth: What is the article mostly about? (Explain)",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  learning_target: "I can identify the central idea of an informational text and support it with evidence from the text.",
  lesson_summary: "Grade 5 Explain broadcast. TEKS 5.9D(i). Students name the central idea of a short article about Texas horned lizards and support it with two details. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An interesting detail is not the central idea. This is informational text: a central idea, not a theme.",
};

export const SCI_4_9B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.9B-BB",
  title: "Broadcast Booth: Can you predict the Moon? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can use data to describe the pattern of the Moon's changing shape and predict what it will look like next.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.9B. Students use a month of Moon observations to describe the order of the shapes and predict the next one. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Moon does not change size or disappear; how much of the lit side we see changes in a set order. This is not day and night, and Earth's shadow does not make the phases.",
};

export const SCI_4_6A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.6A-BB",
  title: "Broadcast Booth: How would you sort the mystery tray? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can classify and describe matter using properties I can observe or measure, such as mass, magnetism, temperature, sinking or floating, and state.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.6A. Students sort objects on a mystery tray by temperature, mass, magnetism, sinking or floating, and state of matter. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Not every metal is magnetic, and heavy things do not always sink. Mass is how much matter an object has, not how big it looks.",
};

export const SCI_4_6B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.6B-BB",
  title: "Broadcast Booth: Mixture or solution? (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can compare mixtures and tell which ones are solutions, including a solid in a liquid and a liquid in a liquid.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.6B. From a test kitchen, students compare trail mix, salt water, colored water, and oil and water, and explain which are solutions. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Dissolved salt is not gone; it is spread evenly through the water. Oil and water is a mixture but not a solution. Every solution is a mixture.",
};

export const SCI_4_6C_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.6C-BB",
  title: "Broadcast Booth: Where did the water go? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can show that matter is conserved when a mixture forms, because the mass of the mixture equals the mass of its parts.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.6C. Students use scale readings for soil and water, and oil and water, to show the mass before and after mixing is the same. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Water that soaks into soil is not gone; the total mass stays the same. If a mixture sits out, some water can evaporate, so it is weighed right away.",
};

export const SCI_4_7_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.7-BB",
  title: "Broadcast Booth: Why do socks slide and sneakers stop? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can use data from an investigation to describe a pattern of friction between different surfaces.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.7. Students use a class investigation (the same push on three surfaces) to describe the pattern that rougher surfaces make more friction. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Objects don't just 'run out' of motion; friction is a force that slows them. Only the surface changed, which is what makes it a fair test.",
};

export const SCI_4_8A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.8A-BB",
  title: "Broadcast Booth: How does energy travel at the lake? (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can identify how energy is transferred by objects in motion, by waves in water, and by sound.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.8A. From a lake dock, students report energy moving from a rolling ball to cups, from a boat's waves to the dock, and from a drum through the air. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A wave moves energy, not the water itself, across the lake; the toy boat bobs in place. Sound is energy traveling as vibrations, not something you can see.",
};

export const SCI_4_8B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.8B-BB",
  title: "Broadcast Booth: Why is the pot hot but the handle cool? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can identify conductors and insulators of heat and electricity and explain how each is used.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.8B. Students use a pot, its handle, an oven mitt, and a lamp cord to explain which materials conduct heat or electricity and which insulate. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An insulator doesn't make things cold; it slows heat moving through it. A material can conduct heat and electricity (most metals) or insulate both (plastic, rubber). Never test electricity at an outlet.",
};

export const SCI_4_9A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.9A-BB",
  title: "Broadcast Booth: What will next month bring? (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can use daylight and temperature data to describe the pattern of the seasons and predict what will change next.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.9A. From a school weather station in Austin, students use a year of daylight and temperature data to describe the seasonal pattern and predict the next change. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Seasons are not caused by Earth getting closer to the Sun. This broadcast is about the pattern and predicting from it, not the cause. Daily weather can break the pattern for a day; the seasonal pattern still holds.",
};

export const SCI_4_10C_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.10C-BB",
  title: "Broadcast Booth: A rainy week in the desert? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain the difference between weather and climate and use data to tell them apart.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.10C. A rainy week in El Paso is weather; about 9 inches of rain a year over 30 years is its dry climate. Houston's wetter climate is the comparison. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "One unusual week does not change a climate. Weather changes day to day; climate is an average over many years. Rainfall numbers are 1991–2020 averages.",
};

export const SCI_4_11B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.11B-BB",
  title: "Broadcast Booth: A day without power (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain why energy resources matter in daily life and how conservation, recycling, and proper disposal help the environment.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.11B. From a street after a day-long power outage, students report what stopped working without energy and how saving energy, recycling cans, and dropping off batteries help the environment. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Electricity has to be made from an energy resource; it doesn't just come from the wall. Recycling and conservation are different: one reuses materials, the other uses less.",
};

export const SCI_4_11C_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.11C-BB",
  title: "Broadcast Booth: Water hiding in the rock? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can identify the properties of rocks, such as spaces and cracks that connect, that let them store water, oil, and natural gas.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.11C. Using the Edwards Aquifer's limestone, sandstone, and granite, students explain how holes, cracks, and connected spaces let some rocks store water, oil, and natural gas. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An aquifer is not an underground lake; the water fills spaces inside rock. Hard rock like granite can't hold much because it has almost no spaces.",
};

export const SCI_4_12A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.12A-BB",
  title: "Broadcast Booth: Where does a tree get its food? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain how most producers make their own food using sunlight, water, and carbon dioxide, and how matter cycles between plants and animals.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.12A. Using a pecan tree, students explain how leaves use sunlight, water, and carbon dioxide to make sugar, and how oxygen and carbon dioxide cycle between plants and animals. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Plants do not get their food from the soil; soil gives water and nutrients, but the plant makes its food. The mass of a tree comes mostly from carbon dioxide in the air.",
};

export const SCI_4_12B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.12B-BB",
  title: "Broadcast Booth: Who eats what on the forest floor? (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can describe how energy flows and matter cycles through a food web, including the roles of the Sun, producers, consumers, and decomposers.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.12B. From an East Texas forest trail, students trace energy from the Sun to oaks, squirrels, and hawks, and explain how mushrooms and earthworms return matter to the soil. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Mushrooms are not plants or producers; they are decomposers. Energy flows one way from the Sun, but matter cycles back through the soil. This is not the creek food chain.",
};

export const SCI_4_12C_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.12C-BB",
  title: "Broadcast Booth: What was this place like long ago? (Correspondent)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can use fossil evidence, including Texas fossils, to describe what an environment was like long ago.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.12C. From the Paluxy River at Dinosaur Valley State Park, students use dinosaur tracks and shell-rich rock to describe a past environment: the muddy edge of a sea about 113 million years ago. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Tracks are fossils too, not just bones. The environment in the past can be very different from today: this dry hill country was once the muddy shore of a sea.",
};

export const SCI_4_13A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.13A-BB",
  title: "Broadcast Booth: How do Texas trees survive a drought? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can explain how plant structures, such as waxy leaves, deep roots, and thorns, help plants survive in their environment.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.13A. Using a live oak and a mesquite in a drought, students explain how waxy leaves, a deep taproot, tiny leaflets, and thorns help plants survive. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Plants do not choose or grow these structures because they need them; the structures are part of how the plant is built. Roots do more than hold the plant up; they take in water.",
};

export const SCI_4_13B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.4.13B-BB",
  title: "Broadcast Booth: Born with it, or got it later? (Explain)",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  learning_target: "I can tell the difference between inherited and acquired physical traits and give examples of each.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.13B. Using a ranch dog named Pepper, students sort physical traits into inherited (coat, eyes, ears) and acquired (a scar, strong muscles), and explain the difference. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An acquired trait, like a scar or strong muscles, is not passed to offspring. A trait here is a body feature, not a behavior like herding sheep.",
};

export const SCI_3_6A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.6A-BB",
  title: "Broadcast Booth: The pumpkin patch tests (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can measure, test, and record properties of matter such as mass, temperature, magnetism, and sinking or floating.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.6A. At a fall festival, students report how a pumpkin, an apple, and a metal washer were measured and tested for mass, magnetism, sinking or floating, and temperature, and how the results were recorded. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Big or heavy does not always mean it sinks: the pumpkin has the most mass and still floats. Not all metals stick to magnets, but this steel washer does.",
};

export const SCI_3_6B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.6B-BB",
  title: "Broadcast Booth: What shape is lemonade? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can classify matter as solid, liquid, or gas and show that solids keep their shape while liquids and gases take the shape of their container.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.6B. At a lemonade stand, students compare an ice cube, lemonade poured into different containers, and air in two balloons to show how solids, liquids, and gases differ. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A liquid changes shape but not amount when it is poured. Air is matter even though we can't see it. This is not about melting or freezing.",
};

export const SCI_3_6D_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.6D-BB",
  title: "Broadcast Booth: Build it strong (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can combine materials to build or change an object and explain why I chose each material because of its properties.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.6D. At a school maker fair, students report why builders chose stiff tubes, a heavy clay base, and tape for a tower, and why clay makes a sand brick stronger. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The best material is the one whose properties fit the job, not the biggest or the prettiest. A good builder can say why each material was chosen.",
};

export const SCI_3_7A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.7A-BB",
  title: "Broadcast Booth: Can a force work without touching? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can describe forces that act by touching an object and forces that act at a distance, such as magnetism and gravity.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.7A. Students compare contact forces (pushing a door, pulling a wagon) with forces that act at a distance (a magnet holding a paper clip in the air, gravity pulling a dropped ball). Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Gravity is a force even though you can't see or feel it touching. A force does not have to touch an object to push or pull it.",
};

export const SCI_3_7B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.7B-BB",
  title: "Broadcast Booth: Push it, pull it, watch it move (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can explain how pushes and pulls change an object's position and motion, using what I saw in an investigation.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.7B. From a playground investigation, students report how pushes and pulls started, stopped, sped up, and turned a swing, a ball, and a wagon. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Things do not start, stop, or turn by themselves; a push or a pull makes the change. A bigger push or pull makes a bigger change.",
};

export const SCI_3_8A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.8A-BB",
  title: "Broadcast Booth: Energy hunt at the county fair (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can identify everyday examples of light, sound, thermal, and mechanical energy.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.8A. On an energy hunt at a county fair, students report examples of light (ride lights), sound (a band), thermal (a popcorn machine), and mechanical (a spinning Ferris wheel) energy. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Energy is not only electricity. One thing can show more than one kind of energy: the Ferris wheel has light and mechanical energy.",
};

export const SCI_3_8B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.8B-BB",
  title: "Broadcast Booth: Why does a faster ball knock down more pins? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can use an investigation to show that a faster object has more mechanical energy.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.8B. In a gym bowling investigation, students explain why the same ball rolled faster knocks down more pins: more speed means more mechanical energy. Only the speed changed. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A heavier ball is not the point here; the ball stayed the same. Changing only one thing (the speed) is what makes the test fair.",
};

export const SCI_3_9A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.9A-BB",
  title: "Broadcast Booth: Who goes around whom? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can use a model to explain that the Moon orbits Earth and Earth orbits the Sun.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.9A. Using a people model on the playground, students explain that Earth orbits the Sun about once a year and the Moon orbits Earth about once a month. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Sun does not go around Earth, even though it seems to move across the sky. This is about orbits, not the Moon's phases or day and night.",
};

export const SCI_3_9B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.9B-BB",
  title: "Broadcast Booth: The planet walk (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can name the planets in order from the Sun.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.9B. On a hallway planet walk, students explain the order of the eight planets from the Sun and a memory trick for it. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Pluto is a dwarf planet, so it is not one of the eight planets. Earth is the third planet, not the first. The Sun is a star, not a planet.",
};

export const SCI_3_10A_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.10A-BB",
  title: "Broadcast Booth: Same day, two cities (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can compare the weather in two places at the same time using air temperature, wind direction, and precipitation.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.10A. From a weather desk, students compare one winter morning in Amarillo (38 degrees, north wind, light snow) and Houston (64 degrees, south wind, rain showers). Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Wind direction is where the wind comes from, not where it is going. The whole state does not have the same weather at the same time. The readings are a sample morning, not a forecast.",
};

export const SCI_3_10B_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.10B-BB",
  title: "Broadcast Booth: What is soil made of? (Explain)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can explain that soils like sand and clay form from weathered rock and from rotting plant and animal remains.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.10B. Using a soil jar test, students explain that sand and clay come from weathered rock and that rotting leaves and animal remains are part of soil too. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Soil is not just dirt; it is made of broken rock and material from once-living things. Sand and clay are different sizes of rock pieces. Soil forms very slowly.",
};

export const SCI_3_10C_BB_ASSIGN_FALLBACK = {
  standard: "SCI.3.10C-BB",
  title: "Broadcast Booth: The road that disappeared (Correspondent)",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  learning_target: "I can use a model to describe rapid changes to Earth's surface, such as landslides, earthquakes, and volcanic eruptions.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.10C. From a mountain road covered by a landslide, and a class sand-tray model, students describe how landslides, earthquakes, and volcanoes change the land quickly. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Not all changes to the land are slow; landslides and earthquakes happen in seconds or minutes. This is the fast-change broadcast; the canyon is the slow-change one.",
};

/** All Broadcast Booth catalog fallbacks for Assign library merge. */
export const BROADCAST_BB_ASSIGN_FALLBACKS = [
  DESERT_BB_ASSIGN_FALLBACK,
  CREEK_BB_ASSIGN_FALLBACK,
  SCHOOLYARD_BB_ASSIGN_FALLBACK,
  STATES_BB_ASSIGN_FALLBACK,
  CIRCUIT_BB_ASSIGN_FALLBACK,
  FORCES_BB_ASSIGN_FALLBACK,
  DAY_NIGHT_BB_ASSIGN_FALLBACK,
  INSTINCT_BB_ASSIGN_FALLBACK,
  ENERGY_BB_ASSIGN_FALLBACK,
  INFERENCE_BB_ASSIGN_FALLBACK,
  THEME_BB_ASSIGN_FALLBACK,
  ARGUMENT_BB_ASSIGN_FALLBACK,
  MULTIPLY_BB_ASSIGN_FALLBACK,
  FRACTIONS_BB_ASSIGN_FALLBACK,
  COMMUNITIES_BB_ASSIGN_FALLBACK,
  SUPPLY_BB_ASSIGN_FALLBACK,
  WATER_CYCLE_BB_ASSIGN_FALLBACK,
  CANYON_BB_ASSIGN_FALLBACK,
  USE_LESS_BB_ASSIGN_FALLBACK,
  CENTRAL_IDEA_BB_ASSIGN_FALLBACK,
  SCI_4_9B_BB_ASSIGN_FALLBACK,
  SCI_4_6A_BB_ASSIGN_FALLBACK,
  SCI_4_6B_BB_ASSIGN_FALLBACK,
  SCI_4_6C_BB_ASSIGN_FALLBACK,
  SCI_4_7_BB_ASSIGN_FALLBACK,
  SCI_4_8A_BB_ASSIGN_FALLBACK,
  SCI_4_8B_BB_ASSIGN_FALLBACK,
  SCI_4_9A_BB_ASSIGN_FALLBACK,
  SCI_4_10C_BB_ASSIGN_FALLBACK,
  SCI_4_11B_BB_ASSIGN_FALLBACK,
  SCI_4_11C_BB_ASSIGN_FALLBACK,
  SCI_4_12A_BB_ASSIGN_FALLBACK,
  SCI_4_12B_BB_ASSIGN_FALLBACK,
  SCI_4_12C_BB_ASSIGN_FALLBACK,
  SCI_4_13A_BB_ASSIGN_FALLBACK,
  SCI_4_13B_BB_ASSIGN_FALLBACK,
  SCI_3_6A_BB_ASSIGN_FALLBACK,
  SCI_3_6B_BB_ASSIGN_FALLBACK,
  SCI_3_6D_BB_ASSIGN_FALLBACK,
  SCI_3_7A_BB_ASSIGN_FALLBACK,
  SCI_3_7B_BB_ASSIGN_FALLBACK,
  SCI_3_8A_BB_ASSIGN_FALLBACK,
  SCI_3_8B_BB_ASSIGN_FALLBACK,
  SCI_3_9A_BB_ASSIGN_FALLBACK,
  SCI_3_9B_BB_ASSIGN_FALLBACK,
  SCI_3_10A_BB_ASSIGN_FALLBACK,
  SCI_3_10B_BB_ASSIGN_FALLBACK,
  SCI_3_10C_BB_ASSIGN_FALLBACK,
];

export function normalizeBroadcastCaseRow(row) {
  if (!row || typeof row !== "object") return row;
  return {
    ...row,
    engine: String(row.engine ?? "").trim(),
    subject: String(row.subject ?? "").trim(),
    grade: Number(row.grade),
    standard: String(row.standard ?? "").trim(),
  };
}

export function isPlayableBroadcastBbRow(row) {
  if (!row || typeof row !== "object") return false;
  const n = normalizeBroadcastCaseRow(row);
  return (
    n.engine === "broadcast_booth" &&
    Number.isFinite(n.grade) &&
    !!n.subject &&
    !!n.standard
  );
}

/** @deprecated Prefer isPlayableBroadcastBbRow — kept for Desert-specific checks. */
export function isPlayableDesertBbRow(row) {
  if (!row || typeof row !== "object") return false;
  const n = normalizeBroadcastCaseRow(row);
  return (
    n.standard === DESERT_BB_STANDARD &&
    n.engine === "broadcast_booth" &&
    Number.isFinite(n.grade) &&
    !!n.subject
  );
}
