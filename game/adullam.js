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
  TUNNEL: { TURN: 0.7, WALK: 0.9, SHRINK: 0.25, RISE: 14, REACH: 60, HIGH: 60 },
  // the dark below the Lamp Hall: how black (0-1); the lamp's light (px) with olives in the flask, with none, and with no
  //  lamp at all; a tunnel's faint glow (px); seconds of light per olive (as Part One's caves)
  DARK: { LAMP: 300, DIM: 130, NONE: 60, GLOW: 70, OIL_EVERY: 5 },
  // (Glen 11-13: "swimming ... breath meter ... reach further down areas swimming under stuff") in the water: sideways
  //  speed, a stroke's push up (A), Up / Down held, the slow sink, the most speed up or down; at the surface his feet
  //  this far under the waterline (head out); a jump out of the water (A at the surface); breath (s) and what's left
  //  after running out (s, and a heart lost)
  SWIM: { X: 170, STROKE: 230, PUSH: 420, SINK: 160, MAXV: 260, FLOAT: 70, LEAP: 640, BREATH: 10, AFTER: 3 },
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
};

const ADULLAM = {
  key: "adullam", name: "The Cave of Adullam", start: "mouth", carry: ["gibeah", "ramah", "nobgath"],
  strCap: 8,
  // (Glen 11-13: "the whole cave isn't that big. We can make small areas") each room a small place, full of things.
  //  pic: his picture, far off; rock: the color of its ledges; floor: his floor under David
  rooms: [
    // UPPER: daylight
    { id: "mouth", name: "The Cave Mouth", w: 60, cave: true, mx: 0, my: 1, mw: 2, pic: "w4/mouth_strip", rock: "sand", ground: "limestone" },
    { id: "camp", name: "The Camp", w: 70, cave: true, mx: 2, my: 1, mw: 2, right: "roost", pic: "w4/camp_strip", rock: "sand", ground: "limestone" },
    { id: "roost", name: "The Bat Roost", w: 40, up: 44, cave: true, mx: 4, my: 0, mw: 1, mh: 2, left: "camp", right: "lamphall",
      pic: "w4/roost_tall", tall: true, rock: "pale", ground: "limestone" },
    { id: "lamphall", name: "The Lamp Hall", w: 74, cave: true, mx: 5, my: 1, mw: 2, left: "roost", dark: 0.45,
      pic: "w4/lamp/far", mid: "w4/lamp/mid.png", rock: "red", ground: "sandstone" },
    // MIDDLE: dark
    { id: "warren", name: "The Rat Warren", w: 66, cave: true, mx: 5, my: 2, mw: 2, right: "narrows", dark: 0.93,
      pic: "w4/warren_strip", rock: "dark", ground: "dark", near: "pile" },
    { id: "narrows", name: "The Four Tunnels", w: 50, cave: true, mx: 7, my: 2, mw: 2, left: "warren", right: "ledges", dark: 0.93,
      pic: "w4/narrows_strip", rock: "dark", ground: "dark", near: "pile" },
    { id: "ledges", name: "The Crumbling Ledges", w: 40, up: 44, cave: true, mx: 9, my: 1, mw: 1, mh: 2, left: "narrows", dark: 0.9,
      pic: "w4/ledges_tall", tall: true, rock: "dark", ground: "dark", near: "pile" },
    { id: "well", name: "The Old Well Shaft", w: 40, up: 100, cave: true, mx: 10, my: 1, mw: 1, mh: 3, right: "river", dark: 0.35,
      pic: "w4/well_tall", tall: true, rock: "pale", ground: "pebbles" },
    // LOWER: water (water: the waterline, px from the screen's top)
    { id: "river", name: "The Underground River", w: 56, cave: true, mx: 11, my: 3, mw: 2, left: "well", right: "flooded", dark: 0.9, water: 430,
      pic: "w4/river_strip", rock: "moss", ground: "pebbles" },
    { id: "flooded", name: "The Flooded Tunnel", w: 50, cave: true, mx: 13, my: 3, mw: 2, left: "river", dark: 0.92, water: 400,
      pic: "w4/flooded_strip", rock: "moss", ground: "pebbles" },
    { id: "deep", name: "The Deep Pool", w: 66, cave: true, mx: 15, my: 3, mw: 2, left: "flooded", right: "spring", dark: 0.92, water: 450,
      pic: "w4/deep_strip", rock: "moss", ground: "pebbles" },
    { id: "spring", name: "The Hidden Spring", w: 46, cave: true, mx: 17, my: 3, mw: 2, left: "deep", dark: 0.8,
      pic: "w4/spring_strip", rock: "moss", ground: "limestone" },
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
  backdrop: (r, camX) => r4Backdrop(r, camX), floor: (r, camX) => r4Floor(r, camX), drawFront: camX => r4DrawFront(camX),
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
// a tunnel into the picture at x (px), its floor at y (px): Up there, he walks in and comes out at the tunnel `to` (its
//  id). to null: a side cave still to be made. art: the tunnel mouth drawn there (his, cut from his pictures), or none
function r4Tunnel(id, room, x, y, to, art = "w4_arch") {
  r4.tunnels.push({ id, room, x, y, to });
  if (art) { const k = KIT[art]; region.props.push({ room, n: art, x: x - k.w / 2, y: y - k.h + 12 }); }
}
const r4Jar = (room, c, y = GR * T) => rBreak("jar", room, c, onTop(y));   // (Glen 11-13: jars he can break, not painted ones)

function r4Build(R) {
  Object.assign(KIT, R4_KIT);
  r4.tunnels.length = 0; r4.walk = null; r4.swim = null;
  for (const r of ADULLAM.rooms) { roomImg(r.pic); roomImg(r.mid); roomImg(`w4/floor_${r.ground}.png`); roomImg(`w4/near_${r.near || r.rock}.png`); roomImg(`w4/ceil_${r.rock}.png`); }
  const G = GR * T;

  // -- The Cave Mouth (22:1): in from the hills of Judah. Up the rocks by the door; the tunnel on in
  let c = R("mouth");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("mouth", "sand", s, X(k), y);
    ground(c, c + 59);
    campfire(c + 4, GR - 1);   // (the olive press: the save)
    oliveRow(c + 8, 16, 4);
    L("m", 14, 500); const b = L("l", 19, 385); oliveRow(b.c - 1, onTop(b.y) - 0.4, 3);
    const t = L("s", 27, 270); rRelic("r4_pom_mouth", "pomegranate", t.c, onTop(t.y));
    const d = L("m", 32, 400); r4Jar("mouth", d.c, d.y);
    r4Jar("mouth", c + 38); r4Jar("mouth", c + 39);
    rRat("mouth", c + 42, 4);
    r4Thing("mouth", "w4_stalagmites", X(47), FOOT, 0.8);
    r4Tunnel("mouth_in", "mouth", X(54), G, "camp_in", "w4_arch_sand");
  }

  // -- The Camp (22:2): the hall of sunbeams. The men's things: bedrolls, baskets, bread; jars to break; ledges up the wall
  c = R("camp");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("camp", "sand", s, X(k), y);
    ground(c, c + 69);
    r4Tunnel("camp_in", "camp", X(3), G, "mouth_in", "w4_arch_sand");
    campfire(c + 9, GR - 1);
    r4Thing("camp", "w4_bedroll", X(13)); r4Thing("camp", "w4_bag", X(16)); r4Thing("camp", "w4_basket", X(20));
    r4Thing("camp", "w4_bread", X(22)); r4Thing("camp", "w4_bowl", X(24));
    r4Jar("camp", c + 26); r4Jar("camp", c + 27); r4Jar("camp", c + 28);
    r4Tunnel("camp_side", "camp", X(33), G, null, "w4_arch_sand");
    L("m", 38, 500); const b = L("l", 43, 385); oliveRow(b.c - 1, onTop(b.y) - 0.4, 3); r4Jar("camp", b.c + 2, b.y);
    const t = L("m", 51, 270); rRelic("r4_pom_camp", "pomegranate", t.c, onTop(t.y));
    L("s", 57, 390);
    rBat("camp", c + 46, 130); rBat("camp", c + 60, 130);
    r4Thing("camp", "w4_bedroll", X(62)); r4Thing("camp", "w4_waterskin", X(65));
    r4Jar("camp", c + 66); r4Jar("camp", c + 67);
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

  // -- The Lamp Hall: his set 1, the torches in the wall. The lamp on a high ledge (it lights the way down); the stairs
  //  up into the tunnel at the end, down into the dark
  c = R("lamphall");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("lamphall", "red", s, X(k), y);
    ground(c, c + 73);
    campfire(c + 4, GR - 1);
    oliveRow(c + 7, 16, 4);
    L("m", 12, 500); L("l", 17, 385); const t = L("m", 25, 270); r4.lampAt = { room: "lamphall", x: (t.x + t.x1) / 2, y: t.y };
    L("s", 31, 390);
    rRat("lamphall", c + 36, 5); rBat("lamphall", c + 28, 120); rBat("lamphall", c + 44, 140);
    r4Jar("lamphall", c + 38); r4Jar("lamphall", c + 39);
    L("m", 40, 500); const b = L("l", 45, 390); oliveRow(b.c - 1, onTop(b.y) - 0.4, 3); r4Jar("lamphall", b.c + 2, b.y);
    const k = KIT.w4_stairs_tunnel; region.props.push({ room: "lamphall", n: "w4_stairs_tunnel", x: X(54), y: FOOT - k.h + 8 });
    r4Tunnel("lamp_down", "lamphall", X(54) + 270, G, "warren_up", null);   // (up the stairs into the dark)
  }

  // -- The Rat Warren: rats; a tunnel back up; ledges; two side caves; on the right, the tunnel to the Four Tunnels' first
  c = R("warren");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("warren", "dark", s, X(k), y);
    ground(c, c + 65);
    r4Tunnel("warren_up", "warren", X(5), G, "lamp_down");
    L("m", 12, 500); const b = L("l", 17, 385); oliveRow(b.c - 1, onTop(b.y) - 0.4, 3);
    const t = L("m", 25, 270); rRelic("r4_pom_warren", "pomegranate", t.c, onTop(t.y));
    L("s", 31, 390);
    r4Tunnel("warren_side1", "warren", X(37), G, null);
    for (const k of [10, 22, 40, 52]) rRat("warren", c + k, 4);
    rBat("warren", c + 20, 130); rBat("warren", c + 45, 130);
    r4Jar("warren", c + 43); r4Jar("warren", c + 44);
    const e = L("l", 46, 490); r4Jar("warren", e.c, e.y); const f = L("m", 53, 380); oliveRow(f.c - 1, onTop(f.y) - 0.4, 3);
    r4Tunnel("warren_side2", "warren", X(58), G, null);
    r4Tunnel("warren_back", "warren", X(63), G, "n1");
  }

  // -- The Four Tunnels: his four arches. Pick one: the first back to the Warren, the third on to the Crumbling Ledges,
  //  the other two side caves (and the way on at the right, too)
  c = R("narrows");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("narrows", "dark", s, X(k), y);
    ground(c, c + 49);
    r4Tunnel("n1", "narrows", X(7), G, "warren_back"); r4Tunnel("n2", "narrows", X(18), G, null);
    r4Tunnel("n3", "narrows", X(29), G, "ledges_in"); r4Tunnel("n4", "narrows", X(40), G, null);
    const a = L("s", 11, 480); oliveRow(a.c - 1, onTop(a.y) - 0.4, 3);
    const b = L("s", 22, 470); r4Jar("narrows", b.c, b.y);
    const d = L("s", 33, 480); oliveRow(d.c - 1, onTop(d.y) - 0.4, 3);
    rRat("narrows", c + 15, 4); rRat("narrows", c + 37, 4);
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

  // -- The Underground River: stepping stones of moss over the water; under it, the riverbed
  c = R("river");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("river", "moss", s, X(k), y);
    ground(c, c + 55);
    L("m", 3, 360); L("s", 10, 330); const a = L("m", 16, 300); oliveRow(a.c - 1, onTop(a.y) - 0.4, 3);
    const t = L("l", 24, 240); rRelic("r4_pom_river", "pomegranate", t.c, onTop(t.y));
    L("s", 32, 320); const b = L("m", 38, 350); oliveRow(b.c - 1, onTop(b.y) - 0.4, 3); L("s", 45, 300); L("m", 50, 360);
    rBat("river", c + 20, 120); rBat("river", c + 40, 120);
  }
  // -- The Flooded Tunnel: no way on over the water; the tunnel's at the bottom (Up there: on through to the Deep Pool)
  c = R("flooded");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("flooded", "moss", s, X(k), y);
    ground(c, c + 49);
    L("s", 4, 330); const a = L("m", 12, 310); oliveRow(a.c - 1, onTop(a.y) - 0.4, 3);
    r4Tunnel("flood_under", "flooded", X(26), G, "deep_in", "w4_tunnel_lit");
    const t = L("s", 36, 320); rRelic("r4_pom_flooded", "pomegranate", t.c, onTop(t.y)); L("m", 43, 330);
  }
  // -- The Deep Pool: long and dark; rests of moss over the water
  c = R("deep");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("deep", "moss", s, X(k), y);
    ground(c, c + 65);
    r4Tunnel("deep_in", "deep", X(4), G, "flood_under", "w4_tunnel_lit");
    for (const k of [10, 22, 34, 46, 56]) { const l = L(k % 4 ? "m" : "s", k, k % 3 ? 360 : 340); oliveRow(l.c - 1, onTop(l.y) - 0.4, 3); }
  }
  // -- The Hidden Spring: the end of the cave; his jars to break. (Next: the water from Bethlehem; Gad: on to Judah)
  c = R("spring");
  { const X = k => (c + k) * T, L = (s, k, y) => r4L("spring", "moss", s, X(k), y);
    ground(c, c + 45);
    campfire(c + 4, GR - 1);
    for (const k of [12, 13, 14, 28, 29, 38]) r4Jar("spring", c + k);
    L("m", 18, 500); const b = L("l", 23, 385); oliveRow(b.c - 1, onTop(b.y) - 0.4, 3);
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

// ---- drawing: (Glen 11-13 play) his picture small and far off, scrolling slowly (the tiles mirrored in turn: no seams);
//  over its top the rock going dark (the roof); stalactites along the top; the rubble just behind David; his floor under
//  him. Over everything (r4DrawFront): the water's tint, the dark, the Up arrows, his breath
function r4Backdrop(r, camX) {
  const B = R4.BG, rel = camX - r.c0 * T, camTop = -(r.up || 0) * T;
  ctx.fillStyle = "#0b0907"; ctx.fillRect(0, camY, W, H);
  const tiles = (im, p, y, w, h) => {   // across the screen, every other one mirrored
    const ox = -rel * p; for (let i = Math.floor(-ox / w); ox + i * w < W; i++) {
      const x = Math.round(ox + i * w);
      if (i & 1) { ctx.save(); ctx.translate(x + w, 0); ctx.scale(-1, 1); ctx.drawImage(im, 0, Math.round(y), Math.ceil(w) + 1, h); ctx.restore(); }
      else ctx.drawImage(im, x, Math.round(y), Math.ceil(w) + 1, h);
    }
  };
  const im = roomImg(r.pic);
  if (im) {
    const w = im.naturalWidth * B.K, h = im.naturalHeight * B.K;
    // a tall picture climbs with the camera just fast enough to show its top at the top of the room
    const f = r.up ? Math.max(0, Math.min(1, 1 - (B.BOT - h) / camTop)) : 0, yb = B.BOT + camY * f, yt = yb - h;
    tiles(im, B.P, yt, w, h);
    if (yt > camY) {   // over its top: its top band again, going dark
      const bh = h * 0.35; ctx.save(); ctx.beginPath(); ctx.rect(0, yt - bh, W, bh); ctx.clip(); tiles(im, B.P, yt - bh, w, h); ctx.restore();
      const g = ctx.createLinearGradient(0, yt + 40, 0, yt - B.FADE); g.addColorStop(0, "rgba(11,9,7,0)"); g.addColorStop(1, "rgba(11,9,7,1)");
      ctx.fillStyle = g; ctx.fillRect(0, yt - B.FADE, W, B.FADE + 40);
    }
    const mid = roomImg(r.mid); if (mid) tiles(mid, B.MID_P, yb - mid.naturalHeight * B.K, mid.naturalWidth * B.K, mid.naturalHeight * B.K);
    ctx.fillStyle = `rgba(8,6,4,${r.tall ? B.TALL_DIM : B.DIM})`; ctx.fillRect(0, camY, W, H);
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
  ctx.restore();
  return true;
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
  if (!r4.walk && !region.trans) for (const o of r4.tunnels) if (o.room === r.id && Math.abs(d.x - o.x) < 140 && Math.abs(d.y - o.y) < 160) upHint(o.x - camX, o.y - 200);
  const L = r4.lampAt, li = kitImg("w4_lamp"); if (L && L.room === r.id && !r4Lamp() && li) ctx.drawImage(li, L.x - camX - 39, L.y - 55, 78, 55);   // (the lamp, till he takes it)
  if (r4.swim || r4.breath < R4.SWIM.BREATH - 0.05) {   // his breath, over his head
    const k = Math.max(0, r4.breath / R4.SWIM.BREATH), x = d.x - camX - 40, y = d.y - 150;
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(x - 2, y - 2, 84, 12);
    ctx.fillStyle = k > 0.3 ? "#7fd8ff" : "#ff6a5a"; ctx.fillRect(x, y, 80 * k, 8);
  }
}
