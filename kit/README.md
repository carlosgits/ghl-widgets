# Pulse widget kit for GoHighLevel

White-label widgets that restyle a GHL sub-account and add a sales cockpit to every contact:

| Module | What it does |
|---|---|
| `skin` | Dark sidebar and contact panel in the site's accent colour |
| `contrast` | Safety net that fixes any light-on-light or dark-on-dark text GHL renders in the contact panel |
| `sidebar` | Hides Payments and adds "Power Dialer" (manual call queue) and "Tasks" items |
| `pulse` | Pulse banner on the contact page: pipeline stepper, days in stage, a checklist per stage, quick actions and a "Move stage" button |
| `board` | Restyled Opportunities board (cards, columns, totals) in the accent colour |

One engine (`dist/bmw-core.js`) serves every account. What changes per account is a **site config**: which
sub-account(s), which colour, which modules and which playbook (pipeline stages and their checklists).
Switching sub-accounts in GHL switches colour and playbook live; accounts without a site get nothing.

## No keys, no server

The widgets call the GHL API with the session of the user who is signed in (the same token the GHL app itself
uses). Nothing secret is stored in the browser or in these files, and each user only reaches what their own GHL
permissions allow. If you prefer a server-side proxy, set `apiProxy` in the site (it receives `?path=<GHL path>`).

## Install in any agency (single paste)

1. Build: `node kit/build.mjs` (Node 18+). It creates `kit/dist/standalone/<slug>.js`.
2. Host that file anywhere public (GitHub + jsDelivr works: `https://cdn.jsdelivr.net/gh/<user>/<repo>@<commit>/kit/dist/standalone/<slug>.js`).
3. GHL > Agency Settings > Company > Custom JavaScript: `<script src="<that URL>"></script>`
4. In the sub-account create a contact field (Large Text) named exactly **Pulse Checklist State** so checklists are
   shared by the whole team (without it, checklists are saved in each browser).

Several sub-accounts: list them all in one site (`locations`), or make one site per account and load several site
files plus `dist/bmw-core.js` once (that is what the agency loader in this repo does with `manifest.json`).

## Make a new site

`kit/sites/<slug>.json`:

```json
{
 "slug": "dental",
 "name": "Dental Automation Pack",
 "brand": "Dental Pulse",
 "locations": ["<sub-account id>"],
 "theme": { "accent": "#14B8A6" },
 "modules": ["skin", "contrast", "sidebar", "pulse", "board"],
 "pulse": { "checklistField": "Pulse Checklist State", "playbook": "dental" },
 "apiProxy": ""
}
```

- `theme.accent` is the only colour you choose. The engine re-tints the whole design from it and keeps every
  lightness value, so contrast stays the same as the original. Optional: `theme.lightness` (-0.1 to 0.1) and
  `theme.vars` to override single variables.
- `modules` can drop any module you do not want.
- `pulse.playbook` names a file in `kit/playbooks/`.

## Playbooks

`kit/playbooks/<name>.json`:

```json
{
 "stages": ["New Inquiry", "Attempting Contact", "..."],
 "reasonField": "",
 "reasons": [],
 "fields": { "insurance": { "name": "Insurance Provider", "kind": "select", "options": ["Delta", "Cigna"] } },
 "checklists": {
   "New Inquiry": [ { "id": "call", "label": "Call within 5 minutes", "cta": "📞 Call", "action": "call" } ]
 }
}
```

- `checklists` keys are the **exact stage names** of the pipeline in GHL.
- Fields are referenced by their **GHL field name**, never by id, so one playbook works in any account.
- Item actions: `call`, `note`, `tag`, `calendar`, `navigate`, `stage`, `reason`, `field`,
  `setfield` (with `meta: { key: "<fields key>" }`).
- `stages` is only a fallback; the live pipeline is read from GHL.

## Files

```
kit/src/core.js          engine (site detection, theme, session auth, field lookup)
kit/src/modules/*.js     the five modules
kit/src/palette.json     reference colours the theme re-tints
kit/sites/*.json         one per site
kit/playbooks/*.json     one per niche
kit/build.mjs            builds kit/dist and updates manifest.json
kit/tools/migrate.mjs    one-time migration from the original bundle (kept for reference)
```
