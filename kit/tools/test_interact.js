// Runs inside a Dental demo contact page (dev tool). 1) ticks the first checklist item and reads the contact back:
// the tick must be saved in "Pulse Checklist State". 2) switches the URL to the Roofing account without a reload:
// the engine must switch site and colour on its own.
const wait = ms => new Promise(r => setTimeout(r, ms));
function idbToken(){return new Promise(res=>{const rq=indexedDB.open('firebaseLocalStorageDb');rq.onsuccess=()=>{const a=rq.result.transaction('firebaseLocalStorage','readonly').objectStore('firebaseLocalStorage').getAll();a.onsuccess=()=>{const r=a.result.find(x=>x.value&&x.value.stsTokenManager);res(r&&r.value.stsTokenManager.accessToken)}};rq.onerror=()=>res(null)})}
const t0 = Date.now(); while (Date.now() - t0 < 30000 && !document.querySelector('#vd-pulse-banner .vdp-card')) await wait(500);
const out = {};
const contactId = location.pathname.match(/detail\/([^/?#]+)/)[1];
const card = document.querySelector('#vd-pulse-banner .vdp-card:not(.done)') || document.querySelector('#vd-pulse-banner .vdp-card');
out.item = card && card.innerText.split('\n')[0];
const box = card && (card.querySelector('.vdp-ck') || card);
const wasDone = card && card.classList.contains('done');
box && box.click();
await wait(4000);
out.uiDone = card && card.classList.contains('done');
const t = await idbToken();
const c = await (await fetch('https://services.leadconnectorhq.com/contacts/' + contactId, { headers: { 'token-id': t, Version: '2021-07-28', channel: 'APP', source: 'WEB_USER' } })).json();
const fid = BMW.fieldId('Pulse Checklist State');
const f = (c.contact.customFields || []).find(x => x.id === fid);
out.savedField = f ? String(f.value).slice(0, 160) : null;
out.toggled = wasDone !== out.uiDone;
// put it back the way it was
box && box.click(); await wait(2500);
// 2) SPA switch to Roofing
const before = { site: BMW.active().slug, accent: getComputedStyle(document.documentElement).getPropertyValue('--bmw-c-c9a35f') };
history.pushState({}, '', '/v2/location/Zx4ljALpEkPs1g0ryhq8/opportunities/list');
window.dispatchEvent(new Event('routeChangeEvent'));
const t1 = Date.now(); while (Date.now() - t1 < 15000 && !(window.BMW && BMW.active() && BMW.active().slug === 'roofing')) await wait(400);
out.switch = { before, after: { site: BMW.active() && BMW.active().slug, accent: getComputedStyle(document.documentElement).getPropertyValue('--bmw-c-c9a35f') } };
return out;
