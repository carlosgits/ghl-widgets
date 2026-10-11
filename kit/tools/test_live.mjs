// Live test of the widget kit through Token Vault (dev tool). For every site: open a contact that has an opportunity,
// wait for the loader, then assert the right site is active, its accent colour is applied, every module is mounted and
// the Pulse banner shows a checklist for the contact's stage. Finally opens a sub-account that is NOT in the kit and
// asserts everything is off.   node kit/tools/test_live.mjs [offLocationId]
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const TV = 'http://localhost:3847', S = 'ac2c0199-3709-49a8-a6bb-6ae81adc93fe';
const OFF = process.argv[2] || 'rYs2au5JAMWDyBxuqcul';          // Blue Mirai Systems sub-account (not a kit site)
const exec = async code => { const r = await fetch(`${TV}/exec/${S}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) }); return (await r.json()).value; };
const nav = url => fetch(`${TV}/navigate/${S}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const TOKEN = `function idbToken(){return new Promise(res=>{const rq=indexedDB.open('firebaseLocalStorageDb');rq.onsuccess=()=>{const a=rq.result.transaction('firebaseLocalStorage','readonly').objectStore('firebaseLocalStorage').getAll();a.onsuccess=()=>{const r=a.result.find(x=>x.value&&x.value.stsTokenManager);res(r&&r.value.stsTokenManager.accessToken)}};rq.onerror=()=>res(null)})}`;
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const hue = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return 0; let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return h * 60; };

const CHECK = `
const t0 = Date.now(); while (Date.now() - t0 < 30000 && !(window.BMW && document.getElementById('vd-pulse-banner') && document.getElementById('vd-tasks'))) await new Promise(r => setTimeout(r, 500));
const B = window.BMW, el = document.getElementById('vd-pulse-banner'), txt = el ? el.innerText : '';
return { active: B && B.active() && B.active().slug, accent: getComputedStyle(document.documentElement).getPropertyValue('--bmw-c-c9a35f'),
  skin: !!document.getElementById('bmw-skin-css'), board: !!document.getElementById('bmw-board-css'), sidebar: !!document.getElementById('vd-tasks'),
  banner: !!el, noChecklist: /No checklist defined/.test(txt), brand: (txt.match(/([A-Za-z ]+ Pulse) ·/) || [])[1] || null,
  stage: (txt.match(/📍 ([^\\n]+)/) || [])[1] || null, items: el ? el.querySelectorAll('.vdp-card').length : 0 };`;

const results = [];
for (const f of readdirSync('kit/sites').filter(f => f.endsWith('.json'))) {
  const site = JSON.parse(readFileSync('kit/sites/' + f, 'utf8')), loc = site.locations[0];
  const opp = await exec(`${TOKEN}; const t = await idbToken(); const H = { 'token-id': t, Version: '2021-07-28', channel: 'APP', source: 'WEB_USER' }; const pl = await (await fetch('https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${loc}', { headers: H })).json(); const sales = (pl.pipelines || []).find(p => /sales/i.test(p.name)); const r = await fetch('https://services.leadconnectorhq.com/opportunities/search?location_id=${loc}&status=open&limit=40' + (sales ? '&pipeline_id=' + sales.id : ''), { headers: H }); const d = await r.json(); const os = (d.opportunities || []).filter(x => x.contactId && !/test/i.test(x.name || '')); const o = os[Math.floor(os.length / 2)]; return o ? o.contactId : null;`);
  if (!opp) { results.push({ site: site.slug, ok: false, why: 'no contact with an opportunity' }); continue; }
  await nav(`https://app.gohighlevel.com/v2/location/${loc}/contacts/detail/${opp}`); await sleep(3000);
  const r = await exec(CHECK);
  const acc = (r.accent || '').match(/\d+/g)?.map(Number);
  const hueOk = acc && Math.abs(((hue(acc) - hue(hexRgb(site.theme.accent)) + 540) % 360) - 180) < 12;
  const ok = r.active === site.slug && hueOk && r.skin && r.board && r.sidebar && r.banner && !r.noChecklist && r.items > 0 && r.brand === site.brand;
  results.push({ site: site.slug, ok, stage: r.stage, items: r.items, brand: r.brand, accent: r.accent, hueOk, modules: { skin: r.skin, board: r.board, sidebar: r.sidebar, banner: r.banner } });
  console.log(ok ? 'PASS' : 'FAIL', site.slug.padEnd(17), 'stage:', r.stage, '| items', r.items, '| accent', r.accent, '| brand', r.brand);
}
await nav(`https://app.gohighlevel.com/v2/location/${OFF}/contacts/smart_list/All`); await sleep(9000);
const off = await exec(`return { active: !!(window.BMW && window.BMW.active()), skin: !!document.getElementById('bmw-skin-css'), board: !!document.getElementById('bmw-board-css'), sidebar: !!document.getElementById('vd-tasks'), accentVar: getComputedStyle(document.documentElement).getPropertyValue('--bmw-c-c9a35f') };`);
const offOk = !off.active && !off.skin && !off.board && !off.sidebar && !off.accentVar;
console.log(offOk ? 'PASS' : 'FAIL', 'off-site'.padEnd(17), JSON.stringify(off));
results.push({ site: 'off:' + OFF, ok: offOk, off });
writeFileSync('kit/tools/test_live_result.json', JSON.stringify({ at: new Date().toISOString(), results }, null, 1));
console.log(results.filter(r => r.ok).length + '/' + results.length + ' passed');
