const newProspects = async (deals) => {
  let obj = {
    Search: {
      prospectCount: 0,
    },
    Tracking: {
      prospectCount: 0,
    },
    BigData: {
      prospectCount: 0,
    },
    Total: {
      prospectCount: 0,
    },
  };
  for (let item of deals) {
    let totalStages = item.indexes.length;
    if (item.indexes[totalStages - 1] === 1 && item.indexes[0] !== -8) {
      switch (item.pipelines[totalStages - 1]) {
        case 1:
          obj.Search.prospectCount++;
          break;
        case 2:
          obj.Tracking.prospectCount++;

          break;
        case 3:
          obj.BigData.prospectCount++;

          break;
      }
    }
    // if(item[0]=== -8 && ){
    //     prospectsCount++;
    // }
  }
  obj.Total.prospectCount =
    obj.Search.prospectCount +
    obj.Tracking.prospectCount +
    obj.BigData.prospectCount;
  return obj;
};

export default newProspects;
