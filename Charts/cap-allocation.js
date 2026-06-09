/* Chart 4 — per-team cap allocations (#cap-allocation-chart) */
(function () {
    document.addEventListener('DOMContentLoaded', () => {
      const spec4 = {
        "$schema": "https://vega.github.io/schema/vega/v6.json",
        "width": 640,
        "height": 400,
        "background": "transparent",
        "data": [
          {
            "name": "table",
            "values": [
              {"team": "LV",  "capAlloc": 1530746, "adjAlloc": 3367641},
              {"team": "DAL", "capAlloc": 1518904, "adjAlloc": 3341589},
              {"team": "MIN", "capAlloc": 1508049, "adjAlloc": 3317708},
              {"team": "PHX", "capAlloc": 1506620, "adjAlloc": 3314564},
              {"team": "ATL", "capAlloc": 1506483, "adjAlloc": 3314263},
              {"team": "NY",  "capAlloc": 1504935, "adjAlloc": 3310857},
              {"team": "IND", "capAlloc": 1491130, "adjAlloc": 3280486},
              {"team": "LA",  "capAlloc": 1487034, "adjAlloc": 3271475},
              {"team": "CHI", "capAlloc": 1479627, "adjAlloc": 3255179},
              {"team": "SEA", "capAlloc": 1464680, "adjAlloc": 3222296},
              {"team": "CON", "capAlloc": 1292753, "adjAlloc": 2844057},
              {"team": "GS",  "capAlloc": 1287618, "adjAlloc": 2832760},
              {"team": "WAS", "capAlloc": 1235882, "adjAlloc": 2718940}
            ]
          },
          {
            "name": "caps",
            "values": [
              {"cap": 1507100, "label": "Salary cap — $1,507,100", "color": "#c0392b"},
              {"cap": 3014200, "label": "Adjusted cap — $3,014,200", "color": "#d68910"}
            ]
          },
          {
            "name": "legend",
            "values": [
              {"label": "Adjusted allocations",   "color": "#a4b5ff", "x": 0},
              {"label": "Total cap allocations",   "color": "#6173c3", "x": 180}
            ]
          }
        ],
        "scales": [
          {
            "name": "x",
            "type": "band",
            "domain": {"data": "table", "field": "team"},
            "range": "width",
            "padding": 0.3
          },
          {
            "name": "y",
            "type": "linear",
            "domain": [0, 3800000],
            "range": "height",
            "zero": true,
            "nice": false
          }
        ],
        "axes": [
          {
            "orient": "bottom",
            "scale": "x",
            "ticks": false,
            "domain": true,
            "domainColor": "#666666",
            "labelFont": "Helvetica",
            "labelFontSize": 12,
            "labelColor": "#666",
            "labelPadding": 8,
            "title": null
          },
          {
            "orient": "left",
            "scale": "y",
            "ticks": false,
            "domain": false,
            "grid": false,
            "labelFont": "Helvetica",
            "labelFontSize": 12,
            "labelColor": "#666",
            "labelPadding": 6,
            "labelAlign": "right",
            "values": [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000],
            "encode": {
              "labels": {
                "update": {
                  "text": {
                    "signal": "datum.value === 0 ? '' : '$' + format(datum.value / 1000000, '.1f') + 'M'"
                  },
                  "fill": {"value": "#666"},
                  "font": {"value": "Helvetica"},
                  "fontSize": {"value": 12}
                }
              }
            },
            "title": "ANNUAL CAP ALLOCATION PER TEAM",
            "titleAlign": "left",
            "titleAngle": 0,
            "titleX": -52,
            "titleY": -16,
            "titleFontSize": 12,
            "titleFont": "Helvetica",
            "titleColor": "#333"
          }
        ],
        "marks": [
          {
            "type": "rect",
            "from": {"data": "table"},
            "encode": {
              "enter": {
                "xc": {"signal": "scale('x', datum.team) + bandwidth('x') / 2"},
                "width": {"value": 38},
                "y": {"scale": "y", "field": "adjAlloc"},
                "y2": {"scale": "y", "value": 0},
                "fill": {"value": "#a4b5ff"},
                "tooltip": {
                  "signal": "{'Team': datum.team, 'Adjusted allocations': '$' + format(datum.adjAlloc, ',.0f'), 'Total cap allocations': '$' + format(datum.capAlloc, ',.0f')}"
                }
              },
              "hover": {"fill": {"value": "#8fa8f5"}},
              "update": {"fill": {"value": "#a4b5ff"}}
            }
          },
          {
            "type": "rect",
            "from": {"data": "table"},
            "encode": {
              "enter": {
                "xc": {"signal": "scale('x', datum.team) + bandwidth('x') / 2"},
                "width": {"value": 22},
                "y": {"scale": "y", "field": "capAlloc"},
                "y2": {"scale": "y", "value": 0},
                "fill": {"value": "#6173c3"},
                "tooltip": {
                  "signal": "{'Team': datum.team, 'Adjusted allocations': '$' + format(datum.adjAlloc, ',.0f'), 'Total cap allocations': '$' + format(datum.capAlloc, ',.0f')}"
                }
              },
              "hover": {"fill": {"value": "#4a5aaa"}},
              "update": {"fill": {"value": "#6173c3"}}
            }
          },
          {
            "type": "rule",
            "from": {"data": "caps"},
            "encode": {
              "enter": {
                "x": {"value": 0},
                "x2": {"signal": "width"},
                "y": {"scale": "y", "field": "cap"},
                "stroke": {"field": "color"},
                "strokeWidth": {"value": 1.5},
                "strokeDash": {"value": [6, 4]}
              }
            }
          },
          {
            "type": "text",
            "from": {"data": "caps"},
            "encode": {
              "enter": {
                "x": {"signal": "width - 4"},
                "y": {"scale": "y", "field": "cap", "offset": -6},
                "text": {"field": "label"},
                "font": {"value": "Helvetica"},
                "fontSize": {"value": 10},
                "fill": {"field": "color"},
                "align": {"value": "right"},
                "baseline": {"value": "bottom"}
              }
            }
          },
          {
            "type": "rect",
            "from": {"data": "legend"},
            "encode": {
              "enter": {
                "x": {"field": "x"},
                "y": {"value": 430},
                "width": {"value": 12},
                "height": {"value": 12},
                "fill": {"field": "color"}
              }
            }
          },
          {
            "type": "text",
            "from": {"data": "legend"},
            "encode": {
              "enter": {
                "x": {"signal": "datum.x + 16"},
                "y": {"value": 436},
                "text": {"field": "label"},
                "font": {"value": "Helvetica"},
                "fontSize": {"value": 11},
                "fill": {"value": "#444"},
                "baseline": {"value": "middle"}
              }
            }
          }
        ],
        "config": {}
      };
  
      vegaEmbed('#cap-allocation-chart', spec4, {mode: "vega", actions: false})
        .then(console.log).catch(console.warn);
    });
})();
