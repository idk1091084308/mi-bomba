# 🎮 Neon Drifter - Multiplayer Racing Game

## Quick Start: WebSocket Multiplayer (Recommended)

### 1. Install Dependencies
```bash
cd /workspaces/mi-bomba
npm install
```

### 2. Start the Game Server (Terminal 1)
```bash
npm start
# or: node server.js
```
You'll see: `🎮 Neon Drifter Server running on http://localhost:3000`

### 3. Start the HTTP Server (Terminal 2)
```bash
cd /workspaces/mi-bomba
python3 -m http.server 8000
```

### 4. Play Multiplayer!
1. Open Browser 1: `http://localhost:3000`
   - Click "Online Multiplayer"
   - Click "Create New Room"
   - Share the room code

2. Open Browser 2: `http://localhost:3000`
   - Click "Online Multiplayer"
   - Paste the room code → "Join"
   - Wait for host to start

3. Host clicks "Start Game (Host)"
4. **Race together! 🏁**

## Game Features

### Controls
- **WASD / Arrow Keys**: Drive
- **Space**: Brake
- **Y**: Secret Nitro Boost! 🚀

### Gameplay
- **3 Game Modes**: Eliminate all opposing players
- **4 Unique Tracks**: With different race lengths
- **Cosmetic Hats**: Customize your racer (Cap, Top Hat, Crown)
- **Neon Underglow**: Choose your color
- **Lap Tracking**: First to complete laps wins
- **Wrong Way Detector**: Alerts if you're going backwards
- **Boost Items**: Pickup speed boosts on track

### Singleplayer
- Race against 3 AI bots
- Same tracks and mechanics
- Perfect for practice

## Troubleshooting

### "Connection refused" on multiplayer
- ✅ Make sure `npm start` is running in Terminal 1
- Check that Terminal 1 says "Server running on http://localhost:3000"

### "Players don't appear"
- Verify both browsers are on `http://localhost:3000` (not `http://localhost:8000`)
- Check they're in the same room code
- Try refreshing the page

### Server won't start
```bash
npm install  # Make sure dependencies installed
npm start    # Try again
```

### Port 3000 already in use
```bash
lsof -i :3000  # Find what's using it
kill -9 <PID>  # Kill it
npm start      # Try again
```

## Firebase Alternative

If you prefer Firebase instead of WebSocket:
1. See `FIREBASE_SETUP.md` for full instructions
2. Modify `index.html` line ~187: Change `USE_WEBSOCKET = true` to `false`
3. Add Firebase config before the game script loads

## Architecture

- **Frontend**: Pure HTML5 Canvas with WebSocket support
- **Backend**: Node.js + Express + Socket.IO
- **Protocol**: JSON messages over WebSocket for real-time sync
- **Room System**: Up to unlimited players per room
- **Hosting**: Works on localhost, can be deployed to cloud

## File Structure
```
/workspaces/mi-bomba/
├── index.html        (Game client)
├── server.js         (WebSocket server)
├── package.json      (Dependencies)
├── FIREBASE_SETUP.md (Firebase alternative)
└── README.md         (This file)
```

Enjoy! 🎮✨
