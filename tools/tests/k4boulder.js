// (11-17) Glen: jumping over the boulder, David sometimes stops and kneels a moment (stuck in the rock's top)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
region.beasts.length = 0;
const steps = [];
let bad = 0;
for (let k = 63.5; k <= 69.5; k += 0.25) {
  let seen = "";
  steps.push({ n: 1, fn() { const r = roomById("road"); david.x = (r.c0 + k) * T; david.y = (GR - 7) * T; david.vy = 300; david.vx = 0; david.onGround = false; seen = ""; } });
  steps.push({ n: 1, fn() {} });
  for (let i = 0; i < 25; i++) steps.push({ n: 1, fn() { if (david.state === "crouch" || david.state === "crawl") seen = "CROUCH"; } });
  steps.push({ n: 1, fn() { if (seen) bad++; log(`k ${k} y ${david.y.toFixed(0)} ${david.state} ${seen}`); } });
}
steps.push({ n: 1, fn() { log("stuck landings: " + bad); } });
testRun(steps);
