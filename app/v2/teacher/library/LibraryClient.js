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
  GLANCE,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../../components/v2/StationShell";
import {
  DEMO_LIBRARY_CARDS,
  addLibraryCardToPlanner,
  libraryStandardChip,
  removeAddedActivity,
  LIBRARY_HREF,
  loadLibraryFavorites,
  toggleLibraryFavorite,
} from "../../../../lib/v2/demoLibrary";

const FLAVORS = ["Briefing", "Challenge", "Practice", "Project"];

/**
 * CI2.0 Library browse stub — glance-first glass cards.
 * Chip filters by type + simple title search. TEKS chip → Standard info when stub matches.
 * Add → ci2.teacher.addedActivities.
 */
export default function LibraryClient() {
  const [toast, setToast] = useState(null);
  const [flavor, setFlavor] = useState("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favHydrated, setFavHydrated] = useState(false);

  useEffect(() => {
    setFavorites(loadLibraryFavorites());
    setFavHydrated(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const ms = toast.undoId ? 5600 : 3200;
    const t = setTimeout(() => setToast(null), ms);
    return () => clearTimeout(t);
  }, [toast]);

  const favSet = useMemo(() => new Set(favorites), [favorites]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_LIBRARY_CARDS.filter((card) => {
      if (flavor === "favorites") {
        if (!favSet.has(card.id)) return false;
      } else if (flavor !== "all" && card.flavor !== flavor) {
        return false;
      }
      if (q && !String(card.title || "").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [flavor, query, favSet]);

  const toggleHeart = useCallback((card) => {
    if (!card?.id) return;
    const next = toggleLibraryFavorite(card.id);
    setFavorites(next);
    const on = next.includes(card.id);
    setToast({
      text: on ? `Saved “${card.title}” to Favorites.` : `Removed “${card.title}” from Favorites.`,
    });
  }, []);

  const add = useCallback((card, target) => {
    const entry = addLibraryCardToPlanner(card, target);
    if (!entry) return;
    if (target === "daily_focus") {
      setToast({
        text: `Added “${card.title}” to Daily Focus (today).`,
        undoId: entry.id,
      });
    } else {
      setToast({
        text: `Added “${card.title}” to This Week planner.`,
        undoId: entry.id,
      });
    }
  }, []);

  const undoAdd = useCallback(() => {
    if (!toast?.undoId) return;
    const ok = removeAddedActivity(toast.undoId);
    setToast({ text: ok ? "Undone — removed from planner." : "Nothing to undo." });
  }, [toast]);

  return (
    <StationShell active="library">
      <TeacherSubnav active="library" />
      <Glass style={{ padding: "22px 22px 20px" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: GLANCE.ready.fg,
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
              background: GLANCE.ready.fg,
              opacity: 0.85,
            }}
          />
          Grow · Library
        </div>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            margin: "10px 0 0",
            fontSize: 30,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.2,
          }}
        >
          Library
        </h1>
        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 17,
            fontWeight: 600,
            color: INK,
            lineHeight: 1.35,
          }}
        >
          Glance-first picks — add to Daily Focus or This Week without leaving the glass.
        </p>

        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span
            style={{
              ...glanceChipStyle("ready"),
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {filtered.length} of {DEMO_LIBRARY_CARDS.length}
          </span>
          <Link
            href="/v2/teacher/day?d=2"
            style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none", padding: "5px 4px" }}
          >
            ← Daily Focus
          </Link>
          <Link
            href="/v2/teacher"
            style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none", padding: "5px 4px" }}
          >
            This Week →
          </Link>
        </div>

        {/* Type chips + title filter — stub only, not a catalog search */}
        <div
          role="search"
          aria-label="Filter library"
          style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              type="button"
              onClick={() => setFlavor("all")}
              aria-pressed={flavor === "all"}
              style={chipBtn(flavor === "all")}
            >
              All
            </button>
            {FLAVORS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlavor(f)}
                aria-pressed={flavor === f}
                style={chipBtn(flavor === f)}
              >
                {f}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFlavor("favorites")}
              aria-pressed={flavor === "favorites"}
              style={chipBtn(flavor === "favorites")}
              title="Show hearted Library cards (this device)"
            >
              ♥ Favorites{favHydrated && favorites.length ? ` · ${favorites.length}` : ""}
            </button>
          </div>
          <label style={{ display: "block", maxWidth: 360 }}>
            <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Filter by title
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by title…"
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: `1px solid ${LINE}`,
                borderRadius: 999,
                padding: "10px 16px",
                fontSize: 14,
                fontWeight: 600,
                color: INK,
                background: "rgba(255,255,255,.9)",
                fontFamily: "inherit",
                outline: "none",
              }}
            />
          </label>
        </div>

        <section
          aria-label="Library cards"
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {filtered.length === 0 && (
            <div
              role="status"
              style={{
                ...glanceCardStyle("ready"),
                borderRadius: 20,
                padding: "28px 22px",
                gridColumn: "1 / -1",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 8px 22px rgba(46,36,89,.06)",
              }}
            >
              <div style={{ fontWeight: 800, color: INK, fontSize: 17, lineHeight: 1.3 }}>
                Nothing matches that filter
              </div>
              <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.45, maxWidth: 380 }}>
                The library is still here — clear the search or show All to browse again.
              </div>
              <button
                type="button"
                onClick={() => {
                  setFlavor("all");
                  setQuery("");
                }}
                style={btnPrimary}
              >
                Browse Library
              </button>
            </div>
          )}
          {filtered.map((card) => {
            const tone = card.glance === "needsYou" ? "needsYou" : "ready";
            return (
              <article
                key={card.id}
                style={{
                  ...glanceCardStyle(tone),
                  borderRadius: 18,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  boxShadow: "0 8px 22px rgba(46,36,89,.08)",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                  <span
                    style={{
                      ...glanceChipStyle(tone),
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {card.flavor}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleHeart(card)}
                    aria-pressed={favSet.has(card.id)}
                    aria-label={favSet.has(card.id) ? "Remove from Favorites" : "Add to Favorites"}
                    title={favSet.has(card.id) ? "Remove from Favorites" : "Save to Favorites"}
                    style={{
                      marginLeft: "auto",
                      border: favSet.has(card.id) ? "1px solid rgba(139,108,255,.45)" : `1px solid ${LINE}`,
                      background: favSet.has(card.id) ? "rgba(139,108,255,.14)" : "rgba(255,255,255,.9)",
                      color: favSet.has(card.id) ? LAVENDER : MUTED,
                      borderRadius: 999,
                      width: 34,
                      height: 34,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 800,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      lineHeight: 1,
                    }}
                  >
                    {favSet.has(card.id) ? "♥" : "♡"}
                  </button>
                  <span style={{ fontSize: 11, fontWeight: 700, color: MUTED }}>
                    {card.product} · {card.minutes} min
                  </span>
                  {(() => {
                    const std = libraryStandardChip(card);
                    if (!std) return null;
                    const chipStyle = {
                      ...glanceChipStyle("ready"),
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontSize: 11,
                      fontWeight: 800,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    };
                    if (std.href) {
                      return (
                        <Link href={std.href} style={chipStyle} title="Open Standard info stub">
                          {std.label}
                        </Link>
                      );
                    }
                    return (
                      <span style={chipStyle} title="Standard chip (no stub yet)">
                        {std.label}
                      </span>
                    );
                  })()}
                </div>
                <div style={{ fontWeight: 800, color: INK, fontSize: 17, lineHeight: 1.25 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.4, flex: 1 }}>
                  {card.blurb}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={() => add(card, "daily_focus")}
                    style={btnPrimary}
                  >
                    Add to Daily Focus
                  </button>
                  <button
                    type="button"
                    onClick={() => add(card, "this_week")}
                    style={btnGhost}
                  >
                    Add to This Week
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <p style={{ marginTop: 16, fontSize: 12, color: MUTED }}>
          Stub only · same-browser localStorage · path {LIBRARY_HREF}
        </p>
      </Glass>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 22,
            transform: "translateX(-50%)",
            background: LAVENDER,
            color: "#fff",
            borderRadius: 999,
            padding: "12px 18px",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 10px 28px rgba(46,36,89,.28)",
            zIndex: 40,
            maxWidth: "calc(100% - 28px)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <span>{toast.text}</span>
          {toast.undoId && (
            <button
              type="button"
              onClick={undoAdd}
              style={{
                border: "1px solid rgba(255,255,255,.45)",
                background: "rgba(255,255,255,.16)",
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

function chipBtn(active) {
  return {
    border: active ? "none" : `1px solid ${LINE}`,
    background: active ? LAVENDER : "rgba(255,255,255,.9)",
    color: active ? "#fff" : LAVENDER,
    borderRadius: 999,
    padding: "6px 14px",
    fontWeight: 800,
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: active ? "0 4px 14px rgba(139,108,255,.28)" : "none",
  };
}

const btnPrimary = {
  border: "none",
  background: LAVENDER,
  color: "#fff",
  borderRadius: 999,
  padding: "8px 14px",
  fontWeight: 800,
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: "0 6px 18px rgba(139,108,255,.28)",
};

const btnGhost = {
  border: `1px solid ${LINE}`,
  background: "rgba(255,255,255,.85)",
  color: LAVENDER,
  borderRadius: 999,
  padding: "8px 14px",
  fontWeight: 800,
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "inherit",
};