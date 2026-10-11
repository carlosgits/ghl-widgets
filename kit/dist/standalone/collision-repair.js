/* BMW site: Collision Repair Automation Pack */
(window.BMW_SITES = window.BMW_SITES || []).push({"slug":"collision-repair","name":"Collision Repair Automation Pack","brand":"Collision Repair Pulse","locations":["TZ1SAOcaVXuobLjRGLIW"],"theme":{"accent":"#EF4444"},"modules":["skin","contrast","sidebar","pulse","board"],"pulse":{"checklistField":"Pulse Checklist State","playbook":{"stages":["New Inquiry","Attempting Contact","Estimate Booked","Estimate Completed","Insurance Claim Filed","Insurance Approval","Parts Ordered","In Repair","Quality Check","Ready for Pickup","Delivered","Lost"],"reasonField":"","reasons":[],"fields":{"carrier":{"name":"Insurance Carrier","kind":"select","options":["GEICO","State Farm","Progressive","Allstate","USAA","Customer Pay"]},"drivable":{"name":"Vehicle Drivable","kind":"select","options":["Yes","No"]},"rental":{"name":"Rental Needed","kind":"select","options":["Yes","No"]},"area":{"name":"Damage Area","kind":"select","options":["Front End","Rear End","Driver Side","Passenger Side","Hail Damage","Multiple Areas"]},"eta":{"name":"Estimated Completion Date","kind":"date"}},"checklists":{"New Inquiry":[{"id":"call-within-5-minutes-sp","label":"Call within 5 minutes (speed to lead)","cta":"📞 Call","action":"call"},{"id":"is-the-vehicle-drivable","label":"Is the vehicle drivable?","cta":"✏ Set","action":"setfield","meta":{"key":"drivable"}},{"id":"set-the-damage-area","label":"Set the damage area","cta":"✏ Set","action":"setfield","meta":{"key":"area"}}],"Attempting Contact":[{"id":"call-attempt-log-the-res","label":"Call attempt + log the result","cta":"📞 Call","action":"call"},{"id":"text-the-estimate-bookin","label":"Text the estimate booking link","cta":"📝 Note","action":"note","meta":{"template":"Text sent: "}},{"id":"after-6-tries-with-no-an","label":"After 6 tries with no answer, move to Lost","cta":"➡ Move","action":"stage"}],"Estimate Booked":[{"id":"confirm-the-estimate-tim","label":"Confirm the estimate time","cta":"📅 Book","action":"calendar"},{"id":"set-the-insurance-carrie","label":"Set the insurance carrier","cta":"✏ Set","action":"setfield","meta":{"key":"carrier"}}],"Estimate Completed":[{"id":"send-the-estimate","label":"Send the estimate","cta":"📝 Note","action":"note","meta":{"template":"Estimate: "}},{"id":"does-the-customer-need-a","label":"Does the customer need a rental?","cta":"✏ Set","action":"setfield","meta":{"key":"rental"}}],"Insurance Claim Filed":[{"id":"log-the-claim-number","label":"Log the claim number","cta":"📝 Note","action":"note","meta":{"template":"Claim #: "}},{"id":"call-the-adjuster","label":"Call the adjuster","cta":"📞 Call","action":"call"}],"Insurance Approval":[{"id":"note-the-approved-amount","label":"Note the approved amount","cta":"📝 Note","action":"note","meta":{"template":"Approved: "}},{"id":"book-the-drop-off","label":"Book the drop-off","cta":"📅 Book","action":"calendar"}],"Parts Ordered":[{"id":"log-the-parts-eta","label":"Log the parts ETA","cta":"📝 Note","action":"note","meta":{"template":"Parts ETA: "}},{"id":"set-the-estimated-comple","label":"Set the estimated completion date","cta":"✏ Set","action":"setfield","meta":{"key":"eta","quick":true}}],"In Repair":[{"id":"send-a-progress-update","label":"Send a progress update","cta":"📝 Note","action":"note","meta":{"template":"Update: "}},{"id":"text-a-photo-of-the-repa","label":"Text a photo of the repair","cta":"📝 Note","action":"note","meta":{"template":"Photo sent: "}}],"Quality Check":[{"id":"final-inspection-done","label":"Final inspection done","cta":"📝 Note","action":"note","meta":{"template":"QC: "}},{"id":"move-to-ready-for-pickup","label":"Move to Ready for Pickup","cta":"➡ Move","action":"stage"}],"Ready for Pickup":[{"id":"call-to-schedule-pickup","label":"Call to schedule pickup","cta":"📞 Call","action":"call"},{"id":"collect-the-deductible","label":"Collect the deductible","cta":"📝 Note","action":"note","meta":{"template":"Deductible: "}}],"Delivered":[{"id":"ask-for-a-google-review","label":"Ask for a Google review","cta":"🏷 Tag","action":"tag","meta":{"tag":"review request"}},{"id":"ask-for-referrals","label":"Ask for referrals","cta":"🏷 Tag","action":"tag","meta":{"tag":"referral ask"}}],"Lost":[{"id":"pick-the-lost-reason-and","label":"Pick the lost reason and tag it","cta":"🏷 Tag","action":"tag","meta":{"tag":"lost reason"}},{"id":"confirm-the-contact-left","label":"Confirm the contact left every active drip","cta":"👁 View","action":"navigate"},{"id":"add-to-long-term-nurture","label":"Add to long-term nurture if the door is still open","cta":"📝 Note","action":"note","meta":{"template":"Nurture note: "}}]}}},"apiProxy":""});

/* BMW widget engine df1c540098d7 - white-label GHL widgets. Docs: kit/README.md */
/* BMW widget engine (white-label). One file for every sub-account; what changes per account is a SITE config.

   A site is a plain object pushed onto window.BMW_SITES (see kit/sites/*.json and kit/README.md):
     { slug, name, brand, locations: ["<locationId>", ...], theme: { accent: "#14B8A6" },
       modules: ["skin","contrast","sidebar","pulse","board"],          // optional, default = all
       pulse: { checklistField: "Pulse Checklist State", playbook: {...} },
       apiProxy: "" }                                                    // optional server-side proxy

   The engine watches the URL. When the current sub-account belongs to a site it applies that site's colours
   (CSS variables) and turns its modules on; on any other sub-account everything turns itself off.
   API calls use the signed-in GHL user's own session, so no key is ever stored in the browser. */
(function () {
  "use strict";
  if (window.BMW && window.BMW.__core) return;

  var PALETTE = {"reference":"c9a35f","colors":["34250c","342711","352811","373124","3b2a0e","3c2d12","423623","463217","58411d","5a411b","5a421b","684c20","6a5229","73664a","79541b","7c5715","7e5a23","866324","8b641e","8d7444","916720","916917","93712f","97702d","987024","a17932","a37d34","a77b25","b8892d","b88a3a","bc8d36","bf923c","c3a16a","c6bc9f","c9a35f","cabfa9","cdbb8f","cea75a","cfad6c","d2a744","d4ccbb","d6cab5","d6cebd","d7d1c3","d8b77a","d9b978","d9d0bf","daba70","e0b55a","e1d3b5","e3c36f","e7ca82","e8c06a","e8c77a","e9e3d5","ecdbb6","edcc7d","edd18b","eed18d","f0d394","f1d183","f2d89b","f2f0e9","f4df9d","f4e4c2","f5dfa2","f7e2a2","f8dfa0","f9f7f1","fbfaf6","ffe9a9","fff0b9","fff0bf","fff1b7","fff2bd","fff3c9","fff5ca","fff5d6","fff6d0","fff9e8","fffaf0","fffdf6"]};            // reference colours of the modules (the design was drawn in gold)
  var REF = PALETTE.reference;
  var ALL_MODULES = ["skin", "contrast", "sidebar", "pulse", "board"];
  var cur = { loc: null, site: null }, fieldCache = {}, fieldLoading = {}, tok = { v: null, t: 0 };

  function sites() { return window.BMW_SITES || []; }
  function locFromUrl() { var m = location.pathname.match(/\/location\/([A-Za-z0-9]+)/); return m ? m[1] : null; }

  /* ---------- colour ---------- */
  function hexRgb(h) { h = h.replace("#", ""); if (h.length === 3) h = h.replace(/./g, "$&$&"); return [0, 2, 4].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); }
  function rgbHsl(c) {
    var r = c[0] / 255, g = c[1] / 255, b = c[2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), h = 0, s = 0, l = (mx + mn) / 2, d = mx - mn;
    if (d) { s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
    return [h, s, l];
  }
  function hslRgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360;
    if (!s) return [l, l, l].map(function (v) { return Math.round(v * 255); });
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    function f(t) { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }
    return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(function (v) { return Math.round(v * 255); });
  }
  /* Every reference colour keeps its lightness (so contrast on the dark skin never changes) and takes the hue and,
     proportionally, the saturation of the site's accent. accent = the reference gives back the original design. */
  function themeVars(theme) {
    var acc = rgbHsl(hexRgb((theme && theme.accent) || "#" + REF)), ref = rgbHsl(hexRgb(REF)), out = {};
    var sat = ref[1] ? acc[1] / ref[1] : 1, shift = (theme && theme.lightness) || 0;
    PALETTE.colors.forEach(function (hex) {
      var c = rgbHsl(hexRgb(hex)), rgb = hslRgb(c[0] - ref[0] + acc[0], Math.max(0, Math.min(1, c[1] * sat)), Math.max(0, Math.min(1, c[2] + shift)));
      out["--bmw-c-" + hex] = "rgb(" + rgb.join(",") + ")";
      out["--bmw-rgb-" + hex] = rgb.join(",");
    });
    if (theme && theme.vars) for (var k in theme.vars) out[k] = theme.vars[k];
    return out;
  }
  var applied = [];
  function applyTheme(site) {
    var st = document.documentElement.style;
    applied.forEach(function (k) { st.removeProperty(k); }); applied = [];
    if (!site) return;
    var v = themeVars(site.theme); for (var k in v) { st.setProperty(k, v[k]); applied.push(k); }
  }

  /* ---------- session auth ---------- */
  function sessionToken() {
    if (tok.v && Date.now() - tok.t < 4 * 60 * 1000) return Promise.resolve(tok.v);
    return new Promise(function (res) {
      var rq; try { rq = indexedDB.open("firebaseLocalStorageDb"); } catch (e) { return res(null); }
      rq.onerror = function () { res(null); };
      rq.onsuccess = function () {
        try {
          var all = rq.result.transaction("firebaseLocalStorage", "readonly").objectStore("firebaseLocalStorage").getAll();
          all.onsuccess = function () {
            var row = (all.result || []).filter(function (r) { return r && r.value && r.value.stsTokenManager; })[0];
            tok = { v: row ? row.value.stsTokenManager.accessToken : null, t: Date.now() }; res(tok.v);
          };
          all.onerror = function () { res(null); };
        } catch (e) { res(null); }
      };
    });
  }
  function api(path, opts) {
    var site = cur.site; opts = opts || {};
    if (site && site.apiProxy) return fetch(site.apiProxy + "?path=" + encodeURIComponent(path), Object.assign({ headers: { "Content-Type": "application/json" } }, opts));
    return sessionToken().then(function (t) {
      var h = { "token-id": t || "", Version: "2021-07-28", channel: "APP", source: "WEB_USER", Accept: "application/json" };
      if (opts.body) h["Content-Type"] = "application/json";
      return fetch("https://services.leadconnectorhq.com" + path, Object.assign({}, opts, { headers: Object.assign(h, opts.headers || {}) }));
    });
  }

  /* ---------- custom fields by name (one playbook works in any account) ---------- */
  function loadFields(loc) {
    if (fieldCache[loc] || fieldLoading[loc]) return;
    fieldLoading[loc] = 1;
    api("/locations/" + loc + "/customFields?model=contact").then(function (r) { return r.json(); }).then(function (d) {
      var map = {}; (d.customFields || []).forEach(function (f) { map[f.name] = f.id; });
      fieldCache[loc] = map; fieldLoading[loc] = 0; fire();
    }).catch(function () { fieldLoading[loc] = 0; });
  }

  /* ---------- active site ---------- */
  function resolve() {
    var loc = locFromUrl(), list = sites(), site = null;
    for (var i = 0; i < list.length && loc; i++) if ((list[i].locations || []).indexOf(loc) !== -1) { site = list[i]; break; }
    if (loc === cur.loc && site === cur.site) return;
    cur = { loc: loc, site: site };
    applyTheme(site);
    if (site && site.pulse) loadFields(loc);
    fire();
  }
  function fire() { try { window.dispatchEvent(new Event("bmw:change")); } catch (e) {} }

  window.BMW = {
    __core: 1,
    version: "df1c540098d7",
    loc: function () { return cur.loc; },
    active: function () { return cur.site; },
    on: function (mod) {
      var s = cur.site; if (!s) return false;
      if ((s.modules || ALL_MODULES).indexOf(mod) === -1) return false;
      if (mod === "pulse" && !fieldCache[cur.loc]) return false;      // wait until field ids are known
      return true;
    },
    brand: function () { var s = cur.site; return s ? (s.brand || s.name || "") : ""; },
    fieldId: function (name) { var m = fieldCache[cur.loc]; return (m && name && m[name]) || ""; },
    api: api,
    themeVars: themeVars,
  };
  resolve();
  window.addEventListener("routeChangeEvent", resolve);
  window.addEventListener("popstate", resolve);
  setInterval(resolve, 700);
})();


/* ===== PART 0 - UI SKIN ===== */
(function(){
  var CSS = "/* ============================================================================\n   UI SKIN (dark + accent colour of the active site)\n   ----------------------------------------------------------------------------\n   Paste this into the location\u0027s Custom CSS field\n   (GHL → Settings → ... → Custom CSS). CSS only — no \u003cstyle\u003e tag needed.\n\n   Two independent, fully-scoped sections:\n     A) SIDEBAR navigation   → #sidebar-v2\n     B) CONTACT DETAILS panel → #record-details-lhs\n\n   Everything is scoped to those two containers, so NOTHING else in the app\n   (top bar, conversations, dashboards, other locations) is affected.\n\n   Palette (matches the contact widget):\n     BG black ......... #2A2C31\n     surface .......... #33353B / #393B42 (cards, folder headers)\n     field bg ......... #2E3036\n     gold base ........ var(--bmw-c-d9b978)   (legible on black)\n     gold hover ....... var(--bmw-c-e8c77a)\n     gold active ...... var(--bmw-c-f2d89b) / var(--bmw-c-e8c77a)\n     gold rail/accent . var(--bmw-c-c9a35f)\n   Selectors captured live from the the team sub-account on 2026-06-05.\n   ============================================================================ */\n\n\n/* ╔══════════════════════════════════════════════════════════════════════╗\n   ║  SECTION A — SIDEBAR  (#sidebar-v2)                                     ║\n   ╚══════════════════════════════════════════════════════════════════════╝ */\n\n/* A1) Sidebar background → deep black (overrides GHL\u0027s .default-bg-color) */\n#sidebar-v2,\n#sidebar-v2 .default-bg-color {\n  background-color: #2A2C31 !important;\n}\n\n/* A2) Nav items (text + icon) → gold, fully opaque (GHL dims them to .7) */\n#sidebar-v2 a            { color: var(--bmw-c-d9b978) !important; opacity: 1 !important; }\n#sidebar-v2 a span,\n#sidebar-v2 a p          { color: var(--bmw-c-d9b978) !important; }\n#sidebar-v2 a svg        { color: var(--bmw-c-d9b978) !important; stroke: var(--bmw-c-d9b978) !important; }\n\n/* A3) Hover → brighter gold */\n#sidebar-v2 a:hover,\n#sidebar-v2 a:hover span,\n#sidebar-v2 a:hover p,\n#sidebar-v2 a:hover svg  { color: var(--bmw-c-e8c77a) !important; stroke: var(--bmw-c-e8c77a) !important; }\n\n/* A4) Active item → bright gold on a soft gold wash + left gold rail */\n#sidebar-v2 a.active,\n#sidebar-v2 a.exact-active {\n  background-color: rgba(var(--bmw-rgb-c9a35f),0.14) !important;\n  box-shadow: inset 3px 0 0 var(--bmw-c-c9a35f) !important;\n}\n#sidebar-v2 a.active span,        #sidebar-v2 a.active p,        #sidebar-v2 a.active svg,\n#sidebar-v2 a.exact-active span,  #sidebar-v2 a.exact-active p,  #sidebar-v2 a.exact-active svg {\n  color: var(--bmw-c-f2d89b) !important; stroke: var(--bmw-c-f2d89b) !important;\n}\n\n/* A5) Location switcher (top) → gold text on a subtle gold panel */\n#location-switcher-sidbar-v2 { background-color: rgba(var(--bmw-rgb-c9a35f),0.10) !important; }\n#location-switcher-sidbar-v2,\n#location-switcher-sidbar-v2 * { color: var(--bmw-c-e8c77a) !important; }\n\n/* A6) Search box (Ctrl/Cmd-K) → dark field, gold text + placeholder */\n#sidebar-v2 input {\n  background-color: #303237 !important;\n  color: var(--bmw-c-e8c77a) !important;\n  border-color: rgba(var(--bmw-rgb-c9a35f),0.25) !important;\n}\n#sidebar-v2 input::placeholder { color: rgba(var(--bmw-rgb-d9b978),0.55) !important; }\n\n/* A7) Dividers / section rules → faint gold */\n#sidebar-v2 hr { border-color: rgba(var(--bmw-rgb-c9a35f),0.15) !important; }\n\n\n/* ╔══════════════════════════════════════════════════════════════════════╗\n   ║  SECTION B — CONTACT DETAILS PANEL  (#record-details-lhs)               ║\n   ╚══════════════════════════════════════════════════════════════════════╝ */\n\n/* B1) Panel background + sticky \"Contact Details\" header → black\n   (the sticky header reuses the .bg-contacts-panel class, hence the 2nd rule) */\n#record-details-lhs { background-color: #2A2C31 !important; color: #F2F2F2 !important; }\n#record-details-lhs .bg-contacts-panel { background-color: #2A2C31 !important; }\n#record-details-lhs .hr-tabs-rail,\n#record-details-lhs .hr-tabs-nav { background-color: #2A2C31 !important; }\n\n/* B2) White/grey sub-cards (name block, field cards, collapse content) → dark surface */\n#record-details-lhs .bg-white,\n#record-details-lhs .bg-gray-50,\n#record-details-lhs .bg-gray-100,\n#record-details-lhs .hr-collapse-item__content-inner { background-color: #33353B !important; }\n\n/* B3) Folder headers (Contact / General Info / Loan Inquiry / ...) → dark */\n#record-details-lhs .hr-collapse-item__header          { background-color: #33353B !important; }\n#record-details-lhs .hr-collapse-item__header--active  { background-color: #393B42 !important; }\n/* To make folder header titles GOLD instead of white, uncomment:\n   #record-details-lhs .hr-collapse-item__header .hr-text { color:var(--bmw-c-d9b978) !important; } */\n\n/* B4) Field inputs → dark field + LIGHT value text.\n   IMPORTANT: GHL inputs use -webkit-text-fill-color, which Chrome prioritises\n   over `color`. Without the fill-color override the values stay near-black. */\n#record-details-lhs .hr-input { background-color: #2E3036 !important; }\n#record-details-lhs .hr-input__input-el {\n  color: #F2F2F2 !important;\n  -webkit-text-fill-color: #F2F2F2 !important;\n}\n#record-details-lhs .hr-input__input-el::placeholder {\n  color: #9aa0aa !important;\n  -webkit-text-fill-color: #9aa0aa !important;\n}\n#record-details-lhs .hr-input__border { border-color: rgba(255, 255, 255, 0.10) !important; }\n\n/* B5) Default buttons inside the panel → dark */\n#record-details-lhs .hr-button--default-type {\n  background-color: #33353B !important;\n  border-color: rgba(255, 255, 255, 0.10) !important;\n}\n\n/* B6) Text colours: titles/values light, labels muted */\n#record-details-lhs .text-gray-900,\n#record-details-lhs .hr-ellipsis,\n#record-details-lhs .hr-text { color: #F2F2F2 !important; }\n#record-details-lhs .hr-form-item-label__text,\n#record-details-lhs .text-gray-500,\n#record-details-lhs .text-gray-600,\n#record-details-lhs .text-gray-400 { color: #9aa0aa !important; }\n\n/* B7) Tabs (All fields / DND / Actions) → dark track, gold active */\n#record-details-lhs .hr-tabs-capsule      { background-color: rgba(var(--bmw-rgb-c9a35f),0.18) !important; }\n#record-details-lhs .hr-tabs-tab-wrapper  { background-color: transparent !important; }\n#record-details-lhs .hr-tabs-tab__label   { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab--active .hr-tabs-tab__label,\n#record-details-lhs .hr-tabs-tab--active  { color: var(--bmw-c-e8c77a) !important; }\n\n/* B8) Borders / dividers → faint */\n#record-details-lhs .border-gray-200,\n#record-details-lhs .border-gray-300,\n#record-details-lhs .border-t { border-color: rgba(255, 255, 255, 0.08) !important; }\n#record-details-lhs .border-primary-300 { border-color: rgba(var(--bmw-rgb-c9a35f),0.35) !important; }\n\n/* B9) Icons inside the panel → light grey */\n#record-details-lhs svg { color: #C9C7C2 !important; }\n\n/* B10) Field dropdowns / option menus (SINGLE_OPTIONS like Loan Purpose) -> dark\n   surface so the light option text stays legible. Before this, options rendered\n   as light text on the menu's default white background = invisible. */\n#record-details-lhs [class*='dropdown'],\n#record-details-lhs [class*='popover'],\n#record-details-lhs [class*='-menu'],\n#record-details-lhs [class*='select__option'],\n#record-details-lhs [class*='options-list'],\n#record-details-lhs [class*='option-list'],\n#record-details-lhs [role='listbox'],\n#record-details-lhs ul[role='menu'] {\n  background-color: #33353B !important;\n  border-color: rgba(var(--bmw-rgb-c9a35f),0.25) !important;\n}\n#record-details-lhs [role='option'],\n#record-details-lhs [class*='option'],\n#record-details-lhs [role='menuitem'],\n#record-details-lhs li[class*='item'] {\n  color: #F2F2F2 !important;\n  -webkit-text-fill-color: #F2F2F2 !important;\n  background-color: transparent !important;\n}\n#record-details-lhs [role='option']:hover,\n#record-details-lhs [class*='option']:hover,\n#record-details-lhs li[class*='item']:hover,\n#record-details-lhs [class*='option'][class*='active'],\n#record-details-lhs [class*='option'][class*='selected'],\n#record-details-lhs [aria-selected='true'] {\n  background-color: rgba(var(--bmw-rgb-c9a35f),0.18) !important;\n  color: var(--bmw-c-e8c77a) !important;\n  -webkit-text-fill-color: var(--bmw-c-e8c77a) !important;\n}\n\n/* B11) CONTRAST FIX (2026-06-17) - field VALUES + tag chips rendered dark-on-dark\n   (only visible when text-selected). GHL paints text via -webkit-text-fill-color,\n   which overrides our color; make the fill FOLLOW the color everywhere in the\n   panel so every value honours the light/gold/muted colours set above. Then give\n   the contact tag chips a visible dark+gold chip. */\n#record-details-lhs * { -webkit-text-fill-color: currentColor !important; }\n/* B11b) field VALUES were dark-on-dark. Diagnosed LIVE (2026-06-17): the dark text\n   comes from GHL classes B6 missed (.text-gray-700 = #344054), the Naive dropdown\n   value (.hr-base-selection-*, inherits #2C2E34), the input placeholder, raw\n   no-class nodes, and the inactive tabs. Fix the COLOR (fill follows it via the\n   rule above) so each value is legible WITHOUT flattening the gold/muted hierarchy.\n   Verified live in the the team sub-account: 0 dark nodes remaining. */\n#record-details-lhs *:not([class]) { color: #F2F2F2 !important; }\n#record-details-lhs .text-gray-700,\n#record-details-lhs .text-gray-800,\n#record-details-lhs .internal-source-link { color: #F2F2F2 !important; }\n#record-details-lhs .hr-input__placeholder { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab--active,\n#record-details-lhs .hr-tabs-tab--active * { color: var(--bmw-c-e8c77a) !important; }\n/* dropdown selected value (Naive UI selection) needs explicit fill + double-id\n   specificity to beat the inherited #2C2E34 */\n#record-details-new-ui #record-details-lhs [class*='base-selection'],\n#record-details-new-ui #record-details-lhs [class*='base-selection'] * { color: #F2F2F2 !important; -webkit-text-fill-color: #F2F2F2 !important; }\n#record-details-lhs [class*='tag-item'],\n#record-details-lhs [class*='contact-tag'],\n#record-details-lhs [class*='tags'] [class*='chip'],\n#record-details-lhs [class*='tags'] [class*='tag'],\n#record-details-lhs .hl-text-input-tag {\n  background-color: rgba(var(--bmw-rgb-c9a35f),0.16) !important;\n  border: 1px solid rgba(var(--bmw-rgb-c9a35f),0.45) !important;\n  color: var(--bmw-c-e8c77a) !important;\n}\n#record-details-lhs [class*='tag-item'] *,\n#record-details-lhs [class*='contact-tag'] *,\n#record-details-lhs [class*='tags'] [class*='chip'] *,\n#record-details-lhs [class*='tags'] [class*='tag'] * {\n  color: var(--bmw-c-e8c77a) !important;\n}";
  function inj(){ var on=!!(window.BMW&&BMW.active()&&BMW.on("skin")), ex=document.getElementById('bmw-skin-css'); if(!on){ if(ex) ex.remove(); return; } if(ex)return; var s=document.createElement('style'); s.id='bmw-skin-css'; s.textContent=CSS; (document.head||document.documentElement).appendChild(s); }
  inj(); setInterval(inj,1500); window.addEventListener("bmw:change", inj);
})();


/* ===== PART 0B - CONTRAST NORMALIZER =====
   Robust safety net instead of chasing every GHL class one by one: walk the contact
   panel (#record-details-lhs) and (1) darken any near-white/light background GHL
   renders (opportunity cards, client-portal selects, workflow chips, tags, avatars —
   many use classes the CSS skin can't enumerate), and (2) lighten any DARK text so
   it's legible on the dark panel. Gold/light/muted text + gold accents are left
   untouched (threshold 0.66 spares the golds). Debounced MutationObserver re-applies
   after every GHL re-render. Verified live in the team 2026-07-21: 0 low-contrast nodes. */
(function () {
  "use strict";
  if (window.__vdNormLoaded) return; window.__vdNormLoaded = true;
  var SURFACE = "#33353B", LIGHT = "#F2F2F2";
  function curLoc() { var m = location.pathname.match(/\/location\/([^\/?#]+)/); return m ? m[1] : null; }
  function prgb(x) { var m = (x || "").match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(",").map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length < 4 ? 1 : p[3] }; }
  function lum(c) { var a = [c.r, c.g, c.b].map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; }
  function normalize(root) {
    var els = root.getElementsByTagName("*"), i, el, p, col;
    // pass 1: darken near-white / light backgrounds the CSS skin missed
    for (i = 0; i < els.length; i++) { el = els[i]; p = prgb(getComputedStyle(el).backgroundColor); if (p && p.a > 0.55 && lum(p) > 0.66) el.style.setProperty("background-color", SURFACE, "important"); }
    // pass 2: lighten ONLY dark text (never sets dark; light/gold/muted are left alone)
    for (i = 0; i < els.length; i++) { el = els[i]; if (el.children.length) continue; if (!(el.textContent || "").trim()) continue; col = prgb(getComputedStyle(el).color); if (col && lum(col) < 0.35) { el.style.setProperty("color", LIGHT, "important"); el.style.setProperty("-webkit-text-fill-color", LIGHT, "important"); } }
  }
  var pending = false;
  function schedule() { if (pending) return; pending = true; setTimeout(function () { pending = false; if (!(window.BMW && BMW.active() && BMW.on("contrast"))) return; var root = document.getElementById("record-details-lhs"); if (root) normalize(root); }, 250); }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
  schedule();
})();


/* ===== PART 0C - SIDEBAR: hide Payments + "Power Dialer" item =====
   Hides the Payments tab and puts a "Power Dialer" item in its exact slot that
   opens Conversations → Manual Actions (the workflow call queue). Selectors
   verified LIVE 2026-07-24 (#sidebar-v2, a#sb_payments); clones the native item
   so classes + the gold skin apply automatically. Re-arms every 2s because GHL's
   Vue sidebar re-renders on route changes and would restore Payments / drop ours. */
(function () {
  "use strict";
  if (window.__vdSidebarMod) return; window.__vdSidebarMod = 1;
  // Custom sidebar items injected in Payments' slot, in this order. Icons = feather-style
  // paths drawn with currentColor so the gold skin applies.
  var SB_ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    tasks: '<polyline points="9 11 12 14 22 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  var SB_ITEMS = [
    { id: "vd-power-dialer", label: "Power Dialer", icon: "phone", url: "/v2/location/{loc}/conversations/manual_actions?type=workflow&workflow=&campaign=&assignee=" },
    { id: "vd-tasks",        label: "Tasks",        icon: "tasks", url: "/v2/location/{loc}/tasks" }
  ];
  function curLoc() { var m = location.pathname.match(/\/location\/([^\/?#]+)/); return m ? m[1] : null; }
  // Hide Payments via CSS the instant this script parses (no waiting for the DOM query
  // loop) — kills the Payments flash on reload. The same rule also lives in the location
  // Custom CSS (A8), which loads even earlier; this is the in-JS backup.
  function sbCss(on) { var ex = document.getElementById("vd-sb-css"); if (!on) { if (ex) ex.remove(); return; } if (ex) return; var s = document.createElement("style"); s.id = "vd-sb-css"; s.textContent = "#sidebar-v2 a#sb_payments{display:none !important;}"; (document.head || document.documentElement).appendChild(s); }
  function buildItem(tpl, item) {
    var a = tpl.cloneNode(true);
    a.id = item.id;
    a.style.removeProperty("display");
    a.classList.remove("active", "exact-active");
    a.removeAttribute("href");
    var leaves = a.querySelectorAll("span,p,div"), labeled = false;
    for (var i = 0; i < leaves.length; i++) { var el = leaves[i]; if (!el.children.length && (el.textContent || "").trim()) { el.textContent = item.label; labeled = true; } }
    if (!labeled) a.textContent = item.label;
    // GHL sidebar icons are <img> tags off the CDN — swap for an inline SVG with the same
    // classes so the gold skin colors it via currentColor.
    var img = a.querySelector("img");
    if (img) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("class", img.getAttribute("class") || "md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2");
      svg.setAttribute("fill", "none");
      svg.innerHTML = SB_ICONS[item.icon] || SB_ICONS.phone;
      img.parentNode.replaceChild(svg, img);
    }
    // SPA navigation like the native items (no full reload): push the route and fire a
    // popstate so GHL's Vue router swaps the view in place. Verified live 2026-07-24
    // (marker survived + Manual Actions rendered). Falls back to a hard navigation.
    a.addEventListener("click", function (ev) {
      ev.preventDefault(); ev.stopPropagation();
      // FIX 2026-08-24: the old pushState + synthetic popstate hack confused GHL's Vue
      // router (empty history.state -> it navigated to origin + undefined =
      // "app.gohighlevel.comundefined"). Hard navigation is 100% reliable.
      location.assign(item.url.replace("{loc}", curLoc()));
    });
    return a;
  }
  // FIX 2026-08-24: the sidebar items used to REQUIRE #sb_payments. When GHL renames or
  // drops that item the whole launcher silently vanished. Resolve an anchor from a list of
  // candidates, and fall back to the last native sidebar link so we always mount.
  function sbAnchor() {
    var pay = document.getElementById("sb_payments");
    if (pay) return { tpl: pay, before: pay, hide: pay };
    var ids = ["sb_reputation", "sb_reporting", "sb_app-marketplace", "sb_memberships", "sb_sites", "sb_automation", "sb_marketing", "sb_tasks", "sb_opportunities", "sb_contacts"];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el) return { tpl: el, before: el, hide: null };
    }
    var links = document.querySelectorAll('#sidebar-v2 a[id^="sb_"]');
    if (links.length) { var last = links[links.length - 1]; return { tpl: last, before: last, hide: null }; }
    return null;
  }
  function ensure() {
    var on = !!(window.BMW && BMW.active() && BMW.on("sidebar"));
    sbCss(on);
    if (!on) { for (var k = 0; k < SB_ITEMS.length; k++) { var x = document.getElementById(SB_ITEMS[k].id); if (x) x.remove(); } var p = document.getElementById("sb_payments"); if (p) p.style.removeProperty("display"); return; }
    var a = sbAnchor();
    if (!a || !a.before || !a.before.parentNode) return;
    if (a.hide) a.hide.style.setProperty("display", "none", "important");
    for (var i = 0; i < SB_ITEMS.length; i++) {
      var it = SB_ITEMS[i];
      if (!document.getElementById(it.id)) a.before.parentNode.insertBefore(buildItem(a.tpl, it), a.before);
    }
  }
  ensure();
  var burst = 0, bi = setInterval(function () { ensure(); if (++burst >= 40) clearInterval(bi); }, 250);   // fast first ~10s so Power Dialer appears ASAP
  setInterval(ensure, 2000);                                                                              // steady re-arm (sidebar re-renders)
})();


/* ===== PART 2 - PULSE BANNER ===== */

/* ============================================================================
   Pulse Banner (accent colour of the active site)
   ----------------------------------------------------------------------------
   Horizontal stage tracker that sits at the TOP of the GHL contact page,
   above the 3-column layout,
   re-skinned to the team black + gold and wired to the real Sales Pipeline).

   It shows, for the contact's opportunity:
     - donut % of the current stage's checklist
     - pipeline name + current stage + "Stage X/N" + days-in-stage SLA chip
     - a clickable 26-node stepper of the live pipeline
     - the checklist of tasks for the current stage (the team real process)
     - a "Move stage" dropdown that moves the opportunity for real

   Stage + checklist content is derived from MB_GHL_Spec_v6 + the
   2026-05-25 build call (call dispositions, needs-list-in-GHL, LOS mirror,
   referring-agent updates, refi watcher, post-close cadence).

   ── HOW DATA FLOWS ────────────────────────────────────────────────────────
   1. Stage detection: reads the contact's opportunity from the GHL API
      (pipeline + current stage + days in stage). Falls back to a DOM scrape.
   2. Checklist state: saved per contact+stage. Default = browser localStorage
      (works immediately, single user). Set CONFIG.webhookUrl to an n8n webhook
      to make the checklist SHARED across the team (state persisted to a custom
      field).
   3. Move stage: PUT /opportunities/{id} with the new stageId.

   ── AUTH ──────────────────────────────────────────────────────────────────
   Every call goes through BMW.api() (core.js). By default it uses the session of
   the user who is signed in to GHL (the same token the app itself sends), so no
   API key lives in the browser and each user only reaches what GHL already lets
   them see. A site can instead set apiProxy to its own server-side proxy.

   Loaded by core.js for the sites listed in kit/sites. Do not paste on its own.
   ============================================================================ */
(function () {
  "use strict";
  if (window.__bmwPulseLoaded) return;
  window.__bmwPulseLoaded = true;

  /* ── EDITABLE CONFIG ─────────────────────────────────────────────────── */
  /* Config comes from the active site (see kit/sites/*.js). Nothing account-specific lives in this file. */
  var CONFIG = {
    get locationId() { var s = window.BMW && BMW.active(); return s ? BMW.loc() : null; },
    get checklistFieldId() { var s = window.BMW && BMW.active(); return s ? BMW.fieldId((s.pulse && s.pulse.checklistField) || "Pulse Checklist State") : ""; },
    webhookUrl: "",
  };
  var GOLD = "var(--bmw-c-c9a35f)", GOLD_L = "var(--bmw-c-e8c77a)", BG = "#2A2C31", SURFACE = "#33353B", LINE = "rgba(255,255,255,.08)";

  /* ── Playbook of the ACTIVE site (stages, checklists, fields, reasons): comes from the site config, never hardcoded.
     Field ids are resolved by field NAME for the current sub-account by core.js, so one playbook works in any account. */
  function PB() { var s = window.BMW && BMW.active(); return (s && s.pulse && s.pulse.playbook) || { stages: [], reasons: [], fields: {}, checklists: {} }; }
  function FIELD_BY_NAME(name) { var f = PB().fields, k; for (k in f) if (f[k].name === name) return FIELD(k); return null; }
  function FIELD(key) { var f = PB().fields[key]; return f ? Object.assign({}, f, { id: BMW.fieldId(f.name) }) : null; }

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  function getContactId() { var m = location.pathname.match(/contacts\/detail\/([^/?#]+)/); return m ? m[1] : null; }
  function getLocationId() { var m = location.pathname.match(/\/location\/([^/?#]+)/); return m ? m[1] : null; }
  function onContactPage() { return /\/location\/[^/]+\/contacts\/detail\//.test(location.pathname); }
  function stageKey(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]; }); }
  function daysSince(iso) { if (!iso) return null; var d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); return isNaN(d) ? null : d; }

  function api(path, opts) { return BMW.api(path, opts); }   // signed-in user session, or the site's optional proxy


  /* ── Stage detection (API primary, cached per contact) ───────────────── */
  var PIPE_CACHE = {};   // contactId -> { stage, daysInStage, pipeline:{name,stages:[name]}, oppId, pipelineId, currentStageId, stages:[{id,name}] }
  var PREVIEW = {};      // contactId -> previewed stage name (clicking a stepper node)
  var lastSig = null;    // signature of what is currently painted — render() is a no-op when unchanged

  function detectFromAPI(contactId, locationId) {
    if (PIPE_CACHE[contactId]) return Promise.resolve(PIPE_CACHE[contactId]);
    return api("/opportunities/search?location_id=" + locationId + "&contact_id=" + contactId)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (od) {
        var opp = od && (od.opportunities || [])[0];
        if (!opp) return null;
        return api("/opportunities/pipelines?locationId=" + locationId)
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (pd) {
            var pipe = pd && (pd.pipelines || []).find(function (p) { return p.id === opp.pipelineId; });
            if (!pipe) return null;
            var sorted = (pipe.stages || []).slice().sort(function (a, b) { return (a.position || 0) - (b.position || 0); });
            var cur = sorted.find(function (s) { return s.id === opp.pipelineStageId; });
            var rec = {
              stage: cur ? cur.name : null,
              daysInStage: daysSince(opp.lastStageChangeAt || opp.updatedAt),
              pipeline: { name: pipe.name, stages: sorted.map(function (s) { return s.name; }) },
              oppId: opp.id, pipelineId: pipe.id, currentStageId: opp.pipelineStageId, stages: sorted,
            };
            PIPE_CACHE[contactId] = rec;
            return rec;
          });
      })
      .catch(function () { return null; });
  }

  /* ── Checklist state (localStorage + optional webhook) ───────────────── */
  var LS_KEY = "bmw_pulse_state_v1";
  var stateCache = {};   // contactId -> { stageKey -> { stepId -> {done,at} } }
  function readLS(id) { try { return (JSON.parse(localStorage.getItem(LS_KEY) || "{}"))[id] || {}; } catch (e) { return {}; } }
  function writeLS(id, st) { try { var all = JSON.parse(localStorage.getItem(LS_KEY) || "{}"); all[id] = st; localStorage.setItem(LS_KEY, JSON.stringify(all)); } catch (e) {} }
  function loadState(id) {
    var s = readLS(id);                          // instant: local mirror so the UI paints without waiting
    stateCache[id] = s;
    // SHARED + PERMANENT: pull the authoritative checklist off the contact custom
    // field so every rep sees the same checked items (localStorage is per-browser).
    // Called once per contact (render short-circuits on stateCache), so this is a
    // single GET per page-load — the re-render on arrival won't re-trigger it.
    if (CONFIG.checklistFieldId) {
      api("/contacts/" + id)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          var c = d && d.contact; if (!c || !c.customFields) return;
          var raw = "";
          for (var i = 0; i < c.customFields.length; i++) {
            var f = c.customFields[i];
            if (f.id === CONFIG.checklistFieldId) { raw = (f.value != null ? f.value : f.field_value) || ""; break; }
          }
          if (!raw) return;
          var remote; try { remote = JSON.parse(raw); } catch (e) { return; }
          if (remote && typeof remote === "object") { stateCache[id] = remote; writeLS(id, remote); render(); }
        })
        .catch(function () {});
    }
    return s;
  }
  function pushState(contactId, locationId, stage, stepId, done) {
    if (!stateCache[contactId]) stateCache[contactId] = {};
    var sk = stageKey(stage);
    if (!stateCache[contactId][sk]) stateCache[contactId][sk] = {};
    if (done) stateCache[contactId][sk][stepId] = { done: true, at: new Date().toISOString() };
    else { delete stateCache[contactId][sk][stepId]; }
    writeLS(contactId, stateCache[contactId]);
    // SHARED + PERMANENT: persist the whole checklist JSON onto the contact custom
    // field. stateCache holds the full accumulated state, so each write is complete
    // (last-write-wins across reps — acceptable for a small team). PIT already loaded.
    if (CONFIG.checklistFieldId) {
      api("/contacts/" + contactId, { method: "PUT",
        body: JSON.stringify({ customFields: [ { id: CONFIG.checklistFieldId, value: JSON.stringify(stateCache[contactId]) } ] }) })
        .catch(function () {});
    }
    // Legacy: optional n8n webhook (still honoured if CONFIG.webhookUrl is set)
    if (CONFIG.webhookUrl) {
      fetch(CONFIG.webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: contactId, locationId: locationId, stage: stage, stepId: stepId, done: done }) })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (j && j.state) { stateCache[contactId] = j.state; writeLS(contactId, j.state); render(); } })
        .catch(function () {});
    }
  }

  /* ── Styles ──────────────────────────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById("vd-pulse-css")) return;
    var css =
      "#vd-pulse-banner{flex-shrink:0;margin:8px 12px 4px;background:" + BG + ";border:1px solid rgba(var(--bmw-rgb-c9a35f),.28);border-radius:14px;box-shadow:0 8px 24px rgba(var(--bmw-rgb-c9a35f),.12);overflow:hidden;font-family:Inter,system-ui,Segoe UI,sans-serif;color:#f2f2f2;}" +
      "#vd-pulse-banner *{box-sizing:border-box;}" +
      "#vd-pulse-banner .vdp-head{display:grid;grid-template-columns:88px 1fr auto;gap:18px;align-items:center;padding:16px 20px 8px;}" +
      "#vd-pulse-banner .vdp-donut{position:relative;width:84px;height:84px;}" +
      "#vd-pulse-banner .vdp-donut svg{transform:rotate(-90deg);}" +
      "#vd-pulse-banner .ring-bg{stroke:rgba(255,255,255,.10);stroke-width:7;fill:none;}" +
      "#vd-pulse-banner .ring-fg{stroke:url(#vdp-grad);stroke-width:7;fill:none;stroke-linecap:round;transition:stroke-dashoffset .4s ease;}" +
      "#vd-pulse-banner .vdp-cn{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}" +
      "#vd-pulse-banner .vdp-pct{font-size:18px;font-weight:800;color:#fff;line-height:1;}" +
      "#vd-pulse-banner .vdp-pctl{font-size:8px;font-weight:700;color:" + GOLD + ";letter-spacing:.12em;margin-top:2px;}" +
      "#vd-pulse-banner .vdp-pipe{font-size:10.5px;font-weight:700;color:" + GOLD + ";letter-spacing:.1em;text-transform:uppercase;}" +
      "#vd-pulse-banner .vdp-stage{font-size:18px;font-weight:800;color:#fff;margin-top:2px;}" +
      "#vd-pulse-banner .vdp-meta{display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap;}" +
      "#vd-pulse-banner .vdp-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600;background:" + SURFACE + ";color:#cbd5e0;border:1px solid " + LINE + ";}" +
      "#vd-pulse-banner .vdp-chip.ok{background:rgba(63,185,80,.14);color:#7fe6a0;border-color:rgba(63,185,80,.3);}" +
      "#vd-pulse-banner .vdp-chip.warn{background:rgba(var(--bmw-rgb-c9a35f),.16);color:" + GOLD_L + ";border-color:rgba(var(--bmw-rgb-c9a35f),.35);}" +
      "#vd-pulse-banner .vdp-chip.risk{background:rgba(220,80,80,.16);color:#f0a0a0;border-color:rgba(220,80,80,.35);}" +
      "#vd-pulse-banner .vdp-move{padding:9px 15px;border-radius:8px;background:linear-gradient(180deg," + GOLD_L + "," + GOLD + ");color:#0a0a0a;border:0;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;align-self:start;margin-top:4px;}" +
      "#vd-pulse-banner .vdp-back{padding:8px 12px;border-radius:8px;background:rgba(var(--bmw-rgb-c9a35f),.12);border:1px solid rgba(var(--bmw-rgb-c9a35f),.4);color:" + GOLD_L + ";font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap;align-self:start;margin-top:4px;margin-right:8px;}" +
      "#vd-pulse-banner .vdp-stepper{display:flex;align-items:center;gap:0;padding:6px 20px 4px;position:relative;overflow-x:auto;}" +
      "#vd-pulse-banner .vdp-stepper::-webkit-scrollbar{height:0;}" +
      "#vd-pulse-banner .vdp-line{position:absolute;top:24px;left:36px;right:36px;height:2px;background:rgba(255,255,255,.10);z-index:0;}" +
      "#vd-pulse-banner .vdp-lined{position:absolute;top:24px;left:36px;height:2px;background:linear-gradient(90deg," + GOLD + "," + GOLD_L + ");z-index:0;}" +
      "#vd-pulse-banner .vdp-step{flex:1 0 52px;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;padding:8px 0;}" +
      "#vd-pulse-banner .vdp-node{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;background:" + SURFACE + ";border:2px solid #3a3a3a;color:#777;cursor:pointer;transition:transform .15s ease;}" +
      "#vd-pulse-banner .vdp-node:hover{transform:scale(1.12);}" +
      "#vd-pulse-banner .vdp-node.done{background:" + GOLD + ";border-color:" + GOLD + ";color:#0a0a0a;}" +
      "#vd-pulse-banner .vdp-node.cur{background:" + BG + ";border-color:" + GOLD_L + ";color:" + GOLD_L + ";box-shadow:0 0 0 4px rgba(var(--bmw-rgb-c9a35f),.22);}" +
      "#vd-pulse-banner .vdp-cl{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;padding:12px 20px 18px;}" +
      "#vd-pulse-banner .vdp-card{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid " + LINE + ";border-radius:10px;background:" + SURFACE + ";transition:border-color .15s ease;}" +
      "#vd-pulse-banner .vdp-card:hover{border-color:rgba(var(--bmw-rgb-c9a35f),.3);}" +
      "#vd-pulse-banner .vdp-card.done{background:rgba(var(--bmw-rgb-c9a35f),.08);border-color:rgba(var(--bmw-rgb-c9a35f),.3);}" +
      "#vd-pulse-banner .vdp-card.done .vdp-cl-lbl{color:#9a9a9a;text-decoration:line-through;}" +
      "#vd-pulse-banner .vdp-ck{width:22px;height:22px;border:2px solid #4a4a4a;border-radius:6px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;background:#0a0a0a;cursor:pointer;}" +
      "#vd-pulse-banner .vdp-card.done .vdp-ck{background:" + GOLD + ";border-color:" + GOLD + ";}" +
      "#vd-pulse-banner .vdp-card.done .vdp-ck::after{content:'\\2713';color:#0a0a0a;font-weight:900;font-size:13px;}" +
      "#vd-pulse-banner .vdp-cl-lbl{flex:1;font-size:13px;font-weight:500;color:#f2f2f2;line-height:1.35;}" +
      "#vd-pulse-banner .vdp-cta{padding:6px 10px;border-radius:7px;background:#0a0a0a;color:" + GOLD_L + ";border:1px solid rgba(var(--bmw-rgb-c9a35f),.4);font-size:11.5px;font-weight:700;cursor:pointer;flex-shrink:0;}" +
      "#vd-pulse-banner .vdp-cta:hover{background:" + GOLD + ";color:#0a0a0a;}" +
      "#vd-pulse-banner .vdp-empty{grid-column:1/-1;text-align:center;color:#777;font-size:13px;padding:14px;}" +
      "#vd-pulse-banner .vdp-foot{padding:6px 20px 10px;font-size:10px;color:#777;text-align:right;}" +
      "#vd-stage-dd{position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(var(--bmw-rgb-c9a35f),.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:6px 0;min-width:260px;font-family:Inter,system-ui,sans-serif;font-size:13px;max-height:420px;overflow:auto;}" +
      "#vd-stage-dd .vd-dd-item{padding:9px 14px;cursor:pointer;display:flex;align-items:center;gap:8px;color:#e8e8e8;}" +
      "#vd-stage-dd .vd-dd-item:hover{background:rgba(var(--bmw-rgb-c9a35f),.12);}" +
      "#vd-stage-dd .vd-dd-item.cur{background:rgba(var(--bmw-rgb-c9a35f),.16);color:" + GOLD_L + ";font-weight:700;}";
    var s = document.createElement("style"); s.id = "vd-pulse-css"; s.textContent = css; document.head.appendChild(s);
  }

  /* ── Toast ───────────────────────────────────────────────────────────── */
  function toast(msg, kind) {
    var t = document.createElement("div");
    t.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:99999;padding:12px 18px;border-radius:8px;font-weight:700;font-size:13px;font-family:Inter,system-ui,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.4);color:" + (kind === "err" ? "#fff" : "#0a0a0a") + ";background:" + (kind === "ok" ? GOLD : kind === "err" ? "#dc2626" : GOLD_L) + ";";
    t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3200);
  }

  /* ── Field pickers (#12, #73) — dropdown for SINGLE_OPTIONS, date input for DATE.
     Each reads the current value (from the captured contact) and writes the choice
     straight to the GHL custom field. Any checklist CTA can use these via PB().fields. ── */
  function curFieldVal(fid) {
    var c = window.__VD_CONTACT_DATA; if (!c || !c.customFields) return "";
    for (var i = 0; i < c.customFields.length; i++) { var f = c.customFields[i]; if (f.id === fid) return f.value != null ? f.value : (f.field_value != null ? f.field_value : ""); }
    return "";
  }
  function updateLocalCF(fid, val) {
    var c = window.__VD_CONTACT_DATA; if (!c) return; c.customFields = c.customFields || [];
    var hit = false; for (var i = 0; i < c.customFields.length; i++) { if (c.customFields[i].id === fid) { c.customFields[i].value = val; hit = true; break; } }
    if (!hit) c.customFields.push({ id: fid, value: val });
  }
  function showOptionPicker(anchor, options, current, cb) {
    var ex = document.getElementById("vd-opt-dd"); if (ex) { ex.remove(); return; }
    var r = anchor ? anchor.getBoundingClientRect() : { bottom: 120, right: window.innerWidth - 300 };
    var dd = document.createElement("div"); dd.id = "vd-opt-dd";
    dd.style.cssText = "position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(var(--bmw-rgb-c9a35f),.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:6px 0;min-width:220px;font-family:Inter,system-ui,sans-serif;font-size:13px;max-height:360px;overflow:auto;";
    dd.style.top = (r.bottom + 4) + "px"; dd.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    dd.innerHTML = (options || []).map(function (x) { var cur = String(x) === String(current); return '<div class="vd-oo" data-v="' + esc(x) + '" style="padding:9px 14px;cursor:pointer;color:' + (cur ? GOLD_L : "#e8e8e8") + ';' + (cur ? "font-weight:700;" : "") + '">' + (cur ? "● " : "") + esc(x) + '</div>'; }).join("");
    document.body.appendChild(dd);
    dd.querySelectorAll(".vd-oo").forEach(function (it) {
      it.onmouseover = function () { it.style.background = "rgba(var(--bmw-rgb-c9a35f),.12)"; };
      it.onmouseout = function () { it.style.background = ""; };
      it.onclick = function (ev) { ev.stopPropagation(); dd.remove(); cb(it.getAttribute("data-v")); };
    });
    setTimeout(function () { var close = function (ev) { if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener("click", close); } }; document.addEventListener("click", close); }, 80);
  }
  function showDatePicker(anchor, current, cb, quick) {
    var ex = document.getElementById("vd-date-dd"); if (ex) { ex.remove(); return; }
    var r = anchor ? anchor.getBoundingClientRect() : { bottom: 120, right: window.innerWidth - 300 };
    var dd = document.createElement("div"); dd.id = "vd-date-dd";
    dd.style.cssText = "position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(var(--bmw-rgb-c9a35f),.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:12px;font-family:Inter,system-ui,sans-serif;";
    dd.style.top = (r.bottom + 4) + "px"; dd.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    // Quick presets (Future Opportunity only): compute a date N months from today.
    var quickHtml = "";
    if (quick) {
      quickHtml = '<div style="display:flex;gap:6px;margin-bottom:9px;">' +
        [3, 6, 9].map(function (m) {
          return '<button data-m="' + m + '" style="flex:1;padding:6px 10px;border-radius:7px;background:rgba(var(--bmw-rgb-c9a35f),.14);color:' + GOLD_L + ';border:1px solid rgba(var(--bmw-rgb-c9a35f),.4);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">' + m + ' mo</button>';
        }).join("") + '</div>';
    }
    dd.innerHTML = quickHtml +
      '<input type="date" value="' + esc(String(current || "").slice(0, 10)) + '" style="background:#0a0a0a;color:' + GOLD_L + ';border:1px solid rgba(var(--bmw-rgb-c9a35f),.4);border-radius:7px;padding:7px 10px;font-size:13px;color-scheme:dark;">' +
      '<button style="margin-left:8px;padding:7px 12px;border-radius:7px;background:' + GOLD + ';color:#0a0a0a;border:0;font-weight:700;cursor:pointer;">Set</button>';
    document.body.appendChild(dd);
    var inp = dd.querySelector('input[type="date"]'), btn = dd.querySelector('button:not([data-m])');
    // month-add that never overflows (Nov 30 + 3mo = Feb 28, not Mar 2)
    function addMonths(n) {
      var d = new Date(), day = d.getDate();
      d.setDate(1); d.setMonth(d.getMonth() + n);
      var last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, last));
      var mm = String(d.getMonth() + 1).padStart(2, "0"), dd2 = String(d.getDate()).padStart(2, "0");
      return d.getFullYear() + "-" + mm + "-" + dd2;
    }
    Array.prototype.forEach.call(dd.querySelectorAll("button[data-m]"), function (qb) {
      qb.onclick = function (ev) {
        ev.stopPropagation();
        var v = addMonths(parseInt(qb.getAttribute("data-m"), 10));
        dd.remove(); cb(v);
      };
    });
    btn.onclick = function (ev) { ev.stopPropagation(); var v = inp.value; dd.remove(); if (v) cb(v); };
    setTimeout(function () { var close = function (ev) { if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener("click", close); } }; document.addEventListener("click", close); }, 80);
  }
  /* inline text/number input (replaces window.prompt, which Chrome suppresses on repeat dialogs) */
  function showInputPicker(anchor, current, label, cb) {
    var ex = document.getElementById("vd-input-dd"); if (ex) { ex.remove(); return; }
    var r = anchor ? anchor.getBoundingClientRect() : { bottom: 120, right: window.innerWidth - 300 };
    var dd = document.createElement("div"); dd.id = "vd-input-dd";
    dd.style.cssText = "position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(var(--bmw-rgb-c9a35f),.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:12px;font-family:Inter,system-ui,sans-serif;min-width:230px;";
    dd.style.top = (r.bottom + 4) + "px"; dd.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    dd.innerHTML = (label ? '<div style="color:#bdbdbd;font-size:11px;margin-bottom:6px;">' + esc(label) + '</div>' : "") +
      '<input type="text" value="' + esc(String(current == null ? "" : current)) + '" style="width:150px;background:#0a0a0a;color:' + GOLD_L + ';border:1px solid rgba(var(--bmw-rgb-c9a35f),.4);border-radius:7px;padding:7px 10px;font-size:13px;">' +
      '<button style="margin-left:8px;padding:7px 12px;border-radius:7px;background:' + GOLD + ';color:#0a0a0a;border:0;font-weight:700;cursor:pointer;">Set</button>';
    document.body.appendChild(dd);
    var inp = dd.querySelector("input"), btn = dd.querySelector("button");
    try { inp.focus(); inp.select(); } catch (e) {}
    var close = function (ev) { if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener("click", close); } };
    var submit = function (ev) { if (ev) ev.stopPropagation(); var v = inp.value; dd.remove(); document.removeEventListener("click", close); cb(v); };
    btn.onclick = submit;
    inp.onkeydown = function (ev) { if (ev.key === "Enter") submit(ev); else if (ev.key === "Escape") { dd.remove(); document.removeEventListener("click", close); } };
    setTimeout(function () { document.addEventListener("click", close); }, 80);
  }
  /* apply a PB().fields entry: right control → write to GHL → toast → cache locally */
  function applyField(fd, contactId, anchor, quick) {
    var cur = curFieldVal(fd.id);
    var write = function (v) {
      toast("Setting " + fd.name + "…");
      setField(contactId, fd.id, v)
        .then(function (r) { toast(r.ok ? fd.name + ": " + v : fd.name + " failed (HTTP " + r.status + ")", r.ok ? "ok" : "err"); if (r.ok) updateLocalCF(fd.id, v); })
        .catch(function () { toast(fd.name + " failed", "err"); });
    };
    if (fd.kind === "date") showDatePicker(anchor, cur, write, !!quick);
    else showOptionPicker(anchor, fd.options || [], cur, write);
  }
  /* legacy wrapper kept for any old caller */
  function showReasonPicker(anchor, cb) { showOptionPicker(anchor, PB().reasons, curFieldVal(BMW.fieldId(PB().reasonField)), cb); }

  /* ── Live donut update (no full re-render, so nothing flickers) ──────── */
  function updateDonut(b, contactId, stage, checks) {
    var st = (stateCache[contactId] || loadState(contactId))[stageKey(stage)] || {};
    var done = checks.filter(function (c) { return st[c.id] && st[c.id].done; }).length;
    var pct = checks.length ? Math.round(done / checks.length * 100) : 0;
    var R = 36, C = 2 * Math.PI * R, off = C - (pct / 100) * C;
    var fg = b.querySelector(".ring-fg"); if (fg) fg.setAttribute("stroke-dashoffset", off);
    var p = b.querySelector(".vdp-pct"); if (p) p.textContent = pct + "%";
  }

  /* ── Render ──────────────────────────────────────────────────────────── */
  function render() {
    // FIX 2026-08-24 (flicker): render() used to nuke + rebuild the banner on EVERY tick
    // (250ms burst for 15s), which made it flash and killed any dropdown mid-click.
    // It is now idempotent: it only touches the DOM when the painted state actually changes.
    var old = document.getElementById("vd-pulse-banner");
    if (!(window.BMW && BMW.active() && BMW.on("pulse")) || !onContactPage()) { if (old) old.remove(); lastSig = null; return; }
    // never rebuild while one of our own dropdowns is open — that is what stole the clicks
    if (old && (document.getElementById("vd-date-dd") || document.getElementById("vd-stage-dd") || document.getElementById("vd-input-dd"))) return;
    injectStyles();
    var contactId = getContactId(), locationId = getLocationId();
    if (!contactId || !locationId) { if (old) old.remove(); lastSig = null; return; }

    var rec = PIPE_CACHE[contactId];
    if (!rec) {
      // switching contacts: drop the stale banner instead of leaving another lead's data up
      if (old && lastSig && lastSig.indexOf(contactId + "|") !== 0) { old.remove(); lastSig = null; }
      detectFromAPI(contactId, locationId).then(function (r) { if (r) setTimeout(render, 30); });
      return;
    }

    var actualStage = rec.stage;
    var stage = PREVIEW[contactId] && rec.pipeline.stages.indexOf(PREVIEW[contactId]) >= 0 ? PREVIEW[contactId] : rec.stage;
    var stages = rec.pipeline.stages, idx = stages.indexOf(stage);
    var checks = PB().checklists[stage] || [];
    var st = (stateCache[contactId] || loadState(contactId))[stageKey(stage)] || {};
    var done = checks.filter(function (c) { return st[c.id] && st[c.id].done; }).length;
    var pct = checks.length ? Math.round(done / checks.length * 100) : 0;

    var days = rec.daysInStage;
    var slaCls = days == null ? "" : days <= 3 ? "ok" : days <= 7 ? "warn" : "risk";
    var slaTxt = days == null ? "—" : days <= 3 ? ("SLA on track · " + days + "d in stage") : days <= 7 ? ("Watch · " + days + "d in stage") : ("🔥 SLA risk · " + days + "d in stage");

    var R = 36, C = 2 * Math.PI * R, off = C - (pct / 100) * C;
    var linedW = "calc((100% - 72px) * " + (stages.length > 1 ? idx / (stages.length - 1) : 0) + ")";
    var inPreview = PREVIEW[contactId] && PREVIEW[contactId] !== actualStage;

    // Everything that can change the painted output. Same signature => leave the DOM alone.
    var sig = [contactId, stage, actualStage, idx, stages.length, checks.length, done, pct, days, inPreview ? 1 : 0].join("|");
    // ...UNLESS it is sitting in the body fallback (bottom of the page) while the real
    // anchor has since appeared. Without this the sig gate would freeze it down there.
    var tCol = document.querySelector("div.flex.h-full.py-3.pl-3.bg-background.w-full");
    var tWrap = tCol ? tCol.parentElement : null;
    var misplaced = !!(old && tWrap && tCol && old.parentNode !== tWrap);
    if (old && sig === lastSig && !misplaced) return;
    lastSig = sig;
    if (old) old.remove();

    var b = document.createElement("div"); b.id = "vd-pulse-banner";
    b.innerHTML =
      '<div class="vdp-head">' +
        '<div class="vdp-donut"><svg width="84" height="84" viewBox="0 0 84 84"><defs><linearGradient id="vdp-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:' + GOLD_L + '"/><stop offset="100%" style="stop-color:' + GOLD + '"/></linearGradient></defs>' +
          '<circle class="ring-bg" cx="42" cy="42" r="' + R + '"/><circle class="ring-fg" cx="42" cy="42" r="' + R + '" stroke-dasharray="' + C + '" stroke-dashoffset="' + off + '"/></svg>' +
          '<div class="vdp-cn"><span class="vdp-pct">' + pct + '%</span><span class="vdp-pctl">STAGE</span></div></div>' +
        '<div><div class="vdp-pipe">' + esc(rec.pipeline.name) + '</div><div class="vdp-stage">📍 ' + esc(stage) + '</div>' +
          '<div class="vdp-meta"><span class="vdp-chip">Stage ' + (idx + 1) + '/' + stages.length + '</span>' +
            '<span class="vdp-chip ' + slaCls + '">' + slaTxt + '</span></div></div>' +
        '<div style="display:flex">' +
          (inPreview ? '<button class="vdp-back" id="vdp-back">👁 ← back to ' + esc(actualStage) + '</button>' : '') +
          '<button class="vdp-move" id="vdp-move">Move stage →</button></div>' +
      '</div>' +
      '<div class="vdp-stepper"><div class="vdp-line"></div><div class="vdp-lined" style="width:' + linedW + '"></div>' +
        stages.map(function (s, i) { var cl = i < idx ? "done" : i === idx ? "cur" : ""; return '<div class="vdp-step" title="' + esc(s) + '"><div class="vdp-node ' + cl + '" data-sn="' + esc(s) + '">' + (i < idx ? "✓" : (i + 1)) + '</div></div>'; }).join("") +
      '</div>' +
      '<div class="vdp-cl">' +
        (checks.length === 0 ? '<div class="vdp-empty">No checklist defined for this stage yet.</div>' :
          checks.map(function (c) { var d = !!(st[c.id] && st[c.id].done); return '<div class="vdp-card ' + (d ? "done" : "") + '" data-step="' + c.id + '"><span class="vdp-ck" data-toggle></span><span class="vdp-cl-lbl">' + esc(c.label) + '</span><button class="vdp-cta" data-action="' + c.action + '">' + esc(c.cta) + '</button></div>'; }).join("")) +
      '</div>' +
      '<div class="vdp-foot">' + esc(BMW.brand()) + ' · ' + (CONFIG.checklistFieldId ? "checklist synced to contact" : (CONFIG.webhookUrl ? "state synced via webhook" : "state saved locally")) + '</div>';

    var threeCol = tCol, wrap = tWrap;
    if (wrap && threeCol) {
      wrap.style.display = "flex"; wrap.style.flexDirection = "column"; wrap.style.height = "100%";
      threeCol.style.flex = "1 1 auto"; threeCol.style.minHeight = "0";
      wrap.insertBefore(b, threeCol);
    } else { document.body.appendChild(b); }

    /* stepper preview */
    b.querySelectorAll(".vdp-node[data-sn]").forEach(function (n) {
      n.onclick = function (e) { e.stopPropagation(); var t = n.getAttribute("data-sn"); if (t === actualStage) delete PREVIEW[contactId]; else PREVIEW[contactId] = t; setTimeout(render, 20); };
    });
    var back = b.querySelector("#vdp-back"); if (back) back.onclick = function () { delete PREVIEW[contactId]; setTimeout(render, 20); };

    /* checklist toggles + CTA hooks */
    b.querySelectorAll(".vdp-card").forEach(function (card) {
      var id = card.getAttribute("data-step");
      var item = checks.filter(function (c) { return c.id === id; })[0] || { action: "navigate" };
      card.querySelector("[data-toggle]").onclick = function () { pushState(contactId, locationId, stage, id, !card.classList.contains("done")); card.classList.toggle("done"); updateDonut(b, contactId, stage, checks); };
      card.querySelector(".vdp-cta").onclick = function (e) { e.stopPropagation(); handleAction(item, contactId, locationId, e.currentTarget); if (!card.classList.contains("done")) { pushState(contactId, locationId, stage, id, true); card.classList.add("done"); updateDonut(b, contactId, stage, checks); } };
    });

    /* move stage */
    wireMove(b, contactId, locationId, rec);
  }

  /* ── Move stage (PUT opportunity) ────────────────────────────────────── */
  function wireMove(b, contactId, locationId, rec) {
    var btn = b.querySelector("#vdp-move"); if (!btn) return;
    btn.onclick = function (e) {
      e.stopPropagation();
      var ex = document.getElementById("vd-stage-dd"); if (ex) { ex.remove(); return; }
      if (!rec.stages || !rec.stages.length) { toast("Stages still loading…"); return; }
      var r = btn.getBoundingClientRect();
      var dd = document.createElement("div"); dd.id = "vd-stage-dd";
      dd.style.top = (r.bottom + 4) + "px"; dd.style.right = (window.innerWidth - r.right) + "px";
      dd.innerHTML = rec.stages.map(function (s) { var cur = s.id === rec.currentStageId; return '<div class="vd-dd-item ' + (cur ? "cur" : "") + '" data-sid="' + s.id + '" data-sname="' + esc(s.name) + '">' + (cur ? "● " : "○ ") + esc(s.name) + '</div>'; }).join("");
      document.body.appendChild(dd);
      dd.querySelectorAll(".vd-dd-item").forEach(function (it) {
        it.onclick = function (ev) { ev.stopPropagation(); dd.remove(); doMove(contactId, it.getAttribute("data-sid"), it.getAttribute("data-sname"), rec); };
      });
      setTimeout(function () { var close = function (ev) { if (!dd.contains(ev.target) && ev.target !== btn) { dd.remove(); document.removeEventListener("click", close); } }; document.addEventListener("click", close); }, 80);
    };
  }
  function doMove(contactId, stageId, stageName, rec) {
    if (!rec.oppId) { toast("Opportunity not loaded — try again", "err"); return; }
    toast("Moving to “" + stageName + "”…");
    api("/opportunities/" + rec.oppId, { method: "PUT", body: JSON.stringify({ pipelineStageId: stageId }) })
      .then(function (r) {
        if (!r.ok) { toast("Move failed: HTTP " + r.status, "err"); return; }
        rec.currentStageId = stageId; rec.stage = stageName; rec.daysInStage = 0; delete PREVIEW[contactId];
        toast("Moved to “" + stageName + "”", "ok"); setTimeout(render, 150);
      })
      .catch(function (e) { toast("Error: " + e.message, "err"); });
  }

  /* ── Action hooks → real GHL flows ───────────────────────────────────── */
  /* tag + note write through the GHL API V2 (PIT) — validated working, note
     needs no userId. call + calendar open GHL's native control. field +
     navigate focus the panel. Any checklist item can predefine its payload via
     an optional `meta`, otherwise it falls back to a prompt / scroll so every
     stage works out of the box:
        { action:'tag',   meta:{ tag:'pre-approved-active' } }    -> no prompt
        { action:'note',  meta:{ template:'Call result: ' } }     -> prefilled
        { action:'field', meta:{ field:'<customFieldId>' } }      -> prompt value
        { action:'navigate', meta:{ scrollTo:'#some-selector' } } -> scroll
     All three go through BMW.api() (signed-in user session or the site's proxy). */
  function addTag(cid, tag)        { return api("/contacts/" + cid + "/tags",  { method: "POST", body: JSON.stringify({ tags: [tag] }) }); }
  function addNote(cid, body)      { return api("/contacts/" + cid + "/notes", { method: "POST", body: JSON.stringify({ body: body }) }); }
  function setField(cid, fid, val) { return api("/contacts/" + cid,            { method: "PUT",  body: JSON.stringify({ customFields: [{ id: fid, value: val }] }) }); }
  function contactPhone() { var i = document.querySelector('#record-details-lhs input.hr-input-phone, #record-details-lhs input[type="tel"]'); return (i && i.value) || (window.__VD_CONTACT_DATA && window.__VD_CONTACT_DATA.phone) || ""; }
  function clickNative(needles) {
    var els = document.querySelectorAll('button,[role="button"],a');
    for (var i = 0; i < els.length; i++) {
      var t = ((els[i].getAttribute("aria-label") || els[i].getAttribute("title") || "") + "").toLowerCase();
      if (!t) continue;
      for (var j = 0; j < needles.length; j++) if (t.indexOf(needles[j]) !== -1) { els[i].click(); return true; }
    }
    return false;
  }
  /* Auto-press the dialer's green "start call" button once GHL renders it, so a
     single click on Call both OPENS the dialer AND places the call. That button is
     the only round, green, SVG-bearing control GHL shows in the dialpad; poll for
     it up to ~6s. Override VD_DIAL_START with a CSS selector if GHL changes it. */
  var VD_DIAL_START = "";
  function findDialerStartBtn() {
    if (VD_DIAL_START) { var sel = document.querySelector(VD_DIAL_START); if (sel && sel.offsetParent) return sel; }
    var all = document.querySelectorAll('button,[role="button"]');
    for (var i = 0; i < all.length; i++) {
      var b = all[i]; if (!b.offsetParent) continue;
      var r = b.getBoundingClientRect();
      if (r.width < 38 || r.width > 100 || Math.abs(r.width - r.height) > 16) continue;   // mid-size, ~circular
      var cs = getComputedStyle(b);
      if ((parseFloat(cs.borderRadius) || 0) < r.width * 0.28) continue;                   // round
      var m = (cs.backgroundColor || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) continue;
      var R2 = +m[1], G2 = +m[2], B2 = +m[3];
      if (G2 > 110 && G2 > R2 + 25 && G2 > B2 + 25 && b.querySelector("svg")) return b;     // green + icon
    }
    return null;
  }
  function autoStartCall() {
    if (window.__VD_AUTOCALL) return; window.__VD_AUTOCALL = 1;               // one arm per click
    var tries = 0, iv = setInterval(function () {
      tries++;
      var btn = findDialerStartBtn();
      if (btn) { clearInterval(iv); window.__VD_AUTOCALL = 0; btn.click(); toast("Calling…", "ok"); }
      else if (tries >= 24) { clearInterval(iv); window.__VD_AUTOCALL = 0; }  // ~6s -> dialer's open, place it manually
    }, 250);
  }
  function handleAction(item, contactId, locationId, anchor) {
    var meta = item.meta || {};
    switch (item.action) {
      case "call":
        // #5 (the team): call the contact directly, don't open the broken native dialer
        var ph = contactPhone();
        if (ph) { toast("Calling contact…"); location.href = "tel:" + ph.replace(/[^0-9+]/g, ""); break; }
        if (clickNative(["voice calling", "dialer", "call "])) { toast("Opening dialer…"); autoStartCall(); break; }
        toast("No phone on file", "err");
        break;
      case "reason":
        // #12: Reason Can't Buy Now dropdown (now shows the current value too)
        applyField(FIELD_BY_NAME(PB().reasonField), contactId, anchor);
        break;
      case "setfield":
        // #73: the checklist item points at a GHL field via meta.key → dropdown
        // (SINGLE_OPTIONS) or date picker (DATE), written straight to the contact.
        var _fd = FIELD(meta.key);
        if (_fd) applyField(_fd, contactId, anchor, !!(meta && meta.quick));
        else toast("Field not configured: " + meta.key, "err");
        break;
      case "note":
        showInputPicker(anchor, meta.template || "", "Log a note for this contact", function (nt) { if (nt == null || !String(nt).trim()) return; toast("Saving note…"); addNote(contactId, String(nt).trim()).then(function (r) { toast(r.ok ? "Note saved" : "Note failed (HTTP " + r.status + ")", r.ok ? "ok" : "err"); }).catch(function () { toast("Note failed", "err"); }); });
        break;
      case "tag":
        var _addTag = function (tg) { tg = String(tg == null ? "" : tg).trim(); if (!tg) return; toast("Adding tag…"); addTag(contactId, tg).then(function (r) { toast(r.ok ? "Tag added: " + tg : "Tag failed (HTTP " + r.status + ")", r.ok ? "ok" : "err"); }).catch(function () { toast("Tag failed", "err"); }); };
        if (meta.tag) _addTag(meta.tag); else showInputPicker(anchor, "", "Tag to add", _addTag);
        break;
      case "field":
        if (meta.field) { var _lbl = meta.label ? meta.label.split("—")[0].trim() : "Field"; showInputPicker(anchor, curFieldVal(meta.field), meta.label || "Set value", function (v) { v = String(v == null ? "" : v).trim(); if (!v) return; toast("Updating…"); setField(contactId, meta.field, v).then(function (r) { toast(r.ok ? (_lbl + ": " + v) : (_lbl + " failed (HTTP " + r.status + ")"), r.ok ? "ok" : "err"); if (r.ok) updateLocalCF(meta.field, v); }).catch(function () { toast(_lbl + " failed", "err"); }); }); break; }
        var p = document.getElementById("record-details-lhs"); if (p) { p.scrollIntoView({ behavior: "smooth", block: "start" }); var s = p.querySelector('input[placeholder*="Search"]'); if (s) s.focus(); toast("Edit the field in the panel"); }
        break;
      case "calendar":
        if (clickNative(["appointment", "calendar", "book", "schedule"])) { toast("Opening calendar…"); break; }
        toast("Open the calendar tab to book", "err");
        break;
      case "stage":
        var mb = document.getElementById("vdp-move"); if (mb) mb.click();
        break;
      default: // navigate
        var el = document.querySelector(meta.scrollTo || "#record-details-lhs"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ── SPA navigation + mount retry ────────────────────────────────────── */
  var lastUrl = location.href;
  setInterval(function () { if (location.href !== lastUrl) { lastUrl = location.href; setTimeout(render, 400); } }, 500);
  ["pushState", "replaceState"].forEach(function (m) {
    var orig = history[m]; if (typeof orig !== "function" || orig.__vdPatched) return;
    var patched = function () { var r = orig.apply(this, arguments); setTimeout(render, 120); return r; };
    patched.__vdPatched = true; history[m] = patched;
  });
  window.addEventListener("popstate", function () { setTimeout(render, 120); });
  window.addEventListener("bmw:change", function () { lastSig = null; setTimeout(render, 60); });   // site, theme or field ids changed

  function init() { render(); var n = 0, t = setInterval(function () { render(); if (++n >= 60) clearInterval(t); }, 250); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();


/* ===== BOARD - Opportunities board + sidebar CSS (active site only) ===== */
(function () {
  var CSS = "/* ============================================================================\n   the team — UI SKIN: BLACK + GOLD\n   ----------------------------------------------------------------------------\n   Paste this into the location's Custom CSS field\n   (GHL → Settings → ... → Custom CSS). CSS only — no <style> tag needed.\n\n   Two independent, fully-scoped sections:\n     A) SIDEBAR navigation   → #sidebar-v2\n     B) CONTACT DETAILS panel → #record-details-lhs\n\n   Everything is scoped to those two containers, so NOTHING else in the app\n   (top bar, conversations, dashboards, other locations) is affected.\n\n   Palette (matches the contact widget):\n     BG black ......... #2A2C31\n     surface .......... #33353B / #393B42 (cards, folder headers)\n     field bg ......... #2E3036\n     gold base ........ var(--bmw-c-d9b978)   (legible on black)\n     gold hover ....... var(--bmw-c-e8c77a)\n     gold active ...... var(--bmw-c-f2d89b) / var(--bmw-c-e8c77a)\n     gold rail/accent . var(--bmw-c-c9a35f)\n   Selectors captured live from the the team sub-account on 2026-06-05.\n   ============================================================================ */\n\n\n/* ╔══════════════════════════════════════════════════════════════════════╗\n   ║  SECTION A — SIDEBAR  (#sidebar-v2)                                     ║\n   ╚══════════════════════════════════════════════════════════════════════╝ */\n\n/* A1) Sidebar background → deep black (overrides GHL's .default-bg-color) */\n#sidebar-v2,\n#sidebar-v2 .default-bg-color {\n  background-color: #2A2C31 !important;\n}\n\n/* A2) Nav items (text + icon) → gold, fully opaque (GHL dims them to .7) */\n#sidebar-v2 a            { color: var(--bmw-c-d9b978) !important; opacity: 1 !important; }\n#sidebar-v2 a span,\n#sidebar-v2 a p          { color: var(--bmw-c-d9b978) !important; }\n#sidebar-v2 a svg        { color: var(--bmw-c-d9b978) !important; stroke: var(--bmw-c-d9b978) !important; }\n\n/* A3) Hover → brighter gold */\n#sidebar-v2 a:hover,\n#sidebar-v2 a:hover span,\n#sidebar-v2 a:hover p,\n#sidebar-v2 a:hover svg  { color: var(--bmw-c-e8c77a) !important; stroke: var(--bmw-c-e8c77a) !important; }\n\n/* A4) Active item → bright gold on a soft gold wash + left gold rail */\n#sidebar-v2 a.active,\n#sidebar-v2 a.exact-active {\n  background-color: rgba(var(--bmw-rgb-c9a35f),0.14) !important;\n  box-shadow: inset 3px 0 0 var(--bmw-c-c9a35f) !important;\n}\n#sidebar-v2 a.active span,        #sidebar-v2 a.active p,        #sidebar-v2 a.active svg,\n#sidebar-v2 a.exact-active span,  #sidebar-v2 a.exact-active p,  #sidebar-v2 a.exact-active svg {\n  color: var(--bmw-c-f2d89b) !important; stroke: var(--bmw-c-f2d89b) !important;\n}\n\n/* A5) Location switcher (top) → gold text on a subtle gold panel */\n#location-switcher-sidbar-v2 { background-color: rgba(var(--bmw-rgb-c9a35f),0.10) !important; }\n#location-switcher-sidbar-v2,\n#location-switcher-sidbar-v2 * { color: var(--bmw-c-e8c77a) !important; }\n\n/* A6) Search box (Ctrl/Cmd-K) → dark field, gold text + placeholder */\n#sidebar-v2 input {\n  background-color: #303237 !important;\n  color: var(--bmw-c-e8c77a) !important;\n  border-color: rgba(var(--bmw-rgb-c9a35f),0.25) !important;\n}\n#sidebar-v2 input::placeholder { color: rgba(var(--bmw-rgb-d9b978),0.55) !important; }\n\n/* A7) Dividers / section rules → faint gold */\n#sidebar-v2 hr { border-color: rgba(var(--bmw-rgb-c9a35f),0.15) !important; }\n\n\n/* ╔══════════════════════════════════════════════════════════════════════╗\n   ║  SECTION B — CONTACT DETAILS PANEL  (#record-details-lhs)               ║\n   ╚══════════════════════════════════════════════════════════════════════╝ */\n\n/* B1) Panel background + sticky \"Contact Details\" header → black\n   (the sticky header reuses the .bg-contacts-panel class, hence the 2nd rule) */\n#record-details-lhs { background-color: #2A2C31 !important; color: #F2F2F2 !important; }\n#record-details-lhs .bg-contacts-panel { background-color: #2A2C31 !important; }\n#record-details-lhs .hr-tabs-rail,\n#record-details-lhs .hr-tabs-nav { background-color: #2A2C31 !important; }\n\n/* B2) White/grey sub-cards (name block, field cards, collapse content) → dark surface */\n#record-details-lhs .bg-white,\n#record-details-lhs .bg-gray-50,\n#record-details-lhs .bg-gray-100,\n#record-details-lhs .hr-collapse-item__content-inner { background-color: #33353B !important; }\n\n/* B3) Folder headers (Contact / General Info / Loan Inquiry / ...) → dark */\n#record-details-lhs .hr-collapse-item__header          { background-color: #33353B !important; }\n#record-details-lhs .hr-collapse-item__header--active  { background-color: #393B42 !important; }\n/* To make folder header titles GOLD instead of white, uncomment:\n   #record-details-lhs .hr-collapse-item__header .hr-text { color:var(--bmw-c-d9b978) !important; } */\n\n/* B4) Field inputs → dark field + LIGHT value text.\n   IMPORTANT: GHL inputs use -webkit-text-fill-color, which Chrome prioritises\n   over `color`. Without the fill-color override the values stay near-black. */\n#record-details-lhs .hr-input { background-color: #2E3036 !important; }\n#record-details-lhs .hr-input__input-el {\n  color: #F2F2F2 !important;\n  -webkit-text-fill-color: #F2F2F2 !important;\n}\n#record-details-lhs .hr-input__input-el::placeholder {\n  color: #9aa0aa !important;\n  -webkit-text-fill-color: #9aa0aa !important;\n}\n#record-details-lhs .hr-input__border { border-color: rgba(255, 255, 255, 0.10) !important; }\n\n/* B5) Default buttons inside the panel → dark */\n#record-details-lhs .hr-button--default-type {\n  background-color: #33353B !important;\n  border-color: rgba(255, 255, 255, 0.10) !important;\n}\n\n/* B6) Text colours: titles/values light, labels muted */\n#record-details-lhs .text-gray-900,\n#record-details-lhs .hr-ellipsis,\n#record-details-lhs .hr-text { color: #F2F2F2 !important; }\n#record-details-lhs .hr-form-item-label__text,\n#record-details-lhs .text-gray-500,\n#record-details-lhs .text-gray-600,\n#record-details-lhs .text-gray-400 { color: #9aa0aa !important; }\n\n/* B7) Tabs (All fields / DND / Actions) → dark track, gold active */\n#record-details-lhs .hr-tabs-capsule      { background-color: rgba(var(--bmw-rgb-c9a35f),0.18) !important; }\n#record-details-lhs .hr-tabs-tab-wrapper  { background-color: transparent !important; }\n#record-details-lhs .hr-tabs-tab__label   { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab--active .hr-tabs-tab__label,\n#record-details-lhs .hr-tabs-tab--active  { color: var(--bmw-c-e8c77a) !important; }\n\n/* B8) Borders / dividers → faint */\n#record-details-lhs .border-gray-200,\n#record-details-lhs .border-gray-300,\n#record-details-lhs .border-t { border-color: rgba(255, 255, 255, 0.08) !important; }\n#record-details-lhs .border-primary-300 { border-color: rgba(var(--bmw-rgb-c9a35f),0.35) !important; }\n\n/* B9) Icons inside the panel → light grey */\n#record-details-lhs svg { color: #C9C7C2 !important; }\n\n/* B10) Field dropdowns / option menus (SINGLE_OPTIONS like Loan Purpose) -> dark\n   surface so the light option text stays legible. Before this, options rendered\n   as light text on the menu's default white background = invisible. */\n#record-details-lhs [class*='dropdown'],\n#record-details-lhs [class*='popover'],\n#record-details-lhs [class*='-menu'],\n#record-details-lhs [class*='select__option'],\n#record-details-lhs [class*='options-list'],\n#record-details-lhs [class*='option-list'],\n#record-details-lhs [role='listbox'],\n#record-details-lhs ul[role='menu'] {\n  background-color: #33353B !important;\n  border-color: rgba(var(--bmw-rgb-c9a35f),0.25) !important;\n}\n#record-details-lhs [role='option'],\n#record-details-lhs [class*='option'],\n#record-details-lhs [role='menuitem'],\n#record-details-lhs li[class*='item'] {\n  color: #F2F2F2 !important;\n  -webkit-text-fill-color: #F2F2F2 !important;\n  background-color: transparent !important;\n}\n#record-details-lhs [role='option']:hover,\n#record-details-lhs [class*='option']:hover,\n#record-details-lhs li[class*='item']:hover,\n#record-details-lhs [class*='option'][class*='active'],\n#record-details-lhs [class*='option'][class*='selected'],\n#record-details-lhs [aria-selected='true'] {\n  background-color: rgba(var(--bmw-rgb-c9a35f),0.18) !important;\n  color: var(--bmw-c-e8c77a) !important;\n  -webkit-text-fill-color: var(--bmw-c-e8c77a) !important;\n}\n\n/* B11) CONTRAST FIX (2026-06-17) - field VALUES + tag chips rendered dark-on-dark\n   (only visible when text-selected). GHL paints text via -webkit-text-fill-color,\n   which overrides our color; make the fill FOLLOW the color everywhere in the\n   panel so every value honours the light/gold/muted colours set above. Then give\n   the contact tag chips a visible dark+gold chip. */\n#record-details-lhs * { -webkit-text-fill-color: currentColor !important; }\n/* B11b) field VALUES were dark-on-dark. Diagnosed LIVE (2026-06-17): the dark text\n   comes from GHL classes B6 missed (.text-gray-700 = #344054), the Naive dropdown\n   value (.hr-base-selection-*, inherits #2C2E34), the input placeholder, raw\n   no-class nodes, and the inactive tabs. Fix the COLOR (fill follows it via the\n   rule above) so each value is legible WITHOUT flattening the gold/muted hierarchy.\n   Verified live in the the team sub-account: 0 dark nodes remaining. */\n#record-details-lhs *:not([class]) { color: #F2F2F2 !important; }\n#record-details-lhs .text-gray-700,\n#record-details-lhs .text-gray-800,\n#record-details-lhs .internal-source-link { color: #F2F2F2 !important; }\n#record-details-lhs .hr-input__placeholder { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab--active,\n#record-details-lhs .hr-tabs-tab--active * { color: var(--bmw-c-e8c77a) !important; }\n/* dropdown selected value (Naive UI selection) needs explicit fill + double-id\n   specificity to beat the inherited #2C2E34 */\n#record-details-new-ui #record-details-lhs [class*='base-selection'],\n#record-details-new-ui #record-details-lhs [class*='base-selection'] * { color: #F2F2F2 !important; -webkit-text-fill-color: #F2F2F2 !important; }\n#record-details-lhs [class*='tag-item'],\n#record-details-lhs [class*='contact-tag'],\n#record-details-lhs [class*='tags'] [class*='chip'],\n#record-details-lhs [class*='tags'] [class*='tag'],\n#record-details-lhs .hl-text-input-tag {\n  background-color: rgba(var(--bmw-rgb-c9a35f),0.16) !important;\n  border: 1px solid rgba(var(--bmw-rgb-c9a35f),0.45) !important;\n  color: var(--bmw-c-e8c77a) !important;\n}\n#record-details-lhs [class*='tag-item'] *,\n#record-details-lhs [class*='contact-tag'] *,\n#record-details-lhs [class*='tags'] [class*='chip'] *,\n#record-details-lhs [class*='tags'] [class*='tag'] * {\n  color: var(--bmw-c-e8c77a) !important;\n}\n\n/* B11c) .hr-tag chips (2026-07-21) — GHL renders the Actions -> Workflows chips AND\n   the contact tags as .hr-tag, which B11b's [class*='tag-item']/contact-tag selectors\n   do NOT match. Result: workflow chips = white bg + light text (unreadable, contrast\n   ~1.1); contact tags = gold-on-gold. Force a dark chip with legible gold text.\n   Diagnosed + verified LIVE in the team (contact npkDVhwFRrx4TPA3zTPN): 1.1 -> 7.5. */\n#record-details-lhs .hr-tag {\n  background-color: #33353B !important;\n  border-color: rgba(var(--bmw-rgb-c9a35f),0.40) !important;\n}\n#record-details-lhs .hr-tag * {\n  background-color: transparent !important;\n  color: var(--bmw-c-e8c77a) !important;\n  -webkit-text-fill-color: var(--bmw-c-e8c77a) !important;\n}\n\n/* ==================== BEGIN BOARD PIPELINE V2 ====================\n   PEGAR TODO ESTE ARCHIVO AL FINAL DE CUSTOM CSS.\n   Settings > Company > White Label > Custom CSS.\n   CSS puro: sin etiquetas <style> y sin Custom JS.\n   Conserva el CSS existente; si hay un bloque BOARD anterior, sustituirlo.\n   Alcance: tablero Kanban de oportunidades de las subcuentas.\n   No se limita a una sola ubicacion. No modifica otras secciones.\n\n   Brillo: variacion determinista mediante CSS, no azar real.\n   Se aplica a algunas filas, con ciclos y esperas diferentes.\n   Cada tarjeta seleccionada destella ~2-4 segundos cada 3-6.3 minutos.\n   Al cambiar de vista o montarse otra columna, sus tiempos pueden reiniciarse.\n   Respeta prefers-reduced-motion y se pausa al interactuar con la tarjeta.\n   No modifica datos ni utiliza recursos externos.\n   ================================================================= */\n\n/* BOARD scope fix | 2026-09-29: GHL now puts .crm-opportunities-page on the #OpportunitiesList div itself.\n   Scope = :is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page) so it works\n   with the old (nested) and the new (same element) markup. Same specificity as before. */\n/* BOARD — Accent ingot pipeline preview | 2026-09-10\n   CSS only. Restricted to the OpportunitiesList kanban page.\n   No global .card / .button rules. Native column positions, drag handles,\n   values, navigation and collapsed stages are preserved. */\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) { --au-paper:var(--bmw-c-f2f0e9); --au-ink:#29261e; --au-muted:#807b70; --au-line:#ded9ce; background:var(--au-paper) !important; }\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-content {\n  background:var(--au-paper) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-top-bar,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-views-bar,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-content > .quick-filter-bar {\n  background:var(--au-paper) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon {\n  background:transparent !important; border-bottom:1px solid var(--au-line); padding-top:12px; padding-bottom:12px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon .count {\n  color:var(--bmw-c-73664a) !important; background:var(--bmw-c-e9e3d5) !important; border-radius:4px !important; font-variant-numeric:tabular-nums;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #pipelineDropdDown-listview .hr-base-selection {\n  background:var(--bmw-c-fbfaf6) !important; --n-text-color:#29261e !important; --n-border:1px solid #cec8bb !important; --n-border-radius:5px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #pipelineDropdDown-listview .hr-base-selection-overlay__wrapper {\n  font-family:Georgia,\"Times New Roman\",serif; font-size:20px; letter-spacing:-.35px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar #add-record-btn {\n  background:#29261e !important; border-color:#29261e !important; color:var(--bmw-c-fff9e8) !important; border-radius:5px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-views-bar {\n  border-bottom:1px solid var(--au-line) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .quick-filter-bar #list-view-advance-filter-btn,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .quick-filter-bar div#list-view-sort-btn {\n  background:var(--bmw-c-f9f7f1) !important; border-color:var(--bmw-c-d6cebd) !important; color:#504938 !important; border-radius:5px !important; box-shadow:none !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .quick-filter-bar .search-box {\n  background:var(--bmw-c-fbfaf6) !important; border-color:var(--bmw-c-d6cebd) !important; border-radius:5px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .quick-filter-bar #list-view-record-search {\n  background:transparent !important; color:var(--au-ink) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .stage-scrollable-container {\n  background:var(--au-paper) !important; scrollbar-color:#b8b1a2 transparent; scrollbar-width:thin;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-board,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-kanban,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container {\n  background:transparent !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage:has(> .crm-opportunities-stage-header) {\n  background:transparent !important; border-left:1px solid #d5d0c3; box-shadow:inset 2px 0 0 var(--bmw-c-fffaf0);\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header {\n  position:relative; flex-shrink:0; min-height:168px !important; max-height:none !important; margin:0 0 8px !important; padding:63px 17px 13px !important; border:0 !important; border-radius:0 !important; background:transparent !important; box-shadow:none !important; overflow:visible !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header > .ui-card-content {\n  padding:0 !important; background:transparent !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header::before {\n  content:\"ETAPA\"; position:absolute; top:29px; left:17px; font:500 11px/1.1 \"Courier New\",monospace; letter-spacing:2px; color:#8d8574; pointer-events:none;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header::after {\n  content:\"\"; position:absolute; top:29px; left:84px; width:11px; height:11px; background:var(--6347135c,var(--bmw-c-cdbb8f)); box-shadow:inset 0 0 0 1px #6c613c18; pointer-events:none;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-name {\n  color:var(--au-ink) !important; font:500 19px/1.2 Georgia,\"Times New Roman\",serif !important; letter-spacing:-.3px; white-space:normal !important; overflow:visible !important; min-height:24px; align-items:flex-start;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header .stage-collapse-btn {\n  color:#8c8575 !important; border-radius:4px !important; align-self:flex-start;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-stats {\n  display:flex; flex-direction:column; gap:3px; padding-top:10px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-count {\n  color:#7b766b !important; font-size:12px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-value {\n  color:var(--bmw-c-373124) !important; font-size:13px !important; font-weight:600 !important; font-variant-numeric:tabular-nums;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-cards {\n  position:relative; padding:5px 10px 12px !important; border:0 !important; border-radius:0 !important; background:linear-gradient(90deg,transparent 3px,var(--bmw-c-d7d1c3) 4px,var(--bmw-c-fffdf6) 6px,transparent 8px,transparent calc(100% - 8px),var(--bmw-c-d7d1c3) calc(100% - 6px),var(--bmw-c-fffdf6) calc(100% - 4px),transparent calc(100% - 2px)) !important; box-shadow:none !important; scrollbar-width:thin; scrollbar-color:var(--bmw-c-c6bc9f) transparent;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-cards:has(> .min-h-full:empty)::before {\n  content:\"\"; display:block; position:absolute; top:48px; left:calc(50% - 35px); width:70px; height:42px; border:1px solid #c6bfae; border-radius:3px; transform:skew(-13deg) rotate(-8deg); box-shadow:3px 5px 0 -1px var(--au-paper),4px 6px 0 0 #d0c9ba; opacity:.6; pointer-events:none;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-wrapper {\n  position:relative; margin-bottom:16px !important; filter:drop-shadow(0 5px 3px #58431d32);\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card {\n  position:relative; padding:7px 7px 10px !important; border:0 !important; border-radius:0 !important; clip-path:polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 13px),calc(100% - 13px) 100%,13px 100%,0 calc(100% - 13px),0 12px); background:conic-gradient(from 0deg at 50% 50%,var(--bmw-c-f7e2a2) 0deg,var(--bmw-c-b8892d) 78deg,var(--bmw-c-8b641e) 145deg,var(--bmw-c-79541b) 195deg,var(--bmw-c-d2a744) 260deg,var(--bmw-c-fff1b7) 315deg,var(--bmw-c-f7e2a2) 360deg) !important; box-shadow:inset 0 1px 0 var(--bmw-c-fff5ca),inset 0 -3px 0 var(--bmw-c-7e5a23) !important; color:var(--bmw-c-352811) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card > .ui-card-content {\n  position:relative; padding:13px 12px 12px !important; clip-path:polygon(6px 0,calc(100% - 6px) 0,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0 calc(100% - 6px),0 6px); background:repeating-linear-gradient(105deg,#ffffff05 0px,#ffffff05 1px,#62400004 1px,#62400004 3px),linear-gradient(118deg,var(--bmw-c-f8dfa0) 0%,var(--bmw-c-f1d183) 32%,var(--bmw-c-e8c06a) 67%,var(--bmw-c-e0b55a) 100%) !important; box-shadow:inset 0 1px 0 var(--bmw-c-fff6d0),inset 1px 0 0 var(--bmw-c-fff0b9),inset -1px -1px 0 var(--bmw-c-a37d34);\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-header {\n  align-items:flex-start !important; gap:7px !important; padding-bottom:11px; border-bottom:1px solid #97712966; box-shadow:0 1px 0 #fff1bc80; min-height:36px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-name a {\n  font:600 17px/1.2 Georgia,\"Times New Roman\",serif !important; color:var(--bmw-c-34250c) !important; white-space:normal !important; overflow-wrap:anywhere; text-decoration:none !important; letter-spacing:-.2px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-name a:hover {\n  text-decoration:underline !important; text-underline-offset:3px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-assignee .hr-avatar {\n  background:var(--bmw-c-eed18d) !important; border:1px solid var(--bmw-c-93712f) !important; color:var(--bmw-c-5a411b) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-fields {\n  padding-top:9px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-fields td {\n  color:var(--bmw-c-58411d) !important; font-size:12px !important; height:25px !important; padding-top:3px !important; padding-bottom:3px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-fields td:first-child {\n  font:500 10px/1.4 \"Courier New\",monospace !important; text-transform:uppercase; letter-spacing:.7px; color:var(--bmw-c-6a5229) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-fields td:nth-child(2) {\n  color:var(--bmw-c-352811) !important; font-weight:500;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card > .ui-card-content > .flex:last-child {\n  padding-top:11px !important; gap:2px; color:var(--bmw-c-684c20) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card > .ui-card-content > .flex:last-child svg {\n  color:var(--bmw-c-684c20) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card .bg-blue-600 {\n  background:var(--bmw-c-5a421b) !important; color:var(--bmw-c-fff5d6) !important; box-shadow:0 0 0 1px var(--bmw-c-edcc7d);\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-wrapper:focus-visible {\n  outline:2px solid var(--bmw-c-866324); outline-offset:3px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage:not(:has(> .crm-opportunities-stage-header)) {\n  border-color:var(--bmw-c-d4ccbb) !important; border-radius:3px !important; box-shadow:inset 1px 0 0 var(--bmw-c-fffdf6);\n}\n\n/* BOARD v2 — prominent totals and occasional CSS-only sheen. */\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon .left-box {\n  height:auto !important; min-height:44px; align-items:center;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon .count {\n  padding:9px 15px !important; background:#2f2a20 !important; color:var(--bmw-c-f5dfa2) !important; border:1px solid var(--bmw-c-8d7444); border-radius:6px !important; font:600 18px/1.3 Inter,Arial,sans-serif !important; letter-spacing:-.25px; box-shadow:inset 0 1px 0 #fff1b020,0 2px 4px #45320c14; white-space:nowrap;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header {\n  padding-top:43px !important; min-height:178px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header::before,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header::after {\n  top:19px;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-stats {\n  gap:6px; padding-top:13px !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-count {\n  color:#655b48 !important; font-size:14px !important; font-weight:600 !important; line-height:1.4;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-value {\n  flex:none !important; color:var(--bmw-c-3c2d12) !important; font:600 28px/1.15 Georgia,\"Times New Roman\",serif !important; letter-spacing:-.6px; font-variant-numeric:tabular-nums; white-space:normal !important; overflow-wrap:anywhere;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition {\n  --au-sheen-cycle:211s; --au-column-wait:43s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition:nth-child(2n) {\n  --au-sheen-cycle:257s; --au-column-wait:63s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition:nth-child(3n) {\n  --au-sheen-cycle:181s; --au-column-wait:11s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition:nth-child(5n) {\n  --au-sheen-cycle:307s; --au-column-wait:97s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-cards > .min-h-full > div {\n  --au-row-wait:17s; --au-row-cycle:0s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-cards > .min-h-full > div:nth-child(3n) {\n  --au-row-wait:79s; --au-row-cycle:37s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-cards > .min-h-full > div:nth-child(5n) {\n  --au-row-wait:131s; --au-row-cycle:73s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-cards > .min-h-full > div:is(:nth-child(4n + 1), :nth-child(7n + 3)) .crm-opportunities-card > .ui-card-content::after {\n  content:\"\"; position:absolute; top:-15%; bottom:-15%; left:-50%; width:45%; z-index:2; pointer-events:none; opacity:0; transform:translateX(-30%) skewX(-20deg); background:linear-gradient(90deg,transparent 0%,#fffbea10 24%,#fffbeaa6 49%,#ffffffc2 52%,#fff2bd2e 75%,transparent 100%); animation-name:au-pipeline-ingot-sheen-v2; animation-duration:calc(var(--au-sheen-cycle,211s) + var(--au-row-cycle,0s)); animation-delay:calc(var(--au-column-wait,43s) + var(--au-row-wait,17s)); animation-timing-function:linear; animation-iteration-count:infinite;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card:hover > .ui-card-content::after,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card:focus-within > .ui-card-content::after {\n  animation-play-state:paused; opacity:0 !important;\n}\n\n@keyframes au-pipeline-ingot-sheen-v2 {\n  0%, 98.8% { opacity:0; transform:translateX(-30%) skewX(-20deg); }\n  99.05% { opacity:.48; }\n  99.8% { opacity:.38; transform:translateX(500%) skewX(-20deg); }\n  100% { opacity:0; transform:translateX(500%) skewX(-20deg); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card > .ui-card-content::after {\n  content:none !important; animation:none !important;\n}\n\n}\n\n\n/* BOARD — metallic accent totals, subtle motion. */\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon .count {\n  color:var(--bmw-c-3b2a0e) !important; background:linear-gradient(105deg,var(--bmw-c-bf923c) 0%,var(--bmw-c-e3c36f) 27%,var(--bmw-c-f4df9d) 46%,var(--bmw-c-e3c36f) 58%,var(--bmw-c-bc8d36) 100%) !important; background-size:250% 100% !important; background-position:var(--au-total-sheen-x,100%) 50% !important; border-color:var(--bmw-c-a17932) !important; box-shadow:inset 0 1px 0 var(--bmw-c-fff3c9),inset 0 -1px 0 var(--bmw-c-916720),0 2px 5px #60441d26; text-shadow:0 1px 0 #fff5d25c; animation:au-pipeline-total-metal-v3 32s ease-in-out infinite;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-value {\n  color:var(--bmw-c-916917) !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition:nth-child(2n) {\n  --au-total-phase:-11s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition:nth-child(3n) {\n  --au-total-phase:-19s;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stages-container > .stage-column-transition:nth-child(5n) {\n  --au-total-phase:-5s;\n}\n\n@supports ((background-clip:text) or (-webkit-background-clip:text)) {\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-value {\n  background:linear-gradient(105deg,var(--bmw-c-7c5715) 0%,var(--bmw-c-987024) 33%,var(--bmw-c-a77b25) 48%,var(--bmw-c-987024) 63%,var(--bmw-c-7c5715) 100%) !important; background-size:250% 100% !important; background-position:var(--au-total-sheen-x,100%) 50% !important; background-clip:text !important; -webkit-background-clip:text !important; color:transparent !important; -webkit-text-fill-color:transparent; animation:au-pipeline-total-metal-v3 28s ease-in-out infinite; animation-delay:var(--au-total-phase,0s);\n}\n\n}\n\n@property --au-total-sheen-x {\n  syntax:\"<percentage>\";\n  inherits:false;\n  initial-value:100%;\n}\n\n@keyframes au-pipeline-total-metal-v3 {\n  0%, 80% { --au-total-sheen-x:100%; }\n  94%, 100% { --au-total-sheen-x:0%; }\n}\n\n@media (prefers-reduced-motion:reduce) {\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon .count,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-value {\n  animation:none !important; background-position:50% 50% !important;\n}\n\n}\n\n@media (forced-colors:active) {\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar .pipeline-ribbon .count,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-value {\n  animation:none !important; background:none !important; color:CanvasText !important; -webkit-text-fill-color:CanvasText !important; text-shadow:none !important;\n}\n\n}\n\n/* ===================== END BOARD PIPELINE V2 ===================== */\n\n/* ===================== BEGIN BOARD SIDEBAR ===================== */\n\n/* BOARD SIDEBAR — Obsidian / bronze. Scoped to the subaccount sidebar. */\n.sidebar-v2-location #sidebar-v2 {\n  background:radial-gradient(ellipse 120% 35% at 0% 0%,#94622930,transparent 78%),radial-gradient(ellipse 160% 58% at 115% 100%,#845f2c24,transparent 80%),repeating-linear-gradient(113deg,#ffffff02 0px,#ffffff02 1px,transparent 1px,transparent 4px),linear-gradient(165deg,#201d19 0%,#151617 42%,#191816 100%) !important; border-right:1px solid #8c693d70 !important; box-shadow:inset -1px 0 0 #e0b26624,10px 0 26px #18141114;\n}\n\n.sidebar-v2-location #sidebar-v2 .lead-connector {\n  background:transparent !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .agency-logo-container {\n  margin:8px 12px 15px !important; padding:11px 8px !important; min-height:66px; border:1px solid #b9975c40; border-radius:8px; background:radial-gradient(ellipse at 50% 5%,#b4823c25,transparent 75%),linear-gradient(150deg,#29251f,#17191b) !important; box-shadow:inset 0 1px 0 #f3d89a13,inset 0 -1px 0 #0009,0 5px 12px #0004;\n}\n\n.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 {\n  border:1px solid #c49b5440 !important; background:linear-gradient(115deg,#302a22,#25231f) !important; border-radius:7px !important; padding-top:7px !important; padding-bottom:7px !important; box-shadow:inset 0 1px 0 #ead5a514,0 2px 5px #0002;\n}\n\n.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-name {\n  color:var(--bmw-c-ecdbb6) !important; font-weight:600 !important;\n}\n\n.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .hl_switcher-loc-city {\n  color:#b9ad96 !important;\n}\n\n.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2 .switcher-caret-holder {\n  color:var(--bmw-c-d8b77a) !important;\n}\n\n.sidebar-v2-location #sidebar-v2 #globalSearchOpener {\n  background:linear-gradient(180deg,#121416,#1b1d1e) !important; border:1px solid #85714c61 !important; border-radius:5px !important; box-shadow:inset 0 2px 4px #0005; color:var(--bmw-c-d6cab5) !important;\n}\n\n.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-placeholder,\n.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-icon {\n  color:var(--bmw-c-cabfa9) !important;\n}\n\n.sidebar-v2-location #sidebar-v2 #globalSearchOpener .search-shortcut {\n  background:#34322d !important; color:var(--bmw-c-e1d3b5) !important; border:1px solid #9b835940; border-radius:3px;\n}\n\n.sidebar-v2-location #sidebar-v2 #quickActions {\n  background:linear-gradient(145deg,var(--bmw-c-423623),#2b281f) !important; border:1px solid #8c713f80 !important; border-radius:5px !important; box-shadow:inset 0 1px 0 #fff0bd1a;\n}\n\n.sidebar-v2-location #sidebar-v2 #quickActions > img {\n  filter:grayscale(1) brightness(1.9) sepia(.65);\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header {\n  scrollbar-width:thin; scrollbar-color:#79633f55 transparent; padding-bottom:70px; scroll-padding-bottom:70px;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a {\n  position:relative; width:calc(100% - 12px) !important; min-height:44px; margin:3px 6px !important; padding:9px 11px !important; border:1px solid #e8d2a610 !important; border-radius:7px !important; background:linear-gradient(110deg,#ffffff04,transparent) !important; color:var(--bmw-c-d9d0bf) !important; opacity:1 !important; box-shadow:inset 0 1px 0 #ffffff04; transition:color 180ms ease,border-color 180ms ease,box-shadow 180ms ease !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a .nav-title,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a .nav-title {\n  color:inherit !important; font-size:13px !important; font-weight:500 !important; letter-spacing:.08px;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a > svg,\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a > i,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a > svg,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a > i {\n  color:var(--bmw-c-c3a16a) !important; stroke:currentColor !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a > img,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a > img {\n  filter:brightness(0) saturate(100%) invert(77%) sepia(20%) saturate(679%) hue-rotate(356deg) brightness(89%) contrast(86%) !important; opacity:.94 !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:hover,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:hover {\n  background:linear-gradient(110deg,#97703c38,#ceab6d0c) !important; border-color:#c4a36a57 !important; color:var(--bmw-c-f4e4c2) !important; box-shadow:inset 3px 0 0 #c9a26290,inset 0 1px 0 #ffe6b10d,0 3px 8px #0002;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:is(.active,.exact-active),\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:is(.active,.exact-active) {\n  background:linear-gradient(115deg,var(--bmw-c-edd18b) 0%,var(--bmw-c-daba70) 38%,var(--bmw-c-cea75a) 78%,var(--bmw-c-b88a3a) 100%) !important; border:1px solid var(--bmw-c-e7ca82) !important; color:var(--bmw-c-342711) !important; box-shadow:inset 0 1px 0 var(--bmw-c-fff0bf),inset 0 -2px 0 var(--bmw-c-97702d),0 5px 11px #0006; text-shadow:0 1px 0 #fff2c34d;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:is(.active,.exact-active) .nav-title,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:is(.active,.exact-active) .nav-title {\n  color:var(--bmw-c-342711) !important; font-weight:700 !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:is(.active,.exact-active) > img,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:is(.active,.exact-active) > img {\n  filter:brightness(0) !important; opacity:.77 !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:is(.active,.exact-active) > svg,\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:is(.active,.exact-active) > i,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:is(.active,.exact-active) > svg,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:is(.active,.exact-active) > i {\n  color:var(--bmw-c-463217) !important; stroke:currentColor !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a:focus-visible,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a:focus-visible,\n.sidebar-v2-location #sidebar-v2 #globalSearchOpener:focus-visible,\n.sidebar-v2-location #sidebar-v2 #location-switcher-sidbar-v2:focus-visible {\n  outline:2px solid var(--bmw-c-f0d394) !important; outline-offset:2px !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > .divider {\n  background:transparent !important; border:0 !important; padding:0 15px !important;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > .divider > p {\n  border:0 !important; height:1px; margin:14px 0 !important; background:linear-gradient(90deg,transparent,#b5914b70,transparent);\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings {\n  background:linear-gradient(180deg,#18191900,#181919 25%) !important; padding-top:10px;\n}\n\n.sidebar-v2-location #sidebar-v2 .hl_collapse-button {\n  color:var(--bmw-c-cfad6c) !important; background:#26241f !important; box-shadow:0 0 0 1px #b18d534d,0 2px 5px #0004;\n}\n\n.sidebar-v2-location.v2-collapse #sidebar-v2 .agency-logo-container { margin:8px 5px 15px !important; padding:3px !important; min-height:46px; }\n.sidebar-v2-location.v2-collapse #sidebar-v2 .agency-logo { width:40px !important; height:40px !important; max-width:none !important; flex-shrink:0; transform:scale(.72); transform-origin:center; }\n.sidebar-v2-location.v2-collapse #sidebar-v2 .hl_nav-header > nav > a,\n.sidebar-v2-location.v2-collapse #sidebar-v2 .hl_nav-settings > nav > a { padding-left:10px !important; padding-right:10px !important; }\n\n@media (prefers-reduced-motion:reduce) {\n.sidebar-v2-location #sidebar-v2 .hl_nav-header > nav > a,\n.sidebar-v2-location #sidebar-v2 .hl_nav-settings > nav > a {\n  transition:none !important;\n}\n\n}\n\n.sidebar-v2-location.v2-collapse #sidebar-v2 .hl_nav-header { scrollbar-width:none !important; }\n.sidebar-v2-location.v2-collapse #sidebar-v2 .hl_nav-header::-webkit-scrollbar { display:none; }\n.sidebar-v2-location.v2-collapse #sidebar-v2 .hl_nav-header > nav > a > :is(img,svg),\n.sidebar-v2-location.v2-collapse #sidebar-v2 .hl_nav-settings > nav > a > :is(img,svg) { width:20px !important; height:20px !important; flex-shrink:0 !important; }\n\n/* ====================== END BOARD SIDEBAR ====================== */\n\n/* ===================== BEGIN BOARD CLICK =====================\n   Respuesta al pulsar: presion suave + reflejo al soltar.\n   Solo CSS :active. Sin JS, eventos, timers ni animaciones nuevas en bucle.\n   El reflejo nace del centro del elemento, no de la posicion del cursor.\n   scale se aplica a la tarjeta interior; no al contenedor de arrastre.\n   Con movimiento reducido se conserva la respuesta nativa sin este efecto.\n   =============================================================== */\n\n@media (prefers-reduced-motion: no-preference) {\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar :is(#add-record-btn, #import-btn, #data-field-download):not(:disabled):not([aria-disabled=\"true\"]),\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .quick-filter-bar :is(button:has(#list-view-advance-filter-btn), div#list-view-sort-btn, button.manage-fields):not(:disabled):not([aria-disabled=\"true\"]),\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header .stage-collapse-btn:not(:disabled):not([aria-disabled=\"true\"]) {\n  transition:scale 180ms ease-out,box-shadow 180ms ease-out !important;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) #newTopBar :is(#add-record-btn, #import-btn, #data-field-download):not(:disabled):not([aria-disabled=\"true\"]):active,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .quick-filter-bar :is(button:has(#list-view-advance-filter-btn), div#list-view-sort-btn, button.manage-fields):not(:disabled):not([aria-disabled=\"true\"]):active,\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-stage-header .stage-collapse-btn:not(:disabled):not([aria-disabled=\"true\"]):active {\n  scale:.975;\n  box-shadow:inset 0 0 0 1px #c6a15b99,inset 0 0 12px #e7c37d40 !important;\n  transition-duration:70ms !important;\n}\n\n.sidebar-v2-location #sidebar-v2 :is(.hl_nav-header, .hl_nav-settings) > nav > a:not([aria-disabled=\"true\"]) {\n  transition:scale 180ms ease-out,color 180ms ease,border-color 180ms ease,box-shadow 180ms ease !important;\n}\n\n.sidebar-v2-location #sidebar-v2 :is(.hl_nav-header, .hl_nav-settings) > nav > a:not([aria-disabled=\"true\"]):active {\n  scale:.985;\n  transition-duration:70ms !important;\n}\n\n.sidebar-v2-location #sidebar-v2 :is(.hl_nav-header, .hl_nav-settings) > nav > a:not([aria-disabled=\"true\"])::after {\n  content:\"\";\n  position:absolute;\n  inset:0;\n  border-radius:inherit;\n  background:radial-gradient(ellipse at center,var(--bmw-c-ffe9a9) 0%,#e7bd6655 48%,transparent 78%);\n  opacity:0;\n  pointer-events:none;\n  transition:opacity 240ms ease-out;\n}\n\n.sidebar-v2-location #sidebar-v2 :is(.hl_nav-header, .hl_nav-settings) > nav > a:not([aria-disabled=\"true\"]):active::after {\n  opacity:.19;\n  transition-duration:40ms;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-wrapper[role=\"button\"]:not([aria-disabled=\"true\"]) .crm-opportunities-card {\n  transition:scale 180ms ease-out;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-wrapper[role=\"button\"]:not([aria-disabled=\"true\"]):active .crm-opportunities-card {\n  scale:.992;\n  transition-duration:70ms;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-wrapper[role=\"button\"]:not([aria-disabled=\"true\"]) .crm-opportunities-card > .ui-card-content::before {\n  content:\"\";\n  position:absolute;\n  inset:0;\n  z-index:3;\n  background:linear-gradient(115deg,transparent 12%,var(--bmw-c-fff2bd) 50%,transparent 88%);\n  opacity:0;\n  pointer-events:none;\n  transition:opacity 240ms ease-out;\n}\n\n:is(#OpportunitiesList.crm-opportunities-page, #OpportunitiesList .crm-opportunities-page):has(.crm-opportunities-kanban) .crm-opportunities-card-wrapper[role=\"button\"]:not([aria-disabled=\"true\"]):active .crm-opportunities-card > .ui-card-content::before {\n  opacity:.15;\n  transition-duration:40ms;\n}\n}\n/* ====================== END BOARD CLICK ====================== */";
  function apply() {
    var on = !!(window.BMW && BMW.active() && BMW.on("board")), ex = document.getElementById('bmw-board-css');
    if (!on) { if (ex) ex.remove(); return; }
    if (ex) return;
    var s = document.createElement('style'); s.id = 'bmw-board-css'; s.textContent = CSS; (document.head || document.documentElement).appendChild(s);
  }
  apply(); setInterval(apply, 1500); window.addEventListener("bmw:change", apply);
})();

