/* Rookie contract scale — 100-square grid (#rcs) */
(function () {
  (function () {
    const NBA = 57100000, CLARK = 338000;
    const TILE = NBA / 100;                 // ≈ $571K
    const FRAC = CLARK / TILE;              // ≈ 0.59
    const fmtUSD = n => '$' + Math.round(n).toLocaleString('en-US');

    const COLS = 10, ROWS = 10, SIZE = 46, GAP = 6, cell = SIZE + GAP;
    const GX = 40, GY = 34;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.getElementById('grid');
    const xOf = c => GX + c * cell;
    const yOf = r => GY + (ROWS - 1 - r) * cell;

    let tiles = [], clarkFill, clarkOutline, annoLine, nbaLbl, clarkLbl, clarkSub, unitLbl;

    function build() {
      svg.innerHTML = ''; tiles = [];

      const gridCx = (xOf(0) + xOf(COLS - 1) + SIZE) / 2;
      nbaLbl = mkText('lbl lbl-nba', gridCx, GY - 16, 'Risacher: $0', 'middle');

      // 100 grey squares (with a quiet running-total tooltip for the curious)
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const t = document.createElementNS(NS, 'rect');
          t.setAttribute('class', 'tile');
          t.setAttribute('x', xOf(c)); t.setAttribute('y', yOf(r));
          t.setAttribute('width', SIZE); t.setAttribute('height', SIZE); t.setAttribute('rx', 3);
          const idx = r * COLS + c + 1;
          t.innerHTML = '<title>' + fmtUSD(idx * TILE) + ' of Risacher\'s deal</title>';
          svg.appendChild(t);
          tiles.push({ el: t, order: r * COLS + c });
        }
      }

      // subtle unit cue near the top-right square
      const trc = xOf(COLS - 1) + SIZE / 2;
      unitLbl = mkText('lbl lbl-unit', trc, GY - 16, '1 square ≈ $571K', 'middle');

      // Clark — bottom-left square, filled 59% from the bottom
      const cx = xOf(0), cy = yOf(0), fillH = SIZE * FRAC;
      clarkOutline = mkRect('clark-outline', cx, cy, SIZE, SIZE);
      svg.appendChild(clarkOutline);
      clarkFill = mkRect('clark-fill', cx, cy + (SIZE - fillH), SIZE, fillH);
      clarkFill.innerHTML = '<title>Caitlin Clark — ' + fmtUSD(CLARK) + ' (59% of one square)</title>';
      svg.appendChild(clarkFill);

      // short leader from the square to its label
      const lx = cx + SIZE / 2, lyTop = cy + SIZE, lyBot = cy + SIZE + 18;
      annoLine = document.createElementNS(NS, 'path');
      annoLine.setAttribute('class', 'anno-line');
      annoLine.setAttribute('d', 'M' + lx + ' ' + lyTop + ' L' + lx + ' ' + lyBot);
      svg.appendChild(annoLine);

      clarkLbl = mkText('lbl lbl-wnba', cx, lyBot + 18, 'Clark: $338K', 'start');
      clarkSub = mkText('lbl lbl-sub',  cx, lyBot + 36, '59% of one square', 'start');
    }

    function mkRect(cls, x, y, w, h) {
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('class', cls);
      r.setAttribute('x', x); r.setAttribute('y', y);
      r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('rx', 3);
      return r;
    }
    function mkText(cls, x, y, str, anchor) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('class', cls); t.setAttribute('x', x); t.setAttribute('y', y);
      t.setAttribute('text-anchor', anchor); t.textContent = str;
      svg.appendChild(t); return t;
    }

    let timers = [];
    function play() {
      timers.forEach(clearTimeout); timers = [];
      tiles.forEach(t => t.el.classList.remove('show'));
      [clarkFill, clarkOutline, annoLine, nbaLbl, clarkLbl, clarkSub, unitLbl].forEach(e => e.classList.remove('show'));
      nbaLbl.textContent = 'Risacher: $0';
      nbaLbl.classList.add('show');

      const span = 1400, per = span / tiles.length;
      tiles.sort((a, b) => a.order - b.order)
           .forEach((t, i) => timers.push(setTimeout(() => t.el.classList.add('show'), i * per)));

      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / (span + 200), 1);
        const v = NBA * (1 - Math.pow(1 - p, 3));
        nbaLbl.textContent = 'Risacher: $' + (v / 1e6).toFixed(1) + 'M';
        if (p < 1) requestAnimationFrame(tick); else nbaLbl.textContent = 'Risacher: $57.1M';
      })(start);

      timers.push(setTimeout(() => unitLbl.classList.add('show'), span * 0.6));
      timers.push(setTimeout(() => {
        clarkOutline.classList.add('show');
        clarkFill.classList.add('show');
        annoLine.classList.add('show');
        clarkLbl.classList.add('show');
        clarkSub.classList.add('show');
      }, span + 300));
    }

    build();
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { play(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(document.getElementById('rcs'));
    document.getElementById('rcsReplay').addEventListener('click', play);
  })();
})();
