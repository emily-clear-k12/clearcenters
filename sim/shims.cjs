// Stand-ins for everything the Assembly Deck client and route import but the
// simulation cannot give them: React itself, the two shared UI components,
// Next's request helpers, Supabase, and the Claude call.
const rt = require("./runtime.cjs");

const state = {
  runtime: null,          // set by the sim so the hooks below reach it
  claudeCalls: [],
  claudeReply: { score: 2, glows: ["You named the property.", "You said what the test cannot do."], grow: "Try naming a second property next time.", rationale: "Meets the rubric." },
  dbWrites: [],
  crystals: 0,
};

// ---- react ----------------------------------------------------------------
const react = {
  createElement: rt.createElement,
  Fragment: rt.FRAGMENT,
  createContext: rt.createContext,
  useState: (v) => state.runtime.useState(v),
  useEffect: (fn, d) => state.runtime.useEffect(fn, d),
  useMemo: (fn, d) => state.runtime.useMemo(fn, d),
  useCallback: (fn, d) => state.runtime.useCallback(fn, d),
  useContext: (c) => state.runtime.useContext(c),
};
react.default = react;

// ---- the two shared components -------------------------------------------
// Rendered as marker nodes so the simulation can assert S.A.M. is on screen
// and read the line he is saying, without pulling in the real art.
function SamGuide(props) {
  return rt.createElement("div", { "data-sam": true, "data-state": props.state || "idle" }, props.line ? `S.A.M.: ${props.line}` : "");
}
function BackToHubButton() {
  return rt.createElement("div", { "data-backtohub": true }, "");
}

// ---- next -----------------------------------------------------------------
const NextResponse = {
  json: (body, init) => ({ _json: body, status: (init && init.status) || 200, ok: !init || !init.status || init.status < 400, json: async () => body }),
};
const cookies = () => ({ get: (k) => (k === "cc_student_id" ? { value: "sim-student" } : undefined) });

// ---- supabase -------------------------------------------------------------
const supabaseAdmin = {
  from() {
    const q = {
      select: () => q, eq: () => q, order: () => q, in: () => q,
      maybeSingle: async () => ({ data: null, error: null }),
      insert: async (row) => { state.dbWrites.push({ op: "insert", row }); return { error: null }; },
      update: async (row) => { state.dbWrites.push({ op: "update", row }); return { error: null }; },
    };
    return q;
  },
  rpc: async (name, args) => {
    if (name === "increment_crystal_points") state.crystals += args.p_amount;
    return { error: null };
  },
  auth: { getUser: async () => ({ data: { user: { id: "sim-teacher" } }, error: null }) },
};

// ---- the Claude call ------------------------------------------------------
async function callClaude({ messages }) {
  state.claudeCalls.push(messages[0].content);
  return JSON.stringify(state.claudeReply);
}
function extractJSON(raw) { return JSON.parse(raw); }

module.exports = { state, react, SamGuide, BackToHubButton, NextResponse, cookies, supabaseAdmin, callClaude, extractJSON };
module.exports.samGuideModule = { __esModule: true, default: SamGuide };
module.exports.backToHubModule = { __esModule: true, default: BackToHubButton };
module.exports.nextServer = { NextResponse };
module.exports.nextHeaders = { cookies };
module.exports.supabaseModule = { supabaseAdmin };
module.exports.anthropicModule = { callClaude, extractJSON };
