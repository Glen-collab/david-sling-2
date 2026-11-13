// World 4, the Cave of Adullam (1 Samuel 22:1-5; CAVES_PLAN.md). Part Two's fourth region, on region.js's engine like
// nobgath.js: loaded before region.js, which takes ADULLAM as its REGION when the address is "#9-8".
//
// (Glen 11-13: "build that out and then the rest of the caves as the structure and rooms ... just put up arrows on side
//  caves and entrances") The whole cave, top to bottom, from his pictures (tools/make_w4_rooms.py,
//  tools/make_room_strip.py) and his kit (tools/cut_w4_kit.py). Three levels, the light going as he goes down:
//
//   UPPER, daylight:   The Cave Mouth -(tunnel)-> The Camp -> The Bat Roost (tall) -> The Lamp Hall (the lamp)
//   MIDDLE, dark:      -(stairs)-> The Rat Warren -> The Four Tunnels -(arch)-> The Crumbling Ledges (tall, up)
//                      -(tunnel at the top)-> The Old Well Shaft (very tall, down)
//   LOWER, water:      The Underground River -> The Flooded Tunnel -(under the water)-> The Deep Pool -> The Hidden Spring
//
// Tunnels into the picture (Up): r4Tunnel. Side caves still to be made have their Up arrow and say so (to: null).
// The dark: r4.dark rooms are black but for the lamp (found in the Lamp Hall; it burns olives, as Part One's). The water:
// below a room's waterline he swims (Glen's david_swim), with a breath meter.

const R4 = {
  STAND: 0.12,       // a ledge's walking surface: this much of its height down from its top edge (the top face of the rock)
  PROP_K: 0.55,      // the camp's bedrolls and baskets, next to their cut size
  // (Glen 11-13: "an up arrow to go into the cave deeper") a tunnel into the picture: Up by it, he turns his back
  //  (TURN s, Glen's david_turn_away) and walks in, smaller and fading (WALK s, SHRINK, RISE px up the picture); REACH:
  //  px from the tunnel's middle that counts as at it (and HIGH px of height)
  //  (Glen 11-13: "have him start turning for a couple frames and then it goes to the next room": TURN s, then the cut)
  //  SIDE: a side cave not open yet stands this many px higher, rubble heaped in front (RUBBLE: its size)
  TUNNEL: { TURN: 0.45, REACH: 60, HIGH: 60, SIDE: 40, RUBBLE: 1.25, ON_LEDGE: 26 },
  // the dark below the Lamp Hall: how black (0-1); the lamp's light (px) with olives in the flask, with none, and with no
  //  lamp at all; a tunnel's faint glow (px); seconds of light per olive (as Part One's caves)
  DARK: { LAMP: 300, DIM: 130, NONE: 60, GLOW: 70, OIL_EVERY: 5 },
  // (Glen 11-13: "swimming ... breath meter ... reach further down areas swimming under stuff") in the water: sideways
  //  speed, a stroke's push up (A), Up / Down held, the slow sink, the most speed up or down; at the surface his feet
  //  this far under the waterline (head out); a jump out of the water (A at the surface); breath (s) and what's left
  //  after running out (s, and a heart lost)
  SWIM: { X: 170, STROKE: 230, PUSH: 420, SINK: 160, MAXV: 260, FLOAT: 70, LEAP: 640, BREATH: 10, AFTER: 3,
    TREAD: 0.35 },   // (Glen 11-13: "a resting stroke ... when I am not moving": his stroke this much slower, till his own clip)
  // (Glen 11-13 play: "the backgrounds seem way too blown up for how big David is") his pictures far off, small: K, their
  //  size (1 = the screen's height for a wide one, 1296 wide for a tall one); P: how fast they scroll next to David;
  //  BOT: the picture's bottom (px, world, behind the floor); DIM: a shade over them (the rock he stands on stands out);
  //  (TALL_DIM: the tall rooms', whose painted ledges aren't the ones to stand on); FADE: px over the picture's top where
//  the rock goes dark (the cave's roof); NEAR_P: the rubble just behind him, NEAR_A how much it shows (it's in shadow)
  BG: { K: 0.5, P: 0.35, BOT: 650, DIM: 0.3, TALL_DIM: 0.5, FADE: 200, MID_P: 0.55, NEAR_P: 0.8, NEAR_BOT: 600, NEAR_A: 0.6 },
  // (Glen 11-13: "Here are some cave floors") his floors, under David's feet, scrolling with him: px of each over the
  //  ground line (he walks a little way into it, not along its back edge)
  FLOOR: { limestone: 80, sandstone: 74, dark: 70, pebbles: 50 },
  // (Glen 11-13: "paint the exact ledges that we can jump on") a way up a tall room: his ledges zigzagging, each DY px
  //  over the last, GAP px apart sideways, kept EDGE px from the walls; their sizes in turn
  ZIG: { DY: 115, GAP: 55, EDGE: 70, SIZES: ["m", "l", "s", "m", "l"] },
  // (Glen 11-13: "swimming under stuff") rock down into the water: its bottom BELOW px under the waterline; under it he
  //  stays UNDER px below that (no air there: swim through)
  LID: { BELOW: 95, UNDER: 30 },
  // the long rooms: his panorama scrolls at most this fast (a slower one: the whole picture from one end of the room to the other)
  FILL_P: 0.55,
  // (Glen 11-13: "fish we can add in the water to hurt David", tools/make_w4_fish.py) K: their size next to their strips;
  //  each kind: frame w, h, count; SPEED px/s back and forth; FPS. The biter: SEE px, it darts at him (DART px/s, for
  //  up to DART_T s), then RESTs. A touch costs a heart (HIT: px of its body that counts, as parts of its w, h)
  FISH: { K: 0.55, HIT: [0.36, 0.3],
    tilapia: { w: 200, h: 93, n: 4, SPEED: 60, FPS: 5 },
    perch:   { w: 240, h: 192, n: 4, SPEED: 90, FPS: 4 },
    biter:   { w: 260, h: 108, n: 73, SPEED: 45, FPS: 12, swim: [0, 40], bite: [45, 73], SEE: 300, DART: 290, DART_T: 1.1, REST: 1.6 } },
};

const ADULLAM = {
  key: "adullam", name: "The Cave of Adullam", start: "mouth", carry: ["gibeah", "ramah", "nobgath"],
  strCap: 8,
  // (Glen 11-13: "Make the rooms long and fun. Each room should be like a level in a game ... not just a pass through.
  //  Those are only side rooms") the main rooms long, each a level; the side caves (to: null tunnels) are the small places.
  //  pic: his picture, far off (fill: his panoramas, make_w4_panos.py, floor to roof); rock: its ledges; ground: his floor
  rooms: [
    // UPPER: daylight
    { id: "mouth", name: "The Cave Mouth", w: 150, cave: true, mx: 0, my: 1, mw: 4, pic: "w4/pano_mouth", fill: true, rock: "sand", ground: "limestone" },
    { id: "camp", name: "The Camp", w: 110, cave: true, mx: 4, my: 1, mw: 3, right: "roost", pic: "w4/pano_camp", fill: true, rock: "sand", ground: "limestone" },
    { id: "roost", name: "The Bat Roost", w: 40, up: 44, cave: true, mx: 7, my: 0, mw: 1, mh: 2, left: "camp", right: "lamphall",
      pic: "w4/tall_roost", k: 1, tall: true, rock: "pale", ground: "limestone" },
    { id: "lamphall", name: "The Lamp Hall", w: 172, cave: true, mx: 8, my: 1, mw: 5, left: "roost", dark: 0.45,
      pic: "w4/lamp/far", mid: "w4/lamp/mid.png", rock: "red", ground: "sandstone" },
    // MIDDLE: dark
    { id: "warren", name: "The Rat Warren", w: 190, cave: true, mx: 8, my: 2, mw: 5, right: "narrows", dark: 0.93,
      pic: "w4/pano_warren", fill: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "narrows", name: "The Four Tunnels", w: 120, cave: true, mx: 13, my: 2, mw: 3, left: "warren", right: "ledges", dark: 0.93,
      pic: "w4/pano_narrows", fill: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "ledges", name: "The Crumbling Ledges", w: 40, up: 44, cave: true, mx: 16, my: 1, mw: 1, mh: 2, left: "narrows", dark: 0.9,
      pic: "w4/tall_ledges", k: 1, tall: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "well", name: "The Old Well Shaft", w: 40, up: 100, cave: true, mx: 17, my: 1, mw: 1, mh: 3, right: "river", dark: 0.35,
      pic: "w4/tall_well", k: 0.6, fog: 0.4, tall: true, rock: "pale", ground: "pebbles" },
    // LOWER: water (water: the waterline, px from the screen's top)
    { id: "river", name: "The Underground River", w: 170, cave: true, mx: 18, my: 3, mw: 5, left: "well", right: "flooded", dark: 0.9, water: 430,
      pic: "w4/pano_river", fill: true, rock: "moss", ground: "pebbles" },
    { id: "flooded", name: "The Flooded Tunnel", w: 130, cave: true, mx: 23, my: 3, mw: 4, left: "river", dark: 0.92, water: 400,
      pic: "w4/pano_flooded", fill: true, rock: "moss", ground: "pebbles" },
    { id: "deep", name: "The Deep Pool", w: 170, cave: true, mx: 27, my: 3, mw: 5, left: "flooded", right: "spring", dark: 0.92, water: 450,
      pic: "w4/pano_deep", fill: true, rock: "moss", ground: "pebbles" },
    { id: "spring", name: "The Hidden Spring", w: 90, cave: true, mx: 32, my: 3, mw: 3, left: "deep", dark: 0.8,
      pic: "w4/pano_spring", fill: true, rock: "moss", ground: "limestone" },
  ],
  // the Journal: Glen's song, the Chorus (SONG_PSALM57.md, his words exactly)
  steps: ["r4_camp"],
  verse: ["Be exalted, O God, above the heavens", "Let Your glory fill the earth", "Be exalted, O God, above the heavens", "Let all creation know Your worth",
    "My heart is steadfast, O my God", "My heart is steadfast in You", "I will sing, I will praise Your name", "For Your mercy carries me through"],
  // (draft words, for Glen) what David writes
  entries: [
    ["I escaped to Adullam’s cave. My brothers and all my father’s house heard it, and came down to me there.", "1 Samuel 22:1"],
  ],
  end: ["Bring my soul out of prison, that I may give thanks to your name.", "Psalm 142:7"],
  build: r4Build, enter: r4Enter, update: (dt, r) => r4Update(dt, r), holdDavid: (d, dt) => r4Hold(d, dt), drawDavid: (d, x, y) => r4DrawDavid(d, x, y),
  softHoles: true, draw: camX => { r4DrawLids(camX); r4DrawFish(camX); }, backdrop: (r, camX) => r4Backdrop(r, camX), floor: (r, camX) => r4Floor(r, camX), drawFront: camX => r4DrawFront(camX),
};

const R4_KIT = {   // (tools/cut_w4_kit.py: assets/rooms/w4/kit/kit.json; top: the rock's top edge, px down the piece)
  w4_ledge_dark_s: { w: 132, h: 46, top: 3 }, w4_ledge_dark_m: { w: 203, h: 70, top: 3 }, w4_ledge_dark_l: { w: 270, h: 109, top: 3 }, w4_rocks_dark: { w: 162, h: 112, top: 15 },
  w4_ledge_red_s: { w: 139, h: 49, top: 2 }, w4_ledge_red_m: { w: 206, h: 71, top: 2 }, w4_ledge_red_l: { w: 271, h: 108, top: 3 }, w4_rocks_red: { w: 164, h: 115, top: 15 },
  w4_ledge_sand_s: { w: 130, h: 46, top: 3 }, w4_ledge_sand_m: { w: 198, h: 68, top: 3 }, w4_ledge_sand_l: { w: 267, h: 105, top: 3 }, w4_rocks_sand: { w: 157, h: 111, top: 14 },
  w4_ledge_pale_s: { w: 135, h: 50, top: 3 }, w4_ledge_pale_m: { w: 196, h: 68, top: 2 }, w4_ledge_pale_l: { w: 271, h: 109, top: 3 }, w4_rocks_pale: { w: 158, h: 113, top: 15 },
  w4_ledge_moss_s: { w: 137, h: 52, top: 4 }, w4_ledge_moss_m: { w: 197, h: 70, top: 2 }, w4_ledge_moss_l: { w: 274, h: 113, top: 3 }, w4_rocks_moss: { w: 165, h: 120, top: 16 },
  w4_step_sm: { w: 40, h: 26 }, w4_step_l: { w: 138, h: 54 }, w4_stalactite: { w: 146, h: 170 }, w4_stalagmites: { w: 178, h: 155 }, w4_lamp: { w: 130, h: 91 },
  w4_jar_big: { w: 145, h: 190 }, w4_pitcher: { w: 84, h: 118 }, w4_basket: { w: 158, h: 110 }, w4_waterskin: { w: 111, h: 174 }, w4_pot: { w: 98, h: 66 },
  w4_bedroll: { w: 170, h: 99 }, w4_bowl: { w: 142, h: 72 }, w4_bread: { w: 116, h: 90 }, w4_bag: { w: 173, h: 107 },
  w4_stairs_tunnel: { w: 708, h: 360 },   // (make_w4_rooms.py: Glen's stairs up into a tunnel)
  w4_arch: { w: 196, h: 250 }, w4_arch_sand: { w: 196, h: 250 }, w4_tunnel_lit: { w: 261, h: 230 },   // (make_w4_layers.py: tunnel mouths cut from his pictures)
};

const r4 = { told: {}, tunnels: [], lids: [], fish: [], walk: null, swim: null, breath: R4.SWIM.BREATH, oilT: 0, lampAt: null };
function r4Tell(k, text) { if (!r4.told[k]) { r4.told[k] = true; toast(text); } }
const r4Lamp = () => ALL_SKILLS || regionHas("taken", "r4_lamp");

// one of Glen's ledges, its left edge at x (px), the top of its rock at y (px): drawn, and he can stand on it (and jump up
//  through it from below). Returns the walking surface's y
function r4Ledge(room, n, x, y, flip = false) {
  const k = KIT[n], top = y + k.top + Math.round(k.h * R4.STAND);
  region.props.push({ room, n, x, y, flip });
  const c0 = Math.ceil((x + 10) / T), c1 = Math.floor((x + k.w - 10) / T);
  platAt(c0, top, Math.max(1, c1 - c0));
  return top;
}
// a ledge (rock: its color, size s/m/l) whose walking surface is at sy, its left edge at x. Returns where it is:
//  { x, x1, y (the surface), c (the column at its middle: for olives, a jar, a pomegranate) }
function r4L(room, rock, size, x, sy) {
  const n = `w4_ledge_${rock}_${size}`, k = KIT[n];
  r4Ledge(room, n, x, sy - k.top - Math.round(k.h * R4.STAND), x % 3 === 0);
  return { x, x1: x + k.w, y: sy, c: Math.floor((x + k.w / 2) / T) };
}
// (Glen 11-13: "paint the exact ledges") the way up a tall room: his ledges zigzagging from y0 up to y1 (surfaces, px).
//  flip: starting from the right. Returns them, bottom first
function r4Zig(room, rock, y0, y1, flip = false, seed = 0) {
  const r = roomById(room), wpx = r.w * T, x0 = r.c0 * T, Z = R4.ZIG, out = [];
  let dir = 1, a = 0, b = 0;
  for (let y = y0, i = 0; y >= y1; y -= Z.DY, i++) {
    const size = Z.SIZES[(i + seed) % Z.SIZES.length], w = KIT[`w4_ledge_${rock}_${size}`].w;
    let x;
    if (i === 0) x = Z.EDGE + 160;
    else {
      x = dir > 0 ? b + Z.GAP : a - Z.GAP - w;
      if (dir > 0 && x + w > wpx - Z.EDGE) { dir = -1; x = a - Z.GAP - w; }
      else if (dir < 0 && x < Z.EDGE) { dir = 1; x = b + Z.GAP; }
    }
    a = x; b = x + w;
    out.push(r4L(room, rock, size, x0 + (flip ? wpx - x - w : x), y));
  }
  return out;
}
// a thing of the camp's, standing on the ground (or on a ledge's surface y), centered on x (px)
function r4Thing(room, n, x, y = FOOT, k = R4.PROP_K) {
  const s = KIT[n]; region.props.push({ room, n, x: x - s.w * k / 2, y: y - s.h * k + 4, s: k });
}
// (Glen 11-13: "Since there is a cave here we don't need the extra cut out") a tunnel at a room's start or end can stand in
//  his painted arch, art null: where is worked out by tools/tests/w4align.js (from his picture's px, with the game's camera)
// a tunnel into the picture at x (px), its floor at y (px): Up there, he walks in and comes out at the tunnel `to` (its
//  id). to null: a side cave still to be made. art: the tunnel mouth drawn there (his, cut from his pictures), or none
function r4Tunnel(id, room, x, y, to, art = "w4_arch") {
  r4.tunnels.push({ id, room, x, y, to });
  // (Glen 11-13: "side caves a touch higher ... rubble in front of them for not open yet"; "Cave mouth needs to go higher":
  //  on a ledge, up off its top face so it stands on it, not sunk into it)
  const up = (to ? 0 : R4.TUNNEL.SIDE) + (y < GR * T - 4 ? R4.TUNNEL.ON_LEDGE : 0);
  if (art) { const k = KIT[art]; region.props.push({ room, n: art, x: x - k.w / 2, y: y - k.h + 12 - up }); }
  if (!to) { const n = `w4_rocks_${roomById(room).rock}`, k = KIT[n], s = R4.TUNNEL.RUBBLE; region.props.push({ room, n, x: x - k.w * s / 2, y: y - k.h * s + 14, s }); }
}
const r4Jar = (room, c, y = GR * T) => rBreak("jar", room, c, onTop(y));   // (Glen 11-13: jars he can break, not painted ones)
// a run of ledges from x (px), the first's surface at y, each dy px over the last (0: level; > 0: going down), gap px apart
function r4Run(room, rock, x, y, sizes, dy = -110, gap = R4.ZIG.GAP) {
  const out = []; for (const sz of sizes) { const l = r4L(room, rock, sz, x, y); out.push(l); x = l.x1 + gap; y += dy; } return out;
}
const r4Pit = (room, c, w, crumble = false) => rHole(room, c, w, crumble ? { crumble: true } : {});   // (a fall costs a heart; crumble: floor over it that gives way)
// rock coming down into the water from column c, w wide: he can't go over it, only swim under (r4Hold)
function r4Lid(room, c, w) {
  const r = roomById(room), y = r.water + R4.LID.BELOW;
  r4.lids.push({ room, x0: c * T, x1: (c + w) * T, y, rock: r.rock });
  rBlock(room, c, 0, w, Math.floor(y / T));
}
const r4LidAt = (r, x) => r4.lids.find(l => l.room === r.id && x > l.x0 - 14 && x < l.x1 + 14);
// a fish (kind: tilapia, perch, biter) swimming back and forth between columns k0 and k1 of the room starting at c, dy px
//  off the middle of the water
function r4FishAt(room, kind, c, k0, k1, dy = 0) {
  const r = roomById(room), y = (r.water + R4.SWIM.FLOAT + GR * T) / 2 + dy;
  r4.fish.push({ room, kind, x: (c + (k0 + k1) / 2) * T, y, y0: y, x0: (c + k0) * T, x1: (c + k1) * T, dir: (k0 & 1) ? -1 : 1, t: k0 * 0.37, state: "swim", st: 0, turn: 0 });
}
const R4_FISH_IMG = {};
const r4FishImg = k => R4_FISH_IMG[k] || (R4_FISH_IMG[k] = Object.assign(new Image(), { src: `../assets/sprites/w4_fish_${k}.png?v=${window.BUILD || 0}` }));
function r4Fish(dt, r) {
  const d = david, F = R4.FISH;
  for (const f of r4.fish) {
    if (f.room !== r.id) continue;
    const K = F[f.kind]; f.t += dt; f.st += dt; f.turn = Math.max(0, f.turn - dt);
    const dx = d.x - f.x, dy = (d.y - 30) - f.y, inWater = !!r4.swim;
    if (f.kind === "biter") {
      if (f.state === "swim" && inWater && Math.abs(dx) < K.SEE && Math.abs(dy) < 140 && (Math.sign(dx) === f.dir || Math.abs(dx) < 120) && d.deadT <= 0) { f.state = "dart"; f.st = 0; f.t = 0; }
      else if (f.state === "dart" && f.st > K.DART_T) { f.state = "rest"; f.st = 0; }
      else if (f.state === "rest" && f.st > K.REST) { f.state = "swim"; f.st = 0; }
    }
    if (f.state === "dart") {   // at him
      const L = Math.hypot(dx, dy) || 1; f.x += dx / L * K.DART * dt; f.y += dy / L * K.DART * dt; f.dir = Math.sign(dx) || f.dir;
    } else {
      f.x += f.dir * K.SPEED * (f.state === "rest" ? 0.6 : 1) * dt;
      if (f.x < f.x0 && f.dir < 0 || f.x > f.x1 && f.dir > 0) { f.dir = -f.dir; f.turn = 0.3; }
      f.y += (f.y0 + Math.sin(f.t * 1.3) * 10 - f.y) * Math.min(1, dt * 2);
    }
    f.y = Math.max(r.water + R4.SWIM.FLOAT - 20, Math.min(GR * T - 20, f.y));
    // a touch: a heart
    const hx = K.w * F.K * F.HIT[0], hy = K.h * F.K * F.HIT[1];
    if (Math.abs(dx) < hx + 14 && Math.abs(dy) < hy + 30 && d.deadT <= 0 && d.inv <= 0) {
      hurtDavid(f.x, "", true); if (f.kind === "biter") { f.state = "rest"; f.st = 0; f.dir = -f.dir; }
    }
  }
}
function r4DrawFish(camX) {
  const F = R4.FISH;
  for (const f of r4.fish) {
    if (f.room !== region.room.id) continue;
    const K = F[f.kind], im = r4FishImg(f.kind), w = K.w * F.K, h = K.h * F.K, x = f.x - camX;
    if (!im.complete || !im.naturalWidth || x < -w || x > W + w) continue;
    let i;
    if (f.kind === "biter") { const [a, b] = f.state === "dart" ? K.bite : K.swim; i = a + Math.floor(f.t * K.FPS) % (b - a); }
    else if (f.kind === "perch") i = f.turn > 0 ? 2 : (Math.floor(f.t * K.FPS) & 1) ? 3 : 1;
    else i = Math.floor(f.t * K.FPS) % K.n;
    ctx.save(); ctx.translate(Math.round(x), Math.round(f.y)); if (f.dir < 0) ctx.scale(-1, 1);
    ctx.drawImage(im, i * K.w, 0, K.w, K.h, -w / 2, -h / 2, w, h); ctx.restore();
  }
}
const r4Olives = (l, n = 3) => oliveRow(l.c - 1, onTop(l.y) - 0.4, n);

function r4Build(R) {
  Object.assign(KIT, R4_KIT);
  r4.tunnels.length = 0; r4.lids.length = 0; r4.fish.length = 0; r4.walk = null; r4.swim = null;
  for (const r of ADULLAM.rooms) { roomImg(r.pic); roomImg(r.mid); roomImg(`w4/floor_${r.ground}.png`); roomImg(`w4/near_${r.near || r.rock}.png`); roomImg(`w4/ceil_${r.rock}.png`); }
  const G = GR * T;

  // -- The Cave Mouth (22:1): in from the hills of Judah. A level: rocks up and down, drops in the floor, a floor that gives
  //  way, stepping stones over a wide drop, rats, bats; an olive press halfway; the tunnel on in at the end
  let c = R("mouth");
  { const rm = "mouth", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "sand", s, X(k), y);
    ground(c, c + 149);
    campfire(c + 4, GR - 1);   // (the olive press: the save)
    oliveRow(c + 8, 16, 4);
    L("m", 14, 500); r4Olives(L("l", 19, 385));
    const t = L("s", 27, 270); rRelic("r4_pom_mouth", "pomegranate", t.c, onTop(t.y));
    const d = L("m", 32, 400); r4Jar(rm, d.c, d.y);
    r4Pit(rm, c + 40, 3); rRat(rm, c + 46, 4);
    const u = r4Run(rm, "sand", X(50), 500, ["s", "m", "s"]); r4Olives(u[1]); r4Jar(rm, u[2].c, u[2].y);
    r4Pit(rm, c + 64, 4, true); rBat(rm, c + 66, 130);
    r4Jar(rm, c + 70); r4Jar(rm, c + 71); rRat(rm, c + 73, 4);
    r4Pit(rm, c + 78, 9); r4Olives(L("s", 79, 520)); L("s", 84, 520);   // (stepping stones over the drop)
    L("m", 92, 500); r4Olives(L("l", 97, 390), 4); const h = L("m", 105, 280); r4Jar(rm, h.c, h.y); L("s", 111, 390);
    rRat(rm, c + 95, 6); rRat(rm, c + 107, 5); rBat(rm, c + 100, 120);
    campfire(c + 117, GR - 1);
    r4Pit(rm, c + 122, 4, true);
    r4Thing(rm, "w4_stalagmites", X(129), FOOT, 0.8);
    r4Jar(rm, c + 132); r4Jar(rm, c + 133); r4Jar(rm, c + 134); rBat(rm, c + 131, 130); rBat(rm, c + 137, 140);
    r4Olives(L("m", 136, 500));
    r4Tunnel("mouth_in", rm, X(139.4), G, "camp_in", null);   // (Glen 11-13: into his painted cave, there at the end of the room)
  }

  // -- The Camp (22:2): the hall of sunbeams, a safe place (no drops). The men's things; jars; ledges up to the loft
  c = R("camp");
  { const rm = "camp", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "sand", s, X(k), y);
    ground(c, c + 109);
    r4Tunnel("camp_in", rm, X(20.2), G, "mouth_in", null);   // (his painted tunnel: where it stands with the camera at the room's start)
    campfire(c + 9, GR - 1);
    r4Thing(rm, "w4_bedroll", X(13)); r4Thing(rm, "w4_bag", X(16)); r4Thing(rm, "w4_basket", X(20));
    r4Thing(rm, "w4_bread", X(22)); r4Thing(rm, "w4_bowl", X(24));
    r4Jar(rm, c + 26); r4Jar(rm, c + 27); r4Jar(rm, c + 28);
    r4Tunnel("camp_side", rm, X(33), G, null, "w4_arch_sand");
    L("m", 38, 500); const b = L("l", 43, 385); r4Olives(b); r4Jar(rm, b.c + 2, b.y);
    const t = L("m", 51, 270); rRelic("r4_pom_camp", "pomegranate", t.c, onTop(t.y));
    L("s", 57, 390);
    rBat(rm, c + 46, 130); rBat(rm, c + 60, 130);
    r4Thing(rm, "w4_bedroll", X(62)); r4Thing(rm, "w4_waterskin", X(65));
    r4Jar(rm, c + 66); r4Jar(rm, c + 67);
    const u = r4Run(rm, "sand", X(72), 500, ["m", "m", "l"]); r4Olives(u[1]);   // (up to the loft)
    const f = r4Run(rm, "sand", u[2].x1 + 70, 280, ["m", "s"], 0, 70); r4Olives(f[0], 4); r4Jar(rm, f[1].c, f[1].y);
    r4Thing(rm, "w4_bedroll", X(92)); r4Thing(rm, "w4_basket", X(96)); rBat(rm, c + 90, 120);
    r4Jar(rm, c + 100); r4Jar(rm, c + 101); r4Thing(rm, "w4_pitcher", X(104));
  }

  // -- The Bat Roost: up his pale wall, bats asleep under the ledges; a side cave at the top, a pomegranate
  c = R("roost");
  { ground(c, c + 39);
    const z = r4Zig("roost", "pale", 500, -1150);
    z.forEach((l, i) => { if (i % 4 === 1) oliveRow(l.c - 1, onTop(l.y) - 0.4, 3); if (i % 4 === 3) r4Jar("roost", l.c, l.y); if (i % 3 === 2) rBat("roost", l.c, l.y + 40); });
    const top = z[z.length - 1], nt = z[z.length - 2];
    rRelic("r4_pom_roost", "pomegranate", nt.c, onTop(nt.y));
    r4Tunnel("roost_side", "roost", (top.x + top.x1) / 2, top.y, null);
    rRat("roost", c + 20, 6);
  }

  // -- The Lamp Hall: his set 1, the torches in the wall. The lamp on a high ledge early on (it lights the way down); a long
  //  drop to cross on small ledges, bats over it; an olive press; up and over; the stairs up into the tunnel at the end
  c = R("lamphall");
  { const rm = "lamphall", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "red", s, X(k), y);
    ground(c, c + 171);
    campfire(c + 4, GR - 1);
    oliveRow(c + 7, 16, 4);
    L("m", 12, 500); L("l", 17, 385); const t = L("m", 25, 270); r4.lampAt = { room: rm, x: (t.x + t.x1) / 2, y: t.y };
    L("s", 31, 390);
    rRat(rm, c + 34, 4); rBat(rm, c + 28, 120); rBat(rm, c + 44, 140);
    r4Pit(rm, c + 38, 3);
    r4Jar(rm, c + 44); r4Jar(rm, c + 45);
    r4Pit(rm, c + 50, 18);   // (the long drop: over it on his small ledges)
    const s = r4Run(rm, "red", X(50) + 20, 500, ["s", "s", "s", "s"], 0, 60); r4Olives(s[0]); r4Olives(s[2]);
    rBat(rm, c + 56, 150); rBat(rm, c + 65, 150);
    r4Jar(rm, c + 75); r4Jar(rm, c + 76); rRat(rm, c + 79, 5);
    r4Pit(rm, c + 85, 4, true);
    campfire(c + 93, GR - 1);
    const u = r4Run(rm, "red", X(98), 500, ["m", "s", "m"]); rRelic("r4_pom_lamp", "pomegranate", u[2].c, onTop(u[2].y));
    const dn = r4Run(rm, "red", u[2].x1 + R4.ZIG.GAP, 390, ["s", "m"], 110); r4Olives(dn[1]);
    rRat(rm, c + 102, 6); rRat(rm, c + 113, 5);
    r4Pit(rm, c + 132, 5, true); rBat(rm, c + 134, 140);
    r4Jar(rm, c + 139); r4Jar(rm, c + 140); r4Jar(rm, c + 141); r4Olives(L("m", 143, 500));
    const k = KIT.w4_stairs_tunnel; region.props.push({ room: rm, n: "w4_stairs_tunnel", x: X(150), y: FOOT - k.h + 8 });
    r4Tunnel("lamp_down", rm, X(150) + 270, G, "warren_up", null);   // (up the stairs into the dark)
  }

  // -- The Rat Warren: rats everywhere. The tunnel back up; a rat nest under a run of ledges; a wide drop on stepping stones;
  //  an olive press; up the wall and along the top over more rats; two side caves; the tunnel on to the Four Tunnels
  c = R("warren");
  { const rm = "warren", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "dark", s, X(k), y);
    ground(c, c + 189);
    r4Tunnel("warren_up", rm, X(4.6), G, "lamp_down", null);   // (his painted arch)
    campfire(c + 10, GR - 1);
    L("m", 14, 500); r4Olives(L("l", 19, 385));
    const t = L("m", 27, 270); rRelic("r4_pom_warren", "pomegranate", t.c, onTop(t.y));
    L("s", 33, 390);
    r4Tunnel("warren_side1", rm, X(39), G, null);
    rRat(rm, c + 24, 4); rRat(rm, c + 43, 3);
    r4Pit(rm, c + 46, 4);
    for (const k of [54, 58, 62, 66]) rRat(rm, c + k, 3);   // (the nest)
    r4Run(rm, "dark", X(52), 500, ["m", "l", "m"], 0, 60).forEach(l => r4Olives(l));
    r4Jar(rm, c + 73); r4Jar(rm, c + 74);
    r4Pit(rm, c + 77, 3, true);
    r4Tunnel("warren_side2", rm, X(85), G, null);
    r4Pit(rm, c + 90, 11); r4Olives(L("s", 91, 510)); L("s", 96, 500); rBat(rm, c + 95, 130);
    campfire(c + 106, GR - 1);
    const u = r4Run(rm, "dark", X(111), 500, ["s", "m", "s"]);
    const top = r4Run(rm, "dark", u[2].x1 + 70, 280, ["m", "m", "l"], 0, 70); top.forEach(l => r4Olives(l)); r4Jar(rm, top[2].c, top[2].y);
    for (const k of [118, 130, 142]) rRat(rm, c + k, 5);
    r4Jar(rm, c + 152); r4Jar(rm, c + 153); rBat(rm, c + 150, 130); rBat(rm, c + 158, 140);
    r4Pit(rm, c + 157, 4, true);
    rRat(rm, c + 165, 4); rRat(rm, c + 171, 3);
    L("m", 166, 500); r4Olives(L("s", 172, 390));
    r4Pit(rm, c + 177, 3);
    r4Tunnel("warren_back", rm, X(183.4), G, "n1", null);   // (his painted arch, with the camera at the room's end)
  }

  // -- The Four Tunnels: his four arches, far apart, with the cave between. The first back to the Warren, the third on to
  //  the Crumbling Ledges, the other two side caves (and the way on at the right, too)
  c = R("narrows");
  { const rm = "narrows", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "dark", s, X(k), y);
    ground(c, c + 119);
    r4Tunnel("n1", rm, X(4.5), G, "warren_back", null); r4Tunnel("n2", rm, X(38), G, null);
    r4Tunnel("n3", rm, X(70), G, "ledges_in"); r4Tunnel("n4", rm, X(104), G, null);
    r4Olives(L("s", 13, 480)); const j = L("m", 18, 380); r4Jar(rm, j.c, j.y);
    rRat(rm, c + 15, 4); rRat(rm, c + 30, 3);
    r4Pit(rm, c + 25, 3);
    const u = r4Run(rm, "dark", X(42), 500, ["s", "m"]); r4Olives(u[0]); rRelic("r4_pom_narrows", "pomegranate", u[1].c, onTop(u[1].y));
    rBat(rm, c + 46, 130);
    r4Pit(rm, c + 53, 4, true); rRat(rm, c + 60, 4);
    L("m", 58, 500); const k = L("s", 64, 390); r4Jar(rm, k.c, k.y);
    r4Pit(rm, c + 76, 8); L("s", 77, 510); r4Olives(L("s", 82, 510));
    rRat(rm, c + 90, 4); rRat(rm, c + 97, 3); r4Olives(L("m", 92, 500));
    r4Jar(rm, c + 110); r4Jar(rm, c + 111); rBat(rm, c + 112, 130); r4Olives(L("s", 114, 480));
  }

  // -- The Crumbling Ledges: up the dark wall, to the tunnel at the top: on to the top of the Old Well Shaft. (Out at the
  //  left, back to the Four Tunnels)
  c = R("ledges");
  { const X = k => (c + k) * T;
    ground(c, c + 39);
    r4Tunnel("ledges_in", "ledges", X(5), G, "n3");
    const z = r4Zig("ledges", "dark", 500, -1150, true, 2);
    z.forEach((l, i) => { if (i % 4 === 2) oliveRow(l.c - 1, onTop(l.y) - 0.4, 3); if (i % 5 === 4) r4Jar("ledges", l.c, l.y); if (i % 3 === 1) rBat("ledges", l.c, l.y + 40); });
    const top = z[z.length - 1], nt = z[z.length - 3];
    rRelic("r4_pom_ledges", "pomegranate", nt.c, onTop(nt.y));
    r4Tunnel("ledges_top", "ledges", (top.x + top.x1) / 2, top.y, "well_top");
    rRat("ledges", c + 22, 6);
  }

  // -- The Old Well Shaft: his sunlit shaft. In at the top, down the ledges to the bottom (and back up: the tunnel at the
  //  top goes back); out at the bottom right to the river
  c = R("well");
  { ground(c, c + 39);
    const z = r4Zig("well", "pale", 500, -3000, false, 1);
    z.forEach((l, i) => { if (i % 5 === 2) oliveRow(l.c - 1, onTop(l.y) - 0.4, 3); if (i % 7 === 4) r4Jar("well", l.c, l.y); if (i % 6 === 3) rBat("well", l.c, l.y + 40); });
    const top = z[z.length - 1], mid = z[Math.floor(z.length / 2)];
    r4Tunnel("well_top", "well", (top.x + top.x1) / 2, top.y, "ledges_top");
    rRelic("r4_pom_well", "pomegranate", mid.c, onTop(mid.y));
  }

  // -- The Underground River: moss stepping stones over the water; three places where the rock comes down into the
  //  water (swim under: r4Lid), olives on the riverbed under the long one
  c = R("river");
  { const rm = "river", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "moss", s, X(k), y);
    ground(c, c + 169);
    L("m", 3, 360); L("s", 10, 330); r4Olives(L("m", 16, 300));
    const t = L("l", 24, 240); rRelic("r4_pom_river", "pomegranate", t.c, onTop(t.y));
    L("s", 32, 320); r4Olives(L("m", 38, 350));
    r4Lid(rm, c + 46, 10);
    L("s", 58, 340); r4Olives(L("m", 64, 310)); L("s", 71, 350);
    r4Lid(rm, c + 78, 16); oliveRow(c + 82, 15.4, 6);
    L("m", 97, 330); L("s", 104, 300); const j = L("l", 110, 260); r4Jar(rm, j.c, j.y); L("s", 118, 330);
    r4Lid(rm, c + 124, 8);
    r4Olives(L("m", 134, 340)); L("s", 141, 310); L("m", 147, 350); L("s", 155, 330); L("m", 161, 340);
    for (const k of [20, 40, 68, 100, 130, 150]) rBat(rm, c + k, 120);
    r4FishAt(rm, "tilapia", c, 12, 30); r4FishAt(rm, "perch", c, 58, 76, -15); r4FishAt(rm, "biter", c, 80, 95, 10);
    r4FishAt(rm, "tilapia", c, 100, 120, -10); r4FishAt(rm, "perch", c, 138, 160); r4FishAt(rm, "biter", c, 150, 166, 10);
  }
  // -- The Flooded Tunnel: low rock over the water, three times; the tunnel's at the bottom (Up there: on to the Deep Pool)
  c = R("flooded");
  { const rm = "flooded", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "moss", s, X(k), y);
    ground(c, c + 129);
    L("s", 4, 330); r4Olives(L("m", 12, 310));
    r4Lid(rm, c + 20, 12); oliveRow(c + 23, 15.4, 5);
    const t = L("s", 36, 320); rRelic("r4_pom_flooded", "pomegranate", t.c, onTop(t.y)); L("m", 43, 330);
    r4Lid(rm, c + 50, 6); L("s", 58, 320);
    r4Tunnel("flood_under", rm, X(70), G, "deep_in", "w4_tunnel_lit");
    r4Lid(rm, c + 76, 14); oliveRow(c + 79, 15.4, 6);
    L("m", 93, 320); L("s", 100, 300); r4Olives(L("l", 107, 300)); L("s", 116, 320);
    for (const k of [10, 45, 100]) rBat(rm, c + k, 120);
    r4FishAt(rm, "tilapia", c, 5, 18); r4FishAt(rm, "biter", c, 20, 33, 10); r4FishAt(rm, "perch", c, 36, 50, -10);
    r4FishAt(rm, "biter", c, 76, 91, 10); r4FishAt(rm, "tilapia", c, 95, 120, -5); r4FishAt(rm, "perch", c, 100, 125, 10);
  }
  // -- The Deep Pool: long and dark; the rock down into the water four times, one of them long (watch your breath)
  c = R("deep");
  { const rm = "deep", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "moss", s, X(k), y);
    ground(c, c + 169);
    r4Tunnel("deep_in", rm, X(6.8), G, "flood_under", null);
    r4Olives(L("m", 10, 360)); L("s", 20, 340);
    r4Lid(rm, c + 28, 14);
    r4Olives(L("m", 46, 360)); L("s", 53, 340);
    r4Lid(rm, c + 60, 30); oliveRow(c + 66, 15.4, 8);   // (the long one)
    L("m", 93, 360); const t = L("l", 100, 330); rRelic("r4_pom_deep", "pomegranate", t.c, onTop(t.y)); L("s", 108, 350);
    r4Lid(rm, c + 114, 10); r4Lid(rm, c + 128, 10);   // (air between them)
    r4Olives(L("m", 141, 360)); L("s", 148, 340); L("m", 155, 360); L("s", 162, 340);
    for (const k of [15, 50, 96, 145, 160]) rBat(rm, c + k, 120);
    r4FishAt(rm, "perch", c, 8, 26); r4FishAt(rm, "biter", c, 28, 43, 10); r4FishAt(rm, "tilapia", c, 44, 58, -10);
    r4FishAt(rm, "biter", c, 62, 75, 10); r4FishAt(rm, "biter", c, 77, 90, 5); r4FishAt(rm, "perch", c, 95, 112);
    r4FishAt(rm, "tilapia", c, 120, 140, -5); r4FishAt(rm, "tilapia", c, 142, 165, 5);
  }
  // -- The Hidden Spring: the end of the cave; his jars to break, ledges up. (Next: the water from Bethlehem; Gad: on to Judah)
  c = R("spring");
  { const rm = "spring", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "moss", s, X(k), y);
    ground(c, c + 89);
    campfire(c + 4, GR - 1);
    for (const k of [12, 13, 14, 28, 29, 38]) r4Jar(rm, c + k);
    L("m", 18, 500); r4Olives(L("l", 23, 385));
    const u = r4Run(rm, "moss", X(44), 500, ["m", "l", "m"]); r4Olives(u[1]); r4Jar(rm, u[2].c, u[2].y);
    rBat(rm, c + 40, 130); rBat(rm, c + 60, 130);
    for (const k of [70, 71, 72, 80, 81]) r4Jar(rm, c + k);
  }
  // (Glen 11-13: "we need spiders in these caves too") Part Two's spiders: on their threads over the way (they drop when
  //  he's under), and walking the floor
  const S = (room, k, y) => rSpider(room, roomById(room).c0 + k, y), Cw = (room, k, n = 4) => rCrawler(room, roomById(room).c0 + k, n);
  S("mouth", 58, 190); S("mouth", 102, 170); Cw("mouth", 88);
  S("camp", 80, 180);
  S("lamphall", 20, 160); S("lamphall", 82, 180); S("lamphall", 120, 170); Cw("lamphall", 105, 5); Cw("lamphall", 146, 4);
  S("warren", 30, 170); S("warren", 68, 180); S("warren", 120, 160); S("warren", 162, 180); Cw("warren", 35, 5); Cw("warren", 110, 4); Cw("warren", 175, 3);
  S("narrows", 22, 170); S("narrows", 60, 180); S("narrows", 95, 170); Cw("narrows", 50, 4); Cw("narrows", 100, 5);
  S("ledges", 12, 300); S("roost", 30, 200); S("spring", 30, 180); Cw("spring", 60, 5);
  for (let i = region.props.length; i--;) if (region.props[i].n === "p_left" || region.props[i].n === "p_right") region.props.splice(i, 1);   // (r4Floor draws the drops)
}

function r4Enter(r) {
  r4.swim = null; r4.breath = R4.SWIM.BREATH;
  if (r.id === "mouth") r4Tell("mouth", "David therefore departed from there and escaped to Adullam’s cave. (1 Samuel 22:1)");
  if (r.id === "camp") r4Tell("camp", "Everyone who was in distress, everyone who was in debt, and everyone who was discontented gathered themselves to him. (1 Samuel 22:2)");
  if (r.id === "lamphall" && !r4Lamp()) r4Tell("lamphall", "It gets dark from here on down. An oil lamp would light the way.");
  if (r.dark > 0.6 && !r4Lamp()) r4Tell("nolamp", "Too dark to see. Go back up to the Lamp Hall and find a lamp.");
  if (r.dark > 0.6 && r4Lamp()) r4Tell("lampon", "The lamp burns olive oil from your flask. Pick up olives to keep it bright.");
  if (r.water) r4Tell("water", "Water! Swim with A (a stroke up), Up and Down. Watch your breath: come up for air.");
  if (r.id === "spring") r4Tell("spring", "The prophet Gad said to David, “Don’t stay in the stronghold. Depart, and go into the land of Judah.” (1 Samuel 22:5)");
}

// ---- the tunnels, the lamp, the oil
function r4Update(dt, r) {
  const d = david, w = r4.walk, U = R4.TUNNEL;
  if (r.water) r4Fish(dt, r);
  if (w) {
    w.t += dt; d.vx = 0;
    if (!w.gone && w.t >= U.TURN) {
      w.gone = true; const to = r4.tunnels.find(o => o.id === w.tun.to);   // (out of the tunnel it joins)
      regionGo(to.x, 1, () => { r4.walk = null; d.y = to.y; d.vy = 0; region.camFootY = to.y; snapCamera(); });
    }
    return;
  }
  // the lamp, on its ledge in the Lamp Hall
  const L = r4.lampAt;
  if (L && L.room === r.id && !r4Lamp() && Math.abs(d.x - L.x) < 50 && Math.abs(d.y - L.y) < 60) {
    regionAdd("taken", "r4_lamp"); toast("David takes the oil lamp. “Your word is a lamp to my feet, and a light for my path.” (Psalm 119:105)");
  }
  // its oil: an olive from the flask every few seconds, in the dark
  if (r.dark > 0.6 && r4Lamp() && d.olives > 0) { r4.oilT += dt; if (r4.oilT >= R4.DARK.OIL_EVERY) { r4.oilT = 0; d.olives--; } }
  if (!pressed("up") || region.trans || d.deadT > 0 || (!d.onGround && !r4.swim)) return;
  const tun = r4.tunnels.find(o => o.room === r.id && Math.abs(d.x - o.x) < U.REACH && Math.abs(d.y - o.y) < U.HIGH);
  if (!tun) return;
  if (!tun.to) { r4Tell("side" + tun.x, "A side cave. Not open yet: still to explore."); return; }
  r4.swim = null; r4.walk = { tun, t: 0, x: d.x }; d.vx = 0; d.charging = false;   // (held still meanwhile: r4Hold)
}

// ---- swimming (Glen's david_swim): below the waterline he swims; A a stroke up, Up / Down; breath while he's under
function r4Hold(d, dt) {
  if (r4.walk) { d.vx = d.vy = 0; return true; }
  const r = roomAt(d.x); if (!r || !r.water || r !== region.room || d.deadT > 0 || region.trans) { r4.swim = null; return false; }   // (moved to another room: not this one's water)
  const S = R4.SWIM, wy = r.water, lid = r4LidAt(r, d.x), top = lid ? Math.max(wy + S.FLOAT, lid.y + R4.LID.UNDER) : wy + S.FLOAT;
  if (!r4.swim) {
    if (d.y < wy + 40 || d.onGround && d.y < wy + S.FLOAT) { r4.breath = Math.min(S.BREATH, r4.breath + dt * 4); return false; }
    r4.swim = { t: 0 }; d.vy = Math.min(d.vy, 120); setState("idle");
  }
  const sw = r4.swim;
  const dir = (held("right") ? 1 : 0) - (held("left") ? 1 : 0);
  sw.t += dt * (dir || held("up") || held("down") || pressed("a") ? 1 : R4.SWIM.TREAD);   // (still: a slow, resting stroke)
  d.vx = dir * S.X; if (dir) d.facing = dir;
  d.vy += S.SINK * dt;
  if (pressed("a")) { if (!lid && d.y <= top + 4) { r4.swim = null; d.vy = -S.LEAP; d.onGround = false; setState("jump"); return false; } d.vy = -S.STROKE; }
  if (held("up")) d.vy -= S.PUSH * dt; if (held("down")) d.vy += S.PUSH * dt;
  d.vy = Math.max(-S.MAXV, Math.min(S.MAXV, d.vy));
  const x0 = r.c0 * T + 20, x1 = (r.c0 + r.w) * T - 20;
  let nx = Math.max(x0, Math.min(x1, d.x + d.vx * dt));
  const nl = r4LidAt(r, nx); if (nl && nl !== lid && d.y < nl.y + R4.LID.UNDER - 2) nx = d.x;   // (the rock: dive to get under it)
  d.x = nx;
  d.y += d.vy * dt;
  if (d.y < top) { d.y = top; if (d.vy < 0) d.vy = 0; }
  if (d.y > GR * T) { d.y = GR * T; d.vy = 0; }
  d.onGround = d.y >= GR * T - 1; d.fallTop = null; d.swordT = -1; d.shield = false; d.charging = false;
  // breath: at the surface it comes back; under, it runs out
  if (!lid && d.y <= top + 6) r4.breath = Math.min(S.BREATH, r4.breath + dt * 4);
  else { r4.breath -= dt; if (r4.breath <= 0) { r4.breath = S.AFTER; hurtDavid(d.x, "", true); toast("Out of breath! Swim up for air."); } }
  return true;
}

function r4DrawDavid(d, x, y) {
  const w = r4.walk, U = R4.TUNNEL;
  if (w) {
    drawSprite("david_turn_away", Math.min(7, Math.floor(w.t / U.TURN * 8)), x, y, d.facing);   // (his back to us, then the cut)
    return true;
  }
  if (r4.swim) { drawSprite("david_swim", frameOf("david_swim", r4.swim.t), x, y - 50, d.facing, 0.8); return true; }
  return false;
}

// ---- drawing: (Glen 11-13 play) his picture small and far off, scrolling slowly (the tiles mirrored in turn: no seams);
//  over its top the rock going dark (the roof); stalactites along the top; the rubble just behind David; his floor under
//  him. Over everything (r4DrawFront): the water's tint, the dark, the Up arrows, his breath
function r4Backdrop(r, camX) {
  const B = R4.BG, rel = camX - r.c0 * T, camTop = -(r.up || 0) * T;
  ctx.fillStyle = "#0b0907"; ctx.fillRect(0, camY, W, H);
  const tiles = (im, p, y, w, h, off = 0) => {   // across the screen, every other one mirrored
    const ox = -rel * p + off; for (let i = Math.floor(-ox / w); ox + i * w < W; i++) {
      const x = Math.round(ox + i * w);
      if (i & 1) { ctx.save(); ctx.translate(x + w, 0); ctx.scale(-1, 1); ctx.drawImage(im, 0, Math.round(y), Math.ceil(w) + 1, h); ctx.restore(); }
      else ctx.drawImage(im, x, Math.round(y), Math.ceil(w) + 1, h);
    }
  };
  const im = roomImg(r.pic);
  if (im) {
    // fill: (Glen's 4:1 panoramas, make_w4_panos.py) floor to the top of the screen, its middle in the middle of the room
    const k = r.fill ? B.BOT / im.naturalHeight : r.k || B.K, w = im.naturalWidth * k, h = im.naturalHeight * k;
    const p = r.fill ? Math.min(R4.FILL_P, Math.max(0, (w - W) / (r.w * T - W))) : B.P, off = r.fill ? (W - w) / 2 + (r.w * T - W) / 2 * p : 0;
    // a tall picture climbs with the camera just fast enough to show its top at the top of the room
    const f = r.up ? Math.max(0, Math.min(1, 1 - (B.BOT - h) / camTop)) : 0, yb = B.BOT + camY * f, yt = yb - h;
    tiles(im, p, yt, w, h, off);
    if (yt > camY) {   // over its top: its top band again, going dark
      const bh = h * 0.35; ctx.save(); ctx.beginPath(); ctx.rect(0, yt - bh, W, bh); ctx.clip(); tiles(im, p, yt - bh, w, h, off); ctx.restore();
      const g = ctx.createLinearGradient(0, yt + 40, 0, yt - B.FADE); g.addColorStop(0, "rgba(11,9,7,0)"); g.addColorStop(1, "rgba(11,9,7,1)");
      ctx.fillStyle = g; ctx.fillRect(0, yt - B.FADE, W, B.FADE + 40);
    }
    const mid = roomImg(r.mid); if (mid) tiles(mid, B.MID_P, yb - mid.naturalHeight * B.K, mid.naturalWidth * B.K, mid.naturalHeight * B.K);
    ctx.fillStyle = `rgba(8,6,4,${r.tall ? B.TALL_DIM : B.DIM})`; ctx.fillRect(0, camY, W, H);
    if (r.fog) r4Fog(r, r.fog);
  }
  const ce = roomImg(`w4/ceil_${r.rock}.png`); if (ce && camTop > camY - 300) tiles(ce, B.NEAR_P, camTop, ce.naturalWidth, ce.naturalHeight);
  const ne = roomImg(`w4/near_${r.near || r.rock}.png`); if (ne && B.NEAR_BOT > camY) { ctx.globalAlpha = B.NEAR_A; tiles(ne, B.NEAR_P, B.NEAR_BOT - ne.naturalHeight, ne.naturalWidth, ne.naturalHeight); ctx.globalAlpha = 1; }
  return true;
}
// his floor under David (over the ground's own tiles: region.js drawRegion), its tiles mirrored in turn, in the room only
function r4Floor(r, camX) {
  const fl = roomImg(`w4/floor_${r.ground}.png`); if (!fl) return false;
  const rx = r.c0 * T - camX, rw = r.w * T, y = GR * T - R4.FLOOR[r.ground], w = fl.naturalWidth, h = fl.naturalHeight;
  ctx.save(); ctx.beginPath(); ctx.rect(rx, camY, rw, H + 400); ctx.clip();
  ctx.fillStyle = "#14100c"; ctx.fillRect(rx, y + 30, rw, H + 400);
  for (let i = 0; i * w < rw; i++) {
    const x = Math.round(rx + i * w);
    if (x > W || x + w < 0) continue;
    if (i & 1) { ctx.save(); ctx.translate(x + w, 0); ctx.scale(-1, 1); ctx.drawImage(fl, 0, y, w, h); ctx.restore(); }
    else ctx.drawImage(fl, x, y, w, h);
  }
  for (const o of region.holes) {   // a drop in the floor: dark, soft at its edges (no kit edges in the caves)
    if (o.room !== r.id) continue;
    const x0 = o.x0 - camX - 14, x1 = o.x1 - camX + 14; if (x1 < 0 || x0 > W) continue;
    const g = ctx.createLinearGradient(x0, 0, x1, 0), e = Math.min(0.3, 30 / (x1 - x0));
    g.addColorStop(0, "rgba(4,3,2,0)"); g.addColorStop(e, "rgba(4,3,2,0.97)"); g.addColorStop(1 - e, "rgba(4,3,2,0.97)"); g.addColorStop(1, "rgba(4,3,2,0)");
    ctx.fillStyle = g; ctx.fillRect(x0, y + 50, x1 - x0, H + 400);
    for (let i = 0; i < 8; i++) { ctx.globalAlpha = (i + 1) / 9; ctx.fillRect(x0, y + 10 + i * 5, x1 - x0, 5); }   // (its top edge soft too)
    ctx.globalAlpha = 1;
  }
  ctx.restore();
  return true;
}
// (Glen 11-13: "We can also put fog in here too") mist drifting slowly across the room, in bands down its height, behind
//  the ledges (a: how thick)
function r4Fog(r, a) {
  const t = performance.now() / 1000, top = -(r.up || 0) * T - 200;
  for (let i = 0, y = top; y < GR * T + 100; i++, y += 230) {
    if (y < camY - 200 || y > camY + H + 200) continue;
    const sp = 14 + (i * 7) % 18, span = W + 900;
    for (let j = 0; j < 3; j++) {
      const x = (((i * 397 + j * span / 3 + t * sp * (i & 1 ? 1 : -1)) % span) + span) % span - 450;
      ctx.save(); ctx.translate(x, y + Math.sin(t * 0.3 + i + j) * 20); ctx.scale(2.6, 1);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 150); g.addColorStop(0, `rgba(205,215,220,${a})`); g.addColorStop(1, "rgba(205,215,220,0)");
      ctx.fillStyle = g; ctx.fillRect(-150, -150, 300, 300); ctx.restore();
    }
  }
}
// the rock down into the water (r4Lid): his rock pile, row on row, the bottom row upside down (hanging)
function r4DrawLids(camX) {
  for (const l of r4.lids) {
    if (l.room !== region.room.id) continue;
    const x0 = l.x0 - camX, x1 = l.x1 - camX; if (x1 < -60 || x0 > W + 60) continue;
    const n = "w4_rocks_dark", k = KIT[n], im = kitImg(n);
    ctx.save(); ctx.beginPath(); ctx.rect(x0 - 24, camY, x1 - x0 + 48, l.y - camY + 30); ctx.clip();
    ctx.fillStyle = "#15120e"; ctx.fillRect(x0, camY, x1 - x0, l.y - camY - 20);
    if (im) for (let y = l.y - k.h + 30, row = 0; y > camY - k.h; y -= k.h * 0.55, row++)
      for (let x = x0 - 30 + (row & 1) * k.w * 0.3, i = 0; x < x1 - 10; x += k.w * 0.6, i++) {
        ctx.save(); ctx.translate(Math.round(x + k.w / 2), Math.round(y + k.h / 2));
        if (row === 0) ctx.scale((i & 1) ? -1 : 1, -1); else if ((i + row) & 1) ctx.scale(-1, 1);
        ctx.drawImage(im, -k.w / 2, -k.h / 2, k.w, k.h); ctx.restore();
      }
    const g = ctx.createLinearGradient(0, l.y - 160, 0, l.y + 30); g.addColorStop(0, "rgba(10,8,6,0.75)"); g.addColorStop(1, "rgba(10,8,6,0.25)");
    ctx.fillStyle = "rgba(10,8,6,0.75)"; ctx.fillRect(x0 - 24, camY, x1 - x0 + 48, l.y - 160 - camY);
    ctx.fillStyle = g; ctx.fillRect(x0 - 24, l.y - 160, x1 - x0 + 48, 190);
    ctx.restore();
  }
}
const r4DarkCanvas = document.createElement("canvas");   // (sized when first drawn: the screen isn't made when this loads)
function r4DrawFront(camX) {
  const r = region.room, d = david; if (!r) return;
  if (r.water) { ctx.fillStyle = "rgba(30,95,130,0.28)"; ctx.fillRect(0, r.water, W, H - r.water); }   // (he's in it, not in front of it)
  if (r.dark) {
    if (r4DarkCanvas.width !== W || r4DarkCanvas.height !== H) { r4DarkCanvas.width = W; r4DarkCanvas.height = H; }
    const g = r4DarkCanvas.getContext("2d"), D = R4.DARK;
    g.globalCompositeOperation = "source-over"; g.clearRect(0, 0, W, H);
    g.fillStyle = `rgba(4,3,2,${r.dark})`; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "destination-out";
    const hole = (x, y, rad) => { const rg = g.createRadialGradient(x, y, rad * 0.1, x, y, rad); rg.addColorStop(0, "rgba(0,0,0,1)"); rg.addColorStop(0.55, "rgba(0,0,0,0.85)"); rg.addColorStop(1, "rgba(0,0,0,0)"); g.fillStyle = rg; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); };
    const flick = 1 + Math.sin(performance.now() / 70) * 0.025 + Math.sin(performance.now() / 23) * 0.015;
    const R = (r4Lamp() ? (d.olives > 0 ? D.LAMP : D.DIM) : D.NONE) * flick;
    const lx = d.x - camX + d.facing * 18, ly = d.y - 86 - camY;
    hole(lx, ly, R);
    for (const o of r4.tunnels) if (o.room === r.id) hole(o.x - camX, o.y - 60 - camY, D.GLOW);
    ctx.drawImage(r4DarkCanvas, 0, camY);
    if (r4Lamp()) { ctx.save(); ctx.globalCompositeOperation = "lighter";
      const wg = ctx.createRadialGradient(lx, ly + camY, 4, lx, ly + camY, R * 0.8); wg.addColorStop(0, "rgba(255,170,70,0.25)"); wg.addColorStop(1, "rgba(255,140,40,0)");
      ctx.fillStyle = wg; ctx.fillRect(lx - R, ly + camY - R, R * 2, R * 2); ctx.restore(); }
  }
  if (!r4.walk && !region.trans) for (const o of r4.tunnels) if (o.to && o.room === r.id && Math.abs(d.x - o.x) < 140 && Math.abs(d.y - o.y) < 160) upHint(o.x - camX, o.y - 200);
  const L = r4.lampAt, li = kitImg("w4_lamp"); if (L && L.room === r.id && !r4Lamp() && li) ctx.drawImage(li, L.x - camX - 39, L.y - 55, 78, 55);   // (the lamp, till he takes it)
  if (r4.swim || r4.breath < R4.SWIM.BREATH - 0.05) {   // his breath, over his head
    const k = Math.max(0, r4.breath / R4.SWIM.BREATH), x = d.x - camX - 40, y = d.y - 150;
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(x - 2, y - 2, 84, 12);
    ctx.fillStyle = k > 0.3 ? "#7fd8ff" : "#ff6a5a"; ctx.fillRect(x, y, 80 * k, 8);
  }
}
