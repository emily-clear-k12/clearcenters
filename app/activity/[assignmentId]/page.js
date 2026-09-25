import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { getPublicCase } from "../../../lib/cases/index.public";
import { getSignalCheckPublicCase } from "../../../lib/cases/signal-check/index.public";
import { getMissionMapPublicCase } from "../../../lib/cases/mission-map/index.public";
import { getSimulationLabPublicCase } from "../../../lib/cases/simulation-lab/index.public";
import { getSignalDefensePublicCase } from "../../../lib/cases/signal-defense/index.public";
import { getAssemblyDeckPublicCase } from "../../../lib/cases/assembly-deck/index.public";
import { getClassificationLabPublicCase } from "../../../lib/cases/classification-lab/index.public";
import { getExhibitHallPublicCase } from "../../../lib/cases/exhibit-hall/index.public";
import { getExpeditionStationPublicCase } from "../../../lib/cases/expedition-station/index.public";
import { resolveRelayStationLesson } from "../../../lib/relayStationServer";
import { centralDateKey, dailyTextFor, continuesStreak } from "../../../lib/cases/relay-station";
import ActivityClient from "./ActivityClient";
import SignalCheckClient from "./SignalCheckClient";
import MissionMapClient from "./MissionMapClient";
import SimulationLabClient from "./SimulationLabClient";
import FrequencyRushClient from "./FrequencyRushClient";
import CrystalDiveClient from "./CrystalDiveClient";
import SignalDefenseClient from "./SignalDefenseClient";
import RelayStationClient from "./RelayStationClient";
import AssemblyDeckClient from "./AssemblyDeckClient";
import ClassificationLabClient from "./ClassificationLabClient";
import ExhibitHallClient from "./ExhibitHallClient";
import ExpeditionStationClient from "./ExpeditionStationClient";

export default async function ActivityPage({ params }) {
  const { assignmentId } = params;
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id, equipped_sam_skin, sam_nickname")
    .eq("id", studentId)
    .single();

  if (!student) {
    redirect("/login");
  }

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard, due_date, pacing_mode, game_skin")
    .eq("id", assignmentId)
    .single();

  // Verify this assignment actually belongs to the student's own class —
  // without this check, a student could guess another class's assignment id.
  if (!assignment || assignment.class_id !== student.class_id) {
    redirect("/home");
  }

  // If this assignment was narrowed to specific students, only those
  // students may access it — everyone else in the class is turned away
  // even though the assignment does belong to their class.
  const { data: targets } = await supabaseAdmin
    .from("assignment_students")
    .select("student_id")
    .eq("assignment_id", assignmentId);

  if (targets && targets.length > 0) {
    const isTargeted = targets.some((t) => t.student_id === studentId);
    if (!isTargeted) {
      redirect("/home");
    }
  }

  // A case's `engine` column decides which challenge type's content and
  // game engine this assignment uses — "group_chat" (the default) and
  // "fact_check_desk" (Signal Check). Newsroom ("newsroom_bn" etc.) was
  // disconnected on Aug 25 2026 while it's reworked — any case row with a
  // "newsroom*" engine now falls through to the generic "not ready yet"
  // screen below, same as any other unwired case, until it's reconnected.
  const { data: caseRow } = await supabaseAdmin
    .from("cases")
    .select("engine, title")
    .eq("standard", assignment.case_standard)
    .maybeSingle();

  const engine = (caseRow && caseRow.engine) || "group_chat";
  const isSignalCheck = engine === "fact_check_desk";
  // Frequency Rush's own branch, added Sept 8 2026 alongside its first
  // Individual Practice cases — added up front rather than as an
  // afterthought, per the exact lesson from the Mission Map miss documented
  // below. Frequency Rush skips the shared existingSubmission/alreadySubmitted
  // gating entirely: Individual Practice is deliberately replayable
  // (unlimited replays, per the design doc), so there's no "already done,
  // go to Share" state here the way every other engine has one.
  const isFrequencyRush = engine === "frequency_rush";
  if (isFrequencyRush) {
    if (assignment.game_skin === "crystal_dive") return <CrystalDiveClient assignmentId={assignmentId} caseTitle={caseRow?.title || null} />;
    return (
      <FrequencyRushClient
        assignmentId={assignmentId}
        caseTitle={caseRow ? caseRow.title : null}
      />
    );
  }
  // Signal Ops / Signal Defense's own branch, added Sept 11 2026 alongside
  // its first case (3.6B-SD) — same early-return shape as Frequency Rush
  // just above. Replayable like Individual Practice for now (no
  // alreadySubmitted lockout); V1 live crew sync lands via SignalDefenseClient session join.
  //
  // Layered pass #1 (content pipeline): loads the REAL per-standard
  // question bank from lib/cases/signal-defense/ by the assignment's own
  // case_standard. Falls back to null (widget's built-in bank) if a
  // standard has no authored file yet.
  //
  // Layered pass #2 (Sept 12 2026): SignalDefenseClient injects that bank
  // via window.SignalDefense.setQuestionBank and posts a score summary on
  // mission end via /api/signal-defense/submit.
  //
  // Layered pass #3 (Sept 12 2026 V1 live crew): when a teacher has an open
  // Signal Ops session for this assignment, the client auto-joins (no code)
  // and syncs shared Salvage / Power / Base Health.
  // Layered pass #4 (Sept 12 2026): solo / fake-crew fallback removed. No open
  // live session shows a waiting UI; live / lobby uses a full-viewport student shell.
  const isSignalDefense = engine === "signal_defense";
  if (isSignalDefense) {
    const signalDefenseCase = getSignalDefensePublicCase(assignment.case_standard);
    return (
      <SignalDefenseClient
        assignmentId={assignmentId}
        caseTitle={caseRow ? caseRow.title : null}
        caseStandard={assignment.case_standard}
        questionBank={signalDefenseCase ? signalDefenseCase.questions : null}
        studentFirstName={student.first_name || null}
      />
    );
  }
  // Relay Station (typing center) — its own branch, added Sept 22 2026 in the
  // same pass as the engine itself (same lesson as Mission Map's missing
  // branch below). Lessons live in lib/cases/relay-station/index.js (no
  // public/server split — the text IS the answer). Early-returns before the
  // shared alreadySubmitted gating: a student who reopens a finished lesson
  // can always retry for more stars; the submit route keeps the best run.
  const isRelayStation = engine === "relay_station";
  if (isRelayStation) {
    const lesson = await resolveRelayStationLesson(assignment.case_standard);
    if (lesson) {
      // One progress row per STUDENT (not per assignment): track level,
      // placement, supports, daily streak, keyboard skin. Read once here and
      // handed to whichever Relay Station mode this assignment is.
      const { data: rsProgress } = await supabaseAdmin
        .from("relay_station_progress")
        .select("current_level, level_results, completed_at, placement, accommodations, daily, keyboard_skin")
        .eq("student_id", studentId)
        .maybeSingle();
      const common = {
        assignmentId,
        lesson,
        accommodations: rsProgress ? rsProgress.accommodations : null,
        // Wave 3: S.A.M. follows the student through Relay Station, and
        // keyboard skins unlock with track rank.
        samSkin: student.equipped_sam_skin || null,
        samNickname: student.sam_nickname || null,
        keyboardSkin: rsProgress ? rsProgress.keyboard_skin : null,
        currentLevel: rsProgress ? rsProgress.current_level : 1,
      };
      if (lesson.isTrack) {
        return <RelayStationClient {...common} trackProgress={rsProgress || null} />;
      }
      if (lesson.isDaily) {
        // Daily Transmission: today's text (Central time) and this student's streak.
        const dateKey = centralDateKey();
        const d = (rsProgress && rsProgress.daily) || {};
        const alive = d.lastDate === dateKey || continuesStreak(d.lastDate, dateKey);
        return (
          <RelayStationClient
            {...common}
            daily={{
              dateKey,
              text: dailyTextFor(dateKey),
              doneToday: d.lastDate === dateKey,
              streak: alive ? d.streak || 0 : 0,
              bestStreak: d.bestStreak || 0,
              totalDays: d.totalDays || 0,
            }}
          />
        );
      }
      if (lesson.isRace) {
        // Class Relay Race: the client polls /api/relay-station/race for the live race.
        return <RelayStationClient {...common} />;
      }
      const { data: rsSubmission } = await supabaseAdmin
        .from("submissions")
        .select("relay_station_data")
        .eq("assignment_id", assignmentId)
        .eq("student_id", studentId)
        .maybeSingle();
      return (
        <RelayStationClient
          {...common}
          existingBest={rsSubmission?.relay_station_data?.best || null}
          existingCompose={rsSubmission?.relay_station_data?.compose || null}
        />
      );
    }
  }
  // Mission Map's own branch — this was missing entirely until Sept 1, 2026,
  // which meant every Mission Map assignment (3.1-MM, 4.1-MM, 5.1-MM) fell
  // through to the generic group_chat lookup below (which has never heard of
  // these standards, since they live in their own lib/cases/mission-map/
  // registry, not lib/cases/index.public.js) and landed on the "This mission
  // isn't ready yet" screen instead of MissionMapClient. Caught while adding
  // the Save Progress button to Mission Map, not by a live report.
  const isMissionMap = engine === "mission_map";
  // Simulation Lab's own branch, added Sept 3 2026 alongside the engine's
  // first case (3.8B-SL) — added up front this time, precisely to avoid
  // repeating the exact missing-branch bug class documented above for
  // Mission Map.
  const isSimulationLab = engine === "simulation_lab";
  // Assembly Deck's branch, added Sept 22 2026 with the engine's first six
  // cases — up front, for the same reason Simulation Lab's was.
  const isAssemblyDeck = engine === "assembly_deck";
  const isClassificationLab = engine === "classification_lab";
  const isExhibitHall = engine === "exhibit_hall";
  const isExpeditionStation = engine === "expedition_station";
  const caseEntry = isSignalCheck || isMissionMap || isSimulationLab || isAssemblyDeck || isClassificationLab || isExhibitHall || isExpeditionStation ? null : getPublicCase(assignment.case_standard);
  const signalCheckCase = isSignalCheck ? getSignalCheckPublicCase(assignment.case_standard) : null;
  const missionMapCase = isMissionMap ? getMissionMapPublicCase(assignment.case_standard) : null;
  const simulationLabCase = isSimulationLab ? getSimulationLabPublicCase(assignment.case_standard) : null;
  const assemblyDeckCase = isAssemblyDeck ? getAssemblyDeckPublicCase(assignment.case_standard) : null;
  const classificationLabCase = isClassificationLab ? getClassificationLabPublicCase(assignment.case_standard) : null;
  const exhibitHallCase = isExhibitHall ? getExhibitHallPublicCase(assignment.case_standard) : null;
  const expeditionStationCase = isExpeditionStation ? getExpeditionStationPublicCase(assignment.case_standard) : null;
  if (!caseEntry && !signalCheckCase && !missionMapCase && !simulationLabCase && !assemblyDeckCase && !classificationLabCase && !exhibitHallCase && !expeditionStationCase) {
    return (
      <div style={{ minHeight: "100vh", background: "#16243F", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontFamily: "sans-serif", textAlign: "center", padding: 20 }}>
        <div>
          <h1>This mission isn't ready yet</h1>
          <p style={{ color: "rgba(255,255,255,.6)" }}>The content for this case hasn't been wired into the app yet. Try Bee Disappearance Mystery for now!</p>
        </div>
      </div>
    );
  }

  const { data: existingSubmission } = await supabaseAdmin
    .from("submissions")
    .select("*")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  // A submission the teacher sent back for revision should NOT lock the
  // student out of the mission — only a submitted AND not-sent-back
  // submission is treated as final/done.
  const revisionRequested = !!(existingSubmission && existingSubmission.revision_requested);
  const alreadySubmitted = !!(existingSubmission && existingSubmission.submitted_at) && !revisionRequested;
  const revisionFeedback = revisionRequested ? existingSubmission.teacher_feedback || null : null;

  if (isSignalCheck) {
    return (
      <SignalCheckClient
        assignmentId={assignmentId}
        studentId={studentId}
        caseStandard={assignment.case_standard}
        publicCase={signalCheckCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isMissionMap) {
    return (
      <MissionMapClient
        assignmentId={assignmentId}
        studentId={studentId}
        caseStandard={assignment.case_standard}
        publicCase={missionMapCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isSimulationLab) {
    return (
      <SimulationLabClient
        assignmentId={assignmentId}
        studentId={studentId}
        caseStandard={assignment.case_standard}
        publicCase={simulationLabCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isAssemblyDeck) {
    return (
      <AssemblyDeckClient
        assignmentId={assignmentId}
        caseStandard={assignment.case_standard}
        publicCase={assemblyDeckCase}
        existingSubmission={existingSubmission}
        alreadySubmitted={alreadySubmitted}
        revisionRequested={revisionRequested}
        revisionFeedback={revisionFeedback}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isExpeditionStation) {
    const raw = (existingSubmission && existingSubmission.expedition_station_data) || null;
    return (
      <ExpeditionStationClient
        assignmentId={assignmentId}
        publicCase={expeditionStationCase}
        studentFirstName={student.first_name || null}
        existingData={raw}
        alreadySubmitted={alreadySubmitted}
        samSkin={student.equipped_sam_skin}
      />
    );
  }

  if (isExhibitHall) {
    return (
      <ExhibitHallClient
        assignmentId={assignmentId}
        publicCase={exhibitHallCase}
        alreadySubmitted={alreadySubmitted}
        samSkin={student.equipped_sam_skin}
        samNickname={student.sam_nickname}
      />
    );
  }

  if (isClassificationLab) {
    const rawPages = (existingSubmission && existingSubmission.classification_lab_data && existingSubmission.classification_lab_data.pages) || {};
    const savedPages = {};
    Object.keys(rawPages).forEach((key) => {
      savedPages[key] = { correct: rawPages[key].correct, total: rawPages[key].total };
    });
    return (
      <ClassificationLabClient
        assignmentId={assignmentId}
        publicCase={classificationLabCase}
        savedPages={savedPages}
        samSkin={student.equipped_sam_skin}
      />
    );
  }

  return (
    <ActivityClient
      assignmentId={assignmentId}
      caseStandard={assignment.case_standard}
      publicCase={caseEntry.publicCase}
      cast={caseEntry.cast}
      organizerFields={caseEntry.organizerFields}
      existingSubmission={existingSubmission}
      alreadySubmitted={alreadySubmitted}
      revisionRequested={revisionRequested}
      revisionFeedback={revisionFeedback}
      samSkin={student.equipped_sam_skin}
      samNickname={student.sam_nickname}
    />
  );
}
