// World 7, stop 2: Ziklag (1 Samuel 27; 29; 30). ZIKLAG_PLAN.md. The same stage as the Hill of Hachilah (w7.js, "#9-13",
// saved as "w7"); loaded after w7.js and before region.js, it adds its rooms to W7 and hooks in beside Hachilah's.
//   Aphek (29): the Philistine lords send David home. The Road Home (30:1). Ziklag, burned (30:1-8): the men weep, they
//   talk of stoning him, "David strengthened himself in the LORD his God", the ephod, "Pursue". The Negev (30:9). The
//   brook Besor (30:9-10): two hundred stay behind. The Field (30:11-15): the Egyptian, fed and given water; he leads.
//   The Raiders' Camp (30:16-20): the battle, every family freed. Back at the brook Besor: "They shall share alike" (30:24).
// Glen 11-23: start at Aphek; find, feed, follow the Egyptian; a battle and free the captives; the sharing just plays.
// Stand-in art till Glen's (ART_PROMPTS_ZIKLAG.md).

const ZK = {
  NPC_K: 0.9,
  // Saul's jar (Hachilah): fill it at water (Up), pour it on a fire (Up): Glen's david_pour
  REACH: 100, POUR_AT: 0.55, POUR_RATE: 2,   // (Glen's pour is 6 s: played at twice the speed)
           // (px to a fire or the water; how far into the pour the fire goes out)
  FIRE_H: 5, FIRE_PX: 190, WELL_H: 84,   // (rows a fire stands: too tall to jump through; its picture's height; the well's)
  // the raiders (region.js's skirmisher, with the raider clips)
  RAID_K: 1.1, RAID_HP: 3,
  FREE_REACH: 80,                     // (px to a tied family to free them)
  FREE_SAFE: 5,                       // (no raider closer than this many columns, or they're too busy to untie)
  EGY_K: 0.95, EGY_LEAD: 160, EGY_SPEED: 260,
  MARCH_Y: [26, 56], MARCH_K: [0.62, 0.5],   // (Aphek's marching army: px above the ground line, and size, near row and far row)
  CAMELS: 4, CAMEL_SPEED: 420, CAMEL_K: 1,
  TINT: { ziklag: [90, 44, 20, 0.28], camp: [70, 26, 70, 0.30] },
};

W7.rooms.push(
  { id: "aphek", name: "Aphek", w: 70, bg: "w4_1", mx: 0, my: 4, mw: 2,
    get right() { return zkHas("z7_sent") ? "road" : null; },
    far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, near: "w3/near_gath.png", floor: "w3/road/ground.png" },   // (stand-in: the road down to Gath)
  { id: "road", name: "The Road Home", w: 130, bg: "w4_1", mx: 2, my: 4, mw: 3, left: "aphek", right: "ziklag",
    far: "keilah/road/far", mid: "keilah/road/mid.png", midY: 0, near: "keilah/road/near.png" },   // (stand-in: Keilah's road)
  { id: "ziklag", name: "Ziklag", w: 110, bg: "w4_3", mx: 5, my: 4, mw: 3, left: "road", right: "negev",
    far: "keilah/night/far", mid: "keilah/night/mid.png", midY: 0, near: "keilah/night/near.png" },   // (stand-in: Keilah's street at dusk, smoking)
  { id: "negev", name: "The Negev", w: 130, bg: "w4_1", mx: 8, my: 4, mw: 3, left: "ziklag", right: "besor",
    far: "ziph/maon/far", mid: "ziph/maon/mid.png", midY: 0, near: "ziph/maon/near.png" },   // (stand-in: the Wilderness of Maon)
  { id: "besor", name: "The Brook Besor", w: 70, bg: "w4_1", mx: 11, my: 4, mw: 2, left: "negev", right: "field",
    far: "engedi/spring/far", mid: "engedi/spring/mid.png", midY: 0 },   // (stand-in: En-Gedi's spring)
  { id: "field", name: "The Field", w: 90, bg: "w4_1", mx: 13, my: 4, mw: 2, left: "besor",
    get right() { return zkHas("z7_egypt") ? "camp" : null; },
    far: "ziph/hills/far", mid: "ziph/hills/mid.png", midY: 0, near: "ziph/hills/near.png" },   // (stand-in: Ziph's hills)
  { id: "camp", name: "The Raiders' Camp", w: 120, bg: "w4_1", mx: 15, my: 4, mw: 3, left: "field",
    far: "carmel/camp/far", mid: "carmel/camp/mid.png", midY: 224, near: "carmel/camp/near.png", nearK: 0.4 },   // (stand-in: Carmel's camp, at dusk)
);
// (Glen 11-23) Ziklag's own crawl (region.js CRAWLS.ziklag: 27:1-28:2, the double life, the march to Aphek), once
const ZK_ROOMS = ["aphek", "road", "ziklag", "negev", "besor", "field", "camp"];
W7.crawlKey = () => { const c = david.x / T, r = W7.rooms.find(o => c >= o.c0 && c < o.c0 + o.w); return r && ZK_ROOMS.includes(r.id) ? "ziklag" : null; };
// (Glen 11-23: "after each room or two, david can write in his journal and just build on that until the end for his last
//  entry. then the user can flip through them all ... start writing the pertinent psalms for what david is discovering
//  and enduring") a page after each beat, a psalm of David's beside it (WEB, "the LORD"; draft words for Glen); the last
//  page has the whole song. region.js jsSpreadLayout
W7.spreads = [
  { id: "zs_aphek", when: "z7_sent", title: "Aphek",
    entry: ["I marched with the Philistines, against my own people. I had walked into a net I made myself, and I could not see the way out. Then the lords of the Philistines sent me home. The LORD got me out.", "1 Samuel 29:6-11"],
    psalm: { ref: "Psalm 25", text: ["Show me your ways, LORD. Teach me your paths. Guide me in your truth, and teach me, for you are the God of my salvation. I wait for you all day long. (25:4-5)",
      "My eyes are ever on the LORD, for he will pluck my feet out of the net. (25:15)"] } },
  { id: "zs_ziklag", when: "z7_pursue", title: "Ziklag",
    entry: ["Ziklag is ashes. Abigail and Ahinoam are gone, and every wife and child. We wept until we could not weep any more, and my own men spoke of stoning me. I had nothing left but the LORD, so I went to Him. He said, Pursue.", "1 Samuel 30:3-8"],
    psalm: { ref: "Psalm 62", text: ["My soul, wait in silence for God alone, for my expectation is from him. He alone is my rock and my salvation, my fortress. I will not be shaken. (62:5-6)",
      "Trust in him at all times, you people. Pour out your heart before him. God is a refuge for us. (62:8)"] } },
  { id: "zs_field", when: "z7_egypt", title: "The Field",
    entry: ["A young Egyptian, left in a field to die because he got sick. We gave him bread and water, figs and raisins, and his spirit came back to him. The one his master threw away is the one showing us the way.", "1 Samuel 30:11-15"],
    psalm: { ref: "Psalm 41", text: ["Blessed is he who considers the poor. The LORD will deliver him in the day of evil. The LORD will preserve him, and keep him alive. (41:1-2)"] } },
  { id: "zs_camp", when: "z7_won", title: "The Raiders' Camp",
    entry: ["From the twilight to the evening of the next day. Every wife, every son and daughter, nothing lacking, small or great. Abigail and Ahinoam are safe. The LORD recovered all, just as He said He would.", "1 Samuel 30:17-19"],
    psalm: { ref: "Psalm 18", text: ["For you will light my lamp, LORD. My God will light up my darkness. For by you, I advance through a troop. By my God, I leap over a wall. (18:28-29)"] } },
  { id: "zs_end", when: "z7_end", title: "The Brook Besor", final: true,
    entry: ["Some of my men would not share the plunder with the two hundred who stayed by the brook. No. It is the LORD who gave it. They shall share alike.", "1 Samuel 30:23-24"],
    psalm: { ref: "Psalm 133:1", text: "See how good and how pleasant it is for brothers to live together in unity!" } },
];
const zkWrite = id => ({ fn() { jsceneOpen(false, id); } });   // (David sits down and writes the page)
{ const H = { holdDavid: W7.holdDavid, build: W7.build, enter: W7.enter, update: W7.update, drawDavid: W7.drawDavid, draw: W7.draw, drawFront: W7.drawFront, drawOver: W7.drawOver };
  Object.assign(W7, {
    build: R => { H.build(R); zkBuild(R); },
    enter: r => { H.enter(r); zkEnter(r); },
    update: (dt, r) => { H.update(dt, r); zkUpdate(dt, r); },
    holdDavid: (d, dt) => zkHold(d, dt) || (H.holdDavid ? H.holdDavid(d, dt) : false),
    drawDavid: (d, x, y) => zkDrawDavid(d, x, y) || H.drawDavid(d, x, y),
    draw: camX => { H.draw(camX); zkDraw(camX); },
    drawFront: camX => { H.drawFront(camX); zkDrawFront(camX); },
    drawOver: () => { H.drawOver(); zkDrawOver(); },
  }); }

const zk = { told: {}, fires: [], waters: [], foods: [], captives: [], camels: [], jar: false, act: null, egy: null, men: [], stones: null };
const zkHas = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function zkTell(k, text) { if (!zk.told[k]) { zk.told[k] = true; toast(text); } }
const ZK_SAY = (who, text) => ({ say: [who, text] });
const zkFree = () => !region.script.length && region.wait <= 0 && !region.trans && !(dialog.t > 0);

// ---------------------------------------------------------------------------------------------------------------------
function zkBuild(R) {
  for (const k of ["fires", "waters", "foods", "captives", "camels", "men"]) zk[k].length = 0;
  zk.act = null; zk.egy = null; zk.stones = null; zk.jar = zkHas("z7_jar");
  const P = (room, spr, x, dir = 1, show = null, k = ZK.NPC_K) => h7Person(room, spr, x, dir, show, k);

  // -- Aphek (29): the armies pass; Achish and the lords
  let c = R("aphek");
  { const rm = "aphek", X = k => (c + k) * T;
    ground(c, c + 69);
    P(rm, "gath_guard_idle", X(30), 1); P(rm, "gath_elite_idle", X(32.5), 1);
    zk.achish = P(rm, "achish_idle", X(40), -1, null, 1);
    zk.lords = [P(rm, "gath_elite_idle", X(43), -1), P(rm, "gath_elite_idle", X(45.5), -1)];
    rTalker(zk.achish, () => [["Achish", zkHas("z7_sent") ? "Rise up early in the morning and depart, as soon as you have light." : "Come, David."]]);
  }

  // -- The Road Home (29:11; 30:1): three days south; the wild things of the road
  c = R("road");
  { const rm = "road";
    ground(c, c + 129);
    critter("scorpion", c + 20, GR - 1, 2); rWild("ostrich", rm, c + 34, { range: 3 });
    rBoulder(rm, c + 46); rHole(rm, c + 56, 3);
    rWild("viper", rm, c + 66); rWild("wildass", rm, c + 80, { range: 3 });
    rHole(rm, c + 92, 4); critter("scorpion", c + 100, GR - 1, 2); rWild("caracal", rm, c + 112, { range: 2 });
  }

  // -- Ziklag, burned (30:1-8)
  c = R("ziklag");
  { const rm = "ziklag", X = k => (c + k) * T;
    ground(c, c + 109);
    // David's men in the ashes, weeping (30:4); then they turn on him (30:6)
    for (const [k, spr, dir] of [[14, "men_hungry", 1], [19, "men_hungry", -1], [24, "men_hungry", -1], [30, "men_hungry", 1], [35, "men_hungry", 1]])
      zk.men.push(P(rm, spr, X(k), dir));
    zk.abiathar = P(rm, "abiathar_stand", X(6), 1, () => zkHas("z7_stones"));
    zk.waters.push({ room: rm, x: X(52), kind: "well" });   // (the town's well: fill the jar)
    zkFire(rm, c + 60); zkFire(rm, c + 74);
    zk.waters.push({ room: rm, x: X(80), kind: "well" });
    zkFire(rm, c + 88);
  }

  // -- The Negev (30:9): after the raiders, with six hundred men
  c = R("negev");
  { const rm = "negev";
    ground(c, c + 129);
    critter("scorpion", c + 14, GR - 1, 2); rWild("viper", rm, c + 24); rHole(rm, c + 32, 4);
    rWild("ostrich", rm, c + 48, { range: 3 }); rBoulder(rm, c + 60);
    zkFood(rm, "bread", c + 62, GR * T - 108);   // (on the boulder)
    rHole(rm, c + 72, 5); rLedge(rm, c + 73, GR * T - 120, 3);
    critter("scorpion", c + 86, GR - 1, 2); rWild("caracal", rm, c + 98, { range: 2 }); rWild("viper", rm, c + 110);
    rHole(rm, c + 118, 3);
  }

  // -- The Brook Besor (30:9-10): the faint two hundred stay; over the water
  c = R("besor");
  { const rm = "besor", X = k => (c + k) * T;
    ground(c, c + 69);
    for (const k of [6, 10, 14, 18]) zk.men.push(P(rm, "men_hungry", X(k), k % 8 ? 1 : -1, () => zkHas("z7_besor")));
    zk.brook = { room: rm, c0: c + 26, c1: c + 36 };
    rHole(rm, c + 26, 10);
    h7Rock(rm, "sand", "s", 29.2, GR * T - 24);   // (a rock in the brook: jump to it, and on over)
    zk.waters.push({ room: rm, x: X(25), kind: "brook" }, { room: rm, x: X(37), kind: "brook" });
  }

  // -- The Field (30:11-15): the Egyptian
  c = R("field");
  { const rm = "field", X = k => (c + k) * T;
    ground(c, c + 89);
    rBoulder(rm, c + 12); zkFood(rm, "fig_cake", c + 14, GR * T - 108);
    critter("scorpion", c + 24, GR - 1, 2);
    rLedge(rm, c + 30, GR * T - 110, 3); rLedge(rm, c + 36, GR * T - 210, 3); zkFood(rm, "raisins", c + 37, GR * T - 210);
    zk.egy = { room: rm, x: X(58), y: FOOT, st: zkHas("z7_egypt") ? "lead" : "weak", t: 0, home: X(58) };
    if (zkHas("z7_egypt")) zk.egy.x = X(84);
  }

  // -- The Raiders' Camp (30:16-20)
  c = R("camp");
  { const rm = "camp", X = k => (c + k) * T;
    ground(c, c + 119);
    const won = zkHas("z7_won");
    if (!won) for (const k of [16, 26, 34, 46, 54, 64, 72, 84, 92, 104]) zkRaider(rm, c + k);
    const fams = [[22, "villager_woman_stand", "girl_sit_talk"], [40, "villager_woman_stand", "boy_sit"], [58, "villager_woman_stand", "girl_sit_talk"],
                  [78, "villager_woman_stand", "boy_sit"], [98, "villager_woman_stand", "girl_sit_talk"], [112, "abigail_idle", "villager_woman_stand", true]];
    for (const [k, a, b, wives] of fams) zk.captives.push({ room: rm, x: X(k), a, b, wives: !!wives, free: won, t: 0, gone: won });
  }
}
function zkFire(room, c) {   // a fire standing in the street: solid (no way through) till the jar puts it out
  const f = { room, c, x: c * T + T / 2, out: zkHas(`z7_fire_${room}_${c}`), t: Math.random() * 5, steam: 0 };
  if (!f.out) block(c, GR - ZK.FIRE_H, 1, ZK.FIRE_H, 6);   // (6: solid, nothing drawn: the fire is)
  kitImg("w4_z_fire"); kitImg("w4_z_fire_out");
  zk.fires.push(f);
}
function zkFood(room, name, c, y) { zk.foods.push({ room, name, x: c * T + T / 2, y, got: zkHas("z7_" + name), t: Math.random() * 4 }); }
function zkRaider(room, c) {   // an Amalekite (region.js's skirmisher, with Glen's raider clips): he feasts, then comes at David
  beast("phil", room, c, { y: GR * T, hy: GR * T, range: 6 * T, state: "wait", hp: ZK.RAID_HP, alpha: 1, k: ZK.RAID_K,
    sk: { wait: "raider_walk", far: "raider_party", charge: "raider_attack", run: "raider_run", drop: SPR.raider_flee_start ? "raider_flee_start" : "raider_down",
          dropFace: 1, flee: "raider_flee", noGear: true, tell: "The Amalekites! Three stones (or one charged) and he runs." } });
}

// ---------------------------------------------------------------------------------------------------------------------
function zkEnter(r) {
  if (r.id === "road" && !zk.told.road) zkTell("road", "Three days south to Ziklag.");
  if (r.id === "ziklag" && !zkHas("z7_burned")) {
    regionAdd("taken", "z7_burned");
    rPlay([
      ZK_SAY("", "When David and his men had come to Ziklag on the third day, the Amalekites had made a raid on the South and on Ziklag, and had struck Ziklag and burned it with fire, and had taken captive the women and all who were in it, both small and great. They didn't kill any, but carried them off and went their way. (1 Samuel 30:1-2)"),
      ZK_SAY("", "When David and his men came to the city, behold, it was burned with fire; and their wives, their sons, and their daughters were taken captive. Then David and the people who were with him lifted up their voice and wept until they had no more power to weep. (1 Samuel 30:3-4)"),
      ZK_SAY("", "David's two wives were taken captive, Ahinoam the Jezreelitess, and Abigail the wife of Nabal the Carmelite. (1 Samuel 30:5)"),
    ]);
  }
  if (r.id === "negev" && zkHas("z7_pursue")) zkTell("negev", "After the raiders, with six hundred men. Their tracks lead south.");
  if (r.id === "besor" && zkHas("z7_won") && !zkHas("z7_end")) zkShare();
  else if (r.id === "besor" && !zkHas("z7_besor")) {
    regionAdd("taken", "z7_besor");
    rPlay([ZK_SAY("", "So David went, he and the six hundred men who were with him, and came to the brook Besor, where those who were left behind stayed. But David pursued, he and four hundred men; for two hundred stayed behind, who were so faint that they couldn't go over the brook Besor. (1 Samuel 30:9-10)"),
      { fn() { toast(zk.jar ? "Over the brook." : "Fill Saul's jar at the brook (Up at the water's edge), then over."); } }]);
  }
  if (r.id === "field" && !zkHas("z7_egypt")) zkTell("field", "Someone's out in the field up ahead...");
  if (r.id === "camp" && !zkHas("z7_camp")) {
    regionAdd("taken", "z7_camp");
    rPlay([ZK_SAY("", "When he had brought him down, behold, they were spread around over all the ground, eating, drinking, and dancing, because of all the great plunder that they had taken out of the land of the Philistines, and out of the land of Judah. (1 Samuel 30:16)"),
      { fn() { toast("Free every family (Up by them). The raiders won't let them go easily."); } }]);
  }
}

function zkUpdate(dt, r) {
  const d = david, free = zkFree();
  for (const f of zk.fires) { f.t += dt; if (f.steam > 0) f.steam -= dt; }
  for (const o of zk.foods) o.t += dt;
  // the start (Aphek, after the crawl): the cut scene (29), then home
  if (zk.cine) zk.cine.t += dt;
  if (zk.march) for (const m of zk.march) { m.x += 70 * dt; m.t += dt; }
  if (r.id === "aphek" && !zkHas("z7_sent") && !zk.cine && free) zkAphek();
  // Ziklag: past the weeping men, they turn on him (30:6)
  if (r.id === "ziklag" && zkHas("z7_burned") && !zkHas("z7_stones") && free && d.x > (roomById("ziklag").c0 + 40) * T) zkStones();
  // the jar: fill it, pour it
  if (zk.act) zkAct(dt);
  else if (free && d.onGround && pressed("up")) {
    const w = zk.waters.find(o => o.room === r.id && Math.abs(o.x - d.x) < ZK.REACH);
    const f = zk.fires.find(o => o.room === r.id && !o.out && Math.abs(o.x - d.x) < ZK.REACH);
    if (f) { if (zk.jar) { zk.act = { kind: "pour", t: 0, f }; d.facing = Math.sign(f.x - d.x) || d.facing; } else toast(zk.waters.some(o => o.room === r.id) ? "The jar's empty. Fill it at the well." : "The jar's empty."); }
    else if (w) { if (zk.jar) zkTell("full", "The jar's already full."); else { zk.act = { kind: "fill", t: 0 }; } }
  }
  if (r.id === "ziklag" && zkHas("z7_stones") && !zkHas("z7_pursue")) zkTell("fires", "Fires block the street. Fill Saul's jar at the well (Up), and pour it on the fire (Up).");
  // food on the way (for the Egyptian)
  for (const o of zk.foods) if (o.room === r.id && !o.got && Math.abs(d.x - o.x) < 40 && Math.abs(d.y - o.y) < 70) {
    o.got = true; regionAdd("taken", "z7_" + o.name); sfx && typeof sfx === "function" && sfx("pickup", o.x, 0.6);
    toast({ bread: "Bread.", fig_cake: "A piece of a cake of figs.", raisins: "Two clusters of raisins." }[o.name] + (zkHas("z7_egypt") ? "" : " (Keep it: someone may need it.)"));
  }
  zkEgyptian(dt, r, free);
  zkCamp(dt, r, free);
}
// David filling or pouring the jar (held still while he does)
function zkHold(d) { if (zk.act || zk.pray || zk.cine) { d.vx = 0; return true; } return false; }
function zkAct(dt) {
  const A = zk.act, d = david; A.t += dt;
  if (A.kind === "fill") { if (A.t > 0.9) { zk.act = null; zk.jar = true; regionAdd("taken", "z7_jar"); toast("Saul's jar: full of water."); } return; }
  const dur = SPR.david_pour ? SPR.david_pour.frames * SPR.david_pour.ms / 1000 / ZK.POUR_RATE : 1.2;
  if (!A.done && A.t > dur * ZK.POUR_AT) { A.done = true; const f = A.f; f.out = true; f.steam = 2.5; regionAdd("taken", `z7_fire_${f.room}_${f.c}`);
    for (let r = GR - ZK.FIRE_H; r < GR; r++) solid[r][f.c] = 0;
    zk.jar = false; region.save.taken = region.save.taken.filter(k => k !== "z7_jar");
    toast(zk.fires.some(o => o.room === f.room && !o.out) ? "The fire's out. Fill the jar again for the next." : "The fire's out."); }
  if (A.t > dur) zk.act = null;
}

// (Glen 11-23: "i never knew that side so we can play that in the crawl and as the cut scene to make it dramatic. we can
//  get to the meat of it") Aphek isn't played: the armies march past, the lords and Achish argue over David, and he's
//  sent home; then the road
function zkAphek() {
  const d = david, c = roomById("aphek").c0;
  zk.cine = { t: 0, at: performance.now() / 1000 }; d.x = (c + 36) * T; d.vx = 0; d.facing = 1; snapCamera();
  zk.march = [];   // the Philistine armies passing behind, by hundreds and by thousands (29:2)
  for (let i = 0; i < 34; i++) zk.march.push({ row: i % 2, x: (c + 14) * T + i * 70 + (i % 2) * 30, spr: i % 3 ? "gath_guard_walk" : "gath_elite_walk", t: i * 0.13 });
  rPlay([
    { wait: 3.2 },
    ZK_SAY("", "Now the Philistines gathered together all their armies to Aphek; and the Israelites encamped by the spring which is in Jezreel. The lords of the Philistines passed on by hundreds and by thousands; and David and his men passed on in the rear with Achish. (1 Samuel 29:1-2)"),
    ZK_SAY("A lord of the Philistines", "“What about these Hebrews?” (1 Samuel 29:3)"),
    ZK_SAY("Achish", "“Isn't this David, the servant of Saul the king of Israel, who has been with me these days, or rather these years? I have found no fault in him since he fell away until today.” (1 Samuel 29:3)"),
    ZK_SAY("A lord of the Philistines", "“Make the man return, that he may go back to his place where you have appointed him, and let him not go down with us to battle, lest in the battle he become an adversary to us. Isn't this David, of whom people sang to one another in dances, saying, ‘Saul has slain his thousands, and David his ten thousands’?” (1 Samuel 29:4-5)"),
    { fn() { zk.achish.spr = "achish_point"; } },
    ZK_SAY("Achish", "“As the LORD lives, you have been upright, and your going out and your coming in with me in the army is good in my sight. Nevertheless, the lords don't favor you. Therefore now return, and go in peace, that you not displease the lords of the Philistines.” (1 Samuel 29:6-7)"),
    ZK_SAY("David", "“But what have I done? What have you found in your servant so long as I have been before you to this day, that I may not go and fight against the enemies of my lord the king?” (1 Samuel 29:8)"),
    { fn() { zk.achish.spr = "achish_exasperated"; } },
    ZK_SAY("Achish", "“I know that you are good in my sight, as an angel of God. Notwithstanding, the princes of the Philistines have said, ‘He shall not go up with us to the battle.’ Therefore now rise up early in the morning with the servants of your lord who have come with you; and as soon as you are up early in the morning and have light, depart.” (1 Samuel 29:9-10)"),
    { fn() { zk.achish.spr = "achish_idle"; } },
    ZK_SAY("", "So David rose up early, he and his men, to depart in the morning, to return into the land of the Philistines; and the Philistines went up to Jezreel. (1 Samuel 29:11)"),
    { fn() { regionAdd("taken", "z7_sent");
      regionGo((roomById("road").c0 + 3) * T, 1, () => { zk.cine = null; zk.march = null; zk.told.road = true;
        rPlay([{ wait: 0.9 }, zkWrite("zs_aphek"), { wait: 0.3 }, { fn() { toast("Three days south, home to Ziklag."); } }]); }); } },
  ]);
}
function zkStones() {
  regionAdd("taken", "z7_stones");
  const dur = SPR.david_pray ? SPR.david_pray.frames * SPR.david_pray.ms / 1000 * 2 : 2.5;
  rPlay([
    { fn() { zk.stones = { t: 0 }; for (const m of zk.men) if (m.room === "ziklag") { m.dir = Math.sign(david.x - m.x) || 1; } } },
    ZK_SAY("", "David was greatly distressed, for the people spoke of stoning him, because the souls of all the people were grieved, every man for his sons and for his daughters; (1 Samuel 30:6)"),
    { fn() { zk.pray = { t: 0 }; david.vx = 0; } }, { wait: dur },
    ZK_SAY("", "but David strengthened himself in the LORD his God. (1 Samuel 30:6)"),
    { fn() { zk.pray = null; zk.stones = null; zk.abiathar.x = david.x - 120; zk.abiathar.dir = 1; } },
    ZK_SAY("David", "“Please bring the ephod here to me.” (1 Samuel 30:7)"),
    { fn() { zk.abiathar.spr = "abiathar_ephod"; zk.abiathar.t = 0; } },
    ZK_SAY("", "Abiathar brought the ephod to David. (1 Samuel 30:7)"),
    ZK_SAY("David", "“If I pursue after this troop, will I overtake them?” (1 Samuel 30:8)"),
    ZK_SAY("The LORD", "“Pursue, for you will surely overtake them, and will without fail recover all.” (1 Samuel 30:8)"),
    { fn() { zk.abiathar.spr = "abiathar_stand"; regionAdd("taken", "z7_pursue"); } }, zkWrite("zs_ziklag"), { wait: 0.3 },
    { fn() { toast("After them (right)!"); } },
  ]);
}

// the Egyptian (30:11-15): weak in the field; feed him and give him water; he talks, then leads
function zkEgyptian(dt, r, free) {
  const E = zk.egy, d = david; if (!E) return; E.t += dt;
  if (E.room !== r.id) return;
  if (E.st === "weak" && free && d.onGround && Math.abs(d.x - E.x) < 170) {
    zkTell("egy", "An Egyptian, near dead from hunger and thirst. Up to help him.");
    if (pressed("up")) {
      const need = [!zkHas("z7_bread") && "bread", !zk.jar && "water (Saul's jar)", !zkHas("z7_fig_cake") && "a piece of a fig cake", !zkHas("z7_raisins") && "raisins"].filter(Boolean);
      if (need.length) toast("He needs " + need.join(", ") + ".");
      else zkFeed();
    }
  }
  if (E.st === "lead") {   // ahead of David, toward the camp
    const tx = Math.min((roomById("field").c0 + 86) * T, d.x + ZK.EGY_LEAD);
    const v = Math.sign(tx - E.x) * Math.min(ZK.EGY_SPEED, Math.abs(tx - E.x) * 3);
    E.x += v * dt; E.moving = Math.abs(v) > 20; E.dir = v > 0 ? 1 : v < 0 ? -1 : E.dir || 1;
  }
}
function zkFeed() {
  const E = zk.egy;
  rPlay([
    { fn() { E.st = "eat"; E.t = 0; } },
    ZK_SAY("", "They found an Egyptian in the field, and brought him to David, and gave him bread, and he ate; and they gave him water to drink. (1 Samuel 30:11)"),
    { fn() { E.st = "drink"; E.t = 0; zk.jar = false; region.save.taken = region.save.taken.filter(k => k !== "z7_jar"); } }, { wait: 1.2 },
    { fn() { E.st = "revive"; E.t = 0; } },
    ZK_SAY("", "They gave him a piece of a cake of figs and two clusters of raisins. When he had eaten, his spirit came again to him; for he had eaten no bread, and drank no water for three days and three nights. (1 Samuel 30:12)"),
    { fn() { E.st = "talk"; E.t = 0; } },
    ZK_SAY("David", "“To whom do you belong? Where are you from?” (1 Samuel 30:13)"),
    ZK_SAY("The Egyptian", "“I am a young man of Egypt, servant to an Amalekite; and my master left me, because three days ago I got sick. We made a raid on the South of the Cherethites, and on that which belongs to Judah, and on the South of Caleb; and we burned Ziklag with fire.” (1 Samuel 30:13-14)"),
    ZK_SAY("David", "“Will you bring me down to this troop?” (1 Samuel 30:15)"),
    ZK_SAY("The Egyptian", "“Swear to me by God that you will not kill me and not deliver me up into the hands of my master, and I will bring you down to this troop.” (1 Samuel 30:15)"),
    { fn() { E.st = "lead"; regionAdd("taken", "z7_egypt"); } }, zkWrite("zs_field"), { wait: 0.3 }, { fn() { toast("Follow him (right)."); } },
  ]);
}

// the camp (30:16-20): free every family; when they're all free, the raiders that are left run for their camels
function zkCamp(dt, r, free) {
  const d = david;
  for (const q of zk.captives) { if (q.free) q.t += dt; if (q.free && q.t > 2.4) q.gone = true; }
  for (const m of zk.camels) { m.x += m.dir * ZK.CAMEL_SPEED * dt; m.t += dt; }
  if (r.id !== "camp" || zkHas("z7_won")) return;
  if (free && d.onGround && pressed("up")) {
    const q = zk.captives.find(o => o.room === r.id && !o.free && Math.abs(o.x - d.x) < ZK.FREE_REACH);
    if (q) {
      const near = region.beasts.some(b => b.room === r.id && b.kind === "phil" && !b.dead && b.state !== "flee" && b.state !== "drop" && Math.abs(b.x - d.x) < ZK.FREE_SAFE * T);
      if (near) toast("Not with a raider on you! Drive him off first.");
      else { q.free = true; q.t = 0; sfx && typeof sfx === "function" && sfx("pickup", q.x, 0.6);
        const n = zk.captives.filter(o => o.free).length, all = zk.captives.length;
        toast(q.wives ? "Abigail and Ahinoam! David rescued his two wives (30:18)." : `Free! ${n} of ${all} families.`);
        if (n === all) zkWon(); }
    }
  }
}
function zkWon() {
  regionAdd("taken", "z7_won");
  for (const b of region.beasts) if (b.room === "camp" && b.kind === "phil" && !b.dead) { b.state = "flee"; b.t = 0; b.fleeDir = 1; }
  for (let i = 0; i < ZK.CAMELS; i++) zk.camels.push({ x: camX - 200 - i * 170, dir: 1, t: i * 0.3, y: FOOT - 10 - i * 6 });
  rPlay([
    { wait: 1 },
    ZK_SAY("", "David struck them from the twilight even to the evening of the next day. Not a man of them escaped from there, except four hundred young men who rode on camels and fled. (1 Samuel 30:17)"),
    ZK_SAY("", "David recovered all that the Amalekites had taken, and David rescued his two wives. There was nothing lacking to them, neither small nor great, neither sons nor daughters, neither plunder, nor anything that they had taken. David brought them all back. (1 Samuel 30:18-19)"),
    { wait: 1.5 }, zkWrite("zs_camp"), { wait: 0.3 },
    { fn() { toast("Back to the brook Besor (left), where the two hundred wait."); } },
  ]);
}
function zkShare() {
  rPlay([
    ZK_SAY("", "David came to the two hundred men, who were so faint that they could not follow David, whom also they had made to stay at the brook Besor; and they went out to meet David, and to meet the people who were with him. When David came near to the people, he greeted them. (1 Samuel 30:21)"),
    ZK_SAY("A worthless fellow", "“Because they didn't go with us, we will not give them anything of the plunder that we have recovered, except to every man his wife and his children, that he may lead them away and depart.” (1 Samuel 30:22)"),
    ZK_SAY("David", "“Do not do so, my brothers, with that which the LORD has given to us, who has preserved us, and delivered the troop that came against us into our hand. Who will listen to you in this matter? For as his share is who goes down to the battle, so shall his share be who stays with the baggage. They shall share alike.” (1 Samuel 30:23-24)"),
    ZK_SAY("", "It was so from that day forward that he made it a statute and an ordinance for Israel to this day. (1 Samuel 30:25)"),
    { fn() { regionAdd("taken", "z7_end"); } }, { wait: 1.2 },
    { fn() { jsceneOpen(true, "zs_end"); } },   // (his last page; then the card, and the road)
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function zkDrawDavid(d, x, y) {
  if (zk.act && zk.act.kind === "pour" && SPR.david_pour) { drawSprite("david_pour", frameOf("david_pour", zk.act.t * ZK.POUR_RATE), x, y, d.facing); return true; }
  if (zk.act && zk.act.kind === "fill" && SPR.david_kneel) { drawSprite("david_kneel", frameOf("david_kneel", zk.act.t), x, y, d.facing); return true; }
  if (zk.pray && SPR.david_pray) { drawSprite("david_pray", frameOf("david_pray", h7Now() - (zk.pray.t0 ??= h7Now())), x, y, d.facing); return true; }
  return false;
}
function zkDraw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  for (const w of zk.waters) if (w.room === r.id && w.kind === "well") { const im = ITEM.town_well; if (im && im.naturalWidth) drawItem("town_well", w.x - camX, FOOT + 4, ZK.WELL_H / im.naturalHeight); }   // (the town's well: Glen's)
  if (zk.brook && zk.brook.room === r.id) {   // the brook: water in the gap (stand-in)
    const x0 = zk.brook.c0 * T - camX, x1 = zk.brook.c1 * T - camX;
    ctx.save(); const g = ctx.createLinearGradient(0, FOOT, 0, FOOT + 90); g.addColorStop(0, "rgba(90,150,170,0.9)"); g.addColorStop(1, "rgba(30,60,80,0.95)");
    ctx.fillStyle = g; ctx.fillRect(x0, FOOT + 10 + Math.sin(now * 2) * 2, x1 - x0, 200); ctx.restore(); }
  for (const f of zk.fires) if (f.room === r.id) zkDrawFire(f, f.x - camX, now);
  for (const o of zk.foods) if (o.room === r.id && !o.got) drawItem(o.name, o.x - camX, o.y + 2 + Math.sin(o.t * 2.5) * 3, 30 / ((ITEM[o.name] && ITEM[o.name].naturalHeight) || 30));
  const E = zk.egy;
  if (E && E.room === r.id) {
    const n = { weak: "egyptian_sit", eat: "egyptian_eat", drink: "egyptian_drink", revive: "egyptian_revive", talk: "egyptian_talk", lead: E.moving ? "egyptian_walk" : "egyptian_point" }[E.st];
    const once = E.st === "revive" || E.st === "drink";
    drawSprite(n, once ? Math.min(SPR[n].frames - 1, frameOf(n, E.t)) : frameOf(n, E.t), E.x - camX, E.y, E.st === "lead" ? E.dir || 1 : -1, ZK.EGY_K);
  }
  for (const q of zk.captives) if (q.room === r.id && !q.gone) {   // a family tied at a stake; freed, they run off home (left)
    const x = q.x - camX, a = q.free ? Math.max(0, 1 - q.t / 2.4) : 1, run = q.free ? -q.t * 260 : 0;
    if (!q.free) { ctx.save(); ctx.strokeStyle = "#5a3e20"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 4, FOOT); ctx.lineTo(x + 4, FOOT - 70); ctx.stroke();
      ctx.strokeStyle = "#b89a60"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 4, FOOT - 40); ctx.quadraticCurveTo(x - 14, FOOT - 20, x - 30, FOOT - 34); ctx.stroke(); ctx.restore(); }
    const ra = q.free ? (q.a === "abigail_idle" ? "abigail_run" : "villager_woman_run") : q.a, rb = q.free ? (q.b === "villager_woman_stand" ? "villager_woman_run" : "girl_run") : q.b;
    drawSprite(ra, frameOf(ra, q.t + now), x - 26 + run, FOOT, q.free ? -1 : 1, ZK.NPC_K, a);
    drawSprite(rb, frameOf(rb, q.t + now), x + 34 + run, FOOT, q.free ? -1 : -1, ZK.NPC_K * (q.wives ? 1 : 0.8), a);
  }
  for (const m of zk.camels) if (SPR.raider_camel) drawSprite("raider_camel", frameOf("raider_camel", m.t), m.x - camX, m.y, m.dir, ZK.CAMEL_K);
}
// (Glen 11-24: "the philistine men are in the background of the near ground but in front of the mid ground") the armies
//  passing behind, by hundreds and by thousands (29:2): drawn between the room's mid and near pictures (region.js afterMid)
W7.afterMid = (r, camX) => {
  if (!zk.march || r.id !== "aphek") return;
  for (const row of [1, 0]) for (const m of zk.march) if (m.row === row && SPR[m.spr]) {   // (the far row smaller and paler)
    const x = m.x - camX; if (x < -80 || x > W + 80) continue;
    drawSprite(m.spr, frameOf(m.spr, m.t), x, FOOT - (row ? ZK.MARCH_Y[1] : ZK.MARCH_Y[0]), 1, row ? ZK.MARCH_K[1] : ZK.MARCH_K[0], row ? 0.8 : 1);
  }
};
function zkDrawFire(f, x, now) {
  if (f.out) {   // blackened, a little steam
    if (f.steam > 0) { ctx.save(); for (let i = 0; i < 5; i++) { const k = (now * 0.6 + i / 5) % 1; ctx.fillStyle = `rgba(235,235,235,${0.35 * (1 - k) * Math.min(1, f.steam)})`;
      ctx.beginPath(); ctx.arc(x + Math.sin(i * 2 + now) * 10, FOOT - 20 - k * 90, 10 + k * 16, 0, 7); ctx.fill(); } ctx.restore(); }
    const im = kitImg("w4_z_fire_out"); if (im) { const k = ZK.FIRE_PX / im.naturalHeight, w = im.naturalWidth * k; ctx.drawImage(im, x - w / 2, FOOT + 6 - ZK.FIRE_PX, w, ZK.FIRE_PX); }
    return;
  }
  const h = ZK.FIRE_H * T;   // Glen's fire (Ziph's signal fire, 11-15) till his burning doorway, a glow round it
  { const im = kitImg("w4_z_fire"); if (im) { const k = ZK.FIRE_PX / im.naturalHeight, w = im.naturalWidth * k; ctx.drawImage(im, x - w / 2, FOOT + 6 - ZK.FIRE_PX, w, ZK.FIRE_PX); } }
  ctx.save(); ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 9; i++) { const k = (now * 1.4 + i / 9 + f.t) % 1, s = Math.sin(i * 7.3 + now * 3);
    const g = ctx.createRadialGradient(x + s * 12, FOOT - k * h, 2, x + s * 12, FOOT - k * h, 30 * (1 - k * 0.6));
    g.addColorStop(0, `rgba(255,230,140,${0.8 * (1 - k)})`); g.addColorStop(0.5, `rgba(255,120,30,${0.55 * (1 - k)})`); g.addColorStop(1, "rgba(200,40,0,0)");
    ctx.fillStyle = g; ctx.fillRect(x - 50, FOOT - h - 40, 100, h + 50); }
  ctx.restore();
  ctx.save(); for (let i = 0; i < 4; i++) { const k = (now * 0.35 + i / 4) % 1; ctx.fillStyle = `rgba(70,60,55,${0.35 * (1 - k)})`;
    ctx.beginPath(); ctx.arc(x + Math.sin(i * 3 + now * 0.7) * 20, FOOT - h - k * 160, 18 + k * 30, 0, 7); ctx.fill(); } ctx.restore();
}
function zkDrawFront(camX) {
  const r = region.room; if (!r || r.id !== "camp" || zkHas("z7_won")) return;
  const n = zk.captives.filter(o => o.free).length, all = zk.captives.length;   // the count (30:19)
  ctx.save(); ctx.font = "bold 20px Georgia, serif"; ctx.textAlign = "center"; ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(W / 2 - 150, 52, 300, 34);
  ctx.fillStyle = "#ffe08a"; ctx.fillText(`Families brought back: ${n} of ${all}`, W / 2, 76); ctx.restore();
}
function zkDrawOver() {
  const r = region.room; if (!r) return;
  if (zk.cine) {   // the cut scene: the picture letterboxed, and the place named
    const t = performance.now() / 1000 - zk.cine.at, bar = 64 * Math.min(1, t / 0.8);   // (real time: the title fades on schedule even while the words wait for Z)
    ctx.save(); ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, bar); ctx.fillRect(0, H - bar * 0.5, W, bar * 0.5);
    const a = Math.max(0, Math.min(1, t / 0.8, (3.4 - t) / 0.6));
    if (a > 0) { ctx.globalAlpha = a; ctx.textAlign = "center"; ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(0, H * 0.3 - 60, W, 104);
      ctx.fillStyle = "#ffe08a"; ctx.font = "bold 54px Georgia, serif"; ctx.fillText("Aphek", W / 2, H * 0.3);
      ctx.fillStyle = "#e9dcc0"; ctx.font = "italic 22px Georgia, serif"; ctx.fillText("The Philistines gather for war against Israel", W / 2, H * 0.3 + 32); }
    ctx.restore();
  }
  const tn = ZK.TINT[r.id]; if (!tn) return;
  ctx.save(); ctx.fillStyle = `rgba(${tn[0]},${tn[1]},${tn[2]},${tn[3]})`; ctx.fillRect(0, 0, W, H); ctx.restore();
  if (r.id === "ziklag") {   // smoke over the town
    const now = performance.now() / 1000; ctx.save();
    for (let i = 0; i < 9; i++) { const k = (now * 0.04 + i / 9) % 1, x = ((i * 211 - camX * 0.3) % (W + 300) + W + 300) % (W + 300) - 150;
      const y = H * 0.6 - k * H * 0.55, rad = 90 + k * 160, g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `rgba(55,45,40,${0.3 * Math.sin(k * Math.PI)})`); g.addColorStop(1, "rgba(55,45,40,0)");
      ctx.fillStyle = g; ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
    ctx.restore();
  }
}
