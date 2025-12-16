@echo off
echo =====================================
echo Building qb-vehicleshop NUI
echo =====================================
echo.

cd html

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies!
    pause
    exit /b %errorlevel%
)

echo.
echo Building NUI...
call npm run build
if %errorlevel% neq 0 (
    echo Failed to build NUI!
    pause
    exit /b %errorlevel%
)

echo.
echo =====================================
echo NUI build completed successfully!
echo =====================================
pause
