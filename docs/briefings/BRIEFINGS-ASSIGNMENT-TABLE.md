# ClearCenters Briefings — Standard-by-Standard Assignment Table

**The batch work order. Written Sept 14, 2026. Covers every Grade 3, 4 and 5 Texas
Social Studies TEKS student expectation (2022 adoption, implemented 2024–25).**

---

## 0. How to use this document

You are being asked to generate briefing lessons. This table tells you, for every
standard, **which of four lesson types to build it as**. Do not decide the type
yourself — it has already been decided here, and the reasoning for edge cases is in
the Note column.

Read these first, in this order:

1. `BRIEFINGS-LESSON-TYPES-DRAFT.md` — what the four types are, what each one's teach
   and synthesis do, and **§9, the rules that apply to every lesson**. You cannot
   build correctly from this table alone.
2. The four baseline lessons, which are worked examples, one per type:
   `SS-3-2A-V3-BR` (Type 1), `SS-3-2B-V3-BR` (Type 2), `SS-3-1B-V3-BR` (Type 3),
   `SS-3-7C-V3-BR` (Type 4). Each has its reasoning written into its file header.
3. The shape contracts in `lib/briefings/schema/`, which define the fields.

Then build. Every lesson you generate must pass three checks before a human sees it:
its shape validator, its quality audit, and `crossCheckLesson(publicPack, serverPack)`.

### The four types, in one line each

| Type | Build it when the standard asks… | The student names… |
|---|---|---|
| **1 · Cause and effect** | why something happened, what caused it, what followed, or why people did something | the **reason** |
| **2 · Comparison** | how two or more things differ | the **cause of the difference** |
| **3 · People** | who did something and what their contribution was | the **kind of contribution** |
| **4 · Categories** | which group a thing belongs to | the **rule** that decides, never the category |

### A thing that is easy to get wrong

**Type 1 has two flavours, and they are not interchangeable.**

- **Chain** — A caused B caused C, in order. *The road to the Civil War (5.4D). The
  Texas Revolution (4.3A).* The teach runs forward, each beat caused by the previous
  beat's solution, and the beats cannot be shuffled.
- **Hub** — one thing changed many things at once. *How the railroad changed Texas
  (4.4C). Effects on American Indian life from the Red River War, forts, railroads and
  the loss of the buffalo (4.4D).*

A hub is **not** a chain and the chain engine has nothing to run on. It uses the same
seven phases and the same fields; only the way the beats link differs — they fan out
from one cause instead of running forward. Rows below are marked `T1-hub` where this
applies. **No hub lesson has been built yet**, so the first one needs a human read
before the rest follow.

### Rows marked FLAG

A few standards are procedures rather than knowledge — *create a budget*, *use voting
as a method for group decision-making*. They ask a student to **do** a thing, not to
understand why it is so. They may not deserve a twenty-minute briefing at all. Do not
generate these. They are listed so nobody thinks they were missed, and they need
Emily's decision first.

### Rows marked EXCLUDE

Map skills (*use scale to determine distance*) and recitation (*sing "Texas, Our
Texas"*) are not briefing material in any type. Do not generate these.

### The process standards

Grade 3's 3.14–3.16, Grade 4's 4.19–4.22 and Grade 5's 5.23–5.26 are **process**
standards — sourcing, analysing, communicating, decision-making. They are not built as
lessons. They are **paired** with a content standard, and the pairing is what lets a
briefing cite both a content and a thinking standard.

Pair them by type. The analysis standard in each grade (3.14C / 4.19C / 5.23C) names
the moves explicitly — *sequencing, categorizing, cause and effect, compare and
contrast* — which is where the four types came from in the first place:

| Type | Pairs with |
|---|---|
| 1 · Cause and effect | 3.14C / 4.19C / 5.23C — *sequencing, cause and effect* |
| 2 · Comparison | 3.14C / 4.19C / 5.23C — *compare and contrast* |
| 3 · People | 4.19E / 5.23E — *point of view*; and the claim-and-evidence standard (3.14F / 4.19G / 5.23H) |
| 4 · Categories | 3.14C / 4.19C / 5.23C — *categorizing* |

Every type's `opsChoice` phase also exercises the decision-making standard
(3.16B / 4.22B / 5.26B), and every type's teacher-read clearance item exercises the
claim-and-evidence one.

---

## 1. Grade 3

| Standard | What it asks for | Type | Note |
|---|---|---|---|
| 3.1A | How individuals, events and ideas changed communities | **T1-hub** | Many causes, one changing place. Not a chain. |
| 3.1B | Individuals who shaped communities — L'Enfant, Banneker, Franklin | **T3** | ✅ **BUILT** — `SS-3-1B-V3-BR`, the Type 3 worked example. |
| 3.1C | How individuals expanded or created communities — Boone, Founding Fathers | **T3** | Grouped variant, like 3.1B. |
| 3.2A | Reasons people form communities | **T1** | ✅ **BUILT** — `SS-3-2A-V3-BR`, the Type 1 worked example. |
| 3.2B | Compare how communities meet needs | **T2** | ✅ **BUILT** — `SS-3-2B-V3-BR`, the Type 2 worked example. |
| 3.3A | Similarities and differences in physical environments | **T2** | |
| 3.3B | Compare how people adapt to or modify environments | **T2** | |
| 3.3C | How human processes shape landscapes | **T1-hub** | Building, conservation and pollution all acting on one landscape. |
| 3.4A | Cardinal and intermediate directions | EXCLUDE | Map skill. |
| 3.4B | Map scale and distance | EXCLUDE | Map skill. |
| 3.4C | Map elements | EXCLUDE | Map skill. |
| 3.5A | Ways people earn, spend, save and donate | **T4** | Four clean categories. The rule is roughly *what happens to the money next.* |
| 3.5B | Create a simple budget | FLAG | A doing-task. The `opsChoice` mechanic already is a budget decision — consider whether that phase alone covers it. |
| 3.6A | How supply and demand affect price | **T1** | Mechanism: if this moves, that moves. |
| 3.6B | Define scarcity and identify examples | **T4** | The rule is *is there enough for everyone who wants it.* |
| 3.6C | How cost and selling price affect profit | **T1** | Mechanism. |
| 3.6D | Entrepreneurs — Ford, Walton | **T3** | |
| 3.7A | Basic structure of local, state and national government | **T4** | Same reach rule as 3.7C. |
| 3.7B | Government officials and how they are chosen | **T4** | |
| 3.7C | Services provided by local, state, national government | **T4** | ✅ **BUILT** — `SS-3-7C-V3-BR`, the Type 4 worked example. |
| 3.8A | Purposes of the Declaration, Constitution, Bill of Rights | **T4** | Which document does which job. |
| 3.8B | Consent of the governed | **T2** | Contrast a place where authority comes from the people with one where it doesn't. The difference is the teach. |
| 3.9A | Characteristics of good citizenship | **T4** | |
| 3.9B | Historical figures who exemplify good citizenship | **T3** | |
| 3.9C | Acts of civic responsibility | **T4** | |
| 3.9D | Civic and nonprofit organizations and the common good | **T3** | The organisation is the actor. Use the decision shape — see 3.1B's Franklin round. |
| 3.9E | Voting as a method for group decision-making | FLAG | A doing-task. |
| 3.10A | Significance of cultural celebrations | **T1** | Why a celebration exists and what it does for the people who hold it. |
| 3.10B | Compare cultural celebrations | **T2** | |
| 3.11A | State, national, military and first-responder heroes | **T3** | |
| 3.11B | Historical and contemporary heroes | **T3** | |
| 3.12 | Writers and artists, and cultural heritage | **T3** | |
| 3.13A | Scientists and inventors | **T3** | |
| 3.13B | How breakthroughs and technologies affected communities | **T1-hub** | One invention, many changes. |
| 3.14A–F | Sources, evidence, critical thinking | PROCESS | Pair, don't build. |
| 3.15A–F | Communication and chronology | PROCESS | Pair, don't build. |
| 3.16A–B | Problem solving and decision making | PROCESS | Exercised by `opsChoice` in every type. |

---

## 2. Grade 4

| Standard | What it asks for | Type | Note |
|---|---|---|---|
| 4.1A | Possible origins of American Indian groups in Texas | **T1** | |
| 4.1B | Compare ways of life of American Indian groups | **T2** | Four named groups — pick two for the teach, the rest for the sort. |
| 4.1C | American Indian cultural regions | **T4** | |
| 4.1D | Locate American Indian groups in Texas today | EXCLUDE | Map skill. |
| 4.2A | Motivations for European exploration | **T1** | Reasons flavour — the standard names its own categories, exactly like 3.2A. Closest match to the Type 1 worked example. |
| 4.2B | Accomplishments and impact of significant explorers | **T3** | |
| 4.2C | When, where and why the Spanish built settlements and missions | **T1** | |
| 4.2D | Texas's role in the Mexican War of Independence, and its effects | **T1** | |
| 4.2E | Empresarios — accomplishments, economic motivations, impact | **T3** | Single-biography variant works here (Austin, de León). |
| 4.3A | Causes, major events and effects of the Texas Revolution | **T1** | **Chain.** The strongest chain candidate in Grade 4. |
| 4.3B | Individuals of the Texas Revolution | **T3** | Grouped variant — the standard names nine people. |
| 4.3C | Leaders of the Republic and State of Texas | **T3** | |
| 4.3D | Successes, problems and organizations of the Republic | **T1** | Each problem and what was done about it. |
| 4.3E | Events leading to annexation, and the U.S.–Mexican War's impact | **T1** | Chain. |
| 4.4A | Impact of the Civil War and Reconstruction on Texas | **T1-hub** | |
| 4.4B | Growth, development and impact of the cattle industry | **T1** | Chain — it grew in stages. |
| 4.4C | How railroads affected life in Texas | **T1-hub** | The canonical hub. One railroad, many changes. |
| 4.4D | Effects on American Indian life — Red River War, forts, railroads, buffalo | **T1-hub** | Many causes, one effect. The reverse fan. Handle with care. |
| 4.5A | How major 20th-century events affected life in Texas | **T1-hub** | Also names individuals; they belong in the teach, not a separate lesson. |
| 4.5B | Development and impact of the oil and gas industry | **T1** | Chain — Spindletop onward. |
| 4.6A | Identify, locate and describe Texas's four physical regions | **T4** | |
| 4.6B | Compare the four physical regions | **T2** | |
| 4.7A | How geographic factors influenced settlement patterns | **T1** | |
| 4.7B | Settlement patterns over time | **T1** | |
| 4.8A | Ways people adapted to and modified the Texas environment | **T4** | Kinds of modification. |
| 4.8B | Why people adapted or modified — needs, resources, transport, recreation | **T1** | Reasons flavour, categories named in the standard. |
| 4.8C | Compare positive and negative consequences of modification | **T2** | A trade-off comparison, not a place comparison. |
| 4.9A | How American Indian groups met needs and wants | **T1** | |
| 4.9B | How early settlers met needs and wants | **T1** | Pairs naturally with 4.9A as a later comparison lesson. |
| 4.10A | How free enterprise works — supply and demand | **T1** | Mechanism. |
| 4.10B | Benefits of free enterprise — choice and opportunity | **T4** | |
| 4.10C | Development of free enterprise in Texas | **T1** | |
| 4.11A | How people in different regions earned a living, past and present | **T2** | Two-axis: region and time. Pick one axis for the teach. |
| 4.11B | How geographic factors influence where economic activity occurs | **T1** | |
| 4.11C | Effects of exploration, immigration, migration, limited resources | **T1-hub** | |
| 4.11D | How transport and communication influenced economic activity | **T1** | |
| 4.12A | Compare how American Indian groups governed themselves | **T2** | |
| 4.12B | Compare Spanish colonial and early Mexican governments | **T2** | |
| 4.13A | Purposes and importance of the Texas Declaration and Constitution | **T4** | |
| 4.13B | Three branches of Texas government | **T4** | The "wrong desk" teach fits exactly — a case at the branch that can't hear it. |
| 4.13C | Intent, meaning and importance of U.S. founding documents | **T4** | |
| 4.14A | Meaning of patriotic symbols and landmarks | **T4** | |
| 4.14B | Sing or recite "Texas, Our Texas" | EXCLUDE | Recitation. |
| 4.14C | Recite and explain the Pledge to the Texas Flag | EXCLUDE | Recitation. |
| 4.14D | Origins and significance of state celebrations | **T1** | |
| 4.15A | Individuals who participated in civic affairs | **T3** | |
| 4.15B | Ways citizens participate | **T4** | |
| 4.15C | An individual's duty in state and local elections | **T1** | Why it matters, and what happens when nobody does it. |
| 4.15D | Texans who modeled civic participation | **T3** | |
| 4.15E | How to contact elected and appointed leaders | EXCLUDE | Procedure. |
| 4.15F | Voting for group decisions | FLAG | A doing-task. |
| 4.16A | Leaders in state, local and national government | **T4** | Which level holds which office. |
| 4.16B | Leadership qualities of state and local leaders | **T4** | |
| 4.17A | Texas customs, celebrations and traditions | **T4** | |
| 4.17B | Contributions of artists to Texas culture | **T3** | |
| 4.18A | Texas inventors and scientists | **T3** | |
| 4.18B | How discoveries and innovations benefited Texas | **T1** | |
| 4.19A–G | Sources, evidence, critical thinking | PROCESS | Pair, don't build. |
| 4.20A–B | Geographic skills | PROCESS | |
| 4.21A–E | Communication skills | PROCESS | |
| 4.22A–B | Problem solving and decision making | PROCESS | Exercised by `opsChoice`. |

---

## 3. Grade 5

| Standard | What it asks for | Type | Note |
|---|---|---|---|
| 5.1A | When, where and why groups explored and settled — religious freedom, economic gain | **T1** | Reasons flavour; the standard names its categories. |
| 5.1B | Colonial leaders who settled for religious freedom and economic gain | **T3** | Grouped — five people named. |
| 5.2A | Causes and effects of events before and during the American Revolution | **T1** | **Chain.** Taxation → Boston Tea Party → response. A flagship chain. |
| 5.2B | Founding Fathers and Patriot heroes — motivations and contributions | **T3** | |
| 5.2C | Results of the American Revolution | **T1** | |
| 5.3A | Madison's and Mason's contributions to the Constitution | **T3** | Two people — grouped, but small. Consider folding into 5.14B. |
| 5.4A | Causes and effects of the War of 1812 | **T1** | Chain. |
| 5.4B | How Industrial Revolution changes led to sectional conflict | **T1** | Chain. |
| 5.4C | Territorial expansion — Louisiana Purchase, Lewis and Clark, Manifest Destiny | **T1** | Chain, with one concept (Manifest Destiny) carried through it. |
| 5.4D | The expansion of slavery in causing sectionalism and the Civil War | **T1** | **Chain**, and the most consequential in the set. Needs the closest human read of any lesson in this table. |
| 5.4E | Effects of the Civil War — Reconstruction, 13th/14th/15th Amendments | **T1** | |
| 5.4F | Challenges, opportunities and contributions — American Indians, immigrants | **T2** | Compare the experiences of two groups in the same period. |
| 5.5A | Significance of 20th-century events | **T1-hub** | |
| 5.5B | 21st-century issues and events | **T1** | |
| 5.5C | Significant individuals and groups in civil rights, women's rights, politics | **T3** | |
| 5.6A | Political and economic regions created by human activity | **T4** | |
| 5.6B | U.S. regions by physical characteristics | **T4** | |
| 5.6C | Locate the 50 states and five largest cities | EXCLUDE | Map skill. |
| 5.6D | Create maps of major physical features | EXCLUDE | Map skill. |
| 5.7A | Rural, urban and suburban settlement patterns | **T4** | Three clean categories, and genuine boundary cases exist (exurbs, small towns). |
| 5.7B | Geographic factors influencing settlement and population | **T1** | |
| 5.7C | Geographic factors behind the five largest urban areas | **T1** | |
| 5.8A | How and why people adapt to and modify the environment | **T1** | Reasons flavour. |
| 5.8B | Positive and negative consequences of human modification | **T2** | Trade-off comparison. |
| 5.9A | Economic patterns of the early colonies | **T2** | New England vs Middle vs Southern — the classic regional comparison. |
| 5.9B | Major colonial industries | **T4** | |
| 5.10A | Development of free enterprise in colonial America and the U.S. | **T1** | |
| 5.10B | How the free enterprise system works | **T1** | Mechanism. |
| 5.10C | Benefits of free enterprise | **T4** | |
| 5.11A | How supply and demand affect consumers | **T1** | Mechanism. |
| 5.11B | Effects of supply and demand on industry and agriculture | **T1** | Includes the plantation system — handle with the same care as 5.4D. |
| 5.12A | Compare how people in different U.S. regions earn a living | **T2** | |
| 5.12B | How geographic factors influence economic activity | **T1** | |
| 5.12C | Effects of immigration and migration on economic growth | **T1** | |
| 5.12D | How mass production, specialization and division of labor affect growth | **T1** | Mechanism. |
| 5.13A | Compare colonial systems of government — representative vs monarchy | **T2** | |
| 5.13B | Examples of representative government — Mayflower Compact, Burgesses | **T4** | |
| 5.14A | Purposes, key elements and importance of the Declaration | **T4** | |
| 5.14B | Purposes of the Constitution, as in the Preamble | **T4** | The Preamble lists its own categories. |
| 5.14C | Why the Bill of Rights was created and why it matters | **T1** | Reasons flavour. |
| 5.15A | Functions of the three branches | **T4** | The "wrong desk" teach fits exactly. |
| 5.15B | Reasons for, and the system of, checks and balances | **T1** | Mechanism — and the take-one-away move is unusually strong here. |
| 5.15C | Distinguish national from state government and compare responsibilities | **T2** | Sits close to T4. The reach rule from `SS-3-7C-V3-BR` applies directly; reuse it. |
| 5.16A | Patriotic, national and political symbols | **T4** | |
| 5.16B | Sing or recite "The Star-Spangled Banner" | EXCLUDE | Recitation. |
| 5.16C | Recite and explain the Pledge of Allegiance | EXCLUDE | Recitation. |
| 5.16D | Significance of U.S. landmarks | **T4** | What each one stands for. |
| 5.17A | Why individuals have a duty to participate in civic affairs | **T1** | Reasons flavour. |
| 5.17B | How to contact government leaders | EXCLUDE | Procedure. |
| 5.17C | Voting as a method for group decision-making | FLAG | A doing-task. |
| 5.18A | Past and present national leaders | **T3** | |
| 5.18B | Leadership qualities of national leaders | **T4** | |
| 5.19A | Rights guaranteed by the Bill of Rights | **T4** | An unusually good Type 4: give a scenario, ask which right covers it. Boundary cases are plentiful and real. |
| 5.20A | Examples of art, music and literature from different periods | **T4** | Match work to period. |
| 5.20B | How the arts reflect the periods they were made in | **T1** | Conditions → what got made. An inference lesson. |
| 5.21A | Customs and traditions of racial, ethnic and religious groups | **T4** | |
| 5.21B | Contributions of various groups to national identity | **T3** | |
| 5.22A | Notable scientists and inventors | **T3** | Grouped — eight people named. Strong candidate for the grouped variant. |
| 5.22B | How discoveries and technology advanced economic development | **T1** | |
| 5.22C | How innovations in medicine, communication and transport benefited society | **T1-hub** | |
| 5.23A–H | Sources, evidence, critical thinking | PROCESS | Pair, don't build. |
| 5.24A–B | Geographic skills | PROCESS | |
| 5.25A–E | Communication skills | PROCESS | |
| 5.26A–B | Problem solving and decision making | PROCESS | Exercised by `opsChoice`. |

---

## 4. What that adds up to

Counted from the rows above, not estimated. Each row is one standard except the
process rows, which cover a lettered range and are excluded from the lesson count.

| | Grade 3 | Grade 4 | Grade 5 | Total |
|---|---|---|---|---|
| **Type 1 · Cause and effect** | 7 | 26 | 26 | **59** |
| *of which hub variant* | *3* | *5* | *2* | *10* |
| **Type 2 · Comparison** | 5 | 6 | 6 | **17** |
| **Type 3 · People** | 9 | 8 | 7 | **24** |
| **Type 4 · Categories** | 8 | 12 | 15 | **35** |
| **Lessons to generate** | **29** | **52** | **54** | **135** |
| Flagged — needs a decision first | 2 | 1 | 1 | 4 |
| Excluded — maps and recitation | 3 | 4 | 5 | 12 |

Four of the 135 are already built as the worked examples, leaving **131 to generate.**

### A scope reality worth saying out loud

The original briefing plan assumed "roughly thirty lessons." Counting every standard
gives **135**. That is not a rounding error — it is four and a half times the assumed
scope, and at twenty minutes a lesson it is about forty-five hours of student time.

Nothing in this table decides what to do about that. It is a scope decision for Emily,
and there are three honest options:

1. **Build all 135.** Complete coverage, largest cost, and the review burden in §5
   applies to every one of them.
2. **Bundle within a strand.** Several standards are natural companions — 4.9A and
   4.9B (how two groups met their needs) are one comparison lesson, not two; 5.3A's
   two people could fold into 5.14B. Bundling could plausibly take 135 down to around
   90 without losing coverage.
3. **Prioritise by what gets tested and taught.** Build the standards that carry the
   most classroom weight first and leave the long tail until the pipeline is proven.

**Recommendation: do not start a volume run until this is decided.** Generating 135
lessons and then deciding to bundle means throwing work away, and every generated
lesson carries a human review cost whether it ships or not.

## 5. Where human attention has to go

The checks catch structure. They cannot catch meaning. These need a person, per
lesson, every time — and at 115 lessons that cost is real and should be planned for:

- **Whether a causal chain actually holds.** A model will happily produce three events
  that sound sequential and aren't. Every Type 1 lesson needs this read.
- **Whether a distractor is a real misconception** or merely a plausible-sounding
  wrong answer. This is the difference between an item that tells you who understood
  and one that doesn't.
- **Whether every historical claim is true.** Especially the "this really happened"
  lines. Popular classroom stories are often wrong: the claim that Benjamin Banneker
  reproduced L'Enfant's plan from memory is disputed and probably a myth, and it is in
  a great deal of published material. It is excluded from `SS-3-1B-V3-BR` on purpose
  and must not be reintroduced.
- **The standards that carry weight.** 5.4D (slavery and the causes of the Civil War),
  5.4E (Reconstruction and the Amendments), 5.11B (the plantation system), 4.4D
  (effects on American Indian life) and 5.4F all describe real harm to real people.
  They are in the TEKS and they get taught. Generate them carefully, flag every one
  for review, and do not soften them into something tidy.
