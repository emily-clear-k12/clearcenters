"use client";
export default function PrintButton() {
  return <button type="button" className="cc-btn" onClick={() => window.print()}>Print this kit</button>;
}
