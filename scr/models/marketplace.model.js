module.exports = (sequelize, DataTypes) => {
  const MarketplaceListing = sequelize.define(
    "MarketplaceListing",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.STRING,
      },
      certified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      creatorId: {
        type: DataTypes.UUID,
        references: {
          model: "User",
        },
      },
      category: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      trendingScore: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      timestamps: true,
    }
  );

  MarketplaceListing.associate = (models) => {
    MarketplaceListing.belongsTo(models.User, {
      foreignKey: "creatorId",
      onDelete: "CASCADE",
    });
  };

  return MarketplaceListing;
};
