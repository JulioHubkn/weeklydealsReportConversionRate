const lostAndWon = async (deals) => {
  let obj = {
    won: 0,
    lost: 0,
    total: 0,
  };

  for (let item of deals) {
    switch (item.indexes[0]) {
      case 8:
        obj.won++;
        break;
      case -8:
        obj.lost++;
        break;
    }
  }
  obj.total = obj.won + obj.lost;
  console.log(`Lost count> ${obj.lost} | Won count > ${obj.won}`);
  return obj;
};

module.exports = { lostAndWon };
