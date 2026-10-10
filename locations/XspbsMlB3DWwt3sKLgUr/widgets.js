/* Mortgage Brokers demo widgets (location XspbsMlB3DWwt3sKLgUr). Loaded by the agency loader; do not paste into GHL. */
/* ===== PART 0 - UI SKIN ===== */
(function(){
  var CSS = "/* ============================================================================\n   MB — UI SKIN: BLACK + GOLD\n   ----------------------------------------------------------------------------\n   Paste this into the location\u0027s Custom CSS field\n   (GHL → Settings → ... → Custom CSS). CSS only — no \u003cstyle\u003e tag needed.\n\n   Two independent, fully-scoped sections:\n     A) SIDEBAR navigation   → #sidebar-v2\n     B) CONTACT DETAILS panel → #record-details-lhs\n\n   Everything is scoped to those two containers, so NOTHING else in the app\n   (top bar, conversations, dashboards, other locations) is affected.\n\n   Palette (matches the contact widget):\n     BG black ......... #2A2C31\n     surface .......... #33353B / #393B42 (cards, folder headers)\n     field bg ......... #2E3036\n     gold base ........ #D9B978   (legible on black)\n     gold hover ....... #E8C77A\n     gold active ...... #F2D89B / #E8C77A\n     gold rail/accent . #C9A35F\n   Selectors captured live from the MB sub-account on 2026-06-05.\n   ============================================================================ */\n\n\n/* ╔══════════════════════════════════════════════════════════════════════╗\n   ║  SECTION A — SIDEBAR  (#sidebar-v2)                                     ║\n   ╚══════════════════════════════════════════════════════════════════════╝ */\n\n/* A1) Sidebar background → deep black (overrides GHL\u0027s .default-bg-color) */\n#sidebar-v2,\n#sidebar-v2 .default-bg-color {\n  background-color: #2A2C31 !important;\n}\n\n/* A2) Nav items (text + icon) → gold, fully opaque (GHL dims them to .7) */\n#sidebar-v2 a            { color: #D9B978 !important; opacity: 1 !important; }\n#sidebar-v2 a span,\n#sidebar-v2 a p          { color: #D9B978 !important; }\n#sidebar-v2 a svg        { color: #D9B978 !important; stroke: #D9B978 !important; }\n\n/* A3) Hover → brighter gold */\n#sidebar-v2 a:hover,\n#sidebar-v2 a:hover span,\n#sidebar-v2 a:hover p,\n#sidebar-v2 a:hover svg  { color: #E8C77A !important; stroke: #E8C77A !important; }\n\n/* A4) Active item → bright gold on a soft gold wash + left gold rail */\n#sidebar-v2 a.active,\n#sidebar-v2 a.exact-active {\n  background-color: rgba(201, 163, 95, 0.14) !important;\n  box-shadow: inset 3px 0 0 #C9A35F !important;\n}\n#sidebar-v2 a.active span,        #sidebar-v2 a.active p,        #sidebar-v2 a.active svg,\n#sidebar-v2 a.exact-active span,  #sidebar-v2 a.exact-active p,  #sidebar-v2 a.exact-active svg {\n  color: #F2D89B !important; stroke: #F2D89B !important;\n}\n\n/* A5) Location switcher (top) → gold text on a subtle gold panel */\n#location-switcher-sidbar-v2 { background-color: rgba(201, 163, 95, 0.10) !important; }\n#location-switcher-sidbar-v2,\n#location-switcher-sidbar-v2 * { color: #E8C77A !important; }\n\n/* A6) Search box (Ctrl/Cmd-K) → dark field, gold text + placeholder */\n#sidebar-v2 input {\n  background-color: #303237 !important;\n  color: #E8C77A !important;\n  border-color: rgba(201, 163, 95, 0.25) !important;\n}\n#sidebar-v2 input::placeholder { color: rgba(217, 185, 120, 0.55) !important; }\n\n/* A7) Dividers / section rules → faint gold */\n#sidebar-v2 hr { border-color: rgba(201, 163, 95, 0.15) !important; }\n\n\n/* ╔══════════════════════════════════════════════════════════════════════╗\n   ║  SECTION B — CONTACT DETAILS PANEL  (#record-details-lhs)               ║\n   ╚══════════════════════════════════════════════════════════════════════╝ */\n\n/* B1) Panel background + sticky \"Contact Details\" header → black\n   (the sticky header reuses the .bg-contacts-panel class, hence the 2nd rule) */\n#record-details-lhs { background-color: #2A2C31 !important; color: #F2F2F2 !important; }\n#record-details-lhs .bg-contacts-panel { background-color: #2A2C31 !important; }\n#record-details-lhs .hr-tabs-rail,\n#record-details-lhs .hr-tabs-nav { background-color: #2A2C31 !important; }\n\n/* B2) White/grey sub-cards (name block, field cards, collapse content) → dark surface */\n#record-details-lhs .bg-white,\n#record-details-lhs .bg-gray-50,\n#record-details-lhs .bg-gray-100,\n#record-details-lhs .hr-collapse-item__content-inner { background-color: #33353B !important; }\n\n/* B3) Folder headers (Contact / General Info / Loan Inquiry / ...) → dark */\n#record-details-lhs .hr-collapse-item__header          { background-color: #33353B !important; }\n#record-details-lhs .hr-collapse-item__header--active  { background-color: #393B42 !important; }\n/* To make folder header titles GOLD instead of white, uncomment:\n   #record-details-lhs .hr-collapse-item__header .hr-text { color:#D9B978 !important; } */\n\n/* B4) Field inputs → dark field + LIGHT value text.\n   IMPORTANT: GHL inputs use -webkit-text-fill-color, which Chrome prioritises\n   over `color`. Without the fill-color override the values stay near-black. */\n#record-details-lhs .hr-input { background-color: #2E3036 !important; }\n#record-details-lhs .hr-input__input-el {\n  color: #F2F2F2 !important;\n  -webkit-text-fill-color: #F2F2F2 !important;\n}\n#record-details-lhs .hr-input__input-el::placeholder {\n  color: #9aa0aa !important;\n  -webkit-text-fill-color: #9aa0aa !important;\n}\n#record-details-lhs .hr-input__border { border-color: rgba(255, 255, 255, 0.10) !important; }\n\n/* B5) Default buttons inside the panel → dark */\n#record-details-lhs .hr-button--default-type {\n  background-color: #33353B !important;\n  border-color: rgba(255, 255, 255, 0.10) !important;\n}\n\n/* B6) Text colours: titles/values light, labels muted */\n#record-details-lhs .text-gray-900,\n#record-details-lhs .hr-ellipsis,\n#record-details-lhs .hr-text { color: #F2F2F2 !important; }\n#record-details-lhs .hr-form-item-label__text,\n#record-details-lhs .text-gray-500,\n#record-details-lhs .text-gray-600,\n#record-details-lhs .text-gray-400 { color: #9aa0aa !important; }\n\n/* B7) Tabs (All fields / DND / Actions) → dark track, gold active */\n#record-details-lhs .hr-tabs-capsule      { background-color: rgba(201, 163, 95, 0.18) !important; }\n#record-details-lhs .hr-tabs-tab-wrapper  { background-color: transparent !important; }\n#record-details-lhs .hr-tabs-tab__label   { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab--active .hr-tabs-tab__label,\n#record-details-lhs .hr-tabs-tab--active  { color: #E8C77A !important; }\n\n/* B8) Borders / dividers → faint */\n#record-details-lhs .border-gray-200,\n#record-details-lhs .border-gray-300,\n#record-details-lhs .border-t { border-color: rgba(255, 255, 255, 0.08) !important; }\n#record-details-lhs .border-primary-300 { border-color: rgba(201, 163, 95, 0.35) !important; }\n\n/* B9) Icons inside the panel → light grey */\n#record-details-lhs svg { color: #C9C7C2 !important; }\n\n/* B10) Field dropdowns / option menus (SINGLE_OPTIONS like Loan Purpose) -> dark\n   surface so the light option text stays legible. Before this, options rendered\n   as light text on the menu's default white background = invisible. */\n#record-details-lhs [class*='dropdown'],\n#record-details-lhs [class*='popover'],\n#record-details-lhs [class*='-menu'],\n#record-details-lhs [class*='select__option'],\n#record-details-lhs [class*='options-list'],\n#record-details-lhs [class*='option-list'],\n#record-details-lhs [role='listbox'],\n#record-details-lhs ul[role='menu'] {\n  background-color: #33353B !important;\n  border-color: rgba(201,163,95,0.25) !important;\n}\n#record-details-lhs [role='option'],\n#record-details-lhs [class*='option'],\n#record-details-lhs [role='menuitem'],\n#record-details-lhs li[class*='item'] {\n  color: #F2F2F2 !important;\n  -webkit-text-fill-color: #F2F2F2 !important;\n  background-color: transparent !important;\n}\n#record-details-lhs [role='option']:hover,\n#record-details-lhs [class*='option']:hover,\n#record-details-lhs li[class*='item']:hover,\n#record-details-lhs [class*='option'][class*='active'],\n#record-details-lhs [class*='option'][class*='selected'],\n#record-details-lhs [aria-selected='true'] {\n  background-color: rgba(201,163,95,0.18) !important;\n  color: #E8C77A !important;\n  -webkit-text-fill-color: #E8C77A !important;\n}\n\n/* B11) CONTRAST FIX (2026-06-17) - field VALUES + tag chips rendered dark-on-dark\n   (only visible when text-selected). GHL paints text via -webkit-text-fill-color,\n   which overrides our color; make the fill FOLLOW the color everywhere in the\n   panel so every value honours the light/gold/muted colours set above. Then give\n   the contact tag chips a visible dark+gold chip. */\n#record-details-lhs * { -webkit-text-fill-color: currentColor !important; }\n/* B11b) field VALUES were dark-on-dark. Diagnosed LIVE (2026-06-17): the dark text\n   comes from GHL classes B6 missed (.text-gray-700 = #344054), the Naive dropdown\n   value (.hr-base-selection-*, inherits #2C2E34), the input placeholder, raw\n   no-class nodes, and the inactive tabs. Fix the COLOR (fill follows it via the\n   rule above) so each value is legible WITHOUT flattening the gold/muted hierarchy.\n   Verified live in the MB sub-account: 0 dark nodes remaining. */\n#record-details-lhs *:not([class]) { color: #F2F2F2 !important; }\n#record-details-lhs .text-gray-700,\n#record-details-lhs .text-gray-800,\n#record-details-lhs .internal-source-link { color: #F2F2F2 !important; }\n#record-details-lhs .hr-input__placeholder { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab { color: #9aa0aa !important; }\n#record-details-lhs .hr-tabs-tab--active,\n#record-details-lhs .hr-tabs-tab--active * { color: #E8C77A !important; }\n/* dropdown selected value (Naive UI selection) needs explicit fill + double-id\n   specificity to beat the inherited #2C2E34 */\n#record-details-new-ui #record-details-lhs [class*='base-selection'],\n#record-details-new-ui #record-details-lhs [class*='base-selection'] * { color: #F2F2F2 !important; -webkit-text-fill-color: #F2F2F2 !important; }\n#record-details-lhs [class*='tag-item'],\n#record-details-lhs [class*='contact-tag'],\n#record-details-lhs [class*='tags'] [class*='chip'],\n#record-details-lhs [class*='tags'] [class*='tag'],\n#record-details-lhs .hl-text-input-tag {\n  background-color: rgba(201,163,95,0.16) !important;\n  border: 1px solid rgba(201,163,95,0.45) !important;\n  color: #E8C77A !important;\n}\n#record-details-lhs [class*='tag-item'] *,\n#record-details-lhs [class*='contact-tag'] *,\n#record-details-lhs [class*='tags'] [class*='chip'] *,\n#record-details-lhs [class*='tags'] [class*='tag'] * {\n  color: #E8C77A !important;\n}";
  function inj(){ if(document.getElementById('mb-skin-css'))return; var s=document.createElement('style'); s.id='mb-skin-css'; s.textContent=CSS; (document.head||document.documentElement).appendChild(s); }
  inj(); setInterval(inj,3000);
})();


/* ===== PART 0B - CONTRAST NORMALIZER =====
   Robust safety net instead of chasing every GHL class one by one: walk the contact
   panel (#record-details-lhs) and (1) darken any near-white/light background GHL
   renders (opportunity cards, client-portal selects, workflow chips, tags, avatars —
   many use classes the CSS skin can't enumerate), and (2) lighten any DARK text so
   it's legible on the dark panel. Gold/light/muted text + gold accents are left
   untouched (threshold 0.66 spares the golds). Debounced MutationObserver re-applies
   after every GHL re-render. Verified live in MB 2026-07-21: 0 low-contrast nodes. */
(function () {
  "use strict";
  if (window.__vdNormLoaded) return; window.__vdNormLoaded = true;
  var SURFACE = "#33353B", LIGHT = "#F2F2F2", LOC = "XspbsMlB3DWwt3sKLgUr";
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
  function schedule() { if (pending) return; pending = true; setTimeout(function () { pending = false; if (curLoc() !== LOC) return; var root = document.getElementById("record-details-lhs"); if (root) normalize(root); }, 250); }
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
  var LOC = "XspbsMlB3DWwt3sKLgUr";
  // Custom sidebar items injected in Payments' slot, in this order. Icons = feather-style
  // paths drawn with currentColor so the gold skin applies.
  var SB_ICONS = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    tasks: '<polyline points="9 11 12 14 22 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  var SB_ITEMS = [
    { id: "vd-power-dialer", label: "Power Dialer", icon: "phone", url: "https://app.gohighlevel.com/v2/location/" + LOC + "/conversations/manual_actions?type=workflow&workflow=&campaign=&assignee=" },
    { id: "vd-tasks",        label: "Tasks",        icon: "tasks", url: "https://app.gohighlevel.com/v2/location/" + LOC + "/tasks" }
  ];
  function curLoc() { var m = location.pathname.match(/\/location\/([^\/?#]+)/); return m ? m[1] : null; }
  // Hide Payments via CSS the instant this script parses (no waiting for the DOM query
  // loop) — kills the Payments flash on reload. The same rule also lives in the location
  // Custom CSS (A8), which loads even earlier; this is the in-JS backup.
  (function () { if (document.getElementById("vd-sb-css")) return; var s = document.createElement("style"); s.id = "vd-sb-css"; s.textContent = "#sidebar-v2 a#sb_payments{display:none !important;}"; (document.head || document.documentElement).appendChild(s); })();
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
      location.assign(item.url);
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
    if (curLoc() !== LOC) return;
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
   MB — Pulse Banner v0.1  (BLACK + GOLD)
   ----------------------------------------------------------------------------
   Horizontal stage tracker that sits at the TOP of the GHL contact page,
   above the 3-column layout (like Elevated Financial's recruiter pulse banner,
   re-skinned to MB black + gold and wired to the real Sales Pipeline).

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
      field) exactly like Elevated Financial.
   3. Move stage: PUT /opportunities/{id} with the new stageId.

   ── SECURITY NOTE (read before going live) ────────────────────────────────
   CONFIG.ghlPit is a Private Integration token exposed to the browser. That is
   acceptable ONLY inside the team own trusted sub-account. To remove the
   token from the browser entirely, point CONFIG.apiProxy at a Lovable edge
   function that holds the PIT server-side and proxies the two calls this file
   makes (opportunities search + opportunities PUT). When CONFIG.apiProxy is
   set, the PIT is never read in the browser.

   Paste in: GHL → Settings → Custom JS  (ONE script block; if the contact
   widget is already there, drop this IIFE inside the same script tag).
   ============================================================================ */
(function () {
  "use strict";
  if (window.__mbPulseLoaded) return;
  window.__mbPulseLoaded = true;

  /* ── EDITABLE CONFIG ─────────────────────────────────────────────────── */
  var CONFIG = {
    locationId: "XspbsMlB3DWwt3sKLgUr",         // Mortgage Brokers
    ghlPit:     "",
    apiProxy:   "https://n8n.srv1310102.hstgr.cloud/webhook/mbd-ghl-proxy-4f8a21",                              // e.g. https://<ref>.supabase.co/functions/v1/vd-opp-proxy  (empty = call GHL directly with the PIT)
    webhookUrl: "",                              // legacy n8n path (empty = off). Prefer checklistFieldId below.
    checklistFieldId: "8hjtJNzxsWZro8c03A2G",    // contact custom field "Pulse Checklist State" → SHARED + PERMANENT checklist storage across reps (empty = localStorage only)
    apiBase:    "https://services.leadconnectorhq.com",
    apiVersion: "2021-07-28",
  };
  var GOLD = "#C9A35F", GOLD_L = "#E8C77A", BG = "#2A2C31", SURFACE = "#33353B", LINE = "rgba(255,255,255,.08)";

  /* ── Pipeline fallback (used only if the API is unreachable) ─────────── */
  /* The live pipeline (id + stage ids) is fetched from the API at runtime, so
     this is just a safety net to keep the stepper rendering offline. */
  var SALES_STAGES = ["New Lead","Low Credit Score (Not Qualified)","Attempting Contact","Engaged","Appointment Set",
    "Appointment Showed","Appointment No-Show","Hot Lead (1-3 months)","Future Opportunity (3-9 Months)",
    "Long-Term Lead (9+ months)","Pre-Approved - Not Actively Searching","Investors","Application Sent (LOS)",
    "Qualification (LOS)","Pre-Approved (LOS)","Loan Setup (LOS)","Disclosed (LOS)","Submitted to UW (LOS)",
    "Approved w/ Conditions (LOS)","Re-submittal (LOS)","Clear to Close (LOS)","Docs out (LOS)",
    "Docs signed (LOS)","Funded (LOS)","Post-Close Nurture","Refi Rate Watcher","Application Abandoned",
    "Lead Long Term Nurture (Not Converted)","Ghosted","Dead /Abandon"];

  /* ── Reason Can't Buy Now — dropdown source (#12 the team) ──────────── */
  var REASON_FIELD = "UFfWqhsoA0RLXf9fLcE2"; // Reason Can't Buy Now (SINGLE_OPTIONS)
  var REASONS = ["Waiting on Taxes","Credit Repair","Down Payment Saving","Employment History",
    "Bankruptcy / Foreclosure","Lease Pending","Selling Current Home","Debt Paydown","Spouse Coordination",
    "Relocating Later","Loan Purpose Not Available","Investor - Waiting","Rate Watching","Other"];

  /* ── Field catalog for the dropdown CTAs (#73) — one entry per settable field.
     SINGLE_OPTIONS → dropdown of the exact GHL options; DATE → date picker. A
     checklist item wires to one via  action:"setfield", meta:{ key:"..." }.
     IDs + options captured live from the MB location 2026-07-21. */
  var FIELDS = {
    reasonCantBuy:  { id:"UFfWqhsoA0RLXf9fLcE2", kind:"select", name:"Reason Can't Buy Now",        options:REASONS },
    loanPurpose:    { id:"fivKEx2T0oKkfZfGfW5V", kind:"select", name:"Loan Purpose",                options:["Purchase","Refinance","HELOC","Investor","Construction"] },
    propertyType:   { id:"OnwCPPWETP7LEcJtei8h", kind:"select", name:"Property Type",               options:["SFR","Condo","2-4 Unit","5+ Unit","Commercial"] },
    timeline:       { id:"re6lDyw3S4ZPp0EKS0Ti", kind:"select", name:"Timeline to Close",           options:["Under 30","30-60","60-90","3-6mo","6-12mo","Unknown"] },
    employment:     { id:"9NWbIe3ktmrH3nK64Msz", kind:"select", name:"Employment Type",             options:["W2","Self-Employment","Retired","Other"] },
    clientTier:     { id:"SUxXJNGuouLSdTqP1ccp", kind:"select", name:"Client Tier",                 options:["Tier 1","Tier 2","Tier 3"] },
    workingRealtor: { id:"iKDpr89YSBWgI0B9jok2", kind:"select", name:"Working with Realtor",        options:["Yes","No"] },
    preapproved:    { id:"Ad4S96x91c1p9Kq4aHcv", kind:"select", name:"Has Pre-Approval Elsewhere",  options:["Yes","No"] },
    expectedReady:  { id:"wAzQPOUEwIXg8hjTn4Vs", kind:"date",   name:"Expected Ready Date" },
    expectedMove:   { id:"w3ykxO8zTHgzwv5NAz9D", kind:"date",   name:"Expected Move Date" },
    leaseEnd:       { id:"n88bzIbS9FY3KwX9WvkV", kind:"date",   name:"Lease End Date" },
    /* Refi Rate Watcher (folder lsv13N1TPxRLTVPy6PVV) — selects/checkbox set via the picker */
    refiStatus:     { id:"9zwQCAP3xDOauUNUN6Y4", kind:"select", name:"Refi Rate Status",             options:["Watching","Approaching","Hit"] },
    refiWatch:      { id:"EWCB0iSSXIjT3IxMyOg4", kind:"select", name:"Add to Refi Watcher",          options:["Yes"] },
  };

  /* ── Checklists per stage — the team real process (spec v6 + 05-25 call) */
  /* Each item: { id, label, cta, action }. action is a hook (call/note/tag/
     calendar/field/navigate/stage) wired to real GHL flows in the next pass. */
  var CHECKLISTS = {
    "New Lead": [
      { id:"contact", label:"Verify phone + email are on file", cta:"👁 View", action:"navigate" },
      { id:"tags",    label:"Confirm source + intent tags applied", cta:"🏷 Tags", action:"tag" },
      { id:"speed",   label:"Call contact within 5 min — speed-to-lead (calls only count)", cta:"📞 Call", action:"call" },
    ],
    "Low Credit Score (Not Qualified)": [
      { id:"fico",   label:"Confirm FICO is below program minimum", cta:"📊 FICO", action:"field" },
      { id:"reason", label:"Set Reason Can't Buy Now", cta:"🏷 Reason", action:"reason" },
      { id:"move",   label:"Move to Long-Term Lead if salvageable", cta:"➡ Move", action:"stage" },
    ],
    "Attempting Contact": [
      { id:"call",  label:"Auto call attempt + set disposition (2×/3h → 2×/day → 1×/day)", cta:"📞 Call", action:"call" },
      { id:"vm",    label:"Voicemail drop auto-left on no-answer", cta:"🎙 VM", action:"note" },
      { id:"log",   label:"Log result / disposition in Notes", cta:"📝 Log", action:"note" },
      { id:"route", label:"After 33 calls → Ghosted (auto text + email)", cta:"➡ Route", action:"stage" },
    ],
    "Engaged": [
      { id:"reason", label:"Set reason / intent (from dropdown)", cta:"🏷 Reason", action:"reason" },
      { id:"route",  label:"Route: Hot Lead / Future Opp / Long-Term", cta:"➡ Route", action:"stage" },
      { id:"outcome",label:"If negative → choose Ghosted or Dead/Abandon", cta:"➡ Outcome", action:"stage" },
    ],
    "Appointment Set": [
      { id:"confirm", label:"Confirm calendar booking", cta:"📅 Confirm", action:"calendar" },
      { id:"remind",  label:"Reminders auto-armed: 24h / 2h / 15min", cta:"⏰ Remind", action:"navigate" },
      { id:"outcome", label:"After appt date → set outcome (showed / no-show)", cta:"✓ Outcome", action:"stage" },
    ],
    "Appointment Showed": [
      { id:"showed",  label:"Mark showed + log call", cta:"✓ Showed", action:"field" },
      { id:"qualify", label:"Run qualification (AI / Maria)", cta:"📊 Qualify", action:"navigate" },
      { id:"advance", label:"Advance: Hot / Long-Term / App Sent", cta:"➡ Route", action:"stage" },
    ],
    "Appointment No-Show": [
      { id:"resched", label:"Reschedule link SMS + email auto-sent (<5 min)", cta:"📨 Reschedule", action:"note" },
      { id:"second",  label:"2nd miss → Maria angle + flag setter", cta:"📞 Maria", action:"call" },
      { id:"third",   label:"3rd miss → Dead/Abandon (missed-3-appointments)", cta:"➡ Abandon", action:"stage" },
    ],
    "Hot Lead (1-3 months)": [
      { id:"intent",  label:"Confirm hot intent tag (Buyer / Investor / Refi)", cta:"🏷 Tag", action:"tag" },
      { id:"nurture", label:"Hot Lead nurture running + weekly follow-up", cta:"📨 Nurture", action:"navigate" },
      { id:"task",    label:"Weekly call task → Maria (lead + agent)", cta:"📞 Task", action:"call" },
    ],
    "Future Opportunity (3-9 Months)": [
      { id:"reason",  label:"Set reason can't buy now", cta:"🏷 Reason", action:"reason" },
      { id:"ready",   label:"Set Expected Ready Date", cta:"📅 Date", action:"setfield", meta:{ key:"expectedReady", quick:true } },
      { id:"nurture", label:"Nurture running (slower cadence than Hot Lead)", cta:"📨 Nurture", action:"navigate" },
    ],
    "Long-Term Lead (9+ months)": [
      { id:"reason", label:"Set Reason Can't Buy Now", cta:"🏷 Reason", action:"reason" },
      { id:"ready",  label:"Set Expected Ready Date", cta:"📅 Date", action:"setfield", meta:{ key:"expectedReady" } },
      { id:"nurture",label:"Reason-specific nurture active", cta:"📨 Nurture", action:"navigate" },
      { id:"review", label:"After 12 months → require stage change", cta:"➡ Review", action:"stage" },
    ],
    "Pre-Approved - Not Actively Searching": [
      { id:"pause",  label:"Confirm pre-approval paused", cta:"⏸ Pause", action:"field" },
      { id:"slow",   label:"Slower cadence active (bi-weekly / monthly)", cta:"📨 Cadence", action:"navigate" },
      { id:"expiry", label:"Pre-approval expiry alert armed (90 days)", cta:"⏰ Expiry", action:"navigate" },
    ],
    "Investors": [
      { id:"welcome", label:"Send investor welcome email", cta:"📨 Welcome", action:"note" },
      { id:"follow",  label:"Quarterly follow-up task active", cta:"📞 Task", action:"call" },
    ],
    "Application Sent (LOS)": [
      { id:"link", label:"Send LOS 1003 link + welcome email (LOS email + video)", cta:"🔗 Send", action:"navigate" },
      { id:"aila", label:"Aila auto-fills 1003 into LOS", cta:"⚙ Aila", action:"navigate" },
      { id:"sync", label:"Write LOS Loan ID + Direct URL (auto-sync)", cta:"📝 Sync", action:"field" },
      { id:"agent",label:"Intro SMS to referring agent (App Intake)", cta:"📨 Agent", action:"note" },
    ],
    "Qualification (LOS)": [
      { id:"needs",  label:"Needs list shown in GHL (no need to open LOS)", cta:"📋 Needs", action:"navigate" },
      { id:"docs",   label:"Collect income docs by employment type", cta:"📑 Docs", action:"navigate" },
      { id:"auth",   label:"Client signs credit authorization doc (credit pulled in LOS last)", cta:"✍ Auth", action:"navigate" },
      { id:"agent",  label:"Update referring agent — direct call + auto message", cta:"📞 Agent", action:"call" },
    ],
    "Pre-Approved (LOS)": [
      { id:"letter", label:"Issue pre-approval letter", cta:"📨 Letter", action:"navigate" },
      { id:"active", label:"Tag actively-searching", cta:"🏷 Tag", action:"tag" },
      { id:"weekly", label:"Weekly 'send me the property' SMS active", cta:"📨 Weekly", action:"navigate" },
      { id:"agent",  label:"Pre-approved update to agent 🎉", cta:"📨 Agent", action:"note" },
    ],
    "Loan Setup (LOS)": [
      { id:"contract", label:"Confirm property under contract", cta:"📄 Contract", action:"field" },
      { id:"intro",    label:"Intro call + text to agent (full LOS handoff)", cta:"📞 Call", action:"call" },
      { id:"tracker",  label:"Start date tracker between steps", cta:"⏱ Track", action:"navigate" },
    ],
    "Disclosed (LOS)": [
      { id:"disc",   label:"Send initial disclosures", cta:"📨 Disclose", action:"navigate" },
      { id:"signed", label:"Confirm borrower signed initial docs", cta:"✓ Signed", action:"field" },
    ],
    "Submitted to UW (LOS)": [
      { id:"submit", label:"Submit file to underwriting", cta:"📤 Submit", action:"navigate" },
      { id:"agent",  label:"Notify referring agent — in UW", cta:"📨 Agent", action:"note" },
      { id:"track",  label:"Start processing-time tracker", cta:"⏱ Track", action:"navigate" },
    ],
    "Approved w/ Conditions (LOS)": [
      { id:"ptcd",  label:"Pull conditions (PTCD) list", cta:"📋 PTCD", action:"navigate" },
      { id:"gather",label:"Help borrower gather condition items", cta:"📑 Collect", action:"navigate" },
      { id:"agent", label:"Conditional approval update to agent 🎉", cta:"📨 Agent", action:"note" },
    ],
    "Re-submittal (LOS)": [
      { id:"resub", label:"Re-submit to UW with cleared conditions", cta:"📤 Resub", action:"navigate" },
      { id:"track", label:"Track condition-clearing time", cta:"⏱ Track", action:"navigate" },
    ],
    "Clear to Close (LOS)": [
      { id:"ctc",   label:"Confirm Clear to Close", cta:"✅ CTC", action:"field" },
      { id:"call",  label:"Auto call + text all parties (LOS sends email)", cta:"📞 Call", action:"call" },
      { id:"agent", label:"Clear-to-close update to agent ✅", cta:"📨 Agent", action:"note" },
    ],
    "Docs out (LOS)": [
      { id:"docs", label:"Final closing docs out", cta:"📄 Docs", action:"navigate" },
      { id:"call", label:"LO calls borrower to review the numbers", cta:"📞 Call", action:"call" },
    ],
    "Docs signed (LOS)": [
      { id:"signed", label:"Confirm final docs signed", cta:"✓ Signed", action:"field" },
    ],
    "Funded (LOS)": [
      { id:"funded",  label:"Confirm loan funded", cta:"💰 Funded", action:"field" },
      { id:"capture", label:"Capture loan amount + note rate", cta:"📝 Capture", action:"field" },
      { id:"refi",    label:"Refi rate tracker active (vs Fannie Mae rate)", cta:"📈 Refi", action:"navigate" },
      { id:"agent",   label:"Funded thank-you to referring agent 🎉", cta:"📨 Agent", action:"note" },
    ],
    "Post-Close Nurture": [
      { id:"calls",   label:"Calls auto-scheduled: annual rate call + equity call every 6 mo", cta:"📅 Calls", action:"calendar" },
      { id:"tracker", label:"On Fannie Mae rate tracker (automatic)", cta:"📈 Tracker", action:"navigate" },
      { id:"address", label:"Capture property address (holiday postcards)", cta:"🏠 Address", action:"field" },
    ],
    "Refi Rate Watcher": [
      { id:"rate",    label:"Set current Note Rate (%)",                       cta:"📊 Rate",    action:"field",    meta:{ field:"UqebkESr9GxnS22awBFK", label:"Current Note Rate — e.g. 6.875" } },
      { id:"balance", label:"Set current loan balance ($)",                    cta:"💰 Balance", action:"field",    meta:{ field:"e1XZTVAyc3b3Uga7VVbA", label:"Current Loan Balance — e.g. 350000" } },
      { id:"target",  label:"Set Target Refi Rate (default current − 50bps)",  cta:"🎯 Target",  action:"field",    meta:{ field:"R4KPWZvQcSS575sMKCJp", label:"Target Refi Rate — e.g. 5.875" } },
      { id:"watch",   label:"Add to Refi Watcher (daily 7AM rate-check)",      cta:"⏰ Watch",   action:"setfield", meta:{ key:"refiWatch" } },
      { id:"status",  label:"Rate status → Watching / Approaching / Hit",      cta:"📈 Status",  action:"setfield", meta:{ key:"refiStatus" } },
      { id:"confirm", label:"'On the watch list' SMS sent",                    cta:"📨 Confirm", action:"note",     meta:{ template:"On the refi watch list — confirmation SMS sent. " } },
    ],
    "Application Abandoned": [
      { id:"type",  label:"Tag hot vs cold abandon", cta:"🏷 Tag", action:"tag" },
      { id:"drip",  label:"1-year reactivation drip active + automated", cta:"📨 Drip", action:"navigate" },
      { id:"maria", label:"Maria reactivation task created", cta:"📞 Maria", action:"call" },
    ],
    "Lead Long Term Nurture (Not Converted)": [
      { id:"reason", label:"Confirm Reason Can't Buy Now set", cta:"🏷 Reason", action:"reason" },
      { id:"ready",  label:"Set Expected Ready Date", cta:"📅 Date", action:"setfield", meta:{ key:"expectedReady" } },
      { id:"nurture",label:"Long-term nurture active", cta:"📨 Nurture", action:"navigate" },
    ],
    "Ghosted": [
      { id:"calls", label:"Confirm 33 no-answer calls logged", cta:"📞 33 calls", action:"navigate" },
      { id:"reply", label:"Any reply → back to Engaged", cta:"➡ Route", action:"stage" },
    ],
    "Dead /Abandon": [
      { id:"reason", label:"Tag disqualify reason", cta:"🏷 Reason", action:"tag" },
      { id:"stop",   label:"Confirm zero automation / removed from drips", cta:"🚫 Stop", action:"navigate" },
    ],
  };

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  function getContactId() { var m = location.pathname.match(/contacts\/detail\/([^/?#]+)/); return m ? m[1] : null; }
  function getLocationId() { var m = location.pathname.match(/\/location\/([^/?#]+)/); return m ? m[1] : null; }
  function onContactPage() { return /\/location\/[^/]+\/contacts\/detail\//.test(location.pathname); }
  function stageKey(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (m) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]; }); }
  function daysSince(iso) { if (!iso) return null; var d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000); return isNaN(d) ? null : d; }

  function api(path, opts) {
    // When apiProxy is set, all calls go through the Lovable edge function and
    // the PIT is never used in the browser. Otherwise call GHL directly.
    if (CONFIG.apiProxy) {
      return fetch(CONFIG.apiProxy + "?path=" + encodeURIComponent(path), Object.assign({ headers: { "Content-Type": "application/json" } }, opts || {}));
    }
    var headers = { Authorization: "Bearer " + CONFIG.ghlPit, Version: CONFIG.apiVersion, Accept: "application/json" };
    if (opts && opts.body) headers["Content-Type"] = "application/json";
    return fetch(CONFIG.apiBase + path, Object.assign({ headers: headers }, opts || {}));
  }

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
  var LS_KEY = "mb_pulse_state_v1";
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
      "#vd-pulse-banner{flex-shrink:0;margin:8px 12px 4px;background:" + BG + ";border:1px solid rgba(201,163,95,.28);border-radius:14px;box-shadow:0 8px 24px rgba(201,163,95,.12);overflow:hidden;font-family:Inter,system-ui,Segoe UI,sans-serif;color:#f2f2f2;}" +
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
      "#vd-pulse-banner .vdp-chip.warn{background:rgba(201,163,95,.16);color:" + GOLD_L + ";border-color:rgba(201,163,95,.35);}" +
      "#vd-pulse-banner .vdp-chip.risk{background:rgba(220,80,80,.16);color:#f0a0a0;border-color:rgba(220,80,80,.35);}" +
      "#vd-pulse-banner .vdp-move{padding:9px 15px;border-radius:8px;background:linear-gradient(180deg," + GOLD_L + "," + GOLD + ");color:#0a0a0a;border:0;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;align-self:start;margin-top:4px;}" +
      "#vd-pulse-banner .vdp-back{padding:8px 12px;border-radius:8px;background:rgba(201,163,95,.12);border:1px solid rgba(201,163,95,.4);color:" + GOLD_L + ";font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap;align-self:start;margin-top:4px;margin-right:8px;}" +
      "#vd-pulse-banner .vdp-stepper{display:flex;align-items:center;gap:0;padding:6px 20px 4px;position:relative;overflow-x:auto;}" +
      "#vd-pulse-banner .vdp-stepper::-webkit-scrollbar{height:0;}" +
      "#vd-pulse-banner .vdp-line{position:absolute;top:24px;left:36px;right:36px;height:2px;background:rgba(255,255,255,.10);z-index:0;}" +
      "#vd-pulse-banner .vdp-lined{position:absolute;top:24px;left:36px;height:2px;background:linear-gradient(90deg," + GOLD + "," + GOLD_L + ");z-index:0;}" +
      "#vd-pulse-banner .vdp-step{flex:1 0 52px;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;padding:8px 0;}" +
      "#vd-pulse-banner .vdp-node{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;background:" + SURFACE + ";border:2px solid #3a3a3a;color:#777;cursor:pointer;transition:transform .15s ease;}" +
      "#vd-pulse-banner .vdp-node:hover{transform:scale(1.12);}" +
      "#vd-pulse-banner .vdp-node.done{background:" + GOLD + ";border-color:" + GOLD + ";color:#0a0a0a;}" +
      "#vd-pulse-banner .vdp-node.cur{background:" + BG + ";border-color:" + GOLD_L + ";color:" + GOLD_L + ";box-shadow:0 0 0 4px rgba(201,163,95,.22);}" +
      "#vd-pulse-banner .vdp-cl{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;padding:12px 20px 18px;}" +
      "#vd-pulse-banner .vdp-card{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid " + LINE + ";border-radius:10px;background:" + SURFACE + ";transition:border-color .15s ease;}" +
      "#vd-pulse-banner .vdp-card:hover{border-color:rgba(201,163,95,.3);}" +
      "#vd-pulse-banner .vdp-card.done{background:rgba(201,163,95,.08);border-color:rgba(201,163,95,.3);}" +
      "#vd-pulse-banner .vdp-card.done .vdp-cl-lbl{color:#9a9a9a;text-decoration:line-through;}" +
      "#vd-pulse-banner .vdp-ck{width:22px;height:22px;border:2px solid #4a4a4a;border-radius:6px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;background:#0a0a0a;cursor:pointer;}" +
      "#vd-pulse-banner .vdp-card.done .vdp-ck{background:" + GOLD + ";border-color:" + GOLD + ";}" +
      "#vd-pulse-banner .vdp-card.done .vdp-ck::after{content:'\\2713';color:#0a0a0a;font-weight:900;font-size:13px;}" +
      "#vd-pulse-banner .vdp-cl-lbl{flex:1;font-size:13px;font-weight:500;color:#f2f2f2;line-height:1.35;}" +
      "#vd-pulse-banner .vdp-cta{padding:6px 10px;border-radius:7px;background:#0a0a0a;color:" + GOLD_L + ";border:1px solid rgba(201,163,95,.4);font-size:11.5px;font-weight:700;cursor:pointer;flex-shrink:0;}" +
      "#vd-pulse-banner .vdp-cta:hover{background:" + GOLD + ";color:#0a0a0a;}" +
      "#vd-pulse-banner .vdp-empty{grid-column:1/-1;text-align:center;color:#777;font-size:13px;padding:14px;}" +
      "#vd-pulse-banner .vdp-foot{padding:6px 20px 10px;font-size:10px;color:#777;text-align:right;}" +
      "#vd-stage-dd{position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(201,163,95,.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:6px 0;min-width:260px;font-family:Inter,system-ui,sans-serif;font-size:13px;max-height:420px;overflow:auto;}" +
      "#vd-stage-dd .vd-dd-item{padding:9px 14px;cursor:pointer;display:flex;align-items:center;gap:8px;color:#e8e8e8;}" +
      "#vd-stage-dd .vd-dd-item:hover{background:rgba(201,163,95,.12);}" +
      "#vd-stage-dd .vd-dd-item.cur{background:rgba(201,163,95,.16);color:" + GOLD_L + ";font-weight:700;}";
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
     straight to the GHL custom field. Any checklist CTA can use these via FIELDS. ── */
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
    dd.style.cssText = "position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(201,163,95,.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:6px 0;min-width:220px;font-family:Inter,system-ui,sans-serif;font-size:13px;max-height:360px;overflow:auto;";
    dd.style.top = (r.bottom + 4) + "px"; dd.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    dd.innerHTML = (options || []).map(function (x) { var cur = String(x) === String(current); return '<div class="vd-oo" data-v="' + esc(x) + '" style="padding:9px 14px;cursor:pointer;color:' + (cur ? GOLD_L : "#e8e8e8") + ';' + (cur ? "font-weight:700;" : "") + '">' + (cur ? "● " : "") + esc(x) + '</div>'; }).join("");
    document.body.appendChild(dd);
    dd.querySelectorAll(".vd-oo").forEach(function (it) {
      it.onmouseover = function () { it.style.background = "rgba(201,163,95,.12)"; };
      it.onmouseout = function () { it.style.background = ""; };
      it.onclick = function (ev) { ev.stopPropagation(); dd.remove(); cb(it.getAttribute("data-v")); };
    });
    setTimeout(function () { var close = function (ev) { if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener("click", close); } }; document.addEventListener("click", close); }, 80);
  }
  function showDatePicker(anchor, current, cb, quick) {
    var ex = document.getElementById("vd-date-dd"); if (ex) { ex.remove(); return; }
    var r = anchor ? anchor.getBoundingClientRect() : { bottom: 120, right: window.innerWidth - 300 };
    var dd = document.createElement("div"); dd.id = "vd-date-dd";
    dd.style.cssText = "position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(201,163,95,.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:12px;font-family:Inter,system-ui,sans-serif;";
    dd.style.top = (r.bottom + 4) + "px"; dd.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    // Quick presets (Future Opportunity only): compute a date N months from today.
    var quickHtml = "";
    if (quick) {
      quickHtml = '<div style="display:flex;gap:6px;margin-bottom:9px;">' +
        [3, 6, 9].map(function (m) {
          return '<button data-m="' + m + '" style="flex:1;padding:6px 10px;border-radius:7px;background:rgba(201,163,95,.14);color:' + GOLD_L + ';border:1px solid rgba(201,163,95,.4);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">' + m + ' mo</button>';
        }).join("") + '</div>';
    }
    dd.innerHTML = quickHtml +
      '<input type="date" value="' + esc(String(current || "").slice(0, 10)) + '" style="background:#0a0a0a;color:' + GOLD_L + ';border:1px solid rgba(201,163,95,.4);border-radius:7px;padding:7px 10px;font-size:13px;color-scheme:dark;">' +
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
    dd.style.cssText = "position:fixed;z-index:99999;background:" + SURFACE + ";border:1px solid rgba(201,163,95,.3);border-radius:10px;box-shadow:0 12px 30px rgba(0,0,0,.5);padding:12px;font-family:Inter,system-ui,sans-serif;min-width:230px;";
    dd.style.top = (r.bottom + 4) + "px"; dd.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    dd.innerHTML = (label ? '<div style="color:#bdbdbd;font-size:11px;margin-bottom:6px;">' + esc(label) + '</div>' : "") +
      '<input type="text" value="' + esc(String(current == null ? "" : current)) + '" style="width:150px;background:#0a0a0a;color:' + GOLD_L + ';border:1px solid rgba(201,163,95,.4);border-radius:7px;padding:7px 10px;font-size:13px;">' +
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
  /* apply a FIELDS entry: right control → write to GHL → toast → cache locally */
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
  function showReasonPicker(anchor, cb) { showOptionPicker(anchor, REASONS, curFieldVal(REASON_FIELD), cb); }

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
    if (getLocationId() !== CONFIG.locationId || !onContactPage()) { if (old) old.remove(); lastSig = null; return; }
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
    var checks = CHECKLISTS[stage] || [];
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
        '<div class="vdp-donut"><svg width="84" height="84" viewBox="0 0 84 84"><defs><linearGradient id="vdp-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + GOLD_L + '"/><stop offset="100%" stop-color="' + GOLD + '"/></linearGradient></defs>' +
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
      '<div class="vdp-foot">MB Dashboard · Pulse v0.1 · ' + (CONFIG.checklistFieldId ? "checklist synced to contact" : (CONFIG.webhookUrl ? "state synced via webhook" : "state saved locally")) + '</div>';

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
     When CONFIG.apiProxy is set, tag/note/field go through the edge function
     (PIT stays server-side); otherwise they call GHL directly with the PIT. */
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
        applyField(FIELDS.reasonCantBuy, contactId, anchor);
        break;
      case "setfield":
        // #73: the checklist item points at a GHL field via meta.key → dropdown
        // (SINGLE_OPTIONS) or date picker (DATE), written straight to the contact.
        var _fd = FIELDS[meta.key];
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

  function init() { render(); var n = 0, t = setInterval(function () { render(); if (++n >= 60) clearInterval(t); }, 250); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

