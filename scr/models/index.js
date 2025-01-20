const config = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.User = require("../models/user.model.js")(sequelize, Sequelize);
db.MarketplaceListing = require("../models/marketplace.model.js")(
  sequelize,
  Sequelize
);
db.sale = require("../models/sales.model.js")(sequelize, Sequelize);

// Call associate methods
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Pass the entire db object
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.role = require("../models/role.model.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
// });

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
