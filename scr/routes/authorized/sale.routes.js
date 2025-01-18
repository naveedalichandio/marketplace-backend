const express = require("express");
const saleController = require("../../controllers/sales.controller");
const router = express.Router();

// Sale Routes
router.post("/createSale", saleController.createSale); // Create a sale
router.get("/getSales", saleController.getSales); // Get all sales
router.get("/getSaleById/:id", saleController.getSaleById); // Get a sale by ID
router.put("/updateSale/:id", saleController.updateSale); // Update a sale
router.delete("/deleteSale/:id", saleController.deleteSale); // Delete a sale

module.exports = router;
