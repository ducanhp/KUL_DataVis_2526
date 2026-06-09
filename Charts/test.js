/* Chart 3 — actual vs. adjusted salary range (#salary-jump-chart) */
(function () {
    document.addEventListener('DOMContentLoaded', () => {
  
      const spec3 = {
        "$schema": "https://vega.github.io/schema/vega/v6.json",
        "width": 700,
        "height": 400,
        "background": "transparent",
        "autosize": {"type": "pad", "resize": true},
  
        "signals": [
          {"name": "plotTop", "value": 70},
          {"name": "plotBottom", "value": 360}
        ],
  
        "data": [
          {
            "name": "actual",
            "values": [
              {"year": "'19", "min": 2723,  "avg": 74905.82,  "max": 117500},
              {"year": "'20", "min": 4560,  "avg": 90791.5,   "max": 215000},
              {"year": "'21", "min": 1391,  "avg": 99166.57,  "max": 221450},
              {"year": "'22", "min": 2245,  "avg": 97813.72,  "max": 228094},
              {"year": "'23", "min": 1625,  "avg": 115425.65, "max": 242154},
              {"year": "'24", "min": 635,   "avg": 114452.64, "max": 241984},
              {"year": "'25", "min": 833,   "avg": 103772.6,  "max": 249244}
            ]
          },
          {
            "name": "adjusted",
            "values": [
              {"year": "'19", "min": 14639.78, "avg": 402719.46, "max": 685483.87},
              {"year": "'20", "min": 24516.13, "avg": 488126.34, "max": 1155913.98},
              {"year": "'21", "min": 7478.49,  "avg": 533153.6,  "max": 1190591.4},
              {"year": "'22", "min": 12069.89, "avg": 525880.22, "max": 1226311.83},
              {"year": "'23", "min": 8736.56,  "avg": 620568.01, "max": 1301903.23},
              {"year": "'24", "min": 3413.98,  "avg": 615336.77, "max": 1300989.25},
              {"year": "'25", "min": 4478.49,  "avg": 557917.2,  "max": 1447548.39}
            ]
          },
          {
            "name": "legend",
            "values": [
              {"label": "Maximum salary", "color": "#9aaeff", "x": 232},
              {"label": "Average",        "color": "#aaaaaa", "x": 362},
              {"label": "Minimum salary", "color": "#b5cc3a", "x": 452}
            ]
          }
        ],
  
        "scales": [
          {
            "name": "y",
            "type": "linear",
            "domain": [0, 1500000],
            "range": [{"signal": "plotBottom"}, {"signal": "plotTop"}]
          },
          {"name": "xActual",   "type": "band", "domain": {"data": "actual",   "field": "year"}, "range": [55, 320],  "padding": 0.3},
          {"name": "xAdjusted", "type": "band", "domain": {"data": "adjusted", "field": "year"}, "range": [380, 690], "padding": 0.3}
        ],
  
        "axes": [
          {
            "orient": "left",
            "scale": "y",
            "values": [250000, 500000, 750000, 1000000, 1250000, 1500000],
            "ticks": false, "domain": false, "grid": false,
            "labelColor": "#888", "labelFontSize": 11, "labelPadding": 6, "title": null,
            "encode": {
              "labels": {
                "update": {
                  "text": {"signal": "datum.value === 1500000 ? '$1.5 million' : (datum.value >= 1000000 ? (datum.value/1000000) + ' million' : format(datum.value, ','))"}
                }
              }
            }
          }
        ],
  
        "marks": [
          /* ── pill legend (under the HTML title, above the plot) ── */
          {
            "type": "rect", "from": {"data": "legend"},
            "encode": {"enter": {
              "x": {"field": "x"}, "y": {"value": 14},
              "width": {"value": 24}, "height": {"value": 12},
              "cornerRadius": {"value": 6}, "fill": {"field": "color"}
            }}
          },
          {
            "type": "text", "from": {"data": "legend"},
            "encode": {"enter": {
              "x": {"signal": "datum.x + 30"}, "y": {"value": 20},
              "text": {"field": "label"}, "align": {"value": "left"},
              "baseline": {"value": "middle"}, "fill": {"value": "#555"}, "fontSize": {"value": 12}
            }}
          },
  
          /* ── Actual / Adjusted headers (moved above the graph) ── */
          {
            "type": "text",
            "encode": {"enter": {
              "x": {"value": 187}, "y": {"value": 52},
              "text": {"value": "Actual"}, "align": {"value": "center"},
              "fill": {"value": "#111"}, "fontSize": {"value": 13}, "fontWeight": {"value": "bold"}
            }}
          },
          {
            "type": "text",
            "encode": {"enter": {
              "x": {"value": 535}, "y": {"value": 52},
              "text": {"value": "Adjusted"}, "align": {"value": "center"},
              "fill": {"value": "#111"}, "fontSize": {"value": 13}, "fontWeight": {"value": "bold"}
            }}
          },
  
          /* ── ACTUAL panel ── */
          {
            "type": "rule", "from": {"data": "actual"},
            "encode": {"enter": {
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"}, "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#555"}, "strokeWidth": {"value": 1.5}
            }}
          },
          {"type": "symbol", "from": {"data": "actual"}, "encode": {"enter": {"x": {"scale": "xActual", "field": "year", "band": 0.5}, "y": {"scale": "y", "field": "max"}, "fill": {"value": "#9aaeff"}, "size": {"value": 80}, "tooltip": {"signal": "{'Group': 'Actual', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"}}}},
          {"type": "symbol", "from": {"data": "actual"}, "encode": {"enter": {"x": {"scale": "xActual", "field": "year", "band": 0.5}, "y": {"scale": "y", "field": "avg"}, "fill": {"value": "#aaaaaa"}, "size": {"value": 80}, "tooltip": {"signal": "{'Group': 'Actual', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"}}}},
          {"type": "symbol", "from": {"data": "actual"}, "encode": {"enter": {"x": {"scale": "xActual", "field": "year", "band": 0.5}, "y": {"scale": "y", "field": "min"}, "fill": {"value": "#b5cc3a"}, "size": {"value": 80}, "tooltip": {"signal": "{'Group': 'Actual', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"}}}},
  
          /* ── ADJUSTED panel ── */
          {
            "type": "rule", "from": {"data": "adjusted"},
            "encode": {"enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"}, "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#555"}, "strokeWidth": {"value": 1.5}
            }}
          },
          {"type": "symbol", "from": {"data": "adjusted"}, "encode": {"enter": {"x": {"scale": "xAdjusted", "field": "year", "band": 0.5}, "y": {"scale": "y", "field": "max"}, "fill": {"value": "#9aaeff"}, "size": {"value": 80}, "tooltip": {"signal": "{'Group': 'Adjusted', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"}}}},
          {"type": "symbol", "from": {"data": "adjusted"}, "encode": {"enter": {"x": {"scale": "xAdjusted", "field": "year", "band": 0.5}, "y": {"scale": "y", "field": "avg"}, "fill": {"value": "#aaaaaa"}, "size": {"value": 80}, "tooltip": {"signal": "{'Group': 'Adjusted', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"}}}},
          {"type": "symbol", "from": {"data": "adjusted"}, "encode": {"enter": {"x": {"scale": "xAdjusted", "field": "year", "band": 0.5}, "y": {"scale": "y", "field": "min"}, "fill": {"value": "#b5cc3a"}, "size": {"value": 80}, "tooltip": {"signal": "{'Group': 'Adjusted', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"}}}},
  
          /* ── baseline under the graph ── */
          {
            "type": "rule",
            "encode": {"enter": {
              "x": {"value": 50}, "x2": {"value": 695},
              "y": {"signal": "plotBottom"}, "stroke": {"value": "#333"}, "strokeWidth": {"value": 1}
            }}
          },
  
          /* ── year labels ── */
          {"type": "text", "from": {"data": "actual"},   "encode": {"enter": {"x": {"scale": "xActual",   "field": "year", "band": 0.5}, "y": {"signal": "plotBottom + 18"}, "text": {"field": "year"}, "align": {"value": "center"}, "fill": {"value": "#888"}, "fontSize": {"value": 11}}}},
          {"type": "text", "from": {"data": "adjusted"}, "encode": {"enter": {"x": {"scale": "xAdjusted", "field": "year", "band": 0.5}, "y": {"signal": "plotBottom + 18"}, "text": {"field": "year"}, "align": {"value": "center"}, "fill": {"value": "#888"}, "fontSize": {"value": 11}}}}
        ],
  
        "config": {"view": {"stroke": null}, "axis": {"grid": false}, "font": "Helvetica, Arial, sans-serif"}
      };
  
      vegaEmbed('#salary-jump-chart', spec3, {actions: false});
    });
  })();