import Link from "next/link";

const AREAS = [
  {
    href: "/v2/teacher/day?d=2",
    title: "Teacher · Daily Focus",
    note: "Teach today · SAM glance · Now → Next → Later · period rooms",
    primary: true,
  },
  {
    href: "/v2/teacher",
    title: "Teacher · This Week",
    note: "Plan & publish · 5-day calendar · hands-off dial · drag tiles",
  },
  {
    href: "/v2/student",
    title: "Student · My Day",
    note: "Leo's day · Now / Next / Later · must-do before may-do · SAM",
    student: true,
  },
];

export default function CI2Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#F7F5FF", padding: "40px 16px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#2E2459", marginBottom: 4 }}>Crystal Instruction 2.0</h1>
        <p style={{ color: "#5C5480", marginTop: 0 }}>Sandbox preview. Pages appear here as they are built.</p>
        <p style={{ color: "#5C5480", marginTop: 8, fontSize: 14, background: "#fff", border: "1px solid #E3DEFA", borderRadius: 12, padding: "10px 14px" }}>
          Start on <strong>Daily Focus</strong> (teach today). Switch Setup to Math · 3 periods, pick a room card, then jump to This Week — your period stays synced.
          Kids land on <strong>Student · My Day</strong> — same Wednesday demo loop.
        </p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: 24 }}>
          {AREAS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={{
                display: "block",
                padding: 20,
                borderRadius: 16,
                background: a.primary ? "#F3EEFF" : a.student ? "#FFF8EE" : "#fff",
                border: a.primary ? "2px solid #8B6CFF" : a.student ? "2px solid #E8C96A" : "1px solid #E3DEFA",
                textDecoration: "none",
                color: "#2E2459",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 18 }}>{a.title}</div>
              <div style={{ color: "#5C5480", marginTop: 6 }}>{a.note}</div>
              {a.primary && (
                <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "#8B6CFF" }}>Primary teacher home →</div>
              )}
              {a.student && (
                <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "#B8860B" }}>Student home →</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
