import { supabaseAdmin } from "../supabaseAdmin";
import {
  UPGRADE_CATALOG,
  UPGRADE_IDS,
  POWER_DRAIN_PER_SEC,
  VOTE_WINDOW_MS,
  VOTE_THRESHOLD_STEP,
  WAVE_SECONDS,
  MAX_WAVES,
  REPAIR_HEAL,
  WAVE_DAMAGE_BASE,
  WAVE_DAMAGE_PER_WAVE,
  TURRET_DAMAGE_REDUCE,
  TICK_CATCHUP_CAP_SEC,
} from "./gameConfig";

function nowIso() {
  return new Date().toISOString();
}

function parseUpgrades(raw) {
  const u = raw && typeof raw === "object" ? raw : {};
  return {
    shield: !!u.shield,
    turret: Math.max(0, Number(u.turret) || 0),
  };
}

function voteIsOpen(vote, nowMs = Date.now()) {
  if (!vote || typeof vote !== "object") return false;
  if (vote.resolved) return false;
  if (!vote.ends_at) return false;
  return new Date(vote.ends_at).getTime() > nowMs;
}

export function affordableUpgradeIds(salvage, upgrades) {
  const u = parseUpgrades(upgrades);
  const list = [];
  for (const id of UPGRADE_IDS) {
    const item = UPGRADE_CATALOG[id];
    if (!item) continue;
    if (item.cost > salvage) continue;
    if (id === "shield" && u.shield) continue;
    if (id === "turret" && u.turret >= 2) continue;
    list.push(id);
  }
  // Prefer showing the expensive option when it is available.
  list.sort((a, b) => UPGRADE_CATALOG[b].cost - UPGRADE_CATALOG[a].cost);
  return list.slice(0, 3);
}

export function applyUpgradeEffect(session, upgradeId) {
  const upgrades = parseUpgrades(session.upgrades);
  let salvage = session.salvage;
  let baseHealth = session.base_health;
  let waveIndex = session.wave_index || 0;
  let waveStartedAt = session.wave_started_at;
  const cost = UPGRADE_CATALOG[upgradeId]?.cost || 0;
  if (salvage < cost) {
    return { upgrades, salvage, base_health: baseHealth, wave_index: waveIndex, wave_started_at: waveStartedAt, applied: false };
  }
  salvage -= cost;

  if (upgradeId === "shield") {
    upgrades.shield = true;
  } else if (upgradeId === "turret") {
    upgrades.turret = Math.min(2, upgrades.turret + 1);
  } else if (upgradeId === "repair") {
    baseHealth = Math.min(100, baseHealth + REPAIR_HEAL);
  } else if (upgradeId === "overcharge") {
    // Clear current wave with no damage — advance immediately.
    if (waveIndex > 0 && waveIndex < MAX_WAVES) {
      waveIndex += 1;
      waveStartedAt = nowIso();
    } else if (waveIndex >= MAX_WAVES) {
      waveStartedAt = nowIso();
    }
  }

  const out = {
    upgrades,
    salvage,
    base_health: baseHealth,
    wave_index: waveIndex,
    wave_started_at: waveStartedAt,
    applied: true,
    last_upgrade_id: upgradeId,
  };
  if (upgradeId === "overcharge" && waveIndex >= MAX_WAVES) {
    out.force_victory = true;
  }
  return out;
}

export async function clearParticipantVotes(sessionId) {
  await supabaseAdmin
    .from("signal_ops_participants")
    .update({ vote_choice: null })
    .eq("session_id", sessionId);
}

export async function recomputeVoteTallies(sessionId, options) {
  const { data } = await supabaseAdmin
    .from("signal_ops_participants")
    .select("vote_choice")
    .eq("session_id", sessionId);
  const tallies = {};
  for (const id of options || []) tallies[id] = 0;
  for (const row of data || []) {
    const c = row.vote_choice;
    if (c && Object.prototype.hasOwnProperty.call(tallies, c)) {
      tallies[c] += 1;
    }
  }
  return tallies;
}

function pickMajorityWinner(options, tallies) {
  let winner = options[0] || null;
  let best = -1;
  for (const id of options) {
    const n = tallies[id] || 0;
    if (n > best) {
      best = n;
      winner = id;
    } else if (n === best && winner) {
      // Tie-break: more expensive upgrade wins (save-up payoff).
      if ((UPGRADE_CATALOG[id]?.cost || 0) > (UPGRADE_CATALOG[winner]?.cost || 0)) {
        winner = id;
      }
    }
  }
  if (best <= 0) return null;
  return winner;
}

export async function resolveOpenVote(session) {
  const vote = session.vote;
  if (!vote || vote.resolved) return null;
  const options = Array.isArray(vote.options) ? vote.options : [];
  const tallies = await recomputeVoteTallies(session.id, options);
  const winner = pickMajorityWinner(options, tallies);
  const patch = {
    vote: {
      ...vote,
      tallies,
      resolved: winner || "none",
      resolved_at: nowIso(),
    },
  };

  if (winner && UPGRADE_CATALOG[winner]) {
    const effect = applyUpgradeEffect(session, winner);
    if (effect.applied) {
      patch.upgrades = effect.upgrades;
      patch.salvage = effect.salvage;
      patch.base_health = effect.base_health;
      patch.wave_index = effect.wave_index;
      patch.wave_started_at = effect.wave_started_at;
      patch.last_upgrade_id = effect.last_upgrade_id;
      patch.next_vote_threshold = effect.salvage + VOTE_THRESHOLD_STEP;
      if (effect.force_victory) {
        patch.outcome = "victory";
        patch.status = "ended";
        patch.ended_at = nowIso();
      }
    } else {
      patch.next_vote_threshold = (session.salvage || 0) + VOTE_THRESHOLD_STEP;
    }
  } else {
    patch.next_vote_threshold = (session.salvage || 0) + VOTE_THRESHOLD_STEP;
  }

  await clearParticipantVotes(session.id);
  return patch;
}

function openVotePatch(session) {
  const options = affordableUpgradeIds(session.salvage, session.upgrades);
  if (options.length === 0) {
    return {
      next_vote_threshold: (session.salvage || 0) + VOTE_THRESHOLD_STEP,
    };
  }
  const ends = new Date(Date.now() + VOTE_WINDOW_MS).toISOString();
  const tallies = {};
  for (const id of options) tallies[id] = 0;
  const patch = {
    vote: {
      options,
      tallies,
      ends_at: ends,
      opened_at: nowIso(),
      resolved: null,
    },
    meters_ticked_at: nowIso(),
  };
  // Pause the wave clock for the vote window so contact does not land mid-vote.
  if (session.wave_started_at) {
    const started = new Date(session.wave_started_at).getTime();
    patch.wave_started_at = new Date(started + VOTE_WINDOW_MS).toISOString();
  }
  return patch;
}

function resolveWaveDamage(session) {
  const upgrades = parseUpgrades(session.upgrades);
  const powerOnline = (session.power || 0) > 0;
  const wave = Math.max(1, session.wave_index || 1);
  let damage = WAVE_DAMAGE_BASE + wave * WAVE_DAMAGE_PER_WAVE;

  if (powerOnline && upgrades.shield) {
    return {
      damage: 0,
      upgrades: { ...upgrades, shield: false },
      blocked: true,
    };
  }

  if (powerOnline && upgrades.turret > 0) {
    damage = Math.max(0, damage - upgrades.turret * TURRET_DAMAGE_REDUCE);
  }

  // Power outage: defenses offline — full wave pressure.
  if (!powerOnline) {
    damage = Math.round(damage * 1.15);
  }

  return {
    damage: Math.max(0, Math.round(damage)),
    upgrades,
    blocked: false,
  };
}

/**
 * Server-authoritative simulation step for a live session.
 * Idempotent-ish: safe to call on every poll (~1.5s).
 * Returns the refreshed session row (or the original if nothing changed / race).
 */
export async function advanceLiveSession(session) {
  if (!session || session.status !== "live") return session;
  if (session.outcome && session.outcome !== "ongoing") return session;

  const nowMs = Date.now();
  let working = { ...session };
  let patch = {};
  let changed = false;

  // 1) Resolve expired vote.
  if (working.vote && !working.vote.resolved && working.vote.ends_at) {
    if (new Date(working.vote.ends_at).getTime() <= nowMs) {
      const votePatch = await resolveOpenVote(working);
      if (votePatch) {
        patch = { ...patch, ...votePatch };
        working = { ...working, ...votePatch };
        changed = true;
      }
    }
  }

  const voting = voteIsOpen(working.vote, nowMs);

  // 2) Power drain (paused during open vote).
  if (!voting) {
    const lastMs = working.meters_ticked_at
      ? new Date(working.meters_ticked_at).getTime()
      : nowMs;
    const elapsed = Math.min(TICK_CATCHUP_CAP_SEC, Math.max(0, (nowMs - lastMs) / 1000));
    if (elapsed >= 0.35) {
      const nextPower = Math.max(0, Math.round((working.power || 0) - POWER_DRAIN_PER_SEC * elapsed));
      if (nextPower !== working.power) {
        patch.power = nextPower;
        working.power = nextPower;
        changed = true;
      }
      patch.meters_ticked_at = nowIso();
      working.meters_ticked_at = patch.meters_ticked_at;
      changed = true;
    }
  } else {
    // Freeze drain clock while voting so we don't catch up after.
    patch.meters_ticked_at = nowIso();
    working.meters_ticked_at = patch.meters_ticked_at;
    changed = true;
  }

  // 3) Wave resolution (paused during open vote).
  if (!voting && working.wave_index > 0 && working.wave_started_at) {
    const started = new Date(working.wave_started_at).getTime();
    if (nowMs - started >= WAVE_SECONDS * 1000) {
      const result = resolveWaveDamage(working);
      const nextHealth = Math.max(0, (working.base_health || 0) - result.damage);
      patch.base_health = nextHealth;
      patch.upgrades = result.upgrades;
      working.base_health = nextHealth;
      working.upgrades = result.upgrades;
      changed = true;

      if (nextHealth <= 0) {
        patch.outcome = "regroup";
        patch.status = "ended";
        patch.ended_at = nowIso();
        patch.vote = working.vote && !working.vote.resolved
          ? { ...working.vote, resolved: "cancelled", resolved_at: nowIso() }
          : working.vote;
        working = { ...working, ...patch };
      } else if ((working.wave_index || 0) >= MAX_WAVES) {
        patch.outcome = "victory";
        patch.status = "ended";
        patch.ended_at = nowIso();
        working = { ...working, ...patch };
      } else {
        patch.wave_index = (working.wave_index || 0) + 1;
        patch.wave_started_at = nowIso();
        working.wave_index = patch.wave_index;
        working.wave_started_at = patch.wave_started_at;
      }
    }
  }

  // 4) Open a new vote when Salvage crosses the threshold.
  if (
    working.status === "live" &&
    (!working.outcome || working.outcome === "ongoing") &&
    !voteIsOpen(working.vote, nowMs) &&
    !(working.vote && !working.vote.resolved) &&
    (working.salvage || 0) >= (working.next_vote_threshold || VOTE_THRESHOLD_STEP)
  ) {
    // Only open a fresh vote if previous vote was resolved/cleared.
    if (!working.vote || working.vote.resolved) {
      await clearParticipantVotes(working.id);
      const voteOpen = openVotePatch(working);
      patch = { ...patch, ...voteOpen };
      working = { ...working, ...voteOpen };
      changed = true;
    }
  }

  if (!changed) return session;

  const { data: updated, error } = await supabaseAdmin
    .from("signal_ops_sessions")
    .update(patch)
    .eq("id", session.id)
    .eq("status", session.status === "ended" ? session.status : "live")
    .select("*")
    .maybeSingle();

  // If status flipped to ended in this patch, match on id only.
  if ((!updated || error) && patch.status === "ended") {
    const { data: endedRow } = await supabaseAdmin
      .from("signal_ops_sessions")
      .update(patch)
      .eq("id", session.id)
      .select("*")
      .maybeSingle();
    return endedRow || { ...session, ...patch };
  }

  return updated || { ...session, ...patch };
}

/**
 * After a correct contribution, try to open a vote if threshold crossed.
 * Call with the fresh session row (post-salvage update).
 */
export async function maybeOpenVoteAfterContribute(session) {
  if (!session || session.status !== "live") return session;
  if (session.outcome && session.outcome !== "ongoing") return session;
  if (voteIsOpen(session.vote)) return session;
  if (session.vote && !session.vote.resolved) return session;
  if ((session.salvage || 0) < (session.next_vote_threshold || VOTE_THRESHOLD_STEP)) {
    return session;
  }
  await clearParticipantVotes(session.id);
  const voteOpen = openVotePatch(session);
  const { data: updated } = await supabaseAdmin
    .from("signal_ops_sessions")
    .update(voteOpen)
    .eq("id", session.id)
    .eq("status", "live")
    .select("*")
    .maybeSingle();
  return updated || { ...session, ...voteOpen };
}

export { voteIsOpen, parseUpgrades };
