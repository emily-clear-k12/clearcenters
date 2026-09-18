"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEMO_STUDENT_DAY,
  DEMO_STUDENT_KIDS,
  DEMO_KID_STORAGE_KEY,
  buildStudentDayMissions,
  getActiveDemoStudent,
  productKidLabel,
  readTeacherAddedForDay,
  setActiveDemoKidId,
  subjectColor,
  subjectName,
  ADDED_ACTIVITIES_KEY,
} from "../../../lib/v2/demoStudentDay";
import {
  STUDENT_PROGRESS_KEY,
  readStudentProgress,
} from "../../../lib/v2/demoStudentActivity";
import {
  PROJECT_ASSIGNED_KEY,
  readAssignedProjectsForDay,
  STUDENT_PROJECT_HREF,
} from "../../../lib/v2/demoProject";
import {
  PRACTICE_ASSIGNED_KEY,
  readAssignedPracticeForDay,
} from "../../../lib/v2/demoLiveTeach";
import {
  TEACHER_CHECKED_KEY,
  loadTeacherCheckedIds,
  loadCelebratedTeacherCheckedIds,
  markTeacherCheckedCelebrated,
} from "../../../lib/v2/demoGrading";
import { STUDENT_TOOLS_HREF } from "../../../lib/v2/demoStudentTools";
import {
  STUDENT_PREFS_KEY,
  TEXT_SIZE_SCALE,
  loadStudentPrefs,
  saveStudentPrefs,
  resetStudentPrefs,
} from "../../../lib/v2/demoStudentPrefs";

const INK = "#2E2459";
const MUTED = "#5E577F";
const LINE = "#E4DEF4";
const LAVENDER = "#8B6CFF";
const SOFT_LAV = "#F3EEFF";
const CREAM = "#FFF8EE";
const WARM_BG = "linear-gradient(165deg, #F6F0FF 0%, #FFF9EE 55%, #F3EEFF 100%)";

const SLOT_LABEL = { now: "NOW", next: "NEXT", later: "LATER" };

/**
 * CI2.0 Student · My Day skeleton.
 * Start / Continue → /v2/student/activity/[id] (real activity stub).
 * Progress: localStorage ci2.student.missionProgress.{kid} (Leo/Kai/Riley demos).
 * Tools → /v2/student/tools (read-aloud / word chips / highlight stub).
 * Print → glance-first print sheet (ci2-myday-print / ci2-no-print).
 */
export default function StudentMyDayClient() {
  const day = DEMO_STUDENT_DAY;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [student, setStudent] = useState(() => getActiveDemoStudent());
  const [teacherAdded, setTeacherAdded] = useState([]);
  const [projectAssigned, setProjectAssigned] = useState([]);
  const [practiceAssigned, setPracticeAssigned] = useState([]);
  const [teacherCheckedIds, setTeacherCheckedIds] = useState([]);
  const [doneIds, setDoneIds] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  const [samMsg, setSamMsg] = useState(day.samLine);
  const [prefs, setPrefs] = useState(() => ({
    displayName: "Leo",
    textSize: "M",
    soundOn: false,
  }));
  const [prefsOpen, setPrefsOpen] = useState(false);

  function refreshProgress() {
    const { doneIds: ids } = readStudentProgress();
    setDoneIds(new Set(ids));
  }

  useEffect(() => {
    const refreshTeacher = () => setTeacherAdded(readTeacherAddedForDay(day.dayIndex));
    const refreshProjects = () => setProjectAssigned(readAssignedProjectsForDay(day.dayIndex));
    const refreshPractice = () => setPracticeAssigned(readAssignedPracticeForDay(day.dayIndex));
    const refreshChecked = () => setTeacherCheckedIds(loadTeacherCheckedIds());
    const refreshPrefs = () => setPrefs(loadStudentPrefs());
    const refreshKid = () => {
      const s = getActiveDemoStudent();
      setStudent(s);
      refreshTeacher();
      refreshProjects();
      refreshPractice();
      refreshChecked();
      refreshProgress();
      refreshPrefs();
    };
    refreshKid();
    const onStorage = (e) => {
      if (!e.key || e.key === ADDED_ACTIVITIES_KEY) refreshTeacher();
      if (!e.key || e.key === PROJECT_ASSIGNED_KEY) refreshProjects();
      if (!e.key || e.key === PRACTICE_ASSIGNED_KEY) refreshPractice();
      // Scoped keys: ci2.student.teacherChecked.{kid}
      if (!e.key || e.key === TEACHER_CHECKED_KEY || e.key.startsWith(TEACHER_CHECKED_KEY + ".")) {
        refreshChecked();
      }
      if (!e.key || e.key === STUDENT_PROGRESS_KEY || e.key.startsWith(STUDENT_PROGRESS_KEY + ".")) {
        refreshProgress();
      }
      if (!e.key || e.key === DEMO_KID_STORAGE_KEY) refreshKid();
      if (!e.key || e.key === STUDENT_PREFS_KEY || e.key.startsWith(STUDENT_PREFS_KEY + ".")) {
        refreshPrefs();
      }
    };
    const onFocus = () => refreshKid();
    const onKid = () => {
      refreshKid();
      const s = getActiveDemoStudent();
      setSamMsg(`${s.name}'s day — progress stays with each kid.`);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    window.addEventListener("ci2-project-assigned", refreshProjects);
    window.addEventListener("ci2-practice-assigned", refreshPractice);
    window.addEventListener("ci2-teacher-checked-updated", refreshChecked);
    window.addEventListener("ci2-demo-kid-changed", onKid);
    window.addEventListener("ci2-student-prefs-updated", refreshPrefs);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("ci2-project-assigned", refreshProjects);
      window.removeEventListener("ci2-practice-assigned", refreshPractice);
      window.removeEventListener("ci2-teacher-checked-updated", refreshChecked);
      window.removeEventListener("ci2-demo-kid-changed", onKid);
      window.removeEventListener("ci2-student-prefs-updated", refreshPrefs);
    };
  }, [day.dayIndex]);

  // Celebrate return from activity Submit (?done=missionId)
  useEffect(() => {
    const doneParam = searchParams?.get("done");
    if (!doneParam) return;
    refreshProgress();
    const title =
      day.missions.find((m) => m.id === doneParam)?.title ||
      (doneParam.startsWith("from-teacher-") ? "that activity" : "your mission");
    setSamMsg(`Check! “${title}” is done. Next card when you're ready.`);
    setToast({ text: `Nice — “${title}” checked off. Keep going.`, tone: "ok" });
    // Clear query so refresh doesn't re-toast
    router.replace("/v2/student", { scroll: false });
  }, [searchParams, day.missions, router]);

  const missions = useMemo(() => {
    const built = buildStudentDayMissions(day.missions, teacherAdded);
    // Practice from Teach live — may-do cards that can land in Now/Next/Later.
    const practiceIds = new Set(practiceAssigned.map((m) => m.id));
    const withoutPracticeDup = built.filter((m) => !practiceIds.has(m.id));
    const withPractice = [...withoutPracticeDup, ...practiceAssigned];
    // Projects append as Later · Project (may-do).
    const projectIds = new Set(projectAssigned.map((m) => m.id));
    const withoutDup = withPractice.filter((m) => !projectIds.has(m.id));
    const withProjects = [...withoutDup, ...projectAssigned.map((m) => ({ ...m, slot: "later" }))];
    // Re-slot: first incomplete non-project = NOW, then NEXT, then LATER.
    const incomplete = withProjects.filter((m) => !doneIds.has(m.id));
    const complete = withProjects.filter((m) => doneIds.has(m.id));
    const ordered = [...incomplete, ...complete];
    return ordered.map((m, i) => {
      const done = doneIds.has(m.id);
      let slot = "later";
      if (!done) {
        if (m.isProject) {
          slot = "later";
        } else {
          const incIdx = incomplete.filter((x) => !x.isProject).findIndex((x) => x.id === m.id);
          slot = incIdx === 0 ? "now" : incIdx === 1 ? "next" : "later";
        }
      } else {
        slot = "later";
      }
      if (incomplete.length === 0 && i === 0) slot = "now";
      return { ...m, slot, done };
    });
  }, [day.missions, teacherAdded, projectAssigned, practiceAssigned, doneIds]);

  // SAM celebrate once when a newly stamped Teacher checked appears (same browser).
  useEffect(() => {
    if (!teacherCheckedIds.length) return;
    const celebrated = new Set(loadCelebratedTeacherCheckedIds());
    const fresh = teacherCheckedIds.filter((id) => !celebrated.has(id));
    if (!fresh.length) return;
    const mission =
      missions.find((m) => fresh.includes(m.id)) ||
      day.missions.find((m) => fresh.includes(m.id));
    const title = mission?.title || "your work";
    setSamMsg(day.samTeacherChecked(title));
    markTeacherCheckedCelebrated(fresh);
  }, [teacherCheckedIds, missions, day]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  function mustsRemaining(exceptId) {
    return missions.filter(
      (m) => m.must && m.id !== exceptId && !doneIds.has(m.id)
    );
  }

  function handleStart(mission) {
    if (mission.done) {
      setSamMsg("You already finished this one. Pick the Next card when you're ready.");
      setToast({ text: "Already done — nice. Try the next open card.", tone: "soft" });
      return;
    }
    if (!mission.must && mustsRemaining(mission.id).length > 0) {
      setSamMsg(day.samMustFirst);
      setToast({ text: day.samMustFirst, tone: "soft" });
      return;
    }
    // Project cards → light student project shell (checkpoints + evidence + submit).
    if (mission.isProject) {
      const pid = mission.projectActivityId || mission.id;
      setSamMsg(`Opening “${mission.title}” — checkpoints and evidence when you're ready.`);
      router.push(STUDENT_PROJECT_HREF(pid));
      return;
    }
    setSamMsg(day.samStarted(mission.title));
    router.push(`/v2/student/activity/${encodeURIComponent(mission.id)}`);
  }

  const allDone = missions.length > 0 && missions.every((m) => m.done);
  const sizeScale = TEXT_SIZE_SCALE[prefs.textSize] || 1;
  const shownName = prefs.displayName || student.name;

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <main style={{ ...pageStyle(), fontSize: `${16 * sizeScale}px` }}>
      <div
        className="ci2-myday-print"
        style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 80px" }}
      >
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>{day.dateLabel}</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", color: INK, fontSize: 30, margin: "4px 0 0" }}>
              {day.greeting(prefs.displayName || student.name)}
            </h1>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>
              {student.className} · {student.teacher}
            </div>
          </div>
          <div className="ci2-no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={handlePrint}
              title="Print a glance-first My Day sheet"
              style={ghostBtn()}
            >
              Print
            </button>
            <Link href="/v2" style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
              CI2 home
            </Link>
          </div>
        </header>

        <div
          role="group"
          aria-label="Demo student"
          className="ci2-no-print"
          style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>Demo</span>
          {DEMO_STUDENT_KIDS.map((kid) => {
            const active = kid.id === student.id;
            return (
              <button
                key={kid.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveDemoKidId(kid.id);
                  setStudent(kid);
                  refreshProgress();
                  setTeacherCheckedIds(loadTeacherCheckedIds());
                  setPracticeAssigned(readAssignedPracticeForDay(day.dayIndex));
                  setPrefs(loadStudentPrefs(kid.id));
                  setSamMsg(`${kid.name}'s day — progress stays with each kid.`);
                }}
                style={{
                  border: active ? "none" : `1px solid ${LINE}`,
                  background: active ? LAVENDER : "rgba(255,255,255,.9)",
                  color: active ? "#fff" : LAVENDER,
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: active ? "0 4px 14px rgba(139,108,255,.28)" : "none",
                }}
              >
                {kid.name}
              </button>
            );
          })}
        </div>

        <SamBubble text={allDone ? `All set for today — great work, ${shownName}.` : samMsg} />

        {day.doneYesterday?.length > 0 && (
          <section aria-label="Done yesterday" style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.4, marginBottom: 8 }}>
              DONE · YESTERDAY
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {day.doneYesterday.map((d) => (
                <div
                  key={d.id}
                  style={{
                    background: CREAM,
                    border: `1px solid ${LINE}`,
                    borderRadius: 999,
                    padding: "8px 14px",
                    fontSize: 13,
                    color: INK,
                    fontWeight: 600,
                  }}
                  title={d.note}
                >
                  ✓ {d.title}
                </div>
              ))}
            </div>
          </section>
        )}

        <section aria-label="Today" style={{ marginTop: 22 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: INK, letterSpacing: 0.5, marginBottom: 12 }}>
            NOW → NEXT → LATER
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {missions.length === 0 ? (
              <div
                role="status"
                style={{
                  background: "rgba(255,255,255,.92)",
                  border: `1px solid ${LINE}`,
                  borderRadius: 22,
                  padding: "28px 22px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 8px 22px rgba(46,36,89,.06)",
                }}
              >
                <div style={{ fontWeight: 800, color: INK, fontSize: 18, lineHeight: 1.3 }}>
                  Your day is clear for now
                </div>
                <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.45, maxWidth: 360 }}>
                  When something lands here, Start will open it. You can still try a first mission anytime.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSamMsg("Opening your first mission — you've got this.");
                    router.push("/v2/student/activity/stu-now-equiv");
                  }}
                  style={{
                    border: "none",
                    background: LAVENDER,
                    color: "#fff",
                    borderRadius: 999,
                    padding: "10px 18px",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 6px 18px rgba(139,108,255,.28)",
                  }}
                >
                  Start first mission
                </button>
              </div>
            ) : (
              missions.map((m) => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  locked={!m.done && !m.must && mustsRemaining(m.id).length > 0}
                  teacherChecked={teacherCheckedIds.includes(m.id)}
                  onStart={() => handleStart(m)}
                />
              ))
            )}
          </div>
        </section>

        <div className="ci2-no-print">
        <PrefsGlass
          open={prefsOpen}
          prefs={prefs}
          student={student}
          onToggle={() => setPrefsOpen((v) => !v)}
          onChange={(partial) => {
            const next = saveStudentPrefs(partial);
            setPrefs(next);
            if (partial.displayName != null) {
              setSamMsg(`Got it — I’ll call you ${next.displayName}.`);
            } else if (partial.textSize != null) {
              setSamMsg(`Text size ${next.textSize} — still glance-first.`);
            } else if (partial.soundOn != null) {
              setSamMsg(
                next.soundOn
                  ? "Sound on — soft cues when they’re ready (stub)."
                  : "Sound off — quiet glass."
              );
            }
          }}
          onReset={() => {
            const next = resetStudentPrefs();
            setPrefs(next);
            setSamMsg("Prefs cleared — back to calm defaults.");
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href={STUDENT_TOOLS_HREF}
            style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}
            onClick={() => setSamMsg("Tools are open — read aloud, word chips, soft highlight.")}
          >
            Tools
          </Link>
          <span style={{ fontSize: 12, color: MUTED }}>
            Teacher preview · class code {student.classCodeStub}
          </span>
        </div>
        </div>

        {teacherAdded.length > 0 && (
          <p className="ci2-no-print" style={{ marginTop: 16, fontSize: 12, color: MUTED }}>
            Showing {teacherAdded.length} item{teacherAdded.length === 1 ? "" : "s"} your teacher added for
            today (this browser).
          </p>
        )}
      </div>
      <div className="ci2-no-print">
        <Toast toast={toast} />
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .ci2-myday-print, .ci2-myday-print * { visibility: visible !important; }
          .ci2-myday-print {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            background: #fff !important;
            box-shadow: none !important;
            padding: 12px 16px !important;
          }
          .ci2-no-print { display: none !important; }
        }
      `}</style>
    </main>
  );
}

function PrefsGlass({ open, prefs, student, onToggle, onChange, onReset }) {
  return (
    <section aria-label="My preferences" style={{ marginTop: 28 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          title="Light prefs — this browser only"
          style={{
            border: `1px solid ${LINE}`,
            background: "rgba(255,255,255,.88)",
            color: INK,
            borderRadius: 999,
            padding: "7px 14px",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 2px 10px rgba(46,36,89,.05)",
          }}
        >
          {prefs.displayName || student.name}
          <span style={{ fontWeight: 700, color: MUTED, marginLeft: 8 }}>
            · {prefs.textSize} · {prefs.soundOn ? "sound on" : "sound off"}
          </span>
        </button>
        {!open && (
          <span style={{ fontSize: 12, color: MUTED }}>Prefs · this browser</span>
        )}
      </div>
      {open && (
        <div
          style={{
            marginTop: 10,
            background: "rgba(255,255,255,.92)",
            border: `1px solid ${LINE}`,
            borderRadius: 20,
            padding: "16px 16px 14px",
            boxShadow: "0 8px 24px rgba(46,36,89,.06)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.4, marginBottom: 12 }}>
            MY PREFS · STUB
          </div>
          <label style={{ display: "block", marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: MUTED }}>Display name</span>
            <input
              type="text"
              value={prefs.displayName}
              maxLength={24}
              aria-label="Display name"
              onChange={(e) => onChange({ displayName: e.target.value })}
              style={{
                display: "block",
                width: "100%",
                marginTop: 6,
                border: `1px solid ${LINE}`,
                borderRadius: 12,
                padding: "10px 12px",
                fontSize: 15,
                fontWeight: 700,
                color: INK,
                background: CREAM,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </label>
          <div style={{ marginBottom: 14 }} role="group" aria-label="Text size">
            <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, marginBottom: 6 }}>Text size</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["S", "M", "L"].map((sz) => {
                const on = prefs.textSize === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onChange({ textSize: sz })}
                    style={{
                      flex: 1,
                      border: on ? "none" : `1px solid ${LINE}`,
                      background: on ? LAVENDER : "rgba(255,255,255,.95)",
                      color: on ? "#fff" : LAVENDER,
                      borderRadius: 999,
                      padding: "8px 0",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <button
              type="button"
              aria-pressed={prefs.soundOn}
              onClick={() => onChange({ soundOn: !prefs.soundOn })}
              style={{
                border: prefs.soundOn ? "none" : `1px solid ${LINE}`,
                background: prefs.soundOn ? LAVENDER : "rgba(255,255,255,.95)",
                color: prefs.soundOn ? "#fff" : LAVENDER,
                borderRadius: 999,
                padding: "8px 16px",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sound {prefs.soundOn ? "on" : "off"}
            </button>
            <button
              type="button"
              onClick={onReset}
              style={{
                border: "none",
                background: "transparent",
                color: MUTED,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                textDecoration: "underline",
              }}
            >
              Reset prefs
            </button>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 12, color: MUTED, lineHeight: 1.4 }}>
            Local only · per demo kid · no account sync.
          </p>
        </div>
      )}
    </section>
  );
}

function MissionCard({ mission, locked, teacherChecked, onStart }) {
  const isNow = mission.slot === "now" && !mission.done;
  const label = mission.done
    ? "DONE"
    : mission.isProject
      ? "LATER · PROJECT"
      : mission.isPractice
        ? `${SLOT_LABEL[mission.slot] || "LATER"} · PRACTICE`
        : SLOT_LABEL[mission.slot] || "LATER";
  const color = subjectColor(mission.subject);
  const cta = mission.done
    ? "Done ✓"
    : mission.kidAction || "Start";

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        background: mission.done ? CREAM : isNow ? SOFT_LAV : "#fff",
        border: `1px solid ${mission.done ? "#E8D9A8" : isNow ? "#D9CFFF" : LINE}`,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: isNow ? "0 10px 28px rgba(139,108,255,.16)" : "0 2px 10px rgba(46,36,89,.04)",
        opacity: locked ? 0.78 : 1,
      }}
    >
      <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
        <div
          style={{
            width: isNow ? 76 : 64,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: mission.done
              ? "rgba(232,201,106,.25)"
              : isNow
                ? "rgba(139,108,255,.16)"
                : "#F7F4FF",
            fontWeight: 800,
            fontSize: isNow ? 13 : 11,
            color: mission.done ? "#9A7B1A" : isNow ? LAVENDER : MUTED,
            letterSpacing: 0.4,
          }}
        >
          {label}
        </div>
        <div style={{ flex: 1, padding: isNow ? "16px 14px 12px" : "12px 12px 10px", minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 4 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color,
                textTransform: "uppercase",
                letterSpacing: 0.3,
              }}
            >
              {productKidLabel(mission.product)}
              {mission.subject ? ` · ${subjectName(mission.subject)}` : ""}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: mission.must ? LAVENDER : MUTED,
                background: mission.must ? "rgba(139,108,255,.12)" : "#F3F1FA",
                borderRadius: 999,
                padding: "2px 8px",
              }}
            >
              {mission.must ? "Must-do" : "May-do"}
            </span>
            {mission.fromTeacherAdd && (
              <span style={{ fontSize: 11, fontWeight: 700, color: MUTED }}>From teacher</span>
            )}
            {mission.isProject && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: LAVENDER,
                  background: "rgba(139,108,255,.12)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                Project
              </span>
            )}
            {mission.isPractice && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: LAVENDER,
                  background: "rgba(139,108,255,.12)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                Practice
              </span>
            )}
            {teacherChecked && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#2F7A5B",
                  background: "rgba(47,122,91,.12)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
                title="Your teacher looked at this — calm check, not a grade scare."
              >
                Teacher checked
              </span>
            )}
          </div>
          <div style={{ fontWeight: 800, color: INK, fontSize: isNow ? 20 : 16, lineHeight: 1.25 }}>
            {mission.done ? `✓ ${mission.title}` : mission.title}
          </div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>
            {mission.minutes} min
            {mission.isProject && mission.evidenceLabel ? ` · ${mission.evidenceLabel}` : ""}
            {mission.isProject && mission.audienceId === "small_group" ? " · small group" : ""}
            {locked ? " · unlock after must-dos" : ""}
            {mission.done ? " · finished" : ""}
          </div>
        </div>
      </div>
      <div className="ci2-no-print" style={{ padding: "0 14px 14px", display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onStart}
          disabled={mission.done}
          style={primaryBtn({
            big: isNow,
            quiet: !isNow || mission.done,
            locked: locked || mission.done,
          })}
        >
          {locked ? "Not yet" : cta}
        </button>
      </div>
    </article>
  );
}

function SamBubble({ text }) {
  return (
    <div
      role="status"
      style={{
        marginTop: 16,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        background: "rgba(255,255,255,.85)",
        border: `1px solid ${LINE}`,
        borderRadius: 18,
        padding: "12px 14px",
      }}
    >
      <div
        aria-hidden
        style={{
          width: 40,
          height: 40,
          borderRadius: 14,
          background: "linear-gradient(145deg, #B8A4FF, #8B6CFF)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        SAM
      </div>
      <p style={{ margin: 0, color: INK, fontSize: 15, lineHeight: 1.45, paddingTop: 6 }}>{text}</p>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 22,
        transform: "translateX(-50%)",
        background: toast.tone === "soft" ? INK : LAVENDER,
        color: "#fff",
        borderRadius: 999,
        padding: "12px 18px",
        fontSize: 14,
        fontWeight: 600,
        boxShadow: "0 10px 28px rgba(46,36,89,.28)",
        zIndex: 40,
        maxWidth: "calc(100% - 28px)",
        textAlign: "center",
      }}
    >
      {toast.text}
    </div>
  );
}

function pageStyle() {
  return {
    minHeight: "100vh",
    background: WARM_BG,
    fontFamily: "'Inter', system-ui, sans-serif",
  };
}

function primaryBtn({ big, quiet, locked, marginTop } = {}) {
  return {
    border: quiet && !locked ? `1px solid ${LINE}` : "none",
    background: locked ? "#E8E4F4" : quiet ? "#fff" : LAVENDER,
    color: locked ? MUTED : quiet ? LAVENDER : "#fff",
    borderRadius: 999,
    padding: big ? "12px 22px" : "9px 16px",
    fontWeight: 800,
    fontSize: big ? 15 : 13,
    cursor: locked ? "default" : "pointer",
    fontFamily: "inherit",
    boxShadow: !quiet && !locked ? "0 6px 18px rgba(139,108,255,.28)" : "none",
    marginTop: marginTop || 0,
  };
}

function ghostBtn() {
  return {
    border: `1px solid ${LINE}`,
    background: "rgba(255,255,255,.8)",
    color: INK,
    borderRadius: 999,
    padding: "8px 14px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}