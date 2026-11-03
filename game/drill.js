// Part Two: the D-pad drills (Glen 2026-11-02). In the story moments (Michal letting the rope down, laying the figure in
// the bed...) the moment is played, not watched: a row of arrows (later A and B too) to press in order before the time
// runs out. Each round done moves the scene on. With two players, Player 2 plays the drill (the one doing the deed);
// alone, Player 1 does. A wrong press starts the round over; running out of time does too. Nothing is lost by failing.
//   startDrill({ title, rounds: [4, 5, 6], perKey: 0.9, buttons: false, onDone })
//   drill.progress (0-1) is how far along it is, for the scene's animation.

const DRILL = {
  PER_KEY: 0.95,      // seconds allowed per arrow (a round of 5 has 5 x this)
  SHOW_T: 0.9,        // the row shows this long before the clock starts ("Ready...")
  NEXT_T: 0.55,       // a pause between rounds
  SHAKE_T: 0.35,
};
const drill = { on: false, p2: false, title: "", rounds: [], round: 0, keys: [], k: 0, t: 0, limit: 0, ready: 0, wait: 0, shake: 0,
  progress: 0, done: 0, total: 0, onDone: null, msg: "", msgT: 0, buttons: false };
const DRILL_DIRS = ["up", "down", "left", "right"];

function startDrill(o) {
  Object.assign(drill, { on: true, p2: typeof p2 !== "undefined" && p2.on, title: o.title, rounds: o.rounds || [4, 5, 6], round: 0, perKey: o.perKey || DRILL.PER_KEY,
    buttons: !!o.buttons, onDone: o.onDone || null, done: 0, progress: 0, shake: 0, msg: "", msgT: 0 });
  drill.total = drill.rounds.reduce((a, b) => a + b, 0);
  drillRound();
}
function drillRound() {
  const n = drill.rounds[drill.round], pool = drill.buttons && drill.round > 0 ? [...DRILL_DIRS, "a", "b"] : DRILL_DIRS;
  drill.keys = []; for (let i = 0; i < n; i++) { let b; do b = pool[Math.floor(Math.random() * pool.length)]; while (i && b === drill.keys[i - 1] && Math.random() < 0.6); drill.keys.push(b); }
  drill.k = 0; drill.t = 0; drill.limit = n * drill.perKey; drill.ready = DRILL.SHOW_T;
}
const drillPressed = b => drill.p2 ? pressed2(b) : pressed(b);
function updateDrill(dt) {
  if (drill.msgT > 0) drill.msgT -= dt;
  if (!drill.on) return;
  drill.shake = Math.max(0, drill.shake - dt);
  if (drill.wait > 0) { drill.wait -= dt; if (drill.wait <= 0) { if (drill.round >= drill.rounds.length) drillFinish(); else drillRound(); } return; }
  if (drill.ready > 0) { drill.ready -= dt; return; }
  drill.t += dt;
  const want = drill.keys[drill.k];
  const hit = [...DRILL_DIRS, "a", "b"].find(drillPressed);
  if (hit) {
    if (hit === want) {
      drill.k++; drill.done++; sfx("olive_pickup", undefined, 0.5, 0.9 + drill.k * 0.06);
      if (drill.k >= drill.keys.length) {   // the round is done
        drill.round++; drill.wait = DRILL.NEXT_T; if (typeof chime === "function") chime(3 + drill.round);
        drill.msg = drill.round >= drill.rounds.length ? "Done!" : ["Good!", "Great!", "Keep going!"][drill.round % 3]; drill.msgT = 0.9;
      }
    } else drillMiss("Oops! That round again.");
  } else if (drill.t > drill.limit) drillMiss("Too slow! That round again.");
  // the scene moves with every right press (a missed round takes it back to where that round began)
  drill.progress = Math.min(1, drill.done / drill.total);
}
function drillMiss(say) {
  drill.done -= drill.k; drill.k = 0; drill.t = 0; drill.shake = DRILL.SHAKE_T; drill.msg = say; drill.msgT = 1.2;
  sfx("stone_hit", undefined, 0.4, 0.6); drill.ready = 0.45;
}
function drillFinish() { drill.on = false; drill.progress = 1; const f = drill.onDone; drill.onDone = null; if (f) f(); }
// David waits while a drill is on (main.js updateDavid)
function drillHold(d, dt) {
  if (!drill.on && !(typeof w94 !== "undefined" && w94 && w94.hold)) return false;
  d.vx = 0; d.charging = false; d.throwT = -1;
  d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt);
  if (d.state !== "idle") setState("idle");
  return true;
}

function drawArrowKey(b, x, y, s, fill, line) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = "rgba(20,14,8,0.75)"; ctx.strokeStyle = line; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(-s / 2, -s / 2, s, s, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = fill;
  if (b === "a" || b === "b") { ctx.font = `bold ${s * 0.55}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(b.toUpperCase(), 0, 2); }
  else {
    ctx.rotate({ up: 0, right: Math.PI / 2, down: Math.PI, left: -Math.PI / 2 }[b]);
    const k = s * 0.3; ctx.beginPath(); ctx.moveTo(0, -k * 1.1); ctx.lineTo(k, k * 0.2); ctx.lineTo(k * 0.38, k * 0.2); ctx.lineTo(k * 0.38, k);
    ctx.lineTo(-k * 0.38, k); ctx.lineTo(-k * 0.38, k * 0.2); ctx.lineTo(-k, k * 0.2); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function drawDrill() {
  if (!drill.on && drill.msgT <= 0) return;
  ctx.save();
  const cx = W / 2, y0 = 218, sh = drill.shake > 0 ? Math.sin(performance.now() / 18) * 10 * drill.shake / DRILL.SHAKE_T : 0;
  if (drill.on) {
    const n = drill.keys.length, s = 64, gap = 14, w = n * s + (n - 1) * gap;
    ctx.fillStyle = "rgba(10,8,6,0.62)"; ctx.beginPath(); ctx.roundRect(cx - w / 2 - 30, y0 - 78, w + 60, 190, 18); ctx.fill();
    ctx.textAlign = "center"; ctx.fillStyle = "#ffd76a"; ctx.font = "bold 26px Georgia, serif"; ctx.fillText(drill.title, cx, y0 - 44);
    ctx.font = "16px sans-serif"; ctx.fillStyle = "#f3e6c8";
    ctx.fillText(`${drill.p2 ? "Player 2" : "Player 1"}: press them in order!   Round ${Math.min(drill.round + 1, drill.rounds.length)} of ${drill.rounds.length}`, cx, y0 - 20);
    for (let i = 0; i < n; i++) {
      const x = cx - w / 2 + s / 2 + i * (s + gap) + sh, cur = i === drill.k && drill.ready <= 0 && drill.wait <= 0;
      const pulse = cur ? 1 + Math.sin(performance.now() / 90) * 0.06 : 1;
      drawArrowKey(drill.keys[i], x, y0 + 30, s * pulse, i < drill.k ? "#7fdc7a" : cur ? "#ffffff" : "#bfae8a", i < drill.k ? "#7fdc7a" : cur ? "#ffd76a" : "#6a5a40");
    }
    // the clock
    const left = drill.ready > 0 || drill.wait > 0 ? 1 : Math.max(0, 1 - drill.t / drill.limit), bw = w;
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(cx - bw / 2, y0 + 78, bw, 10);
    ctx.fillStyle = left > 0.5 ? "#7fdc7a" : left > 0.25 ? "#ffd76a" : "#ff6a4a"; ctx.fillRect(cx - bw / 2, y0 + 78, bw * left, 10);
    if (drill.ready > 0 && drill.k === 0) { ctx.font = "bold 18px sans-serif"; ctx.fillStyle = "#ffd76a"; ctx.fillText("Ready...", cx, y0 + 104); }
  }
  if (drill.msgT > 0) { ctx.textAlign = "center"; ctx.font = "bold 30px Georgia, serif"; ctx.fillStyle = drill.msg.startsWith("Oops") || drill.msg.startsWith("Too") ? "#ff9a7a" : "#7fdc7a";
    ctx.globalAlpha = Math.min(1, drill.msgT * 2); ctx.fillText(drill.msg, cx, drill.on ? y0 + 140 : y0); }
  ctx.restore();
}

// ---------------------------------------------------------------------------
// 9-4 The Window (1 Samuel 19:11-13), the Part Two test of the drills: Michal lets David down by the rope, then lays
// the figure in the bed. Built to be the start of World 2's night escape.
// ---------------------------------------------------------------------------
const w94 = LEVEL_NAME !== "9-4" ? null : {
  step: "walk", t: 0, hold: false, fade: 0, card: null,
  michalX: ((setPieces.find(p => p.kind === "michal") || {}).c || 18) * T + T / 2,
  winX: ((setPieces.find(p => p.kind === "window94") || {}).c || 20) * T + T / 2,
  bedX: ((setPieces.find(p => p.kind === "bed94") || {}).c || 40) * T + T / 2,
  rope: 0,
};
function updateW94(dt) {
  if (!w94) return;
  const S = w94; S.t += dt; if (S.fade > 0) S.fade = Math.max(0, S.fade - dt);
  if (S.card) { S.card.t += dt; if (S.card.t > 2 && (pressed("a") || pressed2("a"))) location.reload(); return; }
  const talking = dialog.t > 0 && dialog.hold;
  if (S.step === "walk" && david.x > S.michalX - 120) {
    S.step = "warn"; S.hold = true; david.facing = 1;
    sayLine("Michal", "“If you don’t save your life tonight, tomorrow you will be killed.” (1 Samuel 19:11)");
  } else if (S.step === "warn" && !talking) {
    S.step = "rope";
    startDrill({ title: "Michal lets the rope down!", rounds: [4, 5, 6], onDone: () => {
      S.step = "down"; S.t = 0; S.fade = 1.4;
      sayLine("", "So Michal let David down through the window. He went away, fled, and escaped. (1 Samuel 19:12)");
    } });
  } else if (S.step === "down" && !talking && S.t > 0.5) {
    // David is gone. The camera goes to the bed, and the second drill
    S.step = "bed"; S.fade = 1; w9.pose = { hide: true }; david.x = S.bedX - 60;
    startDrill({ title: "Michal lays the figure in the bed!", rounds: [5, 6, 7], buttons: true, perKey: 1.0, onDone: () => {
      S.step = "end"; S.t = 0;
      sayLine("", "Michal took the teraphim and laid it in the bed, and put a pillow of goats’ hair at its head and covered it with clothes. (1 Samuel 19:13)");
    } });
  } else if (S.step === "end" && !talking && S.t > 0.5) { S.card = { t: 0 }; sfx("stage_clear", undefined, 0.6); }
  if (S.step === "rope") S.rope = drill.progress;
}
function drawW94(camX) {
  if (!w94) return;
  const S = w94, gy = GR * T;
  // the window: a stone opening in the wall, night outside, and the rope from its sill
  const wx = S.winX - camX, wy = 8 * T, ww = 96, wh = 130;
  ctx.save();
  ctx.fillStyle = "#6b5a44"; ctx.beginPath(); ctx.roundRect(wx - ww / 2 - 14, wy - 14, ww + 28, wh + 28, [50, 50, 6, 6]); ctx.fill();
  const g = ctx.createLinearGradient(0, wy, 0, wy + wh); g.addColorStop(0, "#0d1730"); g.addColorStop(1, "#22305a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(wx - ww / 2, wy, ww, wh, [44, 44, 2, 2]); ctx.fill();
  ctx.fillStyle = "#f4ecd0"; for (const [sx, sy] of [[-24, 30], [18, 18], [30, 60], [-10, 80]]) ctx.fillRect(wx + sx, wy + sy, 2, 2);   // stars
  ctx.fillStyle = "#8a7558"; ctx.fillRect(wx - ww / 2 - 18, wy + wh, ww + 36, 14);   // the sill
  if (S.rope > 0 && (S.step === "rope" || S.step === "down")) {   // the rope, let down past the sill (out of the window, down the outside wall)
    const len = S.rope * (gy - wy - wh - 14);
    ctx.strokeStyle = "#c9a46a"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(wx + 10, wy + wh + 10); ctx.lineTo(wx + 16, wy + wh + 14 + len); ctx.stroke();
    ctx.strokeStyle = "#7a5c32"; ctx.lineWidth = 1.5; for (let k = 0; k < len; k += 12) { ctx.beginPath(); ctx.moveTo(wx + 8, wy + wh + 14 + k); ctx.lineTo(wx + 14, wy + wh + 20 + k); ctx.stroke(); }
  }
  ctx.restore();
  // Michal: at the window (the rope), then at the bed (the figure)
  const mx = S.michalX - camX;
  if (S.step === "walk" || S.step === "warn") drawSprite(S.step === "warn" && dialog.t > 0 && SPR.michal_talk ? "michal_talk" : "michal_idle", frameOf(S.step === "warn" ? "michal_talk" : "michal_idle", S.t), mx, gy, 1);
  else if (S.step === "rope") drawSprite("michal_rope_loop", drill.on && drill.ready <= 0 && drill.wait <= 0 ? frameOf("michal_rope_loop", S.t) : 0, mx, gy, 1);
  else if (S.step === "down") drawSprite("michal_point", SPR.michal_point.frames - 1, mx, gy, 1);
  const n = SPR.michal_bed ? SPR.michal_bed.frames : 1, bx = S.bedX - camX;
  if (SPR.michal_bed) drawSprite("michal_bed", S.step === "bed" ? Math.min(n - 1, Math.floor(drill.progress * (n - 1))) : S.step === "end" ? n - 1 : 0, bx, gy, 1);
}
function drawW94Over() {
  if (!w94) return;
  const S = w94;
  if (S.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${Math.min(1, S.fade)})`; ctx.fillRect(0, 0, W, H); }
  const e = S.card; if (!e) return;
  const a = Math.min(1, e.t / 1.2);
  ctx.save(); ctx.globalAlpha = a * 0.88; ctx.fillStyle = "#0d0a08"; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = a;
  ctx.textAlign = "center"; ctx.fillStyle = "#f3e6c8";
  ctx.font = "bold 46px Georgia, serif"; ctx.fillText("The Window", W / 2, 220);
  ctx.font = "italic 26px Georgia, serif"; ctx.fillText("So Michal let David down through the window.", W / 2, 300); ctx.fillText("He went away, fled, and escaped.", W / 2, 340);
  ctx.font = "20px Georgia, serif"; ctx.fillStyle = "#cdb98f"; ctx.fillText("1 Samuel 19:12", W / 2, 386);
  ctx.font = "22px sans-serif"; ctx.fillStyle = "#f3e6c8"; ctx.fillText("David, Part Two: the drills test. Thanks for playing!", W / 2, 490);
  if (e.t > 2) { ctx.fillStyle = "#ffd76a"; ctx.fillText("A: play again", W / 2, 560); }
  ctx.restore();
}
