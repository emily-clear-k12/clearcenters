import Link from "next/link";

// Placeholder — the Version C student My Day concept comes later.
export default function Page() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 16px", fontFamily: "'Inter', sans-serif", background: "linear-gradient(160deg, #F6F0FF, #FFF9EE)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", color: "#2A2350" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Student · My Day (Version C)</h1>
        <p style={{ color: "#5E577F" }}>Coming soon in the concept lab.</p>
        <Link href="/v2c" style={{ color: "#8C52F2" }}>Back to Version C home</Link>
      </div>
    </main>
  );
}
