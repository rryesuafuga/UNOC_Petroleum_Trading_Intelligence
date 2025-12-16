#!/bin/bash

# UPTIP Presentation Website Setup Script
# This script sets up and runs the UNOC PetroTrade Intelligence Platform presentation

echo "================================================"
echo "  UNOC PetroTrade Intelligence Platform (UPTIP)"
echo "  Professional Presentation Website Setup"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm detected: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🚀 Starting the UPTIP Presentation Website..."
echo ""
echo "================================================"
echo "  The website will open in your browser at:"
echo "  http://localhost:3000"
echo ""
echo "  Navigation Guide:"
echo "  1. Landing Page - Overview and value proposition"
echo "  2. Live Demo - Interactive dashboard"
echo "  3. Modules - Deep dive into each feature"
echo ""
echo "  Press Ctrl+C to stop the server"
echo "================================================"
echo ""

# Start the development server
npm start
