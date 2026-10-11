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
