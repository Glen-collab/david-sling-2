// (step 1 of 2) a save with World 3 finished (Gath escaped), the real save kept aside; w3mourn.js puts it back
if (location.hash !== "#9-7") throw new Error("not in World 3");
const key = regionSaveKey(), was = localStorage.getItem(key);
if (localStorage.getItem("w3mourn_backup") === null) localStorage.setItem("w3mourn_backup", was === null ? "__none__" : was);
localStorage.setItem(key, JSON.stringify({ taken: ["r3_bread", "r3_gath", "r3_mad", "g_exit_open"], explored: ["nobroad", "nob"] }));
TEST_ERRORS.push("INFO set " + key); window.TEST_DONE = true;
