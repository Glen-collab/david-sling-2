// (Glen 11-07) an old save (a bare column) that now lands in the Cracked Wall goes home; a new save keeps its room
startSetup = () => {}; setup.active = false;
{ const sv = Object.assign({}, region.save), wc = roomById("wcrack"), rm = roomById("ramah");
  region.save = Object.assign({}, sv, { at: wc.c0 + 25, atRoom: undefined });
  const a = regionStartCol();
  const press = fires.map(f => Math.round((f.x - 30) / T)).find(c => c >= rm.c0 && c < rm.c0 + rm.w);
  region.save.at = press; const b = regionStartCol();
  region.save = Object.assign({}, sv, { at: 5, atRoom: "ramah", atOff: press - rm.c0 }); const c = regionStartCol();
  const msg = ("SAVESPOT legacy-in-crack->" + (a === roomById(REGION.start).c0 + 3 ? "home OK" : "BAD " + a) + " legacy-at-press->" + (b === press ? "OK" : "BAD") + " room->" + (c === press ? "OK" : "BAD")); setTimeout(() => { throw new Error(msg); });
  region.save = sv; }
testRun([{ keys: [], n: 2, snap: true }]);
