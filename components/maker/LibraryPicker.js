"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reusable ClearCenters-only image library picker for Maker Studio.
 * Wave 1 wires Poster / Comic / Diagram (+ Sketch). Wave 2 modes can
 * reuse: open with onSelect(item) where item = { id, url, title, tags }.
 *
 * Kid flow: search → results grid → tap to place.
 */
export default function LibraryPicker({ open, onClose, onSelect, title = "Pick a picture", inline = false, previewItems = null, disabled = false }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const debounce = useRef(null);
  const requestId = useRef(0);

  const load = useCallback(async (query) => {
    const request = ++requestId.current;
    if (previewItems) {
      const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const matches = previewItems.filter(item => terms.every(term => `${item.title} ${(item.tags || []).join(" ")} ${item.url}`.toLowerCase().includes(term)));
      setItems(matches.slice(0, 48)); setTotal(matches.length); setError(null); setLoading(false); return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      params.set("limit", "48");
      const res = await fetch(`/api/maker-studio/library?${params.toString()}`);
      const data = await res.json().catch(() => ({}));
      if (request !== requestId.current) return;
      if (!res.ok) {
        setError((data && data.error) || "Could not load the library.");
        setItems([]);
        setTotal(0);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
      setTotal(typeof data.total === "number" ? data.total : 0);
    } catch (_) {
      if (request !== requestId.current) return;
      setError("Could not load the library. Try again.");
      setItems([]);
    } finally {
      if (request === requestId.current) setLoading(false);
    }
  }, [previewItems]);

  useEffect(() => {
    if (!open) return undefined;
    setQ("");
    load("");
    const t = setTimeout(() => {
      if (!inline && inputRef.current) inputRef.current.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [open, load]);

  useEffect(() => {
    if (!open) return undefined;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => load(q), 220);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [q, open, load]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={inline ? "mk-lib-inline" : "mk-lib-overlay"} role={inline ? "region" : "dialog"} aria-modal={inline ? undefined : true} aria-label={title}>
      <div className="mk-lib-sheet">
        <div className="mk-lib-head">
          <div>
            <p className="mk-kicker">ClearCenters library</p>
            <h2>{title}</h2>
          </div>
          <button type="button" className="mk-ghost" onClick={onClose} disabled={disabled}>
            Close
          </button>
        </div>

        <div className="mk-lib-search">
          <label htmlFor="mk-lib-q" className="mk-sr-only">
            Search pictures
          </label>
          <input
            id="mk-lib-q"
            ref={inputRef}
            className="mk-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search — bear, volcano, plant…"
            autoComplete="off"
          />
          <span className="mk-quiet mk-lib-count">
            {loading ? "Searching…" : `${items.length}${total && !q ? ` of ${total}` : ""} pictures`}
          </span>
        </div>

        {error ? <p className="mk-warn">{error}</p> : null}

        {!loading && !error && items.length === 0 ? (
          <div className="mk-lib-empty">
            <p>
              {q.trim()
                ? `No pictures match “${q.trim()}”. Try another word.`
                : "No pictures in the library yet."}
            </p>
          </div>
        ) : (
          <div className="mk-lib-grid">
            {items.map((item) => (
              <button
                key={item.id || item.url}
                type="button"
                className="mk-lib-card"
                disabled={disabled}
                aria-label={`Use ${item.title}`}
                onClick={() => {
                  if (onSelect) onSelect(item);
                }}
              >
                <span className="mk-lib-thumb">
                  <img src={item.url} alt="" loading="lazy" />
                </span>
                <span className="mk-lib-label">{item.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
