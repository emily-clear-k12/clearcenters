"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  SetupSwitcher,
  RoomCards,
  SingleRoomLabel,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
  CREAM,
  GLANCE,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../../components/v2/StationShell";
import { usePlanner } from "../../../../lib/v2/usePlanner";
import {
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  loadConfirmedIds,
  subjectMeta,
} from "../../../../lib/v2/demoGrading";
import {
  actionLabel,
  getWhoNeedsCountsByClass,
  getWhoNeedsMeCards,
  loadWhoNeedsChoices,
  pushCheckInToDailyFocus,
  pushCheckInToThisWeek,
  reasonLabel,
  recordWhoNeedsAction,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import { removeAddedActivity } from "../../../../lib/v2/demoLibrary";
import { FAMILY_NOTE_HREF } from "../../../../lib/v2/demoFamilyNote";

/**
 * CI2.0 Check-ins — reteach / small-group stub. Route: /v2/teacher/check-ins.
 * 1–3 calm cards. Actions persist in localStorage; dismissed leave the list.
 * Departmentalized: same RoomCards / classFilter as Daily Focus (synced via usePlanner).
 */
export default function CheckInsClient() {
  const p = usePlanner();
  const [choices, setChoices] = useState({});
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  const refresh = useCallback(() => {
    setChoices(loadWhoNeedsChoices());
    setConfirmedIds(loadConfirmedIds());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
    const onStorage = (e) => {
      if (
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    window.addEventListener("ci2-grading-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
    };
  }, [refresh]);

  useEffect(() => {
    if (!toast) return;
    const ms = toast.undoId ? 5600 : 2200;
    const t = setTimeout(() => setToast(null), ms);
    return () => clearTimeout(t);
  }, [toast]);

  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass = p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;
  const filterOpts = useMemo(
    () => ({
      classFilter: selectedClass,
      inheritPeriodId: selectedClass || "A",
    }),
    [selectedClass]
  );

  const cards = useMemo(() => {
    void choices;
    void confirmedIds;
    if (!hydrated || !p.hydrated) {
      return getWhoNeedsMeCards({}, [], filterOpts);
    }
    return getWhoNeedsMeCards(choices, confirmedIds, filterOpts);
  }, [choices, confirmedIds, hydrated, p.hydrated, filterOpts]);

  const needsByClass = useMemo(() => {
    const keys = p.setup.classes.map((c) => c.key);
    const base = {};
    for (const k of keys) base[k] = 0;
    if (!hydrated || !p.hydrated) return base;
    return {
      ...base,
      ...getWhoNeedsCountsByClass(keys, choices, confirmedIds),
    };
  }, [p.setup.classes, choices, confirmedIds, hydrated, p.hydrated]);

  const periodLabel = cls?.name || "this class";

  const act = useCallback((card, action) => {
    const next = recordWhoNeedsAction(card.id, action);
    setChoices(next);
    const name = card.studentFirst;
    if (action === "small_group" || action === "reteach_tomorrow") {
      const block = pushCheckInToDailyFocus(card, action, {
        periodId: card.periodId || selectedClass || "A",
      });
      const names = block?.studentNames?.join(" · ") || name;
      if (action === "small_group") {
        setToast({ text: `${names} · on Daily Focus · today · small group.` });
      } else {
        setToast({ text: `${names} · on Daily Focus · tomorrow · reteach.` });
      }
    } else {
      setToast({ text: `${name} · looks good. Cleared for now.` });
    }
  }, [selectedClass]);

  /** Mint a This Week tile via ci2.teacher.addedActivities (same as Library / Sunday). */
  const addToThisWeek = useCallback((card) => {
    const entry = pushCheckInToThisWeek(card, {
      periodId: card.periodId || selectedClass || "A",
    });
    if (!entry) return;
    const room =
      entry.classes !== "all" && Array.isArray(entry.classes)
        ? ` · period ${entry.classes[0]}`
        : "";
    setToast({
      text: `${card.studentFirst} · added to This Week${room}.`,
      undoId: entry.id,
    });
  }, [selectedClass]);

  const undoAddToWeek = useCallback(() => {
    if (!toast?.undoId) return;
    const ok = removeAddedActivity(toast.undoId);
    setToast({ text: ok ? "Undone — removed from This Week." : "Nothing to undo." });
  }, [toast]);

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>
              Check-ins
            </h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              1–3 kids · calm look · not a spreadsheet
              {p.multiClass ? ` · ${periodLabel}` : ""}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
              {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  ...glanceChipStyle(cards.length ? "needsYou" : "ready"),
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
              >
                {cards.length === 0 ? "All clear" : `${cards.length} worth a look`}
              </span>
              <Link
                href="/v2/teacher/day?d=2"
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                ← Daily Focus
              </Link>
              <Link
                href="/v2/teacher"
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                This Week →
              </Link>
              <Link
                href={GRADING_INBOX_HREF}
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                Grading →
              </Link>
            </div>
          </div>
        </div>

        {p.multiClass && (
          <RoomCards
            classes={p.setup.classes}
            selectedKey={selectedClass}
            onSelect={p.setClassFilter}
            setup={p.setup}
            needsByClass={needsByClass}
          />
        )}

        <section aria-label="Check-ins cards" style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {cards.length === 0 && (
            <div
              style={{
                ...glanceCardStyle("ready"),
                borderRadius: 16,
                padding: "18px 16px",
                color: INK,
                fontSize: 15,
                lineHeight: 1.45,
              }}
            >
              {p.multiClass
                ? `Everyone's in good shape for ${periodLabel} right now. Nothing waiting.`
                : "Everyone's in good shape right now. Nothing waiting."}
            </div>
          )}

          {cards.map((card) => {
            const sub = subjectMeta(card.subject);
            const needsYou = card.tone === "needs_you";
            const roomName =
              p.multiClass && card.periodId
                ? p.setup.classes.find((c) => c.key === card.periodId)?.name
                : null;
            return (
              <article
                key={card.id}
                style={{
                  ...glanceCardStyle(needsYou ? "needsYou" : "ready"),
                  borderRadius: 18,
                  padding: "14px 16px",
                  boxShadow: "0 8px 22px rgba(46,36,89,.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 20, color: INK }}>
                        {card.studentFirst}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          ...glanceChipStyle(needsYou ? "needsYou" : "ready"),
                          background: needsYou ? "rgba(255,255,255,.75)" : GLANCE.ready.bg,
                          borderRadius: 999,
                          padding: "3px 10px",
                        }}
                      >
                        {needsYou ? "needs you" : "ready"}
                      </span>
                      {roomName && (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: MUTED,
                            background: "#fff",
                            border: `1px solid ${LINE}`,
                            borderRadius: 999,
                            padding: "3px 10px",
                          }}
                        >
                          {roomName}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: sub.color,
                          textTransform: "uppercase",
                          letterSpacing: 0.3,
                        }}
                      >
                        {sub.name}
                        {card.standard ? ` · ${card.standard}` : ""}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: MUTED, marginBottom: 4 }}>
                      {reasonLabel(card.reason)} · {card.assignment}
                    </div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.4 }}>{card.blurb}</div>
                    {card.nextHint && (
                      <div style={{ fontSize: 13, color: MUTED, marginTop: 6, lineHeight: 1.35 }}>
                        {card.nextHint}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  <button
                    type="button"
                    onClick={() => act(card, "small_group")}
                    style={{
                      border: "none",
                      background: LAVENDER,
                      color: "#fff",
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Pull for small group
                  </button>
                  <button
                    type="button"
                    onClick={() => act(card, "reteach_tomorrow")}
                    style={{
                      border: `1px solid ${LAVENDER}`,
                      background: "#fff",
                      color: LAVENDER,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Reteach tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => addToThisWeek(card)}
                    style={{
                      border: `1px solid ${LINE}`,
                      background: "rgba(255,255,255,.9)",
                      color: INK,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Add to This Week
                  </button>
                  <button
                    type="button"
                    onClick={() => act(card, "dismiss")}
                    style={{
                      border: `1px solid ${GLANCE.ready.border}`,
                      background: GLANCE.ready.bg,
                      color: GLANCE.ready.fg,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Looks good / dismiss
                  </button>
                  <Link
                    href={FAMILY_NOTE_HREF(card.id)}
                    title="Open Family note stub"
                    style={{
                      border: `1px solid ${LINE}`,
                      background: "#fff",
                      color: INK,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Family note
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        {Object.keys(choices).length > 0 && (
          <div style={{ marginTop: 16, fontSize: 12, color: MUTED }}>
            Stub choices saved in this browser
            {Object.keys(choices)
              .slice(0, 5)
              .map((id) => {
                const c = choices[id];
                return ` · ${actionLabel(c.action)}`;
              })
              .join("")}
            . Clear site data to reset.
          </div>
        )}
      </Glass>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: INK,
            color: "#fff",
            borderRadius: 999,
            padding: "10px 18px",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 12px 32px rgba(46,36,89,.35)",
            zIndex: 50,
            maxWidth: "90vw",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>{toast.text}</span>
          {toast.undoId && (
            <button
              type="button"
              onClick={undoAddToWeek}
              style={{
                border: "1px solid rgba(255,255,255,.45)",
                background: "rgba(255,255,255,.12)",
                color: "#fff",
                borderRadius: 999,
                padding: "4px 12px",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}
    </StationShell>
  );
}