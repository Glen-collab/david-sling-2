// (Glen 11-06) the harp room: Saul's dark music (low under David's harp, gone when he's calm, none under the Journal);
// once calm, the king leaves and the hidden wall can be struck without leaving the room
startSetup = () => {}; setup.active = false; region.save.jAt = 9; audioUnlocked = true;
const log = m => TEST_ERRORS.push("INFO " + m);
const C = id => roomById(id).c0, hr = region.harp;
const vol = a => a && !a.paused ? a.volume.toFixed(2) : "off";
const music = () => `saul ${vol(saulDarkSong)}  day ${vol(dayMusic)}  harp ${vol(harpMusic)}`;
region.save.taken = region.save.taken.filter(id => !["g_harp_done", "g_harp_wall"].includes(id));
testRun([
  { keys: [], n: 3, fn() { setState("idle"); moveParty((C("harp") + 12) * T, 16 * T); snapCamera(); } },
  { keys: [], n: 120, fn() { log("in the room: " + music()); } },
  { keys: [], n: 3, fn() { moveParty(hr.stoolX, 16 * T); } }, { keys: [], n: 20 }, { keys: ["ArrowUp"], n: 3 },
  { keys: [], n: 150, fn() { log("David playing (harp " + david.harp + "): " + music()); } },
  { keys: [], n: 3, fn() { hr.escapes = 2; hr.calm = 1; hr.spear = null; hr.phase = "play"; } },
  { keys: [], n: 10, fn() { log("calmed: done " + regionHas("taken", "g_harp_done")); dialog.t = 0; dialog.hold = false; } },
  { keys: [], n: 60, fn() { log("1s after: " + music() + "  empty " + hr.empty); dialog.t = 0; } },
  { keys: [], n: 30, snap: true },
  { keys: [], n: 200, fn() { log("after the wait: empty " + hr.empty + " goT " + (hr.goT || 0).toFixed(1)); } },
  ...[0, 1, 2, 3].map(() => ({ keys: [], n: 20, fn() { stoneHitsRegion({ x: hr.crackX + 100, y: 500 }); } })),
  { keys: [], n: 30, fn() { log("wall broken " + regionHas("taken", "g_harp_wall")); } },
  { keys: [], n: 30, snap: true },
]);
