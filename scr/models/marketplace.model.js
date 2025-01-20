module.exports = (sequelize, DataTypes) => {
  const MarketplaceListing = sequelize.define("MarketplaceListing", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      //   allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      //   allowNull: false,
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
        model: "User", // Adjust this to match the actual table name for your User model
        key: "id",
      },
    },
    category: {
      type: DataTypes.ENUM(
        "trading",
        "volume_management",
        "social_media",
        "utility"
      ),
      //   allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  });

  MarketplaceListing.associate = (models) => {
    MarketplaceListing.belongsTo(models.User, {
      foreignKey: "creatorId",
      onDelete: "CASCADE",
    });
  };

  return MarketplaceListing;
};
