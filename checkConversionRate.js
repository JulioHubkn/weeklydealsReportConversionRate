import moment from "moment";

const checkStageVolumeByChannel = (deals) => {
  let dealsMatrix = [];
  let monthNumber = +moment().get("month") + 1;
  let months = new Array(monthNumber);
  for (let m = 0; m < monthNumber; m++) {
    let zeroArray = Array(8).fill(0);
    months[m] = zeroArray;
  }
  for (let d = 0; d < monthNumber; d++) {
    for (let item of deals[d].deals) {
      for (let i = 0; i < +item.stage.index; i++) {
        months[d][i]++;
      }
    }
  }
  return months;
};

const checkConversionRateByChannel = async (volumes) => {
  let monthNumber = +moment().get("month") + 1;
  let months = new Array(monthNumber);
  for (let m = 0; m < monthNumber; m++) {
    let zeroArray = Array(7);
    months[m] = zeroArray;
  }
  for (let v = 0; v < volumes.length; v++) {
    let arraySize = volumes[v].length - 1;
    for (let i = 0; i < arraySize; i++) {
      let conversionRate = (100 * volumes[v][i + 1]) / volumes[v][i];
      months[v][i] = conversionRate.toFixed(2);
    }
  }

  return months;
};

const checkAccConversionRateByChannel = async (volumes) => {
  let accConversion = [];
  let volumesLastIndex = volumes.length - 1;
  let arraySize = volumes[volumesLastIndex].length - 1;
  for (let i = 0; i < arraySize; i++) {
    let conversionRate =
      (100 * volumes[volumesLastIndex][i + 1]) / volumes[volumesLastIndex][0];
    accConversion[i] = conversionRate.toFixed(2);
  }

  console.log(accConversion);

  return accConversion;
};

const checkConversionRate = async (inboundDeals, outboundDeals) => {
  let inboundDealsVolume = checkStageVolumeByChannel(inboundDeals);
  let outboundDealsVolume = checkStageVolumeByChannel(outboundDeals);

  let inboundConversionRate = await checkConversionRateByChannel(
    inboundDealsVolume
  );
  let outboundConversionRate = await checkConversionRateByChannel(
    outboundDealsVolume
  );

  let accInboundConversionRate = await checkAccConversionRateByChannel(
    inboundDealsVolume
  );
  let accOutboundConversionRate = await checkAccConversionRateByChannel(
    outboundDealsVolume
  );

  let obj = {
    inboundConversionRate: inboundConversionRate,
    accInboundConversionRate: accInboundConversionRate,
    outboundConversionRate: outboundConversionRate,
    accOutboundConversionRate: accOutboundConversionRate,
  };

  return obj;
};

export default checkConversionRate;
