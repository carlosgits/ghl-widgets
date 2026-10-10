# ghl-widgets
Per-sub-account widgets for GHL, loaded by one agency-level stub (`loader.js`).
Add a sub-account: put its files under `locations/<locationId>/` and list them in `manifest.json`.
After a push, purge the CDN: `https://purge.jsdelivr.net/gh/carlosgits/ghl-widgets@main/<file>`.
No tokens or keys live here: data calls go through a server-side proxy.
