// Part Two's regions (DESIGN.md "The land and its regions", Glen 2026-11-03: full Castlevania, one region per world).
// A region is one connected map of rooms, explored back and forth. It's built into the same tile grid as a stage:
// each room is its own stretch of columns with solid rock between, and walking off a room's edge (or pressing Up at a
// door, a stair or a well) fades to the room it leads to. The camera, the background and the map all follow the room
// David is standing in. Select opens the map of the rooms you've explored.
//
// Some spots are sealed until a skill from a later world (a well needs the rope, a cracked wall Goliath's sword, the
// watchtower rock the wall climb). Behind them: pomegranates (4 = one more heart, for good), oil jars, stones of
// remembrance and Truths. "?allskills" in the address opens every seal (for testing).
//
// The test region is "#9-5": Gibeah (World 1), on stand-in art (Part One's World 4 sets: the road, Gibeah's market,
// the fortress, the palace at night, and the cave layers) until Glen paints the palace.
// Loaded before main.js: only data and functions here; the layout is built when main.js calls buildRegion().

const REGION_ON = location.hash === "#9-5";
const RTUNE = {
  GAP: 6,            // columns of solid rock between rooms
  FADE: 0.22,        // seconds to fade out (and back in) when going through
  EDGE: 10,
  CLIMB_SPEED: 170,  // the rope, px/s
  WALL_SPEED: 150,   // the rock face, px/s
  WALL_STRIDE: 28,   // px climbed per frame of david_wallclimb_side
  FACE_REACH: 46,    // Up this close to a rock face starts the climb
  ROPE_IN_HANDS: 29, // where the rope is in his hands in david_climb (sheet px from the left of a frame)
  FACE_OFF: 32,      // his feet this far out from the face while he climbs
  TOP_OUT: 70,       // feet this close below the top: he's over it
  WELL_RIM: 17 * 36 - 52, WELL_DEEP: 150,   // the well's rim (y), and how far he goes down before the fade
  ROPE_TOP: 2 * 36, ROPE_HANG: 170,         // the cisterns' rope: where it hangs from, and his feet that far below it at the top          // px from a room's edge that takes you through
  CAM_TRIM: 60,      // px of each room's edge the camera keeps off screen (the rock between rooms is drawn spilling over)
  DOOR_REACH: 46,    // px from a door's middle where Up works
  RELIC_H: { pomegranate: 44, oil: 52, stone: 34, truth: 46 },   // how tall each find is drawn
  MAP_CELL: 78,      // the map screen: px per map cell
};
const RELIC_ART = { pomegranate: "pomegranate", oil: "camp_jar_small", stone: "stone_remembrance", truth: "davids_journal" };
const RELIC_NAME = { pomegranate: "Pomegranates", oil: "Oil jars", stone: "Stones of remembrance", truth: "Truths" };
// the skills that open seals, and how a sealed spot talks about the one it needs
const SEAL_SKILL = {
  rope: { name: "the rope", world: 2 }, heavySword: { name: "Goliath's sword", world: 3 }, wallClimb: { name: "the wall climb", world: 5 },
};

// ---- Gibeah ----
// mx, my, mw: where the room sits on the map screen (cells), and how many cells wide it is
const REGION = {
  key: "gibeah", name: "Gibeah",
  rooms: [
    { id: "fields",  name: "The Fields",       w: 84, bg: "w4_1", mx: 0, my: 2, mw: 3, left: "@road", right: "town" },   // "@road": off the left edge, out of Gibeah
    { id: "town",    name: "The Town",         w: 74, bg: "w4_3", mx: 3, my: 2, mw: 3, left: "fields", right: "walls" },
    { id: "walls",   name: "The Walls",        w: 64, bg: "w4_2", mx: 6, my: 2, mw: 2, left: "town" },
    { id: "halls",   name: "The Palace Halls", w: 62, bg: "w4_4", mx: 6, my: 1, mw: 2, right: "harp" },
    { id: "harp",    name: "The Harp Room",    w: 34, bg: "w4_4", mx: 8, my: 1, mw: 1, left: "halls" },
    { id: "cellars", name: "The Cellars",      w: 64, cave: true, mx: 6, my: 3, mw: 2 },
    { id: "cisterns", name: "The Cisterns",    w: 50, cave: true, mx: 4, my: 3, mw: 2 },
  ],
};
(() => { let c = RTUNE.GAP; for (const r of REGION.rooms) { r.c0 = c; c += r.w + RTUNE.GAP; } REGION.cols = c; })();
const REGION_COLS = REGION.cols;
const roomById = id => REGION.rooms.find(r => r.id === id);

// ---- the save: which rooms you've been in, what you've found, which seals you've seen, where you last saved ----
const region = { room: null, fade: 0, trans: null, mapOpen: false, mapT: 0, inited: false, sealNear: null,
  doors: [], relics: [], seals: [], walls: [], climb: null, save: { at: null, explored: [], taken: [], seen: [], sealsSeen: [] } };
function regionSaveKey() { return slotKey("david2Region") + "_" + REGION.key; }   // (read in buildRegion: slotKey is main.js's)
function regionWrite() { try { localStorage.setItem(regionSaveKey(), JSON.stringify(region.save)); } catch (e) {} }
const regionHas = (list, id) => region.save[list].includes(id);
function regionAdd(list, id) { if (!regionHas(list, id)) { region.save[list].push(id); regionWrite(); } }
// where David starts: the olive press he last saved at, or the start of the fields
function regionStartCol() { return region.save.at != null ? region.save.at : roomById("fields").c0 + 3; }

// ---- building (called by main.js's layout, so its helpers exist by then) ----
// a door: kind "door" (a doorway), "stairs" (a stair going down / up), "well" (down a well), "rope" (a rope up out of
// the well); to: the door id it leads to; need: the skill that unseals it
function rDoor(id, room, c, kind, to, need = null) { region.doors.push({ id, room, c, x: c * T + T / 2, kind, to, need }); }
function rRelic(id, kind, c, r, text = null) { region.relics.push({ id, kind, c, r, x: c * T + T / 2, y: (r + 1) * T, text, t: Math.random() * 6 }); }
function rSeal(id, room, c, need, say, x0, x1) { region.seals.push({ id, room, need, say, x: c * T + T / 2, x0: x0 * T, x1: x1 * T }); }
const sealOpen = s => hasSkill(s.need);

function buildRegion() {
  try { Object.assign(region.save, JSON.parse(localStorage.getItem(regionSaveKey()) || "{}")); } catch (e) {}
  // rock between rooms (and before the first)
  for (const r of REGION.rooms) rock(r.c0 - RTUNE.GAP, 0, RTUNE.GAP, ROWS);
  const last = REGION.rooms[REGION.rooms.length - 1]; rock(last.c0 + last.w, 0, RTUNE.GAP, ROWS);
  const R = id => roomById(id).c0;

  // -- The Fields: Philistine raids come later; for now the wild things, a ledge climb to a stone, and the watchtower rock
  let c = R("fields");
  ground(c, c + 83);
  campfire(c + 4, GR - 1);   // (an olive press: the save point; a campfire until Glen paints one)
  label(c + 6, 6, "Gibeah of Saul: the region test. Select = the map.");
  oliveRow(c + 9, 16, 5);
  plat(c + 18, 13, 4); plat(c + 24, 10, 4); plat(c + 30, 7, 3); oliveRow(c + 24, 9, 4);
  rRelic("g_stone_fields", "stone", c + 31, 6);
  snake("viper", c + 38); critter("scorpion", c + 44);
  // the watchtower rock: too sheer to climb without the wall climb (Up at either face, then Up / Down; it tops out onto
  // the top). Glen 11-03: it blocked the way on, so there's a gap along the ground he walks under (3 rows: crawling
  // meant holding Down, which picks up the lamb when he's by it).
  rock(c + 52, 4, 7, 10);
  region.walls.push({ room: "fields", x0: (c + 52) * T, x1: (c + 59) * T, top: 4 * T, need: "wallClimb", seal: "g_seal_tower" });
  rSeal("g_seal_tower", "fields", c + 50, "wallClimb", "The watchtower rock is too sheer to climb. Not yet.", c + 46, c + 52);
  rRelic("g_pom_tower", "pomegranate", c + 55, 3);
  oliveArc(c + 62, 16, 6); deco("olive_tree", c + 70, 16, 1.05, "back", "golden_olive");
  snake("whip", c + 76);

  // -- The Town: the market, rooftops, and the old well (down into the cisterns: needs the rope)
  c = R("town");
  ground(c, c + 73);
  deco("cloth_stall", c + 8, 16, 0.5); deco("town_clay_pots", c + 13, 16, 0.4); deco("town_fig_rack", c + 18, 16, 0.4);
  wall(c + 22, 14, 6, 3); plat(c + 24, 11, 4); plat(c + 29, 8, 5); plat(c + 36, 5, 5);   // up over the rooftops
  oliveRow(c + 29, 7, 5);
  rRelic("g_truth_song", "truth", c + 39, 4,
    "The women came out of all the cities of Israel, singing and dancing, to meet King Saul. They sang: \"Saul has slain his thousands, and David his ten thousands.\" (1 Samuel 18:6-7)");
  campfire(c + 46, GR - 1);
  rDoor("d_well", "town", c + 56, "well", "d_wellrope", "rope");
  rSeal("g_seal_well", "town", c + 56, "rope", "An old well, deep and dark. You'd need a rope to get down there.", c + 53, c + 59);
  deco("town_grain_baskets", c + 64, 16, 0.4); oliveRow(c + 62, 16, 6);

  // -- The Walls: the fortress yard, the gate into the palace, the stair down to the cellars
  c = R("walls");
  ground(c, c + 63);
  wall(c + 10, 13, 3, 4); plat(c + 14, 10, 4); plat(c + 20, 7, 3);
  rRelic("g_stone_walls", "stone", c + 21, 6);
  rDoor("d_gate", "walls", c + 32, "door", "d_hallsgate");
  rDoor("d_down", "walls", c + 50, "stairs", "d_cellarup");
  oliveRow(c + 40, 16, 6);

  // -- The Palace Halls (up through the gate)
  c = R("halls");
  ground(c, c + 61);
  rDoor("d_hallsgate", "halls", c + 4, "door", "d_gate");
  deco("hall_lamp_lit", c + 14, 12, 0.6); deco("hall_lamp_lit", c + 34, 12, 0.6); deco("hall_lamp_lit", c + 54, 12, 0.6);
  plat(c + 22, 12, 5); plat(c + 30, 9, 4); oliveRow(c + 22, 11, 5);
  rRelic("g_stone_halls", "stone", c + 32, 8);
  campfire(c + 44, GR - 1);

  // -- The Harp Room: the boss comes later (1 Samuel 18:10-11)
  c = R("harp");
  ground(c, c + 33);
  deco("throne", c + 24, 16, 0.6);
  label(c + 4, 6, "The harp room: Saul and the spear come later (1 Samuel 18:10-11).");

  // -- The Cellars (down the stair): storerooms; a cracked wall (Goliath's sword) hides an oil jar
  c = R("cellars");
  ground(c, c + 63);
  rDoor("d_cellarup", "cellars", c + 4, "stairs", "d_down");
  oliveRow(c + 10, 16, 6); plat(c + 18, 13, 4); plat(c + 24, 10, 4);
  rRelic("g_stone_cellar", "stone", c + 26, 9);
  critter("scorpion", c + 34);
  if (!hasSkill("heavySword")) wall(c + 46, 2, 2, 15);              // the cracked wall, floor to ceiling
  rSeal("g_seal_crack", "cellars", c + 46, "heavySword", "Cracked stone, with a draft coming through. Something heavy could break it.", c + 42, c + 47);
  region.crack = { c: c + 46, r: 2, w: 2, h: 15 };
  rRelic("g_oil_cellar", "oil", c + 56, 16);
  oliveRow(c + 50, 16, 4);

  // -- The Cisterns (down the well, with the rope): a pomegranate and a Truth
  c = R("cisterns");
  ground(c, c + 49);
  rDoor("d_wellrope", "cisterns", c + 4, "rope", "d_well");
  pitFloor(c + 14, 3); plat(c + 14, 14, 3);
  plat(c + 22, 12, 4); plat(c + 28, 9, 4);
  rRelic("g_pom_cistern", "pomegranate", c + 30, 8);
  rRelic("g_truth_covenant", "truth", c + 44, 16,
    "Jonathan made a covenant with David, because he loved him as his own soul. Jonathan took off the robe that was on him and gave it to David, with his armor, even his sword, his bow, and his sash. (1 Samuel 18:3-4)");
}

// ---- running it ----
const roomAt = x => REGION.rooms.find(r => x >= (r.c0 - RTUNE.GAP) * T && x < (r.c0 + r.w) * T) || REGION.rooms[0];
function regionCam() {
  if (!REGION_ON) return null;
  const r = roomAt(david.x), a = r.c0 * T + RTUNE.CAM_TRIM, b = (r.c0 + r.w) * T - W - RTUNE.CAM_TRIM;
  return a > b ? [(a + b) / 2, (a + b) / 2] : [a, b];
}
function regionInit() {
  region.inited = true;
  const poms = region.save.taken.filter(id => id.startsWith("g_pom")).length;
  const extra = Math.floor(poms / 4); david.maxHearts += extra; david.hearts += extra;   // every 4 pomegranates: one more heart, for good
  david.specialStones += region.save.taken.filter(id => id.startsWith("g_stone")).length;
}
function regionGo(x, facing, after = null) {   // fade out, move, fade in (after: what happens once he's moved, e.g. onto a rope)
  region.trans = { t: 0, x, facing, moved: false, after };
}
function updateRegion(dt) {
  if (!REGION_ON) return;
  if (!region.inited) regionInit();
  const d = david;
  // the room he's in: the camera, the background and the map follow it
  const r = roomAt(d.x);
  if (r !== region.room) {
    region.room = r;
    if (!regionHas("explored", r.id)) { regionAdd("explored", r.id); toast(r.name); }
  }
  bgWorld = r.bg || bgWorld;
  // going through: fade out, move him (and the party), fade back in
  const tr = region.trans;
  if (tr) {
    tr.t += dt;
    if (tr.leave) {   // out of Gibeah: for now, back to the game's map (the travel map of the land comes later)
      region.fade = Math.min(1, tr.t / (RTUNE.FADE * 2));
      if (tr.t > RTUNE.FADE * 2 + 0.2 && !tr.gone) { tr.gone = true; location.href = "index.html"; }
      return;
    }
    if (!tr.moved) {
      region.fade = Math.min(1, tr.t / RTUNE.FADE);
      if (tr.t >= RTUNE.FADE) { tr.moved = true; tr.t0 = tr.t; d.facing = tr.facing; moveParty(tr.x, GR * T); if (typeof p2 !== "undefined" && p2.on) { p2.x = tr.x - tr.facing * 60; p2.y = GR * T; p2.vx = p2.vy = 0; } if (tr.after) tr.after(); }
    } else {
      region.fade = Math.max(0, 1 - (tr.t - tr.t0) / RTUNE.FADE);
      if (region.fade <= 0) region.trans = null;
    }
    return;
  }
  if (d.deadT > 0) return;
  // off the edge of the room, into the next
  const left = r.c0 * T, right = (r.c0 + r.w) * T;
  if (r.left === "@road" && d.x < left + RTUNE.EDGE + BODY_W / 2 && held("left")) { region.trans = { t: 0, leave: true }; return; }   // the road out (Glen 11-03)
  if (r.left && r.left !== "@road" && d.x < left + RTUNE.EDGE + BODY_W / 2 && held("left")) { const n = roomById(r.left); regionGo((n.c0 + n.w - 2) * T, -1); return; }
  if (r.right && d.x > right - RTUNE.EDGE - BODY_W / 2 && held("right")) { const n = roomById(r.right); regionGo((n.c0 + 2) * T, 1); return; }
  // a door, a stair, a well: Up
  if (region.climb) return;   // on the rope or the rock face (regionClimbHold)
  if (pressed("up") && d.onGround && regionClimbStart(d)) return;
  if (pressed("up") && d.onGround) {
    const door = region.doors.find(o => Math.abs(d.x - o.x) < RTUNE.DOOR_REACH && Math.abs(d.y - GR * T) < 30);
    if (door) {
      const seal = door.need && region.seals.find(s => s.need === door.need && Math.abs(s.x - door.x) < 3 * T);
      if (door.need && !hasSkill(door.need)) { if (seal) sealSay(seal); }
      else { const to = region.doors.find(o => o.id === door.to); regionGo(to.x + 30, 1); }
      return;
    }
  }
  // seals: say what's wrong when he comes up to one (once per visit), and put it on the map
  const s = region.seals.find(q => q.room === r.id && !sealOpen(q) && d.x > q.x0 && d.x < q.x1);
  if (s && region.sealNear !== s) sealSay(s);
  region.sealNear = s || null;
  // finds: pick them up
  for (const f of region.relics) {
    if (regionHas("taken", f.id)) continue;
    f.t += dt;
    if (Math.abs(f.x - d.x) < W * 0.6 && roomAt(f.x) === r) regionAdd("seen", f.id);
    if (Math.abs(f.x - d.x) < 34 && d.y > f.y - 70 && d.y - d.h < f.y + 10) takeRelic(f);
  }
}
// ---- climbing (Glen 11-03): the rope down the well and back up (david_climb, his back to us), and the watchtower's
//      face (david_wallclimb_side). region.climb while he's on one: { kind: "rope" | "well" | "wall", ... }
function regionClimbStart(d) {   // Up on the ground: by the well, the rope in the cisterns, or a rock face
  const r = roomAt(d.x);
  for (const o of region.doors) {
    if (Math.abs(d.x - o.x) > RTUNE.DOOR_REACH) continue;
    if (o.kind === "well" && hasSkill("rope")) {   // over the rim and down
      region.climb = { kind: "well", dir: 1, x: o.x, dist: 0 }; d.x = o.x; d.y = RTUNE.WELL_RIM; d.vx = d.vy = 0; d.facing = 1;
      sfx("jump", undefined, 0.3, 0.8); return true;
    }
    if (o.kind === "rope") { region.climb = { kind: "rope", x: o.x, dist: 0 }; d.x = o.x; d.vx = d.vy = 0; return true; }
  }
  for (const w of region.walls) {
    if (w.room !== r.id) continue;
    const face = Math.abs(d.x - w.x0) < RTUNE.FACE_REACH && d.x < w.x0 + 4 ? { x: w.x0, f: 1 }
               : Math.abs(d.x - w.x1) < RTUNE.FACE_REACH && d.x > w.x1 - 4 ? { x: w.x1, f: -1 } : null;
    if (!face) continue;
    if (!hasSkill(w.need)) { const s = region.seals.find(q => q.id === w.seal); if (s) sealSay(s); return true; }
    region.climb = { kind: "wall", wall: w, fx: face.x, f: face.f, dist: 0 }; d.facing = face.f; d.vx = d.vy = 0; d.x = face.x - face.f * RTUNE.FACE_OFF;
    return true;
  }
  return false;
}
function regionClimbHold(d, dt) {   // main.js updateDavid: true while he's climbing (no gravity, no walking)
  const c = REGION_ON && region.climb; if (!c) return false;
  d.vx = 0; d.vy = 0; d.onGround = false; d.swordT = -1; d.shield = false; d.charging = false; d.throwT = -1;
  if (d.state !== "idle") setState("idle");
  if (region.trans) return true;   // fading between rooms: hold still
  const v = (held("down") ? 1 : 0) - (held("up") ? 1 : 0);
  if (c.kind === "well") {   // into the well (down to the cisterns) or up out of it (back into the town)
    const sp = RTUNE.CLIMB_SPEED * 0.8;
    d.x = c.x; d.y += c.dir * sp * dt; c.dist += sp * dt;
    if (c.dir > 0 && d.y > RTUNE.WELL_RIM + RTUNE.WELL_DEEP && !c.gone) {   // down out of sight: on to the rope in the cisterns
      c.gone = true; const to = region.doors.find(o => o.id === "d_wellrope");
      regionGo(to.x, 1, () => {
        region.climb = { kind: "rope", x: to.x, dist: 0 }; david.x = to.x; david.y = RTUNE.ROPE_TOP + RTUNE.ROPE_HANG; snapCamera();
        if (!region.ropeTold) { region.ropeTold = true; toast("Down the rope: hold Down. Up climbs back out. A lets go."); }
      });
    }
    if (c.dir < 0 && d.y <= RTUNE.WELL_RIM) {   // over the rim and out
      d.y = GR * T; d.x = c.x + 64; d.onGround = true; d.facing = 1; region.climb = null;
    }
    return true;
  }
  if (c.kind === "rope") {
    d.x = c.x; d.y += v * RTUNE.CLIMB_SPEED * dt; c.dist += Math.abs(v) * RTUNE.CLIMB_SPEED * dt;
    if (d.y >= GR * T) { d.y = GR * T; d.onGround = true; region.climb = null; return true; }   // down on the floor
    if (d.y <= RTUNE.ROPE_TOP + RTUNE.ROPE_HANG - 10 && !c.gone) {   // up into the well shaft: out into the town
      c.gone = true; const w = region.doors.find(o => o.id === "d_well");
      regionGo(w.x, 1, () => { region.climb = { kind: "well", dir: -1, x: w.x, dist: 0 }; david.x = w.x; david.y = RTUNE.WELL_RIM + RTUNE.WELL_DEEP; snapCamera(); });
    }
    if (pressed("a") && !c.gone) { region.climb = null; setState("jump"); }   // let go
    return true;
  }
  if (c.kind === "wall") {
    const w = c.wall;
    d.x = c.fx - c.f * RTUNE.FACE_OFF; d.y += v * RTUNE.WALL_SPEED * dt; c.dist += Math.abs(v) * RTUNE.WALL_SPEED * dt;
    if (d.y >= GR * T) { d.y = GR * T; d.onGround = true; region.climb = null; return true; }
    if (d.y <= w.top + RTUNE.TOP_OUT) { d.y = w.top; d.x = c.fx + c.f * 30; d.onGround = true; region.climb = null; return true; }   // over the top
    if (pressed("a")) { region.climb = null; d.vx = -c.f * TUNE.WALK_SPEED * 0.6; d.vy = -TUNE.JUMP_SPEED * 0.5; d.facing = -c.f; setState("jump"); }   // push off
    return true;
  }
  return true;
}
function drawRegionClimb(d, x, y) {   // main.js drawDavid: true if it drew him
  const c = REGION_ON && region.climb; if (!c) return false;
  if (c.kind === "wall") {
    // (Glen 11-03: he climbed too low) the sheet's anchor is its middle, not his feet: lift it so his feet are at y
    const n = "david_wallclimb_side", s = SPR[n], up = (s.h - 6 - s.ay) * SCALE * (TUNE.SPRITE_SIZE[n] || 1);
    drawSprite(n, Math.floor(c.dist / RTUNE.WALL_STRIDE) % s.frames, x, y - up, c.f); return true;
  }
  // (Glen 11-03: he was off the rope) the rope in his hands is at x 29 of the sheet's 130, left of its anchor: move him
  // over so his hands are on our rope
  const n = "david_climb", i = Math.floor(c.dist / TUNE.CLIMB_STRIDE) % SPR[n].frames;
  const hx = x + (SPR[n].ax - RTUNE.ROPE_IN_HANDS) * SCALE * (TUNE.SPRITE_SIZE[n] || 1);
  if (c.kind === "well") {   // the rim hides what's down in the well
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, RTUNE.WELL_RIM); ctx.clip(); drawSprite(n, i, hx, y, 1); ctx.restore(); return true;
  }
  drawSprite(n, i, hx, y, 1); return true;
}
function sealSay(s) {
  regionAdd("sealsSeen", s.id);
  const k = SEAL_SKILL[s.need];
  toast(s.say + (k ? ` (Come back with ${k.name}: World ${k.world}.)` : ""));
}
function takeRelic(f) {
  regionAdd("taken", f.id);
  if (typeof chime === "function") { chime(4); setTimeout(() => chime(7), 140); }
  if (f.kind === "truth") { sayLine("A Truth", f.text); return; }
  if (f.kind === "stone") { david.specialStones++; toast("A stone of remembrance! Keep it, or A + B for a Power Sling."); return; }
  if (f.kind === "oil") { david.lampOil += 20; toast("An oil jar! Your lamp will burn longer."); return; }
  if (f.kind === "pomegranate") {
    const n = region.save.taken.filter(id => id.startsWith("g_pom")).length;
    if (n % 4 === 0) { david.maxHearts++; david.hearts = david.maxHearts; toast("A pomegranate! Four of them: one more heart, for good."); }
    else { david.hearts = Math.min(david.maxHearts, david.hearts + 1); toast(`A pomegranate! (${n % 4} of 4 for one more heart)`); }
  }
}
function regionFireLit(f) {   // an olive press (a campfire, for now): save here
  if (!REGION_ON) return;
  region.save.at = Math.round((f.x - 30) / T); regionWrite();
}

// ---- drawing ----
function drawRegionBackdrop(camX) {   // true if it drew the room's backdrop
  if (!REGION_ON) return false;
  const r = region.room || roomAt(david.x);
  if (r.cave) {   // Part One's cave layers, lit (the lamp comes in World 4)
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#2a1f15"); g.addColorStop(1, "#120c08");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const rel = camX - r.c0 * T, far = CAVE_BG.far;
    if (far.naturalWidth) { const w = far.naturalWidth * H / far.naturalHeight; ctx.save(); ctx.globalAlpha = 0.75; ctx.drawImage(far, -rel * 0.08 - 40, 0, w, H); ctx.restore(); }
    drawLayerRepeating(CAVE_BG.mid, rel, 0.35, H, H, true);
    drawLayerRepeating(CAVE_BG.near, rel, 0.65, GR * T + 40, 260, true);
    return true;
  }
  drawBackground(camX - r.c0 * T);
  return true;
}
function drawRegion(camX) {
  if (!REGION_ON) return;
  const d = david, now = performance.now() / 1000;
  for (const o of region.doors) {
    const x = o.x - camX; if (x < -200 || x > W + 200) continue;
    drawDoorArt(o, x);
    if (Math.abs(d.x - o.x) < 140 && Math.abs(d.y - GR * T) < 60 && !region.trans) upHint(x, GR * T - 200);
  }
  // the cracked wall in the cellars, until it's broken
  if (region.crack && !hasSkill("heavySword")) {
    const k = region.crack, x = k.c * T - camX;
    if (x > -100 && x < W + 100) {
      ctx.save();
      const top = k.r * T, h = k.h * T, w = k.w * T;   // a wall of dressed stone, cracked top to bottom
      ctx.fillStyle = "#8d7d66"; ctx.fillRect(x, top, w, h);
      ctx.strokeStyle = "#5a4c3c"; ctx.lineWidth = 2;
      for (let y = top, row = 0; y < top + h; y += 30, row++) for (let bx = x - (row % 2) * 18; bx < x + w; bx += 36) ctx.strokeRect(Math.max(x, bx), y, Math.min(36, x + w - Math.max(x, bx)), 30);
      ctx.strokeStyle = "rgba(20,12,6,0.85)"; ctx.lineWidth = 3; ctx.beginPath();
      for (let y = k.r * T + 30; y < (k.r + k.h) * T; y += 70) { ctx.moveTo(x + 10, y); ctx.lineTo(x + 40, y + 25); ctx.lineTo(x + 24, y + 50); ctx.lineTo(x + 60, y + 70); }
      ctx.stroke(); ctx.restore();
    }
  }
  for (const f of region.relics) {
    if (regionHas("taken", f.id)) continue;
    const x = f.x - camX; if (x < -80 || x > W + 80) continue;
    const img = ITEM[RELIC_ART[f.kind]], h = RTUNE.RELIC_H[f.kind];
    const glow = ctx.createRadialGradient(x, f.y - h / 2, 2, x, f.y - h / 2, h * 1.2);
    glow.addColorStop(0, "rgba(255,240,170,0.55)"); glow.addColorStop(1, "rgba(255,230,150,0)");
    ctx.fillStyle = glow; ctx.fillRect(x - h * 1.3, f.y - h / 2 - h * 1.3, h * 2.6, h * 2.6);
    if (img && img.naturalHeight) drawItem(RELIC_ART[f.kind], x, f.y - 4 + Math.sin(now * 2.4 + f.t) * 4, h / img.naturalHeight);
  }
}
function drawDoorArt(o, x) {   // stand-ins until Glen paints them
  const y = GR * T;
  ctx.save();
  if (o.kind === "door") {   // a stone doorway, dark inside
    ctx.fillStyle = "#5e5040"; ctx.beginPath(); ctx.roundRect(x - 46, y - 170, 92, 170, [46, 46, 0, 0]); ctx.fill();
    ctx.fillStyle = "#1a120c"; ctx.beginPath(); ctx.roundRect(x - 34, y - 156, 68, 156, [34, 34, 0, 0]); ctx.fill();
  } else if (o.kind === "stairs") {   // a dark stairway in the floor (down) or a lit one (up, from below)
    const up = roomAt(o.x).cave;
    ctx.fillStyle = up ? "rgba(255,226,160,0.35)" : "#1a120c"; ctx.beginPath(); ctx.roundRect(x - 40, y - 130, 80, 130, [10, 10, 0, 0]); ctx.fill();
    ctx.fillStyle = up ? "#8a7458" : "#4a3c2e";
    for (let k = 0; k < 5; k++) ctx.fillRect(x - 36 + k * 6, y - 22 - k * 22, 72 - k * 12, 8);
  } else if (o.kind === "well") {   // a ring of stones (and with the rope: a beam over it and the rope tied on, hanging in)
    if (hasSkill("rope")) {
      ctx.fillStyle = "#6b4f33"; ctx.fillRect(x - 50, y - 190, 8, 140); ctx.fillRect(x + 42, y - 190, 8, 140); ctx.fillRect(x - 56, y - 196, 112, 10);
      ctx.strokeStyle = "#a88a5a"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y - 190); ctx.lineTo(x, y - 52); ctx.stroke();
    }
    ctx.fillStyle = "#1a120c"; ctx.beginPath(); ctx.ellipse(x, y - 52, 42, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#7a6a55"; ctx.fillRect(x - 46, y - 52, 92, 52);
    ctx.strokeStyle = "#4e4234"; ctx.lineWidth = 2;
    for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) ctx.strokeRect(x - 46 + k * 23 + (r % 2) * 11, y - 52 + r * 17, 23, 17);
  } else if (o.kind === "rope") {   // a rope hanging down out of the well's mouth, and a little daylight
    const lg = ctx.createRadialGradient(x, 2 * T, 4, x, 2 * T, 160);
    lg.addColorStop(0, "rgba(255,236,190,0.7)"); lg.addColorStop(1, "rgba(255,220,150,0)");
    ctx.fillStyle = lg; ctx.fillRect(x - 160, 0, 320, 260);
    ctx.strokeStyle = "#a88a5a"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, 2 * T); ctx.quadraticCurveTo(x + 6, y - 120, x - 2, y - 30); ctx.stroke();
  }
  ctx.restore();
}
function drawRegionOver() {
  if (!REGION_ON) return;
  if (region.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${region.fade})`; ctx.fillRect(0, 0, W, H); }
}

// ---- the map screen (Select): the rooms you've been in, where you are, the seals you've seen, the finds you've
//      seen but not picked up, and the olive presses ----
function regionMapFrame(dt) {   // true while the map has the screen
  if (!REGION_ON) return false;
  if (!region.mapOpen) {
    if (pressed("select") && !region.trans && david.deadT <= 0) { region.mapOpen = true; region.mapT = 0; }
    else return false;
  } else if (region.mapT > 0.15 && (pressed("select") || pressed("b") || pressed("a") || pressed("start"))) { region.mapOpen = false; return true; }
  region.mapT += dt;
  drawRegionMap();
  return true;
}
function drawRegionMap() {
  const C = RTUNE.MAP_CELL, cols = Math.max(...REGION.rooms.map(r => r.mx + r.mw)), rows = Math.max(...REGION.rooms.map(r => r.my + 1));
  const ox = (W - cols * C) / 2, oy = 150;
  ctx.fillStyle = "#e9dcc0"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(120,90,50,0.12)"; for (let k = 0; k < 40; k++) ctx.fillRect((k * 337) % W, (k * 211) % H, 120, 2);
  ctx.textAlign = "center"; ctx.fillStyle = "#4a3a2a"; ctx.font = "bold 40px Georgia, serif";
  ctx.fillText(REGION.name, W / 2, 70);
  ctx.font = "18px Georgia, serif"; ctx.fillText("Select, A or B: back to the game", W / 2, H - 24);
  const blink = Math.floor(performance.now() / 300) % 2;
  const cur = region.room || roomAt(david.x);
  for (const r of REGION.rooms) {
    const been = regionHas("explored", r.id);
    if (!been) continue;
    const x = ox + r.mx * C, y = oy + r.my * C;
    ctx.fillStyle = r.cave ? "#8a7a64" : "#c9a86e"; ctx.fillRect(x + 3, y + 3, r.mw * C - 6, C - 6);
    ctx.strokeStyle = "#4a3a2a"; ctx.lineWidth = 3; ctx.strokeRect(x + 3, y + 3, r.mw * C - 6, C - 6);
    ctx.fillStyle = "#2e2418"; ctx.font = "15px Georgia, serif"; ctx.fillText(r.name.replace(/^The /, ""), x + r.mw * C / 2, y + C - 12);
    // the edges you can walk through: a gap in the wall
    ctx.fillStyle = r.cave ? "#8a7a64" : "#c9a86e";
    if (r.right) ctx.fillRect(x + r.mw * C - 6, y + C / 2 - 10, 12, 20);
    if (r.left) ctx.fillRect(x - 6, y + C / 2 - 10, 12, 20);
    const fx = cx => x + 3 + (cx / T - r.c0) / r.w * (r.mw * C - 6);   // a column in this room, on the map
    for (const o of region.doors) if (roomAt(o.x) === r && !(o.need && !hasSkill(o.need))) { ctx.fillStyle = "#2e2418"; ctx.fillRect(fx(o.x) - 4, y + 12, 8, 14); }
    for (const f of fires) if (roomAt(f.x) === r) { ctx.fillStyle = "#6b8e23"; ctx.beginPath(); ctx.arc(fx(f.x), y + 36, 7, 0, Math.PI * 2); ctx.fill(); }
    for (const f of region.relics) if (roomAt(f.x) === r && regionHas("seen", f.id) && !regionHas("taken", f.id)) { ctx.fillStyle = "#b03a2e"; ctx.beginPath(); ctx.arc(fx(f.x), y + 36, 5, 0, Math.PI * 2); ctx.fill(); }
    for (const s of region.seals) if (roomAt(s.x) === r && regionHas("sealsSeen", s.id) && !sealOpen(s)) {
      ctx.strokeStyle = "#7a1f14"; ctx.lineWidth = 3; const sx = fx(s.x);
      ctx.beginPath(); ctx.moveTo(sx - 7, y + 16); ctx.lineTo(sx + 7, y + 30); ctx.moveTo(sx + 7, y + 16); ctx.lineTo(sx - 7, y + 30); ctx.stroke();
    }
    if (r === cur && blink) { ctx.fillStyle = "#1f5fa8"; ctx.beginPath(); ctx.arc(fx(david.x), y + C / 2 + 4, 8, 0, Math.PI * 2); ctx.fill(); }
  }
  // the key, and the tally
  const ky = oy + rows * C + 40;
  ctx.textAlign = "left"; ctx.font = "17px Georgia, serif"; ctx.fillStyle = "#2e2418";
  const keyItems = [["#1f5fa8", "You"], ["#6b8e23", "Olive press (save)"], ["#b03a2e", "Something you saw but didn't get"], ["#7a1f14", "X  Sealed: come back later"]];
  let kx = W / 2 - 420;
  for (const [col, t] of keyItems) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(kx, ky - 6, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#2e2418"; ctx.fillText(t, kx + 14, ky); kx += ctx.measureText(t).width + 50; }
  const count = k => [region.relics.filter(f => f.kind === k && regionHas("taken", f.id)).length, region.relics.filter(f => f.kind === k).length];
  ctx.textAlign = "center"; ctx.font = "19px Georgia, serif";
  const tally = ["pomegranate", "oil", "stone", "truth"].map(k => { const [a, b] = count(k); return `${RELIC_NAME[k]} ${a} of ${b}`; }).join("     ");
  ctx.fillText(tally, W / 2, ky + 40);
  ctx.fillText(`Rooms explored: ${region.save.explored.length} of ${REGION.rooms.length}`, W / 2, ky + 72);
}
