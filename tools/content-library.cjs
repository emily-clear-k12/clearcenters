/**
 * Living content library. Scans lib/cases and the add_*.sql case rows.
 * Regenerate after adding banks: node tools/content-library.cjs
 * A bank is not done until it is in this catalog and has a cases row.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const casesDir = path.join(root, "lib", "cases");
const outDir = path.join(root, "content-library");

const ENGINE_BY_FOLDER = {
  "signal-check": "Signal Check",
  "signal-defense": "Crew",
  "frequency-rush": "Frequency Rush",
  "assembly-deck": "Assembly Deck",
  "classification-lab": "Classification Lab",
  "exhibit-hall": "Exhibit Hall",
  "mission-map": "Mission Map",
  "simulation-lab": "Simulation Lab",
  "relay-station": "ClearKeys",
  "expedition-station": "Expedition Station",
  "maker-studio": "Maker Studio",
  "broadcast-booth": "Broadcast Booth",
  "newsroom-bn": "Newsroom",
};

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "_archive" || name === "node_modules") continue;
    const abs = path.join(dir, name);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) walk(abs, acc);
    else if (/\.(js|json)$/.test(name) && !/^index\.(public|server)\.js$/.test(name) && name !== "index.js") acc.push(abs);
  }
  return acc;
}

function field(window, keys) {
  for (const key of keys) {
    const quoted = window.match(new RegExp(`(?:${key}|"${key}")\\s*[:=]\\s*"([^"]*)"`));
    if (quoted) return quoted[1];
    const single = window.match(new RegExp(`(?:${key}|"${key}")\\s*[:=]\\s*'([^']*)'`));
    if (single) return single[1];
    const num = window.match(new RegExp(`(?:${key}|"${key}")\\s*[:=]\\s*(\\d)\\b`));
    if (num) return num[1];
  }
  return "";
}

function engineFor(file) {
  const rel = path.relative(casesDir, file).split(path.sep);
  if (rel.length === 1) return { engine: "Group Chat", kind: "", folder: "" };
  const folder = rel[0];
  const kind = rel.includes("skills") ? "Vocab" : rel.includes("classify") ? "Topic questions" : "";
  return { engine: ENGINE_BY_FOLDER[folder] || folder, kind, folder };
}

function isCaseId(value, fromId) {
  if (!/\d/.test(value) || value.length > 80 || value.includes("_")) return false;
  if (!fromId) return true;
  if (/-\d+$/.test(value)) return false;
  return /-(CL|EX|AD|SC|SD|GC|FR|MM|SL|XP|MS|WI|TH)$/i.test(value) || /\.FR\./.test(value) || /^(ELA|ELAR|MA|SS|SCI|FR)\./.test(value);
}

function recordsFromFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const { engine, kind } = engineFor(file);
  const found = [];
  const re = /(?:\bstandard\b|"standard"|\bid\b)\s*[:=]\s*["']([^"']+)["']/g;
  let match;
  while ((match = re.exec(text))) {
    const standard = match[1];
    const fromId = /^\s*id\b/i.test(match[0]) || match[0].trim().startsWith("id");
    if (!isCaseId(standard, fromId)) continue;
    const window = text.slice(Math.max(0, match.index - 80), match.index + 500);
    const title = field(window, ["title"]);
    const grade = String(field(window, ["grade"])).replace(/\D/g, "").slice(0, 1);
    const subject = field(window, ["subject"]);
    if (match[0].trim().startsWith("id") && !standard.includes("-") && !title) continue;
    found.push({
      standard,
      title: title.replace(/^(Frequency Rush|Signal Defense):\s*/i, ""),
      grade,
      subject,
      engine,
      kind,
      file: path.relative(root, file),
    });
  }
  const byStandard = new Map();
  for (const row of found) {
    const prev = byStandard.get(row.standard);
    if (!prev || (!prev.title && row.title)) byStandard.set(row.standard, row);
  }
  const rows = [...byStandard.values()];
  return rows.filter((row) => !rows.some((other) => other.standard !== row.standard && other.standard.startsWith(row.standard + ".")));
}

function sqlRows() {
  const rows = new Map();
  const files = fs.readdirSync(root).filter((name) => name.endsWith(".sql"));
  const tuple = /\(\s*'([^']+)'\s*,\s*'((?:''|[^'])*)'/g;
  for (const name of files) {
    const text = fs.readFileSync(path.join(root, name), "utf8");
    if (!/insert\s+into\s+cases/i.test(text)) continue;
    let match;
    while ((match = tuple.exec(text))) {
      if (!/\d/.test(match[1])) continue;
      rows.set(match[1], {
        standard: match[1],
        title: match[2].replace(/''/g, "'"),
        file: name,
      });
    }
  }
  return rows;
}

const code = new Map();
for (const file of walk(casesDir)) {
  for (const row of recordsFromFile(file)) {
    const prev = code.get(row.standard);
    if (!prev || (prev.file.endsWith(".server.js") && !row.file.endsWith(".server.js"))) code.set(row.standard, row);
  }
}
const sql = sqlRows();
const missingSql = [...code.values()].filter((row) => !sql.has(row.standard));
const missingCode = [...sql.values()].filter((row) => !code.has(row.standard));

function tally(rows, keyFn) {
  const counts = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

const lines = [];
lines.push("# Content library");
lines.push("");
lines.push("Generated by `node tools/content-library.cjs`. Do not edit by hand.");
lines.push("A bank is not done until it is listed here and has a row in `cases`.");
lines.push("");
lines.push(`On disk: **${code.size}**. In SQL files: **${sql.size}**. On disk but not in SQL: **${missingSql.length}**. In SQL but not on disk: **${missingCode.length}**.`);
lines.push("");
lines.push("## By activity");
lines.push("");
lines.push("| Activity | Grade | Subject | Kind | Count |");
lines.push("|---|---|---|---|---|");
for (const [key, count] of tally([...code.values()], (row) => [row.engine, row.grade || "?", row.subject || "?", row.kind || ""].join(" | "))) {
  lines.push(`| ${key} | ${count} |`);
}
lines.push("");
lines.push("## On disk, not in a SQL file");
lines.push("");
if (!missingSql.length) lines.push("None.");
for (const row of missingSql.sort((a, b) => a.engine.localeCompare(b.engine) || a.standard.localeCompare(b.standard))) {
  lines.push(`- ${row.engine}${row.kind ? ` · ${row.kind}` : ""} · Grade ${row.grade || "?"} ${row.subject || ""} · \`${row.standard}\` · ${row.title || "(no title)"}`);
}
lines.push("");
lines.push("## In SQL, no matching file");
lines.push("");
if (!missingCode.length) lines.push("None.");
for (const row of missingCode.sort((a, b) => a.standard.localeCompare(b.standard))) {
  lines.push(`- \`${row.standard}\` · ${row.title} · ${row.file}`);
}
lines.push("");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "CONTENT_LIBRARY.md"), lines.join("\n"));
fs.writeFileSync(path.join(outDir, "catalog.json"), JSON.stringify({
  generatedFrom: "lib/cases and add_*.sql",
  onDisk: code.size,
  inSql: sql.size,
  items: [...code.values()].sort((a, b) => a.engine.localeCompare(b.engine) || String(a.grade).localeCompare(String(b.grade)) || a.standard.localeCompare(b.standard)),
}, null, 2));

const ENGINE_KEY = {
  "Signal Check": "fact_check_desk",
  "Group Chat": "group_chat",
  "Frequency Rush": "frequency_rush",
  "Mission Map": "mission_map",
  "Simulation Lab": "simulation_lab",
  "Expedition Station": "expedition_station",
  "Crew": "signal_defense",
  "Assembly Deck": "assembly_deck",
  "Classification Lab": "classification_lab",
  "Exhibit Hall": "exhibit_hall",
};

function inferGrade(row) {
  if (row.grade) return row.grade;
  const match = String(row.standard).match(/(?:^|[^0-9])([345])(?:\.|-)/);
  return match ? match[1] : "";
}

function inferSubject(row) {
  if (row.subject) return row.subject;
  const standard = String(row.standard);
  if (/^(ELA|ELAR)\./i.test(standard)) return "ELAR";
  if (/^(MA|MATH)\./i.test(standard)) return "Math";
  if (/^SS\./i.test(standard)) return "Social Studies";
  return "Science";
}

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

const inserts = missingSql
  .map((row) => ({ ...row, grade: inferGrade(row), subject: inferSubject(row), engineKey: ENGINE_KEY[row.engine] }))
  .filter((row) => row.engineKey && row.grade && row.subject && row.title)
  .sort((a, b) => a.engine.localeCompare(b.engine) || a.standard.localeCompare(b.standard));

const sqlLines = [];
sqlLines.push("-- Banks that are on disk but had no cases row.");
sqlLines.push("-- Safe to run more than once. Does not change a row that already exists.");
sqlLines.push("INSERT INTO cases (standard, title, engine, grade, subject, unit) VALUES");
sqlLines.push(inserts.map((row) => {
  const unit = row.engine === "Frequency Rush" && row.standard.includes(".")
    ? row.standard.split(".").slice(0, -1).join(".")
    : "";
  const title = row.engine === "Frequency Rush" && !/^Frequency Rush:/i.test(row.title) ? `Frequency Rush: ${row.title}` : row.title;
  return `  (${sqlString(row.standard)}, ${sqlString(title)}, ${sqlString(row.engineKey)}, ${row.grade}, ${sqlString(row.subject)}, ${unit ? sqlString(unit) : "NULL"})`;
}).join(",\n"));
sqlLines.push("ON CONFLICT (standard) DO NOTHING;");
sqlLines.push("");
fs.writeFileSync(path.join(root, "add_content_library_cases.sql"), sqlLines.join("\n"));
console.log(`Wrote ${code.size} banks. Missing SQL: ${missingSql.length}. Insert rows: ${inserts.length}. SQL without a file: ${missingCode.length}.`);
