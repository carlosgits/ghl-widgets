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
