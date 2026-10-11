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
