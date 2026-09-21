"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  StationShell,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  GLANCE,
} from "../../../../../../components/v2/StationShell";

import {
  getStandardDetail,
  softAssignmentGlanceLine,
  softBandTotal,
  REPORTS_HREF,
  REPORTS_ASSIGNMENT_HREF,
} from "../../../../../../lib/v2/demoReports";
import {
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  WHO_NEEDS_ME_STORAGE_KEY,
  CHECK_INS_HREF,
  TEACHER_SETUP_KEY,
  pushStandardClusterToToday,
  FOCUS_TODAY_DAY,
} from "../../../../../../lib/v2/demoWhoNeedsMe";
import { TEACHER_SETUPS } from "../../../../../../lib/v2/demoWeek";
import {
  checkInsHrefForStandard,
  softClusterDoors,
  DAY_HREF,
  rememberAwareSamStory,
  isStandardResolved,
} from "../../../../../../lib/v2/demoLoopSeams";

function usePeriodLens() {
  const [liveCheckIns, setLiveCheckIns] = useState(null);
  const [periodId, setPeriodId] = useState(null);
  const [periodLabel, setPeriodLabel] = useState(null);
  useEffect(() => {
    const refresh = () => {
      try {
        const period = readSelectedClassFilter();
        const pid = period && period !== "all" ? period : null;
        setPeriodId(pid);
        if (pid) {
          const setupKey =
            (typeof window !== "undefined" &&
              window.localStorage.getItem(TEACHER_SETUP_KEY)) ||
            "self";
          const setup = TEACHER_SETUPS[setupKey] || TEACHER_SETUPS.self;
          const cls = setup.classes.find((c) => c.key === pid);
          setPeriodLabel(cls?.name || `Period ${pid}`);
        } else setPeriodLabel(null);
        setLiveCheckIns(
          getWhoNeedsMeCount(undefined, undefined, {
            classFilter: period,
            inheritPeriodId: period || "A",
          })
        );
      } catch {
        setLiveCheckIns(0);
        setPeriodId(null);
        setPeriodLabel(null);
      }
    };
    refresh();
    const onStorage = (e) => {
      if (
        !e.key ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === "ci2.grading.inbox" ||
        e.key === "ci2.grading.confirmedIds" ||
        e.key === "ci2.teacher.classFilter" ||
        e.key === "ci2.teacher.setupKey"
      )
        refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
    };
  }, []);
  const checkInsHref =
    periodId && periodId !== "all"
      ? `${CHECK_INS_HREF}?period=${encodeURIComponent(periodId)}`
      : CHECK_INS_HREF;
  const waiting = typeof liveCheckIns === "number" && liveCheckIns > 0;
  return { liveCheckIns, periodLabel, periodId, checkInsHref, waiting };
}

const btnBase = {
  borderRadius: 999,
  padding: "10px 16px",
  fontWeight: 800,
  fontSize: 13,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

/**
 * Standard report — depth off the glance.
 * Paper layout: SAM story → who → class shape (soft bands) → contributing work → calm next.
 * Glance stays scannable; evidence + graph live here.
 */
export default function StandardReportClient({ code }) {
  const detail = getStandardDetail(code);
  const { liveCheckIns, periodLabel, periodId, waiting } = usePeriodLens();
  const router = useRouter();
  const [reteachToast, setReteachToast] = useState(null);

  const softPrimary = {
    background: "rgba(243,238,255,.88)",
    color: LAVENDER,
    border: `1px solid ${LINE}`,
    boxShadow: "none",
  };
  const amberPrimary = {
    background: GLANCE.needsYou.bg,
    color: GLANCE.needsYou.fg,
    border: `1px solid ${GLANCE.needsYou.border}`,
    boxShadow: "none",
  };
  const calmSecondary = {
    background: GLANCE.ready.bg,
    color: GLANCE.ready.fg,
    border: `1px solid ${GLANCE.ready.border}`,
  };

  if (!detail) {
    return (
      <StationShell active="grow">
        <TeacherSubnav active="reports" />
        <div style={{ maxWidth: 720, margin: "0 auto", width: "100%", padding: "0 12px" }}>
          <div
            style={{
              background: "#fff",
              border: `1px solid ${LINE}`,
              borderRadius: 20,
              padding: 28,
            }}
          >
            <p style={{ color: MUTED, margin: 0 }}>That standard isn&apos;t in this class story yet.</p>
            <Link href={REPORTS_HREF} style={{ ...btnBase, ...softPrimary, marginTop: 16 }}>
              ← Back to Reports
            </Link>
          </div>
        </div>
      </StationShell>
    );
  }

  const {
    standard,
    contributing,
    softHint,
    whoLine,
    clusterHint,
    samStory: samStoryRaw,
    calmNext,
    honesty,
    classPctLabel,
    dayHref,
  } = detail;
  const samStory = rememberAwareSamStory(standard) || samStoryRaw;
  const landed = isStandardResolved(standard.code);

  const checkInsHref = checkInsHrefForStandard(standard.code, { periodId });
  const clusterDoors = softClusterDoors(standard.softCluster || [], {
    standard: standard.code,
    periodId,
  });
  const leadAsg = contributing[0] || null;
  const bandTotal = leadAsg ? softBandTotal(leadAsg.bands) : 0;

  const putReteachOnToday = useCallback(() => {
    const block = pushStandardClusterToToday(standard.code, {
      periodId: periodId || "A",
      subject: standard.subject,
      assignment: contributing[0]?.title || `TEKS ${standard.code} reteach`,
      names: standard.softCluster || [],
    });
    if (!block) {
      setReteachToast("Nothing to add — soft cluster is empty.");
      return;
    }
    setReteachToast(`Reteach · ${standard.code} · on Daily Focus today`);
    window.setTimeout(() => {
      router.push(dayHref || DAY_HREF || `/v2/teacher/day?d=${FOCUS_TODAY_DAY}`);
    }, 450);
  }, [standard, periodId, contributing, router, dayHref]);

  return (
    <StationShell active="grow">
      <style>{`
        .std-wrap{max-width:720px;margin:0 auto;width:100%;padding:0 12px}
        .std-paper{
          background:#fffefb;
          border:1px solid ${LINE};
          border-radius:22px;
          overflow:hidden;
          box-shadow:0 14px 40px rgba(40,30,70,.07);
        }
        .std-accent{width:8px;background:${standard.subjectColor};flex-shrink:0}
        .std-body{flex:1;padding:22px 24px 24px}
        .std-sam{
          background:linear-gradient(160deg,rgba(243,238,255,.7),rgba(255,255,255,.4));
          border:1px solid ${LINE};
          border-radius:16px;
          padding:16px 18px;
          margin-top:14px;
        }
        .std-who{
          margin-top:16px;
          padding:14px 16px;
          border-radius:14px;
          background:rgba(255,248,240,.95);
          border:1px solid ${GLANCE.needsYou.border};
        }
        .std-shape{margin-top:18px;padding:14px 16px;border-radius:14px;background:rgba(247,244,255,.65);border:1px solid ${LINE}}
        .std-bar-row{display:flex;align-items:center;gap:10px;margin-top:8px}
        .std-bar-track{flex:1;height:8px;border-radius:999;background:rgba(255,255,255,.9);border:1px solid ${LINE};overflow:hidden}
        .std-bar-fill{height:100%;border-radius:999}
        .std-trail{margin-top:22px;display:flex;flex-direction:column;gap:0}
        .std-step{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid ${LINE}}
        .std-step:last-child{border-bottom:none}
        .std-num{
          width:28px;height:28px;border-radius:999;flex-shrink:0;
          display:inline-flex;align-items:center;justify-content:center;
          font-size:12;font-weight:800;color:${LAVENDER};
          background:rgba(243,238,255,.9);border:1px solid ${LINE};
        }
        .std-next{
          margin-top:20px;padding:16px 18px;border-radius:16px;
          background:rgba(243,238,255,.55);border:1px solid ${LINE};
        }
      `}</style>
      <TeacherSubnav active="reports" />
      <div className="std-wrap">
        <div className="std-paper" style={{ display: "flex", alignItems: "stretch" }}>
          <div className="std-accent" aria-hidden />
          <div className="std-body">
            <Link
              href={REPORTS_HREF}
              style={{ fontSize: 12, fontWeight: 700, color: MUTED, textDecoration: "none" }}
            >
              ← Reports glance
            </Link>

            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: standard.subjectColor,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                Standard report · {standard.subjectName}
              </div>
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  margin: "6px 0 0",
                  fontSize: 26,
                  fontWeight: 700,
                  color: INK,
                  lineHeight: 1.2,
                  letterSpacing: -0.3,
                }}
              >
                TEKS {standard.code}
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 15,
                  fontWeight: 500,
                  color: MUTED,
                  lineHeight: 1.4,
                }}
              >
                {standard.plain}
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 11,
                  fontWeight: 600,
                  color: MUTED,
                }}
              >
                {honesty}
                {periodLabel ? ` · ${periodLabel}` : ""}
                {" · "}
                {landed ? "Landed" : classPctLabel}
                {landed ? "" : ` · ${softHint}`}
              </p>
            </div>

            {/* SAM story — signature lead */}
            <section className="std-sam" aria-label="SAM story">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.4,
                  color: LAVENDER,
                  textTransform: "uppercase",
                }}
              >
                SAM · story
              </div>
              <p
                style={{
                  margin: "10px 0 0",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: INK,
                  lineHeight: 1.55,
                }}
              >
                {samStory}
              </p>
            </section>

            {/* Named who cluster */}
            {whoLine ? (
              <section className="std-who" aria-label="Soft cluster">
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    color: landed ? MUTED : GLANCE.needsYou.fg,
                    textTransform: "uppercase",
                  }}
                >
                  {landed ? "Soft cluster · landed" : "Soft cluster · who"}
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 18,
                    fontWeight: 700,
                    color: INK,
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: -0.2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  {clusterDoors.length
                    ? clusterDoors.map((d, i) => (
                        <span key={d.name} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {i > 0 ? <span style={{ color: MUTED, fontWeight: 600 }}>·</span> : null}
                          <Link
                            href={d.href}
                            title={`Open ${d.name}'s grades`}
                            style={{
                              color: INK,
                              textDecoration: "none",
                              borderBottom: `1px dashed ${LINE}`,
                            }}
                          >
                            {d.name}
                          </Link>
                        </span>
                      ))
                    : whoLine}
                </p>
                {clusterHint ? (
                  <p style={{ margin: "6px 0 0", fontSize: 13, fontWeight: 600, color: MUTED }}>
                    {clusterHint}
                  </p>
                ) : null}
              </section>
            ) : (
              <section
                style={{
                  marginTop: 16,
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: GLANCE.ready.bg,
                  border: `1px solid ${GLANCE.ready.border}`,
                }}
                aria-label="Looking clear"
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    color: GLANCE.ready.fg,
                    textTransform: "uppercase",
                  }}
                >
                  Soft cluster
                </div>
                <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600, color: INK }}>
                  Looking clear — no named soft cluster right now.
                </p>
              </section>
            )}

            {/* Class shape — soft band graph from lead evidence (depth only) */}
            {leadAsg && bandTotal > 0 ? (
              <section className="std-shape" aria-label="Class shape">
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    color: MUTED,
                    textTransform: "uppercase",
                  }}
                >
                  Class shape · {leadAsg.title}
                </div>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: 12,
                    fontWeight: 600,
                    color: MUTED,
                  }}
                >
                  {leadAsg.when || "Recent"} · soft bands from contributing work
                </p>
                {(leadAsg.bands || []).map((b) => {
                  const pct = Math.max(
                    4,
                    Math.round(((Number(b.count) || 0) / bandTotal) * 100)
                  );
                  const fill =
                    b.tone === "needsYou" || b.key === "needsLook"
                      ? GLANCE.needsYou.fg
                      : b.key === "clear"
                        ? GLANCE.ready.fg
                        : LAVENDER;
                  return (
                    <div key={b.key || b.label} className="std-bar-row">
                      <span
                        style={{
                          width: 108,
                          flexShrink: 0,
                          fontSize: 11,
                          fontWeight: 700,
                          color: MUTED,
                        }}
                      >
                        {b.label}
                      </span>
                      <div className="std-bar-track" aria-hidden>
                        <div
                          className="std-bar-fill"
                          style={{
                            width: `${pct}%`,
                            background: fill,
                            opacity: 0.85,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </section>
            ) : null}

            {/* Evidence trail — numbered contributing work (depth, not glance) */}
            <section className="std-trail" aria-label="Evidence trail">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.35,
                  color: MUTED,
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Evidence trail
              </div>
              {contributing.length === 0 ? (
                <p style={{ margin: "8px 0 0", color: MUTED, fontSize: 13 }}>
                  No linked assignments yet.
                </p>
              ) : (
                contributing.map((asg, i) => (
                  <Link
                    key={asg.id}
                    href={REPORTS_ASSIGNMENT_HREF(asg.id)}
                    className="std-step"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="std-num" aria-hidden>
                      {i + 1}
                    </span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: MUTED,
                          textTransform: "uppercase",
                        }}
                      >
                        {asg.when || "Recent"} · {asg.subjectName}
                      </div>
                      <div
                        style={{
                          marginTop: 2,
                          fontWeight: 700,
                          fontSize: 15,
                          color: INK,
                        }}
                      >
                        {asg.title}
                      </div>
                      <div
                        style={{
                          marginTop: 3,
                          fontSize: 12,
                          fontWeight: 600,
                          color: MUTED,
                          lineHeight: 1.4,
                        }}
                      >
                        {asg.softSummary}
                      </div>
                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 12,
                          fontWeight: 700,
                          color: LAVENDER,
                        }}
                      >
                        {softAssignmentGlanceLine(asg)} · Open work →
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </section>

            {/* One calm next */}
            <section className="std-next" aria-label="Calm next">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.35,
                  color: LAVENDER,
                  textTransform: "uppercase",
                }}
              >
                Calm next
              </div>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 14,
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.5,
                }}
              >
                {calmNext}
              </p>
              {(standard.softCluster || []).length > 0 ? (
                <button
                  type="button"
                  onClick={putReteachOnToday}
                  style={{
                    marginTop: 12,
                    border: "none",
                    background: LAVENDER,
                    color: "#fff",
                    borderRadius: 999,
                    padding: "10px 16px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 6px 18px rgba(139,108,255,.25)",
                  }}
                  title="Add an 8-min reteach for this cluster onto Daily Focus today"
                >
                  Put reteach on today
                </button>
              ) : null}
              {reteachToast ? (
                <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: MUTED }}>
                  {reteachToast}
                </div>
              ) : null}
            </section>

            {/* Check-ins secondary */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxWidth: 340,
              }}
            >
              <Link
                href={checkInsHref}
                style={{
                  ...btnBase,
                  ...(waiting ? amberPrimary : calmSecondary),
                  width: "100%",
                }}
                title={
                  waiting
                    ? "Open Check-ins — live waiting needs you"
                    : "Open Check-ins (secondary)"
                }
              >
                Check-ins{waiting ? ` · ${liveCheckIns} waiting` : ""} →
              </Link>
              <Link href={dayHref} style={{ ...btnBase, ...softPrimary, width: "100%" }}>
                ← Daily Focus
              </Link>
              <Link
                href={REPORTS_HREF}
                style={{
                  ...btnBase,
                  color: MUTED,
                  background: "rgba(255,255,255,.88)",
                  border: `1px solid ${LINE}`,
                  width: "100%",
                  fontWeight: 700,
                }}
              >
                Back to Reports glance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StationShell>
  );
}
