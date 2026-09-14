// Cross-check: does a lesson's PUBLIC pack agree with its SERVER pack?
//
// WHY THIS EXISTS. Every other validator in this folder reads one file.
// `validateSsThinkingShape` checks the public pack's structure;
// `auditThinkingQuality` checks the public pack's writing. Nothing has ever
// checked the two packs against EACH OTHER — so a spot id in the public pack
// with no matching entry in the server's answer key passes every check we
// have, builds clean, and then fails silently in front of a student when they
// happen to tap that spot.
//
// At one hand-written lesson that's a five-minute bug. At thirty generated
// ones it's the failure most likely to reach a child, because the ids are the
// part a model is most likely to fumble and the part a human reviewer is
// least likely to re-check by hand.
//
// It also encodes a few rules that aren't about ids at all, but about
// properties the lesson MUST have to work pedagogically and that nothing
// currently enforces — above all the transfer phase's "every reason has
// evidence, but only one has two pieces." That property is the entire reason
// the transfer phase asks for two proofs. A generated town where two reasons
// both have two proofs has two right answers and nobody would notice until a
// class argued about it.
//
// Returns an array of problem strings (empty === clean), the same contract as
// auditThinkingQuality, so a generator can regenerate and retry rather than
// crashing.

const asArray = (v) => (Array.isArray(v) ? v : []);
const ids = (arr, key) => asArray(arr).map((x) => (x && x[key !== undefined ? key : "id"]) ?? null).filter(Boolean);
const missing = (wanted, have) => wanted.filter((x) => !have.includes(x));

export function crossCheckLesson(pub, srv) {
  const problems = [];
  const p = (msg) => problems.push(msg);

  if (!pub || typeof pub !== "object") return ["public pack missing or not an object"];
  if (!srv || typeof srv !== "object") return ["server pack missing or not an object"];

  // --- identity -----------------------------------------------------------
  // A mismatched pair is usually a copy-paste of the wrong server file, which
  // otherwise presents as "every answer is wrong" at runtime.
  if (pub.id !== srv.id) {
    p(`id mismatch: public pack is "${pub.id}", server pack is "${srv.id}" — these are not the same lesson`);
  }

  const phases = asArray(pub.phases);
  const has = (id) => phases.includes(id);

  // --- storyTeach ---------------------------------------------------------
  if (has("storyTeach")) {
    const st = pub.storyTeach || {};
    const beats = asArray(st.beats);
    const reasonIds = ids(st.reasons);
    const srvBeats = (srv.storyTeach && srv.storyTeach.beats) || {};

    beats.forEach((b, i) => {
      const key = srvBeats[b.id];
      if (!key) {
        p(`storyTeach beat "${b.id}" has no answer key in the server pack — naming it can never be graded`);
        return;
      }
      if (!reasonIds.includes(key.reason)) {
        p(`storyTeach beat "${b.id}" keys to reason "${key.reason}", which is not one of storyTeach.reasons (${reasonIds.join(", ")})`);
      }
      // Without nameWrong a student who names the wrong reason gets the
      // route's generic fallback, which mentions winters and reasons that may
      // not exist in this lesson.
      if (!key.nameWrong) {
        p(`storyTeach beat "${b.id}" has no nameWrong message — a wrong answer falls back to generic copy written for another lesson`);
      }
      if (i === 0 && st.firstReasonId && key.reason !== st.firstReasonId) {
        p(`storyTeach.firstReasonId is "${st.firstReasonId}" but the first beat keys to "${key.reason}" — the prediction payoff will contradict the teach`);
      }
    });

    missing(Object.keys(srvBeats), ids(beats)).forEach((orphan) => {
      p(`server pack has an answer key for beat "${orphan}", which does not exist in the public pack`);
    });

    if (st.firstReasonId && !reasonIds.includes(st.firstReasonId)) {
      p(`storyTeach.firstReasonId "${st.firstReasonId}" is not one of storyTeach.reasons`);
    }

    // The locked prediction is compared against the reason ids, so the option
    // ids have to be drawn from the same set or the payoff can never match.
    if (has("openingFrame")) {
      const predictIds = ids((pub.openingFrame || {}).predictOptions);
      missing(predictIds, reasonIds).forEach((x) => {
        p(`openingFrame.predictOptions has "${x}", which is not one of storyTeach.reasons — a student who picks it can never be told they were right`);
      });
    }
  }

  // --- sideBySide (Type 2) ------------------------------------------------
  if (has("sideBySide")) {
    const sb = pub.sideBySide || {};
    const rounds = asArray(sb.rounds);
    const srvRounds = (srv.sideBySide && srv.sideBySide.rounds) || {};

    rounds.forEach((r) => {
      const key = srvRounds[r.id];
      if (!key) {
        p(`sideBySide round "${r.id}" has no answer key in the server pack — naming the cause can never be graded`);
        return;
      }
      const whyIds = ids(r.whyOptions);
      if (!whyIds.includes(key.whyId)) {
        p(`sideBySide round "${r.id}" keys to cause "${key.whyId}", which is not one of its whyOptions (${whyIds.join(", ")})`);
      }
      if (!key.whyWrong) {
        p(`sideBySide round "${r.id}" has no whyWrong message — a wrong cause falls back to generic copy`);
      }
      if (!asArray(r.predictOptions).some((o) => o.best)) {
        p(`sideBySide round "${r.id}" has no predictOption marked best — the reveal has nothing to pay off`);
      }
    });

    missing(Object.keys(srvRounds), ids(rounds)).forEach((orphan) => {
      p(`server pack has a sideBySide key for round "${orphan}", which does not exist in the public pack`);
    });

    // The locked prediction is settled by the teach, so its options have to be
    // the same set the teach resolves to.
    if (has("openingFrame") && sb.resolvesPredictionTo) {
      const predictIds = ids((pub.openingFrame || {}).predictOptions);
      if (!predictIds.includes(sb.resolvesPredictionTo)) {
        p(`sideBySide resolves the opening prediction to "${sb.resolvesPredictionTo}", which is not one of openingFrame.predictOptions`);
      }
    }
  }

  // --- contrastSynthesis (Type 2) -----------------------------------------
  if (has("contrastSynthesis")) {
    const cs = pub.contrastSynthesis || {};
    const srvCs = srv.contrastSynthesis || {};
    const itemIds = ids(cs.sortItems);
    const columnIds = ids(cs.columns);
    const key = srvCs.sortAnswers || {};

    missing(itemIds, Object.keys(key)).forEach((x) => {
      p(`contrastSynthesis item "${x}" has no entry in sortAnswers — it can never be placed correctly`);
    });
    missing(Object.keys(key), itemIds).forEach((x) => {
      p(`contrastSynthesis sortAnswers has "${x}", which is not one of the sortItems`);
    });
    Object.entries(key).forEach(([item, col]) => {
      if (!columnIds.includes(col)) {
        p(`contrastSynthesis item "${item}" sorts to column "${col}", which does not exist (columns: ${columnIds.join(", ")})`);
      }
    });

    // The "both" column is the one carrying the standard — two communities
    // meeting the SAME needs. If nothing lands there the lesson teaches the
    // opposite of what it is for.
    if (Object.keys(key).length && !Object.values(key).includes("both")) {
      p(`contrastSynthesis has no item answering "both" — the shared-needs half of the standard is never demonstrated`);
    }

    const co = cs.changeOne || {};
    const coKey = srvCs.changeOne || {};
    const opts = asArray(co.options);
    if (opts.length) {
      if (typeof coKey.correctIndex !== "number" || coKey.correctIndex < 0 || coKey.correctIndex >= opts.length) {
        p(`contrastSynthesis.changeOne has correctIndex ${coKey.correctIndex}, outside its ${opts.length} options — no answer can ever be right`);
      }
      const wrong = asArray(coKey.wrongMessages);
      if (wrong.length !== opts.length) {
        p(`contrastSynthesis.changeOne has ${wrong.length} wrongMessages for ${opts.length} options — they are index-aligned, so the tail falls back to generic copy`);
      }
      // Answering the counterfactual with "nothing changes" must be WRONG —
      // if the no-change option were the key, the phase would be teaching that
      // differences aren't caused by anything.
      if (opts[coKey.correctIndex] && opts[coKey.correctIndex].isNoChange) {
        p(`contrastSynthesis.changeOne keys to the "nothing changes" option — that inverts the whole point of the counterfactual`);
      }
    }
  }

  // --- theDecision (Type 3) -----------------------------------------------
  if (has("theDecision")) {
    const td = pub.theDecision || {};
    const rounds = asArray(td.rounds);
    const srvRounds = (srv.theDecision && srv.theDecision.rounds) || {};
    const kindIds = ids(pub.kinds);

    rounds.forEach((r) => {
      const key = srvRounds[r.id];
      if (!key) {
        p(`theDecision round "${r.id}" has no answer key in the server pack — naming the kind of work can never be graded`);
        return;
      }
      const offered = ids(r.kindOptions);
      if (!offered.includes(key.kindId)) {
        p(`theDecision round "${r.id}" keys to kind "${key.kindId}", which is not among the kinds it offers (${offered.join(", ")})`);
      }
      if (!kindIds.includes(key.kindId)) {
        p(`theDecision round "${r.id}" keys to kind "${key.kindId}", which is not declared in lesson.kinds (${kindIds.join(", ")})`);
      }
      if (!key.kindWrong) {
        p(`theDecision round "${r.id}" has no kindWrong message — a wrong answer gets nothing back`);
      }
      // Rule 1 of this shape: the choice step has no right answer, so exactly
      // one option must instead be flagged as what the person really did.
      const actual = asArray(r.decisionOptions).filter((o) => o.actual);
      if (actual.length !== 1) {
        p(`theDecision round "${r.id}" has ${actual.length} decisionOptions marked actual — there must be exactly one, or the reveal has nothing to reveal`);
      }
    });

    missing(Object.keys(srvRounds), ids(rounds)).forEach((orphan) => {
      p(`server pack has a theDecision key for round "${orphan}", which does not exist in the public pack`);
    });
  }

  // --- contributionSynthesis (Type 3) -------------------------------------
  if (has("contributionSynthesis")) {
    const cs = pub.contributionSynthesis || {};
    const srvCs = srv.contributionSynthesis || {};
    const itemIds = ids(cs.sortItems);
    const columnIds = ids(cs.columns);
    const key = srvCs.sortAnswers || {};

    missing(itemIds, Object.keys(key)).forEach((x) => {
      p(`contributionSynthesis item "${x}" has no entry in sortAnswers — it can never be placed correctly`);
    });
    missing(Object.keys(key), itemIds).forEach((x) => {
      p(`contributionSynthesis sortAnswers has "${x}", which is not one of the sortItems`);
    });
    Object.entries(key).forEach(([item, col]) => {
      if (!columnIds.includes(col)) {
        p(`contributionSynthesis item "${item}" sorts to "${col}", which is not one of the columns (${columnIds.join(", ")})`);
      }
    });

    const ro = cs.removeOne || {};
    const roKey = srvCs.removeOne || {};
    const opts = asArray(ro.options);
    if (opts.length) {
      if (typeof roKey.correctIndex !== "number" || roKey.correctIndex < 0 || roKey.correctIndex >= opts.length) {
        p(`contributionSynthesis.removeOne has correctIndex ${roKey.correctIndex}, outside its ${opts.length} options — no answer can ever be right`);
      }
      const wrong = asArray(roKey.wrongMessages);
      if (wrong.length !== opts.length) {
        p(`contributionSynthesis.removeOne has ${wrong.length} wrongMessages for ${opts.length} options — they are index-aligned, so the tail falls back to generic copy`);
      }
      if (opts[roKey.correctIndex] && opts[roKey.correctIndex].isNoChange) {
        p(`contributionSynthesis.removeOne keys to the "nothing changes" option — that inverts the point of the counterfactual`);
      }
    }
  }

  // --- wrongDesk (Type 4) -------------------------------------------------
  if (has("wrongDesk")) {
    const wd = pub.wrongDesk || {};
    const rounds = asArray(wd.rounds);
    const srvRounds = (srv.wrongDesk && srv.wrongDesk.rounds) || {};
    const ruleIds = ids(pub.rules);
    const levelIds = ids(pub.levels);

    rounds.forEach((r) => {
      const key = srvRounds[r.id];
      if (!key) {
        p(`wrongDesk round "${r.id}" has no answer key in the server pack — naming the rule can never be graded`);
        return;
      }
      const offered = ids(r.ruleOptions);
      if (!offered.includes(key.ruleId)) {
        p(`wrongDesk round "${r.id}" keys to rule "${key.ruleId}", which is not among the rules it offers (${offered.join(", ")})`);
      }
      if (!ruleIds.includes(key.ruleId)) {
        p(`wrongDesk round "${r.id}" keys to rule "${key.ruleId}", which is not declared in lesson.rules (${ruleIds.join(", ")})`);
      }
      if (!key.ruleWrong) {
        p(`wrongDesk round "${r.id}" has no ruleWrong message — a wrong answer gets nothing back`);
      }
      if (r.levelId && !levelIds.includes(r.levelId)) {
        p(`wrongDesk round "${r.id}" claims level "${r.levelId}", which is not declared in lesson.levels`);
      }
      // The routing answer and the round's own level have to agree, or the
      // ledger line records a desk the student was never sent to.
      const bestOpt = asArray(r.routeOptions).find((o) => o.best);
      if (bestOpt && bestOpt.levelId && r.levelId && bestOpt.levelId !== r.levelId) {
        p(`wrongDesk round "${r.id}" is labelled level "${r.levelId}" but its correct route points at "${bestOpt.levelId}"`);
      }
    });

    missing(Object.keys(srvRounds), ids(rounds)).forEach((orphan) => {
      p(`server pack has a wrongDesk key for round "${orphan}", which does not exist in the public pack`);
    });
  }

  // --- boundarySynthesis (Type 4) -----------------------------------------
  if (has("boundarySynthesis")) {
    const bs = pub.boundarySynthesis || {};
    const srvBs = srv.boundarySynthesis || {};
    const itemIds = ids(bs.sortItems);
    const columnIds = ids(bs.columns);
    const key = srvBs.sortAnswers || {};

    missing(itemIds, Object.keys(key)).forEach((x) => {
      p(`boundarySynthesis item "${x}" has no entry in sortAnswers — it can never be placed correctly`);
    });
    missing(Object.keys(key), itemIds).forEach((x) => {
      p(`boundarySynthesis sortAnswers has "${x}", which is not one of the sortItems`);
    });
    Object.entries(key).forEach(([item, col]) => {
      if (!columnIds.includes(col)) {
        p(`boundarySynthesis item "${item}" sorts to "${col}", which is not one of the columns (${columnIds.join(", ")})`);
      }
    });
    // Every column has to be used, or the lesson shows a desk it never files
    // anything at.
    missing(columnIds, Object.values(key)).forEach((col) => {
      p(`boundarySynthesis column "${col}" never receives an item — a category with nothing in it teaches nothing`);
    });

    const ro = bs.removeOne || {};
    const roKey = srvBs.removeOne || {};
    const opts = asArray(ro.options);
    if (opts.length) {
      if (typeof roKey.correctIndex !== "number" || roKey.correctIndex < 0 || roKey.correctIndex >= opts.length) {
        p(`boundarySynthesis.removeOne has correctIndex ${roKey.correctIndex}, outside its ${opts.length} options — no answer can ever be right`);
      }
      const wrong = asArray(roKey.wrongMessages);
      if (wrong.length !== opts.length) {
        p(`boundarySynthesis.removeOne has ${wrong.length} wrongMessages for ${opts.length} options — they are index-aligned, so the tail falls back to generic copy`);
      }
      if (opts[roKey.correctIndex] && opts[roKey.correctIndex].isNoChange) {
        p(`boundarySynthesis.removeOne keys to the "nothing changes" option — that inverts the point of the counterfactual`);
      }
    }
  }

  // --- synthesis ----------------------------------------------------------
  if (has("synthesis")) {
    const sy = pub.synthesis || {};
    const srvSy = srv.synthesis || {};
    const cardIds = ids(sy.orderCards);
    const order = asArray(srvSy.correctOrder);

    missing(cardIds, order).forEach((x) => p(`synthesis.orderCards has "${x}" but correctOrder does not — it can never be placed`));
    missing(order, cardIds).forEach((x) => p(`synthesis correctOrder lists "${x}", which is not one of the orderCards`));

    const srvRemovals = srvSy.removals || {};
    asArray(sy.removals).forEach((r) => {
      const spec = srvRemovals[r.id];
      if (!spec) {
        p(`synthesis removal "${r.id}" has no server entry — picking it returns "Pick which one to take away first" forever`);
        return;
      }
      const opts = asArray(r.options);
      if (typeof spec.correctIndex !== "number" || spec.correctIndex < 0 || spec.correctIndex >= opts.length) {
        p(`synthesis removal "${r.id}" has correctIndex ${spec.correctIndex}, outside its ${opts.length} options — no answer can ever be right`);
      }
      // wrongMessages is read by index against the public options array, so a
      // short array silently falls back to generic copy on the last options.
      const wrong = asArray(spec.wrongMessages);
      if (wrong.length !== opts.length) {
        p(`synthesis removal "${r.id}" has ${wrong.length} wrongMessages for ${opts.length} options — they are index-aligned, so the tail falls back to generic copy`);
      }
    });
    missing(Object.keys(srvRemovals), ids(sy.removals)).forEach((x) => {
      p(`server pack has a synthesis removal "${x}" that does not exist in the public pack`);
    });
  }

  // --- practice mechanic --------------------------------------------------
  // Each mechanic keys its answers differently at runtime. These names are
  // taken from what app/api/briefing/grade/route.js actually reads, NOT from
  // the documentation in mechanics.schema.js — those two disagree about
  // reasonSort, and the route is the one that decides whether a child's
  // answer is marked right.
  if (has("reasonSort")) {
    const rs = pub.reasonSort || {};
    const srvRs = srv.reasonSort || {};
    if (!srvRs.answers && srvRs.answerKey) {
      p(`reasonSort answer key is under "answerKey", but the grading route reads "answers" — every clue would be marked wrong`);
    }
    const key = srvRs.answers || {};
    const binIds = ids(rs.bins);
    const itemIds = ids(rs.items);
    missing(itemIds, Object.keys(key)).forEach((x) => {
      p(`reasonSort item "${x}" has no entry in the answer key — it is silently dropped from the score and a student can pass without it`);
    });
    missing(Object.keys(key), itemIds).forEach((x) => {
      p(`reasonSort answer key has "${x}", which is not one of the items`);
    });
    Object.entries(key).forEach(([item, bin]) => {
      if (!binIds.includes(bin)) p(`reasonSort item "${item}" keys to bin "${bin}", which does not exist (bins: ${binIds.join(", ")})`);
    });
  }

  const simpleMechanics = [
    { id: "matchPairs", from: "leftItems", to: "rightItems", keyName: "answerKey" },
    { id: "labelPicture", from: "hotspots", to: "wordBank", keyName: "answerKey" },
  ];
  simpleMechanics.forEach(({ id, from, to, keyName }) => {
    if (!has(id)) return;
    const block = pub[id] || {};
    const key = (srv[id] || {})[keyName] || {};
    const fromIds = ids(block[from]);
    const toIds = ids(block[to]);
    missing(fromIds, Object.keys(key)).forEach((x) => p(`${id} "${x}" has no entry in ${keyName} — it can never be answered correctly`));
    Object.entries(key).forEach(([k, v]) => {
      if (!fromIds.includes(k)) p(`${id} ${keyName} has "${k}", which is not one of the ${from}`);
      if (!toIds.includes(v)) p(`${id} "${k}" keys to "${v}", which is not one of the ${to}`);
    });
  });

  if (has("sequenceIt")) {
    const stepIds = ids((pub.sequenceIt || {}).steps);
    const order = asArray((srv.sequenceIt || {}).correctOrder);
    missing(stepIds, order).forEach((x) => p(`sequenceIt step "${x}" is missing from correctOrder`));
    missing(order, stepIds).forEach((x) => p(`sequenceIt correctOrder lists "${x}", which is not one of the steps`));
  }

  if (has("trueFalseReason")) {
    const stIds = ids((pub.trueFalseReason || {}).statements);
    const key = (srv.trueFalseReason || {}).answerKey || {};
    missing(stIds, Object.keys(key)).forEach((x) => p(`trueFalseReason statement "${x}" has no entry in answerKey`));
    Object.entries(key).forEach(([k, v]) => {
      if (!stIds.includes(k)) p(`trueFalseReason answerKey has "${k}", which is not one of the statements`);
      if (!v || typeof v.isTrue !== "boolean") p(`trueFalseReason "${k}" has no isTrue boolean`);
      // The reason line is shown on right AND wrong answers — it is the
      // mechanic's entire reason for existing over a bare true/false.
      if (!v || !v.reason) p(`trueFalseReason "${k}" has no reason line — without it this is a bare check mark`);
    });
  }

  // --- opsChoice ----------------------------------------------------------
  if (has("opsChoice")) {
    const oc = pub.opsChoice || {};
    const srvOc = srv.opsChoice || {};
    const projectIds = ids(oc.projects);
    const projectReasonIds = srvOc.projectReasonIds || {};
    const reasonOf = (pid) => projectReasonIds[pid];

    missing(projectIds, Object.keys(projectReasonIds)).forEach((x) => {
      p(`opsChoice project "${x}" has no entry in projectReasonIds — it can never be named as the deferred reason`);
    });
    missing(Object.keys(projectReasonIds), projectIds).forEach((x) => {
      p(`opsChoice projectReasonIds has "${x}", which is not one of the projects`);
    });
    missing(asArray(srvOc.teksProjectIds), projectIds).forEach((x) => {
      p(`opsChoice teksProjectIds lists "${x}", which is not one of the projects`);
    });
    missing(asArray(srvOc.distractorIds), projectIds).forEach((x) => {
      p(`opsChoice distractorIds lists "${x}", which is not one of the projects`);
    });

    if (oc.pickCount != null && srvOc.requirePickCount != null && oc.pickCount !== srvOc.requirePickCount) {
      p(`opsChoice pickCount is ${oc.pickCount} in the public pack but requirePickCount is ${srvOc.requirePickCount} on the server — the board and the grader disagree`);
    }

    // The route only resolves a deferred reason when EXACTLY ONE real project
    // is left unbuilt. With any other count it silently returns null and the
    // requireDeferredReason gate never fires — the phase looks like it's
    // checking something and isn't.
    const teksCount = asArray(srvOc.teksProjectIds).length;
    const pickCount = srvOc.requirePickCount || oc.pickCount || 0;
    if (srvOc.requireDeferredReason && teksCount - pickCount !== 1) {
      p(`opsChoice requireDeferredReason is on, but ${teksCount} real projects minus ${pickCount} picks leaves ${teksCount - pickCount} deferred — the grader only asks when exactly 1 is left, so this gate will never fire`);
    }

    // Each voice speaks for a project's reason; a voice whose id matches no
    // project's reason is a townsperson arguing for something not on the ballot.
    const projectReasons = projectIds.map(reasonOf).filter(Boolean);
    ids(oc.voices).forEach((vid) => {
      if (!projectReasons.includes(vid)) {
        p(`opsChoice voice "${vid}" does not match any project's reason (${[...new Set(projectReasons)].join(", ")}) — nobody can act on what they asked for`);
      }
    });
    ids(oc.deferredReasonChips).forEach((cid) => {
      if (!projectReasons.includes(cid)) {
        p(`opsChoice deferredReasonChips has "${cid}", which is not any project's reason`);
      }
    });
  }

  // --- transfer -----------------------------------------------------------
  if (has("transfer")) {
    const tr = pub.transfer || {};
    const srvTr = srv.transfer || {};
    const spotIds = ids(tr.spots);
    const claimIds = ids(tr.claimOptions);
    const spotReasons = srvTr.spotReasons || {};

    missing(spotIds, Object.keys(spotReasons)).forEach((x) => {
      // The route defaults an unknown spot to "none", so a missing entry
      // doesn't error — it silently becomes the decoy and tells the student
      // their correct tap was "fun, not a reason."
      p(`transfer spot "${x}" has no entry in spotReasons — the grader treats it as the decoy and rejects a correct tap`);
    });
    missing(Object.keys(spotReasons), spotIds).forEach((x) => {
      p(`transfer spotReasons has "${x}", which is not one of the spots`);
    });
    Object.entries(spotReasons).forEach(([spot, reason]) => {
      if (reason !== "none" && !claimIds.includes(reason)) {
        p(`transfer spot "${spot}" keys to "${reason}", which is not one of the claimOptions and is not "none"`);
      }
    });

    if (srvTr.bestClaim && !claimIds.includes(srvTr.bestClaim)) {
      p(`transfer bestClaim "${srvTr.bestClaim}" is not one of the claimOptions`);
    }

    // THE INVARIANT. This phase works because every reason has evidence in the
    // new place but only ONE has two pieces — that asymmetry is what makes
    // "prove it twice" an inference instead of a lookup. Two reasons with two
    // proofs each means two defensible answers.
    const counts = {};
    Object.values(spotReasons).forEach((r) => {
      if (r === "none") return;
      counts[r] = (counts[r] || 0) + 1;
    });
    const twoPlus = Object.keys(counts).filter((r) => counts[r] >= 2);
    if (twoPlus.length > 1) {
      p(`transfer has ${twoPlus.length} reasons with two or more proofs (${twoPlus.join(", ")}) — there must be exactly one, or the phase has more than one right answer`);
    } else if (twoPlus.length === 0) {
      p(`transfer has no reason with two proofs — a student asked for two matching proofs cannot succeed`);
    } else if (srvTr.bestClaim && twoPlus[0] !== srvTr.bestClaim) {
      p(`transfer bestClaim is "${srvTr.bestClaim}" but "${twoPlus[0]}" is the reason with two proofs — the gradeable answer and the intended answer disagree`);
    }
    claimIds.forEach((c) => {
      if (!counts[c]) p(`transfer claimOption "${c}" has no evidence at all in this place — every reason is supposed to have some`);
    });
    if (!Object.values(spotReasons).includes("none")) {
      p(`transfer has no "none" decoy spot — the misconception this phase is built to catch cannot come up`);
    }
    if (tr.tapCount != null && twoPlus.length === 1 && counts[twoPlus[0]] < tr.tapCount) {
      p(`transfer asks for ${tr.tapCount} taps but the best reason only has ${counts[twoPlus[0]]} proofs`);
    }
  }

  // --- clearance ----------------------------------------------------------
  if (has("clearance")) {
    const cl = pub.clearance || {};
    const srvCl = srv.clearance || {};
    const items = asArray(cl.items);
    const key = srvCl.answers || {};

    items.forEach((item) => {
      const hasKey = Object.prototype.hasOwnProperty.call(key, item.id);
      if (!hasKey) {
        // The route iterates the KEY, not the items — an item missing from
        // the key is never scored and never even appears in the results.
        p(`clearance item "${item.id}" has no entry in server answers — it is never scored and never reported`);
        return;
      }
      const expected = key[item.id];
      if (item.type === "keepClaim") {
        if (expected !== null) {
          p(`clearance keepClaim item "${item.id}" must key to null (it is teacher-read) — it currently keys to "${expected}"`);
        }
        const keepIds = ids(item.keepOptions);
        const becauseIds = ids(item.becauseOptions);
        const coherence = srvCl.keepCoherence || {};
        missing(keepIds, Object.keys(coherence)).forEach((x) => {
          p(`clearance keepCoherence has no ending for "${x}" — picking it always reads as a mismatch`);
        });
        Object.entries(coherence).forEach(([k, v]) => {
          if (!keepIds.includes(k)) p(`clearance keepCoherence has "${k}", which is not one of the keepOptions`);
          if (!becauseIds.includes(v)) p(`clearance keepCoherence maps "${k}" to "${v}", which is not one of the becauseOptions`);
        });
        const contradiction = srvCl.keepSelfContradicting;
        if (!contradiction) {
          p(`clearance has no keepSelfContradicting ending — the student who taps without reading has nothing to catch them`);
        } else if (!becauseIds.includes(contradiction)) {
          p(`clearance keepSelfContradicting "${contradiction}" is not one of the becauseOptions`);
        } else if (Object.values(coherence).includes(contradiction)) {
          p(`clearance keepSelfContradicting "${contradiction}" is also used as a correct ending in keepCoherence — it cannot be both`);
        }
      } else {
        const choiceIds = ids(item.choices);
        if (expected == null) {
          p(`clearance item "${item.id}" keys to null but is not a keepClaim item — it will never be scored`);
        } else if (!choiceIds.includes(expected)) {
          p(`clearance item "${item.id}" keys to "${expected}", which is not one of its choices (${choiceIds.join(", ")})`);
        }
        if (srvCl.explanations && !srvCl.explanations[item.id]) {
          p(`clearance item "${item.id}" has no explanation — a student who gets it wrong is told nothing`);
        }
      }
    });

    missing(Object.keys(key), ids(items)).forEach((x) => {
      p(`clearance server answers has "${x}", which is not one of the items`);
    });
  }

  return problems;
}
