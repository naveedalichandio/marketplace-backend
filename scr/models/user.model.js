module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generates a unique UUID
        primaryKey: true, // Set as the primary key
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures the username field is required
        unique: true, // Makes the wallet address unique
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures the name field is required
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures the email field is required
        unique: true, // Makes the email field unique
        validate: {
          isEmail: true, // Validates that the input is a proper email
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures the password field is required
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false, // Ensures the wallet address is required
        unique: true, // Makes the wallet address unique
      },
    },
    {
      timestamps: true, // Includes createdAt and updatedAt fields
      tableName: "User", // Explicitly define table name
    }
  );

  User.associate = (models) => {
    User.hasMany(models.MarketplaceListing, {
      foreignKey: "creatorId",
      onDelete: "CASCADE",
    });
  };

  return User;
};
