@echo off
echo Iniciando Cloud SQL Proxy...
echo.

REM Change to project directory
cd /d "%~dp0"

REM Start Cloud SQL Proxy
echo Conectando a: alana-crm:us-central1:alana-crm-db
echo.
echo IMPORTANTE: Deja esta ventana ABIERTA mientras trabajas
echo.

cloud_sql_proxy.exe alana-crm:us-central1:alana-crm-db

pause
