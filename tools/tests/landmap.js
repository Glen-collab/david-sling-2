// (Glen 11-06) Part Two's land map: Gibeah lit; finishing Gibeah reveals Ramah (the road drawn out once); A goes in
const log = m => TEST_ERRORS.push("INFO " + m);
const key = slotKey("david2Region") + "_gibeah";
const saved = localStorage.getItem(key);
localStorage.removeItem(slotKey("david2Land"));
localStorage.setItem(key, JSON.stringify({ taken: [] }));
try { sessionStorage.setItem("david2TitleSeen", "1"); } catch (e) {}
Menu.active = false; Menu.boot();
log("before: land map " + LandMap.active + ", places " + LandMap.places.map(p => p.name).join(","));
let went = null; startStage = id => { went = id; };
testRun([
  { keys: [], n: 60, snap: true },
  { keys: [], n: 3, fn() { localStorage.setItem(key, JSON.stringify({ taken: ["g_exit_open"] })); LandMap.open(); log("Gibeah done: places " + LandMap.places.map(p => p.name).join(",") + ", reveal " + (LandMap.reveal && LandMap.reveal.to.name)); } },
  { keys: [], n: 80, snap: true },
  { keys: [], n: 120, snap: true, fn() { log("after: selected " + LandMap.places[LandMap.sel].name); } },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10, fn() { log("A on Ramah: " + LandMap.msg); } },
  { keys: ["ArrowLeft"], n: 2 }, { keys: [], n: 5 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 5, fn() { log("A on Gibeah: stage " + went); if (saved) localStorage.setItem(key, saved); } },
]);
