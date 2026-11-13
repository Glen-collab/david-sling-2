// World 4, the Cave of Adullam (1 Samuel 22:1-5; CAVES_PLAN.md). Part Two's fourth region, on region.js's engine like
// nobgath.js: loaded before region.js, which takes ADULLAM as its REGION when the address is "#9-8".
//
// First pass (Glen 11-13: "start with the Cave Mouth and the Camp"): the top level, in daylight: the way in, then the
// big pale hall where the men gather. Glen's pictures as the rooms (tools/make_room_strip.py), his ledges and the
// camp's things from his kit sheets (tools/cut_w4_kit.py). Lower down (the lamp, the water) comes next.
//
//   The Cave Mouth (the hills of Judah outside) -> The Camp (the men of 22:2; later the 400)

const R4 = {
  STAND: 0.12,       // a ledge's walking surface: this much of its height down from its top edge (the top face of the rock)
  PROP_K: 0.55,      // the camp's jars, bedrolls and baskets, next to their cut size
};

const ADULLAM = {
  key: "adullam", name: "The Cave of Adullam", start: "mouth", carry: ["gibeah", "ramah", "nobgath"],
  strCap: 8,
  rooms: [
    // (Glen's cave mouth: the hills outside on the left, a pool, the tunnel on in at the right)
    { id: "mouth", name: "The Cave Mouth", w: 62, cave: true, mx: 0, my: 0, mw: 2, right: "camp",
      strip: "w4/mouth_strip", floor: "w4/mouth_floor" },
    // (his pale limestone hall: daylight through the arch on the left, a tunnel on at the right)
    { id: "camp",  name: "The Camp",       w: 78, cave: true, mx: 2, my: 0, mw: 2, left: "mouth",
      strip: "w4/camp_strip", floor: "w4/camp_floor" },
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
  build: r4Build, enter: r4Enter,
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
};

const r4 = { told: {} };
function r4Tell(k, text) { if (!r4.told[k]) { r4.told[k] = true; toast(text); } }

// one of Glen's ledges, its left edge at x (px), the top of its rock at y (px): drawn, and he can stand on it (and jump up
//  through it from below). Returns the walking surface's y
function r4Ledge(room, n, x, y, flip = false) {
  const k = KIT[n], top = y + k.top + Math.round(k.h * R4.STAND);
  region.props.push({ room, n, x, y, flip });
  const c0 = Math.ceil((x + 10) / T), c1 = Math.floor((x + k.w - 10) / T);
  platAt(c0, top, Math.max(1, c1 - c0));
  return top;
}
// a thing of the camp's, standing on the ground (or on a ledge's surface y), centered on x (px)
function r4Thing(room, n, x, y = FOOT, k = R4.PROP_K) {
  const s = KIT[n]; region.props.push({ room, n, x: x - s.w * k / 2, y: y - s.h * k + 4, s: k });
}

function r4Build(R) {
  Object.assign(KIT, R4_KIT);

  // -- The Cave Mouth (22:1): in from the hills of Judah. A few ledges up the rock by the pool; the way on in
  let c = R("mouth");
  { const X = k => (c + k) * T;
    ground(c, c + 61);
    campfire(c + 4, GR - 1);   // (the olive press: the save)
    oliveRow(c + 8, 16, 4);
    const a = r4Ledge("mouth", "w4_ledge_sand_m", X(22), FOOT - 150);
    const b = r4Ledge("mouth", "w4_ledge_sand_l", X(29), FOOT - 300);
    oliveRow(c + 31, onTop(b) - 0.4, 4);
    r4Ledge("mouth", "w4_ledge_sand_s", X(39), FOOT - 190);
    rRelic("r4_pom_mouth", "pomegranate", c + 33, onTop(b));
    r4Thing("mouth", "w4_rocks_sand", X(46));
    r4Thing("mouth", "w4_stalagmites", X(52), FOOT, 0.9);
    void a;
  }

  // -- The Camp (22:2): the great pale hall. The men's things: bedrolls, jars, baskets, bread. Ledges up the wall
  c = R("camp");
  { const X = k => (c + k) * T;
    ground(c, c + 77);
    campfire(c + 12, GR - 1);
    r4Thing("camp", "w4_bedroll", X(6)); r4Thing("camp", "w4_bag", X(9));
    r4Thing("camp", "w4_jar_big", X(17)); r4Thing("camp", "w4_pitcher", X(19)); r4Thing("camp", "w4_pot", X(21));
    r4Thing("camp", "w4_basket", X(26)); r4Thing("camp", "w4_bread", X(28)); r4Thing("camp", "w4_bowl", X(30));
    r4Thing("camp", "w4_bedroll", X(36)); r4Thing("camp", "w4_waterskin", X(39));
    const a = r4Ledge("camp", "w4_ledge_sand_m", X(44), FOOT - 160);
    const b = r4Ledge("camp", "w4_ledge_sand_l", X(50), FOOT - 310, true);
    r4Thing("camp", "w4_lamp", X(54), b, 0.7);
    r4Ledge("camp", "w4_ledge_sand_s", X(59), FOOT - 200);
    oliveRow(c + 51, onTop(b) - 0.4, 3);
    r4Thing("camp", "w4_jar_big", X(66)); r4Thing("camp", "w4_basket", X(69)); r4Thing("camp", "w4_bedroll", X(72));
    void a;
  }
}

function r4Enter(r) {
  if (r.id === "mouth") r4Tell("mouth", "David therefore departed from there and escaped to Adullam’s cave. (1 Samuel 22:1)");
  if (r.id === "camp") r4Tell("camp", "Everyone who was in distress, everyone who was in debt, and everyone who was discontented gathered themselves to him. (1 Samuel 22:2)");
}
