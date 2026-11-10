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
  TABLE_K: 0.6,      // the holy bread table (w3_holy_bread_table2 is 611 x 130 at 1)
};

const NOBGATH = {
  key: "nobgath", name: "Nob and Gath", start: "nobroad", carry: ["gibeah", "ramah"],
  strCap: 8,
  rooms: [
    { id: "nobroad",  name: "The Road to Nob",       w: 90, bg: "w4_1", mx: 0, my: 1, mw: 2, right: "nob",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },
    { id: "nob",      name: "Nob",                   w: 53, bg: "w4_1", mx: 2, my: 1, mw: 2, left: "nobroad", right: "gathroad",
      strip: "w3/nob_strip", floor: "w3/nob_floor" },   // (Glen's sanctuary court, the linen hangings and the bronze altar: one copy, the room's width)
    { id: "crack",    name: "Beneath Nob",           w: 54, up: 30, cave: true, mx: 2, my: 2, mw: 2, mh: 2,
      strip: "w3/crack_strip", floor: "w3/crack_floor", band: [0.04, 0.72] },   // (his cracked wall, a storey repeating up: Castlevania)
    { id: "gathroad", name: "The Road Down to Gath", w: 130, bg: "w4_1", mx: 4, my: 1, mw: 3, left: "nob", right: "gath",
      far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, floor: "w3/road/ground.png" },
    { id: "gath",     name: "Gath",                  w: 44, bg: "w4_1", mx: 7, my: 1, mw: 2, left: "gathroad",
      strip: "w3/gath_strip", floor: "w3/gath_floor" },   // (his city of Gath, one copy the room's width: its own gate is the door in, at column 22)
    { id: "court",    name: "The Court of Achish",   w: 48, bg: "w4_4", mx: 8, my: 0, mw: 2,
      strip: "gibeah/halls_strip", floor: "gibeah/halls_floor" },   // (Gibeah's halls till there's art for Achish's)
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
  build: r3Build, enter: r3Enter, update: r3Update, draw: r3Draw,
};

const r3 = { t: 0, people: [], told: {} };
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
  r3.people.length = 0;

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
    ground(c, c + 52);
    campfire(c + 3, GR - 1);
    // (the painted court: the altar about columns 11-17, a table 24-33, another 35-44, crates 45-51; Glen's pieces in front)
    r3Prop("nob", "w3_holy_bread_table2", X(28), R3.TABLE_K);
    r3Prop("nob", "w3_ephod_stand", X(40)); r3Prop("nob", "w3_goliath_sword", X(37) + 10);
    r3Prop("nob", "w3_oil_lamp", X(43));
    r3Person("nob", "ahimelech_idle", X(34), -1);
    r3Person("nob", "nob_priest2_lamp", X(20), 1);
    r3Person("nob", "nob_priest1_talk", X(43), -1);
    r3Person("nob", "doeg_idle", X(9), 1);   // (21:7: "detained before the LORD")
    rKitDoor("d_nobdown", "nob", c + 48, "stairs", "d_crackup", "stair_down");
  }

  // -- Beneath Nob: the cracked wall, a tall shaft of walkways and ladders (Castlevania). Goliath's sword will break
  //    its cracked walls (DESIGN.md: the heavy sword); for now, a climb with finds at the top
  c = R("crack");
  { const cr = roomById("crack"), X = k => (c + k) * T;
    ground(c, c + cr.w - 1); rock(c, TOP_ROW, cr.w, -cr.up - TOP_ROW);
    rKitDoor("d_crackup", "crack", c + 4, "door", "d_nobdown", "hall_door");
    campfire(c + 9, GR - 1);
    const rows = [380, 170, -40, -250, -460, -670].map((y, k) => {
      const row = []; let col = 3 + [6, 18, 4, 16, 8, 12][k];
      for (let i = 0; col + 13 + 5 * ((i + k) % 2) < cr.w - 3; i++, col += 26) row.push([col, (i + k) % 2]);
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
    rDoor("d_gathgate", "gath", c + 22, "door", "d_courtin"); region.doors[region.doors.length - 1].noArt = true;   // (the gate in his picture)
    r3Person("gath", "gath_guard_idle", X(27), -1);
    r3Person("gath", "gath_guard_idle", X(38), -1);
  }

  // -- The court of Achish (21:14-15): his elite guard either side, the king on his throne
  c = R("court");
  { const X = k => (c + k) * T;
    ground(c, c + 47);
    for (const k of [2, 14, 34, 46]) rColumn("court", c + k);
    rKitDoor("d_courtin", "court", c + 5, "door", "d_gathgate", "hall_door");
    r3Person("court", "gath_elite_idle", X(16), 1);
    r3Person("court", "gath_elite_idle", X(24), 1);
    r3Person("court", "achish_throne", X(36), 1);   // (his sheet faces left)
    r3Person("court", "gath_elite_idle", X(42), -1);
  }
}

function r3Enter(r) {
  if (r.id === "nob") r3Tell("nob", "Nob, the town of the priests. Ahimelech is at the sanctuary.");
  if (r.id === "crack") r3Tell("crack", "Under Nob: cracked walls. A heavy sword could break them...");
  if (r.id === "gath") r3Tell("gath", "Gath, Goliath's own city. Achish's men are watching the road.");
}
function r3Update(dt) { r3.t += dt; }
function r3Draw(camX) {
  const r = region.room; if (!r) return;
  for (const p of r3.people) {
    if (p.room !== r.id || !SPR[p.name]) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    drawSprite(p.name, frameOf(p.name, r3.t + p.ph), x, GR * T, p.facing, p.k);
  }
}
