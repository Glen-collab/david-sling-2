// World 4 (Glen 11-13: "We should do the test your might again"): the rubble into Beneath the Warren, Up, mash A and B
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const S = [{ n: 1, fn() { learnSkill("heavySword"); regionAdd("explored", "climb"); const r = roomById("under"); r.dark = 0; moveParty((r.c0 + 9) * T, GR * T); david.facing = -1; snapCamera(); } },
  { keys: ["ArrowLeft"], n: 4 }, { keys: [], n: 20 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 2, fn() { log("might " + !!r3.might); } }];
for (let i = 0; i < 150; i++) S.push({ keys: [i % 2 ? "KeyZ" : "KeyX"], n: 1 });
S.splice(S.length - 30, 0, { keys: [], n: 1, snap: true });
S.push({ keys: [], n: 30, fn() { log("after the swing: hits " + r4.wall.hits + " hp " + Math.round(r4.wall.hp) + " broken " + r4.wall.broken + " gold " + (r3.might && r3.might.gold)); } }, { keys: [], n: 1, snap: true },
  { keys: [], n: 40 }, { keys: ["ArrowLeft"], n: 60, fn() { log("then left: " + (roomAt(david.x) || {}).id); } });
testRun(S);
