// (Glen 11-12) the land map: Y twice on Nob starts World 3 over (its save, the sword, the bread); Gath closes again
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const K = slotKey("david2Region") + "_nobgath";
testRun([
  { n: 3, fn() {
      regionAdd("taken", "r3_sword"); regionAdd("taken", "r3_bread"); learnSkill("heavySword"); breadSet(4);
      localStorage.setItem(slotKey("david2Region") + "_gibeah", JSON.stringify({ taken: ["g_exit_open"], explored: ["fields"] }));
      localStorage.setItem(slotKey("david2Region") + "_ramah", JSON.stringify({ taken: ["g_exit_open"], explored: ["x"] }));

      LandMap.open(); LandMap.reveal = null; LandMap.sel = LandMap.places.findIndex(p => p.id === "nob");
      log("before: places " + LandMap.places.map(p => p.id).join(",") + " sword " + hasSkill("heavySword") + " bread " + breadCount());
  } },
  { keys: [], n: 3 }, { keys: ["KeyG"], n: 2 }, { keys: [], n: 40, snap: true, fn() { log("msg: " + LandMap.msg); } },
  { keys: ["KeyG"], n: 2 }, { keys: [], n: 3, snap: true, fn() {
      const s = localStorage.getItem(K);
      log("after: save " + s + " sword " + skills.has("heavySword") + " bread " + breadCount() + " places " + LandMap.places.map(p => p.id).join(",") + " msg: " + LandMap.msg);
      LandMap.open(); LandMap.reveal = null; log("reopened: " + LandMap.places.map(p => p.id).join(","));
  } },
]);
