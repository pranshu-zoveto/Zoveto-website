@echo off
setlocal
REM Double-click or run from cmd - uses bundled PowerShell starter
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-website.ps1"
pause
