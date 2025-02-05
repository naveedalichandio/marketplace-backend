const express = require("express");
const ownership = require("../../controllers/contractOwner.controller");
const router = express.Router();

// Marketplace Routes
router.post("/createOwnership", ownership.createOwner); // Create a marketplace listing
router.get("/getOwnership/:contract", ownership.getOwner); // Get all marketplace listings
router.put("/updateOwnership/:contract", ownership.updateOwner); // Update a listing
router.delete("/deleteOwnership/:contract", ownership.deleteOwner); // Delete a listing

module.exports = router;
