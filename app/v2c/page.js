import Link from "next/link";

// Version C home — the "outside the box" design lab. Same features and data
// as Version B (/v2); only the look and feel are different.
const AREAS = [
  { href: "/v2c/teacher", title: "Teacher · This Week", note: "Bold concept of the planner" },
  { href: "/v2c/student", title: "Student · My Day", note: "Coming soon" },
];

export default function ConceptHome() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 16px",
        fontFamily: "'Inter', sans-serif",
        background: "radial-gradient(circle at 20% 20%, #FFE3F3 0, transparent 40%), radial-gradient(circle at 80% 30%, #DDF4FF 0, transparent 45%), linear-gradient(160deg, #F6F0FF, #FFF9EE)",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: "#8C52F2", textTransform: "uppercase" }}>Version C · Concept lab</div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(32px, 6vw, 56px)", margin: "6px 0", color: "#2A2350", lineHeight: 1.05 }}>
          Crystal Instruction 2.0, reimagined
        </h1>
        <p style={{ color: "#5E577F", fontSize: 17, maxWidth: 600 }}>
          Same features and data as Version B. This is where the design gets to be bold and experimental.
        </p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 28 }}>
          {AREAS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={{ display: "block", padding: 24, borderRadius: 24, background: "#fff", boxShadow: "0 12px 40px rgba(140,82,242,.18)", textDecoration: "none", color: "#2A2350" }}
            >
              <div style={{ fontWeight: 800, fontSize: 20 }}>{a.title}</div>
              <div style={{ color: "#5E577F", marginTop: 6 }}>{a.note}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
