# David, Part Two: design

The living design doc for Part Two (1 Samuel 18 to 2 Samuel 6: hero, hunted, king). Glen locks all words; game text below is draft.
Verses marked *(check)* must be checked on ebible.org (WEB) before they go in the game.

## The game in one line
A Castlevania-style adventure: each world is one big connected place full of caves, secrets and Truths to find, and the hero wins the biggest fights by **not** striking Saul.

## Decided with Glen (2026-10-26)
- **Macro first, then micro:** each world is planned as a whole first, then its stages one by one.
- **Castlevania-style worlds:** one connected map per world. Skills learned later open sealed spots in earlier worlds.
- **David already knows Part One's moves** (double jump, roll). Part Two teaches new skills (table below).
- **Weapons:** David keeps the sling all game, and adds a sword (World 1) and a shield (World 4). The bow belongs to Jonathan.
- **No blood.** Beaten enemies burst into dust and vanish.
- **David never strikes Saul's men.** Philistines, raiders, Jebusites and wild animals can be fought. Saul's soldiers are snuck past, hidden from, or pushed back with the shield. (In the Bible David fights Saul's men nowhere while Saul lives.)
- **Player 2:** Jonathan in his worlds; the armor-bearer and the mighty men the rest of the time (see below).
- **The secret ending stays** (Mephibosheth, below).
- **Own repo:** github.com/Glen-collab/david-sling-2 (public). Art lives in `Desktop\david-sling-2-art`.

## Big systems
**Truths.** Every hidden spot holds a Truth: a short Bible moment, scroll or verse piece that fills in the Journal. All Truths in a world open something extra; all Truths in the game open the secret ending.

**The Steps of Faith** (like the three trials in *The Last Crusade*). One per world, harder as the game goes. Falling never kills: you drop into a lower cave and climb back, often finding a secret down there.
- *Bow down* ("My soul is bowed down", Psalm 57:6): kneel at the right moment and the swinging log or rolling stone passes over.
- *The word:* a floor of letter stones; step only on the letters that spell a word from the Journal.
- *The leap:* a chasm with no bridge; stones rise under your feet as you step out. Toss dust to mark the path for next time.
- Possible verses for the trial doors: Psalm 119:105, Psalm 18:36 *(check)*.

**The lamp and the olives.** Caves are dark; David's clay lamp lights a circle that shrinks as the oil burns. Gather olives; olive presses turn them into oil and are also the save points. No oil means seeing less, never dying. Caves connect to caves like a maze, with shortcuts opened from the far side.

**Ask the LORD (the ephod, from World 4).** A button that shows the hidden path or answers a question (1 Samuel 23:9-12). It's the game's hint system.

## Skills
| World | New skill | From the story | Opens |
|---|---|---|---|
| 1 | Sword attack | Jonathan's sword (18:4) | fighting Philistines up close |
| 2 | Rope climb | Michal's window | ropes, wells, shafts |
| 2 | Crouch-walk, hide in shadows | the night escape | stealth stages |
| 3 | Heavy sword: breaks cracked walls | Goliath's sword at Nob (21:9) | cracked walls everywhere |
| 4 | Lamp | Adullam | dark caves |
| 4 | Shield: block and push | the mighty men | arrows, spears, Saul's men |
| 4 | Ask the LORD | the ephod (23:6, 9-12) | hidden paths |
| 5 | Wall climb | the ibex of En-Gedi | high places |
| 5 | Swim and dive | En-Gedi's springs | caves behind waterfalls |
| 7 | Silent step | the sleeping camp | walking past sleepers |

## Player 2
One second player at a time. Who it is depends on where you are:
- **Worlds 1-2: Jonathan** (bow and sword). He returns briefly at Horesh in World 7 (23:16-18), their last meeting.
- **Always available: the armor-bearer,** a young boy. Carries the lamp, picks up olives and stones, and fits through tiny tunnels David can't (two-player secrets). Good for a little kid playing with a parent.
- **From World 4: the mighty men.** Once recruited, Player 2 can switch to any of them at an olive press. Each plays differently. Recruited men who aren't being played stand at the camp and in the crowd at the end.

| Character | Plays like | From | Playable? |
|---|---|---|---|
| Jonathan | bow, sword | 1 Samuel 18-20; 23:16-18 | yes |
| Armor-bearer | small, quick, carries the lamp, fits tiny tunnels | (game character) | yes |
| Abishai | spear; joins for the sleeping camp | 1 Samuel 26 | yes |
| Asahel | fastest runner, long jumps | 2 Samuel 2:18 ("as light of foot as a wild gazelle"; Abishai's brother) | yes |
| Benaiah | strongest: pushes boulders, breaks things | 2 Samuel 23:20-21 | yes |
| Benjamin slingers | sling with either hand | 1 Chronicles 12:2 *(check)* | maybe later |
| Abigail | co-op on the gift run in World 6 | 1 Samuel 25 | that stretch only |

## The drills (Glen 2026-11-02)
Where the story is a rush, or something has to be done right, the moment is **played as a drill** (game/drill.js): a row of arrows (later A and B) pressed in order against a clock, the scene moving with each right press. With two players, Player 2 does the drill while David waits (or both race the clock); alone, Player 1 does. A miss repeats the round; nothing is lost. **Not the majority of the game:** about one or two per world, only at moments the Bible makes urgent. The rest is running, jumping and exploring.

Planned drill moments (draft, one or two per world):
- **World 1:** the harp room: the strings in rhythm to calm Saul (18:10), then the dodge when the spear comes (18:11).
- **World 2:** Michal lets David down by the rope, and the figure in the bed (19:11-13; built as test stage 9-4). The arrow field: Jonathan's signal (20:35-38).
- **World 3:** Gath: scribbling on the gate doors while Achish's servants watch (21:13).
- **World 4:** Keilah: the escape before the town hands David over (23:12-13).
- **World 5:** the robe corner cut in the dark, steady hands (24:4), if the creep-up wants more.
- **World 6:** Abigail loading the donkeys in a hurry (25:18).
- **World 7:** taking the spear and the water jar from beside the sleeping Saul (26:12). Ziklag: the pursuit (30:8-10).
- **World 8:** the water shaft climb into Jerusalem (2 Samuel 5:8); waiting for the sound in the mulberry trees (5:24).

## The pivotal-moment challenges (Glen 2026-11-02: "change it up")
Not only D-pad drills: each big story moment gets its own kind of thinking. All of these are the plan; we build and try
them world by world and keep what's fun. Kept short and few: the game is still mostly running and playing.
Already in the game to build on: Part One's harp rhythm game (harp_songs.js), the carved code walls, the Leap of Faith,
the D-pad drills (drill.js).

| World | Moment | Challenge | The strategy |
|---|---|---|---|
| 1 | The harp room (18:10-11) | Rhythm, then dodge: play to calm Saul; when his eyes change, stop and duck the spear | Watch Saul, not only the notes |
| 2 | Michal lets David down (19:11-13) | D-pad drills: the rope, the figure in the bed (built: 9-4) | Speed under pressure |
| 2 | Michal stalls Saul's men (19:14-17) | Bluff: the men search the room; send them anywhere but the bed before time runs out | Misdirection |
| 2 | Jonathan's arrow signal (20:20-22) | Secret code: "beyond you" = run, "on this side" = stay. Player 2 shoots, Player 1 reads where it lands and decides | Two players share a secret |
| 3 | Nob, the holy bread (21:4-6) | Temple trial: tiles of the twelve tribes, stepped in the order a Journal clue gives | Read the clue |
| 3 | Gath (21:13) | Watched or not: act silly when the guards look, sneak when they don't, scribble on the gates unseen | Read the room |
| 4 | Adullam's dark cave | Light beams: turn bronze shields to bounce the lamp's light onto a carved wall; a hidden room opens | Angles |
| 4 | Keilah (23:12-13) | Escape chase: the gate closing, the town coming apart behind; run, roll, slide | Reflexes |
| 5 | En-Gedi's springs | Water channels: block and open them to lower the pool and find the cave behind the falls | Think ahead |
| 5 | The robe corner (24:4) | Steady hands (a drill), only if the creep-up needs more | Calm |
| 6 | Abigail's gifts (25:18) | Balance: load the donkeys evenly or one tips on the trail; then a quick loading drill | Weights, counting |
| 7 | The sleeping camp (26:7-12) | The heist: noisy ground and sleepers who stir; take the spear and the jar and get out; Player 2 (Abishai) has to be held back from striking | A sneak-in-and-out mission |
| 7 | Ziklag, the Egyptian servant (30:11-16) | Tracking: footprints and clues across the desert; the wrong trail loops back | Detective work |
| 8 | Jerusalem's water shaft (2 Samuel 5:8) | Rising water: climb before it reaches you | A climb against the clock |
| 8 | The mulberry trees (2 Samuel 5:23-24) | Wait for the sign: attacking early fails; watch and listen for the treetops, then go | Patience: wait on the LORD |

### The challenge system: a few engines, many skins (Glen 2026-11-02, after a second opinion)
**Not a series of minigames.** Every challenge above is built from one of four engines that live inside the
normal level: David never leaves the stage for a separate game screen. The Bible picks the moment; a classic game
picks how the player solves it.

| Engine | What the player does | Built? | Used for |
|---|---|---|---|
| **Sequence** | Press the shown arrows/A/B in order against a clock. Variants: *rhythm* (in time with music), *memory* (watch, then repeat; one more each round), *decoys* (some signals mean nothing) | yes: drill.js; Part One's harp_songs.js | Harp, the rope and the bed, Jonathan's arrow code (memory + decoys), Keilah escape prompts, loading the donkeys |
| **Sneak** | Read sightlines, hide, move when no one looks; patrols shift their timing on each retry so a route can't just be memorized | yes: engedi.js patrols and rocks | En-Gedi, Gath watched-or-not, the sleeping camp, Michal's bluff |
| **Hidden path** | Find or remember the safe stones; a wrong step costs time, not a life | yes: leap.js | The Leap of Faith, Nob's tribe tiles (flash the route, then walk it), a crumbling crossing at Keilah |
| **Symbols** | Turn or order carved stones to match a clue found elsewhere in the level; A locks a stone, B undoes | new (one small engine) | Part One's code walls, Adullam's hidden room, and **a Paleo-Hebrew inscription**: decode a word such as "water", and the answer is a place in the level (the cave behind En-Gedi's falls) *(check the Hebrew with someone who reads it)* |

The bigger set pieces (light beams, water channels, rising water, the balance trail, the mulberry wait) are
platforming in the level itself, not overlays.

**Rules for every challenge:**
- Show it, don't explain it: the first round teaches itself.
- The same buttons always mean the same things.
- A timer only where the Bible makes it urgent.
- Failing costs time or a retry, never a restart.
- An optional gold time for players who want more.

**Taken from the second opinion:** the memory and decoy variants for Jonathan's signal; shifting patrols; the
Paleo-Hebrew inscription; the flash-then-walk tiles; gold times; and a bonus **Wilderness Gauntlet** made from the
Training Ground (test stage 9-3): a timed run with a code, a tile path and a sling target, rated bronze, silver or gold.

**Left out (they would stop the game):** Sudoku grids, board games, packing puzzles, trading sums, counting quizzes,
knucklebones. Also no "choose to attack Saul" option: in the cave and the camp the attack button can only cut the
robe or take the spear (24:6, 26:11), as already planned.


1. **The Palace (Gibeah), 1 Samuel 18.** Jonathan's covenant and gifts; the women's song; Saul's jealousy. Fighting stages leading Saul's army against Philistine raids; cellars and cisterns under the palace. Get the sword and robe. First Step of Faith (bow down). *Boss:* the harp room: a rhythm game calming Saul, then dodge the spear twice (18:11). Psalm 57:4.
2. **The Window, 1 Samuel 19-20.** Michal lets David down by rope; the figure in the bed. Night rooftop stealth (Saul's men: no sword). Hidden area: Naioth in Ramah, where Samuel waits and Saul's men end up prophesying (19:20-24). Get rope climb and crouch-walk. *Boss moment:* the arrow field (Player 2 Jonathan shoots, Player 1 reads), then the goodbye (20:41-42). Psalm 57:1.
3. **Nob and Gath, 1 Samuel 21.** Holy bread (five full heals) and Goliath's sword (breaks cracked walls). Gath: act silly when watched, sneak when not; scribbling on the gates. Hidden: Goliath's family house, everything giant-sized. *Boss:* King Achish's court. Psalm 57:2-3.
4. **The Cave of Adullam, 1 Samuel 22-23.** The biggest cave maze, the center of the game. The 400 gather; parents taken to Moab (side trip); Abiathar brings the ephod. Recruit the mighty men (in place of Part One's lost sheep). Get the lamp, shield and Ask the LORD. Hidden: water from Bethlehem's well (2 Samuel 23:13-17). *Boss:* defend Keilah's threshing floors from Philistines, then escape before the town hands David over (23:12). Psalm 57:1.
5. **En-Gedi, 1 Samuel 24. The heart of the game.** Cliffs, ibex, springs, caves behind waterfalls; Saul's 3,000 men searching (stealth). Get wall climb and swim. Hidden: the cave of Psalm 57's heading. *Boss:* the reversed boss: lamp out, creep up on Saul in the dark; the attack button only cuts the robe corner; sparing him is the win. Then the call from the cave mouth; Saul weeps (24:16). Psalm 57:6.
6. **Carmel, 1 Samuel 25.** Shepherd stages guarding Nabal's flocks (Part One's sheep). Then play Abigail on the gift run down the mountain. *Boss:* the anger meter, brought down by her gifts and words. Nabal's death told simply or left out. Psalm 57:7.
7. **Ziph and Ziklag, 1 Samuel 23:16-18; 26; 30.** Jonathan's last visit at Horesh. The sleeping camp with Abishai: take the spear and water jar (second reversed boss), then David calls across the valley to Abner. Ziklag burned (told by smoke and an empty town); David strengthens himself in the LORD, asks with the ephod, feeds the Egyptian servant who leads the way. *Boss:* the raider camp; every family brought home; share with those who stayed behind (30:24). Psalm 57:3, 7.
8. **The Crown, 2 Samuel 1-6.** The song of grief for Saul and Jonathan (their deaths off-screen). Crowned at Hebron, then over all Israel at 30. *Final climb:* the water shaft into Jerusalem, using every skill. *Final boss:* the Valley of Rephaim (5:17-25): ask the LORD, wait for the sound of marching in the mulberry treetops, then attack. *Ending:* the ark comes into the city, David dances, everyone recruited is in the crowd, the full Psalm 57 song.

## The secret ending (kept)
Shown only when every Truth is found. David and Jonathan promised kindness to each other's families forever (1 Samuel 20:14-17, 42). Years later King David asks if anyone of Saul's house is left, "that I may show him kindness for Jonathan's sake" *(check)*. He finds Jonathan's son Mephibosheth, who was hurt as a little boy and can't walk, and who is afraid. David gives him back his grandfather's land, and he eats at the king's table always, "like one of the king's sons" (2 Samuel 9) *(check)*. The promise kept; grace at the King's table; a door to Part Three.

## Psalm 57: the Journal
One line per world (see START_HERE.md for the WEB text and the first try at the line-per-world table).

## Art
**Older David: done (2026-10-26).** 25 moves cut from Glen's Grok clips into `david-sling-2-art\sprites` (previews in `Desktop\game previews\Part Two`): idle, walk, run, jump, forward flip, backflip, landing, roll, sword draw / ready / walk / slash, shield raise / block, sling spin / throw, crouch-walk, kneel, kneel hold, dive, swim, rope climb, wall climb side / back, hit.
Glen's Photoshop passes are all in (sling spin and throw, run-sling, hit with the arrow removed).

**Done since:** Saul and his soldiers, Abishai, the armor-bearer (2026-10-29 to 11-01).
**Still to make:** Jonathan, Asahel, Benaiah (playable); Michal, Abigail, Nabal, Ahimelech, Achish, Samuel (reuse Part One's), Philistine soldiers, Saul's soldiers, raiders; places for every world.

## Open
- Engine: copy Part One's engine into this folder and change the copy (recommended in START_HERE.md).
- First playable test: David at En-Gedi.
- Lock each world's stages (the micro pass).
