const moment = require("moment");
const { pipeline } = require("./pipeline");
const filterDeals = async (deals) => {
  const weekStart = moment().subtract(1, "week").startOf("week").valueOf();
  console.log(`Antes > ${deals.length}`);

  //   Lógica que retorna apenas os deals que mudaram de etapa na semana
  let thisWeekChangedDeals = deals.filter((item) => {
    if (item.dealstage) {
      return item.dealstage.timestamp > weekStart;
    }
  });

  thisWeekChangedDeals = thisWeekChangedDeals
    .map((item) => {
      let itemObj = {
        indexes: [],
        weekStartIndex: 0,
        pipelines: [],
      };
      let i = 1;
      let lastIndex = 0;
      item.dealstage.versions.map((stage) => {
        if (stage.timestamp > weekStart) {
          let stageIndex = pipeline(stage.value);
          if (stageIndex !== 0) {
            itemObj.indexes.push(stageIndex.index);
            itemObj.pipelines.push(stageIndex.pipeline);

            lastIndex = stageIndex.index;
            if (lastIndex !== -8) {
              itemObj.weekStartIndex = stageIndex.index;
            }
          }
        } else {
          if (i > 0) {
            let stageIndex = pipeline(stage.value);
            if (stageIndex !== 0 && stageIndex.index !== -8) {
              itemObj.weekStartIndex = stageIndex.index;
              itemObj.indexes.push(stageIndex.index);
              //   itemObj.pipelines.push(stageIndex.pipeline);
            }
            i--;
          }
        }
      });
      if (itemObj.indexes[itemObj.indexes.length - 1] === -8) {
        itemObj.indexes = itemObj.indexes.slice(0, itemObj.indexes.length - 1);
      }
      if (itemObj.indexes.length > 0) {
        if (itemObj.indexes.length === 1 && itemObj.indexes[0] !== 1) {
          itemObj.indexes.push(itemObj.indexes[0] - 1);
          itemObj.weekStartIndex = itemObj.indexes[1];
        }

        return itemObj;
      }
    })
    .filter((item) => {
      return item;
    });

  console.log(`Depois | Apenas Alterados > ${thisWeekChangedDeals.length}`);

  // Lógica que retorna todos os deals abertos no funil
  let thisWeekOpenDeals = deals.filter((item) => {
    if (item.dealstage) {
      let stageIndex = pipeline(item.dealstage.value);
      if (stageIndex !== 0) {
        if (stageIndex.index !== 8 && stageIndex.index !== -8) {
          return item;
        } else {
          if (item.dealstage.timestamp > weekStart) {
            return item;
          }
        }
      }
    }
  });

  thisWeekOpenDeals = thisWeekOpenDeals
    .map((item) => {
      let itemObj = {
        indexes: [],
        startIndex: 0,
        pipelines: [],
      };
      let i = 1;
      item.dealstage.versions.map((stage) => {
        if (stage.timestamp > weekStart) {
          let stageIndex = pipeline(stage.value);
          if (stageIndex !== 0) {
            itemObj.indexes.push(stageIndex.index);
            itemObj.pipelines.push(stageIndex.pipeline);
          }
        } else {
          if (i > 0) {
            let stageIndex = pipeline(stage.value);
            if (stageIndex !== 0) {
              itemObj.indexes.push(stageIndex.index);
              itemObj.pipelines.push(stageIndex.pipeline);
            }
            i--;
          }
        }
      });
      if (itemObj.indexes[itemObj.indexes.length - 1] === -8) {
        itemObj.indexes = itemObj.indexes.slice(0, itemObj.indexes.length - 1);
      }
      if (itemObj.indexes.length > 0) {
        return itemObj;
      }
    })
    .filter((item) => {
      return item;
    });

  console.log(`Depois | Abertos > ${thisWeekOpenDeals.length}`);

  return {
    changed: thisWeekChangedDeals,
    open: thisWeekOpenDeals,
  };
};

module.exports = { filterDeals };
