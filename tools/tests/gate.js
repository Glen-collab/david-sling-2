// (Glen 11-06) the gate out: key or no key, not before the story's done; Part Two's own pause menu
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const door = region.doors.find(o => o.kind === "exit");
region.save.taken = ["g_tower_key", "g_song"];
testRun([
  { n: 3, fn() { dialog.t = 0; setState("idle"); moveParty(door.x, GR * T); snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 10, fn() { log("key + song only: open " + regionHas("taken", "g_exit_open") + ", David says: " + (dialog.text || dialog.lines || JSON.stringify(dialog).slice(0, 160))); dialog.t = 0; dialog.hold = false; } },
  { keys: [], n: 20, fn() { region.save.taken.push("g_jonathan", "g_harp_done", "g_michal"); } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 10, fn() { log("whole story: open " + regionHas("taken", "g_exit_open") + ", Journal " + !!region.jscene); region.jscene = null; } },
  { keys: [], n: 5, fn() { Menu.open("pause", true); log("pause: " + Menu.items().map(m => m.label).join(" | ")); Menu.close(); } },
]);
