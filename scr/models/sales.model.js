module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      //   allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("completed", "failed", "pending"),
      defaultValue: "pending",
    },
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: "buyerId",
      onDelete: "CASCADE",
    });
    Sale.belongsTo(models.MarketplaceListing, {
      foreignKey: "listingId",
      onDelete: "CASCADE",
    });
  };

  return Sale;
};
