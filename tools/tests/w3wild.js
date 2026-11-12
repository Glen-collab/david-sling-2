// (Glen 11-12) the road animals (wildlife.js): each one where it lives, a picture, and what it does when David comes near
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
for (const n of Object.values(WILD).flatMap(w => [w.idle, w.act, w.run, w.die]).concat(["stork_peck", "stork_fly", "owl_perch", "owl_fly"])) if (n && !SPR[n]) log("NO SHEET " + n);
const at = (room, k, f) => [{ n: 2, fn() { moveParty((roomById(room).c0 + k) * T, GR * T); david.facing = 1; snapCamera(); r3.vines.length = 0; r3.vineT = 99; david.inv = 99; if (f) f(); } }];
const report = room => { const bs = region.beasts.filter(b => b.room === room && (WILD[b.kind] || BIRD[b.kind])); log(room + ": " + bs.map(b => b.kind + "@" + Math.round(b.x / T - roomById(room).c0) + " " + b.state + (b.dead ? " dead" : "")).join(", ")); };
testRun([
  ...at("nobroad", 8), { keys: [], n: 20, snap: true, fn() { report("nobroad"); } },
  ...at("nobroad", 25), { keys: [], n: 15, snap: true, fn() { report("nobroad"); } },
  ...at("nobroad", 82), { keys: [], n: 20, snap: true, fn() { report("nobroad"); } },
  ...at("gathroad", 17), { keys: [], n: 15, snap: true, fn() { report("gathroad"); } },
  ...at("gathroad", 40), { keys: [], n: 30, snap: true, fn() { report("gathroad"); } },
  ...at("gathroad", 50), { keys: [], n: 15, snap: true, fn() { report("gathroad"); } },
  ...at("gathroad", 99), { keys: [], n: 25, snap: true, fn() { report("gathroad"); } },
  // a stone at the viper: one hit
  { n: 2, fn() { const v = region.beasts.find(b => b.kind === "viper" && b.room === "gathroad"); const hit = wildHit(v, { x: v.x, y: v.y - 5 }); log("stone at the viper: hit " + hit + " dead " + v.dead); const o = region.beasts.find(b => b.kind === "ostrich"); wildHit(o, { x: o.x, y: o.y - 40 }); o.cool = 0; wildHit(o, { x: o.x, y: o.y - 40 }); log("ostrich after two: " + o.state); const ib = region.beasts.find(b => b.kind === "ibex"); log("stone at the ibex: " + wildHit(ib, { x: ib.x, y: ib.y - 30 }) + " ibex dead " + ib.dead); } },
  ...at("giantyard", 70, () => { learnSkill("heavySword"); }), { keys: [], n: 25, snap: true, fn() { report("giantyard"); const f = region.beasts.find(b => b.kind === "flies"); wildHit(f, { x: f.x, y: f.y }); } },
  { keys: [], n: 8, snap: true, fn() { report("giantyard"); } },
]);
