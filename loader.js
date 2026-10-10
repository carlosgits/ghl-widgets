/* Agency loader for GHL Custom JS (automatribe). Paste ONLY the <script> stub that wraps this file into
   Agency Settings > Company > Custom JavaScript. It reads the sub-account id from the URL, looks it up in
   manifest.json and loads that sub-account's widget files. Sub-accounts not in the manifest load nothing.
   Updating a widget = push to this repo + purge jsDelivr; GHL is never touched again. */
(function () {
  if (window.__agencyLoader) return; window.__agencyLoader = 1;
  var BASE = 'https://cdn.jsdelivr.net/gh/carlosgits/ghl-widgets@main/';
  var manifest = null, loaded = {};
  function loc() { var m = location.pathname.match(/\/location\/([A-Za-z0-9]+)/); return m && m[1]; }
  function load(files, ver) {
    files.forEach(function (f) {
      if (loaded[f]) return; loaded[f] = 1;
      var s = document.createElement('script'); s.src = BASE.replace('@main', '@' + (ver || 'main')) + f; s.async = true;
      s.setAttribute('data-agency-widget', f); document.head.appendChild(s);
    });
  }
  function run() {
    var id = loc(); if (!id) return;
    var go = function () { var files = manifest.locations && manifest.locations[id]; if (files) load(files, manifest.version); };
    if (manifest) return go();
    fetch(BASE + 'manifest.json?t=' + Math.floor(Date.now() / 600000)).then(function (r) { return r.json(); })
      .then(function (m) { manifest = m; go(); }).catch(function () {});
  }
  run(); window.addEventListener('routeChangeEvent', run); setInterval(run, 3000);
})();
