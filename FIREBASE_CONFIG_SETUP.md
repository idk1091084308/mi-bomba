# 🔥 Firebase Database Setup for Neon Drifter

## Step 1: Create Firebase Project (2 minutes)

1. Go to https://console.firebase.google.com
2. Click **"Create a new project"**
   - Name: `neon-drifter` (or your choice)
   - Click Create
3. Wait for setup to complete, click "Continue"

## Step 2: Get Your Firebase Config

1. In Firebase Console, click **Project Settings** (gear icon, top left)
2. Under "Your apps", click the **Web icon** (`</>`)
3. Register app: Name it "neon-drifter-web" → Register
4. Copy the config object that appears:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

**Save this! You'll need it next.**

## Step 3: Enable Firestore Database

1. In Firebase Console, go to **Build → Firestore Database**
2. Click **"Create Database"**
3. Start in **Test mode** (for development)
4. Select location closest to you → **Enable**
5. Go to **Rules** tab and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artifacts/{appId}/public/data/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish**

## Step 4: Disable Rate Limiting (Optional)

1. Go to **Build → Authentication**
2. Click **"Get Started"** if prompted
3. Provider: **Anonymous**
4. Enable it → Save

## Step 5: Add Config to Your Game

Replace the `FIREBASE_CONFIG_HERE` placeholder in your index.html with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Testing Multiplayer with Firebase

### Local Testing (2 browsers)
1. Open `http://localhost:3000` in Browser 1
2. Open `http://localhost:3000` in Browser 2
3. Player 1: Click **"Online Multiplayer"** → **"Create New Room"**
4. Player 2: Click **"Online Multiplayer"** → Enter room code → **"Join"**
5. Host starts game → **Both players race!**

### Check Data in Firestore
1. Firebase Console → Firestore
2. You should see collections created:
   - `artifacts/{appId}/public/data/rooms/`
   - `artifacts/{appId}/public/data/rooms/{roomCode}/players/`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "No Firebase config detected" | Make sure config is added BEFORE game script loads |
| Auth errors | Enable Anonymous Auth in Firebase Console |
| DB read/write fails | Check Firestore Rules (should have `allow read, write: if true;`) |
| Players don't sync | Check Firestore Collections tab - data should appear |

## Switching Back to WebSocket

If you want to use the local Node.js server instead:
- Keep current `server.js` running
- Change in `index.html`: `const USE_WEBSOCKET = false;`

---

**Next: Run the setup script below to add your config automatically!**
