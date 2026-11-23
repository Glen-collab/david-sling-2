// (11-23) Glen: "for the ibex, when it bounds away have it disappear". Ziph's ibex charges past David, then fades
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
let ib;
const st = () => `${ib.state} x ${Math.round(ib.x - david.x)} a ${(ib.alpha ?? 1).toFixed(2)} dead ${!!ib.dead}`;
const steps = [{ n: 1, fn() { const r = roomById("wild"); moveParty((r.c0 + 77) * T, GR * T - 140); snapCamera(); david.inv = 0; ib = region.beasts.find(b => b.kind === "ibex" && b.room === "wild"); log("start " + st()); } }];
for (let i = 0; i < 8; i++) steps.push({ keys: [], n: 15, fn: skip }, { n: 1, fn() { log(st()); } }, ...(i === 2 || i === 4 ? [{ keys: [], n: 2, snap: true }] : []));
testRun(steps);
