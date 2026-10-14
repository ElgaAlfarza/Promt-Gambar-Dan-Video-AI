@echo off
title Remotion Studio - my-video
cd /d "%~dp0"

echo ===================================================
echo           MEMULAI REMOTION STUDIO
echo               Folder: %CD%
echo ===================================================
echo.
echo Menjalankan 'npm run dev'...
echo (Tekan Ctrl+C di terminal ini jika ingin menghentikan)
echo.

call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Terjadi kesalahan saat menjalankan project.
)

echo.
echo ===================================================
echo Project telah berhenti.
echo ===================================================
pause
