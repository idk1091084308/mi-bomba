// Firebase Configuration
// Save your Firebase config here (get from Firebase Console)
// This file is loaded BEFORE the main game script

window.__firebase_config = {
    apiKey: "REPLACE_WITH_YOUR_API_KEY",
    authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN", 
    projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
    storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
    messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_ID",
    appId: "REPLACE_WITH_YOUR_APP_ID"
};

// Detect if config is valid (not placeholder values)
window.__hasValidFirebaseConfig = Object.values(window.__firebase_config).some(val => !val.includes('REPLACE'));

if (window.__hasValidFirebaseConfig) {
    console.log('✅ Firebase config loaded. Multiplayer will use Firebase.');
} else {
    console.log('⚠️ Firebase config not set. Multiplayer will use WebSocket (local server).');
}
