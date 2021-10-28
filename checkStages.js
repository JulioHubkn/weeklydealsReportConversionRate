const stageNames = [
  `Prospect > Qualificação`,
  `Qualificação > Agendamento`,
  `Agendamento > Demo`,
  `Demo > Onb/Trial`,
  `Onb/Trial > Proposta`,
  `Proposta > Fechamento`,
  `Fechamento > Ganho`,
];

const checkStages = async (allDeals) => {
  const changed = allDeals.changed;
  const open = allDeals.open;

  let changedStagesPerformance = [
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
    {
      weekStart: 0,
      changedStage: 0,
      lost: 0,
      conversionRate: 0,
      lostRate: 0,
    },
  ];
  const changedStagesLost = Array(7).fill(0);

  changed.map((item) => {
    let totalStages = item.indexes.length;
    let initialStage = item.indexes[totalStages - 1];
    let lastIndex = item.indexes[0];
    let stageIndex = 0;

    if (item.weekStart === 8) {
      console.log(item.indexes);
    }
    let checkedStages = [];
    let checkedChanges = [];
    changedStagesPerformance[item.weekStartIndex - 1].weekStart++;
    checkedStages.push(item.weekStartIndex);

    item.indexes.map((stage) => {
      if (stage !== -8 && stage !== 8 && !checkedChanges.includes(stage)) {
        if (item.indexes.includes(stage + 1)) {
          checkedChanges.push(stage);
          changedStagesPerformance[stage - 1].changedStage++;
        } else {
          if (item.indexes.includes(stage + 2)) {
            checkedChanges.push(stage);
            changedStagesPerformance[stage - 1].changedStage++;
            checkedChanges.push(stage + 1);
            changedStagesPerformance[stage].changedStage++;
          } else {
            if (lastIndex === -8) {
              changedStagesPerformance[stage - 1].lost++;
            }
          }
        }
        if (lastIndex !== stage && !checkedStages.includes(stage)) {
          checkedStages.push(stage);
          changedStagesPerformance[stage - 1].weekStart++;
        }
      }
    });
    // if (initialStage !== 1) {
    //   changedStagesPerformance[stageIndex - 1]++;
    // }
  });

  let index = 0;
  changedStagesPerformance.map((item) => {
    item.conversionRate = parseFloat(
      (100 * (item.changedStage / item.weekStart)).toFixed(2)
    );

    item.lostRate = parseFloat((100 * (item.lost / item.weekStart)).toFixed(2));

    item.name = stageNames[index];
    index++;
  });

  console.log(changedStagesPerformance);
};

export default checkStages;
