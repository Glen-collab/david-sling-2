// (11-23) Glen: "these two ledges David falls between walking" (the ridge's two long red rocks); and Ziph's ibex bounds off
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
let ib;
const st = () => `${ib.state} dx ${Math.round(ib.x - david.x)} a ${(ib.alpha ?? 1).toFixed(2)} dead ${!!ib.dead}`;
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^h7_/.test(k) || k === "h7_start" || k === "h7_camp"); region.script.length = 0; } }, { n: 1, fn() { const r = roomById("hill"); moveParty((r.c0 + 5) * T, GR * T); snapCamera(); kitImg("w4_ledge_red_l"); } }, { keys: [], n: 30, fn: skip }, { keys: [], n: 2, snap: true }, { n: 1, fn() { const r = roomById("hill"); moveParty((r.c0 + 50) * T, -146); snapCamera(); for (const b of region.beasts) if (b.room === "hill") b.dead = true; } },
  { keys: [], n: 120, fn: skip }, { keys: ["ArrowRight"], n: 24, fn: skip }, { keys: [], n: 20, fn: skip }, { n: 1, fn() { log(`cam ${Math.round(camX)},${Math.round(camY)} props ` + region.props.filter(p => p.room === "hill" && /ledge_red_l/.test(p.n)).map(p => `${p.n}@${Math.round(p.x)},${Math.round(p.y)} img ${!!kitImg(p.n)}`).join(" ") + " room " + region.room.id); log(`ridge walk: y ${Math.round(david.y)} col ${(david.x / T - roomById("hill").c0).toFixed(1)}`); } }, { keys: [], n: 2, snap: true }];
steps.push({ n: 1, fn() { const r = roomById("wild"); moveParty((r.c0 + 93) * T, GR * T); snapCamera(); ib = region.beasts.find(b => b.kind === "ibex" && b.room === "wild"); ib.x = ib.hx; ib.state = "idle"; ib.cool = 0; log("ibex " + st()); } });
for (let i = 0; i < 10; i++) steps.push({ keys: [], n: 12, fn: skip }, { n: 1, fn() { log(st()); } }, ...(i === 3 ? [{ keys: [], n: 1, snap: true }] : []));
testRun(steps);
