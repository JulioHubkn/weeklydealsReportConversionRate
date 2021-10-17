import moment from "moment";

const monthNames = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

const stageNames = [
  `Prospect > Qualificação`,
  `Qualificação > Agendamento`,
  `Agendamento > Demo`,
  `Demo > Onb/Trial`,
  `Onb/Trial > Proposta`,
  `Proposta > Fechamento`,
  `Fechamento > Ganho`,
];

const createResponseObj = (conversionRates) => {
  let inboundConversionRates = conversionRates.inboundConversionRate;
  let outboundConversionRates = conversionRates.outboundConversionRate;
  let accInboundConversionRates = conversionRates.accInboundConversionRate;
  let accOutboundConversionRates = conversionRates.accOutboundConversionRate;
  let months = [];

  for (let i = 0; i <= moment().get("month"); i++) {
    months.push(monthNames[i]);
  }
  months.push("Acumulado");
  let responseObj = {
    inbound: { general: [] },
    outbound: { general: [] },
    months: months,
  };
  for (let stageConversion = 0; stageConversion < 7; stageConversion++) {
    let inboundConversionNumbers = {
      rates: [],
      stageName: stageNames[stageConversion],
      acc: inboundConversionRates[moment().get("month")][stageConversion],
    };
    let outboundConversionNumbers = {
      rates: [],
      stageName: stageNames[stageConversion],
    };
    for (let i = 0; i <= moment().get("month"); i++) {
      inboundConversionNumbers.rates.push({
        cv: inboundConversionRates[i][stageConversion],
      });
      outboundConversionNumbers.rates.push({
        cv: outboundConversionRates[i][stageConversion],
      });
    }

    inboundConversionNumbers.rates.push({
      cv: accInboundConversionRates[stageConversion],
    });
    outboundConversionNumbers.rates.push({
      cv: accOutboundConversionRates[stageConversion],
    });

    responseObj.inbound.general.push(inboundConversionNumbers);
    responseObj.outbound.general.push(outboundConversionNumbers);
  }

  return responseObj;
};

export default createResponseObj;
