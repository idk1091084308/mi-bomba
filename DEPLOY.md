# 🌐 Deploy Neon Drifter Publicly

## Option 1: Railway (Easiest - 2 minutes)

### Step 1: Push to GitHub
```bash
cd /workspaces/mi-bomba
git add .
git commit -m "Add multiplayer WebSocket support"
git push origin main
```

### Step 2: Deploy on Railway
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select `idk1091084308/mi-bomba`
4. Railway auto-detects `package.json` and deploys!
5. You'll get a public URL like: `https://neon-drifter-prod.railway.app`

### Step 3: Share the URL
- Send the Railway URL to friends
- They can play multiplayer immediately!

**Cost**: Free tier with 500 compute hours/month (plenty for a game)

---

## Option 2: Vercel (Database Free)

1. Go to https://vercel.com/new
2. Import GitHub repo
3. Framework: Other
4. Build: `npm install`
5. Start: `node server.js`
6. Deploy!

---

## Option 3: Render (Easy Alternative)

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Choose Free tier
7. Deploy!

---

## Option 4: Manual Port Forward (Advanced)

If you have a home server or static IP:

1. **Open port on router:**
   - Login to `192.168.1.1` or `192.168.0.1`
   - Find "Port Forwarding"
   - Forward external port 3000 → internal machine:3000

2. **Update game client (index.html):**
   ```javascript
   const WEBSOCKET_URL = 'https://your-ip-or-domain.com:3000';
   ```

3. **Share URL:** `https://your-ip-or-domain.com:3000`

⚠️ **Warning**: This exposes your network. Use HTTPS and firewall rules.

---

## Quick Test Remote Access

If Railway is deploying, test it with:
```bash
curl https://neon-drifter-prod.railway.app
```

Should return the `index.html` content.

---

## Performance Tips

- Railway auto-scales for multiple players
- Socket.IO handles 100+ concurrent players
- Add a `.env` file for config:
  ```
  PORT=3000
  NODE_ENV=production
  ```

---

**Recommended: Use Railway - fastest & most reliable! ⚡**
