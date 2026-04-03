@echo off
setlocal
cd /d "%~dp0"

echo [OEA LAUNCHER] Proverka okruzheniya...

:: Proverka na nalichie Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js ne nayden! Pozhaluysta, ustanovite Node.js s sayta https://nodejs.org/
    pause
    exit /b
)

:: Proverka node_modules
if not exist "node_modules\" (
    echo [OEA LAUNCHER] Ustanovka zavisimostey (v pervyy raz eto mozhet zanyat' vremya)...
    call npm install
)

:: Proverka dist
if not exist "dist\" (
    echo [OEA LAUNCHER] Sborka proekta...
    call npm run build
)

echo [OEA LAUNCHER] Zapusk servera...
echo [OEA LAUNCHER] Proekt budet dostupen po adresu: http://localhost:4173
echo [OEA LAUNCHER] Nazhmite Ctrl+C dlya ostanovki servera.

:: Otkrytiye brauzera
start "" http://localhost:4173

:: Zapusk predprosmotra
call npm run preview -- --host

pause
