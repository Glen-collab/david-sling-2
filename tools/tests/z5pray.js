// (Glen 11-16) surrounded on the mountain, David kneels and prays Psalm 54:1-3, then the siege
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 1, fn() { ["z5_ziph_told", "z5_ziphites", "z5_warned", "z5_erem", "z5_jonathan", "z5_jonathan_gone", "z5_maon"].forEach(k => regionAdd("taken", k)); region.save.taken = region.save.taken.filter(t => !/z5_(rescued|surrounded)/.test(t)); log("rescued " + z5Has("z5_rescued") + " at " + z5.siegeAt); at("mountain", 28); } }, { keys: [], n: 40 },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 120, snap: true, fn() { log("pose " + JSON.stringify(z5.pose) + " siege t " + (z5.siege && z5.siege.t.toFixed(2))); } },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, snap: true },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, snap: true, fn() { log("after: pose " + z5.pose + " script " + region.script.length + " siege t " + (z5.siege && z5.siege.t.toFixed(2))); } },
]);
