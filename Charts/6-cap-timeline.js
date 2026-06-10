/* Chart 7 — salary cap over time, actual vs adjusted (#cap-timeline-chart) */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const spec = {
      "$schema": "https://vega.github.io/schema/vega/v6.json",
      "width": 558,
      "height": 380,
      "background": "transparent",
      "autosize": {"type": "none"},
      "padding": {"left": 52, "top": 23, "right": 110, "bottom": 20},

      "data": [
        {
          "name": "table",
          "values": [
            {"year": "2019", "cap": 996100,  "adj": 2191420},
            {"year": "2020", "cap": 1300000, "adj": 2860000},
            {"year": "2021", "cap": 1339000, "adj": 2945800},
            {"year": "2022", "cap": 1379200, "adj": 3034240},
            {"year": "2023", "cap": 1420500, "adj": 3125100},
            {"year": "2024", "cap": 1463200, "adj": 3219040},
            {"year": "2025", "cap": 1507100, "adj": 3315620}
          ]
        },
        {
          "name": "ends",
          "source": "table",
          "transform": [{"type": "filter", "expr": "datum.year === '2025'"}]
        },
        {
          "name": "anno",
          "values": [
            {"year": "2022", "y": 2206720, "text": "Room a fairer cap would unlock"}
          ]
        }
      ],

      "scales": [
        {
          "name": "x",
          "type": "point",
          "domain": {"data": "table", "field": "year"},
          "range": "width",
          "padding": 0.06
        },
        {
          "name": "y",
          "type": "linear",
          "domain": [0, 3600000],
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
          "gridColor": "#ededed",
          "gridWidth": 1,
          "labelFont": "Helvetica",
          "labelAlign": "left",
          "labelPadding": 52,
          "labelFontSize": 12,
          "labelColor": "#666",
          "values": [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000],
          "encode": {
            "labels": {
              "update": {
                "text": {
                  "signal": "datum.value === 0 ? '' : '$' + format(datum.value / 1000000, '.1f') + ' mil'"
                },
                "fill": {"value": "#666"},
                "font": {"value": "Helvetica"},
                "fontSize": {"value": 12}
              }
            }
          },
          "title": "ANNUAL SALARY CAP",
          "titleAlign": "left",
          "titleAngle": 0,
          "titleX": -52,
          "titleY": -6,
          "titleFontSize": 14,
          "titleFont": "Helvetica",
          "titleColor": "#333",
        }
      ],

      "marks": [
        {
          "type": "area",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "adj"},
              "y2": {"scale": "y", "field": "cap"},
              "fill": {"value": "#a4b5ff"},
              "fillOpacity": {"value": 0.18},
              "interpolate": {"value": "monotone"}
            }
          }
        },
        {
          "type": "line",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "adj"},
              "stroke": {"value": "#a4b5ff"},
              "strokeWidth": {"value": 2.5},
              "interpolate": {"value": "monotone"}
            }
          }
        },
        {
          "type": "line",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "cap"},
              "stroke": {"value": "#6173c4"},
              "strokeWidth": {"value": 2.5},
              "interpolate": {"value": "monotone"}
            }
          }
        },

        {
          "type": "symbol",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "adj"},
              "fill": {"value": "#a4b5ff"},
              "stroke": {"value": "#fff"},
              "strokeWidth": {"value": 1.5},
              "size": {"value": 75},
              "tooltip": {
                "signal": "{'Season': datum.year, 'Adjusted cap': '$' + format(datum.adj, ',.0f'), 'Actual cap': '$' + format(datum.cap, ',.0f')}"
              }
            },
            "hover": {"size": {"value": 130}},
            "update": {"size": {"value": 75}}
          }
        },
        {
          "type": "symbol",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "cap"},
              "fill": {"value": "#6173c4"},
              "stroke": {"value": "#fff"},
              "strokeWidth": {"value": 1.5},
              "size": {"value": 75},
              "tooltip": {
                "signal": "{'Season': datum.year, 'Adjusted cap': '$' + format(datum.adj, ',.0f'), 'Actual cap': '$' + format(datum.cap, ',.0f')}"
              }
            },
            "hover": {"size": {"value": 130}},
            "update": {"size": {"value": 75}}
          }
        },

        {
          "type": "text",
          "from": {"data": "anno"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year"},
              "y": {"scale": "y", "field": "y"},
              "text": {"field": "text"},
              "fill": {"value": "#4a5294"},
              "font": {"value": "Helvetica"},
              "fontSize": {"value": 12.5},
              "align": {"value": "center"},
              "baseline": {"value": "middle"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "ends"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year", "offset": 14},
              "y": {"scale": "y", "field": "adj"},
              "text": {"value": "Adjusted cap"},
              "fill": {"value": "#8290da"},
              "font": {"value": "Helvetica"},
              "fontSize": {"value": 13},
              "fontWeight": {"value": "bold"},
              "align": {"value": "left"},
              "baseline": {"value": "middle"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "ends"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year", "offset": 14},
              "y": {"scale": "y", "field": "adj", "offset": 17},
              "text": {"value": "≈ 2.2× the cap"},
              "fill": {"value": "#8290da"},
              "font": {"value": "Helvetica"},
              "fontSize": {"value": 11},
              "align": {"value": "left"},
              "baseline": {"value": "middle"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "ends"},
          "encode": {
            "enter": {
              "x": {"scale": "x", "field": "year", "offset": 14},
              "y": {"scale": "y", "field": "cap"},
              "text": {"value": "Actual cap"},
              "fill": {"value": "#6173c4"},
              "font": {"value": "Helvetica"},
              "fontSize": {"value": 13},
              "fontWeight": {"value": "bold"},
              "align": {"value": "left"},
              "baseline": {"value": "middle"}
            }
          }
        }
      ],

      "config": {}
    };

    vegaEmbed('#cap-timeline-chart', spec, {mode: "vega", actions: false})
      .then(console.log).catch(console.warn);
  });
})();