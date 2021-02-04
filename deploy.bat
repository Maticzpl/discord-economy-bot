@echo off

CALL tsc

echo TypeScript Compiled 
echo.

cd out
CALL node main.js

pause