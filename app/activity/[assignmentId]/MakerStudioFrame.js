"use client";
import { ArrowLeft, Check, Circle, FileText, Image, Pencil, Mic, LayoutGrid, MessageSquare, MapPin, Shapes, Sparkles, Mail, GitCompare, Network, Calculator, HelpCircle } from "lucide-react";
import ReadAloudButton from "../../../components/ReadAloudButton";

const icons = { write: FileText, sketch: Pencil, diagram: Network, poster: Image, comic: LayoutGrid, voice: Mic, before_after: GitCompare, map_it: MapPin, math_story: Calculator, interview: MessageSquare, sort_of_my_own: Shapes, teach_the_buddy: MessageSquare, paint_what_i_said: Sparkles, what_if: HelpCircle, postcard: Mail };
export function MakerModeIcon({ id, size = 24 }) { const Icon = icons[id] || FileText; return <Icon size={size} aria-hidden="true" />; }
export default function MakerStudioFrame({ children, title, prompt, modes, savedModes, activeMode, doneCount, busy, onMode, onHome, onLeave, library, hasPictures, tool, onTool, status, previewMode }) {
  return <div className="mk-page mk-lab" data-mode={activeMode || "home"}>
    <div className="mk-lab-shell">
      <header className="mk-lab-header">
        <div className="mk-lab-brand"><img src="/teacher/brand_crystal_mark.png" alt="" /><span>ClearCenters</span><span className="mk-brand-rule" /><h1>Maker Studio</h1></div>
        <a href="/missions" onClick={onLeave} aria-disabled={busy || undefined}><LayoutGrid size={18} /> My Missions</a>
      </header>
      <div className={"mk-lab-layout" + (activeMode ? " is-editing" : "")}>
        {activeMode ? <aside className="mk-lab-tools" aria-label="Studio tools">
          <nav className="mk-tool-rail" aria-label="Workspace tools">
            <button onClick={onHome} disabled={busy}><ArrowLeft size={24} /><span>All pieces</span></button>
            {hasPictures ? <button aria-pressed={tool === "pictures"} onClick={() => onTool("pictures")} disabled={busy}><Image size={25} /><span>Pictures</span></button> : null}
            <button aria-pressed={tool === "tools"} onClick={() => onTool("tools")} disabled={busy}><Pencil size={25} /><span>Tools</span></button>
            {activeMode !== "voice" && activeMode !== "sketch" ? <button onClick={() => onTool("text")} disabled={busy}><FileText size={25} /><span>Text</span></button> : null}
          </nav>
          {hasPictures && tool === "pictures" ? library : <div className="mk-tool-help"><span className="mk-kicker">Your workspace</span><p>Use the tools in your piece to make it your own.</p>{hasPictures ? <button className="mk-ghost" onClick={() => onTool("pictures")}>Browse pictures</button> : null}</div>}
        </aside> : null}
        <main className="mk-lab-workspace">{children}</main>
        <aside className="mk-lab-mission" aria-label="Mission and assigned pieces">
          <section className="mk-mission-card"><div className="mk-mission-label">Your mission</div><h2>{title}</h2><p>{prompt}</p><ReadAloudButton text={`${title}. ${prompt}`} /></section>
          <section className="mk-mission-card"><h3>Your assigned pieces</h3><nav className="mk-piece-list" aria-label="Assigned pieces">{modes.map(m => <button key={m.id} disabled={busy} aria-current={activeMode === m.id ? "page" : undefined} onClick={() => onMode(m.id)}><MakerModeIcon id={m.id} size={22} /><span>{m.label}</span>{savedModes[m.id]?.status === "done" ? <Check className="mk-piece-check" size={21} aria-label="Done" /> : <Circle size={17} aria-hidden="true" />}</button>)}</nav><p className="mk-piece-count">{doneCount} of {modes.length} pieces done</p><progress value={doneCount} max={modes.length || 1} aria-label="Completed pieces" /></section>
          {previewMode ? <p className="mk-preview-note">Design preview · no student data saved</p> : null}
        </aside>
      </div>
      {status ? <div className="mk-lab-status" role="status">{status}</div> : null}
    </div>
  </div>;
}
