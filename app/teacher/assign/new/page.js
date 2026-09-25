"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Calendar, ChevronLeft } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { engineSupportsDistressCall, distressCallUnit } from "../../../../lib/distressCallEngines";
import { isCustomCode, customCodeOwnerPrefix } from "../../../../lib/cases/relay-station";
import { GAME_SKINS, DEFAULT_GAME_SKIN } from "../../../../lib/frequencyRushSkins";
import { QUESTS as EXPEDITION_QUESTS } from "../../../../lib/cases/expedition-station/catalog";

// Sept 24, 2026 — teacher-set Frequency Rush question timer. The game
// accepts 0-60 seconds; 0 means no timer.
// Sept 24, 2026 — Frequency Rush custom word lists (FR.C.<teacher8>.<id>).
// Private to the teacher who made them, like Relay Station's custom texts,
// and grouped under one "My Word Lists" topic. Inlined here on purpose:
// lib/frequencyRushCustomLists.js carries a large word list meant for the server.
const FR_CUSTOM_LIST_RE = /^FR\.C\.([a-z0-9]{8})\.[a-z0-9]+$/;
const MY_WORD_LISTS = "My Word Lists";

const QUESTION_SECONDS_OPTIONS = [
  { value: 0, label: "No timer" },
  { value: 5, label: "5 sec" },
  { value: 8, label: "8 sec" },
  { value: 10, label: "10 sec" },
  { value: 15, label: "15 sec" },
  { value: 20, label: "20 sec" },
  { value: 30, label: "30 sec" },
];
const CRYSTAL_DIVE_MINUTES = [5, 10, 15, 20];
import Link from 'next/link';
import {BridgePage,PageHeading,ClassTabs,Empty} from '../../../../components/teacher/BridgeUI';
import {subjectStyle,engineInfo,SUBJECTS,ENGINES} from '../../../../lib/teacherBridge';
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
const ACCENT = "#7541cf";
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
  // claude/RelayStation_Digital_Design_v1.md). Real tile art applied later
  // the same day, from Emily's CC_DROP_ALL_ship_slim drop; the SVG
  // placeholder it replaced is still in public/ and can be deleted.
  { key: "relay_station", label: "Relay Station", image: "/teacher/challenges/relay_station.jpg", real: true,
    description: "Typing practice with a purpose. Assign the Foundations Track once and every student climbs 20 levels at their own pace — home row to capitals, numbers, and layout — moving up automatically. Then assign grade-level readings: conversations, paragraphs, and letters to relay letter for letter." },
  // Sept 22, 2026 — Assembly Deck, the build-it center (design doc:
  // claude/AssemblyDeck_Digital_Design_v1.md). Wave 1 ships the paragraph
  // mode; investigation, map, and word-problem modes follow. Territory
  // Builder was retired into this engine's map mode per Emily's Sept 2026
  // call, so its tile is gone rather than promising a separate engine.
  { key: "assembly_deck", label: "Assembly Deck", image: "/teacher/challenges/assembly_deck.jpg", real: true,
    description: "Students build the whole piece, not one answer — three paragraphs assembled sentence by sentence, with decoys that have to be left in the tray and explained, then put in the order a reader actually needs. Runs about 20 minutes." },
  { key: "classification_lab", label: "Classification Lab", image: "/lab/room.jpg", real: true,
    description: "Students sort by the rule on the card, not the obvious clue. Three pages: a sort, a harder sort, and a Venn. A miss says how many are wrong, not which ones. About 20 minutes." },
  { key: "exhibit_hall", label: "Exhibit Hall", image: "/maker/hall.jpg", real: true,
    description: "Students stamp each source, choose what belongs on a four-spot exhibit, and write the labels. A wrong piece stays. About 20 minutes." },
  // Sept 25, 2026 — Expedition Station (Frozen Relay MA.4.3E-XP). Tile already
  // appears via ENGINES in teacherBridge; this CHALLENGE_TYPES entry is what
  // lets Assign's case filter actually show the case (real:true gate).
  { key: "expedition_station", label: "Expedition Station", image: "/teacher/challenges/mission_map.jpg", real: true,
    description: "A 15-task quest on one planet. Station mode: four cards, then a challenge. About 15–20 minutes per act." },
  // Coming soon — kept below live tiles (Assign library sorts real:true first as well).
  { key: "repair_desk", label: "Repair Desk", image: "/teacher/challenges/repair_desk.jpg", real: false,
    description: "A broken ticket arrives — a flawed diagram, model, or work sample. Students diagnose what's wrong, fix it, and explain the fix to whoever sent it in." },
  { key: "museum_exhibit", label: "Museum Exhibit Builder", image: "/teacher/challenges/museum_exhibit.jpg", real: false,
    description: "Students curate a small exhibit from a pile of evidence — choosing the strongest items, rejecting at least one on purpose, and writing placards that explain why." },
  { key: "newsroom", label: "Newsroom", image: "/teacher/challenges/newsroom.jpg", real: false,
    description: "Students gather their own evidence from the scene, then build and produce a report — headline, script, and all — before it airs." },
];

// A case with no thumbnail file used to render a broken-image icon — as of
// Sept 22, 2026 that is 100 real cases (94 Relay Station + 6 Assembly Deck),
// and every future case is in the same state until its art is generated.
// Hide the image and tint the frame instead, so an art-less case reads as a
// plain card rather than a bug.
function thumbFallback(e) {
  const img = e.currentTarget;
  img.style.display = "none";
  if (img.parentElement) img.parentElement.style.background = "linear-gradient(135deg, #8C52F2 0%, #4DD6FF 100%)";
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

// Sept 25, 2026 — Catalog fallback for Expedition Station. Supabase may omit
// the row (RLS / select / project mismatch) even when the case exists for
// assign FK; merge catalog quests so Assign still lists them. Prefer the DB
// row when present; only add catalog rows whose standard is missing.
const CASES_SELECT_FULL =
  "standard, title, grade, subject, engine, learning_target, lesson_summary, misconception_note";
const CASES_SELECT_MINIMAL = "standard, title, grade, subject, engine";

function expeditionStationLibraryRows() {
  return Object.values(EXPEDITION_QUESTS).map((quest) => ({
    standard: quest.standard || quest.id,
    title:
      typeof quest.title === "string" && quest.title.startsWith("Expedition Station:")
        ? quest.title
        : `Expedition Station: ${quest.title}`,
    engine: "expedition_station",
    grade: quest.grade,
    subject: quest.subject,
    learning_target: quest.iCan || null,
    lesson_summary: quest.blurb || quest.mission || null,
    misconception_note: null,
  }));
}

function mergeExpeditionStationCatalog(rows) {
  const list = Array.isArray(rows) ? rows : [];
  const byStandard = new Set(list.map((r) => r.standard));
  const missing = expeditionStationLibraryRows().filter(
    (row) => !byStandard.has(row.standard)
  );
  return missing.length ? [...list, ...missing] : list;
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


// Sept 22, 2026 — Relay Station (typing). The Foundations Track
// (RS.<grade>.TRACK) gets its own tile under the four subject tiles, per
// Emily: "a 5th tile underneath that says Foundations Track". Picking it
// selects that grade's track directly and jumps to the assign step.
const FOUNDATIONS = "Foundations";
const DAILY = "Daily";
function isTypingTrackCase(standard) {
  return /^RS\.[345]\.TRACK$/.test(String(standard || ""));
}
// Sept 22, 2026 (Wave 2) — Daily Transmission gets the same treatment: its
// own tile, assign once, a new short text every day with streaks.
function isTypingDailyCase(standard) {
  return /^RS\.[345]\.DAILY$/.test(String(standard || ""));
}
// Wave 3 — Class Relay Race: assign once; start races from the Relay Race board.
function isTypingRaceCase(standard) {
  return /^RS\.[345]\.RACE$/.test(String(standard || ""));
}
// Sept 24, 2026 (step 6) — Frequency Rush Daily Warm-up (FR.<grade>.DAILY)
// mixes questions from every Frequency Rush activity a student has, so it
// isn't one subject's: it shows under every subject tile, as its own topic.
const FR_DAILY_TOPIC = "Daily Warm-up";
function isFrDailyCase(standard) {
  return /^FR\.[345]\.DAILY$/.test(String(standard || ""));
}
const RELAY_SPECIAL_TILES = [
  { key: FOUNDATIONS, match: isTypingTrackCase, icon: "⌨️", title: "Foundations Track", blurb: "Assign once — every student climbs 20 levels at their own pace and moves up automatically. Works for any grade 3–5 class.", bg: "linear-gradient(120deg, #0D1B2A 0%, #16243F 55%, #7B5DFF 140%)" },
  { key: "Race", match: isTypingRaceCase, icon: "🏁", title: "Class Relay Race", blurb: "Assign once — then start a live race any time from the Relay Race Board. Every student types a piece of a secret message and the class decodes it together.", bg: "linear-gradient(120deg, #0D1B2A 0%, #16243F 55%, #FFC44D 150%)" },
  { key: DAILY, match: isTypingDailyCase, icon: "📅", title: "Daily Transmission", blurb: "Assign once — a short new warm-up every school day, the same for the whole class, with streaks and crystals.", bg: "linear-gradient(120deg, #0D1B2A 0%, #16243F 55%, #00C2C7 140%)" },
];

import {rememberedTeacherClass,rememberTeacherClass} from "../../../../lib/teacherClass";

function NewAssignmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [assignClassId, setAssignClassId] = useState(null);
  const [error, setError] = useState(null);

  const [cases, setCases] = useState([]);
  const [caseSearch, setCaseSearch] = useState("");
  const [topic,setTopic]=useState(searchParams.get('standard')||'all');
  const [typeFilter,setTypeFilter]=useState(searchParams.get('engine')||'all');
  const [lane,setLane]=useState('standard');
  const [followClass,setFollowClass]=useState(true);
  const [limit,setLimit]=useState(12);
  const [casesLoading,setCasesLoading]=useState(true);
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
  const [crystalDiveMinutes, setCrystalDiveMinutes] = useState(10);
  // Sept 24, 2026 — Frequency Rush question timer, set by the teacher for
  // the whole assignment (assignments.question_seconds). 0 = no timer.
  // Students can no longer turn the game's own timer on or off.
  const [questionSeconds, setQuestionSeconds] = useState(0);

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
    supabase.from("classes").select("*").eq("teacher_id", teacherId).order("created_at").then(({ data }) => {setClasses(data || []);setAssignClassId(rememberedTeacherClass(data||[],(data||[])[0]?.id||null))});
  }, [teacherId]);

  useEffect(() => {
    if (!assignClassId) { setRoster([]); return; }
    if(classes.some(c=>c.id===assignClassId))rememberTeacherClass(assignClassId);
    supabase.from("students").select("id, first_name").eq("class_id", assignClassId).order("first_name").then(({ data }) => setRoster(data || []));
    setTargetMode("whole");
    setSelectedStudentIds([]);
  }, [assignClassId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCasesLoading(true);
      let { data, error: loadError } = await supabase.from("cases").select(CASES_SELECT_FULL);
      // Optional columns / schema drift can fail the full select — retry minimal
      // fields so the library still loads instead of staying empty.
      if (loadError) {
        const retry = await supabase.from("cases").select(CASES_SELECT_MINIMAL);
        if (!retry.error) {
          data = retry.data;
          loadError = null;
          if (!cancelled) {
            setError("Some activity details could not load. Showing a simplified library — refresh to try the full list again.");
          }
        }
      }
      if (cancelled) return;
      const merged = mergeExpeditionStationCatalog(data || []);
      setCases(merged);
      setCasesLoading(false);
      if (loadError) {
        setError(
          merged.length
            ? "Could not load the full activity library. Showing catalog activities that are available offline — refresh to try again."
            : "Could not load activities. Please refresh to try again."
        );
      }
    })();
    return () => { cancelled = true; };
  }, []);

  function topicCode(c){if(FR_CUSTOM_LIST_RE.test(c.standard))return MY_WORD_LISTS;if(isFrDailyCase(c.standard))return FR_DAILY_TOPIC;return missionMapTeksCode(c.standard)||c.standard.replace(/-(?:SC|GC|FR|SL|SD|AD|RS|MM|CL|EX|XP).*$/i,'');}
  const topics=[...new Set(cases.filter(c=>Number(c.grade)===Number(browseGrade)&&(c.subject===browseSubject||isFrDailyCase(c.standard))&&(typeFilter==='all'||matchesChallenge(c.engine,typeFilter))&&!isRetiredSignalCheckCase(c.standard)&&!((FR_CUSTOM_LIST_RE.exec(c.standard)||[])[1]&&FR_CUSTOM_LIST_RE.exec(c.standard)[1]!==String(teacherId||"").replace(/-/g,"").slice(0,8).toLowerCase())).map(topicCode))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  const searchQ = caseSearch.trim().toLowerCase();
  const filteredCases = cases.filter((c) => {
    if (Number(c.grade) !== Number(browseGrade)) return false;
    if(!CHALLENGE_TYPES.some(t=>t.real&&matchesChallenge(c.engine,t.key)))return false;
    const specialTile = RELAY_SPECIAL_TILES.find((t) => t.key === browseSubject);
    if (!specialTile && c.subject !== browseSubject && !isFrDailyCase(c.standard)) return false;
    if (typeFilter!=="all" && !matchesChallenge(c.engine,typeFilter)) return false;
    if(topic!=="all" && topicCode(c)!==topic)return false;
    if (isRetiredSignalCheckCase(c.standard)) return false;
    // Relay Station's Foundations Track has its own 5th tile (FOUNDATIONS
    // below) instead of hiding among the ELAR readings.
    // Relay Station custom texts are private to the teacher who made them.
    if (isCustomCode(c.standard) && customCodeOwnerPrefix(c.standard) !== String(teacherId || "").replace(/-/g, "").slice(0, 8).toLowerCase()) return false;
    { const own = FR_CUSTOM_LIST_RE.exec(c.standard); if (own && own[1] !== String(teacherId || "").replace(/-/g, "").slice(0, 8).toLowerCase()) return false; }
    if (specialTile) return specialTile.match(c.standard);
    if (RELAY_SPECIAL_TILES.some((t) => t.match(c.standard))) return false;
    if (!searchQ) return true;
    return (
      (c.title || "").toLowerCase().includes(searchQ) ||
      (c.standard || "").toLowerCase().includes(searchQ) ||
      (c.learning_target || "").toLowerCase().includes(searchQ) ||
      (missionMapTeksLabel(c.standard) || "").toLowerCase().includes(searchQ)
    );
  });

  // When a challenge type is picked and only one TEKS maps to it (e.g. Expedition
  // Station MA.4.3E-XP under Grade 4 Math), auto-select so the case gallery is not
  // blocked behind an empty/unnoticed Standard dropdown.
  useEffect(() => {
    if (typeFilter === 'all' || topic !== 'all' || topics.length !== 1) return;
    setTopic(topics[0]);
  }, [typeFilter, topic, topics.length, topics[0]]);

  const targetClass = classes.find((c) => c.id === assignClassId);
  useEffect(()=>{
    if(!followClass||!targetClass||lane==='relay')return;
    if(targetClass.grade)setBrowseGrade(String(targetClass.grade));
    if(targetClass.subject&&SUBJECTS[targetClass.subject])setBrowseSubject(targetClass.subject);
  },[followClass,lane,targetClass?.id,targetClass?.grade,targetClass?.subject]);

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
      if (gameSkin === "crystal_dive" && /^FR\.[345]\.DAILY$/.test(selectedCase.standard)) {
        setError("Daily Warm-up uses its own daily scoring. Choose another game world for this activity.");
        return;
      }
      assignmentFields.game_skin = gameSkin;
      assignmentFields.question_seconds = questionSeconds;
      if (gameSkin === "crystal_dive") assignmentFields.crystal_dive_minutes = crystalDiveMinutes;
    }

    let { data: newAssignment, error: insertError } = await supabase
      .from("assignments")
      .insert(assignmentFields)
      .select()
      .single();
    // Sept 24, 2026 — if add_frequency_rush_skills.sql hasn't run yet, the
    // question_seconds column doesn't exist. Assign without the timer rather
    // than block Frequency Rush assigning entirely.
    if (insertError && /question_seconds/i.test(insertError.message || "")) {
      const { question_seconds, ...withoutTimer } = assignmentFields;
      ({ data: newAssignment, error: insertError } = await supabase
        .from("assignments")
        .insert(withoutTimer)
        .select()
        .single());
    }
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
    setCrystalDiveMinutes(10);
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>Loading...</div>;
  }

  function resetBrowse(){setSelectedCase(null);setTopic('all');setLimit(12);setDistressCallEnabled(false);setDistressCallTarget('');setDistressCallDeadline('');setDistressCallRewardPoints('');}
  return <BridgePage teacherEmail={teacherEmail}><PageHeading title="Find your next activity" subtitle="Choose a topic. Find the right experience. Make it yours."><ClassTabs classes={classes} value={assignClassId} onChange={id=>{setAssignClassId(id);setFollowClass(true);setLane('standard');setTypeFilter('all');resetBrowse();setCaseSearch('')}}/><div className="cc-class-context">{targetClass?.name || 'Choose a class'} · {roster.length} students</div></PageHeading>
    {error&&<div role="alert" className="cc-error">{error}</div>}
    {assignedSuccess?(            <div style={panelStyle(ACCENT, { padding: 32, textAlign: "center" })}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: COLORS.textDark }}>Assigned!</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: distressCallEnabled ? 10 : 20 }}>
                "{selectedCase.title}" is now assigned to {targetMode === "specific" ? `${selectedStudentIds.length} student${selectedStudentIds.length === 1 ? "" : "s"} in` : "everyone in"} {targetClass?.name}.
              </p>
              {distressCallEnabled && (
                <p style={{ color: COLORS.violet, fontSize: 12.5, fontWeight: 700, marginBottom: 20, background: `${COLORS.violet}1A`, borderRadius: 10, padding: "8px 12px", display: "inline-block" }}>
                  🚨 Distress Call is live{distressCallTarget ? ` — target: ${distressCallTarget} ${distressCallUnit(selectedCase?.engine, selectedCase?.standard)}` : ""}. Students will see the meter update as they work.
                  {!!distressCallRewardPoints && parseInt(distressCallRewardPoints, 10) > 0 && ` Everyone gets +${distressCallRewardPoints} crystal points when they hit it.`}
                </p>
              )}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {distressCallEnabled && newAssignmentId && (
                  <button onClick={() => router.push(`/teacher/live-ops-board?assignmentId=${newAssignmentId}`)} className="gc-btn" style={{ background: "#0D1B2A", color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>📡 Project on Live Ops Board</button>
                )}
                {selectedCase?.engine === "relay_station" && /\.RACE$/.test(selectedCase.standard || "") && (
                  <button onClick={() => router.push(`/teacher/relay-race?classId=${assignClassId}`)} className="gc-btn" style={{ background: "#0D1B2A", color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>🏁 Open Relay Race Board</button>
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
            </div>): <>
    <div className="cc-toolbar cc-browse-filters">
      <label className="cc-field">Grade<select value={browseGrade} onChange={e=>{setFollowClass(false);setBrowseGrade(e.target.value);resetBrowse();setCaseSearch('')}}>{['3','4','5'].map(g=><option key={g} value={g}>Grade {g}</option>)}</select></label>
      <label className="cc-field">Subject<select value={lane==='relay'?'ELAR':browseSubject} onChange={e=>{setFollowClass(false);setLane('standard');setBrowseSubject(e.target.value);setTypeFilter('all');resetBrowse();setCaseSearch('')}}>{Object.keys(SUBJECTS).map(subject=><option key={subject}>{subject}</option>)}</select></label>
      {lane==='standard'&&<label className="cc-field cc-search">Standard<select value={topic} onChange={e=>{setTopic(e.target.value);setSelectedCase(null);setLimit(12)}}><option value="all">Choose a standard</option>{topics.map(t=><option key={t} value={t}>{t}</option>)}</select></label>}
    </div>
    {(typeFilter!=='all'||lane==='relay')&&<div className="cc-row" style={{marginBottom:16}}><button className="cc-text-button" onClick={()=>{setLane('standard');setTypeFilter('all');setTopic('all');setSelectedCase(null);setBrowseSubject(targetClass?.subject||'Science');setFollowClass(true)}}>← All activity types</button><span className="cc-badge">{lane==='relay'?'Relay Station':engineInfo(typeFilter).label}</span></div>}
    {lane==='standard'&&topic==='all'&&typeFilter==='all'&&<section className="cc-panel"><h2>Explore a learning experience</h2><p className="cc-muted">Choose an activity type, then a standard to see its lessons.</p><div className="cc-type-grid">{Object.entries(ENGINES).map(([key,art])=><button key={key} className="cc-activity cc-frame" style={subjectStyle(key==='relay_station'?'ELAR':browseSubject)} aria-pressed={typeFilter===key} onClick={()=>{setSelectedCase(null);setCaseSearch('');if(key==='relay_station'){setLane('relay');setTypeFilter('all');setTopic('all');setBrowseSubject(FOUNDATIONS)}else{setTypeFilter(key);setTopic('all')}}}><img src={art.image} alt=""/><div><h3>{art.label}</h3><p>{art.description}</p>{typeFilter===key&&<span className="cc-badge">Choose a standard above</span>}</div></button>)}</div></section>}
    {lane==='relay'&&<div className="cc-gallery" style={{marginBottom:18}}>{RELAY_SPECIAL_TILES.map(t=><button key={t.key} type="button" className="cc-activity cc-frame" style={subjectStyle('ELAR')} aria-pressed={browseSubject===t.key} onClick={()=>{setBrowseSubject(t.key);setTopic('all');setSelectedCase(null);}}><div><div className="cc-eyebrow cc-subject-label">Relay Station</div><h3>{t.title}</h3><p>{t.blurb}</p></div></button>)}<Link className="cc-activity cc-frame" style={subjectStyle('ELAR')} href="/teacher/typing-texts"><div><div className="cc-eyebrow cc-subject-label">Relay Station</div><h3>Custom typing text</h3><p>A passage you paste for this class.</p></div></Link></div>}
    {(topic!=='all'||lane==='relay'||typeFilter!=='all')&&<div className="cc-two"><section className="cc-panel"><h2>{topic!=='all'?topic:(typeFilter!=='all'?engineInfo(typeFilter).label:'Choose a learning experience')}</h2><p className="cc-muted">{lane==='relay'?'Relay Station':browseSubject} · Grade {browseGrade} · {filteredCases.length} activities{typeFilter!=='all'&&topic==='all'?' · pick a standard above or browse all for this type':''}</p><label className="cc-field">Find an activity<input className="cc-input" type="search" placeholder="Search these activities" value={caseSearch} onChange={e=>{setCaseSearch(e.target.value);setLimit(12)}}/></label><div className="cc-gallery cc-compact-gallery">{filteredCases.slice(0,limit).map(c=>{const e=engineInfo(c.engine);return <button key={c.standard} className="cc-activity cc-frame" style={subjectStyle(c.subject)} aria-pressed={selectedCase?.standard===c.standard} onClick={()=>{setSelectedCase(c);if(/^FR\.[345]\.DAILY$/.test(c.standard))setGameSkin(DEFAULT_GAME_SKIN);setSelectedChallenge(CHALLENGE_TYPES.find(t=>matchesChallenge(c.engine,t.key)))}}><img src={e.image} alt="" onError={thumbFallback}/><div><div className="cc-eyebrow cc-subject-label">{e.label}</div><h3>{c.title}</h3><p>{c.learning_target||e.description}</p><small>{missionMapTeksCode(c.standard)||c.standard}</small></div></button>})}</div>{casesLoading?<Empty>Loading activities…</Empty>:!filteredCases.length&&<Empty>{typeFilter!=='all'?'No activities for this type at Grade '+browseGrade+' · '+browseSubject+'. Try another grade or subject, or pick a standard above.':'No activities match these filters. Try another topic, grade, or format.'}</Empty>}{filteredCases.length>limit&&<button className="cc-btn secondary" style={{marginTop:18}} onClick={()=>setLimit(limit+12)}>Show more activities</button>}</section>
    <aside className="cc-stack">{selectedCase?<section className="cc-panel cc-frame" style={subjectStyle(selectedCase.subject)}><div className="cc-eyebrow cc-subject-label">SELECTED · {engineInfo(selectedCase.engine).label}</div><h2>{selectedCase.title}</h2><p className="cc-muted">{missionMapTeksLabel(selectedCase.standard)||selectedCase.standard}</p><img className="cc-preview-image" src={engineInfo(selectedCase.engine).image} alt="" onError={thumbFallback}/><h3>What students will do</h3><p className="cc-muted">{selectedCase.lesson_summary||engineInfo(selectedCase.engine).description}</p>{selectedCase.learning_target&&<div className="cc-panel" style={{background:'#f5f0fc',padding:14}}>{selectedCase.learning_target}</div>}{selectedCase.misconception_note&&<details><summary>Teaching notes</summary><p className="cc-muted">{selectedCase.misconception_note}</p></details>}
    <div className="cc-assignment-form"><h3>Assign to {targetClass?.name||'your class'}</h3>
                  {assignClassId && (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: COLORS.textDark }}>Who receives this activity?</div>
                      <div style={{ display: "inline-flex", background: "rgba(255,255,255,.55)", borderRadius: 999, padding: 3, marginBottom: 14, gap: 3 }}>
                        <button className="cc-btn" onClick={() => setTargetMode("whole")} style={{ border: "none", padding: "7px 16px", borderRadius: 999, fontWeight: 700, fontSize: 12.5, background: targetMode === "whole" ? ACCENT : "transparent", color: targetMode === "whole" ? COLORS.white : COLORS.textMuted }}>
                          Whole Class
                        </button>
                        <button className="cc-btn" onClick={() => setTargetMode("specific")} style={{ border: "none", padding: "7px 16px", borderRadius: 999, fontWeight: 700, fontSize: 12.5, background: targetMode === "specific" ? ACCENT : "transparent", color: targetMode === "specific" ? COLORS.white : COLORS.textMuted }}>
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
                                className="cc-btn"
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

                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: COLORS.textDark }}>Due date (optional)</div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <Calendar size={14} style={{ position: "absolute", left: 10, top: 11, color: COLORS.textMuted }} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                  </div>

                  {selectedCase?.engine === "frequency_rush" && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: COLORS.textDark }}>🛰️ Game world</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {GAME_SKINS.filter((skin) => skin.id !== "crystal_dive" || !/^FR\.[345]\.DAILY$/.test(selectedCase.standard)).map((skin) => (
                          <button
                            key={skin.id}
                            type="button"
                            className="cc-btn"
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
                        The worlds use this question bank. Crystal Dive also has its own digging, caves, and crystal wheel.
                      </p>
                      {gameSkin === "crystal_dive" && <>
                        <div style={{ fontWeight: 700, fontSize: 13, margin: "14px 0 8px 0", color: COLORS.textDark }}>⏱️ Crystal Dive session length</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {CRYSTAL_DIVE_MINUTES.map((minutes) => <button key={minutes} type="button" className="cc-btn" aria-pressed={crystalDiveMinutes === minutes} onClick={() => setCrystalDiveMinutes(minutes)} style={{ background: crystalDiveMinutes === minutes ? ACCENT : COLORS.white, color: crystalDiveMinutes === minutes ? COLORS.white : COLORS.textDark, border: `1.5px solid ${crystalDiveMinutes === minutes ? ACCENT : COLORS.border}`, borderRadius: 999, padding: "7px 14px", fontWeight: 700, fontSize: 12.5 }}>{minutes} min</button>)}
                        </div>
                      </>}
                      <div style={{ fontWeight: 700, fontSize: 13, margin: "14px 0 8px 0", color: COLORS.textDark }}>⏱️ Time per question</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {QUESTION_SECONDS_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className="cc-btn"
                            aria-pressed={questionSeconds === opt.value}
                            onClick={() => setQuestionSeconds(opt.value)}
                            style={{
                              background: questionSeconds === opt.value ? ACCENT : COLORS.white,
                              color: questionSeconds === opt.value ? COLORS.white : COLORS.textDark,
                              border: `1.5px solid ${questionSeconds === opt.value ? ACCENT : COLORS.border}`,
                              borderRadius: 999,
                              padding: "7px 14px",
                              fontWeight: 700,
                              fontSize: 12.5,
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "6px 0 0 0" }}>
                        {questionSeconds
                          ? `Students get ${questionSeconds} seconds per question. Running out of time counts as a miss.`
                          : "No clock. Faster answers still earn a speed bonus."}
                      </p>
                    </div>
                  )}

                  {engineSupportsDistressCall(selectedCase?.engine) && (
                    <div style={{ marginBottom: 14, border: `1.5px solid ${distressCallEnabled ? COLORS.violet : COLORS.border}`, borderRadius: 12, padding: 12, background: distressCallEnabled ? `${COLORS.violet}1A` : COLORS.white }}>
                      <button
                        type="button"
                        className="cc-btn"
                        onClick={() => setDistressCallEnabled((v) => !v)}
                        style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", padding: 0, width: "100%", textAlign: "left" }}
                      >
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: distressCallEnabled ? COLORS.violet : COLORS.white, border: `1.5px solid ${distressCallEnabled ? COLORS.violet : COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                          {distressCallEnabled ? "✓" : ""}
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark }}>🚨 Make this a Distress Call</span>
                      </button>
                      <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "6px 0 0 24px" }}>
                        Turns this into a shared goal — students see a live meter as {distressCallUnit(selectedCase?.engine, selectedCase?.standard)} add up across the group.
                      </p>
                      {distressCallEnabled && (
                        <div style={{ marginTop: 10, marginLeft: 24 }}>
                          <div style={{ display: "flex", gap: 10 }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>Target ({distressCallUnit(selectedCase?.engine, selectedCase?.standard)})</label>
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
                                  className="cc-btn"
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

                  <button className="cc-btn" onClick={handleAssign} disabled={assigning || !assignClassId} style={{ width: "100%", background: assignClassId ? ACCENT : "#D8D4E8", color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                    {assigning
                      ? "Assigning..."
                      : !assignClassId
                      ? "Choose a class first"
                      : targetMode === "specific"
                      ? `Assign to ${selectedStudentIds.length} student${selectedStudentIds.length === 1 ? "" : "s"} →`
                      : `Assign to ${targetClass?.name} →`}
                  </button>
    {!classes.length&&<Link className="cc-link" href="/teacher/assign">Create a class first →</Link>}
    </div></section>:<section className="cc-panel"><Empty><img src="/icons/sam/cosmic/thinking-poster.png" alt="" style={{width:110}}/><h2>Take a closer look</h2><p>Select an activity to see its learning purpose and assignment options.</p></Empty></section>}</aside></div>}</>}
    </BridgePage>;
}
export default function NewAssignmentPage(){return <Suspense fallback={<div className="cc-loading">Loading activities…</div>}><NewAssignmentContent/></Suspense>}
