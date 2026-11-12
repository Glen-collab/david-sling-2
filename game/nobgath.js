// World 3, Nob and Gath (1 Samuel 21; DESIGN.md "World 3"). Part Two's third region, on region.js's engine like
// ramah.js: loaded before region.js, which takes NOBGATH as its REGION when the address is "#9-7".
//
// First pass (Glen 11-10: "get the art in for background and rooms"): the rooms, built from Glen's World 3 pictures,
// a mix of the two styles: outside, Mario-style layers (far, mid, the ground; a near layer where there's art for one);
// inside, Castlevania rooms (Nob's sanctuary court, the tall cracked-wall shaft under it, Achish's hall).
// The people stand in their places; the story (the bread, the sword, the mash at Gath's door) comes next.
//
//   The Road to Nob -> Nob, the sanctuary court (the holy bread, Goliath's sword behind the ephod; a door down to the
//   cracked wall) -> The Road Down to Gath (Glen's sea and sycamore hills) -> Gath (his city, the gate) -> Achish's court

const R3 = {
  NPC_K: 1.2,        // the people's size here (as the prophets at Naioth)
  // (Glen 11-10: "test your might") Goliath's sword at a cracked wall: Up (or X) by it, then mash A and B while he
  // lifts the sword; the power bar decides the swing. Below GOLD: a dent (3-5 swings to break it); at GOLD: one swing
  MIGHT: {
    TIME: 2.4,         // seconds of mashing before he swings
    NEED: 26,          // presses to fill the bar (with no drain): GOLD wants about 11 a second
    DRAIN: 0.3,        // bar lost per second on its own
    GOLD: 0.9,         // the gold line: break it in one swing
    HP: 100,           // a wall's strength
    DMG: [20, 34],     // a swing's damage, from an empty bar to a full one (20: five swings; 34: three)
    HIT: 6,            // david_gsword_smash: the frame the blade lands
    REST: 0.5,         // after the blow, the blade on the ground this long
    REACH: 2.2,        // tiles from the wall to start it
    HOLE: 5,           // rows broken open at the bottom when it falls (David walks through)
  },
  GSWORD_K: 1.0,     // David with Goliath's sword, next to his usual size
  // (Glen 11-10, "like Metal Gear Solid") the streets of Gath: guards walk and look; crouch behind his hiding pieces
  // (hold Down), or step into the curtained alcove (Up) and stand with your back to the street. Seen: back to the gate
  SNEAK: {
    WALK: 58,          // a guard's walk, px/s
    LOOK: 2.2,         // he stops and looks this long at each end of his beat
    TURN: 0.45,        // ...then turns around
    SIGHT: 7.5,        // tiles he sees a standing David
    SIGHT_LOW: 2.2,    // ...and a crouching one out in the open
    SEEN_T: 0.6,       // the "!" before he calls out (hide in time and he lets it go)
    NEAR: 14,          // px past a hiding piece's edge that still counts as behind it
    CAUGHT_FADE: 1.2,  // seconds of the fade back to the gate
  },
  CARRY: { RUN_MS: 70, JUMP_LAST: 9, LAND_MS: 45,
    WHIRL: [4, 7], FLING: 9, LAST: 13, WHIRL_MS: 80 },   // the sling with the sword on his back (Glen's sheet): frames 4-7 whirl, 9 lets go   // the sword on his back: run frame time, the last jump frame used, landing frame time
  // (Glen 11-11) the holy bread (21:1-7): his Grok clip of the three of them, cut in two (nob_bread_give, nob_bread_eat),
  //  played in Nob's court in place of Ahimelech, David and Doeg, mirrored so Doeg slips off left, back toward Saul (22:9)
  BREAD: { K: 1.0, TRIGGER: 22, DAVID_DX: 131 },   // size (David's own); columns into the painted court that start it; David in the clip, left of Ahimelech (sheet px)
  // (Glen 11-11) Gath (21:10-15): at the gate the guard knows him, and he acts mad (mash, scribbling on the doors);
  //  in Achish's court, mad again before the king, then once more to get past the elite guards ("Get this crazy
  //  person out of here!"). Mash sizes: [presses to fill, seconds, drain a second] (drill.js startMash)
  MAD: { GATE_AT: 14, COURT_AT: 26, GATE: [30, 7, 0.08], KING: [36, 7, 0.10], GUARDS: [40, 7, 0.10] },
  // (Glen 11-11) the Hall of the Tribes, off Nob: his twelve tablets set in the floor, out of order. Walk them in the
  //  order Jacob blessed his sons (Genesis 49:3-27): the blessing's words show at the top, find the picture. A right
  //  one glows and stays safe; a wrong one cracks and drops him back to the door (time, not a heart)
  TRIBES: { AT: 10, STEP: 6, W: 3, SHAKE: 0.35, PROUD: 6, PAD: 16,
    // (Glen's Meta frames, cut_tribe_crumble.py: _c1 cracked, _c2 broken; the rest break in drawn pieces till theirs come)
    C1: ["asher", "dan", "gad", "issachar", "joseph", "levi", "reuben", "simeon"],
    C2: ["asher", "dan", "gad", "issachar", "joseph", "levi", "naphtali", "reuben", "simeon"],   // (Glen 11-11: SHAKE, held on a wrong one this long, then down with it)
    FLOOR: ["judah", "gad", "reuben", "joseph", "levi", "asher", "dan", "zebulun", "benjamin", "simeon", "naphtali", "issachar"] },   // (left to right)
  TABLE_K: 0.6,      // the holy bread table (w3_holy_bread_table2 is 611 x 130 at 1)
};

const NOBGATH = {
  key: "nobgath", name: "Nob and Gath", start: "nobroad", carry: ["gibeah", "ramah"],
  strCap: 8,
  rooms: [
    { id: "nobroad",  name: "The Road to Nob",       w: 90, bg: "w4_1", mx: 0, my: 1, mw: 2, right: "nob",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24, near: "w3/near_nob.png" },   // (Glen's near layer, 11-10: olive bushes, boulders, a dry-stone wall)
    { id: "nob",      name: "Nob",                   w: 110, bg: "w4_1", mx: 2, my: 1, mw: 3, left: "nobroad", right: "gathroad",
      far: "w3/nob/far", mid: "w3/nob/mid.png", midP: 0.6, near: "w3/nob/near.png", nearY: 606, floor: "w3/nob/floor.png" },   // (Glen 11-10: his far hills, his court wall on green (the tiled roofs cut off), his row of jars and baskets in front)   // (Glen's sanctuary court, the linen hangings and the bronze altar, with his tileable court either side (11-10): one copy, the room's width; the painted court from column 29)
    { id: "crack",    name: "Beneath Nob",           w: 66, up: 30, cave: true, mx: 2, my: 2, mw: 2, mh: 2,
      strip: "w3/crack_strip", floor: "w3/crack_dirt.png", band: [0.04, 0.72] },   // (his cracked wall, a storey repeating up: Castlevania)
    { id: "tribes",   name: "The Hall of the Tribes", w: 96, bg: "w4_4", mx: 4, my: 2, mw: 3,
      strip: "gibeah/halls_strip", floor: "gibeah/halls_floor" },   // (11-11: Saul's halls stand in till Glen paints Nob's own)
    { id: "gathroad", name: "The Road Down to Gath", w: 130, bg: "w4_1", mx: 5, my: 1, mw: 3, left: "nob", right: "gath",
      far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, near: "w3/near_gath.png", floor: "w3/road/ground.png" },   // (+ his near layer: sycamore shrubs, a broken jar, a mud-brick stub)
    { id: "gath",     name: "Gath",                  w: 44, bg: "w4_1", mx: 8, my: 1, mw: 2, left: "gathroad",
      far: "w3/gath/far", mid: "w3/gath/mid.png", midP: 1, midX: 170, midY: -44, near: "w3/gath/near.png", nearY: 606, floor: "w3/gath/floor.png" },   // (Glen 11-10: his dunes and sea far off; his walls and gate fixed to the room, the gate on the door at column 22; his broken jar and bricks in front)   // (his city of Gath, one copy the room's width: its own gate is the door in, at column 22)
    { id: "streets",  name: "The Streets of Gath",   w: 116, bg: "w4_1", mx: 10, my: 1, mw: 3,
      far: "w3/street/far", mid: "w3/street/mid.png", midP: 0.6, midY: -40, near: "w3/street/near.png", nearY: 606, floor: "w3/street/floor.png" },   // (Glen 11-10: his rooftops and sea far off, his houses and awnings, his baskets, jars and sacks in front, their dirt the floor)   // (Glen's street, 11-10, two copies; the sneak: hide behind his stalls and baskets)
    { id: "court",    name: "The Court of Achish",   w: 48, bg: "w4_4", mx: 13, my: 1, mw: 2,
      strip: "w3/court_strip", floor: "w3/court_floor" },
    { id: "goliath",  name: "Goliath's House",       w: 36, bg: "w4_4", mx: 12, my: 2, mw: 1,
      art: "w3/goliath_room.jpg" },   // (Glen 11-10: the giant's room, everything huge: a secret behind the cracked wall at the end of the streets)   // (Glen's hall, 11-10: his painted wall, two column-to-column bays repeating; his slabs and red rug)
  ],
  // the Journal: Glen's song, Verse 3 (SONG_PSALM57.md, his words exactly)
  steps: ["r3_bread", "r3_sword", "r3_gath", "r3_mad"],
  verse: ["They laid a net before my feet", "They dug a pit to bring me down", "But those who plotted against me", "Will fall into their own ground",
    "My heart is steadfast, O my God", "My heart is steadfast still", "Though I am hiding in this cave", "I will trust Your perfect will"],
  // (draft words, for Glen) what David writes after each story moment, and at the end
  entries: [
    ["I came to Nob hungry. Ahimelech the priest gave me the holy bread, for there was no other.", "1 Samuel 21:6"],
    ["The sword of Goliath was there, wrapped in a cloth behind the ephod. There is none like it.", "1 Samuel 21:9"],
    ["I fled to Achish, king of Gath. His servants knew me: \"Isn't this David?\" I was very afraid.", "1 Samuel 21:11-12"],
    ["I acted mad before them, and scribbled on the doors of the gate. Achish sent me away, and I escaped.", "1 Samuel 21:13-15"],
  ],
  end: ["In God I put my trust. I will not be afraid. What can man do to me?", "Psalm 56:11"],
  pitFall: () => r3TrialFall(), build: r3Build, enter: r3Enter, update: r3Update, draw: r3Draw, drawBack: r3DrawWalls, drawOver: r3DrawMight, drawDavid: r3DrawDavid,
};

const r3 = { t: 0, people: [], told: {}, walls: [], might: null, chips: [], hides: [], guards: [], inDoor: null, caughtT: 0, scene: null, mad: null };
const r3Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function r3Tell(k, text) { if (!r3.told[k]) { r3.told[k] = true; toast(text); } }
// someone standing in a room: [sprite, x, facing, size]; drawn by r3Draw, looping their sheet
function r3Person(room, name, x, facing = 1, k = R3.NPC_K, tag = null) { r3.people.push({ room, name, x, facing, k, ph: Math.random() * 3, tag }); }
// (Glen 11-11: "this guy is walking in place") someone on a walk sheet: up and down between x0 and x1, v px a second
function r3Walker(room, name, x0, x1, v, tag = null) { r3Person(room, name, x0, 1, R3.NPC_K, tag); Object.assign(r3.people[r3.people.length - 1], { walk: { x0, x1, v } }); }
function r3Prop(room, n, x, s = 1, y = null) {   // one of Glen's World 3 pieces standing on the ground (x: its middle)
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w * s / 2, y: y ?? FOOT - k.h * s, s, back: true });
}

// ---------------------------------------------------------------------------
// building
// ---------------------------------------------------------------------------
function r3Build(R) {
  r3.people.length = 0; r3.walls.length = 0; r3.hides.length = 0; r3.guards.length = 0; r3.inDoor = null; r3.caughtT = 0; r3.scene = null; r3.mad = null;

  // -- The Road to Nob (21:1): out of Gibeah's country, fields and hills, on to the priests' town
  let c = R("nobroad");
  { const X = k => (c + k) * T;
    ground(c, c + 89);
    campfire(c + 4, GR - 1);
    oliveRow(c + 10, 16, 5);
    rDeco("nobroad", "f_olive", c + 20); rDeco("nobroad", "f_rock", c + 30);
    rLowWall("nobroad", c + 36);
    { const c1 = rTerrace("nobroad", c + 44, 1); oliveRow(c + 45, onTop(FOOT - 136) - 0.4, c1 - c - 46); }
    rDeco("nobroad", "f_fig", c + 58); rBreak("jar", "nobroad", c + 62, 16);
    rDeco("nobroad", "fg_grass", c + 66, true, 1.35);
    { // (Glen 11-11) the watchtower: in the way now, to climb or jump over, and sunk into the ground (its round base
      //  stood on the dirt). Its top: TOWER_SINK px down from the art's; a boulder before it to jump from
      const k = KIT.f_tower_low, y = FOOT - k.h, top = y + 8, r0 = Math.ceil(top / T);   // (f_tower_low: Glen's tower, its bottom 86 px cut off)
      region.props.push({ room: "nobroad", n: "f_tower_low", x: (c + 74) * T + T / 2 - k.w / 2, y });
      block(c + 71, r0, 7, GR - r0, 1); for (let i = 0; i < 7; i++) for (let r = r0; r < GR; r++) artSolid.add((c + 71 + i) + "," + r);
      platAt(c + 71, top, 7); oliveRow(c + 72, onTop(top) - 0.4, 5);
      region.walls.push({ room: "nobroad", x0: (c + 71) * T, x1: (c + 78) * T, top: r0 * T, need: "wallClimb" });
      rBoulder("nobroad", c + 64);
    }
    oliveRow(c + 80, 16, 4);
    rRelic("r3_stone_road", "stone", c + 84, 16);
  }

  // -- Nob, the sanctuary court (21:1-9): Ahimelech, the holy bread (two rows of six, Leviticus 24:5-6), Goliath's
  //    sword wrapped in a cloth behind the ephod; Doeg the Edomite watching (21:7). A door down to the cracked wall
  c = R("nob");
  { const X = k => (c + k) * T;
    const P = 29;   // (the painted court starts here: his tileable court before and after it)
    ground(c, c + 109);
    campfire(c + 3, GR - 1);
    oliveRow(c + 8, 16, 5); rBreak("jar", "nob", c + 27, 16);
    rKitDoor("d_nobtribes", "nob", c + 16, "door", "d_tribesout", "w3_nob_hallhouse");   // (Glen 11-11: his priests' house, the door into the Hall of the Tribes)
//    (the olive trees over the strip's joins: gone with the layers, 11-10)   // (olive trees over the two joins, his tileable court to his painted one: the walls are different stone)
    r3Walker("nob", "nob_priest2_walk", X(17), X(26), 60);
    // (the painted court: the altar about columns P+11-17, a table P+24-33, another P+35-44, crates P+45-51; Glen's pieces in front)
    r3Prop("nob", "w3_holy_bread_table2", X(P + 28), R3.TABLE_K);
    region.props[region.props.length - 1].draw = () => !!r3.scene;   // (out of the way while the clip's own table is there)
    r3Prop("nob", "w3_ephod_stand", X(P + 40));
    if (!hasSkill("heavySword")) { r3Prop("nob", "w3_goliath_sword", X(P + 37) + 10); r3.swordProp = region.props[region.props.length - 1]; }
    r3.swordX = X(P + 37) + 10;
    r3Prop("nob", "w3_oil_lamp", X(P + 43));
    r3Person("nob", "ahimelech_idle", X(P + 34), -1, R3.NPC_K, "ahimelech");
    r3.breadX = X(P + 34); r3.breadAt = X(P + R3.BREAD.TRIGGER);
    r3Walker("nob", "nob_priest2_lamp", X(P + 15), X(P + 23), 45);
    r3Person("nob", "nob_priest1_talk", X(P + 43), -1);
    if (!r3Has("r3_bread")) r3Person("nob", "doeg_idle", X(P + 6), 1, R3.NPC_K, "doeg");   // (21:7: "detained before the LORD"; gone after the bread, off to tell Saul)
    rKitDoor("d_nobdown", "nob", c + P + 60, "stairs", "d_crackup", "w3_nob_stairhouse");   // (Glen 11-11: his cellar house over the stair down)
    oliveRow(c + 92, 16, 5); rRelic("r3_stone_nob", "stone", c + 100, 16);
  }

  // -- Beneath Nob: the cracked wall, a tall shaft of walkways and ladders (Castlevania). Goliath's sword will break
  //    its cracked walls (DESIGN.md: the heavy sword); for now, a climb with finds at the top
  c = R("crack");
  { const cr = roomById("crack"), X = k => (c + k) * T;
    ground(c, c + cr.w - 1); rock(c, TOP_ROW, cr.w, -cr.up - TOP_ROW);
    rKitDoor("d_crackup", "crack", c + 4, "door", "d_nobdown", "hall_door");
    campfire(c + 9, GR - 1);
    // (Glen 11-10) a cracked wall across the room's far end, floor to ceiling: Goliath's sword breaks a way through
    //  the bottom of it ("test your might"). Behind it, a little chamber
    r3Wall("r3_wall_crack", "crack", c + cr.w - 13, 6);
    rRelic("r3_oil_crack", "oil", c + cr.w - 4, 16); oliveRow(c + cr.w - 6, 16, 2);
    const rows = [380, 170, -40, -250, -460, -670].map((y, k) => {
      const row = []; let col = 3 + [6, 18, 4, 16, 8, 12][k];
      for (let i = 0; col + 13 + 5 * ((i + k) % 2) < cr.w - 15; i++, col += 26) row.push([col, (i + k) % 2]);   // (none past the cracked wall)
      return [y, row];
    });
    const walks = r2Walks("crack", rows, { floor: [{ x0: X(1), x1: X(cr.w - 1), y: GR * T }], ladders: true });
    const mid = u => Math.round((u.x0 + u.x1) / 2 / T);
    walks.forEach((u, i) => {
      if (i % 3 === 1) oliveRow(mid(u) - 2, u.y / T - 1.4, 4);
      if (i % 4 === 2) rBreak("jar", "crack", mid(u) + 3, onTop(u.y));
      const half = Math.floor((u.x1 - u.x0) / T / 2) - 2;
      if (i % 3 === 2 && half >= 2) beast("rat2", "crack", mid(u), { y: u.y, hy: u.y, range: half * T, state: "walk" });
    });
    const top = walks.filter(u => u.k === walks[walks.length - 1].k);
    if (top[0]) rRelic("r3_pom_crack", "pomegranate", mid(top[0]), onTop(top[0].y));
    if (top[1]) rRelic("r3_truth_crack", "truth", mid(top[1]), onTop(top[1].y),
      "Be merciful to me, God, for man wants to swallow me up. All day long he attacks and oppresses me. (Psalm 56:1)");
  }

  // -- The Hall of the Tribes (Genesis 49): twelve tablets in the floor; walk them in the order of Jacob's blessing
  c = R("tribes");
  { const tr = roomById("tribes"), K = R3.TRIBES, done = r3Has("r3_tribes");
    ground(c, c + tr.w - 1);
    rKitDoor("d_tribesout", "tribes", c + 3, "door", "d_nobtribes", "hall_door");
    r3.trial = { start: (c + 6) * T, next: done ? 12 : 0, tiles: K.FLOOR.map((name, i) => {
      const tc = c + K.AT + i * K.STEP; pitFloor(tc, K.W); platAt(tc, GR * T, K.W);
      kitImg("w3_tribe_" + name); for (const c of ["C1", "C2"]) if (K[c].includes(name)) kitImg("w3_tribe_" + name + "_" + c.toLowerCase());   // (asked for now, so they're there when he walks in; Glen's cracked and broken frames, cut_tribe_crumble.py)
      return { name, c: tc, x0: tc * T, x1: (tc + K.W) * T, lit: done, glow: 0, crack: 0, open: false, fall: 0 };
    }) };
    rRelic("r3_truth_tribes", "truth", c + tr.w - 12, 16, "All these are the twelve tribes of Israel, and this is what their father spoke to them, and blessed them. (Genesis 49:28)", "r3_tribes");
    rRelic("r3_pom_tribes", "pomegranate", c + tr.w - 7, 16, null, "r3_tribes");
    rRelic("r3_hall_key", "key", c + tr.w - 4, 16, "The priests' key! It opens the chest behind the ephod, back in the sanctuary court.", "r3_tribes");   // (Glen 11-11: the hall has to give you something)
  }

  // -- The Road Down to Gath (21:10): west to the coast, the sea far off, sycamores on the low hills. Glen's three layers
  c = R("gathroad");
  { const X = k => (c + k) * T;
    ground(c, c + 129);
    campfire(c + 4, GR - 1);
    oliveRow(c + 12, 16, 6);
    rDeco("gathroad", "f_rock", c + 22); rBreak("jar", "gathroad", c + 28, 16);
    { const c1 = rTerrace("gathroad", c + 36, 2); oliveRow(c + 37, onTop(FOOT - 136) - 0.4, c1 - c - 38); }
    rDeco("gathroad", "f_olive", c + 54); rLowWall("gathroad", c + 66);
    rDeco("gathroad", "fg_thorn", c + 72, true, 1.35);
    oliveRow(c + 80, 16, 5); rDeco("gathroad", "f_rock", c + 92);
    rRelic("r3_stone_gathroad", "stone", c + 100, 16);
    campfire(c + 110, GR - 1);
    r3Person("gathroad", "gath_guard_idle", X(124), -1);   // (the first of Achish's men, on the road in)
  }

  // -- Gath (21:10-12): Glen's city behind, its gate at the end of the road. The guards, and Achish's servants who
  //    know him ("Isn't this David the king of the land?" 21:11). The gate's doors are where he'll scribble (21:13)
  c = R("gath");
  { const X = k => (c + k) * T;
    ground(c, c + 43);
    campfire(c + 3, GR - 1);
    r3Person("gath", "gath_servants_whisper", X(11), -1, R3.NPC_K, "servants");
    r3Person("gath", "gath_guard_idle", X(18), -1, R3.NPC_K, "guard1");
    rDoor("d_gathgate", "gath", c + 22, "door", "d_streetin"); region.doors[region.doors.length - 1].noArt = true;   // (the gate in his picture)
    r3Person("gath", "gath_guard_idle", X(27), -1, R3.NPC_K, "guard2");
    r3Person("gath", "gath_guard_idle", X(38), -1);
    r3.gateAt = X(R3.MAD.GATE_AT); r3.gateX = X(22);
  }

  // -- The streets of Gath (DESIGN.md: "watched or not"): his street, guards looking up and down it, his stalls,
  //    baskets, cart, jars, washing and crates to duck behind. Achish's house at the far end
  c = R("streets");
  { const X = k => (c + k) * T;
    ground(c, c + 115);
    rDoor("d_streetin", "streets", c + 3, "door", "d_gathgate"); region.doors[region.doors.length - 1].noArt = true;   // (back out through the gate)
    campfire(c + 7, GR - 1);
    const hide = [["w3_hide_alcove", 14], ["w3_hide_sacks", 23], ["w3_hide_cart", 33], ["w3_hide_jar", 44], ["w3_hide_rug", 54], ["w3_hide_wood", 65],
      ["w3_hide_alcove", 76], ["w3_hide_sacks", 86], ["w3_hide_jar", 93]];   // (Glen 11-10: his second hiding sheet, each one big enough to crouch behind)
    for (const [n, k] of hide) r3Hide("streets", n, X(k), n === "w3_hide_alcove" ? "door" : "crouch");
    r3Guard("streets", "gath_guard", c + 19, c + 41, -1); r3Guard("streets", "gath_guard", c + 47, c + 71, 1); r3Guard("streets", "gath_elite", c + 74, c + 96, -1);
    r3.streetStart = X(6);
    oliveRow(c + 38, 16, 4); oliveRow(c + 70, 16, 4); rRelic("r3_truth_streets", "truth", c + 48, 16,
      "When I am afraid, I will put my trust in you. In God, whose word I praise, in God I have put my trust. I will not be afraid. (Psalm 56:3-4)");
    rKitDoor("d_palace", "streets", c + 101, "door", "d_courtin", "w3_gath_door");   // (Achish's house: Glen's carved GATH door)
    // (Glen 11-10) past the king's door, a cracked wall across the lane: Goliath's sword breaks through to his own house
    r3Wall("r3_wall_streets", "streets", c + 105, 4);
    rKitDoor("d_goliath", "streets", c + 112, "door", "d_goliathout", "w3_gath_door");
  }

  // -- Goliath's house (Glen's picture, 11-10): the giant's bed, his jar, his sandals, his bronze helmet (17:5). A Truth
  //    and a pomegranate for breaking in with his own sword
  c = R("goliath");
  { ground(c, c + 35);
    rDoor("d_goliathout", "goliath", c + 27, "door", "d_goliath"); region.doors[region.doors.length - 1].noArt = true;   // (his painted doorway)
    rRelic("r3_truth_goliath", "truth", c + 18, 16,
      "You come to me with a sword, with a spear, and with a javelin; but I come to you in the name of the LORD of Armies. (1 Samuel 17:45)");
    rRelic("r3_pom_goliath", "pomegranate", c + 8, 16);
  }

  // -- The court of Achish (21:14-15): his elite guard either side, the king on his throne
  c = R("court");
  { const X = k => (c + k) * T;
    ground(c, c + 47);
    rKitDoor("d_courtin", "court", c + 5, "door", "d_palace", "hall_door");
    r3Person("court", "gath_elite_idle", X(16), 1, R3.NPC_K, "elite1");
    r3Person("court", "gath_elite_idle", X(24), 1, R3.NPC_K, "elite2");
    r3.courtAt = X(R3.MAD.COURT_AT);
    r3Prop("court", "w3_throne_dais", X(37));
    r3.people.push({ room: "court", name: "achish_idle", x: X(35), facing: 1, k: R3.NPC_K, ph: 0, y: GR * T - 33, tag: "achish" });   // (standing on his dais by the throne; his sheets face left)
    r3Person("court", "gath_elite_idle", X(42), -1);
  }
}

function r3Enter(r) {
  if (r.id === "nob") r3Tell("nob", "Nob, the town of the priests. Ahimelech is at the sanctuary.");
  if (r.id === "tribes") r3TrialMend();
  if (r.id === "tribes" && !r3Has("r3_tribes")) r3Tell("tribes", "The Hall of the Tribes: a tablet for each of Jacob's twelve sons. Step on them in the order Jacob blessed them.");
  if (r.id === "crack") r3Tell("crack", "Under Nob: cracked walls. A heavy sword could break them...");
  if (r.id === "streets") r3Tell("streets", "The streets of Gath. Achish's men are everywhere: keep out of sight.");
  if (r.id === "goliath") r3Tell("goliath", "Goliath's house. Everything in it is made for a giant.");
  if (r.id === "gath") r3Tell("gath", "Gath, Goliath's own city. Achish's men are watching the road.");
}
function r3Update(dt) {
  r3.t += dt; if (r3.scene) r3.scene.t += dt;
  if (r3.mad) { r3.mad.t += dt; region.wait = Math.max(region.wait, 0.05); }   // (acting mad: he's held while the mash runs)
  const d = david, r = region.room; if (!r) return;
  for (const q of r3.chips) { q.t += dt; q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 1400 * dt; }
  r3.chips = r3.chips.filter(q => q.t < q.life);
  for (const w of r3.walls) w.shake = Math.max(0, w.shake - dt);
  if (r.id === "tribes") r3TrialUpdate(dt);
  for (const p of r3.people) if (p.walk && !r3.scene) {   // the walkers
    p.x += p.facing * p.walk.v * dt;
    if (p.x > p.walk.x1) { p.x = p.walk.x1; p.facing = -1; } else if (p.x < p.walk.x0) { p.x = p.walk.x0; p.facing = 1; }
  }
  if (r3.might) { r3MightUpdate(dt); return; }
  if (r3SneakUpdate(dt)) return;
  const free = !region.script.length && region.wait <= 0 && !region.trans && !(dialog && dialog.t > 0) && d.onGround && d.deadT <= 0;
  // Gath: the guard knows him at the gate (21:11); Achish's court (21:14-15)
  if (r.id === "gath" && !r3Has("r3_gath") && free && d.x > r3.gateAt) { r3GateScene(); return; }
  if (r.id === "court" && !r3Has("r3_mad") && free && d.x > r3.courtAt) { r3CourtScene(); return; }
  // Nob: the holy bread, the first time he walks up to Ahimelech (21:1-6)
  if (r.id === "nob" && !r3Has("r3_bread") && free && d.x > r3.breadAt && d.x < r3.breadX) { r3BreadScene(); return; }
  // Nob: Goliath's sword, wrapped in a cloth behind the ephod (21:8-9)
  if (r.id === "nob" && !hasSkill("heavySword") && Math.abs(d.x - r3.swordX) < 2.5 * T) {
    if (!r3Has("r3_hall_key")) r3Tell("swordlock", "Something long, wrapped in a cloth, locked in a chest behind the ephod. The priests keep its key in the Hall of the Tribes (their house, back near the gate).");
    else { r3Tell("sword", "Something long, wrapped in a cloth, behind the ephod. Up: ask the priest."); if (free && pressed("up")) r3SwordScene(); }
  }
  // a cracked wall: Up or X beside it, facing it, with Goliath's sword: test your might
  const w = r3.walls.find(w => w.room === r.id && !w.broken && Math.abs(d.x - (d.facing > 0 ? w.x0 : w.x1)) < R3.MIGHT.REACH * T && Math.sign((w.x0 + w.x1) / 2 - d.x) === d.facing);
  if (w && free) {
    if (!hasSkill("heavySword")) r3Tell("wallnosword", "Cracked stone, glowing in the cracks. Something heavy could break it.");
    else { r3Tell("wallsword", "A cracked wall. Up (or X) by it, then mash A and B to swing Goliath's sword!"); if (pressed("up") || pressed("x")) r3MightStart(w); }
  }
}

// ---------------------------------------------------------------------------
// Goliath's sword (21:8-9) and the cracked walls ("test your might")
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// The Hall of the Tribes (Genesis 49): Jacob's blessing, son by son, in the order he spoke it. (World English Bible)
// ---------------------------------------------------------------------------
const TRIBE_ORDER = [
  ["reuben", "Reuben", "“Boiling over like water, you shall not excel.” (Genesis 49:4)"],
  ["simeon", "Simeon", "“Simeon and Levi are brothers. Their swords are weapons of violence.” (49:5)"],
  ["levi", "Levi", "“I will divide them in Jacob.” (49:7) Levi's sons became the priests, who wore the breastplate."],
  ["judah", "Judah", "“Judah is a lion’s cub.” (49:9)"],
  ["zebulun", "Zebulun", "“He will be for a haven of ships.” (49:13)"],
  ["issachar", "Issachar", "“Issachar is a strong donkey.” (49:14)"],
  ["dan", "Dan", "“Dan will be a serpent on the trail.” (49:17)"],
  ["gad", "Gad", "“A troop will press on Gad, but he will press on their heel.” (49:19) Look for the army's tent."],
  ["asher", "Asher", "“Asher’s food will be rich.” (49:20)"],
  ["naphtali", "Naphtali", "“Naphtali is a doe set free.” (49:21)"],
  ["joseph", "Joseph", "“Joseph is a fruitful vine, a fruitful vine by a spring.” (49:22)"],
  ["benjamin", "Benjamin", "“Benjamin is a ravenous wolf.” (49:27)"],
];
function r3TrialUpdate(dt) {
  const tr = r3.trial, K = R3.TRIBES, d = david; if (!tr) return;
  for (const t of tr.tiles) {
    if (t.glow > 0) t.glow = Math.max(0, t.glow - dt);
    if (t.open) t.fall += dt;
    else if (t.crack > 0 && (t.crack += dt) > K.SHAKE) {   // it gives way
      t.open = true; t.fall = 0; sfx("stone_hit", t.x0, 0.5, 0.5); r3TrialCrumble(t);
      for (let x = t.c; x < t.c + K.W; x++) { oneway[GR][x] = false; onewayTop.delete(GR * COLS + x); }
    }
  }
  if (tr.next >= 12 || !d.onGround || d.deadT > 0 || Math.abs(d.y - GR * T) > 2) return;
  const t = tr.tiles.find(t => d.x > t.x0 && d.x < t.x1); if (!t || t.lit || t.crack > 0) return;
  if (t.name === TRIBE_ORDER[tr.next][0]) {   // the right one
    t.lit = true; t.glow = 1.2; chime(tr.next); tr.next++;
    if (tr.next === 12) {
      regionAdd("taken", "r3_tribes"); for (const u of tr.tiles) u.glow = 2.5;
      setTimeout(() => chime(5), 200); setTimeout(() => chime(7), 400);
      toast("“All these are the twelve tribes of Israel... He blessed everyone according to his own blessing.” (Genesis 49:28) A key waits at the end of the hall.");
    }
  } else {   // the wrong one: it cracks under him, he can't get off it, down they go
    t.crack = 0.001; sfx("stone_hit", t.x0, 0.35, 0.8);
    d.x = (t.x0 + t.x1) / 2; d.vx = 0; region.wait = K.SHAKE + 1.2;
  }
}
// (Glen 11-11: "crumble more") the tablet in pieces, each its own way down, and dust off the broken edges
function r3TrialCrumble(t) {
  t.pieces = [];
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++)
    t.pieces.push({ i, j, dx: (i - 1) * (20 + Math.random() * 50), dy: Math.random() * 40, spin: (Math.random() - 0.5) * 5, late: Math.random() * 0.12 });
  for (let k = 0; k < 22; k++) r3.chips.push({ x: t.x0 + Math.random() * (t.x1 - t.x0), y: GR * T - 4, vx: (Math.random() - 0.5) * 260, vy: -80 - Math.random() * 260, t: 0, life: 0.6 + Math.random() * 0.5, r: 3 + Math.random() * 7 });
}
function r3TrialMend() {   // every broken tablet back in the floor (after a fall, and coming back into the hall)
  const tr = r3.trial; if (!tr) return;
  for (const t of tr.tiles) if (t.open || t.crack > 0) { t.open = false; t.crack = 0; t.fall = 0; t.pieces = null; platAt(t.c, GR * T, R3.TRIBES.W); }
}
function r3TrialFall() {   // main.js pitFall: down through a wrong tablet, back to the door, no heart lost
  const tr = r3.trial, r = region.room; if (!tr || !r || r.id !== "tribes") return false;
  const d = david, K = R3.TRIBES;
  r3TrialMend(); region.wait = 0;
  d.x = tr.start; d.y = GR * T; d.vx = d.vy = 0; d.facing = 1; d.inv = 0.6; setState("idle"); snapCamera();
  toast(`Not that one: back to the door. Listen again: ${TRIBE_ORDER[tr.next][1]}.`);
  return true;
}
function r3TrialDraw(camX) {
  const tr = r3.trial, K = R3.TRIBES; if (!tr) return;
  for (const t of tr.tiles) {
    const x = t.x0 - camX, w = t.x1 - t.x0; if (x > W || x + w < 0) continue;
    const im = kitImg("w3_tribe_" + t.name);
    if (t.open) {   // the hole, and the tablet dropping away
      if (!t.jag) { t.jag = []; for (let k = 0; k <= 10; k++) t.jag.push(Math.random()); }   // (its broken edge: fixed once)
      const g = ctx.createLinearGradient(0, GR * T, 0, H); g.addColorStop(0, "#1a120c"); g.addColorStop(0.35, "#050302"); g.addColorStop(1, "#000");
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 8, H); ctx.lineTo(x - 8, GR * T + 6);
      t.jag.forEach((v, k) => ctx.lineTo(x - 8 + (w + 16) * k / 10, GR * T - 4 + v * 14 + (k === 0 || k === 10 ? 10 : 0)));
      ctx.lineTo(x + w + 8, H); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "rgba(90,64,40,0.9)";   // the broken stone lips, either side
      for (const s of [-1, 1]) { const ex = s < 0 ? x - 8 : x + w + 8; ctx.beginPath(); ctx.moveTo(ex, GR * T - 2); ctx.lineTo(ex - s * 16, GR * T + 4 + t.jag[s < 0 ? 1 : 9] * 10); ctx.lineTo(ex, GR * T + 26); ctx.closePath(); ctx.fill(); }
      const c2 = K.C2.includes(t.name) && kitImg("w3_tribe_" + t.name + "_c2");
      if (c2 && c2.naturalWidth && t.fall < 1.0) {   // (Glen's broken frame, dropping away)
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - t.fall / 1.0);
        const s = w / 216; ctx.drawImage(c2, Math.round(x - K.PAD * s), GR * T - K.PROUD - K.PAD * s + t.fall * t.fall * 1000, c2.naturalWidth * s, c2.naturalHeight * s); ctx.restore();   // (the kit is at 216 a tablet)
      } else if (im && t.pieces && t.fall < 1.1 && !(c2 && c2.naturalWidth)) {
        const pw = im.width / 3, ph = im.height / 2, sw = (w - 12) / 3, sh = sw * ph / pw;
        for (const p of t.pieces) { const f = Math.max(0, t.fall - p.late);
          ctx.save(); ctx.globalAlpha = Math.max(0, 1 - f / 1.0);
          ctx.translate(x + 6 + (p.i + 0.5) * sw + p.dx * f, GR * T - K.PROUD + (p.j + 0.5) * sh + p.dy * f + f * f * 1100); ctx.rotate(p.spin * f);
          ctx.drawImage(im, p.i * pw, p.j * ph, pw, ph, -sw / 2, -sh / 2, sw, sh); ctx.restore(); }
      }
      continue;
    }
    if (!im) continue;
    const j = t.crack > 0 ? (Math.random() - 0.5) * 6 : 0, h = w * im.height / im.width;
    const c1 = t.crack > 0 && K.C1.includes(t.name) && kitImg("w3_tribe_" + t.name + "_c1");
    if (c1 && c1.naturalWidth) { const s = w / 216; ctx.drawImage(c1, Math.round(x + j - K.PAD * s), GR * T - K.PROUD - K.PAD * s, c1.naturalWidth * s, c1.naturalHeight * s); }   // (Glen's cracked frame)
    else ctx.drawImage(im, Math.round(x + j), GR * T - K.PROUD, w, h);
    if (t.lit) {   // the blessing on it: gold
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = `rgba(255,190,70,${0.32 + Math.min(1, t.glow) * 0.3})`;
      ctx.beginPath(); ctx.roundRect(x + 3, GR * T - K.PROUD + 3, w - 6, h - 6, 10); ctx.fill(); ctx.restore();
      ctx.strokeStyle = "rgba(255,215,120,0.9)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x + 3, GR * T - K.PROUD + 3, w - 6, h - 6, 10); ctx.stroke();
    }
  }
}
function r3TrialBanner() {   // the next son's blessing, at the top
  const tr = r3.trial; if (!tr || tr.next >= 12) return;
  const [, name, words] = TRIBE_ORDER[tr.next];
  ctx.save(); ctx.textAlign = "center";
  ctx.font = "19px Georgia, serif"; const wd = Math.min(W - 40, Math.max(560, ctx.measureText(words).width + 60));
  ctx.fillStyle = "rgba(25,14,6,0.78)"; ctx.beginPath(); ctx.roundRect(W / 2 - wd / 2, 14, wd, 84, 12); ctx.fill();
  ctx.fillStyle = "#e9dcc4"; ctx.font = "15px sans-serif";
  ctx.fillText(`Jacob blesses his sons (Genesis 49)     ${tr.next} of 12`, W / 2, 36);
  ctx.fillStyle = "#ffe08a"; ctx.font = "bold 24px Georgia, serif"; ctx.fillText(name, W / 2, 63);
  ctx.fillStyle = "#fff6e2"; ctx.font = "19px Georgia, serif"; ctx.fillText(words, W / 2, 88);
  ctx.restore();
}
function r3BreadScene() {
  const B = R3.BREAD, give = SPR.nob_bread_give, eat = SPR.nob_bread_eat;
  const long = give && eat ? (give.frames * give.ms + eat.frames * eat.ms) / 1000 : 0;
  david.facing = 1;
  rPlay([
    { say: ["Ahimelech", "Why are you alone, and no one with you? (1 Samuel 21:1)"] },
    { say: ["David", "The king has sent me on a matter. Now, what do you have on hand? Give me five loaves of bread, or whatever is here. (1 Samuel 21:2-3)"] },
    { say: ["Ahimelech", "There is no common bread on hand, but there is holy bread. (1 Samuel 21:4)"] },
    { fn() { if (long) { r3.scene = { id: "bread", t: 0 }; region.pose = { hide: true }; } }, wait: long },
    { fn() {
      r3.scene = null; region.pose = null;
      r3.people = r3.people.filter(p => p.tag !== "doeg");   // (Doeg's gone: off to Saul, 22:9)
      david.x = r3.breadX - B.DAVID_DX * SCALE * B.K; david.facing = -1;   // (where he stands in the clip)
      david.hearts = david.maxHearts; breadSet(BREAD_GIVEN);   // (main.js: five loaves to carry; one is eaten when a hit would finish him)
      regionAdd("taken", "r3_bread");
      toast(`The holy bread (1 Samuel 21:6): strength restored, and ${BREAD_GIVEN} loaves to carry. When you're about to fall, David eats one. And the man who was watching is gone...`);
    } },
  ]);
}
// ---------------------------------------------------------------------------
// Gath (1 Samuel 21:10-15): David acting mad
// ---------------------------------------------------------------------------
const r3Who = tag => r3.people.find(p => p.tag === tag);
function r3Anim(tag, name, facing) { const p = r3Who(tag); if (p && SPR[name]) { p.name = name; p.ph = -r3.t; if (facing) p.facing = facing; } }   // (from its first frame)
function r3MadMash(title, [need, time, drain], pose, then) {   // David acting mad (pose: his sheet) while you mash; then
  david.vx = 0; r3.mad = { pose, t: 0 };
  startMash({ title, need, time, drain, onDone() { r3.mad = null; region.wait = 0; then(); } });
}
function r3GateScene() {
  const d = david; d.facing = 1;
  rPlay([
    { fn() { r3Anim("guard1", "gath_guard_point"); }, wait: 0.8 },
    { say: ["A guard of Gath", "Isn't this David, the king of the land? Didn't they sing about him in their dances: \"Saul has struck down his thousands, and David his ten thousands\"? (1 Samuel 21:11)"] },
    { say: ["", "David took these words to heart, and was very afraid of Achish the king of Gath. (1 Samuel 21:12)"] },
    { fn() {
      regionAdd("taken", "r3_gath"); d.x = r3.gateX - 10; d.facing = 1;   // (at the doors)
      r3MadMash("Act mad! Scribble on the gate!", R3.MAD.GATE, "david_mad_scribble", () => {
        r3Anim("guard1", "gath_guard_laugh"); r3Anim("guard2", "gath_guard_laugh");
        rPlay([
          { say: ["", "He scribbled on the doors of the gate, and let his spit run down his beard. (1 Samuel 21:13)"], wait: 0.3 },
          { say: ["A guard of Gath", "Ha! Look at him! That's no king, that's a madman. Let him in. Achish can laugh at him too."] },
          { fn() { r3Anim("guard1", "gath_guard_idle"); r3Anim("guard2", "gath_guard_idle"); } },
        ]);
      });
    } },
  ]);
}
function r3CourtScene() {
  const d = david; d.facing = 1;
  r3Anim("elite1", "gath_elite_idle", -1); r3Anim("elite2", "gath_elite_idle", -1);   // (they turn to him)
  rPlay([
    { say: ["", "Achish's servants brought David before the king. So he changed his behavior before them, and acted mad in their hands. (1 Samuel 21:13)"] },
    { fn() { r3MadMash("Act mad before the king!", R3.MAD.KING, "david_mad_stagger", () => {
      r3Anim("achish", "achish_exasperated");
      rPlay([
        { say: ["Achish", "Look, the man is mad! Why have you brought him to me? Do I lack madmen, that you've brought this fellow to play the madman in front of me? Shall this fellow come into my house? (1 Samuel 21:14-15)"] },
        { fn() { r3Anim("achish", "achish_point"); r3Anim("elite1", "gath_elite_block", -1); r3Anim("elite2", "gath_elite_block", -1); } },
        { say: ["", "The king's guards close in. Keep it up, all the way out the door!"] },
        { fn() { r3MadMash("Get past the guards! Keep acting crazy!", R3.MAD.GUARDS, "david_mad_stagger", () => {
          rPlay([
            { say: ["A royal guard", "Get this crazy person out of here!"] },
            { fn() { regionAdd("taken", "r3_mad"); } },
            { say: ["", "So David departed from there, and escaped to the cave of Adullam. (1 Samuel 22:1)"] },
            { fn() { regionAdd("taken", "g_exit_open"); jsceneOpen(true); } },
          ]);
        }); } },
      ]);
    }); } },
  ]);
}
function r3SwordScene() {
  david.facing = 1;
  rPlay([
    { say: ["David", "Isn't there here under your hand spear or sword? For I have brought neither my sword nor my weapons with me, because the king's business required haste. (1 Samuel 21:8)"] },
    { say: ["Ahimelech", "The sword of Goliath the Philistine, whom you killed in the valley of Elah, behold, it is here wrapped in a cloth behind the ephod. If you would take that, take it; for there is no other except that here. (1 Samuel 21:9)"] },
    { say: ["David", "There is none like that. Give it to me. (1 Samuel 21:9)"] },
    { fn() { regionAdd("taken", "r3_sword"); learnSkill("heavySword"); const i = region.props.indexOf(r3.swordProp); if (i >= 0) region.props.splice(i, 1); } },
  ]);
}
function r3Wall(id, room, c, w) {   // a cracked wall from column c, w wide, floor to the room's top: solid till it's broken
  const up = roomById(room).up || 0, broken = r3Has(id);
  const o = { id, room, c, w, x0: c * T, x1: (c + w) * T, up, hp: R3.MIGHT.HP, hits: 0, broken, shake: 0 };
  r3.walls.push(o); for (let i = 1; i <= 5; i++) kitImg("w3_crackwall-" + i);
  block(c, -up, w, GR + up, 6); if (broken) r3WallOpen(o);   // (material 6: solid, but no dirt fill drawn: only his wall shows)
  for (let k = 0; k < w; k++) artSolid.add((c + k) + "," + -up);
}
function r3WallOpen(o) {   // the hole at the bottom: broken through, the rest stays
  for (let x = o.c; x < o.c + o.w; x++) for (let y = GR - R3.MIGHT.HOLE; y < GR; y++) solid[y][x] = 0;
}
function r3MightStart(w) {
  const d = david; d.vx = 0; d.facing = Math.sign((w.x0 + w.x1) / 2 - d.x) || 1;
  r3.might = { w, phase: "mash", t: 0, level: 0, presses: 0, flash: 0, gold: false };
  sfx("sling_charge", d.x, 0.6, 0.7);
}
function r3MightUpdate(dt) {
  const m = r3.might, M = R3.MIGHT, d = david; m.t += dt; m.flash = Math.max(0, m.flash - dt);
  region.wait = Math.max(region.wait, 0.05);   // (David holds still: region.js regionHoldDavid)
  if (m.phase === "mash") {
    for (const b of ["a", "b"]) { const n = (pressed(b) ? 1 : 0) + (typeof p2 !== "undefined" && p2.on && pressed2(b) ? 1 : 0); if (n) { m.level += n / M.NEED; m.presses += n; m.flash = 0.1; } }
    m.level = Math.max(0, Math.min(1, m.level - M.DRAIN * dt));
    if (m.t >= M.TIME) { m.phase = "smash"; m.t = 0; m.power = m.level; m.gold = m.level >= M.GOLD; }
  } else if (m.phase === "smash") {
    const S = SPR.david_gsword_smash, f = Math.floor(m.t * 1000 / S.ms);
    if (f >= M.HIT && !m.hit) {
      m.hit = true; const w = m.w, per = M.DMG[0] + (M.DMG[1] - M.DMG[0]) * m.power, dmg = m.gold ? w.hp : per;
      w.hp -= dmg; w.hits++; w.shake = 0.35; sfx("stone_hit", w.x0, 1, m.gold ? 0.5 : 0.75);
      const cx = d.facing > 0 ? w.x0 : w.x1, cy = GR * T - 90;
      for (let i = 0; i < (m.gold ? 30 : 12); i++) r3.chips.push({ x: cx, y: cy + (Math.random() - 0.5) * 120, vx: -d.facing * (60 + Math.random() * 280) * (Math.random() < 0.3 ? -1 : 1), vy: -150 - Math.random() * 450, t: 0, life: 0.9 + Math.random() * 0.5, r: 4 + Math.random() * 8 });
      if (w.hp <= 0.5) {
        w.broken = true; regionAdd("taken", w.id); r3WallOpen(w); sfx("thunder", w.x0, 0.5, 1.4);
        if (typeof chime === "function") chime(m.gold ? 7 : 5);
        toast(m.gold ? "GOLD STANDARD! One swing, and the wall's down!" : "The wall gave way!");
      } else toast(`Crack! ${Math.max(1, Math.ceil(w.hp / per))} more like that... or mash harder for gold.`);
    }
    if (m.t * 1000 >= S.ms * S.frames) { m.phase = "rest"; m.t = 0; }
  } else if (m.phase === "rest" && m.t >= M.REST) { r3.might = null; region.wait = 0; }
}
// David with Goliath's sword (region.js drawDavid hook): lifted while you mash, the smash, the blade on the ground
function r3DrawDavid(d, x, y) {
  const m = r3.might;
  if (r3.mad && SPR[r3.mad.pose]) {   // acting mad: wilder as the bar fills
    const k = typeof mash !== "undefined" ? mash.level : 0.5, sh = (Math.random() - 0.5) * 3 * k;
    drawSprite(r3.mad.pose, frameOf(r3.mad.pose, r3.mad.t * (0.7 + k * 1.3)), x + sh, y, d.facing, R3.GSWORD_K); return true;
  }
  if (r3.inDoor) {   // in the alcove, his back to the street, in its shadow
    // (Glen 11-11, his clip) he walks in, turns, and crouches down to hide (david_hide_crouch, once, then held);
    //  the cloaked back walk's first frame if the sheet's missing
    const c = SPR.david_hide_crouch;
    ctx.save(); ctx.filter = "brightness(0.62)";
    if (c) drawSprite("david_hide_crouch", Math.min(c.frames - 1, Math.floor((r3.t - r3.inDoorAt) * 1000 / c.ms)), x, y, d.facing, 0.92);
    else if (SPR.david_back_walk) drawSprite("david_back_walk", 0, x, y, 1, 0.92);
    ctx.restore(); return true;
  }
  if (!m) return r3DrawCarry(d, x, y);
  const n = m.phase === "mash" ? "david_gsword_hold" : m.phase === "smash" ? "david_gsword_smash" : "david_gsword_rest";
  if (!SPR[n]) return false;
  const fr = m.phase === "smash" ? Math.min(SPR[n].frames - 1, Math.floor(m.t * 1000 / SPR[n].ms)) : frameOf(n, m.t * (m.phase === "mash" ? 0.6 + m.level * 1.6 : 1));
  const sh = m.phase === "mash" ? (Math.random() - 0.5) * 4 * m.level : 0;   // (straining: he shakes as the bar fills)
  drawSprite(n, fr, x + sh, y, d.facing, R3.GSWORD_K);
  return true;
}
// ---------------------------------------------------------------------------
// the streets of Gath: the sneak (Glen 11-10, "like Metal Gear Solid")
// ---------------------------------------------------------------------------
function r3Hide(room, n, x, kind) {   // one of his hiding pieces, in front of David (he crouches behind it, or stands in it)
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w / 2, y: FOOT - k.h, front: kind === "crouch", back: kind !== "crouch" });   // (the alcove behind him: he stands in its doorway)
  r3.hides.push({ room, n, x, x0: x - k.w / 2, x1: x + k.w / 2, kind });
}
function r3Guard(room, name, c0, c1, facing) {   // a guard walking his beat, c0 to c1, stopping to look at each end
  r3.guards.push({ room, name, from: c0 * T, to: c1 * T, x: (facing > 0 ? c0 : c1) * T, y: GR * T, facing, state: "walk", t: Math.random() * 2, seen: 0 });
}
function r3Hidden() {   // in the alcove; or crouched behind a piece
  const d = david, S = R3.SNEAK;
  if (r3.inDoor) return true;
  return d.h === LOW_H && r3.hides.some(h => h.room === region.room.id && h.kind === "crouch" && d.x > h.x0 - S.NEAR && d.x < h.x1 + S.NEAR);
}
function r3Sees(g) {
  const d = david, dx = d.x - g.x, S = R3.SNEAK;
  if (g.room !== region.room.id || d.deadT > 0 || r3.caughtT > 0 || Math.sign(dx) !== g.facing || Math.abs(d.y - g.y) > 90) return false;
  if (g.state === "turn" || r3Hidden()) return false;
  return Math.abs(dx) < (d.h === LOW_H ? S.SIGHT_LOW : S.SIGHT) * T;
}
function r3SneakUpdate(dt) {   // true: David's held (in the alcove, or caught)
  const d = david, r = region.room, S = R3.SNEAK;
  if (r3.caughtT > 0) {
    const before = r3.caughtT; r3.caughtT -= dt; region.wait = Math.max(region.wait, 0.05);
    if (before > S.CAUGHT_FADE / 2 && r3.caughtT <= S.CAUGHT_FADE / 2) {   // in the dark: back by the gate, the guards back on their beats
      r3.inDoor = null; d.h = STAND_H; moveParty(r3.streetStart, GR * T); d.facing = 1; snapCamera();
      for (const g of r3.guards) { g.seen = 0; g.state = "walk"; g.t = 0; g.x = g.facing > 0 ? g.from : g.to; }
    }
    if (r3.caughtT <= 0) region.wait = 0;
    return true;
  }
  if (r.id !== "streets") { r3.inDoor = null; return false; }
  for (const g of r3.guards) {
    g.t += dt;
    if (g.state === "walk") {
      g.x += g.facing * S.WALK * dt;
      if ((g.facing > 0 && g.x >= g.to) || (g.facing < 0 && g.x <= g.from)) { g.x = Math.max(g.from, Math.min(g.to, g.x)); g.state = "look"; g.t = 0; }
    } else if (g.state === "look" && g.t > S.LOOK) { g.state = "turn"; g.t = 0; }
    else if (g.state === "turn" && g.t > S.TURN) { g.facing *= -1; g.state = "walk"; g.t = 0; }
    if (r3Sees(g)) { g.seen += dt; if (g.seen > S.SEEN_T) { r3Caught(g); return true; } } else g.seen = Math.max(0, g.seen - dt * 2);
  }
  if (!r3.told.sneak && r3.guards.some(g => g.room === "streets" && Math.abs(d.x - g.x) < 12 * T)) {
    r3.told.sneak = true; toast("Achish's guards! When one looks your way, crouch behind something (hold Down), or step into an alcove (Up). Go when his back is turned.");
  }
  if (r3.inDoor) {   // standing in the alcove: any direction, or jump, steps back out
    region.wait = Math.max(region.wait, 0.05);
    if (pressed("down") || pressed("left") || pressed("right") || pressed("a")) { r3.inDoor = null; region.wait = 0; }
    return true;
  }
  const free = !region.script.length && region.wait <= 0 && !region.trans && !(dialog && dialog.t > 0) && d.onGround && d.deadT <= 0;
  const al = r3.hides.find(h => h.room === "streets" && h.kind === "door" && Math.abs(d.x - h.x) < (h.x1 - h.x0) / 2);
  if (al && free && pressed("up")) { r3.inDoor = al; r3.inDoorAt = r3.t; d.x = al.x; d.vx = 0; return true; }
  return false;
}
function r3Caught(g) {
  r3.caughtT = R3.SNEAK.CAUGHT_FADE; g.seen = 0; david.vx = 0;
  toast(g.name === "gath_elite" ? "One of the king's own guard saw you! Back to the gate." : "A guard saw you! Back to the gate. Hide while one looks your way.");
}
function r3DrawSneak(camX, idle) {
  const r = region.room, d = david, S = R3.SNEAK; if (r.id !== "streets") return;
  for (const g of r3.guards) {
    const x = g.x - camX; if (x < -400 || x > W + 400) continue;
    if (g.state !== "turn") {   // where he's looking: a soft wedge (a help for little players), red when he's noticed you
      const reach = S.SIGHT * T, col = g.seen > 0 ? "255,70,40" : "255,214,90", gr = ctx.createLinearGradient(x, 0, x + g.facing * reach, 0);
      gr.addColorStop(0, `rgba(${col},0.38)`); gr.addColorStop(1, `rgba(${col},0.04)`);
      ctx.save(); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x + g.facing * 20, g.y - 120); ctx.lineTo(x + g.facing * reach, g.y - 165); ctx.lineTo(x + g.facing * reach, g.y); ctx.lineTo(x + g.facing * 20, g.y - 70); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    const elite = g.name === "gath_elite", n = g.seen > 0 && !elite && SPR.gath_guard_point ? "gath_guard_point" : g.name + (g.state === "walk" ? "_walk" : "_idle");
    if (SPR[n]) drawSprite(n, n.endsWith("point") ? Math.min(SPR[n].frames - 1, Math.floor(g.seen / S.SEEN_T * 6)) : frameOf(n, Math.max(0, g.t)), x, g.y, g.facing, R3.NPC_K);
    if (g.seen > 0) { ctx.save(); ctx.fillStyle = "#ffdc4a"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 5; ctx.font = "bold 44px sans-serif"; ctx.textAlign = "center"; ctx.strokeText("!", x, g.y - 175); ctx.fillText("!", x, g.y - 175); ctx.restore(); }
  }
  if (!idle || r3.inDoor) return;
  for (const h of r3.hides) {   // next to a real hiding place: a little badge (Down: crouch behind it; Up: step in)
    if (h.room !== "streets" || d.x < h.x0 - 20 || d.x > h.x1 + 20) continue;
    const bx = h.x - camX, by = FOOT - KIT[h.n].h - 30;
    if (h.kind === "door") upHint(bx, by);
    else if (d.h !== LOW_H) { const bob = Math.sin(performance.now() / 180) * 4;
      ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.beginPath(); ctx.roundRect(bx - 22, by - 24 + bob, 44, 34, 10); ctx.fill();
      ctx.fillStyle = "#4a3a2a"; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center"; ctx.fillText("↓", bx, by + 2 + bob); ctx.restore(); }
  }
}

// (Glen 11-10) with Goliath's sword, it's on his back: his walk, run, jump, flip and landing clips. Standing still (no
//  (Glen 11-10, his straight-up jump and standing clips too)
function r3DrawCarry(d, x, y) {
  if (!hasSkill("heavySword") || d.swordT >= 0 || d.shield || (typeof w9 !== "undefined" && w9.pose)) return false;   // (his sword, his shield, a scene: drawn as usual)
  const K = R3.GSWORD_K, t = d.t, mid = y - d.h / 2 - 6;   // (the in-air sheets are centered, like his own)
  if (d.throwT >= 0) return d.state !== "roll" && d.state !== "flip" && r3DrawCarryThrow(d, x, y, K);
  const has = n => !!SPR[n], one = (n, ms) => Math.min(SPR[n].frames - 1, Math.floor(t * 1000 / ms));
  switch (d.state) {
    case "idle": if (!has("david_gsword_idle")) return false;
      drawSprite("david_gsword_idle", frameOf("david_gsword_idle", t), x, y, d.facing, K); return true;
    case "walk": if (!has("david_gsword_walk")) return false;
      drawSprite("david_gsword_walk", frameOf("david_gsword_walk", t * Math.max(0.6, Math.abs(d.vx) / TUNE.WALK_SPEED)), x, y, d.facing, K); return true;
    case "run": if (!has("david_gsword_run")) return false;
      drawSprite("david_gsword_run", frameOf("david_gsword_run", t, R3.CARRY.RUN_MS), x, y, d.facing, K); return true;
    case "jump": { if (!has("david_gsword_jump")) return false;   // rising to falling: straight up, tucked, feet down
      const k = Math.max(0, Math.min(1, (d.vy + TUNE.JUMP_SPEED) / (2 * TUNE.JUMP_SPEED)));
      drawSprite("david_gsword_jump", 1 + Math.round(k * (R3.CARRY.JUMP_LAST - 1)), x, mid, d.facing, K); return true; }
    case "flip": if (!has("david_gsword_flip")) return false;
      drawSprite("david_gsword_flip", one("david_gsword_flip", 60), x, mid, d.facing, K); return true;   // (60 ms: his own flip's length)
    case "land": if (!has("david_gsword_land")) return false;
      drawSprite("david_gsword_land", one("david_gsword_land", R3.CARRY.LAND_MS), x, y, d.facing, K); return true;
  }
  return false;
}
// (Glen 11-11) the sling with the sword on his back: charging on the run (his legs keep going, the sling whirling), or
//  standing (and in the air, and the throw from a run): the whirl, then the fling on the frame the stone leaves
const R3_RUN_SLING_STONE = [[-6, 231], [132, 195], [-51, 203], [115, 206], [-78, 213], [96, 214], [-84, 196], [108, 208], [-36, 216], [130, 200]];
function r3DrawCarryThrow(d, x, y, K) {
  const C = R3.CARRY, run = "david_gsword_run_sling", st = "david_gsword_sling_throw";
  let gx, gy;
  if (d.charging && d.onGround && Math.abs(d.vx) > TUNE.RUN_THROW_SPEED && SPR[run]) {
    const i = frameOf(run, d.t * Math.max(0.7, Math.abs(d.vx) / TUNE.RUN_SPEED));
    drawSprite(run, i, x, y, d.facing, K);
    const p = R3_RUN_SLING_STONE[i] || R3_RUN_SLING_STONE[0], sc = SCALE * K;
    gx = x + d.facing * p[0] * sc; gy = y - p[1] * sc;
  } else {
    if (!SPR[st]) return false;
    let i;
    if (d.charging) i = C.WHIRL[0] + Math.floor(d.charge * 1000 / C.WHIRL_MS) % (C.WHIRL[1] - C.WHIRL[0] + 1);
    else {   // the throw: the whirl to the fling by the moment main.js lets the stone go, then on to standing
      const dur = d.runThrow ? TUNE.RUN_THROW_TIME : TUNE.THROW_TIME, rel = (d.runThrow || d.aimingUp ? 9.5 : 7) / 12;
      const u = Math.min(1, d.throwT / dur);
      i = u < rel ? C.WHIRL[0] + Math.floor(u / rel * (C.FLING - C.WHIRL[0])) : C.FLING + Math.floor((u - rel) / (1 - rel) * (C.LAST - C.FLING + 0.99));
      i = Math.min(C.LAST, i);
    }
    drawSprite(st, i, x, y, d.facing, K);
    gx = x - d.facing * 8; gy = y - 230 * SCALE * K;   // (whirling over his head)
  }
  if (d.charging && d.charge >= TUNE.CHARGE_TIME && hasSkill("charge")) {   // the gold glow, as without the sword
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, 30);
    g.addColorStop(0, "rgba(255,215,100,0.85)"); g.addColorStop(1, "rgba(255,180,40,0)");
    ctx.fillStyle = g; ctx.fillRect(gx - 34, gy - 34, 68, 68); ctx.restore();
  }
  return true;
}
// the walls (behind David): Glen's five stages (11-10), one more broken with each hit: 1 whole, 2-4 a hit each,
//  5 broken through (or straight to 5 with a gold swing). Whole stage 1 repeats above it on up the shaft
function r3WallStage(w) { return w.broken ? 5 : Math.min(4, 1 + w.hits); }
function r3DrawWalls(camX) {
  const r = region.room; if (!r) return;
  const k = KIT["w3_crackwall-1"], top = kitImg("w3_crackwall-1");
  for (const w of r3.walls) {
    const im = kitImg("w3_crackwall-" + r3WallStage(w)) || top;
    if (w.room !== r.id || !im) continue;
    const ww = w.w * T, s = ww / k.w, ph = k.h * s, sh = w.shake > 0 ? Math.sin(r3.t * 90) * 6 * w.shake / 0.35 : 0;
    const x = w.x0 - camX + sh; if (x > W || x + ww < 0) continue;
    let y = FOOT - ph; ctx.drawImage(im, x, y, ww, ph);
    if (top) for (y -= ph - 6; y > camY - ph; y -= ph - 6) ctx.drawImage(top, x, y, ww, ph);   // (the wall goes on up)
  }
}
// over everything: the chips of stone, and the power bar ("test your might")
function r3DrawMight() {
  if (region.room && region.room.id === "tribes") r3TrialBanner();
  if (r3.caughtT > 0) { const k = 1 - Math.abs(r3.caughtT - R3.SNEAK.CAUGHT_FADE / 2) / (R3.SNEAK.CAUGHT_FADE / 2); ctx.fillStyle = `rgba(0,0,0,${k})`; ctx.fillRect(0, 0, W, H); }
  for (const q of r3.chips) { ctx.globalAlpha = Math.max(0, 1 - q.t / q.life); ctx.fillStyle = "#e3d3b0"; ctx.fillRect(q.x - camX - q.r / 2, q.y - camY - q.r / 2, q.r, q.r); }
  ctx.globalAlpha = 1;
  const m = r3.might; if (!m) return;
  const M = R3.MIGHT, cx = W / 2, top = 150, bh = 330, bw = 46, bx = W - 170;
  ctx.save(); ctx.textAlign = "center"; ctx.lineJoin = "round";
  if (m.phase === "mash") {
    ctx.font = "bold 44px Georgia, serif"; ctx.fillStyle = "#ffd76a"; ctx.strokeStyle = "#2a1a0a"; ctx.lineWidth = 7;
    ctx.strokeText("TEST YOUR MIGHT!", cx, 110); ctx.fillText("TEST YOUR MIGHT!", cx, 110);
    ctx.font = "bold 20px sans-serif"; ctx.fillStyle = "#fff"; ctx.lineWidth = 5; ctx.strokeText("Mash A and B!", cx, 142); ctx.fillText("Mash A and B!", cx, 142);
  }
  // the bar: filling up from the bottom, the gold line near the top
  const lv = m.phase === "mash" ? m.level : m.power;
  ctx.fillStyle = "rgba(10,8,6,0.7)"; ctx.fillRect(bx - 10, top - 10, bw + 20, bh + 44);
  const g = ctx.createLinearGradient(0, top + bh, 0, top); g.addColorStop(0, "#7a2a14"); g.addColorStop(0.5, "#d0602a"); g.addColorStop(0.85, "#f0b040"); g.addColorStop(1, "#fff2a0");
  ctx.fillStyle = g; ctx.fillRect(bx, top + bh * (1 - lv), bw, bh * lv);
  if (m.flash > 0) { ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(bx, top + bh * (1 - lv), bw, bh * lv); }
  const gy = top + bh * (1 - M.GOLD); ctx.fillStyle = "#ffd700"; ctx.fillRect(bx - 14, gy - 2, bw + 28, 4);
  ctx.font = "bold 13px sans-serif"; ctx.fillText("GOLD", bx + bw / 2, gy - 8);
  ctx.strokeStyle = "#ffd76a"; ctx.lineWidth = 2; ctx.strokeRect(bx, top, bw, bh);
  if (m.phase === "mash") { const left = Math.max(0, 1 - m.t / M.TIME); ctx.fillStyle = left > 0.3 ? "#7fdc7a" : "#ff6a4a"; ctx.fillRect(bx, top + bh + 14, bw * left, 8); }
  if (m.gold && m.phase !== "mash") {
    ctx.font = "bold 52px Georgia, serif"; ctx.fillStyle = "#ffd700"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 8;
    ctx.globalAlpha = Math.min(1, m.t * 4); ctx.strokeText("GOLD STANDARD!", cx, 130); ctx.fillText("GOLD STANDARD!", cx, 130);
  }
  ctx.restore();
}

function r3Draw(camX) {
  const r = region.room; if (!r) return;
  if (r.id === "tribes") r3TrialDraw(camX);
  const d = david, idle = !r3.might && !region.script.length && !(dialog && dialog.t > 0) && d.onGround;
  if (idle && r.id === "nob" && !hasSkill("heavySword") && r3Has("r3_hall_key") && Math.abs(d.x - r3.swordX) < 2.5 * T) upHint(r3.swordX - camX, GR * T - 250);   // (Up: ask for it)
  for (const w of r3.walls) if (idle && w.room === r.id && !w.broken && hasSkill("heavySword") && Math.abs(d.x - (d.facing > 0 ? w.x0 : w.x1)) < R3.MIGHT.REACH * T) upHint((w.x0 + w.x1) / 2 - camX, GR * T - 300);
  r3DrawSneak(camX, idle);
  if (r3.scene && r3.scene.id === "bread") {   // his clip, the three of them; Ahimelech's head on his own spot
    const g = SPR.nob_bread_give, e = SPR.nob_bread_eat, tg = g.frames * g.ms / 1000, t = r3.scene.t;
    const [n, f] = t < tg ? ["nob_bread_give", Math.floor(t * 1000 / g.ms)] : ["nob_bread_eat", Math.min(e.frames - 1, Math.floor((t - tg) * 1000 / e.ms))];
    drawSprite(n, Math.min(SPR[n].frames - 1, f), r3.breadX - camX, GR * T, -1, R3.BREAD.K);
  }
  for (const p of r3.people) {
    if (r3.scene && (p.tag === "ahimelech" || p.tag === "doeg")) continue;   // (they're in the clip)
    if (p.room !== r.id || !SPR[p.name]) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    drawSprite(p.name, frameOf(p.name, r3.t + p.ph), x, p.y ?? GR * T, p.facing, p.k);
  }
}
