"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
  CREAM,
} from "../../../../components/v2/StationShell";
import {
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  loadConfirmedIds,
  subjectMeta,
} from "../../../../lib/v2/demoGrading";
import {
  actionLabel,
  getWhoNeedsMeCards,
  loadWhoNeedsChoices,
  reasonLabel,
  recordWhoNeedsAction,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";

/**
 * CI2.0 Who needs me — reteach / small-group stub.
 * 1–3 calm cards. Actions persist in localStorage; dismissed leave the list.
 */
export default function WhoNeedsMeClient() {
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
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const cards = useMemo(() => {
    void choices;
    void confirmedIds;
    return hydrated ? getWhoNeedsMeCards(choices, confirmedIds) : getWhoNeedsMeCards({}, []);
  }, [choices, confirmedIds, hydrated]);

  const act = useCallback(
    (card, action) => {
      const next = recordWhoNeedsAction(card.id, action);
      setChoices(next);
      const name = card.studentFirst;
      if (action === "small_group") {
        setToast({ text: `${name} · pulled for small group (stub).` });
      } else if (action === "reteach_tomorrow") {
        setToast({ text: `${name} · reteach tomorrow (stub).` });
      } else {
        setToast({ text: `${name} · looks good. Cleared for now.` });
      }
    },
    []
  );

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>
              Who needs me
            </h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              1–3 kids · calm look · not a spreadsheet
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: cards.length ? "#8A6A20" : "#2FA36B",
                  background: cards.length ? CREAM : MINT,
                  borderRadius: 999,
                  padding: "5px 12px",
                  border: `1px solid ${LINE}`,
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
                href={GRADING_INBOX_HREF}
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                Grading →
              </Link>
            </div>
          </div>
        </div>

        <section aria-label="Who needs me cards" style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {cards.length === 0 && (
            <div
              style={{
                background: MINT,
                border: `1px solid ${LINE}`,
                borderRadius: 16,
                padding: "18px 16px",
                color: INK,
                fontSize: 15,
                lineHeight: 1.45,
              }}
            >
              Everyone&apos;s in good shape right now. Nothing waiting.
            </div>
          )}

          {cards.map((card) => {
            const sub = subjectMeta(card.subject);
            const needsYou = card.tone === "needs_you";
            return (
              <article
                key={card.id}
                style={{
                  background: needsYou ? CREAM : SOFT_LAV,
                  border: `1px solid ${needsYou ? LINE : "#D9CFFF"}`,
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
                          color: needsYou ? "#8A6A20" : "#2FA36B",
                          background: needsYou ? "#fff" : MINT,
                          border: `1px solid ${LINE}`,
                          borderRadius: 999,
                          padding: "3px 10px",
                        }}
                      >
                        {needsYou ? "needs you" : "ready"}
                      </span>
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
                    onClick={() => act(card, "dismiss")}
                    style={{
                      border: `1px solid ${LINE}`,
                      background: "#fff",
                      color: MUTED,
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
          }}
        >
          {toast.text}
        </div>
      )}
    </StationShell>
  );
}
