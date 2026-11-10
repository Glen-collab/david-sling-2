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

// (Glen 11-06) which region: "#9-5" Gibeah (World 1), "#9-6" World 2, The Window (ramah.js, loaded before this file)
const REGION_KEY = location.hash === "#9-7" ? "nobgath" : location.hash === "#9-6" ? "ramah" : location.hash === "#9-5" ? "gibeah" : null;   // (11-10: "#9-7" World 3, Nob and Gath: nobgath.js)
const REGION_ON = !!REGION_KEY;
const REGION_UP = 110;   // rows a tall room can reach up above the screen's top (main.js TOP_ROW; a room's own: up)
const RTUNE = {
  GAP: 6,            // columns of solid rock between rooms
  FADE: 0.22,        // seconds to fade out (and back in) when going through
  EDGE: 10,
  CLIMB_SPEED: 170,  // the rope, px/s
  WALL_SPEED: 150,   // the rock face, px/s
  WALL_STRIDE: 28,   // px climbed per frame of david_wallclimb_side
  FACE_REACH: 46,    // Up this close to a rock face starts the climb
  ROPE_W: 7,         // (Glen 11-03: half to 5/8 of the first 12) how wide the rope is drawn (Glen's rope picture, repeated down its length)
  ROPE_IN_HANDS: 29, // where the rope is in his hands in david_climb (sheet px from the left of a frame)
  FACE_OFF: 14,      // his feet this far out from the face while he climbs (Glen 11-03: close, so his hands and knee are on the rock)
  TOP_OUT: 70,       // feet this close below the top: he's over it
  // Glen's well (11-04, tools/cut_well_climb.py): town_well (404 x 400) and his climb-out sheet david_well_climb, the
  // well in every frame, on the picture's own grid. Both are drawn at David's sprite size times WELL_K (his David in the
  // sheet is that much smaller than our sheets), so the sheet sits exactly over the well.
  WELL_K: 1.03,
  WELL_SHEET: "david_well_climb", WELL_MS: 100,
  WELL_OPEN_X: 268,  // ...in the picture: the middle of the hole (where he stands in frame 0; the well's spot is here)
  WELL_BOTTOM: 282,  // ...in the picture: the well's base
  WELL_RIM: [62, 182],   // ...where he's crouched on the rim at the end: picture px right of the hole's middle, up from the base
  WELL_HOP: 0.3,     // s: the hop from the ground up onto the rim, going in
  LEDGE_SHEET: "david_ledge_climb",   // Glen's climb-over clip (11-03): walk up, hands on, hop up, crouched on top
  LEDGE_FEET: -11,   // ...his feet at the start, px from the wall's edge (the sheet's anchor)
  LEDGE_TOP: 24,     // ...the middle of him crouched on top at the end, px from the edge
  WELL_SINK: 18,     // ...set this far into the ground (Glen 11-04: down into the topsoil, so the round base doesn't show)
  ROPE_TOP: 2 * 36, ROPE_HANG: 170,         // the cisterns' rope: where it hangs from, and his feet that far below it at the top          // px from a room's edge that takes you through
  CAM_TRIM: 60,      // px of each room's edge the camera keeps off screen (the rock between rooms is drawn spilling over)
  DOOR_REACH: 46,    // px from a door's middle where Up works
  RELIC_H: { pomegranate: 44, oil: 52, stone: 34, truth: 46, key: 62 },   // how tall each find is drawn
  MAP_CELL: 78,      // the map screen: px per map cell
  // health (Glen 11-03: Castlevania-style, a meter that keeps growing): one of Part One's hearts is this many here, so
  // David starts with 40, a pomegranate upgrade adds 10, and an enemy can bite off a few or a lot
  HP_PER_HEART: 10,
  // the Harp Room (1 Samuel 18:10-11): play to calm the king; he throws the spear twice; David gets up and jumps
  HARP: { CALM_TIME: 14, THROW_AT: [0.3, 0.65], SPEAR_Y: 52, SPEAR_SPEED: 820, RELEASE: 9, BACK: 0.12 },
  HIT: { default: 10, scorpion: 8, viper: 12, whip: 4, rat: 5, jackal: 10, spider: 8, spiderw: 8, bat2: 6, rat2: 5, crow: 5, raven: 6, eagle: 10, phil: 10 },   // how much each thing takes off with a hit
  HEAL: { heart_small: 5, heart_big: 20 },   // what the hearts that drop out of broken things give back
  // things to break with the sling or the sword (Glen 11-03, like Castlevania's candles): they come back when you
  // leave the room and come in again. Glen's break sets (tools/cut_breakables.py): <art>, <art>_breaking, <art>_broken,
  // all one size; h: the whole thing drawn this tall; fit / gap: how much of the picture's height it fills, and the
  // space under it (the broken pieces reach lower). dark: a picture it stays as (the lamp-stands), instead of breaking away
  BREAK: {
    jar:       { art: "storage_jar", h: 70, fit: 0.993, gap: 0.007, bits: ["#c0703e", "#8a4a26"] },
    pots:      { art: "water_pitcher", h: 42, fit: 0.824, gap: 0.073, bits: ["#c0703e", "#7ab8e8"] },
    basket:    { art: "grain_sacks", h: 56, fit: 0.859, gap: 0.038, bits: ["#c9a25a", "#e6cf8a"] },
    lamp:      { art: "clay_lamp", h: 20, fit: 0.832, gap: 0.018, bits: ["#b8693a", "#ffd25a"], light: true },
    hall_lamp: { art: "hall_lamp_lit", h: 110, fit: 1, gap: 0, dark: "hall_lamp_unlit", bits: ["#d8b04a", "#ffd25a"], light: true },
  },
  BREAK_T: [0.14, 0.9, 0.5],   // breaking: the breaking picture this long, then the pieces this long, then they fade away this fast
  DROPS: [["heart_small", 50], ["olives", 30], ["heart_big", 8], ["none", 12]],   // what falls out, and how often (out of 100)
  METER_PX: 4,       // the health meter: px per point, so it grows as the cap goes up
};
const RELIC_ART = { pomegranate: "pomegranate", oil: "camp_jar_small", stone: "stone_remembrance", truth: "davids_journal" };   // (key: Glen's kit_tower/tw_key, drawn below)
const RELIC_NAME = { pomegranate: "Pomegranates", oil: "Oil jars", stone: "Stones of remembrance", truth: "Truths" };
// the skills that open seals, and how a sealed spot talks about the one it needs
const SEAL_SKILL = {
  rope: { name: "the rope", world: 2 }, heavySword: { name: "Goliath's sword", world: 3 }, wallClimb: { name: "the wall climb", world: 5 },
};

// ---- Gibeah ----
// mx, my, mw: where the room sits on the map screen (cells), and how many cells wide it is
const REGION_GIBEAH = {
  key: "gibeah", name: "Gibeah",
  strCap: 4,   // (Glen 11-05) strength from fighting can't go past this level in this world
  rooms: [
    { id: "fields",  name: "The Fields",       w: 84, bg: "w4_1", mx: 0, my: 2, mw: 3, left: "@road", right: "town",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },   // (Glen 11-05: Super Mario World layers outside)   // "@road": off the left edge, out of Gibeah
    { id: "town",    name: "The Town",         w: 74, bg: "w4_3", mx: 3, my: 2, mw: 3, left: "fields", right: "walls",
      far: "gibeah/fields_far", mid: "gibeah/town_mid.png", midY: 12 },   // (Glen 11-05: his town behind, the Fields sky)
    // (Glen 11-04: rooms like Mario levels, not 5 seconds long) the Walls: his wall strip repeating, built from his kit
    // (the walkways, the gate, the stair down, the plinth); floor: the strip's own paving, over the ground
    { id: "walls",   name: "The Walls",        w: 200, bg: "w4_2", mx: 6, my: 2, mw: 6, left: "town",
      floor: "gibeah/wall2_floor", up: 60, tallWall: { base: "gibeah/wall2_base.png", tile: "gibeah/wall2_tile.jpg", top: "gibeah/wall2_top.png" } },   // (Glen 11-05: tall, the top of the wall in sight after a couple of screens; his rougher 1000 BC wall: the strip's base and paving, his tile going up, the strip's broken battlements on top)
    { id: "halls",   name: "The Palace Halls", w: 62, bg: "w4_4", mx: 6, my: 1, mw: 2, right: "harp",
      strip: "gibeah/halls_strip", floor: "gibeah/halls_floor" },
    { id: "harp",    name: "The Harp Room",    w: 40, bg: "w4_4", mx: 8, my: 1, mw: 1, left: "halls", strip: "gibeah/harp_strip", floor: "gibeah/harp_floor" },
    { id: "cellars", name: "The Cellars",      w: 64, cave: true, mx: 6, my: 3, mw: 2, strip: "gibeah/cave_strip", floor: "gibeah/cave_floor" },   // (Glen 11-05: his cave wall and kit)
    { id: "cisterns", name: "The Cisterns",    w: 42, cave: true, mx: 2, my: 4, mw: 2, right: "deep", strip: "gibeah/cave_strip", floor: "gibeah/cave_floor" },   // (Glen 11-05: from his cave kit, like the cellars)
    // (Glen 11-05: Castlevania-tall) the watchtower, off the Walls: about 2 screens wide and 6 tall (up: rows above the
    // screen's top); mh: how tall it is on the map; tower: his two wall pictures (and mirrored), laid up the tower at random;
    // inset: columns at each end that are outside the tower (open sky, the fields) and its side wall (Glen 11-05: its ends)
    { id: "tower",   name: "The Watchtower",   w: 79, up: 100, inset: 8, mx: 10, my: 0, mw: 1, mh: 2, tower: ["gibeah/tower_wall_a.png", "gibeah/tower_wall_b.png", "gibeah/tower_wall_a_m.png", "gibeah/tower_wall_b_m.png"], floor: "gibeah/yard_floor" },
    { id: "deep",    name: "The Deep Cellar",  w: 70, cave: true, mx: 4, my: 4, mw: 3, left: "cisterns", strip: "gibeah/deep_strip", floor: "gibeah/deep_floor" },   // (Glen 11-05: down the hole in the cellars' floor)
  ],
};
const REGION = REGION_KEY === "nobgath" && typeof NOBGATH !== "undefined" ? NOBGATH : REGION_KEY === "ramah" && typeof RAMAH !== "undefined" ? RAMAH : REGION_GIBEAH;
(() => { let c = RTUNE.GAP; for (const r of REGION.rooms) { r.c0 = c; c += r.w + RTUNE.GAP; } REGION.cols = c; })();
const REGION_COLS = REGION.cols;
const roomById = id => REGION.rooms.find(r => r.id === id);
// a painted room (Glen 11-04: painted with GPT / Meta / Grok over a blueprint, tools/make_blueprints.py): art: its
// picture in assets/rooms/, the room's own size, drawn over the room in place of the backdrop, the rock and the ledges
// (which are still there to stand on, set to where the painting puts them)
// A long room (Glen 11-04: "the continuous tiling room, and then add onto the art we have"): strip, a picture that
// repeats along the whole room as its backdrop (tools/make_strip.py); floor, one that repeats along the ground; art, the
// painting, at artAt columns in; the game's own blocks and ledges are drawn over the strip, the painting over them.
const ROOM_ART = {};
function roomImg(name) {
  if (!name) return null;
  let im = ROOM_ART[name];
  if (!im) { im = ROOM_ART[name] = new Image(); im.src = "../assets/rooms/" + name + (/\.\w+$/.test(name) ? "" : ".jpg"); }
  return im.complete && im.naturalWidth ? im : null;
}
const roomArt = r => roomImg(r.art);
// blocks in a long room: stone the player stands on, drawn with block (a picture cut from the room's painting)
function rBlock(room, c, r, w, h) { block(c, r, w, h, 1); region.blocks.push({ room, x: c * T, y: r * T, w: w * T, h: h * T }); }
// ---- a room kit (Glen 11-04: his pieces on green screen, tools/cut_kit.py): placed anywhere in a room ----
// walk_*: a scaffold walkway's left end, middle, right end (deck: the planks' top, px from the piece's top; posts: the
// posts' middles; the pieces join post on post, and the legs are drawn on down to the ground)
const KIT = {
  walk_left: { w: 236, h: 164, deck: 56, posts: [33, 122, 212] }, walk_mid: { w: 233, h: 164, deck: 56, posts: [28, 117, 207] },
  walk_right: { w: 234, h: 164, deck: 56, posts: [23, 111, 198] }, LEG: [150, 160],
  gate: { w: 207, h: 236 }, stair_down: { w: 239, h: 279 }, plinth: { w: 147, h: 124 },
  // (Glen 11-05) the Palace Halls kit, assets/rooms/gibeah/kit_halls: a stone balcony ledge in three (its top: top px
  // from the piece's top), its cedar railing on its own (drawn in front of David), the arched door, the stair, a
  // pedestal, a cedar column
  hall_ledge_left: { w: 163, h: 72, top: 0 }, hall_ledge_mid: { w: 143, h: 67, top: 2 }, hall_ledge_right: { w: 163, h: 72, top: 0 },
  hall_rail: { w: 168, h: 79 }, hall_door: { w: 110, h: 194 }, hall_table: { w: 463, h: 184 }, hall_cushion_tan: { w: 192, h: 60 }, hall_cushion_blue: { w: 98, h: 62 }, hall_scrolls: { w: 222, h: 358 },   // (11-07: his feast table, cushions, scroll shelf)
  hall_stair: { w: 175, h: 121 },
  hall_pedestal: { w: 120, h: 117 }, hall_column: { w: 63, h: 215 },
  // (Glen 11-05) the Fields kit, assets/rooms/gibeah/kit_fields (sized for the game when cut): the terrace wall in three
  // (stone: the top of the stone, px up from the piece's bottom), a boulder, the olive tree with its branch to stand on,
  // the round watchtower, a field gate, a low wall, a fig tree; and the foreground plants (fg_*: drawn over David, sliding faster)
  f_wall_left: { w: 187, h: 164, stone: 141 }, f_wall_mid: { w: 177, h: 151, stone: 141 }, f_wall_right: { w: 176, h: 162, stone: 141 },
  f_rock: { w: 179, h: 117 }, f_ezel: { w: 211, h: 519 }, f_olive: { w: 536, h: 520 }, f_tower: { w: 281, h: 376 }, f_gate: { w: 178, h: 159 },
  f_lowwall: { w: 202, h: 83 }, f_fig: { w: 252, h: 256 }, fg_grass: { w: 313, h: 310 }, fg_branch: { w: 218, h: 457 }, fg_thorn: { w: 317, h: 191 },
  // (Glen 11-05) the Town kit, assets/rooms/gibeah/kit_town: flat roofs in three (top: the walking top, px down from the
  // piece's top), a striped awning, a stone post with a beam, a house front, the stair (steps: each 36 px column's top),
  // a market stall, jars; and the foreground (tfg_*)
  t_roof_left: { w: 192, h: 164, top: 10 }, t_roof_mid: { w: 169, h: 83, top: 2 }, t_roof_right: { w: 189, h: 125, top: 5 },
  t_awning: { w: 186, h: 204 }, t_beam: { w: 155, h: 199 }, t_house: { w: 265, h: 204 }, t_stair: { w: 202, h: 165, steps: [116, 70, 46, 0, 0, 0] },
  t_stall: { w: 188, h: 218 }, t_jars: { w: 167, h: 137 }, tfg_palm: { w: 214, h: 454 }, tfg_cloth: { w: 311, h: 365 }, tfg_jar: { w: 267, h: 202 },
  // (Glen 11-05) the Cave kit, assets/rooms/gibeah/kit_cave (his second sheet): stone shelves in three (each a pillar
  // with its slab on top: they join slab to slab), a bench, crates and sacks, steps (rising right), jars on a bench, a
  // basin; and his cracked wall (sealed, and broken open), the broken door behind it, the ruined arch with its door
  c_shelf_left: { w: 207, h: 202 }, c_shelf_mid: { w: 208, h: 202 }, c_shelf_right: { w: 201, h: 204 }, c_beam: { w: 207, h: 98 },
  c_crates: { w: 168, h: 199 }, c_steps: { w: 188, h: 159, steps: [109, 72, 28, 0, 0] }, c_jars: { w: 191, h: 127 }, c_basin: { w: 129, h: 107 },
  // (Glen 11-05) the pit kit: the floor's edge either side of a hole, planks across one, a floor that crumbles, the
  // ring and rope in the ceiling
  p_left: { w: 242, h: 177 }, p_right: { w: 243, h: 177 }, p_crumble: { w: 205, h: 102 }, p_broken: { w: 203, h: 132 },
  p_planks: { w: 211, h: 98 }, p_ring: { w: 86, h: 175 },
  // (Glen 11-05) the throne room kit, assets/rooms/gibeah/kit_harp
  hr_throne: { w: 238, h: 196 }, hr_banner: { w: 61, h: 309 }, hr_brazier: { w: 115, h: 124 }, hr_column: { w: 104, h: 373 },
  // the watchtower (Glen 11-05: his cream-stone tower kit; deck: the arm's top, post: where the post ends, px)
  tw_ledge_s: { w: 143, h: 153, deck: 50, post: 30 }, tw_ledge_m: { w: 184, h: 153, deck: 49, post: 31 }, tw_ledge_l: { w: 319, h: 154, deck: 49, post: 31 }, tw_walk: { w: 236, h: 69 }, tw_stair: { w: 220, h: 158 }, tw_ledge_crack: { w: 229, h: 154, deck: 51, post: 32 }, tw_beam: { w: 253, h: 154, deck: 62, post: 32 }, tw_ramp: { w: 152, h: 124 }, tw_nest: { w: 158, h: 88 }, tw_jar: { w: 144, h: 170 }, tw_lamp: { w: 154, h: 180 }, tw_parapet: { w: 252, h: 106 },
  // (Glen 11-05) rough stone steps and columns for the Walls (david-sling-2-art/rooms/gibeah/wall_steps_sheet.png, wall_columns_sheet.png)
  tw_slab: { w: 221, h: 80 }, tw_step2: { w: 200, h: 115 }, tw_blocks: { w: 287, h: 67 }, tw_corbel: { w: 188, h: 253 },
  tw_buttress: { w: 306, h: 631 }, tw_buttress_ruin: { w: 292, h: 559 }, tw_pier: { w: 241, h: 498 }, tw_pier_stub: { w: 310, h: 233 },
  tw_key: { w: 80, h: 231 }, tw_lever_up: { w: 118, h: 345 }, tw_lever_down: { w: 151, h: 221 }, tw_gate_shut: { w: 219, h: 377 }, tw_gate_open: { w: 187, h: 311 },   // (his key, lever and gate: the key at the top of the tower; the lever and gate for what it opens, to come)
  tw_door_shut: { w: 159, h: 215 }, tw_door_open: { w: 162, h: 221 }, tw_hatch: { w: 155, h: 161 }, tw_door_arch: { w: 211, h: 244 }, tw_door_plank: { w: 134, h: 226 }, tw_win_slit: { w: 94, h: 198, pad: [3, 3, 10, 45] }, tw_win: { w: 134, h: 170, pad: [3, 2, 12, 64] }, tw_win_arch: { w: 138, h: 200, pad: [3, 3, 22, 48] }, tw_win_slit_dark: { w: 95, h: 190, pad: [3, 3, 3, 0] }, tw_win_glow: { w: 170, h: 194, pad: [0, 2, 0, 0] }, tw_win_slit_moon: { w: 115, h: 227 }, tw_win_dusk: { w: 155, h: 206 }, tw_win_arch_moon: { w: 165, h: 224 }, tw_win_slit_night: { w: 114, h: 229 }, tw_win_night: { w: 181, h: 216 }, tw_win_arch_lit: { w: 165, h: 224 }, "tw_win_arch_lit-outside_wall": { w: 165, h: 224 }, "tw_win_arch_lit_with-rope": { w: 165, h: 224 }, "tw_win_arch_moon_with-rope": { w: 165, h: 224 }, tw_torch_wall: { w: 318, h: 371 }, tw_torch_stand: { w: 182, h: 629 }, tw_torch_bowl: { w: 123, h: 407 }, tw_torch_hand: { w: 173, h: 488 },   // (11-07: his night windows)   // (his tower doors and windows)
  hr_spearwall: { w: 173, h: 167 }, hr_wall0: { w: 216, h: 632 }, hr_wall1: { w: 216, h: 632 }, hr_wall2: { w: 216, h: 632 }, hr_wall3: { w: 216, h: 632 }, hr_wall4: { w: 216, h: 632 }, hr_stool: { w: 89, h: 56 }, hr_rug: { w: 323, h: 30 }, hr_rack: { w: 86, h: 173 },   // (hr_wall0-4: Glen 11-05, the plaster between the first two carved pillars, from his harp_strip_source and _strike1, 2, 4, 5)
  c_arch: { w: 179, h: 202 }, c_crackwall: { w: 235, h: 615 }, c_crackopen: { w: 293, h: 616 }, c_brokendoor: { w: 294, h: 338 }, c_ruindoor: { w: 375, h: 317 },
  // (Glen 11-05) the olive press (the save point) and a campfire, side on
  olive_press: { w: 159, h: 169 }, campfire2: { w: 155, h: 125 },
  // (Glen 11-10) World 3's pieces, assets/rooms/w3/kit (from david-sling-2-art/w3/cut, sized for the game): the holy
  // bread table (two rows of six), Goliath's sword wrapped in its cloth, the ephod on its stand, a clay lamp, Gath's gate door
  w3_holy_bread_table2: { w: 611, h: 130 }, w3_holy_bread_loaf: { w: 89, h: 40 }, w3_goliath_sword: { w: 86, h: 210 }, w3_ephod_stand: { w: 132, h: 200 },
  w3_oil_lamp: { w: 60, h: 64 }, w3_gath_door: { w: 226, h: 300 }, w3_gath_door_scribbled: { w: 144, h: 300 },
};
const KIT_IMG = {};
function kitImg(n) {
  let im = KIT_IMG[n];
  if (!im) { im = KIT_IMG[n] = new Image(); im.src = n.startsWith("w3_") ? "../assets/rooms/w3/kit/" + n + ".png" : "../assets/rooms/gibeah/" + (n.startsWith("tw_") ? "kit_tower/" : n.startsWith("hall_") ? "kit_halls/" : /^fg?_/.test(n) ? "kit_fields/" : /^t(fg)?_/.test(n) ? "kit_town/" : /^[cp]_/.test(n) ? "kit_cave/" : /^hr_/.test(n) ? "kit_harp/" : "kit/") + n + ".png"; }
  return im.complete && im.naturalWidth ? im : null;
}
function rWalk(room, x, deckY, nMid) {   // a walkway from x (px), its deck's top at deckY; returns where it ends
  const parts = ["walk_left", ...Array(nMid).fill("walk_mid"), "walk_right"];
  let px = x, prev = null;
  for (const n of parts) {
    if (prev) px += KIT[prev].posts[KIT[prev].posts.length - 1] - KIT[n].posts[0];
    region.props.push({ room, n, x: px, y: deckY - KIT[n].deck }); prev = n;   // (Glen 11-04: fixed to the wall, the braces show it: no legs to the ground)
  }
  const x1 = px + KIT[prev].w, c0 = Math.ceil((x + 8) / T), c1 = Math.floor((x1 - 8) / T);
  platAt(c0, deckY, c1 - c0);
  return x1;
}
function rKitDoor(id, room, c, kind, to, n) {   // a doorway or stair from the kit, standing on the ground at column c
  rDoor(id, room, c, kind, to); const o = region.doors[region.doors.length - 1]; o.kit = n;
  region.props.push({ room, n, x: o.x - KIT[n].w / 2, y: GR * T + 4 - KIT[n].h });
}
function rLedge(room, x, topY, nMid, rail = true) {   // a balcony ledge from x (px), its top at topY; returns where it ends
  const parts = ["hall_ledge_left", ...Array(nMid).fill("hall_ledge_mid"), "hall_ledge_right"];
  let px = x; const segs = [];
  for (const n of parts) { region.props.push({ room, n, x: px, y: topY - KIT[n].top }); segs.push(px); px += KIT[n].w - 8; }   // (the mid's end caps over the joins)
  const x1 = px + 8;
  if (rail) {   // David walks behind it: railings end to end along the whole ledge, each stretched a little to fit
    const len = x1 - x - 16, n = Math.max(1, Math.round(len / KIT.hall_rail.w)), w = len / n;
    for (let i = 0; i < n; i++) region.props.push({ room, n: "hall_rail", x: x + 8 + i * w, y: topY - KIT.hall_rail.h + 5, w: w + 2, front: true });
  }
  const c0 = Math.ceil((x + 6) / T), c1 = Math.floor((x1 - 6) / T);
  platAt(c0, topY, c1 - c0);
  return x1;
}
function rPedestal(room, c) {   // solid, 3 wide
  const top = GR * T + 2 - KIT.hall_pedestal.h;
  block(c, GR - 3, 3, 3, 1); platAt(c, top + 2, 3); for (let k = 0; k < 3; k++) artSolid.add((c + k) + "," + (GR - 3));
  region.props.push({ room, n: "hall_pedestal", x: c * T + 1.5 * T - KIT.hall_pedestal.w / 2, y: top });
}
function rStair(room, c) {   // the brick stair, up to the left: a ledge on each tile, at the step under its middle
  const x = c * T, y = GR * T + 4 - KIT.hall_stair.h;
  region.props.push({ room, n: "hall_stair", x, y });
  for (let k = 0; k < 4; k++) { const mid = k * T + T / 2, st = [0, 0, 17, 35, 51, 67, 84, 101][Math.floor(mid / 24)]; platAt(c + k, y + st + 1, 1); }
}
function rColumn(room, c) { const k = KIT.hall_column; region.props.push({ room, n: "hall_column", x: c * T + T / 2 - k.w, y: GR * T + 4 - 2 * k.h, s: 2 }); }   // a cedar column, twice size   // a cedar column, twice size, behind everything
// ---- the Fields kit (Glen 11-05) ----
let FOOT = 0;   // (set in buildRegion: GR * T + 4) where a piece's bottom stands (a little into the ground)
function rTerrace(room, c, nMid) {   // a terrace wall from column c, solid, its stone top a ledge; returns the column after it
  const parts = ["f_wall_left", ...Array(nMid).fill("f_wall_mid"), "f_wall_right"];
  let px = c * T;
  for (const n of parts) { region.props.push({ room, n, x: px, y: FOOT - KIT[n].h }); px += KIT[n].w - 6; }
  const c1 = Math.floor((px + 6 - 10) / T), top = FOOT - 141 + 5, r = Math.floor(top / T) + 1;
  block(c + 1, r, c1 - c - 2, GR - r, 1); platAt(c, top, c1 - c);   // (the solid part inside the art's edges: no earth showing past them)
  (region.tops ||= []).push({ x0: c * T, x1: c1 * T, top, low: r * T });   // (the block's top is lower than the stones': regionStoneTop)
  for (let k = c; k < c1; k++) artSolid.add(k + "," + r);
  return c1;
}
function rLowWall(room, c) {   // a low wall to hop onto (5 wide)
  const k = KIT.f_lowwall; region.props.push({ room, n: "f_lowwall", x: c * T + 2.5 * T - k.w / 2, y: FOOT - k.h });
  block(c, GR - 1, 5, 1, 1); platAt(c, FOOT - 72 + 4, 5); for (let i = 0; i < 5; i++) artSolid.add((c + i) + "," + (GR - 1));
  (region.tops ||= []).push({ x0: c * T, x1: (c + 5) * T, top: FOOT - 72 + 4, low: (GR - 1) * T });
}
function rBoulder(room, c) {   // a boulder on the ground: its flat top to stand on (5 wide, the top the middle 3)
  const k = KIT.f_rock; region.props.push({ room, n: "f_rock", x: c * T + 2.5 * T - k.w / 2, y: FOOT - k.h });
  block(c + 1, GR - 3, 3, 3, 1); platAt(c + 1, FOOT - k.h + 8, 3); for (let i = 1; i < 4; i++) artSolid.add((c + i) + "," + (GR - 3));
}
function rOliveTree(room, c) {   // the olive tree, its left edge at column c; its long branch (to the right) a ledge
  const k = KIT.f_olive, x = c * T, y = FOOT - k.h; region.props.push({ room, n: "f_olive", x, y });
  const c0 = Math.ceil((x + 384) / T), c1 = Math.floor((x + 530) / T); platAt(c0, y + 328, c1 - c0);
  return y + 328;
}
function rDeco(room, n, c, front = false, par = 1, y = null) {   // a piece standing on the ground, centred on column c (front: over David; y: its top, if not on the ground)
  const k = KIT[n]; region.props.push({ room, n, x: c * T + T / 2 - k.w / 2, y: y ?? (n === "fg_branch" ? -30 : FOOT - k.h + (front ? 40 : 0)), front, par });
}
// ---- the Town kit (Glen 11-05) ----
function rRoof(room, x, topY, nMid) {   // a flat roof's edge from x (px), its top at topY; returns where it ends (px)
  const parts = ["t_roof_left", ...Array(nMid).fill("t_roof_mid"), "t_roof_right"];
  let px = x;
  for (const n of parts) { region.props.push({ room, n, x: px, y: topY - KIT[n].top }); px += KIT[n].w - 8; }
  const x1 = px + 8, c0 = Math.ceil((x + 10) / T), c1 = Math.floor((x1 - 6) / T);
  platAt(c0, topY, c1 - c0);
  return x1;
}
function rAwning(room, c) {   // a striped awning on its poles: its taut top to stand on (5 wide)
  const k = KIT.t_awning, y = FOOT - k.h; region.props.push({ room, n: "t_awning", x: c * T + 2.5 * T - k.w / 2, y });
  platAt(c, y + 5, 5);
}
function rPost(room, c) {   // a stone post with a beam out to the right: the beam a ledge
  const k = KIT.t_beam, x = c * T, y = FOOT - k.h; region.props.push({ room, n: "t_beam", x, y });
  const c0 = Math.ceil((x + 6) / T), c1 = Math.floor((x + k.w - 4) / T); platAt(c0, y + 37, c1 - c0);
}
function rTownStair(room, c) {   // the stone stair, rising to the right: a ledge on each column at its step
  const k = KIT.t_stair, y = FOOT - k.h; region.props.push({ room, n: "t_stair", x: c * T, y });
  k.steps.forEach((st, i) => platAt(c + i, y + st + 1, 1));
}
// ---- the Cave kit (Glen 11-05) ----
function rPiece(room, n, x, bottom, plats = []) {   // any kit piece, its bottom at bottom (px); plats: [x0, x1, top] in the piece's px, ledges
  const k = KIT[n], y = bottom - k.h; region.props.push({ room, n, x, y });
  for (const [a, b, t] of plats) { const c0 = Math.round((x + a) / T), c1 = Math.max(c0 + 1, Math.round((x + b) / T)); platAt(c0, y + t, c1 - c0); }
  return y;
}
function rShelves(room, x, nMid, bottom = FOOT) {   // stone shelves from x (px), standing on bottom; returns [end x, top y]
  const parts = ["c_shelf_left", ...Array(nMid).fill("c_shelf_mid"), "c_shelf_right"];
  let px = x;
  for (const n of parts) { region.props.push({ room, n, x: px, y: bottom - KIT[n].h }); px += KIT[n].w - 6; }
  const top = bottom - 202 + 2, c0 = Math.ceil((x + 6) / T), c1 = Math.floor((px + 2) / T);
  platAt(c0, top, c1 - c0);
  return [px + 6, top];
}
// ---- holes in the floor (Glen 11-05: "pits in the ground to go down levels") ----
// a hole w wide from column c: its edges from his pit kit; to: { room, x, facing } drops him into the room below
// (no to: a plain pit, a fall costs a heart); planks: boards across it; crumble: a floor over it that gives way
function rHole(room, c, w, opts = {}) {
  pitFloor(c, w);
  const h = { room, c, w, x0: c * T, x1: (c + w) * T, to: opts.to || null };
  region.holes.push(h);
  const s = 0.75, L = KIT.p_left, Rr = KIT.p_right;
  region.props.push({ room, n: "p_left", x: c * T + 22 - L.w * s, y: GR * T - 3, s });
  region.props.push({ room, n: "p_right", x: (c + w) * T - 22, y: GR * T - 3, s });
  if (opts.planks) { const k = KIT.p_planks; region.props.push({ room, n: "p_planks", x: (c + w / 2) * T - k.w / 2, y: GR * T - 8 }); platAt(c, GR * T, w); }
  if (opts.crumble) { platAt(c, GR * T, w); region.crumbles.push({ room, c, w, state: "whole", t: 0 }); }
  return h;
}
// ---- creatures of the deep (Glen 11-05: his spider, bat and rat; they turn to dust when hit) ----
const beast = (kind, room, c, o = {}) => region.beasts.push(Object.assign({ kind, room, x: c * T + T / 2, hx: c * T + T / 2, y: GR * T, hy: GR * T,
  state: "idle", t: Math.random() * 3, facing: -1, cool: 0 }, o));
// (Glen 11-05) the tower's birds, Part One's art: crows (raven_fly2, smaller), ravens (raven_fly), eagles (eagle_fly). They
// perch on a ledge pecking until David comes near, fly at him, swoop past and back, then go home to their ledge
const bird = (kind, room, x, y) => region.beasts.push({ kind, room, x, hx: x, y, hy: y, state: "perch", t: Math.random() * 3, facing: -1, cool: 0 });
// (Glen 11-05) the Philistine raids (1 Samuel 18:27, 30): Part One's skirmisher (phil_run, phil_charge, phil_drop,
// phil_flee). He paces his post behind his shield; when David comes near he charges, and after a hit backs off and comes
// again. Three stones (or one charged, or three sword strokes) and he throws down his shield and runs, fading out.
// Nobody dies. He keeps to his own floor or ledge (never off its end). y: the floor he stands on (px); range: his post, tiles
const rPhil = (room, c, y = GR * T, range = 6) => beast("phil", room, c, { y, hy: y, range: range * T, state: "wait", hp: PHIL.HP, alpha: 1 });
const PHIL = { HP: 3, PACE: 1.5, PACE_SPEED: 70, NEAR: 9, SPEED: 210, BACK: 0.9, BACK_SPEED: 230, REST: 0.5, FLEE_SPEED: 320, FADE: 2.5, DROP_MS: 150,
  // (Glen 11-06) walls, rocks and the tower stop him: up to HOP tiles high he jumps up onto it (and drops off the far side);
  // taller (the watchtower) he holds there, pacing behind it with his shield up, until there's a way to David again
  HOP: 3, GRAV: 2200, HOLD_PACE: 1.2 };
const BIRD = {
  crow:  { fly: "raven_fly2", perch: "raven_peck", size: 1.7, speed: 230, near: 320, chase: 6 },
  raven: { fly: "raven_fly",  perch: "raven_peck", size: 2.2, speed: 260, near: 360, chase: 7 },
  eagle: { fly: "eagle_fly",  perch: "eagle_peck", size: 2.6, speed: 300, near: 420, chase: 8 },   // (eagles dive)
};
const rSpider = (room, c, hangY = 200) => beast("spider", room, c, { y: hangY, hy: hangY, state: "hang" });   // hangs on its thread; drops when he's under
const rCrawler = (room, c, range = 4) => beast("spiderw", room, c, { range: range * T, state: "walk" });     // a spider walking the floor
const rRat = (room, c, range = 4) => beast("rat2", room, c, { range: range * T, state: "walk" });
const rBat = (room, c, y = 110) => beast("bat2", room, c, { y, hy: y, state: "hang" });
function rPlinth(room, c) {   // the kit's stone plinth: solid, its top a ledge where the stones' tops are
  block(c, GR - 3, 4, 3, 1); platAt(c, GR * T - KIT.plinth.h + 6, 4); for (let k = 0; k < 4; k++) artSolid.add((c + k) + "," + (GR - 3));
  region.props.push({ room, n: "plinth", x: c * T + 2 * T - KIT.plinth.w / 2, y: GR * T + 2 - KIT.plinth.h });
}
function rStone(room, c, n = "tw_step2", flip = false) {   // (Glen 11-05) his rough stone step or slab, standing on the ground from column c: solid underneath, its tops ledges
  const k = KIT[n], top = FOOT - k.h, wc = n === "tw_slab" ? 6 : 5;
  block(c + 1, GR - 1, wc - 2, 1, 1); for (let x = c + 1; x < c + wc - 1; x++) artSolid.add(x + "," + (GR - 1));   // (a stub inside the stones: its tile edges stay hidden behind them)
  if (n === "tw_slab") platAt(c, top + 6, wc);
  else { const hi = flip ? c + 2 : c, lo = flip ? c : c + 3; platAt(hi, top + 6, 3); platAt(lo, top + 26, 2); }   // (the high step, and the lower one beside it)
  region.props.push({ room, n, x: c * T + (wc * T - k.w) / 2, y: top, flip });
}
function rButtress(room, n, c, flip = false) {   // (Glen 11-05) a buttress or pier against the wall, centred on column c; behind David. A pier's cap is a ledge
  const k = KIT[n]; region.props.push({ room, n, x: c * T + T / 2 - k.w / 2, y: FOOT - k.h, flip });
  if (n === "tw_pier") platAt(c - 2, FOOT - k.h + 8, 5);
}
// (Glen 11-06) ladders between walkways (Part One's town_ladder): Up / Down to climb (main.js: ladders with a bottom, bot)
function rLadder(room, x, topY, botY) {
  const c = Math.round(x / T) - 1;
  const l = { c, r: topY / T, bot: botY / T, rungs: [], top: { dir: 0, y: topY }, room, x: (c + 1) * T, topY, botY };
  ladders.push(l); region.ladders.push({ room, x: l.x, top: topY, bot: botY });
}
function drawRegionLadders(camX) {
  const img = typeof ITEM !== "undefined" && ITEM.town_ladder; if (!img || !img.naturalWidth) return;
  const w = 2 * T - 4, sc = w / img.naturalWidth, segH = img.naturalHeight * sc * 0.86;   // (tiled: the picture repeats down a long one)
  for (const l of region.ladders) {
    const x = l.x - camX - w / 2; if (x > W || x + w < 0) continue;
    if (l.rope) { drawRope(l.x - camX, l.top - 30, l.bot + 2); continue; }   // (World 2: a rope between two walkways, climbed like a ladder)
    const top = l.top - 26, bot = l.bot + 4;
    ctx.save(); ctx.beginPath(); ctx.rect(x - 4, top, w + 8, bot - top); ctx.clip();
    for (let y = top; y < bot; y += segH) ctx.drawImage(img, x, y, w, img.naturalHeight * sc);
    ctx.restore();
  }
}
function drawProps(camX) {
  for (const p of region.props) {
    if (p.front) continue;   // (drawRegionFront: over David)
    if (p.draw && p.draw(p, camX)) continue;   // (a prop that draws itself, e.g. Michal in her window, ramah.js; false: the picture)
    const k = KIT[p.n], im = kitImg(p.n), x = Math.round(p.x - camX), s = p.s || 1; if (!im || x > W || x + k.w * s < 0) continue;
    if (p.y > camY + H + 50 || p.y + k.h * s < camY - 120) continue;   // (a tall room: off above or below)
    if (p.filter) { ctx.save(); ctx.filter = p.filter; }   // (e.g. a window at night)
    if (k.pad) { const [l, t, r, b] = k.pad; ctx.drawImage(im, x - l * s, Math.round(p.y - t * s), (k.w + l + r) * s, (k.h + t + b) * s); }   // (pad: the picture runs past the piece's box, its light spilling out: w, h are the frame)
    else if (p.flip) { ctx.save(); ctx.translate(x + k.w * s, 0); ctx.scale(-1, 1); ctx.drawImage(im, 0, Math.round(p.y), k.w * s, k.h * s); ctx.restore(); }   // (mirrored)
    else ctx.drawImage(im, x, Math.round(p.y), k.w * s, k.h * s);
    if (p.filter) ctx.restore();
    if (p.legs) {   // the legs on down to the ground: the band of rows that's only legs, again and again
      const [a, b] = KIT.LEG, bh = b - a;
      for (let y = p.y + b; y < GR * T + 6; y += bh) ctx.drawImage(im, 0, a, k.w, bh, x, Math.round(y), k.w, bh);
    }
  }
}

// ---- the save: which rooms you've been in, what you've found, which seals you've seen, where you last saved ----
const region = { room: null, fade: 0, trans: null, mapOpen: false, mapT: 0, inited: false, sealNear: null,
  doors: [], relics: [], ladders: [], seals: [], walls: [], blocks: [], props: [], holes: [], crumbles: [], beasts: [], ledges: [], climb: null, breaks: [], drops: [], save: { at: null, explored: [], taken: [], seen: [], sealsSeen: [] } };
function regionSaveKey() { return slotKey("david2Region") + "_" + REGION.key; }   // (read in buildRegion: slotKey is main.js's)
function regionCamY() {   // main.js: how far up the camera is (0 but in a tall room: keep David about 60% down the screen)
  if (!REGION_ON) return 0;
  const r = region.room || roomAt(david.x); if (!r || !r.up) return 0;
  // (Glen 11-06) steady, like a platformer: a jump doesn't move it; it settles on the height he lands at (or stands on a
  // ladder at), and only follows him in the air if he gets near the top or bottom of the screen
  const d = david, footed = d.onGround || d.state === "climb" || region.climb || d.deadT > 0;
  if (footed || region.camFootY == null) region.camFootY = d.y;
  let y = region.camFootY - H * 0.6;
  y = Math.min(y, d.y - 170); y = Math.max(y, d.y - H + 90);   // (never lose him off the top or bottom)
  return Math.max(-r.up * T, Math.min(0, y));
}
function regionWrite() { try { localStorage.setItem(regionSaveKey(), JSON.stringify(region.save)); } catch (e) {} }
const regionHas = (list, id) => region.save[list].includes(id);
const everHas = id => regionHas("taken", id) || (region.carried || []).some(c => (c.taken || []).includes(id));   // (this region, or one before it)
function regionAdd(list, id) { if (!regionHas(list, id)) { region.save[list].push(id); regionWrite(); } }
// where David starts: the olive press he last saved at, or the start of the fields
function regionStartCol() {   // the olive press you last saved at
  const s = region.save, home = roomById(REGION.start || "fields").c0 + 3;
  if (s.at == null) return home;
  // (11-07: saved by room + offset, so adding rooms doesn't move it. An old save (a bare column): the nearest press to it,
  //  and only if it's close; otherwise the region's start.)
  if (s.atRoom && REGION.rooms.some(r => r.id === s.atRoom)) return roomById(s.atRoom).c0 + s.atOff;
  let best = null; for (const f of fires) { const c = Math.round((f.x - 30) / T); if (best == null || Math.abs(c - s.at) < Math.abs(best - s.at)) best = c; }
  return best != null && Math.abs(best - s.at) <= 2 ? best : home;
}

// ---- building (called by main.js's layout, so its helpers exist by then) ----
// a door: kind "door" (a doorway), "stairs" (a stair going down / up), "well" (down a well), "rope" (a rope up out of
// the well); to: the door id it leads to; need: the skill that unseals it
function rTowerLedge(room, x, deckY, n, flip = false) {   // one of his post-and-arm ledges: deck at deckY; flip: the post on the right
  const k = KIT[n], a0 = flip ? x : x + k.post, a1 = flip ? x + k.w - k.post : x + k.w;
  const c0 = Math.ceil(a0 / T), c1 = Math.floor(a1 / T); platAt(c0, deckY, Math.max(1, c1 - c0));
  region.props.push({ room, n, x, y: deckY - k.deck, flip });
  return [a0, a1];
}
function rLedge(room, c, y, w) { platAt(c, y, w); region.ledges.push({ room, c, w, y }); }   // a plain stone ledge (Part One's art) to stand on
function rDoor(id, room, c, kind, to, need = null) { region.doors.push({ id, room, c, x: c * T + T / 2, kind, to, need }); }
function rRelic(id, kind, c, r, text = null, need = null) { region.relics.push({ id, kind, c, r, x: c * T + T / 2, y: (r + 1) * T, text, need, t: Math.random() * 6 }); }   // (need: hidden until that's in "taken")
const relicHidden = f => f.need && !regionHas("taken", f.need);
function rSeal(id, room, c, need, say, x0, x1) { region.seals.push({ id, room, need, say, x: c * T + T / 2, x0: x0 * T, x1: x1 * T }); }
const sealOpen = s => hasSkill(s.need);
const onTop = y => y / T - 1;   // the row to give rBreak / rRelic for something sitting on a ledge whose top is y px (platAt)
function rBreak(kind, room, c, r) { region.breaks.push({ kind, room, x: c * T + T / 2, y: (r + 1) * T, broken: false, fade: 0 }); }

function buildRegion() {
  FOOT = GR * T + 4;
  try { Object.assign(region.save, JSON.parse(localStorage.getItem(regionSaveKey()) || "{}")); } catch (e) {}
  { const f = new URLSearchParams(location.search).get("forget");   // (testing: "?forget=a,b" takes those out of the save, to see them again)
    if (f) { const ids = f.split(","); for (const k in region.save) if (Array.isArray(region.save[k])) region.save[k] = region.save[k].filter(id => !ids.includes(id)); regionWrite(); } }
  // rock between rooms (and before the first)
  for (const r of REGION.rooms) rock(r.c0 - RTUNE.GAP, TOP_ROW, RTUNE.GAP, ROWS - TOP_ROW);
  const last = REGION.rooms[REGION.rooms.length - 1]; rock(last.c0 + last.w, 0, RTUNE.GAP, ROWS);
  const R = id => roomById(id).c0;
  if (REGION.build) { REGION.build(R); return; }   // (another region's own rooms: ramah.js)

  // -- The Fields: Philistine raids come later; for now the wild things, a ledge climb to a stone, and the watchtower rock
  let c = R("fields");
  ground(c, c + 83);
  // (Glen 11-05: built from his Fields kit, orthographic, on his sky and hills; a few plants pass close in front)
  campfire(c + 4, GR - 1);   // an olive press: the save point (drawn as Glen's press: drawRegionFire)
  label(c + 6, 6, "Gibeah of Saul: the region test. Select = the map.");
  oliveRow(c + 9, 16, 5);
  rBreak("jar", "fields", c + 14, 16); rBreak("jar", "fields", c + 15, 16);
  rDeco("fields", "fg_grass", c + 12, true, 1.35);
  rLowWall("fields", c + 18);
  { const c1 = rTerrace("fields", c + 24, 1); oliveRow(c + 25, onTop(FOOT - 136) - 0.4, c1 - c - 26); }
  { const by = rOliveTree("fields", c + 33); rRelic("g_stone_fields", "stone", c + 46, onTop(by)); oliveRow(c + 44, onTop(by) - 0.4, 1); }
  rDeco("fields", "fg_branch", c + 30, true, 1.3);
  snake("viper", c + 40); critter("scorpion", c + 48);
  rBreak("basket", "fields", c + 47, 16);
  rDeco("fields", "fg_thorn", c + 44, true, 1.35);
  // the watchtower: too sheer to climb without the wall climb (Up at either face, then Up / Down; it tops out onto the
  // top). (Glen 11-04: all the way down to the ground: the wall climb is the way over.) (11-05: his round tower)
  { const k = KIT.f_tower, top = FOOT - k.h + 6;
    rock(c + 52, 7, 6, 10); for (let i = 0; i < 6; i++) artSolid.add((c + 52 + i) + ",7");   // (the rock inside the tower's walls)
    region.props.push({ room: "fields", n: "f_tower", x: (c + 55) * T - k.w / 2, y: FOOT - k.h });
    platAt(c + 52, top, 6);
    region.walls.push({ room: "fields", x0: (c + 52) * T, x1: (c + 58) * T, top: 7 * T, need: "wallClimb", seal: "g_seal_tower" });
    rSeal("g_seal_tower", "fields", c + 50, "wallClimb", "The watchtower is too sheer to climb. Not yet.", c + 46, c + 52);
    rRelic("g_pom_tower", "pomegranate", c + 55, onTop(top)); }
  rDeco("fields", "f_fig", c + 63);
  rPhil("fields", c + 71, GR * T, 5); rPhil("fields", c + 79, GR * T, 4);   // (Glen 11-05) a Philistine raiding party in the fields (18:30)
  oliveArc(c + 62, 16, 6); rBoulder("fields", c + 66);
  deco("olive_tree", c + 72, 16, 1.05, "back", "golden_olive");
  rDeco("fields", "fg_grass", c + 68, true, 1.35);
  snake("whip", c + 76);
  rDeco("fields", "f_gate", c + 80);
  rDeco("fields", "fg_branch", c + 78, true, 1.3);

  // -- The Town: the market, rooftops, and the old well (down into the cisterns: needs the rope)
  c = R("town");
  ground(c, c + 73);
  // (Glen 11-05: built from his Town kit on his town and the Fields sky, Super Mario World style: up the stair and over
  // the roofs, the awning, the high roof with the Truth; washing and a palm pass close in front)
  { const X = k => (c + k) * T;
    rDeco("town", "t_house", c + 3); rDeco("town", "t_house", c + 29); rDeco("town", "t_house", c + 70);
    rBreak("pots", "town", c + 7, 16);
    rDeco("town", "t_stall", c + 9); oliveRow(c + 8, 16, 3);
    rTownStair("town", c + 12);
    rRoof("town", X(18), 420, 2); oliveRow(c + 21, onTop(420) - 0.4, 5);
    rDeco("town", "tfg_cloth", c + 25, true, 1.3, -120);
    rAwning("town", c + 38);
    rRoof("town", X(43), 330, 0); rBreak("jar", "town", c + 47, onTop(330));
    campfire(c + 46, GR - 1);   // an olive press (the save point)
    rRoof("town", X(52), 230, 1); rBreak("lamp", "town", c + 55, onTop(230));
    rRelic("g_truth_song", "truth", c + 59, onTop(230),
      "David went out wherever Saul sent him, and behaved himself wisely; and Saul set him over the men of war. It was good in the sight of all the people, and also in the sight of Saul's servants. (1 Samuel 18:5)");   // (the song itself is the town's story scene: updateStory)
    rDeco("town", "tfg_jar", c + 50, true, 1.35, FOOT - KIT.tfg_jar.h + 190);   // (Glen 11-05: low, only the rim over the path; its cut-off bottom well under the screen)
    rDoor("d_well", "town", c + 56, "well", "d_wellrope", "rope");
    rSeal("g_seal_well", "town", c + 56, "rope", "An old well, deep and dark. You'd need a rope to get down there.", c + 53, c + 59);
    rBreak("jar", "town", c + 51, 16); rBreak("basket", "town", c + 64, 16); oliveRow(c + 61, 16, 6);
    rPost("town", c + 66);
    rDeco("town", "t_jars", c + 68);
    rDeco("town", "tfg_palm", c + 64, true, 1.3, -40); }

  // -- The Walls: the fortress yard, the gate into the palace, the stair down to the cellars. (Glen 11-04: a long room,
  // built from his kit on his repeating wall: walkways at different heights, plinths, the gate and the stair down)
  c = R("walls"); const X = k => (c + k) * T;
  ground(c, c + 199);
  for (let k = c; k <= c + 199; k++) for (let rr = GR; rr < ROWS; rr++) artSolid.add(k + "," + rr);   // (his wall picture's own paving is the ground: no tiles drawn over it)
  const walks = [], W_ = (x, y, n) => { const x1 = rWalk("walls", x, y, n); walks.push({ x0: x, x1, y, n }); return x1; };   // (every walkway's span: the ladders, birds, Philistines and pillars use them)
  oliveRow(c + 5, 16, 4);
  rStone("walls", c + 9);
  W_(X(15), 400, 1);
  W_(X(34), 270, 0); oliveRow(c + 35, onTop(270) - 0.4, 5); rBreak("jar", "walls", c + 42, onTop(270));
  critter("scorpion", c + 48);
  rKitDoor("d_gate", "walls", c + 55, "door", "d_hallsgate", "tw_door_arch");   // (Glen 11-05: his stone doors match his rougher wall)
  rStone("walls", c + 61, "tw_slab");
  W_(X(67), 420, 2); oliveRow(c + 72, onTop(420) - 0.4, 6);
  W_(X(90), 290, 0); rBreak("jar", "walls", c + 96, onTop(290));
  W_(X(104), 160, 0);
  rRelic("g_stone_walls", "stone", c + 110, onTop(160));
  snake("viper", c + 100);
  rKitDoor("d_down", "walls", c + 125, "stairs", "d_cellarup", "tw_door_open");
  W_(X(132), 430, 3); oliveRow(c + 138, onTop(430) - 0.4, 8);
  rBreak("basket", "walls", c + 145, 16);
  rKitDoor("d_tower", "walls", c + 153, "door", "d_towerdown", "tw_door_open");   // (Glen 11-05) up into the watchtower
  W_(X(161), 300, 0); rBreak("lamp", "walls", c + 166, onTop(300));
  rPhil("walls", c + 22, GR * T, 4); rPhil("walls", c + 108, GR * T, 5);   // (Glen 11-05) and in the yard
  rStone("walls", c + 177, "tw_step2", true); critter("hedgehog", c + 186); oliveRow(c + 188, 16, 4);
  // (Glen 11-05) the way out: a gate at the far end of the Walls, locked; the bronze key from the top of the watchtower
  // opens it, and David slips out of Gibeah (19:12: "he went, fled, and escaped"). Next region's road starts here, later.
  // (Glen 11-06) the Walls' upper levels: eight rows of his walkways, staggered like brickwork (not stacked), ladders
  // between a row and the next where they overlap, crows and ravens on them, Philistines walking the wider ones; a plank
  // walk along the top of the wall, end to end. ROWS_UP: each row's deck (px) and its walkways [column, middle pieces]
  { const wr = roomById("walls"), deck = wallTopY(wr) + TALL_WALL.DECK, lower = walks.slice();
    rock(c, TOP_ROW, wr.w, -wr.up - TOP_ROW);   // (above the sky: the ceiling)
    // brickwork: each row starts 14 or 4 / 18 columns over from the one below, a walkway every 32 columns, the widths
    // varying (middle pieces 1, 2, 1, 0); each overlaps one below by 3-8 columns, where its ladder goes
    const ROWS_UP = [-60, -270, -480, -690, -900, -1110, -1320, -1530].map((y, k) => {
      const row = []; let col = 3 + [0, 14, 4, 18][k % 4];
      for (let i = 0; ; i++, col += 32) { const n = [1, 2, 1, 0][(i + k) % 4]; if (col + 6 + 5 * n > 190) break; row.push([col, n]); }
      return [y, row];
    });
    let below = lower, k = 0;
    for (const [y, row] of ROWS_UP) {
      const here = row.map(([col, n]) => { W_(X(col), y, n); return walks[walks.length - 1]; });
      for (const u of here) {   // a ladder down to the row below, where they overlap most
        let best = null, ov = 0;
        for (const l of below) { const o = Math.min(u.x1, l.x1) - Math.max(u.x0, l.x0); if (o > ov) { ov = o; best = l; } }
        if (best && ov >= 2.5 * T) rLadder("walls", (Math.max(u.x0, best.x0) + Math.min(u.x1, best.x1)) / 2, y, best.y);
      }
      here.forEach((u, i) => {
        const mid = Math.round((u.x0 + u.x1) / 2 / T);
        if ((i + k) % 3 === 0) oliveRow(mid - 2, y / T - 1.4, 4);
        if ((i + k) % 4 === 2) rBreak("jar", "walls", mid + 2, onTop(y));
        if ((i + k) % 2 === 1) bird(k < 4 ? "crow" : "raven", "walls", (u.x0 + u.x1) / 2 + 40, y);   // (Glen 11-06: more crows)
        if (u.n >= 1 && (i + k) % 3 === 1) rPhil("walls", mid, y, Math.max(3, Math.round((u.x1 - u.x0) / T / 2) - 2));   // (Glen 11-06: Philistines on the ledges too)
      });
      below = here; k++;
    }
    for (const i of [0, 2, 4]) { const u = below[i]; rLadder("walls", u.x0 + (u.x1 - u.x0) * 0.3, deck, u.y); }   // up onto the top of the wall
    // the top of the wall: a plank walk end to end, so he runs on boards, not on the broken battlements
    for (let px = X(1); px < X(wr.w - 1); px += KIT.tw_walk.w - 4) region.props.push({ room: "walls", n: "tw_walk", x: px, y: deck - 6 });
    platAt(c + 1, deck, wr.w - 2);
    oliveRow(c + 20, deck / T - 1.4, 10); oliveRow(c + 140, deck / T - 1.4, 10);
    rRelic("g_pom_walltop", "pomegranate", c + 92, deck / T - 1);
    bird("crow", "walls", X(70), deck); bird("crow", "walls", X(150), deck); bird("raven", "walls", X(110), deck);
    rPhil("walls", c + 45, deck, 10); rPhil("walls", c + 120, deck, 10); rPhil("walls", c + 175, deck, 8);   // (Glen 11-05) Philistines up on the wall: a raid (18:30)
    // (Glen 11-06) his buttresses and piers: only where no walkway, ladder, door or stone stands in front of them; behind everything
    const box = p => ({ x0: p.x - 30, x1: p.x + KIT[p.n].w + 30, y0: p.y - 30, y1: p.y + KIT[p.n].h });
    const taken = region.props.filter(p => p.room === "walls").map(box).concat(region.ladders.filter(l => l.room === "walls").map(l => ({ x0: l.x - 70, x1: l.x + 70, y0: l.top, y1: l.bot })));
    const PIL = ["tw_buttress", "tw_pier", "tw_buttress_ruin", "tw_pier_stub"];
    const before = region.props.length; let last = -99, j = 0;
    for (let col = 4; col < wr.w - 6; col++) {
      if (col - last < 12) continue;
      for (let t = 0; t < PIL.length; t++) {   // the tallest that fits here (a stub where a walkway's above)
        const n = PIL[(j + t) % PIL.length], q = { room: "walls", n, x: X(col) + T / 2 - KIT[n].w / 2, y: FOOT - KIT[n].h, flip: j % 2 === 1 }, b = box(q);
        if (taken.some(t => b.x0 < t.x1 && b.x1 > t.x0 && b.y0 < t.y1 && b.y1 > t.y0)) continue;
        region.props.push(q); taken.push(b); last = col; j++; break;
      }
    }
    const pillars = region.props.splice(before);
    const first = region.props.findIndex(p => p.room === "walls"); region.props.splice(first, 0, ...pillars);   // (drawn first: behind the walkways)
  }
  rDoor("d_exit", "walls", c + 196, "exit", null); Object.assign(region.doors[region.doors.length - 1], { key: "g_tower_key" });

  // -- The Watchtower (Glen 11-05): Castlevania-tall, a climb of ledges zig-zagging up six screens to the lookout.
  // (A first build to try the up-and-down camera: his tower art, the birds, the key or lever to come.)
  { const tc = R("tower"), tw = roomById("tower");
    ground(tc, tc + tw.w - 1);
    rock(tc, TOP_ROW, tw.w, -tw.up - TOP_ROW);   // the roof
    rock(tc, TOP_ROW, tw.inset, ROWS - TOP_ROW); rock(tc + tw.w - tw.inset, TOP_ROW, tw.inset, ROWS - TOP_ROW);   // its side walls (and the air outside them: drawn by drawTowerEnds)
    const ic = tc + tw.inset;   // the first column inside
    rKitDoor("d_towerdown", "tower", ic + 4, "door", "d_tower", "tw_door_open");
    // (Glen 11-05: nothing in front of a door or a window) every piece's box, so the next one can keep clear of it
    const boxes = [], boxOf = p => ({ x0: p.x - 12, x1: p.x + KIT[p.n].w + 12, y0: p.y - 12, y1: p.y + KIT[p.n].h + 12 });
    const hits = q => boxes.some(b => q.x0 < b.x1 && q.x1 > b.x0 && q.y0 < b.y1 && q.y1 > b.y0);
    boxes.push(boxOf(region.props[region.props.length - 1]));   // the door
    const put = p => { const q = boxOf(p); if (hits(q)) return false; boxes.push(q); region.props.push(p); return true; };
    // his ledges, zig-zagging across both screens and back, 3 rows a step; olives, jars, nests and lamps along the way
    const X0 = (tc + tw.inset) * T, X1 = (tc + tw.w - tw.inset) * T, STEP = 3, ACROSS = 250, pieces = ["tw_ledge_l", "tw_ledge_m", "tw_ledge_l", "tw_ledge_crack", "tw_ledge_l", "tw_beam"];
    const perches = [];
    let x = X0 + 330, dir = 1, i = 0;   // (the first one starts past the door)
    for (let r = GR - STEP; r > -tw.up + 11; r -= STEP, i++) {
      const n = pieces[i % pieces.length], k = KIT[n];
      if (dir > 0 && x + k.w > X1 - 20) { dir = -1; x = X1 - 20 - k.w; }
      if (dir < 0 && x < X0 + 20) { dir = 1; x = X0 + 20; }
      const [a0, a1] = rTowerLedge("tower", x, r * T, n, dir < 0);
      boxes.push(boxOf(region.props[region.props.length - 1]));
      const mid = Math.round((a0 + a1) / 2 / T);
      if (i % 3 === 1) oliveRow(mid - 1, r - 1.4, 3);
      if (i % 5 === 3) rBreak("jar", "tower", mid, r - 1);
      if (i % 7 === 5) put({ room: "tower", n: "tw_nest", x: a1 - 120, y: r * T - KIT.tw_nest.h + 8 });
      if (i % 4 === 2) perches.push({ x: (a0 + a1) / 2, y: r * T });
      x += dir * ACROSS;
    }
    // his windows and lamps up the walls, only where no ledge, nest or door is in front of them; the big bright one at the lookout
    const WINS = ["tw_win_slit", "tw_win", "tw_win_arch", "tw_win_slit_dark", "tw_win", "tw_hatch", "tw_win_arch", "tw_win_slit"];
    const XS = [0.12, 0.6, 0.33, 0.85, 0.2, 0.5, 0.72, 0.04, 0.92, 0.42];
    for (let k = 0, y = GR * T - 300; y > -tw.up * T + 600; y -= 300, k++) {
      const n = WINS[k % WINS.length];
      for (let j = 0; j < XS.length; j++) if (put({ room: "tower", n, x: X0 + XS[(k + j) % XS.length] * (X1 - X0 - KIT[n].w), y: y - KIT[n].h, back: true })) break;
      if (k % 3 === 1) for (let j = 0; j < XS.length; j++) if (put({ room: "tower", n: "tw_lamp", x: X0 + XS[(k + j + 4) % XS.length] * (X1 - X0 - KIT.tw_lamp.w), y: y - 120, back: true })) break;
    }
    // (the windows and lamps go behind everything else in the tower)
    const back = region.props.filter(p => p.back), rest = region.props.filter(p => !p.back);
    region.props.length = 0; region.props.push(...back, ...rest);
    // the birds (Glen 11-05: Part One's ravens and eagles): crows low down, ravens in the middle, eagles near the top
    for (const p of perches) bird(p.y > -1100 ? "crow" : p.y > -2300 ? "raven" : "eagle", "tower", p.x, p.y);
    const topR = -tw.up + 8;   // the lookout: a plank floor right across, the battlements at each end

    for (let px = X0; px < X1; px += KIT.tw_walk.w - 4) region.props.push({ room: "tower", n: "tw_walk", x: px, y: topR * T - 6 });
    platAt(tc + tw.inset, topR * T, tw.w - 2 * tw.inset);
    region.props.push({ room: "tower", n: "tw_parapet", x: X0 + 10, y: topR * T - KIT.tw_parapet.h + 4 });
    region.props.push({ room: "tower", n: "tw_parapet", x: X1 - 10 - KIT.tw_parapet.w, y: topR * T - KIT.tw_parapet.h + 4, flip: true });
    oliveRow(ic + 12, topR - 1.4, 10); rRelic("g_stone_tower", "stone", ic + 40, topR - 1);
    rRelic("g_tower_key", "key", ic + 52, topR - 1);   // (Glen 11-05) the reward for the climb: what it opens comes later
  }

  // -- The Palace Halls (up through the gate)
  c = R("halls");
  ground(c, c + 61);
  // (Glen 11-05: built from his Palace Halls kit: cedar columns behind, the stair, the balconies with their railings in
  // front of David, a pedestal, the arched door back out to the walls)
  { const X = k => (c + k) * T;
    for (const k of [2, 12, 22, 32, 42, 52, 60]) rColumn("halls", c + k);
    rKitDoor("d_hallsgate", "halls", c + 5, "door", "d_gate", "hall_door");
    rBreak("hall_lamp", "halls", c + 14, 16);
    rStair("halls", c + 10);
    rLedge("halls", X(16), 400, 1); oliveRow(c + 19, onTop(400) - 0.4, 5);
    rLedge("halls", X(30), 280, 0); rRelic("g_stone_halls", "stone", c + 34, onTop(280));
    rBreak("hall_lamp", "halls", c + 34, 16);
    rPedestal("halls", c + 40);
    campfire(c + 46, GR - 1);   // an olive press (the save point). (Glen 11-06: it was a campfire here; every save is an olive press)
    rLedge("halls", X(49), 430, 0); oliveRow(c + 51, onTop(430) - 0.4, 3);
    rBreak("hall_lamp", "halls", c + 56, 16); }

  // -- The Harp Room: the boss (1 Samuel 18:10-11). (Glen 11-05: his throne room kit and wall.) David sits on the stool
  // and plays; the king, tormented, takes up his spear and throws it, twice; David gets up and jumps; the music calms him
  c = R("harp");
  ground(c, c + 39);
  { rDeco("harp", "hr_column", c + 2); rDeco("harp", "hr_banner", c + 7, false, 1, 150); rDeco("harp", "hr_brazier", c + 10);
    rDeco("harp", "hr_rug", c + 15, false, 1, GR * T - 14);   // (David sits on the rug to play)
    rDeco("harp", "hr_banner", c + 22, false, 1, 150); rDeco("harp", "hr_brazier", c + 25); rDeco("harp", "hr_rack", c + 28);
    rDeco("harp", "hr_throne", c + 35); rDeco("harp", "hr_column", c + 38);
    rRelic("g_truth_spears", "truth", c + 5, 16,
      "My soul is among lions. I lie among those who are set on fire, even the sons of men, whose teeth are spears and arrows, and their tongue a sharp sword. (Psalm 57:4)", "g_harp_wall");
    Object.assign(region.relics[region.relics.length - 1], { x: c * T + HARP_WALL.BOOK_X, y: HARP_WALL.BOOK_Y });   // (in the hole)
    region.harp = { c, crackX: c * T + HARP_WALL.X, dust: [], empty: regionHas("taken", "g_harp_done"), wallHits: 0, stoolX: (c + 15) * T + T / 2, saulX: (c + 31) * T + T / 2, wallX: (c + 1) * T + 10, phase: "wait", calm: 0, escapes: 0, t: 0, spear: null, stuck: [], told: false }; }

  // -- The Cellars (down the stair): storerooms; a cracked wall (Goliath's sword) hides an oil jar
  c = R("cellars");
  ground(c, c + 63);
  // (Glen 11-05: built from his Cave kit on his cave wall: the ruined arch up to the walls, shelves with a bench and
  // crates stacked on them up to the stone, and his cracked wall, broken open once David has Goliath's sword)
  { const X = k => (c + k) * T;
    rKitDoor("d_cellarup", "cellars", c + 4, "stairs", "d_down", "c_ruindoor");
    region.props[region.props.length - 1].x -= 24;   // (the doorway is right of the piece's middle)
    oliveRow(c + 8, 16, 4); rBreak("jar", "cellars", c + 13, 16);
    rPiece("cellars", "c_beam", X(14), FOOT, [[8, 200, 2]]);                                   // a bench: a step up
    const [x1, top] = rShelves("cellars", X(19), 2);                                            // shelves along the wall
    rBreak("lamp", "cellars", c + 20, onTop(top)); oliveRow(c + 21, onTop(top) - 0.4, 3);
    const by = rPiece("cellars", "c_beam", X(25), top, [[8, 200, 2]]);                         // a bench up on the shelves
    const cy = rPiece("cellars", "c_crates", X(30), top, [[84, 150, 4]]);                      // crates and sacks on them
    rRelic("g_stone_cellar", "stone", c + 33, onTop(cy + 4));
    rPiece("cellars", "c_jars", X(36), FOOT);
    // (Glen 11-05) a hole in the floor: down into the deep cellar
    rHole("cellars", c + 38, 3, { to: { room: "deep", c: 62, facing: -1 } });
    rDoor("d_hole", "cellars", c + 39, "hole", "d_deeprope");
    critter("scorpion", c + 33); rBreak("pots", "cellars", c + 41, 16);
    rPiece("cellars", "c_steps", X(42), FOOT, KIT.c_steps.steps.map((t, i) => [i * 36 + 4, i * 36 + 34, t + 1]));
    const [x2, top2] = rShelves("cellars", X(47), 0); rBreak("jar", "cellars", c + 49, onTop(top2));
    rPiece("cellars", "c_basin", X(52), FOOT);
    // the cracked wall: floor to ceiling across the passage (his art), until Goliath's sword breaks it
    if (!hasSkill("heavySword")) { block(c + 55, 0, 6, 17, 1); for (let i = 0; i < 6; i++) artSolid.add((c + 55 + i) + ",0"); }   // (solid, drawn only as his wall)
    rSeal("g_seal_crack", "cellars", c + 55, "heavySword", "Cracked stone, with a draft coming through. Something heavy could break it.", c + 51, c + 56);
    region.crack = { c: c + 55, r: 0, w: 6, h: 17 };
    rPiece("cellars", "c_brokendoor", X(60) - 60, FOOT);                                        // the old storeroom behind it
    rRelic("g_oil_cellar", "oil", c + 61, 16);
    oliveRow(c + 62, 16, 2); }

  // -- The Deep Cellar (down the hole in the cellars' floor; Glen 11-05): webs and roots, spiders on their threads, a
  // bat, rats; planks over one pit, a floor that gives way over another; the rope back up; the way on to the cisterns
  c = R("deep");
  ground(c, c + 69);
  { const X = k => (c + k) * T;
    rDoor("d_deeprope", "deep", c + 65, "rope", "d_hole");
    oliveRow(c + 56, 16, 4); rRat("deep", c + 54, 4);
    rSpider("deep", c + 49, 210);
    rHole("deep", c + 42, 4, { planks: true });
    rBat("deep", c + 37, 100); rBreak("jar", "deep", c + 35, 16);
    rHole("deep", c + 28, 4, { crumble: true });
    rSpider("deep", c + 24, 180); rRat("deep", c + 20, 3);
    rHole("deep", c + 15, 3);
    oliveRow(c + 13, 16, 2);
    const [, top] = rShelves("deep", X(3), 0);
    const cy = rPiece("deep", "c_crates", X(5), top, [[84, 150, 4]]);
    rRelic("g_stone_deep", "stone", c + 8, onTop(cy + 4));
    rCrawler("deep", c + 9, 2); }

  // -- The Cisterns (down the well, with the rope): a pomegranate and a Truth
  c = R("cisterns");
  ground(c, c + 41);
  rDoor("d_wellrope", "cisterns", c + 4, "rope", "d_well");
  // (Glen 11-05: built from his cave kit on his cave wall: the basin by the well's rope, a pit to jump, a bench up onto
  // the long shelves, a bench and crates stacked on them up to the Truth; a spider over the shelves, a rat below)
  { const X = k => (c + k) * T;
    rBreak("jar", "cisterns", c + 7, 16); rPiece("cisterns", "c_basin", X(8), FOOT);
    rHole("cisterns", c + 11, 3);
    rPiece("cisterns", "c_beam", X(15), FOOT, [[8, 200, 2]]);
    const [, top] = rShelves("cisterns", X(20), 1);
    rBreak("lamp", "cisterns", c + 21, onTop(top));
    const by = rPiece("cisterns", "c_beam", X(25), top, [[8, 200, 2]]);
    rRelic("g_pom_cistern", "pomegranate", c + 27, onTop(by + 2));
    const cy = rPiece("cisterns", "c_crates", X(32), top, [[84, 150, 4]]);
    rSpider("cisterns", c + 29, 170); rRat("cisterns", c + 37, 3);
    rPiece("cisterns", "c_jars", X(38), FOOT);
    rRelic("g_truth_covenant", "truth", c + 35, onTop(cy + 4),
    "Then the princes of the Philistines went out; and as often as they went out, David behaved himself more wisely than all the servants of Saul, so that his name was highly esteemed. (1 Samuel 18:30)"); }   // (the covenant itself is Jonathan's scene in the halls; the id stays for old saves)
  storyBuild(R);
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
  roomImg(MAP_SHEET.img); kitImg("olive_press");   // (the save point's picture: ready before the first one comes on screen)
  for (const r of REGION.rooms) { for (const k of ["strip", "floor", "art", "block", "far", "mid", "near"]) roomImg(r[k]); (r.tower || []).forEach(roomImg); if (r.tower) { Object.values(TOWER.END).forEach(e => roomImg(e.img)); TOWER_TOP.pieces.forEach(p => roomImg(p.img)); } if (r.tallWall) Object.values(r.tallWall).forEach(roomImg); if (r.tower || r.tallWall) { roomImg("gibeah/sky_clouds"); roomImg("gibeah/sky_strip.jpg"); } }
  for (const n in KIT) if (n.startsWith("tw_")) kitImg(n);   // (the tower's kit, ready before he climbs)   // load them all now (no old backdrop flashing first)
  for (const n in KIT) if (KIT[n].w) kitImg(n);
  // (Glen 11-06) a later region keeps what David earned before (REGION.carry: the regions before it): pomegranates,
  // Jonathan's robe, stones of remembrance, strength
  region.carried = (REGION.carry || []).map(k => { try { return JSON.parse(localStorage.getItem(slotKey("david2Region") + "_" + k) || "{}"); } catch (e) { return {}; } });
  for (const c of region.carried) region.save.str = Math.max(region.save.str || 0, c.str || 0);
  const allTaken = [region.save, ...region.carried].flatMap(c => c.taken || []);
  const poms = allTaken.filter(id => /^[a-z0-9]+_pom/.test(id)).length;
  const extra = (Math.floor(poms / 4) + (everHas("g_jonathan") ? 1 : 0)) * RTUNE.HP_PER_HEART; david.maxHearts += extra; david.hearts += extra;   // (+ Jonathan's robe)   // every 4 pomegranates: the meter grows by a heart's worth, for good
  david.specialStones += allTaken.filter(id => /^[a-z0-9]+_stone/.test(id)).length;
  { const up = (strLevel() - 1) * STR.HP; david.maxHearts += up; david.hearts += up; }   // (strength: health for each level)
}
function regionGo(x, facing, after = null) {   // fade out, move, fade in (after: what happens once he's moved, e.g. onto a rope)
  region.trans = { t: 0, x, facing, moved: false, after };
}
// (Glen 11-07: "he ran along the bottom of the top of the bricks") a wall's solid block can only start on a tile line,
// below its stone top (the ledge): a little hop that cleared the block but not the ledge landed him on the block, down
// in the stones. Standing there, he's lifted onto the stones' top
function regionStoneTop(d) {
  if (!region.tops || !d.onGround || d.ladder) return;
  for (const t of region.tops) if (d.x > t.x0 && d.x < t.x1 && Math.abs(d.y - t.low) < 3) { d.y = t.top; if (d.vy > 0) d.vy = 0; return; }
}
function updateRegion(dt) {
  if (!REGION_ON) return;
  if (!region.inited) regionInit();
  const d = david; regionStoneTop(d);
  // the room he's in: the camera, the background and the map follow it
  const r = roomAt(d.x);
  if (r !== region.room) {
    region.room = r;
    if (!regionHas("explored", r.id)) { regionAdd("explored", r.id); toast(r.name); }
    for (const b of region.breaks) if (b.room === r.id) { b.broken = false; b.t = 0; }   // come back in: they're whole again
    for (const b of region.beasts) if (b.room === r.id) Object.assign(b, { x: b.hx, y: b.hy, state: b.kind === "spider" || b.kind === "bat2" ? "hang" : BIRD[b.kind] ? "perch" : b.kind === "phil" ? "wait" : "walk", t: Math.random() * 3, dead: false, cool: 0, hp: PHIL.HP, alpha: 1, dropX: undefined, strTaken: false, air: false, vy: 0 });
    for (const k of region.crumbles) if (k.room === r.id && k.state !== "whole") { k.state = "whole"; k.t = 0; platAt(k.c, GR * T, k.w); }
    region.drops.length = 0;
    if (REGION.enter) REGION.enter(r);
  }
  updateBreaks(dt); updateBeasts(dt, r); strWatch(); updateFloorCrumbles(dt, r); updateHarpRoom(dt, r); updateRegionScript(dt); updateStory(dt, r); journalWatch();
  if (REGION.update) REGION.update(dt, r);   // (another region's own: ramah.js)
  bgWorld = r.bg || bgWorld;
  // going through: fade out, move him (and the party), fade back in
  const tr = region.trans;
  if (tr) {
    tr.t += dt;
    if (tr.hole && !tr.moved) { d.vy = 0; d.y = Math.min(d.y, GR * T + 90); }   // (down the hole: held there while it fades)
    if (tr.leave) {   // out of Gibeah: for now, back to the game's map (the travel map of the land comes later)
      region.fade = Math.min(1, tr.t / (RTUNE.FADE * 2));
      if (tr.t > RTUNE.FADE * 2 + 0.2 && !tr.gone) { tr.gone = true; try { sessionStorage.setItem("david2TitleSeen", "1"); } catch (e) {} location.href = "index.html"; }   // (Glen 11-06: the land map, the next stop revealed)
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
  for (const h of region.holes) if (h.to && h.room === r.id && d.x > h.x0 && d.x < h.x1 && d.y > GR * T + 40) {   // down the hole, into the room below
    const n = roomById(h.to.room);
    region.trans = { t: 0, x: (n.c0 + h.to.c) * T, facing: h.to.facing || 1, moved: false, hole: true, after: () => { d.y = -30; d.vy = 0; d.onGround = false; setState("jump"); snapCamera(); } };
    return;
  }
  // off the edge of the room, into the next
  const left = r.c0 * T, right = (r.c0 + r.w) * T;
  if (r.left === "@road" && d.x < left + RTUNE.EDGE + BODY_W / 2 && held("left")) { region.trans = { t: 0, leave: true }; return; }   // the road out (Glen 11-03)
  if (r.left && r.left !== "@road" && d.x < left + RTUNE.EDGE + BODY_W / 2 && held("left")) { const n = roomById(r.left); regionGo((n.c0 + n.w - 2) * T, -1); return; }
  if (r.right && d.x > right - RTUNE.EDGE - BODY_W / 2 && held("right")) { const n = roomById(r.right); regionGo((n.c0 + 2) * T, 1); return; }
  // a door, a stair, a well: Up
  if (region.climb) return;   // on the rope or the rock face (regionClimbHold)
  if (pressed("up") && d.onGround && regionClimbStart(d)) return;
  if (pressed("up") && d.onGround) {
    const door = region.doors.find(o => o.kind !== "hole" && !o.shut && Math.abs(d.x - o.x) < RTUNE.DOOR_REACH && Math.abs(d.y - (o.y ?? GR * T)) < 30);
    if (door && door.kind === "exit") {   // the locked gate out
      const left = STORY_STEPS.find(id => !regionHas("taken", id));   // (Glen 11-06) not before the story's done, key or no key
      if (left) sayLine("David", GATE_NOT_YET[left]);
      else if (!regionHas("taken", door.key)) sayLine("David", "I need a key for this.");
      else { regionAdd("taken", "g_exit_open"); toast("The key fits. David slips out through the gate..."); jsceneOpen(true); }   // (Glen 11-05: the Journal and the card first, then the road)
      return;
    }
    if (door) {
      const seal = door.need && region.seals.find(s => s.need === door.need && Math.abs(s.x - door.x) < 3 * T);
      if (door.need && !hasSkill(door.need)) { if (seal) sealSay(seal); }
      else { const to = region.doors.find(o => o.id === door.to); regionGo(to.x + 30, 1, to.y != null ? () => { david.y = to.y; david.vy = 0; if (typeof p2 !== "undefined" && p2.on) p2.y = to.y; region.camFootY = to.y; snapCamera(); if (to.land) to.land(); } : null); }
      return;
    }
  }
  // seals: say what's wrong when he comes up to one (once per visit), and put it on the map
  const s = region.seals.find(q => q.room === r.id && !sealOpen(q) && d.x > q.x0 && d.x < q.x1);
  if (s && region.sealNear !== s) sealSay(s);
  region.sealNear = s || null;
  // finds: pick them up
  for (const f of region.relics) {
    if (regionHas("taken", f.id) || relicHidden(f)) continue;
    f.t += dt; if (f.readyT > 0) { f.readyT -= dt; continue; }   // (just revealed: see it first)
    if (Math.abs(f.x - d.x) < W * 0.6 && roomAt(f.x) === r) regionAdd("seen", f.id);
    if (Math.abs(f.x - d.x) < 34 && d.y > f.y - 70 && d.y - d.h < f.y + 10) takeRelic(f);
  }
}
// ---- climbing (Glen 11-03): the rope down the well and back up (david_climb, his back to us), and the watchtower's
//      face (david_wallclimb_side). region.climb while he's on one: { kind: "rope" | "wellhop" | "well" | "wall" | "ledge", ... }
function regionClimbStart(d) {   // Up on the ground: by the well, the rope in the cisterns, or a rock face
  const r = roomAt(d.x);
  for (const o of region.doors) {
    if (Math.abs(d.x - o.x) > RTUNE.DOOR_REACH) continue;
    if (o.kind === "well" && hasSkill("rope")) {   // a hop up onto the rim, then down inside (Glen's sheet backwards)
      region.climb = { kind: "wellhop", o, x0: d.x, t: 0 };
      d.vx = d.vy = 0; d.facing = wellRim(o).x >= d.x ? 1 : -1;
      return true;
    }
    if (o.kind === "rope") { region.climb = { kind: "rope", x: o.x, dist: 0, o }; d.x = o.x; d.vx = d.vy = 0; return true; }
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
  if (c.kind === "wellhop") {   // up onto the rim
    const r = wellRim(c.o), k = Math.min(1, (c.t += dt) / RTUNE.WELL_HOP);
    d.x = c.x0 + (r.x - c.x0) * k; d.y = GR * T + (r.y - GR * T) * k - Math.sin(k * Math.PI) * 40;
    if (k >= 1) { region.climb = { kind: "well", o: c.o, dir: -1, t: 0 }; d.x = c.o.x; d.y = GR * T; }
    return true;
  }
  if (c.kind === "well") {   // Glen's climb-out sheet: forwards (out) or backwards (in); he's drawn by it, well and all
    const sh = SPR[RTUNE.WELL_SHEET];
    c.t += dt; d.x = c.o.x; d.y = GR * T;
    if ((!sh || c.t >= sh.frames * RTUNE.WELL_MS / 1000) && !c.done) {
      c.done = true;
      if (c.dir < 0) wellDown(c.o);
      else {   // crouched on the rim: he hops down off it, out to the right
        const r = wellRim(c.o); region.climb = null;
        d.x = r.x; d.y = r.y; d.facing = 1; d.onGround = false;
        d.vx = TUNE.WALK_SPEED * 0.55; d.vy = -TUNE.JUMP_SPEED * 0.3; setState("jump");
      }
    }
    return true;
  }
  if (c.kind === "ledge") {   // one go of the climb-over clip, forwards (up) or backwards (down)
    const sh = SPR[RTUNE.LEDGE_SHEET];
    c.t += dt; d.x = c.ax; d.y = GR * T;
    if ((!sh || c.t >= sh.frames * sh.ms / 1000) && !c.done) { c.done = true; c.then(); }   // (it holds the last frame after)
    return true;
  }
  if (c.kind === "rope") {
    d.x = c.x; d.y += v * RTUNE.CLIMB_SPEED * dt; c.dist += Math.abs(v) * RTUNE.CLIMB_SPEED * dt;
    if (d.y >= GR * T) { d.y = GR * T; d.onGround = true; region.climb = null; return true; }   // down on the floor
    if (d.y <= ropeTop(c.o) + RTUNE.ROPE_HANG - 10 && !c.gone) {   // up into the well shaft: out into the town
      c.gone = true; const w = region.doors.find(o => o.id === ((c.o && c.o.to) || "d_well"));
      if (w.kind === "well") regionGo(w.x, 1, () => { wellOut(w); snapCamera(); });
      else regionGo(w.x + 3 * T, 1, () => { region.climb = null; d.onGround = true; setState("idle"); snapCamera(); });   // (up out of the hole: onto the floor beside it)
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
const ropeTop = o => o && o.top != null ? o.top : RTUNE.ROPE_TOP;   // (a tall room's well mouth is higher up: o.top, World 2's Secu)
function wellDown(o) {   // crouched on the rim: the fade, and he's on the rope in the cisterns
  const to = region.doors.find(q => q.id === ((o && o.to) || "d_wellrope"));
  regionGo(to.x, 1, () => {
    region.climb = { kind: "rope", x: to.x, dist: 0, o: to }; david.x = to.x; david.y = ropeTop(to) + RTUNE.ROPE_HANG; region.camFootY = david.y; snapCamera();
    if (!region.ropeTold) { region.ropeTold = true; toast("Down the rope: hold Down. Up climbs back out. A lets go."); }
  });
}
function wellOut(o) {   // out of the well: Glen's climb-out sheet, then he hops down off the rim
  region.climb = { kind: "well", o, dir: 1, t: 0 };
  david.x = o.x; david.y = GR * T;
}
const wellK = () => SCALE * RTUNE.WELL_K;   // game px per px of Glen's well picture
const wellRim = o => ({ x: o.x + RTUNE.WELL_RIM[0] * wellK(), y: GR * T + RTUNE.WELL_SINK - RTUNE.WELL_RIM[1] * wellK() });
function drawRegionClimb(d, x, y) {   // main.js drawDavid: true if it drew him
  const c = REGION_ON && region.climb; if (!c) return false;
  if (c.kind === "wellhop") { drawSprite("david_jump_air", 4, x, y - d.h / 2 - 6, d.facing); return true; }
  if (c.kind === "well") {   // the sheet's anchor is the hole's middle at the well's base, so it lands on the well
    const sh = SPR[RTUNE.WELL_SHEET]; if (!sh) return false;
    const k = Math.min(sh.frames - 1, Math.floor(c.t * 1000 / RTUNE.WELL_MS)), i = c.dir > 0 ? k : sh.frames - 1 - k;
    drawSprite(RTUNE.WELL_SHEET, i, x, y + RTUNE.WELL_SINK, 1, RTUNE.WELL_K); return true;
  }
  if (c.kind === "ledge") {
    const sh = SPR[RTUNE.LEDGE_SHEET]; if (!sh) return false;
    const k = Math.min(sh.frames - 1, Math.floor(c.t * 1000 / sh.ms)), i = c.dir > 0 ? k : sh.frames - 1 - k;
    drawSprite(RTUNE.LEDGE_SHEET, i, x, y, 1); return true;
  }
  if (c.kind === "wall") {
    // (Glen 11-03: he climbed too low) the sheet's anchor is its middle, not his feet: lift it so his feet are at y
    const n = "david_wallclimb_side", s = SPR[n], up = (s.h - 6 - s.ay) * SCALE * (TUNE.SPRITE_SIZE[n] || 1);
    drawSprite(n, Math.floor(c.dist / RTUNE.WALL_STRIDE) % s.frames, x, y - up, c.f); return true;
  }
  // (Glen 11-03: he was off the rope) the rope in his hands is at x 29 of the sheet's 130, left of its anchor: move him
  // over so his hands are on our rope
  const n = "david_climb", i = Math.floor(c.dist / TUNE.CLIMB_STRIDE) % SPR[n].frames;
  const hx = x + (SPR[n].ax - RTUNE.ROPE_IN_HANDS) * SCALE * (TUNE.SPRITE_SIZE[n] || 1);
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
  if (f.kind === "key") { toast("A bronze key from the top of the watchtower! It must open something..."); return; }
  if (f.kind === "oil") { david.lampOil += 20; toast("An oil jar! Your lamp will burn longer."); return; }
  if (f.kind === "pomegranate") {
    const n = region.save.taken.filter(id => id.startsWith("g_pom")).length;
    if (n % 4 === 0) { david.maxHearts += RTUNE.HP_PER_HEART; david.hearts = david.maxHearts; toast("A pomegranate! Four of them: your hearts go up for good."); }
    else { david.hearts = Math.min(david.maxHearts, david.hearts + RTUNE.HP_PER_HEART); toast(`A pomegranate! (${n % 4} of 4 to raise your hearts)`); }
  }
}
function drawRegionFire(f, camX) {   // main.js drawFires: true if it drew it (Glen's olive press, or his campfire)
  if (!REGION_ON) return false;
  const n = f.look === "fire" ? "campfire2" : "olive_press", k = KIT[n], im = kitImg(n); if (!im) return true;
  const fl = n === "campfire2" ? 1 + Math.sin(performance.now() / 110) * 0.025 : 1, h = k.h * fl;   // the flames flicker
  ctx.drawImage(im, Math.round(f.x - camX - k.w / 2), Math.round(f.y + 6 - h), k.w, h);
  if (f.lit && n === "olive_press") {   // saved: a soft gold glow on the stone
    ctx.save(); ctx.globalCompositeOperation = "lighter"; const x = f.x - camX, y = f.y - 60;
    const g = ctx.createRadialGradient(x, y, 4, x, y, 80); g.addColorStop(0, "rgba(255,220,120,0.22)"); g.addColorStop(1, "rgba(255,200,80,0)");
    ctx.fillStyle = g; ctx.fillRect(x - 80, y - 80, 160, 160); ctx.restore(); return true;
  }
  return n === "olive_press";
}
function regionFireLit(f) {   // an olive press (a campfire, for now): save here
  if (!REGION_ON) return;
  const c = Math.round((f.x - 30) / T), r = REGION.rooms.find(q => c >= q.c0 && c < q.c0 + q.w);
  region.save.at = c; if (r) { region.save.atRoom = r.id; region.save.atOff = c - r.c0; } regionWrite();
}

// ---- health, and things to break (Glen 11-03: Castlevania-style) ----
const regionHit = fromX => {   // what a hit takes off: by whatever's nearest where it came from
  let best = null, bd = 90;
  const near = (k, kind) => { const dd = Math.abs((k.x || 0) - fromX); if (dd < bd) { bd = dd; best = kind; } };
  if (typeof critters !== "undefined") for (const k of critters) near(k, k.kind);
  if (typeof snakes !== "undefined") for (const s of snakes) near(s, s.kind);
  for (const b of region.beasts) if (!b.dead) near(b, b.kind);
  return RTUNE.HIT[best] ?? RTUNE.HIT.default;
};
const breakScale = (k, img) => k.h / (img.naturalHeight * k.fit);   // picture px to game px
function breakBox(b) {   // the whole thing (about two thirds of its picture's width: Glen's sets leave room for the flying bits)
  const k = RTUNE.BREAK[b.kind], img = ITEM[k.art], w = img && img.naturalHeight ? img.naturalWidth * breakScale(k, img) * (k.dark ? 1 : 0.68) : k.h;
  return { x0: b.x - w / 2, x1: b.x + w / 2, y0: b.y - k.h, y1: b.y };
}
function stoneHitsRegion(s) {   // main.js's stone loop (the sling, and the sword's edge): true if it broke something
  if (!REGION_ON) return false;
  if (REGION.stoneHits && REGION.stoneHits(s)) return true;   // (another region's own: ramah.js)
  const hr = region.harp;
  if (hr && hr.empty && !regionHas("taken", "g_harp_wall") && s.x < hr.crackX + HARP_WALL.W - 10 && s.x > hr.crackX + 10 && s.y > HARP_WALL.HIT_Y && s.y < GR * T) {
    if (hr.hitCool > 0) return true;   // (one swing, one hit)
    hr.hitCool = 0.25; hr.wallHits++;   // (Glen 11-05) where the spears struck, the plaster's cracked: strike it and it gives way
    const cx = hr.crackX - HARP_WALL.X + HARP_WALL.BOOK_X, cy = HARP_WALL.HOLE_Y;
    for (let i = 0; i < HARP_WALL.DUST; i++) hr.dust.push({ x: cx + (Math.random() - 0.5) * 40, y: cy + (Math.random() - 0.5) * 30, vx: (Math.random() - 0.5) * 70 + 25, vy: -Math.random() * 40, r: 16 + Math.random() * 16, t: 0, life: 1.0 + Math.random() * 0.7 });
    for (let i = 0; i < 6; i++) bits.push({ x: cx, y: cy, vx: Math.random() * 260 - 60, vy: -Math.random() * 260, life: 0.6, color: i % 2 ? "#d8c4a0" : "#9c8566" });   // chips of plaster
    if (typeof stoneHit === "function") stoneHit(s, 0.6);
    if (hr.wallHits >= HARP_WALL.HITS) { regionAdd("taken", "g_harp_wall"); region.relics.find(f => f.id === "g_truth_spears").readyT = HARP_WALL.SEE; if (typeof chime === "function") chime(4); toast("The cracked wall gave way. Something's hidden inside!"); }
    return true;
  }
  if (hr && !hr.empty && Math.abs(s.x - hr.saulX) < 40 && s.y > GR * T - 160 && s.y < GR * T) {   // (David never strikes the king)
    if (!hr.noStrike) { hr.noStrike = true; toast("David will not strike the LORD's anointed."); }
    return true;
  }
  for (const b of region.beasts) {
    if (b.dead) continue;
    if (b.kind === "phil") { if (philHit(b, s)) return true; continue; }
    const q = beastBox(b);
    if (s.x > q.x0 - 8 && s.x < q.x1 + 8 && s.y > q.y0 - 8 && s.y < q.y1 + 8) { b.dead = true; b.state = "dust"; b.t = 0;
      if (BIRD[b.kind]) for (let i = 0; i < 10; i++) bits.push({ x: b.x, y: b.y - 25, vx: (Math.random() - 0.5) * 240, vy: -Math.random() * 200, life: 1.1, color: b.kind === "eagle" ? (i % 2 ? "#6b4a2b" : "#d9cbb0") : (i % 2 ? "#1d1b22" : "#3a3644") });   // (feathers)
      if (typeof stoneHit === "function") stoneHit(s, 0.6); return true; }
  }
  for (const b of region.breaks) {
    if (b.broken) continue;
    const q = breakBox(b);
    if (s.x > q.x0 - 6 && s.x < q.x1 + 6 && s.y > q.y0 - 6 && s.y < q.y1) { smash(b); if (typeof stoneHit === "function") stoneHit(s, 0.6); return true; }
  }
  return false;
}
function smash(b) {
  const k = RTUNE.BREAK[b.kind]; b.broken = true; b.t = 0;
  const q = breakBox(b), cx = b.x, cy = (q.y0 + q.y1) / 2;
  for (let i = 0; i < 8; i++) bits.push({ x: cx + (Math.random() - 0.5) * (q.x1 - q.x0) * 0.6, y: cy, vx: (Math.random() - 0.5) * 420, vy: -Math.random() * 460, life: 0.8, color: k.bits[i % 2] });
  let roll = Math.random() * 100, what = "none";
  for (const [name, n] of RTUNE.DROPS) { if (roll < n) { what = name; break; } roll -= n; }
  if (what === "olives") { for (let i = 0; i < 3; i++) olives.push({ x: cx + (i - 1) * 16, y: cy, vx: (i - 1) * 90, vy: -260 - Math.random() * 120, falling: true, kind: i % 2 ? "purple" : "green", taken: false, t: 0, placed: false }); }
  else if (what !== "none") region.drops.push({ kind: what, x: cx, y: cy, vx: (Math.random() - 0.5) * 80, vy: -300, falling: true, t: 0 });
}
function updateBreaks(dt) {
  const d = david;
  for (const b of region.breaks) if (b.broken) b.t += dt;
  for (const o of region.drops) {
    if (o.taken) continue;
    fall(o, dt); o.t += dt;
    if (o.t > 12) { o.taken = true; continue; }   // gone if you leave it (it blinks first)
    if (Math.abs(o.x - d.x) < 34 && d.y > o.y - 70 && d.y - d.h < o.y + 10 && d.deadT <= 0) {
      o.taken = true; d.hearts = Math.min(d.maxHearts, d.hearts + RTUNE.HEAL[o.kind]); sfx("heal", undefined, 0.6);
      for (let i = 0; i < 8; i++) bits.push({ x: o.x, y: o.y - 14, vx: (Math.random() - 0.5) * 260, vy: -Math.random() * 320, life: 0.5, color: "#ff8a8a" });
    }
  }
  for (let i = region.drops.length - 1; i >= 0; i--) if (region.drops[i].taken) region.drops.splice(i, 1);
}
function drawBreaks(camX) {
  const now = performance.now() / 1000;
  for (const b of region.breaks) {
    const k = RTUNE.BREAK[b.kind], x = b.x - camX; if (x < -150 || x > W + 150) continue;
    if (k.light && !b.broken) {   // a flame's glow
      const fy = b.y - k.h * 0.85, r = k.h * 0.9 + Math.sin(now * 7 + b.x) * 3;
      const g = ctx.createRadialGradient(x, fy, 2, x, fy, r); g.addColorStop(0, "rgba(255,210,120,0.45)"); g.addColorStop(1, "rgba(255,190,90,0)");
      ctx.fillStyle = g; ctx.fillRect(x - r, fy - r, r * 2, r * 2);
    }
    const [t1, t2, t3] = RTUNE.BREAK_T;
    let art = k.art, alpha = 1;
    if (b.broken && k.dark) art = k.dark;
    else if (b.broken) {   // Glen's breaking picture, then the pieces, then they fade away
      if (b.t > t1 + t2 + t3) continue;
      art = b.t < t1 ? k.art + "_breaking" : k.art + "_broken";
      alpha = b.t < t1 + t2 ? 1 : 1 - (b.t - t1 - t2) / t3;
    }
    const img = ITEM[art]; if (!img || !img.naturalHeight) continue;
    const sc = breakScale(k, img);
    drawItem(art, x, b.y + img.naturalHeight * k.gap * sc, sc, alpha);
  }
  for (const o of region.drops) {
    const big = o.kind === "heart_big", h = big ? 34 : 20, img = HUD.heart_full;
    if (o.t > 9 && Math.floor(o.t * 8) % 2) continue;   // blinking: about to go
    if (img && img.naturalWidth) { const w = img.naturalWidth * h / img.naturalHeight; ctx.drawImage(img, o.x - camX - w / 2, o.y - h - (o.falling ? 0 : 2 + Math.sin(o.t * 4) * 2), w, h); }
  }
}
function drawRegionHealth() {   // main.js drawHearts: the health meter instead of a row of hearts
  const d = david, px = RTUNE.METER_PX, bw = d.maxHearts * px, bh = 16, x1 = W - 20, x0 = x1 - bw, y = 22;
  const f = Math.max(0, Math.min(1, d.hearts / d.maxHearts));
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(x0 - 3, y - 3, bw + 6, bh + 6);
  ctx.fillStyle = "#4a1414"; ctx.fillRect(x0, y, bw, bh);
  const g = ctx.createLinearGradient(0, y, 0, y + bh); g.addColorStop(0, "#ff6b5a"); g.addColorStop(1, "#b81d1d");
  ctx.fillStyle = g; ctx.fillRect(x0, y, bw * f, bh);
  ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 1;   // a tick every heart's worth (10)
  for (let v = RTUNE.HP_PER_HEART; v < d.maxHearts; v += RTUNE.HP_PER_HEART) { ctx.beginPath(); ctx.moveTo(x0 + v * px + 0.5, y); ctx.lineTo(x0 + v * px + 0.5, y + bh); ctx.stroke(); }
  ctx.restore();
  const iw = hudIcon("heart_full", x0 - 42, y - 8, 32);
  ctx.textAlign = "right"; hudText(`${Math.ceil(Math.max(0, d.hearts))} / ${d.maxHearts}`, x1, y + bh + 24, 18); ctx.textAlign = "left";
  // strength (from fighting): a thin gold bar, its level beside it
  const lv = strLevel(), full = lv >= REGION.strCap, a = STR.NEED[lv - 1], b = STR.NEED[lv], sf = full ? 1 : (strXP() - a) / (b - a);
  const sw = 150, sh = 8, sx1 = x1, sx0 = sx1 - sw, sy = y + bh + 36;
  region.strFlash = Math.max(0, (region.strFlash || 0) - 1 / 60 * 1.5);
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(sx0 - 3, sy - 3, sw + 6, sh + 6);
  ctx.fillStyle = "#3a2c10"; ctx.fillRect(sx0, sy, sw, sh);
  const sg = ctx.createLinearGradient(0, sy, 0, sy + sh); sg.addColorStop(0, "#ffe08a"); sg.addColorStop(1, "#c8901e");
  ctx.fillStyle = sg; ctx.fillRect(sx0, sy, sw * sf, sh);
  if (region.strFlash > 0) { ctx.fillStyle = `rgba(255,255,220,${region.strFlash * 0.7})`; ctx.fillRect(sx0, sy, sw * sf, sh); }
  ctx.restore();
  ctx.textAlign = "right"; hudText(`Strength ${lv}${full ? " (max here)" : ""}`, sx0 - 10, sy + 9, 16); ctx.textAlign = "left";
}

// ---- drawing ----
function drawRegionBackdrop(camX) {   // true if it drew the room's backdrop
  if (!REGION_ON) return false;
  const r = region.room || roomAt(david.x);
  const far = roomImg(r.far);
  if (far) {   // (Glen 11-05) outside: Super Mario World layers, the sky far off barely moving, the hills at half speed
    const rel = camX - r.c0 * T, mid = roomImg(r.mid);
    const tile = (im, p, y, h) => { const w = im.naturalWidth * h / im.naturalHeight, o = -((rel * p) % w + w) % w;
      for (let x = o; x < W; x += w) ctx.drawImage(im, Math.round(x), y, Math.ceil(w) + 1, h); };
    tile(far, 0.12, 0, H);
    if (mid) tile(mid, 0.45, r.midY || 0, mid.naturalHeight);
    const near = roomImg(r.near);   // (Glen 11-10: "far, mid and near ground", as Part One) a third layer, nearer and faster, its bottom at nearY (default: the ground line)
    if (near) tile(near, 0.75, (r.nearY ?? GR * T + 20) - near.naturalHeight, near.naturalHeight);
    return true;
  }
  if (r.tower) { drawTowerWall(r, camX); return true; }
  if (r.tallWall) { drawTallWall(r, camX); return true; }
  const strip = roomImg(r.strip);
  if (strip) {   // a long room's backdrop, repeating (it scrolls with the room)
    const x0 = r.c0 * T - camX, sw = strip.naturalWidth * H / strip.naturalHeight;
    for (let x = x0 + Math.floor(-x0 / sw) * sw; x < W; x += sw) ctx.drawImage(strip, Math.round(x), 0, Math.ceil(sw) + 1, H);
    if (r.up) {   // (r.band: [top, height] of the storey that repeats, as fractions of the strip's height; Glen's Naioth, 11-10) (a tall room, World 2: the wall's middle band, without its floor and ceiling, repeated on up over the ceiling)
      const f0 = r.band ? r.band[0] : r.cave ? 0.12 : 0.095, b0 = strip.naturalHeight * f0, bh = strip.naturalHeight * (r.band ? r.band[1] : r.cave ? 0.62 : 0.69), dh = bh * H / strip.naturalHeight;   // (Glen 11-07, the halls: a whole storey, from the beam over the hangings down to the wall above the floor, so each repeat is a full floor: no hangings cut in half)
      for (let y = f0 * H - dh; y > camY - dh; y -= dh) for (let x = x0 + Math.floor(-x0 / sw) * sw; x < W; x += sw) ctx.drawImage(strip, 0, b0, strip.naturalWidth, bh, Math.round(x), Math.round(y), Math.ceil(sw) + 1, Math.ceil(dh) + 1);
    }
    if (r.id === "harp") drawHarpWall(camX);   // (part of the wall: under everything else)
    return true;
  }
  if (roomArt(r)) { ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H); return true; }   // a painted room: drawRegion paints it
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
const TOWER = { TILE_W: 640, TILE_H: 1138, OV: 90, OPEN: 40, END_STEP: 851, END_UP: 60,
  END: { left: { img: "gibeah/tower_end_left.png", inner: 111 }, right: { img: "gibeah/tower_end_right.png", inner: 53 } } };
// OPEN: how far above the lookout floor the tower's open to the sky; END: Glen's corner-stone ends (inner: where the
// corner stones meet the inside, px in the picture: that's at the tower's edge, inset columns in); END_STEP: stacked
// this far apart (each fades in over the one above); END_UP: they rise this far over the open top   // (Glen 11-05) his tower wall pictures, as laid up the tower (px); OV: each fades in over its left and top neighbors this far (no seams)
const towerTopY = r => (-r.up + 8) * T - TOWER.OPEN;   // (the lookout: open above this)
// (Glen 11-05) his battlements along the top of the tower (david-sling-2-art/rooms/gibeah/tower_wall_a_source_top-of-wall-2.png,
// tower_wall_b_source_top-wall.png -> tower_top_a/b.png, at the tower's scale, fading out at the bottom into the stone):
// solid: px from the picture's top to where the wall is whole (under the gaps between the merlons); DROP: that line, px over the lookout floor
const TOWER_TOP = { pieces: [{ img: "gibeah/tower_top_b.png", solid: 50 }, { img: "gibeah/tower_top_a.png", solid: 135 }], DROP: 70 };
const towerWallTopY = r => (-r.up + 8) * T - TOWER_TOP.DROP;   // (where his tower stone stops: the battlements' whole wall from here up)
function cloudSky(r, camX, fallback) {   // (Glen 11-05) his sky of clouds, repeating, drifting slowly behind (the color till it's loaded)
  // (Glen 11-06) his softer, more lifelike sky: one strip, deep blue up top to pale at the horizon, filling the screen
  // (it's far off: it doesn't climb with the camera), sliding slowly sideways
  const st = roomImg("gibeah/sky_strip.jpg");
  if (st) {
    const sw = st.naturalWidth * H / st.naturalHeight, ox = -((((camX - r.c0 * T) * 0.12) % sw) + sw) % sw;
    for (let x = ox; x < W; x += sw) ctx.drawImage(st, Math.round(x), camY, Math.ceil(sw) + 1, H);
    return;
  }
  const im = roomImg("gibeah/sky_clouds");
  if (!im) { ctx.fillStyle = fallback; ctx.fillRect(0, camY, W, H); return; }
  const tw = im.naturalWidth, th = im.naturalHeight, ox = -((((camX - r.c0 * T) * 0.12) % tw) + tw) % tw, oy = camY - (((camY * 0.25) % th) + th) % th;
  for (let x = ox; x < W; x += tw) for (let y = oy; y < camY + H; y += th) ctx.drawImage(im, Math.round(x), Math.round(y), tw + 1, th + 1);
}
function towerSky(r, camX) {   // outside: the sky, and the fields far off at the bottom
  cloudSky(r, camX, "#9cc9ec");
  const far = roomImg("gibeah/fields_far");
  if (far && camY + H > 0) { const fw = far.naturalWidth * H / far.naturalHeight, o = -(((camX - r.c0 * T) * 0.12) % fw + fw) % fw; for (let x = o; x < W; x += fw) ctx.drawImage(far, Math.round(x), 0, Math.ceil(fw) + 1, H); }
}
function drawTowerWall(r, camX) {   // his two walls, tile by tile, picked at random (the same every time), inside the tower; sky above the lookout
  const ims = r.tower.map(roomImg);
  towerSky(r, camX);
  if (ims.some(im => !im)) return;
  const L = (r.c0 + r.inset) * T - 60 - camX, R = (r.c0 + r.w - r.inset) * T + 40 - camX;   // (under the ends' corner stones)
  const wt = towerWallTopY(r) + 30;   // (the tiles stop under the battlements' whole wall)
  ctx.save(); ctx.beginPath(); ctx.rect(L, wt, R - L, H - wt + 2000); ctx.clip();
  const { TILE_W: tw, TILE_H: th, OV: ov } = TOWER, x0 = r.c0 * T, top = -r.up * T;
  for (let ix = Math.floor((camX - x0) / tw); ix * tw + x0 < camX + W; ix++)
    for (let iy = Math.floor((camY - top) / th); iy * th + top < camY + H; iy++) {
      const rnd = Math.abs(Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453) % 1, im = ims[Math.floor(rnd * ims.length)];
      const x = Math.round(x0 + ix * tw - camX - ov), y = Math.round(top + iy * th - ov), w = tw + ov, h = th + ov;
      ctx.drawImage(im, x, y, w, h);   // (the mirrored ones are their own pictures: the soft edges stay on the left and top)
    }
  ctx.restore();
  // his battlements across the top, the pieces side by side (the corner stones cover their ends)
  const base = towerWallTopY(r); if (base + 400 < camY) return;
  ctx.save(); ctx.beginPath(); ctx.rect(L, camY, R - L, H); ctx.clip();
  for (let x = L, i = 0; x < R; i++) {
    const p = TOWER_TOP.pieces[i % TOWER_TOP.pieces.length], im = roomImg(p.img); if (!im) break;
    ctx.drawImage(im, Math.round(x), Math.round(base - p.solid)); x += im.naturalWidth - 2;
  }
  ctx.restore();
}
function drawTowerEnds(camX) {   // (Glen 11-05) the tower's two ends: his corner stones against the sky, the fields far off
  const r = region.room; if (!r || !r.tower) return;
  const bl = (r.c0 + r.inset) * T - camX, br = (r.c0 + r.w - r.inset) * T - camX, top = towerTopY(r) - TOWER.END_UP;
  ctx.save(); ctx.beginPath(); ctx.rect(-10, camY, bl - 100 + 10, H); ctx.rect(br + 90, camY, W - br, H); ctx.clip(); towerSky(r, camX); ctx.restore();   // (the open air: over the rock that keeps him in)
  for (const [side, x] of [["left", bl], ["right", br]]) {
    const e = TOWER.END[side], im = roomImg(e.img); if (!im) continue;
    const x0 = Math.round(x - e.inner); if (x0 > W || x0 + im.naturalWidth < 0) continue;
    for (let y = top + Math.max(0, Math.floor((camY - top) / TOWER.END_STEP) - 1) * TOWER.END_STEP; y < camY + H; y += TOWER.END_STEP) ctx.drawImage(im, x0, Math.round(y));
  }
}
// (Glen 11-05) the Walls, tall, from his rougher wall (david-sling-2-art/rooms/gibeah/wall2_*_source.png, scaled so the
// wall meets the paving at the ground line, its ends blended so it repeats): its base and paving at the bottom (fading
// up into the tile), his tile stacked up the middle, its broken battlements at the top (the white sky taken out, fading
// down into the tile), open sky above. Px in the world:
const TALL_WALL = { BASE_Y: 8, SKY: 360, DECK: 96, SKY_RGB: "#a9d4ef" };   // BASE_Y: the base picture's top; SKY: open sky over the battlements; DECK: the walk on top, from the battlements picture's top
const wallTopY = r => -r.up * T + TALL_WALL.SKY;
function drawTallWall(r, camX) {
  const base = roomImg(r.tallWall.base), tile = roomImg(r.tallWall.tile), topI = roomImg(r.tallWall.top);
  cloudSky(r, camX, TALL_WALL.SKY_RGB);
  if (!base || !tile || !topI) return;
  const x0 = r.c0 * T - camX, top = wallTopY(r);
  // the tile, from under the battlements down to the base
  const tw = tile.naturalWidth, th = tile.naturalHeight, y0 = top + 120, y1 = TALL_WALL.BASE_Y + 120;
  ctx.save(); ctx.beginPath(); ctx.rect(0, y0, W, y1 - y0); ctx.clip();   // (only the wall: not the sky over it)
  for (let x = x0 + Math.floor(-x0 / tw) * tw; x < W; x += tw)
    for (let y = y1 - th * Math.ceil((y1 - Math.max(y0, camY)) / th); y < Math.min(y1, camY + H); y += th) ctx.drawImage(tile, Math.round(x), Math.round(y), tw + 1, th + 1);
  ctx.restore();
  const bw = base.naturalWidth;
  for (let x = x0 + Math.floor(-x0 / bw) * bw; x < W; x += bw) {
    if (top + topI.naturalHeight > camY && top < camY + H) ctx.drawImage(topI, Math.round(x), Math.round(top), bw + 1, topI.naturalHeight);
    if (TALL_WALL.BASE_Y + base.naturalHeight > camY && TALL_WALL.BASE_Y < camY + H) ctx.drawImage(base, Math.round(x), TALL_WALL.BASE_Y, bw + 1, base.naturalHeight);
  }
}
function drawLedges(camX) {
  ctx.save(); ctx.translate(-Math.round(camX), 0);
  for (const l of region.ledges) { const x0 = l.c * T, x1 = (l.c + l.w) * T; if (x1 < camX - 50 || x0 > camX + W + 50 || l.y < camY - 100 || l.y > camY + H + 100) continue; drawLedgeRun(x0, x1, l.y - 4); }
  ctx.restore();
}
function drawRegion(camX) {
  if (!REGION_ON) return;
  const d = david, now = performance.now() / 1000;
  for (const r of REGION.rooms) {   // a painted room, over the tiles and ledges drawn for it
    const rx = r.c0 * T - camX, rw = r.w * T; if (rx > W || rx + rw < 0) continue;
    const fl = roomImg(r.floor);
    if (fl) {   // a long room's ground, repeating
      const fw = fl.naturalWidth, a = Math.max(rx, 0), b = Math.min(rx + rw, W);
      for (let x = rx + Math.floor((a - rx) / fw) * fw; x < b; x += fw) {
        const sx = Math.max(0, a - x), ex = Math.min(fw, b - x);
        if (ex > sx) ctx.drawImage(fl, sx, 0, ex - sx, fl.naturalHeight, Math.round(x + sx), H - fl.naturalHeight, ex - sx, fl.naturalHeight);   // (from a little above the ground line: covers the ground tiles' tufts)
      }
    }
    const bl = roomImg(r.block);
    if (bl) for (const b of region.blocks) if (b.room === r.id) {
      const x = b.x - camX; if (x > W || x + b.w < 0) continue;
      ctx.drawImage(bl, Math.round(x), b.y, b.w, b.h);
    }
    const im = roomArt(r); if (!im) continue;
    const x = rx + (r.artAt || 0) * T, w = Math.min(im.naturalWidth, rw - (r.artAt || 0) * T);
    if (x > W || x + w < 0) continue;
    if (!r.strip) { ctx.drawImage(im, 0, 0, w, H, Math.round(x), 0, w, H); continue; }
    // in a long room the painting's ends fade into the strip (Glen 11-04), in thin slices
    const F = 160, S = 8;
    ctx.drawImage(im, F, 0, w - 2 * F, H, Math.round(x + F), 0, w - 2 * F, H);
    ctx.save();
    for (let k = 0; k < F; k += S) {
      ctx.globalAlpha = (k + S / 2) / F;
      ctx.drawImage(im, k, 0, S, H, Math.round(x + k), 0, S, H);
      ctx.drawImage(im, w - k - S, 0, S, H, Math.round(x + w - k - S), 0, S, H);
    }
    ctx.restore();
  }
  for (const h of region.holes) {   // the dark down a hole
    const x = h.x0 - camX; if (x > W || x + (h.x1 - h.x0) < 0) continue;
    const g = ctx.createLinearGradient(0, GR * T, 0, H); g.addColorStop(0, "#1a120c"); g.addColorStop(0.35, "#050302"); g.addColorStop(1, "#000");
    ctx.fillStyle = g; ctx.fillRect(Math.round(x), GR * T - 2, h.x1 - h.x0, H - GR * T + 2);
  }
  if (REGION.drawBack) REGION.drawBack(camX);   // (a region's own backdrop pieces, behind the props: ramah.js)
  drawTowerEnds(camX); drawProps(camX); drawRegionLadders(camX); drawLedges(camX);
  drawFloorCrumbles(camX);
  drawBreaks(camX);
  drawBeasts(camX);
  drawHarpRoom(camX);
  drawStory(camX);
  if (REGION.draw) REGION.draw(camX);
  for (const o of region.doors) {
    const x = o.x - camX; if (x < -200 || x > W + 200) continue;
    if (!o.kit && !o.noArt && o.y == null && !(roomArt(roomAt(o.x)) && (o.kind === "door" || o.kind === "stairs"))) drawDoorArt(o, x);
    if (o.kind !== "hole" && !o.shut && Math.abs(d.x - o.x) < 140 && Math.abs(d.y - (o.y ?? GR * T)) < 60 && !region.trans) upHint(x, (o.y ?? GR * T) - 200);
  }
  // the cracked wall in the cellars, until it's broken
  if (region.crack) {   // (Glen 11-05: his cracked wall; split open once it's broken)
    const k = region.crack, n = hasSkill("heavySword") ? "c_crackopen" : "c_crackwall", im = kitImg(n), kk = KIT[n];
    const x = (k.c + k.w / 2) * T - kk.w / 2 - camX;
    if (im && x > -kk.w && x < W) ctx.drawImage(im, Math.round(x), FOOT - kk.h + 2, kk.w, kk.h);
  }
  if (region.crack && !hasSkill("heavySword") && !kitImg("c_crackwall")) {   // (until his art loads)
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
    if (regionHas("taken", f.id) || relicHidden(f)) continue;
    const x = f.x - camX; if (x < -80 || x > W + 80) continue;
    const img = f.kind === "key" ? kitImg("tw_key") : ITEM[RELIC_ART[f.kind]], h = RTUNE.RELIC_H[f.kind];
    const glow = ctx.createRadialGradient(x, f.y - h / 2, 2, x, f.y - h / 2, h * 1.2);
    glow.addColorStop(0, "rgba(255,240,170,0.55)"); glow.addColorStop(1, "rgba(255,230,150,0)");
    ctx.fillStyle = glow; ctx.fillRect(x - h * 1.3, f.y - h / 2 - h * 1.3, h * 2.6, h * 2.6);
    const by = f.y - 4 + Math.sin(now * 2.4 + f.t) * 4;
    if (f.kind === "key") { if (img) { const w = img.naturalWidth * h / img.naturalHeight; ctx.drawImage(img, Math.round(x - w / 2), Math.round(by - h), w, h); } }
    else if (img && img.naturalHeight) drawItem(RELIC_ART[f.kind], x, by, h / img.naturalHeight);
  }
}
// a hanging rope from Glen's picture (assets/items/rope_tile.png: three twists, cut to repeat seamlessly), top to bottom
function drawRope(x, y0, y1) {
  const img = ITEM.rope_tile;
  if (!img || !img.naturalWidth) { ctx.strokeStyle = "#a88a5a"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); return; }
  const w = RTUNE.ROPE_W, sc = w / img.naturalWidth, h = img.naturalHeight * sc;
  ctx.save(); ctx.beginPath(); ctx.rect(x - w, y0, w * 2, y1 - y0); ctx.clip();
  for (let y = y0; y < y1; y += h) ctx.drawImage(img, x - w / 2, y, w, h);
  ctx.restore();
}
// (Glen 11-05) the way out: his iron-banded stone door, shut; his open one once the key has opened it
function drawDoorArt(o, x) {   // stand-ins until Glen paints them
  const y = GR * T;
  if (o.kind === "exit") {
    const n = regionHas("taken", "g_exit_open") ? "tw_door_open" : "tw_door_shut", k = KIT[n], im = kitImg(n);
    if (im) ctx.drawImage(im, Math.round(x - k.w / 2), y + 4 - k.h, k.w, k.h);
    return;
  }
  ctx.save();
  if (o.kind === "door") {   // a stone doorway, dark inside
    ctx.fillStyle = "#5e5040"; ctx.beginPath(); ctx.roundRect(x - 46, y - 170, 92, 170, [46, 46, 0, 0]); ctx.fill();
    ctx.fillStyle = "#1a120c"; ctx.beginPath(); ctx.roundRect(x - 34, y - 156, 68, 156, [34, 34, 0, 0]); ctx.fill();
  } else if (o.kind === "stairs") {   // a dark stairway in the floor (down) or a lit one (up, from below)
    const up = roomAt(o.x).cave;
    ctx.fillStyle = up ? "rgba(255,226,160,0.35)" : "#1a120c"; ctx.beginPath(); ctx.roundRect(x - 40, y - 130, 80, 130, [10, 10, 0, 0]); ctx.fill();
    ctx.fillStyle = up ? "#8a7458" : "#4a3c2e";
    for (let k = 0; k < 5; k++) ctx.fillRect(x - 36 + k * 6, y - 22 - k * 22, 72 - k * 12, 8);
  } else if (o.kind === "well" && ITEM.town_well && ITEM.town_well.naturalWidth) {   // Glen's well (11-03): the lid slid half
    // off, the rope already tied on; drawn so its open side is over the well's spot (David goes down there)
    // (before he has the rope: Glen's same well with no rope on it, town_well_no_rope, cut to the same frame)
    const nr = ITEM.town_well_no_rope, img = !hasSkill("rope") && nr && nr.naturalWidth ? nr : ITEM.town_well;
    const k = wellK();
    ctx.drawImage(img, x - RTUNE.WELL_OPEN_X * k, y + RTUNE.WELL_SINK - RTUNE.WELL_BOTTOM * k, img.naturalWidth * k, img.naturalHeight * k);
  } else if (o.kind === "well") {   // a ring of stones (and with the rope: a beam over it and the rope tied on, hanging in)
    if (hasSkill("rope")) {
      ctx.fillStyle = "#6b4f33"; ctx.fillRect(x - 50, y - 190, 8, 140); ctx.fillRect(x + 42, y - 190, 8, 140); ctx.fillRect(x - 56, y - 196, 112, 10);
      drawRope(x, y - 190, y - 52);
    }
    ctx.fillStyle = "#1a120c"; ctx.beginPath(); ctx.ellipse(x, y - 52, 42, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#7a6a55"; ctx.fillRect(x - 46, y - 52, 92, 52);
    ctx.strokeStyle = "#4e4234"; ctx.lineWidth = 2;
    for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) ctx.strokeRect(x - 46 + k * 23 + (r % 2) * 11, y - 52 + r * 17, 23, 17);
  } else if (o.kind === "hole") {   // (the hole's own edges are drawn: rHole)
  } else if (o.kind === "rope" && (region.doors.find(q => q.id === o.to) || {}).kind !== "well") {   // (Glen 11-05) his iron ring in the rock, the rope hanging from it
    const k = KIT.p_ring, im = kitImg("p_ring");
    if (im) ctx.drawImage(im, Math.round(x - k.w / 2), 0, k.w, k.h);
    drawRope(x, k.h - 40, y - 24);
  } else if (o.kind === "rope") {   // a rope hanging down out of the well's mouth, and a little daylight
    const ty = ropeTop(o);
    if (o.top != null) {   // (Glen 11-07: a tall shaft: the well's mouth up top, sky in it, and a shaft of daylight down the rope)
      const bm = ctx.createLinearGradient(0, ty, 0, ty + 620);
      bm.addColorStop(0, "rgba(255,240,200,0.55)"); bm.addColorStop(1, "rgba(255,240,200,0)");
      ctx.fillStyle = bm; ctx.beginPath(); ctx.moveTo(x - 70, ty); ctx.lineTo(x + 70, ty); ctx.lineTo(x + 170, ty + 620); ctx.lineTo(x - 170, ty + 620); ctx.fill();
      ctx.fillStyle = "#3a2c22"; ctx.beginPath(); ctx.ellipse(x, ty - 6, 96, 30, 0, 0, Math.PI * 2); ctx.fill();   // the rock lip
      const sk = ctx.createRadialGradient(x, ty - 10, 6, x, ty - 10, 84);
      sk.addColorStop(0, "#fffbe8"); sk.addColorStop(0.6, "#cfe8f7"); sk.addColorStop(1, "#8fbad6");
      ctx.fillStyle = sk; ctx.beginPath(); ctx.ellipse(x, ty - 8, 82, 22, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#6b4a2e"; ctx.fillRect(x - 100, ty - 12, 200, 9);   // the beam the rope is tied to
    }
    const lg = ctx.createRadialGradient(x, ty, 4, x, ty, 160);
    lg.addColorStop(0, "rgba(255,236,190,0.7)"); lg.addColorStop(1, "rgba(255,220,150,0)");
    ctx.fillStyle = lg; ctx.fillRect(x - 160, ty - 2 * T, 320, 260);
    drawRope(x, ty, y - 24);
  }
  ctx.restore();
}
// ---- the creatures: spiders on threads and on the floor, bats, rats ----
const BEAST = { phil: { w: 28, h: 120 }, crow: { w: 34, h: 54 }, raven: { w: 42, h: 66 }, eagle: { w: 60, h: 80 }, spider: { w: 34, h: 60 }, spiderw: { w: 44, h: 50 }, bat2: { w: 34, h: 50 }, rat2: { w: 38, h: 40 } };
function beastBox(b) {
  const k = BEAST[b.kind];
  if (BIRD[b.kind] && b.state !== "perch") { const cy = b.y + 20; return { x0: b.x - k.w * 1.25, x1: b.x + k.w * 1.25, y0: cy - k.h * 0.7, y1: cy + k.h * 0.7 }; }   // (Glen 11-06) flying: drawn centred at y + 20, so the box is too (it sat above the bird)
  return { x0: b.x - k.w, x1: b.x + k.w, y0: b.y - k.h, y1: b.y };
}
// a Philistine (above): can he stand at x? (his own floor or ledge goes on there)
const philFloor = (b, x) => { const c = Math.floor(x / T), rr = Math.floor(b.hy / T); return Math.abs(x - b.hx) < b.range + 8 * T && (isSolid(c, rr) || isOneway(c, rr)); };
// where his feet go at x: his floor, or the top of whatever solid stands on it (null: no floor there, the end of his post)
function philSurf(b, x) {
  const c = Math.floor(x / T), rr = Math.floor(b.hy / T);
  if (!philFloor(b, x)) return null;
  let k = 0; while (k < 12 && isSolid(c, rr - 1 - k)) k++;
  return k ? (rr - k) * T : b.hy;   // (Glen 11-06: his own floor at its real height, a walkway's planks, not the tile row's top: he stood on the railing)
}
function philHit(b, s) {
  if (!(b.state === "wait" || b.state === "run" || b.state === "back" || b.state === "hold")) return false;
  if (!(Math.abs(s.x - b.x) < 30 && s.y > b.y - 125 && s.y < b.y + 4)) return false;
  if (b.cool > 0) return true;   // (one sword stroke, one hit)
  b.cool = s.sword ? 0.3 : 0.05; b.flash = 0.25;
  b.hp -= s.charged || s.power ? PHIL.HP : strDamage();
  if (typeof stoneHit === "function" && !s.sword) stoneHit(s);
  if (b.state === "wait") { b.state = "run"; b.t = 0; }   // (struck from afar: he comes for you)
  if (b.hp <= 0) {
    b.state = SPR.phil_drop ? "drop" : "flee"; b.t = 0; b.dropX = b.x; b.dropY = b.y; b.fleeDir = Math.sign(b.x - david.x) || 1; b.strTaken = true; strGain("phil");
    sfx("lion_hit", b.x, 0.4, 1.6); setTimeout(() => sfx("phil_nusu_1", b.x, 0.7), 500);   // "Nusu!" (Run!)
    if (!region.philFled) { region.philFled = true; toast("He throws down his shield and runs. (1 Samuel 18:30)"); }
  }
  return true;
}
function updatePhil(b, dt) {
  const d = david, P = PHIL; b.flash = Math.max(0, (b.flash || 0) - dt);
  // a step: on flat ground he walks; a wall up to HOP tiles he jumps (only when he's after David); taller, he's blocked
  const step = (v, hop = false) => {
    const nx = b.x + v * dt, s = philSurf(b, nx + Math.sign(v) * 14); if (s == null) return false;
    if (b.air) { if (s >= b.y - 2) { b.x = nx; return true; } return false; }   // in the air: on over it if he's high enough
    const rise = b.y - s;
    if (rise <= 4) { b.x = nx; return true; }
    if (hop && rise <= P.HOP * T + 4) { b.air = true; b.vy = -Math.sqrt(2 * P.GRAV * (rise + 30)); return false; }
    return false;
  };
  const canGo = dir => { const s = philSurf(b, b.x + dir * (T * 0.5 + 14)); return s != null && b.y - s <= P.HOP * T + 4; };   // not the tower, not the end of his post
  if (b.state === "wait") {   // pacing his post
    b.pdir = b.pdir || -1;
    if (Math.abs(b.x - b.hx) > P.PACE * T + T) { b.pdir = Math.sign(b.hx - b.x); step(b.pdir * P.PACE_SPEED * 1.6, true); }   // away from his post: back to it (over what's in the way)
    else { if (!step(b.pdir * P.PACE_SPEED)) b.pdir = -b.pdir;   // (a wall at his post: turn)
      if (Math.abs(b.x - b.hx) > P.PACE * T && Math.sign(b.x - b.hx) === b.pdir) b.pdir = -b.pdir; }
    b.facing = b.pdir;
    if (Math.abs(d.x - b.x) < P.NEAR * T && Math.abs(d.y - b.y) < 140 && d.deadT <= 0) {
      b.state = "run"; b.t = 0; sfxOne(["phil_hedad", "phil_hedad_2"], b.x, 0.75);   // "Hedad!", his battle cry
      if (!region.philTold) { region.philTold = true; toast("Philistines! Three stones (or one charged) and he'll drop his shield and run."); }
    }
  } else if (b.state === "run") {
    const dir = Math.sign(d.x - b.x) || -1; b.facing = dir;
    if (d.deadT <= 0 && Math.abs(d.x - b.x) > 24) step(dir * P.SPEED, true);   // (Glen 11-06: right under or over him: he stands, no shaking back and forth)
    if (Math.abs(d.y - b.y) > 200 && !b.air) { b.state = "wait"; b.t = 0; }   // David up or down on another walkway: back to pacing his own
    if (!b.air && !canGo(dir) && Math.abs(d.x - b.x) > 40) { b.state = "hold"; b.t = 0; b.ax = b.x; b.pdir = -dir; }   // the tower (or as far as he goes): he can't get to David
    if (Math.abs(d.x - b.x) < 30 && d.y > b.y - 100 && d.y < b.y + 40 && d.deadT <= 0) { hurtDavid(b.x); b.state = "back"; b.t = 0; }
    if (Math.abs(d.y - b.y) > 260 || Math.abs(d.x - b.x) > (P.NEAR + 6) * T) { b.state = "wait"; b.t = 0; }   // he's lost him: back to his post
  } else if (b.state === "hold") {   // stopped at the tower: pacing behind it, shield up, watching for a way round
    b.facing = Math.sign(d.x - b.x) || b.facing;
    if (!step(b.pdir * P.PACE_SPEED * 1.4) || (Math.abs(b.x - b.ax) > P.HOLD_PACE * T && Math.sign(b.x - b.ax) === b.pdir)) b.pdir = -b.pdir;
    if (b.t > 0.6 && !b.air && canGo(Math.sign(d.x - b.x) || -1) && Math.abs(b.x - b.ax) < T) { b.state = "run"; b.t = 0; }   // a way to David again: after him
    if (Math.abs(d.y - b.y) > 260 || Math.abs(d.x - b.x) > (P.NEAR + 6) * T) { b.state = "wait"; b.t = 0; }
  } else if (b.state === "back") {   // shield up, backing off; a breath, and he comes again
    if (Math.abs(d.x - b.x) > 20) b.facing = Math.sign(d.x - b.x) || -1;
    if (b.t < P.BACK) step(-b.facing * P.BACK_SPEED * (1 - b.t / P.BACK * 0.5));
    else if (b.t > P.BACK + P.REST) { b.state = "run"; b.t = 0; }
  } else if (b.state === "drop") {
    if (b.t * 1000 >= P.DROP_MS * SPR.phil_drop.frames) { b.state = "flee"; b.t = 0; }
  } else if (b.state === "flee") {   // away from David, fading as he goes
    if (!step(b.fleeDir * P.FLEE_SPEED, true) && !b.air) b.x += b.fleeDir * P.FLEE_SPEED * dt * 0.5;   // (fading anyway: a wall doesn't hold him long)
    b.alpha = Math.max(0, 1 - b.t / P.FADE);
    if (b.alpha <= 0) b.dead = true;
  }
  const ground = philSurf(b, b.x);
  if (ground != null && (b.air || b.y < ground - 1)) {   // in the air, or he's walked off the top of something
    b.air = true; b.vy = (b.vy || 0) + P.GRAV * dt; b.y += b.vy * dt;
    if (b.vy > 0 && b.y >= ground) { b.y = ground; b.vy = 0; b.air = false; }
  }
}
function drawPhil(b, x) {
  const now = performance.now() / 1000, fl = b.flash > 0 ? "brightness(2)" : "", near = Math.abs(david.x - b.x) < 5 * T;
  if ((b.state === "flee" || b.state === "drop") && b.dropX !== undefined) {   // his shield and spear, left lying where he dropped them
    const gx = b.dropX - (b.x - x), gy = b.dropY ?? b.hy; ctx.save(); ctx.globalAlpha = b.state === "flee" ? b.alpha : 1;
    ctx.strokeStyle = "#5a3e20"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx - 50, gy - 3); ctx.lineTo(gx + 40, gy - 4); ctx.stroke();
    ctx.fillStyle = "#9a7440"; ctx.strokeStyle = "#5a3e20"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(gx - 22, gy - 5, 26, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
  }
  if (b.state === "wait") drawSprite("phil_run", frameOf("phil_run", (now + b.hx) * 0.45), x, b.y, b.facing, 1, 1, fl);   // pacing: his run, slowed to a walk
  else if (b.state === "back" || b.state === "hold") drawSprite("phil_charge", frameOf("phil_charge", now * 0.6), x, b.y, b.facing, 1, 1, fl);
  else if (b.state === "run") { const nm = near ? "phil_charge" : "phil_run"; drawSprite(nm, frameOf(nm, now + b.hx), x, b.y, b.facing, 1, 1, fl); }
  else if (b.state === "drop") drawSprite("phil_drop", frameOf("phil_drop", b.t, PHIL.DROP_MS), x, b.y, -(b.facing || -1), 1, 1, fl);   // (the sheet starts facing left)
  else drawSprite("phil_flee", frameOf("phil_flee", now + b.hx), x, b.y, b.fleeDir, 1, b.alpha);
}
function updateBeasts(dt, r) {
  const d = david;
  for (const b of region.beasts) {
    if (b.room !== r.id) continue;
    b.t += dt; b.cool = Math.max(0, b.cool - dt);
    if (b.dead) continue;
    if (b.kind === "phil") { updatePhil(b, dt); continue; }
    const dx = d.x - b.x;
    if (b.kind === "spider") {   // waits up on its thread; drops on him when he's under it, waits, climbs back
      if (b.state === "hang") { b.y = b.hy + Math.sin(b.t * 2) * 4; if (!b.cool && Math.abs(dx) < 90 && d.y > b.y) { b.state = "drop"; b.t = 0; } }
      else if (b.state === "drop") { b.y = Math.min(GR * T - 30, b.y + 560 * dt); if (b.y >= GR * T - 30) { b.state = "wait"; b.t = 0; } }
      else if (b.state === "wait") { if (b.t > 0.9) { b.state = "climb"; b.t = 0; } }
      else if (b.state === "climb") { b.y -= 110 * dt; if (b.y <= b.hy) { b.y = b.hy; b.state = "hang"; b.cool = 1.6; } }
    } else if (b.kind === "spiderw" || b.kind === "rat2") {   // back and forth along the floor; the rat stops to sniff
      if (b.state === "sniff") { if (b.t > 1.1) { b.state = "walk"; b.t = 0; } }
      else {
        b.x += b.facing * (b.kind === "rat2" ? 150 : 90) * dt;
        if (b.x < b.hx - b.range) { b.x = b.hx - b.range; b.facing = 1; } else if (b.x > b.hx + b.range) { b.x = b.hx + b.range; b.facing = -1; }
        if (b.kind === "rat2" && b.t > 2.5 + (b.hx % 3)) { b.state = "sniff"; b.t = 0; }
      }
    } else if (BIRD[b.kind]) {
      const B = BIRD[b.kind], top = -(r.up || 0) * T + 60;
      if (b.state === "perch") { if (!b.cool && Math.abs(dx) < B.near && Math.abs(d.y - b.y) < 280) { b.state = "fly"; b.t = 0; b.facing = Math.sign(dx) || 1; } }
      else if (b.state === "fly") {
        b.x += b.facing * B.speed * dt;
        const dive = b.kind === "eagle" && Math.sin(b.t * 1.6) > 0.6;   // (an eagle folds and drops at him now and then)
        const want = (dive ? d.y - 30 : d.y - 90) + Math.sin(b.t * 4) * 22;
        b.y += (want - b.y) * Math.min(1, dt * (dive ? 3.5 : 1.6));
        b.y = Math.max(top, Math.min(GR * T - 30, b.y));
        if ((b.facing > 0 && b.x > d.x + 300) || (b.facing < 0 && b.x < d.x - 300)) b.facing *= -1;
        const ins = (r.inset || 0) * T; b.x = Math.max(r.c0 * T + ins + 40, Math.min((r.c0 + r.w) * T - ins - 40, b.x));
        if (b.t > B.chase) { b.state = "home"; b.t = 0; }
      } else if (b.state === "home") {   // back to its ledge
        const hx = b.hx - b.x, hy = b.hy - b.y, dd = Math.hypot(hx, hy);
        if (dd < 8) { b.x = b.hx; b.y = b.hy; b.state = "perch"; b.cool = 2.5; }
        else { b.x += hx / dd * B.speed * dt; b.y += hy / dd * B.speed * dt; b.facing = Math.sign(hx) || b.facing; }
      }
      if (b.state !== "perch") { const q = beastBox(b); if (touchesDavid(q)) hurtDavid(b.x); }
      continue;
    } else if (b.kind === "bat2") {   // asleep upside down until he comes near; then swoops at him, out past him, and back
      if (b.state === "hang") { if (Math.abs(dx) < 260 && d.y > b.y) { b.state = "fly"; b.t = 0; b.facing = Math.sign(dx) || 1; } }
      else {
        b.x += b.facing * 210 * dt;
        const want = d.y - 70 + Math.sin(b.t * 5) * 30;
        b.y += (want - b.y) * Math.min(1, dt * 1.8);
        b.y = Math.max(60, Math.min(GR * T - 40, b.y));
        if ((b.facing > 0 && b.x > d.x + 320) || (b.facing < 0 && b.x < d.x - 320)) b.facing *= -1;
        b.x = Math.max(r.c0 * T + 40, Math.min((r.c0 + r.w) * T - 40, b.x));
      }
    }
    if (b.state !== "hang" || b.kind === "spider") { const q = beastBox(b); if (touchesDavid(q)) hurtDavid(b.x); }
  }
}
function drawBeasts(camX) {
  for (const b of region.beasts) {
    const x = b.x - camX; if (x < -200 || x > W + 200 || roomAt(b.x) !== region.room) continue;
    if (b.kind === "phil") { if (!b.dead) drawPhil(b, x); continue; }
    if (b.dead) {   // a puff of dust, once
      const n = b.kind === "spider" || b.kind === "spiderw" ? "spider_dust" : b.kind + "_dust", sh = SPR[n];
      if (sh && b.t * 1000 < sh.frames * sh.ms) drawSprite(n, frameOf(n, b.t), x, b.y + (b.kind === "spider" ? 0 : 0), b.facing);
      continue;
    }
    if (b.kind === "spider") {
      ctx.save(); ctx.strokeStyle = "rgba(230,225,215,0.7)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(Math.round(x) + 0.5, 0); ctx.lineTo(Math.round(x) + 0.5, b.y - 70); ctx.stroke(); ctx.restore();
      const n = b.state === "drop" || b.state === "wait" ? "spider_drop" : "spider_hang";
      drawSprite(n, frameOf(n, b.t), x, b.y, 1);
    } else if (b.kind === "spiderw") drawSprite("spider_walk", frameOf("spider_walk", b.t), x, b.y, b.facing);
    else if (b.kind === "rat2") { const n = b.state === "sniff" ? "rat2_sniff" : "rat2_run"; drawSprite(n, frameOf(n, b.t), x, b.y, b.facing); }
    else if (BIRD[b.kind]) {
      const B = BIRD[b.kind], fl = B.fly;
      if (b.state === "perch") drawSprite(B.perch, frameOf(B.perch, b.t), x, b.y, b.facing, B.size);
      else drawSprite(fl, frameOf(fl, b.t), x, b.y + 20, fl.startsWith("raven") ? -b.facing : b.facing, B.size);   // (the raven sheets face left)
    }
    else if (b.kind === "bat2") {
      if (b.state === "hang") drawSprite("bat2_hang", frameOf("bat2_hang", b.t), x, b.y + 50, 1);
      else drawSprite("bat2_fly", frameOf("bat2_fly", b.t), x, b.y + 25, b.facing);
    }
  }
}
// ---- a floor that crumbles: he steps on, it shakes, it gives way (and comes back when he comes in again) ----
function updateFloorCrumbles(dt, r) {
  const d = david;
  for (const k of region.crumbles) {
    if (k.room !== r.id) continue;
    const on = d.onGround && Math.abs(d.y - GR * T) < 2 && d.x > k.c * T - 10 && d.x < (k.c + k.w) * T + 10;
    if (k.state === "whole" && on) { k.state = "shake"; k.t = 0; }
    else if (k.state === "shake") { k.t += dt; if (k.t > 0.55) {
      k.state = "gone"; k.t = 0;
      for (let x = k.c; x < k.c + k.w; x++) { oneway[GR][x] = false; onewayTop.delete(GR * COLS + x); }
      for (let i = 0; i < 10; i++) bits.push({ x: (k.c + Math.random() * k.w) * T, y: GR * T, vx: (Math.random() - 0.5) * 200, vy: -Math.random() * 200, life: 0.9, color: i % 2 ? "#7b6a55" : "#a08a6c" });
    } } else if (k.state === "gone") k.t += dt;
  }
}
function drawFloorCrumbles(camX) {
  for (const k of region.crumbles) {
    const x = (k.c + k.w / 2) * T - camX; if (x < -200 || x > W + 200) continue;
    if (k.state === "gone") { if (k.t < 0.6) { const kk = KIT.p_broken, im = kitImg("p_broken"); if (im) { ctx.save(); ctx.globalAlpha = 1 - k.t / 0.6; ctx.drawImage(im, Math.round(x - kk.w / 2), GR * T - 12 + k.t * 300, kk.w, kk.h); ctx.restore(); } } continue; }
    const kk = KIT.p_crumble, im = kitImg("p_crumble"); if (!im) continue;
    const j = k.state === "shake" ? (Math.random() - 0.5) * 5 : 0;
    ctx.drawImage(im, Math.round(x - kk.w / 2 + j), GR * T - 8, kk.w, kk.h);
  }
}
// ---- the Harp Room (1 Samuel 18:10-11) ----
// (Glen 11-06) Saul's dark music (Part One's saul_dark) while the king is troubled: low while David plays, gone once he's calm
const SAUL_MUSIC = { VOL: 0.55, UNDER_HARP: 0.1, FADE: 0.8, LEAVE_AT: 3, LEAVE_TIME: 1.5 };   // LEAVE_AT: s after the verse closes, he gets up and goes
let saulDarkSong = null, saulDarkVol = 0;
function updateSaulMusic(dt, r) {
  const M = SAUL_MUSIC, troubled = !regionHas("taken", "g_harp_done");
  const want = r && r.id === "harp" && troubled && !regionHushed() && david.deadT <= 0 ? (david.harp ? M.UNDER_HARP : M.VOL) : 0;
  if (!saulDarkSong && want > 0) saulDarkSong = Object.assign(new Audio(`../assets/audio/saul_dark.mp3?v=${window.BUILD || 0}`), { loop: true, volume: 0, _music: true });
  if (!saulDarkSong) return;
  saulDarkVol = fadeLoop(saulDarkSong, saulDarkVol, want, dt, M.FADE);
}
const regionStageQuiet = () => REGION_ON && (region.room || {}).id === "harp" && !regionHas("taken", "g_harp_done");   // main.js: no fields music under the king's
function updateHarpRoom(dt, r) {
  const hr = region.harp, d = david, H_ = RTUNE.HARP; if (!hr) return;
  updateSaulMusic(dt, r);
  if (regionHas("taken", "g_harp_done")) {   // (Glen 11-05) won: once David has left, the room is empty; the spears stay in the wall
    hr.phase = "calm"; if (r.id !== "harp") hr.empty = true; hr.hitCool = Math.max(0, (hr.hitCool || 0) - dt);
    if (r.id === "harp" && !hr.empty) {   // (Glen 11-06) the king, calm now, gets up and goes: the hidden wall can be struck right away
      hr.t += dt; if (!(dialog.t > 0) && !region.jscene) hr.goT = (hr.goT || 0) + dt;   // (after the verse, and the Journal if it opens)
      if (hr.goT > SAUL_MUSIC.LEAVE_AT + SAUL_MUSIC.LEAVE_TIME) hr.empty = true;
    }
    for (const p of hr.dust) { p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy -= 10 * dt; p.r += 14 * dt; }
    hr.dust = hr.dust.filter(p => p.t < p.life);
    if (!hr.stuck.length) hr.stuck.push(GR * T - H_.SPEAR_Y, GR * T - H_.SPEAR_Y - 34);
    return;
  }
  if (r.id !== "harp") { if (hr.phase !== "wait") Object.assign(hr, { phase: "wait", calm: 0, escapes: 0, spear: null, t: 0 }); return; }   // (left: it starts over)
  hr.t += dt;
  const atStool = Math.abs(d.x - hr.stoolX) < 50 && d.onGround;
  if (!d.harp && atStool && pressed("up") && hr.phase !== "calm") { d.harp = true; d.facing = 1; d.vx = 0; setState("kneel"); if (hr.phase === "wait") { hr.phase = "play"; toast("Play for the king. When he lifts the spear: get up and jump!"); } }
  if (d.harp && (pressed("left") || pressed("right") || pressed("a") || pressed("down"))) { d.harp = false; setState("standup"); }
  if (d.harp && (d.state === "harp" || d.state === "kneel") && hr.phase === "play") hr.calm = Math.min(1, hr.calm + dt / H_.CALM_TIME);
  if (hr.phase === "play" && !hr.spear && hr.escapes < 2 && hr.calm >= H_.THROW_AT[hr.escapes]) { hr.phase = "throw"; hr.t = 0; }
  if (hr.phase === "throw") {
    const f = Math.floor(hr.t * 1000 / SPR.saul_throw.ms);
    if (f >= H_.RELEASE && !hr.thrown) { hr.thrown = true; hr.spear = { x: hr.saulX - 70, y: GR * T - H_.SPEAR_Y, hit: false }; }
    if (f >= SPR.saul_throw.frames) { hr.phase = "play"; hr.thrown = false; }
  }
  const sp = hr.spear;
  if (sp) {
    sp.x -= H_.SPEAR_SPEED * dt;
    if (!sp.hit && sp.x < d.x + BODY_W / 2 && sp.x > d.x - BODY_W / 2 - 160 && sp.y > d.y - d.h && sp.y < d.y) {
      sp.hit = true; d.harp = false; hurtDavid(sp.x);
    }
    if (sp.x <= hr.wallX) {   // into the wall
      hr.stuck.push(sp.y); hr.spear = null;
      if (sp.hit) { hr.calm = Math.max(0, hr.calm - H_.BACK); toast("Get up and jump when the king lifts the spear!"); }
      else { hr.escapes++; toast(hr.escapes === 1 ? "David escaped! The king is still troubled. Keep playing." : "David escaped again!"); }
    }
  }
  if (hr.escapes >= 2 && hr.calm >= 1 && hr.phase === "play") {
    hr.phase = "calm"; hr.t = 0; regionAdd("taken", "g_harp_done"); if (d.harp) { d.harp = false; setState("standup"); }
    if (typeof chime === "function") { chime(4); setTimeout(() => chime(7), 160); }
    sayLine("1 Samuel 18:11-12", "Saul threw the spear, for he said, \"I will pin David to the wall!\" David escaped from his presence twice. Saul was afraid of David, because the LORD was with him.");
  }
}
const SAUL_BIG = 1.3;
const HARP_WALL = { X: 132, Y: -26, W: 216, H: 632, HITS: 4, HIT_Y: 440, BOOK_X: 225, BOOK_Y: 557, HOLE_Y: 530, DUST: 7, SEE: 0.9 };
// (Glen 11-05) the hidden wall: the plaster under the first drape, between the carved pillars. X, Y, W, H: where his
// pictures of it go over the strip's first repeat (px from the room's left and the top; his 2048-wide source x 0.625,
// 26 px up); HITS: one picture each (strike 1, 2, 4, 5 in his files); HIT_Y: strikes count below this (px from the
// top); BOOK_X/Y: the Truth in the hole (its bottom); HOLE_Y: the hole's middle (the dust); DUST: puffs a hit; SEE: s
// before the Truth can be picked up
function drawHarpWall(camX) {   // the hidden wall (no clue, like Castlevania's): just the strip until it's struck; then his patches
  const hr = region.harp; if (!hr) return;   // (his plain wall even before: the same plaster as his strike pictures)
  const n = !hr.empty ? 0 : regionHas("taken", "g_harp_wall") ? HARP_WALL.HITS : Math.min(HARP_WALL.HITS - 1, hr.wallHits), im = kitImg("hr_wall" + n);
  if (im) ctx.drawImage(im, Math.round(hr.crackX - camX), HARP_WALL.Y, HARP_WALL.W, HARP_WALL.H);
}
function drawHarpRoom(camX) {
  const hr = region.harp; if (!hr || roomAt(david.x).id !== "harp") return;
  const x = hr.saulX - camX;
  if (hr.empty) {   // the dust off the hidden wall (the wall itself: drawHarpWall)
    for (const p of hr.dust) {
      const a = 0.75 * (1 - p.t / p.life), x = p.x - camX;
      const g = ctx.createRadialGradient(x, p.y, 1, x, p.y, p.r); g.addColorStop(0, `rgba(222,204,172,${a})`); g.addColorStop(1, "rgba(222,204,172,0)");
      ctx.fillStyle = g; ctx.fillRect(x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
  }
  for (const y of hr.stuck) { const k = KIT.hr_spearwall, im = kitImg("hr_spearwall"); if (im) ctx.drawImage(im, Math.round(hr.wallX - 30 - camX), Math.round(y - k.h / 2), k.w * 0.8, k.h * 0.8); }
  if (hr.empty) {}   // (gone)
  else if (hr.phase === "calm") drawSprite("saul_sit", Math.min(SPR.saul_sit.frames - 1, Math.floor(hr.t * 1000 / SPR.saul_sit.ms)), x, GR * T, -1, SAUL_BIG,
                                          Math.max(0, Math.min(1, 1 - ((hr.goT || 0) - SAUL_MUSIC.LEAVE_AT) / SAUL_MUSIC.LEAVE_TIME)));   // (fading: he goes)   // (Glen's purple Saul throughout: he sinks down, quiet)
  else if (hr.phase === "throw") drawSprite("saul_throw", Math.min(SPR.saul_throw.frames - 1, Math.floor(hr.t * 1000 / SPR.saul_throw.ms)), x, GR * T, -1, SAUL_BIG);
  else { const n = SPR.saul_look_back.frames, k = Math.floor(hr.t * 1000 / 140) % (2 * n - 2); drawSprite("saul_look_back", k < n ? k : 2 * n - 2 - k, x, GR * T, -1, SAUL_BIG); }   // troubled, the spear in his hand
  if (hr.phase === "throw" && !hr.thrown) {   // the warning: the spear is up
    ctx.save(); ctx.globalAlpha = 0.6 + Math.sin(hr.t * 18) * 0.4; ctx.fillStyle = "#ffdf6b"; ctx.font = "bold 46px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("!", x, GR * T - 200); ctx.restore();
  }
  const sp = hr.spear;
  if (sp) {   // the spear in flight, point first
    const sx = sp.x - camX;
    ctx.save(); ctx.strokeStyle = "#6b4626"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(sx + 8, sp.y); ctx.lineTo(sx + 170, sp.y); ctx.stroke();
    ctx.fillStyle = "#b9c0c8"; ctx.beginPath(); ctx.moveTo(sx - 18, sp.y); ctx.lineTo(sx + 10, sp.y - 7); ctx.lineTo(sx + 10, sp.y + 7); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  if (Math.abs(david.x - hr.stoolX) < 140 && !david.harp && hr.phase !== "calm" && david.onGround) upHint(hr.stoolX - camX, GR * T - 170);
  if (hr.phase === "play" || hr.phase === "throw") {   // the king's heart: from troubled to calm
    const bx = W / 2 - 160, by = 190;
    ctx.save(); ctx.fillStyle = "rgba(20,14,10,0.6)"; ctx.fillRect(bx - 6, by - 26, 332, 46);
    ctx.fillStyle = "#e8dcc4"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center"; ctx.fillText("The king's spirit", W / 2, by - 8);
    ctx.fillStyle = "#3a2a3a"; ctx.fillRect(bx, by, 320, 12); ctx.fillStyle = "#7fc4e8"; ctx.fillRect(bx, by, 320 * hr.calm, 12); ctx.restore();
  }
}
// ---- the story (Glen 11-05): the women's song in the town (1 Samuel 18:7-9), Jonathan's covenant in the halls
//      (18:1, 3-4), Michal in the halls once the harp room is done (18:28-29). Each plays once (saved in "taken").
//      A scene is a list of steps run one after another ({ fn, say: [who, words], wait: s }); David waits while it plays.
//      Scripture: WEB, checked on ebible.org 2026-11-05, "the LORD" for "Yahweh". ----
const STORY = {
  JON_AT: 24,          // Jonathan's column in the halls (he gives his robe and sword when David reaches him)
  GIFTS_MS: 260,       // jonathan_gifts' frame time here (his sheet says 418: slower than a scene wants)
  GIVE_MS: 330,        // the two-shot (jonathan_gives_david), Jonathan handing David the robe
  GIVE_DAVID: 160,     // sheet px from Jonathan's feet to David's in the two-shot (x SCALE on screen; flipped: David on the left)
  SAUL_AT: 24,         // the king's column in the town, and where David stops (cols before him)
  SONG_STOP: 6,
  WOMEN: [["villager_woman", 10], ["villager_girl", 13], ["villager_braidgirl", 15]],   // who, and the column she runs to
  WOMAN_SPEED: 330,    // px a second as they run in (from off the left edge of the screen)
  BOB: 7,              // px the women bob as they sing (dancing)
  MICHAL_AT: 50,       // Michal's column in the halls, after the harp room
  TALK_REACH: 110,     // px: close enough to Jonathan or Michal to press Up and hear them
  WALK_OFF: 140,       // px a second, Saul walking off
};
region.script = []; region.wait = 0; region.pose = null; region.story = null;
function rPlay(steps) { region.script.push(...steps); }
function updateRegionScript(dt) {
  if (dialog.t > 0 && dialog.hold) return;
  if (region.wait > 0) { region.wait -= dt; return; }
  const s = region.script.shift(); if (!s) return;
  if (s.fn) s.fn();
  if (s.say) sayLine(s.say[0], s.say[1]);
  if (s.wait) region.wait = s.wait;
}
function regionHoldDavid(d, dt) {   // main.js updateDavid: while a scene plays he stands where he is
  if (!REGION_ON || (!region.script.length && region.wait <= 0)) return false;
  d.vx = 0; d.swordT = -1; d.shield = false; d.charging = false; d.throwT = -1; d.harp = false;
  d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt);
  if (d.state !== "idle" && !region.pose) setState("idle");
  return true;
}
function regionDrawDavid(d, x, y) {   // main.js drawDavid: hidden while he's in a two-shot
  if (REGION_ON && typeof regionBowPose === "function" && regionBowPose(d, x, y)) return true;   // (his bow: ramah.js)
  if (REGION_ON && REGION.drawDavid && REGION.drawDavid(d, x, y)) return true;
  return REGION_ON && !!region.pose && !!region.pose.hide;
}
const regionSword = () => !REGION_ON || ALL_SKILLS || (REGION.sword ? REGION.sword() : everHas("g_jonathan"));   // Jonathan's sword (18:4): X in Gibeah only once he's given it
function storyBuild(R) {   // buildRegion: where everyone stands
  const done = id => regionHas("taken", id);
  const t = R("town"), h = R("halls");
  region.story = {
    saul: { x: (t + STORY.SAUL_AT) * T, mode: done("g_song") ? "gone" : "stand", t: 0 },
    women: STORY.WOMEN.map(([n, c]) => ({ n, x: done("g_song") ? (t + c) * T : -1, to: (t + c) * T, mode: done("g_song") ? "stand" : "off", t: Math.random() * 3 })),
    songAt: (t + STORY.SAUL_AT - STORY.SONG_STOP) * T,
    jon: { x: (h + STORY.JON_AT) * T, mode: done("g_jonathan") ? "after" : "idle", t: 0 },
    michal: { x: (h + STORY.MICHAL_AT) * T, mode: done("g_michal") ? "idle" : "away", t: 0 },
  };
}
function storyAward() {   // Jonathan's robe (one heart more, for good) and his sword
  const d = david; d.maxHearts += RTUNE.HP_PER_HEART; d.hearts = d.maxHearts;
  if (typeof chime === "function") { chime(4); setTimeout(() => chime(7), 150); }
  toast("Jonathan's robe: one more heart, for good. His sword: press {sword} to swing it.");
  // (Glen 11-06) with a Player 2, Jonathan comes along from here: he leaves his spot in the halls and walks beside David
}
function jonJoins() {
  if (typeof p2 === "undefined" || !p2.on || p2.who === "jonathan") return;
  p2.who = "jonathan"; p2Place(region.story.jon.x, GR * T); p2.facing = -1;
  toast("Jonathan comes with David! Player 2 is Jonathan now: B shoots his bow, X his sword. (Select: the armor-bearer)");
}
const jonWithDavid = () => typeof p2 !== "undefined" && p2.on && p2.who === "jonathan";   // (then he isn't standing in the halls too)
function updateStory(dt, r) {
  const S = region.story, d = david; if (!S) return;
  for (const w of S.women) {
    w.t += dt;
    if (w.mode === "run") { w.x = Math.min(w.to, w.x + STORY.WOMAN_SPEED * dt); if (w.x >= w.to) { w.mode = "stand"; w.t = 0; } }
  }
  S.saul.t += dt; S.jon.t += dt; S.michal.t += dt;
  if (S.saul.mode === "walk") { S.saul.x += STORY.WALK_OFF * dt; if (S.saul.x > (roomById("town").c0 + roomById("town").w + 2) * T) S.saul.mode = "gone"; }
  if (region.script.length || region.wait > 0 || region.trans || d.deadT > 0 || region.climb) return;
  // the women's song: David comes up the street toward the king
  if (r.id === "town" && S.saul.mode === "stand" && d.x > S.songAt && d.x < S.saul.x && d.onGround) {
    regionAdd("taken", "g_song");
    rPlay([
      { fn() { d.facing = 1; const left = camX - 60; S.women.forEach((w, i) => { w.mode = "run"; w.x = left - i * 150; }); }, wait: 2.6 },
      { fn() { S.women.forEach(w => { w.mode = "sing"; w.t = 0; }); },
        say: ["1 Samuel 18:7", "The women sang to one another as they played, and said, “Saul has slain his thousands, and David his ten thousands.”"] },
      { fn() { S.saul.mode = "look"; S.saul.t = 0; }, wait: 1.2 },
      { say: ["1 Samuel 18:8-9", "Saul was very angry, and this saying displeased him. He said, “They have credited David with ten thousands, and they have only credited me with thousands. What can he have more but the kingdom?” Saul watched David from that day and forward."] },
      { fn() { S.saul.mode = "walk"; S.women.forEach(w => { w.mode = "stand"; }); }, wait: 0.4 },
    ]);
    return;
  }
  // Jonathan's covenant: David reaches him in the halls
  const J = S.jon;
  if (r.id === "halls" && J.mode === "idle" && d.x > J.x - STORY.GIVE_DAVID * SCALE - 40 && d.onGround) {
    regionAdd("taken", "g_jonathan");
    rPlay([
      { fn() { d.facing = 1; d.x = J.x - STORY.GIVE_DAVID * SCALE; J.mode = "talk"; },
        say: ["1 Samuel 18:1", "The soul of Jonathan was knit with the soul of David, and Jonathan loved him as his own soul."] },
      { fn() { J.mode = "gifts"; J.t = 0; }, wait: SPR.jonathan_gifts.frames * STORY.GIFTS_MS / 1000 },
      { fn() { J.mode = "give"; J.t = 0; region.pose = { hide: true }; }, wait: SPR.jonathan_gives_david.frames * STORY.GIVE_MS / 1000 },
      { say: ["1 Samuel 18:3-4", "Then Jonathan and David made a covenant, because he loved him as his own soul. Jonathan stripped himself of the robe that was on him and gave it to David with his clothing, even including his sword, his bow, and his sash."] },
      { fn() { region.pose = null; J.mode = "after"; storyAward(); }, wait: 2.4 },
      { fn() { jonJoins(); } },
    ]);
    return;
  }
  // Michal: waiting in the halls when David comes out of the harp room
  const M = S.michal;
  if (r.id === "halls" && M.mode === "away" && regionHas("taken", "g_harp_done")) { M.mode = "wait"; }
  if (r.id === "halls" && M.mode === "wait" && Math.abs(d.x - M.x) < 4 * T && d.onGround) {
    regionAdd("taken", "g_michal");
    rPlay([
      { fn() { d.facing = d.x > M.x ? -1 : 1; M.mode = "talk"; M.t = 0; },
        say: ["1 Samuel 18:28", "Saul saw and knew that the LORD was with David; and Michal, Saul's daughter, loved him."] },
      { fn() { M.mode = "idle"; }, say: ["1 Samuel 18:29", "Saul was even more afraid of David; and Saul was David's enemy continually."] },
      { say: ["Michal", STORY_TALK.michal()] },
    ]);
    return;
  }
  // (Glen 11-05) after the harp room Jonathan speaks up once as David passes; any time after, Up by either one: hear them
  if (r.id === "halls" && J.mode === "after" && regionHas("taken", "g_harp_done") && !regionHas("taken", "g_jon_warn") &&
      Math.abs(d.x - J.x) < 4 * T && d.onGround) {
    regionAdd("taken", "g_jon_warn"); d.facing = d.x > J.x ? -1 : 1;
    rPlay([{ fn() { J.mode = "talk"; J.t = 0; }, say: ["Jonathan", STORY_TALK.jon()] }, { fn() { J.mode = "after"; } }]);
    return;
  }
  if (r.id === "town" && pressed("up") && d.onGround && !(dialog.t > 0)) {   // (Glen 11-05) the townswomen talk too
    const w = storyNear();
    if (w) { d.facing = d.x > w.x ? -1 : 1; const L = STORY_TALK.women[w.n]; rPlay([{ say: [w.n === "villager_woman" ? "A woman of Gibeah" : "A girl of Gibeah", L[(w.said = ((w.said ?? -1) + 1)) % L.length]] }]); }
  }
  if (r.id === "halls" && pressed("up") && d.onGround && !(dialog.t > 0)) {
    const who = storyNear();
    if (who) { d.facing = d.x > who.x ? -1 : 1; who.mode = "talk"; who.t = 0; const m = who === J ? "after" : "idle";
      rPlay([{ say: [who === J ? "Jonathan" : "Michal", (who === J ? STORY_TALK.jon : STORY_TALK.michal)()] }, { fn() { who.mode = m; } }]); }
  }
}
// what Jonathan and Michal say after their scenes (Glen 11-05: not just standing there). Their own words, not quoted
// Scripture: Jonathan's warning and help look ahead to 19:2 and 20:4; Michal's to 18:28 and 19:11.
const STORY_TALK = {
  jon: () => regionHas("taken", "g_harp_done")
    ? "My father threw his spear at you? Stay out of his sight, David. Whatever you need, tell me and I'll do it. The LORD be with you."
    : "The harp room is at the end of the hall. My father's spirit is troubled again. Play for him, but watch his hands.",
  women: {   // each says the next one every time (Up by her); everyday Gibeah, and a hint or two
    villager_woman: ["The giant fell, and the whole army went home singing! I'll be telling my grandchildren.",
      "The king hasn't smiled since we sang that song. Some say it was the ten thousands that did it.",
      "Need a rest? The olive press by the roofs: stop there, and you'll start there again."],
    villager_girl: ["Is it true you used to fight lions and bears with your bare hands? With the LORD's help? Wow.",
      "The old well has been dry and dark for years. Nobody's been down there since the rope rotted away."],
    villager_braidgirl: ["Up on the high roofs you can see the whole town! Mother says not to jump on the awnings. I do anyway.",
      "Can you teach me to use a sling? My brother says girls can't. The LORD made girls' arms too, you know."],
  },
  michal: () => "The LORD is with you, David. Everyone can see it, and that's what frightens my father. Be careful, and keep away from him.",
};
function storyNear() {   // Jonathan or Michal, if David's close enough to talk (after their scenes)
  const S = region.story, d = david; if (!S) return null;
  const room = roomAt(d.x).id;
  if (room === "town") { let best = null; for (const w of S.women) if (w.mode === "stand" && Math.abs(d.x - w.x) < STORY.TALK_REACH && (!best || Math.abs(d.x - w.x) < Math.abs(d.x - best.x))) best = w; return best; }   // (the nearest one)
  if (room !== "halls") return null;
  if (S.jon.mode === "after" && !jonWithDavid() && Math.abs(d.x - S.jon.x) < STORY.TALK_REACH) return S.jon;
  if (S.michal.mode === "idle" && Math.abs(d.x - S.michal.x) < STORY.TALK_REACH) return S.michal;
  return null;
}
const loopFrame = (n, t, ms) => Math.floor(t * 1000 / ms) % n;
const onceFrame = (n, t, ms) => Math.min(n - 1, Math.floor(t * 1000 / ms));
function drawStory(camX) {
  const S = region.story; if (!S) return;
  const gy = GR * T, on = x => x - camX > -300 && x - camX < W + 300;
  const s = S.saul;
  if (s.mode !== "gone" && on(s.x)) {   // Glen's purple Saul, a head taller (SAUL_BIG), facing David (left)
    if (s.mode === "walk") drawSprite("saul_walk", frameOf("saul_walk", s.t), s.x - camX, gy, 1, SAUL_BIG);   // (off to the right, the way his walk sheet faces)
    else if (s.mode === "look") { const n = SPR.saul_look_back.frames; drawSprite("saul_look_back", onceFrame(n, s.t, 160), s.x - camX, gy, -1, SAUL_BIG); }
    else drawSprite("saul_look_back", 0, s.x - camX, gy, -1, SAUL_BIG);
  }
  for (const w of S.women) {
    if (w.mode === "off" || !on(w.x)) continue;
    if (w.mode === "run") drawSprite(w.n + "_run", frameOf(w.n + "_run", w.t), w.x - camX, gy, 1);
    else drawSprite(w.n + "_stand", 0, w.x - camX, gy - (w.mode === "sing" ? Math.abs(Math.sin(w.t * 5)) * STORY.BOB : 0), 1);
  }
  const J = S.jon;
  if (on(J.x) && !(jonWithDavid() && (J.mode === "after" || J.mode === "talk") && regionHas("taken", "g_jonathan"))) {   // (his sheets face right; David comes from the left, so they're flipped)
    if (J.mode === "gifts") drawSprite("jonathan_gifts", onceFrame(SPR.jonathan_gifts.frames, J.t, STORY.GIFTS_MS), J.x - camX, gy, -1);
    else if (J.mode === "give") drawSprite("jonathan_gives_david", onceFrame(SPR.jonathan_gives_david.frames, J.t, STORY.GIVE_MS), J.x - camX, gy, -1);
    else if (J.mode === "talk") drawSprite("jonathan_talk", frameOf("jonathan_talk", J.t), J.x - camX, gy, -1);
    else drawSprite("jonathan_idle", frameOf("jonathan_idle", J.t), J.x - camX, gy, -1);
  }
  const M = S.michal;
  if (M.mode !== "away" && on(M.x)) {   // (her sheets face right: toward the harp room, where David comes from)
    const n = M.mode === "talk" ? "michal_talk" : "michal_idle";
    drawSprite(n, frameOf(n, M.t), M.x - camX, gy, david.x < M.x - 20 ? -1 : 1);   // (Glen 11-05: she turns to David)
  }
}
function drawRegionFront(camX) {   // main.js, after David: the railings he walks behind
  if (!REGION_ON) return;
  for (const p of region.props) {
    if (!p.front) continue;
    const k = KIT[p.n], im = kitImg(p.n), w = p.w || k.w, par = p.par || 1;
    const x = Math.round(W / 2 + (p.x + w / 2 - camX - W / 2) * par - w / 2);   // (par > 1: close to the camera, sliding by faster)
    if (!im || x > W || x + w < 0) continue;
    ctx.drawImage(im, x, Math.round(p.y), w, k.h);
  }
  if (REGION.drawFront) REGION.drawFront(camX);
  const near = region.story && !region.script.length && !(dialog.t > 0) && david.onGround && storyNear();
  if (near) upHint(near.x - camX, GR * T - 175);   // Up: hear them (over the railings: Glen 11-05)
}
function drawRegionOver() {
  if (!REGION_ON) return;
  if (REGION.drawOver) REGION.drawOver(camX);   // (the night, the lamps: ramah.js)
  if (region.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${region.fade})`; ctx.fillRect(0, 0, W, H); }
}

// ---- the map screen (Select): the rooms you've been in, where you are, the seals you've seen, the finds you've
//      seen but not picked up, and the olive presses ----
function regionMapFrame(dt) {   // true while the map (or the card, or the Journal) has the screen
  if (!REGION_ON) return false;
  if (region.jscene) { jsceneFrame(dt); return true; }
  if (!region.mapOpen) {
    if (pressed("select") && !region.trans && david.deadT <= 0) bookOpen(0);
    else return false;
  } else if (region.mapT > 0.15) {
    const back = pressed("select") || pressed("b") || pressed("start") || (region.page === 0 && pressed("a"));
    if (!region.bookLeave && (pressed("left") || pressed("right"))) { region.page = 1 - region.page; region.mapT = 0.15; if (typeof sfxPageTurn === "function") sfxPageTurn(); }
    else if (region.page === 1 && pressed("a") && SONG_ON) songToggle();
    else if (back) { bookClose(); return true; }
  }
  region.mapT += dt;
  if (region.page === 1) drawCardSpread(); else drawRegionMap();
  return true;
}

// ---- strength (Glen 11-05, DESIGN.md "Growth"): fighting fills a bar; each level hits a little harder and adds a
//      little health. Capped per world (REGION.strCap): farming makes you comfortable, but can't carry you past the story ----
const STR = {
  NEED: [0, 8, 20, 36, 56, 80, 110, 145, 185],   // strength to reach each level (level 1 at 0)
  HP: 5,          // health each level adds
  DMG: 0.25,      // each level: a stone (or a sword stroke) takes this much more off a Philistine (one is 1)
  // what driving each one off is worth (not the harmless ones: the whip snake, the hedgehog)
  XP: { scorpion: 1, viper: 2, rat: 1, rat2: 1, spider: 1, spiderw: 1, bat2: 1, crow: 1, raven: 1, eagle: 3, jackal: 2, phil: 4, wolf: 3 },
};
const strXP = () => region.save.str || 0;
const strLevel = (xp = strXP()) => { let l = 1; while (l < STR.NEED.length && xp >= STR.NEED[l]) l++; return Math.min(l, REGION.strCap); };
const strDamage = () => 1 + (strLevel() - 1) * STR.DMG;
function strGain(kind) {
  const n = STR.XP[kind], cap = STR.NEED[REGION.strCap - 1]; if (!n || strXP() >= cap) return;
  const was = strLevel(); region.save.str = Math.min(cap, strXP() + n); regionWrite(); region.strFlash = 1;
  const now = strLevel(); if (now <= was) return;
  david.maxHearts += STR.HP * (now - was); david.hearts = david.maxHearts;
  if (typeof chime === "function") { chime(5); setTimeout(() => chime(8), 140); }
  toast(now >= REGION.strCap ? `Strength ${now}! That's as strong as David gets in ${REGION.name}. More comes in later worlds.`
                             : `Strength ${now}! Your stones and sword hit a little harder, and your health is up.`);
}
function strWatch() {   // updateRegion: whatever was driven off this frame (critters and snakes are main.js's and world*.js's)
  if (typeof critters !== "undefined") for (const k of critters) if (k.gone && !k.strTaken) { k.strTaken = true; strGain(k.kind); }
  if (typeof snakes !== "undefined") for (const q of snakes) if (q.gone && !q.strTaken) { q.strTaken = true; strGain(q.kind); }
  for (const b of region.beasts) if (b.dead && !b.strTaken) { b.strTaken = true; strGain(b.kind); }
}

// ---- David's card and the Journal (Glen 11-05, DESIGN.md "Growth"): a spread in the book, Right from the map. The card
//      grows from Truths, story moments and choices, never from fighting. from: [save id, what it was] in this world ----
const CARD = [
  { name: "Trust", verse: "for my soul takes refuge in you.", ref: "Psalm 57:1",
    from: [["g_jonathan", "Jonathan's covenant"], ["g_truth_spears", "A Truth behind the cracked wall"]] },
  { name: "Wisdom", verse: "David behaved himself wisely in all his ways; and the LORD was with him.", ref: "1 Samuel 18:14",
    from: [["g_truth_song", "A Truth up on the rooftops"], ["g_truth_covenant", "A Truth down in the cisterns"], ["g_harp_wall", "Striking where the spears had cracked the wall"]] },
  { name: "Self-control", verse: "The LORD forbid that I should do this thing to my lord, the LORD's anointed.", ref: "1 Samuel 24:6",
    from: [["g_harp_done", "In the harp room, he never threw the spear back"]] },
  { name: "A steadfast heart", verse: "My heart is steadfast, God. My heart is steadfast.", ref: "Psalm 57:7",
    from: [["g_tower_key", "The long climb to the top of the watchtower"], ["g_exit_open", "Gibeah, all the way through"]] },
];
// the Journal page: Glen's song (SONG_PSALM57.md, Verse 1 for Gibeah, his words exactly). David writes two lines after
// each of the story's moments (STORY_STEPS); all of it once he's through the gate
const JOURNAL_VERSE = REGION.verse || ["Be merciful to me, O God", "Be merciful to me", "My soul takes refuge in You", "My shelter, Lord, are Your wings",
  "Until the storm has passed away", "Until the danger disappears", "Beneath the shadow of Your wings", "I will find refuge here"];
const STORY_STEPS = REGION.steps || ["g_song", "g_jonathan", "g_harp_done", "g_michal"];
// (Glen 11-06, draft words) the gate out, before the story's done: what's still waiting (the first one missed)
const GATE_NOT_YET = {
  g_song: "Not yet. The army is coming home, and the whole town is going out to meet it.",
  g_jonathan: "Not yet. Jonathan is waiting for me in the palace halls.",
  g_harp_done: "Not yet. The king's spirit is troubled again. He has sent for me to play the harp.",
  g_michal: "Not yet. Michal asked to see me in the palace halls.",
};
let CARD_SONG = null;
// (Glen 11-06) like his first game: David's song isn't played until the very end of the game. The Journal pages (the gate's
// last one too) have only the journal harp while he writes. SONG_ON: true brings back "A: play the song" on the card
const SONG_ON = false;
const CARD_FACE = Object.assign(new Image(), { src: "../assets/items/david_portrait.png?v=" + (window.BUILD || 0) });   // (Glen 11-05: his portrait, cut from green)   // Glen's whole song, played from the Journal page (A)
function bookOpen(page, leave = false) {
  region.mapOpen = true; region.mapT = 0; region.page = page; region.bookLeave = leave;
  if (leave && SONG_ON && !(CARD_SONG && !CARD_SONG.paused)) songToggle(true);
}
function bookClose() {
  region.mapOpen = false;
  if (CARD_SONG && !CARD_SONG.paused) CARD_SONG.pause();   // (the stage's music picks up again by itself: updateMusic)
  if (typeof journalMusic !== "undefined" && !journalMusic.paused) journalMusic.pause();   // (the gate's page: the harp carried on into the card)
  if (region.bookLeave) { region.bookLeave = false; region.trans = { t: 0, leave: true }; }
}
function songToggle(on = !(CARD_SONG && !CARD_SONG.paused)) {
  if (!CARD_SONG) { CARD_SONG = new Audio(`../assets/audio/my_heart_is_steadfast_full.mp3?v=${window.BUILD || 0}`); CARD_SONG._music = true; }
  if (!on) { CARD_SONG.pause(); return; }
  hushStage();
  if (CARD_SONG.ended) CARD_SONG.currentTime = 0;
  CARD_SONG.volume = 0.9; CARD_SONG.play().catch(() => {});
}
// ---- the Journal scene (Glen 11-06): over David's shoulder, the book open in his hands (assets/journal/david_journal_ots.png,
//      cut from his green-screen picture). After each story moment he writes: on the left page what he learned and what
//      he's found, on the right two more lines of Glen's song. At the gate, all of it, with the song playing ----
const JSCENE = {
  K: 1632,                      // the picture's width as drawn (it's saved at this size), and where it sits on screen
  AT: [-357, -255],
  // the pages' writing areas on the picture (px): top-left, top-right (along a line of writing), bottom-right, bottom-left
  LEFT:  [[797, 351], [1030, 436], [893, 852], [627, 746]],
  RIGHT: [[1107, 446], [1352, 446], [1236, 829], [937, 848]],
  PAGE: { left: [300, 520], right: [345, 610] },   // each page laid out flat at this size, then bent onto the picture
  CHAR: 0.035, GAP: 0.35, FADE: 0.45, RES: 2,
  INK: "rgba(40,24,12,0.92)", INK_REF: "rgba(92,62,36,0.85)",
  TITLE_INK: "rgba(120,62,8,0.95)", TITLE_WAIT: 1.2, GLOW: 0.32,   // (the gate: the song's title in deep gold, after a breath, and a warm light on the page)
  // (draft words, for Glen to change) what David writes after each story moment (STORY_STEPS, in order), and at the gate
  ENTRIES: REGION.entries || [
    ["The women sang about me, and the king grew angry. The glory belongs to the LORD, not to me.", "1 Samuel 18:7–9"],
    ["Jonathan gave me his robe, his sword, his bow and his sash. He loves me as his own soul.", "1 Samuel 18:1–4"],
    ["I played for the king, and he threw his spear at me twice. I did not throw it back. The LORD kept me safe.", "1 Samuel 18:10–11"],
    ["Michal loves me. Saul is afraid of me, because he sees that the LORD is with me.", "1 Samuel 18:28–29"],
  ],
  END: REGION.end || ["Tonight I leave Gibeah. Wherever I go, the LORD my God is with me.", "Joshua 1:9"],
};
const JS_IMG = Object.assign(new Image(), { src: "../assets/journal/david_journal_ots.png?v=" + (window.BUILD || 0) });
const storyDone = () => STORY_STEPS.filter(id => regionHas("taken", id)).length;
// (Glen 11-06) what he's found, kept at the bottom of the left page the whole time: a line for each kind once he's found
// the first one, more added as he finds them (written in the next time he writes); "of N" only on the gate's last page.
// JFIRST: the kinds whose first one sits him down to write straight away
const JFOUND = [["truth", "Truths"], ["stone", "Stones of remembrance"], ["pomegranate", "Pomegranates"], ["oil", "Oil jars"]], JFIRST = ["stone", "truth"];
const jFound = k => region.relics.filter(f => f.kind === k && regionHas("taken", f.id)).length;
const jAll = k => region.relics.filter(f => f.kind === k).length;
function journalWatch() {   // updateRegion: a story moment just finished? he sits down and writes
  const d = david;
  if (region.jscene || region.mapOpen || region.script.length || region.wait > 0 || region.trans || region.climb || (dialog && dialog.t > 0) || !d.onGround || d.deadT > 0) return;
  const jW = region.save.jW || {}, first = (region.save.jAt || 0) < 9 && JFIRST.some(k => jFound(k) > 0 && !jW[k]);   // (jAt 9: the tests, no Journal)
  if (storyDone() > (region.save.jAt || 0) || first) jsceneOpen(false);
}
function jsceneOpen(final) {
  const prev = region.save.jAt || 0, n = storyDone();
  region.save.jAt = Math.max(prev, n); regionWrite();
  const snap = document.createElement("canvas"); snap.width = W; snap.height = H; snap.getContext("2d").drawImage(ctx.canvas, 0, 0);   // the game behind, blurred
  region.jscene = { t: 0, prev: final ? Math.min(prev, n) : prev, n, final, wasFinal: final && regionHas("taken", "g_jfinal"), snap, out: 0, jW: Object.assign({}, region.save.jW || {}) };
  region.save.jW = Object.fromEntries(JFOUND.map(([k]) => [k, jFound(k)])); regionWrite();   // (what's written now: next time only what's new is)
  if (final) regionAdd("taken", "g_jfinal");
  hushStage();
  if (final && SONG_ON) songToggle(true);
  else if (typeof journalMusic !== "undefined") { journalMusic.currentTime = 0; journalMusic.volume = typeof JTUNE !== "undefined" ? JTUNE.MUSIC_VOLUME : 0.5; journalMusic.play().catch(() => {}); }
  jsceneLayout(region.jscene);
}
const regionHushed = () => REGION_ON && (!!region.jscene || region.mapOpen || (typeof CARD_SONG !== "undefined" && CARD_SONG && !CARD_SONG.paused));   // main.js updateMusic: the stage's music stays out   // (Glen 11-09: and the map and card pages are silent too, birds and all)
function hushStage() {   // the stage's music stops (updateMusic brings it back afterward)
  if (typeof hushLoops === "function") hushLoops();
  for (const a of [typeof dayMusic !== "undefined" && dayMusic, typeof nightMusic !== "undefined" && nightMusic, typeof caveMusic !== "undefined" && caveMusic,
                   typeof stageTheme !== "undefined" && stageTheme, typeof bossMusic !== "undefined" && bossMusic]) if (a && !a.paused) a.pause();
}
const jsFont = (px, ref) => typeof caveatReady !== "undefined" && caveatReady ? `${px}px Caveat, Georgia, serif` : `italic ${Math.round(px * 0.72)}px Georgia, serif`;
function jsceneLayout(J) {   // the words on each flat page: { text, x, y, px, color, center, isNew }, and when each new one is written
  const m = document.createElement("canvas").getContext("2d");
  const fit = (side, build) => { for (let k = 1; k > 0.55; k -= 0.06) { const r = build(k); if (r.bottom <= JSCENE.PAGE[side][1] - 8) return r.items; } return build(0.55).items; };
  const wrap = (t, px, w) => { m.font = jsFont(px); const out = []; let line = ""; for (const word of t.split(" ")) { const nn = line ? line + " " + word : word; if (line && m.measureText(nn).width > w) { out.push(line); line = word; } else line = nn; } if (line) out.push(line); return out; };
  // the left page: Gibeah, an entry per story moment (and the gate), then what he's found
  const [LW] = JSCENE.PAGE.left;
  J.left = fit("left", k => {
    const items = []; let y = 40 * k;
    items.push({ text: REGION.name, x: LW / 2, y, px: 34 * k, center: true, isNew: J.prev === 0 && J.n > 0 });
    y += 16 * k;
    const ents = JSCENE.ENTRIES.slice(0, J.n).map((e, i) => [e, i >= J.prev]);
    if (J.final) ents.push([JSCENE.END, !J.wasFinal]);
    for (const [[text, ref], isNew] of ents) {
      for (const l of wrap(text, 23 * k, LW - 24)) { y += 25 * k; items.push({ text: l, x: 12, y, px: 23 * k, isNew }); }
      y += 19 * k; items.push({ text: "— " + ref, x: 30, y, px: 17 * k, color: JSCENE.INK_REF, isNew });
      y += 8 * k;
    }
    // what he's found: at the bottom of the page, a line for each kind found so far (new ones, or new counts, written now)
    const list = [];
    for (const [kind, name] of JFOUND) {
      const n = jFound(kind); if (!n) continue;
      let t = J.final ? `${name}: ${n} of ${jAll(kind)}` : `${name}: ${n}`;
      if (kind === "truth") { const refs = region.relics.filter(f => f.kind === "truth" && regionHas("taken", f.id)).map(f => (f.text.match(/\(([^()]+)\)\s*$/) || [])[1]).filter(Boolean); if (refs.length) t += ` (${refs.join("; ")})`; }
      list.push([t, J.final ? !J.wasFinal : n !== (J.jW[kind] || 0)]);
    }
    if (list.length) {
      const lines = []; for (const [t, isNew] of list) for (const l of wrap(t, 18 * k, LW - 24)) lines.push([l, isNew]);
      const H_ = JSCENE.PAGE.left[1], top = H_ - 12 - lines.length * 20 * k - 24 * k;
      if (top < y + 12 * k) y = H_ + 100;   // (no room: fit() tries smaller)
      else {
        let ly = top;
        items.push({ text: `Found in ${REGION.name}:`, x: 12, y: ly, px: 19 * k, isNew: !Object.values(J.jW).some(Boolean) });
        for (const [l, isNew] of lines) { ly += 20 * k; items.push({ text: l, x: 20, y: ly, px: 18 * k, color: JSCENE.INK_REF, isNew }); }
        y = ly;
      }
    }
    return { items, bottom: y };
  });
  // the right page: Glen's song, two lines a story moment, all of it at the gate
  const [RW_] = JSCENE.PAGE.right, lines = (J.final ? JOURNAL_VERSE.length : Math.min(JOURNAL_VERSE.length, J.n * 2)), was = J.final && J.wasFinal ? lines : Math.min(JOURNAL_VERSE.length, J.prev * 2);
  // (Glen 11-06) only the words until the gate; there, once every line is down, a breath, and then the title, big, last
  J.right = fit("right", k => {
    const titled = J.final || REGION.key !== "gibeah", newTitle = J.final && !J.wasFinal && REGION.key === "gibeah";   // (after Gibeah the song has its title: written there, at the end)
    const items = []; let y = titled ? 70 * k : 4 * k;
    if (titled) {
      items.push({ text: "My Heart Is Steadfast", x: RW_ / 2, y: 40 * k, px: 40 * k, center: true, color: JSCENE.TITLE_INK, isNew: newTitle, last: true, title: newTitle });
      items.push({ text: "Psalm 57", x: RW_ / 2, y: 64 * k, px: 21 * k, center: true, color: JSCENE.INK_REF, isNew: newTitle, last: true });
    }
    for (let i = 0; i < lines; i++) {
      const ind = i % 2 ? 16 : 0;
      wrap(JOURNAL_VERSE[i], 27 * k, RW_ - 24 - ind).forEach((l, j) => { y += 29 * k; items.push({ text: l, x: 8 + ind + (j ? 18 : 0), y, px: 27 * k, isNew: i >= was }); });
      if (i === 3) y += 14 * k;
    }
    return { items, bottom: y };
  });
  // the writing: the new words, one after another (left page first)
  let t = 0.8;
  const all = [...J.left, ...J.right], order = [...all.filter(it => !it.last), ...all.filter(it => it.last)];
  for (const it of order) {
    if (!it.isNew) { it.at = -1; continue; }
    if (it.title) { t += JSCENE.TITLE_WAIT; J.titleAt = t; }   // (the breath before it)
    it.at = t; it.dur = it.text.length * JSCENE.CHAR * (it.title ? 2.2 : 1); t += it.dur + JSCENE.GAP * 0.3;
  }
  J.done = t;
  J.flat = { left: document.createElement("canvas"), right: document.createElement("canvas") };
  for (const side of ["left", "right"]) { const [w, h] = JSCENE.PAGE[side]; J.flat[side].width = w * JSCENE.RES; J.flat[side].height = h * JSCENE.RES; }
}
function jsceneFrame(dt) {
  const J = region.jscene; J.t += dt;
  const skip = pressed("a") || pressed("b") || pressed("select") || pressed("start");
  if (!J.out && skip && J.t > 0.5) { if (J.t < J.done) J.t = J.done; else J.out = 0.001; }
  if (!J.out) for (const it of [...J.left, ...J.right]) if (it.at >= 0 && !it.pen && J.t >= it.at) {
    it.pen = true; if (typeof penScratch === "function") penScratch(Math.min(1.2, it.dur), 0.8);
    if (it.title && typeof chime === "function") { chime(4); setTimeout(() => chime(7), 220); setTimeout(() => chime(11), 480); }   // (this is it)
  }
  if (J.out) {
    J.out += dt;
    if (J.out >= JSCENE.FADE) {
      region.jscene = null;
      if (!J.final && typeof journalMusic !== "undefined" && !journalMusic.paused) journalMusic.pause();   // (the gate's: on under the card)
      if (J.final) bookOpen(1, true);   // then the card, the song still playing; B: on to the road
      return;
    }
  }
  drawJscene(J);
}
function drawJscene(J) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
  ctx.filter = "blur(10px) brightness(0.55)"; ctx.drawImage(J.snap, -20, -20, W + 40, H + 40); ctx.filter = "none";   // the stage behind, out of focus
  const [ax, ay] = JSCENE.AT, sc = JS_IMG.naturalWidth ? JSCENE.K / JS_IMG.naturalWidth : 1;
  if (JS_IMG.complete && JS_IMG.naturalWidth) ctx.drawImage(JS_IMG, ax, ay, JS_IMG.naturalWidth * sc, JS_IMG.naturalHeight * sc);
  for (const side of ["left", "right"]) {
    const c = J.flat[side], g = c.getContext("2d"), R = JSCENE.RES;
    g.setTransform(R, 0, 0, R, 0, 0); g.clearRect(0, 0, c.width, c.height); g.textBaseline = "alphabetic";
    for (const it of J[side]) {
      let text = it.text;
      if (it.at >= 0) { if (J.t < it.at) continue; text = text.slice(0, Math.ceil((J.t - it.at) / (JSCENE.CHAR * (it.title ? 2.2 : 1)))); }
      g.font = jsFont(it.px); g.fillStyle = it.color || JSCENE.INK; g.textAlign = it.center ? "center" : "left";
      g.fillText(text, it.x, it.y);
    }
    const q = JSCENE[side === "left" ? "LEFT" : "RIGHT"].map(([x, y]) => [x + ax, y + ay]);
    ctx.globalCompositeOperation = "multiply"; drawQuad(c, q, 8); ctx.globalCompositeOperation = "source-over";   // (multiply: the ink takes the page's light and shade)
  }
  if (J.titleAt && J.t >= J.titleAt) {   // the gate: a warm light comes up over the song as its title is written
    const k = Math.min(1, (J.t - J.titleAt) / 1.2), pulse = 0.85 + 0.15 * Math.sin((J.t - J.titleAt) * 2.4);
    const q = JSCENE.RIGHT, cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4 + ax, cy = (q[0][1] + q[1][1]) / 2 + ay + 40;
    ctx.globalCompositeOperation = "lighter";
    const gl = ctx.createRadialGradient(cx, cy, 10, cx, cy, 330); gl.addColorStop(0, `rgba(255,200,110,${JSCENE.GLOW * k * pulse})`); gl.addColorStop(1, "rgba(255,170,60,0)");
    ctx.fillStyle = gl; ctx.fillRect(cx - 340, cy - 340, 680, 680); ctx.globalCompositeOperation = "source-over";
  }
  // the hint, and the fades
  const fin = J.t >= J.done;
  ctx.textAlign = "center"; ctx.font = "17px Georgia, serif"; ctx.fillStyle = "rgba(255,240,215,0.8)";
  ctx.fillText(fin ? (J.final ? "A: on to David's card" : "A: back to the game") : "A: finish writing", W / 2, H - 16);
  const a = Math.max(J.t < JSCENE.FADE ? 1 - J.t / JSCENE.FADE : 0, J.out ? J.out / JSCENE.FADE : 0);
  if (a > 0) { ctx.fillStyle = `rgba(0,0,0,${a})`; ctx.fillRect(0, 0, W, H); }
  ctx.restore();
}
function drawQuad(img, q, N) {   // img stretched onto a four-cornered shape (TL, TR, BR, BL), a grid of small triangles
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const P = (u, v) => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);
  const w = img.width, h = img.height;
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const u0 = i / N, u1 = (i + 1) / N, v0 = j / N, v1 = (j + 1) / N;
    const a = P(u0, v0), b = P(u1, v0), c = P(u1, v1), d = P(u0, v1);
    quadTri(img, [u0 * w, v0 * h, u1 * w, v0 * h, u0 * w, v1 * h], [a, b, d]);
    quadTri(img, [u1 * w, v0 * h, u1 * w, v1 * h, u0 * w, v1 * h], [b, c, d]);
  }
}
function quadTri(img, s, d) {   // one triangle of the picture onto one on screen
  const [x0, y0, x1, y1, x2, y2] = s, [[u0, v0], [u1, v1], [u2, v2]] = d;
  const den = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0); if (!den) return;
  const a = ((u1 - u0) * (y2 - y0) - (u2 - u0) * (y1 - y0)) / den, b = ((v1 - v0) * (y2 - y0) - (v2 - v0) * (y1 - y0)) / den;
  const c = ((x1 - x0) * (u2 - u0) - (x2 - x0) * (u1 - u0)) / den, dd = ((x1 - x0) * (v2 - v0) - (x2 - x0) * (v1 - v0)) / den;
  const cx = (u0 + u1 + u2) / 3, cy = (v0 + v1 + v2) / 3, grow = p => [p[0] + Math.sign(p[0] - cx) * 0.7, p[1] + Math.sign(p[1] - cy) * 0.7];   // (a hair bigger: no seams)
  ctx.save(); ctx.beginPath(); for (const [k, p] of d.map(grow).entries()) k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); ctx.closePath(); ctx.clip();
  ctx.transform(a, b, c, dd, u0 - a * x0 - c * y0, v0 - b * x0 - dd * y0); ctx.drawImage(img, 0, 0); ctx.restore();
}
function wrapLines(t, maxW) {   // words into lines no wider than maxW (ctx's font)
  const out = []; let line = "";
  for (const w of t.split(" ")) { const n = line ? line + " " + w : w; if (line && ctx.measureText(n).width > maxW) { out.push(line); line = w; } else line = n; }
  if (line) out.push(line); return out;
}
function drawCardSpread() {
  const INK = "#2e2418", FAINT = "rgba(46,36,24,0.42)", GOLD = "#b07a14";
  const hand = typeof caveatReady !== "undefined" && caveatReady ? "Caveat, Georgia, serif" : "italic Georgia, serif";
  const handFont = px => typeof caveatReady !== "undefined" && caveatReady ? `${px}px Caveat, Georgia, serif` : `italic ${Math.round(px * 0.72)}px Georgia, serif`;
  ctx.save();
  ctx.fillStyle = "#1c140d"; ctx.fillRect(0, 0, W, H);
  const L = { x: 46, y: 30, w: 590, h: 630 }, R = { x: 644, y: 30, w: 590, h: 630 };
  for (const p of [L, R]) {
    ctx.fillStyle = "#e9dcc0"; ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "rgba(120,90,50,0.10)"; for (let k = 0; k < 24; k++) ctx.fillRect(p.x + (k * 337) % (p.w - 120), p.y + (k * 211) % p.h, 120, 2);
  }
  const sp = ctx.createLinearGradient(L.x + L.w - 30, 0, R.x + 30, 0);   // the binding's shadow
  sp.addColorStop(0, "rgba(60,40,20,0)"); sp.addColorStop(0.5, "rgba(60,40,20,0.35)"); sp.addColorStop(1, "rgba(60,40,20,0)");
  ctx.fillStyle = sp; ctx.fillRect(L.x + L.w - 30, L.y, R.x - L.x - L.w + 60, L.h);

  // -- the left page: David's card
  const lx = L.x + 40, lw = L.w - 80;
  // (Glen 11-05) his portrait of David, in a frame at the top
  const PS = 136, pxx = lx, pyy = L.y + 22;
  ctx.fillStyle = "#cdb98f"; ctx.fillRect(pxx, pyy, PS, PS);
  if (CARD_FACE.complete && CARD_FACE.naturalWidth) ctx.drawImage(CARD_FACE, 0, 0, CARD_FACE.naturalWidth, CARD_FACE.naturalHeight, pxx, pyy, PS, PS);
  ctx.strokeStyle = "#5c4630"; ctx.lineWidth = 3; ctx.strokeRect(pxx, pyy, PS, PS);
  const tx = lx + PS + 24;
  ctx.textAlign = "left"; ctx.fillStyle = INK; ctx.font = "bold 34px Georgia, serif"; ctx.fillText("David", tx, L.y + 58);
  ctx.font = "italic 17px Georgia, serif"; ctx.fillText(`What has grown in ${REGION.name}`, tx, L.y + 84);
  // strength
  let y = L.y + 128;
  const lv = strLevel(), full = lv >= REGION.strCap, a = STR.NEED[lv - 1], b = STR.NEED[lv], sf = full ? 1 : (strXP() - a) / (b - a);
  ctx.font = "bold 20px Georgia, serif"; ctx.fillText(`Strength ${lv}`, tx, y);
  const bx = tx + 118, bw = lx + lw - bx; ctx.fillStyle = "#cdb98f"; ctx.fillRect(bx, y - 14, bw, 12); ctx.fillStyle = GOLD; ctx.fillRect(bx, y - 14, bw * sf, 12);
  ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.strokeRect(bx, y - 14, bw, 12);
  ctx.fillStyle = FAINT; ctx.font = "15px Georgia, serif";
  for (const l of wrapLines(full ? `From fighting. That's as strong as he gets in ${REGION.name}.` : `From fighting. In ${REGION.name} it can reach ${REGION.strCap}.`, lx + lw - tx)) { y += 19; ctx.fillText(l, tx, y); }
  y = L.y + 22 + PS + 14;
  ctx.strokeStyle = "rgba(46,36,24,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + lw, y); ctx.stroke();
  // the four traits
  y += 34;
  for (const tr of CARD) {
    const got = tr.from.filter(([id]) => everHas(id)), left = tr.from.length - got.length;
    ctx.fillStyle = INK; ctx.font = "bold 22px Georgia, serif"; ctx.fillText(tr.name, lx, y);
    for (let i = 0; i < tr.from.length; i++) {   // a mark for each, filled once it's grown
      const px = lx + lw - (tr.from.length - 1 - i) * 22 - 8;
      ctx.beginPath(); ctx.arc(px, y - 7, 7, 0, Math.PI * 2);
      if (i < got.length) { ctx.fillStyle = GOLD; ctx.fill(); } ctx.strokeStyle = INK; ctx.lineWidth = 1.5; ctx.stroke();
    }
    y += 21; ctx.font = "italic 15px Georgia, serif"; ctx.fillStyle = "#5c4630";
    const vl = wrapLines(`“${tr.verse}” (${tr.ref})`, lw);
    for (const l of vl) { ctx.fillText(l, lx, y); y += 18; }
    ctx.font = "15px Georgia, serif";
    for (const [, what] of got.length ? tr.from.filter(([id]) => everHas(id)) : []) { ctx.fillStyle = INK; ctx.fillText("✓ " + what, lx + 10, y); y += 18; }
    if (left) { ctx.fillStyle = FAINT; ctx.fillText(got.length ? `…and ${left} more to find in ${REGION.name}` : `Not yet. ${left === 1 ? "Something" : left + " things"} in ${REGION.name} will grow it.`, lx + 10, y); y += 18; }
    y += 18;
  }

  // -- the right page: the Journal, Glen's song
  const rx = R.x + 50, done = regionHas("taken", "g_exit_open");
  const n = done ? JOURNAL_VERSE.length : Math.min(JOURNAL_VERSE.length, STORY_STEPS.filter(id => regionHas("taken", id)).length * 2);
  ctx.textAlign = "center"; ctx.fillStyle = INK; ctx.font = handFont(46); ctx.fillText("My Heart Is Steadfast", R.x + R.w / 2, R.y + 58);
  ctx.font = "italic 17px Georgia, serif"; ctx.fillStyle = "#5c4630"; ctx.fillText(`${REGION.name}  ·  from Psalm 57`, R.x + R.w / 2, R.y + 86);
  ctx.textAlign = "left";
  let jy = R.y + 150;
  if (!n) { ctx.fillStyle = FAINT; ctx.font = "italic 18px Georgia, serif"; for (const l of wrapLines("The page is still empty. David will write here as the story goes on.", R.w - 100)) { ctx.fillText(l, rx, jy); jy += 26; } }
  ctx.fillStyle = "rgba(40,24,12,0.92)"; ctx.font = handFont(38);
  for (let i = 0; i < n; i++) { ctx.fillText(JOURNAL_VERSE[i], rx + (i % 2 ? 30 : 0), jy); jy += i === 3 ? 66 : 44; }
  if (n && n < JOURNAL_VERSE.length) { ctx.fillStyle = FAINT; ctx.font = "italic 16px Georgia, serif"; ctx.fillText("(more as the story goes on)", rx, jy + 6); }
  // the song: A (only once it's played: SONG_ON)
  const playing = CARD_SONG && !CARD_SONG.paused, sy = R.y + R.h - 64;
  if (SONG_ON) {
  ctx.fillStyle = INK; ctx.font = "18px Georgia, serif";
  ctx.fillText(playing ? "A: stop the song" : "A: play the song", rx, sy);
  if (CARD_SONG && CARD_SONG.duration) {
    const f = CARD_SONG.currentTime / CARD_SONG.duration, bw2 = R.w - 100;
    ctx.fillStyle = "#cdb98f"; ctx.fillRect(rx, sy + 14, bw2, 6); ctx.fillStyle = GOLD; ctx.fillRect(rx, sy + 14, bw2 * f, 6);
  } }

  // the footer
  ctx.textAlign = "center"; ctx.fillStyle = "#e9dcc0"; ctx.font = "17px Georgia, serif";
  ctx.fillText(region.bookLeave ? (SONG_ON ? "A: the song      B: on to the road" : "B: on to the road") : SONG_ON ? "Left / Right: the map      A: the song      Select or B: back to the game" : "Left / Right: the map      Select or B: back to the game", W / 2, H - 22);
  ctx.restore();
}
// (Glen 11-06) his old map sheet (torn parchment, a leather border, Gibeah's hill top-left, a compass bottom-right),
// the rooms drawn on it in ink. MAP_SHEET: where it sits on screen (it's saved at this size)
const MAP_SHEET = { img: "gibeah/map_sheet.png", x: 35, y: 12, INK: "#3b2a18", WASH: "rgba(150,105,55,0.20)", CAVE: "rgba(70,50,30,0.32)", PAPER: "#e2d0a8" };
function drawRegionMap() {
  const C = RTUNE.MAP_CELL, cols = Math.max(...REGION.rooms.map(r => r.mx + r.mw)), rows = Math.max(...REGION.rooms.map(r => r.my + (r.mh || 1)));
  const ox = (W - cols * C) / 2, oy = 135, M = MAP_SHEET, sheet = roomImg(M.img);
  const hand = px => typeof caveatReady !== "undefined" && caveatReady ? `${px}px Caveat, Georgia, serif` : `italic ${Math.round(px * 0.75)}px Georgia, serif`;
  ctx.fillStyle = "#1c140d"; ctx.fillRect(0, 0, W, H);
  if (sheet) ctx.drawImage(sheet, M.x, M.y);
  else { ctx.fillStyle = "#e9dcc0"; ctx.fillRect(M.x, M.y, 1210, 660); }
  ctx.textAlign = "center"; ctx.fillStyle = M.INK; ctx.font = hand(54);
  ctx.fillText(REGION.name, W / 2, 82);
  ctx.font = "16px Georgia, serif"; ctx.fillStyle = "#e9dcc0"; ctx.fillText("Left / Right: David's card and Journal      Select, A or B: back to the game", W / 2, H - 8);
  const blink = Math.floor(performance.now() / 300) % 2;
  const cur = region.room || roomAt(david.x);
  for (const r of REGION.rooms) {
    const been = regionHas("explored", r.id);
    if (!been) continue;
    const x = ox + r.mx * C, y = oy + r.my * C, mh = (r.mh || 1) * C;   // (mh: a tall room)
    ctx.fillStyle = r.cave ? M.CAVE : M.WASH; ctx.fillRect(x + 3, y + 3, r.mw * C - 6, mh - 6);
    ctx.strokeStyle = M.INK; ctx.lineWidth = 2.5; ctx.strokeRect(x + 3, y + 3, r.mw * C - 6, mh - 6);
    { const nm = r.name.replace(/^The /, ""), room = r.mw * C - 16; let px = 22; ctx.font = hand(px);   // (Glen 11-09: a long name in a narrow room shrinks to fit, not into its neighbor)
      while (px > 12 && ctx.measureText(nm).width > room) ctx.font = hand(--px);
      ctx.fillStyle = M.INK; ctx.fillText(nm, x + r.mw * C / 2, y + mh - 11); }
    // the edges you can walk through: a gap in the ink line
    ctx.fillStyle = M.PAPER;
    if (r.right) ctx.fillRect(x + r.mw * C - 5, y + C / 2 - 10, 10, 20);
    if (r.left) ctx.fillRect(x - 5, y + C / 2 - 10, 10, 20);
    const fx = cx => x + 3 + (cx / T - r.c0) / r.w * (r.mw * C - 6);   // a column in this room, on the map
    for (const o of region.doors) if (roomAt(o.x) === r && !(o.need && !hasSkill(o.need))) { ctx.fillStyle = "#2e2418"; ctx.fillRect(fx(o.x) - 4, y + 12, 8, 14); }
    for (const f of fires) if (roomAt(f.x) === r) { ctx.fillStyle = "#6b8e23"; ctx.beginPath(); ctx.arc(fx(f.x), y + 36, 7, 0, Math.PI * 2); ctx.fill(); }
    for (const f of region.relics) if (roomAt(f.x) === r && regionHas("seen", f.id) && !regionHas("taken", f.id)) { ctx.fillStyle = "#b03a2e"; ctx.beginPath(); ctx.arc(fx(f.x), y + 36, 5, 0, Math.PI * 2); ctx.fill(); }
    for (const s of region.seals) if (roomAt(s.x) === r && regionHas("sealsSeen", s.id) && !sealOpen(s)) {
      ctx.strokeStyle = "#7a1f14"; ctx.lineWidth = 3; const sx = fx(s.x);
      ctx.beginPath(); ctx.moveTo(sx - 7, y + 16); ctx.lineTo(sx + 7, y + 30); ctx.moveTo(sx + 7, y + 16); ctx.lineTo(sx - 7, y + 30); ctx.stroke();
    }
    const dy = r.up ? y + 10 + (1 - (GR * T - david.y) / ((r.up + GR) * T)) * (mh - 30) : y + C / 2 + 4;   // (a tall room: how high he is)
    if (r === cur && blink) { ctx.fillStyle = "#1f5fa8"; ctx.beginPath(); ctx.arc(fx(david.x), dy, 8, 0, Math.PI * 2); ctx.fill(); }
  }
  // the key, and the tally
  const ky = oy + rows * C + 32;
  ctx.textAlign = "left"; ctx.font = "17px Georgia, serif"; ctx.fillStyle = M.INK;
  const keyItems = [["#1f5fa8", "You"], ["#6b8e23", "Olive press (save)"], ["#b03a2e", "Something you saw but didn't get"], ["#7a1f14", "X  Sealed: come back later"]];
  let kx = W / 2 - 470;
  for (const [col, t] of keyItems) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(kx, ky - 6, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = M.INK; ctx.fillText(t, kx + 14, ky); kx += ctx.measureText(t).width + 44; }
  const count = k => [region.relics.filter(f => f.kind === k && regionHas("taken", f.id)).length, region.relics.filter(f => f.kind === k).length];
  ctx.textAlign = "center"; ctx.font = "19px Georgia, serif";
  const tally = ["pomegranate", "oil", "stone", "truth"].map(k => { const [a, b] = count(k); return `${RELIC_NAME[k]} ${a} of ${b}`; }).join("     ");
  ctx.fillText(tally, W / 2, ky + 32);
  ctx.fillText(`Rooms explored: ${region.save.explored.length} of ${REGION.rooms.length}`, W / 2, ky + 58);
}
