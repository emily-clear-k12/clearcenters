"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEMO_STUDENT,
  DEMO_STUDENT_DAY,
  buildStudentDayMissions,
  productKidLabel,
  readTeacherAddedForDay,
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
} from "../../../lib/v2/demoProject";

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
 * Progress: localStorage ci2.student.missionProgress (same browser).
 */
export default function StudentMyDayClient() {
  const student = DEMO_STUDENT;
  const day = DEMO_STUDENT_DAY;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [teacherAdded, setTeacherAdded] = useState([]);
  const [projectAssigned, setProjectAssigned] = useState([]);
  const [doneIds, setDoneIds] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  const [samMsg, setSamMsg] = useState(day.samLine);

  function refreshProgress() {
    const { doneIds: ids } = readStudentProgress();
    setDoneIds(new Set(ids));
  }

  useEffect(() => {
    const refreshTeacher = () => setTeacherAdded(readTeacherAddedForDay(day.dayIndex));
    const refreshProjects = () => setProjectAssigned(readAssignedProjectsForDay(day.dayIndex));
    refreshTeacher();
    refreshProjects();
    refreshProgress();
    const onStorage = (e) => {
      if (!e.key || e.key === ADDED_ACTIVITIES_KEY) refreshTeacher();
      if (!e.key || e.key === PROJECT_ASSIGNED_KEY) refreshProjects();
      if (!e.key || e.key === STUDENT_PROGRESS_KEY) refreshProgress();
    };
    const onFocus = () => {
      refreshTeacher();
      refreshProjects();
      refreshProgress();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    window.addEventListener("ci2-project-assigned", refreshProjects);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("ci2-project-assigned", refreshProjects);
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
    // Cheap bridge: teacher-assigned projects append as Later · Project (may-do).
    const projectIds = new Set(projectAssigned.map((m) => m.id));
    const withoutDup = built.filter((m) => !projectIds.has(m.id));
    const withProjects = [...withoutDup, ...projectAssigned.map((m) => ({ ...m, slot: "later" }))];
    // Re-slot: first incomplete = NOW, then NEXT, then LATER. Done cards keep order but mark done.
    const incomplete = withProjects.filter((m) => !doneIds.has(m.id));
    const complete = withProjects.filter((m) => doneIds.has(m.id));
    // Show incomplete first (so NOW advances), then completed strip at end of list
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
      // If everything done, first card stays visual calm
      if (incomplete.length === 0 && i === 0) slot = "now";
      return { ...m, slot, done };
    });
  }, [day.missions, teacherAdded, projectAssigned, doneIds]);

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
    // Project cards are a cheap Later stub — no full student project player yet.
    if (mission.isProject) {
      setSamMsg(`“${mission.title}” is a multi-day project stub. Evidence later — you're all set for now.`);
      setToast({
        text: "Project shell is teacher-side for now. Card stays on Later until the real player lands.",
        tone: "soft",
      });
      return;
    }
    setSamMsg(day.samStarted(mission.title));
    router.push(`/v2/student/activity/${encodeURIComponent(mission.id)}`);
  }

  const allDone = missions.length > 0 && missions.every((m) => m.done);

  return (
    <main style={pageStyle()}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 80px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUTED }}>{day.dateLabel}</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", color: INK, fontSize: 30, margin: "4px 0 0" }}>
              {day.greeting(student.name)}
            </h1>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>
              {student.className} · {student.teacher}
            </div>
          </div>
          <Link href="/v2" style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
            CI2 home
          </Link>
        </header>

        <SamBubble text={allDone ? "All set for today — great work, Leo." : samMsg} />

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
            {missions.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                locked={!m.done && !m.must && mustsRemaining(m.id).length > 0}
                onStart={() => handleStart(m)}
              />
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => {
              setSamMsg("Tools come later — pencils, hints, and calm helpers. Read-aloud lives on the activity page for now.");
              setToast({ text: "Tools — open an activity for the read-aloud stub.", tone: "soft" });
            }}
            style={ghostBtn()}
          >
            Tools
          </button>
          <span style={{ fontSize: 12, color: MUTED }}>
            Teacher preview · class code {student.classCodeStub}
          </span>
        </div>

        {teacherAdded.length > 0 && (
          <p style={{ marginTop: 16, fontSize: 12, color: MUTED }}>
            Showing {teacherAdded.length} item{teacherAdded.length === 1 ? "" : "s"} your teacher added for
            today (this browser).
          </p>
        )}
      </div>
      <Toast toast={toast} />
    </main>
  );
}

function MissionCard({ mission, locked, onStart }) {
  const isNow = mission.slot === "now" && !mission.done;
  const label = mission.done
    ? "DONE"
    : mission.isProject
      ? "LATER · PROJECT"
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
          </div>
          <div style={{ fontWeight: 800, color: INK, fontSize: isNow ? 20 : 16, lineHeight: 1.25 }}>
            {mission.done ? `✓ ${mission.title}` : mission.title}
          </div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>
            {mission.minutes} min
            {locked ? " · unlock after must-dos" : ""}
            {mission.done ? " · finished" : ""}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 14px 14px", display: "flex", justifyContent: "flex-end" }}>
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