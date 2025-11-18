How to point the frontend to the backend (LAN)

1. Set the backend base URL in `client/.env`:

REACT_APP_API=http://<server-ip>:5000

Example:

REACT_APP_API=http://192.168.31.213:5000

2. Restart the React dev server so the env variable is picked up:

# stop `npm start` and run again
npm start

3. If you still see ERR_CONNECTION_REFUSED when posting from another device, ensure the server machine allows inbound connections on port 5000 (Windows Firewall rule) and that the server is listening on 0.0.0.0 (the current server binds to 0.0.0.0 in `server/app.js`).

PowerShell command (run as Administrator) to open port 5000:

New-NetFirewallRule -DisplayName "Allow Node 5000" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow

Notes:
- After changing `.env`, the React dev server must be restarted — env vars are baked into the build/dev server at start.
- If you prefer not to edit `.env`, you can open the frontend URL at the server IP (e.g. http://192.168.31.213:3000) — client code also falls back to `${window.location.hostname}:5000` when `REACT_APP_API` isn't set.
