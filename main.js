import distributeByChannel from "./distributeByChannel.js";
import fetchDeals from "./fetchDeals.js";
import checkConversionRate from "./checkConversionRate.js";
import readJson from "./readDealsJson.js";
import createResponseObj from "./createResponseObj.js";

const apiKey = `fc7f5f74-80db-4e99-b3ce-5a4444851478`;

const main = async () => {
  //   await fetchDeals(apiKey);
  const everyDealJson = await readJson();
  const dealsByMonthAndChannel = await distributeByChannel(everyDealJson);
  const checkConversionRateByMonthAndChannel = await checkConversionRate(
    dealsByMonthAndChannel.inboundDeals,
    dealsByMonthAndChannel.outboundDeals
  );
  console.log(checkConversionRateByMonthAndChannel);
  const responseObj = createResponseObj(checkConversionRateByMonthAndChannel);
  console.log(JSON.stringify(responseObj));
};

main();
