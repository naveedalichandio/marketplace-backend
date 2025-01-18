require("dotenv").config();

module.exports = {
  HOST: process.env.HOST,
  USERNAME: process.env.DBUSER,
  PASSWORD: process.env.PASSWORD,
  secret: process.env.JWT_SECRET,
  DB: "botify",
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
