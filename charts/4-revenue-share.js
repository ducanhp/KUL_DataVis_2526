/* Chart 2 — revenue vs. player share over time (#WNBA-salary-distribution) */
(function () {
  /* ── Chart 2: revenue vs. player share over time (#WNBA-salary-distribution) ── */
  document.addEventListener('DOMContentLoaded', () => {
    const spec2 = {
      "$schema": "https://vega.github.io/schema/vega/v6.json",
      "width": 658,
      "height": 380,
      "signals": [
        {
          "name": "hoveryear",
          "value": null,
          "on": [
            { "events": "@barRev:pointerover, @barAdj:pointerover, @barSal:pointerover", "update": "datum.year" },
            { "events": "@barRev:pointerout, @barAdj:pointerout, @barSal:pointerout", "update": "null" }
          ]
        }
      ],
      "data": [
        {
          "name": "table",
          "values": [
            {"year": "2019", "Revenue": 101.7, "Adjusted": 50.85, "Salary": 9.46},
            {"year": "2020", "Revenue": 120, "Adjusted": 60, "Salary": 11.16},
            {"year": "2021", "Revenue": 150, "Adjusted": 75, "Salary": 13.95},
            {"year": "2022", "Revenue": 170, "Adjusted": 85, "Salary": 15.81},
            {"year": "2023", "Revenue": 200, "Adjusted": 100, "Salary": 18.6},
            {"year": "2024", "Revenue": 226, "Adjusted": 113, "Salary": 21.02},
            {"year": "2025", "Revenue": 300, "Adjusted": 150, "Salary": 27.9}
          ]
        }
      ],
      "scales": [
        {
          "name": "x",
          "type": "band",
          "domain": {"data": "table", "field": "year"},
          "range": "width",
          "padding": 0.3
        },
        {
          "name": "y",
          "type": "linear",
          "domain": [0, 320],
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
          "labelAlign":"left",
          "labelPadding": 52,
          "labelFontSize": 12,
          "labelColor": "#666",
          "values": [50, 100, 150, 200, 250, 300],
          "encode": {
            "labels": {
              "update": {
                "text": {
                  "signal": "datum.value == 0 ? '' : '$' + datum.value + 'M'"
                },
                "fill": {"value": "#666"},
                "font": {"value": "Helvetica"},
                "fontSize": {"value": 12}
              }
            }
          },
          "title": "ANNUAL REVENUE",
          "titleAlign": "left",
          "titleAngle": 0,
          "titleX": -52,
          "titleY": 0,
          "titleFontSize": 14,
          "titleFont": "Helvetica",
          "titleColor": "#333"
        }
      ],
      "marks": [
        {
          "type": "rect",
          "name": "barRev",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "xc": {"signal": "scale('x', datum.year) + bandwidth('x') / 2"},
              "width": {"value": 38},
              "y": {"scale": "y", "field": "Revenue"},
              "y2": {"scale": "y", "value": 0},
              "fill": {"value": "#c8c8c8"},
              "tooltip": {
                "signal": "{'Year': datum.year, 'Total revenue': datum.Revenue + 'M', 'NBA-equivalent Salary': datum.Adjusted + 'M', 'Actual salary': datum.Salary + 'M'}"
              }
            },
            "update": {
              "opacity": {"signal": "hoveryear == null || datum.year == hoveryear ? 1 : 0.15"}
            }
          }
        },
        {
          "type": "rect",
          "name": "barAdj",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "xc": {"signal": "scale('x', datum.year) + bandwidth('x') / 2"},
              "width": {"value": 28},
              "y": {"scale": "y", "field": "Adjusted"},
              "y2": {"scale": "y", "value": 0},
              "fill": {"value": "#a4b5ff"},
              "tooltip": {
                "signal": "{'Year': datum.year, 'Total revenue': datum.Revenue + 'M', 'NBA-equivalent Salary': datum.Adjusted + 'M', 'Actual salary': datum.Salary + 'M'}"
              }
            },
            "update": {
              "opacity": {"signal": "hoveryear == null || datum.year == hoveryear ? 1 : 0.15"}
            }
          }
        },
        {
          "type": "rect",
          "name": "barSal",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "xc": {"signal": "scale('x', datum.year) + bandwidth('x') / 2"},
              "width": {"value": 18},
              "y": {"scale": "y", "field": "Salary"},
              "y2": {"scale": "y", "value": 0},
              "fill": {"value": "#6173c3"},
              "tooltip": {
                "signal": "{'Year': datum.year, 'Total revenue': datum.Revenue + 'M', 'NBA-equivalent Salary': datum.Adjusted + 'M', 'Actual salary': datum.Salary + 'M'}"
              }
            },
            "update": {
              "opacity": {"signal": "hoveryear == null || datum.year == hoveryear ? 1 : 0.15"}
            }
          }
        },
      ],
      "config": {}
    };
        vegaEmbed("#WNBA-salary-distribution", spec2, {mode: "vega", actions: false}).then(console.log).catch(console.warn);
});
})();