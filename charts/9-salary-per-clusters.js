/* Chart 9 — salary vs PER scatter (#salary-per)
   Requires Vega + Vega-Lite + Vega-Embed (already loaded in project_v10.html). */
   (function () {
    function init() {
      const chartEl = document.getElementById('sp-chart');
      if (!chartEl) { console.warn('[salary-per] #sp-chart not found — is the HTML snippet on the page?'); return; }
      if (typeof vegaEmbed === 'undefined') { console.error('[salary-per] vegaEmbed missing — load Vega/Vega-Lite/Vega-Embed in <head>.'); return; }
  
      const DATA = [
    {"name":"Kelsey Mitchell","per":20.0,"salary":269244,"tier":"Supermax"},
    {"name":"Arike Ogunbowale","per":13.3,"salary":249032,"tier":"Standard Max"},
    {"name":"Jewell Loyd","per":13.4,"salary":249032,"tier":"Standard Max"},
    {"name":"Kahleah Copper","per":14.7,"salary":248134,"tier":"Standard Max"},
    {"name":"Gabby Williams","per":15.6,"salary":225000,"tier":"Standard Max"},
    {"name":"Ariel Atkins","per":16.0,"salary":223000,"tier":"Standard Max"},
    {"name":"Breanna Stewart","per":23.7,"salary":222400,"tier":"Standard Max"},
    {"name":"Sabrina Ionescu","per":20.6,"salary":222060,"tier":"Standard Max"},
    {"name":"Satou Sabally","per":19.6,"salary":215000,"tier":"Standard Max"},
    {"name":"Alyssa Thomas","per":25.1,"salary":215000,"tier":"Standard Max"},
    {"name":"Natasha Howard","per":19.1,"salary":214466,"tier":"Standard Max"},
    {"name":"Skylar Diggins","per":18.8,"salary":214466,"tier":"Standard Max"},
    {"name":"Brionna Jones","per":22.4,"salary":214466,"tier":"Standard Max"},
    {"name":"Brittney Griner","per":16.2,"salary":214466,"tier":"Standard Max"},
    {"name":"Napheesa Collier","per":30.2,"salary":214284,"tier":"Mid-tier Veteran"},
    {"name":"Marina Mabrey","per":11.3,"salary":210000,"tier":"Mid-tier Veteran"},
    {"name":"Jonquel Jones","per":20.4,"salary":209000,"tier":"Mid-tier Veteran"},
    {"name":"Alysha Clark","per":7.1,"salary":205908,"tier":"Mid-tier Veteran"},
    {"name":"Kayla McBride","per":16.1,"salary":205000,"tier":"Mid-tier Veteran"},
    {"name":"Myisha Hines-Allen","per":13.5,"salary":203000,"tier":"Mid-tier Veteran"},
    {"name":"Kelsey Plum","per":18.1,"salary":202000,"tier":"Mid-tier Veteran"},
    {"name":"Dearica Hamby","per":23.7,"salary":202000,"tier":"Mid-tier Veteran"},
    {"name":"Teaira McCowan","per":19.6,"salary":201400,"tier":"Mid-tier Veteran"},
    {"name":"Natasha Cloud","per":14.3,"salary":200000,"tier":"Mid-tier Veteran"},
    {"name":"DiJonai Carrington","per":12.9,"salary":200000,"tier":"Mid-tier Veteran"},
    {"name":"A'ja Wilson","per":33.1,"salary":200000,"tier":"Mid-tier Veteran"},
    {"name":"Tiffany Hayes","per":14.1,"salary":200000,"tier":"Mid-tier Veteran"},
    {"name":"Chelsea Gray","per":15.3,"salary":196267,"tier":"Mid-tier Veteran"},
    {"name":"Brittney Sykes","per":13.5,"salary":195000,"tier":"Mid-tier Veteran"},
    {"name":"Azura Stevens","per":20.0,"salary":195000,"tier":"Mid-tier Veteran"},
    {"name":"Nneka Ogwumike","per":22.0,"salary":195000,"tier":"Mid-tier Veteran"},
    {"name":"Jordin Canada","per":16.5,"salary":190000,"tier":"Mid-tier Veteran"},
    {"name":"Allisha Gray","per":19.6,"salary":190000,"tier":"Mid-tier Veteran"},
    {"name":"Ezi Magbegor","per":15.9,"salary":186000,"tier":"Mid-tier Veteran"},
    {"name":"Courtney Vandersloot","per":15.4,"salary":185000,"tier":"Mid-tier Veteran"},
    {"name":"Courtney Williams","per":18.1,"salary":180000,"tier":"Mid-tier Veteran"},
    {"name":"Stefanie Dolson","per":8.5,"salary":170000,"tier":"Mid-tier Veteran"},
    {"name":"Tina Charles","per":17.9,"salary":170000,"tier":"Mid-tier Veteran"},
    {"name":"Jackie Young","per":22.1,"salary":169950,"tier":"Mid-tier Veteran"},
    {"name":"Stephanie Talbot","per":9.1,"salary":160110,"tier":"Mid-tier Veteran"},
    {"name":"Rebecca Allen","per":7.9,"salary":160000,"tier":"Mid-tier Veteran"},
    {"name":"Alanna Smith","per":18.0,"salary":150000,"tier":"Mid-tier Veteran"},
    {"name":"Nia Coffey","per":14.1,"salary":150000,"tier":"Mid-tier Veteran"},
    {"name":"Shatori Walker-Kimbrough","per":7.8,"salary":150000,"tier":"Mid-tier Veteran"},
    {"name":"Moriah Jefferson","per":9.3,"salary":145500,"tier":"Mid-tier Veteran"},
    {"name":"Kia Nurse","per":7.3,"salary":145000,"tier":"Mid-tier Veteran"},
    {"name":"Rae Burrell","per":13.0,"salary":137500,"tier":"Mid-tier Veteran"},
    {"name":"DeWanna Bonner","per":15.2,"salary":135990,"tier":"Veteran Minimum"},
    {"name":"Natisha Hiedeman","per":18.1,"salary":135000,"tier":"Mid-tier Veteran"},
    {"name":"Kayla Thornton","per":15.1,"salary":132000,"tier":"Mid-tier Veteran"},
    {"name":"Kalani Brown","per":18.6,"salary":128750,"tier":"Mid-tier Veteran"},
    {"name":"Bridget Carleton","per":10.0,"salary":125000,"tier":"Mid-tier Veteran"},
    {"name":"Sami Whitcomb","per":11.5,"salary":125000,"tier":"Mid-tier Veteran"},
    {"name":"Michaela Onyenwere","per":8.0,"salary":125000,"tier":"Mid-tier Veteran"},
    {"name":"Karlie Samuelson","per":6.7,"salary":118450,"tier":"Mid-tier Veteran"},
    {"name":"Emma Cannon","per":13.6,"salary":116331,"tier":"Mid-tier Veteran"},
    {"name":"Natasha Mack","per":19.1,"salary":116079,"tier":"Mid-tier Veteran"},
    {"name":"Monique Billings","per":16.7,"salary":110000,"tier":"Mid-tier Veteran"},
    {"name":"Veronica Burton","per":19.0,"salary":103831,"tier":"Mid-tier Veteran"},
    {"name":"Kiah Stokes","per":7.0,"salary":103000,"tier":"Mid-tier Veteran"},
    {"name":"Tyasha Harris","per":13.4,"salary":100013,"tier":"Mid-tier Veteran"},
    {"name":"Damiris Dantas","per":8.6,"salary":100000,"tier":"Mid-tier Veteran"},
    {"name":"Elizabeth Williams","per":17.0,"salary":100000,"tier":"Mid-tier Veteran"},
    {"name":"Sophie Cunningham","per":12.7,"salary":100000,"tier":"Mid-tier Veteran"},
    {"name":"Cecilia Zandalasini","per":15.7,"salary":100000,"tier":"Special / Short-term"},
    {"name":"Megan Gustafson","per":5.7,"salary":96820,"tier":"Mid-tier Veteran"},
    {"name":"Lexie Brown","per":8.5,"salary":96408,"tier":"Mid-tier Veteran"},
    {"name":"Rachel Banham","per":10.6,"salary":95000,"tier":"Mid-tier Veteran"},
    {"name":"Sug Sutton","per":9.8,"salary":93831,"tier":"Mid-tier Veteran"},
    {"name":"Yvonne Anderson","per":1.1,"salary":92774,"tier":"Mid-tier Veteran"},
    {"name":"Shakira Austin","per":18.5,"salary":91981,"tier":"Rookie Scale"},
    {"name":"NaLyssa Smith","per":13.2,"salary":91981,"tier":"Rookie Scale"},
    {"name":"Rhyne Howard","per":18.2,"salary":91981,"tier":"Rookie Scale"},
    {"name":"Lindsay Allen","per":6.6,"salary":90000,"tier":"Mid-tier Veteran"},
    {"name":"Temi Fágbénlé","per":12.8,"salary":90000,"tier":"Mid-tier Veteran"},
    {"name":"Sydney Colson","per":5.9,"salary":90000,"tier":"Mid-tier Veteran"},
    {"name":"Dana Evans","per":11.0,"salary":89000,"tier":"Mid-tier Veteran"},
    {"name":"Lexie Hull","per":10.4,"salary":88261,"tier":"Rookie Scale"},
    {"name":"Julie Allemand","per":11.4,"salary":85000,"tier":"Special / Short-term"},
    {"name":"Brianna Turner","per":7.4,"salary":85000,"tier":"Mid-tier Veteran"},
    {"name":"Jaylyn Sherrod","per":5.4,"salary":84959,"tier":"Rookie Scale"},
    {"name":"Kierstan Bell","per":10.5,"salary":84543,"tier":"Rookie Scale"},
    {"name":"Diamond Miller","per":8.5,"salary":83371,"tier":"Mid-tier Veteran"},
    {"name":"Maddy Siegrist","per":17.2,"salary":83371,"tier":"Rookie Scale"},
    {"name":"Aliyah Boston","per":22.5,"salary":83371,"tier":"Rookie Scale"},
    {"name":"Tiffany Mitchell","per":6.0,"salary":83186,"tier":"Special / Short-term"},
    {"name":"Sika Kone","per":7.1,"salary":82258,"tier":"Rookie Scale"},
    {"name":"Emily Engstler","per":14.5,"salary":81079,"tier":"Mid-tier Veteran"},
    {"name":"Naz Hillmon","per":15.7,"salary":80823,"tier":"Rookie Scale"},
    {"name":"Olivia Nelson-Ododa","per":17.0,"salary":80823,"tier":"Rookie Scale"},
    {"name":"Mercedes Russell","per":9.5,"salary":80672,"tier":"Mid-tier Veteran"},
    {"name":"Kitija Laksa","per":7.6,"salary":80000,"tier":"Mid-tier Veteran"},
    {"name":"Nyara Sabally","per":13.4,"salary":79999,"tier":"Rookie Scale"},
    {"name":"Zia Cooke","per":5.8,"salary":79961,"tier":"Veteran Minimum"},
    {"name":"Erica Wheeler","per":13.3,"salary":78831,"tier":"Veteran Minimum"},
    {"name":"Bria Hartley","per":10.7,"salary":78831,"tier":"Veteran Minimum"},
    {"name":"Kiki Iriafen","per":17.3,"salary":78831,"tier":"Rookie Scale"},
    {"name":"Paige Bueckers","per":21.9,"salary":78831,"tier":"Rookie Scale"},
    {"name":"Sonia Citron","per":16.4,"salary":78831,"tier":"Rookie Scale"},
    {"name":"Kennedy Burke","per":13.9,"salary":78831,"tier":"Veteran Minimum"},
    {"name":"Jessica Shepard","per":20.9,"salary":78831,"tier":"Special / Short-term"},
    {"name":"Isabelle Harrison","per":17.3,"salary":78831,"tier":"Veteran Minimum"},
    {"name":"Cheyenne Parker-Tyus","per":37.6,"salary":78831,"tier":"Veteran Minimum"},
    {"name":"Dominique Malonga","per":20.1,"salary":78831,"tier":"Rookie Scale"},
    {"name":"Kamilla Cardoso","per":19.6,"salary":78066,"tier":"Rookie Scale"},
    {"name":"Rickea Jackson","per":12.5,"salary":78066,"tier":"Rookie Scale"},
    {"name":"Cameron Brink","per":15.2,"salary":78066,"tier":"Rookie Scale"},
    {"name":"Caitlin Clark","per":16.6,"salary":78066,"tier":"Rookie Scale"},
    {"name":"Odyssey Sims","per":12.0,"salary":76482,"tier":"Special / Short-term"},
    {"name":"Emma Meesseman","per":23.6,"salary":75694,"tier":"Veteran Minimum"},
    {"name":"Aneesah Morrow","per":14.9,"salary":75643,"tier":"Rookie Scale"},
    {"name":"Saniya Rivers","per":13.6,"salary":75643,"tier":"Rookie Scale"},
    {"name":"Angel Reese","per":19.6,"salary":74909,"tier":"Rookie Scale"},
    {"name":"Aaliyah Edwards","per":13.0,"salary":74909,"tier":"Rookie Scale"},
    {"name":"Jacy Sheldon","per":11.8,"salary":74909,"tier":"Rookie Scale"},
    {"name":"Sarah Ashlee Barker","per":4.2,"salary":72455,"tier":"Rookie Scale"},
    {"name":"Carla Leite","per":11.6,"salary":72455,"tier":"Rookie Scale"},
    {"name":"Aziaha James","per":12.5,"salary":72455,"tier":"Rookie Scale"},
    {"name":"Leila Lacan","per":15.8,"salary":72455,"tier":"Rookie Scale"},
    {"name":"Hailey Van Lith","per":5.8,"salary":72455,"tier":"Rookie Scale"},
    {"name":"Maddy Westbeld","per":10.3,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Sania Feagin","per":0.6,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Makayla Timpson","per":17.5,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Lucy Olsen","per":10.5,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Te-Hina Paopao","per":13.2,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Rayah Marshall","per":7.2,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Anastasiia Olairi Kosu","per":13.9,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Aaliyah Nye","per":5.8,"salary":69267,"tier":"Rookie Scale"},
    {"name":"Kate Martin","per":9.5,"salary":68595,"tier":"Rookie Scale"},
    {"name":"Leonie Fiebich","per":12.2,"salary":68595,"tier":"Rookie Scale"},
    {"name":"Jade Melbourne","per":7.4,"salary":66710,"tier":"Rookie Scale"},
    {"name":"Li Yueru","per":13.4,"salary":66079,"tier":"Veteran Minimum"},
    {"name":"Luisa Geiselsoder","per":11.8,"salary":66079,"tier":"Rookie Scale"},
    {"name":"Lexi Held","per":10.0,"salary":66079,"tier":"Rookie Scale"},
    {"name":"Taylor Thierry","per":5.5,"salary":66079,"tier":"Rookie Scale"},
    {"name":"Marine Johannes","per":10.8,"salary":66079,"tier":"Veteran Minimum"},
    {"name":"Maya Caldwell","per":12.6,"salary":66079,"tier":"Veteran Minimum"},
    {"name":"Rebekah Gardner","per":12.5,"salary":66079,"tier":"Veteran Minimum"},
    {"name":"Monique Akoa Makani","per":12.3,"salary":66079,"tier":"Special / Short-term"},
    {"name":"Janelle Salaun","per":12.2,"salary":66079,"tier":"Special / Short-term"},
    {"name":"Kathryn Westbeld","per":10.5,"salary":66079,"tier":"Veteran Minimum"},
    {"name":"Julie Vanloo","per":3.7,"salary":66079,"tier":"Rookie Scale"},
    {"name":"JJ Quinerly","per":13.1,"salary":66079,"tier":"Rookie Scale"},
    {"name":"Alissa Pili","per":12.5,"salary":59980,"tier":"Special / Short-term"},
    {"name":"Aari McDonald","per":14.1,"salary":58792,"tier":"Special / Short-term"},
    {"name":"Kaila Charles","per":14.0,"salary":55976,"tier":"Special / Short-term"},
    {"name":"Maria Kliundikova","per":19.6,"salary":54418,"tier":"Special / Short-term"},
    {"name":"Laeticia Amihere","per":18.3,"salary":53307,"tier":"Special / Short-term"},
    {"name":"Kaitlyn Chen","per":4.8,"salary":49420,"tier":"Special / Short-term"},
    {"name":"Mackenzie Holmes","per":13.6,"salary":48865,"tier":"Special / Short-term"},
    {"name":"Haley Jones","per":11.4,"salary":46645,"tier":"Special / Short-term"},
    {"name":"Jaelyn Brown","per":6.5,"salary":42757,"tier":"Special / Short-term"},
    {"name":"Marquesha Davis","per":0.5,"salary":40065,"tier":"Rookie Scale"},
    {"name":"Haley Peters","per":5.0,"salary":39084,"tier":"Special / Short-term"},
    {"name":"Chloe Bibby","per":14.8,"salary":37204,"tier":"Special / Short-term"},
    {"name":"Sevgi Uzun","per":2.9,"salary":36649,"tier":"Special / Short-term"},
    {"name":"Kiana Williams","per":12.1,"salary":33873,"tier":"Special / Short-term"},
    {"name":"Iliana Rupert","per":16.2,"salary":32207,"tier":"Rookie Scale"},
    {"name":"Elizabeth Kitley","per":1.2,"salary":31827,"tier":"Special / Short-term"},
    {"name":"Murjanatu Musa","per":13.4,"salary":31096,"tier":"Special / Short-term"},
    {"name":"Megan McConnell","per":15.8,"salary":31096,"tier":"Special / Short-term"},
    {"name":"Grace Berger","per":6.0,"salary":30541,"tier":"Special / Short-term"},
    {"name":"Mamignan Touré","per":5.2,"salary":29430,"tier":"Special / Short-term"},
    {"name":"Kariata Diaby","per":5.7,"salary":27764,"tier":"Special / Short-term"},
    {"name":"Shey Peddy","per":12.3,"salary":25338,"tier":"Special / Short-term"},
    {"name":"Aerial Powers","per":16.4,"salary":25173,"tier":"Special / Short-term"},
    {"name":"Liatu King","per":8.4,"salary":21657,"tier":"Special / Short-term"},
    {"name":"Bree Hall","per":-15.0,"salary":21101,"tier":"Special / Short-term"},
    {"name":"Camryn Taylor","per":-9.4,"salary":19610,"tier":"Special / Short-term"},
    {"name":"Joyner Holmes","per":-3.7,"salary":17223,"tier":"Special / Short-term"},
    {"name":"Crystal Bradford","per":6.8,"salary":16103,"tier":"Special / Short-term"},
    {"name":"Madison Scott","per":8.5,"salary":16103,"tier":"Special / Short-term"},
    {"name":"Kyara Linskens","per":4.8,"salary":14437,"tier":"Special / Short-term"},
    {"name":"Marième Badiane","per":-18.0,"salary":12216,"tier":"Special / Short-term"},
    {"name":"Robyn Parks","per":1.0,"salary":11106,"tier":"Special / Short-term"},
    {"name":"Amy Okonkwo","per":21.9,"salary":10689,"tier":"Special / Short-term"},
    {"name":"Kamiah Smalls","per":0.0,"salary":7774,"tier":"Special / Short-term"},
    {"name":"Christyn Williams","per":9.0,"salary":7635,"tier":"Special / Short-term"},
    {"name":"Serena Sundell","per":-9.1,"salary":5136,"tier":"Special / Short-term"},
    {"name":"Ajae Petty","per":-0.9,"salary":4165,"tier":"Special / Short-term"},
    {"name":"Alexis Prince","per":-1.4,"salary":3975,"tier":"Special / Short-term"},
    {"name":"Kyra Lambert","per":0.0,"salary":3887,"tier":"Special / Short-term"}
      ];
  
      const TIERS = ["Supermax","Standard Max","Mid-tier Veteran","Veteran Minimum","Rookie Scale","Special / Short-term"];
  
      let view = null;
  
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "background": "transparent",
        "width": 660,
        "height": 480,
        "autosize": {"type": "none"},
        "padding": {"left": 52, "top": 66, "right": 10, "bottom": 48},
        "data": {"values": DATA},
        "params": [{"name": "sel", "value": "__ALL__"}],
        "layer": [
  
          /* 1 ── Underpaid-quadrant shade */
          {
            "data": {"values": [{"x0": 13, "x1": 40, "y0": 0, "y1": 80336}]},
            "mark": {"type": "rect", "fill": "#494e9e", "fillOpacity": 0.04},
            "encoding": {
              "x":  {"field": "x0", "type": "quantitative", "scale": {"domain": [-20, 40]}},
              "x2": {"field": "x1"},
              "y":  {"field": "y0", "type": "quantitative", "scale": {"domain": [0, 300000]}},
              "y2": {"field": "y1"}
            }
          },
  
          /* 2 ── Median salary dashed rule */
          {
            "mark": {"type": "rule", "stroke": "#c8c8c8", "strokeDash": [4, 4], "strokeWidth": 1},
            "encoding": {"y": {"datum": 80336, "type": "quantitative"}}
          },
  
          /* 3 ── Median PER dashed rule */
          {
            "mark": {"type": "rule", "stroke": "#c8c8c8", "strokeDash": [4, 4], "strokeWidth": 1},
            "encoding": {"x": {"datum": 13, "type": "quantitative"}}
          },
  
          /* 4 ── Median PER annotation */
          {
            "mark": {"type": "text", "font": "Helvetica", "fontSize": 10.5, "fill": "#aaa",
                     "align": "left", "dx": 5, "dy": 3, "baseline": "top"},
            "encoding": {"x": {"datum": 13}, "y": {"datum": 295000}, "text": {"value": "Median PER 13"}}
          },
  
          /* 5 ── Median salary annotation */
          {
            "mark": {"type": "text", "font": "Helvetica", "fontSize": 10.5, "fill": "#aaa",
                     "align": "left", "dx": 3, "dy": -5, "baseline": "bottom"},
            "encoding": {"x": {"datum": -19.5}, "y": {"datum": 80336}, "text": {"value": "Median salary $80.336"}}
          },
  
          /* 6 ── UNDERPAID region label */
          {
            "mark": {"type": "text", "font": "Helvetica", "fontSize": 12, "fontWeight": "bold",
                     "fill": "#494e9e", "opacity": 0.45},
            "encoding": {"x": {"datum": 30}, "y": {"datum": 44000}, "text": {"value": "UNDERPAID"}}
          },
  
          /* 7 ── UNDERPAID sub-label */
          {
            "mark": {"type": "text", "font": "Helvetica", "fontSize": 10, "fill": "#6173c3", "opacity": 0.6},
            "encoding": {"x": {"datum": 30}, "y": {"datum": 31000}, "text": {"value": "(High PER, Low Pay)"}}
          },
  
          /* 8 ── Scatter dots */
          {
            "mark": {"type": "point", "filled": true, "size": 90, "stroke": "#fff", "strokeWidth": 0.8},
            "encoding": {
              "x": {
                "field": "per", "type": "quantitative",
                "title": "PLAYER EFFICIENCY RATING (PER)",
                "scale": {"domain": [-20, 40]},
                "axis": {
                  "grid": false, "domain": true, "domainColor": "#666", "ticks": false,
                  "labelFont": "Helvetica", "labelFontSize": 12, "labelColor": "#666", "labelPadding": 8,
                  "titleFont": "Helvetica", "titleFontSize": 14, "titleFontWeight": "bold", "titleColor": "#333", "titlePadding": 10
                }
              },
              "y": {
                "field": "salary", "type": "quantitative",
                "title": "2025 SALARY",
                "scale": {"domain": [0, 300000]},
                "axis": {
                  "grid": false, "domain": false, "ticks": false,
                  "labelFont": "Helvetica", "labelFontSize": 12, "labelColor": "#666", "labelAlign": "left", "labelPadding": 52,
                  "values": [50000, 100000, 150000, 200000, 250000, 300000], "format": "$~s",
                  "titleFont": "Helvetica", "titleFontSize": 14, "titleFontWeight": "bold", "titleColor": "#333",
                  "titleAngle": 0, "titleAlign": "left", "titleBaseline": "bottom", "titleX": -52, "titleY": -30
                }
              },
              "color": {
                "condition": {"test": "sel == '__ALL__' || datum.tier == sel", "value": "#494e9e"},
                "value": "#d8d8d6"
              },
              "opacity": {
                "condition": {"test": "sel == '__ALL__' || datum.tier == sel", "value": 0.8},
                "value": 0.3
              },
              "size": {
                "condition": {"test": "sel != '__ALL__' && datum.tier == sel", "value": 140},
                "value": 90
              },
              "tooltip": [
                {"field": "name",   "title": "Player"},
                {"field": "per",    "title": "PER"},
                {"field": "salary", "title": "2025 salary", "format": "$,.0f"},
                {"field": "tier",   "title": "Tier"}
              ]
            }
          }
  
        ],
        "config": {"view": {"stroke": null}}
      };
  
      const tierSel = document.getElementById("spTier");
      TIERS.forEach(t => {
        const o = document.createElement("option");
        o.value = t; o.textContent = t;
        tierSel.appendChild(o);
      });
      tierSel.addEventListener("change", e => {
        if (view) { view.signal("sel", e.target.value).run(); }
      });
  
      vegaEmbed('#sp-chart', spec, {actions: false, renderer: 'svg'})
        .then(res => { view = res.view; })
        .catch(e => {
          document.getElementById('sp-chart').innerHTML =
            '<p style="color:#b00;font-family:Helvetica">Chart error: ' + e.message + '</p>';
          console.error(e);
        });
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();   // DOM already parsed (script added late) — run now
    }
  })();