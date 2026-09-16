# Briefing review notes — Grade 4 and Grade 5

**Everything that used to sit in a comment block at the top of each lesson file.**
Sources, the things a checker cannot see, the content calls that are Emily's, and
the art each lesson needs. Moved out of the code on Sept 16, 2026 — the lesson
files now carry a twelve-line header and point here.

Each lesson still passes all three checks. Nothing about the lesson content changed.

---

## SS-4-3A-V3-BR — Three Doors Closing

```
Briefing SS-4-3A-V3-BR — Three Doors Closing — PUBLIC pack, v3 thinking shape.
Answer keys live only in SS-4-3A-V3-BR.server.js — never import that here.

GRADE 4 · TYPE 1 · TEKS 4.3A · the CHAIN flavour.

============================================================================
WHY THIS LESSON EXISTS AND WHAT IT IS TESTING
============================================================================
SS-3-2A-V3-BR is the Type 1 worked example, and it is the REASONS flavour:
TEKS 3.2A hands the lesson a closed set (security and laws / religious
freedom / material well-being) that storyTeach.reasons, openingFrame
.predictOptions, the practice bins and transfer.claimOptions all reuse. That
is four phases plus crossCheckLesson all leaning on a set the standard
supplied for free.

4.3A supplies nothing of the kind. "Causes, major events and effects of the
Texas Revolution" is a genuine CHAIN — and the chain engine has no set to
bin things into. So this lesson invents one: three KINDS OF CAUSE.

    deal  — a promise got changed
    voice — nobody would listen
    force — soldiers settled it

FOR EMILY, THE CALL THAT MATTERS MOST IN THIS FILE: those three categories
are OURS, not the TEKS's. Nothing in 4.3A names them. They were chosen
because they are (a) one level of abstraction above the events on screen,
which is what makes the transfer phase possible at all, and (b) true of
nearly every revolution, which is why the transfer to the American colonies
works. If you don't like them, the fix is a rewrite of this file, not of the
shape — and every other chain standard (5.2A, 5.4A, 5.4B, 5.4C, 5.4D, 4.3E)
will need its own set. That is roughly 29 taxonomies somebody has to author
and approve. It is the single largest hidden cost in the assignment table.

============================================================================
teksText — NOW THE REAL THING, and it changed the lesson
============================================================================
`teksText` below is verbatim 19 TAC §113.15(c)(3)(A), from
lib/briefings/teks/ss-teks-3-5.js. Two things the earlier paraphrase hid:

  1. The verb is **analyze**, not "identify and explain".
  2. The standard says **including** the Battle of the Alamo, the Texas
     Declaration of Independence, the Runaway Scrape, and the Battle of San
     Jacinto. In TEKS, "including" means those four are REQUIRED.

The first draft of sequenceIt ordered Gonzales, the Declaration, the Alamo,
GOLIAD and San Jacinto — omitting the Runaway Scrape, which the standard
requires, and including Goliad, which it does not name. That is now fixed:
Goliad is out, the Runaway Scrape is in, and all four required events are
present. Gonzales stays because the teach ends there and it is what starts
the shooting; it is additional to the standard, not a substitute for
anything in it.

Goliad being dropped is a deliberate call and you may disagree with it — it
is heavily taught and it is genuinely part of the story. It is simply not in
4.3A. If you want it back, it belongs in the teach or the clearance, not in
the phase that is carrying the standard's own list.

============================================================================
HISTORICAL ACCURACY — verified Sept 14 2026
============================================================================
 - Law of April 6, 1830: driven by Lucas Alamán from Manuel de Mier y Terán's
   report. Article 11 restricted immigration from the United States; the law
   forbade further introduction of slaves, opened coastal trade to foreigners
   for four years and led to customhouses; it suspended empresario contracts.
   Austin secured exemptions for his own colony and Green DeWitt's, and later
   the repeal of Article 11. (TSHA Handbook of Texas, "Law of April 6, 1830")
 - Austin carried the 1833 petition to Mexico City; arrested early 1834 over
   his 2 Oct 1833 letter urging Béxar to organise a state government without
   waiting; held in a former Inquisition prison, in solitary until May 1834,
   never tried; discharged on bail 25 Dec 1834; home to Texas Sept 1835,
   speaking at Brazoria 8 Sept 1835. (The Alamo; TSHA)
 - Gonzales, 2 Oct 1835 — the disputed cannon, the COME AND TAKE IT flag.
   Gonzales is still called "the Lexington of Texas."
 - Consultation: met San Felipe 1 Nov 1835 (delayed from 15 Oct); voted 33–14
   on 7 Nov for a provisional government on the principles of the 1824
   constitution rather than immediate independence; Organic Law 13 Nov
   created a governor and general council; established a regular army under
   Sam Houston, though the volunteers already in the field stayed outside it.
   (TSHA Handbook of Texas, "Consultation")
 - Sequence: Gonzales 2 Oct 1835 · Texas Declaration of Independence 2 Mar
   1836 · the Alamo falls 6 Mar 1836 · the Runaway Scrape, from Houston's
   retreat around 13 Mar 1836 until after San Jacinto · San Jacinto 21 Apr
   1836. The Declaration is FOUR DAYS BEFORE the Alamo falls, which is the
   whole point of the sequenceIt phase — almost every student puts the Alamo
   first, because it is the part they arrive already knowing.
 - transfer (the American colonies): Massachusetts's charter was revoked by
   the Crown in 1684; Parliament taxed colonies that elected no members to
   it; the Olive Branch Petition of July 1775 was never answered; British
   troops marched on Concord in April 1775 to seize military stores.

FLAGGED FOR HUMAN REVIEW — three things a checker cannot see:
 1. THE CHAIN. Beat 1's solution causes beat 2's problem (the 1830 law is
    what there was to petition about) and beat 2's solution causes beat 3's
    (two years of asking ending in a cell is why Gonzales did not write a
    fourth letter). I believe that holds. It is a real historical argument
    and it is compressed hard. Please read it as history, not as structure.
 2. AUSTIN'S EXEMPTION is deliberately kept out of the student text and put
    in a realWorld line instead. Beat 1 says the door closed; for Austin's
    own colonists it largely didn't. Simplification or falsehood — your call.
 3. opsChoice asks the Consultation to pick TWO of three. It actually did all
    three. The constraint is invented to make the phase work. Every Type 1
    history lesson will have this problem, because opsChoice is a resource
    decision and history rarely presents one.

ART NEEDED (none of these exist):
  intel      — a customs house on a dirt road, soldiers, a queue of wagons
  beatDeal   — the 1830 law posted on a wall, settlers reading it
  beatVoice  — a lone rider on a long road; later, a barred window
  beatForce  — the Gonzales cannon, the flag, riders leaving in three ways
  ops        — a crowded room at San Felipe, November, arguing
  (transfer has no art and runs as word chips, same as every other v3 lesson)
```

---

## SS-4-6B-V3-BR — Fifty-Five Inches and Nine

```
Briefing SS-4-6B-V3-BR — Fifty-Five Inches and Nine — PUBLIC pack, comparison shape.
Answer keys live only in SS-4-6B-V3-BR.server.js — never import that here.

GRADE 4 · TYPE 2 · TEKS 4.6B.

============================================================================
WHAT THIS ONE IS TESTING: FOUR THINGS IN A TWO-THING SHAPE
============================================================================
ssComparisonLesson.schema.js is built around exactly two places. It requires
`homeName` and `awayName`, the teach hides the away place until the student
predicts, and contrastSynthesis sorts into home / both / away. 4.6B names
FOUR regions and asks the student to compare all of them.

The assignment table says this for 4.1B — "pick two for the teach, the rest
for the sort" — and says nothing about it for 4.6B, though 4.6B has the same
problem and one more region. This lesson takes that route:

  the TEACH        Coastal Plains vs Mountains and Basins (maximum contrast)
  the PRACTICE     matchPairs carries the Great Plains and the North Central
                   Plains, which never appear in the teach at all
  the TRANSFER     the Great Plains again, as a place nobody taught them

FOR EMILY — THIS IS A REAL GAP, NOT A ONE-LESSON WORKAROUND. Two of the four
regions this standard names are met only in a four-pair matching phase and a
five-chip transfer. The lesson can honestly claim to teach two regions
properly and to introduce two. Whether that satisfies 4.6B is your call, not
the checker's — `auditComparisonQuality` has a coverage check (#4) that would
have caught this, but it only fires when the lesson declares a `needs` array,
and a region comparison has no "needs" to declare. So the one check built to
catch exactly this problem is switched off for exactly this standard.

If the answer is "not good enough", the honest options are (a) bundle 4.6A
and 4.6B into one longer lesson, which the assignment table already floats as
a general strategy, or (b) two comparison lessons per four-region standard.

============================================================================
teksText — verbatim 19 TAC §113.15(c)(6)(B), from teks/ss-teks-3-5.js.
============================================================================
AND IT SHARPENS THE GAP ABOVE. The four regions are named IN THE STEM —
"compare the physical regions of Texas (Mountains and Basins, Great Plains,
North Central Plains, Coastal Plains)". They are not an "including" list
attached to a general instruction; they ARE the thing to be compared. That
makes the coverage question above harder to wave through, not easier.

============================================================================
FACTUAL ACCURACY — verified Sept 14 2026
============================================================================
 - Average annual precipitation, 1991–2020 US normals: Houston 55.6 in,
   El Paso 8.8 in, Amarillo 19.7 in, Lubbock 18.3 in. (NCEI normals via
   currentresults.com)
 - Guadalupe Peak, 8,751 ft, highest point in Texas, in the Guadalupe
   Mountains in the Mountains and Basins region.
 - The Cross Timbers: two narrow parallel strips of oak forest running from
   Oklahoma south into Central Texas — blackjack and post oak east, dwarfed
   post oak west — "a formidable obstacle to travelers because of the density
   of growth." (TSHA Handbook of Texas, "Cross Timbers")
 - El Paso takes its name from el paso del norte, the pass through the
   mountains; the city sits at that gap.
 - The Houston Ship Channel runs roughly fifty miles inland from the Gulf.

FLAGGED FOR HUMAN REVIEW:
 1. REGION BOUNDARIES ARE A TEACHING CONVENTION, not a fact. Texas is taught
    as four regions in the TEKS and as seven, ten or twelve elsewhere. Every
    claim in here is written to be true under the four-region scheme the
    standard uses. If your district uses a different map, check the sort.
 2. "Cotton grows in both" is the subtlest sort item and the one I am least
    sure a fourth grader can defend. It is true — Coastal Plains cotton is
    rain-grown, far-west cotton around Pecos and El Paso is irrigated — but
    it depends on knowing the second half, which the teach does give them.
    If it plays as a trick, swap it for "cattle are raised here."

ART NEEDED (none exist):
  twoRegions  — the state split, wet green east, dry brown west
  beatWater   — a rice field under rain; a pipe running to a green square
  beatGoods   — an ocean ship inland at a dock; a truck queue at a border
  beatTowns   — a flat town sprawling; a town packed into a basin at a pass
  ops         — a map with three marks on it and three people arguing
  (transfer runs as word chips, same as every other v3 lesson)
```

---

## SS-4-2E-V3-BR — The Year He Waited

```
Briefing SS-4-2E-V3-BR — The Year He Waited — PUBLIC pack, people shape.
Answer keys live only in SS-4-2E-V3-BR.server.js — never import that here.

GRADE 4 · TYPE 3 · TEKS 4.2E.

============================================================================
WHAT THIS ONE IS TESTING: THE SINGLE-BIOGRAPHY VARIANT
============================================================================
BRIEFINGS-LESSON-TYPES-DRAFT §5 settles that "grouped and biography are the
same shape" — a round is a round, so a Grade 4 lesson on one person would
spend three rounds on three decisions in one life. SS-3-1B-V3-BR proves the
grouped version. Nobody had built the single-biography version.

THE FINDING: it does not survive contact with this standard, and the reason
generalises. 4.2E names TWO people — Austin and de León — so a pure
single-biography lesson on Austin fails the standard's own coverage. What
works is a HYBRID: two rounds in one life, one round in another. That is what
this lesson is.

  round 1   Austin, 1821–23 — the year in Mexico City
  round 2   Austin, 1824    — writing the colony's law and being it
  round 3   De León, 1824   — who the colony would be made of

FOR EMILY: the hybrid is almost certainly the right default for Grades 4 and
5, not the exception. Scanning the Type 3 rows, most of them name a SET of
people (4.3B names nine, 5.1B five, 5.22A eight) or a pair. Standards naming
exactly one person are rare. So the shape holds, but the assignment table's
note that single-biography "works here" is only half true — it works as one
or two rounds inside a lesson, rarely as all of them. Worth adding to the
types document, because a generator told "use the single-biography variant"
will produce a lesson that misses half its standard.

SECOND FINDING, smaller but sharper: the `kinds` taxonomy has to dodge the
audit's own leak check. auditPeopleQuality flags a round whose setup contains
ANY content word from its kind's label — one word is enough. That is right,
but it means the labels have to be written in words the history does not
naturally use. "Set the rules" forced round 2 to say "code" everywhere, which
is arguably better writing and was not a choice I made freely.

============================================================================
teksText — verbatim 19 TAC §113.15(c)(2)(E), from teks/ss-teks-3-5.js.
============================================================================
The standard says **including** Stephen F. Austin and Martín de León, so
both are REQUIRED — which is the point the hybrid note above is making, now
with the standard's own word behind it. A pure single-biography lesson on
Austin would not satisfy 4.2E.

Note the TAC spelling is "Martín de León", lowercase d. The Handbook of
Texas writes "De León" and the first draft followed it. The standard wins in
teksText; the lesson body keeps "De León" as the Handbook does.

============================================================================
HISTORICAL ACCURACY — verified Sept 14 2026
============================================================================
 - Moses Austin died 10 June 1821, weeks after winning a Spanish grant.
   Stephen (b. 3 Nov 1793, so 27) took it over. Mexico won independence in
   1821, leaving the grant's standing unclear. He reached Mexico City in
   April 1822 and did not get home until August 1823, returning with the
   grant confirmed under the colonization law passed while he waited.
 - Austin drew up civil and criminal regulations for the colony and
   administered them himself, registering land and screening applicants.
 - Martín De León: born 1765 in Burgos, Nuevo Santander (now Tamaulipas);
   petitioned 8 April 1824 to settle forty-one Mexican families; approved
   13 April 1824 by the provincial delegation at San Fernando de Béxar;
   founded Nuestra Señora de Guadalupe de Jesús Victoria on the lower
   Guadalupe in 1824; THE ONLY PREDOMINANTLY MEXICAN COLONY IN TEXAS; died
   of cholera in 1833 leaving an estate over half a million dollars; after
   independence his sons Fernando and Silvestre were arrested, the family was
   driven from its lands, fled to Louisiana for about three years, then to
   Soto la Marina, and later returned to Texas largely unable to recover what
   they had lost. (TSHA Handbook of Texas, "De León, Martín")
 - Sterling C. Robertson (the transfer): subcontracted spring 1830 to bring
   200 families; blocked by the Law of April 6, 1830; the area was
   transferred to Austin and Samuel May Williams in 1831; he obtained a
   contract in his own name in 1834 and was empresario in 1834–35; toured
   Tennessee and Kentucky recruiting; responsible for settling more than 600
   families. (TSHA Handbook of Texas, "Robertson, Sterling Clack")

FLAGGED FOR HUMAN REVIEW — four things a checker cannot see:
 1. FOR EMILY, THE CONTENT CALL. Austin's colony was a slaveholding colony,
    and much of his political work in Mexico was to keep it one as Mexican
    law turned against slavery. That is not in this lesson. 4.2E asks for
    "economic motivations", and this is one of them. It is a heavier line
    than anything in the Briefings library and it belongs to you, not to a
    generator. The same call 3.1B made about Banneker's letter to Jefferson.
 2. DE LEÓN'S CATTLE. His blurb says he had been driving cattle in Texas
    before the grant. That is the standard account and I am less certain of
    it than of everything else in this file. Cut it if you want the file
    clean.
 3. THE TRANSFER'S "register of land titles" is true of how empresario
    colonies worked in general. It is NOT sourced to Robertson's own papers.
    It is there because the transfer invariant needs the third kind of work
    to have exactly one proof, and his documented life supplies two for
    "terms", one for "people" and none for "rules". That is the invariant
    bending real evidence, and it is worth knowing it happened.
 4. ROUND 2 MARKS NO OPTION BEST, correctly — but Austin making himself
    judge, land office and law in one man is not a neutral act, and the
    consequence line says so. Read it and decide whether it says enough.

ART NEEDED (none exist):
  grantPaper  — a signed grant on a table, a man's hat beside it
  beatTerms   — a waiting room in Mexico City, a man in it, months passing
  beatRules   — a porch, a table, two men arguing over a map
  beatPeople  — a road south, families with carts, a town being laid out
  ops         — three people at a table in an empty river valley
  (transfer runs as word chips)
```

---

## SS-4-6A-V3-BR — The Wrong Call

```
Briefing SS-4-6A-V3-BR — The Wrong Call — PUBLIC pack, category shape.
Answer keys live only in SS-4-6A-V3-BR.server.js — never import that here.

GRADE 4 · TYPE 4 · TEKS 4.6A · THE "WRONG CALL" VARIANT.

============================================================================
WHY THIS LESSON EXISTS: TYPE 4'S ENGINE DOES NOT REACH TYPE 4'S STANDARDS
============================================================================
ssCategoryLesson.schema.js is built on one idea: "you sort because putting a
thing in the wrong box BREAKS something." Its teach is a problem arriving at
the WRONG DESK — a pothole letter sent to the Governor, four months lost.
That works beautifully for 3.7C, and for branches of government, levels of
government, and the Bill of Rights.

It has nothing to run on for about twenty of the thirty-five Type 4 rows.
Physical regions, patriotic symbols, customs and celebrations, art periods,
leadership qualities, colonial industries, settlement patterns — none of
these is a DESK. Nobody misroutes a painting to the wrong century and waits
four months. There is no letter and there is nobody to forward it to.

THE FIX PROPOSED HERE, and the reason this lesson is the Type 4 draft:
a second variant, exactly as the handoff already did for hub-vs-chain.

    WRONG DESK  — a request goes to the body that cannot act on it.
                  The cost is delay. (3.7C, 4.13B, 5.15A, 5.19A …)
    WRONG CALL  — somebody makes a plan using the wrong category,
                  and the plan fails. The cost is the failure.
                  (4.6A, 4.1C, 5.6A/B, 5.7A, 4.8A, 4.17A …)

THE GOOD NEWS, AND IT IS BETTER THAN I EXPECTED: **this needs no schema
change at all.** Every field ssCategoryLesson.schema.js requires is still
doing honest work — `routeOptions` becomes "which category was this really?",
`whatWentWrong` becomes what the failed plan cost, and the graded step still
names the RULE rather than the category. This file validates, audits and
cross-checks clean against the existing Type 4 contract with nothing
modified. The variant is a writing convention, not a new type.

WHAT DOES NEED CHANGING is the documentation: BRIEFINGS-LESSON-TYPES-DRAFT §6
describes only the desk, and a generator handed that section and told to
build 4.6A will either invent a fake routing story or produce a sort. Both
are the failure the v3 rebuild exists to stop.

============================================================================
teksText — verbatim 19 TAC §113.15(c)(6)(A), from teks/ss-teks-3-5.js.
============================================================================
The paraphrase this replaces stopped at the four region names. The real
standard carries a second clause: "**including** their characteristics such
as landforms, climate, vegetation, and economic activities." Four required
characteristics, and the lesson's three rules happen to land on three of
them — water is climate, ground is landform, and what is already growing is
vegetation — with economic activities carried by the plans themselves (rice,
haulage, ranching, wind). That is luck rather than design, and it is worth
checking deliberately rather than taking my word for it.

============================================================================
FACTUAL ACCURACY — verified Sept 14 2026
============================================================================
 - 1991–2020 normals: Houston 55.6 in, Amarillo 19.7 in, Lubbock 18.3 in,
   El Paso 8.8 in. Houston to El Paso is better than six times.
 - Guadalupe Peak, 8,751 ft, highest point in Texas, Mountains and Basins.
 - Palo Duro Canyon: about 800 ft rim to floor, nearly 120 miles long, cut
   into the Caprock Escarpment at the eastern edge of the High Plains,
   beginning fifteen miles south-east of Amarillo. The canyon is cut DOWN
   into the Great Plains, which is why the region around it is still plain.
 - The Caprock Escarpment is the eastern edge of the High Plains and the
   topographic dividing line between it and the country below.
 - The Cross Timbers: two narrow parallel strips of oak — blackjack and post
   oak east, dwarfed post oak west — running from Oklahoma south into Central
   Texas, "a formidable obstacle to travelers because of the density of
   growth." (TSHA Handbook of Texas)

FLAGGED FOR HUMAN REVIEW:
 1. THE FOUR-REGION MAP IS A TEACHING CONVENTION. Texas is taught as four
    regions in the TEKS and as seven, ten or twelve elsewhere. Everything in
    here is written to be true under the four-region scheme. Check the sort
    against whatever map your district actually uses.
 2. ROUNDS 1 AND 2 ARE COMPOSITES, not documented incidents. A company that
    tried rice near Amarillo and a courier that mis-timed the far-west leg
    are the kind of thing that happens, written as though one did. Every
    FACT inside them is verified; the incidents are not. Round 3 is different
    — travellers really did describe the Cross Timbers that way. If invented
    incidents inside a history and geography lesson are not acceptable, say
    so now, because the Wrong Call variant will need them constantly and
    that is a decision about the whole variant, not about this file.
 3. GREAT PLAINS IS NEVER THE CORRECT ROUTE in the teach. It is the answer to
    the first boundary case and it carries the transfer, which I think is the
    stronger placement — it is the region students are least sure about, so
    meeting it first at the edge is deliberate. The audit allows this only
    because boundary cases exist. Worth a look.

ART NEEDED (none exist):
  fourRegions  — the state in four bands, wet green to dry brown
  beatRice     — a dust-dry field with a pump in it, a rice plan pinned up
  beatRoad     — a truck stopped at dusk on a road climbing into ranges
  beatTimbers  — a wagon at the edge of a wall of low oak
  ops          — three people at a hearing with a map behind them
  (transfer runs as word chips)
```

---

## SS-5-5A-V3-BR — One Machine, Three Changes

```
Briefing SS-5-5A-V3-BR — One Machine, Three Changes — PUBLIC pack, v3 thinking shape.
Answer keys live only in SS-5-5A-V3-BR.server.js — never import that here.

GRADE 5 · TYPE 1 · TEKS 5.5A · THE HUB VARIANT — THE FIRST ONE EVER BUILT.

============================================================================
WHAT THIS IS TESTING, AND THE ONE THING IT FOUND
============================================================================
The assignment table marks ten standards `T1-hub` and says plainly that no
hub lesson exists and the first one needs a human read before the rest
follow. This is that lesson.

  CHAIN  A caused B caused C. The beats cannot be shuffled because each
         problem is created by the previous beat's solution.
  HUB    One thing changed many things at once. The beats fan out from a
         single cause instead of running forward.

THE FINDING, AND IT IS STRUCTURAL: **a hub lesson silently disables Type 1's
main safety check.** `validateSsThinkingShape` requires a `bridge` on every
beat but the last, and the schema says why in as many words — "without it the
beats are shufflable, which is the v2 problem." In a chain the bridge carries
real causation. In a hub there is no causation between beats to carry, because
they are siblings, not a line. The field still has to be filled, so it gets
filled, and the check passes while protecting nothing.

WHAT THIS LESSON DOES ABOUT IT — and it is a partial fix, not a full one.
The beats are ordered by TIME and the bridges carry the clock rather than
the cause: 1900–1920, then 1929–1933, then 1941–1945. You cannot shuffle
them, because the dates forbid it. That is a real constraint and a student
can feel it. It is NOT the same constraint as a chain, and nothing in the
checker can tell the difference.

FOR EMILY — MY RECOMMENDATION, WHICH IS YOURS TO REJECT: add one rule to §9
for hubs — **a hub's beats must be in a fixed real-world order (time, or
scale) and each bridge must state what fixes it.** That is checkable by a
human in ten seconds and it stops a generator producing three interchangeable
paragraphs with connective tissue pasted between them. I have not changed the
schema, because "bridge must contain a date" is the kind of rule that is
easy to satisfy and hard to satisfy honestly.

============================================================================
teksText — verbatim 19 TAC §113.16(c)(5)(A), from teks/ss-teks-3-5.js.
============================================================================
This one says **such as**, not "including" — so the six examples it lists
(industrialization, urbanization, the Great Depression, the world wars, the
civil rights movement, military actions) are ILLUSTRATIVE and a lesson may
select among them. This lesson uses industrialization as the hub and
urbanization, the Depression and the world wars as its three effects, with
the civil rights movement arriving through the third. That selection is legal
precisely because the standard says "such as" — on an "including" standard it
would not be.

============================================================================
HISTORICAL ACCURACY — verified Sept 16 2026
============================================================================
 - The Great Migration: about six million Black Americans left the rural
   South between 1916 and 1970 for cities in the North and West — Chicago,
   Detroit, New York, Philadelphia, Los Angeles, Oakland. (Britannica)
 - The 1920 census was the first in which more Americans lived in urban
   places than outside them.
 - Unemployment reached roughly one in four American workers at the depth of
   the Depression in 1933.
 - A. Philip Randolph threatened a march of tens of thousands on Washington
   over exclusion from defence jobs; Franklin Roosevelt issued Executive
   Order 8802 on 25 June 1941, banning discrimination in the defence
   industries, and the march was called off. The march had been set for
   1 July — six days later.

FLAGGED FOR HUMAN REVIEW — five things a checker cannot see:
 1. THE HUB ITSELF. Is "industrialization" genuinely the single cause of all
    three beats, or am I tying three big things to one word because the shape
    wanted one? I believe beats 1 and 2 hold tightly and beat 3 holds through
    one more link (factories → wartime production → labour shortage → the
    doors open). That third chain is longer and you should read it hardest.
 2. BEAT 1 marks "go north" as the `best` choice. It is what about six
    million people did, and the file says so — but marking a family's
    migration decision "best" is not the same kind of statement as marking a
    town's road-building decision "best" in 3.2A. If that reads wrong, the
    honest alternative is to make beat 1 have no marked answer, which would
    mean Type 1 borrowing Type 3's rule.
 3. BEAT 3 IS THE HEAVY ONE. It says plainly that the jobs opened because the
    men were gone and not because anybody's mind changed, and that many of
    those workers were pushed back out afterwards. That is accurate and it is
    the link to the civil rights movement the standard names. Read it.
 4. THE OPS CHOICE puts "keep the wartime hires on the line" on the table as
    one of three real options in 1946. It is a real decision real firms made
    and mostly made the other way. A student can choose not to keep them.
    That is uncomfortable and I think it is right; it is your call.
 5. THE TRANSFER uses the automobile as a second hub. The "forty thousand
    deaths a year" figure is a modern round number, not a 1950s one. Fine
    as written ("a year") but do not let it drift into a historical claim.

ART NEEDED (none exist):
  intel      — a factory gate at shift change, a queue of new arrivals
  beatWhere  — a train platform, cases, a city skyline behind
  beatRisk   — a silent factory, a locked gate, a queue at a soup kitchen
  beatWho    — a 1943 assembly line, women and Black workers on it
  ops        — a 1946 town meeting, three people standing to speak
  (transfer runs as word chips, same as every other v3 lesson)
```

---

## SS-5-13A-V3-BR — Who Sends Who Home

```
Briefing SS-5-13A-V3-BR — Who Sends Who Home — PUBLIC pack, comparison shape.
Answer keys live only in SS-5-13A-V3-BR.server.js — never import that here.

GRADE 5 · TYPE 2 · TEKS 5.13A.

============================================================================
WHAT THIS ONE IS TESTING: A COMPARISON WITH NO PLACES IN IT
============================================================================
Every Type 2 lesson so far compares two PLACES. 3.2B is Maple Crossing and
Cloudreach; 4.6B is the Coastal Plains and the Mountains and Basins. The
schema is built for it — `homeName`, `awayName`, "meet the home place
properly, then predict what the away place does."

5.13A compares two SYSTEMS: representative government and monarchy. You
cannot visit a monarchy. There is no away town to withhold.

THE FINDING: it works, and it works for a reason worth writing down.
A comparison needs the two things to be separated by something a student can
hold — and here that thing is not geography, it is **a document**. Virginia's
burgesses and the King's governor sat in the same colony, in the same room,
arguing, for a century and a half. So `homeName` is "the House of Burgesses"
and `awayName` is "the King's governor", and the prediction step still works
because a student genuinely can predict what a man who answers to London will
do that a man who answers to voters will not.

WHAT NEARLY BROKE IT, and this is the part to read: Type 2's graded step is
"name WHY the two differ." Two places differ because of rain, or rock, or how
many people are there — external causes a student can point at. Two systems
look like they differ **by definition**, which would leave the naming step
with nothing to name. The fix is that these two did NOT differ by definition:
they differ because of who set each colony up and what they needed, who paid
the man in charge, and whose authority he held. Those are real, external and
they vary. If you cannot find three such causes for a system comparison, the
standard is a Type 4 and not a Type 2 — which is exactly what the assignment
table already suspects about 5.15C, and I now think it is right.

============================================================================
teksText — verbatim 19 TAC §113.16(c)(13)(A), from teks/ss-teks-3-5.js.
============================================================================
**including** representative government and monarchy — both REQUIRED. That is
why neither is the background to the other here; each gets equal rounds.

============================================================================
HISTORICAL ACCURACY — verified Sept 16 2026
============================================================================
 - The House of Burgesses first met summer 1619, called by Governor Sir
   George Yeardley under the Virginia Company's Great Charter of 1618 —
   twenty-two burgesses at Jamestown, from 30 July to 4 August. The Company
   created it to keep corporate control while giving colonists some
   self-government. Virginia became a royal colony in 1625.
 - By 1670 the vote for burgesses was limited to adult men who owned land.
   The lesson says "the men of Virginia elected burgesses" and does NOT say
   all of them could — see the flags below.
 - The House had been setting the tax rate since the seventeenth century and
   authorised payment of all claims against Virginia, which gave it leverage
   over the governor.
 - Governor Lord Dunmore dissolved the assembly in 1774 after it supported
   Boston; the burgesses reassembled independently and called the Virginia
   Conventions. (Encyclopedia Virginia, "House of Burgesses")

FLAGGED FOR HUMAN REVIEW — four things a checker cannot see:
 1. WHO COULD ACTUALLY VOTE. "Representative government" in 1619 Virginia
    meant landowning white men, and by 1670 that was written down. The lesson
    says "the men of Virginia" and the clearance asks about it directly
    (item c4). It does not dwell. Whether that is the right weight for Grade
    5 is your call, not a generator's — but a lesson that calls this
    "government by the people" without the qualifier is teaching something
    false, so the qualifier is in.
 2. THE SALARY FIGHT is compressed hard. "Colonial assemblies fought the
    Crown over fixed salaries for a century and mostly won" is true in
    outline and smooths over enormous variation between colonies. If you want
    one colony named instead of the generalisation, Massachusetts is the
    canonical fight.
 3. THE TRANSFER COLONY IS UNNAMED on purpose — "a third colony's records"
    rather than an invented name, after the Grade 4 note about invented
    people sitting badly next to real ones. The five records are the kinds of
    document that survive for proprietary colonies generally; they are not a
    specific archive. Flagged rather than dressed up.
 4. THE WHOLE FRAME assumes these two systems were in tension. They were —
    but Virginia's burgesses were also perfectly happy to be the King's
    subjects for a hundred and fifty years, and the lesson's last question
    goes at that directly rather than implying a straight line to 1776.

ART NEEDED (none exist):
  twoTables   — a long table of elected men; a desk with a royal seal on it
  beatRules   — Jamestown, 1619, twenty-two men in a church
  beatMoney   — a ledger, a hand holding a pen over a salary line
  beatSendHome— a governor's proclamation; men walking to a tavern
  ops         — an assembly room in 1750, three people standing
  (transfer runs as word chips, same as every other v3 lesson)
```

---

## SS-5-2B-V3-BR — Three Ways to Start a Country

```
Briefing SS-5-2B-V3-BR — Three Ways to Start a Country — PUBLIC pack, people shape.
Answer keys live only in SS-5-2B-V3-BR.server.js — never import that here.

GRADE 5 · TYPE 3 · TEKS 5.2B.

============================================================================
WHAT THIS ONE IS TESTING: A REQUIRED LIST LONGER THAN THE SHAPE
============================================================================
5.2B says **including** John Adams, Benjamin Franklin, Thomas Jefferson, the
Sons of Liberty, and George Washington. "Including" means all five are
REQUIRED. The teach has three rounds.

THIS IS THE SECOND TIME THIS HAS HAPPENED and it is now the clearest
recurring problem in the whole set. 4.6B had four regions and room to teach
two. 5.2B has five required entries and room for three. The shape has three
slots; Grade 5 standards routinely require five or six.

How this lesson handles it — and it is a workaround, not a solution:

  ROUNDS (the teach)        Adams · the Sons of Liberty · Jefferson
  contributionSynthesis     Franklin and Washington, one attribution each —
                            "suppose this person had not existed, what is
                            missing?", which is a real thinking task and not
                            a consolation prize
  trueFalseReason           all five again
  clearance                 Franklin and Washington directly

So all five are met and reasoned about; two of them are never a decision.
Whether that satisfies "including" is a judgment about the standard, and it
is yours.

FOR EMILY — THE THREE OPTIONS, because this will recur about twenty times:
  (a) Accept it. Three decisions, the rest through synthesis and clearance.
      Cheapest, and what this file does.
  (b) Four rounds at 24 minutes. The schema allows any number of rounds and
      `minutes` may go to 24, and MORE rounds actually gives you MORE word
      budget, since the budget is per screen. It costs four minutes of
      station time per lesson.
  (c) Split the standard across two briefings. Real coverage, double the
      build and review cost, and it collides with the 135-vs-90 question.

SECOND FINDING, smaller: **a group fits the shape fine.** `personName` is a
required string and nothing says it has to be an individual. Round two's
person is the Sons of Liberty, the round works exactly like the other two,
and the naming step is arguably sharper for it — "acted in a crowd" is a kind
of contribution that only a group can make.

============================================================================
teksText — verbatim 19 TAC §113.16(c)(2)(B), from teks/ss-teks-3-5.js.
============================================================================

============================================================================
HISTORICAL ACCURACY — verified Sept 16 2026
============================================================================
 - Boston Massacre trials: the loyalist merchant James Forrest approached
   Adams on 6 March 1770, the day after, on Captain Preston's behalf. Adams
   held that counsel "ought to be the very last thing that an accused Person
   should want in a free Country." Preston was tried 24–30 Oct 1770 and
   acquitted; the soldiers' trial began 27 Nov and ran nine days; six were
   acquitted, Hugh Montgomery and Matthew Kilroy convicted of manslaughter
   and branded on the thumb under benefit of clergy. In 1786 Adams wrote that
   the Massacre laid the foundation of American independence. (NPS)
 - Boston Tea Party: 16 December 1773; 342 chests of East India Company tea
   destroyed. (Britannica)
 - Franklin was in Paris from 1776, negotiated the 1778 treaties with France,
   and the French fleet and troops were decisive at Yorktown in 1781.
 - Newburgh, 15 March 1783: officers unpaid and talking about acting against
   Congress. Washington produced his spectacles to read a letter and said
   "Gentlemen, You will permit me to put on my spectacles, for I have not
   only grown gray but almost blind in the service of my country." The
   meeting collapsed in his favour. He resigned his commission in December
   1783. (National Constitution Center)
 - Frederick Douglass delivered "What to the Slave is the Fourth of July?" in
   Rochester on 5 July 1852, quoting the Declaration back at his audience.

FLAGGED FOR HUMAN REVIEW — five things a checker cannot see:
 1. ROUND 3 IS THE HEAVY ONE. It says that Jefferson wrote a claim about all
    people while enslaving people, and that Frederick Douglass later used the
    sentence against the country that produced it. Both are true and both are
    in the standard's orbit — 5.2B asks for motivations and contributions.
    It is handled in two sentences and it is not softened. Your call.
 2. THE TEA ROUND says "by most accounts nothing else was taken." That is the
    traditional account and it is what the participants claimed. I did not
    find a source solid enough to state it flatly, so the lesson says "by
    most accounts" and the server message repeats the hedge. Do not let it
    harden into a fact.
 3. ADAMS'S COST. He is widely said to have lost much of his practice over
    the case. I could not verify a figure, so the file says he expected it to
    end his practice, which is safe, rather than that it did.
 4. THE TRANSFER IS MERCY OTIS WARREN — real, and chosen after the Grade 4
    note about invented people sitting badly beside real ones. Her plays and
    her 1805 three-volume history are documented. The non-importation list is
    the kind of document that survives generally rather than one of hers, and
    the transfer invariant is the reason it is there at all. Same bend as
    Robertson's land register in SS-4-2E-V3-BR — that is twice now.
 5. THE DECISION STEP MARKS NOTHING CORRECT, as the type requires. Round one
    is the sharpest case for that rule in the whole library: defending the
    soldiers was right and it was also genuinely costly, and a student who
    would not have done it is not wrong, they are being honest.

ART NEEDED (none exist):
  thirteen    — thirteen colonies as thirteen separate desks
  beatLine    — a courtroom, a lawyer facing a hostile gallery
  beatHands   — a meeting house at night, a harbour beyond it
  beatWords   — a desk, a blank sheet, a summer window
  ops         — a committee room in 1775
  (transfer runs as word chips, same as every other v3 lesson)
```

---

## SS-5-20A-V3-BR — When It Was Made

```
Briefing SS-5-20A-V3-BR — When It Was Made — PUBLIC pack, category shape.
Answer keys live only in SS-5-20A-V3-BR.server.js — never import that here.

GRADE 5 · TYPE 4 · TEKS 5.20A · THE WRONG CALL VARIANT, HARD END.

============================================================================
WHY THIS STANDARD AND NOT AN EASIER ONE
============================================================================
The Grade 4 findings said roughly twenty of the thirty-five Type 4 standards
have no cost for misfiling, and proposed a second variant — WRONG CALL —
where somebody plans using the wrong category and the plan fails. 4.6A proved
it on physical regions, where a wrong call has an obvious price: a rice farm
near Amarillo dies.

5.20A is the other end of that range and the hardest case in the table.
Matching art, music and literature to periods has no plan to fail, no letter
to misroute, and nothing that breaks. If the variant survives here it
survives anywhere in Type 4. If it does not, those twenty standards need the
lighter Science-style format and the 135 number comes down.

IT SURVIVES, and the reason is worth having: **the cost is that somebody
believes something false.** A documentary opens with a poem as if it were an
eyewitness account. A textbook uses a painting as a photograph of empty land.
A class sings a song as its own that was written to mock them. In every case
the price of the wrong call is paid by whoever is watching, which is a real
price and one a fifth grader can feel — arguably more than a lost crop.

AND THE RULE IS THE BEST ONE IN THE LIBRARY. What the student names is:
**when it was made, not when it is about.** That single principle places a
work nobody taught them, which is exactly what Type 4's naming step is for —
and it is the thing that separates a source from a story about a source.

ONE NOTE ON BUNDLING: this rule is 5.20B's content ("explain how examples of
art, music, and literature reflect the times during which they were
created"). 5.20A and 5.20B are the clearest bundling candidate I have seen
after 4.6A/4.6B — they are one lesson pretending to be two.

============================================================================
teksText — verbatim 19 TAC §113.16(c)(20)(A), from teks/ss-teks-3-5.js.
============================================================================
**such as** — so the three named works are illustrative. This lesson uses all
three anyway, because they happen to be three different ways of getting the
period wrong, which is lucky rather than clever.

============================================================================
FACTUAL ACCURACY — verified Sept 16 2026
============================================================================
 - "Paul Revere's Ride": Longfellow visited the Old North Church on 5 April
   1860 and began writing the next day; first published in The Atlantic
   Monthly's January 1861 issue, released 20 December 1860. Documented
   departures from fact: Revere ORDERED the lantern signal rather than
   receiving it; he was rowed across the Charles rather than rowing himself;
   he did not reach Concord. Revere and William Dawes rode by different
   routes and were joined by Samuel Prescott, and only Prescott got to
   Concord. Scholars connect Longfellow's purpose to his abolitionism and to
   Northern urgency on the edge of the Civil War. (Wikipedia, "Paul Revere's
   Ride", and biography.com's 250th-anniversary pieces)
 - "American Progress": John Gast, 1872, commissioned by George Crofutt, a
   publisher of western travel guides; widely distributed as chromolithograph
   prints. Columbia wears "The Star of the Empire" and carries a telegraph
   wire and a school book; settlers move west by stagecoach, wagon and train;
   bison and Indigenous people run into the dark ahead of them.
   (Wikipedia, "American Progress")
 - "Yankee Doodle": the origin is genuinely obscure. What IS documented is
   that it was used satirically against the colonials who fought alongside
   British troops, that British forces played it heading toward Lexington and
   Concord, and that "doodle" meant a fool or simpleton. The attribution to
   a British army surgeon is TRADITION, not established fact. (Library of
   Congress, Patriotic Melodies)
 - Other works used: Common Sense, January 1776; Uncle Tom's Cabin, 1852;
   "Migrant Mother", Dorothea Lange, 1936; The Grapes of Wrath, 1939.

FLAGGED FOR HUMAN REVIEW — four things a checker cannot see:
 1. ROUND 3'S HONESTY. The Yankee Doodle origin is murky and the lesson says
    so out loud in its realWorld line rather than asserting an author. That
    is deliberate and it is also a slightly odd thing for a lesson to do.
    If you would rather it just taught the clean version, that is a content
    call — but the clean version is not supported by the Library of Congress.
 2. ROUND 2 SAYS AMERICAN PROGRESS IS A SALES PITCH. It is: a travel-guide
    publisher paid for it and it was sold as cheap prints. Saying so to a
    fifth grader means saying that a famous painting was advertising, and
    that the people and bison fleeing into the dark were part of the pitch.
    I think that is the standard's own point. Read it.
 3. THE DEPRESSION LEVEL is never the correct route in the teach — it is the
    answer to boundary case two and appears in the sort and the transfer.
    Same pattern as 4.6A's Great Plains and allowed for the same reason.
 4. BOUNDARY TWO says a 1936 government photograph is evidence of two things
    at once. That is true and it is the most sophisticated idea in the file.
    It may be a year early. Your call.

ART NEEDED (none exist):
  threeWorks  — a poem, a painting and a song sheet on one table
  beatMade    — a film crew, a poem being read over 1775 footage
  beatFor     — a textbook page, the painting filling it, a caption
  beatWhose   — a classroom singing; British drummers behind them
  ops         — a museum gallery with three blank labels
  (transfer runs as word chips, same as every other v3 lesson)
```

---
