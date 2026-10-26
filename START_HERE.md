# David, Part Two: start here

This folder is the home of **Part Two** of Glen's David game. It's a separate project with its own Claude Code session.
Written 2026-10-26 by the Part One session so the two don't get mixed up.

**If you are a Claude Code session opened in this folder, read all of this before doing anything.**

---

## 1. The two projects, kept apart

| | Part One (finished, being play-tested) | Part Two (this folder) |
|---|---|---|
| Folder | `C:\Users\big_g\Desktop\david-sling` | `C:\Users\big_g\Desktop\david-sling-2` |
| Repo | github.com/Glen-collab/david-sling (public) | none yet: ask Glen before making one |
| Art drop | `C:\Users\big_g\Desktop\david-sling-art` | `C:\Users\big_g\Desktop\david-sling-2-art` (make it when the first art comes) |
| Story | 1 Samuel 16-17: shepherd boy to Goliath | 1 Samuel 18 to 2 Samuel 6: hero, hunted, king |
| Psalm | Psalm 23 (Glen's song "The Shepherd Leads Me") | Psalm 57 |

**Rules for this session:**
- **Never edit, commit or push anything in `Desktop\david-sling`.** Another session is fixing Part One with Glen right now. You may *read* it (to copy code or learn how something works), never change it.
- Never run `git pull`, `git stash`, `git checkout` or similar there either.
- Don't touch `Desktop\david-sling-art`. Part Two art goes in its own folder.
- Shared settings: if Part Two ever runs in the same browser, give its saves their own localStorage keys (e.g. a `david2` prefix) so they never overwrite Part One's `davidProgress`, `davidSlot` and so on.
- Part One's test port is 8765 (`Play David.bat`). Use a different port for Part Two (e.g. 8766).

## 2. Who Glen is and how he works

- Glen (they/them) builds it; Claude codes it. Glen makes the art and the music (Grok videos, GPT images, Photoshop, Suno) and records voices.
- **US spelling** in every word of game text (armor, practice, plowed, neighbor).
- **Kid-clean.** Parents and kids play it together.
- **Scripture is the World English Bible (WEB),** public domain. Check every verse on ebible.org before it goes in. The game says **"the LORD"** where the WEB says "Yahweh".
- **It's a computer / TV game,** played with a keyboard or a controller (NES style: D-pad, A, B, Start, Select). Not a phone game. Don't trade quality for download size.
- **Never ship UI you haven't looked at.** Take a screenshot and look at it before telling Glen something works.
- Previews for Glen go on his Desktop in `game previews`. Never give him AppData paths.
- Commit and push after each change (once there's a repo). Commit messages end with the attribution lines Claude Code gives.
- After headless tests: delete test copies, close test tabs, stop servers. Headless Chrome needs `--mute-audio` (Glen hears it otherwise).
- Glen judges things by seeing and hearing them, not by descriptions. Show him images, GIFs, or send him an MP3.
- Glen locks all words. Lines in this doc are drafts.

## 3. Where Part Two stands

**Nothing is built.** There's a design sketch (below, from Part One's `DESIGN2.md`, 2026-10-25). Glen said "in case we go that route": it's an idea he finds interesting, not a commitment. Part One comes first.

Good first steps when Glen is ready:
1. Talk the story through with Glen and lock the eight worlds (section 4).
2. Decide the engine plan (section 6) and whether to make a repo.
3. Build a small vertical slice: one stage plus one boss moment (the En-Gedi spare is the heart of the game, so it's a good one to prove).
4. Write `DESIGN.md` and `HANDOFF.md` here and keep them current, like Part One does.

## 4. The design sketch

### The idea

Part One ends with David beating Goliath: anointed, but still a shepherd boy. Part Two is the stretch between the anointing and the crown, 1 Samuel 18-31 and 2 Samuel 1-6.

The theme flips Part One. There, David trusts God and fights the giant. Here, he trusts God by *not* fighting Saul, even when he could win. The two biggest moments in the game are times he spares his enemy.

It bookends Part One: Samuel anoints him in secret at the start of Part One (1 Samuel 16), and the whole nation crowns him at the end of Part Two (2 Samuel 5:3-4).

### Eight worlds, in Bible order

**World 1: The Palace** (1 Samuel 18; 19:9-10)
- Story: Jonathan gives David his robe, sword and bow (18:1-4). The women sing, "Saul has slain his thousands, and David his ten thousands" (18:7, WEB). Saul grows jealous and throws his spear at David while he plays the harp (18:10-11).
- Where: Gibeah, Saul's house and the town around it.
- Play: a harp rhythm piece while dodging Saul's spear (a callback to Goliath's spears in Part One's 8-2). Stages around the town as David leads Saul's soldiers (18:13-16).
- Boss moment: the spear in the harp room. You don't fight back; you get out.

**World 2: The Window** (1 Samuel 19:11-17; 20)
- Story: Michal lets David down through a window and puts a decoy in his bed. Jonathan's arrow signal in the field: arrows past the boy mean "go."
- Where: Gibeah at night, then the fields and the stone Ezel.
- Play: a stealth escape over the rooftops. Then read where Jonathan's arrows land to know which way to run.
- Boss moment: the goodbye with Jonathan (20:41-42). An emotional scene, not a fight.

**World 3: Nob and Gath** (1 Samuel 21)
- Story: at Nob the priest gives him the holy bread and Goliath's own sword (21:1-9). At Gath, Goliath's hometown, he acts mad to get away (21:10-15).
- Where: the priests' town, then a Philistine city.
- Play: collecting on the run. In Gath you get past the guards by acting silly (scribbling on the gate, 21:13), not by fighting.
- Kid-clean: keep the drool out; the scribbling is enough.
- Callback: Goliath's sword in its cloth, behind the ephod.

**World 4: The Cave of Adullam** (1 Samuel 22:1-2; 23:1-13)
- Story: everyone in trouble, in debt or unhappy gathers to him, about 400 (22:2). His family comes too. He saves the town of Keilah from Philistine raiders.
- Where: caves, then a walled town and its threshing floors.
- Play: caves (Part One's engine does these well). Recruiting replaces the lost sheep: the mighty men and the people in trouble join one by one and stand with him.
- Boss moment: defending Keilah's threshing floors.

**World 5: En-Gedi** (1 Samuel 24)
- Story: Saul walks into the very cave David is hiding in. David's men urge him to strike; he cuts off the corner of Saul's robe instead, and even that troubles his heart. "Yahweh forbid that I should do this thing to my lord, Yahweh's anointed" (24:6, WEB; the game says "the LORD").
- Where: cliffs, wild goats, springs and waterfalls.
- Play: the ibex rocks again, with the springs.
- Boss moment: the reversed boss. You sneak up on Saul in the dark, and the attack button only cuts the robe. Sparing him is the win. Then David calls out from the cave mouth and holds up the corner (24:8-15).

**World 6: Carmel** (1 Samuel 25)
- Story: Nabal, the rich sheep owner, insults David's men. David rides out angry. Abigail meets him with gifts and wise words, and he turns back (25:32-33).
- Where: the pastures of Carmel at shearing time.
- Play: shepherd stages again: guarding Nabal's flocks (25:15-16), then Abigail's gift run (bread, raisins, fig cakes) on donkeys.
- Boss moment: an anger meter on David's band that her gifts and words bring down before they reach Nabal's house.
- Kid-clean: Nabal's death (25:37-38) is left out or said very simply.

**World 7: Ziph and Ziklag** (1 Samuel 26; 30)
- Story: at night David and Abishai walk into Saul's sleeping camp and take his spear and water jar instead of harming him (26:7-12). Later, raiders burn Ziklag and take all the families. "David strengthened himself in Yahweh his God" (30:6, WEB; "the LORD" in the game). They chase the raiders and bring everyone back (30:18-19).
- Where: the wilderness of Ziph, a sleeping camp, the desert south.
- Play: a tense night stealth stage through the sleeping camp (no one must wake). Then a chase to bring the families home.
- Kid-clean: the raid is told by the smoke and the empty town. Nobody is hurt on screen.

**World 8: The Crown** (2 Samuel 1-6)
- Story: David's song of grief for Saul and Jonathan (2 Samuel 1:17-27). He is anointed king at Hebron, then over all Israel: "David was thirty years old when he began to reign" (5:4, WEB). He takes Jerusalem through the water shaft (5:6-8). He dances as the ark comes into the city (6:12-15).
- Where: Hebron, then Jerusalem.
- Play: a climb up the water shaft as the final challenge, then the ark procession through the streets with the crowd from all eight worlds.
- Ending: the coronation, the ark coming in, David dancing, the Journal with the whole song, the credits.
- Kid-clean: Saul's death (1 Samuel 31) happens off-screen, told only through David's song of grief. Michal's scorn (6:16, 20-23) is left out. Bathsheba (2 Samuel 11) is past the ending.

### The Journal: Psalm 57

The heading says David wrote it "when he fled from Saul, in the cave." It's 11 verses, a good size for eight worlds. As with Psalm 23 in Part One, Glen could write his own paraphrase, make it a song, and David writes one line a world; the instrumental plays through Worlds 1-7 and the full song only at the end.

Psalm 57 (WEB, checked on ebible.org 2026-10-25):

> For the Chief Musician. To the tune of "Do Not Destroy." A poem by David, when he fled from Saul, in the cave.
>
> 1 Be merciful to me, God, be merciful to me, for my soul takes refuge in you. Yes, in the shadow of your wings, I will take refuge, until disaster has passed.
> 2 I cry out to God Most High, to God who accomplishes my requests for me.
> 3 He will send from heaven, and save me, he rebukes the one who is pursuing me. Selah. God will send out his loving kindness and his truth.
> 4 My soul is among lions. I lie among those who are set on fire, even the sons of men, whose teeth are spears and arrows, and their tongue a sharp sword.
> 5 Be exalted, God, above the heavens! Let your glory be above all the earth!
> 6 They have prepared a net for my steps. My soul is bowed down. They dig a pit before me. They fall into the middle of it themselves. Selah.
> 7 My heart is steadfast, God. My heart is steadfast. I will sing, yes, I will sing praises.
> 8 Wake up, my glory! Wake up, lute and harp! I will wake up the dawn.
> 9 I will give thanks to you, Lord, among the peoples. I will sing praises to you among the nations.
> 10 For your great loving kindness reaches to the heavens, and your truth to the skies.
> 11 Be exalted, God, above the heavens. Let your glory be over all the earth.

A line a world (a first try):

| World | Verses | Why it fits |
|---|---|---|
| 1 The Palace | 4 | teeth that are spears: Saul's spear in the harp room |
| 2 The Window | 1 | the first night on the run, hiding until disaster passes |
| 3 Nob and Gath | 2-3 | crying out for help, alone in an enemy city |
| 4 Adullam | 1 (the shadow of your wings) | the cave and the people taking refuge with him |
| 5 En-Gedi | 6 | Saul hunting him walks into the trap himself, and David spares him |
| 6 Carmel | 7 | a steadfast heart, turned back from anger |
| 7 Ziph and Ziklag | 3 (loving kindness and truth), 7 | strengthened in God when everything is lost |
| 8 The Crown | 8-11 | waking the harp and the dawn: the coronation and the dance |

The left page (Wisdom) would hold lessons from Jonathan's friendship, Abigail's wise words and the mighty men.

Other psalms considered:
- **Psalm 18:** its heading covers all of Part Two (the day God rescued him from all his enemies and from Saul). But it's 50 verses, and Part One already uses 18:1-2 and 18:34.
- **Psalm 34:** written after Gath, very kid-friendly ("taste and see"). But Part One already uses 34:18.
- **Psalm 142:** also "when he was in the cave," but shorter and darker.

### Ideas carried from Part One
- The throw code idea, one piece per world: here it could be the words of the spare ("I will not stretch out my hand…") instead of a throw, used at En-Gedi and the sleeping camp.
- The crowd: everyone recruited stands with David at the coronation.
- Jonathan as the natural second player for 2-player co-op (an old Part One idea that was parked for Part Two).
- Part One's Post-Goliath list said Nathan and the ewe lamb and Psalm 51 belong to later games; they're past this ending too.

### New art it would need
- An older David: late teens through 30 (2 Samuel 5:4), maybe a grown version for World 8.
- Jonathan, Michal, Abigail, Abishai, Nabal, the priest Ahimelech, an older and more troubled Saul.
- Places: Saul's house at Gibeah, Nob, Gath's gate, Adullam, En-Gedi's springs, Carmel's pastures, Ziklag, Hebron, Jerusalem and its water shaft.

## 5. What Part One is, so you can borrow from it

Part One is about 22,500 lines of plain JavaScript in `Desktop\david-sling\game` (no build step, no framework), drawn on one canvas. Start by reading its `HANDOFF.md`, then `game/README.md`.

| File in Part One | What's in it |
|---|---|
| `main.js` | engine, David, input, camera, sounds, stage layouts, the HUD, the TUNE block |
| `world1.js` ... `world8.js` | each world's creatures, scenes and bosses |
| `caves.js` | caves like Mario's pipes |
| `journal.js` | the Journal (wisdom page + song page) |
| `map.js`, `home.js` | the journey map, world maps, the homestead |
| `menu.js` | title, three saved games, settings, controller setup |
| `tools/` | Python: Grok video to sprite sheet (`vid2sprite.py`), backgrounds, terrain, voices (`voice.py`, `crowd.py`) |

How things work there:
- Stages are hand-written in code (`block`, `rock`, `talk`, `campfire`, `critter`...). Tiles are 36 px; the screen is 1280 wide.
- Sprites come from Glen's Grok green-screen videos, cut by `tools/vid2sprite.py` into sheets.
- Sound: browsers block sound until a key press or click (a controller button doesn't count). `Play David.bat` opens Chrome with `--autoplay-policy=no-user-gesture-required` so sound is on from the start. Part One also has a "Press A to begin" screen for normal tabs.
- Testing is headless Chrome with a test script appended to a throwaway copy of the game, stepping `frame()` by hand and saving a screenshot.

## 6. Engine plan (to decide with Glen)

Recommended: when Part Two starts being built, **copy** Part One's engine files into this folder as a starting point, then change the copy. Don't share files between the two folders, and don't import from Part One's folder. Part One keeps changing while Glen plays it; a copy keeps Part Two steady, and nothing in Part Two can break Part One.

## 7. Lessons Part One learned the hard way

- All `game/*.js` files share one global scope. A top-level `let`/`const` name used in two files kills the game at load ("Loading sprites N / N" forever). Grep for a name before adding it, and boot the title screen headless with an error listener after changes.
- Grok clips in zips or batch downloads are often corrupt. Ask Glen to download one video at a time. Check clips with `ffmpeg -f null`.
- Run ffmpeg jobs one at a time; five in parallel fails.
- Glen's transparent PNGs sometimes have a purple fringe: composite on magenta before cutting.
- Headless Chrome on Glen's PC reads his real controller: stub `window.readPad = () => null` in tests.
- Any stage trigger written as "David is past x" must ignore cave rooms if they live past the stage's end.
- Never leave stubbed audio or test code in a browser tab Glen might use.
- Two talks with the same speaker a few tiles apart should be one stop. Glen noticed every place a person was drawn twice or jumped spots.
- A press that turns sound on in a "Press A to begin" screen must not also skip the scene. Glen hit this on 2026-10-26.
