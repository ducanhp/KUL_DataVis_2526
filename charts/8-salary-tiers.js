/* Chart 8 — Normalized Pay Ladder (#tier-compare-chart) */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const spec = {
      "$schema": "https://vega.github.io/schema/vega/v6.json",
      "width": 640, "height": 410,
      "background": "transparent",
      "autosize": {"type": "none"},
      "padding": {"left": 52, "top": 30, "right": 24, "bottom": 56},

      "signals": [
        {
          "name": "hovered", "value": null,
          "on": [
            {"events": "@nbaTreadHover:mouseover,@wnbaTreadHover:mouseover",
             "update": "{league: datum.league, tier: datum.tier}"},
            {"events": "@nbaTreadHover:mouseout,@wnbaTreadHover:mouseout",
             "update": "null"}
          ]
        }
      ],

      "data": [
        {
          "name": "nbaSteps",
          "values": [
            {"x0":0,  "x1":4,  "pct":3.56,  "tier":"Rookie scale", "league":"NBA", "note":"Fixed by draft slot, yrs 1–4"},
            {"x0":4,  "x1":7,  "pct":25.00, "tier":"Max (0–6 yr)", "league":"NBA", "note":"25% of cap, up to 6 yrs service"},
            {"x0":7,  "x1":10, "pct":30.00, "tier":"Max (7–9 yr)", "league":"NBA", "note":"30% of cap, 7–9 yrs service"},
            {"x0":10, "x1":12, "pct":35.00, "tier":"Supermax",      "league":"NBA", "note":"35% of cap, 10+ yrs or DVPE"}
          ]
        },
        {
          "name": "wnbaSteps",
          "values": [
            {"x0":0, "x1":4,  "pct":5.02,  "tier":"Rookie scale", "league":"WNBA", "note":"Fixed by draft slot, yrs 1–4"},
            {"x0":4, "x1":5,  "pct":5.23,  "tier":"Veteran min",  "league":"WNBA", "note":"After rookie deal expires"},
            {"x0":5, "x1":6,  "pct":9.95,  "tier":"Mid-tier",      "league":"WNBA", "note":"Negotiated, market-dependent"},
            {"x0":6, "x1":7,  "pct":14.21, "tier":"Standard max", "league":"WNBA", "note":"Elite veterans only"},
            {"x0":7, "x1":12, "pct":16.54, "tier":"Supermax",      "league":"WNBA", "note":"5–6 yrs same team / Core tag"}
          ]
        },
        {
          "name": "nbaRisers",
          "values": [
            {"x":7,  "y0":25.00, "y1":30.00},
            {"x":10, "y0":30.00, "y1":35.00}
          ]
        },
        {
          "name": "wnbaRisers",
          "values": [
            {"x":4, "y0":5.02,  "y1":5.23 },
            {"x":5, "y0":5.23,  "y1":9.95 },
            {"x":6, "y0":9.95,  "y1":14.21},
            {"x":7, "y0":14.21, "y1":16.54}
          ]
        },
        {
          "name": "roseRule",
          "values": [{"x":4, "y0":3.56, "y1":25.00}]
        }
      ],

      "scales": [
        {"name":"x","type":"linear","domain":[0,12],"range":"width","zero":true,"nice":false},
        {"name":"y","type":"linear","domain":[0,38],"range":"height","zero":true,"nice":false}
      ],

      "axes": [
        {
          "orient":"bottom","scale":"x",
          "ticks":false,
          "domain":true,"domainColor":"#666666","grid":false,
          "labelFont":"Helvetica","labelFontSize":12,"labelColor":"#666","labelPadding":8,
          "values":[0,2,4,6,8,10,12],
          "title":"YEARS OF SERVICE IN THE LEAGUE",
          "titleFont":"Helvetica","titleFontSize":14,"titleColor":"#333","titlePadding":18
        },
        {
          "orient":"left","scale":"y",
          "ticks":false,"domain":false,"grid":false,"gridColor":"#eeeeee","gridWidth":1,
          "labelFont":"Helvetica","labelAlign":"left","labelPadding":52,
          "labelFontSize":12,"labelColor":"#666",
          "values":[0,5,10,15,20,25,30,35],
          "encode":{"labels":{"update":{"text":{"signal":"datum.value+'%'"},"align":{"value":"left"},"fill":{"value":"#666"},"font":{"value":"Helvetica"},"fontSize":{"value":12}}}},
          "title":"MAXIMUM PAY AS A SHARE OF THE LEAGUE SALARY CAP",
          "titleAlign":"left","titleAngle":0,"titleX":-52,"titleY":-2,
          "titleFontSize":14,"titleFont":"Helvetica","titleColor":"#333"
        }
      ],

      "marks": [
        {
          "description": "NBA area fill — dims on hover",
          "type": "rect",
          "from": {"data": "nbaSteps"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x0"},
              "x2": {"scale":"x","field":"x1"},
              "y":  {"scale":"y","field":"pct"},
              "y2": {"scale":"y","value":0},
              "fill": {"value":"#c0c0c0"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.04 : 0.16"}
            }
          }
        },
        {
          "description": "WNBA area fill — dims on hover",
          "type": "rect",
          "from": {"data": "wnbaSteps"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x0"},
              "x2": {"scale":"x","field":"x1"},
              "y":  {"scale":"y","field":"pct"},
              "y2": {"scale":"y","value":0},
              "fill": {"value":"#494e9e"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.04 : 0.14"}
            }
          }
        },
        {
          "description": "NBA tread lines — highlight on hover",
          "type": "rect",
          "from": {"data": "nbaSteps"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x0"},
              "x2": {"scale":"x","field":"x1"},
              "y":  {"scale":"y","field":"pct","offset":-1.5},
              "height": {"value":3},
              "fill": {"value":"#b0b0b0"},
              "cursor": {"value":"pointer"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered && hovered.league==='NBA' && hovered.tier===datum.tier ? 1 : hovered ? 0.15 : 0.85"}
            }
          }
        },
        {
          "name": "nbaTreadHover",
          "description": "NBA invisible hover target over treads",
          "type": "rect",
          "from": {"data": "nbaSteps"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x0"},
              "x2": {"scale":"x","field":"x1"},
              "y":  {"scale":"y","field":"pct","offset":-14},
              "height": {"value":28},
              "fill": {"value":"transparent"},
              "cursor": {"value":"pointer"},
              "tooltip": {"signal":"{'League':'N.B.A.','Tier':datum.tier,'Share of cap':datum.pct+'%','Note':datum.note}"}
            }
          }
        },
        {
          "description": "WNBA tread lines — highlight on hover",
          "type": "rect",
          "from": {"data": "wnbaSteps"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x0"},
              "x2": {"scale":"x","field":"x1"},
              "y":  {"scale":"y","field":"pct","offset":-1.5},
              "height": {"value":3},
              "fill": {"value":"#494e9e"},
              "cursor": {"value":"pointer"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered && hovered.league==='WNBA' && hovered.tier===datum.tier ? 1 : hovered ? 0.15 : 0.85"}
            }
          }
        },
        {
          "name": "wnbaTreadHover",
          "description": "WNBA invisible hover target over treads",
          "type": "rect",
          "from": {"data": "wnbaSteps"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x0"},
              "x2": {"scale":"x","field":"x1"},
              "y":  {"scale":"y","field":"pct","offset":-14},
              "height": {"value":28},
              "fill": {"value":"transparent"},
              "cursor": {"value":"pointer"},
              "tooltip": {"signal":"{'League':'W.N.B.A.','Tier':datum.tier,'Share of cap':datum.pct+'%','Note':datum.note}"}
            }
          }
        },
        {
          "description": "NBA risers",
          "type": "rule",
          "from": {"data": "nbaRisers"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x"},
              "y":  {"scale":"y","field":"y0"},
              "y2": {"scale":"y","field":"y1"},
              "stroke": {"value":"#c8c8c8"},
              "strokeWidth": {"value":1.5},
              "strokeDash": {"value":[3,3]}
            },
            "update": {
              "strokeOpacity": {"signal":"hovered ? 0.2 : 1"}
            }
          }
        },
        {
          "description": "WNBA risers",
          "type": "rule",
          "from": {"data": "wnbaRisers"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x"},
              "y":  {"scale":"y","field":"y0"},
              "y2": {"scale":"y","field":"y1"},
              "stroke": {"value":"#8b90c8"},
              "strokeWidth": {"value":1.5},
              "strokeDash": {"value":[3,3]}
            },
            "update": {
              "strokeOpacity": {"signal":"hovered ? 0.2 : 1"}
            }
          }
        },
        {
          "description": "N.B.A. supermax label",
          "type": "text",
          "encode": {
            "enter": {
              "x": {"scale":"x","value":11.5},
              "y": {"scale":"y","value":35,"offset":-10},
              "text": {"value":"N.B.A. supermax · 35%"},
              "align": {"value":"right"},
              "baseline": {"value":"bottom"},
              "font": {"value":"Helvetica"},
              "fontSize": {"value":12},
              "fontWeight": {"value":"bold"},
              "fill": {"value":"#888"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.25 : 1"}
            }
          }
        },
        {
          "description": "W.N.B.A. supermax label",
          "type": "text",
          "encode": {
            "enter": {
              "x": {"scale":"x","value":11.5},
              "y": {"scale":"y","value":16.54,"offset":-8},
              "text": {"value":"W.N.B.A. supermax · 16.5%"},
              "align": {"value":"right"},
              "baseline": {"value":"bottom"},
              "font": {"value":"Helvetica"},
              "fontSize": {"value":12},
              "fontWeight": {"value":"bold"},
              "fill": {"value":"#494e9e"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.25 : 1"}
            }
          }
        },
        {
          "description": "N.B.A. rookie label",
          "type": "text",
          "encode": {
            "enter": {
              "x": {"scale":"x","value":2},
              "y": {"scale":"y","value":3.56,"offset":8},
              "text": {"value":"N.B.A. rookie scale · 3.6%"},
              "align": {"value":"center"},
              "baseline": {"value":"top"},
              "font": {"value":"Helvetica"},
              "fontSize": {"value":12},
              "fontWeight": {"value":"bold"},
              "fill": {"value":"#999"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.25 : 1"}
            }
          }
        },
        {
          "description": "W.N.B.A. rookie label",
          "type": "text",
          "encode": {
            "enter": {
              "x": {"scale":"x","value":2},
              "y": {"scale":"y","value":5.02,"offset":-8},
              "text": {"value":"W.N.B.A. rookie scale · 5.0%"},
              "align": {"value":"center"},
              "baseline": {"value":"bottom"},
              "font": {"value":"Helvetica"},
              "fontSize": {"value":12},
              "fontWeight": {"value":"bold"},
              "fill": {"value":"#494e9e"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.25 : 1"}
            }
          }
        },
        {
          "description": "Rose Rule vertical dashed line (year 4 → 25% cap)",
          "type": "rule",
          "from": {"data": "roseRule"},
          "encode": {
            "enter": {
              "x":  {"scale":"x","field":"x"},
              "y":  {"scale":"y","field":"y0"},
              "y2": {"scale":"y","field":"y1"},
              "stroke": {"value":"#888"},
              "strokeWidth": {"value":2},
              "strokeDash": {"value":[5,3]}
            },
            "update": {
              "strokeOpacity": {"signal":"hovered ? 0.2 : 1"}
            }
          }
        },
        {
          "description": "Rose Rule callout",
          "type": "text",
          "encode": {
            "enter": {
              "x": {"scale":"x","value":4,"offset":8},
              "y": {"scale":"y","value":21},
              "text": {"value":"Rose Rule:"},
              "align": {"value":"left"},
              "baseline": {"value":"middle"},
              "font": {"value":"Helvetica"},
              "fontSize": {"value":11},
              "fontWeight": {"value":"bold"},
              "fill": {"value":"#666"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.2 : 1"}
            }
          }
        },
        {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"scale":"x","value":4,"offset":8},
              "y": {"scale":"y","value":21,"offset":15},
              "text": {"value":"perform → skip ahead"},
              "align": {"value":"left"},
              "baseline": {"value":"middle"},
              "font": {"value":"Helvetica"},
              "fontSize": {"value":11},
              "fill": {"value":"#999"}
            },
            "update": {
              "fillOpacity": {"signal":"hovered ? 0.2 : 1"}
            }
          }
        },
      ],
      "config": {"view": {"stroke": null}}
    };

    vegaEmbed('#tier-compare-chart', spec, {mode:'vega', actions:false})
      .catch(console.warn);
  });
})();