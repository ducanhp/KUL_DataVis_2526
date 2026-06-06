/* Chart 5 — interactive salary by team (#team-salary-chart) */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const TS_DATA = {"LV":[{"name":"Jewell Loyd","salary":249032,"adj":547870},{"name":"A'ja Wilson","salary":200000,"adj":440000},{"name":"Chelsea Gray","salary":196267,"adj":431787},{"name":"Jackie Young","salary":169950,"adj":373890},{"name":"Kiah Stokes","salary":103000,"adj":226600},{"name":"Megan Gustafson","salary":96820,"adj":213004},{"name":"NaLyssa Smith","salary":91981,"adj":202358},{"name":"Dana Evans","salary":89000,"adj":195800},{"name":"Kierstan Bell","salary":84543,"adj":185995},{"name":"Cheyenne Parker-Tyus","salary":78831,"adj":173428},{"name":"Aaliyah Nye","salary":69267,"adj":152387}],"DAL":[{"name":"Arike Ogunbowale","salary":249032,"adj":547870},{"name":"Myisha Hines-Allen","salary":203000,"adj":446600},{"name":"Tyasha Harris","salary":100013,"adj":220029},{"name":"Maddy Siegrist","salary":83371,"adj":183416},{"name":"Diamond Miller","salary":83371,"adj":183416},{"name":"Paige Bueckers","salary":78831,"adj":173428},{"name":"Aziaha James","salary":72455,"adj":159401},{"name":"JJ Quinerly","salary":66079,"adj":145374},{"name":"Luisa Geiselsöder","salary":66079,"adj":145374},{"name":"Li Yueru","salary":66079,"adj":145374},{"name":"Haley Jones","salary":36094,"adj":79407},{"name":"Grace Berger","salary":17214,"adj":37871},{"name":"Amy Okonkwo","salary":2915,"adj":6413},{"name":"Ajae Petty","salary":1250,"adj":2750},{"name":"Christyn Williams","salary":833,"adj":1833}],"MIN":[{"name":"Napheesa Collier","salary":214284,"adj":471425},{"name":"Kayla McBride","salary":205000,"adj":451000},{"name":"DiJonai Carrington","salary":200000,"adj":440000},{"name":"Courtney Williams","salary":180000,"adj":396000},{"name":"Alanna Smith","salary":150000,"adj":330000},{"name":"Natisha Hiedeman","salary":135000,"adj":297000},{"name":"Bridget Carleton","salary":125000,"adj":275000},{"name":"Jessica Shepard","salary":78831,"adj":173428},{"name":"Anastasiia Olairi Kosu","salary":69267,"adj":152387},{"name":"Maria Kliundikova","salary":54418,"adj":119720},{"name":"Jaylyn Sherrod","salary":18880,"adj":41536},{"name":"Camryn Taylor","salary":7949,"adj":17488}],"PHX":[{"name":"Kahleah Copper","salary":248134,"adj":545895},{"name":"Satou Sabally","salary":215000,"adj":473000},{"name":"Alyssa Thomas","salary":215000,"adj":473000},{"name":"Kalani Brown","salary":120000,"adj":264000},{"name":"Sami Whitcomb","salary":125000,"adj":275000},{"name":"Natasha Mack","salary":116079,"adj":255374},{"name":"Kitija Laksa","salary":80000,"adj":176000},{"name":"Monique Akoa Makani","salary":66079,"adj":145374},{"name":"Lexi Held","salary":66079,"adj":145374},{"name":"Kathryn Westbeld","salary":66079,"adj":145374},{"name":"DeWanna Bonner","salary":63721,"adj":140186},{"name":"Kiana Williams","salary":12772,"adj":28098}],"ATL":[{"name":"Brittney Griner","salary":214466,"adj":471825},{"name":"Brionna Jones","salary":214466,"adj":471825},{"name":"Jordin Canada","salary":190000,"adj":418000},{"name":"Allisha Gray","salary":190000,"adj":418000},{"name":"Nia Coffey","salary":150000,"adj":330000},{"name":"Shatori Walker-Kimbrough","salary":150000,"adj":330000},{"name":"Rhyne Howard","salary":91981,"adj":202358},{"name":"Naz Hillmon","salary":80823,"adj":177811},{"name":"Te-Hina Paopao","salary":69267,"adj":152387},{"name":"Maya Caldwell","salary":66079,"adj":145374},{"name":"Taylor Thierry","salary":66079,"adj":145374},{"name":"Sika Koné","salary":15548,"adj":34206}],"NY":[{"name":"Breanna Stewart","salary":222400,"adj":489280},{"name":"Sabrina Ionescu","salary":222060,"adj":488532},{"name":"Jonquel Jones","salary":209000,"adj":459800},{"name":"Natasha Cloud","salary":200000,"adj":440000},{"name":"Nyara Sabally","salary":79999,"adj":175998},{"name":"Kennedy Burke","salary":78831,"adj":173428},{"name":"Isabelle Harrison","salary":78831,"adj":173428},{"name":"Emma Meesseman","salary":75694,"adj":166527},{"name":"Leonie Fiebich","salary":68595,"adj":150909},{"name":"Rebekah Gardner","salary":66079,"adj":145374},{"name":"Marine Johannès","salary":66079,"adj":145374},{"name":"Stephanie Talbot","salary":35110,"adj":77242}],"IND":[{"name":"Kelsey Mitchell","salary":269244,"adj":592337},{"name":"Natasha Howard","salary":214466,"adj":471825},{"name":"Sophie Cunningham","salary":100000,"adj":220000},{"name":"Damiris Dantas","salary":100000,"adj":220000},{"name":"Sydney Colson","salary":90000,"adj":198000},{"name":"Lexie Hull","salary":88261,"adj":194174},{"name":"Brianna Turner","salary":85000,"adj":187000},{"name":"Aliyah Boston","salary":83371,"adj":183416},{"name":"Caitlin Clark","salary":78066,"adj":171745},{"name":"Makayla Timpson","salary":69267,"adj":152387},{"name":"Aari McDonald","salary":52333,"adj":115133},{"name":"Chloe Bibby","salary":23322,"adj":51308},{"name":"Odyssey Sims","salary":7949,"adj":17488},{"name":"Bree Hall","salary":4442,"adj":9772},{"name":"Aerial Powers","salary":3975,"adj":8745},{"name":"Shey Peddy","salary":1987,"adj":4371}],"LA":[{"name":"Dearica Hamby","salary":202000,"adj":444400},{"name":"Kelsey Plum","salary":202000,"adj":444400},{"name":"Azurá Stevens","salary":195000,"adj":429000},{"name":"Rae Burrell","salary":137500,"adj":302500},{"name":"Emma Cannon","salary":116331,"adj":255928},{"name":"Julie Allemand","salary":85000,"adj":187000},{"name":"Cameron Brink","salary":78066,"adj":171745},{"name":"Rickea Jackson","salary":78066,"adj":171745},{"name":"Sarah Ashlee Barker","salary":72455,"adj":159401},{"name":"Sania Feagin","salary":69267,"adj":152387},{"name":"Julie Vanloo","salary":66079,"adj":145374},{"name":"Alissa Pili","salary":10550,"adj":23210}],"CHI":[{"name":"Ariel Atkins","salary":223000,"adj":490600},{"name":"Courtney Vandersloot","salary":185000,"adj":407000},{"name":"Rebecca Allen","salary":160000,"adj":352000},{"name":"Kia Nurse","salary":145000,"adj":319000},{"name":"Michaela Onyenwere","salary":125000,"adj":275000},{"name":"Elizabeth Williams","salary":100000,"adj":220000},{"name":"Rachel Banham","salary":95000,"adj":209000},{"name":"Kamilla Cardoso","salary":78066,"adj":171745},{"name":"Angel Reese","salary":74909,"adj":164800},{"name":"Hailey Van Lith","salary":72455,"adj":159401},{"name":"Maddy Westbeld","salary":69267,"adj":152387},{"name":"Sevgi Uzun","salary":25543,"adj":56195}],"SEA":[{"name":"Gabby Williams","salary":225000,"adj":495000},{"name":"Skylar Diggins","salary":214466,"adj":471825},{"name":"Nneka Ogwumike","salary":195000,"adj":429000},{"name":"Brittney Sykes","salary":195000,"adj":429000},{"name":"Ezi Magbegor","salary":186000,"adj":409200},{"name":"Lexie Brown","salary":96408,"adj":212098},{"name":"Katie Lou Samuelson","salary":90000,"adj":198000},{"name":"Dominique Malonga","salary":78831,"adj":173428},{"name":"Erica Wheeler","salary":78831,"adj":173428},{"name":"Mackenzie Holmes","salary":48865,"adj":107503},{"name":"Tiffany Mitchell","salary":42397,"adj":93273},{"name":"Zia Cooke","salary":13882,"adj":30540}],"CON":[{"name":"Marina Mabrey","salary":210000,"adj":462000},{"name":"Tina Charles","salary":170000,"adj":374000},{"name":"Lindsay Allen","salary":90000,"adj":198000},{"name":"Olivia Nelson-Ododa","salary":80823,"adj":177811},{"name":"Bria Hartley","salary":78831,"adj":173428},{"name":"Aneesah Morrow","salary":75643,"adj":166415},{"name":"Saniya Rivers","salary":75643,"adj":166415},{"name":"Aaliyah Edwards","salary":74909,"adj":164800},{"name":"Leila Lacan","salary":72455,"adj":159401},{"name":"Rayah Marshall","salary":69267,"adj":152387},{"name":"Haley Peters","salary":25173,"adj":55381},{"name":"Mamignan Touré","salary":17769,"adj":39092}],"GS":[{"name":"Tiffany Hayes","salary":200000,"adj":440000},{"name":"Kayla Thornton","salary":132000,"adj":290400},{"name":"Monique Billings","salary":110000,"adj":242000},{"name":"Veronica Burton","salary":103831,"adj":228428},{"name":"Cecilia Zandalasini","salary":100000,"adj":220000},{"name":"Temi Fagbenle","salary":90000,"adj":198000},{"name":"Carla Leite","salary":72455,"adj":159401},{"name":"Kate Martin","salary":68595,"adj":150909},{"name":"Janelle Salaün","salary":66079,"adj":145374},{"name":"Laeticia Amihere","salary":53307,"adj":117275},{"name":"Kaitlyn Chen","salary":49420,"adj":108724},{"name":"Iliana Rupert","salary":32207,"adj":70855},{"name":"Kaila Charles","salary":13911,"adj":30604}],"WAS":[{"name":"Alysha Clark","salary":205908,"adj":452998},{"name":"Stefanie Dolson","salary":170000,"adj":374000},{"name":"Sug Sutton","salary":93831,"adj":206428},{"name":"Shakira Austin","salary":91981,"adj":202358},{"name":"Emily Engstler","salary":81079,"adj":178374},{"name":"Sonia Citron","salary":78831,"adj":173428},{"name":"Kiki Iriafen","salary":78831,"adj":173428},{"name":"Georgia Amoore","salary":75643,"adj":166415},{"name":"Jacy Sheldon","salary":74909,"adj":164800},{"name":"Lucy Olsen","salary":69267,"adj":152387},{"name":"Jade Melbourne","salary":66710,"adj":146762},{"name":"Madison Scott","salary":4442,"adj":9772}]};
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
              x: { field: "adj", type: "quantitative", scale: { domain: [0, 650000] },
                   axis: { orient: "top", title: null, format: "$~s", grid: false, gridColor: "#ededed",
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
              x: { field: "salary", type: "quantitative", scale: { domain: [0, 650000] } },
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
