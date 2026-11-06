// The pause menu's "Start Gibeah over": it asks first, then empties Gibeah's save (startStage is stubbed: no reload)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
region.save.taken.push("g_song"); region.save.jAt = 9; regionWrite();
let reloaded = false; startStage = () => { reloaded = true; };
const pick = label => { const it = Menu.items(), i = it.findIndex(m => m.label.startsWith(label)); log("pick " + label + " at " + i); it[i].act(); };
testRun([
  { keys: [], n: 20, fn() { Menu.open("pause", true); log("items: " + Menu.items().map(m => m.label).join(" | ")); } },
  { keys: [], n: 5, snap: true },
  { keys: [], n: 5, fn() { pick("Start Gibeah over"); log("screen " + Menu.screen); try { Menu.draw(); log("draw ok"); } catch (e) { log("draw err " + e.message); } } },
  { keys: [], n: 5, snap: true },
  { keys: [], n: 5, fn() { pick("Yes, start over"); log("save left: " + localStorage.getItem(regionSaveKey()) + " reloaded " + reloaded); } },
]);
