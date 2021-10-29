const fs = require("fs");

const readJson = async () => {
  let allDeals = await fs.readFileSync("./allDeals2021.json");
  allDeals = await JSON.parse(allDeals);
  console.log(`Deals retornados > ${allDeals.length} linhas`);
  return allDeals;
};

module.exports = { readJson };
