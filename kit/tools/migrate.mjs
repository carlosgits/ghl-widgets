// One-time migration: turns the Mortgage Brokers demo bundle (locations/<loc>/widgets.js) into the portable kit sources.
//   - splits it into modules (skin, contrast, sidebar, pulse, board)
//   - every gold-family colour literal becomes a theme variable: #E8C77A -> var(--bmw-c-e8c77a),
//     rgba(201,163,95,.3) -> rgba(var(--bmw-rgb-c9a35f),.3). core.js recolours those variables per site at runtime.
//   - location guards become BMW.active() (the engine decides which site, if any, owns the current sub-account)
//   - the Pulse banner's mortgage data (stages, checklists, fields, reasons) moves to playbooks/mortgage.json
// Run once from the widgets folder: node kit/tools/migrate.mjs. After this, edit kit/src by hand.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const SRC = readFileSync('locations/XspbsMlB3DWwt3sKLgUr/widgets.js', 'utf8');
const DEMO = 'XspbsMlB3DWwt3sKLgUr';
const cut = (a, b) => { const i = SRC.indexOf(a), j = b ? SRC.indexOf(b, i + 1) : SRC.length; if (i < 0 || j < 0) throw new Error('marker ' + a); return SRC.slice(i, j).trim(); };
let parts = {
  skin: cut('/* ===== PART 0 - UI SKIN', '/* ===== PART 0B'),
  contrast: cut('/* ===== PART 0B', '/* ===== PART 0C'),
  sidebar: cut('/* ===== PART 0C', '/* ===== PART 2'),
  pulse: cut('/* ===== PART 2', '/* ===== PART CSS'),
  board: cut('/* ===== PART CSS'),
};

// ---------- colours ----------
const hex6 = h => { h = h.replace('#', '').toLowerCase(); return h.length === 3 ? h.split('').map(c => c + c).join('') : h; };
const toHsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; };
const isGold = (r, g, b) => { const [h, s, l] = toHsl(r, g, b); return h >= 25 && h <= 60 && s >= 0.2 && l > 0.08 && l < 0.985; };
const palette = new Set();
function recolor(js) {
  js = js.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*[\d.]+\s*)?\)/g, (m, r, g, b, a) => {
    if (!isGold(+r, +g, +b)) return m;
    const h = [r, g, b].map(v => (+v).toString(16).padStart(2, '0')).join(''); palette.add(h);
    return a ? `rgba(var(--bmw-rgb-${h})${a.replace(/\s+/g, '')})` : `var(--bmw-c-${h})`;
  });
  js = js.replace(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g, (m, h) => {
    const x = hex6(h), r = parseInt(x.slice(0, 2), 16), g = parseInt(x.slice(2, 4), 16), b = parseInt(x.slice(4, 6), 16);
    if (!isGold(r, g, b)) return m;
    palette.add(x); return `var(--bmw-c-${x})`;
  });
  return js;
}

// ---------- skin ----------
parts.skin = parts.skin
  .replace("var on=location.pathname.indexOf('/location/" + DEMO + "')!==-1", 'var on=!!(window.BMW&&BMW.active()&&BMW.on("skin"))')
  .replace(/id='mb-skin-css'/g, "id='bmw-skin-css'").replace(/'mb-skin-css'/g, "'bmw-skin-css'")
  .replace('inj(); setInterval(inj,3000);', 'inj(); setInterval(inj,1500); window.addEventListener("bmw:change", inj);')
  .replace(/MB — UI SKIN: BLACK \+ GOLD/, 'UI SKIN (dark + accent colour of the active site)');

// ---------- contrast ----------
parts.contrast = parts.contrast
  .replace(/, LOC = "[A-Za-z0-9]+";/, ';')
  .replace('if (curLoc() !== LOC) return;', 'if (!(window.BMW && BMW.active() && BMW.on("contrast"))) return;');

// ---------- sidebar ----------
parts.sidebar = parts.sidebar
  .replace(/\n  var LOC = "[A-Za-z0-9]+";/, '')
  .replace(/"https:\/\/app\.gohighlevel\.com\/v2\/location\/" \+ LOC \+ "/g, '"/v2/location/{loc}')
  .replace('location.assign(item.url);', 'location.assign(item.url.replace("{loc}", curLoc()));')
  .replace(`(function () { if (document.getElementById("vd-sb-css")) return;`, `function sbCss(on) { var ex = document.getElementById("vd-sb-css"); if (!on) { if (ex) ex.remove(); return; } if (ex) return;`)
  .replace(/\(document\.head \|\| document\.documentElement\)\.appendChild\(s\); \}\)\(\);/, '(document.head || document.documentElement).appendChild(s); }')
  .replace('    if (curLoc() !== LOC) return;', `    var on = !!(window.BMW && BMW.active() && BMW.on("sidebar"));
    sbCss(on);
    if (!on) { for (var k = 0; k < SB_ITEMS.length; k++) { var x = document.getElementById(SB_ITEMS[k].id); if (x) x.remove(); } var p = document.getElementById("sb_payments"); if (p) p.style.removeProperty("display"); return; }`);
if (!parts.sidebar.includes('function sbCss(on)') || !parts.sidebar.includes('sbCss(on);')) throw new Error('sidebar rewrite failed');

// ---------- pulse banner ----------
let P = parts.pulse;
const dataStart = P.indexOf('  /* ── Pipeline fallback');
const dataEnd = P.indexOf('  /* ── Helpers');
if (dataStart < 0 || dataEnd < 0) throw new Error('pulse data block');
const dataBlock = P.slice(dataStart, dataEnd);
// evaluate the data block to export the mortgage playbook (field ids are dropped: fields resolve by NAME at runtime)
const ctx = {}; vm.createContext(ctx); vm.runInContext(dataBlock.replace(/\bvar\s+/g, 'this.'), ctx);
const fields = {}; for (const [k, f] of Object.entries(ctx.FIELDS)) { const o = { name: f.name, kind: f.kind }; if (f.options) o.options = f.options; fields[k] = o; }
const reasonKey = Object.entries(ctx.FIELDS).find(([, f]) => f.id === ctx.REASON_FIELD)?.[0] || '';
const playbook = { stages: ctx.SALES_STAGES, reasonField: reasonKey ? ctx.FIELDS[reasonKey].name : '', reasons: ctx.REASONS, fields, checklists: ctx.CHECKLISTS };
P = P.slice(0, dataStart) + `  /* ── Playbook of the ACTIVE site (stages, checklists, fields, reasons): comes from the site config, never hardcoded.
     Field ids are resolved by field NAME for the current sub-account by core.js, so one playbook works in any account. */
  function PB() { var s = window.BMW && BMW.active(); return (s && s.pulse && s.pulse.playbook) || { stages: [], reasons: [], fields: {}, checklists: {} }; }
  function FIELD(key) { var f = PB().fields[key]; return f ? Object.assign({}, f, { id: BMW.fieldId(f.name) }) : null; }

` + P.slice(dataEnd);
// identifiers -> accessors
P = P.replace(/\bSALES_STAGES\b/g, 'PB().stages')
  .replace(/\bCHECKLISTS\b/g, 'PB().checklists')
  .replace(/\bREASONS\b/g, 'PB().reasons')
  .replace(/\bREASON_FIELD\b/g, 'BMW.fieldId(PB().reasonField)')
  .replace(/\bFIELDS\[([^\]]+)\]/g, 'FIELD($1)')
  .replace(/\bFIELDS\b/g, 'PB().fields');
// CONFIG -> active site
const cfgStart = P.indexOf('  var CONFIG = {'), cfgEnd = P.indexOf('};', cfgStart) + 2;
P = P.slice(0, cfgStart) + `  /* Config comes from the active site (see kit/sites/*.js). Nothing account-specific lives in this file. */
  var CONFIG = {
    get locationId() { var s = window.BMW && BMW.active(); return s ? BMW.loc() : null; },
    get checklistFieldId() { var s = window.BMW && BMW.active(); return s ? BMW.fieldId((s.pulse && s.pulse.checklistField) || "Pulse Checklist State") : ""; },
    webhookUrl: "",
  };` + P.slice(cfgEnd);
// api() -> engine
const apiStart = P.indexOf('  function api(path, opts) {'), apiEnd = P.indexOf('\n  }\n', apiStart) + 4;
P = P.slice(0, apiStart) + '  function api(path, opts) { return BMW.api(path, opts); }   // signed-in user session, or the site\'s optional proxy\n' + P.slice(apiEnd);
P = P.replace('if (getLocationId() !== CONFIG.locationId || !onContactPage())', 'if (!(window.BMW && BMW.active() && BMW.on("pulse")) || !onContactPage())')
  .replace("'<div class=\"vdp-foot\">MB Dashboard · Pulse v0.1 · '", "'<div class=\"vdp-foot\">' + esc(BMW.brand()) + ' · '")
  .replace(/window\.__mbPulseLoaded/g, 'window.__bmwPulseLoaded')
  .replace('var LS_KEY = "mb_pulse_state_v1";', 'var LS_KEY = "bmw_pulse_state_v1";')
  .replace(/MB — Pulse Banner v0\.1  \(BLACK \+ GOLD\)/, 'Pulse Banner (accent colour of the active site)')
  // an SVG presentation attribute does not take var(); use the style property instead
  .replace(/stop-color="' \+ GOLD_L \+ '"/, `style="stop-color:' + GOLD_L + '"`).replace(/stop-color="' \+ GOLD \+ '"/, `style="stop-color:' + GOLD + '"`);
for (const bad of ['CONFIG.apiProxy', 'CONFIG.ghlPit', 'apiProxy:', DEMO]) if (P.includes(bad)) console.warn('pulse still contains', bad);
parts.pulse = P;

// ---------- board (agency CSS) ----------
parts.board = parts.board
  .replace(`var on = location.pathname.indexOf('/location/${DEMO}') !== -1, ex = document.getElementById('mb-agency-css');`,
    `var on = !!(window.BMW && BMW.active() && BMW.on("board")), ex = document.getElementById('bmw-board-css');`)
  .replace("s.id = 'mb-agency-css'", "s.id = 'bmw-board-css'")
  .replace('apply(); setInterval(apply, 2000);', 'apply(); setInterval(apply, 1500); window.addEventListener("bmw:change", apply);')
  .replace('PART CSS - AGENCY CSS (opportunities board + sidebar), demo sub-account only', 'BOARD - Opportunities board + sidebar CSS (active site only)');

// ---------- write ----------
mkdirSync('kit/src/modules', { recursive: true }); mkdirSync('kit/playbooks', { recursive: true });
for (const [k, v] of Object.entries(parts)) {
  const out = recolor(v).replace(/\bMB\b/g, 'the team').replace(/Mortgage Brokers/g, 'the team');
  if (out.includes(DEMO)) throw new Error(k + ' still has the demo location id');
  writeFileSync(`kit/src/modules/${k}.js`, out + '\n');
}
const ref = 'c9a35f';
writeFileSync('kit/src/palette.json', JSON.stringify({ reference: ref, colors: [...palette].sort() }, null, 1));
writeFileSync('kit/playbooks/mortgage.json', JSON.stringify(playbook, null, 1));
console.log('modules', Object.keys(parts).join(','), '| palette', palette.size, '| stages', playbook.stages.length, '| checklists', Object.keys(playbook.checklists).length, '| fields', Object.keys(fields).length, '| reasonField', playbook.reasonField);
