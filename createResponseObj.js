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
  //------------------------------------- INBOUND ----------------------------------------
  let inboundConversionRates = conversionRates.inboundConversionRate;
  let accInboundConversionRates = conversionRates.accInboundConversionRate;
  let accQualiDemoInboundConversionRates =
    conversionRates.qualiDemoInboundConversion;
  let accDemoGanhoInboundConversionRates =
    conversionRates.demoGanhoInboundConversion;

  //------------------------------------- OUTBOUND ----------------------------------------
  let outboundConversionRates = conversionRates.outboundConversionRate;
  let accOutboundConversionRates = conversionRates.accOutboundConversionRate;
  let accQualiDemoOutboundConversionRates =
    conversionRates.qualiDemoOutboundConversion;
  let accDemoGanhoOutboundConversionRates =
    conversionRates.demoGanhoOutboundConversion;

  let months = [];

  for (let i = 0; i <= moment().get("month"); i++) {
    months.push(monthNames[i]);
  }
  months.push("Acumulado");
  let responseObj = {
    inbound: { general: { stages: [], qualiDemo: [], demoGanho: [] } },
    outbound: { general: { stages: [], qualiDemo: [], demoGanho: [] } },
    months: months,
  };
  for (let stageConversion = 0; stageConversion < 7; stageConversion++) {
    let inboundConversionNumbers = {
      rates: [],
      stageName: stageNames[stageConversion],
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

    responseObj.inbound.general.stages.push(inboundConversionNumbers);
    responseObj.inbound.general.qualiDemo = accQualiDemoInboundConversionRates;
    responseObj.inbound.general.demoGanho = accDemoGanhoInboundConversionRates;
    responseObj.outbound.general.stages.push(outboundConversionNumbers);
    responseObj.outbound.general.qualiDemo =
      accQualiDemoOutboundConversionRates;
    responseObj.outbound.general.demoGanho =
      accDemoGanhoOutboundConversionRates;
  }

  return responseObj;
};

export default createResponseObj;
