// Builds kit/playbooks/<niche>.json and kit/sites/<niche>.json from tools/niches.mjs + the live accounts.
//   node kit/tools/make_playbooks.mjs <state.json> <live_fields.json>
// state.json       demo accounts (locationId + stages per niche)
// live_fields.json { "<niche>": [ { name, dataType, options } ] }  read from GHL by tools/fetch_fields.js
// Checks that every checklist stage exists in the live pipeline and every field key exists in the account.
import { readFileSync, writeFileSync } from 'node:fs';
import NICHES from './niches.mjs';

const [stateFile, liveFile] = process.argv.slice(2);
const state = JSON.parse(readFileSync(stateFile, 'utf8')).niches;
const live = JSON.parse(readFileSync(liveFile, 'utf8'));
const THEMES = {
  dental: ['#14B8A6', 'Dental'], roofing: ['#F97316', 'Roofing'], 'personal-injury': ['#8B5CF6', 'Personal Injury'],
  solar: ['#84CC16', 'Solar'], insurance: ['#3B82F6', 'Insurance'], 'collision-repair': ['#EF4444', 'Collision Repair'],
  hvac: ['#06B6D4', 'HVAC'], 'physical-therapy': ['#22C55E', 'Physical Therapy'],
};
const CTA = { call: '📞 Call', calendar: '📅 Book', note: '📝 Note', tag: '🏷 Tag', stage: '➡ Move', setfield: '✏ Set', navigate: '👁 View' };
const KIND = { SINGLE_OPTIONS: 'select', DATE: 'date' };
const slugId = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24);
let problems = 0;

for (const [niche, def] of Object.entries(NICHES)) {
  const acct = state[niche];
  if (!acct || !acct.locationId) { console.log(`skip ${niche}: no account yet`); continue; }
  const stages = (acct.stages || []).map(s => s.name);
  const lf = Object.fromEntries((live[niche] || []).map(f => [f.name, f]));
  const fields = {};
  for (const [key, name] of Object.entries(def.fields || {})) {
    const f = lf[name];
    if (!f) { console.warn(`! ${niche}: field "${name}" not in the account`); problems++; continue; }
    fields[key] = { name, kind: KIND[f.dataType] || 'text' };
    if (fields[key].kind === 'select') fields[key].options = f.options || [];
  }
  const checklists = {};
  for (const [stage, items] of Object.entries(def.checklists)) {
    if (!stages.includes(stage)) { console.warn(`! ${niche}: stage "${stage}" not in the live pipeline`); problems++; }
    checklists[stage] = items.map(([label, action, meta]) => {
      if (action === 'setfield' && !fields[meta.key]) { console.warn(`! ${niche}: "${label}" uses missing field key ${meta.key}`); problems++; }
      const it = { id: slugId(label), label, cta: CTA[action] || '👁 View', action };
      if (meta) it.meta = meta;
      return it;
    });
  }
  for (const s of stages) if (!checklists[s]) { console.warn(`! ${niche}: live stage "${s}" has no checklist`); problems++; }
  writeFileSync(`kit/playbooks/${niche}.json`, JSON.stringify({ stages, reasonField: '', reasons: [], fields, checklists }, null, 1) + '\n');
  const [accent, label] = THEMES[niche];
  const site = { slug: niche, name: `${label} Automation Pack`, brand: `${label} Pulse`, locations: [acct.locationId], theme: { accent },
    modules: ['skin', 'contrast', 'sidebar', 'pulse', 'board'], pulse: { checklistField: 'Pulse Checklist State', playbook: niche }, apiProxy: '' };
  writeFileSync(`kit/sites/${niche}.json`, JSON.stringify(site, null, 1) + '\n');
  console.log(`${niche}: ${stages.length} stages, ${Object.keys(checklists).length} checklists, ${Object.keys(fields).length} fields, ${accent}`);
}
console.log(problems ? `${problems} problem(s)` : 'all stages and fields matched');
