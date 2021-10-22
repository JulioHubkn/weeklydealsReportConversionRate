import moment from "moment";
const baseUrl = `https://quickchart.io/chart?w=250&h=250&c=`;

const baseObj = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Outbound",
        backgroundColor: "rgb(0, 92, 255)",
        borderColor: "rgb(0, 92, 255)",
        data: [82.22, 88.1, 72.73, 71.68, 67.48, 59.49, 41.94, 69.73],
        fill: false,
      },
      {
        label: "Inbound",
        fill: false,
        backgroundColor: "rgb(54, 192, 235)",
        borderColor: "rgb(54, 192, 170)",
        data: [69.23, 40.34, 33.33, 26.45, 25.2, 21.86, 21.58, 27.44],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Etapa 4: Demonstração > Trial",
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

generateMonthLabels();
