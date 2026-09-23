-- ClearCenters — READ-ONLY production audit (Sept 23, 2026). Changes nothing.
-- Every row returned is a problem, except the INFO rows at the bottom.
WITH expected_cases(engine, standard) AS (
  SELECT 'fact_check_desk', unnest(ARRAY['3.6A-SC','4.10B-SC','5.13B-SC','SS.3.6A-SC','SS.4.3A-SC','SS.5.4C-SC','3.10A-SC','3.10B-SC','3.10C-SC','3.11B-SC','3.12A-SC','3.12B-SC','3.12C-SC','3.12D-SC','3.6B-SC','3.6C-SC','3.7A-SC','3.7B-SC','3.8A-SC','3.8B-SC','3.9B-SC','3.13A-SC','3.13B-SC','4.6B-SC','4.6C-SC','4.7-SC','4.8A-SC','4.8B-SC','4.8C-SC','4.9A-SC','4.9B-SC','4.10A-SC','4.11A-SC','4.11B-SC','4.11C-SC','4.12A-SC','4.12B-SC','4.12C-SC','4.13A-SC','4.13B-SC','5.6A-SC','5.6B-SC','5.6C-SC','5.6D-SC','5.7A-SC','5.8A-SC','5.8B-SC','5.8C-SC','5.9-SC','5.10A-SC','5.10B-SC','5.10C-SC','5.11-SC','5.12A-SC','5.12B-SC','5.12C-SC','5.13A-SC','SS.3.2B-SC','SS.3.3A-SC','SS.3.3C-SC','SS.3.5B-SC','SS.3.6B-SC','SS.3.6C-SC','SS.3.7C-SC','SS.3.8A-SC','SS.3.9E-SC','SS.4.1B-SC','SS.4.2A-SC','SS.4.2C-SC','SS.4.3D-SC','SS.4.4B-SC','SS.4.6B-SC','SS.4.9A-SC','SS.4.11C-SC','SS.4.17B-SC','SS.5.2A-SC','SS.5.4A-SC','SS.5.4D-SC','SS.5.4E-SC','SS.5.7B-SC','SS.5.8B-SC','SS.5.13B-SC','SS.5.14B-SC','SS.5.15A-SC','MA.3.8B-SC','MA.3.4D-SC','MA.3.9C-SC','MA.3.2D-SC','MA.4.9B-SC','MA.4.4G-SC','MA.4.10B-SC','MA.4.3C-SC','MA.5.9C-SC','MA.5.10F-SC','MA.5.6B-SC','MA.5.3K-SC','ELA.3.7C-SC','ELA.3.9D-SC','ELA.3.6F-SC','ELA.3.9E-SC','ELA.4.10A-SC','ELA.4.8A-SC','ELA.4.13D-SC','ELA.4.8B-SC','ELA.5.9E-SC','ELA.5.8B-SC','ELA.5.13D-SC','ELA.5.10C-SC'])
  UNION ALL
  SELECT 'mission_map', unnest(ARRAY['3.1-MM','3.2-MM','3.3-MM','3.4-MM','3.5-MM','3.6-MM','3.7-MM','3.8-MM','4.1-MM','4.2-MM','4.3-MM','4.4-MM','4.5-MM','4.6-MM','4.7-MM','4.8-MM','4.9-MM','5.1-MM','5.2-MM','5.3-MM','5.4-MM','5.5-MM','5.6-MM','5.7-MM','5.8-MM','3.9-MM','3.10-MM','3.11-MM','3.12-MM','4.10-MM','4.11-MM','4.12-MM','4.13-MM','5.9-MM','5.10-MM','5.11-MM','5.12-MM','3.13-MM','3.14-MM','3.15-MM','3.16-MM','4.14-MM','4.15-MM','4.16-MM','4.17-MM','5.13-MM','5.14-MM','5.15-MM','5.16-MM'])
  UNION ALL
  SELECT 'simulation_lab', unnest(ARRAY['3.8B-SL','3.6A-SL','3.7A-SL','3.6C-SL','4.6B-SL','4.7-SL','4.8C-SL','5.7B-SL','5.8B-SL','5.9-SL'])
  UNION ALL
  SELECT 'assembly_deck', unnest(ARRAY['3.6A-AD','3.12B-AD','3.11B-AD','3.13A-AD','3.10C-AD','4.10B-AD','SS.4.6B-AD','SS.5.4C-AD','ELA.3.12B-AD','ELA.5.12C-AD'])
  UNION ALL
  SELECT 'signal_defense', unnest(ARRAY['3.6A-SD','3.6B-SD','3.6C-SD','3.6D-SD','3.7A-SD','3.7B-SD','3.8A-SD','3.8B-SD','3.9A-SD','3.9B-SD','3.10A-SD','3.10B-SD','3.10C-SD','3.11A-SD','3.11B-SD','3.11C-SD','3.12A-SD','3.12B-SD','3.12C-SD','3.12D-SD','3.13A-SD','3.13B-SD','4.10B-SD','4.6A-SD','4.6B-SD','4.7A-SD','4.6C-SD','4.8A-SD','4.8B-SD','4.8C-SD','4.9A-SD','4.9B-SD','4.10A-SD','4.10C-SD'])
  UNION ALL
  SELECT 'relay_station', unnest(ARRAY['RS.3.BIO01','RS.3.BIO02','RS.3.BIO03','RS.3.BIO04','RS.3.C01','RS.3.DAILY','RS.3.ELA01','RS.3.ELA02','RS.3.ELA03','RS.3.ELA04','RS.3.L01','RS.3.LOG01','RS.3.LOG02','RS.3.LOG03','RS.3.LOG04','RS.3.NUM01','RS.3.NUM02','RS.3.NUM03','RS.3.NUM04','RS.3.P01','RS.3.P02','RS.3.RACE','RS.3.S01','RS.3.SCI01','RS.3.SCI02','RS.3.SCI03','RS.3.SCI04','RS.3.SS01','RS.3.SS02','RS.3.SS03','RS.3.SS04','RS.3.TRACK','RS.4.BIO01','RS.4.BIO02','RS.4.BIO03','RS.4.BIO04','RS.4.C01','RS.4.DAILY','RS.4.ELA01','RS.4.ELA02','RS.4.ELA03','RS.4.ELA04','RS.4.L01','RS.4.LOG01','RS.4.LOG02','RS.4.LOG03','RS.4.LOG04','RS.4.NUM01','RS.4.NUM02','RS.4.NUM03','RS.4.NUM04','RS.4.P01','RS.4.P02','RS.4.RACE','RS.4.SCI01','RS.4.SCI02','RS.4.SCI03','RS.4.SCI04','RS.4.SS01','RS.4.SS02','RS.4.SS03','RS.4.SS04','RS.4.TRACK','RS.5.BIO01','RS.5.BIO02','RS.5.BIO03','RS.5.BIO04','RS.5.C01','RS.5.DAILY','RS.5.ELA01','RS.5.ELA02','RS.5.ELA03','RS.5.ELA04','RS.5.L01','RS.5.LOG01','RS.5.LOG02','RS.5.LOG03','RS.5.LOG04','RS.5.NUM01','RS.5.NUM02','RS.5.NUM03','RS.5.NUM04','RS.5.P01','RS.5.P02','RS.5.RACE','RS.5.SCI01','RS.5.SCI02','RS.5.SCI03','RS.5.SCI04','RS.5.SS01','RS.5.SS02','RS.5.SS03','RS.5.SS04','RS.5.TRACK'])
),
expected_cols(t, c) AS (
  SELECT 'assignments', unnest(ARRAY['case_standard','class_id','due_date','game_skin','pacing_mode'])
  UNION ALL
  SELECT 'cases', unnest(ARRAY['engine','grade','subject','title','unit'])
  UNION ALL
  SELECT 'classes', unnest(ARRAY['class_code','grade','name','teacher_id'])
  UNION ALL
  SELECT 'students', unnest(ARRAY['active','crystal_points','equipped_sam_skin','equipped_world_trail','home_background','last_progress_check_at','outpost_resources','pin','sam_nickname','share_token','streak_days','teacher_unlocked_sam_skins'])
  UNION ALL
  SELECT 'submissions', unnest(ARRAY['ai_score','ai_rationale','checklist','released','released_at','revision_requested','submitted_at','teacher_grade','signal_data','mission_map_data','simulation_lab_data','assembly_deck_data','relay_station_data','signal_defense_data','frequency_rush_data','newsroom_data'])
  UNION ALL
  SELECT 'relay_station_progress', unnest(ARRAY['accommodations','completed_at','current_level','daily','keyboard_skin','level_results','placement','updated_at'])
  UNION ALL
  SELECT 'relay_station_custom_texts', unnest(ARRAY['compose_prompt','intro','kind','mode','standard','text','title'])
  UNION ALL
  SELECT 'relay_races', unnest(ARRAY['class_id','ended_at','legs','source','started_at','status','teacher_id','title'])
  UNION ALL
  SELECT 'relay_race_legs', unnest(ARRAY['accuracy','claimed_at','done_at','leg_index','race_id','wpm'])
  UNION ALL
  SELECT 'signal_ops_sessions', unnest(ARRAY['assignment_id','status','vote','upgrades','outcome','wave_index','wave_started_at','meters_ticked_at','next_vote_threshold','last_upgrade_id'])
  UNION ALL
  SELECT 'signal_ops_participants', unnest(ARRAY['last_seen_at','session_id','vote_choice'])
  UNION ALL
  SELECT 'frequency_rush_sessions', unnest(ARRAY['ended_at','ended_reason','game_mode','score','word_order'])
  UNION ALL
  SELECT 'briefing_submissions', unnest(ARRAY['phase_state','scores','status'])
  UNION ALL
  SELECT 'hint_requests', unnest(ARRAY['assignment_id','case_standard','student_id'])
  UNION ALL
  SELECT 'sam_shoutouts', unnest(ARRAY['seen_at','student_id'])
  UNION ALL
  SELECT 'teacher_messages', unnest(ARRAY['read_at','student_id'])
  UNION ALL
  SELECT 'student_planet_games', unnest(ARRAY['best_score','cleared','game_key','planet_key','played','unlocked_at'])
  UNION ALL
  SELECT 'student_planet_visits', unnest(ARRAY['planet_key','story_read_at'])
  UNION ALL
  SELECT 'planets', unnest(ARRAY['image_path','planet_key'])
),
expected_tables(t) AS (SELECT unnest(ARRAY['assignment_students','assignments','badge_tiers','briefing_assignment_students','briefing_assignments','briefing_submissions','briefings','cases','classes','frequency_rush_attempts','frequency_rush_sessions','hint_requests','planets','relay_race_legs','relay_races','relay_station_custom_texts','relay_station_progress','sam_shoutouts','signal_ops_participants','signal_ops_sessions','student_planet_discoveries','student_planet_games','student_planet_visits','students','submissions','teacher_messages','teachers'])),
expected_fns(f) AS (SELECT unnest(ARRAY['bump_daily_streak','equip_item','increment_crystal_points','increment_outpost_resources','purchase_item','signal_ops_advance_session','signal_ops_submit_event','grant_sam_skin','send_sam_shoutout']))

SELECT '1 case row' AS check_type, e.engine AS area, e.standard AS item,
       CASE WHEN c.standard IS NULL THEN 'MISSING: no row in cases, so it would open as Group Chat'
            ELSE 'WRONG ENGINE: row says ' || coalesce(c.engine, 'NULL') END AS problem
FROM expected_cases e
LEFT JOIN cases c ON c.standard = e.standard
WHERE c.standard IS NULL OR c.engine IS DISTINCT FROM e.engine

UNION ALL
SELECT '2 table', 'schema', t.t, 'MISSING TABLE'
FROM expected_tables t
WHERE NOT EXISTS (SELECT 1 FROM information_schema.tables x
                  WHERE x.table_schema = 'public' AND x.table_name = t.t)

UNION ALL
SELECT '3 column', ec.t, ec.c, 'MISSING COLUMN'
FROM expected_cols ec
WHERE EXISTS (SELECT 1 FROM information_schema.tables x
              WHERE x.table_schema = 'public' AND x.table_name = ec.t)
  AND NOT EXISTS (SELECT 1 FROM information_schema.columns x
                  WHERE x.table_schema = 'public' AND x.table_name = ec.t AND x.column_name = ec.c)

UNION ALL
SELECT '4 function', 'schema', f.f, 'MISSING FUNCTION'
FROM expected_fns f
WHERE NOT EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
                  WHERE n.nspname = 'public' AND p.proname = f.f)

UNION ALL
SELECT '5 INFO', 'cases', engine, count(*)::text || ' rows'
FROM cases GROUP BY engine

UNION ALL
SELECT '5 INFO', 'cases', 'retired Signal Check Weigh-In/Thread rows still present',
       count(*)::text
FROM cases WHERE standard LIKE '%-SC-WI' OR standard LIKE '%-SC-TH'

ORDER BY 1, 2, 3;
