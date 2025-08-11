#!/bin/bash

echo "🎯 Labubu Fake Checker - Training Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ Python found: $($PYTHON_CMD --version)"

# Install Python dependencies
echo ""
echo "📦 Installing Python dependencies..."
$PYTHON_CMD -m pip install numpy scikit-learn matplotlib joblib

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Python dependencies"
    echo "💡 Try running: pip install numpy scikit-learn matplotlib joblib"
    exit 1
fi

# Generate sample training data
echo ""
echo "🔄 Generating sample training data..."
npm run generate-sample-data

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate sample data"
    echo "💡 Try running manually: npx tsx scripts/generate-sample-training-data.ts"
    exit 1
fi

# Train the model
echo ""
echo "🤖 Training the AI model..."
$PYTHON_CMD scripts/train-simple-classifier.py

if [ $? -ne 0 ]; then
    echo "❌ Training failed"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo "✅ Training data generated"
echo "✅ AI model trained and saved"
echo ""
echo "🚀 You can now test the fake checker at:"
echo "   http://localhost:3000/tools/fake-checker"
