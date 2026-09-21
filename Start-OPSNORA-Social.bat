@echo off
setlocal
title OPSNORA Social
cd /d "%~dp0"

echo.
echo  ========================================
echo          Starting OPSNORA Social
echo  ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed on this computer.
  echo Please install Node.js LTS from https://nodejs.org/ and try again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing required packages for the first run...
  call npm install
  if errorlevel 1 (
    echo.
    echo Package installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

netstat -ano | findstr /r /c:":3000 .*LISTENING" >nul
if not errorlevel 1 (
  echo OPSNORA Social is already running on port 3000.
  echo Opening the existing application...
  start "" "http://localhost:3000"
  exit /b 0
)

if exist ".next\" (
  echo Clearing old Next.js cache...
  powershell.exe -NoProfile -Command "Remove-Item -LiteralPath '%~dp0.next' -Recurse -Force -ErrorAction SilentlyContinue"
  if exist ".next\" (
    echo.
    echo The old server is still using the cache.
    echo Close any existing OPSNORA Social terminal, then run this file again.
    pause
    exit /b 1
  )
)

echo Opening http://localhost:3000 in your browser...
start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "$url='http://localhost:3000'; for($i=0;$i -lt 60;$i++){try{Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1 ^| Out-Null; Start-Process $url; exit}catch{Start-Sleep -Seconds 1}}"

echo.
echo OPSNORA Social is running.
echo Keep this window open while using the application.
echo Press Ctrl+C to stop the server.
echo.
call npm run dev

endlocal
