// World 2, The Window (1 Samuel 19-20; DESIGN.md "World 2", Glen 2026-11-06: "Make it all one region and the map can
// circle back to Gibeah at night"). Part Two's second region, on region.js's engine: this file is loaded before
// region.js, which takes RAMAH as its REGION when the address is "#9-6". Only data and functions here; the rooms are
// built when main.js calls buildRegion() (RAMAH.build), and run through region.js's hooks (update, draw, ...).
//
// The story, in order: Michal lets David down through the window by a rope (19:11-12: he learns the rope); down the
// palace wall at night past Saul's men, and over Gibeah's rooftops (never strike them: keep out of their sight); out
// past the stone Ezel and along the road to Ramah (wolves, and the dawn coming up); the great well at Secu; Samuel at
// Ramah (19:18); the chase at Naioth (19:19-24: Saul's men three times, then Saul himself, fall down before Samuel).
// Then back the way he came, by day: Jonathan at the stone Ezel (20:1-23), the New Moon feast played as Jonathan
// (20:24-34: Saul's spear at his own son), and the arrows (20:35-42). Jonathan teaches him the bow, and he goes.
//
// Art: all of it is Glen's Gibeah art, at night (a moonlit wash with lamplight, drawn here). What's still wanted is in
// ART_NEEDED_W2.md.

const R2 = {
  // Saul's men (the stealth): how far they see, how close a crouch in the dark gets, how long a look takes to be sure
  SIGHT: 340, SIGHT_LOW: 120, LEVEL: 80, SPOT_T: 0.55, GUARD_SPEED: 62, TURN_WAIT: 1.8, CAUGHT_T: 1.0,
  TORCH_H: 80, TORCH_GRIP: 0.95, TORCH_DX: 17, TORCH_DY: 62,   // a guard's torch: how tall, where he holds it (0 top, 1 bottom), his hand
  SAUL_DOWN: 0.9,   // the chase's end: Saul sinks (saul_weep) this long, then lies face down
  WOLF_HOWL: 1.6,   // a sitting wolf howls this long, every 6-10 s
  EZEL_K: 0.85, TABLE_K: 0.8, SHELF_K: 0.6, SHELF_WALK_K: 0.5,   // the sizes of his stone Ezel, the feast table, Naioth's scroll shelves
  LIGHT: 175,            // a lamp's or a torch's light, px across (half of it: lit enough to be seen in)
  NIGHT: [38, 48, 92], INDOOR: [92, 80, 110],   // the night wash (multiplied over everything), outside and indoors
  // the wolves on the road
  WOLF: { SEE: 430, SPEED: 330, HOME: 120, TURN: 0.4, PAST: 230, HP: 2, BOX: [66, 100] },   // (BOX: half width, height. Glen 11-07: stones flew over at 52)
  // the chase at Naioth: Saul's men run at David; near Samuel the Spirit comes on them and they fall down
  CHASE: { SPEED: 225, ZONE: 4.5 * 36, WAVES: [2, 3, 4], GAP: 2.2, SAUL_SPEED: 90, STAGGER: 0.7 },
  // the feast: Saul's spear at Jonathan (1 Samuel 20:33)
  SPEAR: { SPEED: 640, Y: 80, LEN: 150 },
  // (Glen's feast clip, 11-10) saul_feast_throw lets go on this frame; his hand there (sheet px in front of his feet, above them)
  SAUL_LET_GO: 15, SAUL_HAND: [191, 211],
  // David's bow (Jonathan's, 18:4; Glen 11-06): a long, straight shot
  ARROW: { SPEED: 1350, GRAV: 0.1, LIFE: 1.7, COOL: 0.65, UP: 0.62, UP_DX: 40, UP_DY: 96 },   // (UP_DX, UP_DY: where the arrow leaves his raised bow)   // (UP, Glen 11-12: the angle, radians, when he isn't holding forward: high, for birds and things in the trees)
  MICHAL_WIN_K: 0.5, MICHAL_BACK: 1.5,   // (MICHAL_BACK: how much faster she goes back in than she came)   // Michal's window sheet (330 wide) drawn at the window picture's width (165)
  DJ_GAP: 158,   // the goodbye two-shots: David stands this far right of Jonathan (the clip's anchor), in sheet px (times SCALE)
  BOY_REACH: 30, BOY_PICK: [4, 9, 16],   // the arrows: he stops this far short of the arrow; boy_stone frames: start (standing, leaning), the arrow is taken up, stands holding it
  BOW_DRAW: 0.24, BOW_HOLD: 0.22,   // David's bow: drawing it (3 frames), then the release frame held this long
  SOLDIER_K: 1.3,        // (Glen 11-07: "they look like miniatures") Saul's men drawn this much bigger in World 2
  GUARD_FLIP: 1,         // (which way the soldier sheets face)
};

const RAMAH = {
  key: "ramah", name: "Ramah", start: "house", carry: ["gibeah"],
  strCap: 6,
  // mx, my, mw, mh: the map screen. night: true, "dawn" (lightening along the room), or a function (night till...)
  rooms: [
    { id: "house",    name: "Michal's House",          w: 46, bg: "w4_4", night: "indoor", mx: 0, my: 0, mw: 2, strip: "ramah/house_strip", floor: "ramah/house_floor" },   // (Glen's room, 11-10: tools/make_room_strip.py, tileable, from his wall and floor pictures)
    { id: "palace",   name: "The Palace Wall",         w: 72, up: 44, bg: "w4_2", night: true, mx: 0, my: 1, mw: 2, mh: 1, right: "rooftops",
      floor: "gibeah/wall2_floor", tallWall: { base: "gibeah/wall2_base.png", tile: "gibeah/wall2_tile.jpg", top: "gibeah/wall2_top.png" } },
    { id: "rooftops", name: "Gibeah by Night",          w: 124, bg: "w4_3", night: true, mx: 2, my: 1, mw: 2, left: "palace",
      far: "gibeah/fields_far", mid: "gibeah/town_mid.png", midY: 12 },
    // (Glen 11-07) out of the city's gate, a stretch of road at dawn: a break between Gibeah by night and the stone Ezel
    //  by day. The gate's barred behind David once he's gone on (till the story's done): no running back into the dark
    { id: "gibgate",  name: "Outside the Gate",         w: 44, bg: "w4_1", night: "dawn", mx: 4, my: 1, mw: 1, right: "field",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },
    { id: "field",    name: "The Stone Ezel",           w: 70, bg: "w4_1", night: () => !r2Has("r2_naioth") && "dawn", mx: 5, my: 1, mw: 2, left: "gibgate", right: "road",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },
    { id: "road",     name: "The Road to Ramah",        w: 150, bg: "w4_1", night: () => !r2Has("r2_naioth") && "dawn", mx: 7, my: 1, mw: 2, left: "field", right: "secu",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },
    { id: "secu",     name: "The Well at Secu",         w: 56, bg: "w4_1", mx: 9, my: 1, mw: 2, left: "road", right: "ramah",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },
    // (Glen 11-07: not all crammed in one shaft: the rope down a tall one-screen shaft, a tunnel, the cracked wall)
    { id: "shaft",    name: "Down the Well",           w: 36, up: 24, cave: true, mx: 9, my: 2, mw: 1, mh: 2, right: "wtunnel", strip: "gibeah/cave_strip", floor: "gibeah/cave_floor" },
    { id: "wtunnel",  name: "Under Secu",              w: 70, cave: true, mx: 10, my: 3, mw: 2, left: "shaft", right: "wcrack", strip: "gibeah/cave_strip", floor: "gibeah/cave_floor" },
    { id: "wcrack",   name: "The Cracked Wall",        w: 36, cave: true, mx: 12, my: 3, mw: 1, left: "wtunnel", strip: "gibeah/cave_strip", floor: "gibeah/cave_floor" },
    { id: "ramah",    name: "Ramah",                    w: 84, bg: "w4_3", mx: 11, my: 1, mw: 2, left: "secu", far: "gibeah/fields_far", mid: "gibeah/town_mid.png", midY: 12 },
    { id: "naioth",   name: "Naioth",                   w: 66, up: 34, bg: "w4_4", mx: 13, my: 0, mw: 1, mh: 2, strip: "ramah/naioth_strip", floor: "ramah/naioth_floor", band: [52 / 720, 248 / 720] },   // (Glen's room, 11-10: a storey, beam to beam, repeats on up)
    { id: "feast",    name: "The New Moon Feast",       w: 40, bg: "w4_4", night: "indoor", mx: 2, my: 0, mw: 2, strip: "gibeah/halls_strip", floor: "gibeah/halls_floor" },
  ],
  // the Journal: Glen's song, Verse 2 (SONG_PSALM57.md, his words exactly), two lines after each story moment
  steps: ["r2_window", "r2_samuel", "r2_naioth", "r2_arrows"],
  verse: ["I cry out to God Most High", "The God who watches over me", "He sends His mercy from the heavens", "His truth will set me free",
    "Though lions gather all around", "And sharpened words are aimed at me", "Your loving kindness reaches heaven", "Your faithfulness will carry me"],
  // (draft words, for Glen) what David writes after each story moment, and at the end
  entries: [
    ["Saul sent men to watch the house. Michal let me down through the window by a rope, and I got away in the night.", "1 Samuel 19:11–12"],
    ["I ran to Samuel at Ramah and told him all that Saul had done to me. He took me to Naioth.", "1 Samuel 19:18"],
    ["Saul sent men three times to take me, and God's Spirit came on every one of them. Then the king himself fell down before Samuel.", "1 Samuel 19:20–24"],
    ["The arrow went beyond the boy. Jonathan and I wept together, and he sent me away in peace. The LORD is between us forever.", "1 Samuel 20:37–42"],
  ],
  end: ["I have no home tonight. But God is my high tower, a refuge in the day of my distress.", "Psalm 59:16"],
  sword: () => !r2In("feast"),   // (Jonathan's sword: David's all through, but not Jonathan's at his father's table)
  build: r2Build, update: r2Update, enter: r2Enter, draw: r2Draw, drawBack: r2DrawBack, drawFront: r2DrawFront, drawOver: r2DrawOver,
  stoneHits: r2StoneHits, drawDavid: r2DrawDavid,
};

// the story's state (built fresh each load; what's done is in the save)
const r2 = { guards: [], wolves: [], lights: [], torches: [], men: [], spear: null, arrows: [], t: 0, entry: null, told: {}, choice: null, bowCool: 0, bowT: 0 };
const r2Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
const r2In = id => typeof region !== "undefined" && region.room && region.room.id === id;
const r2Crouched = () => david.h === LOW_H || ["crouch", "sneak", "crawl"].includes(david.state);
const r2GateShut = () => r2Has("r2_gateshut") && !r2Has("r2_arrows");   // (Glen 11-07: barred behind him till the story's done)
const R2_CITY = ["house", "palace", "rooftops"];
function r2CityFound() { const f = region.relics.filter(q => R2_CITY.includes(q.room)); return [f.filter(q => regionHas("taken", q.id)).length, f.length]; }
function r2Tell(k, text) { if (!r2.told[k]) { r2.told[k] = true; toast(text); } }

// ---------------------------------------------------------------------------
// building
// ---------------------------------------------------------------------------
function r2Guard(room, c, y, range, facing = 1) {   // one of Saul's men, pacing his beat with a torch
  kitImg("tw_torch_hand");   // (load his torch now, not when he first comes on screen)
  r2.guards.push({ room, hx: c * T + T / 2, x: c * T + T / 2, y, range: range * T, facing, f0: facing, state: "walk", t: Math.random() * 2, spot: 0 });
}
function r2Wolf(room, c) { r2.wolves.push({ room, hx: c * T + T / 2, x: c * T + T / 2, y: GR * T, facing: -1, state: "sit", t: Math.random() * 3, hp: R2.WOLF.HP, dead: false }); }
function r2Lamp(room, x, y) {   // a lamp on the wall (his tower lamp): light to be seen in
  region.props.push({ room, n: "tw_lamp", x: x - KIT.tw_lamp.w / 2, y, back: true });
  r2.lights.push({ room, x, y: y + 52, r: R2.LIGHT });
}
// (Glen 11-07) his torches (tools/cut_torches.py): where the flame is in each picture (0..1 across, down), and the size drawn
const R2_TORCH = { tw_torch_wall: [0.77, 0.38, 0.315], tw_torch_stand: [0.5, 0.175, 0.4], tw_torch_bowl: [0.49, 0.27, 0.45], tw_torch_hand: [0.5, 0.225] };
function r2Torch(room, n, x, y, flip = false) {   // a torch: x its middle, y its top (a standing one: y null, on the floor). Light to be seen in
  const [fx, fy, s] = R2_TORCH[n], k = KIT[n]; if (y == null) y = FOOT - k.h * s;
  region.props.push({ room, n, x: x - k.w * s / 2, y, s, flip, back: true });
  const lx = x + (flip ? -1 : 1) * (fx - 0.5) * k.w * s, ly = y + fy * k.h * s;
  r2.torches.push({ room, x: lx, y: ly, ph: Math.random() * 9 }); r2.lights.push({ room, x: lx, y: ly, r: R2.LIGHT });
}
function r2Rope(room, x, topY, botY) {   // a rope hung between two walkways: climbed like a ladder (Up / Down), drawn as a rope
  rLadder(room, x, topY, botY); ladders[ladders.length - 1].rope = true; region.ladders[region.ladders.length - 1].rope = true;
}
function r2OnRope(l, y) {   // put David on a rope (or ladder), climbing, at y
  const d = david; d.x = l.x; d.y = y; d.vx = d.vy = 0; d.onGround = false; d.ladder = l; d.climbDist = 0; setState("climb"); d.facing = 1;
  region.camFootY = y; if (typeof snapCamera === "function") snapCamera();
}
function r2Walks(room, rows, opts = {}) {   // staggered walkways up a tall room, a rope (or ladder) between each and the one below
  const all = [], X = k => (roomById(room).c0 + k) * T;
  let below = opts.floor || [];
  rows.forEach(([y, row], k) => {
    const here = row.map(([col, n]) => { const x0 = X(col), x1 = rWalk(room, x0, y, n); return { x0, x1, y, n, k }; });
    for (const u of here) {
      // (Glen 11-07: "these ladders are on top of each other": any walkway below that overlaps this one enough, and the
      //  spot along the overlap farthest from every other ladder or rope that starts or ends on either walkway)
      let pick = null;
      for (const l of below) {
        const a = Math.max(u.x0, l.x0) + 1.5 * T, b = Math.min(u.x1, l.x1) - 1.5 * T; if (b - a < -0.5 * T) continue;
        const ys = [y, l.y], near = region.ladders.filter(q => q.room === room && (ys.includes(q.top) || ys.includes(q.bot)));
        for (let t = a; t <= Math.max(a, b); t += T / 2) {
          const dd = near.length ? Math.min(...near.map(q => Math.abs(q.x - t))) : 1e9;
          if (!pick || dd > pick.dd + 1) pick = { dd, x: t, l };
        }
      }
      if (pick) (opts.ladders ? rLadder : r2Rope)(room, pick.x, Math.min(y, pick.l.y), Math.max(y, pick.l.y));   // (rows listed up or down)
    }
    all.push(...here); below = here;
  });
  return all;
}

function r2Build(R) {
  r2.guards.length = r2.wolves.length = r2.lights.length = r2.torches.length = 0;
  const walkMid = u => Math.round((u.x0 + u.x1) / 2 / T);

  // -- Michal's house (19:11): the bed, the window, Michal. Lamplit, Saul's men outside
  let c = R("house");
  { const X = k => (c + k) * T;
    ground(c, c + 45);
    rColumn("house", c + 24);   // (Glen's tileable wall, 11-10: no seams to hide now; one column, as a beam's post)
    campfire(c + 4, GR - 1);
    rBreak("hall_lamp", "house", c + 9, 16); rBreak("hall_lamp", "house", c + 29, 16);
    r2.lights.push({ room: "house", x: X(9) + T / 2, y: GR * T - 90, r: 260 }, { room: "house", x: X(29) + T / 2, y: GR * T - 90, r: 260 });
    oliveRow(c + 6, 16, 3);
    r2.bedX = X(17);
    rPedestal("house", c + 22); rRelic("r2_truth_house", "truth", c + 23, onTop(GR * T + 4 - KIT.hall_pedestal.h),
      "A poem by David, when Saul sent, and they watched the house to kill him. Deliver me from my enemies, my God. Set me on high from those who rise up against me. (Psalm 59:1)");
    r2.michalX = X(37); r2.winX = X(41);
    region.props.push(r2.houseWin = { room: "house", n: "tw_win_arch_moon", x: X(41) - KIT.tw_win_arch_moon.w / 2, y: GR * T - 340, back: true });   // the window (Glen 11-07: his moonlit arch)
    rDoor("d_housewin", "house", c + 41, "door", "d_palacewin"); region.doors[region.doors.length - 1].noArt = true;   // (Glen 11-07: out the window: no doorway under it)
    region.doors[region.doors.length - 1].shut = !r2Has("r2_window");   // (opens once Michal has let him down)
  }

  // -- The palace wall (19:12): out of the window onto a little balcony high on the wall, down it by ropes past Saul's
  //    men on the walkways, to the street. A plank walk along the top (a pomegranate, a lookout)
  c = R("palace");
  { const pr = roomById("palace"), X = k => (c + k) * T, deck = wallTopY(pr) + TALL_WALL.DECK;
    ground(c, c + pr.w - 1);
    for (let k = c; k < c + pr.w; k++) for (let rr = GR; rr < ROWS; rr++) artSolid.add(k + "," + rr);
    rock(c, TOP_ROW, pr.w, -pr.up - TOP_ROW);
    // the walkways down the wall, staggered, a rope from each to the one below
    const rows = [-680, -460, -240, -20, 200, 410].map((y, k) => {
      const row = []; let col = 2 + [10, 0, 14, 4, 18, 8][k];
      for (let i = 0; col + 13 + 5 * ((i + k) % 2) < pr.w - 2; i++, col += 24) row.push([col, (i + k) % 2]);
      return [y, row];
    });
    const walks = r2Walks("palace", rows, { floor: [] });
    // Michal's window, under the plank walk on top, over the first walkway: David comes out of it on a rope and climbs
    // down (19:12, "Michal let David down through the window"). (Glen 11-07: no balcony; not stepping out, climbing down)
    { const first = walks.filter(u => u.k === 0).sort((a, b) => a.x0 - b.x0)[0];
      const wx = Math.min(first.x0 + 5 * T, first.x1 - 2 * T), winTop = deck + 70, sillY = winTop + 182, wk = "tw_win_arch_lit_with-rope";
      region.props.push({ room: "palace", n: wk, x: wx - 88, y: winTop, back: true, draw: r2MichalWindow });   // (his window, lamplit, his rope over the sill: the rope at x 88 in the picture)
      r2.lights.push({ room: "palace", x: wx, y: sillY - 20, r: 230 });
      r2Rope("palace", wx, sillY, first.y); const rope = ladders[ladders.length - 1];
      region.ladders[region.ladders.length - 1].top = winTop + 220;   // (drawn from the picture's bottom edge down: his rope over the sill is in the picture)
      rDoor("d_palacewin", "palace", Math.round(wx / T), "door", "d_housewin");
      const w = region.doors[region.doors.length - 1]; w.x = rope.x; w.y = sillY;
      w.land = () => r2OnRope(rope, sillY + 150);   // (in from the house: on the rope below the window, hands at the sill; Glen 11-07: not standing in mid air)
      r2.winRope = rope; r2.winSill = sillY;   // (up the rope to the sill: back in, r2Update)
      r2.palaceStart = { x: rope.x, y: sillY + 150, land: w.land }; }
    // Saul's men on the wider walkways, and in the street; lamps on the wall
    walks.forEach((u, i) => {
      const mid = walkMid(u);
      if (u.n >= 1 && i % 2 === 0) r2Guard("palace", mid, u.y, Math.max(3, (u.x1 - u.x0) / T / 2 - 2), i % 4 ? 1 : -1);
      if (i % 3 === 1) r2Lamp("palace", (u.x0 + u.x1) / 2, u.y - 230);
      if (i % 4 === 2) oliveRow(mid - 2, u.y / T - 1.4, 4);
      if (i % 5 === 3) rBreak("jar", "palace", mid + 3, onTop(u.y));
    });
    r2Guard("palace", c + 30, GR * T, 7, -1); r2Guard("palace", c + 56, GR * T, 6, 1);
    r2Lamp("palace", X(22), GR * T - 260); r2Lamp("palace", X(48), GR * T - 260);
    { const u = walks.find(u => u.k === 2 && u.n === 1) || walks[6]; rRelic("r2_stone_palace", "stone", walkMid(u) + 3, onTop(u.y)); }
    // up top: the plank walk, a lookout's ladder up from the balcony row, a pomegranate
    for (let px = X(1); px < X(pr.w - 1); px += KIT.tw_walk.w - 4) region.props.push({ room: "palace", n: "tw_walk", x: px, y: deck - 6 });
    platAt(c + 1, deck, pr.w - 2);
    { const u = walks.filter(u => u.k === 0).pop(); rLadder("palace", u.x0 + (u.x1 - u.x0) * 0.6, deck, u.y); }
    rRelic("r2_pom_palace", "pomegranate", c + 60, deck / T - 1); oliveRow(c + 30, deck / T - 1.4, 8);
    r2Guard("palace", c + 40, deck, 12, -1);
  }

  // -- Gibeah by night (the town, 19:12): over the rooftops and through the street, Saul's men below with torches
  c = R("rooftops");
  { const X = k => (c + k) * T;
    ground(c, c + 123);
    campfire(c + 4, GR - 1);
    rDeco("rooftops", "t_house", c + 9); rBreak("pots", "rooftops", c + 8, 16);
    rTownStair("rooftops", c + 14);
    rRoof("rooftops", X(20), 420, 2); oliveRow(c + 23, onTop(420) - 0.4, 4);
    rRoof("rooftops", X(30), 300, 0); rBreak("lamp", "rooftops", c + 33, onTop(300));
    rAwning("rooftops", c + 40);
    rRoof("rooftops", X(46), 360, 1); r2Lamp("rooftops", X(49), 360 - 200);
    rRoof("rooftops", X(55), 240, 0); rRelic("r2_truth_roof", "truth", c + 58, onTop(240),
      "But I will sing of your strength. Yes, I will sing aloud of your loving kindness in the morning. For you have been my high tower, a refuge in the day of my distress. (Psalm 59:16)");
    rDeco("rooftops", "t_house", c + 66); rDeco("rooftops", "t_stall", c + 74);
    rRoof("rooftops", X(70), 400, 1); oliveRow(c + 72, onTop(400) - 0.4, 4);
    rLadder("rooftops", X(68), 400, GR * T);
    rPost("rooftops", c + 80);
    rRoof("rooftops", X(86), 330, 2); rRelic("r2_stone_roof", "stone", c + 92, onTop(330));
    rRoof("rooftops", X(98), 210, 0); rRelic("r2_pom_roof", "pomegranate", c + 101, onTop(210));
    rLadder("rooftops", X(97), 330, GR * T);
    rDeco("rooftops", "t_jars", c + 108); 
    rBreak("jar", "rooftops", c + 112, 16); oliveRow(c + 104, 16, 5);
    // Saul's men in the street, one on a roof; lamps over the doors
    r2Guard("rooftops", c + 28, GR * T, 6, 1); r2Guard("rooftops", c + 60, GR * T, 8, -1); r2Guard("rooftops", c + 92, GR * T, 8, 1);
    r2Guard("rooftops", c + 89, 330, 3, -1);
    r2Lamp("rooftops", X(10), GR * T - 250); r2Lamp("rooftops", X(67), GR * T - 250); r2Lamp("rooftops", X(117), GR * T - 250);
    rDeco("rooftops", "tfg_cloth", c + 36, true, 1.3, -120);
  }

  // -- The field and the stone Ezel (20:19): passed by night going out; Jonathan waits here once Naioth is done
  { const c = R("rooftops"); rDoor("d_gate_in", "rooftops", c + 119, "door", "d_gate_out"); region.doors[region.doors.length - 1].noArt = true; r2.gateInX = (c + 119) * T + T / 2;
    r2Torch("rooftops", "tw_torch_wall", r2.gateInX - 150, GR * T - 330, true); r2Torch("rooftops", "tw_torch_wall", r2.gateInX + 150, GR * T - 330); }   // the gate from inside the city
  c = R("gibgate");
  { const X = k => (c + k) * T;
    ground(c, c + 43);
    rDoor("d_gate_out", "gibgate", c + 7, "door", "d_gate_in"); region.doors[region.doors.length - 1].noArt = true;   // (Glen 11-07: through the gate's door, Up: not off the screen's edge)
    r2.gateX = X(7); roomImg("gibeah/wall2_base.png"); roomImg("gibeah/wall2_top.png"); roomImg("gibeah/wall2_end.png"); kitImg("tw_door_shut"); kitImg("tw_door_open"); roomImg("gibeah/wall2_tile.jpg");   // the city gate, at the left end (drawn in r2DrawBack: barred, or open)
    r2Torch("gibgate", "tw_torch_wall", r2.gateX - 150, GR * T - 330, true); r2Torch("gibgate", "tw_torch_wall", r2.gateX + 150, GR * T - 330);
    oliveRow(c + 10, 16, 4); rOliveTree("gibgate", c + 22); oliveRow(c + 30, 16, 3);
    rBreak("jar", "gibgate", c + 16, 16); rDeco("gibgate", "fg_grass", c + 27, true, 1.35); critter("hedgehog", c + 36);
  }
  c = R("field");
  { const X = k => (c + k) * T;
    ground(c, c + 69);
    rLowWall("field", c + 8); oliveRow(c + 14, 16, 5);
    { const by = rOliveTree("field", c + 50); oliveRow(c + 60, onTop(by) - 0.4, 2); }
    rDeco("field", "fg_grass", c + 58, true, 1.35);
    r2.ezelX = X(36); r2.jonX = X(18); r2.boyX = X(14);
    critter("hedgehog", c + 62);
    // (Glen 11-07: "do I have to run all the way back?") after Naioth, its door brings David straight here (20:1)
    rDoor("d_ezelin", "field", c + 25, "door", "d_naioth"); Object.assign(region.doors[region.doors.length - 1], { shut: true, noArt: true, y: GR * T,
      land() { david.facing = -1; toast("David fled from Naioth in Ramah, and came to Jonathan. (1 Samuel 20:1)"); } });
  }

  // -- The road to Ramah: by night, the sky paling as he goes; wolves. (By day, coming back, the wolves have gone.)
  c = R("road");
  { const X = k => (c + k) * T, back = r2Has("r2_naioth");
    ground(c, c + 149);
    oliveRow(c + 5, 16, 4); rLowWall("road", c + 12);
    { const c1 = rTerrace("road", c + 22, 1); oliveRow(c + 23, onTop(FOOT - 136) - 0.4, c1 - c - 24); }
    { const by = rOliveTree("road", c + 34); rRelic("r2_stone_road", "stone", c + 46, onTop(by)); }
    rBoulder("road", c + 52); snake("viper", c + 58);

    campfire(c + 76, GR - 1);
    rBreak("basket", "road", c + 80, 16);
    let rTerraceEnd = c + 100;
    { const c1 = rTerraceEnd = rTerrace("road", c + 86, 2); rRelic("r2_pom_road", "pomegranate", c + 92, onTop(FOOT - 136)); oliveRow(c + 88, onTop(FOOT - 136) - 0.4, c1 - c - 92); }
    // (Glen 11-07: a wolf and the scorpion were inside the terrace wall: they go past its end now)
    { const t1 = rTerraceEnd; critter("scorpion", t1 + 3);
      if (!back) { r2Wolf("road", c + 44); r2Wolf("road", c + 64); r2Wolf("road", c + 70); r2Wolf("road", t1 + 9); r2Wolf("road", t1 + 15); r2Wolf("road", c + 135); } }
    rDeco("road", "f_fig", c + 118);
    rLowWall("road", c + 124); rBoulder("road", c + 132); oliveRow(c + 140, 16, 6);
    rDeco("road", "fg_thorn", c + 60, true, 1.35); rDeco("road", "fg_branch", c + 110, true, 1.3);
  }

  // -- Secu: the great well (19:22), down it on the rope
  c = R("secu");
  { ground(c, c + 55);
    oliveRow(c + 6, 16, 4); rBoulder("secu", c + 12);
    rDoor("d_secuwell", "secu", c + 28, "well", "d_shaftrope", "rope");
    rSeal("r2_seal_well", "secu", c + 28, "rope", "The great well of Secu, deep and dark.", c + 25, c + 31);
    rDeco("secu", "f_fig", c + 40); critter("hedgehog", c + 46); rBreak("jar", "secu", c + 50, 16);
  }

  // -- Down the great well (Glen 11-07): the rope hangs from the well's mouth at the top of a tall one-screen shaft, with
  //    daylight coming down; ledges beside the rope (let go onto them, Up by the rope to take it again), the Truth on
  //    the highest. Then a tunnel, and the cracked wall (Goliath's sword, World 3) with an oil jar behind it
  c = R("shaft");
  { const sr = roomById("shaft"), X = k => (c + k) * T, rc = 18, rx = X(rc) + T / 2;
    ground(c, c + sr.w - 1); rock(c, TOP_ROW, sr.w, -sr.up - TOP_ROW);
    rDoor("d_shaftrope", "shaft", c + rc, "rope", "d_secuwell"); region.doors[region.doors.length - 1].top = (-sr.up + 4) * T;   // (the well mouth: its daylight in sight at the top of the screen)
    // ledges up both sides of the rope, a gap of a step between (fall off the rope and steer onto one)
    const rows = []; for (let r = GR - 4, k = 0; r >= -sr.up + 9; r -= 4, k++) rows.push([r, k]);
    for (const [r, k] of rows) {
      const left = k % 2 === 0, n = k % 3 === 1 ? "tw_ledge_m" : "tw_ledge_l", kw = KIT[n].w;
      const [a0, a1] = rTowerLedge("shaft", left ? rx - 60 - kw : rx + 60, r * T, n, !left), mid = Math.round((a0 + a1) / 2 / T);
      if (k % 2 === 1) oliveRow(mid - 1, r - 1.4, 3);
      if (k === 3) rBat("shaft", mid, r * T - 70);
      rows[k].push(mid);
    }
    const hi = rows[rows.length - 1], hi2 = rows[rows.length - 2];
    rRelic("r2_truth_shaft", "truth", hi[2], hi[0] - 1,
      "Oh, my Strength, I watch for you, for God is my high tower. My God will go before me with his loving kindness. (Psalm 59:9–10)");
    rRelic("r2_pom_shaft", "pomegranate", hi2[2], hi2[0] - 1);
    rSpider("shaft", c + 8, (GR - 10) * T);
    oliveRow(c + 3, 16, 3); rBreak("jar", "shaft", c + 31, 16);
  }
  c = R("wtunnel");
  { const X = k => (c + k) * T;
    ground(c, c + 69);
    for (const k of [4, 30, 49, 66]) r2Torch("wtunnel", "tw_torch_wall", X(k), GR * T - 290, k > 40);   // (Glen 11-07: torches in the cellars)
    rRat("wtunnel", c + 10, 3); oliveRow(c + 6, 16, 3);
    rHole("wtunnel", c + 16, 3);
    { const [, top] = rShelves("wtunnel", X(22), 0); const cy = rPiece("wtunnel", "c_crates", X(24), top, [[84, 150, 4]]);
      rRelic("r2_stone_shaft", "stone", c + 27, onTop(cy + 4)); }
    rBat("wtunnel", c + 34, 110); rPiece("wtunnel", "c_basin", X(38), FOOT);
    rHole("wtunnel", c + 44, 4, { planks: true });
    rSpider("wtunnel", c + 52, 200); rRat("wtunnel", c + 56, 4); rBreak("pots", "wtunnel", c + 62, 16);
    oliveRow(c + 60, 16, 3);
  }
  c = R("wcrack");
  { const X = k => (c + k) * T;
    ground(c, c + 35);
    rPiece("wcrack", "c_jars", X(4), FOOT); r2Torch("wcrack", "tw_torch_wall", X(15), GR * T - 290); oliveRow(c + 9, 16, 2);
    // the cracked wall, floor to ceiling across the passage (like Gibeah's cellars), until Goliath's sword breaks it
    if (!hasSkill("heavySword")) { block(c + 20, 0, 6, 17, 1); for (let k = 0; k < 6; k++) artSolid.add((c + 20 + k) + ",0"); }
    rSeal("r2_seal_crack", "wcrack", c + 20, "heavySword", "Cracked stone, and the sound of water behind it. Something heavy could break it.", c + 16, c + 20);
    region.crack = { c: c + 20, r: 0, w: 6, h: 17 };
    rRelic("r2_oil_shaft", "oil", c + 30, 16);
  }

  // -- Ramah: Samuel's town by morning, a safe place (19:18). The way up to Naioth at the far end
  c = R("ramah");
  { const X = k => (c + k) * T;
    ground(c, c + 83);
    campfire(c + 5, GR - 1);
    rDeco("ramah", "t_house", c + 10); rDeco("ramah", "t_stall", c + 18); oliveRow(c + 16, 16, 4);
    rTownStair("ramah", c + 22); rRoof("ramah", X(28), 420, 1); rBreak("pots", "ramah", c + 31, onTop(420));
    rDeco("ramah", "t_house", c + 52); rDeco("ramah", "t_jars", c + 60); rAwning("ramah", c + 64);
    r2.samX = X(44);
    r2.townsfolk = [["villager_woman_stand", X(14), 1], ["villager_boy_stand", X(36), -1, 0.55], ["villager_staffman_stand", X(58), -1, 0.66], ["villager_girl_stand", X(68), 1]];
    // (Glen 11-07: the door was standing in the street) Naioth's compound wall across the end of the town, the door in it
    r2.ramahWall = { x0: X(70), x1: X(84) }; roomImg("gibeah/wall2_base.png"); roomImg("gibeah/wall2_top.png"); roomImg("gibeah/wall2_end.png");
    rKitDoor("d_naioth", "ramah", c + 77, "door", "d_naiothdown", "tw_door_arch");
  }

  // -- Naioth: the prophets' house, tall, walkways and ladders up the walls; Samuel on the floor with the prophets.
  //    The chase (19:19-24) happens on the floor
  c = R("naioth");
  { const nr = roomById("naioth"), X = k => (c + k) * T;
    ground(c, c + nr.w - 1); rock(c, TOP_ROW, nr.w, -nr.up - TOP_ROW);
    for (const k of [2, 14, 26, 38, 50, 62]) rColumn("naioth", c + k);
    rKitDoor("d_naiothdown", "naioth", c + 4, "door", "d_naioth", "hall_door");
    r2Torch("naioth", "tw_torch_stand", X(2) + 4, null); r2Torch("naioth", "tw_torch_stand", X(7) + 4, null);
    campfire(c + 11, GR - 1);
    rBreak("hall_lamp", "naioth", c + 18, 16); rBreak("hall_lamp", "naioth", c + 40, 16);
    r2.samNX = X(56); r2.prophets = [["prophet_old", X(51), 1, 1.2], ["prophet_lyre", X(60), -1, 1.2], ["prophet_drum", X(63), -1, 1.2]];   // (Glen's prophets, 11-10: hands raised, the lyre, the hand drum; 19:20)
    const rows = [380, 170, -40, -250, -460, -670, -880].map((y, k) => {
      const row = []; let col = 3 + [2, 18, 4, 19, 7, 11, 16][k];   // (Glen 11-07: so no two ladders stack; tools/tests/w2nlad.js)
      for (let i = 0; col + 13 + 5 * ((i + k) % 2) < nr.w - 3; i++, col += 26) row.push([col, (i + k) % 2]);
      return [y, row];
    });
    const walks = r2Walks("naioth", rows, { floor: [{ x0: X(1), x1: X(nr.w - 1), y: GR * T }], ladders: true });
    walks.forEach((u, i) => {
      const mid = walkMid(u);
      if (i % 3 === 1) oliveRow(mid - 2, u.y / T - 1.4, 4);
      if (i % 4 === 2) rBreak("lamp", "naioth", mid + 3, onTop(u.y));
    });
    // (Glen 11-07) his scroll shelves, only where there's room: not under a walkway's braces, no ladder or rope through them
    { const ls = region.ladders.filter(l => l.room === "naioth"), k = KIT.hall_scrolls;
      const free = (x0, x1, top, bot) => !walks.some(u => u.x1 + 12 > x0 && u.x0 - 12 < x1 && u.y > top - 175 && u.y < bot - 4)
        && !ls.some(l => l.x + 28 > x0 && l.x - 28 < x1 && l.top < bot && l.bot > top);
      const shelf = (x, bot, s) => { const w = k.w * s, h = k.h * s; if (!free(x - w / 2, x + w / 2, bot - h, bot)) return false;
        region.props.push({ room: "naioth", n: "hall_scrolls", x: x - w / 2, y: bot - h + 4, s, back: true }); return true; };
      for (let j = 7, last = -99; j < 48; j++) if (j - last > 6 && ![14, 26, 38].some(q => Math.abs(j + 0.5 - q) < 3.5) && shelf(X(j) + T / 2, FOOT, R2.SHELF_K)) last = j;
      walks.forEach((u, i) => { if (i % 2 === 0) { const m = walkMid(u); for (const dj of [0, -3, 3]) if (shelf((m + dj) * T, u.y, R2.SHELF_WALK_K)) break; } });
    }
    const at = (k, j) => walks.filter(u => u.k === k)[j] || walks[walks.length - 1];
    { const u = at(2, 1); rRelic("r2_truth_naioth", "truth", walkMid(u) + 2, onTop(u.y),
      "When they saw the company of the prophets prophesying, and Samuel standing as head over them, God's Spirit came on Saul's messengers, and they also prophesied. (1 Samuel 19:20)"); }
    { const u = at(4, 0); rRelic("r2_stone_naioth", "stone", walkMid(u) - 2, onTop(u.y)); }
    { const u = at(6, 1); rRelic("r2_pom_naioth", "pomegranate", walkMid(u), onTop(u.y)); }
    { const u = at(5, 1); rRelic("r2_stone_naioth2", "stone", walkMid(u) + 1, onTop(u.y)); }
    rRat("naioth", c + 30, 4);
    // (Glen 11-07: more to fight, coming back through) rats in the scroll jars up on the walkways, bats under them,
    // spiders on their threads. Not down by Samuel and the prophets (the room's right end, on the floor)
    walks.forEach((u, i) => {
      const mid = walkMid(u), half = Math.floor((u.x1 - u.x0) / T / 2) - 2;
      if (i % 3 === 2 && half >= 2) beast("rat2", "naioth", mid, { y: u.y, hy: u.y, range: half * T, state: "walk" });
      if (i % 4 === 1 && u.k >= 1) rBat("naioth", mid - 3, u.y + 50);
      if (i % 5 === 3 && u.k >= 2) rSpider("naioth", mid + 4, u.y + 120);
    });
    rSpider("naioth", c + 22, GR * T - 260); rBat("naioth", c + 36, walks.find(u => u.k === 0).y + 50);
  }

  // -- The New Moon feast (20:24-34): Saul's table. Reached only through the story: played as Jonathan
  c = R("feast");
  { const X = k => (c + k) * T;
    ground(c, c + 39);
    for (const k of [2, 14, 26, 38]) rColumn("feast", c + k);
    rDeco("feast", "hr_banner", c + 9, false, 1, 150); rDeco("feast", "hr_brazier", c + 12); rDeco("feast", "hr_banner", c + 21, false, 1, 150);
    rDeco("feast", "hr_brazier", c + 33); rDeco("feast", "hr_throne", c + 34);
    r2.lights.push({ room: "feast", x: X(12) + 18, y: GR * T - 120, r: 300 }, { room: "feast", x: X(33) + 18, y: GR * T - 120, r: 300 });
    r2Torch("feast", "tw_torch_bowl", X(18), GR * T - 330); r2Torch("feast", "tw_torch_bowl", X(26), GR * T - 330);
    r2.feastJ = X(7); r2.saulX = X(32); r2.tableX = [X(15), X(29)];
    { const s = R2.TABLE_K, k = KIT.hall_table, x = (r2.tableX[0] + r2.tableX[1]) / 2 - k.w * s / 2;   // (Glen 11-07) his table: bread, a cup, a lamp, figs
      region.props.push({ room: "feast", n: "hall_table", x, y: FOOT - k.h * s, s, back: true });
      region.props.push({ room: "feast", n: "hall_cushion_blue", x: x - 40, y: FOOT - KIT.hall_cushion_blue.h * s + 4, s, back: true });
      region.props.push({ room: "feast", n: "hall_cushion_tan", x: x + k.w * s / 2 - KIT.hall_cushion_tan.w * s / 2, y: FOOT - KIT.hall_cushion_tan.h * s + 6, s, back: true });   // David's place, empty (20:25)
      r2.lights.push({ room: "feast", x: x + 281 * s, y: FOOT - (k.h - 23) * s, r: 150 }); }
  }
  r2.story = {
    michal: r2Has("r2_window") ? "after" : "wait",
    samuel: r2Has("r2_samuel") ? "naioth" : "ramah",
    jon: r2Has("r2_arrows") ? "gone" : r2Has("r2_ezel") ? "gone" : r2Has("r2_naioth") ? "wait" : "gone",
  };
}

// ---------------------------------------------------------------------------
// running
// ---------------------------------------------------------------------------
function r2Enter(r) {
  const d = david;
  r2.entry = { x: d.x, y: d.y, facing: d.facing, room: r.id };
  for (const g of r2.guards) if (g.room === r.id) Object.assign(g, { x: g.hx, facing: g.f0, state: "walk", t: 0, spot: 0 });
  for (const w of r2.wolves) if (w.room === r.id) Object.assign(w, { x: w.hx, state: "sit", dead: false, hp: R2.WOLF.HP, t: Math.random() * 3 });
  if (r.id === "palace") r2Tell("guards", "Saul's men are watching. Keep out of their sight: never strike them. In the dark, crouch (hold Down) and they can't see you past arm's reach. In lamplight they can.");
  if (r.id === "road" && !r2Has("r2_naioth")) r2Tell("wolves", "Wolves on the road! Stones (or the sword) drive them off.");
  if (r.id === "gibgate" && !r2Has("r2_gateshut")) { const [a, n] = r2CityFound();
    toast("Once you go on, Saul's men will bar the gate behind you: no going back into Gibeah tonight." + (a < n ? ` (You found ${a} of ${n} things in the city.)` : "")); }
  if ((r.id === "ramah" || r.id === "naioth") && r2Has("r2_arrows")) r2Tell("goezel", "The story here is done. To go on, go back to the stone Ezel and press Up by it.");
  if (r.id === "field" && r2Has("r2_arrows")) toast("The stone Ezel, where Jonathan said goodbye. Up by the stone: the road to Nob, when you're ready to go.");
  if (r.id === "field" && !r2Has("r2_gateshut")) { regionAdd("taken", "r2_gateshut"); toast("Behind you, Saul's men bar the gate of Gibeah."); }
  if (r.id === "field" && !r2Has("r2_naioth")) r2Tell("ezel", "A great stone stands in the field: the stone Ezel.");
  if (r.id === "rooftops") r2Tell("roofs", "Gibeah by night. Over the rooftops, or creep past the men in the street.");
  if (r.id === "feast" && !r2Has("r2_feast")) r2FeastStart();
  if (typeof p2 !== "undefined") p2.hide = r.id === "feast" || !!(region.pose && region.pose.crouch);   // (at the feast Player 1 is Jonathan; at the arrows Jonathan's the one in the scene)
}
function r2Update(dt, r) {
  { const shut = r2GateShut(); for (const o of region.doors) if (o.id === "d_gate_out" || o.id === "d_gate_in") o.shut = shut;
    if (r.id === "gibgate" && shut && david.x < r2.gateX + 210) {   // (barred: no closer than the men at the gate)
      david.x = r2.gateX + 210; if (david.vx < 0) david.vx = 0;
      if (held("left") && !(r2.gateSaid > 0)) { r2.gateSaid = 4; sayLine("David", "The gate of Gibeah is barred, and Saul's men are watching it. I can't go back in."); } }
    if (r2.gateSaid > 0) r2.gateSaid -= dt; }
  if (r2.winIn) { david.y = r2.winIn.y; david.vy = 0; }   // (going in at the window: held there on the rope through the fade)
  else if (r2.winRope && david.state === "climb" && david.ladder === r2.winRope && david.y <= r2.winSill + 110 && held("up") && !region.trans) {   // (up the rope to the window: in)
    const to = region.doors.find(o => o.id === "d_housewin"); r2.winIn = { y: david.y };
    regionGo(to.x + 30, -1, () => { r2.winIn = null; david.ladder = null; setState("idle"); david.y = GR * T; david.vy = 0; david.onGround = true; region.camFootY = david.y; if (typeof snapCamera === "function") snapCamera(); });
    return;
  }
  { const nd = region.doors.find(o => o.id === "d_naiothdown"); if (nd) nd.to = r2Has("r2_naioth") && !r2Has("r2_ezel") ? "d_ezelin" : "d_naioth"; }   // (out of Naioth: to Jonathan, once)
  const d = david; r2.t += dt; { const s = SPR.michal_window, end = s ? s.frames * s.ms / 1000 : 10, on = david.state === "climb" && david.ladder === r2.winRope && region.room.id === "palace";
    r2.mwT = Math.max(0, Math.min(end, (r2.mwT || 0) + (on ? dt : -R2.MICHAL_BACK * dt))); }
  if (!r2.entry) r2Enter(r);
  r2CaughtUpdate(dt);
  if (!region.jscene && !region.mapOpen) { r2Guards(dt, r); r2Wolves(dt, r); r2Chase(dt, r); r2SpearUpdate(dt, r); r2ArrowsUpdate(dt); r2Walkers(dt); }
  if (r2.choice) { r2ChoiceUpdate(); return; }
  if (region.script.length || region.wait > 0 || region.trans || d.deadT > 0 || region.climb || region.jscene || region.mapOpen || (typeof drill !== "undefined" && drill.on) || (dialog && dialog.t > 0)) return;
  const S = r2.story;
  // Michal at the window (19:11-12)
  if (r.id === "house" && S.michal === "wait" && d.x > r2.michalX - 140 && d.onGround) { r2WindowScene(); return; }
  if (r.id === "house" && S.michal === "after" && pressed("up") && Math.abs(d.x - r2.bedX) < 120) { sayLine("Michal", "Go, while it's still dark. I've laid something in your bed, so they'll think you're sick. (19:13-14)"); return; }
  // Samuel at Ramah (19:18)
  if (r.id === "ramah" && S.samuel === "ramah" && d.x > r2.samX - 150 && d.onGround) { r2SamuelScene(); return; }
  if (r.id === "ramah" && pressed("up") && d.onGround) { const f = (r2.townsfolk || []).find(([, x]) => Math.abs(x - d.x) < 90); if (f) { const i = r2.talkI = (r2.talkI || 0) + 1;
      sayLine("In Ramah", r2Has("r2_arrows") && i % 2 ? "Leaving us? Your road goes on from the stone Ezel. Back past the well, and press Up by the stone." : R2_TALK[i % R2_TALK.length]); return; } }
  // the chase at Naioth (19:19-24)
  if (r.id === "naioth" && r2Has("r2_samuel") && !r2Has("r2_naioth") && !r2.chase && d.x > roomById("naioth").c0 * T + 18 * T && d.y > GR * T - 40 && d.onGround) { r2ChaseStart(); return; }
  if (r.id === "naioth" && r2Has("r2_samuel") && pressed("up") && Math.abs(d.x - r2.samNX) < 100 && d.onGround && (!r2.chase || r2.chase.phase === "done")) {
    if (r2Has("r2_arrows")) sayLine("Samuel", "Your road goes on, David. Go back to the stone Ezel, where Jonathan left you, and the LORD will lead you on from there.");   // (Glen 11-09: someone should say where the way out is)
    else if (r2Has("r2_naioth") && !r2Has("r2_ezel")) sayLine("Samuel", "Go back to Jonathan, my son: he waits for you at the stone Ezel. The door at the far left will take you to him.");   // (Glen 11-07: "where do I go?")
    else sayLine("Samuel", R2_SAMUEL[(r2.samI = ((r2.samI || 0) + 1)) % R2_SAMUEL.length]);
    return; }
  // (Glen 11-09) the way out, once Jonathan has said goodbye: Up by the stone Ezel, and David takes the road to Nob
  //  (1 Samuel 21:1): the fade, then the land map. Back in the region later, the same stone is the way out again
  if (r.id === "field" && r2Has("r2_arrows") && d.onGround && Math.abs(d.x - r2.ezelX) < 140 && pressed("up")) {
    rPlay([{ say: ["", "Then David came to Nob, to Ahimelech the priest. (1 Samuel 21:1)"] }, { fn() { region.trans = { t: 0, leave: true }; } }]); return; }
  // Jonathan at the stone (20:1-23), then hiding by it
  if (r.id === "field" && S.jon === "wait" && Math.abs(d.x - r2.jonX) < 4 * T && d.onGround) { r2EzelScene(); return; }
  if (r.id === "field" && r2Has("r2_ezel") && !r2Has("r2_feast") && r2Crouched() && Math.abs(d.x - r2.ezelX) < 70) { r2HideScene(); return; }
  if (r.id === "field" && r2Has("r2_ezel") && !r2Has("r2_feast")) r2Tell("hide", "Hide by the stone Ezel: crouch behind it (hold Down).");
}

// ---- Saul's men: they walk their beat; if they see David they're sure in a moment, and he's caught: back to where
//      he came into the room. Never struck (stones pass them by)
function r2Lit(x, y) { return r2.lights.some(l => l.room === region.room.id && Math.hypot(l.x - x, l.y - (y - 50)) < l.r * 0.5); }
function r2Sees(g) {
  const d = david; if (d.deadT > 0 || region.trans) return false;
  const dx = d.x - g.x; if (Math.abs(d.y - g.y) > R2.LEVEL) return false;
  if (Math.sign(dx) !== g.facing && Math.abs(dx) > 30) return false;
  const lit = r2Lit(d.x, d.y) || r2.guards.some(o => o !== g && o.room === g.room && Math.hypot(o.x - d.x, o.y - d.y) < R2.LIGHT * 0.45);
  return Math.abs(dx) < (r2Crouched() && !lit ? R2.SIGHT_LOW : R2.SIGHT);
}
function r2Guards(dt, r) {
  for (const g of r2.guards) {
    if (g.room !== r.id) continue;
    g.t += dt;
    if (g.state === "caught") continue;
    const sees = !region.script.length && r2Sees(g);
    g.spot = sees ? g.spot + dt : Math.max(0, g.spot - dt * 0.6);
    if (g.spot >= R2.SPOT_T) { r2Caught(g); continue; }
    if (sees) { g.state = "look"; continue; }   // (stops and stares)
    if (g.state === "look" && g.spot <= 0) { g.state = "walk"; g.t = 0; }
    if (g.state === "turn") { if (g.t > R2.TURN_WAIT) { g.state = "walk"; g.t = 0; g.facing *= -1; } continue; }
    if (g.state === "walk") {
      g.x += g.facing * R2.GUARD_SPEED * dt;
      if ((g.facing > 0 && g.x > g.hx + g.range) || (g.facing < 0 && g.x < g.hx - g.range)) { g.x = Math.max(g.hx - g.range, Math.min(g.hx + g.range, g.x)); g.state = "turn"; g.t = 0; }
    }
  }
}
function r2Caught(g) {
  const d = david, e = r2.entry && r2.entry.room === region.room.id ? r2.entry : { x: region.room.c0 * T + 3 * T, y: GR * T, facing: 1 };
  g.state = "caught"; g.t = 0; region.wait = R2.CAUGHT_T + 0.6;
  sfx("stone_hit", g.x, 0.5, 0.6);
  r2.caughtN = (r2.caughtN || 0) + 1;
  toast(["“There he is!” One of Saul's men saw you. Back you go...", "Seen! Stay out of the lamplight, and crouch in the dark.", "Caught! Wait until he turns away, then slip by."][(r2.caughtN - 1) % 3]);
  r2.caught = { t: 0, e };   // (on game time: r2Update sends him back after CAUGHT_T)
}
function r2CaughtUpdate(dt) {
  const c = r2.caught; if (!c) return;
  c.t += dt; if (c.t < R2.CAUGHT_T) return;
  r2.caught = null; const d = david, e = c.e;
  regionGo(e.x, e.facing, () => { d.y = e.y; d.vy = 0; region.camFootY = e.y; region.climb = null; for (const q of r2.guards) if (q.room === region.room.id) Object.assign(q, { x: q.hx, facing: q.f0, state: "walk", t: 0, spot: 0 }); if (typeof snapCamera === "function") snapCamera(); });
}

// ---- the wolves (the road, by night): asleep by the road until he's near; then they run at him, past, and back
function r2WolfBox(w) { const [bw, bh] = R2.WOLF.BOX; return { x0: w.x - bw, x1: w.x + bw, y0: w.y - bh, y1: w.y }; }
function r2Wolves(dt, r) {
  const d = david, Wf = R2.WOLF;
  for (const w of r2.wolves) {
    if (w.room !== r.id) continue;
    w.t += dt; w.flash = Math.max(0, (w.flash || 0) - dt);
    if (w.dead) continue;
    const dx = d.x - w.x, same = Math.abs(d.y - w.y) < 140;
    if (w.state === "sit") {
      w.howl = Math.max(0, (w.howl || 0) - dt); w.ht = (w.ht ?? 1 + Math.random() * 5) - dt;   // (Glen 11-07) now and then he howls
      if (w.ht < 0) { w.ht = 6 + Math.random() * 4; w.howl = R2.WOLF_HOWL; if (same && Math.abs(dx) < W) sfx("jackal", w.x, 0.35, 0.6); }
      if (Math.abs(dx) < Wf.SEE && same && !region.script.length) { w.howl = 0; w.state = "run"; w.t = 0; w.facing = Math.sign(dx) || 1; sfx("jackal", w.x, 0.6, 0.75); } }
    else if (w.state === "run") {
      w.x += w.facing * Wf.SPEED * dt;
      if ((w.facing > 0 && w.x > d.x + Wf.PAST) || (w.facing < 0 && w.x < d.x - Wf.PAST)) { w.state = "turn"; w.t = 0; }
      if (Math.abs(dx) > 1100) { w.state = "home"; }
    } else if (w.state === "turn") { if (w.t > Wf.TURN) { w.facing = Math.sign(dx) || -w.facing; w.state = "run"; w.t = 0; } }
    else if (w.state === "flee") { w.x += w.facing * Wf.SPEED * 1.3 * dt; if (Math.abs(dx) > 1100 || w.x < r.c0 * T + 40 || w.x > (r.c0 + r.w) * T - 40) w.dead = true; continue; }   // (Glen 11-10: driven off, he turns tail and runs)
    else if (w.state === "home") { const hx = w.hx - w.x; w.facing = Math.sign(hx) || 1; w.x += w.facing * Wf.HOME * dt; if (Math.abs(hx) < 6) { w.x = w.hx; w.state = "sit"; } }
    w.x = Math.max(r.c0 * T + 60, Math.min((r.c0 + r.w) * T - 60, w.x));
    if (w.state === "run" && touchesDavid(r2WolfBox(w))) hurtDavid(w.x);
  }
}

// ---- stones and arrows: wolves are driven off; Saul's men are never struck (nor Saul, nor Jonathan's father)
function r2StoneHits(s) {
  const r = region.room || roomAt(s.x);
  for (const w of r2.wolves) {
    if (w.dead || w.state === "flee" || w.room !== r.id) continue;
    const q = r2WolfBox(w);
    if (s.x > q.x0 && s.x < q.x1 && s.y > q.y0 - 10 && s.y < q.y1 + 6) {
      if (w.cool > r2.t) return true;
      w.cool = r2.t + (s.sword ? 0.3 : 0.05); w.flash = 0.25; w.hp -= s.charged || s.power ? 99 : 1;
      if (typeof stoneHit === "function" && !s.sword) stoneHit(s);
      if (w.state === "sit") { w.state = "run"; w.facing = Math.sign(david.x - w.x) || 1; }
      if (w.hp <= 0) { w.state = "flee"; w.t = 0; w.facing = Math.sign(w.x - david.x) || 1; strGain("wolf"); sfx("jackal", w.x, 0.5, 1.2); r2Tell("wolfoff", "Driven off!"); }
      return true;
    }
  }
  for (const g of r2.guards) {
    if (g.room !== r.id || Math.abs(s.x - g.x) > 26 || s.y < g.y - 155 || s.y > g.y) continue;
    r2Tell("nostrike", "David will not strike Saul's men. (Keep out of their sight instead.)"); return true;
  }
  for (const m of r2.men) if (Math.abs(s.x - m.x) < 26 && s.y > m.y - 120 && s.y < m.y) { r2Tell("nostrike2", "David will not strike Saul's men. Lead them to Samuel!"); return true; }
  if (r.id === "feast" && Math.abs(s.x - r2.saulX) < 40) { r2Tell("nofather", "Jonathan will not strike his father."); return true; }
  return false;
}

// ---- Jonathan's bow (Glen 11-06: the goodbye gift, 18:4 / 20): hold Up and press the sword button. Anywhere in Part
//      Two once learned. (Glen 11-07: his drawing-the-bow frames: David draws, and the arrow goes on the release)
const r2BowUp = (d, dir) => !held(dir > 0 ? "right" : "left") && d.h !== LOW_H;   // (Glen 11-12) Up + the sword: up high; with forward too: flat
function r2LooseArrow(d, dir, up = r2BowUp(d, dir)) {   // (up: from his raised bow hand, Glen's clip)
  const a = up ? R2.ARROW.UP : 0.022;
  stones.push({ x: d.x + dir * (up ? R2.ARROW.UP_DX : 34), y: d.y - (d.h === LOW_H ? 44 : up ? R2.ARROW.UP_DY : 72), vx: dir * R2.ARROW.SPEED * Math.cos(a), vy: -R2.ARROW.SPEED * Math.sin(a), grav: R2.ARROW.GRAV, life: R2.ARROW.LIFE, p2: "arrow", charged: true, bow: true });
  sfx("sling_throw_quick", undefined, 0.6, 1.4);
}
function regionBow(d, busy, dt) {   // (main.js updateDavid, every frame)
  const now = r2.bowClock = (r2.bowClock || 0) + (dt || 1 / 60);   // (its own game clock: it works in every region, not only this one)
  const B = r2.bowShot;
  if (B && now - B.t0 < R2.BOW_DRAW + R2.BOW_HOLD) {   // drawing: he stands; the arrow goes at the release
    d.vx = 0; d.facing = B.dir;
    if (!B.fired && now - B.t0 >= R2.BOW_DRAW) { B.fired = true; r2LooseArrow(d, B.dir, B.up); }
    return true;
  }
  if (typeof REGION_ON === "undefined" || !REGION_ON || !hasSkill("bow") || !held("up") || !pressed("x") || busy || now < (r2.bowAt || 0) || d.harp || d.throwT >= 0) return false;
  if (region.room && region.room.id === "feast") return false;
  r2.bowAt = now + R2.ARROW.COOL;
  if (d.onGround && d.h !== LOW_H && typeof SPR !== "undefined" && SPR.david_bow) r2.bowShot = { t0: now, dir: d.facing, fired: false, up: r2BowUp(d, d.facing) };
  else r2LooseArrow(d, d.facing);   // (in the air or crouched: straight off, no drawing)
  return true;
}
function regionBowPose(d, x, y) {   // region.js regionDrawDavid: his bow frames while he draws and lets go
  const B = r2.bowShot; if (!B || typeof SPR === "undefined" || !SPR.david_bow) return false;
  const t = (r2.bowClock || 0) - B.t0; if (t > R2.BOW_DRAW + R2.BOW_HOLD || !d.onGround) return false;
  // (Glen 11-12: his clips) up or level; with Goliath's sword on his back in World 3
  const gs = typeof R3 !== "undefined" && REGION.key === "nobgath" && hasSkill("heavySword"), n = (gs ? "david_gsword_bow" : "david_bow") + (B.up ? "_up" : "");
  const sheet = SPR[n] ? n : "david_bow";
  drawSprite(sheet, t < R2.BOW_DRAW ? Math.min(2, Math.floor(t / R2.BOW_DRAW * 3)) : 3, x, y, B.dir, gs && sheet !== "david_bow" ? R3.GSWORD_K : 1);
  return true;
}

// ---------------------------------------------------------------------------
// the story's scenes
// ---------------------------------------------------------------------------
function r2WindowScene() {   // 19:11-12: Michal's warning; the rope (a drill: Player 2 if there is one); out of the window
  const d = david, S = r2.story;
  d.facing = 1; S.michal = "talk";
  rPlay([
    { say: ["Michal", "“If you don’t save your life tonight, tomorrow you will be killed.” (1 Samuel 19:11)"] },
    { fn() { S.michal = "rope"; startDrill({ title: "Michal lets the rope down!", rounds: [4, 5, 6], onDone: () => {
        S.michal = "after"; r2.ropeDown = true;
        rPlay([
          { say: ["", "So Michal let David down through the window. He went away, fled, and escaped. (1 Samuel 19:12)"] },
          { fn() { regionAdd("taken", "r2_window"); learnSkill("rope"); const w = region.doors.find(o => o.id === "d_housewin"); w.shut = false;
              const P = r2.palaceStart; regionGo(P.x, 1, () => { d.y = P.y; d.vy = 0; region.camFootY = P.y; if (typeof p2 !== "undefined" && p2.on) p2.y = P.y; snapCamera(); if (P.land) P.land(); }); } },
        ]);
      } }); } },
  ]);
}
function r2SamuelScene() {   // 19:18
  const d = david, S = r2.story;
  d.facing = 1;
  rPlay([
    { say: ["", "Now David fled, and escaped, and came to Samuel to Ramah, and told him all that Saul had done to him. He and Samuel went and lived in Naioth. (1 Samuel 19:18)"] },
    { say: ["Samuel", "Come up to Naioth, to the house where the prophets are. The LORD is there."] },
    { fn() { regionAdd("taken", "r2_samuel"); S.samuel = "walk"; } },
  ]);
}
// the chase: three times Saul's men; then Saul (19:19-24)
function r2ChaseStart() {
  r2.chase = { wave: 0, t: 0, phase: "intro" };
  rPlay([
    { say: ["", "It was told Saul, saying, “Behold, David is at Naioth in Ramah.” Saul sent messengers to take David. (1 Samuel 19:19–20)"] },
    { fn() { r2.chase.phase = "wave"; r2ChaseWave(); toast("Saul's men are coming! Don't strike them: lead them to Samuel."); } },
  ]);
}
function r2ChaseWave() {
  const c = r2.chase, n = R2.CHASE.WAVES[c.wave], x0 = roomById("naioth").c0 * T + 4 * T;
  for (let i = 0; i < n; i++) r2.men.push({ x: x0 - i * 60, y: GR * T, facing: 1, state: "wait", t: -i * R2.CHASE.STAGGER, wave: c.wave, sheet: "saul_soldier_walk" });
}
function r2Chase(dt, r) {
  const c = r2.chase; if (!c || r.id !== "naioth") return;
  const d = david, C = R2.CHASE, samX = r2.samNX;
  for (const m of r2.men) {
    m.t += dt;
    if (m.state === "wait") { if (m.t >= 0) { m.state = "run"; m.t = 0; } continue; }
    if (m.state === "kneel") continue;
    if (region.script.length) continue;
    const dx = d.x - m.x;
    m.facing = Math.sign(dx) || m.facing;
    if (Math.abs(dx) > 20) m.x += m.facing * C.SPEED * dt;
    if (m.x > samX - C.ZONE) {   // near Samuel and the prophets (or past him, by the far wall): God's Spirit comes on him
      m.state = "kneel"; m.t = 0; if (typeof chime === "function") chime(4 + (m.wave % 3));
      for (let i = 0; i < 10; i++) bits.push({ x: m.x, y: m.y - 70, vx: (Math.random() - 0.5) * 160, vy: -Math.random() * 220, life: 0.9, color: "#ffe9a0" });
      continue;
    }
    if (touchesDavid({ x0: m.x - 18, x1: m.x + 18, y0: m.y - 100, y1: m.y })) hurtDavid(m.x);
  }
  if (c.phase === "wave" && r2.men.length && r2.men.every(m => m.state === "kneel")) {
    c.wave++; c.t = 0;
    if (c.wave < C.WAVES.length) { c.phase = "gap"; toast(c.wave === 1 ? "They prophesied too! (19:20) ...Saul sends more men." : "Saul sent messengers again the third time. (19:21)"); }
    else { c.phase = "saul"; r2.saul = { x: roomById("naioth").c0 * T + 3 * T, t: 0, state: "walk" }; toast("Then Saul himself came to Naioth. (19:22-23)"); }
  }
  if (c.phase === "gap") { c.t += dt; if (c.t > C.GAP) { c.phase = "wave"; r2ChaseWave(); } }
  if (c.phase === "saul" && r2.saul) {
    const s = r2.saul; s.t += dt;
    if (s.state === "walk") { s.x += C.SAUL_SPEED * dt; if (s.x > samX - C.ZONE - 60) { s.state = "fall"; s.t = 0; c.phase = "done";
      rPlay([
        { wait: 1.4 },
        { say: ["", "God's Spirit came on him also, and he went on, and prophesied, until he came to Naioth in Ramah. He lay down before Samuel all that day and all that night. So they say, “Is Saul also among the prophets?” (from 1 Samuel 19:23–24)"] },
        { say: ["Samuel", "Go, David. The LORD has kept you. Go to Jonathan."] },
        { fn() { regionAdd("taken", "r2_naioth"); r2.story.jon = "wait";
          toast("Back to Jonathan: go out Naioth's door, on the floor at the far left (follow the arrow). He's waiting at the stone Ezel."); } },   // (Glen 11-07: "How do I end the level?")
      ]); } }
  }
}
function r2EzelScene() {   // 20:1-23, by the stone
  const d = david, S = r2.story;
  d.facing = d.x > r2.jonX ? -1 : 1; S.jon = "talk"; if (typeof p2 !== "undefined") p2.hide = true;
  rPlay([
    { say: ["David", "What have I done? What is my sin before your father, that he seeks my life? There is but a step between me and death. (1 Samuel 20:1, 3)"] },
    { say: ["Jonathan", "Whatever your soul desires, I will even do it for you. (1 Samuel 20:4)"] },
    { say: ["", "Jonathan caused David to swear again, for the love that he had to him; for he loved him as he loved his own soul. (1 Samuel 20:17)"] },
    { say: ["Jonathan", "Hide by the stone Ezel. After the feast I'll come out and shoot three arrows, and send a boy to find them. If I tell him the arrows are on this side of him, come: all is well. But if I say, “The arrows are beyond you,” go, for the LORD has sent you away. (from 1 Samuel 20:19–22)"] },
    { fn() { regionAdd("taken", "r2_ezel"); S.jon = "leave"; if (typeof p2 !== "undefined") p2.hide = false; } },
  ]);
}
function r2HideScene() {   // three days by the stone; meanwhile, the king's table
  rPlay([
    { fn() { region.pose = { hide: true, crouch: true }; }, wait: 0.8 },
    { say: ["", "David hid himself in the field. When the new moon had come, the king sat himself down to eat. (1 Samuel 20:24)"] },
    { fn() { region.pose = null; const f = roomById("feast"); regionGo(r2.feastJ, 1); } },
  ]);
}
// the feast: Player 1 plays Jonathan (Glen 11-06). Saul's spear at his son (20:33): jump it
function r2FeastStart() {
  r2.feast = { phase: "talk", t: 0, tries: 0 };
  rPlay([
    { wait: 0.6 },
    { say: ["", "On the second day of the new moon, David's place was empty. (1 Samuel 20:27)"] },
    { say: ["Saul", "Why hasn't the son of Jesse come to the meal, yesterday or today? Send and bring him to me, for he shall surely die!"] },
    { say: ["Jonathan", "Why should he be put to death? What has he done? (1 Samuel 20:32)"] },
    { fn() { r2.feast.phase = "throw"; r2.feast.t = 0; toast("You're Jonathan! Saul is throwing his spear: jump it (A), or duck (Down)."); } },
  ]);
}
function r2SpearUpdate(dt, r) {
  const F = r2.feast; if (!F || r.id !== "feast" || region.script.length) return;
  F.t += dt;
  if (F.phase === "throw" && F.t * 1000 / SPR.saul_feast_throw.ms >= R2.SAUL_LET_GO) {   // out of his hand, then down to Jonathan's height
    const k = SCALE * SAUL_BIG; F.phase = "fly";
    r2.spear = { x: r2.saulX - R2.SAUL_HAND[0] * k + R2.SPEAR.LEN / 2, y: GR * T - R2.SAUL_HAND[1] * k }; sfx("sling_throw", r2.saulX, 0.7, 0.6); }
  const sp = r2.spear; if (!sp) return;
  sp.x -= R2.SPEAR.SPEED * dt; sp.y += (GR * T - R2.SPEAR.Y - sp.y) * Math.min(1, dt * 8);
  const d = david;
  if (!sp.hit && sp.x - R2.SPEAR.LEN / 2 < d.x + 14 && sp.x + R2.SPEAR.LEN / 2 > d.x - 14 && d.y > sp.y && d.y - d.h < sp.y) {
    sp.hit = true; hurtDavid(sp.x + 40); F.tries++;
  }
  if (sp.x < roomById("feast").c0 * T + T) {
    r2.spear = null;
    if (sp.hit) { F.phase = "again"; F.t = 0; rPlay([{ wait: 1.0 }, { say: ["Saul", "Son of a perverse rebellious woman! (1 Samuel 20:30)"] }, { fn() { F.phase = "throw"; F.t = 0; toast("Again! Jump the spear (A), or duck (Down)."); } }]); }
    else { F.phase = "done"; rPlay([
      { say: ["", "Saul cast his spear at him to strike him. So Jonathan arose from the table in fierce anger, and ate no food the second day of the month; for he was grieved for David. (1 Samuel 20:33–34)"] },
      { fn() { regionAdd("taken", "r2_feast"); r2ArrowsStart(); } },
    ]); }
  }
}
// the arrows (20:35-42): back in the field in the morning, David hidden by the stone
function r2ArrowsStart() {
  const d = david, f = roomById("field");
  regionGo(r2.ezelX + 30, -1, () => {
    if (typeof p2 !== "undefined") p2.hide = true;
    region.pose = { hide: true, crouch: true }; d.facing = -1;
    r2.jonW = { x: r2.ezelX - 20 * T, mode: "walk", to: r2.ezelX - 11 * T }; r2.boy = { x: r2.ezelX - 21 * T, mode: "walk", to: r2.ezelX - 8 * T };
    rPlay([
      { wait: 2.6 },
      { say: ["Jonathan", "Run, find now the arrows which I shoot. (1 Samuel 20:36)"] },
      { fn() { r2.boy.mode = "run"; r2.boy.to = r2.ezelX + 330; r2.jonW.mode = "shoot"; r2.jonW.t = 0; }, wait: 0.55 },
      { fn() { r2.arrows.push({ x: r2.jonW.x + 40, y: GR * T - 80, vx: 900, vy: -420, land: r2.ezelX + 420 }); sfx("sling_throw_quick", r2.jonX, 0.6, 1.4); }, wait: 2.2 },
      { fn() { r2.jonW.mode = "talk"; }, say: ["Jonathan", "Isn’t the arrow beyond you? Go fast! Hurry! Don’t delay! (1 Samuel 20:37–38)"] },
      { fn() { r2.choice = { sel: 0, t: 0 }; } },
    ]);
  });
}
function r2TwoShot(n) {   // David and Jonathan in one clip, played once (then held on its last frame), David hidden meanwhile
  const J = r2.jonW; if (r2.dw) { david.x = r2.dw.x; r2.dw = null; } J.mode = "two"; J.clip = n; J.t = 0; region.pose = { hide: true }; region.wait = SPR[n].frames * SPR[n].ms / 1000 + 0.2;
}
function r2ChoiceUpdate() {
  const C = r2.choice; C.t += 1 / 60; region.wait = Math.max(region.wait, 0.05);
  if (pressed("left") || pressed("right")) { C.sel = 1 - C.sel; if (typeof chime === "function") chime(1); }
  if (C.t > 0.5 && pressed("a")) {
    r2.choice = null; region.wait = 0;
    const right = C.sel === 1;
    rPlay([
      { say: right ? ["", "Yes. “The arrows are beyond you” meant go: Saul means harm, and the LORD is sending David away. (1 Samuel 20:22)"]
                   : ["", "Not this time. “The arrows are beyond you” was the sign to go: Saul means harm. (1 Samuel 20:22)"] },
      { fn() { const A = r2.arrows[0]; r2.boy.mode = "run"; r2.boy.to = (A ? A.x : r2.boy.x + 60) - R2.BOY_REACH; r2.boy.then = "pick"; r2.jonW.mode = "idle"; }, wait: 3.6 },   // (Glen 11-09: his pick-up-a-stone move, as is)
      { say: ["", "The boy gathered up the arrows and went into the city. But Jonathan and David understood the matter. (from 1 Samuel 20:38–40)"] },
      // (Glen 11-09: his clip of the goodbye, three two-shots: dj_bow, dj_embrace, dj_givebow; Jonathan is the anchor)
      { fn() {   // David comes out from behind the stone (left of it, in the open) and Jonathan comes to meet him
        const J = r2.jonW, meet = r2.ezelX - KIT.f_ezel.w * R2.EZEL_K / 2 - 30;
        region.pose = { hide: true }; r2.dw = { x: david.x, to: meet, t: 0 }; david.facing = -1;
        J.mode = "walk"; J.to = meet - R2.DJ_GAP * SCALE; region.wait = Math.max(Math.abs(J.to - J.x), Math.abs(meet - david.x)) / 120 + 0.4; } },
      { fn() { r2TwoShot("dj_bow"); } },
      { say: ["", "David arose out of the south, and fell on his face to the ground, and bowed himself three times. (1 Samuel 20:41)"] },
      { fn() { r2TwoShot("dj_embrace"); } },
      { say: ["", "They kissed one another and wept with one another, until David wept the most. (1 Samuel 20:41)"] },
      { say: ["Jonathan", "Go in peace, because we have both sworn in the name of the LORD, saying, ‘The LORD will be between me and you, and between my offspring and your offspring, forever.’ (1 Samuel 20:42)"] },
      { fn() { r2TwoShot("dj_givebow"); } },
      { say: ["Jonathan", "I shot the sign with it today. Take my bow, David, and draw it the way I do: far, and true."] },
      { fn() { const J = r2.jonW; region.pose = null; david.x = J.x + R2.DJ_GAP * SCALE; david.facing = -1; J.mode = "idle"; J.facing = 1; J.t = 0; }, wait: 0.3 },
      { fn() { learnSkill("bow"); r2.jonW.mode = "walk"; r2.jonW.to = -9999; }, say: ["", "He arose and departed; and Jonathan went into the city. (1 Samuel 20:42)"] },
      { fn() { if (typeof p2 !== "undefined") p2.hide = false; regionAdd("taken", "r2_arrows"); regionAdd("taken", "g_exit_open"); jsceneOpen(true); } },
    ]);
  }
}
function r2ArrowsUpdate(dt) {
  for (const a of r2.arrows) { if (a.down) continue; a.vy += 900 * dt; a.x += a.vx * dt; a.y += a.vy * dt; if (a.y >= GR * T - 6 || a.x >= a.land) { a.y = Math.min(a.y, GR * T - 6); a.down = true; } }
}
function r2Walkers(dt) {   // the people the story moves: Samuel up to Naioth, Jonathan and the boy
  const S = r2.story;
  if (S.samuel === "walk" && r2In("ramah")) { r2.samX += 110 * dt; if (r2.samX > roomById("ramah").c0 * T + 72 * T) S.samuel = "naioth"; }
  if (S.jon === "leave" && r2In("field")) { r2.jonX -= 130 * dt; if (r2.jonX < roomById("field").c0 * T) S.jon = "gone"; }
  if (r2.dw) { const w = r2.dw, dx = w.to - w.x; w.t += dt; w.moving = Math.abs(dx) > 3; if (w.moving) w.x += Math.sign(dx) * Math.min(Math.abs(dx), 120 * dt); }   // David walking out of hiding (drawn by ramah.js)
  for (const p of [r2.jonW, r2.boy]) {
    if (!p) continue; p.t = (p.t || 0) + dt;
    if (p.mode === "walk" || p.mode === "run") { const v = p.mode === "run" ? 260 : 120, dx = p.to - p.x; if (Math.abs(dx) > 4) { p.facing = Math.sign(dx); p.x += p.facing * Math.min(Math.abs(dx), v * dt); } else if (p.then) { p.mode = p.then; p.then = null; p.t = 0; } else p.mode = "idle"; }
    if (p.mode === "pick") {   // bend, take the arrow up off the ground, stand holding it; then off to the city
      const f = R2.BOY_PICK[0] + Math.floor(p.t * 1000 / SPR.boy_stone.ms);
      if (f >= R2.BOY_PICK[1]) r2.arrows.length = 0;
      if (f >= R2.BOY_PICK[2]) { p.mode = "walk"; p.to = -9999; p.t = 0; }
    }
  }
}
const R2_TALK = ["Samuel judges Israel from here. People come from all over to hear him.", "The prophets sing and play up at Naioth, day and night.",
  "You look like you've been running all night. Rest a while.", "They say the king isn't himself. God keep him."];
const R2_SAMUEL = ["The LORD sees, David. Not as man sees.", "Stay close. No one takes you from this house today.", "I anointed you with oil in your father's house. The LORD has not forgotten."];

// ---------------------------------------------------------------------------
// drawing
// ---------------------------------------------------------------------------
function r2Wall(camX, x0, x1, capSide, tall) {   // a stretch of Gibeah's city wall (his wall pieces), standing on the ground; capSide -1/1: his corner
  //  stones on that end; tall: on up past the top of the screen (his wall tile over the base, as the palace wall), no battlements
  const base = roomImg("gibeah/wall2_base.png"), top = roomImg("gibeah/wall2_top.png"), tile = roomImg("gibeah/wall2_tile.jpg"); if (!base || !top || (tall && !tile)) return;
  const x = x0 - camX, ww = x1 - x0; if (x > W + 200 || x + ww < -200) return;
  const k = 0.6, srcW = ww / k, bh = 612, gy = GR * T + 6, by = gy - bh * k;
  let wy;
  if (tall) {   // the tile from the top of the screen down into the base's top
    const tw = tile.naturalWidth * k, th = tile.naturalHeight * k, y1 = by + 120 * k;
    ctx.save(); ctx.beginPath(); ctx.rect(Math.round(x), camY - 10, ww, y1 - camY + 10); ctx.clip();
    for (let tx = x; tx < x + ww; tx += tw) for (let ty = y1 - th; ty > camY - th; ty -= th) ctx.drawImage(tile, Math.round(tx), Math.round(ty), Math.ceil(tw) + 1, Math.ceil(th) + 1);
    ctx.restore(); wy = camY - 20;
  }
  ctx.drawImage(base, 0, 0, srcW, bh, Math.round(x), by, ww, bh * k);
  if (!tall) { wy = by - top.naturalHeight * k + 150 * k; ctx.drawImage(top, 0, 0, srcW, top.naturalHeight, Math.round(x), wy, ww, top.naturalHeight * k); }
  // (Glen 11-07: "add the end piece") the corner stones from his own picture of this wall (david-sling-2-art/rooms/gibeah/
  // wall2_end_source.png, the corner cut out and flipped to the left end: assets/rooms/gibeah/wall2_end.png)
  const en = roomImg("gibeah/wall2_end.png"); if (!en || !capSide) return;
  const ew = en.naturalWidth * (tall ? 0.42 : (gy - wy - 8) / en.naturalHeight), s = ew / en.naturalWidth, ex = capSide < 0 ? x - ew * 0.18 : x + ww + ew * 0.18;
  ctx.save(); ctx.translate(Math.round(ex), 0); if (capSide > 0) ctx.scale(-1, 1);
  if (!tall) ctx.drawImage(en, 0, Math.round(wy + 8), ew, gy - wy - 8);
  else {   // the corner's lower part on the ground, its middle stones repeated on up (not its top)
    const fh = en.naturalHeight * s; ctx.drawImage(en, 0, Math.round(gy - fh), ew, fh);
    const m0 = 260, mh = 520; for (let ty = gy - fh + 260 * s - mh * s; ty > camY - mh * s; ty -= mh * s) ctx.drawImage(en, 0, m0, en.naturalWidth, mh, 0, Math.round(ty), ew, Math.ceil(mh * s) + 1);
  }
  ctx.restore();
}
// (Glen 11-09) Michal in the window, letting the rope down (his clip michal_window, seen from outside: the arch, Michal
//  and the rope): it plays while David is on the rope under her window, held at the end, her hands on the rope; when
//  he lets go it runs backwards and she goes in, and the window is empty (Glen 11-09). Only on the night itself (till he
//  reaches Samuel)
function r2MichalWindow(p, camX) {
  const s = SPR.michal_window; if (!s || !s.img.naturalWidth || r2Has("r2_samuel")) return false;
  if (!(r2.mwT > 0)) return false;   // (she's gone in: the empty window)
  const k = R2.MICHAL_WIN_K, f = Math.min(s.frames - 1, Math.floor(r2.mwT * 1000 / s.ms));
  ctx.drawImage(s.img, f * s.w, 0, s.w, s.h, Math.round(p.x - camX), Math.round(p.y), s.w * k, s.h * k);
  return true;
}
function r2DrawBack(camX) {   // behind the props: Naioth's compound wall at the end of Ramah; Gibeah's wall and gate outside the city
  const r = region.room; if (!r) return;
  if (r.id === "ramah" && r2.ramahWall) r2Wall(camX, r2.ramahWall.x0, r2.ramahWall.x1, -1);
  if (r.id === "rooftops" && r2.gateInX) {   // the same gate from inside the city, at the end of the street
    const gx = r2.gateInX; r2Wall(camX, gx - 4 * T, gx + 10 * T, -1, true);
    const n = r2GateShut() ? "tw_door_shut" : "tw_door_open", k = KIT[n], im = kitImg(n); if (im) ctx.drawImage(im, Math.round(gx - camX - k.w / 2), GR * T + 4 - k.h, k.w, k.h);
  }
  if (r.id === "gibgate" && r2.gateX) {
    const gx = r2.gateX; r2Wall(camX, gx - 10 * T, gx + 4 * T, 1, true);
    const n = r2GateShut() ? "tw_door_shut" : "tw_door_open", k = KIT[n], im = kitImg(n);   // (Glen 11-07: "our castle door")
    if (im) ctx.drawImage(im, Math.round(gx - camX - k.w / 2), GR * T + 4 - k.h, k.w, k.h);
    if (r2GateShut()) for (const [dx, f] of [[-120, 1], [130, -1]]) {   // Saul's men at the gate (not the sneaking kind: just there)
      const sx = gx + dx - camX; drawSprite("saul_soldier_look", frameOf("saul_soldier_look", r2.t * 0.5 + (dx > 0 ? 0.4 : 0)), sx, GR * T, f * R2.GUARD_FLIP, R2.SOLDIER_K);
    }
  }
}
function r2Draw(camX) {
  const r = region.room; if (!r) return;
  const gy = GR * T, on = x => x - camX > -300 && x - camX < W + 300, S = r2.story;
  for (const q of r2.torches) if (q.room === r.id && on(q.x)) r2Flicker(q.x - camX, q.y, 1, q.ph);
  if (r.id === "naioth" && r2Has("r2_naioth") && !r2Has("r2_ezel")) {   // (Glen 11-07: "I still don't know where to go") a bobbing arrow over the door out, to Jonathan
    const o = region.doors.find(q => q.id === "d_naiothdown"), x = o.x - camX, y = gy - 300 + Math.sin(r2.t * 4) * 10;
    ctx.save(); ctx.fillStyle = "#ffd76a"; ctx.strokeStyle = "#5a3a10"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x - 26, y - 34); ctx.lineTo(x + 26, y - 34); ctx.lineTo(x + 26, y - 4); ctx.lineTo(x + 44, y - 4); ctx.lineTo(x, y + 36); ctx.lineTo(x - 44, y - 4); ctx.lineTo(x - 26, y - 4); ctx.closePath();
    ctx.stroke(); ctx.fill();
    ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center"; ctx.lineWidth = 5; ctx.strokeText("To Jonathan", x, y - 48); ctx.fillStyle = "#fff4d0"; ctx.fillText("To Jonathan", x, y - 48); ctx.restore();
  }
  if (r.id === "house") {
    // the bed (Michal lays the figure in it once David's gone, 19:13)
    // (the sheet has Michal in it: before he goes, clip her out and show only the empty bed; after, she's at the bed,
    //  so the window Michal is gone. Glen 11-07: "two Michals")
    const atBed = r2Has("r2_window");
    if (SPR.michal_bed && on(r2.bedX)) {
      if (atBed) { drawSprite("michal_bed", SPR.michal_bed.frames - 1, r2.bedX - camX, gy, 1); if (Math.abs(david.x - r2.bedX) < 160) upHint(r2.bedX - camX, gy - 190); }
      else {
        const s = SPR.michal_bed, sc = SCALE * (TUNE.SPRITE_SIZE.michal_bed || 1), fx = v => r2.bedX - camX + (v - s.ax) * sc, fy = v => gy + (v - s.ay) * sc;
        ctx.save(); ctx.beginPath();
        ctx.rect(fx(134), fy(170), (s.w - 134) * sc, (s.h - 170) * sc);   // the bed, right of her skirt
        ctx.rect(fx(160), fy(0), (s.w - 160) * sc, 170 * sc);             // the headboard and blanket above
        ctx.clip(); drawSprite("michal_bed", 0, r2.bedX - camX, gy, 1); ctx.restore();
      }
    }
    if (on(r2.michalX) && !atBed) {
      const m = S.michal, n = m === "rope" ? "michal_rope_loop" : m === "talk" ? "michal_talk" : "michal_idle";
      drawSprite(n, m === "rope" && !(drill.on && drill.ready <= 0) ? 0 : frameOf(n, r2.t), r2.michalX - camX, gy, 1);
    }
    r2.houseWin.n = r2.ropeDown || r2Has("r2_window") ? "tw_win_arch_moon_with-rope" : "tw_win_arch_moon";   // (Glen 11-07: his rope over the sill, once Michal's let it down)
  }
  if (r.id === "ramah") {
    for (const [n, x, f, sc] of r2.townsfolk || []) if (SPR[n] && on(x)) drawSprite(n, frameOf(n, r2.t + x), x - camX, gy, f, sc || 1);
    if (S.samuel === "ramah" || S.samuel === "walk") drawSprite("samuel_stand", 0, r2.samX - camX, gy, S.samuel === "walk" ? 1 : -1);
  }
  if (r.id === "naioth") {
    for (const [n, x, f, sc] of r2.prophets || []) if (SPR[n] && on(x)) drawSprite(n, frameOf(n, r2.t + x), x - camX, gy, f, sc || 1);
    if (S.samuel === "naioth" || r2Has("r2_samuel")) {
      const g = ctx.createRadialGradient(r2.samNX - camX, gy - 60, 10, r2.samNX - camX, gy - 60, R2.CHASE.ZONE);
      g.addColorStop(0, "rgba(255,236,170,0.22)"); g.addColorStop(1, "rgba(255,236,170,0)");
      ctx.fillStyle = g; ctx.fillRect(r2.samNX - camX - R2.CHASE.ZONE, gy - 60 - R2.CHASE.ZONE, R2.CHASE.ZONE * 2, R2.CHASE.ZONE * 2);
      drawSprite("samuel_stand", 0, r2.samNX - camX, gy, -1);   // (Glen 11-07: his Samuel with a staff)
    }
    for (const m of r2.men) {
      if (m.state === "wait") continue;
      if (m.state === "kneel") { drawSprite("saul_soldier_kneel", Math.min(SPR.saul_soldier_kneel.frames - 1, Math.floor(m.t / 0.17)), m.x - camX, gy, -m.facing * R2.GUARD_FLIP, R2.SOLDIER_K); continue; }   // (Glen 11-07: his kneel sheet: the spear down, on his knees, hands up. It faces left)
      drawSprite("saul_soldier_walk", frameOf("saul_soldier_walk", m.t * 2.2), m.x - camX, gy, m.facing * R2.GUARD_FLIP, R2.SOLDIER_K);
    }
    const s = r2.saul;
    if (s) {
      if (s.state === "walk") drawSprite("saul_walk", frameOf("saul_walk", s.t), s.x - camX, gy, 1, SAUL_BIG);
      else if (s.t < R2.SAUL_DOWN || !SPR.saul_lie) drawSprite("saul_weep", Math.min(SPR.saul_weep.frames - 1, Math.floor(s.t * 8)), s.x - camX, gy, 1, SAUL_BIG);
      else drawSprite("saul_lie", 0, s.x - camX + 40, gy, 1, SAUL_BIG);   // (Glen 11-07) face down before Samuel (19:24)
    }
  }
  if (r.id === "field") {
    if (S.jon === "wait" || S.jon === "talk" || S.jon === "leave") drawSprite(S.jon === "leave" ? "jonathan_walk" : S.jon === "talk" ? "jonathan_talk" : "jonathan_idle", frameOf(S.jon === "leave" ? "jonathan_walk" : "jonathan_idle", r2.t), r2.jonX - camX, gy, S.jon === "leave" ? -1 : 1);
    const J = r2.jonW;
    if (J && on(J.x)) {
      if (J.mode === "two") drawSprite(J.clip, Math.min(SPR[J.clip].frames - 1, Math.floor(J.t * 1000 / SPR[J.clip].ms)), J.x - camX, gy, -1);
      else {
      const n = J.mode === "walk" ? "jonathan_walk" : J.mode === "shoot" ? "jonathan_shoot" : J.mode === "talk" ? "jonathan_talk" : "jonathan_idle";
      drawSprite(n, J.mode === "shoot" ? Math.min(SPR[n].frames - 1, Math.floor(J.t * 14)) : frameOf(n, J.t), J.x - camX, gy, J.facing || 1); }
    }
    if (r2.dw) drawSprite(r2.dw.moving ? "david_walk" : "david_idle", frameOf(r2.dw.moving ? "david_walk" : "david_idle", r2.dw.t), r2.dw.x - camX, gy, -1);
    const B = r2.boy;
    if (B && on(B.x) && B.mode === "pick") drawSprite("boy_stone", Math.min(R2.BOY_PICK[2], R2.BOY_PICK[0] + Math.floor(B.t * 1000 / SPR.boy_stone.ms)), B.x - camX, gy, 1, 0.85);
    else if (B && on(B.x)) drawSprite(B.mode === "idle" ? "boy_idle" : "boy_walk", frameOf(B.mode === "idle" ? "boy_idle" : "boy_walk", B.t * (B.mode === "run" ? 2 : 1)), B.x - camX, gy, B.facing || 1, 0.85);
    for (const a of r2.arrows) r2DrawArrow(a.x - camX, a.y, a.down ? 0.5 : Math.atan2(a.vy, a.vx));
    if (region.pose && region.pose.crouch) drawSprite("david_peek", 0, r2.ezelX + KIT.f_ezel.w * R2.EZEL_K / 2 - 8 - camX, gy, -1);   // (Glen's still, 11-10: crouched on the far side of the stone, peeking round it at Jonathan; the stone is drawn in front)
  }
  if (r.id === "feast") {
    const F = r2.feast;
    // (Glen's clip, 11-10) at his own small table: eating, then up with the spear; he holds the throw until it lands
    const TH = SPR.saul_feast_throw;
    if (F && F.phase === "throw") drawSprite("saul_feast_throw", Math.min(TH.frames - 1, Math.floor(F.t * 1000 / TH.ms)), r2.saulX - camX, gy, -1, SAUL_BIG);
    else if (F && (F.phase === "fly" || F.phase === "done")) drawSprite("saul_feast_throw", TH.frames - 1, r2.saulX - camX, gy, -1, SAUL_BIG);
    else drawSprite("saul_feast_eat", frameOf("saul_feast_eat", r2.t), r2.saulX - camX, gy, -1, SAUL_BIG);
    const sp = r2.spear;
    if (sp) { ctx.save(); ctx.strokeStyle = "#3a2410"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sp.x - camX - R2.SPEAR.LEN / 2, sp.y); ctx.lineTo(sp.x - camX + R2.SPEAR.LEN / 2, sp.y); ctx.stroke();
      ctx.fillStyle = "#c9ccd2"; ctx.beginPath(); ctx.moveTo(sp.x - camX - R2.SPEAR.LEN / 2 - 26, sp.y); ctx.lineTo(sp.x - camX - R2.SPEAR.LEN / 2, sp.y - 8); ctx.lineTo(sp.x - camX - R2.SPEAR.LEN / 2, sp.y + 8); ctx.closePath(); ctx.fill(); ctx.restore(); }
  }
  // Saul's men (stealth), and the wolves
  for (const g of r2.guards) {
    if (g.room !== r.id || !on(g.x)) continue;
    const n = g.state === "walk" ? "saul_soldier_walk" : g.state === "caught" ? "saul_soldier_alert" : "saul_soldier_look";
    drawSprite(n, g.state === "walk" ? frameOf(n, g.t) : g.state === "caught" ? Math.min(SPR[n].frames - 1, Math.floor(g.t * 12)) : frameOf(n, g.t * 0.5), g.x - camX, g.y, g.facing * R2.GUARD_FLIP, R2.SOLDIER_K);
    // his torch (Glen's, off its stone stand), held in his hand
    { const [hx, hy] = r2GuardHand(g), tx = hx - camX, ty = hy + Math.sin(r2.t * 9 + g.hx) * 1.5;
      const im = kitImg("tw_torch_hand"), k = KIT.tw_torch_hand, th = R2.TORCH_H * R2.SOLDIER_K, tw = k.w * th / k.h;
      if (im) ctx.drawImage(im, tx - tw / 2, ty - th * R2.TORCH_GRIP, tw, th);
      r2Flicker(tx, ty - th * (R2.TORCH_GRIP - R2_TORCH.tw_torch_hand[1]), 0.7, g.hx); }
    if (g.spot > 0.05 || g.state === "caught") {   // he's seen something: a "?" growing to "!"
      const k = Math.min(1, g.spot / R2.SPOT_T), sure = g.state === "caught" || k >= 1;
      ctx.font = `bold ${Math.round(26 + 14 * k)}px sans-serif`; ctx.textAlign = "center"; ctx.fillStyle = sure ? "#ff5b4a" : "#ffe08a"; ctx.strokeStyle = "#2a1a0c"; ctx.lineWidth = 4;
      ctx.strokeText(sure ? "!" : "?", g.x - camX, g.y - 190); ctx.fillText(sure ? "!" : "?", g.x - camX, g.y - 190);
    }
  }
  for (const w of r2.wolves) {
    if (w.room !== r.id || w.dead || !on(w.x)) continue;
    const n = w.state === "sit" ? (w.howl > 0 && SPR.wolf_howl ? "wolf_howl" : "wolf_sit") : w.state === "home" ? "wolf_walk" : "wolf_run";
    drawSprite(n, w.state === "turn" || n === "wolf_howl" ? 0 : frameOf(n, w.t), w.x - camX, w.y, w.facing, 1, w.flash > 0 && Math.floor(w.flash * 30) % 2 ? 0.5 : 1);
  }
}
function r2GuardHand(g) { return [g.x + g.facing * R2.TORCH_DX * R2.SOLDIER_K, g.y - R2.TORCH_DY * R2.SOLDIER_K]; }
function r2Flicker(x, y, k, ph) {   // a torch's flame breathing: a warm glow that grows and shrinks
  const f = 1 + 0.12 * Math.sin(r2.t * 11 + ph) + 0.07 * Math.sin(r2.t * 23 + ph * 2), rad = 46 * k * f;
  ctx.save(); ctx.globalCompositeOperation = "lighter";
  const rg = ctx.createRadialGradient(x, y, 2, x, y, rad); rg.addColorStop(0, `rgba(255,200,110,${0.32 * f})`); rg.addColorStop(1, "rgba(255,140,40,0)");
  ctx.fillStyle = rg; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2); ctx.restore();
}
function r2DrawArrow(x, y, ang) {
  const img = typeof ITEM !== "undefined" && ITEM.jonathan_arrow;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang + 0.244);
  if (img && img.naturalWidth) { const w = 92, h = img.naturalHeight * w / img.naturalWidth; ctx.drawImage(img, -w * 0.8, -h / 2, w, h); }
  else { ctx.strokeStyle = "#5a3a1a"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(20, 0); ctx.stroke(); }
  ctx.restore();
}
function r2DrawFront(camX) {
  const r = region.room; if (!r) return;
  if (r.id === "field") {   // the stone Ezel (Glen's, 11-07): tall, in front of whoever hides behind it
    const im = kitImg("f_ezel"), k = KIT.f_ezel, s = R2.EZEL_K, x = r2.ezelX - camX - k.w * s / 2;
    if (im && x < W && x + k.w * s > 0) ctx.drawImage(im, Math.round(x), Math.round(FOOT - k.h * s + 6), k.w * s, k.h * s);
  }
  if (r2.choice) {}
  if (r.id === "field" && r2Has("r2_arrows") && Math.abs(david.x - r2.ezelX) < 140 && !region.trans && !region.script.length) upHint(r2.ezelX - camX, GR * T - R2.EZEL_K * KIT.f_ezel.h + 15);   // (Glen 11-09: Up, the way out: over the stone, drawn in front of it)
}
// David at the feast is Jonathan (Glen 11-06: Player 1 plays him when the story is his), and kneeling at the goodbye
function r2DrawDavid(d, x, y) {
  const r = region.room; if (!r) return false;
  if (region.pose && region.pose.kneel) { drawSprite("david_kneel", Math.min(SPR.david_kneel.frames - 1, Math.floor(r2.t * 6) % 99), x, y, d.facing); return true; }
  if (r.id !== "feast") return false;
  const st = d.state, air = !d.onGround;
  // (Glen 11-07) his duck: down on Down, back up when he lets go (the spear flies over: R2.SPEAR.Y is above LOW_H)
  const dt = Math.max(0, Math.min(0.1, r2.t - (r2.duckLast ?? r2.t))); r2.duckLast = r2.t;
  r2.duckT = !air && r2Crouched() ? (r2.duckT || 0) + dt : Math.max(0, (r2.duckT || 0) - dt * 1.5);
  if (r2.duckT > 0 && SPR.jonathan_duck) { drawSprite("jonathan_duck", Math.min(SPR.jonathan_duck.frames - 1, Math.floor(r2.duckT / 0.07)), x, y, d.facing, 1.08); return true; }
  const n = d.inv > 0 && SPR.jonathan_hit && d.inv > TUNE.HURT_INVINCIBLE * 0.6 ? "jonathan_hit" : air ? "jonathan_jump" : st === "run" ? "jonathan_run" : (st === "walk" || Math.abs(d.vx) > 20) ? "jonathan_walk" : "jonathan_idle";
  const fr = n === "jonathan_jump" ? Math.max(1, Math.min(SPR[n].frames - 2, Math.round((SPR[n].frames - 1) / 2 + d.vy / 1000 * (SPR[n].frames / 3)))) : frameOf(n, r2.t);
  drawSprite(n, fr, x, y, d.facing, 1.08);
  return true;
}
// the night: a moonlit wash over the room (multiplied), clear where the lamps and torches are, and their warm light
const R2_DARK = typeof document !== "undefined" ? document.createElement("canvas") : null;
function r2NightAmount(r) {
  let n = typeof r.night === "function" ? r.night() : r.night;
  if (n === "dawn") return Math.max(0.12, 1 - Math.max(0, Math.min(1, (david.x - r.c0 * T) / (r.w * T))) * 0.95);
  return n ? 1 : 0;
}
function r2DrawOver(camX) {
  const r = region.room; if (!r || !R2_DARK) return;
  const amt = r2NightAmount(r); if (amt <= 0.01) { if (r2.choice) r2DrawChoice(); return; }
  if (R2_DARK.width !== W) { R2_DARK.width = W; R2_DARK.height = H; }
  const g = R2_DARK.getContext("2d"), base = r.night === "indoor" ? R2.INDOOR : R2.NIGHT;
  const col = base.map(v => Math.round(255 - (255 - v) * amt));
  g.globalCompositeOperation = "source-over"; g.clearRect(0, 0, W, H);
  g.fillStyle = `rgb(${col})`; g.fillRect(0, 0, W, H);
  const lamps = r2.lights.filter(l => l.room === r.id).map(l => [l.x, l.y, l.r]);
  for (const q of r2.guards) if (q.room === r.id) { const [hx, hy] = r2GuardHand(q); lamps.push([hx, hy - R2.TORCH_H * R2.SOLDIER_K * (R2.TORCH_GRIP - 0.225), R2.LIGHT * 0.9]); }
  lamps.push([david.x, david.y - 60, 120]);   // (enough to see him by)
  g.globalCompositeOperation = "destination-out";
  for (const [x, y, rad] of lamps) {
    const sx = x - camX, sy = y - camY; if (sx < -rad || sx > W + rad || sy < -rad || sy > H + rad) continue;
    const rg = g.createRadialGradient(sx, sy, 4, sx, sy, rad); rg.addColorStop(0, "rgba(0,0,0,0.95)"); rg.addColorStop(0.5, "rgba(0,0,0,0.6)"); rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg; g.fillRect(sx - rad, sy - rad, rad * 2, rad * 2);
  }
  ctx.save(); ctx.globalCompositeOperation = "multiply"; ctx.drawImage(R2_DARK, 0, 0);
  ctx.globalCompositeOperation = "lighter";
  for (const [x, y, rad] of lamps.slice(0, -1)) {
    const sx = x - camX, sy = y - camY; if (sx < -rad || sx > W + rad || sy < -rad || sy > H + rad) continue;
    const rg = ctx.createRadialGradient(sx, sy, 2, sx, sy, rad * 0.6); rg.addColorStop(0, `rgba(255,170,80,${0.22 * amt})`); rg.addColorStop(1, "rgba(255,150,60,0)");
    ctx.fillStyle = rg; ctx.fillRect(sx - rad, sy - rad, rad * 2, rad * 2);
  }
  ctx.restore();
  // the arrows' question (20:37-39), over everything
  if (r2.choice) r2DrawChoice();
}
function r2DrawChoice() {
  const C = r2.choice, opts = ["It's safe: come home", "Saul means harm: go!"];
  ctx.save(); ctx.fillStyle = "rgba(20,12,6,0.82)"; ctx.beginPath(); ctx.roundRect(W / 2 - 360, 70, 720, 150, 16); ctx.fill();
  ctx.textAlign = "center"; ctx.fillStyle = "#ffe08a"; ctx.font = "bold 24px Georgia, serif"; ctx.fillText("The arrow landed beyond the boy. What does it mean?", W / 2, 112);
  opts.forEach((t, i) => { const x = W / 2 + (i ? 170 : -170), on = C.sel === i;
    ctx.fillStyle = on ? "rgba(255,215,106,0.25)" : "rgba(255,255,255,0.06)"; ctx.beginPath(); ctx.roundRect(x - 155, 140, 310, 52, 10); ctx.fill();
    if (on) { ctx.strokeStyle = "#ffd76a"; ctx.lineWidth = 3; ctx.stroke(); }
    ctx.fillStyle = on ? "#fff3c4" : "#d8cbb0"; ctx.font = "20px Georgia, serif"; ctx.fillText(t, x, 173); });
  ctx.font = "15px sans-serif"; ctx.fillStyle = "#cdb98f"; ctx.fillText("Left / Right to choose, A to answer", W / 2, 212);
  ctx.restore();
}
