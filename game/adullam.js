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
  TUNNEL: { TURN: 0.75, REACH: 60, HIGH: 60, SIDE: 40, RUBBLE: 0.95, ON_LEDGE: 26, SWIM_HIGH: 260 },   // (SWIM_HIGH: px over an underwater tunnel's floor that still counts, swimming)
  // (Glen 11-13: "I shouldn't be able to go to beneath the warren ... when we go through the whole thing we can unblock it
  //  with Goliath's sword") the rubble across the way from the Shaft to the Camp into Beneath the Warren: its piles' sizes
  WALL: { BIG: 1.7, TOP: 1.15, REACH: 170 },
  // the dark below the Lamp Hall: how black (0-1); the lamp's light (px) with olives in the flask, with none, and with no
  //  lamp at all; a tunnel's faint glow (px); seconds of light per olive (as Part One's caves)
  DARK: { LAMP: 300, DIM: 130, NONE: 60, GLOW: 70, OIL_EVERY: 5 },
  // (Glen 11-13: "swimming ... breath meter ... reach further down areas swimming under stuff") in the water: sideways
  //  speed, a stroke's push up (A), Up / Down held, the slow sink, the most speed up or down; at the surface his feet
  //  this far under the waterline (head out); a jump out of the water (A at the surface); breath (s) and what's left
  //  after running out (s, and a heart lost)
  SWIM: { X: 170, STROKE: 230, PUSH: 420, SINK: 160, MAXV: 260, FLOAT: 70, LEAP: 1050, LEAP_NEAR: 30,   /* (Glen 11-13: "be able to jump out of water": A near the surface leaps him up onto the ledges) */ BREATH: 10, AFTER: 3,
    TREAD: 0.35, FLOAT_NEAR: 60, K: 0.5 },   // (K: his swim and swim-sword sheets' size: about his size standing)   // (FLOAT_NEAR: px under the surface where, still, he floats up and treads water)   // (Glen 11-13: "a resting stroke ... when I am not moving": his stroke this much slower, till his own clip)
  // (Glen 11-13 play: "the backgrounds seem way too blown up for how big David is") his pictures far off, small: K, their
  //  size (1 = the screen's height for a wide one, 1296 wide for a tall one); P: how fast they scroll next to David;
  //  BOT: the picture's bottom (px, world, behind the floor); DIM: a shade over them (the rock he stands on stands out);
  //  (TALL_DIM: the tall rooms', whose painted ledges aren't the ones to stand on); FADE: px over the picture's top where
//  the rock goes dark (the cave's roof); NEAR_P: the rubble just behind him, NEAR_A how much it shows (it's in shadow)
  BG: { K: 0.5, P: 0.35, BOT: 650, DIM: 0.3, TALL_DIM: 0.5, FADE: 200, MID_P: 0.55, NEAR_P: 0.8, NEAR_BOT: 600, NEAR_A: 0.6 },
  // (Glen 11-13: "Here are some cave floors") his floors, under David's feet, scrolling with him: px of each over the
  //  ground line (he walks a little way into it, not along its back edge)
  FLOOR: { limestone: 80, sandstone: 74, dark: 70, pebbles: 50 },
  // (Glen 11-14: "here is a pit asset to use for the pits") his sandstone pit (tools/make_w4_pit.py: w4/pit.png) for the
  //  drops in the light floors (GROUNDS): its back wall stretched to the hole's width, its stone lips either side. KX, KY:
  //  its size across and down (down less, so its shaft goes dark on screen); DARK: px under its rim to all dark; RIM: its
  //  back wall's top below the floor picture's top; L, R, TOP: its slices (the png's px)
  PIT: { GROUNDS: ["limestone", "sandstone"], KX: 0.42, KY: 0.3, DARK: 150, RIM: 34, L: 160, R: 480, TOP: 30 },
  FLOOR_SOLID: { limestone: 42, sandstone: 45, dark: 2, pebbles: 104 },   // (the row each floor picture is solid from: under it, dark)
  // (Glen 11-13: "paint the exact ledges that we can jump on") a way up a tall room: his ledges zigzagging, each DY px
  //  over the last, GAP px apart sideways, kept EDGE px from the walls; their sizes in turn
  ZIG: { DY: 115, GAP: 55, EDGE: 70, SIZES: ["m", "l", "s", "m", "l"] },
  // (Glen 11-13: "swimming under stuff") rock down into the water: its bottom BELOW px under the waterline; under it he
  //  stays UNDER px below that (no air there: swim through)
  LID: { BELOW: 95, UNDER: 30 },
  // the long rooms: his panorama scrolls at most this fast (a slower one: the whole picture from one end of the room to the other)
  FILL_P: 0.55,
  // (Glen 11-13: "the 400 ... the Israelites that are scared and the Israelites that are running away") Part One's five
  //  men (soldierN_fear: 0 hiding ... last standing; soldierN_go: walking), soldier_sit, soldier_talk, boy_scared.
  //  NEAR: px to greet one (Up); RISE: s getting up; GO: s walking off to the camp (fading), at WALK px/s
  MEN: { NEAR: 90, RISE: 1.1, GO: 2.4, WALK: 110 },
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
    { id: "camp", name: "The Camp", w: 110, cave: true, mx: 4, my: 1, mw: 3, right: "roost", pic: "w4/pano_camp_1", fill: true,
      pics: ["w4/pano_camp_1", "w4/pano_camp_2", "w4/pano_camp_3"],   /* (Glen 11-13: the camp filling up, as the newcomers come: r4CampStage) */ rock: "sand", ground: "limestone" },
    { id: "roost", name: "The Bat Roost", w: 40, up: 44, cave: true, mx: 7, my: 0, mw: 1, mh: 2, left: "camp", right: "lamphall",
      pic: "w4/tall_roost", k: 1, tall: true, rock: "pale", ground: "limestone" },
    { id: "lamphall", name: "The Lamp Hall", w: 172, cave: true, mx: 8, my: 1, mw: 5, left: "roost", dark: 0.45,
      pic: "w4/lamp/far", mid: "w4/lamp/mid.png", k: 0.9,   /* (Glen 11-13: "the full background", his far wall and his columns, not halved) */ rock: "red", ground: "sandstone" },
    // MIDDLE: dark
    { id: "warren", name: "The Rat Warren", w: 190, cave: true, mx: 8, my: 2, mw: 5, right: "narrows", dark: 0.93,
      pic: "w4/pano_warren", fill: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "narrows", name: "The Four Tunnels", w: 120, cave: true, mx: 13, my: 2, mw: 3, left: "warren", dark: 0.93,
      pic: "w4/pano_narrows", fill: true, rock: "dark", ground: "dark", near: "pile" },
    // (Glen 11-13: "any time I jump to the left I end up in four tunnels") no walking out at the side: in and out by its tunnel
    { id: "ledges", name: "The Crumbling Ledges", w: 40, up: 44, cave: true, mx: 14, my: 0, mw: 2, mh: 2, dark: 0.9,   /* (Glen 11-13: on top of the Four Tunnels, room for its name) */
      pic: "w4/tall_ledges", k: 1, tall: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "well", name: "The Old Well Shaft", w: 40, up: 100, cave: true, mx: 16, my: 1, mw: 2, mh: 3, right: "river", dark: 0.35,
      pic: "w4/tall_well", k: 0.6, fog: 0.4, tall: true, rock: "pale", ground: "pebbles" },
    // LOWER: water (water: the waterline, px from the screen's top)
    { id: "river", name: "The Underground River", w: 170, cave: true, mx: 18, my: 3, mw: 5, left: "well", right: "flooded", dark: 0.9, water: 430,
      pic: "w4/pano_river", fill: true, rock: "moss", ground: "pebbles" },
    { id: "flooded", name: "The Flooded Tunnel", w: 130, cave: true, mx: 23, my: 3, mw: 4, left: "river", dark: 0.92, water: 400,
      pic: "w4/pano_flooded", fill: true, rock: "moss", ground: "pebbles" },
    // (Glen 11-13: "the deep pool should be all underwater") the water up near the roof; rock over most of it, air between
    { id: "deep", name: "The Deep Pool", w: 170, cave: true, mx: 23, my: 4, mw: 5, left: "spring", dark: 0.92, water: 170,
      pic: "w4/pano_deep", fill: true, rock: "moss", ground: "pebbles" },
    // (Glen 11-13: "Drop the pool down underneath the flooded tunnel ... Then connect it to the hidden spring going left. It
    //  will make more room for the words on the sheet") the Deep Pool under the Flooded Tunnel, the Spring to its left
    { id: "spring", name: "The Hidden Spring", w: 220, cave: true, mx: 15, my: 4, mw: 8, left: "climb", right: "deep", dark: 0.8,
      pic: "w4/pano_spring", fill: true, rock: "moss", ground: "limestone" },
    // (Glen 11-13: "start circling back to the four tunnels ... so I am not all the way at the end and no way back. Then there
    //  can be a secret in that shaft that takes me underneath the rat Warren and then up a shaft back to camp")
    { id: "climb", name: "The Long Climb", w: 40, up: 60, cave: true, mx: 14, my: 3, mw: 1, mh: 2, right: "spring", dark: 0.9,
      pic: "w4/tall_ledges", k: 0.6, fog: 0.25, tall: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "under", name: "Beneath the Warren", w: 150, cave: true, mx: 8, my: 3, mw: 6, left: "campshaft", dark: 0.95,
      pic: "w4/pano_narrows", fill: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "campshaft", name: "The Shaft to the Camp", w: 40, up: 60, cave: true, mx: 7, my: 2, mw: 1, mh: 2, right: "under", dark: 0.6,
      pic: "w4/tall_roost", k: 0.6, tall: true, rock: "pale", ground: "limestone" },
    // the side caves: small rooms off the tunnels, one thing at the back of each (a Truth, a pomegranate, a stone of
    //  remembrance, an oil jar). The Warren's two have rubble across them: Goliath's sword (Up)
    { id: "nook", name: "The Bats' Nook", w: 46, cave: true, mx: 5, my: 0, mw: 2, dark: 0.3,
      pic: "w4/pano_spring", fill: true, rock: "pale", ground: "limestone" },
    { id: "larder", name: "The Rats' Larder", w: 50, cave: true, mx: 8, my: 0, mw: 2, dark: 0.93,
      pic: "w4/pano_warren", fill: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "stones", name: "The Fallen Stones", w: 50, cave: true, mx: 10, my: 0, mw: 2, dark: 0.93,
      pic: "w4/pano_narrows", fill: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "oilstore", name: "The Oil Store", w: 46, cave: true, mx: 12, my: 0, mw: 2, dark: 0.6,
      pic: "w4/lamp/far", mid: "w4/lamp/mid.png", k: 0.9, rock: "red", ground: "sandstone" },
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
  drawOver: () => r3DrawMight(), softHoles: true, draw: camX => { r4DrawLids(camX); r4DrawWall(camX); r4DrawMen(camX); r4DrawFish(camX); }, backdrop: (r, camX) => r4Backdrop(r, camX), floor: (r, camX) => r4Floor(r, camX), drawFront: camX => r4DrawFront(camX),
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
  w4_stairs_tunnel: { w: 708, h: 640 },   // (Glen 11-13 resaved it: the rock up round the tunnel)   // (make_w4_rooms.py: Glen's stairs up into a tunnel)
  w4_arch: { w: 196, h: 250 }, w4_arch_sand: { w: 196, h: 250 }, w4_tunnel_lit: { w: 261, h: 230 },
  // (tools/make_w4_rubble.py: Glen's rubble piles, "for the mouth of the cave doors")
  w4_rubble_dark: { w: 300, h: 138 }, w4_rubble_dark2: { w: 300, h: 139 }, w4_rubble_sand: { w: 300, h: 139 }, w4_rubble_pale: { w: 300, h: 139 },   // (make_w4_layers.py: tunnel mouths cut from his pictures)
};

const r4 = { told: {}, tunnels: [], lids: [], fish: [], men: [], walk: null, swim: null, breath: R4.SWIM.BREATH, oilT: 0, lampAt: null };
function r4Tell(k, text) { if (!r4.told[k]) { r4.told[k] = true; toast(text); } }
const r4Lamp = () => ALL_SKILLS || regionHas("taken", "r4_lamp");
// (Glen 11-13: "It said swing Goliath's sword but I just swung my own sword. We should do the test your might again")
//  World 3's test of might for the rubble: Up by it, mash A and B, the bar, gold breaks it in one. (c, w: the columns its
//  break opens, the bottom rows of: none for a side cave's rubble, which only stands in front)
const r4Might = (id, c, w, x0, x1) => ({ id, room: null, c, w, x0, x1, up: 0, hp: R3.MIGHT.HP, hits: 0, broken: regionHas("taken", id), shake: 0, kind: "crack" });
// the camp's picture: a few men, then a crowd (4 newcomers found), then packed (all of them)
const r4CampStage = () => { const n = r4.men.filter(m => m.id && regionHas("taken", m.id)).length; return n >= 8 ? 2 : n >= 4 ? 1 : 0; };
const r4WallOpen = () => hasSkill("heavySword") && regionHas("explored", "climb");   // (the rubble into Beneath the Warren: Goliath's sword, once he's been all through)

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
function r4Tunnel(id, room, x, y, to, art = "w4_arch", secret = false, rubble = false) {
  const o = { id, room, x, y, to, secret, blocked: rubble && !regionHas("taken", "r4_open_" + id) };
  if (rubble) o.might = Object.assign(r4Might("r4_open_" + id, 0, 0, x - 70, x + 70), { room });
  r4.tunnels.push(o);
  // (Glen 11-13: "side caves a touch higher ... rubble in front of them for not open yet"; "Cave mouth needs to go higher":
  //  on a ledge, up off its top face so it stands on it, not sunk into it)
  const up = (to && !rubble ? 0 : R4.TUNNEL.SIDE) + (y < GR * T - 4 ? R4.TUNNEL.ON_LEDGE : 0);
  if (art) { const k = KIT[art]; region.props.push({ room, n: art, x: x - k.w / 2, y: y - k.h + 12 - up }); }
  if ((!to || o.blocked) && !secret) {   // (Glen's rubble, in the room's rock; a blocked one's goes when the sword breaks it)
    const n = "w4_rubble_" + ({ dark: "dark", red: "dark2", moss: "dark2", sand: "sand", pale: "pale" }[roomById(room).rock] || "dark"), k = KIT[n], s = R4.TUNNEL.RUBBLE;
    region.props.push(o.rubble = { room, n, x: x - k.w * s / 2, y: y - k.h * s + 14, s });
  }
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
  block(c, 0, w, Math.floor(y / T), 6);   // (6: solid, no dirt drawn: r4DrawLids draws the rock)
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
    if (f.gone) continue;
    if (stones.some(s => Math.abs(s.x - f.x) < F[f.kind].w * F.K * 0.45 && Math.abs(s.y - f.y) < 50)) {   // (the sword's edge, or a stone)
      f.gone = true; for (let i = 0; i < 10; i++) bits.push({ x: f.x, y: f.y, vx: (Math.random() - 0.5) * 220, vy: (Math.random() - 0.5) * 220, life: 0.7, color: i % 2 ? "#8a8070" : "#c8d8e0" }); continue;
    }
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
    if (f.room !== region.room.id || f.gone) continue;
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
  r4.tunnels.length = 0; r4.lids.length = 0; r4.fish.length = 0; r4.men.length = 0;
  Object.assign(TUNE.SPRITE_SIZE, { soldier2_fear: 0.8, soldier2_go: 0.88 });   // (as world6.js: the second man sat nearly as tall as David) r4.walk = null; r4.swim = null;
  for (const r of ADULLAM.rooms) { (r.pics || []).forEach(roomImg); roomImg(r.pic); roomImg(r.mid); roomImg(`w4/floor_${r.ground}.png`); roomImg(`w4/near_${r.near || r.rock}.png`); roomImg(`w4/ceil_${r.rock}.png`); }
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
    r4Tunnel("camp_side", rm, X(33), G, "cs_top", "w4_arch_sand");   // (down to the shaft: the secret way's other end)
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
    r4Tunnel("roost_side", "roost", (top.x + top.x1) / 2, top.y, "nook_in");
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
    r4Tunnel("warren_side1", rm, X(39), G, "larder_in", "w4_arch", false, true);
    rRat(rm, c + 24, 4); rRat(rm, c + 43, 3);
    r4Pit(rm, c + 46, 4);
    for (const k of [54, 58, 62, 66]) rRat(rm, c + k, 3);   // (the nest)
    r4Run(rm, "dark", X(52), 500, ["m", "l", "m"], 0, 60).forEach(l => r4Olives(l));
    r4Jar(rm, c + 73); r4Jar(rm, c + 74);
    r4Pit(rm, c + 77, 3, true);
    r4Tunnel("warren_side2", rm, X(85), G, "stones_in", "w4_arch", false, true);
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
    r4Tunnel("n1", rm, X(4.5), G, "warren_back", null); r4Tunnel("n2", rm, X(38), G, "oil_in");
    r4Tunnel("n3", rm, X(70), G, "ledges_in"); r4Tunnel("n4", rm, X(104), G, "climb_top");   // (the way back up from the end: the Long Climb)
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
    L("m", 93, 320); L("s", 100, 300); r4Olives(L("l", 105, 300)); L("s", 113, 330);
    // (Glen 11-13: "put something special at the end of the flooded tunnel ... A truth?") high up at the far end: Psalm 142,
    //  David's prayer in the cave (WEB, ebible.org; "the LORD" for Yahweh)
    const tr = L("m", 119, 255); r4Jar(rm, c + 127);
    rRelic("r4_truth_flooded", "truth", tr.c, onTop(tr.y), "I cried to you, LORD. I said, “You are my refuge, my portion in the land of the living.” (Psalm 142:5, by David, when he was in the cave)");
    for (const k of [10, 45, 100]) rBat(rm, c + k, 120);
    r4FishAt(rm, "tilapia", c, 5, 18); r4FishAt(rm, "biter", c, 20, 33, 10); r4FishAt(rm, "perch", c, 36, 50, -10);
    r4FishAt(rm, "biter", c, 76, 91, 10); r4FishAt(rm, "tilapia", c, 95, 120, -5); r4FishAt(rm, "perch", c, 100, 125, 10);
  }
  // -- The Deep Pool (Glen 11-13: "all underwater"): rock over the water nearly all the way; air where it opens (every 30 or
  //  so columns, a breath's swim apart). Fish, olives on the bottom, a pomegranate under the long rock
  c = R("deep");
  { const rm = "deep", X = k => (c + k) * T;
    ground(c, c + 169);
    r4Tunnel("deep_in", rm, X(165), G, "flood_under", "w4_tunnel_lit");   // (in at the right end; swim left to the Spring)
    for (const [k, w] of [[10, 28], [44, 30], [80, 30], [116, 30], [152, 10]]) r4Lid(rm, c + k, w);   // (air at 0-10, 38-44, 74-80, 110-116, 146-152, 162-170)
    for (const k of [14, 50, 86, 122]) oliveRow(c + k, 15.4, 5);
    rRelic("r4_pom_deep", "pomegranate", c + 96, 15);
    r4FishAt(rm, "perch", c, 8, 30, -60); r4FishAt(rm, "biter", c, 30, 44, 60); r4FishAt(rm, "tilapia", c, 44, 70, -90);
    r4FishAt(rm, "biter", c, 62, 80, 40); r4FishAt(rm, "perch", c, 84, 108, -40); r4FishAt(rm, "biter", c, 92, 112, 90);
    r4FishAt(rm, "tilapia", c, 116, 140, 0); r4FishAt(rm, "biter", c, 130, 150, -70); r4FishAt(rm, "tilapia", c, 150, 166, 60);
  }
  // -- The Hidden Spring: in from the Deep Pool at the right (its olive press there), a long way left along the spring's
  //  shore to the foot of the Long Climb, under the Four Tunnels. (Next: the water from Bethlehem; Gad: on to Judah)
  c = R("spring");
  { const rm = "spring", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "moss", s, X(k), y);
    ground(c, c + 219);
    campfire(c + 214, GR - 1);   // (by the way in from the Deep Pool)
    r4Jar(rm, c + 200); r4Jar(rm, c + 201); r4Jar(rm, c + 202);
    L("m", 186, 500); r4Olives(L("l", 178, 390));
    r4Pit(rm, c + 168, 5); rRat(rm, c + 162, 4);
    const u = r4Run(rm, "moss", X(144), 500, ["m", "l", "m"]); r4Olives(u[0]); rRelic("r4_pom_spring", "pomegranate", u[2].c, onTop(u[2].y));
    r4Pit(rm, c + 136, 4, true);
    r4Jar(rm, c + 128); r4Jar(rm, c + 129); rBat(rm, c + 126, 130); rBat(rm, c + 134, 140);
    campfire(c + 114, GR - 1);
    r4Pit(rm, c + 96, 10); L("s", 97, 510); r4Olives(L("s", 102, 510));
    rRat(rm, c + 86, 4); rRat(rm, c + 78, 4);
    const v = r4Run(rm, "moss", X(58), 500, ["s", "m", "s"]);
    const f = r4Run(rm, "moss", v[2].x1 + 70, 280, ["m", "m"], 0, 70); f.forEach(l => r4Olives(l)); r4Jar(rm, f[1].c, f[1].y);
    r4Pit(rm, c + 46, 3);
    r4Jar(rm, c + 30); r4Jar(rm, c + 31); r4Jar(rm, c + 32);
    L("m", 18, 500); r4Olives(L("l", 24, 390));
    rBat(rm, c + 40, 130); rBat(rm, c + 70, 130); rBat(rm, c + 160, 130);
  }
  // -- The Long Climb: up from the far end of the Hidden Spring to the Four Tunnels (the fourth arch). Partway up, a crack in
  //  the rock with cool air coming out: the secret way (Beneath the Warren, then up into the Camp)
  c = R("climb");
  { ground(c, c + 39);
    const z = r4Zig("climb", "dark", 500, -1550, true, 3);   // (from the right: in from the Spring)
    z.forEach((l, i) => { if (i % 4 === 1) r4Olives(l); if (i % 6 === 3) r4Jar("climb", l.c, l.y); if (i % 8 === 5) rBat("climb", l.c, l.y + 40); });
    const top = z[z.length - 1], mid = z[Math.floor(z.length * 0.4)];
    r4Tunnel("climb_top", "climb", (top.x + top.x1) / 2, top.y, "n4");
    r4Tunnel("climb_secret", "climb", (mid.x + mid.x1) / 2, mid.y, "under_in", null, true);
    rRelic("r4_pom_climb", "pomegranate", z[z.length - 3].c, onTop(z[z.length - 3].y));
  }
  // -- Beneath the Warren (the secret way): in at the right end from the Long Climb's crack; rats' tunnels under the Warren,
  //  drops, ledges, spiders; out at the left, the shaft up to the Camp
  c = R("under");
  { const rm = "under", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "dark", s, X(k), y);
    ground(c, c + 149);
    r4Tunnel("under_in", rm, X(145), G, "climb_secret");
    r4.wall = Object.assign(r4Might("r4_wall_under", c + 3, 4, X(3), X(7)), { room: rm, x: X(5) });   // (rubble across the way from the shaft: Goliath's sword, once he's been through the cave)
    if (!regionHas("taken", "r4_wall_under")) block(c + 3, 0, 4, GR, 6);   // (6: solid, no dirt drawn: his rubble shows)
    r4Jar(rm, c + 132); r4Jar(rm, c + 133); rRat(rm, c + 126, 4); r4Olives(L("m", 136, 500));
    for (const k of [14, 30, 52, 70, 96, 112]) rRat(rm, c + k, 4);
    L("m", 18, 500); r4Olives(L("l", 24, 390));
    r4Pit(rm, c + 34, 5);
    const u = r4Run(rm, "dark", X(42), 500, ["s", "m", "s"]); rRelic("r4_pom_under", "pomegranate", u[2].c, onTop(u[2].y));
    r4Pit(rm, c + 60, 10); L("s", 61, 510); r4Olives(L("s", 66, 510));
    r4Jar(rm, c + 76); r4Jar(rm, c + 77); r4Jar(rm, c + 78);
    r4Pit(rm, c + 84, 4, true);
    const f = r4Run(rm, "dark", X(92), 500, ["m", "m"], 0, 70); f.forEach(l => r4Olives(l));
    r4Pit(rm, c + 108, 3);
    rBat(rm, c + 40, 130); rBat(rm, c + 90, 130);
  }
  // -- The Shaft to the Camp: in at the bottom from Beneath the Warren, up the pale rock to the Camp's side cave
  c = R("campshaft");
  { ground(c, c + 39);
    const z = r4Zig("campshaft", "pale", 500, -1550, true, 1);
    z.forEach((l, i) => { if (i % 3 === 1) r4Olives(l); if (i % 4 === 3) r4Jar("campshaft", l.c, l.y); });
    const top = z[z.length - 1];
    r4Tunnel("cs_top", "campshaft", (top.x + top.x1) / 2, top.y, "camp_side");
  }

  // -- The Bats' Nook (the top of the Bat Roost): bats asleep on the roof; at the back, a Truth (Psalm 57, by David "when he
  //  fled from Saul, in the cave"; WEB, ebible.org)
  c = R("nook");
  { const rm = "nook", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "pale", s, X(k), y);
    ground(c, c + 45);
    r4Tunnel("nook_in", rm, X(5), G, "roost_side");
    for (const k of [12, 18, 24, 30, 36]) rBat(rm, c + k, 110 + (k % 12) * 4);
    L("m", 14, 500); r4Olives(L("l", 21, 390));
    const t = L("m", 31, 290);
    rRelic("r4_truth_nook", "truth", t.c, onTop(t.y), "Be merciful to me, God, be merciful to me, for my soul takes refuge in you. Yes, in the shadow of your wings, I will take refuge, until disaster has passed. (Psalm 57:1, by David, when he fled from Saul, in the cave)");
    r4Jar(rm, c + 41); r4Jar(rm, c + 42);
  }
  // -- The Rats' Larder (off the Warren, through the rubble): where the rats keep what they steal. A pomegranate at the back
  c = R("larder");
  { const rm = "larder", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "dark", s, X(k), y);
    ground(c, c + 49);
    r4Tunnel("larder_in", rm, X(5), G, "warren_side1");
    for (const k of [14, 22, 30, 38]) rRat(rm, c + k, 3);
    for (const k of [16, 17, 26, 27, 28]) r4Jar(rm, c + k);
    r4Pit(rm, c + 33, 3);
    const u = r4Run(rm, "dark", X(36), 500, ["s", "m"]); rRelic("r4_pom_larder", "pomegranate", u[1].c, onTop(u[1].y));
    oliveRow(c + 44, 16, 4);
  }
  // -- The Fallen Stones (off the Warren, through the rubble): a roof fallen in; a stone of remembrance on top of the heap
  c = R("stones");
  { const rm = "stones", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "dark", s, X(k), y);
    ground(c, c + 49);
    r4Tunnel("stones_in", rm, X(5), G, "warren_side2");
    for (const [k, sc] of [[16, 1.1], [27, 1.3], [38, 1.0]]) region.props.push({ room: rm, n: "w4_rubble_dark", x: X(k) - KIT.w4_rubble_dark.w * sc / 2, y: FOOT - KIT.w4_rubble_dark.h * sc + 14, s: sc });
    const u = r4Run(rm, "dark", X(13), 500, ["s", "m", "s"]); r4Olives(u[1]);
    rRelic("r4_stone_fallen", "stone", u[2].c, onTop(u[2].y));
    rSpider(rm, c + 24, 180); rCrawler(rm, c + 40, 4); rBat(rm, c + 32, 120);
  }
  // -- The Oil Store (the Four Tunnels' second arch): old jars along the wall, glowing cracks; an oil jar for the lamp
  c = R("oilstore");
  { const rm = "oilstore", X = k => (c + k) * T, L = (s, k, y) => r4L(rm, "red", s, X(k), y);
    ground(c, c + 45);
    r4Tunnel("oil_in", rm, X(5), G, "n2");
    for (const k of [12, 13, 14, 20, 21, 30, 31, 32]) r4Jar(rm, c + k);
    L("m", 16, 500); const u = L("l", 24, 390); r4Olives(u);
    const t = L("m", 34, 290); rRelic("r4_oil_store", "oil", t.c, onTop(t.y));
    rRat(rm, c + 26, 4); rSpider(rm, c + 38, 170);
  }

  // -- The 400 (1 Samuel 22:2): newcomers hiding around the cave, scared; Up by one, he gets up and goes to the camp. In
  //  the Camp from the start: men sitting and talking, an old man, men in distress, a frightened boy; and every newcomer
  //  sent there, standing with them. (Their words: drafts, for Glen)
  const NEW = [
    ["mouth", 62, 1, -1, "I owe more than I could ever pay. They'd sell my children for it. Is there room here for a man like me?", "There's room. Go up to the camp: the others are there."],
    ["lamphall", 70, 3, 1, "I'm too old to run any farther. Saul's men took everything I had.", "Then you don't have to run. Rest at the camp with us."],
    ["warren", 105, 4, -1, "Are you David? The one who killed the giant?", "The LORD did that. Go on to the camp. We'll stand together."],
    ["narrows", 47, 5, 1, "I heard men were gathering to you here. Is it true?", "Everyone in trouble is welcome. Go up to the camp."],
    ["under", 50, 2, -1, "I hid down here when they came for my father. I didn't know where else to go.", "You're not alone anymore. Come up to the camp."],
    ["spring", 40, 1, 1, "My lord, I'm bitter in soul. I've lost everything.", "So have we all. But God has not left us. Go to the camp."],
    ["nook", 10, 3, 1, "The bats are better company than Saul. Are you gathering men?", "I am. Go on to the camp."],
    ["stones", 30, 5, -1, "The roof came down behind me. I thought I'd die here.", "Not today. The way's open. Go to the camp."],
  ];
  NEW.forEach(([room, k, man, dir, say, reply], i) => r4.men.push({ id: "r4_man_" + i, room, x: (roomById(room).c0 + k) * T, y: FOOT, man: "soldier" + man, dir, say, reply, state: regionHas("taken", "r4_man_" + i) ? "gone" : "hide", t: 0 }));
  { const cc = roomById("camp").c0, at = k => (cc + k) * T;
    for (const [n, k, dir, f] of [["soldier_sit", 30, 1, 0], ["soldier_sit", 36, -1, 2], ["soldier_talk", 44, -1, 0], ["soldier2_fear", 53, 1, 0], ["boy_scared", 57, -1, 0], ["soldier_sit", 85, 1, 1], ["soldier4_fear", 92, -1, 0]])
      r4.men.push({ id: null, room: "camp", x: at(k), y: FOOT, still: n, f, dir, state: "camp", t: Math.random() * 3 });
    NEW.forEach((m, i) => r4.men.push({ id: null, room: "camp", x: at([40, 48, 61, 66, 72, 78, 97, 102][i]), y: FOOT, still: "soldier" + m[2] + "_fear", f: -1, dir: i % 2 ? 1 : -1, state: "camp", need: "r4_man_" + i, t: 0 }));
  }

  // (Glen 11-13: "we need spiders in these caves too") Part Two's spiders: on their threads over the way (they drop when
  //  he's under), and walking the floor
  const S = (room, k, y) => rSpider(room, roomById(room).c0 + k, y), Cw = (room, k, n = 4) => rCrawler(room, roomById(room).c0 + k, n);
  S("mouth", 58, 190); S("mouth", 102, 170); Cw("mouth", 88);
  S("camp", 80, 180);
  S("lamphall", 20, 160); S("lamphall", 82, 180); S("lamphall", 120, 170); Cw("lamphall", 105, 5); Cw("lamphall", 146, 4);
  S("warren", 30, 170); S("warren", 68, 180); S("warren", 120, 160); S("warren", 162, 180); Cw("warren", 35, 5); Cw("warren", 110, 4); Cw("warren", 175, 3);
  S("narrows", 22, 170); S("narrows", 60, 180); S("narrows", 95, 170); Cw("narrows", 50, 4); Cw("narrows", 100, 5);
  S("ledges", 12, 300); S("roost", 30, 200); S("spring", 30, 180); Cw("spring", 60, 5); S("spring", 120, 170); S("spring", 175, 180); Cw("spring", 150, 5);
  S("under", 20, 170); S("under", 48, 180); S("under", 100, 170); Cw("under", 74, 4); S("climb", 20, 300);
  for (let i = region.props.length; i--;) if (region.props[i].n === "p_left" || region.props[i].n === "p_right") region.props.splice(i, 1);   // (r4Floor draws the drops)
  roomImg("w4/pit.png");   // (his pit picture: loading before he comes to one)
}

function r4Enter(r) {
  r4.swim = null; r4.breath = R4.SWIM.BREATH;
  for (const f of r4.fish) if (f.room === r.id) Object.assign(f, { gone: false, x: (f.x0 + f.x1) / 2, y: f.y0, state: "swim" });   // (back again when he comes back)
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
  for (const q of r3.chips) { q.t += dt; q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 1400 * dt; }
  r3.chips = r3.chips.filter(q => q.t < q.life);
  if (r4.wall) r4.wall.shake = Math.max(0, r4.wall.shake - dt);
  for (const o of r4.tunnels) if (o.blocked && o.might.broken) {   // (broken: the rubble's gone, the way in open)
    o.blocked = false; const i = region.props.indexOf(o.rubble); if (i >= 0) region.props.splice(i, 1);
  }
  if (r3.might) { r3MightUpdate(dt); return; }
  if (r.water) r4Fish(dt, r);
  if (w) {
    w.t += dt; d.vx = 0;
    if (!w.gone && w.t >= U.TURN) {
      w.gone = true; const to = r4.tunnels.find(o => o.id === w.tun.to);   // (out of the tunnel it joins)
      regionGo(to.x, 1, () => { r4.walk = null; d.y = to.y; d.vy = 0; region.camFootY = to.y; snapCamera(); });
    }
    return;
  }
  // the rubble across the way into Beneath the Warren: shut till he's been all through the cave (up the Long Climb), then
  //  Goliath's sword breaks it (Up), for good
  const Wl = r4.wall;
  if (Wl && Wl.room === r.id && !regionHas("taken", "r4_wall_under") && Math.abs(d.x - Wl.x) < R4.WALL.REACH && d.onGround) {
    if (!r4WallOpen()) r4Tell("wall_shut", "Rubble fills the way here. Too much to move... for now.");
    else { r4Tell("wall_might", "Rubble across the way. Up by it, then mash A and B to swing Goliath's sword!"); if (pressed("up") && !region.trans) { r3MightStart(Wl); return; } }
  }
  // the 400: getting up and going to the camp
  for (const m of r4.men) {
    if (m.room !== r.id) continue; m.t += dt;
    if (m.state === "rise" && m.t >= R4.MEN.RISE) { m.state = "go"; m.t = 0; }
    else if (m.state === "go") { m.x += m.dir * R4.MEN.WALK * dt; if (m.t >= R4.MEN.GO) m.state = "gone"; }
  }
  const man = r4.men.find(m => m.room === r.id && m.state === "hide" && Math.abs(d.x - m.x) < R4.MEN.NEAR && Math.abs(d.y - m.y) < 80);
  if (man && pressed("up") && d.onGround && !region.trans) {
    regionAdd("taken", man.id); const n = r4.men.filter(m => m.id && regionHas("taken", m.id)).length, all = r4.men.filter(m => m.id).length;
    rPlay([{ say: ["", man.say] }, { say: ["David", man.reply] },
      { fn() { man.state = "rise"; man.t = 0; man.dir = Math.sign((roomById("camp").c0 * T) - man.x) || man.dir; toast(`Everyone in distress gathered to David: ${n} of ${all} found. The camp is growing.`); } }]);
    return;
  }
  // a secret way: a breath of cool air when he's near it
  for (const o of r4.tunnels) if (o.secret && o.room === r.id && Math.abs(d.x - o.x) < 110 && Math.abs(d.y - o.y) < 80)
    r4Tell("secret_" + o.id, "Cool air is blowing out of a crack in the rock here... (Up)");
  // the lamp, on its ledge in the Lamp Hall
  const L = r4.lampAt;
  if (L && L.room === r.id && !r4Lamp() && Math.abs(d.x - L.x) < 50 && Math.abs(d.y - L.y) < 60) {
    regionAdd("taken", "r4_lamp"); toast("David takes the oil lamp. “Your word is a lamp to my feet, and a light for my path.” (Psalm 119:105)");
  }
  // its oil: an olive from the flask every few seconds, in the dark
  if (r.dark > 0.6 && r4Lamp() && d.olives > 0) { r4.oilT += dt; if (r4.oilT >= R4.DARK.OIL_EVERY) { r4.oilT = 0; d.olives--; } }
  if (!pressed("up") || region.trans || d.deadT > 0 || (!d.onGround && !r4.swim)) return;
  // (Glen 11-13: "When I get to this part to hit up ... David just stays swimming") in the water, anywhere over it counts
  const tun = r4.tunnels.find(o => o.room === r.id && Math.abs(d.x - o.x) < U.REACH && (r4.swim ? d.y < o.y + 10 && o.y - d.y < U.SWIM_HIGH : Math.abs(d.y - o.y) < U.HIGH));
  if (!tun) return;
  if (!tun.to) { r4Tell("side" + tun.x, "A side cave. Not open yet: still to explore."); return; }
  if (tun.blocked) {   // rubble across a side cave: Goliath's sword breaks it (test your might)
    if (!hasSkill("heavySword")) { r4Tell("rubble" + tun.id, "Rubble across the way in. Something heavy could break it."); return; }
    r3MightStart(tun.might); return;
  }
  if (r4.swim) {   // (Glen 11-13: "up should just make him go to the next room" under the water: no standing, no turn)
    const to = r4.tunnels.find(o => o.id === tun.to);
    regionGo(to.x, d.facing, () => { d.y = to.y; d.vy = 0; region.camFootY = Math.min(to.y, GR * T); snapCamera(); });
    return;
  }
  r4.swim = null; r4.walk = { tun, t: 0, x: d.x }; d.vx = 0; d.charging = false;   // (held still meanwhile: r4Hold)
}

// ---- swimming (Glen's david_swim): below the waterline he swims; A a stroke up, Up / Down; breath while he's under
function r4Hold(d, dt) {
  if (r4.walk) { d.vx = d.vy = 0; return true; }
  const r = roomAt(d.x); if (!r || !r.water || r !== region.room || d.deadT > 0 || region.trans) { r4.swim = null; return false; }   // (moved to another room: not this one's water)
  const S = R4.SWIM, wy = r.water, lid = r4LidAt(r, d.x), top = lid ? Math.max(wy + S.FLOAT, lid.y + R4.LID.UNDER) : wy + S.FLOAT;
  if (r4.leapT > 0) { r4.leapT -= dt; if (d.vy < 0) return false; }   // (leaping out: not back into the water on the way up)
  if (!r4.swim) {
    if (d.y < wy + 40 || d.onGround && d.y < wy + S.FLOAT) { r4.breath = Math.min(S.BREATH, r4.breath + dt * 4); return false; }
    r4.swim = { t: 0 }; d.vy = Math.min(d.vy, 120); setState("idle");
  }
  const sw = r4.swim;
  const dir = (held("right") ? 1 : 0) - (held("left") ? 1 : 0);
  const still = !(dir || held("up") || held("down") || pressed("a"));
  sw.t += dt * (still ? R4.SWIM.TREAD : 1); sw.tt = (sw.tt || 0) + dt;   // (still: a slow, resting stroke under the water)
  d.vx = dir * S.X; if (dir) d.facing = dir;
  d.vy += S.SINK * dt;
  if (pressed("a")) { if (!lid && d.y <= top + S.LEAP_NEAR) { r4.swim = null; r4.leapT = 0.5; d.vy = -S.LEAP; d.onGround = false; setState("jump"); return false; } d.vy = -S.STROKE; }
  if (held("up")) d.vy -= S.PUSH * dt; if (held("down")) d.vy += S.PUSH * dt;
  d.vy = Math.max(-S.MAXV, Math.min(S.MAXV, d.vy));
  const x0 = r.c0 * T + 20, x1 = (r.c0 + r.w) * T - 20;
  let nx = Math.max(x0, Math.min(x1, d.x + d.vx * dt));
  const nl = r4LidAt(r, nx); if (nl && nl !== lid && d.y < nl.y + R4.LID.UNDER - 2) nx = d.x;   // (the rock: dive to get under it)
  d.x = nx;
  d.y += d.vy * dt;
  if (d.y < top) { d.y = top; if (d.vy < 0) d.vy = 0; }
  if (d.y > GR * T) { d.y = GR * T; d.vy = 0; }
  if (still && !lid && d.y < top + R4.SWIM.FLOAT_NEAR) { d.vy = 0; d.y += (top - d.y) * Math.min(1, dt * 4); }   // (still near the top: he floats up and rests there)
  sw.tread = still && !lid && d.y <= top + 8;   // (Glen 11-13: still at the surface: his treading-water clip)
  d.onGround = d.y >= GR * T - 1; d.fallTop = null; d.shield = false; d.charging = false;
  if (typeof updateSword === "function" && regionSword()) updateSword(d, dt, false);   // (Glen 11-13: "I need to have a sword attack" in the water)
  // breath: at the surface it comes back; under, it runs out
  if (!lid && d.y <= top + 6) r4.breath = Math.min(S.BREATH, r4.breath + dt * 4);
  else { r4.breath -= dt; if (r4.breath <= 0) { r4.breath = S.AFTER; hurtDavid(d.x, "", true); toast("Out of breath! Swim up for air."); } }
  return true;
}

function r4DrawDavid(d, x, y) {
  const w = r4.walk, U = R4.TUNNEL;
  if (r3.might) return r3DrawDavid(d, x, y);
  if (w) {
    // (Glen 11-13: "for effect he could turn like he is going in") his back-turn clip (david_turn_away is only his side),
    //  held on its last frame, his back to us, till the cut
    const n = SPR.david_back_turn ? "david_back_turn" : "david_turn_away", f = SPR[n] ? SPR[n].frames : 8;
    drawSprite(n, Math.min(f - 1, Math.floor(w.t / U.TURN * f)), x, y, d.facing);
    return true;
  }
  if (r4.swim && d.swordT >= 0) {   // (Glen 11-13: "a good swipe with the sword" in the water: his clip, over the swing's time)
    const n = SPR.david_swim_sword ? SPR.david_swim_sword.frames : 12;
    drawSprite("david_swim_sword", Math.min(n - 1, Math.floor(d.swordT / W9.SWORD_TIME * n)), x, y - 50, d.facing, R4.SWIM.K); return true;
  }
  if (r4.swim && r4.swim.tread) { drawSprite("david_tread", frameOf("david_tread", r4.swim.tt), x, y, d.facing); return true; }
  if (r4.swim) { drawSprite("david_swim2", frameOf("david_swim2", r4.swim.t), x, y - 50, d.facing, R4.SWIM.K); return true; }   // (Glen 11-13: his better swim)
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
  const im = roomImg(r.pics ? r.pics[r4CampStage()] : r.pic);
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
    const mid = roomImg(r.mid); if (mid) { const mk = h / mid.naturalHeight; tiles(mid, B.MID_P, yb - h, mid.naturalWidth * mk, h); }   // (as tall as his picture)
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
  // (Glen 11-13: "a black space from background to topsoil floor") the dark under his floor only from where it's solid
  ctx.fillStyle = "#14100c"; ctx.fillRect(rx, y + (R4.FLOOR_SOLID[r.ground] ?? h), rw, H + 400);
  for (let i = 0; i * w < rw; i++) {
    const x = Math.round(rx + i * w);
    if (x > W || x + w < 0) continue;
    if (i & 1) { ctx.save(); ctx.translate(x + w, 0); ctx.scale(-1, 1); ctx.drawImage(fl, 0, y, w, h); ctx.restore(); }
    else ctx.drawImage(fl, x, y, w, h);
  }
  for (const o of region.holes) {   // a drop in the floor: dark, soft at its edges (no kit edges in the caves)
    if (o.room !== r.id) continue;
    const x0 = o.x0 - camX - 14, x1 = o.x1 - camX + 14; if (x1 < 0 - 200 || x0 > W + 200) continue;
    const pit = R4.PIT.GROUNDS.includes(r.ground) && roomImg("w4/pit.png");
    if (pit) { r4Pit2(pit, o.x0 - camX, o.x1 - camX, y); continue; }
    const g = ctx.createLinearGradient(x0, 0, x1, 0), e = Math.min(0.3, 30 / (x1 - x0));
    g.addColorStop(0, "rgba(4,3,2,0)"); g.addColorStop(e, "rgba(4,3,2,0.97)"); g.addColorStop(1 - e, "rgba(4,3,2,0.97)"); g.addColorStop(1, "rgba(4,3,2,0)");
    ctx.fillStyle = g; ctx.fillRect(x0, y + 50, x1 - x0, H + 400);
    for (let i = 0; i < 8; i++) { ctx.globalAlpha = (i + 1) / 9; ctx.fillRect(x0, y + 10 + i * 5, x1 - x0, 5); }   // (its top edge soft too)
    ctx.globalAlpha = 1;
  }
  ctx.restore();
  return true;
}
// his pit picture down a hole from a0 to a1 (screen x), the floor picture's top at y: dark behind it first (it narrows
//  at the bottom), then his back wall across the hole and a stone lip each side
function r4Pit2(im, a0, a1, y) {
  const P = R4.PIT, k = P.KX, iw = im.naturalWidth, ih = im.naturalHeight, rim = y + P.RIM, top = rim - P.TOP * P.KY, h = ih * P.KY;
  ctx.fillStyle = "#050302"; ctx.fillRect(a0, rim, a1 - a0, H + 400);
  ctx.drawImage(im, P.L, 0, P.R - P.L, ih, a0, top, a1 - a0, h);
  ctx.drawImage(im, 0, 0, P.L, ih, a0 - P.L * k, top, P.L * k, h);
  ctx.drawImage(im, P.R, 0, iw - P.R, ih, a1, top, (iw - P.R) * k, h);
  const g = ctx.createLinearGradient(0, rim + 10, 0, rim + P.DARK);   // (darker the deeper)
  g.addColorStop(0, "rgba(5,3,2,0)"); g.addColorStop(1, "rgba(5,3,2,0.95)");
  ctx.fillStyle = g; ctx.fillRect(a0, rim + 10, a1 - a0, H + 400);
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
// the rubble across the way into Beneath the Warren: his dark pile, big, and another on top
function r4DrawWall(camX) {
  const Wl = r4.wall; if (!Wl || Wl.room !== region.room.id || regionHas("taken", "r4_wall_under")) return;
  const im = kitImg("w4_rubble_dark"), k = KIT.w4_rubble_dark, x = Wl.x - camX + (Wl.shake > 0 ? (Math.random() - 0.5) * 10 : 0); if (!im || x < -400 || x > W + 400) return;
  const B = R4.WALL.BIG, U = R4.WALL.TOP;
  ctx.drawImage(im, Math.round(x - k.w * B / 2), Math.round(GR * T + 16 - k.h * B), k.w * B, k.h * B);
  ctx.save(); ctx.translate(Math.round(x + 10), 0); ctx.scale(-1, 1);
  ctx.drawImage(im, -k.w * U / 2, Math.round(GR * T + 16 - k.h * B * 0.8 - k.h * U), k.w * U, k.h * U); ctx.restore();
}
// the 400: hiding (his first frame, shivering when David's not close), getting up (his clip), walking off (fading); in
//  the Camp: sitting, talking, huddled, and the newcomers standing (their last frame)
function r4DrawMen(camX) {
  const now = performance.now() / 1000;
  for (const m of r4.men) {
    if (m.room !== region.room.id || m.state === "gone") continue;
    const x = m.x - camX; if (x < -200 || x > W + 200) continue;
    if (m.state === "camp") {
      if (m.need && !regionHas("taken", m.need)) continue;
      const S = SPR[m.still]; if (!S) continue;
      const f = m.f < 0 ? S.frames - 1 : m.still === "soldier_sit" || m.still === "soldier_talk" || m.still === "boy_scared" ? frameOf(m.still, now + m.t) : m.f;
      drawSprite(m.still, f, x + (m.f === 0 && /_fear$/.test(m.still) ? Math.sin(now * 40) * 1.2 : 0), m.y, m.dir); continue;
    }
    const fear = m.man + "_fear", go = m.man + "_go", F = SPR[fear]; if (!F) continue;
    if (m.state === "hide") drawSprite(fear, 0, x + (Math.abs(david.x - m.x) > 3 * T ? Math.sin(now * 40) * 1.2 : 0), m.y, m.dir);
    else if (m.state === "rise") drawSprite(fear, Math.min(F.frames - 1, Math.floor(m.t / R4.MEN.RISE * F.frames)), x, m.y, m.dir);
    else if (m.state === "go" && SPR[go]) drawSprite(go, frameOf(go, m.t), x, m.y, m.dir, 1, Math.max(0, 1 - m.t / R4.MEN.GO));
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
  if (!r4.walk && !region.trans) for (const o of r4.tunnels) if (o.to && !o.secret && o.room === r.id && Math.abs(d.x - o.x) < 140 && Math.abs(d.y - o.y) < 160) upHint(o.x - camX, o.y - 200);
  for (const m of r4.men) if (m.room === r.id && m.state === "hide" && !r4.walk && Math.abs(d.x - m.x) < R4.MEN.NEAR * 1.5) upHint(m.x - camX, m.y - 230);
  const Wl = r4.wall;
  if (Wl && Wl.room === r.id && !r4.walk && r4WallOpen() && !regionHas("taken", "r4_wall_under") && Math.abs(d.x - Wl.x) < R4.WALL.REACH) upHint(Wl.x - camX, GR * T - 300);
  const L = r4.lampAt, li = kitImg("w4_lamp"); if (L && L.room === r.id && !r4Lamp() && li) ctx.drawImage(li, L.x - camX - 39, L.y - 55, 78, 55);   // (the lamp, till he takes it)
  if (r4.swim || r4.breath < R4.SWIM.BREATH - 0.05) {   // his breath, over his head
    const k = Math.max(0, r4.breath / R4.SWIM.BREATH), x = d.x - camX - 40, y = d.y - 150;
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(x - 2, y - 2, 84, 12);
    ctx.fillStyle = k > 0.3 ? "#7fd8ff" : "#ff6a5a"; ctx.fillRect(x, y, 80 * k, 8);
  }
}
