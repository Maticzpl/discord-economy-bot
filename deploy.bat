@echo off

CALL npx tsc src/main.ts

echo TypeScript Compiled 
echo.

CALL node .

cd src

del main.js
del storage.js

cd commands
del cmd-base.js
del cmd-manager.js
del help.js
pause