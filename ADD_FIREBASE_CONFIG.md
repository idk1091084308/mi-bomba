# 🚀 Add Your Firebase Config (2 minutes)

## Step 1: Get Your Firebase Config

1. Go to https://console.firebase.google.com
2. Select your project `neon-drifter` (or create one)
3. Click **Project Settings** (⚙️ icon, top left)
4. Go to **"Your apps"** section
5. Click the **Web app** (looks like `</>`)
6. You'll see your config. Copy the values:

```javascript
{
  apiKey: "AIzaSyB...",
  authDomain: "neon-drifter-123.firebaseapp.com",
  projectId: "neon-drifter-123",
  storageBucket: "neon-drifter-123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
}
```

## Step 2: Add Config to Game

Edit `/workspaces/mi-bomba/firebase-config.js`:

Replace each `REPLACE_WITH_...` with your actual values:

```javascript
window.__firebase_config = {
    apiKey: "AIzaSyB...",                              // Your API Key
    authDomain: "neon-drifter-123.firebaseapp.com",  // Your Auth Domain
    projectId: "neon-drifter-123",                    // Your Project ID
    storageBucket: "neon-drifter-123.appspot.com",   // Your Storage Bucket
    messagingSenderId: "123456789",                   // Your Messaging ID
    appId: "1:123456789:web:abc..."                   // Your App ID
};
```

## Step 3: Test It

1. Refresh the game at http://localhost:3000
2. Open browser **Console** (F12)
3. You should see:
   ```
   ✅ Firebase config loaded. Multiplayer will use Firebase.
   ✅ Firebase user: abc123xyz...
   ```

4. Try multiplayer:
   - Click "Online Multiplayer"
   - Create a room
   - Open another browser tab and join the room
   - Start game together! 🏁

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Still says "No Firebase config" | Make sure you saved `firebase-config.js` with real values (no `REPLACE_` text) |
| Auth errors | In Firebase Console → Authentication → Enable "Anonymous" |
| Players don't appear in rooms | Check Firebase Console → Firestore → Collections for room data |
| "Permission denied" errors | Update Firestore Rules to allow read/write |

## Simple Firestore Rules (Test Mode)

Go to Firebase Console → Firestore → Rules:

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

---

**Done! Your game now has Firebase multiplayer! 🎮✨**
