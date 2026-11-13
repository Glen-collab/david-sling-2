// World 4: Glen's panoramas (make_w4_panos.py): each room at its start, middle and end
startSetup = () => {}; setup.active = false;
const at = (id, f, y = GR * T) => () => { const r = roomById(id); r.dark = 0; moveParty(r.c0 * T + Math.max(200, Math.min(r.w * T - 200, r.w * T * f)), y); region.camFootY = y; david.olives = 20; snapCamera(); };
const S = [];
for (const [id, y] of [["camp"], ["warren"], ["narrows"], ["river", 560], ["deep", 600], ["spring"]])
  for (const f of [0, 0.5, 1]) S.push({ n: 1, fn: at(id, f, y ?? GR * T) }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true });
testRun(S);
