// World 6: Carmel, half two (1 Samuel 25:14-42; CARMEL_PLAN.md): you play Abigail. Loaded after carmel.js and before
// region.js: it adds its rooms to CARMEL and wraps CARMEL's hooks.
//
// Glen 11-20: "I meant Abigail's part in Carmel now." First pass:
//   (after the 400 march off) a young man tells Abigail (25:14-17) -> Nabal's Storerooms: gather the gifts (25:18),
//   keeping out of the steward's sight (25:19, "she didn't tell her husband"); load the donkey (Glen's clip), her young
//   men go on ahead (Glen's clip) -> The Mountain Road: the ride down on the donkey (fast, jumps wide), David's anger
//   rising -> The Valley: she gets off and bows (25:23), then her words (25:24-31), each true one bringing the anger
//   down -> David relents (25:32-35, Glen's clip) -> Nabal at his feast, and as a stone (25:36-38, Glen's clip) ->
//   25:39-42: David sends for her; she rides out with her five maids (Glen's clip). The Journal.

const C7 = {
  GIFT_K: 0.42,            // the gift pictures (David 1's items), how big
  GIFT_REACH: 60,          // px: this close picks a gift up
  // the steward in the storerooms: how far he sees (px), his walk (px/s), how long he stands and looks at each end (s)
  WATCH: { SEE: 400, WALK: 55, LOOK: 2.2, HIDE: 80, K: 0.85 },
  // the donkey on the road: faster, jumps higher (TUNE while she rides; put back after)
  RIDE: { WALK_SPEED: 380, RUN_SPEED: 600, JUMP_SPEED: 1180 },
  // David's anger (0-100): where it is when she sets off, how fast it climbs on the road (per s), and in the valley
  //  before she bows; a wrong word adds WRONG; a full meter sends her back to the start of the road (or of her words)
  ANGER: { START: 40, ROAD: 0.75, WAIT: 5, WRONG: 18, AGAIN: 70 },
  TABLE_K: 0.4,            // (Glen 11-21) his feast table, drawn in front of Nabal: its size
  TABLE_AT: 1050,          // px into the table picture where Nabal sits (the low dishes, so his head and cup show)
  FEAST_LIFT: 45,          // px Nabal sits up off the ground: on a bench behind the table
  BOW_REACH: 260,          // px: Down this close to David, she gets off and bows
  DAVID_WALK: 45,          // px/s David's band comes on while she hasn't bowed
};
let C7_BASE = null;   // (her own speeds: read from main.js's TUNE when Carmel's built, main.js loads after this)

CARMEL.rooms.push(
  { id: "stores", name: "Nabal's Storerooms", w: 70, bg: "w3_1", mx: 9, my: 2, mw: 2 },   // (David 1's The Day Before, 3-1: the jars and the grain)
  { id: "road", name: "The Mountain Road", w: 160, bg: "w5_4", mx: 5, my: 2, mw: 4 },     // (David 1's Down to Elah, 5-4: the road down at dawn)
  { id: "valley", name: "The Valley", w: 60, bg: "w8_4", mx: 3, my: 2, mw: 2 },            // (David 1's Home, 8-4: the hills at sunset)
);
CARMEL.steps.push("c6_meeting");
CARMEL.entries.push(["Abigail came down the mountain to meet me with bread and figs. The LORD sent her, and kept me from blood.", "1 Samuel 25:32–33"]);
CARMEL.sword = () => !c7.on;   // (no sword for Abigail)

const c7 = { on: false, gifts: [], got: 0, watch: [], hides: [], anger: 0, round: -1, choice: null, bowed: false, ride: false };
const C7_ROOMS = ["stores", "road", "valley"];
const c7Abi = () => c7.on && !(c6.pose && c6.pose.hide);

// ---------------------------------------------------------------------------------------------------------------------
// building
function c7Build(R) {
  roomImg("carmel/kit/feast_table.png");   // (loaded ahead: roomImg loads lazily, and the feast scene is short)
  c7.ending = false; c7.gifts.length = 0; c7.watch.length = 0; c7.hides.length = 0; c7.got = 0; c7.round = -1; c7.choice = null; c7.bowed = false; c7.ride = false;
  if (!C7_BASE) C7_BASE = { WALK_SPEED: TUNE.WALK_SPEED, RUN_SPEED: TUNE.RUN_SPEED, JUMP_SPEED: TUNE.JUMP_SPEED };
  Object.assign(TUNE, C7_BASE);
  Object.assign(TUNE.SPRITE_SIZE, { abigail_ride: 0.95, abigail_load: 0.95, abigail_hit: 0.95, abigail_kneel: 0.95, abigail_bow_small: 0.95, steward: C7.WATCH.K, david_relent: 1 });

  // -- Nabal's Storerooms (25:18-19): the gifts on the floor and up on the shelves; the steward walks the rows; jars to
  //  crouch behind; the donkey at the far end
  let c = R("stores");
  { const rm = "stores", X = k => (c + k) * T;
    ground(c, c + 69);
    campfire(c + 3, GR - 1);
    const gift = (kind, k, y = FOOT) => c7.gifts.push({ room: rm, kind, x: X(k) + T / 2, y, got: false, t: Math.random() * 3 });
    gift("gift_bread", 9); gift("raisins", 14);
    rLedge(rm, c + 18, 480, 4); gift("fig_cake", 20, 480);
    rDeco(rm, "t_jars", c + 24, true); c7.hides.push({ room: rm, x: X(24) + T / 2 });
    gift("roasted_grain", 29);
    rLedge(rm, c + 33, 480, 3); rLedge(rm, c + 37, 390, 4); gift("gift_bread", 39, 390);
    rDeco(rm, "t_jars", c + 44, true); c7.hides.push({ room: rm, x: X(44) + T / 2 });
    gift("raisins", 48); gift("fig_cake", 52);
    rLedge(rm, c + 55, 480, 4); gift("roasted_grain", 57, 480);
    gift("gift_bread", 61);
    c7.watch.push({ room: rm, x: X(30), x0: X(26), x1: X(36), dir: 1, look: 0, t: 0 }, { room: rm, x: X(52), x0: X(46), x1: X(60), dir: -1, look: 0, t: 0 });
    c7.donkey = c6Person(rm, "donkey_idle", X(66), -1, () => !c7.loading, 0.9);
    rTalker(c6Person(rm, "villager_boy_stand", X(6), 1, () => c7.on), () => [["One of Nabal's young men", c7.got < c7.gifts.length ? "Hurry! The bread, the raisins, the fig cakes, the parched grain. Keep out of the steward's sight: crouch behind the jars when he looks your way." : "That's all of it. Load the donkey, at the end of the storerooms: Up beside it."]]);
  }

  // -- The Mountain Road (25:20): the ride down, wide gaps the donkey jumps, rocks to hop up
  c = R("road");
  { const rm = "road";
    ground(c, c + 159);
    campfire(c + 3, GR - 1);
    for (const [k, w] of [[18, 4], [32, 5], [47, 4], [62, 6], [78, 5], [93, 4], [108, 6], [123, 5], [138, 6]]) rHole(rm, c + k, w);
    rLedge(rm, c + 54, 480, 4); rLedge(rm, c + 85, 480, 4); rLedge(rm, c + 99, 470, 3); rLedge(rm, c + 130, 480, 4);
  }

  // -- The Valley (25:20-35): David's band comes down toward her
  c = R("valley");
  { const rm = "valley", X = k => (c + k) * T;
    ground(c, c + 59);
    c7.david = c6Person(rm, "david_idle", X(44), -1, () => c7.on, 1);
    c7.band = [c6Person(rm, "abishai_idle", X(49), -1, () => c7.on), c6Person(rm, "asahel_idle", X(53), -1, () => c7.on), c6Person(rm, "soldier_talk", X(57), -1, () => c7.on, 0.76)];
    c7.servants = c6Person(rm, "servants_donkeys", X(20), 1, () => c7.on && c7.round >= 4, 0.95);
  }
  kitImg("t_jars");
}

// ---------------------------------------------------------------------------------------------------------------------
// the start: right after the 400 march off (carmel.js's c6SendMen ends here)
function c7Begin() {
  regionAdd("taken", "c7_begin");
  const st = roomById("stores");
  rPlay([
    { say: ["", "But one of the young men told Abigail, Nabal's wife, saying, “Behold, David sent messengers out of the wilderness to greet our master; and he insulted them. But the men were very good to us, and we were not harmed. They were a wall to us both by night and by day. Now therefore know and consider what you will do; for evil is plotted against our master.” (1 Samuel 25:14-17)"] },
    { fn() { regionGo((st.c0 + 5) * T, 1, () => { c7.on = true; }); }, wait: 1.4 },
    { say: ["", "Then Abigail hurried and took two hundred loaves of bread, two containers of wine, five sheep ready dressed, five seahs of parched grain, one hundred clusters of raisins, and two hundred cakes of figs, and laid them on donkeys. (1 Samuel 25:18)"] },
    { fn() { toast("You are Abigail. Gather the gifts, and don't let Nabal's steward see you: crouch (Down) behind the jars when he looks your way."); } },
  ]);
}

function c7Enter(r) {
  c7.on = C7_ROOMS.includes(r.id) && !c6Has("c6_end") && !c7.ending;
  if (r.id === "road" && c7.on) { c7.ride = true; if (!c7.anger) c7.anger = C7.ANGER.START; c6Tell("road", "The Mountain Road. Ride down fast: David's anger grows while you ride. Jump the gaps (the donkey jumps wide)."); }
  if (r.id === "valley" && c7.on && c7.round < 0) c7ValleyStart();
  if (r.id === "stores" && c7.on) c6Tell("stores", "Nabal's Storerooms: bread, raisins, fig cakes, parched grain.");
}

// ---------------------------------------------------------------------------------------------------------------------
function c7Update(dt, r) {
  const d = david, free = !region.script.length && region.wait <= 0 && !region.trans;
  if (!C7_ROOMS.includes(r.id) && c7.on && !c6Has("c6_end") && !region.trans && !region.script.length) c7.on = false;
  // riding: the donkey's speed and jump; off it, hers
  const ride = c7.on && c7.ride && r.id !== "stores";
  if (C7_BASE) Object.assign(TUNE, ride ? C7.RIDE : C7_BASE);
  if (!c7.on) return;
  d.charging = false; d.throwT = -1;   // (no sling for Abigail)
  for (const g of c7.gifts) g.t += dt;

  if (r.id === "stores") c7Stores(dt, r, d, free);
  if (r.id === "road" && free) {
    c7.anger += C7.ANGER.ROAD * dt * (d.deadT > 0 ? 0 : 1);
    if (c7.anger >= 100) c7Fail("Too slow! David's band is coming down fast. The road again: hurry.", "road");
    if (d.x > (r.c0 + r.w - 4) * T) {   // the bottom of the road
      const v = roomById("valley");
      rPlay([{ fn() { regionGo((v.c0 + 6) * T, 1); }, wait: 1.4 }]);
    }
  }
  if (r.id === "valley") c7Valley(dt, r, d, free);
}

function c7Fail(text, rm) {
  toast(text);
  const to = roomById(rm);
  c7.anger = rm === "road" ? C7.ANGER.START : C7.ANGER.AGAIN;
  rPlay([{ fn() { regionGo((to.c0 + 5) * T, 1); }, wait: 1.4 }]);
}

// the storerooms: the gifts, the steward, the donkey
function c7Stores(dt, r, d, free) {
  for (const g of c7.gifts) if (g.room === r.id && !g.got && Math.abs(g.x - d.x) < C7.GIFT_REACH && Math.abs(g.y - d.y) < 70) {
    g.got = true; c7.got++;
    if (typeof sfx === "function") sfx("pickup", g.x, 0.6);
    toast(`${{ gift_bread: "Loaves of bread", raisins: "Clusters of raisins", fig_cake: "Cakes of figs", roasted_grain: "Parched grain" }[g.kind]} (${c7.got} of ${c7.gifts.length})`);
  }
  const hidden = d.onGround && d.h === LOW_H && c7.hides.some(h => h.room === r.id && Math.abs(h.x - d.x) < C7.WATCH.HIDE);
  for (const w of c7.watch) {
    if (w.room !== r.id) continue;
    w.t += dt;
    if (w.look > 0) { w.look -= dt; if (w.look <= 0) w.dir *= -1; }
    else { w.x += w.dir * C7.WATCH.WALK * dt; if ((w.dir > 0 && w.x >= w.x1) || (w.dir < 0 && w.x <= w.x0)) w.look = C7.WATCH.LOOK; }
    const dx = d.x - w.x;
    if (free && !w.saw && Math.sign(dx) === w.dir && Math.abs(dx) < C7.WATCH.SEE && Math.abs(d.y - FOOT) < 140 && !hidden && d.deadT <= 0) {
      w.saw = true;
      rPlay([{ say: ["Nabal's steward", "Who's there? What are you doing in the master's stores?"] },
        { fn() { toast("He saw you! (She didn't tell her husband, 25:19.) Back to the door: the gifts you have, you keep."); w.saw = false; regionGo((r.c0 + 5) * T, 1); }, wait: 1.4 }]);
    }
  }
  // the donkey: Up beside it, once she has them all
  if (free && pressed("up") && Math.abs(d.x - c7.donkey.x) < 120 && d.onGround) {
    if (c7.got < c7.gifts.length) { toast(`Not yet: ${c7.gifts.length - c7.got} more gifts to find.`); return; }
    c7Load(r);
  }
}
function c7Load(r) {
  const p = c6Person(r.id, "abigail_load", c7.donkey.x - 30, 1, () => c7.loading, 1);
  rPlay([
    { fn() { c7.loading = true; p.t = 0; c6.pose = { hide: true, t: 0 }; } }, { wait: 6 },
    { fn() { c7.loading = false; c6.pose = null; p.show = () => false; } },
    { say: ["Abigail", "“Go on before me. Behold, I am coming after you.” (1 Samuel 25:19)"] },
    { say: ["", "But she didn't tell her husband, Nabal. (1 Samuel 25:19)"] },
    { fn() { const rd = roomById("road"); c7.ride = true; c7.anger = C7.ANGER.START; regionGo((rd.c0 + 5) * T, 1); }, wait: 1.4 },
    { say: ["", "As she rode on her donkey, and came down hidden by the mountain, behold, David and his men came down toward her, and she met them. (1 Samuel 25:20)"] },
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// the valley: the anger meter boss
const C7_WORDS = [   // [what she says (the true one, WEB), the wrong ones]; the true one brings the anger down
  ["“On me, my lord, on me be the blame! Please let your servant speak in your ears. Hear the words of your servant.” (25:24)",
    "“My husband did nothing wrong. Your men asked too much of him.”", "“Do you know whose wife I am? Go back to your hills.”"],
  ["“Please don't regard this worthless fellow, Nabal; for as his name is, so is he. Nabal is his name, and folly is with him. But I, your servant, didn't see the young men of my lord, whom you sent.” (25:25)",
    "“Nabal is a great man. You should be afraid of him.”", "“It was your young men's fault. They were rude to him.”"],
  ["“Now this present which your servant has brought to my lord, let it be given to the young men who follow my lord.” (25:27)",
    "“I brought nothing. I've only come to ask you to leave.”", "“Here is a little bread. Now go away and leave us alone.”"],
  ["“Please forgive the trespass of your servant. For the LORD will certainly make my lord a sure house, because my lord fights the LORD's battles. Evil will not be found in you all your days.” (25:28)",
    "“You are no better than any other runaway servant.”", "“Take your revenge if you must. It's what anyone would do.”"],
  ["“The soul of my lord will be bound in the bundle of life with the LORD your God. He will sling out the souls of your enemies as from a sling's pocket.” (25:29)",
    "“Fight your own battles. The LORD won't help you.”", "“Saul will catch you soon anyway.”"],
  ["“This shall be no grief to you, nor offense of heart to my lord, either that you have shed blood without cause, or that my lord has avenged himself.” (25:31)",
    "“Go on, then. Blood for an insult is fair.”", "“Avenge yourself. No one will ever know.”"],
];
function c7ValleyStart() {
  const v = roomById("valley");
  c7.round = 0; c7.bowed = false; c7.choice = null; c7.ride = true;
  c7.david.x = (v.c0 + 44) * T; c7.david.spr = "david_angry_walk";
  c7.band.forEach((p, i) => { p.x = (v.c0 + 49 + i * 4) * T; });
  if (!c7.anger || c7.anger < C7.ANGER.START) c7.anger = C7.ANGER.START;
  c6Tell("valley", "There's David, coming down with his men. Ride up to him, then Down to get off the donkey and bow.");
}
function c7Valley(dt, r, d, free) {
  if (c7.round < 0) c7ValleyStart();
  if (!c7.bowed) {   // he comes on, and his anger with him, till she bows
    if (free) {
      c7.anger += C7.ANGER.WAIT * dt;
      const stop = d.x + 160; if (c7.david.x > stop) { c7.david.x -= C7.DAVID_WALK * dt; c7.band.forEach(p => { p.x -= C7.DAVID_WALK * dt; }); }
      if (c7.anger >= 100) { c7Fail("David's anger burns. Get to him quickly, and bow.", "valley"); c7.round = -1; return; }
      if (pressed("down") && d.onGround && Math.abs(c7.david.x - d.x) < C7.BOW_REACH) {
        c7.bowed = true; c7.ride = false; d.vx = 0; d.facing = Math.sign(c7.david.x - d.x) || 1;
        c7.david.spr = "david_idle"; c7.david.t = 0;
        rPlay([{ fn() { c7.pose = { kneel: true, t: 0 }; } }, { wait: 1.2 },
          { say: ["", "When Abigail saw David, she hurried and got off her donkey, and fell before David on her face and bowed herself to the ground. (1 Samuel 25:23)"] },
          { fn() { c7.anger = Math.max(0, c7.anger - 10); c7Ask(); } }]);
      }
    }
    return;
  }
  // her words: Up/Down picks, A says it
  const C = c7.choice;
  if (C && free) {
    if (pressed("up")) C.i = (C.i + C.opts.length - 1) % C.opts.length;
    if (pressed("down")) C.i = (C.i + 1) % C.opts.length;
    if (pressed("a")) {
      const right = C.opts[C.i] === C.right; c7.choice = null;
      if (right) {
        const left = C7_WORDS.length - c7.round; c7.anger = Math.max(0, c7.anger - c7.anger / left); c7.round++;
        rPlay([{ say: ["Abigail", C.right] }, { fn() { if (c7.round >= C7_WORDS.length) c7Relent(); else c7Ask(); } }]);
      } else {
        c7.anger += C7.ANGER.WRONG;
        rPlay([{ say: ["Abigail", C.opts[C.i]] }, { fn() {
          if (c7.anger >= 100) { toast("David's anger burns hotter. Humble words, true words: try again."); c7.anger = C7.ANGER.AGAIN; }
          else toast("That made it worse. Think: what would a wise, humble woman say?");
          c7Ask(); } }]);
      }
    }
  }
}
function c7Ask() {
  const w = C7_WORDS[c7.round], opts = w.slice();
  for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  c7.choice = { opts, right: w[0], i: 0 };
}
function c7Relent() {
  const D = c7.david, sh = roomById("shearing"), cp = roomById("camp"), st = roomById("stores");
  rPlay([
    { fn() { D.spr = "david_relent"; D.t = 0; } }, { wait: 1.5 },
    { say: ["David", "“Blessed is the LORD, the God of Israel, who sent you today to meet me! Blessed is your discretion, and blessed are you, who have kept me today from blood guiltiness, and from avenging myself with my own hand.” (1 Samuel 25:32-33)"] },
    { say: ["", "So David received from her hand that which she had brought him. (1 Samuel 25:35)"] },
    { say: ["David", "“Go up in peace to your house. Behold, I have listened to your voice and have granted your request.” (1 Samuel 25:35)"] },
    { fn() { regionAdd("taken", "c6_meeting"); c7.anger = 0; } },
    // Nabal (25:36-38): at his feast, then in the morning, as a stone
    { fn() { c7.on = false; c7.nabalScene = true; c6.pose = { hide: true, t: 0 }; c6.cut = false; c6.nabal.spr = "nabal_feast"; c6.nabal.t = 0; c6.nabal.dir = 1; c6.nabal.y = FOOT - C7.FEAST_LIFT; regionGo((sh.c0 + 18) * T, 1); }, wait: 1.4 },
    { say: ["", "Abigail came to Nabal; and behold, he held a feast in his house, like the feast of a king. Nabal's heart was merry within him, for he was very drunk. Therefore she told him nothing until the morning light. (1 Samuel 25:36)"] },
    { fn() { c6.nabal.spr = "nabal_stone"; c6.nabal.t = 0; } }, { wait: 2.5 },
    { say: ["", "In the morning, when the wine had gone out of Nabal, his wife told him these things; and his heart died within him, and he became as a stone. (1 Samuel 25:37)"] },
    { say: ["", "About ten days later, the LORD struck Nabal, so that he died. (1 Samuel 25:38)"] },
    // David hears (25:39), at the camp
    { fn() { c7.nabalScene = false; c6.nabal.spr = "nabal_stand"; c6.nabal.y = FOOT; c6.nabal.dir = -1; c6.pose = null; regionGo((cp.c0 + 30) * T, 1); }, wait: 1.4 },
    { say: ["David", "“Blessed is the LORD, who has pleaded the cause of my reproach from the hand of Nabal, and has kept back his servant from evil. The LORD has returned the evildoing of Nabal on his own head.” (1 Samuel 25:39)"] },
    { say: ["", "David sent and spoke concerning Abigail, to take her to himself as wife. (1 Samuel 25:39)"] },
    // Carmel: his messengers; she bows; she rides out with her five maids (25:40-42)
    { fn() { c7End(st); }, wait: 1.4 },
    { say: ["David's servants", "“David has sent us to you, to take you to him as wife.” (1 Samuel 25:40)"] },
    { fn() { c7.endAbi.spr = "abigail_kneel"; c7.endAbi.t = 0; } }, { wait: 2.2 },
    { say: ["Abigail", "“Behold, your servant is a servant to wash the feet of the servants of my lord.” (1 Samuel 25:41)"] },
    { fn() { c7.endAbi.spr = "abigail_ride"; c7.endAbi.t = 0; c7.endAbi.dir = 1; c7.endAbi.vx = 120; c7.maids.vx = 120; c7.maids.show = () => true; } }, { wait: 1 },
    { say: ["", "Abigail hurriedly arose and rode on a donkey with her five maids who followed her; and she went after the messengers of David, and became his wife. (1 Samuel 25:42)"] },
    { wait: 2 },
    { fn() { regionAdd("taken", "c6_end"); c6.pose = null; jsceneOpen(true); } },
  ]);
}
function c7End(st) {
  const X = k => (st.c0 + k) * T;
  c6.pose = { hide: true, t: 0 }; c7.ending = true; c7.on = false;
  c7.endAbi = c6Person("stores", "abigail_idle", X(30), -1, () => true);
  c7.maids = c6Person("stores", "maids", X(22), 1, () => false, 0.95);
  c6Person("stores", "abishai_idle", X(36), -1, () => !c6Has("c6_end")); c6Person("stores", "soldier_talk", X(40), -1, () => !c6Has("c6_end"), 0.76);
  regionGo(X(30), 1);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function c7DrawAbi(d, x, y) {
  if (!c7Abi()) return false;
  const P = c7.pose;
  if (P && P.kneel) { drawSprite("abigail_kneel", frameOf("abigail_kneel", P.t), x, y, d.facing); return true; }
  if (dialog.t > 0 && dialog.who === "Abigail") { drawSprite("abigail_talk", frameOf("abigail_talk", d.t), x, y, d.facing); return true; }
  const ride = c7.ride && region.room && region.room.id !== "stores";
  if (ride) {
    const i = !d.onGround ? 3 : Math.abs(d.vx) > 20 ? frameOf("abigail_ride", d.t * Math.max(0.7, Math.abs(d.vx) / C7.RIDE.WALK_SPEED)) : 0;
    drawSprite("abigail_ride", i, x, y, d.facing); return true;
  }
  if (!d.onGround) { const n = SPR.abigail_jump.frames; drawSprite("abigail_jump", Math.max(0, Math.min(n - 1, Math.round((d.vy + 900) / 1800 * (n - 1)))), x, y, d.facing); return true; }
  if (d.h === LOW_H) { drawSprite("abigail_kneel", SPR.abigail_kneel.frames - 1, x, y, d.facing); return true; }
  const v = Math.abs(d.vx);
  const n = v > TUNE.WALK_SPEED + 20 ? "abigail_run" : v > 15 ? "abigail_walk" : "abigail_idle";
  drawSprite(n, frameOf(n, d.t * (n === "abigail_walk" ? Math.max(0.6, v / TUNE.WALK_SPEED) : 1)), x, y, d.facing);
  return true;
}
function c7Draw(camX) {
  const r = region.room; if (!r) return;
  for (const g of c7.gifts) if (g.room === r.id && !g.got) drawItem(g.kind, g.x - camX, g.y - 4 + Math.sin(g.t * 2.5) * 4, C7.GIFT_K);
}
function c7DrawFront(camX) {
  const r = region.room; if (!r) return;
  for (const w of c7.watch) if (w.room === r.id && !c7.ending) {
    const walking = w.look <= 0;
    drawSprite("steward", walking ? frameOf("steward", w.t) : 0, w.x - camX, FOOT, w.dir, 1);
    if (!walking) { ctx.save(); ctx.font = "bold 26px Georgia, serif"; ctx.fillStyle = "#ffe9a8"; ctx.textAlign = "center"; ctx.fillText("👁", w.x - camX, FOOT - 270 * C7.WATCH.K); ctx.restore(); }
  }
  if (c7.nabalScene && r.id === "shearing") {   // Nabal at his feast, behind Glen's table
    const im = roomImg("carmel/kit/feast_table.png");
    if (im) { const k = C7.TABLE_K, w = im.naturalWidth * k, h = im.naturalHeight * k;
      ctx.drawImage(im, Math.round(c6.nabal.x - camX - C7.TABLE_AT * k), Math.round(FOOT - h - camY), w, h); }
  }
}
function c7DrawOver() {
  const r = region.room; if (!r || !c7.on) return;
  // David's anger
  if ((r.id === "road" || r.id === "valley") && !c6Has("c6_meeting")) {
    const bw = 360, bx = (W - bw) / 2, by = 18, f = Math.max(0, Math.min(1, c7.anger / 100));
    ctx.save(); ctx.fillStyle = "rgba(20,10,6,0.7)"; ctx.fillRect(bx - 6, by - 4, bw + 12, 40);
    ctx.fillStyle = "#3a1a10"; ctx.fillRect(bx, by + 16, bw, 14);
    const g = ctx.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, "#f0b030"); g.addColorStop(1, "#d02010");
    ctx.fillStyle = g; ctx.fillRect(bx, by + 16, bw * f, 14);
    ctx.font = "bold 14px Georgia, serif"; ctx.fillStyle = "#ffe9c8"; ctx.textAlign = "center"; ctx.fillText("David's anger", W / 2, by + 11);
    ctx.restore();
  }
  if (r.id === "stores") {
    const line = c7.got < c7.gifts.length ? `Gifts gathered: ${c7.got} / ${c7.gifts.length}` : "All gathered: load the donkey (Up beside it)";
    ctx.save(); ctx.font = "bold 16px Georgia, serif"; const bw = Math.ceil(ctx.measureText(line).width) + 36;
    ctx.fillStyle = "rgba(30,20,8,0.75)"; ctx.fillRect(16, H - 70, bw, 36); ctx.strokeStyle = "rgba(240,200,120,0.8)"; ctx.strokeRect(16, H - 70, bw, 36);
    ctx.fillStyle = "#f6e2b0"; ctx.fillText(line, 34, H - 46); ctx.restore();
  }
  // her words to choose from
  const C = c7.choice;
  if (C && !region.script.length && !(dialog.t > 0)) {
    ctx.save(); ctx.font = "19px Georgia, serif";
    const bw = Math.min(1100, W - 80), bx = (W - bw) / 2, lines = C.opts.map(o => wrapLines(o, bw - 70));
    const bh = 64 + lines.reduce((s, l) => s + l.length * 26 + 14, 0), by = 150;
    ctx.fillStyle = "rgba(24,14,6,0.88)"; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = "rgba(240,200,120,0.85)"; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = "#f6d98a"; ctx.font = "bold 18px Georgia, serif"; ctx.fillText("What will Abigail say?   (Up / Down, then A)", bx + 24, by + 32);
    let y = by + 64; ctx.font = "19px Georgia, serif";
    lines.forEach((l, i) => {
      if (i === C.i) { ctx.fillStyle = "rgba(240,200,120,0.18)"; ctx.fillRect(bx + 12, y - 20, bw - 24, l.length * 26 + 8); }
      ctx.fillStyle = i === C.i ? "#fff3cc" : "#cdbb98"; ctx.fillText(i === C.i ? "▶" : "", bx + 22, y);
      l.forEach((t, j) => ctx.fillText(t, bx + 48, y + j * 26)); y += l.length * 26 + 14;
    });
    ctx.restore();
  }
}
function c7Hold(d, dt) {   // she kneels while she speaks; no moving while the words are up
  if (!c7.on) return false;
  if (c7.pose) c7.pose.t += dt;
  if (c7.bowed && region.room && region.room.id === "valley") {
    d.vx = 0; d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt); return true;
  }
  return false;
}
// the people who walk off (Abigail and her maids at the end)
function c7MovePeople(dt) { for (const p of c6.people) if (p.vx) p.x += p.vx * dt; }

// ---------------------------------------------------------------------------------------------------------------------
// wrap carmel.js's hooks
{
  const B = CARMEL.build, E = CARMEL.enter, U = CARMEL.update, DD = CARMEL.drawDavid, D = CARMEL.draw, DF = CARMEL.drawFront, DO = CARMEL.drawOver;
  CARMEL.build = R => { B(R); c7Build(R); };
  CARMEL.enter = r => { E(r); c7Enter(r); };
  CARMEL.update = (dt, r) => { U(dt, r); c7Update(dt, r); c7MovePeople(dt);
    if (c6Has("c6_insult") && !c6Has("c7_begin") && !region.script.length && region.wait <= 0 && !region.trans) c7Begin(); };
  CARMEL.drawDavid = (d, x, y) => (c6.pose && c6.pose.hide) ? true : c7DrawAbi(d, x, y) || DD(d, x, y);
  CARMEL.draw = camX => { D(camX); c7Draw(camX); };
  CARMEL.drawFront = camX => { DF(camX); c7DrawFront(camX); };
  CARMEL.drawOver = () => { DO(); c7DrawOver(); };
  CARMEL.holdDavid = (d, dt) => c7Hold(d, dt);
}
