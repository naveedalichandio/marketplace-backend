const express = require("express");
const router = express.Router();
var authorizedRoutes = require("./authorized");
var unAuthorizedRoutes = require("./auth.routes");

router.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.status(200).send();
  } else {
    next();
  }
});

router.get("/", function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.use(unAuthorizedRoutes);
router.use(authorizedRoutes);

module.exports = router;
