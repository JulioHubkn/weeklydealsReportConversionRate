// const { fetchDeals } = require("./fetchDeals.js");
const { readJson } = require("./readDealsJson.js");
const { filterDeals } = require("./filterDeals.js");
const { newProspects } = require("./prospects.js");
const { lostAndWon } = require("./lostAndWon.js");
const { checkStages } = require("./checkStages.js");

const apiKey = `fc7f5f74-80db-4e99-b3ce-5a4444851478`;

const main = async () => {
  // await fetchDeals(apiKey);
  const responseObj = {
    prospectsCount: {},
    lostCount: 0,
    wonCount: 0,
    stagePerformances: [],
  };

  //---------------- Triagem de dados -------------------------------------
  // const everyDealJson = await fetchDeals(apiKey);
  const everyDealJson = await readJson();

  const filteredDeals = await filterDeals(everyDealJson);

  //----------------- Analisando Dados ------------------------------------
  const countProspects = await newProspects(filteredDeals.changed);
  const countLostAndWon = await lostAndWon(filteredDeals.changed);
  const checkStagePerformance = await checkStages(filteredDeals);

  //----------------- Setando variável resposta ---------------------------
  responseObj.lostCount = countLostAndWon.lost;
  responseObj.wonCount = countLostAndWon.won;
  responseObj.prospectsCount = countProspects;
  responseObj.stagePerformances = checkStagePerformance;
  console.log(responseObj);
  return responseObj;
};

main();
