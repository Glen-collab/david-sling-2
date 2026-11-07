// (Glen 11-07) the palace wall: ropes only (no ladder drawn with them), and its doors
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const go = (k, y) => ({ n: 3, fn() { dialog.t = 0; const r = roomById("palace"); moveParty((r.c0 + k) * T, y); david.y = y; region.camFootY = y; snapCamera(); } });
testRun([{ n: 1, fn() { if (location.search.includes("noladder")) ITEM.town_ladder = null; log("ladders " + JSON.stringify(region.ladders.filter(l => l.room === "palace").map(l => [Math.round(l.x / T), l.top, l.bot, !!l.rope])));
  log("doors " + JSON.stringify(region.doors.filter(o => o.room === "palace" || o.room === "rooftops").map(o => [o.id, o.room, o.kind, Math.round(o.x / T), o.kit || "", o.y || ""]))); } },
  go(20, -240), { keys: [], n: 20 }, { keys: [], n: 1, snap: true }, go(8, GR * T), { keys: [], n: 20 }, { keys: [], n: 1, snap: true }]);
