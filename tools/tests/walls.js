// (Glen 11-06) the Walls rebuilt: staggered walkways, ladders between them, the plank walk on top, pillars only where clear
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const c0 = roomById("walls").c0, LD = ladders.filter(l => l.room === "walls");
const at = (col, y) => ({ n: 3, fn() { dialog.t = 0; region.climb = null; setState("idle"); moveParty((c0 + col) * T, y); snapCamera(); } });
const L = LD[3];
log(`${LD.length} ladders, ${region.beasts.filter(b => b.room === "walls" && b.kind === "phil").length} Philistines, ${region.beasts.filter(b => b.room === "walls" && BIRD[b.kind]).length} birds, pillars at ` +
  region.props.filter(p => p.room === "walls" && /buttress|pier/.test(p.n)).map(p => Math.round(p.x / T - c0)).join(","));
testRun([
  at(12, GR * T), { keys: [], n: 60, snap: true },
  at(60, -480), { keys: [], n: 60, snap: true },
  at(90, -1530), { keys: [], n: 60, snap: true },
  { n: 3, fn() { dialog.t = 0; setState("idle"); moveParty(L.x, L.botY); snapCamera(); log("ladder: bottom " + L.botY + " top " + L.topY + ", David y " + Math.round(david.y)); } },
  { keys: [], n: 20 }, { keys: ["ArrowUp"], n: 90, fn() { log("after climbing: y " + Math.round(david.y) + " state " + david.state + " onGround " + david.onGround); } },
  { keys: [], n: 20, snap: true },
  { keys: ["ArrowDown"], n: 4 }, { keys: ["ArrowDown"], n: 90, fn() { log("after climbing down: y " + Math.round(david.y) + " state " + david.state); } },
]);
