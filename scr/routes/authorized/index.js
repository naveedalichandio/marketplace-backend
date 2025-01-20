const userRoutes = require("./user.routes");
const marketplaceRoutes = require("./marketplace.routes");
const salesRoutes = require("./sale.routes");

const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middlewares");

router.use("/user", [authJwt.verifyToken], userRoutes);
router.use("/marketplace", [authJwt.verifyToken], marketplaceRoutes);
router.use("/sale", [authJwt.verifyToken], salesRoutes);

router.use("/user", userRoutes);
router.use("/marketplace", marketplaceRoutes);
router.use("/sale", salesRoutes);

module.exports = router;
