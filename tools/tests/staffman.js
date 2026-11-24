// (11-24) Glen's walking-stick man in place of the open-mouthed one, everywhere ("swap him everywhere"): Keilah's town
// and its escape street (one of the grabbers); Ramah's townsfolk
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const steps = [];
if (REGION.key === "keilah") {
  steps.push({ n: 1, fn() { region.save.taken = region.save.taken.filter(t => t !== "k4_ephod"); const r = roomById("town"); moveParty((r.c0 + 88) * T, GR * T); snapCamera(); region.script.length = 0; } }, { keys: [], n: 10 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; } }, { keys: [], n: 3, snap: true },
    { n: 1, fn() { const r = roomById("escape"); moveParty((r.c0 + 90) * T, GR * T); snapCamera(); } }, { keys: [], n: 10 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; const r = roomById("escape"); moveParty((r.c0 + 93) * T, GR * T); snapCamera(); } }, { keys: [], n: 3, snap: true });
} else {
  steps.push({ n: 1, fn() { const r = roomById("ramah"); moveParty((r.c0 + 54) * T, GR * T); snapCamera(); } }, { keys: [], n: 10 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; const r = roomById("ramah"); moveParty((r.c0 + 54) * T, GR * T); snapCamera(); } }, { keys: [], n: 3, snap: true });
}
testRun(steps);
