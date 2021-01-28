@echo off

CALL npx tsc src/main.ts

echo TypeScript Compiled 
echo.

CALL node .
pause