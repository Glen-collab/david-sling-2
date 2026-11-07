// (Glen 11-07) Michal's window: dark (night), and no doorway drawn under it
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const goW = k => ({ n: 3, fn() { dialog.t = 0; const r = roomById("house"); moveParty((r.c0 + k) * T, GR * T); snapCamera(); } });
testRun([{ n: 1, fn() { if (!region.save.taken.includes("r2_window")) region.save.taken.push("r2_window"); r2.story.michal = "after"; } }, goW(37), { keys: [], n: 200 }, { keys: [], n: 1, snap: true }]);
