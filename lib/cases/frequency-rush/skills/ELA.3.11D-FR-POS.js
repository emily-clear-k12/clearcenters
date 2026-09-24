// Frequency Rush skill set ELA.3.11D-FR-POS (Parts of Speech, Grade 3, TEKS 3.11D).
// Authored Sept 24, 2026 by Claude for Emily's review (author of record).
// `answer` is the correct choice; the site shuffles choices at run time.
// Checked by tools/frequency-rush-skillcheck.cjs. Keep it valid JSON after the '=' sign.
export const SKILL_BANK = {
 "standard": "ELA.3.11D-FR-POS",
 "grade": 3,
 "subject": "ELAR",
 "teks": "3.11D",
 "title": "Parts of Speech",
 "labels": {
  "format": "GRAMMAR",
  "encounter": "RAPID SIGNAL",
  "instruction": "Pick the best answer."
 },
 "items": [
  {
   "id": "ela3pos:01",
   "prompt": "In \"The dog barked,\" what is \"barked\"?",
   "choices": [
    "verb",
    "noun",
    "adjective",
    "adverb"
   ],
   "answer": "verb",
   "explanation": "\"Barked\" is an action, so it is a verb."
  },
  {
   "id": "ela3pos:02",
   "prompt": "In \"The red ball rolled away,\" what is \"red\"?",
   "choices": [
    "adjective",
    "noun",
    "verb",
    "adverb"
   ],
   "answer": "adjective",
   "explanation": "\"Red\" describes the ball, so it is an adjective."
  },
  {
   "id": "ela3pos:03",
   "prompt": "In \"Sam ran quickly,\" what is \"quickly\"?",
   "choices": [
    "adverb",
    "adjective",
    "verb",
    "noun"
   ],
   "answer": "adverb",
   "explanation": "\"Quickly\" tells how Sam ran, so it is an adverb."
  },
  {
   "id": "ela3pos:04",
   "prompt": "In \"My cat sleeps a lot,\" what is \"cat\"?",
   "choices": [
    "noun",
    "verb",
    "adjective",
    "adverb"
   ],
   "answer": "noun",
   "explanation": "\"Cat\" names an animal, so it is a noun."
  },
  {
   "id": "ela3pos:05",
   "prompt": "In \"We will go tomorrow,\" what is \"tomorrow\"?",
   "choices": [
    "adverb",
    "adjective",
    "verb",
    "pronoun"
   ],
   "answer": "adverb",
   "explanation": "\"Tomorrow\" tells when, so it is an adverb here."
  },
  {
   "id": "ela3pos:06",
   "prompt": "In \"She gave him a book,\" what is \"him\"?",
   "choices": [
    "pronoun",
    "noun",
    "verb",
    "adjective"
   ],
   "answer": "pronoun",
   "explanation": "\"Him\" takes the place of a name, so it is a pronoun."
  },
  {
   "id": "ela3pos:07",
   "prompt": "In \"The keys are under the mat,\" what is \"under\"?",
   "choices": [
    "preposition",
    "verb",
    "adjective",
    "pronoun"
   ],
   "answer": "preposition",
   "explanation": "\"Under\" shows where the keys are. It is a preposition."
  },
  {
   "id": "ela3pos:08",
   "prompt": "In \"I like apples and pears,\" what is \"and\"?",
   "choices": [
    "conjunction",
    "preposition",
    "noun",
    "adverb"
   ],
   "answer": "conjunction",
   "explanation": "\"And\" joins two words, so it is a conjunction."
  },
  {
   "id": "ela3pos:09",
   "prompt": "Which word is a proper noun?",
   "choices": [
    "Texas",
    "city",
    "river",
    "state"
   ],
   "answer": "Texas",
   "explanation": "A proper noun names one special place, so it starts with a capital letter."
  },
  {
   "id": "ela3pos:10",
   "prompt": "Which word is a plural noun?",
   "choices": [
    "foxes",
    "fox",
    "quick",
    "jumped"
   ],
   "answer": "foxes",
   "explanation": "Plural means more than one. \"Foxes\" is more than one fox."
  },
  {
   "id": "ela3pos:11",
   "prompt": "Which word is a verb?",
   "choices": [
    "jump",
    "happy",
    "pretty",
    "soft"
   ],
   "answer": "jump",
   "explanation": "\"Jump\" is an action word."
  },
  {
   "id": "ela3pos:12",
   "prompt": "Which word is an adjective?",
   "choices": [
    "shiny",
    "run",
    "slowly",
    "desk"
   ],
   "answer": "shiny",
   "explanation": "\"Shiny\" describes a noun."
  },
  {
   "id": "ela3pos:13",
   "prompt": "Which word is an adverb that tells how?",
   "choices": [
    "softly",
    "soft",
    "sofa",
    "sing"
   ],
   "answer": "softly",
   "explanation": "\"Softly\" tells how something is done."
  },
  {
   "id": "ela3pos:14",
   "prompt": "Which word is a pronoun?",
   "choices": [
    "they",
    "table",
    "tall",
    "talk"
   ],
   "answer": "they",
   "explanation": "\"They\" takes the place of names."
  },
  {
   "id": "ela3pos:15",
   "prompt": "My dog is ___ than your dog.",
   "choices": [
    "bigger",
    "big",
    "biggest",
    "more big"
   ],
   "answer": "bigger",
   "explanation": "Use \"bigger\" to compare two things."
  },
  {
   "id": "ela3pos:16",
   "prompt": "That was the ___ day of the year!",
   "choices": [
    "hottest",
    "hotter",
    "hot",
    "most hot"
   ],
   "answer": "hottest",
   "explanation": "Use \"hottest\" to compare more than two."
  },
  {
   "id": "ela3pos:17",
   "prompt": "This rock is ___ than that one.",
   "choices": [
    "heavier",
    "heavy",
    "heaviest",
    "heavyer"
   ],
   "answer": "heavier",
   "explanation": "Change y to i and add -er: \"heavier.\""
  },
  {
   "id": "ela3pos:18",
   "prompt": "Yesterday, we ___ to the zoo.",
   "choices": [
    "went",
    "go",
    "will go",
    "goes"
   ],
   "answer": "went",
   "explanation": "\"Yesterday\" means the past, so use \"went.\""
  },
  {
   "id": "ela3pos:19",
   "prompt": "Tomorrow, I ___ my grandma.",
   "choices": [
    "will visit",
    "visited",
    "visiting",
    "have visited"
   ],
   "answer": "will visit",
   "explanation": "\"Tomorrow\" means the future, so use \"will visit.\""
  },
  {
   "id": "ela3pos:20",
   "prompt": "Right now, the birds ___.",
   "choices": [
    "are singing",
    "sang",
    "will sing",
    "sung"
   ],
   "answer": "are singing",
   "explanation": "\"Right now\" means the present: \"are singing.\""
  },
  {
   "id": "ela3pos:21",
   "prompt": "___ and I played tag.",
   "choices": [
    "She",
    "Her",
    "Hers",
    "Us"
   ],
   "answer": "She",
   "explanation": "Use \"She\" when the pronoun does the action."
  },
  {
   "id": "ela3pos:22",
   "prompt": "The coach gave the ball to ___.",
   "choices": [
    "me",
    "I",
    "my",
    "mine"
   ],
   "answer": "me",
   "explanation": "Use \"me\" after words like \"to.\""
  },
  {
   "id": "ela3pos:23",
   "prompt": "That backpack is ___.",
   "choices": [
    "mine",
    "me",
    "I",
    "my"
   ],
   "answer": "mine",
   "explanation": "\"Mine\" shows the backpack belongs to me."
  },
  {
   "id": "ela3pos:24",
   "prompt": "The two ___ ran across the yard.",
   "choices": [
    "mice",
    "mouses",
    "mouse",
    "mices"
   ],
   "answer": "mice",
   "explanation": "The plural of \"mouse\" is \"mice.\""
  },
  {
   "id": "ela3pos:25",
   "prompt": "In \"The kite flew over the trees,\" what is \"over\"?",
   "choices": [
    "preposition",
    "verb",
    "noun",
    "adjective"
   ],
   "answer": "preposition",
   "explanation": "\"Over\" shows where the kite flew. It is a preposition."
  },
  {
   "id": "ela3pos:26",
   "prompt": "In \"Ana smiled, but Ben frowned,\" what is \"but\"?",
   "choices": [
    "conjunction",
    "verb",
    "adverb",
    "pronoun"
   ],
   "answer": "conjunction",
   "explanation": "\"But\" joins two sentences, so it is a conjunction."
  },
  {
   "id": "ela3pos:27",
   "prompt": "In \"The baby slept peacefully,\" what is \"peacefully\"?",
   "choices": [
    "adverb",
    "adjective",
    "noun",
    "verb"
   ],
   "answer": "adverb",
   "explanation": "\"Peacefully\" tells how the baby slept. It is an adverb."
  },
  {
   "id": "ela3pos:28",
   "prompt": "In \"Our class visited the museum,\" what is \"visited\"?",
   "choices": [
    "verb",
    "noun",
    "adjective",
    "adverb"
   ],
   "answer": "verb",
   "explanation": "\"Visited\" is an action, so it is a verb."
  },
  {
   "id": "ela3pos:29",
   "prompt": "In \"Five tall trees grew there,\" what is \"tall\"?",
   "choices": [
    "adjective",
    "adverb",
    "verb",
    "noun"
   ],
   "answer": "adjective",
   "explanation": "\"Tall\" describes the trees, so it is an adjective."
  },
  {
   "id": "ela3pos:30",
   "prompt": "In \"Dad cooked dinner yesterday,\" which word tells when?",
   "choices": [
    "yesterday",
    "cooked",
    "dinner",
    "Dad"
   ],
   "answer": "yesterday",
   "explanation": "\"Yesterday\" tells when. It is an adverb of time."
  }
 ]
};
