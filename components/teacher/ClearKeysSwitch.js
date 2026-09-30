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

  return (
    <div className={compact ? "cc-panel" : ""} style={compact ? { marginBottom: 14 } : { marginTop: 16 }} aria-live="polite">
      <div className="cc-row cc-between">
        <div style={{ minWidth: 0, flex: "1 1 280px" }}>
          <strong style={{ font: "600 16px Poppins, sans-serif" }}>{allOn ? `ClearKeys is on${className ? ` for ${className}` : ""}` : `Turn on ClearKeys${className ? ` for ${className}` : ""}`}</strong>
          <p className="cc-muted" style={{ margin: "4px 0 0" }}>
            {allOn
              ? "Every student has the Foundations Track, the Daily Transmission and the Class Relay Race. Add readings any time."
              : "One click gives every student the Foundations Track, a new Daily Transmission each school day, and the Class Relay Race. Nothing gets a due date."}
          </p>
        </div>
        {status && !allOn && (
          <div className="cc-row">
            {needGrade && (
              <label className="cc-field" style={{ margin: 0 }}>
                Grade
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                  {["3", "4", "5"].map((g) => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </label>
            )}
            <button type="button" className="cc-btn" onClick={turnOn} disabled={busy}>{busy ? "Turning on…" : "Turn on ClearKeys"}</button>
          </div>
        )}
      </div>
      {pieces.length > 0 && (
        <div className="cc-row" style={{ gap: 6, marginTop: 10 }}>
          {pieces.map((p) => <span key={p.key} className={`cc-badge${p.on ? " teal" : " neutral"}`}>{p.on ? "On" : "Off"} · {p.name}</span>)}
        </div>
      )}
      {needGrade && <p className="cc-muted" style={{ margin: "10px 0 0" }}>This class has no grade set. Pick one so students get the right goals.</p>}
      {error && <p className="cc-error" role="alert" style={{ margin: "10px 0 0" }}>{error}</p>}
    </div>
  );
}
