if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const hide = n => r3.hides.find(h => h.n === n);
testRun([{ n: 3, fn() { const h = hide("w3_hide_sacks"); moveParty(h.x - 3 * T, GR * T); snapCamera(); const g = r3.guards[0]; g.x = h.x; g.facing = -1; g.state = "turn"; g.t = 0; } },
  { keys: [], n: 2, snap: true }]);
