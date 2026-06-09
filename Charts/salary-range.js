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
            {"year": "'19", "min": 2723,  "avg": 74905.82,  "max": 117500},
            {"year": "'20", "min": 4560,  "avg": 90791.5,  "max": 215000},
            {"year": "'21", "min": 1391,  "avg": 99166.57,  "max": 221450},
            {"year": "'22", "min": 2245,  "avg": 97813.72,  "max": 228094},
            {"year": "'23", "min": 1625,  "avg": 115425.65,  "max": 242154},
            {"year": "'24", "min": 635,  "avg": 114452.64,  "max": 241984},
            {"year": "'25", "min": 833,  "avg": 103772.6,  "max": 249244}
          ]
        },
        {
          "name": "adjusted",
          "values": [
            {"year": "'19", "min": 14639.78,  "avg": 402719.46,  "max": 685483.87},
            {"year": "'20", "min": 24516.13,  "avg": 488126.34,  "max": 1155913.98},
            {"year": "'21", "min": 7478.49,  "avg": 533153.6,  "max": 1190591.4},
            {"year": "'22", "min": 12069.89,  "avg": 525880.22,  "max": 1226311.83},
            {"year": "'23", "min": 8736.56,  "avg": 620568.01,  "max": 1301903.23},
            {"year": "'24", "min": 3413.98,  "avg": 615336.77, "max": 1300989.25},
            {"year": "'25", "min": 4478.49,  "avg": 557917.2, "max": 1447548.39}
          ]
        }
      ],

      "scales": [
        {
          "name": "y",
          "type": "linear",
          "domain": [0, 1500000],
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
          "labelAlign":"left",
          "labelPadding": 52,
          "labelColor": "#666",
          "values": [0, 250000, 500000, 750000, 1000000, 1250000, 1500000],
          "labelFontSize": 11,
          "title": "ANNUAL SALARY",
          "titleAlign": "left",
          "titleAngle": 0,
          "titleX": -52,
          "titleY": -16,
          "titleFontSize": 14,
          "titleFont": "Helvetica",
          "titleColor": "#333",
          "encode": {
            "labels": {
              "update": {
                "text": {
                  "signal": "datum.value === 0 ? '' : '$' + (datum.value >= 1000000 ? (datum.value/1000000) + ' mil' : (datum.value/1000) + 'k')"
                },
                "fill": {"value": "#666"},
                "font": {"value": "Helvetica"},
                "fontSize": {"value": 12},
              }
            }
          }
        },
        {
          "orient": "bottom",
          "scale": "xActual",
          "ticks": false,
          "domain": true,
          "domainColor": "#666666",
          "labels": false,
          "title": null,
        },
        {
          "orient": "bottom",
          "scale": "xAdjusted",
          "ticks": false,
          "domain": true,
          "domainColor": "#666666",
          "labels": false,
          "title": null
        }
      ],

      "marks": [
        {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"value": 140},
              "y": {"signal": "height + 40"},
              "text": {"value": "How W.N.B.A. players have been paid"},
              "align": {"value": "center"},
              "fill": {"value": "#111"},
              "font": {"value": "Helvetica"},
              "fontSize": {"value": 15},
              "fontWeight": {"value": "bold"}
            }
          }
        },
        {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"value": 495},
              "y": {"signal": "height + 40"},
              "text": {"value": "If the W.N.B.A. shared revenue like the N.B.A."},
              "align": {"value": "center"},
              "fill": {"value": "#111"},
              "font": {"value": "Helvetica"},
              "fontSize": {"value": 15},
              "fontWeight": {"value": "bold"}
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
              "fill": {"value": "#666"},
              "fontSize": {"value": 12},
              "font": {"value": "Helvetica"}
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
              "fill": {"value": "#666"},
              "fontSize": {"value": 12},
              "font": {"value": "Helvetica"}
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
