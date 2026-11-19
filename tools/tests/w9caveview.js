// look at #9-1's cave (the robe-cut test view)
startSetup = () => {}; if (typeof setup !== "undefined") setup.active = false;
testRun([{ keys: [], n: 20 }, { n: 1, fn() { const door = doors.find(o => o.room && o.room.c0 === w9.cave.c0); cave.room = door.room; david.x = (w9.cave.c0 + 30) * T; david.y = GR * T; setState("idle");
  w9.cave.step = "saul"; w9.saul = { on: true, x: (w9.cave.c0 + 9) * T, y: GR * T, alpha: 1, t: 0, facing: -1, mode: "sit" }; snapCamera(); } }, { keys: [], n: 20, snap: true }]);
