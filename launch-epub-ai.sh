#!/bin/bash

# EPUB.AI Specialized Launch Script
# Uses unique ports to avoid conflicts with other AI projects
# Port: 7829 (unlikely to conflict)

echo "🚀 Launching EPUB.AI Platform..."
echo "📖 Professional Lead Magnet eBook Generator"
echo ""

# Check if port is available
PORT=7829
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Port $PORT is already in use"
    echo "🔍 Finding alternative port..."

    # Try alternative ports
    for port in 7830 7831 7832 7833; do
        if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
            PORT=$port
            break
        fi
    done

    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ No available ports found. Please check running processes."
        exit 1
    fi
fi

echo "🌐 Starting server on port $PORT..."
echo "📍 Local URL: http://localhost:$PORT"
echo "🔗 Network URL: http://$(ipconfig getifaddr en0):$PORT"
echo ""
echo "💰 Live Stripe Integration: ENABLED"
echo "🤖 OpenAI Integration: ENABLED"
echo "📧 SendGrid Email: ENABLED"
echo "🗄️  Supabase Database: ENABLED"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

# Set port and start Next.js
export PORT=$PORT
npm run dev

echo ""
echo "👋 EPUB.AI server stopped"