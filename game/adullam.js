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
  PROP_K: 0.55,      // the camp's jars, bedrolls and baskets, next to their cut size
  // (Glen 11-13: "an up arrow to go into the cave deeper") a tunnel into the picture: Up by it, he turns his back
  //  (TURN s, Glen's david_turn_away) and walks in, smaller and fading (WALK s, SHRINK, RISE px up the picture); REACH:
  //  px from the tunnel's middle that counts as at it (and HIGH px of height)
  TUNNEL: { TURN: 0.7, WALK: 0.9, SHRINK: 0.25, RISE: 14, REACH: 60, HIGH: 60 },
  // the dark below the Lamp Hall: how black (0-1); the lamp's light (px) with olives in the flask, with none, and with no
  //  lamp at all; a tunnel's faint glow (px); seconds of light per olive (as Part One's caves)
  DARK: { LAMP: 300, DIM: 130, NONE: 60, GLOW: 70, OIL_EVERY: 5 },
  // (Glen 11-13: "swimming ... breath meter ... reach further down areas swimming under stuff") in the water: sideways
  //  speed, a stroke's push up (A), Up / Down held, the slow sink, the most speed up or down; at the surface his feet
  //  this far under the waterline (head out); a jump out of the water (A at the surface); breath (s) and what's left
  //  after running out (s, and a heart lost)
  SWIM: { X: 170, STROKE: 230, PUSH: 420, SINK: 160, MAXV: 260, FLOAT: 70, LEAP: 640, BREATH: 10, AFTER: 3 },
};

const ADULLAM = {
  key: "adullam", name: "The Cave of Adullam", start: "mouth", carry: ["gibeah", "ramah", "nobgath"],
  strCap: 8,
  rooms: [
    // UPPER: daylight
    //  (Glen's cave mouth: the hills outside on the left, a pool, the tunnel on in at the right: Up, not the edge)
    { id: "mouth", name: "The Cave Mouth", w: 62, cave: true, mx: 0, my: 1, mw: 2,
      strip: "w4/mouth_strip", floor: "w4/mouth_floor" },
    //  (his hall of sunbeams through the roof, deeper in; its left end back out the tunnel)
    { id: "camp", name: "The Camp", w: 79, cave: true, mx: 2, my: 1, mw: 2, left: "mouth", right: "roost",
      strip: "w4/camp_strip", floor: "w4/camp_floor" },
    //  (his pale wall of mossy ledges, tall: bats under the stalactites)
    { id: "roost", name: "The Bat Roost", w: 36, up: 52, cave: true, mx: 4, my: 0, mw: 1, mh: 2, left: "camp", right: "lamphall",
      tall: "w4/roost_tall", floor: "w4/roost_floor" },
    //  (his set 1, Mario-style layers: the cracked wall with its torches far off, the columns, the rubble in front)
    { id: "lamphall", name: "The Lamp Hall", w: 72, cave: true, mx: 5, my: 1, mw: 2, left: "roost", dark: 0.45,
      far: "w4/lamp/far", mid: "w4/lamp/mid.png", midP: 0.45, near: "w4/lamp/near.png", nearY: 700, floor: "w4/lamp/floor" },
    // MIDDLE: dark
    { id: "warren", name: "The Rat Warren", w: 71, cave: true, mx: 5, my: 2, mw: 2, right: "narrows", dark: 0.93,
      strip: "w4/warren_strip", floor: "w4/warren_floor" },
    { id: "narrows", name: "The Four Tunnels", w: 36, cave: true, mx: 7, my: 2, mw: 1, left: "warren", dark: 0.93,
      strip: "w4/narrows_strip", floor: "w4/narrows_floor" },
    { id: "ledges", name: "The Crumbling Ledges", w: 36, up: 52, cave: true, mx: 8, my: 1, mw: 1, mh: 2, dark: 0.9,
      tall: "w4/ledges_tall", floor: "w4/ledges_floor" },
    //  (his sunlit shaft: the sky at the top, ropes and ledges all the way down, a pool at the bottom)
    { id: "well", name: "The Old Well Shaft", w: 36, up: 124, cave: true, mx: 9, my: 1, mw: 1, mh: 3, right: "river", dark: 0.35,
      tall: "w4/well_tall", floor: "w4/well_floor" },
    // LOWER: water (water: the waterline, px from the screen's top)
    { id: "river", name: "The Underground River", w: 36, cave: true, mx: 10, my: 3, mw: 1, left: "well", right: "flooded", dark: 0.9, water: 418,
      strip: "w4/river_strip", floor: "w4/river_floor" },
    { id: "flooded", name: "The Flooded Tunnel", w: 36, cave: true, mx: 11, my: 3, mw: 1, left: "river", dark: 0.92, water: 382,
      strip: "w4/flooded_strip", floor: "w4/flooded_floor" },
    { id: "deep", name: "The Deep Pool", w: 80, cave: true, mx: 12, my: 3, mw: 2, left: "flooded", right: "spring", dark: 0.92, water: 453,
      strip: "w4/deep_strip", floor: "w4/deep_floor" },
    //  (his lake hall: the jars on the shore; the end of the cave)
    { id: "spring", name: "The Hidden Spring", w: 36, cave: true, mx: 14, my: 3, mw: 1, left: "deep", dark: 0.8,
      strip: "w4/spring_strip", floor: "w4/spring_floor" },
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
  backdrop: (r, camX) => r4Backdrop(r, camX), drawFront: camX => r4DrawFront(camX),
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
};
const R4_TALL = { roost: 2592, ledges: 2592, well: 5184 };   // (make_w4_rooms.py: the tall pictures' heights at the room's width, 1296)

const r4 = { told: {}, tunnels: [], walk: null, swim: null, breath: R4.SWIM.BREATH, oilT: 0, lampAt: null };
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
// a ledge painted in the picture: walkable from x0 to x1 (px), at y (px)
function r4Painted(x0, x1, y) { const c0 = Math.ceil(x0 / T), c1 = Math.floor(x1 / T); platAt(c0, y, Math.max(1, c1 - c0)); }
// a thing of the camp's, standing on the ground (or on a ledge's surface y), centered on x (px)
function r4Thing(room, n, x, y = FOOT, k = R4.PROP_K) {
  const s = KIT[n]; region.props.push({ room, n, x: x - s.w * k / 2, y: y - s.h * k + 4, s: k });
}
// a tunnel into the picture at x (px), its floor at y (px), in a room: Up there, he walks in and comes out in room `to`
//  at column k (and height ty, px, if not the ground). to null: a side cave still to be made
function r4Tunnel(room, x, y, to, k = 3, ty = null) { r4.tunnels.push({ room, x, y, to, k, ty }); }

function r4Build(R) {
  Object.assign(KIT, R4_KIT);
  r4.tunnels.length = 0; r4.walk = null; r4.swim = null;
  for (const r of ADULLAM.rooms) for (const k of ["tall", "strip", "far", "mid", "near"]) roomImg(r[k]);   // (fetched now: the tall pictures are big)

  // -- The Cave Mouth (22:1): in from the hills of Judah. A few ledges up the rock by the pool; the way on in
  let c = R("mouth");
  { const X = k => (c + k) * T;
    ground(c, c + 61);
    campfire(c + 4, GR - 1);   // (the olive press: the save)
    oliveRow(c + 8, 16, 4);
    r4Ledge("mouth", "w4_ledge_sand_m", X(22), FOOT - 150);
    const b = r4Ledge("mouth", "w4_ledge_sand_l", X(29), FOOT - 300);
    oliveRow(c + 31, onTop(b) - 0.4, 4);
    r4Ledge("mouth", "w4_ledge_sand_s", X(39), FOOT - 190);
    rRelic("r4_pom_mouth", "pomegranate", c + 33, onTop(b));
    r4Thing("mouth", "w4_rocks_sand", X(46));
    r4Thing("mouth", "w4_stalagmites", X(52), FOOT, 0.9);
    r4Tunnel("mouth", X(58) + T / 2, GR * T, "camp", 3);   // (the tunnel in his picture, on in: the Camp)
  }

  // -- The Camp (22:2): the great hall of sunbeams. The men's things: bedrolls, jars, baskets, bread. Ledges up the wall
  c = R("camp");
  { const X = k => (c + k) * T;
    ground(c, c + 78);
    campfire(c + 12, GR - 1);
    r4Thing("camp", "w4_bedroll", X(6)); r4Thing("camp", "w4_bag", X(9));
    r4Thing("camp", "w4_jar_big", X(17)); r4Thing("camp", "w4_pitcher", X(19)); r4Thing("camp", "w4_pot", X(21));
    r4Thing("camp", "w4_basket", X(26)); r4Thing("camp", "w4_bread", X(28)); r4Thing("camp", "w4_bowl", X(30));
    r4Thing("camp", "w4_bedroll", X(36)); r4Thing("camp", "w4_waterskin", X(39));
    r4Ledge("camp", "w4_ledge_sand_m", X(44), FOOT - 160);
    const b = r4Ledge("camp", "w4_ledge_sand_l", X(50), FOOT - 310, true);
    r4Thing("camp", "w4_pot", X(54), b);
    r4Ledge("camp", "w4_ledge_sand_s", X(59), FOOT - 200);
    oliveRow(c + 51, onTop(b) - 0.4, 3);
    r4Thing("camp", "w4_jar_big", X(66)); r4Thing("camp", "w4_basket", X(69)); r4Thing("camp", "w4_bedroll", X(72));
    r4Tunnel("camp", X(34), GR * T, null);   // (a side cave off the camp)
  }

  // -- The Bat Roost: his tall pale wall. Its painted ledges (measured on the picture: y = picture's - 1872), three of
  //  the kit's where a gap was too big; bats asleep under the ledges; a side cave at the top, a pomegranate by it
  c = R("roost");
  { const X = k => (c + k) * T, x0 = c * T, P = (a, b, y) => r4Painted(x0 + a, x0 + b, y);
    ground(c, c + 35);
    P(150, 1150, 158); P(1000, 1296, -52); P(0, 800, -272); P(380, 1150, -632); P(0, 330, -842); P(0, 1100, -1182);
    r4Ledge("roost", "w4_ledge_sand_m", x0 + 520, 400); r4Ledge("roost", "w4_ledge_sand_s", x0 + 940, -470); r4Ledge("roost", "w4_ledge_sand_s", x0 + 520, -1020);
    oliveRow(c + 3, onTop(-272) - 0.4, 5);
    rRelic("r4_pom_roost", "pomegranate", c + 24, onTop(-1182));
    r4Tunnel("roost", x0 + 300, -1182, null);
    for (const [k, y] of [[6, 175], [14, 175], [24, 175], [9, -180], [18, -540], [28, -530], [5, -1090], [20, -1400], [30, -1400]]) rBat("roost", c + k, y);
  }

  // -- The Lamp Hall: his set 1, the torches in the wall. The lamp on a ledge (it lights the way down); bats; the stairs
  //  up into the tunnel at the end, down into the dark
  c = R("lamphall");
  { const X = k => (c + k) * T;
    ground(c, c + 71);
    campfire(c + 4, GR - 1);
    oliveRow(c + 8, 16, 4);
    r4Ledge("lamphall", "w4_ledge_red_m", X(16), FOOT - 150);
    const b = r4Ledge("lamphall", "w4_ledge_red_l", X(22), FOOT - 300);
    r4.lampAt = { room: "lamphall", x: X(25) + 10, y: b };
    r4Ledge("lamphall", "w4_ledge_red_s", X(32), FOOT - 190);
    oliveRow(c + 36, 16, 6);
    rRat("lamphall", c + 42, 5); rBat("lamphall", c + 30, 120); rBat("lamphall", c + 47, 140);
    r4Thing("lamphall", "w4_rocks_red", X(50), FOOT, 0.8);
    const k = KIT.w4_stairs_tunnel; region.props.push({ room: "lamphall", n: "w4_stairs_tunnel", x: X(56), y: FOOT - k.h + 8 });
    r4Tunnel("lamphall", X(56) + 270, GR * T, "warren", 22, 468);   // (up the stairs into the dark: the Rat Warren's middle tunnel)
  }

  // -- The Rat Warren: his dark wall of tunnel mouths, twice over. Painted shelves to the mouths (a kit ledge up to the
  //  first); rats on the floor; the middle mouth back up to the Lamp Hall, the rest side caves
  c = R("warren");
  { const X = k => (c + k) * T, x0 = c * T;
    ground(c, c + 70);
    for (const o of [0, 1279]) {
      r4Painted(x0 + o, x0 + o + 400, 388); r4Painted(x0 + o + 690, x0 + o + 1000, 468); r4Painted(x0 + o + 1050, x0 + o + 1279, 495);
      r4Ledge("warren", "w4_ledge_dark_s", x0 + o + 420, 500);
    }
    r4Tunnel("warren", x0 + 800, 468, "lamphall", 66);
    r4Tunnel("warren", x0 + 70, 388, null); r4Tunnel("warren", x0 + 1180, 495, null); r4Tunnel("warren", x0 + 1279 + 800, 468, null);
    for (const k of [10, 24, 38, 52, 62]) rRat("warren", c + k, 4);
    for (const k of [15, 33, 48]) rBat("warren", c + k, 140);
    oliveRow(c + 21, onTop(468) - 0.4, 4); oliveRow(c + 57, onTop(468) - 0.4, 4);
    rRelic("r4_pom_warren", "pomegranate", c + 37, onTop(388));
  }

  // -- The Four Tunnels: his four arches. Pick one: the first back to the Warren, the third on to the Crumbling Ledges,
  //  the other two side caves
  c = R("narrows");
  { const x0 = c * T;
    ground(c, c + 35);
    r4Tunnel("narrows", x0 + 160, GR * T, "warren", 3); r4Tunnel("narrows", x0 + 490, GR * T, null);
    r4Tunnel("narrows", x0 + 800, GR * T, "ledges", 4); r4Tunnel("narrows", x0 + 1105, GR * T, null);
    rRat("narrows", c + 12, 4); rRat("narrows", c + 26, 3);
  }

  // -- The Crumbling Ledges: his dark wall of stone bands, tall. Up it (kit ledges where a band's too far), to the tunnel
  //  at the top: on to the top of the Old Well Shaft
  c = R("ledges");
  { const x0 = c * T, P = (a, b, y) => r4Painted(x0 + a, x0 + b, y);
    ground(c, c + 35);
    P(100, 1250, 148); P(100, 1250, -232); P(0, 1100, -652); P(300, 1200, -972); P(150, 1296, -1232); P(0, 1200, -1472); P(200, 1296, -1707);
    r4Ledge("ledges", "w4_ledge_dark_m", x0 + 560, 380); r4Ledge("ledges", "w4_ledge_dark_s", x0 + 200, -40);
    r4Ledge("ledges", "w4_ledge_dark_m", x0 + 900, -440); r4Ledge("ledges", "w4_ledge_dark_s", x0 + 420, -820);
    for (const [k, y] of [[8, 60], [22, -330], [12, -760], [27, -1100], [16, -1580]]) rBat("ledges", c + k, y);
    rRat("ledges", c + 14, 6);
    oliveRow(c + 10, onTop(-972) - 0.4, 5);
    r4Tunnel("ledges", x0 + 1100, -1707, "well", 6, -3767);
    rRelic("r4_pom_ledges", "pomegranate", c + 6, onTop(-1472));
  }

  // -- The Old Well Shaft: his sunlit shaft, very tall. In at the top, down the ledges (measured at 1116 wide, x1.161;
  //  y = that - 4464) to the pool at the bottom; out at the bottom to the river
  c = R("well");
  { const x0 = c * T, s = 1296 / 1116, P = (y, a, b) => r4Painted(x0 + a * s, x0 + b * s, Math.round(y * s) - 4464);
    ground(c, c + 35);
    for (const [y, a, b] of [[600, 100, 440], [525, 850, 1116], [790, 640, 900], [880, 0, 260], [990, 850, 1116], [1180, 650, 1000],
      [1415, 140, 470], [1590, 620, 1000], [1640, 0, 260], [1880, 100, 480], [2085, 600, 1050], [2400, 590, 930], [2650, 0, 540],
      [2950, 600, 1000], [3170, 0, 560], [3380, 580, 1060], [3620, 100, 560], [3870, 580, 1050], [4040, 0, 260]]) P(y, a, b);
    for (const [k, y] of [[18, -3300], [10, -2400], [24, -1500], [14, -700]]) rBat("well", c + k, y);
    rRelic("r4_pom_well", "pomegranate", c + 30, onTop(Math.round(2085 * s) - 4464));
  }

  // -- The Underground River: his pool, seen above and below the water. Ledges of moss on each side, over the water
  c = R("river");
  { const x0 = c * T;
    ground(c, c + 35);
    r4Ledge("river", "w4_ledge_moss_m", x0 + 10, 330); r4Ledge("river", "w4_ledge_moss_m", x0 + 1080, 350);
    oliveRow(c + 14, 15, 6);
  }
  // -- The Flooded Tunnel: under the water, the tunnel at the bottom (Up there: on through to the Deep Pool)
  c = R("flooded");
  { const x0 = c * T;
    ground(c, c + 35);
    r4Ledge("flooded", "w4_ledge_moss_s", x0 + 40, 300); r4Ledge("flooded", "w4_ledge_moss_s", x0 + 1120, 300);
    r4Tunnel("flooded", x0 + 650, GR * T, "deep", 4);
    rRelic("r4_pom_flooded", "pomegranate", c + 33, onTop(300));
  }
  // -- The Deep Pool: long, deep, and dark; rests of moss over the water
  c = R("deep");
  { const x0 = c * T;
    ground(c, c + 79);
    for (const x of [300, 1000, 1700, 2400]) r4Ledge("deep", "w4_ledge_moss_m", x0 + x, 330);
    for (const k of [12, 30, 48, 66]) oliveRow(c + k, 15, 3);
  }
  // -- The Hidden Spring: the end of the cave. (Next: the water from Bethlehem; Gad the prophet: on to Judah)
  c = R("spring");
  { ground(c, c + 35);
    campfire(c + 4, GR - 1);
  }
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
  if (w) {
    w.t += dt; d.vx = 0;
    if (!w.gone && w.t >= U.TURN + U.WALK) {
      w.gone = true; const n = roomById(w.tun.to), ty = w.tun.ty;
      regionGo((n.c0 + w.tun.k) * T, 1, () => { r4.walk = null;
        if (ty != null) { d.y = ty; d.vy = 0; region.camFootY = ty; snapCamera(); } });
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
  const S = R4.SWIM, wy = r.water, top = wy + S.FLOAT;
  if (!r4.swim) {
    if (d.y < wy + 40 || d.onGround && d.y < wy + S.FLOAT) { r4.breath = Math.min(S.BREATH, r4.breath + dt * 4); return false; }
    r4.swim = { t: 0 }; d.vy = Math.min(d.vy, 120); setState("idle");
  }
  const sw = r4.swim; sw.t += dt;
  const dir = (held("right") ? 1 : 0) - (held("left") ? 1 : 0);
  d.vx = dir * S.X; if (dir) d.facing = dir;
  d.vy += S.SINK * dt;
  if (pressed("a")) { if (d.y <= top + 4) { r4.swim = null; d.vy = -S.LEAP; d.onGround = false; setState("jump"); return false; } d.vy = -S.STROKE; }
  if (held("up")) d.vy -= S.PUSH * dt; if (held("down")) d.vy += S.PUSH * dt;
  d.vy = Math.max(-S.MAXV, Math.min(S.MAXV, d.vy));
  const x0 = r.c0 * T + 20, x1 = (r.c0 + r.w) * T - 20;
  d.x = Math.max(x0, Math.min(x1, d.x + d.vx * dt));
  d.y += d.vy * dt;
  if (d.y < top) { d.y = top; if (d.vy < 0) d.vy = 0; }
  if (d.y > GR * T) { d.y = GR * T; d.vy = 0; }
  d.onGround = d.y >= GR * T - 1; d.fallTop = null; d.swordT = -1; d.shield = false; d.charging = false;
  // breath: at the surface it comes back; under, it runs out
  if (d.y <= top + 6) r4.breath = Math.min(S.BREATH, r4.breath + dt * 4);
  else { r4.breath -= dt; if (r4.breath <= 0) { r4.breath = S.AFTER; hurtDavid(d.x, "", true); toast("Out of breath! Swim up for air."); } }
  return true;
}

function r4DrawDavid(d, x, y) {
  const w = r4.walk, U = R4.TUNNEL;
  if (w) {
    if (w.t < U.TURN) drawSprite("david_turn_away", Math.min(7, Math.floor(w.t / U.TURN * 8)), x, y, d.facing);
    else if (!w.gone || region.trans) {
      const k = Math.min(1, (w.t - U.TURN) / U.WALK);
      drawSprite("david_walk_away", frameOf("david_walk_away", w.t), x, y - k * U.RISE, 1, 1 - U.SHRINK * k, 1 - 0.7 * k);
    }
    return true;
  }
  if (r4.swim) { drawSprite("david_swim", frameOf("david_swim", r4.swim.t), x, y - 50, d.facing, 0.8); return true; }
  return false;
}

// ---- drawing: the tall rooms' pictures; over everything, the water's tint, the dark, the Up arrows, his breath
function r4Backdrop(r, camX) {
  if (!r.tall) return false;
  const im = roomImg(r.tall), h = R4_TALL[r.id], x = r.c0 * T - camX;
  ctx.fillStyle = "#14100c"; ctx.fillRect(0, camY, W, H);
  if (im) ctx.drawImage(im, Math.round(x), H - h, 1296, h);
  return true;
}
const r4DarkCanvas = document.createElement("canvas"); r4DarkCanvas.width = W; r4DarkCanvas.height = H;
function r4DrawFront(camX) {
  const r = region.room, d = david; if (!r) return;
  if (r.water) { ctx.fillStyle = "rgba(30,95,130,0.28)"; ctx.fillRect(0, r.water, W, H - r.water); }   // (he's in it, not in front of it)
  if (r.dark) {
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
  if (!r4.walk && !region.trans) for (const o of r4.tunnels) if (o.room === r.id && Math.abs(d.x - o.x) < 140 && Math.abs(d.y - o.y) < 160) upHint(o.x - camX, o.y - 175);
  const L = r4.lampAt, li = kitImg("w4_lamp"); if (L && L.room === r.id && !r4Lamp() && li) ctx.drawImage(li, L.x - camX - 39, L.y - 55, 78, 55);   // (the lamp, till he takes it)
  if (r4.swim || r4.breath < R4.SWIM.BREATH - 0.05) {   // his breath, over his head
    const k = Math.max(0, r4.breath / R4.SWIM.BREATH), x = d.x - camX - 40, y = d.y - 150;
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(x - 2, y - 2, 84, 12);
    ctx.fillStyle = k > 0.3 ? "#7fd8ff" : "#ff6a5a"; ctx.fillRect(x, y, 80 * k, 8);
  }
}
