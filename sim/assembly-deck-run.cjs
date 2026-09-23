// Walks a whole Assembly Deck case the way a student does — brief, three
// paragraph builds, three leftover rounds, the assembly, the Editor's Trap,
// the new Chief's Debrief, the written question, the results screen — and
// asserts the things Emily asked for on Sept 22:
//   1. the Case File opens on every working screen and shows the sentences
//      that were left in the tray
//   2. the last interactive question is the pinpoint, not the leftovers
//   3. there is a multiple-choice question, and it is answerable
//   4. nothing the client is handed gives away an answer it has not earned
//
//   node sim/assembly-deck-run.cjs [standard]
const path = require("path");
const rt = require("./runtime.cjs");
const shims = require("./shims.cjs");

const ROOT = "/home/claude/cc";
const CLIENT = path.join(ROOT, "app/activity/[assignmentId]/AssemblyDeckClient.js");
const ROUTE = path.join(ROOT, "app/api/assembly-deck/submit/route.js");

rt.installLoader({
  "react": path.join(__dirname, "react-shim.cjs"),
  "../../../components/SamGuide": path.join(__dirname, "sam-shim.cjs"),
  "../../../components/BackToHubButton": path.join(__dirname, "hub-shim.cjs"),
  "next/server": path.join(__dirname, "next-server-shim.cjs"),
  "next/headers": path.join(__dirname, "next-headers-shim.cjs"),
  "../../../../lib/supabaseAdmin": path.join(__dirname, "supabase-shim.cjs"),
  "../../../../lib/anthropic": path.join(__dirname, "anthropic-shim.cjs"),
});
global.React = shims.react;
// The Case File closes on Escape, so it registers a window listener.
const keyListeners = [];
global.window = {
  addEventListener: (ev, fn) => { if (ev === "keydown") keyListeners.push(fn); },
  removeEventListener: (ev, fn) => { const i = keyListeners.indexOf(fn); if (i >= 0) keyListeners.splice(i, 1); },
};

const STANDARD = process.argv[2] || "3.6A-AD";
const runtime = new rt.Runtime();
shims.state.runtime = runtime;

const PUB = require(path.join(ROOT, "lib/cases/assembly-deck/index.public.js"));
const SRV = require(path.join(ROOT, "lib/cases/assembly-deck/index.server.js"));
const publicCase = PUB.getAssemblyDeckPublicCase(STANDARD);
const serverCase = SRV.getAssemblyDeckServerCase(STANDARD);
const route = require(ROUTE);
const Client = require(CLIENT).default;

// ---- fetch -> the real route handler --------------------------------------
let payloads = [];
global.fetch = async (url, opts) => {
  const body = JSON.parse(opts.body);
  payloads.push(body);
  const res = await route.POST({ json: async () => body });
  return { ok: res.ok, json: async () => res._json };
};

// ---- assertions -----------------------------------------------------------
let fails = 0, checks = 0;
function ok(cond, label, detail) {
  checks++;
  if (cond) console.log("  ✓", label);
  else { fails++; console.log("  ✗", label, detail != null ? "\n      " + detail : ""); }
}

// ---- driving --------------------------------------------------------------
function tree() { return runtime.tree; }
function texts() { return rt.buttons(tree()).map((b) => rt.textOf(b)); }
function findButton(match, { pressable } = {}) {
  const all = rt.buttons(tree()).filter((b) => {
    if (pressable && b.props["aria-pressed"] === undefined) return false;
    const t = rt.textOf(b);
    return typeof match === "string" ? t.includes(match) : match(t, b);
  });
  return all[0] || null;
}
// Some screens load their content from an effect that fires a fetch (the
// Editor's Trap does). Draining the microtask queue and re-rendering while
// anything is still dirty is this runtime's stand-in for React settling.
async function settle() {
  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setImmediate(r));
    if (runtime.dirty) runtime.flush();
  }
  runtime.flush();
}
async function click(node, label) {
  if (!node) throw new Error(`nothing to click for: ${label}\n   buttons on screen: ${JSON.stringify(texts(), null, 1)}`);
  if (node.props.disabled) throw new Error(`button is disabled: ${label}`);
  const r = node.props.onClick ? node.props.onClick({ currentTarget: { style: {}, parentElement: { style: {} } } }) : null;
  if (r && typeof r.then === "function") await r;
  await settle();
}
async function clickText(match, label) { await click(findButton(match), label || String(match)); }

function samLine() {
  const n = rt.findAll(tree(), (x) => x.props && x.props["data-sam"])[0];
  return n ? rt.textOf(n) : "";
}

// ---- the run --------------------------------------------------------------
(async () => {
  console.log(`\nAssembly Deck — simulated student run: ${STANDARD} (${publicCase.title}, grade ${publicCase.grade})\n`);

  runtime.mount(rt.createElement(Client, {
    assignmentId: "sim-assignment",
    caseStandard: STANDARD,
    publicCase,
    existingSubmission: null,
    alreadySubmitted: false,
    revisionRequested: false,
    revisionFeedback: null,
    samSkin: "classic",
    samNickname: "S.A.M.",
  }));

  console.log("BRIEF");
  ok(samLine().includes("S.A.M."), "S.A.M. is on the brief screen");
  ok(!findButton("Case file"), "the Case File button stays off the brief — there is nothing in it yet");
  await clickText("Open the deck", "start");

  // ---- the three paragraph rounds ----
  for (let r = 0; r < publicCase.rounds.length; r++) {
    const round = publicCase.rounds[r];
    const key = serverCase.rounds[round.id].key;
    console.log(`\nPARAGRAPH ${r + 1} — ${round.label}`);

    ok(!!findButton("Case file"), "the Case File button is on the build screen");

    // place every sentence the key calls for, correctly
    for (const slot of round.slots) {
      for (const pieceId of key[slot.id]) {
        const text = round.pieces.find((p) => p.id === pieceId).text;
        // the tray card is the pressable one; a placed card is not
        await click(findButton((t) => t === text, { pressable: true }), `select "${text.slice(0, 40)}…"`);
        await click(findButton((t) => t.includes("put the selected sentence here"), {}), `drop into ${slot.label}`);
      }
    }
    await clickText("Check this paragraph", "check the build");
    ok(rt.screenText(tree()).includes("Paragraph built."), "a correct build is confirmed and read back before moving on");

    // the Case File, mid-case
    await clickText("Case file", "open the case file");
    const file = rt.screenText(tree());
    ok(file.includes("CASE FILE"), "the Case File opens");
    ok(file.includes(publicCase.source.title), "the Case File carries the source notes");
    const built = round.slots.flatMap((s) => key[s.id]).map((id) => round.pieces.find((p) => p.id === id).text);
    ok(built.every((t) => file.includes(t)), "the Case File shows the paragraph just built");
    await clickText("Close", "close the case file");

    await clickText("Now the leftovers", "go to the leftovers");

    console.log(`LEFTOVERS ${r + 1}`);
    const decoyReason = serverCase.rounds[round.id].decoyReason;
    const reasons = PUB.reasonOptionsFor(round);
    for (const [pieceId, reasonKey] of Object.entries(decoyReason)) {
      const label = reasons.find((x) => x.key === reasonKey).label;
      const chips = rt.buttons(tree()).filter((b) => rt.textOf(b) === label);
      // one chip row per leftover card, in piece order
      const idx = Object.keys(decoyReason).indexOf(pieceId);
      await click(chips[idx], `reason for ${pieceId}`);
    }
    await clickText("Check my reasons", "check the reasons");

    // the leftovers, with their verdicts, have to survive into the Case File
    await clickText("Case file", "open the case file after the leftovers");
    const afterFile = rt.screenText(tree());
    const leftoverTexts = Object.keys(decoyReason).map((id) => round.pieces.find((p) => p.id === id).text);
    ok(leftoverTexts.every((t) => afterFile.includes(t)), "the Case File lists the sentences left in the tray", leftoverTexts.find((t) => !afterFile.includes(t)));
    ok(afterFile.includes("You said:"), "the Case File shows the reason the student gave for each leftover");
    await clickText("Close", "close the case file");

    await clickText(r + 1 < publicCase.rounds.length ? "Next paragraph" : "Put the paragraphs in order", "advance");
  }

  // ---- assembly ----
  console.log("\nASSEMBLY");
  const akey = serverCase.assemblyKey;
  for (const slot of publicCase.assembly.slots) {
    const round = publicCase.rounds.find((x) => x.id === akey[slot.id]);
    await click(findButton((t) => t.startsWith(round.label), { pressable: true }), `pick ${round.label}`);
    await click(findButton((t) => t.includes("put the selected paragraph here")), `place in ${slot.label}`);
  }
  await clickText("Check the order", "check the order");
  ok(rt.screenText(tree()).includes(serverCase.assemblyNote), "a correct order is explained, then frozen");
  await clickText("One more thing", "leave the assembly");

  // ---- the trap ----
  console.log("\nEDITOR'S TRAP");
  await clickText("Try me", "take the trap");
  const trapPayload = payloads[payloads.length - 1];
  const trapRes = rt.screenText(tree());
  ok(!trapRes.includes(serverCase.trap.why), "the trap's explanation is not on screen before the student answers");
  // the student finds it
  const trapSentence = serverCase.trap.text;
  await click(findButton((t) => t === trapSentence, { pressable: true }), "tap the planted sentence");
  await clickText("That one", "commit");
  ok(rt.screenText(tree()).includes("Caught it"), "catching the trap is recognized");
  await clickText("On to the debrief", "go to the debrief");

  // ---- THE DEBRIEF (the new work) ----
  console.log("\nCHIEF'S DEBRIEF");
  const screen = rt.screenText(tree());
  ok(screen.includes("CHIEF'S DEBRIEF") || screen.includes("CHIEF’S DEBRIEF"), "the debrief screen opens after the trap");
  ok(screen.includes(publicCase.debrief.pinpoint.prompt), "question one is the pinpoint");
  ok(!screen.includes(publicCase.debrief.quickCheck.prompt), "question two is hidden until question one is answered");
  ok(!screen.includes(serverCase.debrief.pinpointWhy), "the pinpoint answer is not sitting on the screen");

  // every sentence of the finished report is tappable
  const report = PUB.assembledReport(publicCase, boardsFromPayloads(), assemblyFromPayloads());
  const allSentences = report.flatMap((p) => p.sentences.map((s) => s.text));
  const tappable = rt.buttons(tree()).filter((b) => b.props["aria-pressed"] !== undefined).map((b) => rt.textOf(b));
  ok(allSentences.every((t) => tappable.includes(t)), "every sentence in the finished report can be tapped", allSentences.find((t) => !tappable.includes(t)));

  // PINPOINT=right walks the other branch of the same screen.
  const wantRight = process.env.PINPOINT === "right";
  const target = allSentences.find((t) => {
    const piece = findPiece(t);
    if (!piece) return false;
    const accepted = serverCase.debrief.pinpointAccept.includes(piece.id);
    return wantRight ? accepted : !accepted;
  });
  await click(findButton((t) => t === target, { pressable: true }), `tap ${wantRight ? "the right" : "a wrong"} sentence`);
  await clickText("That sentence", "commit the pinpoint");
  const afterWrong = rt.screenText(tree());
  if (wantRight) {
    ok(afterWrong.includes("That's the one") || afterWrong.includes("That’s the one"), "a correct pinpoint is recognized");
    ok(afterWrong.includes(serverCase.debrief.pinpointWhy), "a correct pinpoint is told why it is the one");
  } else {
    ok(afterWrong.includes("Not that one"), "a wrong pinpoint is marked wrong");
    ok(afterWrong.includes(serverCase.debrief.pinpointMiss), "a wrong pinpoint gets a note pointing the student back to the report");
    ok(!afterWrong.includes(serverCase.debrief.pinpointWhy), "a wrong pinpoint is NOT handed the right answer's explanation");
  }

  // question two opens now
  ok(afterWrong.includes(publicCase.debrief.quickCheck.prompt), "the multiple choice opens once question one is answered");
  const choices = publicCase.debrief.quickCheck.choices;
  ok(choices.every((c) => afterWrong.includes(c.text)), "every choice is on screen");
  ok(!choices.some((c) => afterWrong.includes(serverCase.debrief.quickCheckWhy[c.id])), "no choice explanation leaks before answering");

  const keyChoice = choices.find((c) => c.id === serverCase.debrief.quickCheckKey);
  await click(findButton((t) => t === keyChoice.text, { pressable: true }), "pick the right choice");
  await clickText("Lock it in", "commit the quick check");
  ok(rt.screenText(tree()).includes("Right. +1"), "a correct quick check is rewarded");

  // the Case File is still reachable on the debrief screen — this is the whole
  // point of Emily's note: the questions at the end are about what you built
  await clickText("Case file", "open the case file on the debrief");
  const debriefFile = rt.screenText(tree());
  ok(debriefFile.includes("SENTENCES YOU LEFT IN THE TRAY"), "the Case File still lists the leftovers at the end of the case");
  await clickText("Close", "close it");

  await clickText("Last question", "go to the written question");

  // ---- the written question ----
  console.log("\nWRITTEN QUESTION");
  const explainScreen = rt.screenText(tree());
  ok(explainScreen.includes(publicCase.explain.prompt), "the written question is the case's own prompt");
  ok(!/why did you (leave|reject)|stayed in the tray/i.test(publicCase.explain.prompt), "the written question no longer asks about the leftovers");
  ok(!!findButton("Case file"), "the Case File is open on the written question too");

  const textarea = rt.findAll(tree(), (n) => n.tag === "textarea")[0];
  ok(!!textarea, "there is somewhere to write");
  textarea.props.onChange({ target: { value: serverCase.modelAnswer } });
  runtime.flush();
  await clickText("Turn in my report", "submit");

  // ---- results ----
  console.log("\nRESULTS");
  const done = rt.screenText(tree());
  ok(done.includes("REPORT DELIVERED"), "the results screen renders");
  ok(done.includes("PINPOINT"), "the pinpoint result is reported to the student");
  ok(done.includes("QUICK CHECK"), "the quick check result is reported to the student");

  const written = shims.state.dbWrites[shims.state.dbWrites.length - 1];
  const data = written.row.assembly_deck_data;
  ok(data.pinpoint && data.pinpoint.correct === wantRight, `the pinpoint is recorded ${wantRight ? "correct" : "wrong"}, server-side`);
  ok(data.quickCheck && data.quickCheck.correct === true, "the correct quick check is recorded, server-side");
  ok(written.row.attempt2.includes("Pinpoint"), "the teacher's plain-text summary carries the debrief");

  const prompt = shims.state.claudeCalls[0];
  ok(prompt.includes(publicCase.explain.prompt), "the AI grader is told which question the student was actually asked");
  ok(!/explaining why those sentences did not belong/.test(prompt), "the AI grader is no longer hard-coded to the leftovers");

  // crystals: base 3 + build 2 + rejects 2 + assembly 1 + trap 2 + quick 1, no pinpoint
  const expectedCrystals = 11 + (wantRight ? 1 : 0);
  ok(shims.state.crystals === expectedCrystals, `crystals add up (got ${shims.state.crystals}, expected ${expectedCrystals}: 3 base + 2 build + 2 leftovers + 1 order + 2 trap + 1 quick check${wantRight ? " + 1 pinpoint" : ", no pinpoint"})`);

  // ---- payload safety ----
  console.log("\nPAYLOADS");
  const leaked = payloads.filter((p) => p.action === "trap").length;
  ok(leaked > 0, "the trap was served through the route");
  const trapResponse = JSON.stringify(trapPayload);
  ok(!trapResponse.includes(serverCase.trap.why), "the trap request carries no answer");

  console.log(`\n${checks - fails}/${checks} checks passed${fails ? ` — ${fails} FAILED` : ""}`);
  process.exit(fails ? 1 : 0);

  // -- helpers that need the payload log --
  function boardsFromPayloads() {
    const b = {};
    payloads.filter((p) => p.action === "check").forEach((p) => { b[p.roundId] = p.board; });
    return b;
  }
  function assemblyFromPayloads() {
    const a = payloads.filter((p) => p.action === "assembly").pop();
    return a ? a.assembly : {};
  }
  function findPiece(text) {
    for (const r of publicCase.rounds) {
      const p = r.pieces.find((x) => x.text === text);
      if (p) return p;
    }
    return null;
  }
})().catch((e) => { console.error("\nSIMULATION CRASHED:\n" + e.message + "\n" + (e.stack || "").split("\n").slice(1, 5).join("\n")); process.exit(1); });
