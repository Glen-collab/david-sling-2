// (11-21) the spear out of David's pack at 26:22, standing in the ground on the far mountain
startSetup = () => {}; setup.active = false; helpT = 0;
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const steps = [{ n: 1, fn() { at("mountain", 52, GR * T - 400 - 2); } }, { keys: [], n: 30 },
  { n: 1, fn() { region.script.length = 0; dialog.t = 0; h7.call = true; h7.spearDown = true; h7.spearX = david.x + david.facing * 60; h7.spearY = david.y; } },
  { keys: [], n: 10, snap: true }];
testRun(steps);
