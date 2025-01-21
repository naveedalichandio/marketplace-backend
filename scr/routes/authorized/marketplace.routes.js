const express = require("express");
const marketplaceController = require("../../controllers/marketplace.controller");
const router = express.Router();

// Marketplace Routes
router.post("/createListing", marketplaceController.createListing); // Create a marketplace listing
router.get("/getListings", marketplaceController.getListings); // Get all marketplace listings
router.get("/getListingById/:id", marketplaceController.getListingById); // Get a listing by ID
router.put("/updateListing/:id", marketplaceController.updateListing); // Update a listing
router.delete("/deleteListing/:id", marketplaceController.deleteListing); // Delete a listing
router.post(
  "/increaseViewAndTrendingScore/:id",
  marketplaceController.increaseViewAndTrendingScore
); // Increase view count and update trending score
router.get("/getSortedListing", marketplaceController.getSortedListing); // Get a listing sorted

module.exports = router;
