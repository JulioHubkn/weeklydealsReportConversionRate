const fetch = require("node-fetch");
// const moment = require("moment");

const fetchDeals = async (apiKey) => {
  let offset = "";
  let dealsArray = [];
  let results = {};
  do {
    // let url = `https://api.hubapi.com/deals/v1/deal/recent/modified?hapikey=${apiKey}&properties=dealstage&includePropertyVersions=true&since=1609473600000&limit=250${offset}`;
    let url = `https://api.hubapi.com/deals/v1/deal/paged?hapikey=${apiKey}&propertiesWithHistory=dealstage&properties=canal_de_aquisicao&properties=createdate&properties=hs_all_owner_ids&limit=250${offset}`;
    results = await fetch(url);
    results = await results.json();

    offset = `&offset=${results.offset}`;

    for (let e of results.deals) {
      dealsArray.push({
        dealId: e.dealId,
        canal_de_aquisicao: e.properties.canal_de_aquisicao,
        dealstage: e.properties.dealstage,
        hs_all_owner_ids: e.properties.hs_all_owner_ids,
        createdate: e.properties.createdate,
      });
    }
    // break;
  } while (results.hasMore);
  // writeFileSync("./allDeals2021.json", JSON.stringify(dealsArray));
  return dealsArray;
};

module.exports = { fetchDeals };
