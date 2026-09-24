// Frequency Rush skill set ELA.5.11D-FR-GRM (Grammar Fix-Ups, Grade 5, TEKS 5.11D).
// Authored Sept 24, 2026 by Claude for Emily's review (author of record).
// `answer` is the correct choice; the site shuffles choices at run time.
// Checked by tools/frequency-rush-skillcheck.cjs. Keep it valid JSON after the '=' sign.
export const SKILL_BANK = {
 "standard": "ELA.5.11D-FR-GRM",
 "grade": 5,
 "subject": "ELAR",
 "teks": "5.11D",
 "title": "Grammar Fix-Ups",
 "labels": {
  "format": "GRAMMAR FIX-UP",
  "encounter": "RAPID SIGNAL",
  "instruction": "Pick the correct sentence."
 },
 "items": [
  {
   "id": "ela5grm:01",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The flock of birds flies south in winter.",
    "The flock of birds fly south in winter.",
    "The flock of birds flyed south in winter.",
    "the flock of birds flies south in winter."
   ],
   "answer": "The flock of birds flies south in winter.",
   "explanation": "\"Flock\" is one group, so it takes \"flies.\""
  },
  {
   "id": "ela5grm:02",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "When the bell rang, we lined up.",
    "When the bell rang.",
    "When the bell rang we lined, up.",
    "when the bell rang, we lined up."
   ],
   "answer": "When the bell rang, we lined up.",
   "explanation": "\"When the bell rang\" alone is a fragment. It needs the rest of the sentence."
  },
  {
   "id": "ela5grm:03",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "It rained all day, so we stayed inside.",
    "It rained all day we stayed inside.",
    "It rained all day, we stayed inside.",
    "It rained all day so, we stayed inside."
   ],
   "answer": "It rained all day, so we stayed inside.",
   "explanation": "Join two sentences with a comma and a word like \"so.\""
  },
  {
   "id": "ela5grm:04",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Everyone has a book.",
    "Everyone have a book.",
    "Everyone are having a book.",
    "Everyone had have a book."
   ],
   "answer": "Everyone has a book.",
   "explanation": "\"Everyone\" is singular, so it takes \"has.\""
  },
  {
   "id": "ela5grm:05",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "She brought her lunch to school.",
    "She bringed her lunch to school.",
    "She brang her lunch to school.",
    "She brung her lunch to school."
   ],
   "answer": "She brought her lunch to school.",
   "explanation": "The past of \"bring\" is \"brought.\""
  },
  {
   "id": "ela5grm:06",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "This puzzle is harder than that one.",
    "This puzzle is more harder than that one.",
    "This puzzle is hardest than that one.",
    "This puzzle is more hard than that one."
   ],
   "answer": "This puzzle is harder than that one.",
   "explanation": "Use \"harder\" to compare two. Never use \"more\" with -er."
  },
  {
   "id": "ela5grm:07",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "That was the best game of the year.",
    "That was the most best game of the year.",
    "That was the better game of the year.",
    "That was the goodest game of the year."
   ],
   "answer": "That was the best game of the year.",
   "explanation": "Use \"best\" to compare more than two."
  },
  {
   "id": "ela5grm:08",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "We visited NASA in Houston.",
    "We visited Nasa in houston.",
    "We visited nasa in Houston.",
    "We visited NASA in houston."
   ],
   "answer": "We visited NASA in Houston.",
   "explanation": "NASA is an acronym, so all its letters are capitals. Houston is a place name."
  },
  {
   "id": "ela5grm:09",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "\"Let's go,\" said Mia.",
    "\"Let's go\", said Mia.",
    "\"Let's go, said Mia.\"",
    "Let's go, said Mia."
   ],
   "answer": "\"Let's go,\" said Mia.",
   "explanation": "The comma goes inside the quotation marks, and only Mia's words are quoted."
  },
  {
   "id": "ela5grm:10",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "I wanted to swim, but the pool was closed.",
    "I wanted to swim but, the pool was closed.",
    "I wanted to swim, but, the pool was closed.",
    "I wanted, to swim but the pool was closed."
   ],
   "answer": "I wanted to swim, but the pool was closed.",
   "explanation": "In a compound sentence, the comma goes before \"but.\""
  },
  {
   "id": "ela5grm:11",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Because it was late, we went home.",
    "Because it was late we went, home.",
    "Because, it was late we went home.",
    "Because it was late. We went home."
   ],
   "answer": "Because it was late, we went home.",
   "explanation": "Put a comma after the \"because\" part when it comes first."
  },
  {
   "id": "ela5grm:12",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The box of crayons is on the shelf.",
    "The box of crayons are on the shelf.",
    "The box of crayons were on the shelf.",
    "The box of crayons be on the shelf."
   ],
   "answer": "The box of crayons is on the shelf.",
   "explanation": "The subject is \"box,\" not \"crayons,\" so use \"is.\""
  },
  {
   "id": "ela5grm:13",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Our team wins most of its games.",
    "Our team win most of its games.",
    "Our team winned most of its games.",
    "Our team wining most of its games."
   ],
   "answer": "Our team wins most of its games.",
   "explanation": "\"Team\" is one group, so it takes \"wins.\""
  },
  {
   "id": "ela5grm:14",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The pond froze last night.",
    "The pond freezed last night.",
    "The pond frozen last night.",
    "The pond freeze last night."
   ],
   "answer": "The pond froze last night.",
   "explanation": "The past of \"freeze\" is \"froze.\""
  },
  {
   "id": "ela5grm:15",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Somebody left a jacket on the bus.",
    "Somebody leaved a jacket on the bus.",
    "Somebody have left a jacket on the bus.",
    "Somebody lefted a jacket on the bus."
   ],
   "answer": "Somebody left a jacket on the bus.",
   "explanation": "The past of \"leave\" is \"left,\" and \"somebody\" is singular."
  },
  {
   "id": "ela5grm:16",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "J. K. Rowling wrote the book.",
    "j. k. Rowling wrote the book.",
    "J. K. rowling wrote the book.",
    "J K Rowling wrote the book."
   ],
   "answer": "J. K. Rowling wrote the book.",
   "explanation": "Initials are capital letters followed by periods."
  },
  {
   "id": "ela5grm:17",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The dog barked. The cat ran away.",
    "The dog barked the cat ran away.",
    "The dog barked, the cat ran away.",
    "The dog barked. the cat ran away."
   ],
   "answer": "The dog barked. The cat ran away.",
   "explanation": "Two complete sentences need a period between them."
  },
  {
   "id": "ela5grm:18",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Running down the hall, Sam slipped.",
    "Running down the hall.",
    "Running down the hall Sam, slipped.",
    "running down the hall, Sam slipped."
   ],
   "answer": "Running down the hall, Sam slipped.",
   "explanation": "\"Running down the hall\" alone is a fragment."
  },
  {
   "id": "ela5grm:19",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The school joined the PTA this year.",
    "The school joined the pta this year.",
    "The school joined the Pta this year.",
    "the school joined the PTA this year."
   ],
   "answer": "The school joined the PTA this year.",
   "explanation": "PTA is an acronym, so all its letters are capitals."
  },
  {
   "id": "ela5grm:20",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Ben asked, \"Can I help?\"",
    "Ben asked, \"Can I help\"?",
    "Ben asked \"Can I help?\"",
    "Ben asked, \"can I help?\""
   ],
   "answer": "Ben asked, \"Can I help?\"",
   "explanation": "Use a comma before the quote. The question mark goes inside the quotation marks."
  },
  {
   "id": "ela5grm:21",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The books on the table are mine.",
    "The books on the table is mine.",
    "The books on the table was mine.",
    "The books on the table be mine."
   ],
   "answer": "The books on the table are mine.",
   "explanation": "The subject is \"books,\" so use \"are.\""
  },
  {
   "id": "ela5grm:22",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Of the two dogs, Max is bigger.",
    "Of the two dogs, Max is biggest.",
    "Of the two dogs, Max is more bigger.",
    "Of the two dogs, Max is more big."
   ],
   "answer": "Of the two dogs, Max is bigger.",
   "explanation": "Use \"bigger\" when comparing two."
  },
  {
   "id": "ela5grm:23",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "We have eaten all the grapes.",
    "We have ate all the grapes.",
    "We have eated all the grapes.",
    "We has eaten all the grapes."
   ],
   "answer": "We have eaten all the grapes.",
   "explanation": "After \"have,\" use \"eaten.\""
  },
  {
   "id": "ela5grm:24",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "My mom works for the American Red Cross.",
    "My mom works for the american red cross.",
    "My mom works for the American red cross.",
    "My mom works for the American Red cross."
   ],
   "answer": "My mom works for the American Red Cross.",
   "explanation": "Capitalize every important word in an organization's name."
  },
  {
   "id": "ela5grm:25",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Dr. Patel is our new doctor.",
    "dr. Patel is our new doctor.",
    "Dr. patel is our new doctor.",
    "DR. patel is our new doctor."
   ],
   "answer": "Dr. Patel is our new doctor.",
   "explanation": "\"Dr.\" starts with a capital. Names are capitalized."
  },
  {
   "id": "ela5grm:26",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "We packed apples, cheese, and bread.",
    "We packed apples cheese, and bread.",
    "We packed, apples, cheese, and bread.",
    "We packed apples, cheese and, bread."
   ],
   "answer": "We packed apples, cheese, and bread.",
   "explanation": "Use commas to separate items in a series."
  },
  {
   "id": "ela5grm:27",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "It was cold; however, we played outside.",
    "It was cold, however we played outside.",
    "It was cold however, we played outside.",
    "It was cold; however we played, outside."
   ],
   "answer": "It was cold; however, we played outside.",
   "explanation": "Use a semicolon before \"however\" and a comma after it."
  },
  {
   "id": "ela5grm:28",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "We stayed inside until the storm passed.",
    "We stayed inside. Until the storm passed.",
    "We stayed inside until, the storm passed.",
    "we stayed inside until the storm passed."
   ],
   "answer": "We stayed inside until the storm passed.",
   "explanation": "\"Until the storm passed\" cannot stand alone. Keep it in the sentence."
  },
  {
   "id": "ela5grm:29",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "Each of the students has a pencil.",
    "Each of the students have a pencil.",
    "Each of the students are having a pencil.",
    "Each of the student has a pencil."
   ],
   "answer": "Each of the students has a pencil.",
   "explanation": "\"Each\" is singular, so use \"has.\""
  },
  {
   "id": "ela5grm:30",
   "prompt": "Which sentence is written correctly?",
   "choices": [
    "The tall girl with the red hat won the race.",
    "The tall girl with the red hat.",
    "The tall girl, with the red hat won the race.",
    "the tall girl with the red hat won the race."
   ],
   "answer": "The tall girl with the red hat won the race.",
   "explanation": "\"The tall girl with the red hat\" alone is a fragment. It needs a verb."
  }
 ]
};
