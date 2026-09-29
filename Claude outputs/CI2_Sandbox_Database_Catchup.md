# CI2.0 Sandbox — Database Catch-Up

**For:** a Claude session with the Supabase connector connected to Emily's account.
**Written:** Sept 28, 2026.
**Goal:** make the **sandbox** database match the **live** database's structure and activity content, so the `ci2-sandbox` site can open every activity the live site has. Copy **no** teachers, students or student work.

---

## The two databases

| | Live | Sandbox |
|---|---|---|
| Supabase project | the original ClearCenters project (real classes) | `clearcenters-sandbox` (made-up data only) |
| Used by | the live site, branch `main` | the CI2.0 sandbox site, branch `ci2-sandbox` (Vercel Preview) |
| What this job does to it | **reads only** | adds what's missing |

The sandbox was copied from the live structure on **Sept 16, 2026** (`Claude outputs/sandbox_1_structure.sql`, `sandbox_2_cases.sql` and `sandbox_3_words.sql` on the `ci2-sandbox` branch). Everything added to live since then is missing from the sandbox.

---

## Rules

1. **Never write to the live project.** On live, only list tables and columns and run `select` queries. If a tool asks which project to run something on, check the name every time.
2. **Copy structure and content tables only**, never people or their work. Never copy rows from:
   - `teachers`, `classes`, `students`
   - `assignments`, `assignment_students`, `submissions`
   - any `*_sessions`, `*_attempts`, `*_runs`, `*_progress`, `*_legs`, `*_participants` or `*_history` table
   - `hint_requests`, `sam_shoutouts`, `teacher_messages`, `student_planet_*`
   - `frequency_rush_custom_lists` and `relay_station_custom_texts` (teachers' own lists)
   - anything in `auth`
3. **Show Emily the list of changes before running them**, grouped as new tables, new columns, new functions and content rows. Then run them.
4. Say plainly what ran and what didn't. A SQL file existing is not proof it ran.

---

## How to do it

### Step 1 — Find both projects

List the Supabase projects. Name the live one and the sandbox one back to Emily, and confirm with her before going on.

### Step 2 — Compare structure (the reliable way)

For each project, list every table in `public` with its columns, types, defaults and nullability. Also list the functions (RPCs), RLS policies and indexes. Then work out what live has that the sandbox doesn't:

- tables missing from the sandbox
- columns missing from sandbox tables (with the same type and default)
- functions missing or different, such as `increment_crystal_points`, `grant_sam_skin`, `send_sam_shoutout` and the Crystal Dive and Signal Ops functions
- RLS policies and indexes on the new tables

Write the changes as `create table if not exists …`, `alter table … add column if not exists …` and `create or replace function …`, so they are safe to run twice.

### Step 3 — Copy the content tables

Copy all rows from live to the sandbox for these tables, inserting only what's missing (`on conflict do nothing`, or matching on the primary key):

- `cases`: the activity library. This matters most, since an activity only appears on Assign when it has a `cases` row. It should come to about 1,040 rows.
- `frequency_rush_words`
- `planets` and `badge_tiers`
- any other content-only table that Step 2 turns up (no student or teacher columns). Ask Emily if unsure.

### Step 4 — Check it

Run `audit_production_readonly.sql` (repo root on `main`) **on the sandbox project**. It is read-only. It checks every activity code in the code against `cases`, and every table, column and function the code uses. Anything it reports as missing, other than rows labelled PENDING, still needs fixing. Report the results to Emily.

Then ask Emily to open the sandbox site and:
- sign in as a pretend teacher,
- assign one Expedition Station quest, one Broadcast Booth case and one Maker Studio activity to a pretend student,
- open each one as that student.

---

## If the schema compare isn't possible: the SQL files since Sept 16

These are the SQL files added to `main` since the sandbox was copied, in the order they were written. Running them in this order on the **sandbox** project should bring it up to date. Most are written to be safe to run twice. Check each one before running it, and **stop and tell Emily if one fails**.

| Date | File |
|---|---|
| Sept 22 | `add_relay_station_migration.sql` |
| Sept 22 | `add_relay_station_v4_migration.sql` |
| Sept 22 | `add_relay_station_library_batch1.sql` |
| Sept 22 | `add_relay_station_library_batch2.sql` |
| Sept 22 | `add_relay_station_wave1_migration.sql` |
| Sept 22 | `add_relay_station_wave2_migration.sql` |
| Sept 22 | `add_relay_station_wave3_migration.sql` |
| Sept 22 | `add_assembly_deck_migration.sql` |
| Sept 22 | `add_mission_map_math_batch.sql` |
| Sept 23 | `add_assembly_deck_3_12b.sql` |
| Sept 23 | `add_assembly_deck_g3_sci_batch.sql` |
| Sept 23 | `add_mission_map_elar_batch.sql` |
| Sept 23 | `add_assembly_deck_g4_sci.sql` |
| Sept 23 | `add_assembly_deck_g5_sci.sql` |
| Sept 23 | `add_assembly_deck_ela_g3.sql` |
| Sept 23 | `add_assembly_deck_ela_g4.sql` |
| Sept 23 | `add_assembly_deck_ela_g5.sql` |
| Sept 23 | `add_assembly_deck_ss_g3.sql` |
| Sept 23 | `add_assembly_deck_ss_g4.sql` |
| Sept 23 | `add_assembly_deck_ss_g5.sql` |
| Sept 23 | `add_assembly_deck_math.sql` |
| Sept 24 | `add_assembly_deck_sci_batch2.sql` |
| Sept 24 | `add_classification_lab.sql` |
| Sept 24 | `add_classification_lab_batch2.sql` |
| Sept 24 | `add_frequency_rush_skills.sql` |
| Sept 24 | `add_frequency_rush_elar_skills.sql` |
| Sept 24 | `add_frequency_rush_word_lists.sql` |
| Sept 24 | `add_frequency_rush_daily.sql` |
| Sept 24 | `add_exhibit_hall.sql` |
| Sept 25 | `add_exhibit_hall_locked.sql` |
| Sept 25 | `add_exhibit_hall_split.sql` |
| Sept 25 | `add_exhibit_hall_line.sql` |
| Sept 25 | `add_exhibit_hall_portrait.sql` |
| Sept 25 | `add_exhibit_hall_kinds.sql` |
| Sept 25 | `add_expedition_station.sql` |
| Sept 25 | `add_crystal_dive_live.sql` |
| Sept 25 | `add_maker_studio.sql` |
| Sept 26 | `add_glow_garden_harvest.sql` |
| Sept 26 | `add_expedition_fractions_wave1.sql` |
| Sept 26 | `add_broadcast_booth.sql` |
| Sept 26 | `add_broadcast_booth_cases.sql` |
| Sept 26 | `add_content_library_cases.sql` |
| Sept 26 | `add_expedition_full_quests.sql` |
| Sept 27 | `add_expedition_wave2.sql` |
| Sept 27 | `add_expedition_wave3.sql` |
| Sept 27 | `add_expedition_wave4.sql` |
| Sept 27 | `add_expedition_wave5.sql` |
| Sept 28 | `add_expedition_overnight.sql` |
| Sept 28 | `add_expedition_waves12_13.sql` |
| Sept 28 | `add_expedition_waves14_16.sql` |
| Sept 28 | `add_expedition_wave17.sql` |
| Sept 28 | `add_expedition_wave18.sql` |
| Sept 28 | `add_expedition_wave19.sql` |
| Sept 28 | `add_gradebook_scale.sql` |

**Do not run** `remove_signal_check_wi_th_cases.sql`, or any demo-class or cleanup SQL written for the live site.

This list can miss changes that were only ever pasted into the live SQL Editor from chat and never saved as a file. That is why Step 2's compare is the better way.

---

## After this

- New SQL written for the live site from now on should also be run on the sandbox project when the sandbox needs it.
- Code rules for every bot are in `AGENTS.md` under **Which branch**: all work goes on `main`, and `ci2-sandbox` only gets `main` merged into it.
- Sandbox sign-ups need **Confirm email** turned off in the sandbox project (Authentication → Sign In / Providers → Email). Check it's still off, and **never change it on live**.
