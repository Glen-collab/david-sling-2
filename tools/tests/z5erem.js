startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !k.startsWith("z5_")); regionAdd("taken", "z5_jonathan"); regionAdd("taken", "z5_jonathan_gone"); } },
  { n: 1, fn() { at("horesh", 74); } }, { keys: [], n: 40 }, { n: 1, fn() { at("horesh", 74); } }, { keys: [], n: 5 },
  { n: 1, fn() { const E = z5.erem; log("erem " + JSON.stringify({ x: E.x, room: E.room, spr: E.spr, show: E.show(), cam: camX, dx: david.x, img: SPR.egyptian_sit.img.naturalWidth, rid: region.room.id })); } },
  { keys: [], n: 1, snap: true },
]);
