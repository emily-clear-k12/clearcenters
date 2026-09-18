"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  GLANCE,
  glanceChipStyle,
} from "../../../../../components/v2/StationShell";
import {
  assignPracticeToMyDay,
  getLiveTeachStub,
  isPracticeAssigned,
  PRACTICE_ASSIGNED_KEY,
} from "../../../../../lib/v2/demoLiveTeach";

/**
 * CI2.0 Live teach shell — present-mode skeleton.
 * Big objective · beat 1/2/3 · next/back · assign practice stub.
 * Glance-first, calm — not a slide deck builder.
 */
export default function LiveTeachClient({ lessonId }) {
  const router = useRouter();
  const shell = useMemo(() => getLiveTeachStub(lessonId), [lessonId]);
  const [beatIdx, setBeatIdx] = useState(0);
  const [assigned, setAssigned] = useState(false);

  useEffect(() => {
    if (!shell?.id) return;
    const refresh = () => setAssigned(isPracticeAssigned(shell.id));
    refresh();
    const onStorage = (e) => {
      if (!e.key || e.key === PRACTICE_ASSIGNED_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-practice-assigned", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-practice-assigned", refresh);
    };
  }, [shell?.id]);

  function handleAssignPractice() {
    if (!shell) return;
    assignPracticeToMyDay(shell);
    setAssigned(true);
  }

  if (!shell) {
    return (
      <StationShell>
        <TeacherSubnav active="day" />
        <Glass>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 28, color: INK }}>
            Teach live not found
          </h1>
          <p style={{ color: MUTED, marginTop: 8 }}>
            Open a teach block on Daily Focus and tap Teach live.
          </p>
          <Link
            href="/v2/teacher/day?d=2"
            style={{
              display: "inline-block",
              marginTop: 14,
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ← Daily Focus
          </Link>
        </Glass>
      </StationShell>
    );
  }

  const beat = shell.beats[beatIdx] || shell.beats[0];
  const atStart = beatIdx <= 0;
  const atEnd = beatIdx >= shell.beats.length - 1;

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass
        style={{
          padding: "28px 28px 24px",
          minHeight: "min(70vh, 640px)",
          display: "flex",
          flexDirection: "column",
          ...{
            background: "rgba(255,255,255,.96)",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: GLANCE.teach.fg,
              textTransform: "uppercase",
              letterSpacing: 0.3,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: GLANCE.teach.fg,
                opacity: 0.85,
              }}
            />
            Teach live · {shell.subjectName}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={chip()}>{shell.teksChip}</span>
            <span style={chip()}>{shell.dayLabel}</span>
            <span style={chip()}>~{shell.minutes} min</span>
          </div>
        </div>

        <p
          style={{
            margin: "10px 0 0",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: MUTED,
          }}
        >
          {shell.samLine}
        </p>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            margin: "18px 0 0",
            fontSize: "clamp(22px, 3.2vw, 34px)",
            fontWeight: 700,
            color: INK,
            lineHeight: 1.2,
          }}
        >
          {shell.title}
        </h1>

        <div
          style={{
            marginTop: 20,
            background: SOFT_LAV,
            border: `1px solid ${LINE}`,
            borderRadius: 18,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: GLANCE.teach.fg,
              letterSpacing: 0.4,
              marginBottom: 8,
            }}
          >
            OBJECTIVE
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(18px, 2.4vw, 26px)",
              fontWeight: 650,
              color: INK,
              lineHeight: 1.35,
            }}
          >
            {shell.objective}
          </p>
        </div>

        <div style={{ marginTop: 22, flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 14,
              alignItems: "center",
            }}
          >
            {shell.beats.map((b, i) => {
              const on = i === beatIdx;
              return (
                <button
                  key={b.index}
                  type="button"
                  onClick={() => setBeatIdx(i)}
                  aria-pressed={on}
                  style={{
                    border: on ? "none" : `1px solid ${GLANCE.teach.border}`,
                    background: on ? GLANCE.teach.fg : GLANCE.teach.bg,
                    color: on ? "#fff" : GLANCE.teach.fg,
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Beat {b.index}
                </button>
              );
            })}
          </div>

          <article
            style={{
              borderRadius: 18,
              padding: "20px 20px",
              border: `1px solid ${GLANCE.teach.border}`,
              background: "rgba(255,255,255,.92)",
              boxShadow: "0 10px 28px rgba(123,107,184,.10)",
              minHeight: 140,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: GLANCE.teach.fg,
                textTransform: "uppercase",
                letterSpacing: 0.3,
              }}
            >
              Beat {beat.index} of {shell.beats.length}
            </div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                margin: "8px 0 0",
                fontSize: "clamp(20px, 2.6vw, 28px)",
                fontWeight: 700,
                color: INK,
              }}
            >
              {beat.title}
            </h2>
            <p style={{ margin: "10px 0 0", fontSize: 17, lineHeight: 1.45, color: INK }}>
              {beat.detail}
            </p>
          </article>
        </div>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              disabled={atStart}
              onClick={() => setBeatIdx((i) => Math.max(0, i - 1))}
              style={navBtn(atStart)}
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={atEnd}
              onClick={() => setBeatIdx((i) => Math.min(shell.beats.length - 1, i + 1))}
              style={navBtn(atEnd, true)}
            >
              Next →
            </button>
          </div>

          <button
            type="button"
            onClick={handleAssignPractice}
            title={shell.assignPracticeHint}
            style={{
              border: assigned ? `1px solid ${GLANCE.ready.border}` : "none",
              background: assigned ? GLANCE.ready.bg : GLANCE.project.fg,
              color: assigned ? GLANCE.ready.fg : "#fff",
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: assigned ? "none" : "0 6px 16px rgba(91,79,154,.22)",
            }}
          >
            {assigned ? "Practice on My Day ✓" : shell.assignPracticeLabel}
          </button>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 16,
          }}
        >
          <button
            type="button"
            onClick={() => router.push(shell.backHref)}
            style={{
              border: "none",
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Daily Focus
          </button>
          <Link href={shell.lessonPlanHref} style={linkChip(GLANCE.teach)}>
            Lesson plan
          </Link>
          <Link href={shell.projectHref} style={linkChip(GLANCE.project)}>
            Project
          </Link>
        </div>

        <p style={{ margin: "14px 0 0", color: MUTED, fontSize: 12, lineHeight: 1.45 }}>
          Present mode skeleton — Assign practice writes a My Day card (same browser). Not a slide deck builder.
        </p>
      </Glass>
    </StationShell>
  );
}

function chip() {
  return {
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 999,
    padding: "5px 11px",
    color: MUTED,
    background: SOFT_LAV,
    border: `1px solid ${LINE}`,
  };
}

function navBtn(disabled, primary) {
  return {
    border: primary && !disabled ? "none" : `1px solid ${LINE}`,
    background: primary && !disabled ? GLANCE.teach.fg : "#fff",
    color: primary && !disabled ? "#fff" : disabled ? MUTED : INK,
    borderRadius: 999,
    padding: "12px 18px",
    fontWeight: 800,
    fontSize: 14,
    cursor: disabled ? "default" : "pointer",
    fontFamily: "inherit",
    opacity: disabled ? 0.55 : 1,
  };
}

function linkChip(tone) {
  return {
    border: `1px solid ${tone.border}`,
    background: tone.bg,
    color: tone.fg,
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 700,
    fontSize: 13,
    textDecoration: "none",
  };
}
