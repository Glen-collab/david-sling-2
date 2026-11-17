// (Glen 11-17) everyone says something: Up by them
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (room, k) => { const r = roomById(room); moveParty((r.c0 + k) * T - 45, FOOT); david.facing = 1; snapCamera(); };
const ask = (room, k, label, snap) => [{ n: 1, fn() { dialog.t = 0; dialog.hold = false; region.script.length = 0; at(room, k); } }, { keys: [], n: 15 }, { keys: ["ArrowUp"], n: 3 },
  { keys: [], n: 25, snap, fn() { log(label + ": " + (dialog.t > 0 ? dialog.who + " | " + dialog.say : "(nothing)")); } }];
testRun([{ n: 1, fn() { for (let i=0;i<8;i++) regionAdd("taken","r4_man_"+i); } }, ...[...ask("camp",30,"c30",true), ...ask("camp",57,"boy57"), ...ask("camp",92,"c92"), ...ask("camp",40,"new40",true), ...ask("camp",48,"new48")]]);
