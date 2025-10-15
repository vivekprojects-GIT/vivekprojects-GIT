#!/bin/bash

# AI Portfolio Demo Runner
# This script helps you run the interactive demos for the portfolio

echo "🚀 Starting AI Portfolio Demos"
echo "================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ to run the demos."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip to run the demos."
    exit 1
fi

# Navigate to demos directory
cd "$(dirname "$0")/demos"

echo "📦 Installing required packages..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install requirements. Please check your Python environment."
    exit 1
fi

echo "✅ Requirements installed successfully!"
echo ""
echo "🎯 Available Demos:"
echo "1. AI Code Review Demo (Gradio)"
echo ""
echo "Starting Code Review Demo..."
echo "🌐 The demo will open in your browser at: http://localhost:7860"
echo "📱 For public sharing, a Gradio share link will be generated"
echo ""
echo "Press Ctrl+C to stop the demo"
echo ""

# Run the code review demo
python3 code_review_demo.py
