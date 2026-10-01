"use client";

// The Tools button on the Class page — Sept 29, 2026.
// Class tools used to hide in the account menu under the teacher's name.
// They live here now, each with one plain line on what it's for.

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const TOOLS = [
  { href: "/teacher/star-chart", name: "Star Chart", what: "Every word and fact the class has practiced, and what to reteach next." },
  { href: "/teacher/assembly-deck", name: "Sentence Sort", what: "Which kinds of bad sentences get past this class in Assembly Deck." },
  { href: "/teacher/badges", name: "Badges and rewards", what: "Give Crystal Points and see who has earned which badge." },
  { href: "/teacher/passages", name: "Passages", what: "Every reading passage by subject, to open or project on its own." },
  { href: "/teacher/word-lists", name: "Word lists", what: "Make your own vocabulary or spelling list for Frequency Rush." },
  { href: "/teacher/clearkeys", name: "ClearKeys", what: "Typing: turn it on, see who needs help, run a race, add your own texts." },
  { href: "/teacher/cleardecode", name: "ClearDecode", what: "Word-reading practice: placement scan, who needs help, class words." },
];

export default function ClassTools({ classId }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (!box.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  const q = classId ? `?classId=${classId}` : "";
  return (
    <div className="cc-tools" ref={box}>
      <button type="button" className="cc-btn" aria-expanded={open} aria-controls="cc-tools-panel" onClick={() => setOpen(!open)}>Tools</button>
      {open && (
        <div id="cc-tools-panel" className="cc-tools-panel" role="menu">
          {TOOLS.map((t) => (
            <Link key={t.href} role="menuitem" href={`${t.href}${q}`} onClick={() => setOpen(false)}>
              <strong>{t.name}</strong>
              <span>{t.what}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
