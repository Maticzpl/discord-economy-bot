@echo off

CALL npx tsc src/main.ts

echo TypeScript Compiled 
echo.

CALL node .

del src/main.js
del src/storage.js
pause