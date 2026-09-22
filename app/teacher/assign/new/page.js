"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Calendar, ChevronLeft } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { engineSupportsDistressCall } from "../../../../lib/distressCallEngines";
import { GAME_SKINS, DEFAULT_GAME_SKIN } from "../../../../lib/frequencyRushSkins";
import TeacherHUD from "../../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../../lib/teacherTheme";
import { missionMapTeksLabel, missionMapTeksCode } from "../../../../lib/cases/mission-map/teksLabels";

// Sept 13 — moved to the console-interior look, same pattern as My Classes,
// Reports, and Student Progress: TeacherSidebar+TeacherPageBanner swapped
// for TeacherHUD, decorative violet became this page's own Mission Control
// pink (ACCENT — same family as My Classes since this is reached from
// there), and small pastel "soft" tints (violetSoft/tealSoft/cream) are now
// computed from the shared palette instead of separate hardcoded hex. Two
// things deliberately did NOT change color: the Distress Call section
// keeps its own violet identity throughout (same reasoning as the "Live"
// badge staying violet on My Classes — it's a distinct feature signature,
// not page branding), and the Learning Target callout now matches the aqua
// used for the identical callout on My Classes' case-detail modal rather
// than inventing its own teal, since it's the same UI concept in both
// places. No query, calculation, or assignment-flow logic changed.
const ACCENT = PAGE_ACCENTS["/teacher/assign"];
const BG = PAGE_BACKGROUNDS["/teacher/assign/new"];

// Roster as of the Aug 2026 challenge-type consolidation: Model Makeover is
// now part of Repair Desk (visual/diagram fix mode) and Short-Form Video
// Detective is now part of Fact-Check Desk (video/caption claim format).
// Comment Court / The Tribunal (and the retired You Be the Judge + Comment
// Section + Bracket Battle types it absorbed) was removed Sept 12 2026 —
// those shapes became the Signal Check "Weigh-In" and "Thread" formats
// rather than a separate engine, and both of those were themselves retired
// Sept 16 2026 (see SignalCheckClient.js), so none of them ship today. Coming-soon tiles stay `real: false` ("Coming Soon") until they
// have authored content. Group Chat, Fact-Check Desk
// (branded "Signal Check" in the UI, engine "fact_check_desk"), Mission Map
// (as of Aug 30 2026), and — as of Sept 3 2026, one case ("3.8B-SL", "Ramp
// Test") — Simulation Lab all have real content now, so all four are
// `real: true`. NOTE (Sept 3 2026): this exact flag was the reason Mission
// Map's tile sat un-clickable as "Coming Soon" the day its first case shipped
// (see ClearCenters_STATE.md's fourth Aug 30 session-log entry) — flip this
// flag to `real: true` the same day a new engine's first case is authored,
// not as an afterthought once someone notices the tile is disabled.
const CHALLENGE_TYPES = [
  { key: "group_chat", label: "Group Chat", image: "/teacher/challenges/group_chat.jpg", real: true,
    description: "Students role-play as characters, concepts, or parts of a system in a live group chat, using evidence to prove what's really going on." },
  { key: "fact_check_desk", label: "Signal Check", image: "/teacher/challenges/fact_check_desk.jpg", real: true,
    description: "Students play a station Cadet, scanning Incoming Transmissions — headlines, data readouts, even recovered footage — for the truth before stamping a verdict: True, Misleading, or False." },
  { key: "mission_map", label: "Mission Map", image: "/teacher/challenges/mission_map.jpg", real: true,
    description: "Students move through locked checkpoints, collecting clues, rejecting a tempting wrong answer, and building a reasoning chain to unlock the final response." },
  { key: "simulation_lab", label: "Simulation Lab", image: "/teacher/challenges/simulation_lab.jpg", real: true,
    description: "Students adjust real variables with sliders and dials, watch the results happen live, and explain the pattern using data they generated themselves." },
  { key: "frequency_rush", label: "Frequency Rush", image: "/teacher/challenges/frequency_rush.jpg", real: true,
    description: "Students race the clock to lock onto the right definition before the signal scrambles — fast vocabulary review with streaks and speed bonuses, replayable anytime as practice." },
  { key: "signal_defense", label: "Signal Ops", image: "/teacher/challenges/signal_defense.jpg", real: true,
    description: "The whole class defends one shared base together — answering review questions to keep power, health, and salvage up before the next wave hits." },
  // Sept 22, 2026 — Relay Station, the typing center (design doc:
  // claude/RelayStation_Digital_Design_v1.md). Tile art is an SVG
  // placeholder until Emily's batched image upload replaces it with a .jpg.
  { key: "relay_station", label: "Relay Station", image: "/teacher/challenges/relay_station.svg", real: true,
    description: "Typing practice with a purpose. Assign the Foundations Track once and every student climbs 20 levels at their own pace — home row to capitals, numbers, and layout — moving up automatically. Then assign grade-level readings: conversations, paragraphs, and letters to relay letter for letter." },
  // Coming soon — kept below live tiles (Assign library sorts real:true first as well).
  { key: "repair_desk", label: "Repair Desk", image: "/teacher/challenges/repair_desk.jpg", real: false,
    description: "A broken ticket arrives — a flawed diagram, model, or work sample. Students diagnose what's wrong, fix it, and explain the fix to whoever sent it in." },
  { key: "museum_exhibit", label: "Museum Exhibit Builder", image: "/teacher/challenges/museum_exhibit.jpg", real: false,
    description: "Students curate a small exhibit from a pile of evidence — choosing the strongest items, rejecting at least one on purpose, and writing placards that explain why." },
  { key: "newsroom", label: "Newsroom", image: "/teacher/challenges/newsroom.jpg", real: false,
    description: "Students gather their own evidence from the scene, then build and produce a report — headline, script, and all — before it airs." },
  { key: "territory_builder", label: "Territory Builder", image: "/teacher/challenges/territory_builder.jpg", real: false,
    description: "Students place things on an actual map — habitats, settlements, resources — and get feedback on whether the placement actually holds up." },
];

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

// A case's `engine` column tells us which challenge type it belongs to.
// Newsroom currently only ships Breaking News mode ("newsroom_bn"), but
// Field Report/Data Desk/Special Report will land as "newsroom_fr" etc.
// later — all of those should still show up under the one Newsroom tile.
function matchesChallenge(caseEngine, challengeKey) {
  if (!challengeKey) return false;
  if (challengeKey === "newsroom") return (caseEngine || "").startsWith("newsroom");
  return (caseEngine || "group_chat") === challengeKey;
}


// Sept 16, 2026 — Signal Check used to ship each TEKS standard in three
// formats (Verdict, Weigh-In, Thread), so this file grouped its cases into
// one card per standard with a chip per format, instead of the plain tile
// grid every other challenge type uses. Weigh-In and Thread are gone, so
// the grouping helpers went with them and Signal Check now renders as
// tiles like everything else.
//
// The retired cases may still have rows in the `cases` table — see
// remove_signal_check_wi_th_cases.sql. This filter keeps them out of the
// library either way, so a stale row can't put a retired case back in
// front of a teacher.
function isRetiredSignalCheckCase(standard) {
  return /-SC-(WI|TH)$/i.test(String(standard || ""));
}


function NewAssignmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const incomingClassId = searchParams.get("classId");

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [assignClassId, setAssignClassId] = useState(incomingClassId || null);
  const [error, setError] = useState(null);

  const [cases, setCases] = useState([]);
  const [caseSearch, setCaseSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignedSuccess, setAssignedSuccess] = useState(false);
  const [newAssignmentId, setNewAssignmentId] = useState(null);

  // Distress Call (Sept 7 design doc §4) — a flag on this assignment, not a
  // new engine. Only offered when the picked case's engine has an
  // instant-graded portion to actually count (see lib/distressCallEngines.js
  // for which ones, and lib/distressCall.js for why Group Chat isn't one).
  const [distressCallEnabled, setDistressCallEnabled] = useState(false);
  const [distressCallTarget, setDistressCallTarget] = useState("");
  const [distressCallDeadline, setDistressCallDeadline] = useState("");
  // The prize for hitting the target — set now, up front, rather than
  // decided after the fact (Emily's Sept 8 call: promising the reward before
  // the class starts is what makes it motivating, and it means the points go
  // out the instant the goal is cleared even if no teacher is watching).
  // 0/blank means no reward, just the shared meter.
  const [distressCallRewardPoints, setDistressCallRewardPoints] = useState("");

  // Sept 12, 2026 — Frequency Rush "world skin" (design note in
  // lib/frequencyRushSkins.js): which static widget file the assignment's
  // students play, chosen here by the teacher rather than per-student —
  // same "one more conditional field on the assign form" pattern as
  // Distress Call above, just for a different engine.
  const [gameSkin, setGameSkin] = useState(DEFAULT_GAME_SKIN);

  const [challengeStep, setChallengeStep] = useState("library");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [browseGrade, setBrowseGrade] = useState("5");
  const [browseSubject, setBrowseSubject] = useState("Science");

  const [roster, setRoster] = useState([]);
  const [targetMode, setTargetMode] = useState("whole"); // 'whole' | 'specific'
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  useEffect(() => {
    if (!teacherId) return;
    supabase.from("classes").select("*").eq("teacher_id", teacherId).order("created_at").then(({ data }) => setClasses(data || []));
  }, [teacherId]);

  useEffect(() => {
    if (!assignClassId) { setRoster([]); return; }
    supabase.from("students").select("id, first_name").eq("class_id", assignClassId).order("first_name").then(({ data }) => setRoster(data || []));
    setTargetMode("whole");
    setSelectedStudentIds([]);
  }, [assignClassId]);

  useEffect(() => {
    supabase.from("cases").select("standard, title, grade, subject, engine, learning_target, lesson_summary, misconception_note").then(({ data }) => setCases(data || []));
  }, []);

  const searchQ = caseSearch.trim().toLowerCase();
  const filteredCases = cases.filter((c) => {
    if (c.grade !== parseInt(browseGrade) || c.subject !== browseSubject) return false;
    if (!matchesChallenge(c.engine, selectedChallenge?.key)) return false;
    if (isRetiredSignalCheckCase(c.standard)) return false;
    if (!searchQ) return true;
    return (
      (c.title || "").toLowerCase().includes(searchQ) ||
      (c.standard || "").toLowerCase().includes(searchQ)
    );
  });

  const targetClass = classes.find((c) => c.id === assignClassId);

  function toggleStudentTarget(id) {
    setSelectedStudentIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleAssign() {
    if (!selectedCase || !assignClassId) return;
    if (targetMode === "specific" && selectedStudentIds.length === 0) {
      setError("Pick at least one student, or switch to Whole Class.");
      return;
    }
    setAssigning(true);
    setError(null);

    const distressCallSupported = engineSupportsDistressCall(selectedCase.engine);
    const assignmentFields = { class_id: assignClassId, case_standard: selectedCase.standard, due_date: dueDate || null };
    if (distressCallSupported && distressCallEnabled) {
      assignmentFields.distress_call = true;
      assignmentFields.distress_call_target = distressCallTarget ? parseInt(distressCallTarget, 10) : null;
      assignmentFields.distress_call_deadline = distressCallDeadline || null;
      assignmentFields.distress_call_reward_points = distressCallRewardPoints ? parseInt(distressCallRewardPoints, 10) : 0;
    }
    if (selectedCase.engine === "frequency_rush") {
      assignmentFields.game_skin = gameSkin;
    }

    const { data: newAssignment, error: insertError } = await supabase
      .from("assignments")
      .insert(assignmentFields)
      .select()
      .single();
    if (insertError) {
      setAssigning(false);
      setError("Couldn't assign the case: " + insertError.message);
      return;
    }

    if (targetMode === "specific") {
      const rows = selectedStudentIds.map((studentId) => ({ assignment_id: newAssignment.id, student_id: studentId }));
      const { error: targetError } = await supabase.from("assignment_students").insert(rows);
      if (targetError) {
        setAssigning(false);
        setError("Assigned, but couldn't save the student list: " + targetError.message);
        return;
      }
    }

    setAssigning(false);
    setNewAssignmentId(newAssignment.id);
    setAssignedSuccess(true);
  }

  function assignAnother() {
    setSelectedCase(null);
    setDueDate("");
    setChallengeStep("library");
    setSelectedChallenge(null);
    setAssignedSuccess(false);
    setNewAssignmentId(null);
    setTargetMode("whole");
    setSelectedStudentIds([]);
    setDistressCallEnabled(false);
    setDistressCallTarget("");
    setDistressCallDeadline("");
    setDistressCallRewardPoints("");
    setGameSkin(DEFAULT_GAME_SKIN);
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>Loading...</div>;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      {/* Emily's Challenge Library background (Aug 27) — a 1672x941 image with
          the desk/window/crystal art on its right side, close enough to the
          right and bottom edges that a plain "cover" would risk cropping it
          on a browser window shaped differently from the source image. Kept
          the "contain" + matching-canvas-color fix this page already had
          (the same idea the Overview scene later adopted site-wide on
          Sept 13, second pass — nothing here is ever cropped): the image is
          never cropped, and the sampled near-white lavender fallback color
          blends into any letterboxed edge instead of showing as a bar.
          Fixed to the viewport so it stays put while this page's content
          (which can get tall — case grids, forms) scrolls over it. */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundColor: COLORS.canvas,
          backgroundImage: `url(${BG})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Sept 14 — this wrapper and the content wrapper below both had
          zIndex: 1. Equal z-index means CSS falls back to DOM order to break
          the tie, so the content div (later in the DOM) was painting over
          this one wherever they overlapped — including over the HUD's own
          open dropdown, which is what showed up as page-heading text
          ghosting through the Mission Control/Observatory/Support Deck
          menus on this page specifically (every other console page renders
          TeacherHUD as a plain sibling, not inside a competing z-indexed
          wrapper, so they never had this). Bumping this one above the
          content wrapper fixes it without touching the content wrapper's
          own stacking (still above the zIndex:0 background art). */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <TeacherHUD title="Challenge Library" subtitle="Mission Control — build a new assignment" accent={ACCENT} teacherEmail={teacherEmail} />
      </div>

      <div style={{ position: "relative", zIndex: 1, flex: 1, padding: "28px 36px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: challengeStep === "library" ? 1240 : challengeStep === "caseList" ? 920 : 640 }}>
          <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            <ChevronLeft size={16} /> Back to My Classes
          </button>

          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, margin: "0 0 4px 0", color: COLORS.textDark }}>Challenge Library</h1>
            <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0 }}>
              Browse challenge types and cases, then choose which class to assign to.
            </p>
          </div>

          {error && <div style={{ background: `${COLORS.danger}18`, border: `1px solid ${COLORS.danger}55`, color: "#8A2A22", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}

          {assignedSuccess ? (
            <div style={panelStyle(ACCENT, { padding: 32, textAlign: "center" })}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: COLORS.textDark }}>Assigned!</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: distressCallEnabled ? 10 : 20 }}>
                "{selectedCase.title}" is now assigned to {targetMode === "specific" ? `${selectedStudentIds.length} student${selectedStudentIds.length === 1 ? "" : "s"} in` : "everyone in"} {targetClass?.name}.
              </p>
              {distressCallEnabled && (
                <p style={{ color: COLORS.violet, fontSize: 12.5, fontWeight: 700, marginBottom: 20, background: `${COLORS.violet}1A`, borderRadius: 10, padding: "8px 12px", display: "inline-block" }}>
                  🚨 Distress Call is live{distressCallTarget ? ` — target: ${distressCallTarget} checkpoints` : ""}. Students will see the meter update as they work.
                  {!!distressCallRewardPoints && parseInt(distressCallRewardPoints, 10) > 0 && ` Everyone gets +${distressCallRewardPoints} crystal points when they hit it.`}
                </p>
              )}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {distressCallEnabled && newAssignmentId && (
                  <button onClick={() => router.push(`/teacher/live-ops-board?assignmentId=${newAssignmentId}`)} className="gc-btn" style={{ background: "#0D1B2A", color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>📡 Project on Live Ops Board</button>
                )}
                {selectedCase?.engine === "relay_station" && /\.TRACK$/.test(selectedCase.standard || "") && (
                  <button onClick={() => router.push(`/teacher/typing-track?classId=${assignClassId}`)} className="gc-btn" style={{ background: "#0D1B2A", color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>⌨️ Open Typing Track Board</button>
                )}
                {selectedCase?.engine === "signal_defense" && newAssignmentId && (
                  <button onClick={() => router.push(`/teacher/signal-ops-board?assignmentId=${newAssignmentId}`)} className="gc-btn" style={{ background: "#0D1B2A", color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Open Signal Ops Board</button>
                )}
                <button onClick={assignAnother} className="gc-btn" style={{ background: `${ACCENT}22`, color: ACCENT, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Assign Another</button>
                <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Back to My Classes</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ flex: 1, minWidth: 0, ...panelStyle(ACCENT, { padding: 16 }) }}>
                {challengeStep === "library" && (
                  <>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: COLORS.textDark }}>1. Choose a Challenge Type</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 14 }}>
                      {[...CHALLENGE_TYPES].sort((a, b) => Number(b.real) - Number(a.real)).map((ch) => (
                        <button key={ch.key} className="gc-btn" disabled={!ch.real} onClick={() => { setSelectedChallenge(ch); setChallengeStep("gradeSubject"); }} style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.border}`, padding: 0, textAlign: "left", opacity: ch.real ? 1 : 0.7, cursor: ch.real ? "pointer" : "default", background: COLORS.white }}>
                          <div style={{ position: "relative", height: 110 }}>
                            <img src={ch.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: ch.real ? "none" : "grayscale(0.3)" }} />
                            {!ch.real && <span style={{ position: "absolute", top: 6, right: 6, fontSize: 9.5, fontWeight: 700, background: "rgba(255,255,255,.92)", color: COLORS.textMuted, padding: "2px 8px", borderRadius: 999 }}>Coming Soon</span>}
                          </div>
                          <div style={{ padding: "8px 10px 2px 10px", fontSize: 12.5, fontWeight: 700, color: COLORS.textDark }}>{ch.label}</div>
                          {ch.description && <div style={{ padding: "0 10px 10px 10px", fontSize: 10.5, lineHeight: 1.4, color: COLORS.textMuted }}>{ch.description}</div>}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {challengeStep === "gradeSubject" && (
                  <>
                    <button onClick={() => setChallengeStep("library")} className="gc-btn" style={{ background: "none", color: ACCENT, fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>← Back to Challenge Types</button>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: COLORS.textDark }}>2. {selectedChallenge?.label} — choose grade & subject</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 14 }}>You can assign any grade level to any class — pick whichever fits this student or group.</div>

                    <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: .4, marginBottom: 8 }}>Grade Level</div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                      {[{ v: "3", label: "3rd Grade" }, { v: "4", label: "4th Grade" }, { v: "5", label: "5th Grade" }].map((g) => (
                        <button key={g.v} className="gc-btn" onClick={() => setBrowseGrade(g.v)} style={{ flex: 1, padding: 12, borderRadius: 12, fontWeight: 700, fontSize: 14, background: browseGrade === g.v ? ACCENT : "rgba(255,255,255,.55)", color: browseGrade === g.v ? COLORS.white : COLORS.textDark, border: "2px solid transparent" }}>
                          {g.label}
                        </button>
                      ))}
                    </div>

                    <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: .4, marginBottom: 8 }}>Subject</div>
                    {/* Sept 21, 2026 — Math and ELAR tiles added alongside Science and
                        Social Studies (2x2 grid, so each tile keeps the size it had in the
                        old two-across row). `v` must match cases.subject exactly.
                        Tile colors are the four subject frame colors. Until
                        subject_math.jpg / subject_elar.jpg exist in public/teacher/,
                        the image hides itself on error and the colored label
                        underneath shows instead — no broken-image icon. */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 14 }}>
                      {[
                        { v: "Science", img: "/teacher/subject_science.jpg", color: "#39D97A" },
                        { v: "Social Studies", img: "/teacher/subject_social_studies.jpg", color: "#FFDD40" },
                        { v: "Math", img: "/teacher/subject_math.jpg", color: "#22C3F0" },
                        { v: "ELAR", img: "/teacher/subject_elar.jpg", color: "#E0338E" },
                      ].map((s) => (
                        <button
                          key={s.v}
                          className="gc-btn"
                          onClick={() => setBrowseSubject(s.v)}
                          style={{
                            position: "relative",
                            height: 130,
                            borderRadius: 16,
                            border: browseSubject === s.v ? `3px solid ${ACCENT}` : "3px solid transparent",
                            padding: 0,
                            overflow: "hidden",
                            background: `linear-gradient(135deg, ${s.color}40, #F4F1FF 70%)`,
                            boxShadow: browseSubject === s.v ? `0 6px 18px ${ACCENT}47` : "0 2px 8px rgba(13,27,42,.06)",
                          }}
                        >
                          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#3B2A7A", letterSpacing: .3 }}>{s.v}</span>
                          <img src={s.img} alt={s.v} onError={(e) => { e.currentTarget.style.display = "none"; }} style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </button>
                      ))}
                    </div>

                    <button onClick={() => setChallengeStep("caseList")} className="gc-btn" style={{ width: "100%", background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 14 }}>
                      Browse {browseGrade === "3" ? "3rd" : `${browseGrade}th`} Grade {browseSubject} Cases →
                    </button>
                  </>
                )}

                {challengeStep === "caseList" && (
                  <>
                    <button onClick={() => setChallengeStep("gradeSubject")} className="gc-btn" style={{ background: "none", color: ACCENT, fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>← Change Grade/Subject</button>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark }}>3. Choose a case — {browseGrade === "3" ? "3rd" : `${browseGrade}th`} Grade {browseSubject}</div>
                      <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>
                        {`${filteredCases.length} case${filteredCases.length === 1 ? "" : "s"}`}
                      </div>
                    </div>
                    <div style={{ position: "relative", marginBottom: 12 }}>
                      <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: COLORS.textMuted }} />
                      <input value={caseSearch} onChange={(e) => setCaseSearch(e.target.value)} placeholder="Search by title or standard..." style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, maxHeight: 420, overflowY: "auto" }}>
                      {filteredCases.map((c) => {
                        const isSelected = selectedCase && selectedCase.standard === c.standard;
                        return (
                          <button key={c.standard} className="gc-btn" onClick={() => { setSelectedCase(c); }} style={{ textAlign: "left", background: isSelected ? `${ACCENT}15` : COLORS.white, border: isSelected ? `2px solid ${ACCENT}` : "2px solid transparent", borderRadius: 14, overflow: "hidden", padding: 0, boxShadow: "0 2px 8px rgba(13,27,42,.05)" }}>
                            <div style={{ height: 88, overflow: "hidden" }}>
                              <img src={caseImagePath(c.standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            </div>
                            <div style={{ padding: "10px 12px 12px 12px" }}>
                              <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginBottom: 4, color: COLORS.textDark }}>{c.title}</div>
                              {/* Sept 16, 2026 — for Mission Map this chip used
                                  to show the case's internal concept number
                                  (3.1-MM), which reads like a TEKS code and
                                  isn't one. Show the real standard instead
                                  when we have it; every other engine already
                                  puts the real standard in `standard`. */}
                              <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, color: ACCENT, background: `${ACCENT}22`, padding: "2px 8px", borderRadius: 999 }}>{missionMapTeksCode(c.standard) || c.standard}</span>
                            </div>
                          </button>
                        );
                      })}
                      {filteredCases.length === 0 && (
                        <div style={{ gridColumn: "1 / -1", fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: 16 }}>
                          No {browseGrade === "3" ? "3rd" : `${browseGrade}th`} Grade {browseSubject} cases yet — check back once they're added!
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {selectedCase && (selectedCase.learning_target || selectedCase.lesson_summary || selectedCase.misconception_note) && (
                <div style={panelStyle(ACCENT, { padding: 16 })}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                      <img src={caseImagePath(selectedCase.standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textDark }}>{selectedCase.title}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                        {missionMapTeksLabel(selectedCase.standard) || selectedCase.standard}
                      </div>
                    </div>
                  </div>

                  {selectedCase.learning_target && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, letterSpacing: .4, marginBottom: 5, textTransform: "uppercase" }}>Learning Target</div>
                      <div style={{ background: `${COLORS.aqua}18`, borderRadius: 10, padding: "9px 11px", fontSize: 13, color: COLORS.textDark, lineHeight: 1.5 }}>
                        🎯 {selectedCase.learning_target}
                      </div>
                    </div>
                  )}

                  {selectedCase.lesson_summary && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, letterSpacing: .4, marginBottom: 5, textTransform: "uppercase" }}>Lesson Summary</div>
                      <div style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.5 }}>
                        {selectedCase.lesson_summary}
                      </div>
                    </div>
                  )}

                  {selectedCase.misconception_note && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, letterSpacing: .4, marginBottom: 5, textTransform: "uppercase" }}>Watch For</div>
                      <div style={{ background: `${COLORS.warning}18`, border: `1px solid ${COLORS.warning}55`, borderRadius: 10, padding: "9px 11px", fontSize: 12.5, color: "#7A4A00", lineHeight: 1.5 }}>
                        ⚠️ {selectedCase.misconception_note}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedCase && (
                <div style={panelStyle(ACCENT, { padding: 16 })}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: COLORS.textDark }}>4. Which class is this for?</div>
                  {classes.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                      {classes.map((c) => (
                        <button
                          key={c.id}
                          className="gc-btn"
                          onClick={() => setAssignClassId(c.id)}
                          style={{
                            background: assignClassId === c.id ? `${ACCENT}22` : "rgba(255,255,255,.55)",
                            border: assignClassId === c.id ? `2px solid ${ACCENT}` : "2px solid transparent",
                            borderRadius: 10,
                            padding: "9px 14px",
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: COLORS.textDark,
                          }}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 10 }}>You don't have any classes yet — create one on My Classes first.</p>
                  )}

                  {assignClassId && (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: COLORS.textDark }}>5. Who gets it?</div>
                      <div style={{ display: "inline-flex", background: "rgba(255,255,255,.55)", borderRadius: 999, padding: 3, marginBottom: 14, gap: 3 }}>
                        <button className="gc-btn" onClick={() => setTargetMode("whole")} style={{ border: "none", padding: "7px 16px", borderRadius: 999, fontWeight: 700, fontSize: 12.5, background: targetMode === "whole" ? ACCENT : "transparent", color: targetMode === "whole" ? COLORS.white : COLORS.textMuted }}>
                          Whole Class
                        </button>
                        <button className="gc-btn" onClick={() => setTargetMode("specific")} style={{ border: "none", padding: "7px 16px", borderRadius: 999, fontWeight: 700, fontSize: 12.5, background: targetMode === "specific" ? ACCENT : "transparent", color: targetMode === "specific" ? COLORS.white : COLORS.textMuted }}>
                          Just Some Students
                        </button>
                      </div>

                      {targetMode === "specific" && (
                        <div style={{ display: "grid", gap: 6, maxHeight: 200, overflowY: "auto", marginBottom: 14, background: "rgba(255,255,255,.4)", borderRadius: 10, padding: 10 }}>
                          {roster.length > 0 ? roster.map((s) => {
                            const checked = selectedStudentIds.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                className="gc-btn"
                                onClick={() => toggleStudentTarget(s.id)}
                                style={{ display: "flex", alignItems: "center", gap: 8, background: checked ? `${ACCENT}22` : COLORS.white, border: checked ? `1.5px solid ${ACCENT}` : `1.5px solid ${COLORS.border}`, borderRadius: 8, padding: "7px 10px", textAlign: "left" }}
                              >
                                <div style={{ width: 16, height: 16, borderRadius: 4, background: checked ? ACCENT : COLORS.white, border: `1.5px solid ${checked ? ACCENT : COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                                  {checked ? "✓" : ""}
                                </div>
                                <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.textDark }}>{s.first_name}</span>
                              </button>
                            );
                          }) : (
                            <div style={{ fontSize: 12.5, color: COLORS.textMuted, textAlign: "center", padding: 8 }}>No students in this class yet.</div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: COLORS.textDark }}>6. Due date (optional)</div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <Calendar size={14} style={{ position: "absolute", left: 10, top: 11, color: COLORS.textMuted }} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                  </div>

                  {selectedCase?.engine === "frequency_rush" && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: COLORS.textDark }}>🛰️ Game world</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {GAME_SKINS.map((skin) => (
                          <button
                            key={skin.id}
                            type="button"
                            className="gc-btn"
                            onClick={() => setGameSkin(skin.id)}
                            style={{
                              background: gameSkin === skin.id ? ACCENT : COLORS.white,
                              color: gameSkin === skin.id ? COLORS.white : COLORS.textDark,
                              border: `1.5px solid ${gameSkin === skin.id ? ACCENT : COLORS.border}`,
                              borderRadius: 999,
                              padding: "7px 14px",
                              fontWeight: 700,
                              fontSize: 12.5,
                            }}
                          >
                            {skin.label}
                          </button>
                        ))}
                      </div>
                      <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "6px 0 0 0" }}>
                        Same words, same scoring — just a different look for the run.
                      </p>
                    </div>
                  )}

                  {engineSupportsDistressCall(selectedCase?.engine) && (
                    <div style={{ marginBottom: 14, border: `1.5px solid ${distressCallEnabled ? COLORS.violet : COLORS.border}`, borderRadius: 12, padding: 12, background: distressCallEnabled ? `${COLORS.violet}1A` : COLORS.white }}>
                      <button
                        type="button"
                        className="gc-btn"
                        onClick={() => setDistressCallEnabled((v) => !v)}
                        style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: 0, width: "100%", textAlign: "left" }}
                      >
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: distressCallEnabled ? COLORS.violet : COLORS.white, border: `1.5px solid ${distressCallEnabled ? COLORS.violet : COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                          {distressCallEnabled ? "✓" : ""}
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark }}>🚨 Make this a Distress Call</span>
                      </button>
                      <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "6px 0 0 24px" }}>
                        Turns this into a shared goal — students see a live meter as checkpoints get cleared across the group.
                      </p>
                      {distressCallEnabled && (
                        <div style={{ marginTop: 10, marginLeft: 24 }}>
                          <div style={{ display: "flex", gap: 10 }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>Target (checkpoints)</label>
                              <input
                                type="number"
                                min="1"
                                value={distressCallTarget}
                                onChange={(e) => setDistressCallTarget(e.target.value)}
                                placeholder="e.g. 50"
                                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "7px 10px", fontSize: 13, boxSizing: "border-box", marginTop: 3 }}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>Deadline (optional)</label>
                              <input
                                type="datetime-local"
                                value={distressCallDeadline}
                                onChange={(e) => setDistressCallDeadline(e.target.value)}
                                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "7px 10px", fontSize: 13, boxSizing: "border-box", marginTop: 3 }}
                              />
                            </div>
                          </div>

                          {/* The prize, promised up front (see the state comment above
                              for why) — every student targeted by this assignment gets
                              +N crystal points the moment the class clears the target,
                              automatically, with no teacher action needed. Presets match
                              the same 5/10/25/50 quick-picks the Rewards & S.A.M. modal
                              on the teacher home page already uses. */}
                          <div style={{ marginTop: 10 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>💎 Crystal reward when the target is hit (optional)</label>
                            <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
                              {[0, 5, 10, 25, 50].map((amt) => (
                                <button
                                  key={amt}
                                  type="button"
                                  onClick={() => setDistressCallRewardPoints(amt === 0 ? "" : String(amt))}
                                  className="gc-btn"
                                  style={{
                                    background: (amt === 0 ? !distressCallRewardPoints : distressCallRewardPoints === String(amt)) ? COLORS.violet : COLORS.white,
                                    color: (amt === 0 ? !distressCallRewardPoints : distressCallRewardPoints === String(amt)) ? COLORS.white : COLORS.textDark,
                                    border: `1.5px solid ${COLORS.border}`,
                                    borderRadius: 999,
                                    padding: "5px 12px",
                                    fontWeight: 700,
                                    fontSize: 12,
                                  }}
                                >
                                  {amt === 0 ? "None" : `+${amt}`}
                                </button>
                              ))}
                              <input
                                type="number"
                                min="0"
                                value={distressCallRewardPoints}
                                onChange={(e) => setDistressCallRewardPoints(e.target.value)}
                                placeholder="Custom"
                                style={{ width: 84, border: "2px solid #ECEAF5", borderRadius: 10, padding: "5px 8px", fontSize: 12.5, boxSizing: "border-box" }}
                              />
                            </div>
                            {!!distressCallRewardPoints && parseInt(distressCallRewardPoints, 10) > 0 && (
                              <p style={{ fontSize: 11, color: COLORS.violet, fontWeight: 600, margin: "6px 0 0 0" }}>
                                🎉 Every targeted student gets +{distressCallRewardPoints} crystal points the instant the class hits the target.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button className="gc-btn" onClick={handleAssign} disabled={assigning || !assignClassId} style={{ width: "100%", background: assignClassId ? ACCENT : "#D8D4E8", color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                    {assigning
                      ? "Assigning..."
                      : !assignClassId
                      ? "Choose a class first"
                      : targetMode === "specific"
                      ? `Assign to ${selectedStudentIds.length} student${selectedStudentIds.length === 1 ? "" : "s"} →`
                      : `Assign to ${targetClass?.name} →`}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewAssignmentPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>}>
      <NewAssignmentContent />
    </Suspense>
  );
}
