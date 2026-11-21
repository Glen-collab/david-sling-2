// World 7, stop 1: the Hill of Hachilah (1 Samuel 26; WORLD7_PLAN.md). Part Two's ninth region, on region.js's engine:
// loaded before region.js, which takes W7 as its REGION when the address is "#9-13". World 7 is one stage with two stops
// on the land map (Glen 11-21: "like Nob and Gath"): Hachilah now, Ziklag (27; 30) to come, in this same save ("w7").
//
// Glen 11-21: "let's make it a maze so no guards wake. Just play the scene at Saul. Go serve other gods can be in there."
//   The Wilderness of Ziph (the spies, 26:4; "Who will go down with me?", 26:6) -> the Hill of Hachilah by night ->
//   the Place of the Wagons (a maze: three thousand men asleep, 26:12; step over them, crawl under the loaded wagons,
//   climb across the carts) -> Saul's Fire (the spear and the jar, 26:7-12) -> the Far Mountain (the climb; the call
//   across the valley at dawn, 26:13-25). The Journal: Glen's song, Verse 4 (draft, from Psalm 54).
//
// Stand-ins (11-21) till Glen's art (ART_PROMPTS_W7.md): Ziph's pictures darkened to night; the sleepers are Saul's
// lying-down sheet, tinted; the carts are Part One's jar wagon; the loaded wagons are drawn here.

const H7 = {
  NPC_K: 0.9,
  // the night: how dark each room is; the lights round David and the embers (px); the dawn at the call (s)
  DARK: { wild: 0.5, hill: 0.64, wagons: 0.72, fire: 0.72, mountain: 0.66 }, LIT: 240, EMBER: 230, DAWN: 8,
  // the sleepers: how long one is (px); a sleeper that turns over moves ROLL px, taking ROLL_T s, every [a, b] s
  SLEEP_L: 150, ROLL: 64, ROLL_T: 0.7, ROLL_EVERY: [3, 5.5],
  SLEEP_FILTER: "sepia(0.7) hue-rotate(-12deg) saturate(0.8) brightness(1.15)",   // (stand-in: Saul's sheet as a soldier)
  CART_H: 150,             // px the jar cart's drawn (its solid top is 4 rows up)
  ABI_GAP: 95, ABI_K: 4,   // Abishai behind David (px), how quickly he catches up
  SAUL_NEAR: 170,          // px: this close to Saul, the scene plays
};

const W7 = {
  key: "w7", name: "Hachilah", start: "wild", strCap: 10,
  carry: ["gibeah", "ramah", "nobgath", "adullam", "keilah", "ziph", "engedi", "carmel"],
  rooms: [
    { id: "wild", name: "The Wilderness of Ziph", w: 60, bg: "w4_1", mx: 0, my: 1, mw: 2, right: "hill",
      far: "ziph/hills/far", mid: "ziph/hills/mid.png", midY: 0, near: "ziph/hills/near.png" },   // (stand-in: Glen's Ziph, by night)
    { id: "hill", name: "The Hill of Hachilah", w: 90, bg: "w4_1", mx: 2, my: 1, mw: 3, left: "wild", right: "wagons",
      far: "ziph/hachilah/far", mid: "ziph/hachilah/mid.png", midY: 0, near: "ziph/hachilah/near.png" },
    { id: "wagons", name: "The Place of the Wagons", w: 130, bg: "w4_1", mx: 5, my: 1, mw: 4, left: "hill", right: "fire",
      far: "ziph/maon/far", mid: "ziph/maon/mid.png", midY: 0, near: "ziph/maon/near.png" },   // (stand-in till Glen's)
    { id: "fire", name: "Saul's Fire", w: 50, bg: "w4_1", mx: 9, my: 1, mw: 2, left: "wagons",
      get right() { return h7Has("h7_taken") ? "mountain" : null; },
      far: "ziph/maon/far", mid: "ziph/maon/mid.png", midY: 0, near: "ziph/maon/near.png" },
    { id: "mountain", name: "The Far Mountain", w: 70, bg: "w4_1", mx: 11, my: 0, mw: 2, left: "fire",
      far: "ziph/mountain/far", mid: "ziph/mountain/mid.png", midY: 0, near: "ziph/mountain/near.png" },
  ],
  // the Journal: Glen's song, Verse 4 (SONG_PSALM57.md: a first draft, for Glen to change)
  steps: ["h7_start", "h7_camp", "h7_taken", "h7_end"],
  verse: ["Save me, O God, by Your great name", "Listen when I pray", "For strangers rise to seek my soul", "And will not walk Your way",
          "The spear stood waiting at his head", "But I would not strike the king", "You are my helper, You sustain me", "To You my thanks I'll bring"],
  // (draft words, for Glen, 11-21)
  entries: [
    ["The Ziphites told Saul again where I was hiding. He came with three thousand men.", "1 Samuel 26:1–2"],
    ["“Who will go down with me to Saul to the camp?” Abishai said, “I will go down with you.”", "1 Samuel 26:6"],
    ["Saul lay asleep, his spear stuck in the ground at his head. I would not stretch out my hand against the LORD's anointed.", "1 Samuel 26:11"],
    ["I called across the valley. Saul said, “I have sinned. Return, my son David.”", "1 Samuel 26:21"],
  ],
  end: ["The LORD will give to every man his righteousness and his faithfulness.", "1 Samuel 26:23"],
  build: R => h7Build(R), enter: r => h7Enter(r), update: (dt, r) => h7Update(dt, r),
  draw: camX => h7Draw(camX), drawFront: camX => h7DrawFront(camX), drawOver: () => h7DrawOver(),
};

const h7 = { told: {}, people: [], sleepers: [], carts: [], beds: [], embers: [], abi: null, saul: null, dawn: null, call: null };
const h7Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function h7Tell(k, text) { if (!h7.told[k]) { h7.told[k] = true; toast(text); } }
function h7Person(room, spr, x, dir = 1, show = null, k = H7.NPC_K) { const p = { room, spr, x, y: FOOT, dir, show, k, t: Math.random() * 3 }; h7.people.push(p); return p; }
const h7Sc = n => SCALE * (TUNE.SPRITE_SIZE[n] || 1);

// ---------------------------------------------------------------------------------------------------------------------
// building
// a man asleep on the ground from px x0 (one sleeper's length); roll: he turns over now and then, ROLL px that way (+1/-1)
function h7Sleeper(room, x0, dir = 1, roll = 0) { h7.sleepers.push({ room, x0, dir, roll, off: 0, to: 0, t: 1 + Math.random() * 3 }); }
// a jar cart to climb onto: solid, its top 4 rows up, 4 columns wide
function h7Cart(room, c) {
  block(c, GR - 4, 4, 4, 6);   // (material 6: solid, no tiles drawn: the cart picture is what shows) for (let x = c; x < c + 4; x++) for (let r = GR - 4; r < GR; r++) artSolid.add(x + "," + r);
  h7.carts.push({ room, x: (c + 2) * T });
}
// a loaded wagon to crawl under: its bed 3 rows up, its load piled high on top (too high to climb), w columns long
function h7Bed(room, c, w) {
  block(c, GR - 8, w, 6, 6); for (let x = c; x < c + w; x++) for (let r = GR - 8; r < GR - 2; r++) artSolid.add(x + "," + r);
  h7.beds.push({ room, x0: c * T, x1: (c + w) * T });
}
const h7Ember = (room, c) => h7.embers.push({ room, x: c * T + T / 2, t: Math.random() * 5 });

function h7Build(R) {
  for (const k of ["people", "sleepers", "carts", "beds", "embers"]) h7[k].length = 0;
  h7.dawn = null; h7.call = null; h7.saul = null;
  h7.abi = { x: 0, y: GR * T, t: 0, on: false, moving: false };

  // -- The Wilderness of Ziph (26:3-6): David's men; the spies come back; Abishai
  let c = R("wild");
  { const rm = "wild", X = k => (c + k) * T;
    ground(c, c + 59);
    campfire(c + 3, GR - 1); h7Ember(rm, c + 24);
    h7.abiCamp = h7Person(rm, "abishai_idle", X(30), -1, () => !h7.abi.on);
    rTalker(h7.abiCamp, () => [["Abishai", h7Has("h7_start") ? "I'm with you. Let's go down to the camp." : "The Ziphites told Saul where we are. He's come with three thousand men."]]);
    rTalker(h7Person(rm, "soldier_talk", X(38), -1, null, 0.76), () => [["Ahimelech the Hittite", "Saul's camp is on the hill of Hachilah, by the road. They've parked the wagons all round him."]]);
    h7Person(rm, "asahel_idle", X(44), -1);
  }

  // -- The Hill of Hachilah by night (26:3, 26:5): down toward the camp's fires; two gaps
  c = R("hill");
  { const rm = "hill";
    ground(c, c + 89);
    rHole(rm, c + 28, 4); rHole(rm, c + 56, 5);
    rLedge(rm, c + 40, GR * T - 120, 4); rLedge(rm, c + 70, GR * T - 120, 3);
    h7Ember(rm, c + 84);
  }

  // -- The Place of the Wagons (26:5, 7, 12): the maze. Nobody wakes; the men lie in the way
  c = R("wagons");
  { const rm = "wagons", X = k => (c + k) * T, L = H7.SLEEP_L;
    ground(c, c + 129);
    campfire(c + 3, GR - 1);
    h7Sleeper(rm, X(10), 1);                                       // one to step over
    h7Sleeper(rm, X(18), -1); h7Sleeper(rm, X(18) + L + 110, 1, -1); // a gap that closes when he turns over
    h7Bed(rm, c + 32, 7);                                           // crawl under the loaded wagon
    h7Cart(rm, c + 44); h7Sleeper(rm, X(48), 1); h7Sleeper(rm, X(48) + L, -1);      // too many in a row: across the carts
    h7Cart(rm, c + 57); h7Sleeper(rm, X(61), -1); h7Sleeper(rm, X(61) + L, 1);
    h7Cart(rm, c + 70);
    h7Bed(rm, c + 80, 8);
    h7Sleeper(rm, X(94), 1); h7Sleeper(rm, X(94) + L + 110, -1, -1); h7Sleeper(rm, X(94) + 2 * L + 220, 1, -1);   // gaps that open and close
    h7Ember(rm, c + 27); h7Ember(rm, c + 76); h7Ember(rm, c + 120);
  }

  // -- Saul's Fire (26:7-12): the king asleep, the spear stuck in the ground at his head, the jar; Abner by him
  c = R("fire");
  { const rm = "fire", X = k => (c + k) * T;
    ground(c, c + 49);
    h7Sleeper(rm, X(8), 1);
    h7Ember(rm, c + 22);
    h7.saul = { room: rm, x: X(27) };
    h7Sleeper(rm, X(31), -1);   // (Abner, stand-in)
    h7Sleeper(rm, X(40), 1);
  }

  // -- The Far Mountain (26:13): up the other side, "a great space being between them"
  c = R("mountain");
  { const rm = "mountain";
    ground(c, c + 69);
    campfire(c + 3, GR - 1);
    rLedge(rm, c + 18, GR * T - 110, 4); rLedge(rm, c + 27, GR * T - 210, 4); rLedge(rm, c + 36, GR * T - 310, 4);
    rLedge(rm, c + 46, GR * T - 400, 20);
    h7.top = { x: (c + 50) * T, y: GR * T - 400 };
  }
}

// ---------------------------------------------------------------------------------------------------------------------
function h7Enter(r) {
  if (r.id === "hill") h7Tell("hill", "The Hill of Hachilah. Saul's camp is down there: the embers of its fires.");
  if (r.id === "wagons" && !h7Has("h7_camp")) {
    regionAdd("taken", "h7_camp");
    rPlay([{ say: ["", "Then David arose and came to the place where Saul had encamped; and David saw the place where Saul lay, with Abner the son of Ner, the captain of his army. Saul lay within the place of the wagons, and the people were encamped around him. (1 Samuel 26:5)"] },
      { fn() { toast("Three thousand men, asleep. Step over them (jump), crawl under the loaded wagons (Down), climb across the carts. Nobody wakes."); } }]);
  }
  if (r.id === "mountain" && h7Has("h7_taken")) h7Tell("mtn", "The Far Mountain: up to the top, a great space between you and the camp.");
  if (h7.abi.on) { h7.abi.x = david.x - david.facing * H7.ABI_GAP; h7.abi.y = david.y; }
}

function h7Update(dt, r) {
  const d = david, free = !region.script.length && region.wait <= 0 && !region.trans && !(dialog.t > 0);
  for (const p of h7.people) p.t += dt;
  for (const e of h7.embers) e.t += dt;
  // the start (after the crawl): 26:1-6
  if (!h7Has("h7_start") && !h7.started && free && r.id === "wild") { h7.started = true; h7Start(); }
  // Abishai comes behind
  const A = h7.abi;
  if (A.on) {
    const tx = d.x - d.facing * H7.ABI_GAP, was = A.x;
    A.x += (tx - A.x) * Math.min(1, dt * H7.ABI_K); A.y += (d.y - A.y) * Math.min(1, dt * H7.ABI_K * 1.5);
    A.moving = Math.abs(A.x - was) > 30 * dt; A.face = Math.sign(tx - was) || A.face || 1; A.t += dt;
  }
  // the sleepers: they turn over now and then; nobody can walk through one (step over)
  for (const s of h7.sleepers) {
    if (s.room !== r.id) continue;
    if (s.roll) { s.t -= dt; if (s.t <= 0) { s.to = s.to ? 0 : s.roll * H7.ROLL; const [a, b] = H7.ROLL_EVERY; s.t = a + Math.random() * (b - a); }
      s.off += Math.sign(s.to - s.off) * Math.min(Math.abs(s.to - s.off), H7.ROLL / H7.ROLL_T * dt); }
    const x0 = s.x0 + s.off, x1 = x0 + H7.SLEEP_L, half = BODY_W / 2;
    if (d.onGround && d.y >= GR * T - 2 && d.x + half > x0 && d.x - half < x1) {
      d.x = d.x < (x0 + x1) / 2 ? x0 - half - 1 : x1 + half + 1; d.vx = 0;
      h7Tell("step", "Shh! Don't step on him. Jump over.");
    }
  }
  // Saul's head: the scene (26:7-12)
  if (r.id === "fire" && !h7Has("h7_taken") && free && d.onGround && Math.abs(d.x - h7.saul.x) < H7.SAUL_NEAR) h7Saul();
  // the top of the far mountain: the call (26:13-25)
  if (r.id === "mountain" && h7Has("h7_taken") && !h7Has("h7_end") && !h7.call && free && d.onGround && d.y <= h7.top.y + 4 && d.x > h7.top.x) h7Call();
  if (h7.dawn) h7.dawn.t += dt;
}

const H7_SAY = (who, text) => ({ say: [who, text] });
function h7Start() {
  rPlay([
    H7_SAY("", "The Ziphites came to Saul to Gibeah, saying, “Doesn't David hide himself in the hill of Hachilah, which is before the desert?” Then Saul arose and went down to the wilderness of Ziph, having three thousand chosen men of Israel with him, to seek David in the wilderness of Ziph. (1 Samuel 26:1-2)"),
    H7_SAY("", "Saul encamped in the hill of Hachilah, which is before the desert, by the way. But David stayed in the wilderness, and he saw that Saul came after him into the wilderness. David therefore sent out spies, and understood that Saul had certainly come. (1 Samuel 26:3-4)"),
    H7_SAY("David", "“Who will go down with me to Saul to the camp?” (1 Samuel 26:6)"),
    H7_SAY("Abishai", "“I will go down with you.” (1 Samuel 26:6)"),
    { fn() { regionAdd("taken", "h7_start"); const A = h7.abi; A.on = true; A.x = h7.abiCamp.x; A.y = GR * T;
      toast("Go down to Saul's camp by night, with Abishai (right)."); } },
  ]);
}
function h7Saul() {
  rPlay([
    H7_SAY("", "So David and Abishai came to the people by night; and, behold, Saul lay sleeping within the place of the wagons, with his spear stuck in the ground at his head; and Abner and the people lay around him. (1 Samuel 26:7)"),
    { fn() { h7.abiPose = "abishai_kneel_point"; } },
    H7_SAY("Abishai", "“God has delivered up your enemy into your hand today. Now therefore please let me strike him with the spear to the earth at one stroke, and I will not strike him the second time.” (1 Samuel 26:8)"),
    H7_SAY("David", "“Don't destroy him, for who can stretch out his hand against the LORD's anointed, and be guiltless?” (1 Samuel 26:9)"),
    H7_SAY("David", "“As the LORD lives, the LORD will strike him; or his day shall come to die, or he shall go down into battle and perish. The LORD forbid that I should stretch out my hand against the LORD's anointed; but now please take the spear that is at his head and the jar of water, and let's go.” (1 Samuel 26:10-11)"),
    { fn() { h7.abiPose = null; regionAdd("taken", "h7_taken"); } }, { wait: 0.6 },
    H7_SAY("", "So David took the spear and the jar of water from Saul's head, and they went away. No man saw it, or knew it, nor did any awake; for they were all asleep, because a deep sleep from the LORD had fallen on them. (1 Samuel 26:12)"),
    { fn() { toast("Away to the other side: on through the camp and up the far mountain (right)."); } },
  ]);
}
function h7Call() {
  h7.call = true; h7.dawn = { t: 0 };
  rPlay([
    H7_SAY("", "Then David went over to the other side, and stood on the top of the mountain far away, a great space being between them; (1 Samuel 26:13)"),
    H7_SAY("David", "“Don't you answer, Abner?” (1 Samuel 26:14)"),
    H7_SAY("Abner", "“Who are you who calls to the king?” (1 Samuel 26:14)"),
    H7_SAY("David", "“Aren't you a man? Who is like you in Israel? Why then have you not kept watch over your lord the king? For one of the people came in to destroy your lord the king. This thing isn't good that you have done. As the LORD lives, you are worthy to die, because you have not kept watch over your lord, the LORD's anointed. Now see where the king's spear is, and the jar of water that was at his head.” (1 Samuel 26:15-16)"),
    H7_SAY("Saul", "“Is this your voice, my son David?” (1 Samuel 26:17)"),
    H7_SAY("David", "“It is my voice, my lord, O king. Why does my lord pursue his servant? For what have I done? What evil is in my hand?” (1 Samuel 26:17-18)"),
    H7_SAY("David", "“Now therefore, please let my lord the king hear the words of his servant. If it is so that the LORD has stirred you up against me, let him accept an offering. But if it is the children of men, they are cursed before the LORD; for they have driven me out today that I shouldn't cling to the LORD's inheritance, saying, ‘Go, serve other gods!’ (1 Samuel 26:19)"),
    H7_SAY("David", "“Now therefore, don't let my blood fall to the earth away from the presence of the LORD; for the king of Israel has come out to seek a flea, as when one hunts a partridge in the mountains.” (1 Samuel 26:20)"),
    H7_SAY("Saul", "“I have sinned. Return, my son David; for I will no more do you harm, because my life was precious in your eyes today. Behold, I have played the fool, and have erred exceedingly.” (1 Samuel 26:21)"),
    H7_SAY("David", "“Behold the spear, O king! Let one of the young men come over and get it.” (1 Samuel 26:22)"),
    { fn() { h7.spearDown = true; } },
    H7_SAY("David", "“The LORD will give to every man his righteousness and his faithfulness; because the LORD delivered you into my hand today, and I wouldn't stretch out my hand against the LORD's anointed. Behold, as your life was respected today in my eyes, so let my life be respected in the LORD's eyes, and let him deliver me out of all oppression.” (1 Samuel 26:23-24)"),
    H7_SAY("Saul", "“You are blessed, my son David. You will both do mightily, and will surely prevail.” (1 Samuel 26:25)"),
    H7_SAY("", "So David went his way, and Saul returned to his place. (1 Samuel 26:25)"),
    { fn() { regionAdd("taken", "h7_end"); toast("Saul's jar of water: David keeps it."); } }, { wait: 1.2 },
    { fn() { jsceneOpen(true); } },
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function h7DrawSleeper(s, camX) {
  const n = "saul_lie", S = SPR[n]; if (!S) return;
  const k = H7.SLEEP_L / (S.w * h7Sc(n)), sc = h7Sc(n) * k, x0 = s.x0 + s.off - camX;
  if (x0 > W + 50 || x0 + H7.SLEEP_L < -50) return;
  const x = s.dir > 0 ? x0 + S.ax * sc : x0 + (S.w - S.ax) * sc;
  drawSprite(n, 0, x, FOOT, s.dir, k, 1, H7.SLEEP_FILTER);
}
function h7Draw(camX) {
  const r = region.room; if (!r) return;
  for (const e of h7.embers) if (e.room === r.id) {   // a fire burned down to embers
    const x = e.x - camX, f = 0.75 + 0.25 * Math.sin(e.t * 3.1) * Math.sin(e.t * 1.7);
    const g = ctx.createRadialGradient(x, FOOT - 6, 2, x, FOOT - 6, 46);
    g.addColorStop(0, `rgba(255,190,90,${0.95 * f})`); g.addColorStop(0.4, `rgba(230,90,30,${0.7 * f})`); g.addColorStop(1, "rgba(120,30,10,0)");
    ctx.fillStyle = g; ctx.fillRect(x - 50, FOOT - 56, 100, 60);
    ctx.fillStyle = "#3a2a20"; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(x + i * 13, FOOT - 2, 8, 5, 0, 0, Math.PI * 2); ctx.fill(); }
  }
  for (const c of h7.carts) if (c.room === r.id) { const im = ITEM.wagon_jars; if (im && im.naturalWidth) drawItem("wagon_jars", c.x - camX, FOOT, H7.CART_H / im.naturalHeight); }
  for (const s of h7.sleepers) if (s.room === r.id) h7DrawSleeper(s, camX);
  if (h7.saul && h7.saul.room === r.id) {   // Saul asleep; once they're taken, without the spear and the jar (stand-in: clipped off)
    const n = "saul_sleep", S = SPR[n];
    if (S) { const sc = h7Sc(n), x = h7.saul.x - camX;
      ctx.save(); if (h7Has("h7_taken")) { ctx.beginPath(); ctx.rect(x - S.ax * sc - 10, 0, (148 - 0) * sc + 10, H); ctx.clip(); }
      drawSprite(n, frameOf(n, performance.now() / 1000), x, FOOT, 1, 1); ctx.restore(); }
  }
  for (const p of h7.people) if (p.room === r.id && (!p.show || p.show())) drawSprite(p.spr, frameOf(p.spr, p.t), p.x - camX, p.y, p.dir, p.k);
  const A = h7.abi;
  if (A.on) {
    const crouch = david.h === LOW_H, n = h7.abiPose || (A.moving ? (crouch ? "abishai_sneak" : "abishai_walk") : (crouch ? "abishai_sneak" : "abishai_idle"));
    drawSprite(n, A.moving || h7.abiPose ? frameOf(n, A.t) : 0, A.x - camX, Math.min(FOOT, A.y + 4), h7.abiPose ? 1 : A.face, 1);
  }
}
function h7DrawFront(camX) {
  const r = region.room; if (!r) return;
  for (const b of h7.beds) if (b.room === r.id) {   // the loaded wagon (stand-in): its bed, wheels, the load piled under a cloth
    const x0 = b.x0 - camX, x1 = b.x1 - camX, by = GR * T - 3 * T;
    if (x1 < -60 || x0 > W + 60) continue;
    ctx.save();
    ctx.fillStyle = "#4b3420"; ctx.fillRect(x0 - 6, by - 6, x1 - x0 + 12, 22);
    ctx.fillStyle = "#6b4a2c"; for (let x = x0; x < x1; x += 36) ctx.fillRect(x + 2, by - 4, 32, 6);
    const lg = ctx.createLinearGradient(0, by - 200, 0, by);
    lg.addColorStop(0, "#7d6a52"); lg.addColorStop(1, "#5b4a38");
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(x0, by - 6);
    ctx.quadraticCurveTo(x0 + 10, by - 190, (x0 + x1) / 2, by - 200); ctx.quadraticCurveTo(x1 - 10, by - 190, x1, by - 6); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#3a2c1e"; ctx.lineWidth = 3; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x0 + 10, by - 50 * i); ctx.lineTo(x1 - 10, by - 50 * i + 8); ctx.stroke(); }
    for (const wx of [x0 + 28, x1 - 28]) { ctx.fillStyle = "#3e2a18"; ctx.beginPath(); ctx.arc(wx, FOOT - 40, 40, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#5e4128"; ctx.beginPath(); ctx.arc(wx, FOOT - 40, 30, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#2a1c10"; ctx.beginPath(); ctx.arc(wx, FOOT - 40, 8, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  // David with the spear and the jar (stand-ins: Glen's spear, the water pitcher)
  if (h7Has("h7_taken") && !h7Has("h7_end") || h7.call && !h7.spearDown) {
    const d = david, x = d.x - camX, y = d.y - (d.h === LOW_H ? 30 : 70);
    if (!h7.spearDown && ITEM.saul_spear) { ctx.save(); ctx.translate(x, y); ctx.scale(d.facing, 1); ctx.drawImage(ITEM.saul_spear, -95, -45, 190, 110); ctx.restore(); }
    if (ITEM.water_pitcher) drawItem("water_pitcher", x + d.facing * 26, d.y - (d.h === LOW_H ? 14 : 40), 0.04);
  }
  // across the valley, at the call: Saul and Abner far off and small, by the camp
  if (r.id === "mountain" && h7.call) {
    drawSprite("saul_talk", 0, 150, FOOT, 1, 0.45, 0.85); drawSprite("abner_talk", 0, 210, FOOT, 1, 0.45, 0.85);
  }
}
const H7_DARK = typeof document !== "undefined" ? document.createElement("canvas") : null;
function h7DrawOver() {
  const r = region.room; if (!r) return;
  let dark = H7.DARK[r.id] || 0;
  if (r.id === "mountain" && h7.dawn) dark *= Math.max(0, 1 - h7.dawn.t / H7.DAWN);
  if (h7Has("h7_end") && !h7.call) dark *= 0.3;   // (after: come back in the day, nearly)
  if (dark <= 0 || !H7_DARK) return;
  if (H7_DARK.width !== W || H7_DARK.height !== H) { H7_DARK.width = W; H7_DARK.height = H; }
  const x2 = H7_DARK.getContext("2d");
  x2.globalCompositeOperation = "source-over"; x2.clearRect(0, 0, W, H);
  if (h7.dawn && r.id === "mountain") { x2.fillStyle = `rgba(255,140,70,${0.16 * Math.min(1, h7.dawn.t / 2)})`; x2.fillRect(0, 0, W, H); }
  x2.fillStyle = `rgba(6,10,28,${dark})`; x2.fillRect(0, 0, W, H); x2.globalCompositeOperation = "destination-out";
  const lights = [[david.x - camX, david.y - 90 - camY, H7.LIT]];
  for (const e of h7.embers) if (e.room === r.id) lights.push([e.x - camX, FOOT - 30 - camY, H7.EMBER]);
  for (const [lx, ly, rad] of lights) {
    const g = x2.createRadialGradient(lx, ly, rad * 0.2, lx, ly, rad); g.addColorStop(0, "rgba(0,0,0,0.85)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x2.fillStyle = g; x2.fillRect(lx - rad, ly - rad, rad * 2, rad * 2);
  }
  ctx.drawImage(H7_DARK, 0, 0);
}
