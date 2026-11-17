// (Glen 11-17) the Hill of Hachilah made tall: the ground, the ledges up over the top of the screen and down, a lookout on each level
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const LV = [GR * T, 462, 312, 162, 12, -138];
const at = (k, lv) => [{ n: 1, fn() { ["z5_ziph_told", "z5_jonathan", "z5_erem"].forEach(t => regionAdd("taken", t)); const r = roomById("hachilah"); moveParty((r.c0 + k) * T, LV[lv]); david.facing = 1; snapCamera(); } },
  { keys: [], n: 20, snap: true, fn() { log(k + "/" + lv + ": y " + Math.round(david.y) + " ground " + david.onGround + " lookouts " + z5.lookouts.map(l => l.state[0]).join("")); } }];
testRun([...at(20, 0), ...at(45, 3), ...at(65, 5), ...at(79, 5), ...at(93, 3), ...at(122, 0), ...at(135, 2),
  { n: 1, fn() { const r = roomById("hachilah"); moveParty((r.c0 + 60) * T, GR * T - 20); } }, { keys: [], n: 15, fn() { log("in the gully: y " + Math.round(david.y) + " col " + Math.round(david.x / T - roomById("hachilah").c0) + " solid " + solid[GR][Math.floor(david.x / T)]); } }, { keys: [], n: 60, fn() { log("then: col " + Math.round(david.x / T - roomById("hachilah").c0) + " y " + Math.round(david.y)); } }]);
