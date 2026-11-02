// Part Two test stage 9-2: the Leap of Faith (DESIGN.md, the Steps of Faith; Glen's idea from The Last Crusade).
// - Glen's film first (assets/video/leap_film.mp4): David walks to the edge, looks down, takes the first step. Cut.
// - The chasm: a ledge above (too high) and a ledge below (too far) look like the way across. They aren't.
// - The way is a bridge straight out from the edge, the color of the rock, nearly invisible. A stone shows itself under
//   David's foot as he WALKS onto it. Jumping (leaping in his own strength) finds nothing: he falls through. Falling
//   costs no heart: back to where he last stood, and the stones he found stay found.
// - Across: Glen's sand-toss film (leap_end.mp4) shows the whole bridge, then the end card (Psalm 18:36).
// Scripture: the World English Bible, checked on ebible.org 2026-10-29.

const LEAP = {
  SLAB_H: 26,            // how thick the bridge stones are drawn, px
  HIDDEN_ALPHA: 0.025,   // an unfound stone: just a shimmer, if you look hard (any more shows against the dark pit)
  SHOW_T: 0.3,           // a found stone fades in this fast, seconds
  GLOW_T: 1.6,           // ...and glows this long (the film's golden edge)
  FALL_FADE: 0.9,        // the black after a fall, seconds
  END_AT: 5,             // the sand-toss film plays this many tiles past the bridge
  // (Glen 2026-11-02: more suspense) a stone shows only once his middle is this far out over the drop, half of him over
  // nothing, as if he's about to walk off. And only to a WALK: the player has to choose to walk; run out and he falls
  REVEAL_IN: 6,
};
const leap = { on: false, c0: 0, c1: -1, found: {}, stand: null, fade: 0, falls: 0, ended: false, card: null, first: true };

function initLeap() {
  const p = setPieces.find(s => s.kind === "leapbridge");
  if (!p) return;
  Object.assign(leap, { on: true, c0: p.c, c1: p.to });
  for (let c = leap.c0; c <= leap.c1; c++) oneway[GR][c] = false;   // nothing to stand on until it's found
}
initLeap();
if (leap.on && !STORY_HASH && !new URLSearchParams(location.search).has("nofilm"))   // (Glen) his film opens the stage
  preFilm.start({ src: "../assets/video/leap_film.mp4", words: [[0.8, 4.4, "The Leap of Faith"]] }, () => {});

const leapGround = c => isSolid(c, GR) || leap.found[c] !== undefined;
function findStone(c) {
  leap.found[c] = 0; oneway[GR][c] = true;
  sfx("stone_hit", c * T, 0.3, 0.6);
  if (leap.first) { leap.first = false; if (typeof chime === "function") { chime(4); setTimeout(() => chime(7), 180); } }
}

function updateLeap(dt) {
  if (!leap.on) return;
  for (const c in leap.found) leap.found[c] += dt;
  if (leap.fade > 0) leap.fade = Math.max(0, leap.fade - dt);
  if (leap.card) { leap.card.t += dt; return; }
  const d = david;
  if (!d.onGround || d.deadT > 0) return;
  if (d.y > GR * T + 10) { leapFall(); return; }   // somehow down on the low ledge: there's no way on from there
  // where a fall puts him back: only where there's a whole tile of found ground ahead and behind, so he never comes back
  // standing half over the edge (Glen 2026-11-02: after running off, he came back with the next stone already showing)
  if (leapGround(Math.floor((d.x + T) / T)) && leapGround(Math.floor((d.x - T) / T))) leap.stand = { x: d.x, y: d.y };
  // walking: a stone shows itself only once his middle is out over it (only next to ground he could already stand on)
  const c = Math.floor((d.x - d.facing * LEAP.REVEAL_IN) / T);
  const walking = Math.abs(d.vx) > 20 && Math.abs(d.vx) <= TUNE.WALK_SPEED + 5 && Math.sign(d.vx) === d.facing;   // stepping out, not standing
  if (walking && c >= leap.c0 && c <= leap.c1 && leap.found[c] === undefined && leapGround(c - d.facing)) findStone(c);
  // across: Glen's sand toss shows the whole bridge
  if (!leap.ended && d.x > (leap.c1 + LEAP.END_AT) * T) {
    leap.ended = true;
    preFilm.start({ src: "../assets/video/leap_end.mp4" }, () => {
      for (let k = leap.c0; k <= leap.c1; k++) if (leap.found[k] === undefined) { leap.found[k] = LEAP.GLOW_T; oneway[GR][k] = true; }
      leap.card = { t: 0 };
    });
  }
}

// the pit (main.js pitFall): no heart lost here, back to where he last stood
function leapFall() {
  if (!leap.on) return false;
  const d = david, s = leap.stand || checkpoint;
  d.x = s.x; d.y = s.y; d.vx = d.vy = 0; setState("idle"); snapCamera();
  leap.fade = LEAP.FALL_FADE;
  toast(leap.falls++ === 0 ? "Not by leaping. Walk straight out, one step at a time." : "Step out in faith.");
  return true;
}

function leapHoldDavid(d, dt) {
  if (!leap.on || !leap.card) return false;
  d.vx = 0; d.charging = false; d.throwT = -1;
  d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt);
  if (d.state !== "idle") setState("idle");
  if (leap.card.t > 2 && pressed("a")) location.reload();
  return true;
}

function drawLeap(camX) {
  if (!leap.on) return;
  const y = GR * T, h = LEAP.SLAB_H;
  for (let c = leap.c0; c <= leap.c1; c++) {
    const x = c * T - camX;
    if (x < -T || x > W + T) continue;
    const age = leap.found[c];
    const a = age === undefined ? LEAP.HIDDEN_ALPHA : LEAP.HIDDEN_ALPHA + (1 - LEAP.HIDDEN_ALPHA) * Math.min(1, age / LEAP.SHOW_T);
    ctx.save(); ctx.globalAlpha = a;
    const g = ctx.createLinearGradient(0, y, 0, y + h);   // sandstone, the color of the cliffs behind it
    g.addColorStop(0, "#d8b07a"); g.addColorStop(0.35, "#c09060"); g.addColorStop(1, "#8a6440");
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x + 1, y, T - 2, h, 4); ctx.fill();
    ctx.fillStyle = "rgba(255,236,200,0.45)"; ctx.fillRect(x + 3, y + 1, T - 6, 3);   // the sunlit top
    ctx.fillStyle = "rgba(70,45,25,0.35)";                                            // a chip and a crack (not every stone alike)
    if (c % 3 === 0) ctx.fillRect(x + 8, y + 12, 9, 2);
    if (c % 4 === 1) ctx.fillRect(x + 20, y + 8, 2, 10);
    if (age !== undefined && age < LEAP.GLOW_T) {   // the golden edge as it shows itself (as in Glen's film)
      const k = 1 - age / LEAP.GLOW_T;
      ctx.globalAlpha = k; ctx.strokeStyle = "#ffc45a"; ctx.lineWidth = 3; ctx.shadowColor = "#ffb030"; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.roundRect(x + 1, y, T - 2, h, 4); ctx.stroke();
      ctx.shadowBlur = 0; ctx.fillStyle = "#e9c48a";   // grit falling away underneath
      for (let i = 0; i < 4; i++) { const f = (age * 1.3 + i * 0.27) % 1; ctx.globalAlpha = k * (1 - f); ctx.fillRect(x + 6 + i * 7, y + h + f * 90, 2, 2); }
    }
    ctx.restore();
  }
}

function drawLeapOver() {
  if (!leap.on) return;
  if (leap.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${Math.min(1, leap.fade / LEAP.FALL_FADE * 1.4)})`; ctx.fillRect(0, 0, W, H); }
  const e = leap.card; if (!e) return;
  const a = Math.min(1, e.t / 1.2);
  ctx.save(); ctx.globalAlpha = a * 0.88; ctx.fillStyle = "#0d0a08"; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = a;
  ctx.textAlign = "center"; ctx.fillStyle = "#f3e6c8";
  ctx.font = "bold 46px Georgia, serif"; ctx.fillText("The Leap of Faith", W / 2, 200);
  ctx.font = "italic 28px Georgia, serif"; ctx.fillText("You have enlarged my steps under me,", W / 2, 300); ctx.fillText("my feet have not slipped.", W / 2, 342);
  ctx.font = "20px Georgia, serif"; ctx.fillStyle = "#cdb98f"; ctx.fillText("Psalm 18:36", W / 2, 392);
  ctx.font = "22px sans-serif"; ctx.fillStyle = "#f3e6c8"; ctx.fillText("David, Part Two: the Leap of Faith test. Thanks for playing!", W / 2, 500);
  if (e.t > 2) { ctx.fillStyle = "#ffd76a"; ctx.fillText("A: play again", W / 2, 560); }
  ctx.restore();
}
