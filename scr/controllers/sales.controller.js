const { sale, MarketplaceListing, User } = require("../models");

exports.createSale = async (req, res) => {
  try {
    const { listingId, amount } = req.body;
    const buyerId = req.token_decoded.id;

    const listing = await MarketplaceListing.findByPk(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    const saleRecord = await sale.create({
      amount,
      listingId,
      buyerId,
    });

    res.status(201).json({ success: true, saleRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await sale.findAll({
      include: [
        { model: User, as: "buyer", attributes: ["username", "email"] },
        { model: MarketplaceListing, attributes: ["title", "price"] },
      ],
    });

    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const saleRecord = await sale.findByPk(id, {
      include: [
        { model: User, as: "buyer", attributes: ["username", "email"] },
        { model: MarketplaceListing, attributes: ["title", "price"] },
      ],
    });

    if (!saleRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }

    res.status(200).json({ success: true, saleRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const saleRecord = await sale.findByPk(id);

    if (!saleRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }

    await sale.update({ status });

    res.status(200).json({ success: true, saleRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const saleRecord = await sale.findByPk(id);

    if (!saleRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }

    await saleRecord.destroy();

    res
      .status(200)
      .json({ success: true, message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
