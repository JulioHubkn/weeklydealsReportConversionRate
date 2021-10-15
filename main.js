import distributeByChannel from "./distributeByChannel.js";
import fetchDeals from "./fetchDeals.js";
import readJson from "./readDealsJson.js";

const apiKey = `fc7f5f74-80db-4e99-b3ce-5a4444851478`;

const main = async () => {
  //   await fetchDeals(apiKey);
  const everyDealJson = await readJson();
  await distributeByChannel(everyDealJson);
};

main();
