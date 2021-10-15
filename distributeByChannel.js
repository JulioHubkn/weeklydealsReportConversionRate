import fs from "fs";
import moment from "moment";
import stageObjects from "./pipeline.js";

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
          owners = item.hs_all_owner_ids.value.split(";");
        }
        //Criar hierarquia de pipeline
        //Percorrer todas as opções de canal de aquisição e checar todas que já estiveram presentes no período
        //adicionar ao array com o canal de aquisição
        if (item.canal_de_aquisicao) {
          for (let chan of item.canal_de_aquisicao.versions) {
            let lastChannelTimestamp = 99999999999999999999999999;
            let nextChannel = item.canal_de_aquisicao.versions.find((ca) => {
              return ca.timestamp > chan.timestamp;
            });

            if (nextChannel) {
              lastChannelTimestamp = nextChannel.timestamp;
            }
            let lostStageTimestamp = 0;
            let afterLostStage = true;
            do {
              if (
                +chan.timestamp <= monthEndTimestamp &&
                +chan.timestamp >= firstDayOfTheYear
              ) {
                let stages = item.dealstage.versions.filter((ds) => {
                  return (
                    ds.timestamp <= monthEndTimestamp &&
                    ds.timestamp >= firstDayOfTheYear &&
                    ds.timestamp >= chan.timestamp &&
                    ds.timestamp < lastChannelTimestamp &&
                    ds.timestamp > lostStageTimestamp
                  );
                });

                // let stagesOrders = [];
                let maxStage = {
                  index: -1,
                  name: ``,
                };

                let lost = false;
                let lostTimestamp = 0;
                for (let s of stages) {
                  let stageOrder = stageObjects(+s.value);
                  if (stageOrder.index < 0) {
                    lost = true;
                    lostTimestamp = s.timestamp;
                  } else {
                    maxStage.index < +stageOrder.index
                      ? (maxStage = stageOrder)
                      : null;
                  }
                }

                let existsAfterLostStage = false;
                if (lostTimestamp > 0) {
                  for (let s of stages) {
                    if (+s.timestamp > +lostTimestamp) {
                      existsAfterLostStage = true;
                      lostStageTimestamp = +lostTimestamp;
                    }
                  }
                }

                afterLostStage = existsAfterLostStage;

                if (maxStage.index === -1) {
                  maxStage = {};
                }

                let dealChannelObj = {
                  channel: chan.value,
                  stage: maxStage,
                  owners: owners,
                  lost: lost,
                };
                deals.push(dealChannelObj);
              } else {
                afterLostStage = false;
              }
            } while (afterLostStage);
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

    // console.log(JSON.stringify(object));
    monthsObjects.push(object);
  }
  return monthsObjects;
};

const distributeByChannel = async (everyDealJson) => {
  let allDealsByMonth = await distributeByMonth(everyDealJson);
  for (let i of allDealsByMonth) {
    let inbound = i.deals.filter((item) => {
      return item.channel === "Inbound";
    });

    let outbound = i.deals.filter((item) => {
      return item.channel === "Outbound";
    });
    console.log(`Inbound deals > ${inbound.length}`);
    console.log(`Outbound deals > ${outbound.length}`);
    console.log(
      `-----------------------------------------------------------------------`
    );
  }
};

export default distributeByChannel;
