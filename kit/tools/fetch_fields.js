// Runs INSIDE a signed-in GHL page (dev tool, e.g. through Token Vault exec). Reads the contact custom fields
// (name, type, dropdown options) of every location listed in window.__LOCS = { niche: locationId }.
function idbToken() {
  return new Promise(res => {
    const rq = indexedDB.open('firebaseLocalStorageDb');
    rq.onsuccess = () => { const all = rq.result.transaction('firebaseLocalStorage', 'readonly').objectStore('firebaseLocalStorage').getAll();
      all.onsuccess = () => { const row = all.result.find(r => r.value && r.value.stsTokenManager); res(row && row.value.stsTokenManager.accessToken); }; };
    rq.onerror = () => res(null);
  });
}
const t = await idbToken(), out = {};
for (const [niche, loc] of Object.entries(window.__LOCS || {})) {
  const r = await fetch(`https://services.leadconnectorhq.com/locations/${loc}/customFields?model=contact`, { headers: { 'token-id': t, Version: '2021-07-28', channel: 'APP', source: 'WEB_USER' } });
  const d = await r.json();
  out[niche] = (d.customFields || []).map(f => ({ name: f.name, dataType: f.dataType, options: f.picklistOptions || (f.options || []).map(o => o.label || o) }));
}
return out;
