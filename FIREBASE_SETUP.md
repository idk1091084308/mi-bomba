# Firebase Multiplayer Setup Guide

## Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Name it (e.g., "neon-drifter")
4. Click "Create project"

## Step 2: Get Your Firebase Config
1. In the Firebase console, click the **Web** icon (`</>`) to add a web app
2. Register app with a name (e.g., "neon-drifter-web")
3. Copy the `firebaseConfig` object from the setup script

Your config will look like:
```javascript
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project",
  "storageBucket": "your-project.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abcdef123456"
}
```

## Step 3: Enable Firestore
1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create Database"
3. Start in **Test mode** (for development)
4. Choose a location nearest to you
5. Check the security rules:

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

## Step 4: Update Your Game
Replace the `hasFirebaseConfig` check in `index.html` with your config:

Find this line (around line 177):
```javascript
const firebaseConfig = ... // This should be available in your index.html
```

Or use Firebase config via script injection before `index.html`:
```html
<script>
  window.__firebase_config = YOUR_CONFIG_HERE;
  window.__app_id = 'neon-drifter';
</script>
```

## Testing Multiplayer
1. Start the game: `python3 -m http.server 8000`
2. Open `http://localhost:8000` in Browser 1 → Click "Online Multiplayer"
3. Create a room or get the room code
4. Open `http://localhost:8000` in Browser 2 → Join the same room
5. Both players should appear in the lobby
6. Host starts the game - both players race!

## Troubleshooting
- **"No Firebase config"**: Ensure `__firebase_config` is set before the script runs
- **Players don't sync**: Check Firestore in Firebase Console for data
- **Auth errors**: Ensure anonymous auth is enabled in Firebase Auth settings

## Alternative: Use Local Backend (No Firebase)
If you prefer, you can use a WebSocket backend instead. Comment `hasFirebaseConfig` and I can set up a Node.js server with Socket.IO.
