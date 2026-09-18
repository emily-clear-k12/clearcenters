"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
 * One simple day: greeting + SAM, Now / Next / Later cards, tools stub.
 * Optional: surfaces teacher Add tiles from localStorage (same browser).
 */
export default function StudentMyDayClient() {
  const student = DEMO_STUDENT;
  const day = DEMO_STUDENT_DAY;

  const [teacherAdded, setTeacherAdded] = useState([]);
  const [startedId, setStartedId] = useState(null);
  const [doneMustIds, setDoneMustIds] = useState(() => new Set());
  const [toast, setToast] = useState(null);
  const [activeMission, setActiveMission] = useState(null);
  const [samMsg, setSamMsg] = useState(day.samLine);

  useEffect(() => {
    const refresh = () => setTeacherAdded(readTeacherAddedForDay(day.dayIndex));
    refresh();
    const onStorage = (e) => {
      if (!e.key || e.key === ADDED_ACTIVITIES_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
    };
  }, [day.dayIndex]);

  const missions = useMemo(
    () => buildStudentDayMissions(day.missions, teacherAdded),
    [day.missions, teacherAdded]
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  function mustsRemaining(exceptId) {
    return missions.filter((m) => m.must && m.id !== exceptId && !doneMustIds.has(m.id));
  }

  function handleStart(mission) {
    if (!mission.must && mustsRemaining(mission.id).length > 0) {
      setSamMsg(day.samMustFirst);
      setToast({ text: day.samMustFirst, tone: "soft" });
      return;
    }
    setStartedId(mission.id);
    setActiveMission(mission);
    setSamMsg(day.samStarted(mission.title));
    setToast({ text: day.samStarted(mission.title), tone: "ok" });
  }

  function markContinueDone() {
    if (!activeMission) return;
    if (activeMission.must) {
      setDoneMustIds((prev) => new Set([...prev, activeMission.id]));
    }
    setToast({ text: "Nice work — back to your day.", tone: "ok" });
    setSamMsg("You're rolling. Next card when you're ready.");
    setActiveMission(null);
  }

  // Stub "play" screen
  if (activeMission) {
    return (
      <main style={pageStyle()}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "28px 16px 64px" }}>
          <button type="button" onClick={() => setActiveMission(null)} style={ghostBtn()}>
            ← My Day
          </button>
          <div
            style={{
              marginTop: 20,
              background: "#fff",
              border: `1px solid ${LINE}`,
              borderRadius: 24,
              padding: "28px 22px",
              boxShadow: "0 12px 36px rgba(139,108,255,.14)",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: subjectColor(activeMission.subject), letterSpacing: 0.4 }}>
              {productKidLabel(activeMission.product)} · {subjectName(activeMission.subject)}
            </div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", color: INK, fontSize: 28, margin: "8px 0 6px" }}>
              {activeMission.title}
            </h1>
            <p style={{ color: MUTED, marginTop: 0 }}>{activeMission.minutes} min · skeleton stub</p>
            <SamBubble text={activeMission.samHint || day.samLine} />
            <p style={{ color: MUTED, fontSize: 14, marginTop: 18 }}>
              Real lesson / center / quest opens here later. For now this is a calm placeholder.
            </p>
            <button type="button" onClick={markContinueDone} style={primaryBtn({ big: true, marginTop: 20 })}>
              I&apos;m done for now
            </button>
          </div>
        </div>
        <Toast toast={toast} />
      </main>
    );
  }

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

        <SamBubble text={samMsg} />

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
                started={startedId === m.id}
                locked={!m.must && mustsRemaining(m.id).length > 0}
                onStart={() => handleStart(m)}
              />
            ))}
          </div>
        </section>

        <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => {
              setSamMsg("Tools come later — pencils, hints, and calm helpers.");
              setToast({ text: "Tools — skeleton stub. Nothing to open yet.", tone: "soft" });
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

function MissionCard({ mission, started, locked, onStart }) {
  const isNow = mission.slot === "now";
  const label = SLOT_LABEL[mission.slot] || "LATER";
  const color = subjectColor(mission.subject);
  const cta = started ? mission.continueAction || "Continue" : mission.kidAction || "Start";

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        background: isNow ? SOFT_LAV : "#fff",
        border: `1px solid ${isNow ? "#D9CFFF" : LINE}`,
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
            background: isNow ? "rgba(139,108,255,.16)" : "#F7F4FF",
            fontWeight: 800,
            fontSize: isNow ? 13 : 11,
            color: isNow ? LAVENDER : MUTED,
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
          </div>
          <div style={{ fontWeight: 800, color: INK, fontSize: isNow ? 20 : 16, lineHeight: 1.25 }}>
            {mission.title}
          </div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>
            {mission.minutes} min
            {locked ? " · unlock after must-dos" : ""}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 14px 14px", display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onStart}
          style={primaryBtn({
            big: isNow,
            quiet: !isNow,
            locked,
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
    cursor: "pointer",
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
