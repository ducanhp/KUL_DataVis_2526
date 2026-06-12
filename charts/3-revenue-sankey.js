/* Chart 6 — WNBA/NBA revenue-distribution Sankey with toggle (#rev-sankey) */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.getElementById('sankey');
  if (!svg) return;

  var PLAYER = '#6173c3', REST = '#D6D6D6', STROKE = '#bdbdbd', BG = '#f7f7f5';
  //var sc = 2.5, G1 = 22, G2 = 34, VH = 390;             // G2 = second-stage gap → controls curve
  var sc = 3.0, G1 = 26, G2 = 40, VH = 400; 
  var COL = [[90, 18], [380, 18], [600, 18]];           // [x, width] per column
  var CP = [(COL[0][0] + COL[0][1] + COL[1][0]) / 2, (COL[1][0] + COL[1][1] + COL[2][0]) / 2];

  var DATA = {
    wnba: {
      title: 'WNBA revenue distribution per $100  \u2014  2025 season',
      nodes: [
        { id: 'rev',  name: 'Revenue',             col: 0, val: 100,  lab: '$100' },
        { id: 'wown', name: 'WNBA owners',          col: 1, val: 42,   lab: '$42' },
        { id: 'nown', name: 'NBA owners',           col: 1, val: 42,   lab: '$42' },
        { id: 'inv',  name: 'Investors',            col: 1, val: 16,   lab: '$16' },
        { id: 'play', name: 'Players',              col: 2, val: 9.3,  lab: '$9.3',  parent: 'wown', player: true },
        { id: 'ops',  name: 'Operations + others',  col: 2, val: 32.7, lab: '$32.7', parent: 'wown' }
      ],
      links: [['rev','wown',42,0],['rev','nown',42,0],['rev','inv',16,0],['wown','play',9.3,1],['wown','ops',32.7,0]]
    },
    nba: {
      title: 'NBA revenue distribution per $100  \u2014  2024-25 season',
      nodes: [
        { id: 'rev',  name: 'Revenue',                       col: 0, val: 100, lab: '$100' },
        { id: 'play', name: 'Players',                       col: 1, val: 50,  lab: '$50', player: true },
        { id: 'nown', name: 'NBA owners',                    col: 1, val: 50,  lab: '$50' },
        { id: 'tops', name: 'Team operations + other costs', col: 2, val: 40,  lab: '$40', parent: 'nown' },
        { id: 'prof', name: 'Profit / reserves',             col: 2, val: 10,  lab: '$10', parent: 'nown' }
      ],
      links: [['rev','play',50,1],['rev','nown',50,0],['nown','tops',40,0],['nown','prof',10,0]]
    }
  };

  function el(t, a, c) {
    var e = document.createElementNS(NS, t);
    if (c) e.setAttribute('class', c);
    for (var k in a) e.setAttribute(k, a[k]);
    return e;
  }

  function layout(ds) {
    var N = {};
    ds.nodes.forEach(function (n) { N[n.id] = {}; for (var k in n) N[n.id][k] = n[k]; });
    var c1 = ds.nodes.filter(function (n) { return n.col === 1; });
    var ext = 0; c1.forEach(function (n) { ext += n.val * sc; }); ext += G1 * (c1.length - 1);
    var start = (VH - ext) / 2, y = start; c1.forEach(function (n) { N[n.id].y0 = y; N[n.id].y1 = y + n.val * sc; y += n.val * sc + G1; });
    var rh = 100 * sc; N.rev.y0 = start + (ext - rh) / 2; N.rev.y1 = N.rev.y0 + rh;
    var par = {};
    ds.nodes.forEach(function (n) { if (n.col === 2) (par[n.parent] = par[n.parent] || []).push(n); });
    // center the second-stage group on its parent's midline → flows curve up/down into it
    for (var p in par) {
      var kids = par[p], gh = 0;
      kids.forEach(function (k) { gh += k.val * sc; }); gh += G2 * (kids.length - 1);
      var yy = (N[p].y0 + N[p].y1) / 2 - gh / 2;
      kids.forEach(function (k) { N[k.id].y0 = yy; N[k.id].y1 = yy + k.val * sc; yy += k.val * sc + G2; });
    }
    return N;
  }

  function ribbon(sx, sy0, sy1, tx, ty0, ty1, cp) {
    return 'M' + sx + ' ' + sy0 + ' C' + cp + ' ' + sy0 + ' ' + cp + ' ' + ty0 + ' ' + tx + ' ' + ty0 +
           ' L' + tx + ' ' + ty1 + ' C' + cp + ' ' + ty1 + ' ' + cp + ' ' + sy1 + ' ' + sx + ' ' + sy1 + ' Z';
  }

  var bands = [], nodes = [], labels = [];

  function addTxt(x, y, anchor, str, cls, fill) {
    var t = el('text', { x: x, y: y, 'text-anchor': anchor, fill: fill }, cls + ' sankey-lbl');
    t.textContent = str; svg.appendChild(t); labels.push(t);
  }

  function build(key) {
    var ds = DATA[key], N = layout(ds);
    svg.innerHTML = ''; bands = []; nodes = []; labels = [];
    var soff = {};
    ds.links.forEach(function (L) {
      var s = L[0], t = L[1], v = L[2], pl = L[3];
      var sx = COL[N[s].col][0] + COL[N[s].col][1], tx = COL[N[t].col][0], cp = CP[N[s].col];
      var sy0 = N[s].y0 + (soff[s] || 0), sy1 = sy0 + v * sc; soff[s] = (soff[s] || 0) + v * sc;
      var b = el('path', { d: ribbon(sx, sy0, sy1, tx, N[t].y0, N[t].y1, cp), fill: pl ? PLAYER : REST }, 'sankey-band' + (pl ? ' is-player' : ''));
      b.innerHTML = '<title>' + N[s].name + ' \u2192 ' + N[t].name + ': ' + N[t].lab + '</title>';
      svg.appendChild(b); bands.push(b);
    });
    ds.nodes.forEach(function (n) {
      var nn = N[n.id], x = COL[n.col][0], w = COL[n.col][1], mid = (nn.y0 + nn.y1) / 2;
      var rect = el('rect', { x: x, y: nn.y0, width: w, height: nn.y1 - nn.y0, rx: 2, fill: n.player ? PLAYER : REST, stroke: STROKE, 'stroke-width': 0.8 }, 'sankey-node');
      svg.appendChild(rect); nodes.push(rect);
      var tc = n.player ? PLAYER : '#111', vc = n.player ? PLAYER : '#555';
      if (n.col === 2 || n.player) {  // player node always labels on the right
        var tx = x + w + 8;
        if (n.name.length > 16 && n.name.indexOf('+') > 0) {
          var parts = n.name.split('+');
          addTxt(tx, mid - 9, 'start', parts[0].trim(), 's-name', tc);
          addTxt(tx, mid + 6, 'start', '+ ' + parts[1].trim(), 's-name', tc);
          addTxt(tx, mid + 21, 'start', n.lab, 's-val', vc);
        } else {
          addTxt(tx, mid - 2, 'start', n.name, 's-name', tc);
          addTxt(tx, mid + 13, 'start', n.lab, 's-val', vc);
        }
      } else if (n.col === 1) {
        var lx = x - 8, bw = n.name.length * 7.1 + 8;
        var box = el('rect', { x: lx - bw, y: mid - 16, width: bw, height: 31, rx: 3, fill: 'none', opacity: 0.85 }, 'sankey-lbl');
        svg.appendChild(box); labels.push(box);
        addTxt(lx, mid - 2, 'end', n.name, 's-name', tc);
        addTxt(lx, mid + 13, 'end', n.lab, 's-val', vc);
      } else {
        addTxt(x - 6, mid - 2, 'end', n.name, 's-name', tc);
        addTxt(x - 6, mid + 13, 'end', n.lab, 's-val', vc);
      }
    });
    var tEl = document.getElementById('skTitle');
    if (tEl) tEl.textContent = ds.title;
  }

  var timers = [];
  function play() {
    timers.forEach(clearTimeout); timers = [];
    bands.concat(nodes, labels).forEach(function (e) { e.classList.remove('show'); });
    bands.forEach(function (b, i) { timers.push(setTimeout(function () { b.classList.add('show'); }, 120 + i * 110)); });
    nodes.forEach(function (n, i) { timers.push(setTimeout(function () { n.classList.add('show'); }, 120 + i * 70)); });
    timers.push(setTimeout(function () { labels.forEach(function (l) { l.classList.add('show'); }); }, 160 + bands.length * 110));
  }

  var cur = 'wnba';
  function show(key) {
    cur = key; build(key); play();
    var bw = document.getElementById('tWnba'), bn = document.getElementById('tNba');
    if (bw) bw.classList.toggle('on', key === 'wnba');
    if (bn) bn.classList.toggle('on', key === 'nba');
  }

  build('wnba');   // draw immediately (hidden until revealed)
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { play(); io.disconnect(); } });
  }, { threshold: 0.3 });
  io.observe(document.getElementById('rev-sankey'));

  var tw = document.getElementById('tWnba'), tn = document.getElementById('tNba'), rb = document.getElementById('sankeyReplay');
  if (tw) tw.addEventListener('click', function () { if (cur !== 'wnba') show('wnba'); });
  if (tn) tn.addEventListener('click', function () { if (cur !== 'nba') show('nba'); });
  if (rb) rb.addEventListener('click', function () { play(); });
})();
