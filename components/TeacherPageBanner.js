"use client";

import React from "react";

// Shared decorative header strip for teacher pages. The art (a desk with
// charts, a crystal trophy, and an achievement bar) is a 2508x627 (exactly
// 4:1) image with all the artwork on its right ~35% and blank space on the
// left for a page's own title/controls to sit on. The "paddingTop: 25%"
// trick locks this container to that same 4:1 ratio at any width, so the
// image is always shown at its full, uncropped aspect — no matter how the
// container resizes, unlike a plain "background-size: cover" which would
// crop the crystal/trophy art off the edge on some screen widths (the same
// issue fixed on the student sign-in page's background earlier).
//
// Each page keeps its own header content (title, class pickers, buttons,
// whatever it already had) and passes it in as children — this component
// only supplies the image behind it, so no page's existing header logic
// had to change, just what it's sitting on.
export default function TeacherPageBanner({ children, style }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 24,
        boxShadow: "0 4px 16px rgba(0,0,0,.08)",
        ...style,
      }}
    >
      <div style={{ paddingTop: "25%" }} />
      <img
        src="/teacher/banner.jpg"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(16px, 3vw, 36px)" }}>
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </div>
  );
}
