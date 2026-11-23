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
// Stand-ins (11-21) till Glen's art (ART_PROMPTS_W7.md): Ziph's pictures darkened to night; the sleepers are
// Glen's sleeping soldier (11-21). The Place of the Wagons is Glen's (11-21): far/mid/near and the kit (w7_cart, w7_box, the baggage).

const H7 = {
  NPC_K: 0.9,
  // the night: how dark each room is; the lights round David and the embers (px); the dawn at the call (s)
  DARK: { wild: 0.5, hill: 0.55, wagons: 0.72, fire: 0.72, mountain: 0.66 }, LIT: 240, EMBER: 230, DAWN: 8,
  // the sleepers: how long one is (px); a sleeper that turns over moves ROLL px, taking ROLL_T s, every [a, b] s
  SLEEP_L: 150, ROLL: 64, ROLL_T: 0.7, ROLL_EVERY: [3, 5.5],
  SLEEP_FILTER: "sepia(0.7) hue-rotate(-12deg) saturate(0.8) brightness(1.15)",   // (stand-in: Saul's sheet as a soldier)
  CART_H: 150, BED_W: 17, BED_H: 290, FIRE_H: 74, SPEAR_L: 200, JAR_H: 34,             // px the jar cart's drawn (its solid top is 4 rows up)
  ABI_GAP: 95, ABI_K: 4,   // Abishai behind David (px), how quickly he catches up
  CRUMBLE: { SHAKE: 0.7, BACK: 4 },   // a crumbly ledge: shakes this long under him, then falls; back this long after
  STIR: { NEAR: 10, HOLD: 4 },        // land on a sleeper: he shoves you off, and the men within NEAR columns roll over and lie there HOLD s
  SAUL_NEAR: 70,           // px: this close to the spear at Saul's head, the scene plays
  // Glen's clips (11-23). Saul's head is to the left (David comes in from the left); the taking is his clip, flipped:
  SAUL_K: 0.83,            // saul_sleep drawn this size, so the clip of the taking (at David's size) lines up with it
  TAKE_DX: [110, 121],     // where David is in david_take, sheet px from the spear: at the start, at the end
  CREEP_RATE: 1.6,         // david_creep's steps, sped up to his walking speed
  ABNER_H: 76,             // px: Abner asleep against a cart wheel (Glen's still)
  FAR_K: 0.45,             // Saul and Abner across the valley, at the call
  FAR_GLOW: [185, 30, 120],   // the light round them: screen x, px above the ground, radius
  YOUNG_K: 1, YOUNG_SPEAR: [81, 314, 231], YOUNG_WAIT: 0.8,   // the young man for the spear (26:22): the spear in his sheet (x0, x1, y)
};

const W7 = {
  key: "w7", name: "Hachilah", start: "wild", strCap: 10,
  carry: ["gibeah", "ramah", "nobgath", "adullam", "keilah", "ziph", "engedi", "carmel"],
  rooms: [
    { id: "wild", name: "The Wilderness of Ziph", w: 96, bg: "w4_1", mx: 0, my: 1, mw: 3, right: "hill",
      far: "ziph/hills/far", mid: "ziph/hills/mid.png", midY: 0, near: "ziph/hills/near.png" },   // (stand-in: Glen's Ziph, by night)
    { id: "hill", name: "The Hill of Hachilah", w: 90, up: 16, bg: "w4_1", mx: 3, my: 0, mw: 3, mh: 2, left: "wild", right: "wagons",   /* (Glen 11-23: up ridges, like Gibeah's tower: rock ledges, long and short, some crumbly) */
      far: "ziph/hachilah/far", mid: "ziph/hachilah/mid.png", midY: 0, near: "ziph/hachilah/near.png" },
    { id: "wagons", name: "The Place of the Wagons", w: 130, bg: "w4_1", mx: 6, my: 1, mw: 4, left: "hill", right: "fire",
      far: "w7/wagons/far", mid: "w7/wagons/mid.png", midY: 330, near: "w7/wagons/near.png", nearK: 0.5 },   // (Glen's, 11-21)
    { id: "fire", name: "Saul's Fire", w: 50, bg: "w4_1", mx: 10, my: 1, mw: 2, left: "wagons",
      get right() { return h7Has("h7_taken") ? "mountain" : null; },
      far: "w7/wagons/far", mid: "w7/wagons/mid.png", midY: 330, near: "w7/wagons/near.png", nearK: 0.5 },
    { id: "mountain", name: "The Far Mountain", w: 70, bg: "w4_1", mx: 12, my: 0, mw: 2, left: "fire",
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
  build: R => { h7Build(R);   // (Glen 11-23: Hachilah's own pit edges, assets/rooms/w7/kit; started from Carmel's, which match this soil)
    for (const p of region.props) if (p.n === "p_left" || p.n === "p_right") p.n = p.n === "p_left" ? "h7_pit_left" : "h7_pit_right";
    kitImg("h7_pit_left"); kitImg("h7_pit_right"); }, enter: r => h7Enter(r), update: (dt, r) => h7Update(dt, r),
  drawDavid: (d, x, y) => h7DrawDavid(d, x, y),
  dialogY: h => region.room && region.room.id === "mountain" && h7.call ? H - 24 - h : null,   // (at the call, the lines go low: the mountaintop is up where they'd be)
  draw: camX => h7Draw(camX), drawFront: camX => h7DrawFront(camX), drawOver: () => h7DrawOver(),
};

const h7 = { told: {}, people: [], sleepers: [], carts: [], beds: [], embers: [], props: [], rocks: [], abi: null, saul: null, abner: null, dawn: null, call: null, take: null, young: null, wake: null };
const h7Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function h7Tell(k, text) { if (!h7.told[k]) { h7.told[k] = true; toast(text); } }
function h7Person(room, spr, x, dir = 1, show = null, k = H7.NPC_K) { const p = { room, spr, x, y: FOOT, dir, show, k, t: Math.random() * 3 }; h7.people.push(p); return p; }
// a rock ledge of Glen's (adullam.js's kit: rock sand/red/pale/dark/moss, size s/m/l) from column k of the room, its
//  walking surface at sy (px); crumbly: it shakes when he stands on it, falls, and comes back
function h7Rock(room, rock, size, k, sy, crumbly = false) {
  const c0r = roomById(room).c0, x = (c0r + k) * T;
  if (!crumbly) return r4L(room, rock, size, x, sy);
  const n = `w4_ledge_${rock}_${size}`, K = KIT[n], y = sy - K.top - Math.round(K.h * R4.STAND);
  const c0 = Math.ceil((x + 10) / T), c1 = Math.floor((x + K.w - 10) / T);
  platAt(c0, sy, Math.max(1, c1 - c0));
  h7.rocks.push({ room, n, x, y, sy, c0, w: Math.max(1, c1 - c0), state: "whole", t: 0 });
}
function h7RockUpdate(dt, r) {
  const d = david, C = H7.CRUMBLE;
  for (const k of h7.rocks) {
    if (k.room !== r.id) continue;
    const on = d.onGround && Math.abs(d.y - k.sy) < 3 && d.x > k.c0 * T - 12 && d.x < (k.c0 + k.w) * T + 12;
    if (k.state === "whole" && on) { k.state = "shake"; k.t = 0; h7Tell("crumble", "That rock's crumbling! Keep moving."); }
    else if (k.state === "shake") { k.t += dt; if (k.t > C.SHAKE) {
      k.state = "gone"; k.t = 0; const row = Math.floor(k.sy / T);
      for (let x = k.c0; x < k.c0 + k.w; x++) { oneway[row][x] = false; onewayTop.delete(row * COLS + x); }
      for (let i = 0; i < 12; i++) bits.push({ x: k.x + Math.random() * KIT[k.n].w, y: k.sy, vx: (Math.random() - 0.5) * 220, vy: -Math.random() * 180, life: 0.9, color: i % 2 ? "#7b6a55" : "#b09a7c" });
    } }
    else if (k.state === "gone") { k.t += dt; if (k.t > C.BACK && !(d.x > k.x - 20 && d.x < k.x + KIT[k.n].w + 20 && Math.abs(d.y - k.sy) < 60)) { k.state = "whole"; k.t = 0; platAt(k.c0, k.sy, k.w); } }
  }
}
function h7RockDraw(camX) {
  for (const k of h7.rocks) {
    if (k.room !== region.room.id) continue;
    const im = kitImg(k.n), K = KIT[k.n]; if (!im) continue;
    const x = k.x - camX; if (x > W + 50 || x + K.w < -50) continue;
    let dy = 0, a = 1, j = 0;
    if (k.state === "shake") j = (Math.random() - 0.5) * 6 * Math.min(1, k.t / 0.3 + 0.3);
    if (k.state === "gone") { if (k.t > 1) continue; dy = k.t * k.t * 700; a = 1 - k.t; }
    else if (k.state === "whole" && k.t === 0 && k.back) a = 1;
    ctx.save(); ctx.globalAlpha = a; ctx.drawImage(im, Math.round(x + j), Math.round(k.y + dy), K.w, K.h); ctx.restore();
  }
}
const h7Now = () => performance.now() / 1000;   // (real time: the stage holds still while a line waits for A, these clips don't)
const h7Sc = n => SCALE * (TUNE.SPRITE_SIZE[n] || 1);

// ---------------------------------------------------------------------------------------------------------------------
// building
// a man asleep on the ground from px x0 (one sleeper's length); roll: he turns over now and then, ROLL px that way (+1/-1)
function h7Sleeper(room, x0, dir = 1, roll = 0) {
  const i = h7.sleepers.length, man = roll ? 2 + (i % 2) : H7_STILL[i % H7_STILL.length];
  h7.sleepers.push({ room, x0, dir, roll, man, off: 0, to: 0, t: 1 + Math.random() * 3 });
}
// a cart tipped on its end to climb onto (Glen's w7_box, 11-21): solid, its top 3 rows up, 4 columns wide
function h7Cart(room, c) {
  block(c, GR - 3, 4, 3, 6);   // (material 6: solid, no tiles drawn: the cart picture is what shows) for (let x = c; x < c + 4; x++) for (let r = GR - 3; r < GR; r++) artSolid.add(x + "," + r);
  h7.carts.push({ room, x: (c + 2) * T });
}
// a loaded wagon to crawl under (Glen's w7_cart, 11-21): its bed 2 rows up, its load piled high (too high to climb), w columns long
function h7Bed(room, c, w) {
  block(c, GR - 8, w, 6, 6); for (let x = c; x < c + w; x++) for (let r = GR - 8; r < GR - 2; r++) artSolid.add(x + "," + r);
  h7.beds.push({ room, x0: c * T, x1: (c + w) * T });
}
const h7Prop = (room, name, x, h, dir = 1) => h7.props.push({ room, name, x, h, dir });
const h7Ember = (room, c) => h7.embers.push({ room, x: c * T + T / 2, t: Math.random() * 5 });

function h7Build(R) {
  for (const k of ["people", "sleepers", "carts", "beds", "embers", "props", "rocks"]) h7[k].length = 0;
  if (typeof R4_KIT !== "undefined") Object.assign(KIT, R4_KIT);   // (adullam.js's rock ledges, Glen's)
  h7.dawn = null; h7.call = null; h7.saul = null; h7.spearDown = false; h7.take = null; h7.young = null; h7.wake = null; h7.abner = null;
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
    // (Glen 11-23: "no scorpions, no ibex ... an easy stroll") out of the camp toward the hill: the wilderness bites
    critter("scorpion", c + 54, GR - 1, 2);
    h7Rock(rm, "sand", "m", 58, 504); critter("scorpion", c + 60, 13, 1);
    rWild("viper", rm, c + 66);
    rHole(rm, c + 70, 3);
    rBoulder(rm, c + 76); rWild("ibex", rm, c + 86, { range: 3 });
    h7Rock(rm, "sand", "s", 81, 468);
    critter("scorpion", c + 92, GR - 1, 2);
  }

  // -- The Hill of Hachilah by night (26:3, 26:5): down toward the camp's fires; two gaps
  c = R("hill");
  { const rm = "hill";
    // (Glen 11-23: "go up ridges like the tower was in Gibeah ... ledges and rocks. Long and short, some crumbly some
    //  not") up the hill a rock at a time, over a gully (fall in: a heart, and back), along the ridge past an ibex, and
    //  down toward the camp's fires. Surfaces on whole rows (px): 504 396 288 180 72 -36 -144. *: crumbly
    ground(c, c + 89);
    campfire(c + 3, GR - 1);
    rHole(rm, c + 14, 62);
    h7Rock(rm, "sand", "m", 10, 504); h7Rock(rm, "sand", "s", 17.5, 396); h7Rock(rm, "red", "l", 12, 288);
    h7Rock(rm, "pale", "m", 21, 180, true); h7Rock(rm, "red", "s", 27, 72);
    h7Rock(rm, "sand", "l", 31.5, -36); critter("scorpion", c + 35, -2, 2);
    h7Rock(rm, "pale", "m", 41.5, -36, true);
    h7Rock(rm, "red", "l", 48.5, -144); h7Rock(rm, "red", "l", 55.8, -144); rWild("ibex", rm, c + 59, { y: -144, hy: -144, range: 2 });
    h7Rock(rm, "sand", "s", 65, -36); h7Rock(rm, "pale", "m", 69, 108, true); critter("scorpion", c + 72, 2, 1);
    h7Rock(rm, "sand", "s", 75.5, 324);
    h7Ember(rm, c + 84);
  }

  // -- The Place of the Wagons (26:5, 7, 12): the maze. Nobody wakes; the men lie in the way
  c = R("wagons");
  { const rm = "wagons", X = k => (c + k) * T, L = H7.SLEEP_L;
    ground(c, c + 129);
    campfire(c + 3, GR - 1);
    h7Sleeper(rm, X(10), 1);                                       // one to step over
    h7Sleeper(rm, X(18), -1); h7Sleeper(rm, X(18) + L + 110, 1, -1); // a gap that closes when he turns over
    h7Bed(rm, c + 30, H7.BED_W);                                    // crawl under the loaded wagon
    h7Cart(rm, c + 52); h7Sleeper(rm, X(56), 1); h7Sleeper(rm, X(56) + L, -1);      // too many in a row: across the carts
    h7Cart(rm, c + 65); h7Sleeper(rm, X(69), -1); h7Sleeper(rm, X(69) + L, 1);
    h7Cart(rm, c + 78);
    h7Bed(rm, c + 85, H7.BED_W);
    h7Sleeper(rm, X(106), 1); h7Sleeper(rm, X(106) + L + 110, -1, -1); h7Sleeper(rm, X(106) + 2 * L + 220, 1, -1);   // gaps that open and close
    h7Ember(rm, c + 25); h7Ember(rm, c + 49); h7Ember(rm, c + 126);
    // (Glen's kit, 11-21: the camp's baggage, not solid)
    h7Prop(rm, "w7_baggage", X(8), 110, -1); h7Prop(rm, "w7_amphora", X(21.5), 62); h7Prop(rm, "w7_sack", X(49.5), 46);
    h7Prop(rm, "w7_yoke", X(63.5), 54); h7Prop(rm, "w7_hay", X(76), 44); h7Prop(rm, "w7_rope", X(103.5), 34);
    h7Prop(rm, "w7_sack3", X(104.5), 48); h7Prop(rm, "w7_wheel", X(118), 62);
  }

  // -- Saul's Fire (26:7-12): the king asleep, the spear stuck in the ground at his head, the jar; Abner by him
  c = R("fire");
  { const rm = "fire", X = k => (c + k) * T;
    ground(c, c + 49);
    h7Sleeper(rm, X(8), 1);
    h7Ember(rm, c + 18);   // (Abishai waits by it while David takes the spear)
    h7.saul = { room: rm, x: X(29) };   // (the spear at his head; he lies to the right of it)
    h7.abner = { room: rm, x: X(34) };   // (Glen's, 11-23: asleep against a cart wheel, 26:7)
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
  h7RockUpdate(dt, r);
  // the start (after the crawl): 26:1-6
  if (!h7Has("h7_start") && !h7.started && free && r.id === "wild") { h7.started = true; h7Start(); }
  // Abishai comes behind
  const A = h7.abi;
  if (A.on && h7.call && !h7Has("h7_end")) { A.x = d.x - d.facing * H7.ABI_GAP; A.y = d.y; A.moving = false; A.face = d.facing; }   // (Glen 11-23: at the call he stands behind David, still)
  else if (A.on) {
    // (on the hill's rocks he'd float beside David: he takes his own way up, out of sight, and is behind him again on the ground)
    const away = r.id === "hill" && d.y < GR * T - 8;
    A.a = Math.max(0, Math.min(1, (A.a ?? 1) + (away ? -dt * 4 : dt * 2.5)));
    if (away || A.a < 0.05) { A.x = d.x - d.facing * H7.ABI_GAP; A.y = Math.max(d.y, GR * T - 2); }
    const tx = d.x - d.facing * H7.ABI_GAP, was = A.x;
    A.x += (tx - A.x) * Math.min(1, dt * H7.ABI_K); A.y += (d.y - A.y) * Math.min(1, dt * H7.ABI_K * 1.5);
    A.moving = Math.abs(A.x - was) > 30 * dt; A.face = Math.sign(tx - was) || A.face || 1; A.t += dt;
  }
  // the sleepers: they turn over now and then; nobody can walk through one (step over)
  for (const s of h7.sleepers) {
    if (s.room !== r.id) continue;
    if (s.roll && !(s.hold > 0)) { s.t -= dt; if (s.t <= 0) { s.to = s.to ? 0 : s.roll * H7.ROLL; const [a, b] = H7.ROLL_EVERY; s.t = a + Math.random() * (b - a); }
      s.off += Math.sign(s.to - s.off) * Math.min(Math.abs(s.to - s.off), H7.ROLL / H7.ROLL_T * dt); }
    const x0 = s.x0 + s.off, x1 = x0 + H7.SLEEP_L, half = BODY_W / 2;
    if (s.hold > 0) s.hold -= dt; if (s.stir > 0) s.stir -= dt;
    // (Glen 11-23: "I could jump on Saul's men all day and nothing happened") land on one: he cries out in his sleep and
    //  shoves you off, and the men round him toss and roll over, closing the gaps a while. Nobody wakes (26:12)
    if (h7.air && d.onGround && Math.abs(d.y - GR * T) < 4 && d.x > x0 + 12 && d.x < x1 - 12 && d.inv <= 0) h7Stir(s, x0, x1);   // (just landed on him)
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
  if (h7.take) h7.take.t += dt;
  h7.air = !d.onGround;
}

function h7Stir(s, x0, x1) {
  const d = david, S = H7.STIR;
  hurtDavid((x0 + x1) / 2, "");
  s.stir = 0.8;
  for (const o of h7.sleepers) if (o.room === s.room && Math.abs(o.x0 - s.x0) < S.NEAR * T) {
    o.stir = 0.5 + Math.random() * 0.6;
    if (o.roll) { o.to = o.roll * H7.ROLL; o.hold = S.HOLD; o.t = 0.5; }
  }
  toast(h7.told.stir ? "Mmph... he shoves you off in his sleep." : "He cries out in his sleep and shoves you off! The men round him toss and turn, but nobody wakes: a deep sleep from the LORD is on them (26:12).");
  h7.told.stir = true;
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
    // (Glen's clip, 11-23: David kneels, pulls the spear up out of the ground, picks up the jar, and stands)
    { fn() { h7.abiPose = null; const d = david; d.x = h7.saul.x - H7.TAKE_DX[0] * SCALE; d.vx = 0; h7.take = { t: 0 }; } },
    { wait: SPR.david_take ? SPR.david_take.frames * SPR.david_take.ms / 1000 + 0.3 : 0.6 },
    { fn() { h7.take = null; regionAdd("taken", "h7_taken"); david.x = h7.saul.x - H7.TAKE_DX[1] * SCALE; david.facing = 1; } },
    H7_SAY("", "So David took the spear and the jar of water from Saul's head, and they went away. No man saw it, or knew it, nor did any awake; for they were all asleep, because a deep sleep from the LORD had fallen on them. (1 Samuel 26:12)"),
    { fn() { toast("Away to the other side: on through the camp and up the far mountain (right)."); } },
  ]);
}
function h7Call() {
  h7.call = true; h7.dawn = { t: 0 }; david.facing = -1;   // (he turns to call back across the valley)
  rPlay([
    H7_SAY("", "Then David went over to the other side, and stood on the top of the mountain far away, a great space being between them; (1 Samuel 26:13)"),
    H7_SAY("David", "“Don't you answer, Abner?” (1 Samuel 26:14)"),
    { fn() { h7.wake = { t0: h7Now() }; } },   // (across the valley, Saul wakes: Glen's clip, 11-23)
    H7_SAY("Abner", "“Who are you who calls to the king?” (1 Samuel 26:14)"),
    H7_SAY("David", "“Aren't you a man? Who is like you in Israel? Why then have you not kept watch over your lord the king? For one of the people came in to destroy your lord the king. This thing isn't good that you have done. As the LORD lives, you are worthy to die, because you have not kept watch over your lord, the LORD's anointed. Now see where the king's spear is, and the jar of water that was at his head.” (1 Samuel 26:15-16)"),
    H7_SAY("Saul", "“Is this your voice, my son David?” (1 Samuel 26:17)"),
    H7_SAY("David", "“It is my voice, my lord, O king. Why does my lord pursue his servant? For what have I done? What evil is in my hand?” (1 Samuel 26:17-18)"),
    H7_SAY("David", "“Now therefore, please let my lord the king hear the words of his servant. If it is so that the LORD has stirred you up against me, let him accept an offering. But if it is the children of men, they are cursed before the LORD; for they have driven me out today that I shouldn't cling to the LORD's inheritance, saying, ‘Go, serve other gods!’ (1 Samuel 26:19)"),
    H7_SAY("David", "“Now therefore, don't let my blood fall to the earth away from the presence of the LORD; for the king of Israel has come out to seek a flea, as when one hunts a partridge in the mountains.” (1 Samuel 26:20)"),
    H7_SAY("Saul", "“I have sinned. Return, my son David; for I will no more do you harm, because my life was precious in your eyes today. Behold, I have played the fool, and have erred exceedingly.” (1 Samuel 26:21)"),
    H7_SAY("David", "“Behold the spear, O king! Let one of the young men come over and get it.” (1 Samuel 26:22)"),
    { fn() { h7.spearDown = true; h7.young = { x: david.x + david.facing * 50, y: david.y + 4, t0: h7Now() + H7.YOUNG_WAIT }; } },   // (laid on the ground; one of Saul's young men runs up for it: Glen's clip, 11-23)
    H7_SAY("David", "“The LORD will give to every man his righteousness and his faithfulness; because the LORD delivered you into my hand today, and I wouldn't stretch out my hand against the LORD's anointed. Behold, as your life was respected today in my eyes, so let my life be respected in the LORD's eyes, and let him deliver me out of all oppression.” (1 Samuel 26:23-24)"),
    H7_SAY("Saul", "“You are blessed, my son David. You will both do mightily, and will surely prevail.” (1 Samuel 26:25)"),
    H7_SAY("", "So David went his way, and Saul returned to his place. (1 Samuel 26:25)"),
    { fn() { regionAdd("taken", "h7_end"); toast("Saul's jar of water: David keeps it."); } }, { wait: 1.2 },
    { fn() { jsceneOpen(true); } },
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
// Glen's three sleeping soldiers (11-21): asleep on his side; turning over onto his back; asleep on his back.
// (ref: the sheet his size comes from, so a man is the same size in every pose)
const H7_MEN = [
  { side: "soldier_sleep", ref: "soldier_sleep" }, { side: "soldier_sleep_b", ref: "soldier_sleep" },
  { side: "soldier2_side", roll: "soldier2_roll", back: "soldier2_back", ref: "soldier2_side" },
  { side: "soldier3_side", roll: "soldier3_roll", back: "soldier3_back", ref: "soldier3_side" },
  { side: "soldier2_back", ref: "soldier2_side" }, { side: "soldier3_back", ref: "soldier3_side" },
];
const H7_STILL = [0, 4, 1, 5, 3, 2];   // the men who don't turn over, in turn; the ones who do are men 2 and 3
function h7DrawSleeper(s, camX) {
  const M = H7_MEN[s.man], R = SPR[M.ref]; if (!R) return;
  const k = H7.SLEEP_L / (R.w * h7Sc(M.ref)), x0 = s.x0 + s.off - camX;
  if (x0 > W + 50 || x0 + H7.SLEEP_L < -50) return;
  const p = Math.min(1, Math.abs(s.off) / H7.ROLL);   // how far over he's turned (0: asleep on his side)
  let n = M.side, f;
  if (M.roll && p > 0.98 && SPR[M.back]) { n = M.back; f = frameOf(n, performance.now() / 1000 + s.x0 * 0.01); }
  else if (M.roll && p > 0.02 && SPR[M.roll]) { n = M.roll; f = Math.round(p * (SPR[n].frames - 1)); }
  else { if (!SPR[n]) return; f = frameOf(n, performance.now() / 1000 + s.x0 * 0.01); }
  const S = SPR[n], sc = h7Sc(n) * k, j = s.stir > 0 ? Math.sin(performance.now() / 28) * 3 * Math.min(1, s.stir * 2) : 0;   // (stirring)
  drawSprite(n, f, (s.dir > 0 ? x0 + S.ax * sc : x0 + (S.w - S.ax) * sc) + j, FOOT + 2, s.dir, k);
}
function h7Draw(camX) {
  const r = region.room; if (!r) return;
  h7RockDraw(camX);
  for (const e of h7.embers) if (e.room === r.id) {   // a fire burned down to embers
    const x = e.x - camX, f = 0.75 + 0.25 * Math.sin(e.t * 3.1) * Math.sin(e.t * 1.7);
    const g = ctx.createRadialGradient(x, FOOT - 6, 2, x, FOOT - 6, 46);
    g.addColorStop(0, `rgba(255,190,90,${0.95 * f})`); g.addColorStop(0.4, `rgba(230,90,30,${0.7 * f})`); g.addColorStop(1, "rgba(120,30,10,0)");
    ctx.fillStyle = g; ctx.fillRect(x - 50, FOOT - 56, 100, 60);
    const fr = ITEM.w7_firering;   // (Glen's, 11-21)
    if (fr && fr.naturalWidth) drawItem("w7_firering", x, FOOT + 4, H7.FIRE_H / fr.naturalHeight);
  }
  for (const p of h7.props) if (p.room === r.id) { const im = ITEM[p.name]; if (!im || !im.naturalWidth) continue;
    const k = p.h / im.naturalHeight, w = im.naturalWidth * k, x = p.x - camX; if (x < -w || x > W + w) continue;
    ctx.save(); ctx.translate(x, FOOT + 3); ctx.scale(p.dir, 1); ctx.drawImage(im, -w / 2, -p.h, w, p.h); ctx.restore(); }
  for (const c of h7.carts) if (c.room === r.id) { const im = ITEM.w7_box; if (im && im.naturalWidth) drawItem("w7_box", c.x - camX, FOOT + 4, (4 * T + 10) / im.naturalWidth); }   // (Glen's tipped cart, 11-21)
  for (const s of h7.sleepers) if (s.room === r.id) h7DrawSleeper(s, camX);
  const ab = h7.abner, ai = ITEM.w7_abner_sleep;   // Abner asleep against a cart wheel, by Saul (26:7), facing him
  if (ab && ab.room === r.id && ai && ai.naturalWidth) {
    const w = ai.naturalWidth * H7.ABNER_H / ai.naturalHeight, hh = H7.ABNER_H * (1 + 0.012 * Math.sin(performance.now() / 700));
    ctx.save(); ctx.translate(ab.x - camX, FOOT + 3); ctx.scale(-1, 1); ctx.drawImage(ai, -w / 2, -hh, w, hh); ctx.restore();
  }
  if (h7.saul && h7.saul.room === r.id) {   // Saul asleep, his head and the spear to the left
    const x = h7.saul.x - camX, S = SPR.david_take;
    if (S && (h7.take || h7Has("h7_taken"))) {   // Glen's clip of the taking (flipped); after it, its last frame, Saul's side only
      const f = h7.take ? frameOf("david_take", h7.take.t) : S.frames - 1;
      ctx.save(); if (!h7.take) { ctx.beginPath(); ctx.rect(x - 8 * SCALE, 0, W, H); ctx.clip(); }
      drawSprite("david_take", f, x, FOOT, -1, 1); ctx.restore();
    } else drawSprite("saul_sleep", frameOf("saul_sleep", performance.now() / 1000), x, FOOT, -1, H7.SAUL_K);
  }
  for (const p of h7.people) if (p.room === r.id && (!p.show || p.show())) drawSprite(p.spr, frameOf(p.spr, p.t), p.x - camX, p.y, p.dir, p.k);
  const A = h7.abi;
  if (A.on) {
    const crouch = david.h === LOW_H, n = h7.abiPose || (A.moving ? (crouch ? "abishai_sneak" : "abishai_walk") : (crouch ? "abishai_sneak" : "abishai_idle"));
    if ((A.a ?? 1) > 0.02) drawSprite(n, A.moving || h7.abiPose ? frameOf(n, A.t) : 0, A.x - camX, Math.min(FOOT, A.y + 4), h7.abiPose ? 1 : A.face, 1, A.a ?? 1);
  }
}
function h7DrawFront(camX) {
  const r = region.room; if (!r) return;
  for (const b of h7.beds) if (b.room === r.id) {   // the loaded wagon (Glen's, 11-21), in front: David crawls under its bed
    const im = ITEM.w7_cart; if (!im || !im.naturalWidth) continue;
    const w = im.naturalWidth * H7.BED_H / im.naturalHeight, x = (b.x0 + b.x1) / 2 - camX;
    if (x + w / 2 < 0 || x - w / 2 > W) continue;
    ctx.drawImage(im, x - w / 2, FOOT + 4 - H7.BED_H, w, H7.BED_H);
  }
  // (Glen 11-21: David keeps the spear and the jar in his pack, so they aren't drawn on him. At 26:22 the spear comes out
  //  and stands in the ground at the mountaintop for Saul's young man.)
  const Y = h7.young, YS = SPR.young_spear;
  if (r.id === "mountain" && h7.call && Y) {
    const t = h7Now() - Y.t0, sc = SCALE * H7.YOUNG_K, x = Y.x - camX, a = t < 0 ? 0 : Math.min(1, t / 0.4), sp = ITEM.saul_spear;
    if (a < 1 && sp && sp.naturalWidth) {   // Glen's spear, lying where David laid it, till the clip's own takes its place
      const [x0, x1, yy] = H7.YOUNG_SPEAR, L = (x1 - x0) * sc, th = sp.naturalWidth * L / sp.naturalHeight;
      ctx.save(); ctx.globalAlpha = 1 - a; ctx.translate(x - L / 2, Y.y - (YS ? YS.ay - yy : 13) * sc); ctx.rotate(Math.PI / 2);
      ctx.drawImage(sp, -th / 2, -L / 2, th, L); ctx.restore();
    }
    if (YS && t >= 0) drawSprite("young_spear", frameOf("young_spear", t), x, Y.y, 1, H7.YOUNG_K, a);   // (its tip at x)
  }
  // across the valley, at the call: Saul and Abner far off and small, by the camp (Saul wakes when David calls: Glen's clip)
  if (r.id === "mountain" && h7.call) {
    { const [gx, gy, gr] = H7.FAR_GLOW, f = 0.85 + 0.15 * Math.sin(h7Now() * 2.3);   // (Glen 11-23: a light round them, so you see them)
      const g = ctx.createRadialGradient(gx, FOOT - gy, 4, gx, FOOT - gy, gr);
      g.addColorStop(0, `rgba(255,200,120,${0.5 * f})`); g.addColorStop(0.5, `rgba(255,160,80,${0.22 * f})`); g.addColorStop(1, "rgba(255,140,60,0)");
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = g; ctx.fillRect(gx - gr, FOOT - gy - gr, 2 * gr, 2 * gr); ctx.restore(); }
    const n = SPR.saul_wake ? "saul_wake" : "saul_talk";
    drawSprite(n, h7.wake && SPR.saul_wake ? frameOf(n, h7Now() - h7.wake.t0) : 0, 150, FOOT, 1, H7.FAR_K * H7.SAUL_K, 0.85);
    const ai = ITEM.w7_abner_sleep;   // (Abner asleep against his wheel till David calls him)
    if (!h7.wake && ai && ai.naturalWidth) { const hh = H7.ABNER_H * H7.FAR_K, w = ai.naturalWidth * hh / ai.naturalHeight;
      ctx.save(); ctx.globalAlpha = 0.85; ctx.translate(225, FOOT + 3); ctx.scale(-1, 1); ctx.drawImage(ai, -w / 2, -hh, w, hh); ctx.restore(); }
    else drawSprite("abner_talk", 0, 210, FOOT, 1, H7.FAR_K, 0.85);
  }
}
// David (Glen's clips, 11-23): creeping through the camp; then walking with the spear and the jar till 26:22
function h7DrawDavid(d, x, y) {
  if (h7.take) return true;   // (he's in the clip of the taking)
  const r = region.room; if (!r || !d.onGround || d.throwT >= 0 || d.h === LOW_H) return false;
  const walking = d.state === "walk" || d.state === "run", rate = Math.max(0.6, Math.abs(d.vx) / TUNE.WALK_SPEED);
  if (h7Has("h7_taken") && !h7Has("h7_end") && !h7.spearDown) {
    if (walking && SPR.david_walk_spear) { drawSprite("david_walk_spear", frameOf("david_walk_spear", d.t * rate), x, y, d.facing); return true; }
    if (d.state === "idle" && SPR.david_stand_spear) { drawSprite("david_stand_spear", 0, x, y, d.facing); return true; }
    return false;
  }
  if ((r.id === "wagons" || r.id === "fire") && !h7Has("h7_taken") && d.state === "walk" && SPR.david_creep) {
    drawSprite("david_creep", frameOf("david_creep", d.t * rate * H7.CREEP_RATE), x, y, d.facing); return true;
  }
  return false;
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
  if (r.id === "mountain" && h7.call) lights.push([H7.FAR_GLOW[0], FOOT - H7.FAR_GLOW[1] - camY, H7.FAR_GLOW[2] * 1.4]);   // (Saul and Abner, across the valley)
  for (const [lx, ly, rad] of lights) {
    const g = x2.createRadialGradient(lx, ly, rad * 0.2, lx, ly, rad); g.addColorStop(0, "rgba(0,0,0,0.85)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x2.fillStyle = g; x2.fillRect(lx - rad, ly - rad, rad * 2, rad * 2);
  }
  ctx.drawImage(H7_DARK, 0, 0);
}
