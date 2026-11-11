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
  CARRY: { RUN_MS: 70, JUMP_LAST: 9, LAND_MS: 45 },   // the sword on his back: run frame time, the last jump frame used, landing frame time
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
  build: r3Build, enter: r3Enter, update: r3Update, draw: r3Draw, drawBack: r3DrawWalls, drawOver: r3DrawMight, drawDavid: r3DrawDavid,
};

const r3 = { t: 0, people: [], told: {}, walls: [], might: null, chips: [], hides: [], guards: [], inDoor: null, caughtT: 0 };
const r3Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function r3Tell(k, text) { if (!r3.told[k]) { r3.told[k] = true; toast(text); } }
// someone standing in a room: [sprite, x, facing, size]; drawn by r3Draw, looping their sheet
function r3Person(room, name, x, facing = 1, k = R3.NPC_K) { r3.people.push({ room, name, x, facing, k, ph: Math.random() * 3 }); }
function r3Prop(room, n, x, s = 1, y = null) {   // one of Glen's World 3 pieces standing on the ground (x: its middle)
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w * s / 2, y: y ?? FOOT - k.h * s, s, back: true });
}

// ---------------------------------------------------------------------------
// building
// ---------------------------------------------------------------------------
function r3Build(R) {
  r3.people.length = 0; r3.walls.length = 0; r3.hides.length = 0; r3.guards.length = 0; r3.inDoor = null; r3.caughtT = 0;

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
    rDeco("nobroad", "f_tower", c + 74); oliveRow(c + 78, 16, 4);
    rRelic("r3_stone_road", "stone", c + 84, 16);
  }

  // -- Nob, the sanctuary court (21:1-9): Ahimelech, the holy bread (two rows of six, Leviticus 24:5-6), Goliath's
  //    sword wrapped in a cloth behind the ephod; Doeg the Edomite watching (21:7). A door down to the cracked wall
  c = R("nob");
  { const X = k => (c + k) * T;
    const P = 29;   // (the painted court starts here: his tileable court before and after it)
    ground(c, c + 109);
    campfire(c + 3, GR - 1);
    oliveRow(c + 8, 16, 5); rBreak("jar", "nob", c + 16, 16);
//    (the olive trees over the strip's joins: gone with the layers, 11-10)   // (olive trees over the two joins, his tileable court to his painted one: the walls are different stone)
    r3Person("nob", "nob_priest2_walk", X(20), 1);
    // (the painted court: the altar about columns P+11-17, a table P+24-33, another P+35-44, crates P+45-51; Glen's pieces in front)
    r3Prop("nob", "w3_holy_bread_table2", X(P + 28), R3.TABLE_K);
    r3Prop("nob", "w3_ephod_stand", X(P + 40));
    if (!hasSkill("heavySword")) { r3Prop("nob", "w3_goliath_sword", X(P + 37) + 10); r3.swordProp = region.props[region.props.length - 1]; }
    r3.swordX = X(P + 37) + 10;
    r3Prop("nob", "w3_oil_lamp", X(P + 43));
    r3Person("nob", "ahimelech_idle", X(P + 34), -1);
    r3Person("nob", "nob_priest2_lamp", X(P + 20), 1);
    r3Person("nob", "nob_priest1_talk", X(P + 43), -1);
    r3Person("nob", "doeg_idle", X(P + 6), 1);   // (21:7: "detained before the LORD")
    rKitDoor("d_nobdown", "nob", c + P + 60, "stairs", "d_crackup", "stair_down");
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
    r3Person("gath", "gath_servants_whisper", X(11), -1);
    r3Person("gath", "gath_guard_idle", X(18), -1);
    rDoor("d_gathgate", "gath", c + 22, "door", "d_streetin"); region.doors[region.doors.length - 1].noArt = true;   // (the gate in his picture)
    r3Person("gath", "gath_guard_idle", X(27), -1);
    r3Person("gath", "gath_guard_idle", X(38), -1);
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
    r3Person("court", "gath_elite_idle", X(16), 1);
    r3Person("court", "gath_elite_idle", X(24), 1);
    r3Prop("court", "w3_throne_dais", X(37));
    r3.people.push({ room: "court", name: "achish_idle", x: X(35), facing: 1, k: R3.NPC_K, ph: 0, y: GR * T - 33 });   // (standing on his dais by the throne; his sheets face left)
    r3Person("court", "gath_elite_idle", X(42), -1);
  }
}

function r3Enter(r) {
  if (r.id === "nob") r3Tell("nob", "Nob, the town of the priests. Ahimelech is at the sanctuary.");
  if (r.id === "crack") r3Tell("crack", "Under Nob: cracked walls. A heavy sword could break them...");
  if (r.id === "streets") r3Tell("streets", "The streets of Gath. Achish's men are everywhere: keep out of sight.");
  if (r.id === "goliath") r3Tell("goliath", "Goliath's house. Everything in it is made for a giant.");
  if (r.id === "gath") r3Tell("gath", "Gath, Goliath's own city. Achish's men are watching the road.");
}
function r3Update(dt) {
  r3.t += dt;
  const d = david, r = region.room; if (!r) return;
  for (const q of r3.chips) { q.t += dt; q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 1400 * dt; }
  r3.chips = r3.chips.filter(q => q.t < q.life);
  for (const w of r3.walls) w.shake = Math.max(0, w.shake - dt);
  if (r3.might) { r3MightUpdate(dt); return; }
  if (r3SneakUpdate(dt)) return;
  const free = !region.script.length && region.wait <= 0 && !region.trans && !(dialog && dialog.t > 0) && d.onGround && d.deadT <= 0;
  // Nob: Goliath's sword, wrapped in a cloth behind the ephod (21:8-9)
  if (r.id === "nob" && !hasSkill("heavySword") && Math.abs(d.x - r3.swordX) < 2.5 * T) {
    r3Tell("sword", "Something long, wrapped in a cloth, behind the ephod. Up: ask the priest.");
    if (free && pressed("up")) r3SwordScene();
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
  if (r3.inDoor) {   // in the alcove, his back to the street, in its shadow
    const n = hasSkill("heavySword") && SPR.david_gsword_back_walk ? "david_gsword_back_walk" : "david_back_walk"; if (!SPR[n]) return false;
    ctx.save(); ctx.filter = "brightness(0.62)"; drawSprite(n, 0, x, y, 1, 0.92); ctx.restore(); return true;
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
  if (al && free && pressed("up")) { r3.inDoor = al; d.x = al.x; d.vx = 0; return true; }
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
  if (!hasSkill("heavySword") || d.throwT >= 0 || d.swordT >= 0 || d.shield || (typeof w9 !== "undefined" && w9.pose)) return false;   // (the sling, his sword, his shield, a scene: drawn as usual)
  const K = R3.GSWORD_K, t = d.t, mid = y - d.h / 2 - 6;   // (the in-air sheets are centered, like his own)
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
  const d = david, idle = !r3.might && !region.script.length && !(dialog && dialog.t > 0) && d.onGround;
  if (idle && r.id === "nob" && !hasSkill("heavySword") && Math.abs(d.x - r3.swordX) < 2.5 * T) upHint(r3.swordX - camX, GR * T - 250);   // (Up: ask for it)
  for (const w of r3.walls) if (idle && w.room === r.id && !w.broken && hasSkill("heavySword") && Math.abs(d.x - (d.facing > 0 ? w.x0 : w.x1)) < R3.MIGHT.REACH * T) upHint((w.x0 + w.x1) / 2 - camX, GR * T - 300);
  r3DrawSneak(camX, idle);
  for (const p of r3.people) {
    if (p.room !== r.id || !SPR[p.name]) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    drawSprite(p.name, frameOf(p.name, r3.t + p.ph), x, p.y ?? GR * T, p.facing, p.k);
  }
}
