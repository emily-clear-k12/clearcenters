// Texas Social Studies TEKS, Grades 3-5 — verbatim student-expectation text.
//
// THIS FILE EXISTS TO CLOSE ONE BLOCKER: until now nothing in the Briefings
// pipeline supplied real standard wording, so every `teksText` was hand-typed
// or paraphrased. A generator can now read `teksTextFor("4.3A")` instead of
// inventing one.
//
// ============================================================================
// SOURCE AND HOW IT WAS BUILT
// ============================================================================
// Retrieved Sept 16, 2026 from the Texas Administrative Code, Title 19, Part 2,
// Chapter 113, Subchapter A — the authoritative text:
//
//   Grade 3  19 TAC §113.14
//   Grade 4  19 TAC §113.15
//   Grade 5  19 TAC §113.16
//
// via regulations.justia.com, which mirrors current TAC verbatim and is not
// robots-blocked. This is the same tie-breaker source that
// `docs/briefings/teks-reference/README.md` already names, for the same reason
// it names it: a re-hosted snapshot PDF was found carrying 3.2(B)'s pre-2022
// "identify" wording after Texas re-adopted Social Studies in 2022.
//
// CROSS-CHECKED against Emily's archived planning PDFs at
// `05_REFERENCE/TEKS/Texas_Grade{3,4,5}_SocialStudies_TEKS.pdf`. Those PDFs are
// headed "Current Student Expectations - Detailed Planning Reference" and are
// NOT verbatim TAC — they normalise and re-word. See DISCREPANCIES below. They
// are good working documents; they are not citable standard text.
//
// ============================================================================
// THE ONE THING TO UNDERSTAND BEFORE USING THIS
// ============================================================================
// **"including" and "such as" are not interchangeable in the TEKS.**
//
//   including  — the named examples are REQUIRED. A lesson that omits one has
//                not covered the standard.
//   such as    — the named examples are ILLUSTRATIVE. Any comparable example
//                satisfies the standard.
//
// This distinction decides what a lesson must contain, and it is the single
// most common thing a paraphrase destroys. Every entry below preserves it.
//
// ============================================================================
// DISCREPANCIES FOUND WHILE BUILDING THIS — all need a human decision
// ============================================================================
//  1. **3.17(B) DOES NOT EXIST.** Grade 3's skills strand ends at 3.16 under the
//     2022 TEKS. The analysis standard — "sequencing, categorizing, identifying
//     cause and effect, comparing, contrasting" — is **3.14(C)**. The citation
//     "TEKS 3.17(B)" is pre-2022 numbering and currently appears in
//     BRIEFINGS-V3-MASTER-BRIEF.md (§2 and §4), in the header of
//     lib/briefings/SS-3-2A-V3-BR.public.js, and in
//     docs/briefings/teks-reference/SS-3-2A.md. The assignment table has it
//     right (3.14C). Three places to fix, including the flagship lesson.
//
//  2. **4.3A names four required events.** Verbatim: "analyze the causes, major
//     events, and effects of the Texas Revolution, including the Battle of the
//     Alamo, the Texas Declaration of Independence, the Runaway Scrape, and the
//     Battle of San Jacinto." *Including* — so all four are required.
//     SS-4-3A-V3-BR's sequenceIt phase currently orders Gonzales, the
//     Declaration, the Alamo, Goliad and San Jacinto: it **omits the Runaway
//     Scrape**, which the standard requires, and **includes Goliad**, which the
//     standard does not name. Also note the verb is *analyze*, not *identify*.
//
//  3. **5.3A and 5.19A are not real standard codes.** TAC (3) and (19) at
//     Grade 5 are single unlettered expectations — "The student is expected to
//     identify the contributions of Founding Fathers James Madison and George
//     Mason…" and "…describe the fundamental rights guaranteed in the Bill of
//     Rights…". The assignment table lists them as 5.3A and 5.19A. They are
//     keyed here under BOTH spellings so nothing breaks, but the bare codes
//     5.3 and 5.19 are correct. (3.12 is also unlettered, and the table has
//     that one right.)
//
//  4. **The planning PDFs turn "such as" into "including" in places.** Two
//     confirmed at Grade 4: 4.1B ("such as the Lipan Apache, Karankawa, Caddo,
//     and Jumano" → PDF "including the…") and 4.1C ("such as Gulf, Plains,
//     Puebloan, and Southeastern" → PDF "including the … regions"). That turns
//     optional examples into apparently mandatory ones. Anything authored
//     against those PDFs may be over-constrained. This file follows TAC.
//
//  5. Coverage is otherwise sound: 34 Grade 3, 57 Grade 4 and 60 Grade 5
//     content expectations in TAC, and the assignment table accounts for every
//     one of them.
//
// ============================================================================
// USING IT
// ============================================================================
// TAC expectations read as continuations of "The student is expected to:", so
// `text` begins lowercase and has no full stop. `teksTextFor(code)` returns it
// sentence-cased and punctuated, which is the form the existing packs use.
//
//   import { teksTextFor, SS_TEKS } from "./teks/ss-teks-3-5.js";
//   teksTextFor("3.2A")
//   // "Identify reasons people have formed communities, including a need for
//   //  security and laws, religious freedom, and material well-being."
//
// `SS_TEKS[code].knowledge` is the parent knowledge-and-skills statement, which
// is often the better statement of what a lesson is actually for.

const H = "History", G = "Geography", E = "Economics", GOV = "Government",
      C = "Citizenship", CU = "Culture", ST = "Science, technology, and society",
      SK = "Social studies skills";

// Parent knowledge-and-skills statements, so they are written once.
const K = {
  "3.1": "The student understands how individuals, events, and ideas have influenced the history of various communities.",
  "3.2": "The student understands common characteristics of communities, past and present.",
  "3.3": "The student understands how humans adapt to and/or modify the physical environment.",
  "3.4": "The student understands the concepts of location, distance, and direction on maps and globes.",
  "3.5": "The student understands the purposes of earning, spending, saving, and donating money.",
  "3.6": "The student understands the concept of the free enterprise system and how businesses operate in the U.S. free enterprise system.",
  "3.7": "The student understands the basic structure and functions of various levels of government.",
  "3.8": "The student understands important ideas in historical documents at various levels of government.",
  "3.9": "The student understands characteristics of good citizenship as exemplified by historical and contemporary figures and organizations.",
  "3.10": "The student understands ethnic and/or cultural celebrations of the local community and other communities.",
  "3.11": "The student understands the role of heroes in shaping the culture of communities, the state, and the nation.",
  "3.12": "The student understands the importance of writers and artists to the cultural heritage of communities.",
  "3.13": "The student understands how individuals have created or invented new technology and affected life in various communities, past and present.",
  "3.14": "The student applies critical-thinking skills to organize and use information acquired from a variety of valid sources, including technology.",
  "3.15": "The student communicates in written, oral, and visual forms.",
  "3.16": "The student uses problem-solving and decision-making skills, working independently and with others.",

  "4.1": "The student understands the origins, similarities, and differences of American Indian groups in Texas before European exploration.",
  "4.2": "The student understands the causes and effects of European exploration and colonization of Texas.",
  "4.3": "The student understands the importance of the Texas Revolution, the Republic of Texas, and the annexation of Texas to the United States.",
  "4.4": "The student understands the political, economic, and social changes in Texas during the last half of the 19th century.",
  "4.5": "The student understands important issues, events, and individuals of the 20th century in Texas.",
  "4.6": "The student understands the concept of regions.",
  "4.7": "The student understands the location and patterns of settlement and the geographic factors that influence where people live.",
  "4.8": "The student understands how people adapt to and modify their environment.",
  "4.9": "The student understands the basic economic activities of early societies in Texas.",
  "4.10": "The student understands the characteristics and benefits of the free enterprise system in Texas.",
  "4.11": "The student understands patterns of work and economic activities in Texas.",
  "4.12": "The student understands how people organized governments in different ways during the early development of Texas.",
  "4.13": "The student understands important ideas in historical documents of Texas and the United States.",
  "4.14": "The student understands important customs, symbols, and celebrations of Texas.",
  "4.15": "The student understands the importance of active individual participation in the democratic process.",
  "4.16": "The student understands the importance of effective leadership in a constitutional republic.",
  "4.17": "The student understands the contributions of people of various racial, ethnic, and religious groups to Texas culture.",
  "4.18": "The student understands the impact of science and technology on life in Texas.",
  "4.19": "The student applies critical-thinking skills to organize and use information acquired from a variety of valid sources, including technology.",
  "4.20": "The student uses geographic tools to collect, analyze, and interpret data.",
  "4.21": "The student communicates in written, oral, and visual forms.",
  "4.22": "The student uses problem-solving and decision-making skills, working independently and with others.",

  "5.1": "The student understands the reasons for and the role of key people in the European colonization of North America beginning in 1565, the founding of St. Augustine.",
  "5.2": "The student understands how conflict between the American colonies and Great Britain led to American independence and the formation of the United States.",
  "5.3": "The student understands the significant individuals who contributed to the creation of the U.S. Constitution and the government it established.",
  "5.4": "The student understands political, economic, and social changes that occurred in the United States during the 19th century.",
  "5.5": "The student understands important issues, events, and individuals in the United States during the 20th and 21st centuries.",
  "5.6": "The student understands places and regions in the United States.",
  "5.7": "The student understands the location and patterns of settlement and the geographic factors that influence where people live.",
  "5.8": "The student understands how people adapt to and modify their environment.",
  "5.9": "The student understands the basic economic patterns of early societies in the United States.",
  "5.10": "The student understands the development, characteristics, and benefits of the free enterprise system in the United States.",
  "5.11": "The student understands the impact of supply and demand on consumers and producers in a free enterprise system.",
  "5.12": "The student understands patterns of work and economic activities in the United States.",
  "5.13": "The student understands the organization of governments in colonial America.",
  "5.14": "The student understands important ideas in the Declaration of Independence, the U.S. Constitution, and the Bill of Rights.",
  "5.15": "The student understands the framework of government created by the U.S. Constitution of 1787.",
  "5.16": "The student understands important symbols, customs, celebrations, and landmarks that represent American beliefs and principles that contribute to our national identity.",
  "5.17": "The student understands the importance of individual participation in the democratic process at the local, state, and national levels.",
  "5.18": "The student understands the importance of effective leadership in a constitutional republic.",
  "5.19": "The student understands the fundamental rights of American citizens guaranteed in the Bill of Rights.",
  "5.20": "The student understands the relationship between the arts and the times during which they were created.",
  "5.21": "The student understands the contributions of people of various racial, ethnic, and religious groups to the United States culture.",
  "5.22": "The student understands the impact of science and technology on society in the United States.",
  "5.23": "The student applies critical-thinking skills to organize and use information acquired from a variety of valid sources, including technology.",
  "5.24": "The student uses geographic tools to collect, analyze, and interpret data.",
  "5.25": "The student communicates in written, oral, and visual forms.",
  "5.26": "The student uses problem-solving and decision-making skills, working independently and with others.",
};

const RAW = {
  // ---------- GRADE 3 · 19 TAC §113.14(c) ----------
  "3.1A": [H, "describe how individuals, events, and ideas have changed communities, past and present"],
  "3.1B": [H, "identify individuals, including Pierre-Charles L'Enfant, Benjamin Banneker, and Benjamin Franklin, who have helped to shape communities"],
  "3.1C": [H, "describe how individuals, including Daniel Boone and the Founding Fathers have contributed to the expansion of existing communities or to the creation of new communities"],
  "3.2A": [H, "identify reasons people have formed communities, including a need for security and laws, religious freedom, and material well-being"],
  "3.2B": [H, "compare ways in which people in the local community and other communities meet their needs for government, education, communication, transportation, and recreation"],
  "3.3A": [G, "describe similarities and differences in the physical environment, including climate, landforms, natural resources, and natural hazards"],
  "3.3B": [G, "identify and compare how people in different communities adapt to or modify the physical environment in which they live such as deserts, mountains, wetlands, and plains"],
  "3.3C": [G, "describe the effects of human processes such as building new homes, conservation, and pollution in shaping the landscape"],
  "3.4A": [G, "use cardinal and intermediate directions to locate places on maps and globes in relation to the local community"],
  "3.4B": [G, "use a scale to determine the distance between places on maps and globes"],
  "3.4C": [G, "identify, create, and interpret maps of places that contain map elements, including a title, compass rose, legend, scale, and grid system"],
  "3.5A": [E, "identify ways of earning, spending, saving, and donating money"],
  "3.5B": [E, "create a simple budget that allocates money for spending and saving"],
  "3.6A": [E, "explain how supply and demand affect the price of a good or service"],
  "3.6B": [E, "define and identify examples of scarcity"],
  "3.6C": [E, "explain how the cost of production and selling price affect profits"],
  "3.6D": [E, "identify individuals, past and present, such as Henry Ford and Sam Walton who have started new businesses"],
  "3.7A": [GOV, "describe the basic structure of government in the local community, state, and nation"],
  "3.7B": [GOV, "identify local, state, and national government officials and explain how they are chosen"],
  "3.7C": [GOV, "identify services commonly provided by local, state, and national governments"],
  "3.8A": [GOV, "identify the purposes of the Declaration of Independence and the U.S. Constitution, including the Bill of Rights"],
  "3.8B": [GOV, "describe the concept of \"consent of the governed\""],
  "3.9A": [C, "identify characteristics of good citizenship, including truthfulness, justice, equality, respect for oneself and others, responsibility in daily life, and participation in government by educating oneself about the issues, respectfully holding public officials to their word, and voting"],
  "3.9B": [C, "identify figures such as Helen Keller, Clara Barton, and Ruby Bridges who exemplify good citizenship"],
  "3.9C": [C, "identify and describe individual acts of civic responsibility, including obeying laws, serving and improving the community, serving on a jury, and voting"],
  "3.9D": [C, "identify examples of nonprofit and/or civic organizations such as the Red Cross and explain how they serve the common good"],
  "3.9E": [C, "use voting as a method for group decision making"],
  "3.10A": [CU, "explain the significance of various ethnic and/or cultural celebrations in the local community and other communities"],
  "3.10B": [CU, "compare ethnic and/or cultural celebrations in the local community with other communities"],
  "3.11A": [CU, "identify and describe the heroic deeds of state and national heroes and military and first responders such as Hector P. Garcia, James A. Lovell, and the Four Chaplains"],
  "3.11B": [CU, "identify and describe the heroic deeds of individuals such as Harriet Tubman, Todd Beamer, and other contemporary heroes"],
  // 3.12 is a single UNLETTERED expectation.
  "3.12": [CU, "identify how various writers and artists such as Kadir Nelson, Tomie dePaola, Carmen Lomas Garza, and Laura Ingalls Wilder and their stories, poems, statues, and paintings contribute to the cultural heritage of communities"],
  "3.13A": [ST, "identify individuals who have discovered scientific breakthroughs or created or invented new technology such as Jonas Salk, Cyrus McCormick, Bill Gates, Louis Pasteur, and others"],
  "3.13B": [ST, "describe the impact of scientific breakthroughs and new technology in computers, pasteurization, and medical vaccines on various communities"],
  "3.14A": [SK, "gather information, including historical and current events and geographic data, about the community using a variety of resources"],
  "3.14B": [SK, "differentiate and compare the information about a specific issue or event provided in primary and secondary sources"],
  "3.14C": [SK, "interpret oral, visual, and print material by sequencing, categorizing, identifying the main idea, distinguishing between fact and opinion, identifying cause and effect, comparing, and contrasting"],
  "3.14D": [SK, "interpret and create visuals, including graphs, charts, tables, timelines, illustrations, and maps"],
  "3.14E": [SK, "identify the central claim in a primary or secondary source"],
  "3.14F": [SK, "develop and communicate a claim and supporting evidence visually, orally, or in writing related to a social studies topic"],
  "3.15A": [SK, "use social studies terminology correctly"],
  "3.15B": [SK, "create and interpret timelines"],
  "3.15C": [SK, "apply the terms year, decade, and century to describe historical times"],
  "3.15D": [SK, "express ideas orally based on knowledge and experiences"],
  "3.15E": [SK, "create written and visual material such as stories, pictures, maps, and graphic organizers to express ideas"],
  "3.15F": [SK, "apply foundational language skills to engage in civil discourse about social studies topics, including those with multiple perspectives"],
  "3.16A": [SK, "use democratic procedures to simulate making decisions on school, local, or state issues"],
  "3.16B": [SK, "use problem-solving and decision-making processes to identify a problem, gather information, list and consider options, consider advantages and disadvantages, choose and implement a solution, and evaluate the effectiveness of the solution"],

  // ---------- GRADE 4 · 19 TAC §113.15(c) ----------
  "4.1A": [H, "explain the possible origins of American Indian groups in Texas"],
  "4.1B": [H, "identify and compare the ways of life of American Indian groups in Texas before European exploration such as the Lipan Apache, Karankawa, Caddo, and Jumano"],
  "4.1C": [H, "describe the cultural regions in which American Indians lived such as Gulf, Plains, Puebloan, and Southeastern"],
  "4.1D": [H, "locate American Indian groups remaining in Texas such as the Ysleta Del Sur Pueblo, Alabama-Coushatta, and Kickapoo"],
  "4.2A": [H, "summarize motivations for European exploration and settlement of Texas, including economic opportunity, competition, and the desire for expansion"],
  "4.2B": [H, "identify the accomplishments and explain the impact of significant explorers, including Cabeza de Vaca; Francisco Coronado; and René Robert Cavelier, Sieur de la Salle, on the settlement of Texas"],
  "4.2C": [H, "explain when, where, and why the Spanish established settlements and Catholic missions in Texas as well as important individuals"],
  "4.2D": [H, "identify Texas' role in the Mexican War of Independence and the war's impact on the development of Texas"],
  "4.2E": [H, "identify the accomplishments and explain the economic motivations and impact of significant empresarios, including Stephen F. Austin and Martín de León, on the settlement of Texas"],
  "4.3A": [H, "analyze the causes, major events, and effects of the Texas Revolution, including the Battle of the Alamo, the Texas Declaration of Independence, the Runaway Scrape, and the Battle of San Jacinto"],
  "4.3B": [H, "summarize the significant contributions of individuals such as William B. Travis, James Bowie, David Crockett, Juan N. Seguín, Plácido Benavides, José Francisco Ruiz, Antonio López de Santa Anna, Susanna Dickinson, and Enrique Esparza"],
  "4.3C": [H, "identify leaders important to the founding of Texas as a republic and state, including José Antonio Navarro, Sam Houston, Mirabeau Lamar, and Anson Jones"],
  "4.3D": [H, "describe the successes, problems, and organizations of the Republic of Texas such as the establishment of a constitution, economic struggles, relations with American Indians, and the Texas Rangers"],
  "4.3E": [H, "explain the events that led to the annexation of Texas to the United States and the impact of the U.S.-Mexican War"],
  "4.4A": [H, "describe the impact of the Civil War and Reconstruction on Texas"],
  "4.4B": [H, "explain the growth, development, and impact of the cattle industry such as contributions made by Charles Goodnight, Richard King, and Lizzie Johnson"],
  "4.4C": [H, "explain the effects of the railroad industry on life in Texas, including changes to cities and major industries"],
  "4.4D": [H, "explain the effects on American Indian life brought about by the Red River War, building of U.S. forts and railroads, and loss of buffalo"],
  "4.5A": [H, "explain the impact of various events on life in Texas such as the Great Depression, the Dust Bowl, and World War II and notable individuals such as Audie Murphy, Cleto Rodríguez, and Bessie Coleman and other local individuals"],
  "4.5B": [H, "explain the development and impact of the oil and gas industry on industrialization and urbanization in Texas, including Spindletop and important people such as Pattillo Higgins"],
  "4.6A": [G, "identify, locate, and describe the physical regions of Texas (Mountains and Basins, Great Plains, North Central Plains, Coastal Plains), including their characteristics such as landforms, climate, vegetation, and economic activities"],
  "4.6B": [G, "compare the physical regions of Texas (Mountains and Basins, Great Plains, North Central Plains, Coastal Plains)"],
  "4.7A": [G, "explain the geographic factors such as landforms and climate that influence patterns of settlement and the distribution of population in Texas, past and present"],
  "4.7B": [G, "identify and explain patterns of settlement such as the location of towns and cities in Texas at different time periods"],
  "4.8A": [G, "describe ways people have adapted to and modified their environment in Texas, past and present, such as timber clearing, agricultural production, wetlands drainage, energy production, and construction of dams"],
  "4.8B": [G, "explain reasons why people have adapted to and modified their environment in Texas, past and present, such as the use of natural resources to meet basic needs, facilitate transportation, and enhance recreational activities"],
  "4.8C": [G, "compare the positive and negative consequences of human modification of the environment in Texas, past and present"],
  "4.9A": [E, "explain the economic activities various early American Indian groups in Texas used to meet their needs and wants such as farming, trading, and hunting"],
  "4.9B": [E, "explain the economic activities early settlers to Texas used to meet their needs and wants"],
  "4.10A": [E, "describe how the free enterprise system works, including supply and demand"],
  "4.10B": [E, "identify examples of the benefits of the free enterprise system such as choice and opportunity"],
  "4.10C": [E, "describe the development of the free enterprise system in Texas such as the growth of cash crops by early colonists and the railroad boom"],
  "4.11A": [E, "identify how people in different regions of Texas earn their living, past and present"],
  "4.11B": [E, "explain how physical geographic factors such as climate and natural resources have influenced the location of economic activities in Texas"],
  "4.11C": [E, "identify the effects of exploration, immigration, migration, and limited resources on the economic development and growth of Texas"],
  "4.11D": [E, "explain how developments in transportation and communication have influenced economic activities in Texas"],
  "4.12A": [GOV, "compare how various American Indian groups such as the Caddo and the Comanche governed themselves"],
  "4.12B": [GOV, "compare characteristics of the Spanish colonial government and the early Mexican governments in Texas"],
  "4.13A": [GOV, "identify the purposes and explain the importance of the Texas Declaration of Independence and the Texas Constitution"],
  "4.13B": [GOV, "identify and explain the basic functions of the three branches of government according to the Texas Constitution"],
  "4.13C": [GOV, "identify the intent, meaning, and importance of the Declaration of Independence, the U.S. Constitution, and the Bill of Rights (Celebrate Freedom Week)"],
  "4.14A": [C, "explain the meaning of various patriotic symbols and landmarks of Texas, including the six flags that flew over Texas, the Alamo, and the San Jacinto Monument"],
  "4.14B": [C, "sing or recite \"Texas, Our Texas\""],
  "4.14C": [C, "recite and explain the meaning of the Pledge to the Texas Flag"],
  "4.14D": [C, "describe the origins and significance of state celebrations such as Texas Independence Day and Juneteenth"],
  "4.15A": [C, "identify important individuals who have participated voluntarily in civic affairs at state and local levels such as Adina de Zavala and Clara Driscoll"],
  "4.15B": [C, "explain how individuals can participate voluntarily in civic affairs at state and local levels through activities such as respectfully holding public officials to their word, writing letters, and participating in historic preservation and service projects"],
  "4.15C": [C, "explain the duty of the individual in state and local elections such as being informed and voting"],
  "4.15D": [C, "identify the importance of historical figures and important individuals who modeled active participation in the democratic process such as Sam Houston, Barbara Jordan, Lorenzo de Zavala, Ann Richards, Henry B. González, Wallace Jefferson, and other local individuals"],
  "4.15E": [C, "explain how to contact elected and appointed leaders in state and local governments"],
  "4.15F": [C, "use voting as a method for group decision making"],
  "4.16A": [C, "identify leaders in state, local, and national governments, including the governor, local members of the Texas Legislature, the local mayor, U.S. senators, local U.S. representatives, and Texans who have been president of the United States"],
  "4.16B": [C, "identify leadership qualities of state and local leaders, past and present"],
  "4.17A": [CU, "identify customs, celebrations, and traditions of various cultural, regional, and local groups in Texas such as Cinco de Mayo, Oktoberfest, and Fiesta San Antonio"],
  "4.17B": [CU, "summarize the contributions of artists of various racial, ethnic, and religious groups in the development of Texas culture such as Lydia Mendoza, Chelo Silva, and Julius Lorenzo Cobb Bledsoe"],
  "4.18A": [ST, "identify famous inventors and scientists such as Gail Borden, Joseph Glidden, Michael DeBakey, and Millie Hughes-Fulford and their contributions"],
  "4.18B": [ST, "describe how scientific discoveries and innovations such as in aerospace, agriculture, energy, and technology have benefited individuals, businesses, and society in Texas"],
  "4.19A": [SK, "differentiate between, locate, and use valid primary and secondary sources such as technology; interviews; biographies; oral, print, and visual material; documents; and artifacts to acquire information about Texas"],
  "4.19B": [SK, "differentiate and compare the information about a specific issue or event provided in primary and secondary sources"],
  "4.19C": [SK, "analyze information by applying absolute and relative chronology through sequencing, categorizing, identifying cause-and-effect relationships, comparing, contrasting, finding the main idea, summarizing, making generalizations and predictions, and drawing inferences and conclusions"],
  "4.19D": [SK, "organize and interpret information in outlines, reports, databases, and visuals, including graphs, charts, timelines, and maps"],
  "4.19E": [SK, "identify different points of view about an issue, topic, historical event, or current event"],
  "4.19F": [SK, "identify the central claim in a primary or secondary source"],
  "4.19G": [SK, "develop and communicate a claim and supporting evidence visually, orally, or in writing related to a social studies topic"],
  "4.20A": [SK, "apply mapping elements, including grid systems, legends, symbols, scales, and compass roses, to create and interpret maps"],
  "4.20B": [SK, "interpret geographic data, population distribution, and natural resources into a variety of formats such as graphs and maps"],
  "4.21A": [SK, "use social studies terminology correctly"],
  "4.21B": [SK, "incorporate main and supporting ideas in verbal and written communication"],
  "4.21C": [SK, "express ideas orally based on research and experiences"],
  "4.21D": [SK, "create written and visual material such as journal entries, reports, graphic organizers, outlines, and bibliographies"],
  "4.21E": [SK, "apply foundational language skills to engage in civil discourse about social studies topics, including those with multiple perspectives"],
  "4.22A": [SK, "use democratic procedures to simulate making decisions on school, local, or state issues"],
  "4.22B": [SK, "use problem-solving and decision-making processes to identify a problem, gather information, list and consider options, consider advantages and disadvantages, choose and implement a solution, and evaluate the effectiveness of the solution"],

  // ---------- GRADE 5 · 19 TAC §113.16(c) ----------
  "5.1A": [H, "explain when, where, and why groups of people explored, colonized, and settled in the United States, including the search for religious freedom and economic gain"],
  "5.1B": [H, "describe the accomplishments of significant individuals who settled for religious freedom and economic gain during the colonial period, including William Bradford, Anne Hutchinson, William Penn, John Smith, and Roger Williams"],
  "5.2A": [H, "analyze the causes and effects of events prior to and during the American Revolution, including the taxation resulting from the French and Indian War and the colonist response to taxation such as the Boston Tea Party"],
  "5.2B": [H, "identify the Founding Fathers and Patriot heroes, including John Adams, Benjamin Franklin, Thomas Jefferson, the Sons of Liberty, and George Washington, and their motivations and contributions during the revolutionary period"],
  "5.2C": [H, "summarize the results of the American Revolution, including the establishment of the United States"],
  // 5.3 is a single UNLETTERED expectation. Keyed both ways — see DISCREPANCIES 3.
  "5.3": [H, "identify the contributions of Founding Fathers James Madison and George Mason who helped create the U.S. Constitution"],
  "5.4A": [H, "describe the causes and effects of the War of 1812 such as impressment of sailors, territorial conflicts with Great Britain, and the increase in U.S. manufacturing"],
  "5.4B": [H, "identify and explain how changes resulting from the Industrial Revolution led to conflict among sections of the United States"],
  "5.4C": [H, "identify significant events and concepts associated with U.S. territorial expansion, including the Louisiana Purchase, the expedition of Lewis and Clark, and Manifest Destiny"],
  "5.4D": [H, "explain the central role of the expansion of slavery in causing sectionalism, disagreement over states' rights, and the Civil War"],
  "5.4E": [H, "explain the effects of the Civil War, including Reconstruction and the 13th, 14th, and 15th amendments to the U.S. Constitution"],
  "5.4F": [H, "identify the challenges, opportunities, and contributions of people from various American Indian and immigrant groups such as the settlement of the frontier and building of the Transcontinental Railroad"],
  "5.5A": [H, "explain the significance of issues and events of the 20th century such as industrialization, urbanization, the Great Depression, the world wars, the civil rights movement, and military actions"],
  "5.5B": [H, "analyze various issues and events of the 21st century such as the War on Terror and the 2008 presidential election"],
  "5.5C": [H, "identify the accomplishments and contributions of individuals and groups such as Susan B. Anthony, Martin Luther King Jr., Rosa Parks, Cesar Chavez, Franklin D. Roosevelt, Ronald Reagan, the Tuskegee Airmen, and the 442nd Regimental Combat Team in the areas of civil rights, women's rights, military actions, and politics"],
  "5.6A": [G, "describe political and economic regions in the United States that result from patterns of human activity"],
  "5.6B": [G, "describe regions in the United States based on physical characteristics such as landform, climate, and vegetation"],
  "5.6C": [G, "locate on a map important political features such as the five largest cities by population in the United States and the 50 states"],
  "5.6D": [G, "create a map of important physical features such as the Appalachian Mountains, Great Lakes, Mississippi River, Great Plains, and Rocky Mountains"],
  "5.7A": [G, "identify and describe the patterns of settlement such as rural, urban, and suburban"],
  "5.7B": [G, "explain the geographic factors that influence patterns of settlement and the distribution of population in the United States"],
  "5.7C": [G, "analyze the geographic factors that influence the location of the five largest urban areas in the United States and explain their distribution"],
  "5.8A": [G, "describe how and why people have adapted to and modified their environment in the United States such as the use of human resources to meet basic needs"],
  "5.8B": [G, "analyze the positive and negative consequences of human modification of the environment in the United States"],
  "5.9A": [E, "explain the economic patterns of early European colonies"],
  "5.9B": [E, "identify major industries of colonial America such as shipbuilding and growing of cash crops"],
  "5.10A": [E, "identify the development of the free enterprise system in colonial America and the United States"],
  "5.10B": [E, "describe how the free enterprise system works in the United States"],
  "5.10C": [E, "give examples of the benefits of the free enterprise system in the United States"],
  "5.11A": [E, "explain how supply and demand affects consumers in the United States"],
  "5.11B": [E, "evaluate the effects of supply and demand on industry and agriculture, including the plantation system, in the United States"],
  "5.12A": [E, "compare how people in different regions of the United States earn a living, past and present"],
  "5.12B": [E, "identify and explain how geographic factors have influenced the location of economic activities in the United States"],
  "5.12C": [E, "analyze the effects of immigration and migration on the economic development and growth of the United States"],
  "5.12D": [E, "describe the impact of mass production, specialization, and division of labor on the economic growth of the United States"],
  "5.13A": [GOV, "compare the systems of government of early European colonists, including representative government and monarchy"],
  "5.13B": [GOV, "identify examples of representative government in the American colonies, including the Mayflower Compact and the Virginia House of Burgesses"],
  "5.14A": [GOV, "explain the purposes, key elements, and the importance of the Declaration of Independence"],
  "5.14B": [GOV, "explain the purposes of the U.S. Constitution as identified in the Preamble"],
  "5.14C": [GOV, "explain the reasons for the creation of the Bill of Rights and its importance"],
  "5.15A": [GOV, "identify and explain the basic functions of the three branches of government"],
  "5.15B": [GOV, "identify the reasons for and describe the system of checks and balances outlined in the U.S. Constitution"],
  "5.15C": [GOV, "distinguish between national and state governments and compare their responsibilities in the U.S. federal system"],
  "5.16A": [C, "explain various patriotic symbols, including Uncle Sam; national celebrations such as Labor Day; and political symbols such as the donkey and elephant"],
  "5.16B": [C, "sing or recite \"The Star-Spangled Banner\" and explain its history"],
  "5.16C": [C, "recite and explain the meaning of the Pledge of Allegiance to the United States Flag"],
  "5.16D": [C, "explain the significance of important landmarks, including the White House, the Statue of Liberty, and Mount Rushmore"],
  "5.17A": [C, "explain why individuals have a duty to participate in civic affairs at the local, state, and national levels"],
  "5.17B": [C, "explain how to contact elected and appointed leaders in local, state, and national governments"],
  "5.17C": [C, "use voting as a method for group decision making"],
  "5.18A": [C, "identify past and present leaders in the national government, including the president and various members of Congress, and their political parties"],
  "5.18B": [C, "identify leadership qualities of national leaders, past and present"],
  // 5.19 is a single UNLETTERED expectation. Keyed both ways — see DISCREPANCIES 3.
  "5.19": [C, "describe the fundamental rights guaranteed in the Bill of Rights, including freedom of religion, speech, and press; the right to assemble and petition the government; the right to keep and bear arms; the right to trial by jury; and the right to an attorney"],
  "5.20A": [CU, "identify significant examples of art, music, and literature from various periods in U.S. history such as the painting American Progress, \"Yankee Doodle,\" and \"Paul Revere's Ride\""],
  "5.20B": [CU, "explain how examples of art, music, and literature reflect the times during which they were created"],
  "5.21A": [CU, "describe customs and traditions of various racial, ethnic, and religious groups in the United States"],
  "5.21B": [CU, "summarize the contributions of people of various racial, ethnic, and religious groups to our national identity"],
  "5.22A": [ST, "identify the accomplishments of notable individuals in the fields of science and technology such as Benjamin Franklin, Eli Whitney, John Deere, Thomas Edison, Alexander Graham Bell, George Washington Carver, the Wright Brothers, and Neil Armstrong"],
  "5.22B": [ST, "identify how scientific discoveries, technological innovations, and the rapid growth of technology industries have advanced the economic development of the United States, including the transcontinental railroad and the space program"],
  "5.22C": [ST, "explain how scientific discoveries and technological innovations in the fields of medicine, communication, and transportation have benefited individuals and society in the United States"],
  "5.23A": [SK, "differentiate between, locate, and use valid primary and secondary sources such as technology; interviews; biographies; oral, print, and visual material; documents; and artifacts to acquire information about the United States"],
  "5.23B": [SK, "identify and ask questions about the credibility of different kinds of primary and secondary sources"],
  "5.23C": [SK, "analyze information by applying absolute and relative chronology through sequencing, categorizing, identifying cause-and-effect relationships, comparing, contrasting, finding the main idea, summarizing, making generalizations and predictions, and drawing inferences and conclusions"],
  "5.23D": [SK, "organize and interpret information in outlines, reports, databases, and visuals, including graphs, charts, timelines, and maps"],
  "5.23E": [SK, "identify different points of view about an issue, topic, historical event, or current event"],
  "5.23F": [SK, "identify the historical context of an event"],
  "5.23G": [SK, "identify the central claim in a primary or secondary source"],
  "5.23H": [SK, "develop and communicate a claim and supporting evidence visually, orally, or in writing related to a social studies topic"],
  "5.24A": [SK, "apply mapping elements, including grid systems, legends, symbols, scales, and compass roses, to create and interpret maps"],
  "5.24B": [SK, "interpret geographic data, population distribution, and natural resources into a variety of formats such as graphs and maps"],
  "5.25A": [SK, "use social studies terminology correctly"],
  "5.25B": [SK, "incorporate main and supporting ideas in verbal and written communication"],
  "5.25C": [SK, "express ideas orally based on research and experiences"],
  "5.25D": [SK, "create written and visual material such as journal entries, reports, graphic organizers, outlines, and bibliographies"],
  "5.25E": [SK, "apply foundational language skills to engage in civil discourse about social studies topics, including those with multiple perspectives"],
  "5.26A": [SK, "use democratic procedures to simulate making decisions on school, local, or state issues"],
  "5.26B": [SK, "use problem-solving and decision-making processes to identify a problem, gather information, list and consider options, consider advantages and disadvantages, choose and implement a solution, and evaluate the effectiveness of the solution"],
};

/** Standard code -> { grade, code, strand, knowledge, text }. */
export const SS_TEKS = Object.fromEntries(
  Object.entries(RAW).map(([code, [strand, text]]) => {
    const parent = code.match(/^(\d+\.\d+)/)[1];
    return [code, {
      grade: Number(code[0]),
      code,
      strand,
      knowledge: K[parent],
      text,
    }];
  })
);

// Aliases for the two unlettered Grade 5 expectations the assignment table
// writes with a letter. Both spellings resolve; the unlettered one is correct.
SS_TEKS["5.3A"] = { ...SS_TEKS["5.3"], code: "5.3", aliasOf: "5.3" };
SS_TEKS["5.19A"] = { ...SS_TEKS["5.19"], code: "5.19", aliasOf: "5.19" };

/** The `teksText` a lesson pack should carry: sentence-cased, punctuated. */
export function teksTextFor(code) {
  const entry = SS_TEKS[code];
  if (!entry) throw new Error(`[ss-teks] unknown standard "${code}"`);
  const t = entry.text;
  return `${t[0].toUpperCase()}${t.slice(1)}.`;
}

/** True when the standard's named examples are REQUIRED rather than
 *  illustrative — i.e. it says "including" rather than only "such as". A
 *  lesson on an `including` standard must cover every name it lists. */
export function namesRequiredExamples(code) {
  const entry = SS_TEKS[code];
  if (!entry) throw new Error(`[ss-teks] unknown standard "${code}"`);
  return /\bincluding\b/.test(entry.text);
}

export const SS_TEKS_SOURCE = {
  authority: "19 Texas Administrative Code, Title 19, Part 2, Chapter 113, Subchapter A",
  sections: { 3: "§113.14", 4: "§113.15", 5: "§113.16" },
  retrieved: "2026-09-16",
  via: "regulations.justia.com (verbatim TAC mirror)",
  adopted: 2022,
  implemented: "2024-2025",
};
