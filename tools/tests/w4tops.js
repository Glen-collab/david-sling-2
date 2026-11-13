// World 4: the tunnels at the tops of the climbing rooms (on their ledges), and going into one (the turn, then the cut)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const S = [];
for (const id of ["roost_side", "ledges_top", "well_top"]) S.push({ n: 1, fn() { const o = r4.tunnels.find(t => t.id === id), r = roomById(o.room); r.dark = 0; moveParty(o.x, o.y); region.camFootY = o.y; snapCamera(); } }, { keys: [], n: 25 }, { keys: [], n: 1, snap: true });
S.push({ n: 1, fn() { const o = r4.tunnels.find(t => t.id === "mouth_in"); moveParty(o.x, o.y); snapCamera(); } }, { keys: [], n: 15 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true },
  { keys: [], n: 60, fn() { log("after the turn: room " + region.room.id); } });
testRun(S);
