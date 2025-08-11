@echo off
echo 🎯 Labubu Fake Checker - Training Setup
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python first.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo ✅ Python found

REM Install Python dependencies
echo.
echo 📦 Installing Python dependencies...
python -m pip install numpy scikit-learn matplotlib joblib

if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    echo 💡 Try running: pip install numpy scikit-learn matplotlib joblib
    pause
    exit /b 1
)

REM Generate sample training data
echo.
echo 🔄 Generating sample training data...
call npm run generate-sample-data

if %errorlevel% neq 0 (
    echo ❌ Failed to generate sample data
    echo 💡 Try running manually: npx tsx scripts/generate-sample-training-data.ts
    pause
    exit /b 1
)

REM Train the model
echo.
echo 🤖 Training the AI model...
python scripts/train-simple-classifier.py

if %errorlevel% neq 0 (
    echo ❌ Training failed
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete!
echo ✅ Training data generated
echo ✅ AI model trained and saved
echo.
echo 🚀 You can now test the fake checker at:
echo    http://localhost:3000/tools/fake-checker
pause
