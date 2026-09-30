"use client";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// "Turn on ClearKeys for this class" (Sept 29, 2026). One press gives the
// class the Foundations Track, the Daily Transmission and the Class Relay
// Race together. Used on the ClearKeys home and on Assign → ClearKeys.
async function callApi(payload) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch("/api/teacher/clearkeys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, accessToken: session?.access_token }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const err = new Error(data.error || "Something went wrong."); err.needGrade = !!data.needGrade; throw err; }
  return data;
}

export default function ClearKeysSwitch({ classId, className, onChange, compact = false }) {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [needGrade, setNeedGrade] = useState(false);
  const [grade, setGrade] = useState("3");

  const load = useCallback(async () => {
    if (!classId) return;
    setError(null);
    try { setStatus(await callApi({ action: "status", classId })); } catch (err) { setError(err.message); }
  }, [classId]);
  useEffect(() => { setStatus(null); setNeedGrade(false); load(); }, [load]);

  async function turnOn() {
    setBusy(true);
    setError(null);
    try {
      await callApi({ action: "turnOn", classId, grade: needGrade ? grade : undefined });
      setNeedGrade(false);
      await load();
      if (onChange) onChange();
    } catch (err) {
      if (err.needGrade) setNeedGrade(true);
      else setError(err.message);
    }
    setBusy(false);
  }

  if (!classId) return null;
  const pieces = status?.pieces || [];
  const allOn = pieces.length > 0 && pieces.every((p) => p.on);
  const box = { background: "#fff", border: "1px solid #e7e2f2", borderRadius: 18, padding: compact ? 14 : 20, margin: compact ? "0 0 14px" : "0 0 18px" };

  return (
    <section style={box} aria-live="polite">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: compact ? 17 : 20 }}>{allOn ? `ClearKeys is on${className ? ` for ${className}` : ""}` : `Turn on ClearKeys${className ? ` for ${className}` : " for this class"}`}</h2>
          <p style={{ margin: "4px 0 0", color: "#70658d", fontSize: 14 }}>
            {allOn
              ? "Every student has the Foundations Track, the Daily Transmission and the Class Relay Race. Add readings any time."
              : "One press gives every student the Foundations Track, a new Daily Transmission each school day, and the Class Relay Race. Nothing has a due date."}
          </p>
        </div>
        {status && !allOn && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {needGrade && (
              <label style={{ fontSize: 14, fontWeight: 600 }}>
                Grade{" "}
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                  {["3", "4", "5"].map((g) => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </label>
            )}
            <button type="button" className="cc-btn" onClick={turnOn} disabled={busy} style={{ background: "#7541cf", color: "#fff", border: 0 }}>
              {busy ? "Turning on…" : "Turn on ClearKeys"}
            </button>
          </div>
        )}
      </div>
      {pieces.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {pieces.map((p) => (
            <li key={p.key} style={{ fontSize: 13, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: p.on ? "#e3f7ec" : "#f3f0f8", color: p.on ? "#087c43" : "#70658d" }}>
              {p.on ? "On" : "Off"} · {p.name}
            </li>
          ))}
        </ul>
      )}
      {needGrade && <p style={{ margin: "10px 0 0", fontSize: 14 }}>This class has no grade set. Pick one so students get the right goals.</p>}
      {error && <p role="alert" style={{ margin: "10px 0 0", color: "#c4233a", fontSize: 14 }}>{error}</p>}
    </section>
  );
}
