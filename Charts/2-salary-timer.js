/* Chart 1 — time-to-earn-$100 donut (#salary-timer-chart) */
(function () {
    /* ── Chart 1: time-to-earn-$100 donut (#salary-timer-chart) ── */
    const timerEl = document.getElementById('salary-timer-chart');
    const w = timerEl.offsetWidth;

    const spec1 = {
      "$schema": "https://vega.github.io/schema/vega/v6.json",
      "width": 720, "height": 380, "background": null,
      "signals": [
        {"name": "startTime", "init": "now()"},
        { "name": "elapsed", "value": 0, "on": [{ "events": {"type":"timer","throttle":40}, "update": "min((now()-startTime)/1000,64.96)" }] }
      ],
      "data": [{
        "name": "leagues",
        "values": [
          { "league": "WNBA Median", "time": 64.96, "x": w*0.25, "color": "#6173c3" },
          { "league": "NBA Median",  "time": 1.4,   "x": w*0.75, "color": "#D6D6D6" }
        ],
        "transform": [
          { "type": "formula", "as": "progress", "expr": "min(elapsed/datum.time,1)" },
          { "type": "formula", "as": "earned",   "expr": "datum.progress*100" }
        ]
      }],
      "marks": [
        { "type": "arc", "from": {"data":"leagues"}, "encode": { "enter": { "x":{"field":"x"}, "y":{"value":210}, "innerRadius":{"value":85}, "outerRadius":{"value":130}, "fill":{"value":"#eeeeee"} }, "update": { "startAngle":{"signal":"datum.progress>=1?6.282:datum.progress*6.28318"}, "endAngle":{"value":6.28318}, "opacity":{"signal":"datum.progress>=1?0:1"} } } },
        { "type": "arc", "from": {"data":"leagues"}, "encode": { "enter": { "x":{"field":"x"}, "y":{"value":210}, "innerRadius":{"value":85}, "outerRadius":{"value":130}, "startAngle":{"value":0}, "fill":{"field":"color"} }, "update": { "endAngle":{"signal":"datum.progress>=1?6.282:datum.progress*6.28318"} } } },
        { "type": "text", "from": {"data":"leagues"}, "encode": { "enter": { "x":{"field":"x"}, "y":{"value":60}, "text":{"field":"league"}, "align":{"value":"center"}, "font":{"value":"Arial"}, "fontSize":{"value":16}, "fontWeight":{"value":"bold"}, "fill":{"value":"black"} } } },
        { "type": "text", "from": {"data":"leagues"}, "encode": { "update": { "x":{"field":"x"}, "y":{"value":220}, "text":{"signal":"'$'+format(datum.earned,'.1f')"}, "align":{"value":"center"}, "font":{"value":"Arial"}, "fontSize":{"value":28}, "fontWeight":{"value":"bold"}, "fill":{"value":"black"} } } }
      ]
    };

    function embedChart() {
      vegaEmbed('#salary-timer-chart', spec1, { mode: "vega", actions: false })
        .then(() => { document.getElementById('replay-btn').style.display = 'inline-block'; })
        .catch(console.error);
    }

    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { embedChart(); chartObserver.disconnect(); } });
    }, { threshold: 0.3 });
    chartObserver.observe(timerEl);
    document.getElementById('replay-btn').addEventListener('click', embedChart);

    /* ── Toolbar buttons ── */
    const shareDropdown = document.getElementById('share-dropdown');

    // Share — toggle dropdown
    document.getElementById('btn-share').addEventListener('click', (e) => {
      e.stopPropagation();
      shareDropdown.style.display = shareDropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', () => shareDropdown.style.display = 'none');

    // Save — toggle
    document.getElementById('btn-bookmark').addEventListener('click', () => {
      const btn = document.getElementById('btn-bookmark');
      const saved = btn.dataset.saved === 'true';
      btn.dataset.saved = !saved;
      btn.textContent = saved ? 'Save' : 'Saved ✓';
      btn.style.background = saved ? '' : '#111';
      btn.style.color = saved ? '' : '#fff';
      btn.style.borderColor = saved ? '' : '#111';
    });

    // Comments — scroll down
    document.getElementById('btn-comments').addEventListener('click', () => {
      const target = document.getElementById('comments-anchor')
        || document.querySelector('.section-divider');
      target?.scrollIntoView({ behavior: 'smooth' });
    });

      /* ── Nav buttons ── */
      const menuDrawer  = document.getElementById('menu-drawer');
      const menuOverlay = document.getElementById('menu-overlay');

      function openMenu()  { menuDrawer.classList.add('open'); menuOverlay.classList.add('open'); }
      function closeMenu() { menuDrawer.classList.remove('open'); menuOverlay.classList.remove('open'); }

      document.getElementById('btn-menu').addEventListener('click', openMenu);
      document.getElementById('btn-menu-close').addEventListener('click', closeMenu);
      menuOverlay.addEventListener('click', closeMenu);

      const searchOverlay = document.getElementById('search-overlay');
      document.getElementById('btn-search').addEventListener('click', () => {
        searchOverlay.classList.add('open');
        setTimeout(() => document.getElementById('search-input').focus(), 50);
      });
      document.getElementById('btn-search-close').addEventListener('click', () => searchOverlay.classList.remove('open'));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { searchOverlay.classList.remove('open'); closeMenu(); }
      });

      document.getElementById('btn-account').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('btn-account').classList.toggle('open');
      });
      document.addEventListener('click', () => document.getElementById('btn-account').classList.remove('open'));
})();
