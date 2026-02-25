#!/bin/bash
# Deploy to GitHub Pages

echo "🚀 Building for GitHub Pages..."

# Create a docs folder for GitHub Pages
mkdir -p docs

# Copy main files
cp index.html docs/
cp server.js docs/
cp package.json docs/
cp package-lock.json docs/

# Create a simple redirect page since GitHub Pages can't run Node.js backend
cat > docs/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neon Drifter - Multiplayer Racing</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
        }
        h1 {
            font-size: 3rem;
            background: linear-gradient(135deg, #00f0ff, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            text-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        }
        p {
            font-size: 1.2rem;
            margin: 1.5rem 0;
            color: #cbd5e1;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            margin: 0.5rem;
            border-radius: 0.5rem;
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }
        .btn-primary {
            background: #3b82f6;
            color: white;
        }
        .btn-primary:hover {
            background: #2563eb;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .btn-secondary {
            background: #10b981;
            color: white;
        }
        .btn-secondary:hover {
            background: #059669;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }
        .info {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(0, 240, 255, 0.3);
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
        }
        .feature-list {
            text-align: left;
            margin: 1rem 0;
        }
        .feature-list li {
            margin: 0.5rem 0;
            color: #a1d8ff;
        }
        code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.5rem;
            border-radius: 0.3rem;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 NEON DRIFTER</h1>
        <p>Multiplayer Neon Racing Game</p>

        <div class="info">
            <h2 style="margin-bottom: 1rem;">⚠️ Important Note</h2>
            <p>GitHub Pages hosts <strong>static files only</strong>. This game requires a <strong>WebSocket server</strong> for multiplayer.</p>
        </div>

        <h3 style="margin: 2rem 0 1rem;">🚀 Play Options:</h3>

        <div>
            <a href="https://github.com/idk1091084308/mi-bomba" class="btn btn-secondary">📖 View on GitHub</a>
        </div>

        <div>
            <h3 style="margin: 2rem 0 1rem;">Option 1: Local Play (Requires Setup)</h3>
            <p>Clone and run locally with AI opponents:</p>
            <code style="display: block; margin: 1rem 0; padding: 1rem; text-align: left; overflow-x: auto;">
git clone https://github.com/idk1091084308/mi-bomba<br>
cd mi-bomba<br>
npm install<br>
npm start<br>
# Open http://localhost:3000
            </code>
        </div>

        <div>
            <h3 style="margin: 2rem 0 1rem;">Option 2: Online Multiplayer (Recommended)</h3>
            <p>Deploy to Railway in 2 minutes:</p>
            <a href="https://railway.app" class="btn btn-primary">🌐 Deploy to Railway</a>
            <p style="font-size: 0.9rem; margin-top: 1rem;">
                After deploying to Railway, you'll get a public URL to share with friends!<br>
                See <a href="https://github.com/idk1091084308/mi-bomba/blob/main/DEPLOY.md" style="color: #00f0ff;">DEPLOY.md</a> for details.
            </p>
        </div>

        <div class="info">
            <h3>✨ Features</h3>
            <ul class="feature-list">
                <li>🏎️ Real-time multiplayer racing</li>
                <li>🎨 Customize neon underglow colors</li>
                <li>🎩 Cosmetic hats (Cap, Top Hat, Crown)</li>
                <li>🤖 AI opponents (singleplayer mode)</li>
                <li>🏁 4 unique racing tracks</li>
                <li>⚡ Secret nitro boost (press Y)</li>
            </ul>
        </div>

        <div class="info">
            <h3>🎮 Controls</h3>
            <ul class="feature-list">
                <li><strong>WASD</strong> or <strong>Arrow Keys</strong> - Drive</li>
                <li><strong>Space</strong> - Brake</li>
                <li><strong>Y</strong> - Secret Nitro Boost</li>
            </ul>
        </div>

        <p style="margin-top: 3rem; font-size: 0.9rem; color: #64748b;">
            Made with ❤️ • <a href="https://github.com/idk1091084308/mi-bomba" style="color: #00f0ff;">GitHub</a>
        </p>
    </div>
</body>
</html>
EOF

echo "✅ Docs folder created!"
echo "📝 Created index.html landing page"
