-- Run this migration before shipping the Crystal Dive site changes.
ALTER TABLE public.assignments
  ADD COLUMN IF NOT EXISTS crystal_dive_minutes integer NOT NULL DEFAULT 10;

ALTER TABLE public.assignments
  ADD CONSTRAINT assignments_crystal_dive_minutes_range
  CHECK (crystal_dive_minutes IN (5, 10, 15, 20));

CREATE TABLE IF NOT EXISTS public.crystal_dive_runs (
  session_id uuid PRIMARY KEY REFERENCES public.frequency_rush_sessions(id),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id),
  student_id uuid NOT NULL REFERENCES public.students(id),
  result jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.crystal_dive_runs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.crystal_dive_runs FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON public.crystal_dive_runs TO service_role;

-- Session row lock makes retries and simultaneous submissions return the same
-- wheel outcome. The student balance and session completion commit together.
CREATE OR REPLACE FUNCTION public.record_crystal_dive_run(
  p_session_id uuid, p_student_id uuid, p_result jsonb
) RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
DECLARE
  v_session public.frequency_rush_sessions%ROWTYPE;
  v_existing jsonb;
  v_award integer;
  v_balance integer;
  v_submission_id uuid;
BEGIN
  SELECT * INTO v_session FROM public.frequency_rush_sessions
  WHERE id = p_session_id FOR UPDATE;
  IF NOT FOUND OR v_session.student_id IS DISTINCT FROM p_student_id
    OR v_session.game_mode IS DISTINCT FROM 'crystal_dive' THEN
    RAISE EXCEPTION 'Crystal Dive session is not available';
  END IF;

  SELECT result INTO v_existing FROM public.crystal_dive_runs WHERE session_id = p_session_id;
  IF FOUND THEN RETURN v_existing; END IF;
  IF v_session.ended_at IS NOT NULL THEN RAISE EXCEPTION 'This run is already finished'; END IF;

  v_award := (p_result ->> 'crystalsBanked')::integer;
  IF v_award IS NULL OR v_award < 0 OR v_award > 600 THEN
    RAISE EXCEPTION 'Crystal award is out of range';
  END IF;

  UPDATE public.students SET crystal_points = crystal_points + v_award
  WHERE id = p_student_id RETURNING crystal_points INTO v_balance;
  IF NOT FOUND THEN RAISE EXCEPTION 'Student not found'; END IF;

  v_existing := p_result || jsonb_build_object('balance', v_balance);
  INSERT INTO public.crystal_dive_runs (session_id, assignment_id, student_id, result)
  VALUES (p_session_id, v_session.assignment_id, p_student_id, v_existing);
  UPDATE public.frequency_rush_sessions SET ended_at = now(), ended_reason = 'completed',
    score = (p_result ->> 'correctCount')::integer
  WHERE id = p_session_id;

  SELECT id INTO v_submission_id FROM public.submissions
  WHERE assignment_id = v_session.assignment_id AND student_id = p_student_id
  ORDER BY submitted_at DESC NULLS LAST LIMIT 1 FOR UPDATE;
  IF v_submission_id IS NOT NULL THEN
    UPDATE public.submissions SET
      frequency_rush_data = jsonb_build_object('game', 'crystal_dive', 'sessionId', p_session_id,
        'score', (p_result ->> 'correctCount')::integer, 'correctCount', (p_result ->> 'correctCount')::integer,
        'total', (p_result ->> 'attempted')::integer, 'perWordResults', p_result -> 'answers', 'crystalsCollected', p_result -> 'crystalsCollected',
        'crystalsBanked', v_award, 'practiceFacts', p_result -> 'practiceFacts', 'percentCorrect', p_result -> 'percentCorrect'),
      attempt2 = format('Crystal Dive: %s/%s correct, %s crystals banked.',
        p_result ->> 'correctCount', p_result ->> 'attempted', v_award),
      submitted_at = now()
    WHERE id = v_submission_id;
  ELSE
    INSERT INTO public.submissions (assignment_id, student_id, frequency_rush_data, attempt2, submitted_at)
    VALUES (v_session.assignment_id, p_student_id,
      jsonb_build_object('game', 'crystal_dive', 'sessionId', p_session_id,
        'score', (p_result ->> 'correctCount')::integer, 'correctCount', (p_result ->> 'correctCount')::integer,
        'total', (p_result ->> 'attempted')::integer, 'perWordResults', p_result -> 'answers', 'crystalsCollected', p_result -> 'crystalsCollected',
        'crystalsBanked', v_award, 'practiceFacts', p_result -> 'practiceFacts', 'percentCorrect', p_result -> 'percentCorrect'),
      format('Crystal Dive: %s/%s correct, %s crystals banked.',
        p_result ->> 'correctCount', p_result ->> 'attempted', v_award), now());
  END IF;
  RETURN v_existing;
END;
$$;

REVOKE ALL ON FUNCTION public.record_crystal_dive_run(uuid, uuid, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_crystal_dive_run(uuid, uuid, jsonb) TO service_role;
