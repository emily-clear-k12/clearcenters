# Maker Studio · Exhibit mode · Sample case (DRAFT)
## SCI.3.13A-MS — "Built for the Desert"

*Sept 24, 2026. A fully written sample case for Emily's review, the model for every exhibit case after it. Nothing here is built.*

**Standard (checked Sept 24 against Texas Gateway, S.3.13.A):** "explore and explain how external structures and functions of animals such as the neck of a giraffe or webbed feet on a duck enable them to survive in their environment."
**Grade 3 · wall of 4 · storage room of 9 · ~20 minutes.**

---

## 1 · The commission (what the student reads first)

> **From: Dr. Reyes, Nature Deck**
> New cadets move to the desert planet Dune-7 next week.
> It is hot. The ground is sand. There is very little water.
> Build an exhibit with **4 pieces**.
> Each piece must show **a body part** that helps an animal live in the desert.

S.A.M.: *"Look close, Cadet. Some of these cards are tricky."*

---

## 2 · The storage room (9 cards)

Every card has a title, a picture or text, and one short line. Students never see the "role" column.

| # | Card | Picture | Card text (grade 3) | Role | Why (shown after the check) |
|---|---|---|---|---|---|
| 1 | Fennec Fox Ears | **NEW** | Big ears let heat leave the fox's body. | **Strong** | Ears are a body part, and they help the fox stay cool in desert heat. |
| 2 | Camel Feet | **NEW** | Wide, flat feet do not sink into sand. | **Strong** | Feet are a body part built for walking on sand. |
| 3 | Camel Eyelashes | **NEW** | Two rows of long lashes keep sand out of its eyes. | **Strong** | Lashes are a body part that protects the eyes in sandstorms. |
| 4 | Horned Lizard Skin | **NEW** | Sand-colored skin makes it hard for hawks to see. | **Strong** | Skin color is a body part that helps it hide on sand. |
| 5 | Roadrunner Legs | **NEW** | Long legs let it run fast on hot ground. | **Strong** | Legs are a body part that helps it catch food and get off the hot sand fast. |
| 6 | Desert Day | **BANK:** `cases/5-13A.jpg` | A desert with a tortoise, a roadrunner, and a kangaroo rat. | True but weak | It shows the desert, but the animals are too small to see any body part up close. |
| 7 | Camel Fact Poster | Text card | "Camels keep water in their humps!" | **Myth** | Not true. A hump holds fat, not water. |
| 8 | Duck Feet | **BANK:** `cases/3-13A.jpg` | Webbed feet push through water. | Wrong place | A real body part, but it helps in a pond, not a desert. |
| 9 | Kangaroo Rat Snack | Text card | It gets water from the seeds it eats. | Not a body part | True desert fact, but it is about food, not a body part you can see. |

**Key:** any 4 of cards 1–5. Card 6 is allowed but is weaker (it counts as a miss on "strongest set" but not as a trap). Cards 7, 8 and 9 are traps.
**Centerpiece (if Emily keeps it):** any strong card is accepted. S.A.M. names which card it would have picked and why, with no penalty.
**Arrangement:** not graded for this case.

**Reject bin (pick one card and a reason):**
*It doesn't prove the point · Wrong place · A myth or mistake · Misleading picture · True, but not what the job asks*
Best answers: card 7 → *myth*, card 8 → *wrong place*, card 9 → *not what the job asks*. Card 6 → *doesn't prove the point* also counts.

---

## 3 · Placards (one per wall piece, grade 3 stem)

> **The ______ has ______. This helps it live in the desert because ______.**

What S.A.M. looks for (shown to the student):
1. Names the animal **and** the body part.
2. Says what the body part does.
3. Connects it to a desert problem: heat, sand, or little water.

*Example (not shown to students):* "The camel has wide, flat feet. This helps it live in the desert because its feet do not sink in the sand."

---

## 4 · The plaque (3 sentences)

> **Write the sign for the front of your exhibit. Tell visitors what your exhibit shows.**
> Start with: *"Desert animals have body parts that…"*

`mustInclude` (server):
1. Says that body parts help animals survive (live) in the desert.
2. Uses at least one example from the student's own wall.
3. Names a desert problem the body parts solve (heat, sand, or little water).

---

## 5 · S.A.M. hints (per the hints.js rules: point, never answer)

1. "The job says **body part**. Can you point to the body part on every card you picked?"
2. "Is every animal on your wall a **desert** animal? Check where each one lives."

---

## 6 · Dr. Reyes writes back (three tiers, chosen by score)

- **Strong:** "The cadets will know exactly what to look for on Dune-7. Great eye, Cadet."
- **Middle:** "Most of this is right. But one piece might confuse the cadets. Take a look at it again."
- **Rough:** "Some of these would not help on Dune-7. A body part has to help in *this* place."

---

## 7 · "What fooled us" — the trap we expect

**Card 7, the camel hump myth.** It's the most common desert misconception, and it looks like a fact poster. If a class puts it on the wall, the report says so, and that's tomorrow's mini-lesson.

---

## 8 · Image list

**From the bank (already on the site):**
- `cases/3-13A.jpg`: a white duck with orange webbed feet next to a brown hen, at a farm pond. *Reused as card 8.* Crop to the duck on the left so the card shows one animal.
- `cases/5-13A.jpg`: a sunny desert scene with a tortoise, a roadrunner and a kangaroo rat. *Reused as card 6.* Use the full image, since it's meant to feel "too far away."

**New (5 images, same realistic nature-photo style as the bank's `3-13A` images):**

```
item: fennec_ears
file: /maker-studio/bank/animals/fennec-fox-ears.jpg
must show: a fennec fox facing the camera, both huge ears fully in frame, desert sand behind
must NOT show: text, other animals, cartoon style
tags: desert, adaptation, ears, heat, external-structure, 3.13A
```
```
item: camel_feet
file: /maker-studio/bank/animals/camel-feet-sand.jpg
must show: close-up of a camel's wide, flat, padded feet standing on soft sand, shallow footprints visible
must NOT show: the hump as the main subject, text
tags: desert, adaptation, feet, sand, external-structure, 3.13A
```
```
item: camel_lashes
file: /maker-studio/bank/animals/camel-eyelashes.jpg
must show: close-up of a camel's eye with long double eyelashes, blowing sand in the air
must NOT show: text
tags: desert, adaptation, eyes, sand, external-structure, 3.13A
```
```
item: horned_lizard
file: /maker-studio/bank/animals/texas-horned-lizard-sand.jpg
must show: a Texas horned lizard on tan sand and pebbles, colors blending in, still easy to find once you look
must NOT show: text, a person's hand
tags: desert, adaptation, camouflage, skin, Texas, external-structure, 3.13A
```
```
item: roadrunner_legs
file: /maker-studio/bank/animals/roadrunner-running.jpg
must show: a roadrunner mid-run across dry desert ground, long legs clearly visible
must NOT show: cartoon style (no "Looney Tunes" look), text
tags: desert, adaptation, legs, speed, Texas, external-structure, 3.13A
```

**Text cards (no picture needed):** card 7 is styled as a bright "fun fact" poster, so it looks trustworthy. Card 9 is styled as a field note.

**Fact sources to put in the case header before authoring is locked:** camel humps store fat, not water · fennec fox ears release body heat · camels have a double row of eyelashes · Texas horned lizard camouflage · roadrunner running speed.
