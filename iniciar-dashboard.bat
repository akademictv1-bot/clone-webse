@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (node dashboard-server.js & goto fim)
where py >nul 2>nul
if %errorlevel%==0 (py dashboard-server.py & goto fim)
where python >nul 2>nul
if %errorlevel%==0 (python dashboard-server.py & goto fim)
echo Nem Node.js nem Python foram encontrados para iniciar o servidor.
echo Abrindo dashboard.html no navegador em modo arquivo...
start dashboard.html
:fim
pause
