// (Glen 11-07) his torches: in Saul's men's hands, by the gate both sides, in the tunnel under Secu, Naioth, the feast
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const skipT = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; for (const g of r2.guards) g.spot = 0; };
const goT = (id, x) => ({ n: 3, fn() { skipT(); moveParty(x(), GR * T); snapCamera(); } });
const waitT = n => Array.from({ length: n }, () => ({ keys: [], n: 10, fn: skipT }));
const gd = () => r2.guards.find(g => g.room === "rooftops" && g.y === GR * T) || r2.guards[0];
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(f => !["r2_arrows"].includes(f)); if (!region.save.taken.includes("r2_gateshut")) region.save.taken.push("r2_gateshut"); } },
  goT("rooftops", () => gd().x - 200), ...waitT(40), { keys: [], n: 2, fn() { const g = gd(); g.x = david.x + 260; g.facing = -1; g.state = "look"; g.t = 0; } }, { keys: [], n: 1, snap: true, fn() { const g = gd(); TEST_ERRORS.push("INFO guard " + g.state + " " + Math.round(g.x - david.x)); } },
  goT("rooftops", () => r2.gateInX - 300), ...waitT(20), { keys: [], n: 1, snap: true },
  goT("gibgate", () => r2.gateX + 300), ...waitT(20), { keys: [], n: 1, snap: true },
  goT("wtunnel", () => (roomById("wtunnel").c0 + 8) * T), ...waitT(30), { keys: [], n: 1, snap: true },
  goT("naioth", () => (roomById("naioth").c0 + 8) * T), ...waitT(30), { keys: [], n: 1, snap: true },
  goT("feast", () => (roomById("feast").c0 + 22) * T), ...waitT(30), { keys: [], n: 1, snap: true }]);
