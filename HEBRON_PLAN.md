# World 8, stop 1: Hebron (1 Samuel 31; 2 Samuel 1-3; 5:1-5; 1 Chronicles 12:23-40). Plan, 11-24

A new stage, `#9-14`, saved as `hebron`, in `game/hebron.js` on region.js's engine (like Hachilah and Ziklag).
Jerusalem will be the second stop on the same stage, as Ziklag is on Hachilah's. On the land map it comes after Ziklag.
(Part One already has a `world8.js` and a `W8`, so this one is `HEB`.)

## Glen's answers (11-24)
- **Opening:** the crawl, then a cut scene (as Aphek): Gilboa off-screen; the messenger at Ziklag with Saul's crown;
  David tears his clothes and sings the lament. Then "Shall I go up?" and play starts on the road.
- **Middle:** the tribes arrive at Hebron (1 Chronicles 12), Hebron as a living town. The long war stays in the crawl,
  except for what's below.
- **Asahel:** show it (2 Samuel 2:18-23). After Hebron, Asahel can't be chosen as Player 2.
- **The end:** a battle, then the anointing over all Israel.

David wasn't at Gibeon: Joab led his men there. So the chase is played **as Asahel**, "as light of foot as a wild
gazelle" (2:18), with his Player 2 moves (sprint, long jump, slide). Gibeon is the battle; the anointing comes after.

## The rooms
| # | Room | What happens | Bible |
|---|---|---|---|
| | The crawl | Saul and his sons fall on Mount Gilboa (told gently, no details); Jabesh Gilead buries them | 1 Sam 31:1, 6, 11-13 |
| 1 | Ziklag, by day (cut scene) | The messenger, clothes torn, earth on his head, with Saul's crown and bracelet. David tears his clothes; they weep and fast till evening. The lament, "How the mighty have fallen!" | 2 Sam 1:1-4, 10-12, 17-27 |
| 2 | Ziklag (play starts) | David asks the LORD: "Shall I go up?" "Go up." "Where?" "To Hebron." | 2:1 |
| 3 | The Road Up to Hebron | North into the hill country of Judah, with Abigail and Ahinoam and every man's household behind him (an escort: keep them safe) | 2:2-3 |
| 4 | Hebron | The men of Judah anoint David king over Judah. News of Jabesh Gilead: David sends them a blessing. Abner makes Ishbosheth king over Israel | 2:4-11 |
| 5 | The Pool of Gibeon (cut scene) | Abner's men and Joab's sit on either side of the pool; the twelve and twelve (told simply); the battle | 2:12-17 |
| 6 | The Chase (play as Asahel) | Sprint after Abner through the hills; Abner looks back and warns him twice; Asahel won't turn. Abner strikes him with the back of his spear; he falls; everyone who comes there stands still. Joab's trumpet ends it | 2:18-28 |
| | A time card | Asahel buried at Bethlehem. "There was a long war... David grew stronger and stronger" | 2:32; 3:1 |
| 7 | Hebron, years later (play) | The tribes arrive, tribe by tribe, "with a perfect heart to make David king". Welcome each at the gate (Up); unload the donkeys, camels, mules and oxen; carry the flour, fig cakes, raisins, wine and oil to the tables; three days of feasting "for there was joy in Israel" | 1 Chr 12:23-40 |
| 8 | The Gate of Hebron | The elders of all Israel; a covenant before the LORD; anointed king over Israel. "David was thirty years old when he began to reign" | 2 Sam 5:1-5 |

Then the Journal, and on to Jerusalem.

## The Journal (a page at a time, as Ziklag)
| Page | Written when | Beside it |
|---|---|---|
| Ziklag | after the lament | the lament itself: 2 Samuel 1:23, 26 |
| Hebron | anointed over Judah | Psalm 27:13-14 |
| Gibeon | after Asahel | Psalm 34:18 |
| The Tribes | the feast | Psalm 133 is used (Besor); Psalm 18:43 |
| The Gate | anointed over Israel | Psalm 23:5, and the whole song |
(Each checked against WEB when it goes in.)

## Open questions for Glen (answered 11-24, below)
1. **Abner's death.** After Asahel, Abner comes to Hebron to make peace (3:20-21), and Joab kills him at the gate for
   Asahel's blood (3:27); David weeps at his grave (3:31-39). In the time card, left out, or a cut scene?
2. **The battle before the anointing.** As planned, Gibeon is the battle, then years pass, then the tribes and the
   anointing. Or a second fight right before the anointing?
3. **The Jabesh Gilead message (2:5-7):** just told, or a small errand (find a messenger, send the blessing)?
4. **The lament:** read in the cut scene, or David playing his harp while the words come up (as the Journal writes)?

## Art (ART_PROMPTS_HEBRON.md)
Rooms: Ziklag by day (being rebuilt), the hill road to Hebron, Hebron town and gate, the pool of Gibeon, the hills of
the chase, Hebron's feast with the tribes' tents and banners. Clips: the messenger, David tearing his clothes, Joab,
Abner running and looking back, Asahel falling, elders, men unloading donkeys, the anointing.

## Stand-ins till then
Ziklag: Keilah's town by day. The road: Carmel's or Ziph's hills. Hebron: Gibeah's town or Keilah's. Gibeon: En-Gedi's
spring. The chase: Ziph's hills. The feast: Carmel's camp. People: abner_walk/talk, asahel_*, messenger_*,
samuel_anoint, villagers, donkeys, ox, camel.

## Glen's answers, 11-24 (second round), and the first build
- Abner: **David weeping at Abner's grave, a cut scene** (3:31-38). Abner's coming in peace and his death are told in
  one line each (3:20-21, 30), off-screen.
- **Gibeon is the fight.** No second battle before the anointing.
- **Jabesh Gilead is told** (2:4-6), in Hebron.
- **The lament is a cut scene:** David at his harp, the song's lines one at a time on a dark band (1:17, 19, 23-27;
  1:20-22 left out), the Journal's harp under it; A for the next line.

Built (game/hebron.js, stage #9-14, tools/tests/hbflow.js plays every beat):
- Ziklag (cut scene): the messenger runs in; 2 Samuel 1:1-4, 10 (the crown and bracelet, told; 1:6-10's account of
  Saul's death and 1:13-16 left out), 1:11-12 (David kneels and weeps), the lament, the Journal's first page, Abiathar
  with the ephod: 2:1. The road opens.
- The Road Up to Hebron: 2:2-3; four of the families walk behind David (Abigail, two women, a boy); scorpions, a viper,
  a wild donkey, two pits.
- Hebron: walking in, the cut scene: 2:3-4 (David kneels, the elder with the horn of oil), 2:4-6 (Jabesh Gilead),
  2:8-10 (Ishbosheth), the Journal, 2:12-13; on to Gibeon.
- The Pool of Gibeon (cut scene): 2:13-19. From here you are Asahel (his sheets, his speeds: walk 290, run 600, jump 1060).
- The Hill of Ammah: the chase. Six gaps and five rocks; Abner runs ahead (leaping the gaps), looks back at column 60
  (2:20) and 110 (2:21); at 158 he turns (2:22), the screen goes dark (2:23), 2:26-28, 2:32, 3:1, 3:20-21 and 30 told.
- Hebron, Abner's grave (cut scene): David kneels, weeping; 3:31-32, 38, 37; the Journal; 2:11; on to the Feast.
- The Feast: 2 Samuel 5:1; the twelve tribes come two by two (1 Chronicles 12:24-37), each leader with his banner and a
  laden donkey. Up by a leader welcomes them (their verse) and they unload one food (bread, flour, oil, fig cakes,
  raisins, wine); carry it to the table (left) and Up. A counter at the top. All twelve: 12:38-40, the Journal.
- The Gate: 5:1-3 (David kneels, the elder anoints him), 5:4-5, the Journal's last page (Psalm 23:5 and the song).
  Then David's card, and the road.
- The Journal: five pages, no page of its own (region.js `ownPage: false`); Left / Right turns through them.
- The song on the last page: Verse 4 (Hachilah's) until Glen's next verse.
- Stand-ins: Keilah's town (Ziklag), Keilah's road, Nob (Hebron), En-Gedi's spring (Gibeon), Ziph's mountain with a
  sunset tint (the chase), Carmel's camp (the feast), Gath's gate (the gate); Samuel's clip as the elder with the oil,
  soldier_talk as Joab, Saul's soldiers as Abner's men, a villager as the messenger.

Still to come: Player 2 (Asahel can't be chosen after Hebron); Glen's art (ART_PROMPTS_HEBRON.md); Jerusalem.

## The text (WEB Classic, ebible.org/eng-web, fetched 2026-11-24; "the LORD" for "Yahweh")

### 1SA31
[1] Now the Philistines fought against Israel; and the men of Israel fled from before the Philistines, and fell down slain on Mount Gilboa. 
[2] The Philistines overtook Saul and his sons; and the Philistines killed Jonathan, Abinadab, and Malchishua, the sons of Saul. 
[3] The battle went hard against Saul, and the archers overtook him; and he was greatly distressed by reason of the archers. 
[4] Then Saul said to his armor bearer, “Draw your sword, and thrust me through with it, lest these uncircumcised come and thrust me through and abuse me!” But his armor bearer would not, for he was terrified. Therefore Saul took his sword and fell on it. 
[5] When his armor bearer saw that Saul was dead, he likewise fell on his sword, and died with him. 
[6] So Saul died with his three sons, his armor bearer, and all his men that same day together. 
[7] When the men of Israel who were on the other side of the valley, and those who were beyond the Jordan, saw that the men of Israel fled and that Saul and his sons were dead, they abandoned the cities and fled; and the Philistines came and lived in them. 
[8] On the next day, when the Philistines came to strip the slain, they found Saul and his three sons fallen on Mount Gilboa. 
[9] They cut off his head, stripped off his armor, and sent into the land of the Philistines all around, to carry the news to the house of their idols and to the people. 
[10] They put his armor in the house of the Ashtaroth, and they fastened his body to the wall of Beth Shan. 
[11] When the inhabitants of Jabesh Gilead heard what the Philistines had done to Saul, 
[12] all the valiant men arose, went all night, and took the body of Saul and the bodies of his sons from the wall of Beth Shan; and they came to Jabesh and burned them there. 
[13] They took their bones and buried them under the tamarisk tree in Jabesh, and fasted seven days.

### 2SA01
[1] After the death of Saul, when David had returned from the slaughter of the Amalekites, and David had stayed two days in Ziklag, 
[2] on the third day, behold, a man came out of the camp from Saul, with his clothes torn and earth on his head. When he came to David, he fell to the earth and showed respect. 
[3] David said to him, “Where do you come from?” He said to him, “I have escaped out of the camp of Israel.” 
[4] David said to him, “How did it go? Please tell me.” He answered, “The people have fled from the battle, and many of the people also have fallen and are dead. Saul and Jonathan his son are dead also.” 
[5] David said to the young man who told him, “How do you know that Saul and Jonathan his son are dead?” 
[6] The young man who told him said, “As I happened by chance on Mount Gilboa, behold, Saul was leaning on his spear; and behold, the chariots and the horsemen followed close behind him. 
[7] When he looked behind him, he saw me and called to me. I answered, ‘Here I am.’ 
[8] He said to me, ‘Who are you?’ I answered him, ‘I am an Amalekite.’ 
[9] He said to me, ‘Please stand beside me, and kill me, for anguish has taken hold of me because my life lingers in me.’ 
[10] So I stood beside him and killed him, because I was sure that he could not live after he had fallen. I took the crown that was on his head and the bracelet that was on his arm, and have brought them here to my lord.” 
[11] Then David took hold of his clothes and tore them; and all the men who were with him did likewise. 
[12] They mourned, wept, and fasted until evening for Saul and for Jonathan his son, and for the people of the LORD, and for the house of Israel, because they had fallen by the sword. 
[13] David said to the young man who told him, “Where are you from?” He answered, “I am the son of a foreigner, an Amalekite.” 
[14] David said to him, “Why were you not afraid to stretch out your hand to destroy the LORD’s anointed?” 
[15] David called one of the young men and said, “Go near, and cut him down!” He struck him so that he died. 
[16] David said to him, “Your blood be on your head, for your mouth has testified against you, saying, ‘I have slain the LORD’s anointed.’ ” 
[17] David lamented with this lamentation over Saul and over Jonathan his son 
[18] (and he commanded them to teach the children of Judah the song of the bow; behold, it is written in the book of Jashar): 
[19] “Your glory, Israel, was slain on your high places! How the mighty have fallen! 
[20] Don’t tell it in Gath. Don’t publish it in the streets of Ashkelon, lest the daughters of the Philistines rejoice, lest the daughters of the uncircumcised triumph. 
[21] You mountains of Gilboa, let there be no dew or rain on you, and no fields of offerings; for there the shield of the mighty was defiled and cast away, the shield of Saul was not anointed with oil. 
[22] From the blood of the slain, from the fat of the mighty, Jonathan’s bow didn’t turn back. Saul’s sword didn’t return empty. 
[23] Saul and Jonathan were lovely and pleasant in their lives. In their death, they were not divided. They were swifter than eagles. They were stronger than lions. 
[24] You daughters of Israel, weep over Saul, who clothed you delicately in scarlet, who put ornaments of gold on your clothing. 
[25] How the mighty have fallen in the middle of the battle! Jonathan was slain on your high places. 
[26] I am distressed for you, my brother Jonathan. You have been very pleasant to me. Your love to me was wonderful, surpassing the love of women. 
[27] How the mighty have fallen, and the weapons of war have perished!”

### 2SA02
[1] After this, David inquired of the LORD, saying, “Shall I go up into any of the cities of Judah?” The LORD said to him, “Go up.” David said, “Where shall I go up?” He said, “To Hebron.” 
[2] So David went up there with his two wives, Ahinoam the Jezreelitess, and Abigail the wife of Nabal the Carmelite. 
[3] David brought up his men who were with him, every man with his household. They lived in the cities of Hebron. 
[4] The men of Judah came, and there they anointed David king over the house of Judah. They told David, “The men of Jabesh Gilead were those who buried Saul.” 
[5] David sent messengers to the men of Jabesh Gilead, and said to them, “Blessed are you by the LORD, that you have shown this kindness to your lord, even to Saul, and have buried him. 
[6] Now may the LORD show loving kindness and truth to you. I also will reward you for this kindness, because you have done this thing. 
[7] Now therefore let your hands be strong, and be valiant; for Saul your lord is dead, and also the house of Judah have anointed me king over them.” 
[8] Now Abner the son of Ner, captain of Saul’s army, had taken Ishbosheth the son of Saul and brought him over to Mahanaim. 
[9] He made him king over Gilead, over the Ashurites, over Jezreel, over Ephraim, over Benjamin, and over all Israel. 
[10] Ishbosheth, Saul’s son, was forty years old when he began to reign over Israel, and he reigned two years. But the house of Judah followed David. 
[11] The time that David was king in Hebron over the house of Judah was seven years and six months. 
[12] Abner the son of Ner, and the servants of Ishbosheth the son of Saul, went out from Mahanaim to Gibeon. 
[13] Joab the son of Zeruiah and David’s servants went out, and met them by the pool of Gibeon; and they sat down, the one on the one side of the pool and the other on the other side of the pool. 
[14] Abner said to Joab, “Please let the young men arise and compete before us!” Joab said, “Let them arise!” 
[15] Then they arose and went over by number: twelve for Benjamin and for Ishbosheth the son of Saul, and twelve of David’s servants. 
[16] They each caught his opponent by the head and thrust his sword in his fellow’s side; so they fell down together. Therefore that place in Gibeon was called Helkath Hazzurim. 
[17] The battle was very severe that day; and Abner was beaten, and the men of Israel, before David’s servants. 
[18] The three sons of Zeruiah were there: Joab, Abishai, and Asahel. Asahel was as light of foot as a wild gazelle. 
[19] Asahel pursued Abner. He didn’t turn to the right hand or to the left from following Abner. 
[20] Then Abner looked behind him and said, “Is that you, Asahel?” He answered, “It is.” 
[21] Abner said to him, “Turn away to your right hand or to your left, and grab one of the young men, and take his armor.” But Asahel would not turn away from following him. 
[22] Abner said again to Asahel, “Turn away from following me. Why should I strike you to the ground? How then could I look Joab your brother in the face?” 
[23] However, he refused to turn away. Therefore Abner with the back end of the spear struck him in the body, so that the spear came out behind him; and he fell down there and died in the same place. As many as came to the place where Asahel fell down and died stood still. 
[24] But Joab and Abishai pursued Abner. The sun went down when they had come to the hill of Ammah, that lies before Giah by the way of the wilderness of Gibeon. 
[25] The children of Benjamin gathered themselves together after Abner and became one band, and stood on the top of a hill. 
[26] Then Abner called to Joab, and said, “Shall the sword devour forever? Don’t you know that it will be bitterness in the latter end? How long will it be then, before you ask the people to return from following their brothers?” 
[27] Joab said, “As God lives, if you had not spoken, surely then in the morning the people would have gone away, and not each followed his brother.” 
[28] So Joab blew the trumpet; and all the people stood still and pursued Israel no more, and they fought no more. 
[29] Abner and his men went all that night through the Arabah; and they passed over the Jordan, and went through all Bithron, and came to Mahanaim. 
[30] Joab returned from following Abner; and when he had gathered all the people together, nineteen men of David’s and Asahel were missing. 
[31] But David’s servants had struck Benjamin and Abner’s men so that three hundred sixty men died. 
[32] They took up Asahel and buried him in the tomb of his father, which was in Bethlehem. Joab and his men went all night, and the day broke on them at Hebron.

### 2SA03
[1] Now there was a long war between Saul’s house and David’s house. David grew stronger and stronger, but Saul’s house grew weaker and weaker. 
[2] Sons were born to David in Hebron. His firstborn was Amnon, of Ahinoam the Jezreelitess; 
[3] and his second, Chileab, of Abigail the wife of Nabal the Carmelite; and the third, Absalom the son of Maacah the daughter of Talmai king of Geshur; 
[4] and the fourth, Adonijah the son of Haggith; and the fifth, Shephatiah the son of Abital; 
[5] and the sixth, Ithream, of Eglah, David’s wife. These were born to David in Hebron. 
[6] While there was war between Saul’s house and David’s house, Abner made himself strong in Saul’s house. 
[7] Now Saul had a concubine, whose name was Rizpah, the daughter of Aiah; and Ishbosheth said to Abner, “Why have you gone in to my father’s concubine?” 
[8] Then Abner was very angry about Ishbosheth’s words, and said, “Am I a dog’s head that belongs to Judah? Today I show kindness to your father Saul’s house, to his brothers, and to his friends, and have not delivered you into the hand of David; and yet you charge me today with a fault concerning this woman! 
[9] God do so to Abner, and more also, if, as the LORD has sworn to David, I don’t do even so to him: 
[10] to transfer the kingdom from Saul’s house, and to set up David’s throne over Israel and over Judah, from Dan even to Beersheba.” 
[11] He could not answer Abner another word, because he was afraid of him. 
[12] Abner sent messengers to David on his behalf, saying, “Whose is the land?” and saying, “Make your alliance with me, and behold, my hand will be with you to bring all Israel around to you.” 
[13] David said, “Good. I will make a treaty with you, but one thing I require of you. That is, you will not see my face unless you first bring Michal, Saul’s daughter, when you come to see my face.” 
[14] David sent messengers to Ishbosheth, Saul’s son, saying, “Deliver me my wife Michal, whom I was given to marry for one hundred foreskins of the Philistines.” 
[15] Ishbosheth sent and took her from her husband, Paltiel the son of Laish. 
[16] Her husband went with her, weeping as he went, and followed her to Bahurim. Then Abner said to him, “Go! Return!” and he returned. 
[17] Abner had communication with the elders of Israel, saying, “In times past, you sought for David to be king over you. 
[18] Now then do it! For the LORD has spoken of David, saying, ‘By the hand of my servant David, I will save my people Israel out of the hand of the Philistines, and out of the hand of all their enemies.’ ” 
[19] Abner also spoke in the ears of Benjamin; and Abner went also to speak in the ears of David in Hebron all that seemed good to Israel and to the whole house of Benjamin. 
[20] So Abner came to David to Hebron, and twenty men with him. David made Abner and the men who were with him a feast. 
[21] Abner said to David, “I will arise and go, and will gather all Israel to my lord the king, that they may make a covenant with you, and that you may reign over all that your soul desires.” David sent Abner away; and he went in peace. 
[22] Behold, David’s servants and Joab came from a raid and brought in a great plunder with them; but Abner was not with David in Hebron, for he had sent him away, and he had gone in peace. 
[23] When Joab and all the army who was with him had come, they told Joab, “Abner the son of Ner came to the king, and he has sent him away, and he has gone in peace.” 
[24] Then Joab came to the king and said, “What have you done? Behold, Abner came to you. Why is it that you have sent him away, and he is already gone? 
[25] You know Abner the son of Ner. He came to deceive you, and to know your going out and your coming in, and to know all that you do.” 
[26] When Joab had come out from David, he sent messengers after Abner, and they brought him back from the well of Sirah; but David didn’t know it. 
[27] When Abner had returned to Hebron, Joab took him aside into the middle of the gate to speak with him quietly, and struck him there in the body, so that he died for the blood of Asahel his brother. 
[28] Afterward, when David heard it, he said, “I and my kingdom are guiltless before the LORD forever of the blood of Abner the son of Ner. 
[29] Let it fall on the head of Joab and on all his father’s house. Let there not fail from the house of Joab one who has a discharge, or who is a leper, or who leans on a staff, or who falls by the sword, or who lacks bread.” 
[30] So Joab and Abishai his brother killed Abner, because he had killed their brother Asahel at Gibeon in the battle. 
[31] David said to Joab and to all the people who were with him, “Tear your clothes, and clothe yourselves with sackcloth, and mourn in front of Abner.” King David followed the bier. 
[32] They buried Abner in Hebron; and the king lifted up his voice and wept at Abner’s grave; and all the people wept. 
[33] The king lamented for Abner, and said, “Should Abner die as a fool dies? 
[34] Your hands weren’t bound, and your feet weren’t put into fetters. As a man falls before the children of iniquity, so you fell.” All the people wept again over him. 
[35] All the people came to urge David to eat bread while it was yet day; but David swore, saying, “God do so to me, and more also, if I taste bread or anything else, until the sun goes down.” 
[36] All the people took notice of it, and it pleased them, as whatever the king did pleased all the people. 
[37] So all the people and all Israel understood that day that it was not of the king to kill Abner the son of Ner. 
[38] The king said to his servants, “Don’t you know that a prince and a great man has fallen today in Israel? 
[39] I am weak today, though anointed king. These men, the sons of Zeruiah are too hard for me. May the LORD reward the evildoer according to his wickedness.”

### 2SA05
[1] Then all the tribes of Israel came to David at Hebron and spoke, saying, “Behold, we are your bone and your flesh. 
[2] In times past, when Saul was king over us, it was you who led Israel out and in. the LORD said to you, ‘You will be shepherd of my people Israel, and you will be prince over Israel.’ ” 
[3] So all the elders of Israel came to the king to Hebron, and King David made a covenant with them in Hebron before the LORD; and they anointed David king over Israel. 
[4] David was thirty years old when he began to reign, and he reigned forty years. 
[5] In Hebron he reigned over Judah seven years and six months, and in Jerusalem he reigned thirty-three years over all Israel and Judah. 
[6] The king and his men went to Jerusalem against the Jebusites, the inhabitants of the land, who spoke to David, saying, “The blind and the lame will keep you out of here,” thinking, “David can’t come in here.” 
[7] Nevertheless David took the stronghold of Zion. This is David’s city. 
[8] David said on that day, “Whoever strikes the Jebusites, let him go up to the watercourse and strike those lame and blind, who are hated by David’s soul.” Therefore they say, “The blind and the lame can’t come into the house.” 
[9] David lived in the stronghold, and called it David’s city. David built around from Millo and inward. 
[10] David grew greater and greater, for the LORD, the God of Armies, was with him. 
[11] Hiram king of Tyre sent messengers to David, with cedar trees, carpenters, and masons; and they built David a house. 
[12] David perceived that the LORD had established him king over Israel, and that he had exalted his kingdom for his people Israel’s sake. 
[13] David took more concubines and wives for himself out of Jerusalem, after he had come from Hebron; and more sons and daughters were born to David. 
[14] These are the names of those who were born to him in Jerusalem: Shammua, Shobab, Nathan, Solomon, 
[15] Ibhar, Elishua, Nepheg, Japhia, 
[16] Elishama, Eliada, and Eliphelet. 
[17] When the Philistines heard that they had anointed David king over Israel, all the Philistines went up to seek David, but David heard about it and went down to the stronghold. 
[18] Now the Philistines had come and spread themselves in the valley of Rephaim. 
[19] David inquired of the LORD, saying, “Shall I go up against the Philistines? Will you deliver them into my hand?” The LORD said to David, “Go up; for I will certainly deliver the Philistines into your hand.” 
[20] David came to Baal Perazim, and David struck them there. Then he said, “the LORD has broken my enemies before me, like the breach of waters.” Therefore he called the name of that place Baal Perazim. 
[21] They left their images there, and David and his men took them away. 
[22] The Philistines came up yet again and spread themselves in the valley of Rephaim. 
[23] When David inquired of the LORD, he said, “You shall not go up. Circle around behind them, and attack them in front of the mulberry trees. 
[24] When you hear the sound of marching in the tops of the mulberry trees, then stir yourself up; for then the LORD has gone out before you to strike the army of the Philistines.” 
[25] David did so, as the LORD commanded him, and struck the Philistines all the way from Geba to Gezer.

### 1CH12
[1] Now these are those who came to David to Ziklag while he was a fugitive from Saul the son of Kish. They were among the mighty men, his helpers in war. 
[2] They were armed with bows, and could use both the right hand and the left in slinging stones and in shooting arrows from the bow. They were of Saul’s relatives of the tribe of Benjamin. 
[3] The chief was Ahiezer, then Joash, the sons of Shemaah the Gibeathite; Jeziel and Pelet, the sons of Azmaveth; Beracah; Jehu the Anathothite; 
[4] Ishmaiah the Gibeonite, a mighty man among the thirty and a leader of the thirty; Jeremiah; Jahaziel; Johanan; Jozabad the Gederathite; 
[5] Eluzai; Jerimoth; Bealiah; Shemariah; Shephatiah the Haruphite; 
[6] Elkanah, Isshiah, Azarel, Joezer, and Jashobeam, the Korahites; 
[7] and Joelah and Zebadiah, the sons of Jeroham of Gedor. 
[8] Some Gadites joined David in the stronghold in the wilderness, mighty men of valor, men trained for war, who could handle shield and spear; whose faces were like the faces of lions, and they were as swift as the gazelles on the mountains: 
[9] Ezer the chief, Obadiah the second, Eliab the third, 
[10] Mishmannah the fourth, Jeremiah the fifth, 
[11] Attai the sixth, Eliel the seventh, 
[12] Johanan the eighth, Elzabad the ninth, 
[13] Jeremiah the tenth, and Machbannai the eleventh. 
[14] These of the sons of Gad were captains of the army. He who was least was equal to one hundred, and the greatest to one thousand. 
[15] These are those who went over the Jordan in the first month, when it had overflowed all its banks; and they put to flight all who lived in the valleys, both toward the east and toward the west. 
[16] Some of the children of Benjamin and Judah came to the stronghold to David. 
[17] David went out to meet them, and answered them, “If you have come peaceably to me to help me, my heart will be united with you; but if you have come to betray me to my adversaries, since there is no wrong in my hands, may the God of our fathers see this and rebuke it.” 
[18] Then the Spirit came on Amasai, who was chief of the thirty, and he said, “We are yours, David, and on your side, you son of Jesse. Peace, peace be to you, and peace be to your helpers; for your God helps you.” Then David received them and made them captains of the band. 
[19] Some of Manasseh also joined David when he came with the Philistines against Saul to battle, but they didn’t help them, for the lords of the Philistines sent him away after consultation, saying, “He will desert to his master Saul to the jeopardy of our heads.” 
[20] As he went to Ziklag, some from Manasseh joined him: Adnah, Jozabad, Jediael, Michael, Jozabad, Elihu, and Zillethai, captains of thousands who were of Manasseh. 
[21] They helped David against the band of raiders, for they were all mighty men of valor and were captains in the army. 
[22] For from day to day men came to David to help him, until there was a great army, like God’s army. 
[23] These are the numbers of the heads of those who were armed for war, who came to David to Hebron to turn the kingdom of Saul to him, according to the LORD’s word. 
[24] The children of Judah who bore shield and spear were six thousand eight hundred, armed for war. 
[25] Of the children of Simeon, mighty men of valor for the war: seven thousand one hundred. 
[26] Of the children of Levi: four thousand six hundred. 
[27] Jehoiada was the leader of the household of Aaron; and with him were three thousand seven hundred, 
[28] and Zadok, a young man mighty of valor, and of his father’s house twenty-two captains. 
[29] Of the children of Benjamin, Saul’s relatives: three thousand, for until then, the greatest part of them had kept their allegiance to Saul’s house. 
[30] Of the children of Ephraim: twenty thousand eight hundred, mighty men of valor, famous men in their fathers’ houses. 
[31] Of the half-tribe of Manasseh: eighteen thousand, who were mentioned by name, to come and make David king. 
[32] Of the children of Issachar, men who had understanding of the times, to know what Israel ought to do, their heads were two hundred; and all their brothers were at their command. 
[33] Of Zebulun, such as were able to go out in the army, who could set the battle in array with all kinds of instruments of war: fifty thousand who could command and were not of double heart. 
[34] Of Naphtali: one thousand captains, and with them with shield and spear thirty-seven thousand. 
[35] Of the Danites who could set the battle in array: twenty-eight thousand six hundred. 
[36] Of Asher, such as were able to go out in the army, who could set the battle in array: forty thousand. 
[37] On the other side of the Jordan, of the Reubenites, the Gadites, and of the half-tribe of Manasseh, with all kinds of instruments of war for the battle: one hundred twenty thousand. 
[38] All these were men of war who could order the battle array, and came with a perfect heart to Hebron to make David king over all Israel; and all the rest also of Israel were of one heart to make David king. 
[39] They were there with David three days, eating and drinking; for their brothers had supplied provisions for them. 
[40] Moreover those who were near to them, as far as Issachar, Zebulun, and Naphtali, brought bread on donkeys, on camels, on mules, and on oxen: supplies of flour, cakes of figs, clusters of raisins, wine, oil, cattle, and sheep in abundance; for there was joy in Israel.
