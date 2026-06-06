/* Chart 3 — actual vs. adjusted salary range (#salary-jump-chart) */
(function () {
    /* ── Chart 3: actual vs. adjusted salary range (#salary-jump-chart) ── */
    document.addEventListener('DOMContentLoaded', () => {

    const spec3 = {
      "$schema": "https://vega.github.io/schema/vega/v6.json",
      "width": 650,
      "height": 380,
      "background": "transparent",

      "data": [
        {
          "name": "actual",
          "values": [
            {"year": "'19", "min": 41965,  "avg": 102751,  "max": 228094},
            {"year": "'20", "min": 44040,  "avg": 109025,  "max": 185000},
            {"year": "'21", "min": 57000,  "avg": 120648,  "max": 221450},
            {"year": "'22", "min": 60000,  "avg": 128358,  "max": 234936},
            {"year": "'23", "min": 62285,  "avg": 133015,  "max": 241984},
            {"year": "'24", "min": 64154,  "avg": 146321,  "max": 249244},
            {"year": "'25", "min": 66000,  "avg": 150000,  "max": 249244}
          ]
        },
        {
          "name": "adjusted",
          "values": [
            {"year": "'19", "min": 50000,  "avg": 500000,  "max": 1400000},
            {"year": "'20", "min": 50000,  "avg": 600000,  "max": 1750000},
            {"year": "'21", "min": 55000,  "avg": 700000,  "max": 2050000},
            {"year": "'22", "min": 58000,  "avg": 800000,  "max": 2500000},
            {"year": "'23", "min": 60000,  "avg": 900000,  "max": 2800000},
            {"year": "'24", "min": 62000,  "avg": 1000000, "max": 3250000},
            {"year": "'25", "min": 64000,  "avg": 1050000, "max": 4000000}
          ]
        }
      ],

      "scales": [
        {
          "name": "y",
          "type": "linear",
          "domain": [0, 4000000],
          "range": "height"
        },
        {
          "name": "xActual",
          "type": "band",
          "domain": {"data": "actual", "field": "year"},
          "range": [0, 280],
          "padding": 0.3
        },
        {
          "name": "xAdjusted",
          "type": "band",
          "domain": {"data": "adjusted", "field": "year"},
          "range": [340, 650],
          "padding": 0.3
        }
      ],

      "axes": [
        {
          "orient": "left",
          "scale": "y",
          "ticks": false,
          "domain": false,
          "grid": false,
          "labelColor": "#888",
          "labelFontSize": 11,
          "title": null,
          "encode": {
            "labels": {
              "update": {
                "text": {
                  "signal": "datum.value === 0 ? '' : datum.value >= 1000000 ? datum.value / 1000000 + ' million' : datum.value === 500000 ? '500k' : ''"
                }
              }
            }
          }
        }
      ],

      "marks": [
        {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"value": 140},
              "y": {"signal": "height + 30"},
              "text": {"value": "Actual"},
              "align": {"value": "center"},
              "fill": {"value": "#aaa"},
              "fontSize": {"value": 12}
            }
          }
        },
        {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"value": 495},
              "y": {"signal": "height + 30"},
              "text": {"value": "Adjusted"},
              "align": {"value": "center"},
              "fill": {"value": "#aaa"},
              "fontSize": {"value": 12}
            }
          }
        },

        {
          "type": "rule",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x":  {"scale": "xActual", "field": "year", "band": 0.5},
              "y":  {"scale": "y", "field": "max"},
              "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#555"},
              "strokeWidth": {"value": 1.5}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"signal": "height + 16"},
              "text": {"field": "year"},
              "align": {"value": "center"},
              "fill": {"value": "#888"},
              "fontSize": {"value": 11}
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x":    {"scale": "xActual", "field": "year", "band": 0.5},
              "y":    {"scale": "y", "field": "max"},
              "fill": {"value": "#9aaeff"},
              "size": {"value": 80},
              "tooltip": {
                "signal": "{'Group': 'Actual', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x":    {"scale": "xActual", "field": "year", "band": 0.5},
              "y":    {"scale": "y", "field": "avg"},
              "fill": {"value": "#aaaaaa"},
              "size": {"value": 80},
              "tooltip": {
                "signal": "{'Group': 'Actual', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x":    {"scale": "xActual", "field": "year", "band": 0.5},
              "y":    {"scale": "y", "field": "min"},
              "fill": {"value": "#b5cc3a"},
              "size": {"value": 80},
              "tooltip": {
                "signal": "{'Group': 'Actual', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        },

        {
          "type": "rule",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x":  {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y":  {"scale": "y", "field": "max"},
              "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#555"},
              "strokeWidth": {"value": 1.5}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"signal": "height + 16"},
              "text": {"field": "year"},
              "align": {"value": "center"},
              "fill": {"value": "#888"},
              "fontSize": {"value": 11}
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x":    {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y":    {"scale": "y", "field": "max"},
              "fill": {"value": "#9aaeff"},
              "size": {"value": 80},
              "tooltip": {
                "signal": "{'Group': 'Adjusted', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x":    {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y":    {"scale": "y", "field": "avg"},
              "fill": {"value": "#aaaaaa"},
              "size": {"value": 80},
              "tooltip": {
                "signal": "{'Group': 'Adjusted', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x":    {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y":    {"scale": "y", "field": "min"},
              "fill": {"value": "#b5cc3a"},
              "size": {"value": 80},
              "tooltip": {
                "signal": "{'Group': 'Adjusted', 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Avg': '$' + format(datum.avg, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        }
      ],

      "config": {
        "view": {"stroke": null},
        "axis": {"grid": false}
      }
    };

    vegaEmbed('#salary-jump-chart', spec3, {actions: false});
  });
})();
