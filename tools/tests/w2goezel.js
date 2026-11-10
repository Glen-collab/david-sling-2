// (Glen 11-09) After the farewell, Samuel (and the Ramah folk) point David back to the stone Ezel, the way out.
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const said = () => dialog.t > 0 ? JSON.stringify(dialog.text || dialog.lines || dialog.line || dialog.say || "?").slice(0, 120) : "none";
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
testRun([
  { n: 3, fn() { for (const r of REGION.rooms) regionAdd("explored", r.id); for (const k of ["r2_window","r2_samuel","r2_naioth","r2_ezel","r2_arrows","r2_gateshut"]) regionAdd("taken", k);
      moveParty(r2.samNX + 40, GR * T); snapCamera(); } },
  { keys: [], n: 30 }, { keys: [], n: 1, fn() { log("room " + region.room + " toast " + JSON.stringify(region.toast || (typeof toastMsg !== "undefined" ? toastMsg : "")).slice(0, 100)); } },
  ...Array.from({ length: 4 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 15 }, { keys: [], n: 1, snap: true, fn() { log("Samuel: " + said()); } },
]);
