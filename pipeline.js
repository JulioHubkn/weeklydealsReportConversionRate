const stagesObject = [
  {
    name: "Prospect",
    codes: [6647614],
    index: 1,
  },
  {
    name: "Qualificação",
    codes: [6647615],
    index: 2,
  },
  {
    name: "Agendamento",
    codes: [7417228],
    index: 3,
  },
  {
    name: "Demonstração",
    codes: [6647617],
    index: 4,
  },
  {
    name: "Onboarding/Trial",
    codes: [6647616],
    index: 5,
  },
  {
    name: "Proposta",
    codes: [6647618],
    index: 6,
  },
  {
    name: "Fechamento",
    codes: [6647643],
    index: 7,
  },
  {
    name: "Ganho",
    codes: [6647619],
    index: 8,
  },
  {
    name: "Perdido",
    codes: [6647644],
    index: -8,
  },
];

const stageObjects = (stage) => {
  let selectedStage = stagesObject.find((item) => {
    return item.codes.includes(+stage);
  });

  if (selectedStage) {
    return { index: selectedStage.index, name: selectedStage.name };
  } else {
    return 0;
  }
};

export default stageObjects;
