/* Chart 3 — actual vs. adjusted salary range (#salary-jump-chart) */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const spec3 = {
      "$schema": "https://vega.github.io/schema/vega/v6.json",
      "width": 650,
      "height": 380,
      "background": "transparent",

      "signals": [
        {
          "name": "hovered",
          "value": null,
          "on": [
            {
              "events": "@actualHover:mouseover, @adjustedHover:mouseover",
              "update": "{year: datum.year, group: datum.group}"
            },
            {
              "events": "@actualHover:mouseout, @adjustedHover:mouseout",
              "update": "null"
            }
          ]
        }
      ],

      "data": [
        {
          "name": "actual",
          "values": [
            {"year": "'19", "min": 2723, "median": 64538, "max": 117500},
            {"year": "'20", "min": 4560, "median": 68000, "max": 215000},
            {"year": "'21", "min": 1391, "median": 70040, "max": 221450},
            {"year": "'22", "min": 2245, "median": 72141, "max": 228094},
            {"year": "'23", "min": 1625, "median": 84947.5, "max": 242154},
            {"year": "'24", "min": 635, "median": 89320, "max": 241984},
            {"year": "'25", "min": 833, "median": 80823, "max": 249244}
          ],
          "transform": [
            {"type": "formula", "as": "group", "expr": "'Actual'"}
          ]
        },
        {
          "name": "adjusted",
          "values": [
            {"year": "'19", "min": 14639.78, "median": 346978.49, "max": 685483.87},
            {"year": "'20", "min": 24516.13, "median": 365591.4, "max": 1155913.98},
            {"year": "'21", "min": 7478.49, "median": 376559.14, "max": 1190591.4},
            {"year": "'22", "min": 12069.89, "median": 387854.84, "max": 1226311.83},
            {"year": "'23", "min": 8736.56, "median": 456706.99, "max": 1301903.23},
            {"year": "'24", "min": 3413.98, "median": 480118.28, "max": 1300989.25},
            {"year": "'25", "min": 4478.49, "median": 434532.26, "max": 1447548.39}
          ],
          "transform": [
            {"type": "formula", "as": "group", "expr": "'Adjusted'"}
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
          "labelAlign": "left",
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
                "fontSize": {"value": 12}
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
          "title": null
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
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"},
              "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#555"}
            },
            "update": {
              "strokeOpacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.12}
              ],
              "strokeWidth": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 3
                },
                {"value": 1.5}
              ]
            }
          }
        },
        {
          "type": "rule",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"},
              "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#555"}
            },
            "update": {
              "strokeOpacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.12}
              ],
              "strokeWidth": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 3
                },
                {"value": 1.5}
              ]
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
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.25}
              ]
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
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.25}
              ]
            }
          }
        },

        {
          "type": "symbol",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"},
              "fill": {"value": "#9aaeff"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.15}
              ],
              "size": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 130
                },
                {"value": 80}
              ]
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "median"},
              "fill": {"value": "#aaaaaa"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.15}
              ],
              "size": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 130
                },
                {"value": 80}
              ]
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "min"},
              "fill": {"value": "#b5cc3a"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.15}
              ],
              "size": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 130
                },
                {"value": 80}
              ]
            }
          }
        },

        {
          "type": "symbol",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"},
              "fill": {"value": "#9aaeff"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.15}
              ],
              "size": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 130
                },
                {"value": 80}
              ]
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "median"},
              "fill": {"value": "#aaaaaa"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.15}
              ],
              "size": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 130
                },
                {"value": 80}
              ]
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "min"},
              "fill": {"value": "#b5cc3a"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            },
            "update": {
              "opacity": [
                {
                  "test": "!hovered || (hovered.year === datum.year && hovered.group === datum.group)",
                  "value": 1
                },
                {"value": 0.15}
              ],
              "size": [
                {
                  "test": "hovered && hovered.year === datum.year && hovered.group === datum.group",
                  "value": 130
                },
                {"value": 80}
              ]
            }
          }
        },

        {
          "name": "actualHover",
          "type": "rule",
          "from": {"data": "actual"},
          "encode": {
            "enter": {
              "x": {"scale": "xActual", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"},
              "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#000"},
              "strokeOpacity": {"value": 0.001},
              "strokeWidth": {"value": 18},
              "cursor": {"value": "pointer"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
              }
            }
          }
        },
        {
          "name": "adjustedHover",
          "type": "rule",
          "from": {"data": "adjusted"},
          "encode": {
            "enter": {
              "x": {"scale": "xAdjusted", "field": "year", "band": 0.5},
              "y": {"scale": "y", "field": "max"},
              "y2": {"scale": "y", "field": "min"},
              "stroke": {"value": "#000"},
              "strokeOpacity": {"value": 0.001},
              "strokeWidth": {"value": 18},
              "cursor": {"value": "pointer"},
              "tooltip": {
                "signal": "{'Group': datum.group, 'Year': datum.year, 'Max': '$' + format(datum.max, ','), 'Median': '$' + format(datum.median, ','), 'Min': '$' + format(datum.min, ',')}"
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

    vegaEmbed("#salary-jump-chart", spec3, {actions: false});
  });
})();