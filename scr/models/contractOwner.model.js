module.exports = (sequelize, Sequelize) => {
  const Owner = sequelize.define("Owner", {
    contract: {
      type: sequelize.STRING,
    },
    owner: {
      type: Sequelize.STRING,
    },
  });

  return Owner;
};
