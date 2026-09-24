# Maker Studio — Digital Design v1 (DRAFT for Emily's review)

**Sept 24, 2026.** The center where students *make something* and turn in the thing they made. One engine, several modes. **Exhibit mode comes first.** It replaces the old Museum Exhibit Builder / Field Dispatch plan, per Emily's call on Sept 24. This is a design note, and nothing is built yet. Status lives in `ClearCenters_STATE.md`.

---

## 1 · One sentence

Students get a job, like "build an exhibit that proves…". They choose from a storage room of images, data, passages and objects, leave the weak and wrong pieces out on purpose, arrange a wall, write why each piece earned its spot, and write the exhibit plaque. **The turn-in is the finished exhibit**, which shows up in a class gallery and prints as a poster.

---

## 2 · Why this is a center, not a game

Emily's test (Sept 24): a center ends with **something to show for it**. Kids usually do this hands-on. Here it's digital, but the skill practice stays real. Exhibit mode passes that test because:

- **The product is the proof.** A teacher can look at the wall and see what the student understood. Did they pick the photo that actually shows the adaptation, or just the cute one?
- **Choosing is graded before any writing happens.** The picks are checked by rules (free and instant), so the writing doesn't carry the whole grade.
- **It works in all four subjects.** Science and Social Studies curate evidence. ELAR curates quotes from a text. Math curates representations and worked examples, and the traps are the classic mistakes (§6).

---

## 3 · Why one engine for exhibit *and* the later build modes

Every Maker Studio mode is the same shape underneath:

> a job with a spec + a toolkit or storage room + a canvas the product is built on + rules the finished product must pass + a gallery.

Exhibit mode's canvas is a museum wall. Later modes use a graph, a diagram, a blueprint grid, comic panels, a trading card or a shop counter (§11). They all share one gallery, one print layout, one teacher view and one grader. It's the same idea as Assembly Deck's four modes and Territory Builder moving into map mode.

**The rule this engine lives by:** a new case is a data file plus an image list. If a case needs its own component, the case is wrong for this engine.

---

## 4 · Exhibit mode — student flow (~20 minutes)

1. **The commission.** Someone on the station asks for an exhibit, in three or four lines of station voice. **It always poses one driving question**, and the plaque is the student's answer to it. It names who it's for ("the new cadets," "second graders visiting Friday") and what the exhibit has to **prove or show**. The commission stays reachable on every screen. S.A.M. is on screen throughout.
1.5. **Pick your hall** (§4.5). The student chooses the museum hall they'll build in, names the exhibit, and picks a wall color.
2. **The storage room.** 8–10 items laid out as cards: photos, maps, data tables, short passages, quotes, object pictures, and for math, models and worked examples. Every card has a title and a one-line tag. Tapping a card opens it large. Nothing is marked as good or bad.
3. **Curate.** Drag (or tap-then-tap) items onto the wall. The wall size is set by grade (Emily, Sept 24): **grade 3 = 4 pieces, grade 4 = 5, grade 5 = 6.** The case can also name **one spot** as the centerpiece, "the piece that most proves the point" (still an open decision, §13).
4. **Reject one on purpose.** Museum Exhibit's best idea is kept. Students drag one item to the **"Not in this exhibit"** bin and pick why it doesn't belong: *doesn't prove the point · wrong place or time · a myth or mistake · misleading picture · true but off-topic*. (These reason chips work the same way as Assembly Deck's leftover reasons.)
5. **Check the wall.** One button. The picks are graded against the key right away. A wrong pick comes back to storage with a one-line reason. **Attempt 2 is allowed.** If it's still wrong, the strongest set is shown instead, so no one gets stuck. (Same rule as Assembly Deck.)
6. **Arrange.** Only when the case calls for it: put the wall in an order that makes sense to a visitor, like the order events happened, cause before effect, or simplest model first. The check is feedback, not a lock.
7. **Placards.** One short placard per wall item: **why this piece earned its spot**. Grade 3 gets a sentence stem ("This shows ___ because ___"). Grades 4–5 write freely against visible criteria.
8. **The plaque.** The big exhibit description at the entrance, 3–5 sentences, grade-banded. It states what the exhibit proves and how the pieces prove it together.
9. **Grand opening.** The finished exhibit renders as a museum wall: the plaque, the pieces in order, each with its placard. It goes to the class gallery and can print as a poster. The person who commissioned it writes back, in one of three tiers based on the actual scores (the Assembly Deck pattern). Crystals are awarded.

---

## 4.5 · Pick your hall (the "fun, let's create" part, Emily Sept 24)

Before curating, the student **picks a museum hall** to build in. Each hall has its own look and its own arrangement of display spots: pedestals, frames, glass cases, a hanging banner. This is where students get to be creative, while the rigor stays fixed:

- **The number of spots never changes** (grade 3 = 4, grade 4 = 5, grade 5 = 6), whichever hall they pick.
- **The exhibit type still sets the shape.** A Then to Now case always gets its spots in a readable order, and a Side by Side case always gets two sides and a "both" spot. Each hall defines where its spots sit **for each of the five types**, stored as data (percentage positions, like Assembly Deck's map zones). A new hall is an image plus five small spot maps, not new code.
- **Only the look is the student's choice.** What goes on the wall, and why, is still graded the same way.

**Skeletons and skins (confirmed with Emily, Sept 24).** Halls are built in two layers:
- A **skeleton** is the layout: where the spots sit, stored as data. Each skeleton has a version for each of the five exhibit types, and it automatically spreads the spots for a 4-, 5- or 6-piece wall.
- A **skin** is the look around it: the room image.

**The engine draws the display stands itself** (pedestals, frames, glass cases, labels) on top of the skin. The skin is only the room behind them. So any new room image fits any skeleton without lining art up to exact spot positions. **Adding a hall later means adding one image, with no code.** Adding a new *layout* is one small data file.

**Starter halls** (Wave 1 ships three): the Space Station Gallery (the ClearCenters theme), the Grand Stone Museum (columns and marble), and the Nature Dome (glass and plants). Later ideas: an underwater hall, a castle hall, a Texas ranch barn.

**Decorations with crystals.** Students can place cosmetic extras like plants, lamps, rope barriers or a welcome mat, **bought with Crystal Points** through the existing Gear Locker. That gives crystals something fun to buy and makes each exhibit look like its maker. Decorations never cover a display spot and are never graded.

**Plus the small touches from §10.5:** the student names the exhibit and picks a wall color.

---

## 5 · What's in the storage room (the authoring recipe)

**Storage room size by grade.** There is always **one more strong item than the wall holds**, so even a student who dodges every trap still has to judge which strong piece to leave out.

| Grade | Wall | Strong | True but weak | Traps (myth, wrong place, not-what-the-standard-asks, misleading picture) | Total cards |
|---|---|---|---|---|---|
| 3 | 4 | 5 | 1 | 3 | **9** |
| 4 | 5 | 6 | 1 | 3–4 | **10–11** |
| 5 | 6 | 7 | 1–2 | 4 | **12–13** |

Every case uses the same mix, which is what makes the curating real thinking:

| Item type | How many | What it is | Example (grade 3 desert adaptations) |
|---|---|---|---|
| **Strong** | 4–5 | Clearly proves the point | Fennec fox's huge ears, which let heat escape |
| **True but weak** | 1–2 | Accurate and related, but proves less than a strong item | A desert landscape photo with no animal in it |
| **Myth / mistake** | 1 | A common misconception, presented convincingly | "Camels store water in their humps" (they store fat) |
| **Wrong place** | 1 | A real adaptation, but for a different environment | A duck's webbed feet |
| **Not what the standard asks** | 0–1 | True and on-topic, but not the *kind* of evidence the standard names | "Kangaroo rats get water from the seeds they eat" (true desert survival, but not a body part you can see) |
| **Misleading picture** *(optional)* | 0–1 | An image that looks like proof but isn't | A cartoon lizard wearing sunglasses |

The key names which items belong on the wall, which one is the centerpiece, and a one-line reason for every item. **The myth card is the heart of each case.** It's the trap the class-level report tracks (§9).

---

## 6 · Making it work for math (Emily: "we might have to tweak it")

In math, the storage room holds **representations and worked examples** instead of photos and passages. The exhibit proves a math idea, and the traps are the mistakes kids actually make.

**Example (grade 4, comparing fractions, 4.3D, verified).** *"The Hall of Which Is Bigger: prove to visiting cadets that 3/4 is greater than 2/3."*
- **Strong:** two same-size fraction bars, one shaded 3/4 and one shaded 2/3 · a number line with both fractions marked · 9/12 vs. 8/12 using common denominators · a benchmark card ("3/4 is 1/4 from one whole; 2/3 is 1/3 from one whole")
- **Myth / mistake:** "Thirds are bigger than fourths, so 2/3 wins"
- **Misleading picture:** 2/3 of a **large** pizza next to 3/4 of a **small** pizza (the wholes aren't the same size)
- **Wrong place:** a correct model of 3/4 = 6/8 (true, but it doesn't compare to 2/3)

**Math tweaks to the flow:**
- The **centerpiece** is the model that makes the proof clearest.
- The **reject reasons** add two math-only chips: *the wholes aren't the same size* · *the parts aren't equal*.
- **Placards** ask "What does this model show about the two fractions?" instead of "Why did you choose it?"
- The **plaque** has to state the answer *and* how the models prove it. That's the "represent and justify" work that math standards ask for.

The build modes (§11) cover the math that is about *constructing* rather than choosing, like drawing the graph or building the area model.

---

## 7 · Sample cases, one per subject (standards already in the verified log)

> **Superseded by the full table (Sept 24):** `MakerStudio_Exhibit_Table_of_Possibles.md` has 60 example exhibits (5 exhibit types × 4 subjects × 3 grades), the five types (Prove It, Side by Side, Then to Now, Every Kind, Portrait), and the rule that **every exhibit answers one driving question and the plaque is the answer**. The sketches below are kept for history.

These are sketches for Emily's reaction, not authored cases. All four codes are already logged in `lib/cases/TEKS_STANDARDS.md` as checked against her PDFs.

**Science, grade 3: 3.13A (external structures and survival).** *"Built for the Desert."* **Fully drafted:** see `MakerStudio_Case_3-13A_DRAFT.md`. The commission comes from the Nature Deck curator, for cadets moving to a desert planet. Strong: fennec fox ears, camel's wide flat feet, a horned lizard's sand-colored skin, a roadrunner's long legs. Myth: camel humps store water. Wrong place: duck's webbed feet, polar bear's thick fur. Arrange: not graded.

**Social Studies, grade 4: 4.3A (Texas Revolution).** *"Why Texas Fought."* The commission is for Texas History Day. The storage room has short primary-source excerpts, a map and a timeline card. At least one decoy is an **effect** of the revolution presented as a **cause**. Arrange: **graded**, cause before effect.
*This code was also used in Signal Check's 4.3A case, which is about the Alamo. The exact topic line must be re-checked against the Social Studies PDF before authoring.*

**ELAR, grade 3: 3.7C (use text evidence to support a response).** *"Meet Rosa."* The commission is a character exhibit for the class library, built around one short original story. The storage room holds quotes from the story. Strong: lines that show Rosa's trait through what she does. Weak: lines that mention Rosa but show nothing about her. Wrong place: a line about a *different* character. Myth: a line the story never says ("Rosa was always brave"), phrased as if it were a quote. The plaque names the trait and points to the quotes. *(Grade 3 has no character-trait standard, so the case grades evidence choice, the same call Emily made for Mission Map's 3.13-MM.)*

**Math, grade 4: 4.3D (compare fractions).** *"The Hall of Which Is Bigger."* See §6.

Other good fits from the verified log: 5.12B food web changes, 5.13B instinct vs. learned behavior, SS 5.4C Lewis and Clark, SS 4.6B Texas regions, ELAR 4.8A theme, ELAR 5.7B comparing across sources, Math 3.7A fractions on a number line, and Math 5.9C data displays.

---

## 8 · Images: a shared, tagged image bank (Emily, Sept 24)

Emily's point: the site already has a lot of generated images, and the bank will keep growing. So cases should **pull from a shared bank grouped by topic** instead of each case ordering its own art.

**What's already there (counted Sept 24).** About 820 images in `public/`, and **roughly 500 of them are content images**: 385 in `public/cases/`, 47 Signal Check field reports, 32 Mission Map maps, and 61 Briefings scenes. The rest are icons, badges and UI art. They're already named by standard code (for example, `cases/3-13A.jpg`, `3-13A-SC.jpg`, `3-13A-SD.jpg` are three pictures on 3.13A). So **a first "group by topic" costs almost nothing**: the file name already says the standard. A spot check found realistic, high-quality images that work as evidence cards. Some are split-screen comparisons (mole claws beside rabbit legs), which work as comparison pieces.

**How the bank works**
1. **Every image gets a short record:** file, subject, standards, topic tags, a one-line "what it shows," style (photo / illustration / map / diagram), and a `trapOnly` flag.
2. **Most of the "what it shows" lines can be pulled from text we already wrote.** Signal Check field reports have captions and notes, and case files describe their scenes, so the tagging pass is mostly automatic, plus a human look at each image.
3. **A case picks cards from the bank by id.** New art is only ordered when the bank has a gap. The sample case (`MakerStudio_Case_3-13A_DRAFT.md`) reuses 2 bank images and orders 5 new ones, and every new image goes *into* the bank with tags, so the next case costs less.
4. **Trap images are special.** A misleading picture (the big-pizza / small-pizza fraction trap) or a myth poster is made on purpose to fool. It's flagged `trapOnly` so it never shows up as a *real* evidence piece in another case.
5. **New art spec, same as before:** must show / must NOT show / style / tags, in the batch style of `RelayStation_Art_Batch_v1.md`.

**Where this could go later (not Wave 1):**
- **A browsable bank on the site, grouped by topic.** Teachers could see every image on "adaptations" or "Texas Revolution" in one place.
- **Teacher-built exhibits.** A teacher picks a prompt and 8–12 images from a topic shelf and makes their own exhibit case. The bank is what makes that possible.
- **Open-shelf mode for grade 5.** Instead of a fixed storage room, students browse a whole topic shelf. This needs rule-based grading from the tags ("must show an external structure of a desert animal") rather than a fixed key, so it's a later wave.

**Facts must be real** (convention #8). Anything that makes a factual claim, like the camel's hump, gets a source line in the case header. Data, passages and quotes are text cards written directly in the case file and gated for reading level like everything else.

---

## 9 · Grading: AI first reader, teacher releases (same as every CC assignment)

Maker Studio uses the **exact flow every ClearCenters assignment already uses**. Nothing new is invented:

1. **The student submits.** The server re-grades everything from the wall the student sent, so nothing can be faked in the browser (the Assembly Deck pattern).
2. **The rule-checked parts are scored instantly and free.** No AI is needed for these.
3. **One AI call reads the writing,** placards and plaque together, and returns:
   - a **suggested Level 0 / 1 / 2** (teacher only),
   - a **one- to two-sentence rationale** (teacher only),
   - **a note on each placard** (teacher only),
   - **two glows and one grow**, written to the student.
4. **The submission lands in the teacher's queue** (`submissions`: `ai_score`, `ai_rationale`, plus one new `maker_studio_data` jsonb column for the wall).
5. **The teacher reviews and decides.** On the existing review page, she can **release a grade** (Level 0/1/2 plus feedback; Crystal Points are awarded on release, as now) or **send it back for revision** with a note. Students never see the AI's level or rationale, only what the teacher releases (principle: teacher is scorer of record).

If the AI call fails, the student's work is still saved and the teacher grades it by hand (the Assembly Deck rule: "an AI failure never costs the student their work").

### 9.1 · What the AI's suggested Level means

The Level combines the rule-checked wall with the AI's read of the writing, so a well-written plaque on a wall full of traps can't earn a 2.

| Level | The wall (rule-checked) | The writing (AI-read) |
|---|---|---|
| **2** | No trap on the wall; the reject-bin reason is right | Every placard **connects its piece to the driving question** (not just describes the picture); the plaque **answers the question** and names pieces from the student's own wall |
| **1** | At most one trap on the wall, **or** a weak piece chosen over a strong one | Most placards connect; the plaque answers the question but thinly, or doesn't use the wall |
| **0** | Two or more traps, or the myth kept on the wall | Placards only describe or copy the card; the plaque doesn't answer the question or repeats the misconception |

The AI is given the commission, the driving question, the student's actual wall (with each piece's role from the server file), the placards, the plaque and the case's `mustInclude` list. It is told the wall's rule-checked result, so it can't overrule it.

### 9.2 · What the student sees before submitting (rigor without giving answers away)

- **The wall check** (step 5) shows which pieces came back, with a one-line reason, and allows **attempt 2**. It never labels a card as a trap *before* the student commits.
- **A "copied the card" guard.** If a placard mostly repeats the card's own text, S.A.M. asks for "your own words about why it answers the question" before the student can move on. This is a simple word-overlap check, with no AI cost.
- **Glows and a grow** come back after submission, with no score.

### 9.3 · Send back for revision

**Simplest build (recommended for Wave 1):** a sent-back exhibit reopens **with everything unlocked and the student's work still in place.** The wall, the reject bin, the placards and the plaque are all editable. The teacher's note tells the student what to fix, and they change only what they need to. There's no locking logic to build or test.

*Later, if teachers ask for it:* a choice on the send-back screen ("unlock: writing only / wall only / both"). It's a small add, but not needed on day one.

---

## 9.5 · Real data for the teacher

**On each submission (the existing review page, with a Maker Studio view added):**
- The exhibit shown the way the student built it: the wall, the reject bin and its reason, each placard with the AI's note beside it, and the plaque.
- The rule-checked results: strong pieces chosen, traps avoided, reject reason, order (Then to Now), sides (Side by Side), and attempt 1 vs. attempt 2.
- Time on task, and whether the "copied the card" guard fired.

**Across the class ("What Fooled Us," the report only this engine can produce):**
- **Trap pick rate:** "14 of 22 put the camel-hump myth on the wall." That's tomorrow's mini-lesson.
- **Skipped strong piece:** the strong card the class left out most, which usually means they didn't understand it.
- **Reject-bin reasons:** a confusion chart like Assembly Deck's Sentence Sort board. Did they call the myth "wrong place"? That's a different mistake from calling it "doesn't prove the point."
- **Weakest placard skill:** the share of placards that only *describe* instead of *connect*.

**Per student, across cases, three error patterns that call for different fixes:**
| Pattern | What it looks like | Suggested next step |
|---|---|---|
| **Believes the myth** | keeps putting trap cards on the wall | a Signal Check case on the same standard |
| **Picks weak evidence** | avoids traps but chooses weak or off-target pieces | re-teach "which piece proves it best"; a Mission Map case |
| **Can't connect** | good wall, placards only describe | sentence-stem practice; an Assembly Deck paragraph build |

These feed the existing standards report (keyed by `cases.standard`) and the suggested-next-step system, the same way the other engines do.

**Printing:** each finished exhibit prints as a poster, and the class gallery prints as a booklet. The teacher's gallery also works on the existing "Present to Class" screen.

---

## 9.6 · The Class Museum (a "virtual field trip," a teacher option)

When the teacher assigns Maker Studio, she can turn on **Class Museum**. Students know up front that their exhibit will be part of a class museum everyone gets to visit.

**How it works**
1. **The teacher builds a museum** when assigning: she names it ("Room 12's Texas History Museum") and picks one or more exhibit cases for it.
2. **Different topics to different kids or groups.** The assignment page can already send an assignment to specific students (`assignment_students`). The teacher gives *The Texas Revolution* to one group, *Longhorn Boom* to another, *Meet Stephen F. Austin* to a third, and so on. Each case becomes a **wing** of the museum.
3. **Exhibits go on display only after the teacher releases them.** Nothing appears until she's graded it, so no unreviewed work is shown to the class. She can also hold one back.
4. **Opening day.** The teacher presses "Open the museum." Students take the field trip: they flip wing to wing and exhibit to exhibit, see each classmate's hall, wall, placards and plaque, and leave **stickers only** (⭐ 💡 ❓), if the teacher allows stickers.
5. **The museum lives on.** It works on the existing "Present to Class" screen, and the whole museum can print as a booklet.

**Museum sets are built from tags (Emily, Sept 24: "that could almost be done by topic/standard").** Every case carries its standard plus one or two topic tags ("Texas History," "Adaptations," "Fractions"). A ready-made set is just a saved tag filter, like "Grade 4 · Texas History," so new cases join the right museum automatically when they're added. Teachers can also build a custom museum by picking any cases they want.

**Museum sets (content packaging for this).** For teachers who want a ready-made museum, the table of possibles can be grouped into **themed sets**: several related cases across standards that make a good museum together. Examples: *Survival Wing* (3.13A animals, 4.13A plants, 5.13B behaviors), *Texas History Hall* (4.2E Austin, 4.3A Revolution, 4.4B cattle, 4.8A changing the land), *Fractions Gallery* (3.3G, 4.3D, 5.3H).

**What's easy and what's bigger**
- **Easy:** individual exhibits grouped into wings by case, the release gate, the field-trip viewer, and stickers. It all reads data we already save.
- **Bigger (later, only if wanted):** a *group* building **one** shared exhibit together from several devices at once. That needs live co-editing, which is a much larger build. For Wave 1, a "group" means either each member builds their own exhibit in the same wing, or the group shares one device and submits one exhibit.

## 9.7 · Teacher options on the assignment page

Every option below is a **checkbox the teacher sets when she assigns**, stored on the assignment (the same way the Distress Call target already is):

| Option | Default | What it does |
|---|---|---|
| **Class Museum** | off | Adds released exhibits to a class museum and turns on the field trip (§9.6) |
| **Gallery stickers** | on when Class Museum is on | Classmates can leave ⭐ 💡 ❓ on each other's exhibits (no typing) |
| **Quick release** | off | Adds a "release at the AI's suggested level" button for submissions the teacher has looked over; flagged ones (AI error, copied-card guard, low AI confidence) always need a full read |
| **Curator's Challenge allowed** | on | Lets students opt into the harder run |
| **Decorations** | on | Lets students spend crystals on hall decorations |

---

## 10 · Reused infrastructure

Crystals, S.A.M. on every screen, requester write-back tiers, the Distress Call adapter, standards reports, `public`/`server` case split (`lib/cases/maker-studio/<CODE>-MS.public.js`), teacher assign tile, reading-level gate tool, and the submissions table with one new jsonb column for the wall state. Nothing new is invented except the wall canvas, the gallery and the print view, and every later mode reuses those.

---

## 10.5 · What keeps it easy to build, fun, and rigorous

### Easy to build
1. **One "slots" model covers all five exhibit types.** A wall is just a list of spots with labels: plain spots (Prove It), left / right / both (Side by Side), numbered spots (Then to Now), plus "tricky one" (Every Kind), and center plus surrounding (Portrait). It's the same idea as Assembly Deck's slots. Five types means five small layouts, not five engines.
2. **Reuse, don't invent.** Tap-then-tap placement, check, attempt 2, S.A.M. on every screen, requester write-back tiers, the submit-route pattern, the teacher review page, release and send-back, Crystal Points on release, the Distress Call adapter, and the standards reports.
3. **A case is a data file.** Public file (cards, commission, layout) and server file (roles, reasons, `mustInclude`, `aiContext`), split the usual way so the answer key never reaches the browser.
4. **A case checker tool from day one** (`tools/maker-studio-casecheck.cjs`, like Mission Map's). It checks: one more strong card than the wall holds, every card has a role and a reason, trap counts are right, the public and server files agree, every image path exists in the bank, and every math piece draws.
5. **The reading-level gate** (`tools/maker-studio-gradecheck.cjs`) on every card, prompt and reply.
6. **A simulation harness** that plays a full student run, including a messy first attempt, before anything goes live (the `sim/assembly.cjs` pattern).
7. **Wave 1 math pieces are limited to four drawn kinds:** fraction bar, number line, table, and simple bar/line graph. More kinds come later.
8. **The image bank starts as a simple list file** (`lib/maker-studio/imageBank.js`: file, standard, tags, what it shows, `trapOnly`). A browsable bank page comes later.

### Fun (all data, no new screens except the gallery)
- **Name your exhibit.** The student titles it and picks a wall color. Small, but it makes the exhibit theirs.
- **Myth Buster bonus.** Putting the myth card in the reject bin *with the right reason* earns bonus crystals and a S.A.M. reaction. It turns spotting the trap into the fun part.
- **The trap cards talk back** (from Assembly Deck): when rejected, the myth card protests in its own voice ("But everyone *says* camels store water!"), and S.A.M. answers it.
- **Grand opening.** The wall "opens" with a ribbon-cutting moment, and the requester writes back in one of three tiers.
- **Gallery stickers.** Classmates can leave a sticker (⭐ 💡 ❓) on each other's exhibits, **stickers only, no typing**, so there's nothing to moderate.
- **Curator's Challenge** (opt-in, harder): card tags hidden, one extra trap, no attempt 2. +3 💎.
- **Curator ranks.** Finished exhibits count toward a Curator badge track (Junior Curator → Chief Curator).

### Rigor
- **Every piece is judged against one driving question.** The placard has to *connect* the piece to the question, not describe the picture.
- **The traps are real misconceptions,** not silly wrong answers (§5).
- **The reject bin needs a reason**, and the reason is graded.
- **The plaque must use the student's own wall.** The AI checks that the pieces it names are actually on it.
- **Grade-banded writing:** grade 3 uses full sentence stems, grade 4 uses a starter phrase, grade 5 writes freely.
- **No answers before commitment:** a card is never labeled a trap until the student has committed to a wall.
- **Colleague approval gate** before any case reaches students (existing rule).

---

## 11 · Later modes (same engine, same gallery)

Each needs a **structured canvas** (snap grid, fixed spots, set axes) so the product can be checked. No freehand drawing.

| Mode | Kids make | The app checks | Best for |
|---|---|---|---|
| `graph` | A table and a bar graph / dot plot / stem-and-leaf | Scale, labels, every bar | Data standards in all grades |
| `diagram` | A food web, water cycle, life cycle, circuit | Arrow direction, missing parts, labels | Science models |
| `blueprint` | A floor plan to a spec | Area, perimeter, volume match the job order | Measurement |
| `comic` | A 4–6 panel sequence | Event order, key details, dialogue punctuation | ELAR, history, word problems |
| `card` | A trading card or field-guide page | Facts, required traits | Science, SS, geometry |
| `shop` | A price list, receipts, a profit report | Totals, change, profit/loss | Money and personal finance |

**Suggested order:** exhibit → graph → diagram, then the rest based on classroom feedback.

---

## 12 · Build waves

1. **Wave 1: engine + `exhibit`.** Storage room, wall, check, reject bin, arrange, placards, plaque, grand opening, gallery, print view, submit route, teacher tile, "what fooled us" report. **Four cases, one per subject** (§7), plus their image lists. The first one is fully drafted in `MakerStudio_Case_3-13A_DRAFT.md` as the model for the rest. **Also in Wave 1:** three starter halls (§4.5), the teacher options on the assignment page (§9.7), and the Class Museum field trip (§9.6). Decorations bought with crystals can follow in Wave 2 if time is tight.
2. **Wave 2:** 12 more exhibit cases (4 per grade across subjects), after Emily reacts to the first four in a real classroom.
3. **Wave 3: `graph` mode.**
4. **Wave 4: `diagram` mode.**

The same process applies: propose → Emily approves → content locked → build → verify by simulation → present. Standards are checked against the PDFs before any case is authored.

---

## 13 · Open decisions for Emily


1. **Name.** "Maker Studio" for the engine and "Exhibit Hall" for this mode? Or something from the station, like "The Archive Deck"?
2. ~~**Wall size.**~~ **Decided Sept 24: grade 3 = 4, grade 4 = 5, grade 5 = 6.**
3. **Centerpiece.** Keep the "one piece that proves it most" spot? It adds a nice judgment call, but it's one more thing to grade.
4. **Grade 3 writing.** Are stem placards plus a 3-sentence plaque the right load, or should the plaque be a stem too?
5. **Arrangement.** Graded only when order matters (history, processes)? Or always, as "does this make sense to a visitor"?
6. **Printing.** One poster per student, or a class "museum" booklet?
7. **Field Dispatch.** Confirm it's retired from the build list and replaced by Maker Studio. Should Maker Studio move ahead of Classification Lab and Repair Desk?
8. ~~**Send-back scope.**~~ **Decided Sept 24:** Wave 1 reopens everything with the student's work in place (simplest); a writing/wall choice can come later.
9. ~~**Gallery stickers.**~~ **Decided Sept 24:** a teacher option, tied to the Class Museum (§9.6, §9.7).
10. ~~**Paper companion.**~~ **Decided Sept 24:** not now. No challenge type has one yet; it is far down the road, if ever.
11. ~~**Quick release.**~~ **Decided Sept 24:** a teacher checkbox on the assignment page (§9.7).
12. **Starter halls.** Are the Space Station Gallery, Grand Stone Museum and Nature Dome the right first three?
13. **Museum sets.** Should the first ready-made museum be a Texas History Hall (Grade 4 SS) or a mixed-subject Survival Wing?

---

## 14 · More options (Sept 24): must-haves and extras

**Decided Sept 24 (Emily):** Wave 1 includes items **1, 2, 3, 4, 6, 10 and 11**. Items 5, 7, 8, 9, 12, 13 and 14 are later waves.
- Item 10 (confidence check) runs on **every submit**, including a resubmit after a send-back. The teacher sees how confidence changed between tries.
- Item 11 (My Museum) is in Wave 1, so every released exhibit is saved to the student's own museum from day one.

### Must-haves (build these into Wave 1)
1. **A generator-ready case spec.** Before cases go through Emily's generator, it needs one exact list of fields to output: commission, driving question, exhibit type, cards with role and reason, `mustInclude`, `aiContext`, the image list, topic tags, two S.A.M. hints, and the three database fields (`learning_target`, `lesson_summary`, `misconception_note`, the Signal Check checklist rule). The checker tool (§10.5) then validates every generated case before a human reads it.
2. **Moderation before the museum.** Student text (exhibit title, placards, plaque) will be seen by classmates. The teacher's release is the main gate. Add a simple word filter on the title and placards as a second net, so nothing slips through a quick release.
3. **"Did they read it?" data.** The engine records which cards a student opened before choosing, and how often they moved a piece on or off the wall. It costs nothing and tells a teacher the difference between "read everything and chose wrong" and "guessed without reading."
4. **Card text doubles as alt text.** The image bank's "what it shows" line is read aloud and used by screen readers, so every picture is accessible by default.
5. **Read-aloud everywhere,** using the same speech helper Relay Station uses: the commission, every card, and the student's own plaque.

### Extras (6, 10 and 11 are in Wave 1; the rest come later)
6. **Audio guide.** In the Class Museum, a "▶ Listen" button reads the student's plaque aloud in a museum-guide voice (text-to-speech). Nothing is recorded, so there's no privacy issue, and the museum feels real.
7. **Field-trip scavenger hunt.** When the museum opens, each visitor gets a few questions about classmates' exhibits ("Which piece shows how the fox stays cool?"). The answers are checked against that exhibit's own wall. This turns browsing into active learning and gives the teacher field-trip data.
8. **Bring your own artifact** *(this connects hands-on centers to digital)*. A student photographs something they made at a hands-on center, like a clay model, a drawing or a poster, and places it as one piece of the exhibit. It's a teacher option and teacher-approved, with a no-faces rule. This is a later wave, but it's the bridge between the paper/hands-on world and this center.
9. **Spanish support for emergent bilinguals.** A toggle shows the commission and cards in Spanish (and reads them aloud in Spanish). Students may write placards in Spanish or English; the AI first reader can read both. This matters a lot in Texas classrooms.
10. **Per-student supports.** This reuses Relay Station's Supports editor: fewer cards, stronger sentence stems, and read-aloud on by default for students who need it. The grading rubric stays the same.
11. **Confidence check at submit.** "How sure are you?" (😕 🙂 😄), the same as Group Chat. The teacher sees confidence beside the level, and "very sure but Level 0" is a flag worth a conversation.
12. **My Museum (a year-long portfolio).** Every released exhibit is saved to the student's own museum, so by May they can walk through their year. It's great for conferences and end-of-year showcases.
13. **Family share link.** Read-only, first names only, teacher-controlled. The app already has a share-link system for reports (`reports/shared/[token]`), so this reuses it for a "museum night" at home or on a school screen.
14. **Voice typing** for placards, for students who can think it but struggle to type it. It uses the browser's built-in speech-to-text, so it's cheap to add.

