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
| Asahel | fastest runner, long jumps | 2 Samuel 2:18 *(check)* | yes |
| Benaiah | strongest: pushes boulders, breaks things | 2 Samuel 23:20 *(check)* | yes |
| Benjamin slingers | sling with either hand | 1 Chronicles 12:2 *(check)* | maybe later |
| Abigail | co-op on the gift run in World 6 | 1 Samuel 25 | that stretch only |

## The eight worlds (macro)
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
Waiting on Glen's Photoshop: sling spin and throw (draw a proper sling), hit (remove the arrow).

**Still to make:** Jonathan, the armor-bearer, Abishai, Asahel, Benaiah (playable); Saul (older, troubled), Michal, Abigail, Nabal, Ahimelech, Achish, Samuel (reuse Part One's), Philistine soldiers, Saul's soldiers, raiders; places for every world.

## Open
- Engine: copy Part One's engine into this folder and change the copy (recommended in START_HERE.md).
- First playable test: David at En-Gedi.
- Lock each world's stages (the micro pass).
