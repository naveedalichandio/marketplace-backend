const marketplace = require("./marketplace.controller");
const sales = require("./sales.controller");
const user = require("./user.controller");
const ownership = require("./contractOwner.controller");

module.exports = {
  marketplace,
  sales,
  user,
  ownership,
};
