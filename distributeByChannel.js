import { fstat } from "fs";
import moment from "moment";

const distributeByMonth = async (allItems) => {
  let allDeals = allItems;
  let monthsObjects = [];
  let firstDayOfTheYear = moment().startOf("year").startOf("day").valueOf();
  //   for (let i = 1; i <= 12; i++) {
  for (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    let deals = [];
    let monthStartTimestamp = moment(
      new Date(`${i}-01-${moment().get("year")}`)
    ).valueOf();
    let monthEndTimestamp = moment(monthStartTimestamp)
      .endOf("month")
      .endOf("day")
      .valueOf();

    try {
      allDeals.map((item) => {
        let channel = "";
        let owners = [];
        if (item.hs_all_owner_ids) {
          item.hs_all_owner_ids.value.split(";");
        }
        //Criar hierarquia de pipeline
        //Percorrer todas as opções de canal de aquisição e checar todas que já estiveram presentes no período
        //adicionar ao array com o canal de aquisição
        if (item.canal_de_aquisicao) {
          for (let chan of item.canal_de_aquisicao.versions) {
            if (
              +chan.timestamp <= monthEndTimestamp &&
              +chan.timestamp >= firstDayOfTheYear
            ) {
              let dealChannelObj = {
                channel: chan.value,
                stages: item.dealstage.versions.filter((ds) => {
                  return (
                    ds.timestamp <= monthEndTimestamp &&
                    ds.timestamp >= firstDayOfTheYear
                  );
                }),
                owners: owners,
              };
              deals.push(dealChannelObj);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }

    let object = {
      startTimestamp: monthStartTimestamp,
      endTimestamp: monthEndTimestamp,
      monthNumber: i,
      deals: deals,
    };
    console.log(JSON.stringify(object));
    monthsObjects.push(object);
  }
};

const distributeByChannel = async (everyDealJson) => {
  let allDealsByMonth = await distributeByMonth(everyDealJson);
};

export default distributeByChannel;
