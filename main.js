import fetchDeals from "./fetchDeals.js";
import readJson from "./readDealsJson.js";
import filterDeals from "./filterDeals.js";
import newProspects from "./prospects.js";
import lostAndWon from "./lostAndWon.js";
import checkStages from "./checkStages.js";

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
};

main();
