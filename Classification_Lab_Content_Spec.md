# Classification Lab — Content Spec

Use this document to write new Classification Lab cases for ClearCenters. Do not redesign the activity. Do not invent a new screen, a new score rule, or a new kind of question. Write cases that fit the engine that is already on the site.

When the cases come back, they will be added to the existing activity. Images are made separately. A case file does not need finished art.

## What this activity is

Students classify. They do not build, write a paragraph, or solve a word problem.

Every case is the same three pages:

1. **Sort.** A pile, a spec card, and labeled groups.
2. **Harder sort.** A new pile, the same kind of rule, and a **Neither** group.
3. **Venn.** Two overlapping circles with no labels on them yet. The student drags a rule onto each circle, then places every item. The center means both rules are true. Outside both circles means neither rule is true. Then three questions: one multiple choice, one choose-all-that-fit, and one finish-the-sentence.

A case takes about 20 minutes.

The rigor is not "put these in the obvious bin." The same pile can be sorted more than one way. The card names the way that matters. The obvious way is the trap.

A case belongs here only when both are true:

1. The items can be classified under a real grade 3, 4, or 5 Texas TEKS standard.
2. A careful student could still sort them the wrong way for a sensible reason.

If there is only one possible way to sort the pile, do not write it.

## What a miss does

Do not write hints that name the right item or the right group for a specific item.

- Grades 3 and 4 see a definition tile the whole time.
- Grade 5 does not. They click **Ask SAM**, and the same definitions open. SAM closes again on the next page.
- A definition names the idea. It never says where an item goes.
- Check tells the student how many do not match. Example: "2 do not match the card."
- Nothing lights up. The sort stays where the student put it.
- The first check on each page is the grade. Later changes are practice.
- The teacher sees three scores and the actual sort. Example: "Manatee: Eats animals — belongs in Eats plants."

## Subjects

Not every standard. A few that work, in each subject, in each grade.

**Science.** Home of the center. Sort by what something eats, what it is made of, or a property. Do not sort only by where it lives if the card is about diet. A solution is still a mixture. Do not teach "mixture or solution" as if a solution is not a mixture.

**ELAR.** Classify language, not topics. Sentence form and prefixes or suffixes fit. A long simple sentence is the trap. It feels complex and is not. Grade 3 uses simple and compound. Compound and complex can start in grade 4. Do not hide the word. The word or the sentence is the item.

**Math.** Classify numbers or shapes by a property. Prime and composite fit. Odd and even is the trap. 1 is neither prime nor composite. 2 is even and prime. 9 is odd and composite. Shape properties fit. A square is a rectangle. A turned square is still a square. Do not write compare-and-order. Lining numbers up by size is a different job.

**Social studies.** Classify by the rule the card names, not by what the items look like they share. Who makes a rule, or what kind of source it is, can fit. Be historically accurate. No cartoon versions of real events.

## What the student sees on an item

Pick one. Do not mix a photo and a shape on the same item.

- **Photo**, when the thing is a real object, animal, place, or material. The label stays under the photo. Two photos may look almost the same on purpose, such as salt water and pure water. The label is what tells them apart. Say what the photo should show. Do not put words in the photo.
- **Shape**, only for math shapes. Use one of: `rect`, `square`, `diamond`, `trap`, `rhombus`, `para`, `tri`. If the shape is not on that list, say so. Do not use a photo of a door as a rectangle. A photo is not a fair shape.
- **Words only**, for words, sentences, and numbers. A photo of a movie would hide the prefix in "preview."

## Sentence length

- Grade 3: short. One idea. About 8 words on a rule. About 12 words on a sentence item.
- Grade 4: a little longer. Cap a sentence item around 16 words.
- Grade 5: still plain. No textbook voice.

Group labels are short enough to sit on a button. "Four right angles" fits. "A quadrilateral with four right angles and two pairs of parallel sides" does not.

## Case id

`SUBJECT-GRADE.TEKS-CL`

Examples already on the site. Do not reuse these:

- `MA-3.6B-CL` Four sides
- `ELAR-3.3C-CL` The word part
- `SS-3.7A-CL` Who makes the rule
- `SCI-4.12B-CL` What they eat
- `ELAR-4.11D-CL` One sentence or two
- `MA-5.4A-CL` Prime or composite
- `ELAR-5.11D-CL` The joining word
- `SCI-5.6B-CL` Mixed or dissolved

Subject codes: `SCI`, `ELAR`, `MA`, `SS`.
Subject names in the file: `Science`, `ELAR`, `Math`, `Social Studies`.
Grade text: `Grade 3`, `Grade 4`, or `Grade 5`.

## How many items

- Page 1: 6 items. Two labeled groups. No Neither.
- Page 2: 6 items. The same two groups, plus Neither. At least one item is Neither.
- Venn: 6 items. At least one fits only the left rule, one fits only the right rule, one fits both, and one fits neither. If you cannot make a real "both," pick a different pair of rules. Do not fake an overlap.
- Questions use the same ideas as the sorts. They do not introduce a new standard.

Every item id is unique inside the case. Use short ids: `shark`, `square`, `salt`.

## The file

Return one JSON object per case. No essay around it. No answer in a definition. The `group` and `sets` and `answer` fields are the keys. They are stored on the server. They are not shown to the student.

```json
{
  "id": "SCI-3.10A-CL",
  "subject": "Science",
  "grade": "Grade 3",
  "title": "Short title",
  "teks": "3.10A",
  "learningTarget": "I can ...",
  "lessonSummary": "One or two sentences a teacher can read before assigning it.",
  "trap": "The obvious wrong way to sort, in one sentence.",
  "pages": [
    {
      "rule": "The rule on the spec card.",
      "notThis": "The trap, said to the student without naming an item.",
      "groups": [
        { "id": "a", "label": "Group name" },
        { "id": "b", "label": "Group name" }
      ],
      "items": [
        {
          "id": "shark",
          "label": "Shark",
          "clue": "Lives in the ocean",
          "group": "a",
          "imageNote": "Photo of a real shark, side view, no text."
        }
      ]
    },
    {
      "rule": "Same kind of rule. The pile is harder.",
      "notThis": "Why the obvious sort is still wrong.",
      "groups": [
        { "id": "a", "label": "Group name" },
        { "id": "b", "label": "Group name" },
        { "id": "neither", "label": "Neither" }
      ],
      "items": [
        {
          "id": "oak",
          "label": "Oak tree",
          "clue": "A plant",
          "group": "neither",
          "imageNote": "Photo of one oak tree, no text."
        }
      ]
    }
  ],
  "venn": {
    "labels": [
      { "id": "leftRule", "text": "Short rule" },
      { "id": "rightRule", "text": "Short rule" }
    ],
    "items": [
      { "id": "square", "label": "Square", "sets": ["leftRule", "rightRule"], "shape": "square" },
      { "id": "book", "label": "Book shape", "sets": ["rightRule"], "shape": "rect" },
      { "id": "tri", "label": "Triangle", "sets": [], "shape": "tri" }
    ],
    "mc": {
      "prompt": "One question.",
      "choices": [
        { "id": "yes", "text": "Right idea" },
        { "id": "trap", "text": "The tempting wrong idea" },
        { "id": "no", "text": "A clear wrong idea" }
      ],
      "answer": "yes"
    },
    "multi": {
      "prompt": "Choose all that fit.",
      "choices": [
        { "id": "one", "text": "Choice" },
        { "id": "two", "text": "Choice" },
        { "id": "three", "text": "Choice" },
        { "id": "four", "text": "Choice" }
      ],
      "answers": ["one", "two"]
    },
    "inline": {
      "before": "The card was about",
      "after": ".",
      "choices": [
        { "id": "right", "text": "the real rule" },
        { "id": "trap", "text": "the obvious trap" }
      ],
      "answer": "right"
    }
  },
  "defs": [
    [
      { "term": "Group name", "text": "What that group means. Do not name an item." },
      { "term": "Other group", "text": "What that group means." }
    ],
    [
      { "term": "Group name", "text": "Same definition." },
      { "term": "Other group", "text": "Same definition." },
      { "term": "Neither", "text": "It does not match either definition." }
    ],
    [
      { "term": "Left rule", "text": "What the left circle means." },
      { "term": "Right rule", "text": "What the right circle means." },
      { "term": "Center", "text": "Both are true." },
      { "term": "Outside", "text": "Neither is true." }
    ]
  ]
}
```

`defs` has three lists, in order: page 1, page 2, Venn. Grade 3 and 4 see them immediately. Grade 5 sees them only after Ask SAM.

Word and sentence items omit `imageNote` and `shape`. Shape items use `shape` and omit `imageNote`. Photo items use `imageNote` and omit `shape`.

`sets` uses the label ids. Both rules means both ids. Neither means `[]`. One rule means one id.

`multi.answers` lists every correct choice id. More than one must be correct. At least one choice must be wrong.

## A good trap

The clue is allowed to point at the wrong rule. That is the point.

- Shark clue: "Lives in the ocean." Card: sort by what it eats.
- 9 clue: "Odd." Card: prime or composite.
- A long sentence with one subject and one verb. Card: simple or compound.
- Salt water looks like plain water. Card: can you see the parts, or did they dissolve?

Do not make the clue say the answer. "Eats fish" on a card about diet is not a trap.

## Do not

- Do not add a fourth page.
- Do not ask for a written paragraph.
- Do not reveal an answer in `notThis`, a definition, or a question choice.
- Do not use Neither on page 1.
- Do not leave Neither off page 2.
- Do not put an item in two groups on a sort page. Overlap is only the Venn center.
- Do not write compare-and-order, a timeline, or a math computation.
- Do not invent a new button, a badge, or a different SAM rule.
- Do not copy the eight cases already listed.

## Check before you return a case

- The standard is real for that grade and subject.
- Page 1 has two groups and six items.
- Page 2 has those groups plus Neither, and at least one Neither item.
- The Venn has a real both, a real neither, and one item for each single rule.
- The multiple choice has one answer. The multi-select has more than one answer. The sentence has one answer.
- Definitions never name which item goes where.
- Grade 3 lines are short.
- Science does not say a solution is not a mixture.
- Math does not say a square is not a rectangle.
- You can point to the trap in one sentence.
