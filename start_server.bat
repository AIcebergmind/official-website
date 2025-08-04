@echo off
echo -------------------------------------
echo Avvio del server web locale su porta 8000
echo Il file "index_02.08.2025.html" si aprirà nel browser
echo (Premi CTRL+C per fermare il server)
echo -------------------------------------

REM Avvia il browser predefinito con la porta corretta
start http://localhost:8000/index.html

REM Avvia il server Python
python -m http.server 8000

pause
