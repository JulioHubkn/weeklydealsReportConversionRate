const stagesObject = [
  {
    name: "Prospect",
    codes: [6647614, 6814723, 6810519],
    index: 1,
  },
  {
    name: "Qualificação",
    codes: [6647615, 6814724, 6810520],
    index: 2,
  },
  {
    name: "Agendamento",
    codes: [7417228, 7417244, 7417230],
    index: 3,
  },
  {
    name: "Demonstração",
    codes: [6647617, 6824725, 6810521],
    index: 4,
  },
  {
    name: "Onboarding/Trial",
    codes: [6647616, 6824726, 6810522],
    index: 5,
  },
  {
    name: "Proposta",
    codes: [6647618, 6824727, 6810523],
    index: 6,
  },
  {
    name: "Fechamento",
    codes: [6647643, 6814730, 6810527],
    index: 7,
  },
  {
    name: "Ganho",
    codes: [6647619, 6814728, 6810524],
    index: 8,
  },
  {
    name: "Perdido",
    codes: [6647644, 6824729, 6810525],
    index: -8,
  },
];

const stageObjects = (stage) => {
  let selectedStage = stagesObject.find((item) => {
    return item.codes.includes(+stage);
  });

  if (selectedStage) {
    let pipeline = selectedStage.codes.indexOf(+stage) + 1;
    return {
      index: selectedStage.index,
      name: selectedStage.name,
      pipeline: pipeline,
    };
  } else {
    return 0;
  }
};

export default stageObjects;
