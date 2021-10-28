import moment from "moment";
const baseUrl = `https://quickchart.io/chart?w=250&h=250&c=`;

const baseObj = {
  type: `line`,
  data: {
    labels: [`January`, `February`, `March`, `April`, `May`, `June`, `July`],
    datasets: [
      {
        label: `Outbound`,
        backgroundColor: `rgb(0, 92, 255)`,
        borderColor: `rgb(0, 92, 255)`,
        data: [82.22, 88.1, 72.73, 71.68, 67.48, 59.49, 41.94, 69.73],
        fill: false,
      },
      {
        label: `Inbound`,
        fill: false,
        backgroundColor: `rgb(54, 192, 235)`,
        borderColor: `rgb(54, 192, 170)`,
        data: [69.23, 40.34, 33.33, 26.45, 25.2, 21.86, 21.58, 27.44],
      },
      {
        label: "",
        backgroundColor: "white",
        borderColor: "white",
        data: [0, 100],
        showLine: false,
        pointRadius: 0,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: `Etapa 4: Demonstração > Trial`,
    },
  },
};
const generateMonthLabels = () => {
  let month = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  let monthNumber = moment().get("month") + 1;
  console.log(month.slice(0, monthNumber));
  return month.slice(0, monthNumber + 1);
};

const generateCharts = (response) => {
  let months = generateMonthLabels();
  let charts = [];
  let inboundData = [];
  let outboundData = [];

  response.inbound.general.stages.map((item) => {
    let data = [];
    item.rates.map((i) => {
      data.push(i.cv);
    });
    inboundData.push(data.slice(0, data.length - 1));
  });

  response.outbound.general.stages.map((item) => {
    let data = [];
    item.rates.map((i) => {
      data.push(i.cv);
    });
    outboundData.push(data.slice(0, data.length - 1));
  });

  for (let i = 0; i < 7; i++) {
    let chartObj = baseObj;
    let text = `Etapa ${i + 1}: ${
      response.inbound.general.stages[i].stageName
    }`;
    chartObj.data.datasets[0].data = outboundData[i];
    chartObj.data.datasets[1].data = inboundData[i];
    chartObj.options.title.text = text;

    console.log(outboundData);

    let chartUrl = baseUrl + JSON.stringify(chartObj);
    // console.log(chartUrl);
    charts.push(chartUrl.replace(/\"/g, "'"));
  }

  response.charts = charts;
  return response;
};

export default generateCharts;
