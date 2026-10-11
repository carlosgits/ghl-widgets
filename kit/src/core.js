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

  var PALETTE = __PALETTE__;            // reference colours of the modules (the design was drawn in gold)
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
    version: "__VERSION__",
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
