// (Glen 11-06) Part Two's world view: his painted map of the land (Benjamin and Judah), the regions on it.
// Like Castlevania: only the places David has reached show; finishing a region reveals the next stop (a dotted road
// drawn out to it the first time). Gibeah is where he starts. A: go there; Start: the menu.
// LAND_PLACES: each region's spot on the 1280x720 map (draft, for Glen to move), its world, and the stage that plays it
// (null: not built yet). after: the region whose gate opens it. Placing is a draft: Glen picks which painted town is which.
const LAND_IMG = "../assets/maps/land_map.jpg";
const LAND_PLACES = [   // (11-06 draft: placed so the road never crosses itself, in story order)
  { id: "gibeah", name: "Gibeah", world: "World 1", x: 738, y: 300, stage: "9-5", after: null },
  { id: "ramah", name: "Ramah", world: "World 2", x: 719, y: 384, stage: "9-6", after: "gibeah" },   // 1 Samuel 19:18: David fled to Samuel at Ramah
  // (11-11) World 3 is one stage (nobgath.js, saved as "nobgath"): Nob's done with the bread and the sword, then Gath
  //  shows; choosing Gath starts on the road down to it
  { id: "nob", name: "Nob", world: "World 3", x: 684, y: 125, stage: "9-7", key: "nobgath", done: "r3_sword", room: "nobroad", after: "ramah" },
  { id: "gath", name: "Gath", world: "World 3", x: 219, y: 356, stage: "9-7", key: "nobgath", room: "gathroad", after: "nob" },
  { id: "adullam", name: "Adullam", world: "World 4", x: 525, y: 281, stage: null, after: "gath" },
  { id: "keilah", name: "Keilah", world: "World 4", x: 512, y: 350, stage: null, after: "adullam" },
  { id: "ziph", name: "Ziph", world: "World 5", x: 610, y: 565, stage: null, after: "keilah" },
  { id: "engedi", name: "En-Gedi", world: "World 5", x: 1012, y: 269, stage: null, after: "ziph" },
  { id: "carmel", name: "Carmel", world: "World 6", x: 762, y: 450, stage: null, after: "engedi" },
  { id: "ziklag", name: "Ziklag", world: "World 7", x: 656, y: 512, stage: null, after: "carmel" },
  { id: "hebron", name: "Hebron", world: "World 8", x: 887, y: 168, stage: null, after: "ziklag" },
  { id: "jerusalem", name: "Jerusalem", world: "World 8", x: 688, y: 34, stage: null, after: "hebron" },
];
// (testing: "?landall" shows every place and road, numbered in story order, to see the whole land at once)
const LAND_ALL = new URLSearchParams(location.search).has("landall");
const LAND_TUNE = { RING: 26, REVEAL: 2.2, GOLD: "#ffd76a", INK: "#3b2a18" };
// a region's done once its gate's been opened (its own save, region.js's key for it)
function landDone(id) {   // (a place in a stage shared with another: its own save key and the thing that finishes it)
  const p = LAND_PLACES.find(q => q.id === id) || { id }, key = p.key || p.id, flag = p.done || "g_exit_open";
  try { const s = JSON.parse(localStorage.getItem(slotKey("david2Region") + "_" + key) || "{}"); return (s.taken || []).includes(flag); } catch (e) { return false; }
}
function landSeen() { try { return JSON.parse(localStorage.getItem(slotKey("david2Land")) || "[]"); } catch (e) { return []; } }
function landSeenAdd(id) { const s = landSeen(); if (!s.includes(id)) { s.push(id); try { localStorage.setItem(slotKey("david2Land"), JSON.stringify(s)); } catch (e) {} } }

const LandMap = {
  active: false, t: 0, sel: 0, img: null, reveal: null, msg: null, msgT: 0,
  open() {
    if (!this.img) { this.img = new Image(); this.img.src = LAND_IMG + "?v=" + (window.BUILD || 0); }
    this.active = true; this.t = 0; this.msg = null;
    this.places = LAND_PLACES.filter(p => LAND_ALL || !p.after || landDone(p.after));
    // newly opened: draw the road out to it, once
    const fresh = LAND_ALL ? null : this.places.find(p => p.after && !landSeen().includes(p.id));
    this.reveal = fresh ? { to: fresh, from: LAND_PLACES.find(q => q.id === fresh.after), t: 0 } : null;
    for (const p of this.places) if (p !== fresh) landSeenAdd(p.id);
    // David stands at the last place he finished, or Gibeah
    const here = [...this.places].reverse().find(p => p.stage && !landDone(p.id)) || this.places[0];
    this.sel = this.places.indexOf(fresh || here);
    this.here = here;
    if (fresh && typeof chime === "function") setTimeout(() => { chime(4); setTimeout(() => chime(7), 180); }, LAND_TUNE.REVEAL * 1000 - 300);
  },
  update(dt) {
    this.t += dt; if (this.msgT > 0) this.msgT -= dt;
    if (this.reveal) { this.reveal.t += dt; if (this.reveal.t >= LAND_TUNE.REVEAL) { landSeenAdd(this.reveal.to.id); this.reveal.done = true; } }
    if (this.reveal && !this.reveal.done) return;   // (watch the road go out)
    const n = this.places.length;
    if (pressed("left") || pressed("up")) { this.sel = (this.sel + n - 1) % n; if (typeof chime === "function") chime(1); }
    if (pressed("right") || pressed("down")) { this.sel = (this.sel + 1) % n; if (typeof chime === "function") chime(1); }
    if (pressed("a")) {
      const p = this.places[this.sel];
      if (p.stage) {
        this.active = false;
        try { if (p.room) sessionStorage.setItem("david2StartRoom", p.room); else sessionStorage.removeItem("david2StartRoom"); } catch (e) {}   // (region.js regionStartCol)
        startStage(p.stage);
      }
      else { this.msg = `${p.name} is the next stop. It isn't built yet.`; this.msgT = 3; }
    }
  },
  draw() {
    const T_ = LAND_TUNE, now = this.t;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#1c140d"; ctx.fillRect(0, 0, W, H);
    if (this.img && this.img.complete && this.img.naturalWidth) ctx.drawImage(this.img, 0, 0, W, H);
    // a soft dusk over the land, so the places that are open stand out
    const vg = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 820); vg.addColorStop(0, "rgba(20,12,4,0.05)"); vg.addColorStop(1, "rgba(20,12,4,0.55)");
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    const hand = px => typeof caveatReady !== "undefined" && caveatReady ? `${px}px Caveat, Georgia, serif` : `italic ${Math.round(px * 0.75)}px Georgia, serif`;
    // the roads between the open places (dotted), the new one drawn out
    ctx.lineCap = "round";
    for (const p of this.places) {
      if (!p.after) continue;
      const a = LAND_PLACES.find(q => q.id === p.after), r = this.reveal && this.reveal.to === p ? Math.min(1, this.reveal.t / (T_.REVEAL * 0.8)) : 1;
      const bx = a.x + (p.x - a.x) * r, by = a.y + (p.y - a.y) * r;
      ctx.setLineDash([2, 12]); ctx.lineWidth = 7; ctx.strokeStyle = "rgba(40,24,10,0.7)"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(bx, by); ctx.stroke();
      ctx.lineWidth = 4; ctx.strokeStyle = T_.GOLD; ctx.stroke(); ctx.setLineDash([]);
    }
    // the places
    this.places.forEach((p, i) => {
      if (this.reveal && this.reveal.to === p && this.reveal.t < T_.REVEAL * 0.8) return;   // (not there till the road reaches it)
      const on = i === this.sel, built = !!p.stage, pulse = 1 + Math.sin(now * 3 + i) * 0.08;
      const appear = this.reveal && this.reveal.to === p ? Math.min(1, (this.reveal.t - T_.REVEAL * 0.8) / (T_.REVEAL * 0.2)) : 1;
      ctx.globalAlpha = appear;
      if (built || on) {   // the glow
        ctx.globalCompositeOperation = "lighter";
        const g = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, T_.RING * 2.6 * pulse); g.addColorStop(0, `rgba(255,210,110,${on ? 0.55 : 0.3})`); g.addColorStop(1, "rgba(255,190,80,0)");
        ctx.fillStyle = g; ctx.fillRect(p.x - 90, p.y - 90, 180, 180); ctx.globalCompositeOperation = "source-over";
      }
      ctx.lineWidth = on ? 5 : 3; ctx.strokeStyle = "rgba(40,24,10,0.8)"; ctx.beginPath(); ctx.arc(p.x, p.y, T_.RING * pulse, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = on ? 3 : 2; ctx.strokeStyle = built ? T_.GOLD : "rgba(255,240,215,0.8)"; ctx.stroke();
      // the name on a little banner
      ctx.font = hand(on ? 34 : 28); const tw = ctx.measureText(p.name).width, ly = p.y + T_.RING + 30;
      ctx.fillStyle = "rgba(233,220,192,0.92)"; ctx.beginPath(); ctx.roundRect(p.x - tw / 2 - 14, ly - 27, tw + 28, 38, 8); ctx.fill();
      ctx.strokeStyle = "rgba(59,42,24,0.6)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = T_.INK; ctx.textAlign = "center"; ctx.fillText(LAND_ALL ? `${i + 1}. ${p.name}` : p.name, p.x, ly);
      if (!built && !LAND_ALL) { ctx.font = "italic 13px Georgia, serif"; ctx.fillStyle = "rgba(255,240,215,0.9)"; ctx.fillText("the next stop", p.x, ly + 26); }
      ctx.globalAlpha = 1;
    });
    // David, where he is: his portrait in a gold ring above the place, bobbing
    const h = this.here, face = typeof CARD_FACE !== "undefined" ? CARD_FACE : null;
    if (h && face && face.complete && face.naturalWidth) {
      const fx = h.x, fy = h.y - T_.RING - 44 + Math.sin(now * 2.2) * 4, r = 30;
      ctx.save(); ctx.beginPath(); ctx.arc(fx, fy, r, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(face, fx - r, fy - r, r * 2, r * 2); ctx.restore();
      ctx.lineWidth = 4; ctx.strokeStyle = T_.GOLD; ctx.beginPath(); ctx.arc(fx, fy, r, 0, Math.PI * 2); ctx.stroke();
    }
    // the header: where he is, and the chosen place
    const p = this.places[this.sel];
    const HX = 220;   // (top left: clear of Jerusalem on the summit)
    ctx.fillStyle = "rgba(25,14,6,0.72)"; ctx.beginPath(); ctx.roundRect(HX - 200, 12, 400, 70, 14); ctx.fill();
    ctx.textAlign = "center"; ctx.fillStyle = T_.GOLD; ctx.font = "bold 30px Georgia, serif"; ctx.fillText(p.name, HX, 48);
    ctx.fillStyle = "#e9dcc4"; ctx.font = "italic 16px Georgia, serif"; ctx.fillText(!p.stage ? `${p.world}  ·  coming soon` : landDone(p.id) ? `${p.world}  ·  done: go back for what you missed` : p === this.here ? `${p.world}  ·  you are here` : p.world, HX, 72);
    if (this.msg && this.msgT > 0) {
      ctx.font = "17px sans-serif"; const mw = ctx.measureText(this.msg).width + 40;
      ctx.fillStyle = "rgba(25,14,6,0.8)"; ctx.beginPath(); ctx.roundRect(W / 2 - mw / 2, H - 92, mw, 34, 10); ctx.fill();
      ctx.fillStyle = "#ffd166"; ctx.fillText(this.msg, W / 2, H - 69);
    }
    ctx.fillStyle = "rgba(25,14,6,0.72)"; ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = "#e9dcc4"; ctx.font = "16px sans-serif";
    ctx.fillText(this.places.length > 1 ? "Left / Right: choose a place     A: go there     Start: menu" : "A: go there     Start: menu", W / 2, H - 14);
    ctx.restore();
  },
};
