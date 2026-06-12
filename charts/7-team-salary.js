/* Chart 5 — interactive salary by team (#team-salary-chart) */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const TS_DATA = {"LV":[{"name":"Jewell Loyd","salary":249032,"adj":1319870},{"name":"A'ja Wilson","salary":200000,"adj":1060000},{"name":"Chelsea Gray","salary":196267,"adj":1040215},{"name":"Jackie Young","salary":169950,"adj":900735},{"name":"Kiah Stokes","salary":103000,"adj":545900},{"name":"Megan Gustafson","salary":96820,"adj":513146},{"name":"NaLyssa Smith","salary":91981,"adj":487499},{"name":"Dana Evans","salary":89000,"adj":471700},{"name":"Kierstan Bell","salary":84543,"adj":448078},{"name":"Cheyenne Parker-Tyus","salary":78831,"adj":417804},{"name":"Aaliyah Nye","salary":69267,"adj":367115}],"DAL":[{"name":"Arike Ogunbowale","salary":249032,"adj":1319870},{"name":"Myisha Hines-Allen","salary":203000,"adj":1075900},{"name":"Tyasha Harris","salary":100013,"adj":530069},{"name":"Maddy Siegrist","salary":83371,"adj":441866},{"name":"Diamond Miller","salary":83371,"adj":441866},{"name":"Paige Bueckers","salary":78831,"adj":417804},{"name":"Aziaha James","salary":72455,"adj":384012},{"name":"JJ Quinerly","salary":66079,"adj":350219},{"name":"Luisa Geiselsöder","salary":66079,"adj":350219},{"name":"Li Yueru","salary":66079,"adj":350219},{"name":"Haley Jones","salary":36094,"adj":191298},{"name":"Grace Berger","salary":17214,"adj":91234},{"name":"Amy Okonkwo","salary":2915,"adj":15450},{"name":"Ajae Petty","salary":1250,"adj":6625},{"name":"Christyn Williams","salary":833,"adj":4415}],"MIN":[{"name":"Napheesa Collier","salary":214284,"adj":1135705},{"name":"Kayla McBride","salary":205000,"adj":1086500},{"name":"DiJonai Carrington","salary":200000,"adj":1060000},{"name":"Courtney Williams","salary":180000,"adj":954000},{"name":"Alanna Smith","salary":150000,"adj":795000},{"name":"Natisha Hiedeman","salary":135000,"adj":715500},{"name":"Bridget Carleton","salary":125000,"adj":662500},{"name":"Jessica Shepard","salary":78831,"adj":417804},{"name":"Anastasiia Olairi Kosu","salary":69267,"adj":367115},{"name":"Maria Kliundikova","salary":54418,"adj":288415},{"name":"Jaylyn Sherrod","salary":18880,"adj":100064},{"name":"Camryn Taylor","salary":7949,"adj":42130}],"PHX":[{"name":"Kahleah Copper","salary":248134,"adj":1315110},{"name":"Satou Sabally","salary":215000,"adj":1139500},{"name":"Alyssa Thomas","salary":215000,"adj":1139500},{"name":"Kalani Brown","salary":120000,"adj":636000},{"name":"Sami Whitcomb","salary":125000,"adj":662500},{"name":"Natasha Mack","salary":116079,"adj":615219},{"name":"Kitija Laksa","salary":80000,"adj":424000},{"name":"Monique Akoa Makani","salary":66079,"adj":350219},{"name":"Lexi Held","salary":66079,"adj":350219},{"name":"Kathryn Westbeld","salary":66079,"adj":350219},{"name":"DeWanna Bonner","salary":63721,"adj":337721},{"name":"Kiana Williams","salary":12772,"adj":67692}],"ATL":[{"name":"Brittney Griner","salary":214466,"adj":1136670},{"name":"Brionna Jones","salary":214466,"adj":1136670},{"name":"Jordin Canada","salary":190000,"adj":1007000},{"name":"Allisha Gray","salary":190000,"adj":1007000},{"name":"Nia Coffey","salary":150000,"adj":795000},{"name":"Shatori Walker-Kimbrough","salary":150000,"adj":795000},{"name":"Rhyne Howard","salary":91981,"adj":487499},{"name":"Naz Hillmon","salary":80823,"adj":428362},{"name":"Te-Hina Paopao","salary":69267,"adj":367115},{"name":"Maya Caldwell","salary":66079,"adj":350219},{"name":"Taylor Thierry","salary":66079,"adj":350219},{"name":"Sika Koné","salary":15548,"adj":82404}],"NY":[{"name":"Breanna Stewart","salary":222400,"adj":1178720},{"name":"Sabrina Ionescu","salary":222060,"adj":1176918},{"name":"Jonquel Jones","salary":209000,"adj":1107700},{"name":"Natasha Cloud","salary":200000,"adj":1060000},{"name":"Nyara Sabally","salary":79999,"adj":423995},{"name":"Kennedy Burke","salary":78831,"adj":417804},{"name":"Isabelle Harrison","salary":78831,"adj":417804},{"name":"Emma Meesseman","salary":75694,"adj":401178},{"name":"Leonie Fiebich","salary":68595,"adj":363554},{"name":"Rebekah Gardner","salary":66079,"adj":350219},{"name":"Marine Johannès","salary":66079,"adj":350219},{"name":"Stephanie Talbot","salary":35110,"adj":186083}],"IND":[{"name":"Kelsey Mitchell","salary":269244,"adj":1426993},{"name":"Natasha Howard","salary":214466,"adj":1136670},{"name":"Sophie Cunningham","salary":100000,"adj":530000},{"name":"Damiris Dantas","salary":100000,"adj":530000},{"name":"Sydney Colson","salary":90000,"adj":477000},{"name":"Lexie Hull","salary":88261,"adj":467783},{"name":"Brianna Turner","salary":85000,"adj":450500},{"name":"Aliyah Boston","salary":83371,"adj":441866},{"name":"Caitlin Clark","salary":78066,"adj":413750},{"name":"Makayla Timpson","salary":69267,"adj":367115},{"name":"Aari McDonald","salary":52333,"adj":277365},{"name":"Chloe Bibby","salary":23322,"adj":123607},{"name":"Odyssey Sims","salary":7949,"adj":42130},{"name":"Bree Hall","salary":4442,"adj":23543},{"name":"Aerial Powers","salary":3975,"adj":21068},{"name":"Shey Peddy","salary":1987,"adj":10531}],"LA":[{"name":"Dearica Hamby","salary":202000,"adj":1070600},{"name":"Kelsey Plum","salary":202000,"adj":1070600},{"name":"Azurá Stevens","salary":195000,"adj":1033500},{"name":"Rae Burrell","salary":137500,"adj":728750},{"name":"Emma Cannon","salary":116331,"adj":616554},{"name":"Julie Allemand","salary":85000,"adj":450500},{"name":"Cameron Brink","salary":78066,"adj":413750},{"name":"Rickea Jackson","salary":78066,"adj":413750},{"name":"Sarah Ashlee Barker","salary":72455,"adj":384012},{"name":"Sania Feagin","salary":69267,"adj":367115},{"name":"Julie Vanloo","salary":66079,"adj":350219},{"name":"Alissa Pili","salary":10550,"adj":55915}],"CHI":[{"name":"Ariel Atkins","salary":223000,"adj":1181900},{"name":"Courtney Vandersloot","salary":185000,"adj":980500},{"name":"Rebecca Allen","salary":160000,"adj":848000},{"name":"Kia Nurse","salary":145000,"adj":768500},{"name":"Michaela Onyenwere","salary":125000,"adj":662500},{"name":"Elizabeth Williams","salary":100000,"adj":530000},{"name":"Rachel Banham","salary":95000,"adj":503500},{"name":"Kamilla Cardoso","salary":78066,"adj":413750},{"name":"Angel Reese","salary":74909,"adj":397018},{"name":"Hailey Van Lith","salary":72455,"adj":384012},{"name":"Maddy Westbeld","salary":69267,"adj":367115},{"name":"Sevgi Uzun","salary":25543,"adj":135378}],"SEA":[{"name":"Gabby Williams","salary":225000,"adj":1192500},{"name":"Skylar Diggins","salary":214466,"adj":1136670},{"name":"Nneka Ogwumike","salary":195000,"adj":1033500},{"name":"Brittney Sykes","salary":195000,"adj":1033500},{"name":"Ezi Magbegor","salary":186000,"adj":985800},{"name":"Lexie Brown","salary":96408,"adj":510962},{"name":"Katie Lou Samuelson","salary":90000,"adj":477000},{"name":"Dominique Malonga","salary":78831,"adj":417804},{"name":"Erica Wheeler","salary":78831,"adj":417804},{"name":"Mackenzie Holmes","salary":48865,"adj":258985},{"name":"Tiffany Mitchell","salary":42397,"adj":224704},{"name":"Zia Cooke","salary":13882,"adj":73575}],"CON":[{"name":"Marina Mabrey","salary":210000,"adj":1113000},{"name":"Tina Charles","salary":170000,"adj":901000},{"name":"Lindsay Allen","salary":90000,"adj":477000},{"name":"Olivia Nelson-Ododa","salary":80823,"adj":428362},{"name":"Bria Hartley","salary":78831,"adj":417804},{"name":"Aneesah Morrow","salary":75643,"adj":400908},{"name":"Saniya Rivers","salary":75643,"adj":400908},{"name":"Aaliyah Edwards","salary":74909,"adj":397018},{"name":"Leila Lacan","salary":72455,"adj":384012},{"name":"Rayah Marshall","salary":69267,"adj":367115},{"name":"Haley Peters","salary":25173,"adj":133417},{"name":"Mamignan Touré","salary":17769,"adj":94176}],"GS":[{"name":"Tiffany Hayes","salary":200000,"adj":1060000},{"name":"Kayla Thornton","salary":132000,"adj":699600},{"name":"Monique Billings","salary":110000,"adj":583000},{"name":"Veronica Burton","salary":103831,"adj":550304},{"name":"Cecilia Zandalasini","salary":100000,"adj":530000},{"name":"Temi Fagbenle","salary":90000,"adj":477000},{"name":"Carla Leite","salary":72455,"adj":384012},{"name":"Kate Martin","salary":68595,"adj":363554},{"name":"Janelle Salaün","salary":66079,"adj":350219},{"name":"Laeticia Amihere","salary":53307,"adj":282527},{"name":"Kaitlyn Chen","salary":49420,"adj":261926},{"name":"Iliana Rupert","salary":32207,"adj":170697},{"name":"Kaila Charles","salary":13911,"adj":73728}],"WAS":[{"name":"Alysha Clark","salary":205908,"adj":1091312},{"name":"Stefanie Dolson","salary":170000,"adj":901000},{"name":"Sug Sutton","salary":93831,"adj":497304},{"name":"Shakira Austin","salary":91981,"adj":487499},{"name":"Emily Engstler","salary":81079,"adj":429719},{"name":"Sonia Citron","salary":78831,"adj":417804},{"name":"Kiki Iriafen","salary":78831,"adj":417804},{"name":"Georgia Amoore","salary":75643,"adj":400908},{"name":"Jacy Sheldon","salary":74909,"adj":397018},{"name":"Lucy Olsen","salary":69267,"adj":367115},{"name":"Jade Melbourne","salary":66710,"adj":353563},{"name":"Madison Scott","salary":4442,"adj":23543}]};
    const TS_TEAMS = {LV:"Las Vegas Aces",DAL:"Dallas Wings",MIN:"Minnesota Lynx",PHX:"Phoenix Mercury",ATL:"Atlanta Dream",NY:"New York Liberty",IND:"Indiana Fever",LA:"Los Angeles Sparks",CHI:"Chicago Sky",SEA:"Seattle Storm",CON:"Connecticut Sun",GS:"Golden State Valkyries",WAS:"Washington Mystics"};
    const TS_ORDER = ["LV","DAL","MIN","PHX","ATL","NY","IND","LA","CHI","SEA","CON","GS","WAS"];
    const TS_LIGHT = "#b6bbf0", TS_DARK = "#494e9e", TS_MUTED = "#6a6a6a", TS_INK = "#111111";

    function tsSpec(abbr){
      const rows = TS_DATA[abbr].slice().sort((a,b)=>b.adj-a.adj);
      const names = rows.map(r=>r.name);
      return {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        background: "transparent",
        data: { values: rows },
        width: 520,
        height: rows.length * 30,
        autosize: { type: "none" },
        padding: { left: 180, top: 25, right: 20, bottom: 0 },
        encoding: {
          y: { field: "name", type: "nominal", sort: names,
               axis: { title: null, labelFontSize: 13, labelColor: TS_INK,
                       labelFont: "Helvetica", domain: false, ticks: false, labelPadding: 8, labelLimit: 195 } }
        },
        layer: [
          { mark: { type: "bar", color: "#a4b5ff", height: { band: 0.78 } },
            params: [{ name: "hover", select: { type: "point", fields: ["name"], on: "pointerover", clear: "pointerout" } }],
            encoding: {
              x: { field: "adj", type: "quantitative", scale: { domain: [0, 1500000] },
                   axis: { orient: "top", title: null, labelExpr: "datum.value === 0 ? '$0k' : datum.value >= 1000000 ? '$' + datum.value/1000000 + 'M' : '$' + datum.value/1000 + 'k'", values: [0, 200000, 400000, 600000, 800000, 1000000, 1200000, 1400000], grid: false, gridColor: "#ededed",
                           domain: false, ticks: false, labelFontSize: 12, labelColor: TS_MUTED, labelFont: "Helvetica" } },
              opacity: { condition: { param: "hover", value: 1 }, value: 0.15 },
              tooltip: [
                { field: "name", title: "Player" },
                { field: "adj", title: "Adjusted Salary", format: "$,.0f" },
                { field: "salary", title: "Current salary", format: "$,.0f" },
              ]
            } },
          { mark: { type: "bar", color: "#6173c3", height: { band: 0.42 } },
            encoding: {
              x: { field: "salary", type: "quantitative", scale: { domain: [0, 1500000] } },
              opacity: { condition: { param: "hover", value: 1 }, value: 0.15 },
              tooltip: [
                { field: "name", title: "Player" },
                { field: "adj", title: "Adjusted Salary", format: "$,.0f" },
                { field: "salary", title: "Current salary", format: "$,.0f" }
              ]
            } }
        ],
        config: { view: { stroke: null }, axis: { labelFontWeight: 400 } }
      };
    }

    function tsRender(abbr){
      vegaEmbed('#team-salary-chart', tsSpec(abbr), { actions: false, renderer: 'svg' })
        .catch(err => {
          document.getElementById('team-salary-chart').innerHTML =
            '<p class="ts-err">Chart failed to draw: ' + err.message + '</p>';
        });
    }

    const tsSel = document.getElementById('teamSelect');
    TS_ORDER.forEach(a => {
      const o = document.createElement('option');
      o.value = a; o.textContent = TS_TEAMS[a];
      tsSel.appendChild(o);
    });
    let tsCurrent = "MIN";
    tsSel.value = tsCurrent;
    tsSel.addEventListener('change', e => tsRender(e.target.value));
    tsRender(tsCurrent);
  });
})();