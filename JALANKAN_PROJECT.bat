@echo off
title Dashboard Co-Pilot TikTok AI Generator
color 0b
cd /d "%~dp0"

echo ===================================================
echo     DASHBOARD CO-PILOT TIKTOK LOKAL (v2.0 PRO)
echo     AI Script & Prompt Generator (60%% Indo : 40%% Daerah)
echo ===================================================
echo Folder: %CD%
echo.
echo Menjalankan Dashboard Co-Pilot pada http://localhost:3000...
echo Browser akan otomatis terbuka.
echo Tekan Ctrl+C di terminal ini jika ingin menghentikan.
echo ===================================================
echo.

call npm.cmd run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Terjadi kesalahan saat menjalankan aplikasi.
)

echo.
echo ===================================================
echo Aplikasi telah dihentikan.
echo ===================================================
pause
