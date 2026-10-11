// Builds the widget kit.  node kit/build.mjs            (from the widgets repo root)
//   dist/bmw-core.js                 engine + all modules (same file for every account)
//   dist/sites/<slug>.js             one site config (theme, locations, playbook inlined)
//   dist/standalone/<slug>.js        site + engine in ONE file, to paste into any agency's Custom JS
// and points manifest.json (used by the agency loader) at core + site for every location of every site.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const K = 'kit/';
const ORDER = ['skin', 'contrast', 'sidebar', 'pulse', 'board'];
const palette = JSON.parse(readFileSync(K + 'src/palette.json', 'utf8'));
let version = 'dev';
try { version = execSync('git rev-parse --short=12 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch (e) {}

const core = readFileSync(K + 'src/core.js', 'utf8')
  .replace('__PALETTE__', JSON.stringify(palette))
  .replace('__VERSION__', version);
const modules = ORDER.map(m => readFileSync(`${K}src/modules/${m}.js`, 'utf8')).join('\n\n');
const coreOut = `/* BMW widget engine ${version} - white-label GHL widgets. Docs: kit/README.md */\n${core}\n\n${modules}\n`;
for (const bad of [/pit-[0-9a-f-]{20,}/i, /vantage|francisco|elevated financial|arive\b/i]) if (bad.test(coreOut)) throw new Error('engine contains ' + bad);

mkdirSync(K + 'dist/sites', { recursive: true }); mkdirSync(K + 'dist/standalone', { recursive: true });
writeFileSync(K + 'dist/bmw-core.js', coreOut);

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
manifest.locations = manifest.locations || {};
const built = [];
for (const f of readdirSync(K + 'sites').filter(f => f.endsWith('.json'))) {
  const site = JSON.parse(readFileSync(K + 'sites/' + f, 'utf8'));
  if (site.pulse && typeof site.pulse.playbook === 'string') {
    const pb = `${K}playbooks/${site.pulse.playbook}.json`;
    if (!existsSync(pb)) throw new Error(`${f}: playbook ${site.pulse.playbook} not found`);
    site.pulse.playbook = JSON.parse(readFileSync(pb, 'utf8'));
  }
  if (!/^#[0-9a-f]{6}$/i.test(site.theme?.accent || '')) throw new Error(`${f}: theme.accent must be #RRGGBB`);
  const js = `/* BMW site: ${site.name} */\n(window.BMW_SITES = window.BMW_SITES || []).push(${JSON.stringify(site)});\n`;
  writeFileSync(`${K}dist/sites/${site.slug}.js`, js);
  writeFileSync(`${K}dist/standalone/${site.slug}.js`, js + '\n' + coreOut);
  for (const loc of site.locations || []) manifest.locations[loc] = [`kit/dist/sites/${site.slug}.js`, 'kit/dist/bmw-core.js'];
  built.push(`${site.slug} (${(site.locations || []).length} loc, ${site.theme.accent})`);
}
writeFileSync('manifest.json', JSON.stringify(manifest, null, 1) + '\n');
console.log('engine', (coreOut.length / 1024).toFixed(0) + ' KB', version, '| sites:', built.join(', '));
