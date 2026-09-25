# tools/data — word lists used by the content checkers

These files are used only by the checkers in `tools/` (run on a computer while
authoring). They are never loaded by the website.

| File | What it is | Source and license |
|---|---|---|
| `en_50k.txt` | The 50,000 most frequent English words in movie and TV subtitles, most frequent first, with counts. Used to judge how common a word is. | FrequencyWords by Hermit Dave, built from OpenSubtitles 2018 — https://github.com/hermitdave/FrequencyWords. Content licensed CC BY-SA 4.0; code MIT. |
| `teks-words.json` | Every word in the ELAR and Math TEKS text, by grade. Never flagged as uncommon. | Built from `Texas_ELAR_TEKS_Grades_3_4_5.pdf` and `Texas_Math_TEKS_Grades_3_4_5.pdf` (19 TAC §§110.5–110.7, §§111.5–111.7). |
| `kid-words.txt` | Everyday words children know that the subtitle list ranks low (crayon, recess, puddle). Treated as common at every grade. Concrete everyday words only. | Hand-kept. |
| `standards-vocab.txt` | Science and Social Studies terms the TEKS expect, by grade. Never flagged. Edit freely. | Hand-kept from `claude/TEKS_Quick_Reference_Grades_3-5.md` and the Frequency Rush vocabulary lists. |

To refresh `en_50k.txt`, download
https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/en/en_50k.txt
and save it here under the same name.

## How the word-choice check works

`tools/lib/wordcheck.cjs` is shared by the Assembly Deck, Mission Map, Signal
Check and Relay Station gradecheck tools. For each case it reports:

- **uncommon %** — words outside the most common 12,000 (grade 3), 16,000
  (grade 4) or 20,000 (grade 5) in `en_50k.txt`, after base forms and
  closed compounds ("rainstorm" = rain + storm). Standards words, names,
  numbers and `kid-words.txt` never count. Warning above 1.5% (grades 3–4)
  or 2% (grade 5), and only with 2+ different uncommon words.
- **rich %** — words past the basic 2,000 but inside the top 20,000
  ("supplied" rather than "gave"). Warning below 2% (grade 4) or 3%
  (grade 5), for texts of 150+ words. Grade 3 has no floor.

Add `--words` to any gradecheck to list the uncommon words per case.

Thresholds were set Sept 24, 2026 from content that was already leveled
(Mission Map, Signal Check, Relay Station). Word-choice results are
**warnings only** until Emily confirms the thresholds; they don't change a
case's pass/fail.
