@echo off
title Terminal - my-video
cd /d "%~dp0"

echo ===================================================
echo              TERMINAL AKTIF (my-video)
echo              Folder: %CD%
echo ===================================================
echo Perintah yang dapat Anda jalankan:
echo   1. npm run dev              - Jalankan Remotion Studio
echo   2. npm run gemini           - Minta AI Gemini Pro buat naskah/ide
echo   3. npm run create-subtitles - Generate subtitle Whisper
echo   4. npm run build            - Render / export video
echo   5. npm run lint             - Cek error TypeScript / ESLint
echo ===================================================
echo.

cmd /k
