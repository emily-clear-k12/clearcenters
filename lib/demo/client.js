import { DEMO_TEACHER_ID, createBarronsData } from "./barrons";

let store = null;

function data() {
  if (!store) store = createBarronsData();
  return store;
}

export function resetBarronsDemo() {
  store = createBarronsData();
}

const teacherUser = {
  id: DEMO_TEACHER_ID,
  email: "mrs.barrons@clearcenters.demo",
  user_metadata: { name: "Mrs. Barrons" },
};

function rowsFor(table) {
  const bag = data();
  if (!bag[table]) bag[table] = [];
  return bag[table];
}

class Query {
  constructor(table) {
    this.table = table;
    this.filters = [];
    this.orders = [];
    this.limitN = null;
    this.action = "select";
    this.payload = null;
    this.mode = "many";
  }

  select(columns, options) {
    this.spec = typeof columns === "string" ? columns : "";
    this.head = Boolean(options && options.head);
    this.wantCount = Boolean(options && options.count);
    return this;
  }
  insert(payload) { this.action = "insert"; this.payload = payload; return this; }
  update(payload) { this.action = "update"; this.payload = payload; return this; }
  delete() { this.action = "delete"; return this; }
  eq(column, value) { this.filters.push((row) => row[column] === value); return this; }
  neq(column, value) { this.filters.push((row) => row[column] !== value); return this; }
  in(column, values) {
    const allowed = new Set(values || []);
    this.filters.push((row) => allowed.has(row[column]));
    return this;
  }
  is(column, value) { this.filters.push((row) => row[column] === value); return this; }
  not(column, op, value) {
    if (op === "is") this.filters.push((row) => (value === null ? row[column] != null : row[column] === value));
    return this;
  }
  gte() { return this; }
  lte() { return this; }
  gt() { return this; }
  lt() { return this; }
  or() { return this; }
  order(column, options) { this.orders.push({ column, asc: !options || options.ascending !== false }); return this; }
  limit(count) { this.limitN = count; return this; }
  maybeSingle() { this.mode = "maybe"; return this; }
  single() { this.mode = "one"; return this; }

  matching() {
    let rows = rowsFor(this.table).filter((row) => this.filters.every((test) => test(row)));
    this.orders.forEach(({ column, asc }) => {
      rows = rows.slice().sort((a, b) => {
        const left = a[column] ?? "";
        const right = b[column] ?? "";
        if (left < right) return asc ? -1 : 1;
        if (left > right) return asc ? 1 : -1;
        return 0;
      });
    });
    if (this.limitN != null) rows = rows.slice(0, this.limitN);
    return rows;
  }

  run() {
    if (this.action === "insert") {
      const incoming = Array.isArray(this.payload) ? this.payload : [this.payload];
      const saved = incoming.map((row, index) => ({ id: row.id || `demo-${this.table}-${Date.now()}-${index}`, ...row }));
      rowsFor(this.table).push(...saved);
      return this.finish(saved);
    }
    if (this.action === "update") {
      const saved = [];
      rowsFor(this.table).forEach((row) => {
        if (!this.filters.every((test) => test(row))) return;
        Object.assign(row, this.payload);
        saved.push(row);
      });
      return this.finish(saved);
    }
    if (this.action === "delete") {
      const bag = rowsFor(this.table);
      const keep = bag.filter((row) => !this.filters.every((test) => test(row)));
      bag.splice(0, bag.length, ...keep);
      return this.finish([]);
    }
    return this.finish(this.matching());
  }

  finish(rows) {
    const shaped = this.spec && this.spec.includes("cases(") ? rows.map((row) => {
      const found = rowsFor("cases").find((item) => item.standard === row.case_standard) || null;
      const cases = found ? { title: found.title, learning_target: found.learning_target, subject: found.subject, engine: found.engine } : null;
      return { ...row, cases };
    }) : rows;
    if (this.head || this.wantCount) {
      return { data: this.head ? null : shaped, count: shaped.length, error: null };
    }
    if (this.mode === "one") return { data: shaped[0] || null, error: shaped[0] ? null : { message: "No row" } };
    if (this.mode === "maybe") return { data: shaped[0] || null, error: null };
    return { data: shaped, error: null };
  }

  then(resolve, reject) {
    return Promise.resolve(this.run()).then(resolve, reject);
  }
}

export const demoSupabase = {
  from(table) { return new Query(table); },
  rpc() { return Promise.resolve({ data: null, error: null }); },
  auth: {
    async getUser() { return { data: { user: teacherUser }, error: null }; },
    async getSession() { return { data: { session: { access_token: "demo", user: teacherUser } }, error: null }; },
    async signOut() { return { error: null }; },
    onAuthStateChange(callback) {
      callback("SIGNED_IN", { access_token: "demo", user: teacherUser });
      return { data: { subscription: { unsubscribe() {} } } };
    },
  },
};

export function demoIsOn() {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem("cc-demo") === "1") return true;
    return document.cookie.split(";").some((part) => part.trim().startsWith("cc_demo=1"));
  } catch (err) {
    return false;
  }
}
