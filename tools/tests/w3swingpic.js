if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; kitImg("w3_rope_4");
const X = k => (roomById("nobroad").c0 + k) * T;
testRun([{ n: 2, fn() { moveParty(X(97), GR * T - 200); snapCamera(); } }, { keys: [], n: 3, fn() { const q = r3.swings[0]; r3.swing = { q, hold: q.len - 20 }; q.w = 1.4; setState("swing"); } },
  { keys: ["ArrowRight"], n: 12, snap: true }, { keys: ["ArrowLeft"], n: 20, snap: true }]);
