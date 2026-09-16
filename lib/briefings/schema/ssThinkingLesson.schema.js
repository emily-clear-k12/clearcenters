// SS "thinking lesson" shape — v3 (Sept 2026).
//
// Why this exists alongside ssFullLesson.schema.js rather than replacing
// it: the three lessons already in the catalog run on the v2 shape, and
// students may have in-progress submissions against it. This is a NEW
// shape that new lessons opt into; nothing is migrated by force.
//
// What changed, and why — the short version of a long review with Emily:
// the v2 lesson was 22 interactions performing ONE cognitive move. Every
// task was "given a thing, which of these three categories is it?" The
// clues announced their own answers ("posts a night watch and a RULE"
// goes in the bin labelled laws), the apply phase accepted any two of
// three projects so there was no wrong answer to defend, the evidence
// phase was three taps from pre-matched lists that couldn't go wrong, and
// the assessment's distractors were jokes ("sports; shopping; vacations").
// A student who understood nothing could score well on all of it.
//
// The v3 phases exist to add the demands that were missing:
//  - openingFrame  builds the DEFINITION of community (the v2 lesson never
//                  taught it — twenty minutes in one town teaches a third
//                  grader that "community" means "town") and takes a
//                  prediction that isn't settled until the teach ends.
//  - storyTeach    one town across three problems, each CAUSED by the
//                  previous solution, so the beats can't be shuffled. The
//                  student decides before being told, names the reason
//                  themselves (that's what writes the ledger), and then
//                  meets a near-transfer case that stretches the category.
//  - synthesis     sequencing and causation (TEKS 3.17(B), the process
//                  standard paired with 3.2A, which v2 never touched at
//                  all), then removes one reason and reasons about what
//                  breaks — so interdependence is constructed, not
//                  asserted in a closing sentence.
//  - transfer      a community the student has never seen, where every
//                  reason has evidence but only one has two pieces, so
//                  the inference is real. Replaces the postcard.
//
// Grade-3 constraint running through all of it: NO TYPING. Third graders
// type around five words a minute, which eats a twenty-minute station.
// Every response is a tap — but options combine into claims that can be
// false, rather than matching one-to-one, so tapping still carries a
// thought.

import { PRACTICE_MECHANICS } from "./mechanics.schema.js";

export const SS_THINKING_PHASES = [
  "openingFrame",
  "storyTeach",
  "synthesis",
  "__practice__", // any value from PRACTICE_MECHANICS
  "opsChoice",
  "transfer",
  "clearance",
];

export const SS_THINKING_TARGET_MINUTES = 20;
export const SS_THINKING_MINUTES_RANGE = [18, 24];

/** Clearance is five items in this shape, and the fifth has no answer key
 * — it's a claim the student assembles whose LOGIC is checked while the
 * OPINION is left to the teacher. Four auto-scored, one first-read. */
export const SS_THINKING_CLEARANCE_ITEMS = 5;

function fail(msg) {
  throw new Error(`[ssThinkingLesson] ${msg}`);
}

export function validateSsThinkingShape(lesson) {
  if (!lesson || typeof lesson !== "object") fail("lesson must be an object");
  const phases = lesson.phases;
  if (!Array.isArray(phases) || phases.length !== SS_THINKING_PHASES.length) {
    fail(`phases must be ${SS_THINKING_PHASES.length} entries, got ${phases ? phases.length : "none"}`);
  }
  SS_THINKING_PHASES.forEach((want, i) => {
    const got = phases[i];
    if (want === "__practice__") {
      if (!PRACTICE_MECHANICS.includes(got)) {
        fail(`phases[${i}] must be one of ${PRACTICE_MECHANICS.join(", ")} — got "${got}"`);
      }
    } else if (got !== want) {
      fail(`phases[${i}] must be "${want}" — got "${got}"`);
    }
  });

  // Content for every phase lives at lesson[phaseId], the same convention
  // reasonSort already used. No generic wrapper.
  phases.forEach((id) => {
    if (!lesson[id]) fail(`missing content block lesson.${id}`);
  });

  const minutes = lesson.minutes;
  if (typeof minutes !== "number" || minutes < SS_THINKING_MINUTES_RANGE[0] || minutes > SS_THINKING_MINUTES_RANGE[1]) {
    fail(`minutes should be ${SS_THINKING_MINUTES_RANGE[0]}-${SS_THINKING_MINUTES_RANGE[1]} — got ${minutes}`);
  }

  const st = lesson.storyTeach;
  if (!Array.isArray(st.beats) || st.beats.length < 2) fail("storyTeach.beats needs at least 2 beats");
  st.beats.forEach((b, i) => {
    if (!b.id) fail(`storyTeach.beats[${i}].id missing`);
    if (!Array.isArray(b.choices) || b.choices.length < 2) fail(`storyTeach.beats[${i}].choices needs 2+`);
    if (!b.choices.some((c) => c.best)) fail(`storyTeach.beats[${i}] has no choice marked best`);
    b.choices.forEach((c, ci) => {
      if (!c.best && !c.whatIf) {
        fail(`storyTeach.beats[${i}].choices[${ci}] needs a whatIf — a distractor without one is just marked wrong`);
      }
    });
    // The bridge is what makes the teach a sequence rather than a list;
    // only the last beat is allowed to lack one.
    if (i < st.beats.length - 1 && !b.bridge) {
      fail(`storyTeach.beats[${i}].bridge missing — without it the beats are shufflable, which is the v2 problem`);
    }
  });

  const sy = lesson.synthesis;
  if (!Array.isArray(sy.orderCards) || sy.orderCards.length < 3) fail("synthesis.orderCards needs 3+");
  if (!Array.isArray(sy.causes) || !sy.causes.length) fail("synthesis.causes needs at least one");
  if (!Array.isArray(sy.removals) || sy.removals.length < 2) fail("synthesis.removals needs 2+");

  const tr = lesson.transfer;
  if (!Array.isArray(tr.spots) || tr.spots.length < 4) fail("transfer.spots needs 4+ (including one non-reason decoy)");
  if (!Array.isArray(tr.claimOptions) || tr.claimOptions.length < 3) fail("transfer.claimOptions needs 3+");

  const cl = lesson.clearance;
  const items = cl.items || [];
  if (items.length !== SS_THINKING_CLEARANCE_ITEMS) {
    fail(`clearance.items must be ${SS_THINKING_CLEARANCE_ITEMS} — got ${items.length}`);
  }

  return true;
}

/** Checks that generation can enforce mechanically. These are the rules
 * that separate the v3 lesson from the v2 one, and every one of them is
 * decidable without a human reading the lesson — which is what makes the
 * shape safe to batch-generate across grades 3-5.
 *
 * Returns an array of problem strings (empty === clean) rather than
 * throwing, so a generator can regenerate and retry on a failure. */
export function auditThinkingQuality(lesson, opts) {
  const problems = [];
  const o = opts || {};
  const wordBudget = o.wordBudget || 110; // student-facing words per SCREEN

  const words = (s) => String(s || "").trim().split(/\s+/).filter(Boolean).length;

  // 1. No-giveaway rule for the practice mechanic's clues. A clue must not
  //    hand over its own answer — that single check is the difference
  //    between "sort by thinking" and "sort by keyword".
  //
  //    Banned words for a bin are the bin label's own words PLUS the words
  //    of any vocabulary definition for that bin, because that's where the
  //    synonyms live: the v2 pack defined "laws" as "RULES a community
  //    agrees to", so a clue saying "rule" gave the answer away just as
  //    surely as one saying "law".
  //
  //    LIMIT, stated plainly: this is string matching, not meaning. A clue
  //    saying "chapel" still gives away religious freedom and nothing here
  //    will catch it, because "chapel" appears in neither the label nor the
  //    definition. Human review still owns that one.
  const STOP = new Set([
    "with", "that", "this", "they", "them", "their", "what", "when", "your", "from",
    "have", "having", "into", "over", "under", "about", "than", "then", "other",
    "everyday", "things", "people", "live", "well", "keeps", "keep", "stays", "stay",
    "follow", "agrees", "agree", "being", "little", "some", "like", "just", "also",
  ]);
  // Light plural stemming. Note the ordering: a naive /(es|s)$/ strip turns
  // "rules" into "rul" while "rule" stays "rule", so the two never match and
  // the giveaway this whole check exists to catch walks straight through.
  const stem = (w) => {
    if (/ies$/.test(w)) return w.replace(/ies$/, "y");
    if (/(ss|us|is)$/.test(w)) return w;
    if (/(ch|sh|s|x|z)es$/.test(w)) return w.replace(/es$/, "");
    if (/s$/.test(w)) return w.replace(/s$/, "");
    return w;
  };
  const contentWords = (s) =>
    String(s || "")
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 3 && !STOP.has(w))
      .map(stem);

  // Same words, but keyed by stem back to the spelling a student actually sees.
  // Reporting a stem ("hom") instead of "homes" makes a problem hard to find.
  const contentWordMap = (s) => {
    const out = {};
    String(s || "")
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length > 3 && !STOP.has(w))
      .forEach((w) => {
        if (!out[stem(w)]) out[stem(w)] = w;
      });
    return out;
  };

  const rs = lesson.reasonSort;
  if (rs && Array.isArray(rs.items) && Array.isArray(rs.bins)) {
    const vocab = lesson.storyTeach?.vocab || lesson.fieldBrief?.vocab || [];
    const banned = {};
    rs.bins.forEach((b) => {
      const labelWords = contentWords(b.label);
      const set = new Set(labelWords);
      // Pull in the definition of any vocab term that names this bin.
      vocab.forEach((v) => {
        const termWords = contentWords(v.term);
        if (termWords.some((t) => labelWords.includes(t))) {
          contentWords(v.meaning).forEach((w) => set.add(w));
        }
      });
      banned[b.id] = set;
    });

    const key = (o.answers && o.answers.reasonSort) || {};
    rs.items.forEach((item) => {
      const bin = key[item.id];
      const set = banned[bin];
      if (!set) return;
      // Keep the word as the student sees it for the message — reporting a
      // stem ("hom") instead of "homes" makes the problem hard to find.
      const original = contentWordMap(item.text);
      const hits = Object.keys(original).filter((w) => set.has(w));
      if (hits.length) {
        problems.push(
          `reasonSort item "${item.id}" gives its own answer away ("${original[hits[0]]}" is the ${bin} bin's own wording) — it can be sorted without understanding it`
        );
      }
    });
  }

  // 1b. NO-GIVEAWAY FOR matchPairs. Added Sept 2026 — until now the rule ran on
  //     reasonSort ONLY, which is how the old SS-3-2B-BR shipped a Match Pairs
  //     phase that paired "Education" with a line containing the word "school".
  //
  //     For this mechanic the giveaway lives inside the PAIR rather than
  //     between a clue and a bin: if a left item and its own correct right item
  //     share a content word, the pair can be made by spotting that word, and
  //     the student never has to know what either half means. Note the check is
  //     deliberately strict — ONE shared content word is enough to report,
  //     because with five or six pairs on screen one shared word usually
  //     resolves the whole grid by elimination.
  //
  //     SAME LIMIT AS BEFORE, STATED PLAINLY: this is string matching, not
  //     meaning. "Education" paired with "school" shares no word and walks
  //     straight through. Semantic giveaways in matchPairs stay human review.
  const mp = lesson.matchPairs;
  if (mp && Array.isArray(mp.leftItems) && Array.isArray(mp.rightItems)) {
    const key = (o.answers && o.answers.matchPairs) || {};
    const rightById = {};
    mp.rightItems.forEach((r) => {
      if (r && r.id) rightById[r.id] = r;
    });
    mp.leftItems.forEach((l) => {
      const right = rightById[key[l.id]];
      if (!right) return;
      const leftWords = contentWordMap(l.text);
      const rightStems = new Set(contentWords(right.text));
      const hits = Object.keys(leftWords).filter((w) => rightStems.has(w));
      if (hits.length) {
        problems.push(
          `matchPairs item "${l.id}" gives its own answer away ("${leftWords[hits[0]]}" appears in both halves of the pair) — it can be matched on the word alone, without understanding either half`
        );
      }
    });
  }

  // 1c. NO-GIVEAWAY FOR labelPicture — and an honest statement of what that can
  //     and cannot mean. A hotspot is {id, x, y} with NO text, so there is
  //     nothing in the pack for a hotspot to leak. If this mechanic hands over
  //     its answer, it does so IN THE PICTURE: a hotspot sitting on a building
  //     with its own name painted across the front is a reading task wearing a
  //     label task's clothes, and no string check will ever see that.
  //
  //     The one piece of the picture a checker CAN read is the written art
  //     spec, which is the thing an illustrator will actually draw from. So
  //     that is what this checks: a wordBank label whose words already appear
  //     in imageAlt is an instruction to draw the answer onto the scene.
  //     Catching it here is cheap; catching it after the art is commissioned
  //     is not.
  const lp = lesson.labelPicture;
  if (lp && Array.isArray(lp.wordBank)) {
    if (!lp.imageKey || !(lesson.art && lesson.art[lp.imageKey])) {
      problems.push(
        `labelPicture has no imageKey resolving into lesson.art — unlike transfer, this mechanic cannot fall back to word chips, so the phase has nothing to render at all`
      );
    }
    const specStems = new Set(contentWords(lp.imageAlt));
    if (specStems.size) {
      lp.wordBank.forEach((w) => {
        const words = contentWordMap(w.text);
        const hits = Object.keys(words).filter((x) => specStems.has(x));
        if (hits.length) {
          problems.push(
            `labelPicture wordBank "${w.id}" appears in the art spec ("${words[hits[0]]}" is in imageAlt) — the illustrator will draw the answer into the scene and the phase becomes a reading task`
          );
        }
      });
    }
  }

  // 2. Length parity in multiple choice. The longest option being correct
  //    is a classic item-writing tell; students learn to pick the long one.
  const checkParity = (where, options, correctIndex) => {
    if (!Array.isArray(options) || options.length < 2 || correctIndex == null) return;
    const lens = options.map((op) => words(op.text || op.label || op));
    const max = Math.max(...lens);
    if (lens[correctIndex] === max && lens.filter((l) => l === max).length === 1) {
      problems.push(`${where}: the correct option is the longest one (${max} words) — pad the distractors or trim it`);
    }
  };
  (lesson.clearance?.items || []).forEach((item, i) => {
    const correct = (o.answers && o.answers.clearance && o.answers.clearance[item.id]) || null;
    if (!correct || !Array.isArray(item.choices)) return;
    checkParity(`clearance.items[${i}]`, item.choices, item.choices.findIndex((c) => c.id === correct));
  });

  // 3. Word budget per SCREEN. Flesch-Kincaid says the sentences are
  //    simple; it says nothing about there being four hundred of them.
  //
  //    Two things make this measure what a student actually faces rather
  //    than what the file contains. A phase is divided by how many screens
  //    it really shows (storyTeach shows one beat at a time, clearance one
  //    item at a time), and feedback strings are counted as the LONGEST
  //    single branch rather than summed, since a student only ever sees the
  //    response to the option they picked.
  // predictionRight / predictionWrong were added Sept 14: like every other key
  // here they are two branches of the same moment — a student sees one of them
  // and never the other — so summing both overstated what anyone actually
  // reads by the length of the shorter branch.
  const FEEDBACK_KEYS = /^(why|whatIf|response|nameWrong|rightMessage|wrongMessage|hint|bestLead|helpWrong|helpPass|whoseRight|whoseWrong|distractorFailMessage|predictionRight|predictionWrong)$/;
  // Keys whose VALUE is an identifier, a flag or a coordinate rather than
  // something a student reads. `resolvesPredictionTo` joined this list on
  // Sept 16, 2026: it holds an openingFrame.predictOption id, so counting it
  // charged the teach phase a word for a string nobody sees.
  const SKIP_KEYS = /^(id|type|mode|icon|emoji|color|imageKey|reasonId|sceneId|levelId|needId|resolvesPredictionTo|isTrait|ok|best|actual|isNoChange|x|y)$/;

  const screenWords = (v) => {
    if (typeof v === "string") return words(v);
    if (Array.isArray(v)) {
      // Siblings in a list are all on screen together, but their feedback
      // is mutually exclusive — sum the visible parts, take the worst case
      // of the hidden ones.
      let visible = 0;
      let worstFeedback = 0;
      v.forEach((item) => {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          let fb = 0;
          Object.entries(item).forEach(([k, val]) => {
            if (SKIP_KEYS.test(k)) return;
            if (FEEDBACK_KEYS.test(k)) fb += screenWords(val);
            else visible += screenWords(val);
          });
          worstFeedback = Math.max(worstFeedback, fb);
        } else {
          visible += screenWords(item);
        }
      });
      return visible + worstFeedback;
    }
    if (v && typeof v === "object") {
      let n = 0;
      let worstFeedback = 0;
      Object.entries(v).forEach(([k, val]) => {
        if (SKIP_KEYS.test(k)) return;
        // Sibling feedback strings on one object are mutually exclusive
        // too — helpWrong and helpPass never appear together.
        if (FEEDBACK_KEYS.test(k)) worstFeedback = Math.max(worstFeedback, screenWords(val));
        else n += screenWords(val);
      });
      return n + worstFeedback;
    }
    return 0;
  };

  // How many screens each phase actually is, derived structurally. These
  // counts mirror how the player reveals each phase — see the components
  // of the same name in app/briefing/[assignmentId]/BriefingClient.js. A
  // beat is three reveals, not one: situation + choices, then the outcome
  // and naming, then the term, the real-world case and the stretch.
  const screenCount = (id, block) => {
    if (id === "storyTeach") return Math.max((block.beats || []).length, 1) * 3;
    if (id === "clearance") return Math.max((block.items || []).length, 1);
    if (id === "openingFrame") return 3; // is-it → traits → prediction
    if (id === "synthesis") return 2 + Math.max((block.causes || []).length, 1);
    // Type 2 (comparison) phases. A sideBySide round reveals in three the same
    // way a storyTeach beat does — home way + prediction, then the away way
    // and the why, then the term, the real case and the stretch. Counted here
    // rather than in ssComparisonLesson.schema.js so there is one screen-count
    // table rather than two that can drift apart.
    if (id === "sideBySide") return Math.max((block.rounds || []).length, 1) * 3;
    if (id === "contrastSynthesis") return 2 + Math.max((block.causes || []).length, 1);
    // Type 3 (people). A theDecision round reveals in three as well: the
    // situation and the choice, then what actually happened and the naming
    // step, then the term, the real case and the stretch.
    if (id === "theDecision") return Math.max((block.rounds || []).length, 1) * 3;
    if (id === "contributionSynthesis") return 2 + Math.max((block.attributions || []).length, 1);
    // Type 4 (categories). Same three reveals per round: the problem and the
    // routing choice, then what going to the wrong desk cost and the rule,
    // then the term, the real case and the stretch.
    if (id === "wrongDesk") return Math.max((block.rounds || []).length, 1) * 3;
    if (id === "boundarySynthesis") return 2 + Math.max((block.boundaries || []).length, 1);
    // The vote screen reveals in three: the scenario and the townspeople,
    // then the projects and the why-chips, then the board and the
    // whose-warning question.
    if (id === "opsChoice") return 3;
    return 1;
  };

  (lesson.phases || []).forEach((id) => {
    const block = lesson[id];
    if (!block) return;
    const total = screenWords(block);
    const screens = screenCount(id, block);
    const perScreen = Math.round(total / screens);
    if (perScreen > wordBudget) {
      problems.push(
        `phase "${id}" runs ~${perScreen} student-facing words per screen across ${screens} screen(s) (budget ${wordBudget}) — trim it or split it`
      );
    }
  });

  // 4. Nothing may be pre-answered by earlier text. The v2 pack's trap
  //    line gave away its own true/false item three screens later.
  const earlier = [];
  (lesson.phases || []).forEach((id) => {
    const block = lesson[id];
    if (id === "clearance") {
      (block?.items || []).forEach((item, i) => {
        const stem = String(item.prompt || "").toLowerCase();
        const stripped = stem.replace(/^true\/false:\s*/, "").trim();
        if (stripped.length > 24 && earlier.some((t) => t.includes(stripped))) {
          problems.push(`clearance.items[${i}] is answered verbatim by earlier lesson text`);
        }
      });
      return;
    }
    const walk = (v) => {
      if (typeof v === "string") earlier.push(v.toLowerCase());
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(block);
  });

  return problems;
}
