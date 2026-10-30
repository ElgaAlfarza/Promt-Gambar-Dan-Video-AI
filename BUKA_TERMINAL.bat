@echo off
title Terminal - Dashboard Co-Pilot TikTok
cd /d "%~dp0"

echo ===================================================
echo     TERMINAL AKTIF: DASHBOARD CO-PILOT TIKTOK
echo     Folder: %CD%
echo ===================================================
echo Perintah yang dapat Anda jalankan:
echo   1. npm run dev              - Jalankan Dashboard Co-Pilot TikTok (Web)
echo   2. npm run gemini           - Minta Gemini AI buat ide / script video
echo   3. npm run remotion:studio  - Buka Remotion Studio
echo   4. npm run create-subtitles - Generate subtitle otomatis via Whisper
echo   5. npm run build            - Build web dashboard
echo ===================================================
echo.

cmd /k
