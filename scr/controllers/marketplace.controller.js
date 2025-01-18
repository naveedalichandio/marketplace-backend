const { marketplace, user } = require("../models");

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const creatorId = req.token_decoded.id; // Assuming user is authenticated

    const listing = await marketplace.create({
      title,
      description,
      price,
      category,
      creatorId,
    });

    res.status(201).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await marketplace.findAll({
      where: { status: "active" },
      // include: [{ model: user, attributes: ["username", "email"] }],
    });

    res.status(200).json({ success: true, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await marketplace.findByPk(id, {
      include: [{ model: user, attributes: ["username", "email"] }],
    });

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    res.status(200).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, status } = req.body;

    const listing = await marketplace.findByPk(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    if (listing.creatorId !== req.token_decoded.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await listing.update({ title, description, price, category, status });

    res.status(200).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await marketplace.findByPk(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    if (listing.creatorId !== req.token_decoded.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await listing.destroy();

    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
