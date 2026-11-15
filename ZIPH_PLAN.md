# Ziph (World 5, part one): plan, started 2026-11-15

Comes right after Keilah on the land map (landmap.js: `ziph`, World 5, after `keilah`; the stage isn't built yet).
Keilah ends with 23:14: "David stayed in the wilderness in the strongholds, and remained in the hill country in the
wilderness of Ziph." Ziph ends with 23:29: "David went up from there and lived in the strongholds of En Gedi." So the
world leads straight into En-Gedi, the next stop on the map.

## The story (WEB, checked word for word on ebible.org/eng-web/1SA23.htm, 11-15; "the LORD" for Yahweh)
- 23:15 David saw that Saul had come out to seek his life. David was in the wilderness of Ziph in the woods.
- 23:16 Jonathan, Saul's son, arose and went to David into the woods, and strengthened his hand in God.
- 23:17 He said to him, "Don't be afraid, for the hand of Saul my father won't find you; and you will be king over
  Israel, and I will be next to you; and Saul my father knows that also."
- 23:18 They both made a covenant before the LORD. Then David stayed in the woods and Jonathan went to his house.
  *(the last time the two friends meet in the Bible)*
- 23:19 Then the Ziphites came up to Saul to Gibeah, saying, "Doesn't David hide himself with us in the strongholds in
  the woods, in the hill of Hachilah, which is on the south of the desert?
- 23:20 Now therefore, O king, come down. ... our part will be to deliver him up into the king's hand."
- 23:22-23 *(Saul)* "Please go make yet more sure, and know and see his place where his haunt is, and who has seen him
  there; for I have been told that he is very cunning. See therefore, and take knowledge of all the lurking places where
  he hides himself; and come again to me with certainty, and I will go with you."
- 23:24 They arose, and went to Ziph before Saul; but David and his men were in the wilderness of Maon, in the Arabah on
  the south of the desert.
- 23:25 Saul and his men went to seek him. When David was told, he went down to the rock, and stayed in the wilderness
  of Maon. When Saul heard that, he pursued David in the wilderness of Maon.
- 23:26 Saul went on this side of the mountain, and David and his men on that side of the mountain; and David hurried to
  get away for fear of Saul, for Saul and his men surrounded David and his men to take them.
- 23:27 But a messenger came to Saul, saying, "Hurry and come, for the Philistines have made a raid on the land!"
- 23:28 So Saul returned from pursuing David, and went against the Philistines. Therefore they called that place Sela
  Hammahlekoth. *(Hebrew for "the rock of escape", or "the rock of parting")*
- 23:29 David went up from there and lived in the strongholds of En Gedi.
- Psalm 54, "when the Ziphites came and said to Saul, 'Isn't David hiding himself among us?'": "Behold, God is my
  helper. The Lord is the one who sustains my soul." (54:4) "For he has delivered me out of all trouble." (54:7)

**The lesson:** a friend can strengthen your hand in God (Jonathan). People David never wronged sell him out, and his
own cleverness can't save him on the mountain. He's surrounded, and God turns Saul around with one messenger at the
last moment. You can't fight your way out of everything. Some days the LORD rescues you, and you only have to keep
going until He does.

## The world, in five parts (about 8 rooms, the same side-scrolling rooms as Adullam and Keilah)
1. **The Hill Country of Ziph** (2 rooms). Dry, rocky hills, caves and stone strongholds (23:14). "Saul sought him every
   day": Saul's soldiers search the hills by day. **Sneak** past them, using the sight-and-hiding code from engedi.js:
   hide behind rocks, move when no one looks. Get caught and you go back to the last rock, not the start. Wilderness
   animals: hyenas, vipers, scorpions, vultures.
2. **The Woods of Horesh** (1-2 rooms, 23:15-18). Trees at last, shade. **Jonathan comes.** It's a quiet scene, the
   heart of the world: he "strengthened his hand in God", the promise (23:17), the covenant (23:18), the embrace
   (dj_embrace), and Jonathan walks home. **His last gift: courage** (ITEMS_PLAN.md): more health and a stronger
   shield that turns arrows back at archers. *Maybe Erem's cameo, after Jonathan leaves (see the questions below).*
3. **The Hill of Hachilah** (2 rooms, 23:19-23). The Ziphites spy for Saul: "take knowledge of all the lurking
   places." **Ziphite lookouts** watch from the rocks. If one sees David, he runs for his signal fire. Catch him first
   (the sling or the sword knocks him down; he runs off, unhurt) or stay out of sight. Part One's lookouts and signal
   fires are already in the engine (main.js `lookout`, `signalfire`, Glen's lookout_* sprites). A lit fire brings
   soldiers into the room. Saul's words are shown as a scene: "I have been told that he is very cunning."
4. **The Wilderness of Maon** (1 room, 23:24-25). The Arabah: hot, flat, white rock, heat shimmer, little shade and no
   water. A runner warns David, and David goes "down to the rock." This room is a breather before the boss: an oasis
   with a Truth.
5. **The Mountain (the boss)** (1 wide room, 23:26-28). **Around the mountain.** Saul's army is on one side and David's
   men on the other, both hurrying around it, and Saul's men are closing in from both ends ("surrounded"). The player
   can't win by fighting. There are too many soldiers, and the hit-and-turn rule still holds. You survive: keep the
   mountain between you and them, double back through a gap in the rock, hide the men, hold out as the space shrinks.
   When it's tightest, **the messenger** rides in (messenger_gallop, messenger_stop, messenger_talk): "Hurry and come,
   for the Philistines have made a raid on the land!" Saul's army turns and goes. A stone marks **Sela Hammahlekoth**,
   the rock of escape. Then 23:29, up toward En-Gedi, the Journal page and the land map.

## Fits what's built
- Rooms, doors, ledges, enemies that turn and run, toasts, rPlay scenes and the Journal map work the same as in adullam.js
  and keilah.js. The new file is `game/ziph.js`, a new stage, region key `ziph`.
- Sneaking: engedi.js already has Saul's soldiers with sight lines, hiding rocks and being caught.
- Lookouts and signal fires: Part One's code in main.js, plus Glen's lookout_* and signal_fire sprites.
- Jonathan: the full set (walk, talk, idle, gifts, gives_david, dj_embrace).
- The messenger: the full set (gallop, stop, dismount, talk).
- The mountain: a new piece of code, a room where the safe space shrinks from both ends on a hidden clock that the
  messenger ends. Its timing is tuned like Keilah's gate clock.

## Already have (no new art needed)
- David: sneak, crouch, hide_crouch, peek, roll, kneel, run, sling, sword, shield.
- Jonathan: everything listed above.
- Saul: walk, talk, stand, look_back, plus saul_soldier_walk, look, alert and turn.
- Soldier1-5, the camp men from Adullam, lookouts and signal fires, the messenger.
- Hyenas, vipers, scorpions, vultures, ibex, gazelles, ravens, jackals.

## Art Glen will need
- **Backdrops (layered far, mid and near, as in ART_PROMPTS_KEILAH.md):** the hills of Ziph by day; the woods of
  Horesh; the hill of Hachilah (dusk, the signal fires); the wilderness of Maon (the Arabah, white heat); the mountain
  (one side of the mountain, with Saul's army's dust on the far slope).
- **Kit pieces (green screen):** a stronghold (a stone wall built across a cave mouth), a hiding rock or two, a
  terebinth tree, the rock of escape (a big split boulder, with a small stone pile in front).
- **Clips (green screen):** Ziphite men (wilderness herdsmen in plain robes) pointing and whispering to a soldier; maybe
  Saul turning his army back; David leading his men at a hurry. Only if Glen wants the cameo: Erem, the wounded stranger
  (lying hurt, sitting up, talking, standing).
- The prompts are in `ART_PROMPTS_ZIPH.md`.

## The Journal page (draft words, for Glen)
Four entries, each after a story moment, saying what David learned or had to bear:
1. "Jonathan came to me in the woods. He didn't bring an army. He brought God's promise, and it was enough." (1 Samuel 23:16–18)
2. "The people of Ziph went to Saul to hand me over. I never did them wrong." (1 Samuel 23:19–20)
3. "Saul on one side of the mountain, and we on the other. There was nowhere left to run." (1 Samuel 23:26)
4. "A messenger came, and Saul turned back. I didn't win that day. I was rescued." (1 Samuel 23:27–28)
- The closing line: "Behold, God is my helper. The Lord is the one who sustains my soul." (Psalm 54:4)
- The song: the first half of the Final Chorus ("Be exalted, O God, above the heavens..."), as proposed in SONG_PSALM57.md.

## The crawl (23:14-29 only; the spear-and-jar night is in World 7. Also in SERMONS_DRAFT.md)
> David hides in the wilderness of Ziph, in the dry hills and the strongholds. "Saul sought him every day, but God
> didn't deliver him into his hand." (1 Samuel 23:14)
>
> In the woods, his friend Jonathan finds him, and "strengthened his hand in God." "Don't be afraid," he says, "you
> will be king over Israel, and I will be next to you." (1 Samuel 23:16-17) It is the last time the two friends meet.
>
> Then the people of Ziph go to Saul and offer to hand David over. Saul comes hunting, and in the wilderness of Maon he
> surrounds David on a mountain. There is nowhere left to run. "Behold, God is my helper." (Psalm 54:4)

## Questions for Glen
1. **The boss:** "Around the Mountain", where you survive until the messenger comes and don't fight, OK? Or would you
   rather have a straight chase, like Keilah's run?
2. **Erem's cameo:** here, in the woods of Horesh after Jonathan leaves (your brief: "the injured stranger in the
   forest")? Or later in the game? The brief keeps it short: David finds him, they speak, he travels with David's men
   for a while, and the Journal mentions "the man with no name." If here, I'll write prompts for his clips.
3. **The spear-and-jar night** (1 Samuel 26, also in the wilderness of Ziph): DESIGN.md has it in World 7. That keeps
   the Bible's order, with En-Gedi (24) and Carmel (25) first. If so, Ziph's crawl becomes the one above and the
   spear night moves to World 7's crawl. That also settles the order question from the crawl notes.
4. **The Ziphites:** shown (lookouts who run to signal fires, men whispering to Saul) or only told in the crawl?

## Glen's answers (11-15)
1. **The boss:** survive until rescued. Around the Mountain, and the messenger ends it.
2. **Erem:** yes, in the woods of Horesh, after Jonathan leaves. Keep it short (Glen's brief, Desktop\EREM_THE_WANDERER.md):
   David finds the wounded man, they talk, and he travels with David's men for a while. Erem is fictional: never a
   person from the Bible, and there's no explanation yet. His prompts are in ART_PROMPTS_ZIPH.md.
3. **The spear-and-jar night:** World 7, in the Bible's order. The Ziph crawl is chapter 23 only (SERMONS_DRAFT.md updated).
4. **The Ziphites:** shown. Lookouts on the hill of Hachilah run to light signal fires.

## Erem's scene (draft words, from Glen's brief; after Jonathan goes home)
David finds a man lying hurt under a terebinth, a short way off the path. Up by him: David kneels and gives him water.
> **David:** "What is your name?"
> **Stranger:** "I don't know."
> **David:** "You don't know your own name?"
> **Stranger:** "I remember places. I remember faces. I remember things that happened long ago. But I cannot remember
> who I am."
> **David:** "Then perhaps the LORD will reveal it to you in time."
> **Stranger:** "Until then, I am at your service."

He joins the camp men. From then on he sits apart at the campfires in Ziph and later worlds, always looking at the
hills. The Journal says one line in the margin, not an entry: "We found a man in the woods who doesn't know his own
name. He walks with us now." Nothing more until the Solomon game.

## Built: the first pass (11-15, game/ziph.js, stage #9-10; "Play World 5, Ziph (test).bat")
All five rooms use Glen's own layers (david-sling-2-art/ziph, cut by tools/make_layers.py with --seam). The people and
kit come from the two games.
- **The Hills of Ziph:** four of Saul's men walk their beats (saul_soldier_*). Crouch behind the rocks (w4_rocks/rubble).
  If one sees David, it's back to the last olive press. They are never struck.
- **The Woods of Horesh:** Jonathan's scene (23:15-18, dj_embrace) gives the new skill **courage**: one more heart for
  good (main.js counts it). Then the stranger (Erem), using the sick Egyptian's clips as stand-ins (egyptian_sit,
  egyptian_drink) until Glen's own. Glen's brief lines are used word for word. Afterward he sits with the men at the
  fires in Horesh and Maon.
- **The Hill of Hachilah:** the Ziphite scene (23:19, 22). Five lookouts (lookout_*). One who sees David shouts "!", then
  runs to his fire. A sling or the sword stops him, and he runs off unhurt. If the fire is lit, it's back to the press.
- **The Wilderness of Maon:** 23:24-25 and a runner. A Truth (Psalm 54:4). Ostrich, wild donkey.
- **The Mountain:** 23:26, then the siege. Saul's lines close from both ends (Z5.SIEGE.END 55 s, the "Hold on" bar).
  Scouts come through the rocks with sight wedges: crouch behind a rock. Touching a line or being seen costs a heart. At
  the end the messenger rides to Saul (23:27), Saul turns back (23:28), and the rock of escape appears. Then 23:29, the
  Journal (the Final Chorus, first half; Psalm 54:4) and the land map.
Tests: tools/tests/z5tour.js, z5erem.js.
