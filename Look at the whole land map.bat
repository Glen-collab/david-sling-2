@echo off
rem Plays the game in its own Chrome window with sound always on (no click needed, so a controller is enough).
rem (Shows the land map with every place and road at once, numbered in story order, to see the whole layout.)
cd /d "%~dp0"
powershell -NoProfile -Command "try { (New-Object Net.Sockets.TcpClient('localhost', 8766)).Close(); exit 0 } catch { exit 1 }"
if errorlevel 1 start "David 2 server" /min python tools\serve.py 8766
timeout /t 1 /nobreak >nul
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --user-data-dir="%LOCALAPPDATA%\DavidSling2Chrome" --autoplay-policy=no-user-gesture-required --start-fullscreen --app=http://localhost:8766/game/index.html?landall
