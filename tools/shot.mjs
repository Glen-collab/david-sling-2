// Headless test screenshot through the Chrome DevTools protocol (real time, so slow loads can't hang it).
// usage: node tools/shot.mjs "<query#hash>" <case.js> <out.png> [more out pngs: the case calls snap() for each]
// The case script runs in simgame/ (a throwaway copy of game/) after the game loads; see simgame/test.js.
// The server must be running: python -m http.server 8766 (from the repo root).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [, , query, caseFile, ...outs] = process.argv;
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
for (const f of fs.readdirSync(path.join(root, "game"))) if (f.endsWith(".js")) fs.copyFileSync(path.join(root, "game", f), path.join(root, "simgame", f));
const html = fs.readFileSync(path.join(root, "game", "index.html"), "utf8")
  .replace("</body>", `<script src="test.js?v=${Date.now()}"></script><script src="case.js?v=${Date.now()}"></script></body>`);
fs.writeFileSync(path.join(root, "simgame", "index.html"), html);
fs.copyFileSync(caseFile, path.join(root, "simgame", "case.js"));

const port = 9300 + Math.floor(Math.random() * 500);
const prof = path.join(process.env.TEMP, "david2-headless");
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", "--disable-gpu", "--mute-audio", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`,
   "--window-size=1280,720", "--autoplay-policy=no-user-gesture-required", "about:blank"], { stdio: "ignore" });
const kill = () => { try { chrome.kill(); } catch (e) {} };
let lastErr = [];   // the page's errors so far: a case script that dies on load (say, a name the game already uses) never reaches TEST_DONE
setTimeout(() => { console.log("TIMEOUT" + (lastErr.length ? "\n" + lastErr.join("\n") : "")); kill(); process.exit(2); }, Number(process.env.SHOT_TIMEOUT || 120000));

let tab;
for (let i = 0; i < 60 && !tab; i++) {
  await new Promise(r => setTimeout(r, 250));
  try { tab = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === "page"); } catch (e) {}
}
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const wait = {};
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && wait[m.id]) { wait[m.id](m); delete wait[m.id]; } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; wait[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const evalJS = async expr => (await send("Runtime.evaluate", { expression: expr, returnByValue: true })).result?.result?.value;

await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `http://localhost:8766/simgame/index.html${query}` });
let shots = 0;
for (;;) {
  await new Promise(r => setTimeout(r, 300));
  const st = await evalJS("JSON.stringify({snap: window.SNAP_WANT||0, done: !!window.TEST_DONE, err: window.TEST_ERRORS||[]})");
  if (!st) continue;
  const s = JSON.parse(st); lastErr = s.err;
  while (shots < s.snap && shots < outs.length) {
    // the case paused at snap(); take the picture, then let it go on
    const img = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(outs[shots], Buffer.from(img.result.data, "base64"));
    console.log("shot ->", outs[shots]); shots++;
    await evalJS("window.SNAP_GO && window.SNAP_GO()");
  }
  if (s.done) { if (s.err.length) console.log("ERRORS:\n" + s.err.join("\n")); else console.log("no errors"); break; }
}
ws.close(); kill(); process.exit(0);
