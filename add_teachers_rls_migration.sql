-- Fixes: "Couldn't save — try again" on the S.A.M. skin picker (Class
-- Settings), and a related silent symptom — the teacher's display name on
-- the Hub/Settings pages not loading.
--
-- Root cause: the `teachers` table was created in supabase_schema.sql with
-- no RLS policies at all, unlike `submissions`/`assignment_students` which
-- already have auth.uid()-scoped policies. If RLS was ever turned on for
-- `teachers` — which happens automatically if you accepted Supabase's own
-- security-advisor prompt in the dashboard — a table with RLS enabled and
-- zero policies denies everyone by default, including a teacher reading or
-- updating their own row.
--
-- Safe to run whether or not RLS was already on: `enable row level
-- security` is a no-op if it's already enabled, and the `drop policy if
-- exists` guards make the `create policy` statements safe to re-run.
--
-- Scope: a teacher can read and update only their own row (id = auth.uid()),
-- same pattern as the existing submissions/assignment_students policies. No
-- insert/delete policy needed — teacher rows are only ever created
-- server-side via the service role key (app/api/teacher-signup), which
-- bypasses RLS entirely.

alter table teachers enable row level security;

drop policy if exists "Teachers can view their own row" on teachers;
create policy "Teachers can view their own row"
on teachers for select
using (id = auth.uid());

drop policy if exists "Teachers can update their own row" on teachers;
create policy "Teachers can update their own row"
on teachers for update
using (id = auth.uid())
with check (id = auth.uid());
