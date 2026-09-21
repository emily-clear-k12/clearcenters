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
  getAssignmentDetail,
  softClassPctLabel,
  REPORTS_HREF,
  REPORTS_STANDARD_HREF,
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
 * Assignment report — DISTINCT from glance MAP.
 * What-happened lead → soft clusters with names (not 12/8/5 chrome) → skill trail → calm next.
 */
export default function AssignmentReportClient({ assignmentId }) {
  const detail = getAssignmentDetail(assignmentId);
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
            <p style={{ color: MUTED, margin: 0 }}>That assignment isn&apos;t in this class story yet.</p>
            <Link href={REPORTS_HREF} style={{ ...btnBase, ...softPrimary, marginTop: 16 }}>
              ← Back to Reports
            </Link>
          </div>
        </div>
      </StationShell>
    );
  }

  const {
    assignment,
    standards,
    softCluster,
    bandStory,
    honesty,
    dayHref,
  } = detail;

  const leadStandard = (standards && standards[0]) || null;
  const leadCode = leadStandard?.code || assignment.standardCodes?.[0] || null;
  const checkInsHref = leadCode
    ? checkInsHrefForStandard(leadCode, { periodId })
    : periodId && periodId !== "all"
      ? `${CHECK_INS_HREF}?period=${encodeURIComponent(periodId)}`
      : CHECK_INS_HREF;
  const clusterDoors = softClusterDoors(softCluster?.names || [], {
    standard: leadCode,
    periodId,
  });
  const putReteachOnToday = useCallback(() => {
    if (!leadCode) {
      setReteachToast("No linked standard to reteach yet.");
      return;
    }
    const block = pushStandardClusterToToday(leadCode, {
      periodId: periodId || "A",
      subject: assignment.subject,
      assignment: assignment.title,
      names: softCluster?.names || [],
    });
    if (!block) {
      setReteachToast("Nothing to add — no kids named here.");
      return;
    }
    setReteachToast(`Reteach · ${leadCode} · on Daily Focus today`);
    window.setTimeout(() => {
      router.push(dayHref || DAY_HREF || `/v2/teacher/day?d=${FOCUS_TODAY_DAY}`);
    }, 450);
  }, [leadCode, periodId, assignment, softCluster, router, dayHref]);

  const needsNames = softCluster?.names || [];
  const almostBand = (assignment.bands || []).find((b) => b.key === "almost");
  const clearBand = (assignment.bands || []).find((b) => b.key === "clear");

  return (
    <StationShell active="grow">
      <style>{`
        .asg-wrap{max-width:720px;margin:0 auto;width:100%;padding:0 12px}
        .asg-paper{
          background:#fbfcff;
          border:1px solid ${LINE};
          border-radius:22px;
          overflow:hidden;
          box-shadow:0 14px 40px rgba(40,30,70,.07);
        }
        .asg-hero{
          padding:22px 24px 18px;
          background:linear-gradient(180deg,rgba(243,238,255,.55),rgba(251,252,255,0));
          border-bottom:1px solid ${LINE};
        }
        .asg-body{padding:18px 24px 24px}
        .asg-cluster{
          margin-top:14px;padding:14px 16px;border-radius:14px;
          border:1px solid ${LINE};background:#fff;
        }
        .asg-cluster.needs{
          background:rgba(255,248,240,.95);
          border-color:${GLANCE.needsYou.border};
        }
        .asg-skill{
          display:flex;flex-direction:column;gap:8px;margin-top:10px;
        }
        .asg-skill a{
          display:block;text-decoration:none;color:inherit;
          padding:12px 14px;border-radius:14px;
          background:#fff;border:1px solid ${LINE};
        }
        .asg-next{
          margin-top:18px;padding:16px 18px;border-radius:16px;
          background:rgba(243,238,255,.55);border:1px solid ${LINE};
        }
      `}</style>
      <TeacherSubnav active="reports" />
      <div className="asg-wrap">
        <div className="asg-paper">
          <header className="asg-hero">
            <Link
              href={REPORTS_HREF}
              style={{ fontSize: 12, fontWeight: 700, color: MUTED, textDecoration: "none" }}
            >
              ← Class story
            </Link>
            <div
              style={{
                marginTop: 12,
                fontSize: 11,
                fontWeight: 800,
                color: assignment.subjectColor,
                textTransform: "uppercase",
                letterSpacing: 0.4,
              }}
            >
              Work report · {assignment.subjectName}
              {assignment.when ? ` · ${assignment.when}` : ""}
            </div>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                margin: "6px 0 0",
                fontSize: 24,
                fontWeight: 700,
                color: INK,
                lineHeight: 1.25,
                letterSpacing: -0.25,
              }}
            >
              {assignment.title}
            </h1>
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
            </p>
          </header>

          <div className="asg-body">
            {/* What happened — plain language lead */}
            <section aria-label="What happened">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.35,
                  color: LAVENDER,
                  textTransform: "uppercase",
                }}
              >
                What happened
              </div>
              <p
                style={{
                  margin: "10px 0 0",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: INK,
                  lineHeight: 1.55,
                  maxWidth: 560,
                }}
              >
                {assignment.softSummary}
              </p>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 13,
                  fontWeight: 600,
                  color: MUTED,
                }}
              >
                {bandStory}
              </p>
            </section>

            {/* Soft clusters with WHO — not count chrome as hero */}
            <section style={{ marginTop: 20 }} aria-label="Soft clusters">
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
                Soft clusters · who
              </div>

              {needsNames.length > 0 ? (
                <div className="asg-cluster needs">
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: GLANCE.needsYou.fg,
                      textTransform: "uppercase",
                      letterSpacing: 0.3,
                    }}
                  >
                    May need a look
                  </div>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 18,
                      fontWeight: 700,
                      color: INK,
                      fontFamily: "'Poppins', sans-serif",
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
                      : softCluster.whoLine}
                  </p>
                </div>
              ) : (
                <div className="asg-cluster" style={{ background: GLANCE.ready.bg }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: GLANCE.ready.fg,
                      textTransform: "uppercase",
                    }}
                  >
                    May need a look
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 600, color: INK }}>
                    No named kids — looking clear.
                  </p>
                </div>
              )}

              {almostBand?.names?.length ? (
                <div className="asg-cluster" style={{ marginTop: 10 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: MUTED,
                      textTransform: "uppercase",
                    }}
                  >
                    Almost there
                  </div>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 14,
                      fontWeight: 700,
                      color: INK,
                    }}
                  >
                    {almostBand.names.slice(0, 5).join(" · ")}
                  </p>
                </div>
              ) : null}

              {clearBand?.names?.length ? (
                <div className="asg-cluster" style={{ marginTop: 10, opacity: 0.92 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: MUTED,
                      textTransform: "uppercase",
                    }}
                  >
                    Looking clear (sample)
                  </div>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 13,
                      fontWeight: 600,
                      color: MUTED,
                    }}
                  >
                    {clearBand.names.slice(0, 6).join(" · ")}
                    {clearBand.names.length > 6 ? " · …" : ""}
                  </p>
                </div>
              ) : null}
            </section>

            {/* Skill trail — cross-link to standards */}
            {standards.length > 0 ? (
              <section style={{ marginTop: 22 }} aria-label="Skill trail">
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.35,
                    color: MUTED,
                    textTransform: "uppercase",
                  }}
                >
                  Skill trail
                </div>
                <div className="asg-skill">
                  {standards.map((std) => (
                    <Link key={std.code} href={REPORTS_STANDARD_HREF(std.code)}>
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 5,
                            alignSelf: "stretch",
                            minHeight: 36,
                            borderRadius: 999,
                            background: std.subjectColor,
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: MUTED,
                              textTransform: "uppercase",
                            }}
                          >
                            TEKS {std.code} · {softClassPctLabel(std.classPct)}
                          </div>
                          <div
                            style={{
                              marginTop: 2,
                              fontSize: 14,
                              fontWeight: 700,
                              color: INK,
                            }}
                          >
                            {std.plain}
                          </div>
                          <div
                            style={{
                              marginTop: 2,
                              fontSize: 12,
                              fontWeight: 700,
                              color: LAVENDER,
                            }}
                          >
                            Open skill report →
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Calm next */}
            <section className="asg-next" aria-label="Calm next">
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
                {assignment.calmNext}
              </p>
            
              {(softCluster?.names || []).length > 0 && leadCode ? (
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
                Back to class story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StationShell>
  );
}
