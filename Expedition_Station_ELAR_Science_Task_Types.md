# Expedition Station — ELAR and Science Task Types (build spec)

**Sept 26, 2026.** For the session building the Expedition Station student screen. The first ELAR quest (**The Dark Canopy**, `ELA.4.6F-XP`) and the first science quest (**The Cooling Core**, `SCI.5.6A-XP`) are fully written in `lib/cases/expedition-station/quests/`. Grading for every task type below is already written and tested in `index.server.js`. What's missing is the student screen for these types.

Both quests are **fully locked** (`playableActs: []`, every act and task `locked: true`), and the Assign page hides any quest with no playable acts. To open one, add its act numbers to `playableActs` and remove `locked` from those acts and tasks.

## What the screen needs

### 1. A passage panel (ELAR)

- Quest-level `passages` (exposed by `index.public.js`). Each task says which to show in `task.passage` (an array, or `part.passage` inside a multi-part task).
- Two passage shapes:
  - **Reading passages** (`paragraphs`): arrays of sentences, each `{ id, text }`. Ids look like `A3.2` (passage A, paragraph 3, sentence 2).
  - **Editable messages** (`tokens`): a list of words. Mistake words have an `id` (like `B:is`) and `options` (the fixes to offer). Plain words have only `text`. Passage B also has `sentences` so a student can highlight one of its sentences.
- Students should be able to reread the passage from every task that uses it, and a read-aloud button would help (Relay Station's speech helper).

### 2. Task types

| Kind | What the student does | Config on the task (public) | Body sent to the submit route |
| --- | --- | --- | --- |
| `choice` | Pick one answer | `task.choices: [{ id, text }]` | `{ choice }` |
| `multi` | Pick every answer that fits | `task.items: [{ id, text }]` | `{ picks: [ids] }` |
| `highlight` | Tap sentence(s) in the passage | `task.passage` | `{ sentences: [ids] }` |
| `edit` | Tap a mistake word, pick its fix | the passage's `tokens` | `{ fixes: { tokenId: text } }` |
| `order` | Put steps in order | `part.items: [{ id, text }]` | `{ order: [ids] }` |
| `number` | Type a number | `task.unit` (label) | `{ value }` |
| `write` | Write a short response | `part.minWords`, `task.rubric` | `{ written }` |
| `sort` | Drag items into bins | `task.sort` or `part.bins` / `part.items` | `{ placements: { itemId: binId } }` |
| `parts` | 2–4 parts, one at a time | `task.parts: [{ type, prompt, ...config }]` | `{ step, ...that part's body }` |
| `debate` | Existing Crew Debate (unchanged) | existing | existing |

Notes:

- **Tapping a correct word in an edit task** should just shake it (the Repair pattern). Only mistake tokens have fix options.
- **Highlight count:** a part's `count` says how many sentences to pick (default 1).
- **`parts`:** the route already returns `partial: true` with `next: step + 1` after each correct part (the same flow the challenges use). The client needs to move through any number of parts, not only 2.
- **`write` parts are teacher-scored.** The grader accepts any response that meets `minWords` and returns it as `teacherWritten`, which the route already saves. Show the `rubric` list to the student while they write.
- **Data tables:** science tasks can include `task.data` (`title`, `columns`, `rows`). Show it as a simple table above the question.

### 3. Meters and labels

Both quests use `meterLabels` (The Dark Canopy: Glow and Journal notes; The Cooling Core: Cooling and Samples), the same way the math quests do.

## Feedback

Every wrong answer the grader recognizes comes back with its own `hint` (taken from `task.wrong`). Anything else falls back to `task.hint`. Correct answers use `task.rightFeedback`.

## Testing

A script checks every quest: each correct answer grades correct with 3 stars, each listed wrong answer grades wrong and returns its own hint, every highlight id and edit token exists in the passage, and nothing in the public data includes an answer. Run the same checks before opening an act.
